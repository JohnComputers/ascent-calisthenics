import { CATEGORIES, DIFFICULTIES, STARTER_ROUTINES } from './catalog.js';
import { addDays, dateLabel, dayKey, fromKg, targetFor, weekStart } from './store.js?v=3';

export const safe = value => String(value ?? '').replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const format = number => new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(number);
const plural = (count, singular, many = singular + 's') => format(count) + ' ' + (count === 1 ? singular : many);
const categoryById = new Map(CATEGORIES.map(category => [category.id, category]));
export const unitName = skill => skill.metric === 'seconds' ? 'seconds' : 'reps';

export function button(label, action, id = '', style = '', extra = '') {
  return `<button class="btn ${style}" type="button" data-action="${action}" data-id="${safe(id)}" ${extra}>${safe(label)}</button>`;
}

export function field(label, markup, wide = false) {
  return `<label class="field${wide ? ' full' : ''}"><span>${safe(label)}</span>${markup}</label>`;
}

export function option(value, name, selected) {
  return `<option value="${safe(value)}"${String(value) === String(selected) ? ' selected' : ''}>${safe(name)}</option>`;
}

export function meter(value, goal, label, color = 'var(--accent)') {
  const percent = Math.max(0, Math.min(100, 100 * value / (goal || 1)));
  return `<span class="meter" role="progressbar" aria-label="${safe(label)}" aria-valuemin="0" aria-valuemax="100"
    aria-valuenow="${Math.round(percent)}" style="--progress:${percent}%; --fill:${color}"><span></span></span>`;
}

function statusTag(status) {
  return `<span class="status ${status}">${status[0].toUpperCase() + status.slice(1)}</span>`;
}

function categoryIcon(category) {
  return `<span class="category-icon" aria-hidden="true" style="--category:${category.color}">${category.icon}</span>`;
}

function empty(message) {
  return `<p class="empty-copy">${safe(message)}</p>`;
}

const routeTitles = {
  today: 'Today', tree: 'Skill tree', history: 'History', rewards: 'Rewards', log: 'Workout log',
};

export function topbar(route, context) {
  const { state, skills, progress } = context;
  const captions = {
    today: dateLabel(dayKey(), { weekday: 'long', month: 'long', day: 'numeric' }),
    tree: `${progress.mastered.size} of ${skills.length} skills mastered`,
    history: plural(state.workouts.length, 'workout') + ' logged',
    rewards: 'Level ' + progress.level + ' · ' + format(progress.xp) + ' XP',
    log: state.draft ? 'Draft saved to this device' : 'Log a workout to track your progress',
  };
  return `<div class="topbar-label">
    <h1><span class="brand-icon mobile-brand" aria-hidden="true"></span>${routeTitles[route]}</h1>
    <p>${captions[route]}</p>
  </div>
  <div class="topbar-actions">
    ${route === 'today' || route === 'log' ? '' : button(state.draft ? 'Resume log' : '+ Log workout', 'start-workout', '', 'primary')}
    ${button('⚙', 'settings', '', 'icon-button mobile-settings', 'aria-label="Data &amp; settings" title="Data &amp; settings"')}
  </div>`;
}

export function railLevel(progress) {
  return `<div class="rail-level"><div class="split">
    <strong>Level ${String(progress.level).padStart(2, '0')}</strong>
    <span class="muted">${progress.xp % 100} / 100 XP</span></div>
    ${meter(progress.xp % 100, 100, 'XP toward next level')}
  </div>`;
}

