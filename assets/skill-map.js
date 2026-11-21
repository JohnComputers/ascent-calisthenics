import { CATEGORIES, DIFFICULTIES, EQUIPMENT, TRACKS } from './catalog.js';
import { targetFor } from './store.js?v=3';
import { button, field, format, meter, option, safe } from './views.js?v=3';

const categories = new Map(CATEGORIES.map(category => [category.id, category]));
const paths = [...TRACKS, ...CATEGORIES.map(category => ({
  id: 'custom-' + category.id, category: category.id, name: 'Custom ' + category.name.toLowerCase() + ' skills',
}))];
const OVERVIEW = 'overview';
const RADIUS = 23;
const intoRange = (value, min, max) => Math.min(max, Math.max(min, value));
const normalize = value => value.toLowerCase().replace(/[-–]/g, ' ').trim();

export function treeView(filters) {
  return `<div class="stack">
    <section class="panel map-controls" aria-label="Skill map controls">
      <div class="map-control-row">
        ${field('Find a skill', `<input id="skill-search" type="search" placeholder="Search pull-up, handstand…" value="${safe(filters.query)}">`)}
        ${field('Progression path', '<select id="tree-path"></select>')}
        ${button('+ Custom skill', 'custom-skill', '', 'quiet map-custom')}
      </div>
      <div class="map-filter-row">
        <div class="chips map-categories" role="group" aria-label="Movement category">
          ${[{ id: 'all', name: 'All skills' }, ...CATEGORIES].map(category =>
            `<button type="button" class="chip" data-action="tree-filter" data-id="${category.id}"
               aria-pressed="${filters.category === category.id}">${category.name}</button>`).join('')}
        </div>
        <details class="disclosure map-filter-more">
          <summary>Filters <span class="accent" data-map-filter-active aria-label="active" hidden>●</span></summary>
          <div class="panel map-filter-fields">
            ${field('Equipment', `<select id="gear-filter">${option('', 'All gear', filters.gear)}
               ${EQUIPMENT.map(gear => option(gear, gear, filters.gear)).join('')}</select>`)}
            ${field('Difficulty', `<select id="tier-filter">${option('', 'Any level', filters.tier)}
               ${DIFFICULTIES.map((tier, index) => option(index + 1, tier, filters.tier)).join('')}</select>`)}
          </div>
        </details>
      </div>
    </section>
    <div id="tree-results" class="stack"></div>
  </div>`;
}

export function treeSelection(skills, filters) {
  const query = normalize(filters.query);
  const terms = query.split(/\s+/).filter(Boolean);
  const matches = skills.filter(skill => (!filters.category || filters.category === 'all' || skill.category === filters.category)
    && (!filters.gear || skill.gear.includes(filters.gear)) && (!filters.tier || String(skill.tier) === filters.tier)
    && terms.every(term => normalize(skill.name + ' ' + skill.gear.join(' ')).includes(term)));
  if (terms.length) {
    function matchOrder(skill) {
      const title = normalize(skill.name);
      return title === query ? 0 : title.startsWith(query) ? 1 : title.includes(query) ? 2 : 3;
    }
    matches.sort((a, b) => matchOrder(a) - matchOrder(b) || a.tier - b.tier);
  }
  const matchingTracks = new Set(matches.map(skill => skill.track));
  const choices = paths.filter(path => matchingTracks.has(path.id));
  const overview = filters.path === OVERVIEW;
  const path = overview ? null : choices.find(path => path.id === filters.path) ??
    choices.find(path => path.id === matches[0]?.track) ?? null;
  return { matches, choices, overview, path, active: Boolean(query || filters.gear || filters.tier) };
}

function mapOptions(choices, selected) {
  const groups = CATEGORIES.map(category => {
    const options = choices.filter(path => path.category === category.id);
    return options.length ? `<optgroup label="${category.name}">${options.map(path =>
      option(path.id, path.name, selected)).join('')}</optgroup>` : '';
  }).join('');
  return option(OVERVIEW, 'All paths overview', selected) + groups;
}

function nodeForSkill(context, skill, reference) {
  const category = categories.get(skill.category);
  const status = context.progress.statuses.get(skill.id);
  const target = targetFor(skill, context.state);
  const best = context.progress.records.get(skill.id)?.qualityBest ?? 0;
  return {
    id: skill.id, name: skill.name, color: category.color, glyph: category.icon, status,
    completion: status === 'mastered' ? 1 : Math.min(1, best / target), reference, action: 'skill', prereqs: skill.prereqs,
  };
}

