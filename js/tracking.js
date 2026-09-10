/* ============ SCTTS — simulated live bus tracking preview ============ */

var SCTTS_PATH = [
  { x: 12, y: 74 },
  { x: 26, y: 58 },
  { x: 43, y: 62 },
  { x: 58, y: 40 },
  { x: 74, y: 34 },
  { x: 87, y: 18 },
];

function pointAt(t) {
  var last = SCTTS_PATH.length - 1;
  var seg = Math.min(Math.floor(t * last), last - 1);
  var local = t * last - seg;
  var a = SCTTS_PATH[seg];
  var b = SCTTS_PATH[seg + 1];
  return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
}

document.addEventListener("DOMContentLoaded", function () {
  var bus = document.getElementById("bus-dot");
  var etaEl = document.getElementById("eta-value");
  if (!bus) return;

  var t = 0;
  setInterval(function () {
    t = t >= 1 ? 0 : t + 0.004;
    var p = pointAt(t);
    bus.style.left = p.x + "%";
    bus.style.top = p.y + "%";
    if (etaEl) etaEl.textContent = Math.max(1, Math.round((1 - t) * 14)) + " min";
  }, 40);
});