export function todayView({ state, skills, progress }) {
  const questList = [
    { name: 'Complete your workouts', count: progress.weekly.workouts, goal: state.prefs.weeklyWorkouts },
    { name: 'Log working sets', count: progress.weekly.sets, goal: 12 },
    { name: 'Train different skill paths', count: progress.weeklyCategories.size, goal: 3 },
  ];
  const quests = questList.map(({ name, count, goal }) => `<div class="hr-row">
    <div class="split"><span class="quest-name">${count >= goal ? '<span class="accent" aria-hidden="true">✓ </span>' : ''}${name}</span>
      <span class="quest-count">${Math.min(count, goal)} / ${goal}${count >= goal ? '<span class="sr-only"> complete</span>' : ''}</span></div>
    ${meter(count, goal, name)}
  </div>`).join('');
  const categories = CATEGORIES.map(category => {
    const matches = skills.filter(skill => skill.category === category.id);
    const mastered = matches.filter(skill => progress.mastered.has(skill.id)).length;
    return `<button type="button" class="category-card" data-action="category" data-id="${category.id}" style="--category:${category.color}">
      ${categoryIcon(category)}<span><strong>${category.name}</strong><small>${mastered} / ${matches.length} mastered</small></span>
      ${meter(mastered, matches.length, category.name + ' mastery', category.color)}
    </button>`;
  }).join('');
  const suggested = progress.suggested;
  const unlock = suggested && skills.find(skill => progress.statuses.get(skill.id) === 'locked'
    && skill.prereqs.some(path => path.includes(suggested.id)
      && path.every(id => id === suggested.id || progress.mastered.has(id))));
  const nextBest = suggested ? progress.records.get(suggested.id)?.qualityBest ?? 0 : 0;
  const initial = state.workouts.length === 0;
  const heroLabel = state.draft ? 'Workout in progress' : 'Today’s training';
  const title = state.draft ? safe(state.draft.name) : initial ? 'Start your first<br>workout.' : 'Ready for your<br>next workout?';
  const heroText = state.draft ? plural(state.draft.sets.length, 'set') + ' in your draft.' :
    'Pick a routine or log a workout one set at a time.';
  return `<div class="stack lg">
    <section class="hero" aria-label="Today’s training"><div class="hero-content">
      <p class="eyebrow">${heroLabel}</p>
      <h2>${title}</h2>
      <p>${heroText}</p>
      <div class="actions">
        ${button(state.draft ? 'Resume workout' : 'Start workout', 'start-workout', '', 'primary')}
        ${button('Routines', 'routines', '', 'secondary')}
      </div>
    </div></section>
    <section class="metrics" aria-label="Progress summary">
      <div class="panel metric"><div class="metric-label"><span aria-hidden="true">✧</span>Training level</div>
        <strong>${String(progress.level).padStart(2, '0')}</strong><small>${format(progress.xp)} total XP</small>
        ${meter(progress.xp % 100, 100, 'XP toward next level')}</div>
      <div class="panel metric"><div class="metric-label"><span aria-hidden="true">◷</span>Workouts</div>
        <strong>${progress.weekly.workouts}<small class="sr-only"> this week</small></strong>
        <small>${state.prefs.weeklyWorkouts} weekly goal</small></div>
      <div class="panel metric"><div class="metric-label"><span aria-hidden="true">◇</span>Skills mastered</div>
        <strong>${progress.mastered.size}</strong><small>${skills.length} skills in the tree</small></div>
      <div class="panel metric"><div class="metric-label"><span aria-hidden="true">◈</span>Reward points</div>
        <strong>${format(progress.points)}</strong><small>Available to redeem</small></div>
    </section>
    <div class="today-grid">
      <section class="panel">
        <div class="section-title"><h2>Skill paths</h2><a class="btn quiet small-btn" href="#tree" data-route="tree">View tree</a></div>
        <div class="category-grid">${categories}</div>
      </section>
      <div class="stack">
        <section class="panel"><div class="section-title"><h2>Weekly quests</h2><small class="muted">Mon–Sun</small></div>
          <div class="hr-list">${quests}</div></section>
        ${suggested ? `<section class="panel stack">
          <div class="split wrap"><div><p class="eyebrow">${unlock ? 'Next unlock' : 'Suggested skill'}</p>
            <h3>${safe(unlock?.name ?? suggested.name)}</h3></div>
            ${button('View skill', 'skill', suggested.id, 'quiet small-btn')}</div>
          <div><p class="muted"><small>${unlock ? safe(suggested.name) + ' · ' : ''}${format(nextBest)} / ${targetFor(suggested, state)} ${unitName(suggested)}</small></p>
            ${meter(nextBest, targetFor(suggested, state), 'Progress toward ' + (unlock?.name ?? suggested.name))}</div>
        </section>` : ''}
      </div>
    </div>
  </div>`;
}

