'use strict';
/* ============ utilidades ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];
const DIA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const m2 = n => '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const m0 = n => '$' + Math.round(Number(n || 0)).toLocaleString('en-US');
const pad = n => String(n).padStart(2, '0');
const toISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toLocalDT = d => `${toISO(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const sod = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const eod = d => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
const fmtD = d => `${d.getDate()} ${MES[d.getMonth()]} ${d.getFullYear()}`;
const fmtS = d => `${d.getDate()} ${MES[d.getMonth()]}`;
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const dayDiff = (a, b) => Math.round((sod(a) - sod(b)) / 864e5);
const initials = n => String(n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || '?';
const phoneDigits = t => { const d = String(t || '').replace(/\D/g, ''); return d.length === 10 ? '57' + d : d; };

const IC = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="3.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1.2"/>',
  map: '<path d="M9 4 3.5 6.5v13L9 17l6 2.5 5.5-2.5v-13L15 6.5z"/><path d="M9 4v13M15 6.5v13"/>',
  note: '<path d="M6 3.5h9l4 4v13H6z"/><path d="M14.5 3.5V8H19"/><path d="M9 12h7M9 15.5h7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  phone: '<path d="M5 4h3.5l1.8 4.5-2.2 1.4a11 11 0 0 0 5.5 5.5l1.4-2.2L20 15.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  cam: '<path d="M4 8h3l1.6-2.5h6.8L17 8h3v11H4z"/><circle cx="12" cy="13.3" r="3.5"/>',
  img: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5"/>',
  pin: '<path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8"/>',
  trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  up: '<path d="m6 14 6-6 6 6"/>',
  down: '<path d="m6 10 6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  share: '<path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 12v7h14v-7"/>',
  nav: '<path d="m4 11 16-7-7 16-2-7z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
  locate: '<circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  edit: '<path d="m4 20 1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z"/>',
  user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9L3.5 9.7l5.9-.8z"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  dl: '<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 19.5h14"/>'
};
const ico = n => `<span class="ico"><svg viewBox="0 0 24 24">${IC[n]}</svg></span>`;

/* ============ base de datos (IndexedDB) ============ */
const STORES = ['clients', 'loans', 'payments', 'notes', 'places', 'meta'];
let db = null;
const S = { clients: [], loans: [], payments: [], notes: [], places: [], set: { negocio: 'GL Money', tel: '' }, ruta: [], sync: { outbox: {}, last: null, state: 'nosession' }, ui: { tab: 'home', filter: 'todos', q: '', nq: '', routeOpen: true } };

function openDB() {
  return new Promise((ok, no) => {
    if (!window.indexedDB) return no(new Error('sin indexedDB'));
    const r = indexedDB.open('cobroEmpire', 1);
    r.onupgradeneeded = () => STORES.forEach(s => { if (!r.result.objectStoreNames.contains(s)) r.result.createObjectStore(s, { keyPath: 'id' }); });
    r.onsuccess = () => ok(r.result);
    r.onerror = () => no(r.error);
  });
}
const tx = (s, m, fn) => new Promise((ok, no) => {
  if (!db) return ok(m === 'readonly' ? [] : null);
  const t = db.transaction(s, m); const r = fn(t.objectStore(s));
  t.oncomplete = () => ok(r && r.result); t.onerror = () => no(t.error); t.onabort = () => no(t.error);
});
const dbAll = s => tx(s, 'readonly', st => st.getAll());
const dbPut = (s, o) => tx(s, 'readwrite', st => st.put(o));
const dbDel = (s, id) => tx(s, 'readwrite', st => st.delete(id));
const dbClear = s => tx(s, 'readwrite', st => st.clear());

async function save(store, obj) {
  obj.u = Date.now();
  const a = S[store], i = a.findIndex(x => x.id === obj.id);
  if (i >= 0) a[i] = obj; else a.push(obj);
  try { await dbPut(store, obj); } catch (e) { console.error(e); toast('Error al guardar'); }
  queue(store, obj.id, false, obj.u);
}
async function remove(store, id) {
  S[store] = S[store].filter(x => x.id !== id);
  try { await dbDel(store, id); } catch (e) { console.error(e); }
  queue(store, id, true, Date.now());
}
const saveMeta = () => Promise.all([
  dbPut('meta', { id: 'settings', ...S.set }), dbPut('meta', { id: 'ruta', keys: S.ruta })
]).catch(console.error);

/* ============ finanzas ============ */
const RID_CH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function genReceiptId(date) {
  const d = date || new Date();
  for (;;) {
    const b = new Uint8Array(6); (crypto && crypto.getRandomValues) ? crypto.getRandomValues(b) : b.forEach((_, i) => b[i] = Math.random() * 256);
    const id = `R${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${[...b].map(x => RID_CH[x % 32]).join('')}`;
    if (!S.payments.some(p => p.recibo === id)) return id;
  }
}
const client = id => S.clients.find(c => c.id === id);
const loan = id => S.loans.find(l => l.id === id);
const payOf = id => S.payments.filter(p => p.loanId === id).sort((a, b) => a.fecha.localeCompare(b.fecha));

function dueDates(l) {
  const b = parseD(l.fecha), out = [];
  for (let k = 1; k <= l.nCuotas; k++) {
    const d = new Date(b);
    if (l.frecuencia === 'Mensual') { d.setMonth(b.getMonth() + k); if (d.getDate() !== b.getDate()) d.setDate(0); }
    else d.setDate(b.getDate() + k * ({ Diario: 1, Semanal: 7, Quincenal: 15 }[l.frecuencia] || 7));
    out.push(d);
  }
  return out;
}
function calc(l, pays, asOf) {
  pays = (pays || payOf(l.id)); asOf = asOf || new Date();
  const n = l.nCuotas, cuota = l.total / n, dues = dueDates(l);
  const it = Math.max(0, l.total - l.prestado), ip = it / n;
  let abon = 0, intPaid = 0, capPaid = 0;
  for (const p of pays) {
    const dc = dues.filter(d => d <= eod(new Date(p.fecha))).length;
    const accrued = Math.min(it, ip * Math.max(1, dc));
    let ipart;
    if (p.abonoA === 'Capital') ipart = 0;
    else if (p.abonoA === 'Interés') ipart = Math.min(p.monto, it - intPaid);
    else ipart = Math.min(p.monto, Math.max(0, accrued - intPaid));
    ipart = Math.max(0, Math.min(ipart, it - intPaid));
    const cpart = Math.max(0, Math.min(p.monto - ipart, l.prestado - capPaid));
    intPaid += ipart; capPaid += cpart; abon += p.monto;
  }
  const capPend = l.prestado - capPaid, intPend = it - intPaid, saldo = Math.max(0, capPend + intPend);
  const paid = Math.min(n, Math.floor(abon / cuota + 1e-6));
  const dueCount = dues.filter(d => d <= eod(asOf)).length;
  const vencidas = Math.max(0, dueCount - paid);
  const next = paid < n ? dues[paid] : null;
  const debido = Math.max(0, Math.min(saldo, dueCount * cuota - abon));
  const late = vencidas > 0 && next && next < sod(asOf);
  const estado = saldo < 0.5 ? 'pagado' : late ? 'vencido' : vencidas > 0 ? 'hoy' : 'aldia';
  return { n, cuota, dues, it, abon, capPend, intPend, saldo, paid, vencidas, next, venc: dues[n - 1], debido, estado, late };
}
const enriched = () => S.loans.map(l => ({ l, c: calc(l), cl: client(l.clientId) })).filter(x => x.cl);

/* ============ UI base ============ */
let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
}
function sheet(title, html, opts = {}) {
  const el = document.createElement('div'); el.className = 'sheet-wrap';
  el.innerHTML = `<div class="scrim" data-a="close"></div><div class="sheet glass${opts.full ? ' full' : ''}"><div class="grab"></div><div class="sheet-head"><h2>${title}</h2><button class="icon-btn glass" data-a="close" aria-label="Cerrar">${ico('x')}</button></div><div class="sheet-body"></div></div>`;
  $('#sheets').append(el);
  const body = $('.sheet-body', el);
  if (typeof html === 'function') {
    el.dataset.live = '1';
    el._r = () => { const st = body.scrollTop; body.innerHTML = html(); body.scrollTop = st; opts.mount && opts.mount(el, body); };
    el._r();
  } else { body.innerHTML = html; opts.mount && opts.mount(el, body); }
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('open')));
  return el;
}
function closeSheet(el) {
  el = el || $$('.sheet-wrap:not(.closing)').pop(); if (!el) return;
  el.classList.add('closing'); setTimeout(() => el.remove(), 380);
}
function ask(msg, okLabel = 'Eliminar') {
  return new Promise(res => {
    let done = false;
    const el = sheet('Confirmar', `<p style="margin:4px 4px 18px;line-height:1.45;font-size:16px">${esc(msg)}</p><div class="btns"><button class="btn" data-k="no">Cancelar</button><button class="btn danger" data-k="ok">${esc(okLabel)}</button></div>`);
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-k]'); if (!b || done) return;
      done = true; closeSheet(el); res(b.dataset.k === 'ok');
    });
    $('.scrim', el).addEventListener('click', () => { if (!done) { done = true; res(false); } });
  });
}
const avatar = (cl, cls = '') => `<div class="avatar ${cls}">${cl.fotoPersona ? `<img src="${cl.fotoPersona}" alt="">` : esc(initials(cl.nombre))}</div>`;
const empty = (i, t) => `<div class="empty glass">${ico(i)}${t}</div>`;

/* ---- fotos ---- */
function readPhoto(file) {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const m = 1100, s = Math.min(1, m / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      res(c.toDataURL('image/jpeg', 0.78));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('img')); };
    img.src = url;
  });
}
const photoHTML = (key, label, val) => `<div class="photo" data-ph="${key}" data-label="${esc(label)}"><span>${esc(label)}</span><div class="ph-box"><div class="ph-prev">${val ? `<img src="${val}" alt="">` : ico('cam')}</div><div class="ph-btns"><label class="btn sm">${ico('cam')} Tomar foto<input type="file" accept="image/*" capture="environment" hidden></label><label class="btn sm">${ico('img')} Galería<input type="file" accept="image/*" hidden></label>${val ? '<button type="button" class="btn sm danger" data-phclear>Quitar</button>' : ''}</div></div></div>`;
function bindPhotos(root, st) {
  root.addEventListener('change', async e => {
    const inp = e.target; if (inp.type !== 'file') return;
    const box = inp.closest('.photo'), f = inp.files[0]; if (!box || !f) return;
    try { st[box.dataset.ph] = await readPhoto(f); } catch { toast('No se pudo leer la foto'); return; }
    box.outerHTML = photoHTML(box.dataset.ph, box.dataset.label, st[box.dataset.ph]);
  });
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-phclear]'); if (!b) return;
    const box = b.closest('.photo'); st[box.dataset.ph] = null;
    box.outerHTML = photoHTML(box.dataset.ph, box.dataset.label, null);
  });
}

