import { CATALOG, CATEGORIES, EQUIPMENT } from './catalog.js';

export const BACKUP_VERSION = 1;
const collections = ['workouts', 'customSkills', 'routines', 'rewards', 'redemptions'];
const deletable = ['workouts', 'routines', 'rewards'];

export function emptyState() {
  return {
    workouts: [], customSkills: [], routines: [], rewards: [], redemptions: [],
    targets: {}, draft: null,
    removed: { workouts: {}, routines: {}, rewards: {} },
    prefs: { unit: 'lb', weeklyWorkouts: 3, updatedAt: 0 },
  };
}

export function getSkills(state) {
  return [...CATALOG, ...state.customSkills];
}

export function createId() {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Array.from(crypto.getRandomValues(new Uint32Array(4)), n => n.toString(16).padStart(8, '0')).join('');
}

let database;

function openDatabase() {
  if (database) return database;
  database = new Promise((resolve, reject) => {
    const projectPath = new URL('../', import.meta.url).pathname;
    const request = indexedDB.open('ascent:' + projectPath, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('profile');
    request.onsuccess = () => {
      const connection = request.result;
      connection.onversionchange = () => {
        connection.close();
        database = undefined;
      };
      resolve(connection);
    };
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('Close other open tabs of Ascent and reload.'));
  }).catch(error => {
    database = undefined;
    throw error;
  });
  return database;
}

export async function readState() {
  const connection = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = connection.transaction('profile').objectStore('profile').get('state');
    request.onsuccess = () => resolve(request.result ?? emptyState());
    request.onerror = () => reject(request.error);
  });
}

export async function transact(change) {
  const connection = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = connection.transaction('profile', 'readwrite');
    const profile = transaction.objectStore('profile');
    const request = profile.get('state');
    let nextState;
    let failure;
    request.onsuccess = () => {
      try {
        const current = request.result ?? emptyState();
        nextState = change(current) ?? current;
        profile.put(nextState, 'state');
      } catch (error) {
        failure = error;
        transaction.abort();
      }
    };
    transaction.oncomplete = () => resolve(nextState);
    transaction.onabort = () => reject(failure ?? transaction.error ?? new Error('Could not save your changes.'));
  });
}

export function putRecord(state, collection, record) {
  const index = state[collection].findIndex(item => item.id === record.id);
  if (index < 0) state[collection].push(record);
  else state[collection][index] = record;
}

export function removeRecord(state, collection, id) {
  state[collection] = state[collection].filter(item => item.id !== id);
  state.removed[collection][id] = Date.now();
}

export function numberOrNull(value) {
  return value === '' || value == null ? null : Number(value);
}

export function toKg(value, unit) {
  const mass = numberOrNull(value);
  if (mass == null) return null;
  return unit === 'lb' ? mass / 2.2046226218 : mass;
}

export function fromKg(value, unit) {
  if (value == null) return '';
  const mass = unit === 'lb' ? value * 2.2046226218 : value;
  return Math.round(mass * 100) / 100;
}

export function dayKey(date = new Date()) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(number => String(number).padStart(2, '0')).join('-');
}

export function keyDate(key) {
  return new Date(key + 'T12:00:00');
}

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function weekStart(date = new Date()) {
  return addDays(date, -((date.getDay() + 6) % 7));
}