export function formatSet(skill, set, unit) {
  const value = skill.metric === 'seconds' ? format(set.value) + ' s' : plural(set.value, 'rep');
  const side = skill.each || set.side === 'left' || set.side === 'right'
    ? (set.side === 'each' ? 'each side' : set.side) : '';
  return [value, side, set.loadKg > 0 && '+' + fromKg(set.loadKg, unit) + ' ' + unit,
    set.assistKg > 0 && fromKg(set.assistKg, unit) + ' ' + unit + ' assist', set.assistance,
    set.effort != null && 'RPE ' + set.effort, set.tempo && 'tempo ' + set.tempo,
    set.rest != null && set.rest + ' s rest'].filter(Boolean).join(' · ');
}

function trendBars(entries, label) {
  const max = Math.max(1, ...entries.map(entry => entry.value));
  return `<div class="trend" role="list" aria-label="${label}">${entries.map(entry => `<div class="trend-col" role="listitem"
    aria-label="${safe(entry.label)} · ${entry.value}">
    <span aria-hidden="true">${format(entry.value)}</span>
    <div class="trend-gutter" aria-hidden="true"><div class="trend-bar" style="--height:${100 * entry.value / max}%"></div></div>
    <span aria-hidden="true">${safe(entry.short ?? entry.label)}</span></div>`).join('')}</div>`;
}

export function skillDetails({ state, skills, progress }, skill) {
  const record = progress.records.get(skill.id);
  const best = record?.qualityBest ?? 0;
  const target = targetFor(skill, state);
  const metric = unitName(skill);
  const status = progress.statuses.get(skill.id);
  const manual = state.manualMastery?.[skill.id]?.mastered === true;
  const cat = categoryById.get(skill.category);
  const next = skills.filter(candidate => candidate.prereqs.some(path => path.includes(skill.id)));
  const skillButton = id => button(progress.byId.get(id)?.name ?? id, 'skill', id, 'quiet small-btn');
  const setsByDay = new Map();
  for (const workout of state.workouts) {
    for (const set of workout.sets) {
      if (set.skillId === skill.id) setsByDay.set(workout.date, Math.max(setsByDay.get(workout.date) ?? 0, set.value));
    }
  }
  const series = [...setsByDay].sort(([a], [b]) => a.localeCompare(b)).slice(-8)
    .map(([date, value]) => ({ label: dateLabel(date), short: date.slice(-2), value }));

  const masteryAction = manual ? button('Undo manual mastery', 'undo-mastery', skill.id, 'quiet') :
    status === 'mastered' ? '' : button('Mark mastered', 'mark-mastered', skill.id, 'primary');
  return `<div class="split wrap">
    <div class="pills">${statusTag(status)}<span class="tag">${cat.name}</span>
      <span class="tag">${DIFFICULTIES[skill.tier - 1]}</span>${skill.gear.map(gear => `<span class="tag">${safe(gear)}</span>`).join('')}</div>
    ${masteryAction}
  </div>
  <p>${safe(skill.description)}</p>
  <div class="skill-note"><strong>Form cue</strong><p>${safe(skill.cues)}</p></div>
  <div class="skill-note"><strong>Common mistake</strong><p>${safe(skill.mistakes)}</p></div>
  <div class="actions">
    ${button('Log this skill', 'log-skill', skill.id, 'quiet')}
    <a class="btn quiet" href="${safe(skill.url)}" target="_blank" rel="noopener noreferrer">Tutorial · ${safe(skill.source)}</a>
    ${button('Show on map', 'tree-locate', skill.id, 'quiet')}
    ${skill.track.startsWith('custom-') ? button('Edit skill', 'custom-skill', skill.id, 'quiet') : ''}
  </div>
  <section class="panel stack">
    <div><div class="split wrap"><h3>Logged progress</h3><strong class="accent">${format(best)} / ${target} ${metric}</strong></div>
      ${meter(best, target, 'Logged progress toward target')}
      ${skill.each && record ? `<p class="muted"><small>Left ${format(record.left)} · Right ${format(record.right)} ${metric}</small></p>` : ''}
      ${skill.weighted ? '<p class="muted"><small>The target counts sets with added weight.</small></p>' : ''}
      ${record ? `<p class="muted"><small>Best logged ${format(record.best)} ${metric} · ${plural(record.count, 'set')}</small></p>` : ''}</div>
    <form class="split start" data-form="target" data-id="${safe(skill.id)}">
      ${field('Target (' + metric + ')', `<input name="target" type="number" inputmode="numeric" min="1" max="86400" step="1" value="${target}" required>`)}
      <button class="btn" type="submit">Save target</button>
    </form>
    ${series.length ? trendBars(series, 'Best value by training day') : ''}
  </section>
  ${skill.prereqs.length || next.length ? `<section class="panel related">
    ${skill.prereqs.length ? `<h3>Prerequisites</h3>${skill.prereqs.map((path, index) =>
      `<div>${skill.prereqs.length > 1 ? `<p class="related-label">${index === 0 ? 'Path 1' : 'Or path ' + (index + 1)}</p>` : ''}
        <div class="actions">${path.map(skillButton).join('<span class="muted" aria-label="and">+</span>')}</div></div>`).join('')}` : ''}
    ${next.length ? `<h3>Leads to</h3><div class="actions">${next.map(skill => skillButton(skill.id)).join('')}</div>` : ''}
  </section>` : ''}`;
}

