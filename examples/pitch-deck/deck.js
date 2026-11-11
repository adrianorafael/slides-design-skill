const pptxgen = require("pptxgenjs");
// Exemplo de referência da Slides Design Skill: o pitch da própria skill, no design system "Sinal".
// Uso: node deck.js  (gera Slides_Design_Skill_pitch.pptx nesta pasta) e depois python3 post.py Slides_Design_Skill_pitch.pptx
// O tema (cores e nome) é aplicado com apply_theme.js da skill pptx; aponte PPTX_SKILL_DIR para a pasta dela.
const path = require("path");
const OUT = path.join(__dirname, "Slides_Design_Skill_pitch.pptx");
let applyTheme = null;
try { applyTheme = require(path.join(process.env.PPTX_SKILL_DIR || "", "scripts/apply_theme.js")).applyTheme; } catch (e) { /* tema opcional */ }

// ===== Mini design system "Sinal" =====
// Regra-mãe: cor é significado. Marca usa só tons frios (azul, ciano, violeta), que não carregam alerta.
// Vermelho é status: aparece só quando um dado viola um limite (SLO, prazo, capacidade). Amarelo, laranja e verde ficam fora:
// em tecnologia eles significam atenção, alerta e "saudável".
const HUE = {
  azul:    { fill: "1F5EFF", text: "1F5EFF", tint: "E8EEFF", light: "8FB0FF" },   // confiança e ação (cor de link e botão)
  ciano:   { fill: "0BA5D8", text: "0779A6", tint: "E0F6FC", light: "5CD3F5" },   // energia tecnológica; decoração e fundo escuro
  violeta: { fill: "6E56F8", text: "6E56F8", tint: "EEEBFF", light: "B3A6FF" } }; // terceira cor de marca: categorias e mosaico
const STATUS = { critico: { fill: "D92D20", text: "D92D20", tint: "FDECEA", light: "FF7A6E" } };
const ROT = ["azul", "ciano", "violeta"];
const DS = { ink: "0B1B3F", body: "4A5568", mid: "8A94A6", mute: "D3D8E0", hair: "E6EAF0", tint: "F4F6F9", paper: "FFFFFF", white: "FFFFFF",
  dark: "0B1B3F", darkCard: "1A2B55", soft: "C3CCE0", tagBg: HUE.azul.tint, tagFg: HUE.azul.text };
const tone = k => { const h = k === "critico" ? STATUS.critico : HUE.azul;
  Object.assign(DS, { accent: h.text, accentFill: h.fill, accentLight: h.light, accentTint: h.tint }); };
tone("neutro");
const THEME = { name: "Slides Design Skill", headFontFace: "Aptos", bodyFontFace: "Aptos",
  colors: { dk1: DS.ink, lt1: DS.paper, dk2: DS.body, lt2: DS.tint, accent1: DS.accent, accent2: DS.accentLight, accent3: DS.mid,
    accent4: DS.mute, accent5: DS.hair, accent6: HUE.violeta.fill, hlink: DS.accent, folHlink: DS.body } };

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme = { headFontFace: "Aptos", bodyFontFace: "Aptos" };
pres.title = "Slides Design Skill";

const titlePh = (color, o = {}) => ({ placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.78, w: 12.13, h: 1.05,
  fontSize: 28, bold: true, color, valign: "top", align: "left", margin: 0, fontFace: "Aptos", ...o }, text: "" } });
pres.defineSlideMaster({ title: "CLARO", background: { color: DS.paper }, objects: [titlePh(DS.ink)],
  slideNumber: { x: 12.33, y: 6.92, w: 0.4, h: 0.3, fontSize: 10, color: DS.mid, align: "right" } });
pres.defineSlideMaster({ title: "ESCURO", background: { color: DS.dark }, objects: [titlePh(DS.white)],
  slideNumber: { x: 12.33, y: 6.92, w: 0.4, h: 0.3, fontSize: 10, color: DS.soft, align: "right" } });
pres.defineSlideMaster({ title: "CAPA", background: { color: DS.paper },
  objects: [titlePh(DS.ink, { x: 0.6, y: 2.0, w: 6.9, h: 2.6, fontSize: 42 })] });
pres.defineSlideMaster({ title: "AZUL", background: { color: HUE.azul.fill }, objects: [titlePh(DS.white)],
  slideNumber: { x: 12.33, y: 6.92, w: 0.4, h: 0.3, fontSize: 10, color: DS.white, align: "right" } });

// ---------- componentes ----------
const T = (s, text, o) => s.addText(text, { isTextBox: true, margin: 0, fontFace: "Aptos", color: DS.ink, fontSize: 14, valign: "top", ...o });
const rect = (s, x, y, w, h, cor, o = {}) => s.addShape(o.round ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE,
  { x, y, w, h, rectRadius: o.round, fill: { color: cor, transparency: o.transp || 0 }, line: o.line ? { color: o.line, width: o.lw || 1 } : { type: "none" } });
const dot = (s, x, y, d, cor, o = {}) => s.addShape(pres.shapes.OVAL, { x: x - d / 2, y: y - d / 2, w: d, h: d,
  fill: o.hollow ? undefined : { color: cor }, line: o.line ? { color: o.line, width: o.lw || 1.5 } : { type: "none" } });
const seg = (s, x1, y1, x2, y2, cor, width = 1, o = {}) => s.addShape(pres.shapes.LINE, {
  x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), flipH: x2 < x1, flipV: y2 < y1,
  line: { color: cor, width, dashType: o.dash, endArrowType: o.arrow } });
const mix = (a, b, t) => { const c = h => [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)), A = c(a), B = c(b); t = Math.max(0, Math.min(1, t));
  return A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("").toUpperCase(); };
const poly = (s, pts, o = {}) => {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys);
  const points = pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })); if (o.close) points.push({ close: true });
  s.addShape(pres.shapes.CUSTOM_GEOMETRY, { x: x0, y: y0, w: Math.max(Math.max(...xs) - x0, 0.01), h: Math.max(Math.max(...ys) - y0, 0.01), points,
    fill: o.fill ? { color: o.fill, transparency: o.transp || 0 } : undefined,
    line: o.line ? { color: o.line, width: o.lw || 1.5, dashType: o.dash } : { type: "none" } }); };
const curveBand = (s, xa, ya0, ya1, xb, yb0, yb1, cor, transp) => {
  const y0 = Math.min(ya0, yb0), xm = (xb - xa) / 2, r = (x, y) => ({ x: x - xa, y: y - y0 });
  s.addShape(pres.shapes.CUSTOM_GEOMETRY, { x: xa, y: y0, w: xb - xa, h: Math.max(ya1, yb1) - y0,
    fill: { color: cor, transparency: transp || 0 }, line: { type: "none" },
    points: [r(xa, ya0), { ...r(xb, yb0), curve: { type: "cubic", x1: xm, y1: ya0 - y0, x2: xm, y2: yb0 - y0 } }, r(xb, yb1),
      { ...r(xa, ya1), curve: { type: "cubic", x1: xm, y1: yb1 - y0, x2: xm, y2: ya1 - y0 } }, { close: true }] }); };
const arcBand = (s, cx, cy, ri, ro, a0, a1, cor) => {
  const sw = a1 - a0, bx = cx - ro, by = cy - ro, rad = a => a * Math.PI / 180;
  const P = (r, a) => ({ x: cx + r * Math.cos(rad(a)) - bx, y: cy + r * Math.sin(rad(a)) - by });
  s.addShape(pres.shapes.CUSTOM_GEOMETRY, { x: bx, y: by, w: 2 * ro, h: 2 * ro, fill: { color: cor }, line: { type: "none" },
    points: [P(ro, a0), { x: 0, y: 0, curve: { type: "arc", wR: ro, hR: ro, stAng: a0, swAng: sw } }, P(ri, a1),
      { x: 0, y: 0, curve: { type: "arc", wR: ri, hR: ri, stAng: a1, swAng: -sw } }, { close: true }] }); };
const geo = (G, P, Y, n) => ({
  cx: i => G.x + G.w * (P.x + P.w * ((i + 0.5) / n)),
  ex: i => G.x + G.w * (P.x + P.w * (i / n)),
  vy: v => G.y + G.h * (P.y + P.h * (1 - (v - Y.min) / (Y.max - Y.min))),
  vx: v => G.x + G.w * (P.x + P.w * ((v - Y.min) / (Y.max - Y.min))),
  band: horizontal => (horizontal ? G.h * P.h : G.w * P.w) / n,
});
const limpo = () => ({ showLegend: false, showTitle: false, valAxisHidden: true,
  valGridLine: { style: "none" }, catGridLine: { style: "none" }, catAxisLineShow: false, valAxisLineShow: false,
  catAxisLabelColor: DS.body, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt",
  dataLabelFontSize: 12, dataLabelColor: DS.ink });