export function dateLabel(key, options = { month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat(undefined, options).format(keyDate(key));
}

export function targetFor(skill, state) {
  return state.targets[skill.id]?.value ?? skill.target;
}

function emptyRecord() {
  return { best: 0, bestDate: null, left: 0, right: 0, qualityBest: 0,
    count: 0, maxLoad: null, minAssist: null };
}

export function progressFor(state, skills = getSkills(state), today = new Date()) {
  const byId = new Map(skills.map(skill => [skill.id, skill]));
  const records = new Map();
  const days = new Set();
  const weeklyCategories = new Set();
  const recentSets = new Map();
  const weekly = { workouts: 0, sets: 0, reps: 0, seconds: 0, addedKgReps: 0 };
  const start = dayKey(weekStart(today));
  const end = dayKey(addDays(weekStart(today), 6));
  const todayKey = dayKey(today);

  for (const workout of state.workouts) {
    if (workout.sets.length === 0) continue;
    days.add(workout.date);
    const thisWeek = workout.date >= start && workout.date <= end;
    if (thisWeek) weekly.workouts++;
    for (const set of workout.sets) {
      const skill = byId.get(set.skillId);
      if (!skill) continue;
      if (thisWeek) {
        weekly.sets++;
        weeklyCategories.add(skill.category);
        if (skill.metric === 'seconds') weekly.seconds += set.value;
        else {
          const reps = set.value * (skill.each && set.side === 'each' ? 2 : 1);
          weekly.reps += reps;
          weekly.addedKgReps += (set.loadKg ?? 0) * reps;
        }
      }
      const recent = recentSets.get(skill.id);
      if (!recent || workout.date >= recent.date && (workout.date > recent.date || workout.updatedAt >= recent.updatedAt)) {
        recentSets.set(skill.id, { ...set, date: workout.date, updatedAt: workout.updatedAt });
      }
      const record = records.get(skill.id) ?? emptyRecord();
      record.count++;
      if (set.value > record.best || set.value === record.best && workout.date > record.bestDate) {
        record.best = set.value;
        record.bestDate = workout.date;
      }
      if (set.loadKg > 0) record.maxLoad = Math.max(record.maxLoad ?? 0, set.loadKg);
      if (set.assistKg > 0) record.minAssist = Math.min(record.minAssist ?? Infinity, set.assistKg);
      const assisted = set.assistKg > 0 || Boolean(set.assistance);
      const qualifies = (skill.assisted || !assisted) && (!skill.weighted || set.loadKg > 0);
      if (qualifies) {
        if (!skill.each) record.qualityBest = Math.max(record.qualityBest, set.value);
        else {
          if (set.side !== 'right') record.left = Math.max(record.left, set.value);
          if (set.side !== 'left') record.right = Math.max(record.right, set.value);
          record.qualityBest = Math.min(record.left, record.right);
        }
      }
      records.set(skill.id, record);
    }
  }

  const mastered = new Set(skills.filter(skill => (records.get(skill.id)?.qualityBest ?? 0)
    >= targetFor(skill, state)).map(skill => skill.id));
  const statuses = new Map();
  for (const skill of skills) {
    const unlocked = skill.prereqs.length === 0 ||
      skill.prereqs.some(path => path.every(id => mastered.has(id)));
    let status = unlocked ? 'available' : 'locked';
    if (records.has(skill.id)) status = 'training';
    if (mastered.has(skill.id)) status = 'mastered';
    statuses.set(skill.id, status);
  }

  const xp = days.size * 20 + mastered.size * 50;
  const earned = days.size * 2 + mastered.size * 5;
  const spent = state.redemptions.reduce((sum, redemption) => sum + redemption.cost, 0);
  let streak = 0;
  let date = days.has(todayKey) ? today : addDays(today, -1);
  while (days.has(dayKey(date))) {
    streak++;
    date = addDays(date, -1);
  }
  const suggested = skills.find(skill => statuses.get(skill.id) === 'training') ??
    skills.find(skill => skill.prereqs.length > 0 && statuses.get(skill.id) === 'available') ??
    skills.find(skill => statuses.get(skill.id) === 'available') ?? null;

  return {
    byId, records, mastered, statuses, recentSets, days, weekly, weeklyCategories, streak, suggested,
    xp, earned, spent, level: Math.floor(xp / 100) + 1, points: Math.max(0, earned - spent),
  };
}

export function isSafeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function validateGraph(skills) {
  const byId = new Map(skills.map(skill => [skill.id, skill]));
  const visited = new Set();
  const visiting = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error('A prerequisite loops back to the same skill.');
    if (visited.has(id)) return;
    const skill = byId.get(id);
    if (!skill) throw new Error('A skill has a missing prerequisite.');
    visiting.add(id);
    for (const path of skill.prereqs) for (const prerequisite of path) visit(prerequisite);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of byId.keys()) visit(id);
}