export function progressionGraph(context, path) {
  const pathSkills = context.skills.filter(skill => skill.track === path.id);
  const ownIds = new Set(pathSkills.map(skill => skill.id));
  const references = new Set();
  const edges = [];
  for (const skill of pathSkills) {
    for (const id of new Set(skill.prereqs.flat())) {
      if (!context.progress.byId.has(id)) continue;
      if (!ownIds.has(id)) references.add(id);
      edges.push({
        from: id, to: skill.id,
        alternate: skill.prereqs.some(group => !group.includes(id)),
      });
    }
  }
  const nodes = pathSkills.map(skill => nodeForSkill(context, skill, false));
  for (const id of references) nodes.push(nodeForSkill(context, context.progress.byId.get(id), true));
  return { kind: 'progression', nodes, edges };
}

function overviewGraph(matches, context) {
  const counts = new Map();
  for (const skill of matches) {
    const bucket = counts.get(skill.category) ?? { total: 0, mastered: 0 };
    bucket.total++;
    if (context.progress.mastered.has(skill.id)) bucket.mastered++;
    counts.set(skill.category, bucket);
  }
  const nodes = [{ id: OVERVIEW, name: 'Skill paths', color: '#d2f26e', glyph: '✧', status: 'overview',
    caption: matches.length + ' skills', completion: 0 }];
  for (const category of CATEGORIES) {
    const count = counts.get(category.id);
    if (!count) continue;
    nodes.push({
      id: category.id, name: category.name, color: category.color, glyph: category.icon, action: 'tree-filter',
      status: 'overview', completion: count.mastered / count.total, caption: count.mastered + ' / ' + count.total + ' mastered',
    });
  }
  return { kind: 'overview', nodes, edges: nodes.slice(1).map(node => ({ from: OVERVIEW, to: node.id })) };
}

export function mapLayout(graph, vertical) {
  if (graph.kind === 'overview') {
    const width = vertical ? 410 : 825;
    const height = vertical ? 540 : 460;
    const center = { x: width / 2, y: (height - 28) / 2 };
    return {
      width, height, radial: true,
      nodes: graph.nodes.map((node, index) => {
        const angle = -Math.PI / 2 + (index - 1) * 2 * Math.PI / (graph.nodes.length - 1);
        return { ...node,
          x: index ? center.x + Math.cos(angle) * (vertical ? 133 : 297) : center.x,
          y: index ? center.y + Math.sin(angle) * (vertical ? 169 : 149) : center.y,
        };
      }),
    };
  }

  const nodes = new Map(graph.nodes.map(node => [node.id, node]));
  const parents = new Map(graph.nodes.map(node => [node.id, []]));
  const children = new Map(graph.nodes.map(node => [node.id, []]));
  for (const { from, to } of graph.edges) {
    parents.get(to).push(from);
    children.get(from).push(to);
  }
  const ranks = new Map();
  function rank(id) {
    if (ranks.has(id)) return ranks.get(id);
    const parentsOfNode = parents.get(id);
    const level = parentsOfNode.length
      ? 1 + Math.max(...parentsOfNode.map(parent => nodes.get(parent).reference ? 0 : rank(parent))) : 0;
    ranks.set(id, level);
    return level;
  }
  for (const node of graph.nodes) if (!node.reference) rank(node.id);
  for (const node of graph.nodes) {
    if (node.reference) ranks.set(node.id, Math.min(...children.get(node.id).map(id => rank(id))) - 1);
  }
  const depth = Math.max(...ranks.values(), 0);
  const layers = Array.from({ length: depth + 1 }, () => []);
  for (const node of graph.nodes) layers[ranks.get(node.id)].push(node.id);

  // Order each layer by its linked neighbors so fewer branches cross.
  function sortLayers(order, neighbors) {
    const alignment = new Map();
    function position(index, total) { return total > 1 ? index / (total - 1) : 0.5; }
    for (const layer of layers) layer.forEach((id, index) => alignment.set(id, position(index, layer.length)));
    for (const index of order) {
      const scores = new Map(layers[index].map(id => {
        const links = neighbors.get(id);
        const mean = links.length ? links.reduce((sum, other) => sum + alignment.get(other), 0) / links.length : alignment.get(id);
        return [id, mean];
      }));
      layers[index].sort((a, b) => scores.get(a) - scores.get(b));
      layers[index].forEach((id, slot) => alignment.set(id, position(slot, layers[index].length)));
    }
  }
  const order = layers.map((_, index) => index);
  for (let pass = 0; pass < 2; pass++) {
    sortLayers(order, parents);
    sortLayers(order.slice().reverse(), children);
  }

  const widest = Math.max(1, ...layers.map(layer => layer.length));
  const alongStep = vertical ? 127 : 148;
  const crossStep = vertical ? 116 : 115;
  const alongStart = vertical ? 53 : 86;
  const crossStart = vertical ? 60 : 64;
  const alongSize = alongStart + depth * alongStep + (vertical ? 105 : 87);
  const crossSize = crossStart + (widest - 1) * crossStep + (vertical ? 60 : 100);
  return {
    width: vertical ? crossSize : alongSize, height: vertical ? alongSize : crossSize, radial: false,
    nodes: layers.flatMap((layer, level) => layer.map((id, index) => {
      const along = alongStart + level * alongStep;
      const cross = crossStart + ((widest - layer.length) / 2 + index) * crossStep;
      return { ...nodes.get(id), x: vertical ? cross : along, y: vertical ? along : cross };
    })),
  };
}