/* ---- ubicación ---- */
function getPos() {
  return new Promise((ok, no) => {
    if (!navigator.geolocation) return no(new Error('sin GPS'));
    navigator.geolocation.getCurrentPosition(p => ok({ lat: p.coords.latitude, lng: p.coords.longitude }), no, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  });
}
const locHTML = st => `<div class="field" data-locbox><span>Ubicación en el mapa</span>${st.lat != null ? `<div class="loc-ok">${ico('pin')} ${st.lat.toFixed(5)}, ${st.lng.toFixed(5)}</div>` : '<p class="hint">Sin ubicar. Úsala para planear la ruta de cobro.</p>'}<div class="btns"><button type="button" class="btn sm" data-loc="gps">${ico('locate')} GPS</button><button type="button" class="btn sm" data-loc="pick">${ico('map')} Mapa</button>${st.lat != null ? '<button type="button" class="btn sm danger" data-loc="clear">Quitar</button>' : ''}</div></div>`;
function bindLoc(root, st) {
  root.addEventListener('click', async e => {
    const b = e.target.closest('[data-loc]'); if (!b) return;
    const box = b.closest('[data-locbox]'), k = b.dataset.loc;
    if (k === 'gps') { try { const p = await getPos(); st.lat = p.lat; st.lng = p.lng; } catch { toast('No se pudo obtener el GPS. Revisa permisos.'); return; } }
    if (k === 'pick') { const p = await pickLocation(st.lat != null ? st : null); if (!p) return; st.lat = p.lat; st.lng = p.lng; }
    if (k === 'clear') { st.lat = null; st.lng = null; }
    box.outerHTML = locHTML(st);
  });
}
const tileURL = () => `https://{s}.basemaps.cartocdn.com/${matchMedia('(prefers-color-scheme: dark)').matches ? 'dark_all' : 'light_all'}/{z}/{x}/{y}{r}.png`;
const TILE_OPT = { subdomains: 'abcd', maxZoom: 19, attribution: '© OpenStreetMap · © CARTO' };
const pinIcon = (cls, num) => L.divIcon({ className: '', html: `<div class="pin ${cls}"><i></i><b>${num || ''}</b></div>`, iconSize: [36, 36], iconAnchor: [18, 34], popupAnchor: [0, -32] });

function pickLocation(init) {
  return new Promise(res => {
    const el = document.createElement('div'); el.className = 'picker';
    el.innerHTML = `<div id="pmap"></div><div class="top2 glass">Mueve el mapa y centra el pin</div><div class="cross"><div class="pin pt"><i></i></div></div><div class="bar2"><button class="btn glass" data-k="x">Cancelar</button><button class="btn glass" data-k="gps">${ico('locate')}</button><button class="btn pri" style="flex:1.4" data-k="ok">Confirmar</button></div>`;
    document.body.append(el);
    const m = L.map($('#pmap', el), { zoomControl: false }).setView(init ? [init.lat, init.lng] : (lastCenter || [4.711, -74.072]), init ? 17 : 14);
    L.tileLayer(tileURL(), TILE_OPT).addTo(m);
    if (!init) getPos().then(p => m.setView([p.lat, p.lng], 17)).catch(() => { });
    el.addEventListener('click', async e => {
      const b = e.target.closest('[data-k]'); if (!b) return;
      if (b.dataset.k === 'gps') { try { const p = await getPos(); m.setView([p.lat, p.lng], 18); } catch { toast('No se pudo obtener el GPS'); } return; }
      const c = m.getCenter(); m.remove(); el.remove();
      res(b.dataset.k === 'ok' ? { lat: c.lat, lng: c.lng } : null);
    });
    setTimeout(() => m.invalidateSize(), 50);
  });
}

/* ============ vistas ============ */
const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; };
const chipOf = c => c.estado === 'pagado' ? '<span class="chip acc">Pagado</span>'
  : c.estado === 'vencido' ? `<span class="chip bad">${c.vencidas} vencida${c.vencidas > 1 ? 's' : ''}</span>`
    : c.estado === 'hoy' ? '<span class="chip warn">Hoy</span>' : '<span class="chip ok">Al día</span>';
function rowLoan({ l, c, cl }) {
  const amt = c.estado === 'pagado' ? 0 : (c.debido > 0.5 ? c.debido : c.saldo);
  return `<button class="row glass" data-a="loan" data-id="${l.id}">${avatar(cl)}<div class="mid"><div class="t">${esc(cl.nombre)}</div><div class="s">Cuota ${m0(c.cuota)} · ${c.next ? 'próx. ' + fmtS(c.next) : 'sin cuotas'} · ${c.paid}/${c.n}</div></div><div class="r"><b class="num">${m0(amt)}</b>${chipOf(c)}</div></button>`;
}

function renderHome() {
  const all = enriched(), act = all.filter(x => x.c.estado !== 'pagado');
  const porCobrar = sum(act, x => x.c.saldo), contratado = sum(act, x => x.l.total), cobrado = sum(act, x => x.c.abon);
  const today = new Date();
  const hoy = S.payments.filter(p => sameDay(new Date(p.fecha), today));
  const mes = S.payments.filter(p => { const d = new Date(p.fecha); return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear(); });
  const dueNow = act.filter(x => x.c.debido > 0.5).sort((a, b) => (b.c.late - a.c.late) || (b.c.vencidas - a.c.vencidas));
  const vencido = sum(dueNow, x => x.c.debido);
  const prox = act.filter(x => x.c.debido <= 0.5 && x.c.next && dayDiff(x.c.next, today) <= 7).sort((a, b) => a.c.next - b.c.next);
  const pct = contratado ? Math.min(100, cobrado / contratado * 100) : 0;
  const cnt = k => all.filter(x => x.c.estado === k).length, nTot = all.length || 1;
  const prestadoAct = sum(act, x => x.l.prestado), interesAct = sum(act, x => x.l.total - x.l.prestado);
  const prestadoAll = sum(all, x => x.l.prestado), totalAll = sum(all, x => x.l.total), cobradoAll = sum(S.payments, p => p.monto);
  const morosidad = act.length ? dueNow.filter(x => x.c.late).length / act.length * 100 : 0;
  const ticket = all.length ? prestadoAll / all.length : 0;
  const dias = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const wk = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(d.getDate() - (6 - i)); return { d, v: sum(S.payments.filter(p => sameDay(new Date(p.fecha), d)), p => p.monto) }; });
  const wmax = Math.max(1, ...wk.map(x => x.v)), wsum = sum(wk, x => x.v);
  const nm = id => { const l = S.loans.find(x => x.id === id), c = l && S.clients.find(x => x.id === l.clientId); return { l, c }; };
  const ult = S.payments.slice().sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
  const topDeb = act.slice().sort((a, b) => b.c.saldo - a.c.saldo).slice(0, 3);
  const D = [['vencido', 'Vencidos', 'var(--bad)'], ['hoy', 'Cobran hoy', 'var(--warn)'], ['aldia', 'Al día', 'var(--ok)'], ['pagado', 'Pagados', 'var(--gold2)']];
  $('#v-home').innerHTML = `
  <div class="hd"><div class="hd-l"><img class="hd-logo" src="${LOGO_URL}" alt=""><div><small>${greet()}${syncLabel()}</small><h1>${esc(S.set.negocio || 'GL Money')}</h1></div></div><div style="display:flex;gap:10px"><button class="icon-btn glass" data-a="verify" aria-label="Verificar recibo">${ico('shield')}</button><button class="icon-btn glass" data-a="settings" aria-label="Ajustes">${ico('gear')}</button></div></div>
  <div class="hero glass tint-acc"><div class="lbl">Por cobrar</div><div class="big num">${m0(porCobrar)}</div><div class="bar"><i style="width:${pct.toFixed(1)}%"></i></div><div class="sub"><span>${act.length} crédito${act.length === 1 ? '' : 's'} activo${act.length === 1 ? '' : 's'}</span><span>${pct.toFixed(0)}% recuperado</span></div></div>
  <div class="stats"><div class="stat glass tint-ok"><div class="lbl">Cobrado hoy</div><div class="val num">${m0(sum(hoy, p => p.monto))}</div></div><div class="stat glass ${vencido > 0 ? 'tint-bad' : ''}"><div class="lbl">Pendiente exigible</div><div class="val num">${m0(vencido)}</div></div></div>
  <div class="stats" style="margin-top:12px"><div class="stat glass"><div class="lbl">Cobrado este mes</div><div class="val num">${m0(sum(mes, p => p.monto))}</div></div><div class="stat glass"><div class="lbl">Cobros pendientes</div><div class="val num">${dueNow.length}</div></div></div>
  <div class="kpis">
    <div class="kpi glass"><div class="lbl">Capital en calle</div><div class="val num">${m0(prestadoAct)}</div><small>${act.length} activos</small></div>
    <div class="kpi glass"><div class="lbl">Intereses</div><div class="val num">${m0(interesAct)}</div><small>proyectados</small></div>
    <div class="kpi glass"><div class="lbl">Cobrado total</div><div class="val num">${m0(cobradoAll)}</div><small>${S.payments.length} pagos</small></div>
    <div class="kpi glass"><div class="lbl">Clientes</div><div class="val num">${S.clients.length}</div><small>${all.length} crédito${all.length === 1 ? '' : 's'}</small></div>
    <div class="kpi glass"><div class="lbl">Morosidad</div><div class="val num" style="${morosidad > 25 ? 'color:var(--bad)' : ''}">${morosidad.toFixed(0)}%</div><small>${dueNow.filter(x => x.c.late).length} atrasados</small></div>
    <div class="kpi glass"><div class="lbl">Ticket prom.</div><div class="val num">${m0(ticket)}</div><small>por crédito</small></div>
  </div>
  <div class="panel glass"><h4><span>Cobros · 7 días</span><em class="num">${m0(wsum)}</em></h4>
    <div class="chart">${wk.map((x, i) => `<div class="col ${x.v ? '' : 'z'} ${i === 6 ? 't' : ''}"><div class="chart-v num">${x.v ? m0(x.v) : ''}</div><i style="height:${x.v ? Math.max(6, x.v / wmax * 62) : 3}px"></i><span>${i === 6 ? 'Hoy' : dias[x.d.getDay()]}</span></div>`).join('')}</div></div>
  <div class="panel glass"><h4><span>Estado de cartera</span><em>${all.length} crédito${all.length === 1 ? '' : 's'}</em></h4>
    <div class="dist">${D.map(([k, , c]) => cnt(k) ? `<i style="width:${cnt(k) / nTot * 100}%;background:${c}"></i>` : '').join('')}</div>
    <div class="legend">${D.map(([k, t, c]) => `<div><s style="background:${c}"></s>${t}<b>${cnt(k)}</b></div>`).join('')}</div>
    <div class="legend" style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(212,175,55,.14)"><div>Prestado total<b>${m0(prestadoAll)}</b></div><div>A recibir total<b>${m0(totalAll)}</b></div></div></div>
  ${topDeb.length ? `<div class="panel glass"><h4><span>Mayor saldo pendiente</span></h4>${topDeb.map(x => `<div class="prow" data-a="loan" data-id="${x.l.id}"><div class="pi">${esc((x.cl.nombre || '?')[0].toUpperCase())}</div><div class="pm"><b>${esc(x.cl.nombre)}</b><small>${esc(x.l.codigo || '')} · ${x.l.frecuencia}</small></div><div class="pv g num">${m0(x.c.saldo)}</div></div>`).join('')}</div>` : ''}
  ${ult.length ? `<div class="panel glass"><h4><span>Últimos pagos</span><em>${S.payments.length} en total</em></h4>${ult.map(p => { const { l, c } = nm(p.loanId); return `<div class="prow" ${l ? `data-a="loan" data-id="${l.id}"` : ''}><div class="pi">${esc(((c && c.nombre) || '?')[0].toUpperCase())}</div><div class="pm"><b>${esc((c && c.nombre) || 'Cliente')}</b><small>${fmtD(new Date(p.fecha))} · ${esc(p.recibo || '')}</small></div><div class="pv num">+${m0(p.monto)}</div></div>`; }).join('')}</div>` : ''}
  <h3 class="sec"><span>Para cobrar</span><span>${dueNow.length}</span></h3>
  <div class="list">${dueNow.length ? dueNow.map(rowLoan).join('') : empty('check', 'Sin cobros pendientes.')}</div>
  ${prox.length ? `<h3 class="sec"><span>Próximos 7 días</span><span>${prox.length}</span></h3><div class="list">${prox.map(rowLoan).join('')}</div>` : ''}
  <div class="quote"><b>GL</b> Money · cada peso cuenta</div>`;
}