function must(condition, message = 'This backup contains invalid or incomplete data.') {
  if (!condition) throw new Error(message);
}

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const isText = (value, max = 100) => typeof value === 'string' && value.length <= max;
const hasText = (value, max) => isText(value, max) && value.trim().length > 0;
const isId = value => typeof value === 'string' && /^[a-zA-Z0-9-]{1,90}$/.test(value) &&
  !['constructor', 'prototype'].includes(value);
const amount = (value, min, max) => Number.isFinite(value) && value >= min && value <= max;
const stamp = value => Number.isSafeInteger(value) && value >= 0;
const optional = (value, check) => value == null || check(value);
const validDate = value => typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) && dayKey(keyDate(value)) === value;

function validateSets(sets, byId) {
  must(Array.isArray(sets) && sets.length <= 500);
  const ids = new Set();
  for (const set of sets) {
    must(isObject(set) && isId(set.id) && !ids.has(set.id));
    ids.add(set.id);
    const skill = byId.get(set.skillId);
    must(skill && amount(set.value, skill.metric === 'reps' ? 1 : 0.1, 86400));
    must(skill.metric !== 'reps' || Number.isInteger(set.value));
    must(['each', 'left', 'right', 'both'].includes(set.side));
    must(optional(set.loadKg, n => amount(n, 0, 2000)) &&
      optional(set.assistKg, n => amount(n, 0, 2000)) &&
      optional(set.effort, n => amount(n, 0, 10)) &&
      optional(set.rest, n => amount(n, 0, 86400)) &&
      isText(set.tempo, 50) && isText(set.assistance, 100) && isText(set.notes, 400));
  }
}

function validateWorkout(workout, byId) {
  must(hasText(workout.name) && validDate(workout.date) && stamp(workout.startedAt));
  must(optional(workout.bodyKg, n => amount(n, 0, 2000)) &&
    optional(workout.duration, n => amount(n, 0, 1440)) && isText(workout.notes, 2000));
  validateSets(workout.sets, byId);
}