function nodeMarkup(node, active, matchIds, focused) {
  const selected = focused === node.id;
  const dimmed = active && !matchIds.has(node.id);
  const glyph = node.status === 'mastered' ? '✓' : node.status === 'locked' ? '' : node.glyph;
  const circle = `<span class="map-orbit" aria-hidden="true"><span class="map-orbit-core">
    ${node.status === 'locked' ? '<span class="map-lock"></span>' : glyph}
    </span></span><span class="map-node-label">${safe(node.name)}</span>`;
  const caption = node.reference ? 'Other path' : node.caption;
  const meta = caption ? `<small class="map-node-caption">${safe(caption)}</small>` : '';
  const attributes = `class="map-node${node.reference ? ' map-reference' : ''}${selected ? ' map-spotlight' : ''}${dimmed ? ' map-dimmed' : ''}"
    data-map-node="${safe(node.id)}" data-status="${node.status}"
    style="--node-x:${node.x}px;--node-y:${node.y}px;--node-color:${node.color};--node-progress:${node.completion * 100}%"`;
  const label = node.status === 'overview' ? node.name + (node.caption ? ', ' + node.caption : '') :
    node.name + ', ' + node.status + (node.reference ? ', prerequisite on another path' : '');
  if (!node.action) return `<div ${attributes}>${circle}${meta}</div>`;
  return `<button type="button" ${attributes} data-action="${node.action}" data-id="${safe(node.id)}"
    aria-label="${safe(label)}">${circle}${meta}</button>`;
}