export function skillOptions(skills, selected = '', excluded = '') {
  return option('', 'Choose an exercise', selected) + CATEGORIES.map(category => {
    const matching = skills.filter(skill => skill.category === category.id && skill.id !== excluded);
    return `<optgroup label="${category.name}">${matching.map(skill => option(skill.id, skill.name, selected)).join('')}</optgroup>`;
  }).join('');
}

export function setFields(skill, set, unit) {
  if (!skill) return '<p class="selected-note">Choose an exercise to enter your first set.</p>';
  const data = set ?? {};
  const seconds = skill.metric === 'seconds';
  const metric = field(seconds ? 'Hold seconds' : 'Reps', `<input name="value" type="number" inputmode="${seconds ? 'decimal' : 'numeric'}"
    min="${seconds ? '0.1' : '1'}" max="86400" step="${seconds ? '0.1' : '1'}" value="${safe(data.value)}" required>`);
  const side = field('Side', `<select name="side">
    ${(skill.each ? [['each', 'Each side'], ['left', 'Left'], ['right', 'Right']] :
      [['both', 'Both'], ['left', 'Left'], ['right', 'Right']])
    .map(([value, label]) => option(value, label, data.side)).join('')}
  </select>`);
  const load = field('Added weight (' + unit + ')', `<input name="load" type="number" inputmode="decimal" min="0"
    max="2000" step="0.01" value="${fromKg(data.loadKg, unit)}"${skill.weighted ? ' required' : ''}>`);
  const isOpen = ['loadKg', 'assistKg', 'assistance', 'effort', 'rest', 'tempo', 'notes']
    .some(key => data[key] !== '' && data[key] != null);
  return `<div class="metric-input">${metric}${skill.each ? side : seconds ?
    button('Use hold time', 'use-hold', '', 'quiet small-btn') : ''}</div>
  ${skill.weighted ? load : ''}
  <details class="disclosure" ${isOpen ? 'open' : ''}>
    <summary>Set details</summary>
    <div class="form-grid">
      ${skill.weighted ? '' : load}
      ${field('Assistance (' + unit + ')', `<input name="assistanceKg" type="number" inputmode="decimal" min="0" max="2000" step="0.01" value="${fromKg(data.assistKg, unit)}">`)}
      ${field('Assistance setup', `<input name="assistance" type="text" maxlength="100" placeholder="e.g. blue band" value="${safe(data.assistance)}">`)}
      ${skill.each ? '' : side}
      ${field('Effort (RPE 0–10)', `<input name="effort" type="number" inputmode="decimal" min="0" max="10" step="0.5" value="${safe(data.effort)}">`)}
      ${field('Rest seconds', `<input name="rest" type="number" inputmode="numeric" min="0" max="86400" step="1" value="${safe(data.rest)}">`)}
      ${field('Tempo', `<input name="tempo" type="text" maxlength="50" placeholder="e.g. 3-1-1" value="${safe(data.tempo)}">`)}
      ${field('Set note', `<input name="notes" type="text" maxlength="400" value="${safe(data.notes)}">`, true)}
    </div>
  </details>`;
}