export function validateState(state) {
  must(isObject(state));
  for (const collection of collections) {
    const records = state[collection];
    must(Array.isArray(records) && records.length <= 20000);
    const ids = new Set();
    for (const record of records) {
      must(isObject(record) && isId(record.id) && stamp(record.updatedAt) && !ids.has(record.id));
      ids.add(record.id);
    }
  }
  must(state.customSkills.length <= 500);
  const baseIds = new Set(CATALOG.map(skill => skill.id));
  const categories = new Set(CATEGORIES.map(category => category.id));
  for (const skill of state.customSkills) {
    must(!baseIds.has(skill.id) && hasText(skill.name) && categories.has(skill.category) &&
      skill.track === 'custom-' + skill.category && Number.isInteger(skill.tier) &&
      amount(skill.tier, 1, 5) && ['reps', 'seconds'].includes(skill.metric) &&
      Number.isInteger(skill.target) && amount(skill.target, 1, 86400));
    must(Array.isArray(skill.gear) && skill.gear.length > 0 && skill.gear.every(gear => EQUIPMENT.includes(gear)));
    must(Array.isArray(skill.prereqs) && skill.prereqs.length <= 5 && skill.prereqs.every(path =>
      Array.isArray(path) && path.length > 0 && path.length <= 10 && path.every(isId)));
    must(hasText(skill.description, 700) && hasText(skill.cues, 450) &&
      hasText(skill.mistakes, 450) && hasText(skill.source) && isSafeUrl(skill.url) &&
      ['each', 'weighted', 'assisted'].every(flag => typeof skill[flag] === 'boolean'));
  }
  const skills = getSkills(state);
  validateGraph(skills);
  const byId = new Map(skills.map(skill => [skill.id, skill]));
  for (const workout of state.workouts) {
    validateWorkout(workout, byId);
    must(workout.sets.length > 0);
  }
  if (state.draft != null) {
    must(isObject(state.draft) && isId(state.draft.id) && stamp(state.draft.updatedAt));
    validateWorkout(state.draft, byId);
    must(state.draft.routine == null || isId(state.draft.routine));
    must(state.draft.selectedSkill == null || byId.has(state.draft.selectedSkill));
  }
  for (const routine of state.routines) {
    must(hasText(routine.name) && Array.isArray(routine.entries) && routine.entries.length > 0 &&
      routine.entries.length <= 30 && routine.entries.every(entry =>
        isObject(entry) && byId.has(entry.skillId) && Number.isInteger(entry.sets) && amount(entry.sets, 1, 100)));
  }
  for (const reward of [...state.rewards, ...state.redemptions]) {
    must(hasText(reward.name) && Number.isInteger(reward.cost) && amount(reward.cost, 1, 1000000));
  }
  for (const redemption of state.redemptions) must(isId(redemption.rewardId) && validDate(redemption.date));
  must(isObject(state.targets) && Object.entries(state.targets).every(([id, target]) =>
    byId.has(id) && isObject(target) && stamp(target.updatedAt) &&
    Number.isInteger(target.value) && amount(target.value, 1, 86400)));
  must(isObject(state.prefs) && ['kg', 'lb'].includes(state.prefs.unit) && stamp(state.prefs.updatedAt) &&
    Number.isInteger(state.prefs.weeklyWorkouts) && amount(state.prefs.weeklyWorkouts, 1, 14));
  must(isObject(state.removed));
  for (const collection of deletable) {
    must(isObject(state.removed[collection]) &&
      Object.entries(state.removed[collection]).every(([id, time]) => isId(id) && stamp(time)));
  }
  return state;
}

export function makeBackup(state) {
  return { app: 'Ascent Calisthenics', version: BACKUP_VERSION, exportedAt: new Date().toISOString(), state };
}

export function readBackup(text) {
  let backup;
  try {
    backup = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  must(backup?.app === 'Ascent Calisthenics' && backup.version === BACKUP_VERSION,
    'Choose an Ascent backup supported by this version.');
  return validateState(backup.state);
}

export function mergeBackup(current, incoming) {
  const merged = { ...current, removed: { ...current.removed }, targets: { ...current.targets } };
  for (const collection of deletable) {
    const removed = { ...current.removed[collection] };
    for (const [id, stamp] of Object.entries(incoming.removed[collection])) {
      removed[id] = Math.max(removed[id] ?? 0, stamp);
    }
    merged.removed[collection] = removed;
  }
  for (const collection of collections) {
    const updated = new Map(current[collection].map(record => [record.id, record]));
    for (const record of incoming[collection]) {
      if (!updated.has(record.id) || record.updatedAt > updated.get(record.id).updatedAt) {
        updated.set(record.id, record);
      }
    }
    const removed = merged.removed[collection] ?? {};
    merged[collection] = [...updated.values()].filter(record => (removed[record.id] ?? -1) < record.updatedAt);
  }
  for (const [id, target] of Object.entries(incoming.targets)) {
    if (!merged.targets[id] || target.updatedAt > merged.targets[id].updatedAt) merged.targets[id] = target;
  }
  if (incoming.prefs.updatedAt > current.prefs.updatedAt) merged.prefs = incoming.prefs;
  if (!current.draft && incoming.draft) {
    const completed = merged.workouts.some(workout =>
      workout.id === incoming.draft.id && workout.updatedAt >= incoming.draft.updatedAt);
    const removed = (merged.removed.workouts[incoming.draft.id] ?? -1) >= incoming.draft.updatedAt;
    if (!completed && !removed) merged.draft = incoming.draft;
  }
  return validateState(merged);
}