function renderLoans() {
  const v = $('#v-loans');
  if (!$('#loanList')) {
    v.innerHTML = `<div class="hd"><div><small>Cartera</small><h1>Créditos</h1></div></div>
    <label class="search"><span class="ico">${ico('search').replace(/<\/?span[^>]*>/g, '')}</span><input id="loanQ" type="search" placeholder="Buscar nombre, ID o teléfono" value="${esc(S.ui.q)}"></label>
    <div class="seg" id="loanSeg"></div><div class="list" id="loanList"></div>`;
    $('#loanQ').addEventListener('input', e => { S.ui.q = e.target.value; renderLoanList(); });
  }
  renderLoanList();
}
function renderLoanList() {
  const F = [['todos', 'Todos'], ['vencido', 'Vencidos'], ['hoy', 'Hoy'], ['aldia', 'Al día'], ['pagado', 'Pagados']];
  $('#loanSeg').innerHTML = F.map(([k, t]) => `<button data-a="filter" data-f="${k}" class="${S.ui.filter === k ? 'on' : ''}">${t}</button>`).join('');
  const q = S.ui.q.trim().toLowerCase();
  const rows = enriched().filter(x => (S.ui.filter === 'todos' || x.c.estado === S.ui.filter) &&
    (!q || [x.cl.nombre, x.cl.doc, x.cl.tel, x.l.codigo].some(s => String(s || '').toLowerCase().includes(q))))
    .sort((a, b) => ({ vencido: 0, hoy: 1, aldia: 2, pagado: 3 }[a.c.estado] - { vencido: 0, hoy: 1, aldia: 2, pagado: 3 }[b.c.estado]) || a.cl.nombre.localeCompare(b.cl.nombre));
  $('#loanList').innerHTML = rows.length ? rows.map(rowLoan).join('') : empty('wallet', S.loans.length ? 'Sin resultados.' : 'Aún no hay créditos.<br>Toca + para crear el primero.');
}

/* ---- detalle de crédito ---- */
function openLoan(id) {
  if (!loan(id)) return;
  const el = sheet('Crédito', () => {
    const l = loan(id); if (!l) { closeSheet(el); return ''; }
    const cl = client(l.clientId) || { nombre: '—' }, pays = payOf(l.id), c = calc(l, pays);
    const wa = `https://wa.me/${phoneDigits(cl.tel)}?text=${encodeURIComponent(`Hola ${String(cl.nombre).split(' ')[0]}, te recuerdo tu cuota de ${m0(c.debido > 0.5 ? c.debido : c.cuota)} del crédito ${l.codigo}. Saldo total: ${m0(c.saldo)}. ¡Gracias!`)}`;
    const ring = Array.from({ length: c.n }, (_, i) => `<i class="${i < c.paid ? 'd' : i < c.paid + c.vencidas && c.late ? 'o' : ''}"></i>`).join('');
    const ln = (a, b, cls = '') => `<div class="ln ${cls}"><span>${a}</span><b class="num">${b}</b></div>`;
    return `
    <div class="head-c">${avatar(cl, 'lg')}<div style="flex:1;min-width:0"><h3>${esc(cl.nombre)}</h3><p>${cl.doc ? 'ID ' + esc(cl.doc) : ''}${cl.doc && cl.tel ? ' · ' : ''}${esc(cl.tel || '')}</p></div>${chipOf(c)}</div>
    <div class="btns" style="margin-bottom:14px">
      ${cl.tel ? `<a class="btn sm" href="tel:${esc(cl.tel)}">${ico('phone')} Llamar</a><a class="btn sm" href="${wa}" target="_blank" rel="noopener">${ico('chat')} WhatsApp</a>` : ''}
      ${cl.lat != null ? `<button class="btn sm" data-a="nav" data-k="c:${cl.id}">${ico('nav')} Ir</button>` : ''}
      <button class="btn sm" data-a="client" data-id="${cl.id}">${ico('user')} Cliente</button>
    </div>
    <div class="ring">${ring}</div>
    <div class="stmt glass">
      ${ln('ID del crédito', esc(l.codigo))}${ln('Fecha del crédito', fmtD(parseD(l.fecha)))}
      ${ln('Próxima cuota', c.next ? fmtD(c.next) : '—')}${ln('Vencimiento', fmtD(c.venc))}
      ${ln('Cuotas vencidas', c.vencidas)}${ln('Cuotas pagadas', c.paid + '/' + c.n)}${ln('Frecuencia', esc(l.frecuencia))}
      ${ln('Valor cuota', m2(c.cuota))}${ln('Total prestado', m2(l.prestado))}${ln('Prestado + intereses', m2(l.total))}${ln('Total abonado', m2(c.abon))}
      <div class="sep"></div>
      ${ln('Deuda a capital', m2(c.capPend))}${ln('Interés pendiente', m2(c.intPend))}${ln('Saldo total', m2(c.saldo), 'big')}
    </div>
    ${c.saldo > 0.5 ? `<button class="btn pri blk" data-a="pay" data-id="${l.id}">${ico('plus')} Registrar pago</button>` : ''}
    <h3 class="sec"><span>Pagos</span><span>${pays.length}</span></h3>
    <div class="list">${pays.length ? pays.map((p, i) => { const d = new Date(p.fecha); return `<div class="pay glass"><div class="n">${i + 1}</div><div class="mid"><b class="num">${m2(p.monto)}</b><span>${fmtD(d)} ${pad(d.getHours())}:${pad(d.getMinutes())} · ${esc(p.metodo)} · ${esc(p.abonoA)}</span><span style="display:block;font-weight:700;letter-spacing:.4px">${esc(p.recibo || '')}</span></div><button class="mini" data-a="receipt" data-id="${l.id}" data-p="${p.id}" aria-label="Recibo">${ico('receipt')}</button><button class="mini" data-a="del-pay" data-id="${p.id}" aria-label="Eliminar pago">${ico('trash')}</button></div>`; }).join('') : empty('receipt', 'Sin pagos registrados.')}</div>
    ${cl.fotoFachada || cl.fotoPersona ? `<h3 class="sec"><span>Fotos</span></h3><div class="gallery">${cl.fotoFachada ? `<figure data-a="img" data-src="${cl.fotoFachada}"><img src="${cl.fotoFachada}" alt=""><figcaption>Fachada</figcaption></figure>` : ''}${cl.fotoPersona ? `<figure data-a="img" data-src="${cl.fotoPersona}"><img src="${cl.fotoPersona}" alt=""><figcaption>Cliente</figcaption></figure>` : ''}</div>` : ''}
    <div class="btns" style="margin-top:20px"><button class="btn" data-a="edit-loan" data-id="${l.id}">${ico('edit')} Editar</button><button class="btn danger" data-a="del-loan" data-id="${l.id}">${ico('trash')} Eliminar</button></div>`;
  }, { full: true });
}

/* ---- pago ---- */
function openPayForm(loanId) {
  const l = loan(loanId), c = calc(l);
  const def = c.debido > 0.5 ? c.debido : Math.min(c.cuota, c.saldo);
  const el = sheet('Registrar pago', `<form id="pf">
    <div class="calc glass"><div><span>Cuota</span><b class="num">${m2(c.cuota)}</b></div><div><span>Saldo total</span><b class="num">${m2(c.saldo)}</b></div></div>
    <label class="field"><span>Monto abonado</span><input name="monto" type="number" inputmode="decimal" step="any" min="0.01" required value="${Math.round(def * 100) / 100}"></label>
    <label class="field"><span>Fecha y hora</span><input name="fecha" type="datetime-local" required value="${toLocalDT(new Date())}"></label>
    <div class="two"><label class="field"><span>Método</span><select name="metodo">${['Efectivo', 'Transferencia', 'Nequi', 'Daviplata', 'Otro'].map(x => `<option>${x}</option>`).join('')}</select></label>
    <label class="field"><span>Abono a</span><select name="abonoA"><option value="Interés y Capital">Interés y Capital</option><option value="Capital">Solo capital</option><option value="Interés">Solo interés</option></select></label></div>
    <button class="btn ok blk" type="submit">${ico('check')} Guardar pago</button></form>`);
  $('#pf', el).addEventListener('submit', async e => {
    e.preventDefault();
    const f = new FormData(e.target), monto = parseFloat(f.get('monto'));
    if (!(monto > 0)) return toast('Monto inválido');
    const fechaP = new Date(f.get('fecha')); const p = { id: uid(), recibo: genReceiptId(fechaP), loanId, fecha: fechaP.toISOString(), monto, metodo: f.get('metodo'), abonoA: f.get('abonoA') };
    await save('payments', p); closeSheet(el); refreshAll(); toast('Pago registrado');
    setTimeout(() => openReceipt(loanId, p.id), 350);
  });
}