export function logView({ state, skills, progress }, selected) {
  const draft = state.draft;
  if (!draft) return `<section class="panel notice stack"><h2>Start a workout</h2>
    <div class="actions">${button('Start workout', 'start-workout', '', 'primary')}${button('Routines', 'routines', '', 'quiet')}</div></section>`;
  const { unit } = state.prefs;
  const existing = state.workouts.some(workout => workout.id === draft.id);
  const routine = [...STARTER_ROUTINES, ...state.routines].find(item => item.id === draft.routine);
  const skill = progress.byId.get(selected);
  const last = draft.sets.findLast(set => set.skillId === selected) ?? progress.recentSets.get(selected);
  const sets = draft.sets.map((set, index) => {
    const exercise = progress.byId.get(set.skillId);
    if (!exercise) return '';
    return `<article class="set-row"><div><h3>${index + 1}. ${safe(exercise.name)}</h3>
      <p>${safe(formatSet(exercise, set, unit))}</p></div><div class="set-actions">
      ${button('Edit', 'edit-set', set.id, 'quiet', `aria-label="Edit set ${index + 1}"`)}
      ${button('×', 'remove-set', set.id, 'quiet icon-button', `aria-label="Remove set ${index + 1}"`)}
    </div></article>`;
  }).join('');
  return `<div class="stack">
    <section class="panel stack">
      <div class="split wrap"><h2>${existing ? 'Edit workout' : 'Workout details'}</h2>
        ${button(existing ? 'Cancel edits' : 'Discard draft', 'discard-draft', '', 'quiet small-btn')}</div>
      <form id="session-meta" class="form-grid">
        ${field('Workout name', `<input name="name" type="text" maxlength="100" value="${safe(draft.name)}" required>`)}
        ${field('Date', `<input name="date" type="date" value="${safe(draft.date)}" required>`)}
        ${field('Bodyweight (' + unit + ')', `<input name="bodyweight" type="number" inputmode="decimal" min="0" max="2000" step="0.01" value="${fromKg(draft.bodyKg, unit)}">`)}
        ${field('Duration (minutes)', `<input name="duration" type="number" inputmode="numeric" min="0" max="1440" step="1" value="${safe(draft.duration)}" placeholder="Auto for new workouts">`)}
        ${field('Workout notes', `<textarea name="notes" rows="2" maxlength="2000" placeholder="How did the session feel?">${safe(draft.notes)}</textarea>`, true)}
      </form>
      ${routine ? `<div class="stack"><h3>${safe(routine.name)} routine</h3><div class="routine-plan">
        ${routine.entries.map(entry => {
          const logged = draft.sets.filter(set => set.skillId === entry.skillId).length;
          return button((progress.byId.get(entry.skillId)?.name ?? 'Exercise') + ' · ' + logged + '/' + entry.sets,
            'select-exercise', entry.skillId, 'quiet');
        }).join('')}</div></div>` : ''}
    </section>
    <div class="log-grid">
      <div class="stack log-section">
        <section class="panel stack log-sheet" id="add-set-panel">
          <div class="section-title"><h2>Log a set</h2></div>
          <form class="stack" id="add-set-form" data-form="add-set">
            ${field('Exercise', `<select name="exercise" id="exercise-select" required>${skillOptions(skills, selected)}</select>`)}
            <div class="stack" id="set-fields">${setFields(skill, last, unit)}</div>
            <p id="previous-set" class="selected-note" ${last && skill ? '' : 'hidden'}>${last && skill ? 'Previous set loaded · ' + safe(formatSet(skill, last, unit)) : ''}</p>
            <div class="actions"><button type="submit" class="btn primary" ${skill ? '' : 'disabled'}>Add set</button>
              ${button('Routines', 'routines', '', 'quiet')}</div>
          </form>
        </section>
        <section class="panel timer" aria-label="Workout timers">
          <div class="split"><h2>Timers</h2><span class="timer-status" id="timer-status">Rest or hold</span></div>
          <div class="timer-readout" id="timer-display">00:00</div>
          <div class="actions">
            ${button('30 s rest', 'start-rest', 30, 'quiet small-btn')}
            ${button('60 s rest', 'start-rest', 60, 'quiet small-btn')}
            ${button('90 s rest', 'start-rest', 90, 'quiet small-btn')}
          </div>
          <div class="actions">
            <input id="rest-custom" type="number" inputmode="numeric" min="1" max="3600" step="1" aria-label="Custom rest seconds" placeholder="Seconds">
            ${button('Custom rest', 'start-rest', 'custom', 'quiet small-btn')}
          </div>
          <div class="actions">
            ${button('Start hold', 'start-hold', '', 'quiet small-btn')}
            ${button('Stop timer', 'stop-timer', '', 'quiet small-btn', 'id="stop-timer" disabled')}
            ${button('Use hold', 'use-hold', '', 'quiet small-btn', 'id="timer-use" disabled')}
          </div>
        </section>
      </div>
      <section class="panel stack">
        <div class="split"><h2>Logged sets</h2><span class="tag">${draft.sets.length}</span></div>
        <div class="set-list">${sets || empty('Your sets will appear here as you log them.')}</div>
        <div class="actions">${button(existing ? 'Save changes' : 'Finish workout', 'finish-workout', '', 'primary',
          draft.sets.length ? '' : 'disabled')}</div>
      </section>
    </div>
  </div>`;
}