function drawEdges(canvas, layout, edges, vertical, active) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const width = layout.width;
  const height = layout.height;
  const pixelRatio = Math.min(2, devicePixelRatio, 3950 / Math.max(width, height));
  const pixelWidth = Math.round(width * pixelRatio);
  const pixelHeight = Math.round(height * pixelRatio);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'round';
  const positions = new Map(layout.nodes.map(node => [node.id, node]));
  for (const edge of edges) {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    const linked = active === from.id || active === to.id;
    const mastered = from.status === 'mastered';
    ctx.strokeStyle = linked || layout.radial ? to.color : mastered ? '#a1bd66' : '#55647b';
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = linked ? 2.6 : 1.65;
    ctx.globalAlpha = linked ? 0.95 : layout.radial ? 0.48 : mastered ? 0.85 : 0.78;
    ctx.setLineDash(edge.alternate ? [5, 6] : []);
    ctx.beginPath();
    let endX;
    let endY;
    if (layout.radial) {
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      ctx.moveTo(from.x + Math.cos(angle) * RADIUS, from.y + Math.sin(angle) * RADIUS);
      ctx.lineTo(to.x - Math.cos(angle) * RADIUS, to.y - Math.sin(angle) * RADIUS);
    } else if (vertical) {
      const startY = from.y + RADIUS + 2;
      endY = to.y - RADIUS - 4;
      endX = to.x;
      const bend = (endY - startY) * 0.54;
      ctx.moveTo(from.x, startY);
      ctx.bezierCurveTo(from.x, startY + bend, endX, endY - bend, endX, endY);
    } else {
      const startX = from.x + RADIUS + 2;
      endX = to.x - RADIUS - 4;
      endY = to.y;
      const bend = (endX - startX) * 0.54;
      ctx.moveTo(startX, from.y);
      ctx.bezierCurveTo(startX + bend, from.y, endX - bend, endY, endX, endY);
    }
    ctx.stroke();
    if (!layout.radial) {
      const arrow = linked ? 5 : 3.6;
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      if (vertical) {
        ctx.lineTo(endX - arrow, endY - arrow * 1.5);
        ctx.lineTo(endX + arrow, endY - arrow * 1.5);
      } else {
        ctx.lineTo(endX - arrow * 1.5, endY - arrow);
        ctx.lineTo(endX - arrow * 1.5, endY + arrow);
      }
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function mountStage(root, graph, filters, active, matchIds, jumpTo) {
  const stage = root.querySelector('.map-stage');
  const world = stage.querySelector('.map-world');
  const nodes = world.querySelector('.map-nodes');
  const canvas = world.querySelector('canvas');
  const zoomLabel = root.querySelector('[data-map-scale]');
  const cameraCache = filters.cameras;
  const pointers = new Map();
  const events = new AbortController();
  const signal = events.signal;
  const pointer = event => {
    const rect = stage.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  let layout, vertical, key, camera, firstPoint, pinch;
  let dragged = false;
  let blockClicksUntil = 0;
  let highlighted = filters.focus;

  function paint(next) {
    const { clientWidth: width, clientHeight: height } = stage;
    const constrain = (offset, scaled, viewport) => scaled <= viewport
      ? (viewport - scaled) / 2 : intoRange(offset, viewport - scaled, 0);
    camera = {
      scale: next.scale,
      x: constrain(next.x, layout.width * next.scale, width),
      y: constrain(next.y, layout.height * next.scale, height),
    };
    world.style.transform = `translate3d(${camera.x}px,${camera.y}px,0) scale(${camera.scale})`;
    zoomLabel.textContent = Math.round(camera.scale * 100) + '%';
    cameraCache.set(key, camera);
  }

  function fitScale() {
    return Math.min((stage.clientWidth - 8) / layout.width, (stage.clientHeight - 8) / layout.height, 1.2);
  }

  function fit() {
    const scale = fitScale();
    paint({ scale, x: 0, y: 0 });
  }

  function reset() {
    if (layout.radial || fitScale() >= 0.85) {
      fit();
      return;
    }
    const scale = vertical
      ? intoRange((stage.clientWidth - 10) / layout.width, 0.82, 1)
      : intoRange((stage.clientWidth - 16) / layout.width, 0.88, 1);
    paint({
      scale,
      x: vertical ? (stage.clientWidth - layout.width * scale) / 2 : 0,
      y: vertical ? 0 : (stage.clientHeight - layout.height * scale) / 2,
    });
  }

  function center(id, restoreReadability = false) {
    const node = layout.nodes.find(node => node.id === id);
    if (!node) return;
    const scale = restoreReadability ? Math.max(camera.scale, 0.91) : camera.scale;
    paint({ scale, x: stage.clientWidth / 2 - node.x * scale, y: stage.clientHeight / 2 - (node.y + 10) * scale });
  }

  function zoom(scale, anchor = { x: stage.clientWidth / 2, y: stage.clientHeight / 2 }, original = camera, oldAnchor = anchor) {
    const nextScale = intoRange(scale, Math.min(0.38, fitScale()), 1.8);
    const factor = nextScale / original.scale;
    paint({ scale: nextScale, x: anchor.x - (oldAnchor.x - original.x) * factor,
      y: anchor.y - (oldAnchor.y - original.y) * factor });
  }

  function repaintEdges(id) {
    if (highlighted === id) return;
    highlighted = id;
    drawEdges(canvas, layout, graph.edges, vertical, highlighted);
  }

  function rebuild() {
    const useVertical = stage.clientWidth <= 615;
    if (layout && vertical === useVertical) {
      paint(camera);
      return;
    }
    vertical = useVertical;
    layout = mapLayout(graph, vertical);
    key = stage.dataset.mapPath + (vertical ? ':portrait' : ':landscape');
    world.style.width = layout.width + 'px';
    world.style.height = layout.height + 'px';
    nodes.innerHTML = layout.nodes.map(node => nodeMarkup(node, active && graph.kind !== 'overview', matchIds, filters.focus)).join('');
    drawEdges(canvas, layout, graph.edges, vertical, highlighted);
    if (cameraCache.has(key)) paint(cameraCache.get(key));
    else reset();
    if (jumpTo) {
      center(jumpTo, true);
      jumpTo = '';
    }
  }

  root.addEventListener('click', event => {
    const control = event.target.closest('[data-map-control]')?.dataset.mapControl;
    if (!control) return;
    if (control === 'fit') fit();
    else if (control === 'reset') reset();
    else zoom(camera.scale * (control === 'in' ? 1.18 : 1 / 1.18));
  }, { signal });

  stage.addEventListener('keydown', event => {
    if (event.target !== stage || event.altKey || event.ctrlKey || event.metaKey) return;
    const moves = { ArrowLeft: [50, 0], ArrowRight: [-50, 0], ArrowUp: [0, 50], ArrowDown: [0, -50] };
    if (moves[event.key]) {
      const [x, y] = moves[event.key];
      paint({ ...camera, x: camera.x + x, y: camera.y + y });
    } else if (event.key === '+' || event.key === '=') zoom(camera.scale * 1.18);
    else if (event.key === '-') zoom(camera.scale / 1.18);
    else if (event.key.toLowerCase() === 'f') fit();
    else return;
    event.preventDefault();
  }, { signal });

  stage.addEventListener('wheel', event => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    zoom(camera.scale * Math.exp(intoRange(-event.deltaY * 0.003, -0.25, 0.25)), pointer(event));
  }, { signal, passive: false });

  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0 || pointers.size >= 2) return;
    const point = pointer(event);
    pointers.set(event.pointerId, point);
    if (pointers.size === 1) {
      firstPoint = point;
      dragged = false;
    } else {
      const [a, b] = pointers.values();
      pinch = { anchor: midpoint(a, b), distance: distance(a, b) || 1, camera: { ...camera } };
      dragged = true;
      for (const id of pointers.keys()) stage.setPointerCapture(id);
    }
  }, { signal });

  stage.addEventListener('pointermove', event => {
    const before = pointers.get(event.pointerId);
    if (!before) return;
    const next = pointer(event);
    if (pinch) {
      pointers.set(event.pointerId, next);
      const [a, b] = pointers.values();
      zoom(pinch.camera.scale * distance(a, b) / pinch.distance, midpoint(a, b), pinch.camera, pinch.anchor);
    } else if (dragged || distance(firstPoint, next) > 5) {
      pointers.set(event.pointerId, next);
      dragged = true;
      stage.classList.add('is-panning');
      if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId);
      paint({ ...camera, x: camera.x + next.x - before.x, y: camera.y + next.y - before.y });
    }
  }, { signal });

  function endPointer(event) {
    if (!pointers.delete(event.pointerId)) return;
    if (dragged) blockClicksUntil = Date.now() + 220;
    pinch = null;
    firstPoint = pointers.values().next().value;
    if (!pointers.size) stage.classList.remove('is-panning');
  }
  stage.addEventListener('pointerup', endPointer, { signal });
  stage.addEventListener('pointercancel', endPointer, { signal });
  stage.addEventListener('pointerleave', event => {
    if (!stage.hasPointerCapture(event.pointerId) && event.pointerType === 'mouse') endPointer(event);
    repaintEdges(filters.focus);
  }, { signal });
  stage.addEventListener('click', event => {
    if (event.detail && Date.now() < blockClicksUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, { signal, capture: true });
  stage.addEventListener('pointerover', event => {
    if (!dragged || !pointers.size) repaintEdges(event.target.closest('[data-map-node]')?.dataset.mapNode ?? filters.focus);
  }, { signal });
  stage.addEventListener('focusin', event => {
    const node = event.target.closest('button[data-map-node]');
    if (!node || !node.matches(':focus-visible')) return;
    const area = stage.getBoundingClientRect();
    const bounds = node.getBoundingClientRect();
    if (bounds.x < area.x || bounds.right > area.right || bounds.y < area.y || bounds.bottom > area.bottom) {
      center(node.dataset.mapNode, true);
    }
    repaintEdges(node.dataset.mapNode);
  }, { signal });

  rebuild();
  const resize = new ResizeObserver(rebuild);
  resize.observe(stage);
  return () => { resize.disconnect(); events.abort(); };
}

export function mountTree(target, context, filters) {
  const { matches, choices, overview, path, active } = treeSelection(context.skills, filters);
  filters.path = overview ? OVERVIEW : path?.id ?? '';
  target.parentElement.querySelector('#tree-path').innerHTML = mapOptions(choices, filters.path);
  target.parentElement.querySelector('#tree-path').disabled = matches.length === 0;
  target.parentElement.querySelector('[data-map-filter-active]').hidden = !filters.gear && !filters.tier;
  for (const chip of target.parentElement.querySelectorAll('.map-categories [data-action="tree-filter"]')) {
    chip.setAttribute('aria-pressed', String(chip.dataset.id === filters.category));
  }
  if (!matches.length) {
    target.innerHTML = '<section class="panel"><p class="empty-copy" role="status">No skills match these filters.</p></section>';
    return () => {};
  }
  const usedSkills = overview ? matches : context.skills.filter(skill => skill.track === path.id);
  const graph = overview ? overviewGraph(matches, context) : progressionGraph(context, path);
  const achieved = usedSkills.filter(skill => context.progress.mastered.has(skill.id)).length;
  const summary = achieved + ' / ' + usedSkills.length + ' mastered';
  const visibleMatchIds = new Set(matches.map(skill => skill.id));
  const query = normalize(filters.query);
  const results = query ? `<section class="panel map-matches" aria-label="Matching skills">
    <p role="status">${format(matches.length)} matching ${matches.length === 1 ? 'skill' : 'skills'}</p>
    <div>${matches.map(skill => {
      const track = paths.find(path => path.id === skill.track);
      return `<button type="button" class="chip" data-action="tree-spotlight" data-id="${safe(skill.id)}">
        ${safe(skill.name)}<small>${safe(track?.name)}</small></button>`;
    }).join('')}</div></section>` : '';
  const mapLegend = overview ? '<span>Select a category to open its progressions.</span>' : [
    ['available', 'Available'], ['training', 'Training'], ['mastered', 'Mastered'],
    ['locked', 'Locked'], ['alternate', 'Alternate route'],
  ].map(([status, name]) => `<span><i class="map-key-${status}"></i>${name}</span>`).join('');
  target.innerHTML = `${results}<section class="panel map-panel" aria-label="Interactive skill map">
    <header class="map-head">
      <div class="map-title"><h2>${safe(overview ? 'All progression paths' : path.name)}</h2>
        <p>${summary}</p>${meter(achieved, usedSkills.length, 'Path mastery')}</div>
      <div class="map-zoom" role="group" aria-label="Map zoom">
        <button type="button" class="btn quiet icon-button" data-map-control="out" aria-label="Zoom out">−</button>
        <span data-map-scale class="muted"></span>
        <button type="button" class="btn quiet icon-button" data-map-control="in" aria-label="Zoom in">+</button>
        <button type="button" class="btn quiet" data-map-control="fit" aria-label="Fit entire map">Fit</button>
        <button type="button" class="btn quiet icon-button" data-map-control="reset" aria-label="Return to starting view" title="Return to starting view">⌂</button>
      </div>
    </header>
    <div class="map-stage" tabindex="0" data-map-path="${safe(filters.path)}" aria-label="Skill map"
      aria-describedby="map-instructions">
      <div class="map-world"><canvas aria-hidden="true"></canvas><div class="map-nodes"></div></div>
    </div>
    <footer class="map-footer">
      <div class="map-legend" aria-label="Map legend">${mapLegend}</div>
      <p id="map-instructions"><span class="map-desktop-help">Drag to move · Ctrl + scroll to zoom</span>
        <span class="map-touch-help">Drag to move · Pinch to zoom</span>
        <span class="sr-only">Use the arrow keys to move, plus or minus to zoom, and F to fit the map.</span>
      </p>
    </footer>
  </section>`;
  const jump = filters.jump ? filters.focus : !overview && active ? matches.find(skill => skill.track === path.id)?.id : '';
  filters.jump = false;
  return mountStage(target, graph, filters, active, visibleMatchIds, jump);
}