const squarify = (vals, x, y, w, h) => {
  const tot = vals.reduce((a, b) => a + b, 0), areas = vals.map(v => (v * w * h) / tot), out = [];
  let rx = x, ry = y, rw = w, rh = h, row = [], i = 0;
  const worst = (r, side) => { const sm = r.reduce((a, b) => a + b, 0), mx = Math.max(...r), mn = Math.min(...r);
    return Math.max((side * side * mx) / (sm * sm), (sm * sm) / (side * side * mn)); };
  const lay = () => { const sm = row.reduce((a, b) => a + b, 0);
    if (rw >= rh) { const cw = sm / rh; let yy = ry; row.forEach(a => { out.push({ x: rx, y: yy, w: cw, h: a / cw }); yy += a / cw; }); rx += cw; rw -= cw; }
    else { const ch = sm / rw; let xx = rx; row.forEach(a => { out.push({ x: xx, y: ry, w: a / ch, h: ch }); xx += a / ch; }); ry += ch; rh -= ch; } };
  while (i < areas.length) { const side = Math.min(rw, rh);
    if (!row.length || worst([...row, areas[i]], side) <= worst(row, side)) { row.push(areas[i]); i++; } else { lay(); row = []; } }
  if (row.length) lay();
  return out;
};
const br = v => v.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// slide de conteúdo com zonas fixas
const FONTE_ILUS = "Fonte: dados ilustrativos de um e-commerce fictício, 17 a 30/11/2025";
let secaoAtual = null;
const secao = t => { pres.addSection({ title: t }); secaoAtual = t; tone(t === "Galeria · Observabilidade" ? "critico" : "neutro"); };
function slide({ dark = false, hero = null, kicker, title, sub, fonte, notes, master }) {
  const s = pres.addSlide({ masterName: master || (hero === "azul" ? "AZUL" : dark ? "ESCURO" : "CLARO"), sectionTitle: secaoAtual });
  const fg = hero === "azul" || dark ? DS.white : null;
  if (kicker) {
    const kw = kicker.length * (0.62 * 11 + 2) / 72 + 0.3;
    if (fg) rect(s, 0.6, 0.36, kw, 0.32, fg, { round: 0.16, transp: 84 }); else rect(s, 0.6, 0.36, kw, 0.32, DS.tagBg, { round: 0.16 });
    T(s, kicker, { x: 0.6, y: 0.36, w: kw, h: 0.32, fontSize: 11, bold: true, color: fg || DS.tagFg, charSpacing: 2, align: "center", valign: "middle" });
  }
  const hiOpt = hero === "azul" ? { color: HUE.azul.fill, highlight: DS.white } : { color: dark ? DS.accentLight : DS.accent };
  if (title) s.addText(title.map(([t, hi]) => ({ text: t, options: hi ? hiOpt : {} })), { placeholder: "title" });
  if (sub) T(s, sub, { x: 0.6, y: 1.95, w: 12.13, h: 0.3, fontSize: 14, color: fg ? fg : DS.body });
  if (fonte) T(s, fonte, { x: 0.6, y: 6.95, w: 11.0, h: 0.25, fontSize: 10, color: fg ? fg : DS.mid });
  if (notes) s.addNotes(notes);
  return s;
}
// mosaico geométrico: a assinatura visual (quadrados, círculos, quartos e meias-luas nas 5 cores)
function tile(s, x, y, z, bg, shape, fg) {
  rect(s, x, y, z, z, bg);
  if (shape === "circ") dot(s, x + z / 2, y + z / 2, z * 0.78, fg);
  if (shape === "tl") arcBand(s, x, y, 0.001, z, 0, 90, fg);
  if (shape === "br") arcBand(s, x + z, y + z, 0.001, z, 180, 270, fg);
  if (shape === "tr") arcBand(s, x + z, y, 0.001, z, 90, 180, fg);
  if (shape === "bl") arcBand(s, x, y + z, 0.001, z, 270, 360, fg);
  if (shape === "half") arcBand(s, x + z / 2, y + z, 0.001, z / 2, 180, 360, fg);
}
// adesivo da faísca (círculo levemente girado)
const sticker = (s, cx, cy, d, text, rot = -8) => {
  s.addShape(pres.shapes.OVAL, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: DS.spark }, line: { type: "none" }, rotate: rot });
  T(s, text, { x: cx - d / 2 + 0.12, y: cy - d / 2, w: d - 0.24, h: d, fontSize: 13, bold: true, color: DS.ink, align: "center", valign: "middle", rotate: rot });
};
// coluna "e daí?" num painel na cor da seção
function eDai(s, big, label, text, o = {}) {
  const x = 9.2, w = 3.33, y = o.y || 2.75;
  rect(s, 8.95, 2.45, 3.78, 4.2, DS.accentTint, { round: 0.12 });
  T(s, big, { x, y, w, h: 0.8, fontSize: 46, bold: true, color: DS.accent });
  T(s, label, { x, y: y + 0.85, w, h: 0.55, fontSize: 14, bold: true, color: DS.ink });
  T(s, text, { x, y: y + 1.6, w, h: 1.9, fontSize: 15, color: DS.body });
}
const SUB_GAL = s => `${s} · exemplo gerado pela skill, dados ilustrativos`;