export function historyView({ state, progress }) {
  const workouts = [...state.workouts].sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt - a.updatedAt);
  const unit = state.prefs.unit;
  const now = new Date();
  const monday = weekStart(now);
  const week = Array.from({ length: 7 }, (_, index) => addDays(monday, index));
  const days = week.map(date => {
    const key = dayKey(date);
    return `<div class="week-cell ${progress.days.has(key) ? 'active' : ''}"
      title="${dateLabel(key)}${progress.days.has(key) ? ' · trained' : ''}">
      ${dateLabel(key, { weekday: 'short' })}<strong>${date.getDate()}</strong></div>`;
  }).join('');
  const trends = Array.from({ length: 8 }, (_, index) => {
    const start = dayKey(addDays(monday, (index - 7) * 7));
    const end = dayKey(addDays(monday, (index - 7) * 7 + 6));
    return { label: dateLabel(start), short: start.slice(-2), value: workouts.filter(workout => workout.date >= start && workout.date <= end).length };
  });
  const recent = workouts.map(workout => `<article class="list-row history-row">
    <div><h3>${safe(workout.name)}</h3><p>${dateLabel(workout.date, { month: 'short', day: 'numeric', year: 'numeric' })}
      · ${plural(workout.sets.length, 'set')}${workout.duration == null ? '' : ' · ' + workout.duration + ' min'}</p></div>
    <div class="set-actions">${button('View', 'workout-detail', workout.id, 'quiet small-btn')}
      ${button('Edit', 'edit-workout', workout.id, 'quiet small-btn')}</div></article>`).join('');
  const prs = [...progress.records].sort((a, b) => b[1].bestDate.localeCompare(a[1].bestDate));
  const bestSets = prs.map(([id, record]) => {
    const skill = progress.byId.get(id);
    return `<div class="hr-row split"><div><h3>${safe(skill.name)}</h3><p>
      ${format(record.best)} ${unitName(skill)}
      ${record.maxLoad == null ? '' : ' · +' + fromKg(record.maxLoad, unit) + ' ' + unit + ' best added load'}
      ${record.minAssist == null ? '' : ' · ' + fromKg(record.minAssist, unit) + ' ' + unit + ' least recorded assist'}
    </p></div>${button('View', 'skill', id, 'quiet small-btn', `aria-label="View ${safe(skill.name)}"`)}</div>`;
  }).join('');
  const weekTotals = [
    ['Workouts', format(progress.weekly.workouts)], ['Working sets', format(progress.weekly.sets)],
    ['Total reps', format(progress.weekly.reps)], ['Hold time', format(progress.weekly.seconds) + ' s'],
    ['Added-load volume', format(unit === 'lb' ? progress.weekly.addedKgReps * 2.2046226218 : progress.weekly.addedKgReps) + ' ' + unit + '·reps'],
  ];
  return `<div class="stack lg">
    <div class="history-columns">
      <section class="panel stack"><div class="split wrap"><h2>This week</h2>
        <span class="tag">${plural(progress.streak, 'day')} streak</span></div>
        <div class="week-grid" aria-label="Training days this week">${days}</div>
        <div class="week-totals">${weekTotals.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>
      </section>
      <section class="panel stack"><div><h2>Training frequency</h2><p class="muted"><small>Workouts per week · last 8 weeks</small></p></div>
        ${trendBars(trends, 'Weekly workouts')}</section>
    </div>
    <div class="history-columns">
      <section class="panel stack"><h2>Workout history</h2>
        <div class="set-list">${recent || empty('Finish a workout to see your history here.')}</div>
        ${workouts.length ? '' : `<div class="actions">${button('Log workout', 'start-workout', '', 'primary')}</div>`}</section>
      <section class="panel stack"><h2>Personal records</h2><div class="hr-list">
        ${bestSets || empty('Your best reps, holds, and added weight appear after you log sets.')}</div></section>
    </div>
  </div>`;
}