/* ---- recibo (imagen) ---- */
const LOGO_URL = 'icons/logo.jpg';
let _logo;
const loadLogo = () => _logo || (_logo = new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = LOGO_URL; }));
async function drawReceipt(l, cl, pays, idx) {
  const p = pays[idx], c = calc(l, pays.slice(0, idx + 1), new Date(p.fecha)), logo = await loadLogo();
  const W = 900, H = 1880, K = 2, cv = document.createElement('canvas'); cv.width = W * K; cv.height = H * K;
  const g = cv.getContext('2d'); g.scale(K, K);
  const F = (w, s, serif) => `${w} ${s}px ${serif ? 'Georgia,"Times New Roman",serif' : '-apple-system,"Helvetica Neue",Arial,sans-serif'}`;
  const fit = (t, mw) => { t = String(t); if (g.measureText(t).width <= mw) return t; while (t.length > 1 && g.measureText(t + '…').width > mw) t = t.slice(0, -1); return t + '…'; };
  const gold = (x0, x1) => { const gr = g.createLinearGradient(x0, 0, x1, 0); [[0, '#8f6b1c'], [.25, '#f3d98a'], [.5, '#c99a2e'], [.75, '#fff1b8'], [1, '#9a7420']].forEach(([o, col]) => gr.addColorStop(o, col)); return gr; };
  const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
  g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
  // cabecera negra con logo
  g.fillStyle = '#000'; g.fillRect(0, 0, W, 310);
  if (logo) g.drawImage(logo, 20, 25, 260, 260);
  else { g.fillStyle = gold(40, 260); g.font = F('700', 110, true); g.textAlign = 'center'; g.fillText(initials(S.set.negocio || 'GL').slice(0, 2), 150, 190); g.textAlign = 'left'; }
  g.fillStyle = gold(300, 860); g.font = F('600', 58, true); g.fillText(fit(S.set.negocio || 'GL Money', 560), 305, 118);
  g.font = F('400', 23); g.fillStyle = '#d9d9d9';
  const txt = 'Recuerde exigir su factura o recibo de pago y conservarlo como soporte de su crédito.' + (S.set.tel ? ` Envíelo al ${S.set.tel}.` : '') + ' Es su comprobante oficial.';
  let line = '', y = 168; for (const w of txt.split(' ')) { const t = line ? line + ' ' + w : w; if (g.measureText(t).width > 545 && line) { g.fillText(line, 305, y); y += 31; line = w; } else line = t; } g.fillText(line, 305, y);
  g.fillStyle = gold(0, W); g.fillRect(0, 310, W, 6);
  // insignia con número único
  rr(40, 350, 820, 78, 39); g.fillStyle = '#fbf5e4'; g.fill(); g.lineWidth = 3; g.strokeStyle = gold(40, 860); g.stroke();
  g.fillStyle = '#7a5a12'; g.font = F('700', 24); g.fillText('RECIBO DE PAGO', 72, 399);
  g.fillStyle = '#000'; g.font = F('800', 36); g.textAlign = 'right'; g.fillText('N.º ' + p.recibo, 828, 402); g.textAlign = 'left';
  // cliente
  g.fillStyle = '#555'; g.font = F('400', 30); g.fillText('Nombre', 40, 495); g.fillText('ID', 40, 553);
  g.fillStyle = '#000'; g.font = F('500', 40); g.fillText(fit(cl.nombre, 630), 225, 497);
  g.font = F('500', 38); g.textAlign = 'right'; g.fillText(fit(cl.doc || '—', 600), 860, 555); g.textAlign = 'left';
  g.fillStyle = gold(40, 860); g.fillRect(40, 585, 820, 3);
  const rows = [['ID del crédito', l.codigo], ['Fecha del crédito', fmtD(parseD(l.fecha)).toUpperCase()], ['Próxima cuota', c.next ? fmtD(c.next) : '—'], ['Vencimiento', fmtD(c.venc)], ['Cuotas vencidas', c.vencidas], ['Cuotas pagadas', c.paid + '/' + c.n], ['Frecuencia', l.frecuencia], ['Valor cuota', m2(c.cuota)], ['Total prestado', m2(l.prestado)], ['Prestado + intereses', m2(l.total)], ['Total abonado', m2(c.abon)]];
  const rows2 = [['Deuda a capital', m2(c.capPend)], ['Interés pendiente', m2(c.intPend)], ['Saldo total', m2(c.saldo)]];
  const sep = yy => { g.fillStyle = '#e8d9ab'; g.fillRect(80, yy, 780, 2); };
  const draw = (arr, y0, boldLast) => arr.forEach(([a, b2], i) => { const bold = boldLast && i === arr.length - 1; g.textAlign = 'left'; g.fillStyle = '#444'; g.font = F('400', 31); g.fillText(a, 80, y0 + i * 56); g.fillStyle = '#000'; g.font = F(bold ? '800' : '400', bold ? 42 : 37); g.textAlign = 'right'; g.fillText(String(b2), 860, y0 + i * 56); g.textAlign = 'left'; });
  draw(rows, 655); sep(1245); draw(rows2, 1305, true); sep(1445);
  // pago
  const d = new Date(p.fecha), fd = `${DIA[d.getDay()]} ${d.getDate()} ${cap(MES[d.getMonth()])} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const pr = [['Fecha del pago', fd], ['Abono a', p.abonoA], ['Método de Pago', p.metodo]];
  g.fillStyle = '#7a5a12'; g.font = F('700', 34); g.fillText(String(idx + 1), 40, 1527);
  pr.forEach(([a, b2], i) => { const yy = 1527 + i * 56; g.fillStyle = gold(75, 85); g.fillRect(75, yy - 34, 4, 44); g.font = F('400', 28); g.fillStyle = '#333'; g.fillText(a, 98, yy); g.font = F('500', 31); g.fillStyle = '#000'; g.textAlign = 'right'; g.fillText(b2, 860, yy); g.textAlign = 'left'; });
  rr(75, 1690, 785, 96, 20); g.fillStyle = '#000'; g.fill(); g.lineWidth = 3; g.strokeStyle = gold(75, 860); g.stroke();
  g.fillStyle = gold(98, 400); g.font = F('700', 38); g.fillText('Abonado', 105, 1752);
  g.fillStyle = gold(520, 840); g.textAlign = 'right'; g.fillText(m2(p.monto), 835, 1752); g.textAlign = 'left';
  // pie
  g.fillStyle = '#000'; g.fillRect(0, 1812, W, 68); g.fillStyle = gold(0, W); g.fillRect(0, 1812, W, 4);
  g.fillStyle = '#e8d08a'; g.font = F('400', 22); g.textAlign = 'center';
  g.fillText('Válido solo si el N.º ' + p.recibo + ' está registrado.', W / 2, 1848);
  g.fillText('Verifíquelo con el prestamista antes de aceptar una copia.', W / 2, 1872); g.textAlign = 'left';
  return cv;
}
async function openReceipt(loanId, payId) {
  const l = loan(loanId); if (!l) return; const cl = client(l.clientId), pays = payOf(loanId), idx = pays.findIndex(p => p.id === payId);
  if (idx < 0 || !cl) return;
  const p0 = pays[idx], cv = await drawReceipt(l, cl, pays, idx), url = cv.toDataURL('image/png');
  const name = `recibo-${p0.recibo}.png`;
  const blob = () => new Promise(r => cv.toBlob(r, 'image/png'));
  const el = sheet('Recibo', `<img src="${url}" alt="Recibo" style="width:100%;border-radius:18px;margin-bottom:14px;background:#fff"><div class="btns"><button class="btn pri" data-k="share">${ico('share')} Compartir</button><button class="btn" data-k="dl">${ico('dl')} Guardar</button></div>`, { full: true });
  el.addEventListener('click', async e => {
    const b = e.target.closest('[data-k]'); if (!b) return;
    const bl = await blob(), file = new File([bl], name, { type: 'image/png' });
    if (b.dataset.k === 'share' && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Recibo de pago' }); } catch { }
    } else { const a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
  });
}

/* ---- cliente ---- */
const clientFields = c => `
  <label class="field"><span>Nombre completo</span><input name="nombre" autocomplete="off" value="${esc(c.nombre || '')}"></label>
  <div class="two"><label class="field"><span>ID / Cédula</span><input name="doc" autocomplete="off" value="${esc(c.doc || '')}"></label>
  <label class="field"><span>Teléfono</span><input name="tel" type="tel" autocomplete="off" value="${esc(c.tel || '')}"></label></div>
  <label class="field"><span>Dirección</span><input name="dir" autocomplete="off" value="${esc(c.dir || '')}"></label>
  <label class="field"><span>Referencia de la casa</span><input name="ref" placeholder="Ej: portón verde, 2 pisos" autocomplete="off" value="${esc(c.ref || '')}"></label>
  ${locHTML(c)}${photoHTML('fotoFachada', 'Foto de la fachada', c.fotoFachada)}${photoHTML('fotoPersona', 'Foto del cliente', c.fotoPersona)}`;
function readClient(form, st, base) {
  const f = new FormData(form);
  return { ...base, id: base.id || uid(), nombre: String(f.get('nombre')).trim(), doc: String(f.get('doc') || '').trim(), tel: String(f.get('tel') || '').trim(), dir: String(f.get('dir') || '').trim(), ref: String(f.get('ref') || '').trim(), lat: st.lat ?? null, lng: st.lng ?? null, fotoFachada: st.fotoFachada || null, fotoPersona: st.fotoPersona || null };
}
function openClientForm(id) {
  const base = id ? client(id) : {}, st = { ...base };
  const el = sheet(id ? 'Editar cliente' : 'Nuevo cliente', `<form id="cf">${clientFields(base)}<button class="btn pri blk" type="submit">${ico('check')} Guardar</button></form>`, { full: true });
  const f = $('#cf', el); bindPhotos(f, st); bindLoc(f, st);
  f.addEventListener('submit', async e => { e.preventDefault(); if (!String(new FormData(f).get('nombre')).trim()) return toast('Escribe el nombre'); await save('clients', readClient(f, st, base)); closeSheet(el); refreshAll(); toast('Cliente guardado'); });
}
function openClient(id) {
  sheet('Cliente', () => {
    const cl = client(id); if (!cl) return '';
    const ls = enriched().filter(x => x.l.clientId === id);
    return `<div class="head-c">${avatar(cl, 'lg')}<div style="flex:1;min-width:0"><h3>${esc(cl.nombre)}</h3><p>${cl.doc ? 'ID ' + esc(cl.doc) : 'Sin ID'}</p></div></div>
    <div class="stmt glass">${cl.tel ? `<div class="ln"><span>Teléfono</span><b>${esc(cl.tel)}</b></div>` : ''}${cl.dir ? `<div class="ln"><span>Dirección</span><b>${esc(cl.dir)}</b></div>` : ''}${cl.ref ? `<div class="ln"><span>Referencia</span><b>${esc(cl.ref)}</b></div>` : ''}<div class="ln"><span>Ubicación</span><b>${cl.lat != null ? 'Guardada' : 'Sin ubicar'}</b></div></div>
    <div class="btns" style="margin-bottom:6px">${cl.tel ? `<a class="btn sm" href="tel:${esc(cl.tel)}">${ico('phone')} Llamar</a>` : ''}${cl.lat != null ? `<button class="btn sm" data-a="nav" data-k="c:${cl.id}">${ico('nav')} Ir</button><button class="btn sm" data-a="route-toggle" data-k="c:${cl.id}">${ico('route')} A la ruta</button>` : ''}</div>
    ${cl.fotoFachada || cl.fotoPersona ? `<h3 class="sec"><span>Fotos</span></h3><div class="gallery">${cl.fotoFachada ? `<figure data-a="img" data-src="${cl.fotoFachada}"><img src="${cl.fotoFachada}" alt=""><figcaption>Fachada</figcaption></figure>` : ''}${cl.fotoPersona ? `<figure data-a="img" data-src="${cl.fotoPersona}"><img src="${cl.fotoPersona}" alt=""><figcaption>Cliente</figcaption></figure>` : ''}</div>` : ''}
    <h3 class="sec"><span>Créditos</span><span>${ls.length}</span></h3><div class="list">${ls.length ? ls.map(rowLoan).join('') : empty('wallet', 'Sin créditos.')}</div>
    <div class="btns" style="margin-top:18px"><button class="btn pri" data-a="new-loan-for" data-id="${cl.id}">${ico('plus')} Nuevo crédito</button></div>
    <div class="btns" style="margin-top:10px"><button class="btn" data-a="edit-client" data-id="${cl.id}">${ico('edit')} Editar</button><button class="btn danger" data-a="del-client" data-id="${cl.id}">${ico('trash')} Eliminar</button></div>`;
  }, { full: true });
}

/* ---- crédito (form) ---- */
function openLoanForm(id, presetClient) {
  const base = id ? loan(id) : { fecha: toISO(new Date()), frecuencia: 'Semanal', nCuotas: 4 };
  const cid = base.clientId || presetClient || '';
  const st = {}, cs = {};
  const d = new Date(), code = () => `${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')}`;
  const pct0 = base.prestado ? ((base.total - base.prestado) / base.prestado * 100).toFixed(2) : '20';
  const el = sheet(id ? 'Editar crédito' : 'Nuevo crédito', `<form id="lf">
    <label class="field"><span>Cliente</span><select name="cid" id="cid">${id ? '' : '<option value="__new">➕ Nuevo cliente…</option>'}${S.clients.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)).map(c => `<option value="${c.id}" ${c.id === cid ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select></label>
    <div id="newCl" ${cid || id ? 'hidden' : ''}>${clientFields({})}</div>
    <div class="two"><label class="field"><span>Monto prestado</span><input name="prestado" id="lp" type="number" inputmode="decimal" step="any" min="1" required value="${base.prestado || ''}"></label>
    <label class="field"><span>Interés %</span><input id="li" type="number" inputmode="decimal" step="any" min="0" value="${pct0}"></label></div>
    <label class="field"><span>Total a pagar (prestado + intereses)</span><input name="total" id="lt" type="number" inputmode="decimal" step="any" min="1" required value="${base.total || ''}"></label>
    <div class="two"><label class="field"><span>N.º de cuotas</span><input name="n" id="ln" type="number" inputmode="numeric" min="1" step="1" required value="${base.nCuotas}"></label>
    <label class="field"><span>Frecuencia</span><select name="frec">${['Diario', 'Semanal', 'Quincenal', 'Mensual'].map(x => `<option ${x === base.frecuencia ? 'selected' : ''}>${x}</option>`).join('')}</select></label></div>
    <label class="field"><span>Fecha del crédito</span><input name="fecha" type="date" required value="${base.fecha}"></label>
    <div class="calc glass"><div><span>Valor cuota</span><b class="num" id="cq">$0.00</b></div><div><span>Intereses</span><b class="num" id="ci">$0.00</b></div></div>
    <button class="btn pri blk" type="submit">${ico('check')} Guardar crédito</button></form>`, { full: true });
  const f = $('#lf', el), P = $('#lp', el), I = $('#li', el), T = $('#lt', el), N = $('#ln', el);
  bindPhotos($('#newCl', el), cs); bindLoc($('#newCl', el), cs);
  const upd = () => { const t = +T.value, n = +N.value, p = +P.value; $('#cq', el).textContent = m2(n > 0 ? t / n : 0); $('#ci', el).textContent = m2(Math.max(0, t - p)); };
  P.addEventListener('input', () => { if (I.value !== '') T.value = (+P.value * (1 + +I.value / 100)).toFixed(2); upd(); });
  I.addEventListener('input', () => { T.value = (+P.value * (1 + +I.value / 100)).toFixed(2); upd(); });
  T.addEventListener('input', () => { if (+P.value > 0) I.value = (((+T.value) / +P.value - 1) * 100).toFixed(2); upd(); });
  N.addEventListener('input', upd); upd();
  $('#cid', el).addEventListener('change', e => { $('#newCl', el).hidden = e.target.value !== '__new'; });
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(f); let clientId = fd.get('cid');
    if (clientId === '__new') {
      if (!String(fd.get('nombre') || '').trim()) return toast('Escribe el nombre del cliente');
      const g = k => String(fd.get(k) || '').trim();
      const c = { id: uid(), nombre: g('nombre'), doc: g('doc'), tel: g('tel'), dir: g('dir'), ref: g('ref'), lat: cs.lat ?? null, lng: cs.lng ?? null, fotoFachada: cs.fotoFachada || null, fotoPersona: cs.fotoPersona || null };
      await save('clients', c); clientId = c.id;
    }
    const prestado = +fd.get('prestado'), total = +fd.get('total'), n = Math.max(1, Math.floor(+fd.get('n')));
    if (!clientId || !(prestado > 0) || !(total >= prestado)) return toast('Revisa monto y total');
    const l = { ...base, id: base.id || uid(), clientId, codigo: base.codigo || code(), fecha: fd.get('fecha'), frecuencia: fd.get('frec'), nCuotas: n, prestado, total };
    await save('loans', l); closeSheet(el); refreshAll(); toast(id ? 'Crédito actualizado' : 'Crédito creado');
    if (!id) setTimeout(() => openLoan(l.id), 350);
  });
}

/* ============ notas ============ */
const NCOL = ['azul', 'violeta', 'verde', 'ambar', 'rosa'];
const NHEX = { azul: '#5ac8fa', violeta: '#a78bfa', verde: '#34d399', ambar: '#fbbf24', rosa: '#ff5a8c' };
function renderNotes() {
  const v = $('#v-notes');
  if (!$('#notesGrid')) {
    v.innerHTML = `<div class="hd"><div><small>Zona personal</small><h1>Notas</h1></div></div>
    <label class="search"><span class="ico">${ico('search').replace(/<\/?span[^>]*>/g, '')}</span><input id="noteQ" type="search" placeholder="Buscar en notas" value="${esc(S.ui.nq)}"></label><div id="notesGrid"></div>`;
    $('#noteQ').addEventListener('input', e => { S.ui.nq = e.target.value; renderNotes(); });
  }
  const q = S.ui.nq.trim().toLowerCase();
  const ns = S.notes.filter(n => !q || (n.titulo + ' ' + n.texto).toLowerCase().includes(q)).sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || b.fecha.localeCompare(a.fecha));
  $('#notesGrid').innerHTML = ns.length ? `<div class="notes">${ns.map(n => `<button class="note glass n-${n.color}" data-a="note" data-id="${n.id}"><h4><span>${esc(n.titulo || 'Sin título')}</span>${n.pin ? `<span style="color:${NHEX[n.color]}">${ico('star').replace('fill:none', '')}</span>` : ''}</h4><p>${esc(n.texto)}</p><time>${fmtD(new Date(n.fecha))}</time></button>`).join('')}</div>` : empty('note', S.notes.length ? 'Sin resultados.' : 'Tus apuntes personales.<br>Toca + para escribir.');
}
function openNoteForm(id) {
  const base = id ? S.notes.find(n => n.id === id) : { color: 'azul', pin: false };
  const st = { color: base.color, pin: !!base.pin };
  const el = sheet(id ? 'Editar nota' : 'Nueva nota', `<form id="nf">
    <label class="field"><span>Título</span><input name="titulo" autocomplete="off" value="${esc(base.titulo || '')}"></label>
    <label class="field"><span>Apunte</span><textarea name="texto" placeholder="Escribe aquí…">${esc(base.texto || '')}</textarea></label>
    <div class="colors">${NCOL.map(c => `<button type="button" data-c="${c}" class="${c === st.color ? 'on' : ''}" style="background:${NHEX[c]}" aria-label="${c}"></button>`).join('')}</div>
    <div class="btns" style="margin-bottom:12px"><button type="button" class="btn" id="pinB">${ico('star')} <span>${st.pin ? 'Fijada' : 'Fijar'}</span></button>${id ? `<button type="button" class="btn danger" id="delB">${ico('trash')} Eliminar</button>` : ''}</div>
    <button class="btn pri blk" type="submit">${ico('check')} Guardar</button></form>`, { full: true });
  const f = $('#nf', el);
  $$('[data-c]', el).forEach(b => b.addEventListener('click', () => { st.color = b.dataset.c; $$('[data-c]', el).forEach(x => x.classList.toggle('on', x === b)); }));
  $('#pinB', el).addEventListener('click', () => { st.pin = !st.pin; $('#pinB span:last-child', el).textContent = st.pin ? 'Fijada' : 'Fijar'; });
  const d = $('#delB', el); d && d.addEventListener('click', async () => { if (await ask('¿Eliminar esta nota?')) { await remove('notes', id); closeSheet(el); renderNotes(); } });
  f.addEventListener('submit', async e => {
    e.preventDefault(); const fd = new FormData(f);
    const t = String(fd.get('titulo')).trim(), x = String(fd.get('texto')).trim();
    if (!t && !x) return toast('Nota vacía');
    await save('notes', { ...base, id: base.id || uid(), titulo: t, texto: x, color: st.color, pin: st.pin, fecha: new Date().toISOString() });
    closeSheet(el); renderNotes();
  });
}

/* ============ mapa y rutas ============ */
let map, layer, routeLine, meMarker, lastCenter = null;
function stopData() {
  const out = [];
  for (const cl of S.clients) {
    if (cl.lat == null) continue;
    const ls = enriched().filter(x => x.l.clientId === cl.id), act = ls.filter(x => x.c.estado !== 'pagado');
    const st = !ls.length ? 'ok' : !act.length ? 'paid' : act.some(x => x.c.estado === 'vencido') ? 'bad' : 'ok';
    const debe = sum(act, x => x.c.debido);
    out.push({ key: 'c:' + cl.id, t: 'c', id: cl.id, name: cl.nombre, lat: cl.lat, lng: cl.lng, st, sub: act.length ? (debe > 0.5 ? 'Debe ' + m0(debe) : 'Saldo ' + m0(sum(act, x => x.c.saldo))) : (cl.dir || 'Cliente') });
  }
  for (const p of S.places) out.push({ key: 'p:' + p.id, t: 'p', id: p.id, name: p.nombre, lat: p.lat, lng: p.lng, st: 'pt', sub: p.nota || 'Punto' });
  return out;
}
const stopByKey = k => stopData().find(s => s.key === k);
const hav = (a, b) => { const R = 6371, r = x => x * Math.PI / 180, dl = r(b.lat - a.lat), dn = r(b.lng - a.lng); const q = Math.sin(dl / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dn / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(q)); };

function initMap() {
  if (map) return;
  map = L.map('map', { zoomControl: false, attributionControl: true }).setView([4.711, -74.072], 12);
  L.tileLayer(tileURL(), TILE_OPT).addTo(map);
  layer = L.layerGroup().addTo(map);
  refreshMap(true);
  getPos().then(p => { lastCenter = [p.lat, p.lng]; setMe(p); if (!stopData().length) map.setView([p.lat, p.lng], 15); }).catch(() => { });
}
function setMe(p) {
  if (!map) return;
  if (meMarker) meMarker.setLatLng([p.lat, p.lng]);
  else meMarker = L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', html: '<div class="me"></div>', iconSize: [18, 18] }), interactive: false, zIndexOffset: -100 }).addTo(map);
}
function refreshMap(fit) {
  if (!map) return;
  layer.clearLayers(); if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
  S.ruta = S.ruta.filter(k => stopByKey(k));
  const sd = stopData();
  sd.forEach(s => {
    const n = S.ruta.indexOf(s.key) + 1;
    const mk = L.marker([s.lat, s.lng], { icon: pinIcon(s.st, n || '') }).addTo(layer);
    mk.bindPopup(`<div class="pp"><b>${esc(s.name)}</b><span>${esc(s.sub)}</span><div class="btns"><button class="btn" data-a="pp-open" data-k="${s.key}">Abrir</button><button class="btn" data-a="route-toggle" data-k="${s.key}">${n ? 'Quitar' : '+ Ruta'}</button><button class="btn" data-a="nav" data-k="${s.key}">Ir</button></div></div>`);
  });
  const pts = S.ruta.map(stopByKey).filter(Boolean).map(s => [s.lat, s.lng]);
  if (pts.length > 1) routeLine = L.polyline(pts, { color: '#5ac8fa', weight: 5, opacity: .9, dashArray: '2 10', lineCap: 'round' }).addTo(map);
  if (fit && sd.length) map.fitBounds(L.latLngBounds(sd.map(s => [s.lat, s.lng])).pad(0.25), { maxZoom: 16 });
  renderMapTop(); renderRoute();
}
function renderMapTop() {
  $('#mapTop').innerHTML = `<div class="ttl glass"><span>Mapa</span><small>${stopData().length} lugares</small></div><button class="icon-btn glass" data-a="me" aria-label="Mi ubicación">${ico('locate')}</button><button class="icon-btn glass" data-a="add-place" aria-label="Agregar punto">${ico('pin')}</button>`;
}
function routeKm() { const p = S.ruta.map(stopByKey).filter(Boolean); let d = 0; for (let i = 1; i < p.length; i++) d += hav(p[i - 1], p[i]); return d; }
function renderRoute() {
  const r = $('#routeDrawer'); if (!S.ruta.length) { r.innerHTML = ''; return; }
  const st = S.ruta.map(stopByKey).filter(Boolean), open = S.ui.routeOpen;
  r.innerHTML = `<div class="glass"><div class="rhead" data-a="route-panel"><div><b>Ruta de cobro</b><br><span>${st.length} parada${st.length > 1 ? 's' : ''} · ≈ ${routeKm().toFixed(1)} km en línea recta</span></div>${ico(open ? 'down' : 'up')}</div>
  ${open ? st.map((s, i) => `<div class="stop"><div class="nn">${i + 1}</div><div class="nm">${esc(s.name)}</div><button class="mini" data-a="route-up" data-i="${i}">${ico('up')}</button><button class="mini" data-a="route-down" data-i="${i}">${ico('down')}</button><button class="mini" data-a="route-del" data-k="${s.key}">${ico('x')}</button></div>`).join('') + `<div class="btns" style="margin-top:10px"><button class="btn sm" data-a="route-opt">Optimizar</button><button class="btn sm" data-a="route-apple">Apple Maps</button><button class="btn sm" data-a="route-google">Google</button><button class="btn sm danger" data-a="route-clear">Limpiar</button></div>` : ''}</div>`;
}
const setRuta = k => { S.ruta = k; saveMeta(); refreshMap(); };
function navURL(kind, pts) {
  if (kind === 'apple') return 'https://maps.apple.com/?dirflg=d&saddr=Current%20Location&daddr=' + pts.map(p => `${p.lat},${p.lng}`).join('+to:');
  return 'https://www.google.com/maps/dir/Current+Location/' + pts.map(p => `${p.lat},${p.lng}`).join('/');
}
function openExt(url) { window.open(url, '_blank', 'noopener'); }
async function optimizeRoute() {
  let pts = S.ruta.map(stopByKey).filter(Boolean); if (pts.length < 2) return;
  let cur; try { cur = await getPos(); } catch { cur = null; }
  const left = [...pts], out = []; let at = cur || left.shift(); if (!cur) out.push(pts[0]);
  while (left.length) { let bi = 0, bd = Infinity; left.forEach((s, i) => { const d = hav(at, s); if (d < bd) { bd = d; bi = i; } }); at = left.splice(bi, 1)[0]; out.push(at); }
  setRuta(out.map(s => s.key)); toast('Ruta optimizada');
}

/* ---- puntos libres ---- */
async function openPlaceForm(id, pos) {
  const base = id ? S.places.find(p => p.id === id) : {}, st = { ...base };
  if (!id && !pos) { pos = await pickLocation(); if (!pos) return; }
  if (pos) { st.lat = pos.lat; st.lng = pos.lng; }
  const el = sheet(id ? 'Editar punto' : 'Nuevo punto', `<form id="pf2"><label class="field"><span>Nombre</span><input name="nombre" required autocomplete="off" value="${esc(base.nombre || '')}"></label><label class="field"><span>Nota</span><input name="nota" autocomplete="off" value="${esc(base.nota || '')}"></label>${locHTML(st)}${photoHTML('foto', 'Foto de la fachada', st.foto)}<button class="btn pri blk" type="submit">${ico('check')} Guardar</button></form>`, { full: true });
  const f = $('#pf2', el); bindPhotos(f, st); bindLoc(f, st);
  f.addEventListener('submit', async e => {
    e.preventDefault(); const fd = new FormData(f);
    if (st.lat == null) return toast('Falta la ubicación');
    await save('places', { ...base, id: base.id || uid(), nombre: String(fd.get('nombre')).trim(), nota: String(fd.get('nota')).trim(), lat: st.lat, lng: st.lng, foto: st.foto || null });
    closeSheet(el); refreshAll(); toast('Punto guardado');
  });
}
function openPlace(id) {
  sheet('Punto', () => {
    const p = S.places.find(x => x.id === id); if (!p) return '';
    return `<div class="head-c"><div class="avatar lg">${ico('pin')}</div><div><h3>${esc(p.nombre)}</h3><p>${esc(p.nota || '')}</p></div></div>
    ${p.foto ? `<div class="gallery" style="grid-template-columns:1fr;margin-bottom:14px"><figure data-a="img" data-src="${p.foto}" style="aspect-ratio:4/3"><img src="${p.foto}" alt=""><figcaption>Fachada</figcaption></figure></div>` : ''}
    <div class="btns"><button class="btn" data-a="route-toggle" data-k="p:${p.id}">${ico('route')} ${S.ruta.includes('p:' + p.id) ? 'Quitar de ruta' : 'A la ruta'}</button><button class="btn" data-a="nav" data-k="p:${p.id}">${ico('nav')} Ir</button></div>
    <div class="btns" style="margin-top:10px"><button class="btn" data-a="edit-place" data-id="${p.id}">${ico('edit')} Editar</button><button class="btn danger" data-a="del-place" data-id="${p.id}">${ico('trash')} Eliminar</button></div>`;
  }, { full: true });
}

/* ============ verificar recibo ============ */
function openVerify() {
  const el = sheet('Verificar recibo', `<p class="hint">Escribe el N.º que aparece en el recibo. Solo es válido si existe aquí y los datos coinciden.</p>
  <form id="vf"><label class="field"><span>N.º de recibo</span><input name="rid" id="rid" autocapitalize="characters" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="R261010-ABC234" required></label><button class="btn pri blk" type="submit">${ico('shield')} Verificar</button></form><div id="vres" style="margin-top:16px"></div>`);
  $('#vf', el).addEventListener('submit', e => {
    e.preventDefault();
    let q = $('#rid', el).value.toUpperCase().replace(/\s/g, ''); if (q && q[0] !== 'R') q = 'R' + q;
    const p = S.payments.find(x => x.recibo === q), l = p && loan(p.loanId), cl = l && client(l.clientId), r = $('#vres', el);
    if (!p || !l || !cl) { r.innerHTML = `<div class="stmt glass tint-bad" style="padding:16px 18px"><b style="font-size:17px;color:var(--bad)">NO VÁLIDO</b><p style="margin:6px 0 0;color:var(--txt2);font-size:14px">El recibo ${esc(q)} no está registrado.</p></div>`; return; }
    const d = new Date(p.fecha), ln = (a, b) => `<div class="ln"><span>${a}</span><b class="num">${b}</b></div>`;
    r.innerHTML = `<div class="stmt glass tint-ok"><div class="ln"><b style="color:var(--ok);font-size:17px">VÁLIDO</b><b>${esc(p.recibo)}</b></div>${ln('Cliente', esc(cl.nombre))}${cl.doc ? ln('ID', esc(cl.doc)) : ''}${ln('Crédito', esc(l.codigo))}${ln('Monto', m2(p.monto))}${ln('Fecha', fmtD(d) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()))}${ln('Método', esc(p.metodo))}</div><p class="hint">Compara cliente, monto y fecha con la imagen del recibo.</p>`;
  });
  setTimeout(() => $('#rid', el).focus(), 450);
}

/* ============ ajustes / respaldo ============ */
function openSettings() {
  const el = sheet('Ajustes', `<form id="sf"><label class="field"><span>Nombre del negocio (aparece en recibos)</span><input name="negocio" value="${esc(S.set.negocio)}"></label><label class="field"><span>Teléfono para comprobantes</span><input name="tel" type="tel" value="${esc(S.set.tel)}"></label><button class="btn pri blk" type="submit">${ico('check')} Guardar</button></form>
  <h3 class="sec"><span>Cuenta y nube</span></h3>${accountHTML()}
  <h3 class="sec"><span>Respaldo</span></h3><p class="hint">Exporta un respaldo de vez en cuando, además de la nube (incluye fotos).</p>
  <div class="btns"><button class="btn" data-k="exp">${ico('dl')} Exportar</button><label class="btn">${ico('share')} Importar<input type="file" accept="application/json" hidden data-k="imp"></label></div>
  <div class="btns" style="margin-top:10px"><button class="btn danger" data-k="wipe">${ico('trash')} Borrar todos los datos</button></div>`);
  $('#sf', el).addEventListener('submit', async e => { e.preventDefault(); const f = new FormData(e.target); S.set.negocio = String(f.get('negocio')).trim() || 'GL Money'; S.set.tel = String(f.get('tel')).trim(); S.set.u = Date.now(); await saveMeta(); queue('meta', 'settings', false, S.set.u); closeSheet(el); refreshAll(); toast('Guardado'); });
  el.addEventListener('click', async e => {
    const b = e.target.closest('button[data-k]'); if (!b) return;
    if (b.dataset.k === 'exp') {
      const data = JSON.stringify({ app: 'cobroEmpire', v: 1, at: new Date().toISOString(), clients: S.clients, loans: S.loans, payments: S.payments, notes: S.notes, places: S.places, set: S.set, ruta: S.ruta });
      const name = `cobroEmpire-respaldo-${toISO(new Date())}.json`, file = new File([data], name, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); return; } catch { return; } }
      const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = name; a.click();
    }
    if (b.dataset.k === 'syncnow') { closeSheet(el); syncNow(true); return; }
    if (b.dataset.k === 'login') { closeSheet(el); openAuth(); return; }
    if (b.dataset.k === 'logout') { if (await ask('Se cerrará la sesión en este teléfono. Los datos locales se conservan.', 'Cerrar sesión')) { signOut(); closeSheet(el); refreshAll(); toast('Sesión cerrada'); } return; }
    if (b.dataset.k === 'wipe' && await ask('Se borrarán TODOS los clientes, créditos, pagos, notas y puntos' + (session() ? ', también en la nube' : '') + '. No se puede deshacer.', 'Borrar todo')) {
      for (const st of ['clients', 'loans', 'payments', 'notes', 'places']) for (const o of S[st]) queue(st, o.id, true, Date.now());
      for (const s of ['clients', 'loans', 'payments', 'notes', 'places']) await dbClear(s).catch(() => { });
      Object.assign(S, { clients: [], loans: [], payments: [], notes: [], places: [], ruta: [] }); await saveMeta(); closeSheet(el); refreshAll(); toast('Datos borrados'); syncNow();
    }
  });
  $('[data-k="imp"]', el).addEventListener('change', async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text()); if (d.app !== 'cobroEmpire') throw 0;
      if (!await ask('Esto reemplazará los datos actuales por el respaldo.', 'Importar')) return;
      for (const s of ['clients', 'loans', 'payments', 'notes', 'places']) { await dbClear(s).catch(() => { }); S[s] = d[s] || []; for (const o of S[s]) { o.u = Date.now(); await dbPut(s, o); queue(s, o.id, false, o.u); } }
      S.set = { negocio: 'GL Money', tel: '', ...(d.set || {}) }; S.ruta = d.ruta || []; await saveMeta(); closeSheet(el); refreshAll(); toast('Respaldo importado');
    } catch { toast('Archivo no válido'); }
  });
}

/* ============ navegación y acciones ============ */
function refreshAll() {
  renderHome(); renderLoans(); renderNotes(); refreshMap();
  $$('.sheet-wrap[data-live]:not(.closing)').forEach(e => e._r && e._r());
}
function setTab(t) {
  S.ui.tab = t;
  $$('.view').forEach(v => v.classList.toggle('on', v.id === 'v-' + t));
  $$('#dockPill button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  if (t === 'map') { initMap(); setTimeout(() => map.invalidateSize(), 60); }
  window.scrollTo(0, 0);
}
const A = {
  tab: d => setTab(d.t),
  close: (d, e) => closeSheet(e.target.closest('.sheet-wrap')),
  fab: () => { const t = S.ui.tab; if (t === 'notes') openNoteForm(); else if (t === 'map') openPlaceForm(); else openLoanForm(); },
  loan: d => openLoan(d.id), client: d => openClient(d.id),
  pay: d => openPayForm(d.id), receipt: d => openReceipt(d.id, d.p),
  'edit-loan': d => openLoanForm(d.id), 'edit-client': d => openClientForm(d.id),
  'new-loan-for': d => openLoanForm(null, d.id),
  'del-pay': async d => { if (await ask('¿Eliminar este pago?')) { await remove('payments', d.id); refreshAll(); toast('Pago eliminado'); } },
  'del-loan': async d => { if (await ask('¿Eliminar este crédito y todos sus pagos?')) { for (const p of S.payments.filter(p => p.loanId === d.id)) await remove('payments', p.id); await remove('loans', d.id); $$('.sheet-wrap').forEach(closeSheet); refreshAll(); toast('Crédito eliminado'); } },
  'del-client': async d => { if (await ask('¿Eliminar al cliente, sus créditos y pagos?')) { for (const l of S.loans.filter(l => l.clientId === d.id)) { for (const p of S.payments.filter(p => p.loanId === l.id)) await remove('payments', p.id); await remove('loans', l.id); } await remove('clients', d.id); S.ruta = S.ruta.filter(k => k !== 'c:' + d.id); saveMeta(); $$('.sheet-wrap').forEach(closeSheet); refreshAll(); toast('Cliente eliminado'); } },
  note: d => openNoteForm(d.id),
  place: d => openPlace(d.id), 'edit-place': d => openPlaceForm(d.id), 'add-place': () => openPlaceForm(),
  'del-place': async d => { if (await ask('¿Eliminar este punto?')) { await remove('places', d.id); S.ruta = S.ruta.filter(k => k !== 'p:' + d.id); saveMeta(); $$('.sheet-wrap').forEach(closeSheet); refreshAll(); } },
  filter: d => { S.ui.filter = d.f; renderLoanList(); },
  settings: openSettings, verify: openVerify,
  img: d => { const lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = `<img src="${d.src}" alt="">`; lb.onclick = () => lb.remove(); document.body.append(lb); },
  me: async () => { try { const p = await getPos(); setMe(p); map.setView([p.lat, p.lng], 16); } catch { toast('No se pudo obtener el GPS'); } },
  'pp-open': d => { const s = stopByKey(d.k); map.closePopup(); if (!s) return; if (s.t === 'c') { const l = S.loans.find(x => x.clientId === s.id); l ? openLoan(l.id) : openClient(s.id); } else openPlace(s.id); },
  'route-toggle': d => { setRuta(S.ruta.includes(d.k) ? S.ruta.filter(k => k !== d.k) : [...S.ruta, d.k]); if (map) map.closePopup(); toast(S.ruta.includes(d.k) ? 'Añadido a la ruta' : 'Quitado de la ruta'); $$('.sheet-wrap[data-live]').forEach(e => e._r && e._r()); },
  'route-del': d => setRuta(S.ruta.filter(k => k !== d.k)),
  'route-up': d => { const i = +d.i; if (i > 0) { const r = [...S.ruta];[r[i - 1], r[i]] = [r[i], r[i - 1]]; setRuta(r); } },
  'route-down': d => { const i = +d.i; if (i < S.ruta.length - 1) { const r = [...S.ruta];[r[i + 1], r[i]] = [r[i], r[i + 1]]; setRuta(r); } },
  'route-clear': () => setRuta([]), 'route-opt': optimizeRoute,
  'route-panel': () => { S.ui.routeOpen = !S.ui.routeOpen; renderRoute(); },
  'route-apple': () => openExt(navURL('apple', S.ruta.map(stopByKey).filter(Boolean))),
  'route-google': () => openExt(navURL('google', S.ruta.map(stopByKey).filter(Boolean))),
  nav: d => { const s = stopByKey(d.k); if (s) openExt(navURL('apple', [s])); }
};
document.addEventListener('click', e => {
  const a = e.target.closest('[data-a]'); if (!a || !A[a.dataset.a]) return;
  if (a.tagName === 'A') return;
  A[a.dataset.a](a.dataset, e);
}, true);

/* ============ nube (Supabase) ============ */
const SUPA_URL = 'https://ezflhmsflyndcrgjxtdi.supabase.co';
const SUPA_KEY = 'sb_publishable_yiMtuMrjqhKMjk_GdxCBYg_Vv4PU_gI';
const lsGet = k => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { } };
const session = () => { try { return JSON.parse(lsGet('gl_session') || 'null'); } catch { return null; } };
const setSession = x => lsSet('gl_session', x ? JSON.stringify(x) : null);
function toSession(r) { return r && r.access_token ? { access_token: r.access_token, refresh_token: r.refresh_token, expires_at: r.expires_at || Math.floor(Date.now() / 1000) + (r.expires_in || 3600), user: { id: r.user && r.user.id, email: r.user && r.user.email } } : null; }
async function authCall(path, body) {
  const r = await fetch(SUPA_URL + '/auth/v1/' + path, { method: 'POST', headers: { apikey: SUPA_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.msg || j.error_description || j.message || j.error || 'Error ' + r.status);
  return j;
}
async function token() {
  let s = session(); if (!s) return null;
  if (s.expires_at > Math.floor(Date.now() / 1000) + 60) return s.access_token;
  try { const n = toSession(await authCall('token?grant_type=refresh_token', { refresh_token: s.refresh_token })); if (!n.user.id) n.user = s.user; setSession(n); return n.access_token; }
  catch (e) { if (/invalid|expired|not found|revoked/i.test(e.message)) { setSession(null); S.sync.state = 'nosession'; } throw e; }
}
async function rest(path, opts = {}) {
  const t = await token(); if (!t) throw new Error('nosession');
  const r = await fetch(SUPA_URL + '/rest/v1/' + path, { ...opts, headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + t, 'Content-Type': 'application/json', ...(opts.headers || {}) } });
  if (!r.ok) throw new Error((await r.text().catch(() => '')) || 'Error ' + r.status);
  return r.status === 204 ? null : r.json().catch(() => null);
}
const persistSync = () => dbPut('meta', { id: 'sync', outbox: S.sync.outbox, last: S.sync.last }).catch(() => { });
let syncTimer, syncing = false;
function queue(store, id, del, u) { S.sync.outbox[store + '/' + id] = { store, id, del: !!del, u }; persistSync(); if (session()) { clearTimeout(syncTimer); syncTimer = setTimeout(() => syncNow(), 2500); } }
const syncLabel = () => { const n = Object.keys(S.sync.outbox).length, st = S.sync.state; const t = st === 'nosession' ? 'sin nube' : st === 'syncing' ? 'sincronizando…' : st === 'offline' ? 'sin conexión' : st === 'error' ? 'error de nube' : n ? n + ' pendiente' + (n > 1 ? 's' : '') : 'en la nube ✓'; return ` · <span style="opacity:.9">${t}</span>`; };
const getLocal = (st, id) => st === 'meta' ? (id === 'settings' ? S.set : null) : S[st].find(x => x.id === id);
async function putLocal(st, id, data, u) {
  if (st === 'meta') { S.set = { negocio: 'GL Money', tel: '', ...data, id: 'settings', u }; await dbPut('meta', S.set); return; }
  data.u = u; const a = S[st], i = a.findIndex(x => x.id === id); if (i >= 0) a[i] = data; else a.push(data); await dbPut(st, data);
}
async function delLocal(st, id) { if (st === 'meta') return; S[st] = S[st].filter(x => x.id !== id); await dbDel(st, id); }
async function syncNow(manual) {
  if (syncing || !session()) return;
  if (!navigator.onLine) { S.sync.state = 'offline'; renderHome(); manual && toast('Sin conexión'); return; }
  syncing = true; S.sync.state = 'syncing'; renderHome();
  let changed = false;
  try {
    // 1) lista remota liviana
    const remote = new Map();
    for (let from = 0; ; from += 1000) {
      const rows = await rest('gl_docs?select=store,id,updated_at,deleted&order=store,id', { headers: { Range: `${from}-${from + 999}`, 'Range-Unit': 'items' } }) || [];
      rows.forEach(r => remote.set(r.store + '/' + r.id, { ms: Date.parse(r.updated_at), del: r.deleted }));
      if (rows.length < 1000) break;
    }
    // 2) lo local que no está en la nube se sube
    for (const st of ['clients', 'loans', 'payments', 'notes', 'places']) for (const o of S[st]) { const k = st + '/' + o.id; if (!remote.has(k) && !S.sync.outbox[k]) S.sync.outbox[k] = { store: st, id: o.id, del: false, u: o.u || Date.now() }; }
    if (!remote.has('meta/settings') && !S.sync.outbox['meta/settings']) S.sync.outbox['meta/settings'] = { store: 'meta', id: 'settings', del: false, u: S.set.u || Date.now() };
    // 3) si la nube es más nueva, gana la nube
    for (const [k, it] of Object.entries(S.sync.outbox)) { const r = remote.get(k); if (r && r.ms > it.u) delete S.sync.outbox[k]; }
    // 4) subir pendientes
    const items = Object.entries(S.sync.outbox);
    for (let i = 0; i < items.length; i += 5) {
      const chunk = items.slice(i, i + 5), rows = [];
      for (const [, it] of chunk) {
        const o = it.del ? null : getLocal(it.store, it.id);
        if (!it.del && !o) continue;
        rows.push({ store: it.store, id: it.id, data: it.del ? null : o, deleted: !!it.del, updated_at: new Date(it.u).toISOString() });
      }
      if (rows.length) await rest('gl_docs?on_conflict=user_id,store,id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows) });
      chunk.forEach(([k, it]) => { if (S.sync.outbox[k] && S.sync.outbox[k].u === it.u) delete S.sync.outbox[k]; });
      await persistSync();
    }
    // 5) traer lo más nuevo de la nube
    const need = {};
    for (const [k, r] of remote) {
      if (S.sync.outbox[k]) continue;
      const [st, ...rest_] = k.split('/'), id = rest_.join('/'), loc = getLocal(st, id), lu = loc ? (loc.u || 0) : -1;
      if (r.ms <= lu) continue;
      if (r.del) { if (loc) { await delLocal(st, id); changed = true; } continue; }
      (need[st] = need[st] || []).push({ id, ms: r.ms });
    }
    for (const [st, list] of Object.entries(need)) for (let i = 0; i < list.length; i += 8) {
      const part = list.slice(i, i + 8), ids = part.map(x => '"' + x.id + '"').join(',');
      const rows = await rest(`gl_docs?select=id,data,deleted,updated_at&store=eq.${st}&id=in.(${encodeURIComponent(ids)})`) || [];
      for (const r of rows) { if (r.deleted || !r.data) continue; await putLocal(st, r.id, r.data, Date.parse(r.updated_at)); changed = true; }
    }
    S.sync.last = Date.now(); S.sync.state = 'idle'; await persistSync();
    manual && toast('Sincronizado');
  } catch (e) {
    console.error(e); S.sync.state = session() ? 'error' : 'nosession';
    manual && toast(e.message === 'nosession' ? 'Inicia sesión' : 'No se pudo sincronizar');
  } finally { syncing = false; changed ? refreshAll() : renderHome(); }
}
function signOut() { setSession(null); lsSet('gl_skip', '1'); S.sync.state = 'nosession'; }
function accountHTML() {
  const s = session();
  if (!s) return `<p class="hint">Sin sesión: los datos solo están en este teléfono. Inicia sesión para guardarlos en la nube y no perder nada.</p><div class="btns"><button class="btn pri" data-k="login">${ico('user')} Iniciar sesión</button></div>`;
  const n = Object.keys(S.sync.outbox).length;
  return `<div class="stmt glass"><div class="ln"><span>Cuenta</span><b>${esc(s.user.email || '')}</b></div><div class="ln"><span>Última sincronización</span><b>${S.sync.last ? fmtD(new Date(S.sync.last)) + ' ' + pad(new Date(S.sync.last).getHours()) + ':' + pad(new Date(S.sync.last).getMinutes()) : '—'}</b></div><div class="ln"><span>Pendientes</span><b>${n}</b></div></div><div class="btns"><button class="btn pri" data-k="syncnow">Sincronizar ahora</button><button class="btn" data-k="logout">Cerrar sesión</button></div>`;
}
function openAuth() {
  if ($('.auth')) return;
  const el = document.createElement('div'); el.className = 'auth';
  el.innerHTML = `<form class="auth-card glass" id="af"><img src="${LOGO_URL}" alt="GL Money"><h2>GL Money</h2><p>Entra para guardar tus datos en la nube.</p>
  <label class="field"><span>Correo</span><input id="ae" type="email" autocomplete="email" autocapitalize="off" required></label>
  <label class="field"><span>Contraseña</span><input id="ap" type="password" autocomplete="current-password" minlength="6" required></label>
  <div class="msg" id="am" role="alert"></div>
  <button class="btn pri blk" type="submit" data-m="in">Entrar</button>
  <button class="btn blk" type="button" data-m="up" style="margin-top:10px">Crear cuenta</button>
  <button class="link" type="button" data-m="skip">Continuar sin cuenta</button></form>`;
  document.body.append(el);
  const msg = t => { $('#am', el).textContent = t; };
  const go = async mode => {
    const email = $('#ae', el).value.trim(), password = $('#ap', el).value;
    if (!email || password.length < 6) return msg('Escribe tu correo y una contraseña de 6 o más caracteres.');
    msg('Un momento…');
    try {
      let r;
      if (mode === 'up') { r = await authCall('signup', { email, password }); if (!r.access_token) return msg('Te enviamos un correo de confirmación. Confírmalo y luego pulsa Entrar.'); }
      else r = await authCall('token?grant_type=password', { email, password });
      const ses = toSession(r); if (!ses.user.id) throw new Error('Respuesta inválida');
      setSession(ses); lsSet('gl_skip', null); el.remove(); S.sync.state = 'idle'; renderHome(); toast('Sesión iniciada'); syncNow(true);
    } catch (e) {
      const m = e.message || '';
      msg(/invalid login/i.test(m) ? 'Correo o contraseña incorrectos.' : /not confirmed/i.test(m) ? 'Confirma tu correo primero (revisa tu bandeja).' : /already/i.test(m) ? 'Ese correo ya tiene cuenta. Pulsa Entrar.' : /signups? not allowed|disabled/i.test(m) ? 'El registro está desactivado.' : /fetch|network/i.test(m) ? 'Sin conexión.' : m);
    }
  };
  $('#af', el).addEventListener('submit', e => { e.preventDefault(); go('in'); });
  el.addEventListener('click', e => { const b = e.target.closest('[data-m]'); if (!b) return; if (b.dataset.m === 'up') go('up'); if (b.dataset.m === 'skip') { lsSet('gl_skip', '1'); el.remove(); } });
}

/* ============ arranque ============ */
async function boot() {
  $$('[data-i]').forEach(e => { e.innerHTML = `<svg viewBox="0 0 24 24">${IC[e.dataset.i]}</svg>`; });
  try { db = await openDB(); } catch (e) { console.warn(e); toast('Sin almacenamiento persistente'); }
  try {
    for (const s of ['clients', 'loans', 'payments', 'notes', 'places']) S[s] = await dbAll(s) || [];
    for (const m of await dbAll('meta') || []) { if (m.id === 'settings') S.set = { negocio: 'GL Money', tel: '', ...m }; if (m.id === 'ruta') S.ruta = m.keys || []; if (m.id === 'sync') S.sync = { ...S.sync, outbox: m.outbox || {}, last: m.last || null }; }
  } catch (e) { console.error(e); }
  for (const p of S.payments.filter(p => !p.recibo)) { p.recibo = genReceiptId(new Date(p.fecha)); p.u = Date.now(); await dbPut('payments', p).catch(() => { }); queue('payments', p.id, false, p.u); }
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => { });
  S.sync.state = session() ? 'idle' : 'nosession';
  renderHome(); renderLoans(); renderNotes();
  if (!session() && !lsGet('gl_skip')) openAuth(); else syncNow();
  addEventListener('online', () => syncNow());
  document.addEventListener('visibilitychange', () => { if (!document.hidden) syncNow(); });
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js').catch(() => { });
}
boot();
