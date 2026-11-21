import { CATEGORIES, DIFFICULTIES, EQUIPMENT, STARTER_ROUTINES } from './catalog.js';
import {
  readState, transact, getSkills, createId, putRecord, removeRecord, dayKey, fromKg, toKg,
  numberOrNull, progressFor, validateState, makeBackup, readBackup, mergeBackup, isSafeUrl,
} from './store.js';
import {
  safe, button, field, option, formatSet, unitName, topbar, railLevel, todayView, treeView,
  treeResults, skillDetails, skillOptions, setFields, logView, historyView, workoutDetails, rewardsView,
} from './views.js';

const main = document.querySelector('#main');
const dialog = document.querySelector('#app-dialog');
const toast = document.querySelector('#toast');
const filters = { category: 'all', gear: '', tier: '', query: '', openTracks: new Map() };
const routes = ['today', 'tree', 'history', 'rewards', 'log'];
const listeners = typeof BroadcastChannel === 'function'
  ? new BroadcastChannel('ascent:' + new URL('../', import.meta.url).pathname) : null;

let state;
let context;
let route = getRoute();
let logSkill = '';
let pendingConfirmation;
let toastDelay;
let busy = false;
let lastHold = 0;
let timer = { mode: 'idle', started: 0, end: 0 };
let dialogOpener;
let readback = Promise.resolve();

function getRoute() {
  const hash = location.hash.slice(1);
  return routes.includes(hash) ? hash : 'today';
}

function refreshContext() {
  const skills = getSkills(state);
  context = { state, skills, progress: progressFor(state, skills) };
}

function selectDefaultExercise() {
  const routine = [...STARTER_ROUTINES, ...state.routines].find(item => item.id === state.draft?.routine);
  return state.draft?.selectedSkill ?? state.draft?.sets.at(-1)?.skillId ?? routine?.entries[0]?.skillId ?? '';
}