// =====================================================================
secao("Pitch");
// 1. Capa
{
  const s = pres.addSlide({ masterName: "CAPA", sectionTitle: secaoAtual });
  T(s, "SLIDES DESIGN SKILL · PARA O SEU CLAUDE", { x: 0.6, y: 1.4, w: 7, h: 0.3, fontSize: 12, color: HUE.azul.text, charSpacing: 2, bold: true });
  s.addText([{ text: "Seus dados viram slides executivos " }, { text: "prontos para decidir", options: { color: HUE.azul.text } }], { placeholder: "title" });
  T(s, "Título de ação, gráfico certo e design limpo, gerados e revisados automaticamente", { x: 0.6, y: 4.8, w: 6.6, h: 0.7, fontSize: 18, color: DS.body });
  const z = 1.55, X = 8.08, Y = 1.05, H = HUE;
  const g = [[[H.azul.fill, "none"], [H.ciano.tint, "tl", H.ciano.fill], [H.violeta.fill, "circ", DS.white]],
    [[DS.ink, "none"], [H.azul.tint, "br", H.azul.fill], [H.violeta.tint, "half", H.violeta.fill]],
    [[H.ciano.fill, "tr", H.ciano.light], [H.azul.fill, "circ", H.azul.light], [H.ciano.tint, "bl", H.violeta.fill]]];
  g.forEach((row, r) => row.forEach(([bg, sh, fg], c) => tile(s, X + c * z, Y + r * z, z, bg, sh, fg)));
  T(s, "46", { x: X + 0.15, y: Y + z + 0.1, w: z - 0.2, h: 0.9, fontSize: 60, bold: true, color: DS.white });
  T(s, "formas de gráfico testadas", { x: X + 0.18, y: Y + z + 0.98, w: z - 0.3, h: 0.5, fontSize: 11, color: DS.white });
  s.addNotes("Abertura: a Slides Design Skill transforma dados em slides executivos. O gancho é o catálogo de 46 formas de gráfico testadas.");
}
// 2. Resumo
{
  const s = slide({ kicker: "RESUMO", title: [["Escreve o título, escolhe o gráfico e "], ["critica o próprio slide", 1]],
    fonte: "Fonte: conteúdo da Slides Design Skill", notes: "Três números resumem a skill: catálogo, crítica e roteiros prontos." });
  const cards = [["46", "formas de gráfico testadas", "Em 10 famílias, cada uma com quando usar, quando evitar e um título-modelo.", "azul"],
    ["12", "checagens de crítica", "Antes de entregar, a skill renderiza, olha o slide como designer e corrige o que falhou.", "ciano"],
    ["6", "roteiros de vendas prontos", "POC, business case, discovery, QBR, RFP e pós-incidente, já com a sequência de gráficos.", "violeta"]];
  cards.forEach(([n, l, t, k], i) => {
    const x = 0.6 + i * (3.843 + 0.3), h = HUE[k];
    rect(s, x, 2.25, 3.843, 4.2, h.tint, { round: 0.12 });
    T(s, n, { x: x + 0.35, y: 2.55, w: 3.2, h: 1.0, fontSize: 60, bold: true, color: h.text });
    T(s, l, { x: x + 0.35, y: 3.65, w: 3.2, h: 0.7, fontSize: 18, bold: true, color: DS.ink });
    T(s, t, { x: x + 0.35, y: 4.45, w: 3.15, h: 1.6, fontSize: 16, color: DS.body });
  });
}
// 3. Títulos de ação
{
  const s = slide({ kicker: "PITCH · TÍTULOS DE AÇÃO", title: [["Títulos de ação entregam "], ["a conclusão antes do gráfico", 1]],
    sub: "Rótulos de tópico reescritos pela skill: sujeito, verbo forte e resultado quantificado",
    fonte: "Fonte: exemplos do guia de títulos da Slides Design Skill", notes: "O título afirma a conclusão; o corpo prova. Lidos em sequência, os títulos contam a história." });
  T(s, "EM VEZ DE", { x: 0.6, y: 2.5, w: 4.8, h: 0.25, fontSize: 11, color: DS.mid, charSpacing: 2 });
  T(s, "A SKILL ESCREVE", { x: 6.05, y: 2.5, w: 6, h: 0.25, fontSize: 11, color: DS.mid, charSpacing: 2 });
  const rows = [
    ["Houve um aumento de 5% das vendas devido ao comportamento dos clientes durante a Black Friday", [["Black Friday elevou as vendas em "], ["5%", 1]]],
    ["Análise de vendas do 4º trimestre", [["Vendas do 4º tri cresceram "], ["12%", 1], [", puxadas pelo canal digital"]]],
    ["Tempo de resposta por aplicação", [["Checkout responde "], ["3x", 1], [" mais devagar que o restante da jornada"]]],
    ["Resultados da POC", [["POC encontrou a causa raiz em "], ["4 min", 1], [", contra 2 h hoje"]]]];
  rows.forEach(([a, b], i) => {
    const y = 2.9 + i * 0.92;
    seg(s, 0.6, y - 0.08, 12.73, y - 0.08, DS.hair, 1);
    T(s, a, { x: 0.6, y, w: 4.8, h: 0.75, fontSize: 14, color: DS.mid, valign: "middle" });
    seg(s, 5.5, y + 0.375, 5.85, y + 0.375, DS.mute, 1.5, { arrow: "triangle" });
    s.addText(b.map(([t, hi]) => ({ text: t, options: { bold: true, color: hi ? DS.accent : DS.ink } })),
      { isTextBox: true, margin: 0, fontFace: "Aptos", x: 6.05, y, w: 6.68, h: 0.75, fontSize: 17, valign: "middle" });
  });
  T(s, "Lidos em sequência, os títulos contam a história do deck e terminam num pedido de decisão.", { x: 0.6, y: 6.6, w: 12, h: 0.3, fontSize: 16, color: DS.body });
}
// 4. Famílias (barras ordenadas)
{
  const s = slide({ kicker: "PITCH · ESCOLHA DO GRÁFICO", title: [["Observabilidade tem "], ["9 das 46 formas", 1], [", a língua nativa de TI"]],
    sub: "Formas de gráfico testadas por família do catálogo", fonte: "Fonte: catálogo da Slides Design Skill",
    notes: "O verbo do título indica a família; o formato dos dados filtra a forma. Observabilidade é o diferencial para públicos técnicos." });
  const fam = [["Observabilidade", 9], ["Comparação", 9], ["Tempo", 7], ["Parte do todo", 7], ["Distribuição", 4], ["Indicadores", 3], ["Relação", 2], ["Fluxo", 2], ["Plano", 2], ["Geografia", 1]];
  s.addChart(pres.charts.BAR, [{ name: "Formas", labels: fam.map(f => f[0]), values: fam.map(f => f[1]) }], {
    x: 0.6, y: 2.45, w: 8.1, h: 4.2, layout: { x: 0.24, y: 0.0, w: 0.68, h: 1.0 }, ...limpo(), barDir: "bar", catAxisOrientation: "maxMin",
    valAxisMinVal: 0, valAxisMaxVal: 10, chartColors: fam.map((_, i) => i === 0 ? DS.accent : DS.mute), showValue: true,
    dataLabelPosition: "outEnd", barGapWidthPct: 40, catAxisLabelFontSize: 13 });
  eDai(s, "9", "formas de observabilidade", "Medidor, banda de anomalia, mapa de serviços, rastreamento e colmeia: os gráficos que TI e SRE já leem no dia a dia.");
}
// 5. Chamada DM (azul = cor universal de link e botão: convite, não alerta)
{
  const s = slide({ hero: "azul", kicker: "UMA PAUSA RÁPIDA", notes: "Chamada para ação: quem gostou chama na DM e recebe o link de download da skill." });
  T(s, "Já pensou em toda essa facilidade automática para gerar seus slides executivos?", { x: 0.6, y: 1.35, w: 7.4, h: 2.4, fontSize: 36, bold: true, color: DS.white });
  T(s, "Se está gostando, me chame na DM que te envio o link de download da skill pronta para usar no seu Claude.", { x: 0.6, y: 3.95, w: 7.2, h: 1.3, fontSize: 21, color: DS.white });
  rect(s, 0.6, 5.5, 3.4, 0.7, DS.white, { round: 0.35 });
  T(s, "Me chame na DM  →", { x: 0.6, y: 5.5, w: 3.4, h: 0.7, fontSize: 18, bold: true, color: HUE.azul.fill, align: "center", valign: "middle" });
  T(s, "MENSAGEM DIRETA", { x: 8.3, y: 1.55, w: 4.4, h: 0.25, fontSize: 11, color: DS.white, charSpacing: 2, bold: true });
  rect(s, 9.0, 2.0, 3.73, 0.95, DS.ink, { round: 0.18 });
  T(s, "Oi! Quero a Slides Design Skill", { x: 9.25, y: 2.0, w: 3.3, h: 0.95, fontSize: 16, bold: true, color: DS.white, valign: "middle" });
  rect(s, 8.3, 3.2, 3.9, 1.3, DS.white, { round: 0.18 });
  T(s, "Te mando o link agora. É só adicionar no seu Claude e pedir o deck.", { x: 8.55, y: 3.2, w: 3.45, h: 1.3, fontSize: 16, color: DS.ink, valign: "middle" });
  rect(s, 9.0, 4.75, 3.73, 0.95, DS.ink, { round: 0.18 });
  T(s, "Fechado, vou testar no próximo deck", { x: 9.25, y: 4.75, w: 3.35, h: 0.95, fontSize: 16, bold: true, color: DS.white, valign: "middle" });
  const z = 0.6; [[DS.ink, "circ", HUE.ciano.fill], [HUE.ciano.fill, "tl", DS.white], [HUE.violeta.fill, "half", HUE.violeta.light]]
    .forEach(([bg, sh, fg], i) => tile(s, 10.93 + i * z, 6.2, z, bg, sh, fg));
}
// =====================================================================
secao("Método");
// 6. Gestalt antes x depois
{
  const s = slide({ kicker: "MÉTODO · DESTAQUE ÚNICO", title: [["Cinza mais uma cor leva o olho "], ["direto à prova", 1]],
    fonte: "Fonte: dados ilustrativos de receita por canal, R$ mi", notes: "Mesmos dados, dois tratamentos. A skill desenha tudo em cinza e pinta só o dado que prova o título." });
  const labels = ["Site", "App", "Marketplace", "Loja física"], values = [18.4, 15.9, 9.6, 4.3];
  T(s, "ANTES: 4 cores, legenda, grade e eixo", { x: 0.6, y: 2.0, w: 5.8, h: 0.3, fontSize: 11, color: DS.mid, charSpacing: 2 });
  T(s, "DEPOIS: cinza, um destaque e rótulo direto", { x: 6.93, y: 2.0, w: 5.8, h: 0.3, fontSize: 11, color: DS.accent, charSpacing: 2, bold: true });
  s.addChart(pres.charts.BAR, [{ name: "Receita", labels, values }], { x: 0.6, y: 2.4, w: 5.8, h: 3.9, barDir: "col",
    chartColors: ["E6553A", "2E9E5B", "F2B233", "3A7BD5"], showLegend: true, legendPos: "b", showTitle: true, title: "Receita por canal (R$ mi)",
    titleFontSize: 14, valGridLine: { color: "BBBBBB", size: 1 }, catAxisLabelFontSize: 11, valAxisLabelFontSize: 11, legendFontSize: 11,
    catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt" });
  s.addChart(pres.charts.BAR, [{ name: "Receita", labels, values }], { x: 6.93, y: 2.4, w: 5.8, h: 3.9, layout: { x: 0.02, y: 0.1, w: 0.96, h: 0.8 },
    ...limpo(), barDir: "col", chartColors: values.map((_, i) => i === 0 ? DS.accent : DS.mute), showValue: true, dataLabelPosition: "outEnd",
    valAxisMinVal: 0, valAxisMaxVal: 21, barGapWidthPct: 45, dataLabelFormatCode: "#,##0.0" });
  T(s, "À direita, a resposta aparece em três segundos: o site lidera. À esquerda, o olho ainda está decifrando a legenda.", { x: 0.6, y: 6.45, w: 12.1, h: 0.3, fontSize: 16, color: DS.body });
}
// 7. Fluxo de trabalho
{
  const s = slide({ kicker: "MÉTODO · FLUXO DE TRABALHO", title: [["Seis passos levam da decisão esperada ao "], ["deck revisado", 1]],
    sub: "O que a skill faz a cada pedido de apresentação", fonte: "Fonte: fluxo de trabalho da Slides Design Skill",
    notes: "O diferencial é o passo 6: a skill renderiza, critica com 12 perguntas e corrige antes de entregar." });
  const steps = [["Decisão", "Audiência, decisão esperada e uso: ao vivo ou lido sozinho"],
    ["Roteiro", "Só os títulos de ação, em sequência, terminando num pedido"],
    ["Ficha", "Título, dado que prova, forma, destaque e “e daí?” de cada slide"],
    ["Sistema visual", "Template da marca ou mini design system com tokens"],
    ["Construção", "Gráficos nativos e editáveis sempre que a forma existe"],
    ["Crítica", "Renderiza, critica com 12 checagens e corrige antes de entregar"]];
  steps.forEach(([n, d], i) => {
    const x = 0.6 + i * (1.87 + 0.18), hi = i === 5, h = HUE[ROT[i % 3]];
    rect(s, x, 2.55, 1.87, 3.7, hi ? DS.accentFill : h.tint, { round: 0.12 });
    T(s, String(i + 1), { x: x + 0.22, y: 2.8, w: 1.4, h: 0.8, fontSize: 40, bold: true, color: hi ? DS.white : h.text });
    T(s, n, { x: x + 0.22, y: 3.7, w: 1.5, h: 0.65, fontSize: 17, bold: true, color: hi ? DS.white : DS.ink });
    T(s, d, { x: x + 0.22, y: 4.45, w: 1.5, h: 1.75, fontSize: 14, color: hi ? DS.white : DS.body });
  });
}
// 7b. Design system
{
  const s = slide({ kicker: "MÉTODO · SISTEMA VISUAL", title: [["Cada cor tem um significado, e "], ["cada significado foi validado", 1]],
    sub: "O mini design system deste deck: cor de marca separada de cor de status", fonte: "Fonte: sistema visual da Slides Design Skill · contraste medido pelo critério WCAG",
    notes: "Marca em tons frios, que não carregam alerta. Vermelho só como status de problema. Amarelo, laranja e verde ficam de fora por terem significado fixo em tecnologia." });
  const rows = [[HUE.azul.fill, "Azul · marca e ação", "Confiança; é a cor de link e de botão. Destaque padrão e convite para a DM.", "5,1:1"],
    [HUE.ciano.fill, "Ciano · energia", "Tecnologia e modernidade. Só em formas e em fundo escuro.", "5,9:1 no escuro"],
    [HUE.violeta.fill, "Violeta · variedade", "Terceira cor de marca: categorias, mosaico e cartões.", "4,8:1"],
    [STATUS.critico.fill, "Vermelho · status crítico", "Só quando o dado viola um limite: SLO, prazo, capacidade. Nunca em marca.", "4,8:1"],
    [DS.ink, "Tinta e cinzas", "Texto, contexto e tudo o que não é a prova.", "16,9:1"]];
  rows.forEach(([c, n, r, k], i) => {
    const y = 2.45 + i * 0.82;
    rect(s, 0.6, y, 0.9, 0.62, c, { round: 0.1 });
    T(s, n, { x: 1.75, y: y + 0.02, w: 2.9, h: 0.6, fontSize: 15, bold: true, color: DS.ink, valign: "middle" });
    T(s, r, { x: 4.7, y: y + 0.02, w: 3.0, h: 0.6, fontSize: 13, color: DS.body, valign: "middle" });
    T(s, k, { x: 7.75, y: y + 0.02, w: 1.0, h: 0.6, fontSize: 12, color: DS.mid, valign: "middle" });
  });
  rect(s, 8.95, 2.45, 3.78, 4.2, DS.accentTint, { round: 0.12 });
  T(s, "Fora do sistema", { x: 9.2, y: 2.7, w: 3.33, h: 0.4, fontSize: 18, bold: true, color: DS.accent });
  const fora = [["F5B700", "Amarelo", "atenção"], ["F97316", "Laranja", "alerta"], ["16A34A", "Verde", "“saudável”"]];
  fora.forEach(([c, n, m], i) => { const y = 3.3 + i * 0.62;
    dot(s, 9.4, y + 0.2, 0.32, c);
    T(s, [{ text: n, options: { bold: true } }, { text: " já significa " + m + " em painéis de TI" }], { x: 9.7, y, w: 2.9, h: 0.45, fontSize: 13, color: DS.body, valign: "middle" }); });
  T(s, "Usar essas cores como enfeite faria o executivo ler perigo onde há convite.", { x: 9.2, y: 5.3, w: 3.33, h: 0.9, fontSize: 14, color: DS.ink });
}
// =====================================================================
secao("Galeria");
// 8. Números + mini barras
{
  const s = slide({ kicker: "GALERIA · INDICADORES", title: [["Black Friday rendeu "], ["R$ 48,2 mi", 1], [" no e-commerce, 32% a mais"]],
    sub: SUB_GAL("Números grandes com mini barras, 17 a 30/11"), fonte: FONTE_ILUS, notes: "Forma: números grandes + mini barras. Três KPIs com o ano anterior; destaque na receita." });
  const k = [["Receita", "R$ 48,2 mi", 48.2, 36.5, "2025 +32%", "2024 R$ 36,5 mi"], ["Pedidos", "182 mil", 182, 146.8, "2025 +24%", "2024 146,8 mil"],
    ["Ticket médio", "R$ 265", 265, 249, "2025 +6%", "2024 R$ 249"]];
  k.forEach(([n, v, a, b, la, lb], i) => {
    const x = 0.6 + i * 4.18, hi = i === 0, W = 3.4, mx = Math.max(a, b);
    T(s, n.toUpperCase(), { x, y: 2.55, w: W, h: 0.3, fontSize: 12, color: DS.body, charSpacing: 2 });
    T(s, v, { x, y: 2.95, w: 3.9, h: 0.9, fontSize: 50, bold: true, color: hi ? DS.accent : DS.ink });
    rect(s, x, 4.25, W * a / mx, 0.32, hi ? DS.accent : DS.mid);
    T(s, la, { x, y: 4.65, w: W, h: 0.3, fontSize: 14, bold: true, color: hi ? DS.accent : DS.ink });
    rect(s, x, 5.2, W * b / mx, 0.32, DS.mute);
    T(s, lb, { x, y: 5.6, w: W, h: 0.3, fontSize: 14, color: DS.body });
  });
  T(s, "Mais pedidos com ticket um pouco maior: o crescimento veio do volume, como mostra a cascata adiante.", { x: 0.6, y: 6.4, w: 12.1, h: 0.3, fontSize: 16, color: DS.body });
}
// 9. Linha com região e anotação
{
  const s = slide({ kicker: "GALERIA · TEMPO", title: [["Pico de vendas da sexta-feira foi "], ["45% maior", 1], [" que o de 2024"]],
    sub: SUB_GAL("Receita diária, R$ mi, 17 a 30/11"), fonte: FONTE_ILUS, notes: "Forma: linha com região e anotação. 2024 em cinza, 2025 em destaque, pico anotado." });
  const d25 = [2.0, 1.9, 2.1, 2.2, 2.5, 2.9, 2.5, 3.1, 3.4, 3.9, 5.2, 9.4, 4.1, 3.0];
  const d24 = [1.6, 1.5, 1.7, 1.8, 2.0, 2.3, 2.1, 2.4, 2.6, 2.9, 3.7, 6.5, 2.9, 2.5];
  const labels = d25.map((_, i) => String(17 + i));
  const G = { x: 0.6, y: 2.45, w: 8.0, h: 4.2 }, P = { x: 0.02, y: 0.06, w: 0.86, h: 0.84 }, Y = { min: 0, max: 10 }, g = geo(G, P, Y, 14);
  rect(s, g.ex(7), G.y, g.ex(14) - g.ex(7), G.h * (P.y + P.h), DS.tint);
  T(s, "Semana da Black Friday", { x: g.ex(7) + 0.1, y: G.y + 0.05, w: 3, h: 0.25, fontSize: 12, color: DS.body });
  s.addChart(pres.charts.LINE, [{ name: "2024", labels, values: d24 }, { name: "2025", labels, values: d25 }], { ...G, layout: P, ...limpo(),
    valAxisMinVal: 0, valAxisMaxVal: 10, chartColors: [DS.mute, DS.accent], lineSize: 3, lineDataSymbol: "none" });
  dot(s, g.cx(11), g.vy(9.4), 0.18, DS.accent, { line: DS.white });
  T(s, [{ text: "Sexta, 28/11", options: { breakLine: true } }, { text: "R$ 9,4 mi, +45%" }], { x: g.cx(11) - 2.35, y: g.vy(9.4) - 0.15, w: 2.1, h: 0.6, fontSize: 16, bold: true, color: DS.accent, align: "right" });
  T(s, "2025", { x: g.cx(13) + 0.15, y: g.vy(3.0) - 0.28, w: 0.8, h: 0.25, fontSize: 12, bold: true, color: DS.accent });
  T(s, "2024", { x: g.cx(13) + 0.15, y: g.vy(2.5) - 0.02, w: 0.8, h: 0.25, fontSize: 12, color: DS.mid });
  eDai(s, "19%", "da receita veio de um único dia", "A sexta, 28/11, trouxe quase 1 em cada 5 reais das duas semanas. Capacidade e campanha precisam mirar nela.");
}
// 10. Cascata
{
  const s = slide({ kicker: "GALERIA · PARTE DO TODO", title: [["Mais pedidos explicam "], ["três quartos", 1], [" do crescimento"]],
    sub: SUB_GAL("Da receita de 2024 à de 2025, R$ mi"), fonte: FONTE_ILUS, notes: "Forma: cascata. Ponte de R$ 36,5 mi para R$ 48,2 mi; a maior parcela em destaque." });
  const labels = ["2024", "Mais pedidos", "Ticket médio", "Frete e serviços", "2025"];
  const z = [0, 0, 0, 0, 0], set = (i, v) => { const a = z.slice(); a[i] = v; return a; };
  const G = { x: 0.6, y: 2.45, w: 8.1, h: 4.2 }, P = { x: 0.02, y: 0.1, w: 0.96, h: 0.8 }, Y = { min: 0, max: 52 }, g = geo(G, P, Y, 5);
  s.addChart(pres.charts.BAR, [{ name: "base", labels, values: [0, 36.5, 45.3, 47.4, 0] }, { name: "total", labels, values: [36.5, 0, 0, 0, 48.2] },
    { name: "Mais pedidos", labels, values: set(1, 8.8) }, { name: "Ticket médio", labels, values: set(2, 2.1) }, { name: "Frete", labels, values: set(3, 0.8) }],
    { ...G, layout: P, ...limpo(), barDir: "col", barGrouping: "stacked", valAxisMinVal: 0, valAxisMaxVal: 52, barGapWidthPct: 60,
      chartColors: [DS.paper, DS.mid, DS.accent, DS.mute, DS.mute] });
  const cw = g.band(false) / 1.6, tops = [36.5, 45.3, 47.4, 48.2, 48.2], lab = ["R$ 36,5 mi", "+8,8", "+2,1", "+0,8", "R$ 48,2 mi"];
  for (let i = 0; i < 4; i++) seg(s, g.cx(i) + cw / 2, g.vy(tops[i]), g.cx(i + 1) - cw / 2, g.vy(tops[i]), DS.mid, 0.75, { dash: "dash" });
  lab.forEach((t, i) => T(s, t, { x: g.cx(i) - 0.8, y: g.vy(tops[i]) - 0.4, w: 1.6, h: 0.3, fontSize: i === 1 ? 16 : 14, bold: i === 1, color: i === 1 ? DS.accent : DS.ink, align: "center" }));
  eDai(s, "75%", "do crescimento veio de volume", "Ticket médio e frete somaram R$ 2,9 mi; os R$ 8,8 mi restantes vieram de mais pedidos.");
}
// 11. Rosca
{
  const s = slide({ kicker: "GALERIA · PARTE DO TODO", title: [["Pix já responde por "], ["mais da metade", 1], [" dos pedidos"]],
    sub: SUB_GAL("Pedidos por meio de pagamento, %"), fonte: FONTE_ILUS, notes: "Forma: rosca com até 3 partes. Número no centro, nomes ao lado das fatias." });
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Pagamento", labels: ["Pix", "Cartão", "Boleto"], values: [54, 38, 8] }], {
    x: 2.5, y: 2.5, w: 4.1, h: 4.1, layout: { x: 0.02, y: 0.02, w: 0.96, h: 0.96 }, holeSize: 64, chartColors: [DS.accent, DS.mid, DS.mute],
    dataBorder: { pt: 2, color: "FFFFFF" }, showLegend: false, showTitle: false, showPercent: false, showValue: false, showLabel: false });
  T(s, "54%", { x: 3.55, y: 4.0, w: 2.0, h: 0.8, fontSize: 44, bold: true, color: DS.accent, align: "center" });
  T(s, "Pix", { x: 3.55, y: 4.8, w: 2.0, h: 0.3, fontSize: 14, color: DS.body, align: "center" });
  T(s, [{ text: "Pix ", options: { bold: true } }, { text: "54%" }], { x: 6.8, y: 4.9, w: 1.8, h: 0.35, fontSize: 16, color: DS.accent });
  T(s, [{ text: "Cartão ", options: { bold: true } }, { text: "38%" }], { x: 0.6, y: 4.6, w: 1.75, h: 0.35, fontSize: 16, color: DS.body, align: "right" });
  T(s, [{ text: "Boleto ", options: { bold: true } }, { text: "8%" }], { x: 2.0, y: 2.55, w: 1.75, h: 0.35, fontSize: 16, color: DS.body, align: "right" });
  eDai(s, "98 mil", "pedidos pagos com Pix", "Com mais da metade dos pedidos no Pix, uma instabilidade no provedor de pagamento derruba a maior parte da receita.");
}
// 12. Mapa de calor
{
  const s = slide({ kicker: "GALERIA · DISTRIBUIÇÃO", title: [["Sexta à noite concentrou "], ["11% dos pedidos", 1], [" da semana"]],
    sub: SUB_GAL("Pedidos por dia e faixa de horário, % do total da semana de 24 a 30/11"), fonte: FONTE_ILUS,
    notes: "Forma: mapa de calor. Escala sequencial do claro ao destaque; a célula mais escura é a prova." });
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"], faixas = ["0h–6h", "6h–12h", "12h–18h", "18h–24h"];
  const v = [[1, 3, 4, 5], [1, 3, 4, 5], [1, 3, 4, 6], [2, 3, 5, 7], [4, 5, 6, 11], [1, 3, 3, 3], [1, 2, 2, 2]];
  const B = { type: "solid", pt: 3, color: "FFFFFF" };
  const rows = [[{ text: "", options: { border: B } }, ...faixas.map(f => ({ text: f, options: { color: DS.body, fontSize: 12, align: "center", border: B } }))]];
  v.forEach((r, i) => rows.push([{ text: dias[i], options: { color: i === 4 ? DS.accent : DS.body, bold: i === 4, fontSize: 13, border: B } },
    ...r.map(x => { const t = Math.pow(x / 11, 0.8); return { text: x + "%", options: { fill: { color: mix(DS.tint, DS.accent, t) }, color: t > 0.62 ? DS.white : DS.ink,
      bold: x === 11, fontSize: x === 11 ? 16 : 13, align: "center", border: B } }; })]));
  s.addTable(rows, { x: 0.6, y: 2.45, w: 8.1, colW: [1.3, 1.7, 1.7, 1.7, 1.7], rowH: 0.5, fontFace: "Aptos", valign: "middle", margin: 0.05 });
  eDai(s, "26%", "dos pedidos caíram na sexta", "A virada de quinta para sexta e a noite de sexta pedem reforço de capacidade e de atendimento.");
}
// 13. Treemap
{
  const s = slide({ kicker: "GALERIA · PARTE DO TODO", title: [["Smartphones sozinhos venderam "], ["mais que Moda inteira", 1]],
    sub: SUB_GAL("Receita por categoria e subcategoria, R$ mi"), fonte: FONTE_ILUS, notes: "Forma: treemap em 2 níveis. Smartphones em destaque, Moda em cinza médio." });
  const cats = [["Eletrônicos", [["Smartphones", 9.8], ["TVs", 6.1], ["Notebooks", 4.0], ["Áudio", 2.3]]],
    ["Eletrodomésticos", [["Geladeiras", 4.2], ["Lavadoras", 3.5], ["Air fryer", 2.4], ["Micro-ondas", 1.5]]],
    ["Moda", [["Calçados", 3.6], ["Roupas", 3.4], ["Acessórios", 1.9]]], ["Casa", [["Móveis", 2.8], ["Decoração", 1.6], ["Cama e banho", 1.1]]]];
  const tot = c => c[1].reduce((a, b) => a + b[1], 0);
  const R = squarify(cats.map(tot), 0.6, 2.45, 12.13, 3.85);
  cats.forEach((c, ci) => {
    const r = R[ci], gi = 0.0225, rr = squarify(c[1].map(x => x[1]), r.x + gi, r.y + gi, r.w - 2 * gi, r.h - 2 * gi);
    c[1].forEach(([n, val], si) => {
      const t = rr[si], x = t.x + 0.009, y = t.y + 0.009, w = t.w - 0.018, h = t.h - 0.018;
      const hi = n === "Smartphones", moda = c[0] === "Moda", fill = hi ? DS.accent : moda ? DS.mid : DS.tint, fc = hi || moda ? DS.white : DS.ink;
      rect(s, x, y, w, h, fill, { line: hi || moda ? undefined : DS.hair, lw: 0.5 });
      let head = si === 0 ? `${c[0].toUpperCase()} · R$ ${br(tot(c))} mi` : null;
      if (head && head.length * 0.66 * 10 / 72 > w - 0.2) head = `${c[0].length > 10 ? c[0].toUpperCase().slice(0, 9) + '.' : c[0].toUpperCase()}\nR$ ${br(tot(c))} mi`;
      let f = 14; while (f > 9 && (Math.max(n.length, `R$ ${br(val)} mi`.length) * 0.58 * f / 72 > w - 0.2)) f--;
      const runs = [];
      if (head) runs.push({ text: head, options: { fontSize: 10, color: hi || moda ? DS.white : DS.body, charSpacing: 1, breakLine: true } });
      runs.push({ text: n, options: { bold: true, fontSize: hi ? 20 : f, breakLine: true } }, { text: `R$ ${br(val)} mi`, options: { fontSize: hi ? 16 : f } });
      T(s, runs, { x: x + 0.1, y: y + 0.08, w: w - 0.16, h: h - 0.12, color: fc, fit: "none" });
    });
  });
  T(s, "R$ 9,8 mi em smartphones contra R$ 8,9 mi em toda a Moda: a campanha de 2026 começa pelo celular.", { x: 0.6, y: 6.42, w: 12.1, h: 0.3, fontSize: 16, color: DS.body });
}
// 14. Sankey
{
  const s = slide({ kicker: "GALERIA · FLUXO", title: [["Redes sociais mandaram "], ["8 de cada 10 visitas", 1], [" ao site mobile"]],
    sub: SUB_GAL("Visitas por origem e destino, mil"), fonte: FONTE_ILUS, notes: "Forma: Sankey. A faixa redes sociais → site mobile em destaque." });
  const src = ["Redes sociais", "E-mail", "Direto", "Busca"], dst = ["Site mobile", "App", "Site desktop"];
  const F = { "Redes sociais": [480, 90, 30], "E-mail": [30, 110, 60], "Direto": [20, 220, 80], "Busca": [70, 20, 260] };
  const sT = src.map(n => F[n].reduce((a, b) => a + b, 0)), dT = dst.map((_, j) => src.reduce((a, n) => a + F[n][j], 0));
  const top = 2.55, H = 3.95, gapL = 0.16, k = (H - 3 * gapL) / 1470, gapR = (H - 1470 * k) / 2, xl = 2.3, xr = 6.85, nw = 0.22;
  const sy = [], dy = []; let y = top; sT.forEach(t => { sy.push(y); y += t * k + gapL; }); y = top; dT.forEach(t => { dy.push(y); y += t * k + gapR; });
  const sOff = sy.slice(), dOff = dy.slice();
  src.forEach((n, i) => dst.forEach((_, j) => {
    const v = F[n][j], h = v * k, hi = i === 0 && j === 0;
    curveBand(s, xl + nw, sOff[i], sOff[i] + h, xr, dOff[j], dOff[j] + h, hi ? DS.accent : DS.mute, hi ? 10 : 45);
    if (hi) T(s, "480 mil", { x: xl + nw + 0.3, y: sOff[i] + h / 2 - 0.15, w: 1.2, h: 0.3, fontSize: 14, bold: true, color: DS.white });
    sOff[i] += h; dOff[j] += h; }));
  src.forEach((n, i) => { rect(s, xl, sy[i], nw, sT[i] * k, i === 0 ? DS.accent : DS.mid);
    T(s, [{ text: n, options: { bold: true, breakLine: true } }, { text: sT[i] + " mil" }], { x: 0.6, y: sy[i] + sT[i] * k / 2 - 0.25, w: 1.55, h: 0.5, fontSize: 13, align: "right", valign: "middle", color: i === 0 ? DS.accent : DS.ink }); });
  dst.forEach((n, j) => { rect(s, xr, dy[j], nw, dT[j] * k, j === 0 ? DS.accent : DS.mid);
    T(s, [{ text: n, options: { bold: true, breakLine: true } }, { text: dT[j] + " mil" }], { x: xr + nw + 0.15, y: dy[j] + dT[j] * k / 2 - 0.25, w: 1.6, h: 0.5, fontSize: 13, valign: "middle", color: j === 0 ? DS.accent : DS.ink }); });
  eDai(s, "80%", "das visitas ao site mobile vieram das redes", "O site mobile é a vitrine das campanhas: é nele que um segundo de lentidão custa mais caro.");
}
// 15. Halteres (atraso contra o prometido = problema → status crítico)
tone("critico");
{
  const s = slide({ kicker: "GALERIA · COMPARAÇÃO", title: [["No Nordeste, a entrega atrasou "], ["3,1 dias", 1], [" em média"]],
    sub: SUB_GAL("Ponto vazio = prazo prometido, ponto cheio = prazo realizado, em dias"), fonte: FONTE_ILUS,
    notes: "Forma: halteres. Distância entre prometido e realizado; ordenado pela distância." });
  const d = [["Nordeste", 4.0, 7.1], ["Norte", 6.0, 8.2], ["Centro-Oeste", 4.0, 5.3], ["Sul", 3.0, 3.9], ["Sudeste", 2.0, 2.6]];
  const x0 = 2.4, x1 = 7.9, vx = v => x0 + (x1 - x0) * v / 10;
  [0, 2, 4, 6, 8, 10].forEach(v => { seg(s, vx(v), 2.75, vx(v), 6.4, DS.hair, 0.75); T(s, v + (v === 10 ? " dias" : ""), { x: vx(v) - 0.4, y: 2.45, w: 0.8, h: 0.25, fontSize: 11, color: DS.mid, align: "center" }); });
  d.forEach(([n, a, b], i) => {
    const y = 3.15 + i * 0.75, hi = i === 0, c = hi ? DS.accent : DS.mid;
    T(s, n, { x: 0.6, y: y - 0.17, w: 1.6, h: 0.34, fontSize: 14, bold: hi, color: hi ? DS.accent : DS.ink, align: "right", valign: "middle" });
    seg(s, vx(a), y, vx(b), y, hi ? DS.accent : DS.mute, 3);
    dot(s, vx(a), y, 0.2, DS.paper, { line: c, lw: 2 });
    dot(s, vx(b), y, 0.22, c);
    T(s, "(+" + br(b - a) + ")", { x: 8.05, y: y - 0.17, w: 0.8, h: 0.34, fontSize: 14, bold: hi, color: hi ? DS.accent : DS.body, valign: "middle" });
  });
  eDai(s, "+3,1", "dias de atraso no Nordeste", "A região que mais cresce em vendas é a que mais atrasa a entrega. Promessa de prazo vira risco de recompra.");
}
tone("neutro");
// 16. Mapa em grade
{
  const s = slide({ kicker: "GALERIA · GEOGRAFIA", title: [["Nordeste cresceu "], ["50%", 1], [", o maior avanço entre as regiões"]],
    sub: SUB_GAL("Crescimento da receita por região, 2025 contra 2024"), fonte: FONTE_ILUS, notes: "Forma: mapa em grade do Brasil + barras por região com a média nacional." });
  const reg = { N: ["Norte", 38, ["RR", "AP", "AM", "PA", "AC", "RO", "TO"]], NE: ["Nordeste", 50, ["MA", "CE", "RN", "PI", "PE", "PB", "BA", "SE", "AL"]],
    CO: ["Centro-Oeste", 31, ["MT", "GO", "MS", "DF"]], SE: ["Sudeste", 26, ["MG", "ES", "SP", "RJ"]], S: ["Sul", 22, ["PR", "SC", "RS"]] };
  const pos = { RR: [0, 1], AP: [0, 2], AM: [1, 1], PA: [1, 2], MA: [1, 3], CE: [1, 4], RN: [1, 5], AC: [2, 0], RO: [2, 1], TO: [2, 2], PI: [2, 3], PE: [2, 4], PB: [2, 5],
    MT: [3, 1], GO: [3, 2], BA: [3, 3], SE: [3, 4], AL: [3, 5], MS: [4, 1], DF: [4, 2], MG: [4, 3], ES: [4, 4], PR: [5, 2], SP: [5, 3], RJ: [5, 4], SC: [6, 2], RS: [7, 2] };
  Object.values(reg).forEach(([n, v, ufs]) => ufs.forEach(uf => {
    const [r, c] = pos[uf], x = 0.6 + c * 0.68, y = 2.5 + r * 0.51, t = (v - 15) / 35, f = n === "Nordeste" ? DS.accent : mix(DS.tint, DS.mid, t);
    rect(s, x, y, 0.62, 0.46, f);
    T(s, uf, { x, y, w: 0.62, h: 0.46, fontSize: 11, bold: true, align: "center", valign: "middle", color: n === "Nordeste" ? DS.white : DS.ink });
  }));
  const bx = 5.15, bw = 2.9, sc = v => bw * v / 55, ord = Object.values(reg).sort((a, b) => b[1] - a[1]);
  ord.forEach(([n, v], i) => { const y = 2.75 + i * 0.72, hi = n === "Nordeste";
    T(s, n, { x: bx, y, w: 2.5, h: 0.25, fontSize: 13, bold: hi, color: hi ? DS.accent : DS.ink });
    rect(s, bx, y + 0.3, sc(v), 0.26, hi ? DS.accent : DS.mute);
    T(s, "+" + v + "%", { x: bx + bw + 0.12, y: y + 0.28, w: 0.7, h: 0.3, fontSize: 13, bold: hi, color: hi ? DS.accent : DS.ink }); });
  seg(s, bx + sc(32), 2.7, bx + sc(32), 6.35, DS.ink, 1, { dash: "dash" });
  T(s, "Brasil +32%", { x: bx + sc(32) - 0.6, y: 6.38, w: 1.2, h: 0.25, fontSize: 11, color: DS.body, align: "center" });
  eDai(s, "+50%", "de receita no Nordeste", "É a mesma região com o maior atraso de entrega: crescer sem logística vira reclamação.");
}
// =====================================================================
secao("Galeria · Observabilidade");
// 17. Painéis
{
  const s = slide({ dark: true, kicker: "GALERIA · OBSERVABILIDADE · CHECKOUT", title: [["Checkout ficou abaixo do SLO: "], ["99,58%", 1], [" de disponibilidade"]],
    sub: SUB_GAL("Painéis de indicadores, sexta 28/11, 16h a 24h"), fonte: "Fonte: dados ilustrativos de monitoramento de um checkout fictício",
    notes: "Forma: painéis de indicadores em slide escuro. Um painel em destaque, os demais dão contexto." });
  const p = [["DISPONIBILIDADE", "99,58%", "SLO: 99,9% · média do dia", [99.95, 99.96, 99.94, 99.9, 99.7, 99.1, 98.9, 99.6, 99.9], 99.9, 98.8, 100],
    ["TEMPO DE RESPOSTA P95", "3,8 s", "Limite: 1,5 s · pico às 21h", [0.9, 1.0, 1.1, 1.6, 2.9, 3.8, 3.6, 2.0, 1.1], 1.5, 0, 4.2],
    ["TAXA DE ERRO", "2,4%", "Limite: 1% · pico às 21h", [0.3, 0.4, 0.4, 0.8, 1.9, 2.4, 2.2, 1.0, 0.5], 1, 0, 2.7],
    ["APDEX", "0,62", "Meta: 0,85 · pico às 21h", [0.93, 0.92, 0.9, 0.84, 0.7, 0.62, 0.64, 0.8, 0.9], 0.85, 0.55, 1]];
  p.forEach(([n, v, ctx, ser, lim, mn, mx], i) => {
    const w = 2.8075, x = 0.6 + i * (w + 0.3), hi = i === 0;
    rect(s, x, 2.45, w, 4.2, DS.darkCard, { round: 0.06 });
    T(s, n, { x: x + 0.25, y: 2.7, w: w - 0.4, h: 0.25, fontSize: 11, color: DS.soft, charSpacing: 1 });
    T(s, v, { x: x + 0.25, y: 3.05, w: w - 0.4, h: 0.75, fontSize: 42, bold: true, color: hi ? DS.accentLight : DS.white });
    T(s, ctx, { x: x + 0.25, y: 3.85, w: w - 0.4, h: 0.3, fontSize: 12, color: DS.soft });
    const sx = x + 0.25, sw = w - 0.5, syT = 4.5, sh = 1.4, Y = val => syT + sh * (1 - (val - mn) / (mx - mn));
    seg(s, sx, Y(lim), sx + sw, Y(lim), DS.mid, 1, { dash: "dash" });
    poly(s, ser.map((val, j) => [sx + sw * j / 8, Y(val)]), { line: hi ? DS.accentLight : DS.soft, lw: 2 });
    T(s, "16h", { x: sx, y: 6.1, w: 0.6, h: 0.25, fontSize: 10, color: DS.soft });
    T(s, "24h", { x: sx + sw - 0.6, y: 6.1, w: 0.6, h: 0.25, fontSize: 10, color: DS.soft, align: "right" });
  });
}
// 18. Medidor
{
  const s = slide({ kicker: "GALERIA · OBSERVABILIDADE", title: [["No pico, o Apdex do checkout caiu para "], ["0,62", 1], [", nível ruim"]],
    sub: SUB_GAL("Apdex do checkout às 21h, de 0 a 1"), fonte: "Fonte: dados ilustrativos de monitoramento de um checkout fictício",
    notes: "Forma: medidor desenhado com arcos. Valor no arco, faixa atingida em destaque no anel externo." });
  const cx = 4.65, cy = 6.15, v = 0.62, A = x => 180 + 180 * x;
  arcBand(s, cx, cy, 2.05, 2.7, 180, 360, DS.tint);
  arcBand(s, cx, cy, 2.05, 2.7, 180, A(v), DS.accent);
  const fx = [["Inaceitável", 0, 0.5], ["Ruim", 0.5, 0.7], ["Razoável", 0.7, 0.85], ["Bom", 0.85, 0.94], ["Excelente", 0.94, 1]];
  fx.forEach(([n, a, b], i) => {
    const hi = n === "Ruim";
    arcBand(s, cx, cy, 2.8, 2.92, A(a) + (i ? 0.6 : 0), A(b) - (i < 4 ? 0.6 : 0), hi ? DS.accent : DS.mute);
    const m = (A(a) + A(b)) / 2, rad = m * Math.PI / 180, lx = cx + 3.15 * Math.cos(rad), ly = cy + 3.15 * Math.sin(rad);
    const al = Math.cos(rad) > 0.25 ? "left" : Math.cos(rad) < -0.25 ? "right" : "center";
    T(s, n, { x: al === "left" ? lx : al === "right" ? lx - 1.4 : lx - 0.7, y: ly - 0.15, w: 1.4, h: 0.3, fontSize: 13, bold: hi, color: hi ? DS.accent : DS.body, align: al });
  });
  const rad = A(v) * Math.PI / 180;
  seg(s, cx + 1.8 * Math.cos(rad), cy + 1.8 * Math.sin(rad), cx + 2.95 * Math.cos(rad), cy + 2.95 * Math.sin(rad), DS.ink, 2.5);
  T(s, "0,62", { x: cx - 1.5, y: cy - 1.45, w: 3.0, h: 1.0, fontSize: 64, bold: true, color: DS.accent, align: "center" });
  T(s, "Apdex às 21h", { x: cx - 1.5, y: cy - 0.42, w: 3.0, h: 0.3, fontSize: 14, color: DS.body, align: "center" });
  T(s, "0", { x: cx - 2.55, y: cy + 0.05, w: 0.4, h: 0.25, fontSize: 11, color: DS.mid, align: "center" });
  T(s, "1", { x: cx + 2.15, y: cy + 0.05, w: 0.4, h: 0.25, fontSize: 11, color: DS.mid, align: "center" });
  eDai(s, "38%", "das sessões, no mínimo, não foram satisfatórias", "Com Apdex de 0,62, pelo menos 38 de cada 100 compradores esperaram mais do que deviam no horário de maior venda.");
}
// 19. Mapa de serviços
{
  const s = slide({ kicker: "GALERIA · OBSERVABILIDADE", title: [["Lentidão do checkout nasceu no "], ["antifraude externo", 1]],
    sub: SUB_GAL("Tempo de resposta no pico, por serviço; caminho crítico em destaque"), fonte: "Fonte: dados ilustrativos de monitoramento de um checkout fictício",
    notes: "Forma: mapa de serviços. Caminho crítico em destaque até a causa raiz." });
  const W = 1.65, H = 0.85, X = [0.6, 2.75, 4.9, 7.05], yT = 2.75, yB = 5.25;
  const node = (x, y, n, t, kind) => {
    if (kind === "root") rect(s, x, y, W, H, DS.accent, { round: 0.1 });
    else if (kind === "path") rect(s, x, y, W, H, DS.paper, { round: 0.1, line: DS.accent, lw: 1.5 });
    else rect(s, x, y, W, H, DS.tint, { round: 0.1, line: DS.mute, lw: 1 });
    T(s, [{ text: n, options: { bold: true, breakLine: true } }, { text: t }], { x: x + 0.1, y, w: W - 0.2, h: H, fontSize: 13, align: "center", valign: "middle",
      color: kind === "root" ? DS.white : DS.ink });
  };
  [["Frontend web", "4,6 s"], ["API Gateway", "4,5 s"], ["Checkout", "4,3 s"], ["Pagamento", "3,5 s"]].forEach(([n, t], i) => node(X[i], yT, n, t, "path"));
  for (let i = 0; i < 3; i++) seg(s, X[i] + W, yT + H / 2, X[i + 1], yT + H / 2, DS.accent, 2.5, { arrow: "triangle" });
  node(X[1], yB, "Estoque", "0,3 s", "off"); node(X[2], yB, "Frete", "0,4 s", "off"); node(X[3], yB, "Antifraude externo", "3,1 s", "root");
  seg(s, X[2] + W / 2 - 0.2, yT + H, X[1] + W / 2, yB, DS.mute, 1.5, { arrow: "triangle" });
  seg(s, X[2] + W / 2, yT + H, X[2] + W / 2, yB, DS.mute, 1.5, { arrow: "triangle" });
  seg(s, X[3] + W / 2, yT + H, X[3] + W / 2, yB, DS.accent, 2.5, { arrow: "triangle" });
  T(s, "CAUSA RAIZ", { x: X[3], y: yB + H + 0.1, w: W, h: 0.3, fontSize: 12, bold: true, color: DS.accent, align: "center", charSpacing: 2 });
  eDai(s, "3,1 s", "de espera no antifraude externo", "Os serviços internos responderam bem; o gargalo está num fornecedor, e a conversa é de contrato e de timeout.");
}
// 20. Rastreamento em cascata
{
  const s = slide({ kicker: "GALERIA · OBSERVABILIDADE", title: [["Antifraude consumiu "], ["3,1 s", 1], [" dos 4,6 s do checkout no pico"]],
    sub: SUB_GAL("Rastreamento de uma requisição de checkout, segundos"), fonte: "Fonte: dados ilustrativos de monitoramento de um checkout fictício",
    notes: "Forma: rastreamento em cascata (trace). Recuo por nível, grade por segundo, duração à direita." });
  const sp = [["POST /checkout", 0, 0, 4.6], ["API Gateway", 1, 0.05, 4.55], ["Checkout service", 2, 0.1, 4.4], ["Estoque: reservar", 3, 0.15, 0.45],
    ["Frete: calcular", 3, 0.45, 0.85], ["Pagamento: autorizar", 3, 0.85, 4.35], ["Antifraude externo", 4, 1.0, 4.1], ["Banco emissor", 4, 4.1, 4.3]];
  const x0 = 4.2, x1 = 11.6, X = t => x0 + (x1 - x0) * t / 5, y0 = 2.85, rh = 0.43;
  for (let t = 0; t <= 5; t++) { seg(s, X(t), 2.75, X(t), y0 + sp.length * rh, DS.hair, 0.75, { dash: "dash" }); T(s, t + " s", { x: X(t) - 0.3, y: 2.45, w: 0.6, h: 0.25, fontSize: 11, color: DS.mid, align: "center" }); }
  sp.forEach(([n, lv, a, b], i) => {
    const y = y0 + i * rh, hi = n === "Antifraude externo";
    T(s, n, { x: 0.6 + lv * 0.3, y, w: 3.4 - lv * 0.3, h: rh, fontSize: 13, bold: hi, color: hi ? DS.accent : DS.ink, valign: "middle" });
    rect(s, X(a), y + 0.09, Math.max(X(b) - X(a), 0.03), rh - 0.18, hi ? DS.accent : DS.mute);
    T(s, br(b - a).replace(",0", "") + " s", { x: X(b) + 0.08, y, w: 0.8, h: rh, fontSize: 12, bold: hi, color: hi ? DS.accent : DS.body, valign: "middle" });
  });
  T(s, "Dois terços do tempo da compra são espera por um fornecedor: é ali que o timeout e o contrato precisam mudar.", { x: 0.6, y: 6.45, w: 12.1, h: 0.3, fontSize: 16, color: DS.body });
}
// 21. Colmeia
{
  const s = slide({ kicker: "GALERIA · OBSERVABILIDADE", title: [["Os "], ["11 pods saturados", 1], [" estavam todos na zona B"]],
    sub: SUB_GAL("Uso de CPU por pod no pico, %, por zona de disponibilidade"), fonte: "Fonte: dados ilustrativos de monitoramento de um cluster fictício",
    notes: "Forma: colmeia. Três faixas de cor; pods acima de 85% em destaque, agrupados por zona." });
  const Z = [["ZONA A", [42, 55, 48, 61, 39, 52, 66, 58, 45, 50, 63, 47, 57, 44, 60, 53]], ["ZONA B", [91, 88, 94, 72, 89, 96, 93, 68, 87, 92, 90, 74, 86, 95, 70, 79]],
    ["ZONA C", [51, 46, 62, 58, 40, 55, 49, 64, 57, 43, 61, 52, 48, 59, 45, 54]]];
  Z.forEach(([n, vals], zi) => {
    const gx = 0.6 + zi * (2.165 + 0.55), gy = 2.95;
    T(s, n, { x: gx, y: 2.5, w: 2.2, h: 0.3, fontSize: 12, bold: zi === 1, color: zi === 1 ? DS.accent : DS.body, charSpacing: 2 });
    vals.forEach((v, k) => { const c = Math.floor(k / 4), r = k % 4, x = gx + c * 0.515, y = gy + r * 0.585 + (c % 2 ? 0.2925 : 0);
      const f = v > 85 ? DS.accent : v >= 60 ? DS.mute : DS.hair;
      s.addShape(pres.shapes.HEXAGON, { x, y, w: 0.62, h: 0.54, fill: { color: f }, line: { color: DS.paper, width: 1 } });
      T(s, String(v), { x, y, w: 0.62, h: 0.54, fontSize: 11, bold: v > 85, align: "center", valign: "middle", color: v > 85 ? DS.white : DS.ink }); });
  });
  [[DS.hair, "abaixo de 60%"], [DS.mute, "60% a 85%"], [DS.accent, "acima de 85%"]].forEach(([c, t], i) => {
    const x = 0.6 + i * 2.2; s.addShape(pres.shapes.HEXAGON, { x, y: 6.05, w: 0.3, h: 0.26, fill: { color: c }, line: { type: "none" } });
    T(s, t, { x: x + 0.4, y: 6.05, w: 1.7, h: 0.26, fontSize: 12, color: DS.body, valign: "middle" }); });
  eDai(s, "11 de 16", "pods saturados na zona B", "As zonas A e C ficaram abaixo de 70%. Rebalancear a carga resolve antes de comprar mais máquinas.");
}
// =====================================================================
secao("Catálogo e roteiros");
// 22. Catálogo
{
  const s = slide({ kicker: "CATÁLOGO COMPLETO", title: [["46 formas testadas", 1], [", com quando usar e quando evitar"]],
    fonte: "Fonte: catálogo da Slides Design Skill", notes: "O catálogo inteiro, por família. As marcadas em destaque aparecem neste deck." });
  const shown = new Set(["Número grande", "Números + mini barras", "Painéis de indicadores", "Barras ordenadas", "Halteres", "Linha com região", "Rosca", "Treemap", "Cascata",
    "Mapa de calor", "Sankey", "Mapa em grade", "Medidor", "Mapa de serviços", "Rastreamento", "Colmeia", "Cartões de ação"]);
  const fam = [["Comparação", ["Barras ordenadas", "Colunas agrupadas", "Inclinação", "Halteres", "Pirulito", "Barras divergentes", "Meta x realizado", "Radar", "Tabela com minigráficos"]],
    ["Observabilidade", ["Medidor", "Anéis de progresso", "Banda de anomalia", "Linha do tempo de estados", "Mapa de serviços", "Rastreamento", "Colmeia", "Orçamento de erros", "Linha do tempo de eventos"]],
    ["Tempo", ["Colunas", "Linha com região", "Linha com meta", "Área acumulada", "Calendário de calor", "Pequenos múltiplos", "Ranking no tempo"]],
    ["Parte do todo", ["Rosca", "Barras 100%", "Waffle", "Treemap", "Pareto", "Cascata", "Área 100%"]],
    ["Distribuição", ["Mapa de calor", "Tabela de coorte", "Histograma", "Diagrama de caixa"]],
    ["Indicadores", ["Número grande", "Números + mini barras", "Painéis de indicadores"]], ["Relação", ["Dispersão", "Bolhas"]],
    ["Fluxo", ["Funil", "Sankey"]], ["Plano", ["Cartões de ação", "Cronograma (Gantt)"]], ["Geografia", ["Mapa em grade"]]];
  fam.forEach(([n, items], i) => {
    const col = i % 5, row = Math.floor(i / 5), w = 2.25, x = 0.6 + col * (w + 0.22), y = row ? 4.85 : 2.05, h = row ? 1.5 : 2.65;
    const hu = HUE[ROT[(col + row) % 3]];
    rect(s, x, y, w, h, hu.tint, { round: 0.1 });
    T(s, [{ text: n, options: { bold: true, color: hu.text } }, { text: "  " + items.length, options: { color: DS.body } }], { x: x + 0.15, y: y + 0.12, w: w - 0.25, h: 0.3, fontSize: 14 });
    T(s, items.map((t, j) => ({ text: (shown.has(t) ? "● " : "    ") + t, options: { color: shown.has(t) ? DS.ink : DS.body, bold: shown.has(t), breakLine: j < items.length - 1 } })),
      { x: x + 0.15, y: y + 0.47, w: w - 0.2, h: h - 0.55, fontSize: 10, lineSpacingMultiple: 1.0 });
  });
  T(s, [{ text: "● ", options: { color: DS.ink } }, { text: "aparece neste deck: 17 das 46 formas. As outras 29 estão a um pedido de distância." }], { x: 0.6, y: 6.5, w: 12, h: 0.3, fontSize: 14, color: DS.body });
}
// 23. Roteiros
{
  const s = slide({ kicker: "ROTEIROS PRONTOS PARA VENDAS", title: [["Seis roteiros prontos, do "], ["resultado de POC", 1], [" ao RFP"]],
    sub: "Sequência de gráficos que a skill usa como ponto de partida em cada contexto", fonte: "Fonte: contextos de vendas e pré-vendas da Slides Design Skill",
    notes: "Cada contexto vira um roteiro de títulos de ação com a forma sugerida para cada slide." });
  const c = [["Resultado de POC", "Números + mini barras → halteres → banda de anomalia → mapa de serviços → cascata → cartões de ação"],
    ["Business case e ROI", "Número grande → treemap ou Pareto → cascata → área acumulada (payback) → halteres → Gantt"],
    ["Diagnóstico (discovery)", "Mapa de calor → orçamento de erros → mapa de serviços → funil → halteres"],
    ["Revisão de conta (QBR)", "Meta x realizado → colunas → treemap → tabela com minigráficos → cartões de ação"],
    ["Concorrente e RFP", "Radar ou halteres por critério → pirulito com limite → cascata do custo total"],
    ["Pós-incidente", "Painéis → banda de anomalia → mapa de serviços → linha do tempo de eventos → cartões"]];
  c.forEach(([n, t], i) => {
    const col = i % 3, row = Math.floor(i / 3), w = 3.843, x = 0.6 + col * (w + 0.3), y = 2.45 + row * 2.2, hi = i === 0;
    const hu = HUE[ROT[i % 3]];
    rect(s, x, y, w, 2.0, hu.tint, { round: 0.12 });
    T(s, n, { x: x + 0.25, y: y + 0.22, w: w - 0.5, h: 0.35, fontSize: 18, bold: true, color: hu.text });
    T(s, t, { x: x + 0.25, y: y + 0.7, w: w - 0.5, h: 1.2, fontSize: 14, color: DS.body });
  });
}
// 24. Fechamento
{
  const s = slide({ dark: true, kicker: "PRÓXIMOS PASSOS", title: [["Três passos colocam a skill no "], ["seu próximo deck", 1]],
    fonte: "Slides Design Skill · para o seu Claude", notes: "Fechamento com pedido claro: chamar na DM para receber o link." });
  const a = [["1", "Me chame na DM", "Te envio o link de download da skill pronta para usar.", "azul"], ["2", "Adicione ao seu Claude", "Instale como skill; ela trabalha junto com a criação de PowerPoint.", "ciano"],
    ["3", "Peça o deck", "Diga a decisão que quer e mande os dados. Receba o .pptx revisado.", "violeta"]];
  a.forEach(([n, t, d, k], i) => {
    const w = 3.843, x = 0.6 + i * (w + 0.3);
    rect(s, x, 2.45, w, 3.0, DS.white, { round: 0.12 });
    T(s, n, { x: x + 0.3, y: 2.7, w: 1, h: 0.6, fontSize: 30, bold: true, color: HUE[k].text });
    T(s, t, { x: x + 0.3, y: 3.45, w: w - 0.6, h: 0.4, fontSize: 20, bold: true, color: DS.ink });
    T(s, d, { x: x + 0.3, y: 4.0, w: w - 0.6, h: 1.2, fontSize: 16, color: DS.body });
  });
  T(s, [{ text: "Decisão de hoje: ", options: { bold: true, color: DS.white } }, { text: "me chamar na DM e testar a skill no próximo deck executivo", options: { color: HUE.ciano.light, bold: true } }],
    { x: 0.6, y: 5.85, w: 12.1, h: 0.45, fontSize: 22 });
  const z = 0.55; [[HUE.azul.fill, "circ", HUE.azul.light], [HUE.ciano.fill, "tl", DS.white], [HUE.violeta.fill, "half", HUE.violeta.light]]
    .forEach(([bg, sh, fg], i) => tile(s, 11.08 + i * z, 0.4, z, bg, sh, fg));
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  if (applyTheme) await applyTheme(OUT, THEME); else console.warn("PPTX_SKILL_DIR não definido: tema do PowerPoint não aplicado (as cores dos slides não mudam).");
  console.log("ok:", OUT);
})();