export function workoutDetails({ state, progress }, workout) {
  const unit = state.prefs.unit;
  const meta = [dateLabel(workout.date, { month: 'short', day: 'numeric', year: 'numeric' }),
    workout.duration != null && workout.duration + ' min',
    workout.bodyKg != null && fromKg(workout.bodyKg, unit) + ' ' + unit + ' bodyweight'].filter(Boolean).join(' · ');
  return `<p class="muted">${meta}</p>
    ${workout.notes ? `<p class="skill-note">${safe(workout.notes)}</p>` : ''}
    <div class="set-list">${workout.sets.map((set, index) => {
      const skill = progress.byId.get(set.skillId);
      return `<div class="set-row"><div><h3>${index + 1}. ${safe(skill.name)}</h3>
        <p>${safe(formatSet(skill, set, unit))}</p>${set.notes ? `<p>${safe(set.notes)}</p>` : ''}</div></div>`;
    }).join('')}</div>
    <div class="actions">
      ${button('Edit workout', 'edit-workout', workout.id, 'primary')}
      ${button('Delete workout', 'delete-workout', workout.id, 'danger')}
    </div>`;
}

export function rewardsView({ state, progress }) {
  const badges = [
    ['First workout', 'Finish a workout', state.workouts.length > 0],
    ['First mastery', 'Master one skill', progress.mastered.size > 0],
    ['5 personal records', 'Set a record in five skills', progress.records.size >= 5],
    ['10 personal records', 'Set a record in ten skills', progress.records.size >= 10],
    ['3-day streak', 'Log on three consecutive days', progress.streak >= 3],
    ['Level 5', 'Earn 400 XP', progress.level >= 5],
  ];
  const rewardCards = state.rewards.map(reward => `<article class="list-row history-row">
    <div><h3>${safe(reward.name)}</h3><p>${plural(reward.cost, 'point')}</p></div>
    <div class="set-actions">${button('Edit', 'reward-form', reward.id, 'quiet small-btn')}
      ${button('Redeem', 'redeem', reward.id, 'primary small-btn', reward.cost > progress.points ? 'disabled' : '')}</div>
    </article>`).join('');
  const redeemed = [...state.redemptions].sort((a, b) => b.updatedAt - a.updatedAt)
    .map(reward => `<div class="hr-row split"><div><h3>${safe(reward.name)}</h3><p>${dateLabel(reward.date)}</p></div>
      <span class="tag">−${format(reward.cost)} pts</span></div>`).join('');
  return `<div class="stack lg">
    <div class="reward-columns">
      <section class="panel stack"><div><p class="eyebrow">Available points</p><strong class="reward-balance">${format(progress.points)}</strong></div>
        <div class="reward-totals">
          <div><strong>${format(progress.earned)}</strong><small>Earned</small></div>
          <div><strong>${format(progress.spent)}</strong><small>Redeemed</small></div>
          <div><strong>${format(progress.xp)}</strong><small>Total XP</small></div>
        </div><p class="muted"><small>2 points per training day · 5 points per mastered skill</small></p>
      </section>
      <section class="panel stack"><div><div class="split"><h2>Level ${progress.level}</h2>
        <strong class="accent">${progress.xp % 100} / 100 XP</strong></div>${meter(progress.xp % 100, 100, 'XP toward next level')}</div>
        <p class="muted"><small>20 XP per training day · 50 XP per mastered skill</small></p>
        <div class="badge-list">${badges.map(([title, rule, earned]) => `<div class="badge ${earned ? 'earned' : ''}">
          <div class="badge-icon" aria-label="${earned ? 'Earned' : 'Locked'}">${earned ? '✦' : '◇'}</div>
          <h3>${title}</h3><p>${rule}</p></div>`).join('')}</div>
      </section>
    </div>
    <div class="reward-columns">
      <section class="panel stack"><div class="split wrap"><h2>My rewards</h2>${button('+ Add reward', 'reward-form', '', 'quiet')}</div>
        <div class="set-list">${rewardCards || empty('Add something you’d like to earn and set its point cost.')}</div></section>
      <section class="panel stack"><h2>Redemptions</h2><div class="hr-list">
        ${redeemed || empty('Rewards you redeem will show up here.')}</div></section>
    </div>
  </div>`;
}