function render() {
  refreshContext();
  document.querySelector('#topbar').innerHTML = topbar(route, context);
  document.querySelector('#rail-progress').innerHTML = railLevel(context.progress);
  for (const link of document.querySelectorAll('nav [data-route]')) {
    if (link.dataset.route === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  document.querySelector('.mobile-log').setAttribute('aria-pressed', String(route === 'log'));
  const views = { today: todayView, tree: ctx => treeView(ctx, filters), history: historyView,
    rewards: rewardsView, log: ctx => logView(ctx, logSkill) };
  main.innerHTML = views[route](context);
  if (route === 'log') syncTimer();
}

function navigate(destination) {
  if (destination !== route) {
    history.pushState(null, '', '#' + destination);
    route = destination;
    window.scrollTo(0, 0);
  }
  render();
}

function notify(message, error = false) {
  clearTimeout(toastDelay);
  toast.textContent = message;
  toast.classList.toggle('error', error);
  toast.hidden = false;
  toastDelay = setTimeout(() => { toast.hidden = true; }, error ? 7000 : 4200);
}

function report(error) {
  const message = error?.message || 'Something went wrong. Try again.';
  const banner = dialog.open && dialog.querySelector('.form-error');
  if (banner) {
    banner.textContent = message;
    banner.hidden = false;
  } else notify(message, true);
}

async function update(change, repaint = true) {
  state = await transact(change);
  listeners?.postMessage('updated');
  if (repaint) render();
  else refreshContext();
}

function showDialog(title, html) {
  if (!dialog.open) dialogOpener = document.activeElement;
  dialog.innerHTML = `<header class="dialog-head"><h2 id="dialog-title">${safe(title)}</h2>
    ${button('×', 'close-dialog', '', 'icon-button quiet', 'aria-label="Close"')}</header>
    <div class="dialog-body"><p class="form-error" role="alert" hidden></p>${html}</div>`;
  if (!dialog.open) dialog.showModal();
  else dialog.scrollTop = 0;
  dialog.querySelector('.dialog-head button').focus();
}

function confirmAction(title, message, label, onConfirm, kind = 'danger') {
  pendingConfirmation = onConfirm;
  showDialog(title, `<p class="muted">${safe(message)}</p><form class="actions" data-form="confirm">
    <button class="btn ${kind}" type="submit">${safe(label)}</button>
    ${button('Cancel', 'close-dialog', '', 'quiet')}</form>`);
}

function openSkill(id) {
  const skill = context.progress.byId.get(id);
  if (skill) showDialog(skill.name, skillDetails(context, skill));
}

function renderTreeResults() {
  const target = document.querySelector('#tree-results');
  if (target) target.innerHTML = treeResults(context, filters);
}

function sessionFields() {
  const form = document.querySelector('#session-meta');
  if (!form) return null;
  if (!form.reportValidity()) throw new Error('Check the workout details.');
  const data = new FormData(form);
  const name = data.get('name').trim();
  if (!name) throw new Error('Enter a workout name.');
  return {
    name, date: data.get('date'), bodyKg: toKg(data.get('bodyweight'), state.prefs.unit),
    duration: numberOrNull(data.get('duration')), notes: data.get('notes').trim(),
  };
}

async function updateDraft(change, repaint = true) {
  const id = state.draft?.id;
  const draftFields = sessionFields();
  await update(current => {
    if (!id || current.draft?.id !== id) throw new Error('This draft changed. Open the workout log again.');
    const draft = { ...current.draft, ...draftFields, updatedAt: Date.now() };
    if (logSkill) draft.selectedSkill = logSkill;
    change(draft, current);
    current.draft = draft;
  }, repaint);
}

async function startWorkout({ skill = '', routine = null, edit = '' } = {}) {
  const fields = document.querySelector('#session-meta')?.checkValidity() ? sessionFields() : null;
  const start = async (replace = false) => {
    await update(current => {
      if (edit) {
        const training = current.workouts.find(workout => workout.id === edit);
        if (!training) throw new Error('This workout is no longer available.');
        if (current.draft?.id !== edit) {
          if (current.draft && !replace) throw new Error('Finish or discard the current draft first.');
          current.draft = { ...training, updatedAt: Date.now() };
        }
      } else if (!current.draft) {
        const now = Date.now();
        current.draft = { id: createId(), name: routine?.name ?? 'Workout', date: dayKey(),
          startedAt: now, updatedAt: now, bodyKg: null, duration: null, notes: '',
          routine: routine?.id ?? null, sets: [] };
      } else {
        const draft = current.draft;
        if (fields) Object.assign(draft, fields);
        if (routine) {
          if (draft.name === 'Workout' && draft.sets.length === 0) draft.name = routine.name;
          draft.routine = routine.id;
        }
        draft.updatedAt = Date.now();
      }
      if (skill || routine?.entries[0]?.skillId) current.draft.selectedSkill = skill || routine.entries[0].skillId;
    }, false);
    logSkill = skill || routine?.entries[0]?.skillId || selectDefaultExercise();
    dialog.close();
    navigate('log');
  };
  if (edit && state.draft && state.draft.id !== edit) {
    confirmAction('Replace the current draft?', 'The current unsaved draft will be discarded so you can edit this workout.',
      'Replace draft', () => start(true));
    return;
  }
  await start();
}

function chooseExercise(id) {
  const select = document.querySelector('#exercise-select');
  if (!select) return;
  logSkill = id;
  select.value = id;
  const skill = context.progress.byId.get(id);
  const last = state.draft?.sets.findLast(set => set.skillId === id) ?? context.progress.recentSets.get(id);
  document.querySelector('#set-fields').innerHTML = setFields(skill, last, state.prefs.unit);
  const note = document.querySelector('#previous-set');
  note.hidden = !(last && skill);
  note.textContent = last && skill ? 'Previous set loaded · ' + formatSet(skill, last, state.prefs.unit) : '';
  document.querySelector('#add-set-form [type="submit"]').disabled = !skill;
  syncTimer();
}

function setFromForm(form, skillId, id = createId()) {
  const values = new FormData(form);
  const skill = context.progress.byId.get(skillId);
  const loadKg = toKg(values.get('load'), state.prefs.unit);
  if (!skill) throw new Error('Choose a valid exercise.');
  if (skill.weighted && !(loadKg > 0)) throw new Error('Enter a positive added weight for this variation.');
  return {
    id, skillId, value: Number(values.get('value')), side: values.get('side'),
    loadKg, assistKg: toKg(values.get('assistanceKg'), state.prefs.unit),
    assistance: values.get('assistance').trim(), effort: numberOrNull(values.get('effort')),
    rest: numberOrNull(values.get('rest')), tempo: values.get('tempo').trim(), notes: values.get('notes').trim(),
  };
}

function openSetEdit(id) {
  const set = state.draft?.sets.find(entry => entry.id === id);
  if (!set) return;
  const skill = context.progress.byId.get(set.skillId);
  showDialog('Edit ' + skill.name + ' set', `<form class="stack" data-form="edit-set" data-id="${safe(id)}">
    ${setFields(skill, set, state.prefs.unit)}
    <div class="actions"><button class="btn primary" type="submit">Save set</button>
    ${button('Cancel', 'close-dialog', '', 'quiet')}</div></form>`);
}

async function finishWorkout() {
  const id = state.draft?.id;
  const details = sessionFields();
  let before;
  let after;
  let editing;
  await update(current => {
    if (!id || current.draft?.id !== id) throw new Error('Open a workout draft first.');
    if (!current.draft.sets.length) throw new Error('Add at least one set before finishing.');
    before = progressFor(current);
    editing = current.workouts.some(workout => workout.id === id);
    const workout = { ...current.draft, ...details, updatedAt: Date.now() };
    if (workout.duration == null && !editing) {
      workout.duration = Math.min(1440, Math.max(0, Math.round((Date.now() - workout.startedAt) / 60000)));
    }
    putRecord(current, 'workouts', workout);
    current.draft = null;
    after = progressFor(current);
    return validateState(current);
  }, false);
  const newMastery = [...after.mastered].filter(skill => !before.mastered.has(skill)).length;
  const diff = after.xp - before.xp;
  const feedback = [editing ? 'Workout updated.' : 'Workout saved.'];
  if (diff > 0) feedback.push('+' + diff + ' XP');
  if (newMastery) feedback.push(newMastery + ' new ' + (newMastery === 1 ? 'mastery' : 'masteries'));
  if (after.level > before.level) feedback.push('Level ' + after.level);
  if (after.records.size > before.records.size && !newMastery) feedback.push('New personal record');
  timer = { mode: 'idle', started: 0, end: 0 };
  lastHold = 0;
  navigate(editing ? 'history' : 'today');
  notify(feedback.join('  '));
}

function timerSeconds() {
  if (timer.mode === 'rest') return Math.max(0, Math.ceil((timer.end - Date.now()) / 1000));
  if (timer.mode === 'hold') return Math.floor((Date.now() - timer.started) / 100) / 10;
  return timer.mode === 'hold-done' ? lastHold : 0;
}

function syncTimer() {
  const secs = timerSeconds();
  if (timer.mode === 'rest' && secs === 0) {
    timer = { mode: 'rest-done', started: 0, end: 0 };
    notify('Rest complete.');
  }
  const display = document.querySelector('#timer-display');
  if (!display) return;
  const time = [Math.floor(secs / 60), Math.floor(secs % 60)].map(value => String(value).padStart(2, '0')).join(':');
  if (display.textContent !== time) display.textContent = time;
  const labels = { idle: 'Rest or hold', rest: 'Rest countdown', 'rest-done': 'Rest complete',
    hold: 'Measuring hold', 'hold-done': lastHold + ' s hold recorded' };
  document.querySelector('#timer-status').textContent = labels[timer.mode];
  document.querySelector('#stop-timer').disabled = !['rest', 'hold'].includes(timer.mode);
  document.querySelector('#timer-use').disabled = !lastHold || context.progress.byId.get(logSkill)?.metric !== 'seconds';
}

function stopTimer() {
  if (timer.mode === 'hold') {
    lastHold = Math.min(86400, timerSeconds());
    timer = { mode: 'hold-done', started: 0, end: 0 };
  } else timer = { mode: 'idle', started: 0, end: 0 };
  syncTimer();
}

function useHold(control) {
  if (timer.mode === 'hold') stopTimer();
  if (!lastHold) throw new Error('Start and stop a hold timer first.');
  const input = control.closest('form')?.querySelector('[name="value"]') ??
    document.querySelector('#add-set-form [name="value"]');
  if (!input || input.step !== '0.1') throw new Error('Select a timed hold exercise first.');
  input.value = lastHold;
  input.focus();
}

function showRoutines() {
  const cards = (items, edit) => items.map(routine => {
    const names = routine.entries.map(entry => context.progress.byId.get(entry.skillId)?.name).join(', ');
    return `<div class="list-row history-row"><div><h3>${safe(routine.name)}</h3><p>${safe(names)}</p></div>
      <div class="set-actions">${edit ? button('Edit', 'routine-form', routine.id, 'quiet small-btn') : ''}
        ${button('Use', 'use-routine', routine.id, 'primary small-btn', `aria-label="Use ${safe(routine.name)}"`)}</div></div>`;
  }).join('');
  showDialog('Workout routines', `<section class="stack"><h3>Starters</h3><div class="set-list">${cards(STARTER_ROUTINES, false)}</div></section>
    <section class="stack"><div class="split wrap"><h3>My routines</h3>${button('+ New routine', 'routine-form', '', 'quiet')}</div>
      <div class="set-list">${cards(state.routines, true) || '<p class="muted">Save a group of exercises to reuse it.</p>'}</div></section>`);
}

function routineRow(entry = {}) {
  return `<div class="routine-row">
    ${field('Exercise', `<select name="routine-skill" required>${skillOptions(context.skills, entry.skillId)}</select>`)}
    ${field('Sets', `<input type="number" name="routine-sets" min="1" max="100" step="1" value="${entry.sets ?? 3}" required>`)}
    ${button('×', 'remove-routine-row', '', 'quiet icon-button', 'aria-label="Remove exercise"')}</div>`;
}

function routineForm(id) {
  const routine = state.routines.find(item => item.id === id);
  showDialog(routine ? 'Edit routine' : 'New routine', `<form class="stack" data-form="routine" data-id="${safe(id)}">
    ${field('Routine name', `<input name="name" maxlength="100" value="${safe(routine?.name)}" required>`)}
    <div class="stack" id="routine-rows">${(routine?.entries ?? [{}]).map(routineRow).join('')}</div>
    <div class="actions">${button('+ Add exercise', 'add-routine-row', '', 'quiet')}
      <button class="btn primary" type="submit">Save routine</button>
      ${routine ? button('Delete routine', 'delete-routine', id, 'danger') : ''}</div></form>`);
}

function prereqField(skillId = '', editingId = '') {
  return field('Required skill', `<select name="prerequisite">${skillOptions(context.skills, skillId, editingId)}</select>`);
}

function prereqPath(ids = [''], editingId = '') {
  return `<fieldset class="panel stack" data-prereq-path>
    <div class="form-grid" data-prereq-fields>${ids.map(id => prereqField(id, editingId)).join('')}</div>
    <div class="actions">${button('+ Required skill', 'add-prereq', editingId, 'quiet small-btn')}
      ${button('Remove path', 'remove-path', '', 'quiet small-btn')}</div></fieldset>`;
}

function customSkillForm(id) {
  const skill = context.progress.byId.get(id);
  const options = (values, current) => values.map(value => option(value, value, current)).join('');
  showDialog(skill ? 'Edit custom skill' : 'New custom skill', `<form class="stack" data-form="custom" data-id="${safe(id)}">
    <div class="form-grid">
      ${field('Skill name', `<input name="name" maxlength="100" value="${safe(skill?.name)}" required>`, true)}
      ${field('Category', `<select name="category">${CATEGORIES.map(cat => option(cat.id, cat.name, skill?.category)).join('')}</select>`)}
      ${field('Difficulty', `<select name="tier">${DIFFICULTIES.map((tier, index) => option(index + 1, tier, skill?.tier ?? 2)).join('')}</select>`)}
      ${field('Measure in', `<select name="metric">${options(['reps', 'seconds'], skill?.metric)}</select>`)}
      ${field('Mastery target', `<input name="target" type="number" min="1" max="86400" step="1" value="${skill?.target ?? 10}" required>`)}
    </div>
    <fieldset><legend>Equipment</legend><div class="form-grid three">${EQUIPMENT.map(gear =>
      `<label class="check"><input type="checkbox" name="gear" value="${gear}" ${(skill?.gear ?? ['Floor']).includes(gear) ? 'checked' : ''}>${gear}</label>`).join('')}</div></fieldset>
    <fieldset><legend>Variation details</legend><div class="form-grid">
      <label class="check"><input type="checkbox" name="each" ${skill?.each ? 'checked' : ''}>Track each side</label>
      <label class="check"><input type="checkbox" name="weighted" ${skill?.weighted ? 'checked' : ''}>Weighted variation</label>
      <label class="check"><input type="checkbox" name="assisted" ${skill?.assisted ? 'checked' : ''}>Assisted variation</label>
    </div></fieldset>
    ${field('Description', `<textarea name="description" maxlength="700" required>${safe(skill?.description)}</textarea>`)}
    ${field('Form cue', `<textarea name="cues" maxlength="450" required>${safe(skill?.cues)}</textarea>`)}
    ${field('Common mistake', `<textarea name="mistakes" maxlength="450" required>${safe(skill?.mistakes)}</textarea>`)}
    <div class="form-grid">
      ${field('Free tutorial URL', `<input name="url" type="url" placeholder="https://…" value="${safe(skill?.url)}" required>`)}
      ${field('Tutorial source', `<input name="source" maxlength="100" value="${safe(skill?.source)}" required>`)}
    </div>
    <div class="stack"><h3>Prerequisite paths</h3>
      <p class="muted"><small>Master every required skill in any one path to unlock this skill.</small></p>
      <div id="prereq-paths" class="stack">${skill?.prereqs.map(path => prereqPath(path, id)).join('') ?? ''}</div>
      <div class="actions">${button('+ Add path', 'add-path', id, 'quiet')}</div></div>
    <div class="actions"><button class="btn primary" type="submit">Save skill</button>
      ${button('Cancel', 'close-dialog', '', 'quiet')}</div></form>`);
}

function rewardForm(id) {
  const reward = state.rewards.find(item => item.id === id);
  showDialog(reward ? 'Edit reward' : 'New reward', `<form class="stack" data-form="reward" data-id="${safe(id)}">
    ${field('Reward name', `<input name="name" maxlength="100" value="${safe(reward?.name)}" required>`)}
    ${field('Point cost', `<input name="cost" type="number" inputmode="numeric" min="1" max="1000000" step="1" value="${reward?.cost ?? 5}" required>`)}
    <div class="actions"><button class="btn primary" type="submit">Save reward</button>
      ${reward ? button('Delete reward', 'delete-reward', id, 'danger') : button('Cancel', 'close-dialog', '', 'quiet')}</div>
  </form>`);
}

function showSettings() {
  showDialog('Data & settings', `<form class="stack" data-form="preferences">
    <h3>Training preferences</h3><div class="form-grid">
      ${field('Weight unit', `<select name="unit">${option('lb', 'Pounds (lb)', state.prefs.unit)}
        ${option('kg', 'Kilograms (kg)', state.prefs.unit)}</select>`)}
      ${field('Workouts per week', `<input name="weekly" type="number" min="1" max="14" step="1" value="${state.prefs.weeklyWorkouts}" required>`)}
    </div><div class="actions"><button type="submit" class="btn">Save preferences</button></div>
  </form>
  <section class="panel stack"><h3>Backup</h3><p class="muted">
    Your data is saved in this browser. Export it before clearing browser data or switching devices.</p>
    <div class="actions">${button('Export JSON', 'export', '', 'primary')}</div>
    <form class="stack" data-form="import">
      ${field('Backup file', '<input name="backup" type="file" accept=".json,application/json" required>')}
      ${field('Import mode', '<select name="mode"><option value="merge">Merge with current data</option><option value="restore">Restore from backup</option></select>')}
      <div class="actions"><button type="submit" class="btn">Import backup</button></div>
    </form></section>`);
}

function downloadBackup() {
  const blob = new Blob([JSON.stringify(makeBackup(state), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ascent-backup-' + dayKey() + '.json';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  notify('Backup exported.');
}

const actions = {
  category: id => { filters.category = id; filters.query = ''; filters.gear = ''; filters.tier = ''; navigate('tree'); },
  'tree-filter': (id, control) => {
    filters.category = id;
    for (const chip of document.querySelectorAll('[data-action="tree-filter"]')) chip.setAttribute('aria-pressed', String(chip === control));
    renderTreeResults();
  },
  skill: openSkill,
  'custom-skill': customSkillForm,
  'close-dialog': () => dialog.close(),
  settings: showSettings,
  export: downloadBackup,
  'start-workout': () => startWorkout(),
  'log-skill': id => startWorkout({ skill: id }),
  'edit-workout': id => startWorkout({ edit: id }),
  'select-exercise': id => {
    chooseExercise(id);
    document.querySelector('#add-set-panel')?.scrollIntoView({ block: 'start' });
    document.querySelector('#add-set-form [name="value"]')?.focus({ preventScroll: true });
  },
  'edit-set': openSetEdit,
  'remove-set': id => updateDraft(draft => { draft.sets = draft.sets.filter(set => set.id !== id); }),
  'discard-draft': () => {
    const id = state.draft?.id;
    const editing = state.workouts.some(workout => workout.id === id);
    confirmAction(editing ? 'Discard edits?' : 'Discard workout draft?', 'Any unsaved changes to this draft will be removed.',
      editing ? 'Discard edits' : 'Discard draft', async () => {
        await update(current => { if (current.draft?.id === id) current.draft = null; }, false);
        dialog.close();
        navigate(editing ? 'history' : 'today');
        notify('Draft discarded.');
      });
  },
  'finish-workout': finishWorkout,
  'start-rest': id => {
    const seconds = Number(id === 'custom' ? document.querySelector('#rest-custom').value : id);
    if (!Number.isInteger(seconds) || seconds < 1 || seconds > 3600) throw new Error('Enter rest seconds from 1 to 3600.');
    timer = { mode: 'rest', started: Date.now(), end: Date.now() + seconds * 1000 };
    syncTimer();
  },
  'start-hold': () => { lastHold = 0; timer = { mode: 'hold', started: Date.now(), end: 0 }; syncTimer(); },
  'stop-timer': stopTimer,
  'use-hold': (_, control) => useHold(control),
  routines: showRoutines,
  'routine-form': routineForm,
  'use-routine': id => {
    const routine = [...STARTER_ROUTINES, ...state.routines].find(item => item.id === id);
    if (routine) return startWorkout({ routine });
  },
  'add-routine-row': () => {
    const rows = dialog.querySelector('#routine-rows');
    if (rows.children.length >= 30) throw new Error('A routine can contain up to 30 exercises.');
    rows.insertAdjacentHTML('beforeend', routineRow());
    rows.lastElementChild.querySelector('select').focus();
  },
  'remove-routine-row': (_, control) => {
    const row = control.closest('.routine-row');
    if (row.parentElement.children.length === 1) throw new Error('Keep at least one exercise in the routine.');
    row.remove();
  },
  'delete-routine': id => confirmAction('Delete this routine?', 'The routine will be removed from your saved routines.', 'Delete routine',
    async () => { await update(current => removeRecord(current, 'routines', id)); showRoutines(); notify('Routine deleted.'); }),
  'add-path': id => {
    const paths = dialog.querySelector('#prereq-paths');
    if (paths.children.length >= 5) throw new Error('Use up to five alternate paths.');
    paths.insertAdjacentHTML('beforeend', prereqPath([''], id));
    paths.lastElementChild.querySelector('select').focus();
  },
  'add-prereq': (id, control) => {
    const fields = control.closest('[data-prereq-path]').querySelector('[data-prereq-fields]');
    if (fields.children.length >= 10) throw new Error('Use up to ten prerequisites in one path.');
    fields.insertAdjacentHTML('beforeend', prereqField('', id));
    fields.lastElementChild.querySelector('select').focus();
  },
  'remove-path': (_, control) => control.closest('[data-prereq-path]').remove(),
  'workout-detail': id => {
    const workout = state.workouts.find(item => item.id === id);
    if (workout) showDialog(workout.name, workoutDetails(context, workout));
  },
  'delete-workout': id => confirmAction('Delete this workout?', 'Its sets, records, and XP will be recalculated from your remaining workouts.',
    'Delete workout', async () => {
      await update(current => {
        removeRecord(current, 'workouts', id);
        if (current.draft?.id === id) current.draft = null;
      });
      dialog.close();
      notify('Workout deleted.');
    }),
  'reward-form': rewardForm,
  'delete-reward': id => confirmAction('Delete this reward?', 'The reward will be removed from your list.',
    'Delete reward', async () => {
      await update(current => removeRecord(current, 'rewards', id));
      dialog.close();
      notify('Reward deleted.');
    }),
  redeem: id => {
    const reward = state.rewards.find(item => item.id === id);
    if (!reward) return;
    confirmAction('Redeem ' + reward.name + '?', 'This uses ' + reward.cost + ' of your reward points.',
      'Redeem reward', async () => {
        await update(current => {
          const item = current.rewards.find(record => record.id === id);
          if (!item || item.cost !== reward.cost) throw new Error('This reward changed. Open it again to see the current cost.');
          if (progressFor(current).points < item.cost) throw new Error('You need more points for this reward.');
          current.redemptions.push({ id: createId(), rewardId: id, name: item.name,
            cost: item.cost, date: dayKey(), updatedAt: Date.now() });
        });
        dialog.close();
        notify('Redeemed ' + reward.name + '.');
      }, 'primary');
  },
};

const forms = {
  confirm: async () => { await pendingConfirmation?.(); },
  target: async (form, data) => {
    const id = form.dataset.id;
    await update(current => { current.targets[id] = { value: Number(data.get('target')), updatedAt: Date.now() }; });
    openSkill(id);
    notify('Mastery target saved.');
  },
  'add-set': async (form, data) => {
    const skillId = data.get('exercise');
    const set = setFromForm(form, skillId);
    await updateDraft(draft => {
      if (draft.sets.length >= 500) throw new Error('Finish this workout before logging more than 500 sets.');
      draft.sets.push(set);
      if (draft.sets.length === 1 && draft.name === 'Workout') {
        const count = state.workouts.filter(workout => workout.date === draft.date).length;
        if (count) draft.name = 'Workout ' + (count + 1);
      }
    });
    document.querySelector('#add-set-form [name="value"]')?.focus({ preventScroll: true });
    notify('Set added.');
  },
  'edit-set': async form => {
    const existing = state.draft?.sets.find(set => set.id === form.dataset.id);
    if (!existing) throw new Error('This set is no longer in the draft.');
    const set = setFromForm(form, existing.skillId, existing.id);
    await updateDraft(draft => {
      const index = draft.sets.findIndex(item => item.id === set.id);
      if (index < 0) throw new Error('This set is no longer in the draft.');
      draft.sets[index] = set;
    });
    dialog.close();
    notify('Set updated.');
  },
  routine: async (form, data) => {
    const ids = data.getAll('routine-skill');
    const sets = data.getAll('routine-sets');
    const entries = ids.map((skillId, index) => ({ skillId, sets: Number(sets[index]) }));
    if (ids.length !== new Set(ids).size) throw new Error('Combine repeated exercises into one routine entry.');
    const routine = { id: form.dataset.id || createId(), name: data.get('name').trim(), entries, updatedAt: Date.now() };
    await update(current => { putRecord(current, 'routines', routine); return validateState(current); });
    showRoutines();
    notify('Routine saved.');
  },
  custom: async (form, data) => {
    const category = data.get('category');
    const id = form.dataset.id || createId();
    const prereqs = Array.from(form.querySelectorAll('[data-prereq-path]'), path =>
      [...new Set(Array.from(path.querySelectorAll('select'), select => select.value).filter(Boolean))]).filter(path => path.length);
    const customSkill = {
      id, track: 'custom-' + category, category, name: data.get('name').trim(),
      tier: Number(data.get('tier')), metric: data.get('metric'), target: Number(data.get('target')),
      gear: data.getAll('gear'), each: data.has('each'), weighted: data.has('weighted'), assisted: data.has('assisted'),
      description: data.get('description').trim(), cues: data.get('cues').trim(),
      mistakes: data.get('mistakes').trim(), url: data.get('url').trim(), source: data.get('source').trim(),
      prereqs, updatedAt: Date.now(),
    };
    if (!customSkill.gear.length) throw new Error('Select at least one equipment option.');
    if (!isSafeUrl(customSkill.url)) throw new Error('Enter an HTTPS tutorial link.');
    await update(current => {
      const existing = current.customSkills.find(skill => skill.id === id);
      const logged = current.workouts.some(workout => workout.sets.some(set => set.skillId === id))
        || current.draft?.sets.some(set => set.skillId === id);
      if (existing && logged && existing.metric !== customSkill.metric) {
        throw new Error('Create a new variation to change the metric for a skill that has logged sets.');
      }
      putRecord(current, 'customSkills', customSkill);
      if (current.targets[id]) current.targets[id] = { value: customSkill.target, updatedAt: Date.now() };
      return validateState(current);
    });
    openSkill(id);
    notify('Custom skill saved.');
  },
  reward: async (form, data) => {
    const reward = { id: form.dataset.id || createId(), name: data.get('name').trim(),
      cost: Number(data.get('cost')), updatedAt: Date.now() };
    await update(current => { putRecord(current, 'rewards', reward); return validateState(current); });
    dialog.close();
    notify('Reward saved.');
  },
  preferences: async (_, data) => {
    const fields = route === 'log' && document.querySelector('#session-meta')?.checkValidity() ? sessionFields() : null;
    const draftId = state.draft?.id;
    await update(current => {
      if (fields && current.draft?.id === draftId) Object.assign(current.draft, fields);
      current.prefs = { unit: data.get('unit'), weeklyWorkouts: Number(data.get('weekly')), updatedAt: Date.now() };
      return validateState(current);
    });
    showSettings();
    notify('Preferences saved.');
  },
  import: async (_, data) => {
    const file = data.get('backup');
    if (!file.size || file.size > 24 * 1024 * 1024) throw new Error('Choose an Ascent JSON backup under 24 MB.');
    const incoming = readBackup(await file.text());
    const finish = async (replace = false) => {
      await update(current => replace ? incoming : mergeBackup(current, incoming));
      logSkill = selectDefaultExercise();
      dialog.close();
      render();
      notify(replace ? 'Backup restored.' : 'Backup merged.');
    };
    if (data.get('mode') === 'restore') {
      confirmAction('Restore this backup?', 'This will replace the workouts, skills, routines, rewards, and settings in this browser.',
        'Restore backup', () => finish(true));
    } else await finish();
  },
};

async function safely(job) {
  if (busy) return;
  busy = true;
  try {
    const error = dialog.querySelector('.form-error');
    if (error) error.hidden = true;
    await job();
  } catch (error) {
    report(error);
  } finally {
    busy = false;
  }
}

document.addEventListener('click', event => {
  if (!state) return;
  const link = event.target.closest('[data-route]');
  if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    navigate(link.dataset.route);
    return;
  }
  const control = event.target.closest('[data-action]');
  if (control && !control.disabled && actions[control.dataset.action]) {
    void safely(() => actions[control.dataset.action](control.dataset.id ?? '', control));
  }
});

document.addEventListener('submit', event => {
  const form = event.target;
  event.preventDefault();
  if (forms[form.dataset.form]) {
    const values = new FormData(form);
    void safely(() => forms[form.dataset.form](form, values));
  }
});

document.addEventListener('input', event => {
  if (event.target.id === 'skill-search') {
    filters.query = event.target.value;
    renderTreeResults();
  }
});

document.addEventListener('change', event => {
  const element = event.target;
  if (element.id === 'gear-filter' || element.id === 'tier-filter') {
    filters[element.id === 'gear-filter' ? 'gear' : 'tier'] = element.value;
    renderTreeResults();
  } else if (element.id === 'exercise-select') chooseExercise(element.value);
  else if (element.closest('#session-meta') && element.form.checkValidity()) {
    // Track field edits only on change so typing and focus stay stable.
    const draftId = state.draft?.id;
    let fields;
    try { fields = sessionFields(); } catch { return; }
    readback = readback.then(() => update(current => {
      if (current.draft?.id === draftId && current.draft) {
        current.draft = { ...current.draft, ...fields, updatedAt: Date.now() };
      }
    }, false)).catch(report);
  }
});

document.addEventListener('toggle', event => {
  const details = event.target;
  if (details.dataset?.track && !filters.query.trim() && !filters.gear && !filters.tier) {
    filters.openTracks.set(details.dataset.track, details.open);
  }
}, true);

dialog.addEventListener('close', () => {
  pendingConfirmation = undefined;
  if (dialogOpener?.isConnected) dialogOpener.focus({ preventScroll: true });
});

window.addEventListener('hashchange', () => {
  if (!state || location.hash === '#main') return;
  route = getRoute();
  if (route === 'log' && !logSkill) logSkill = selectDefaultExercise();
  render();
});

if (listeners) listeners.onmessage = async () => {
  try {
    state = await readState();
    if (route === 'log' && document.activeElement?.closest('form')) refreshContext();
    else render();
  } catch (error) { report(error); }
};

try {
  state = await readState();
  logSkill = selectDefaultExercise();
  render();
  setInterval(syncTimer, 250);
  window.addEventListener('focus', () => {
    if (route === 'today' || route === 'history') render();
  });
} catch (error) {
  main.innerHTML = `<section class="panel notice stack"><h2>Browser storage is unavailable</h2>
    <p>Open Ascent in a regular browser tab and reload to access your local log.</p>
    <small class="muted">${safe(error?.message)}</small></section>`;
}
