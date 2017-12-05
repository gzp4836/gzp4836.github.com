// 使用Navigation Timing测量关键渲染路径
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp

function logCRP() {
  var t = window.performance.timing,
    dcl = t.domContentLoadedEventStart - t.domLoading,
    complete = t.domComplete - t.domLoading;
  var stats = document.getElementById("crp-stats");
  stats.textContent = 'DCL: ' + dcl + 'ms, onload: ' + complete + 'ms';
}

window.addEventListener("load", function(event) {
  logCRP();
  (function(w,g){w['GoogleAnalyticsObject']=g;
  w[g]=w[g]||function(){(w[g].q=w[g].q||[]).push(arguments)};w[g].l=1*new Date();})(window,'ga');

  // 可选 TODO: 用你的 Google Analytics ID 替换它
  ga('create', 'UA-XXXX-Y');
  ga('send', 'pageview');
});
