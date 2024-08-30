export const metricsScript = (metricsId:string) =>
  metricsId != '' ?
  '<!-- Yandex.Metrika counter -->'+
  '<script type="text/javascript" >(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
  'm[i].l=1*new Date();\n' +
  'for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n' +
  'k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
  '(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
  '\n' +
  `ym(${metricsId}, "init", {` +
  'clickmap:true,\n' +
  'trackLinks:true,\n' +
  'accurateTrackBounce:true,\n' +
  'webvisor:true\n' +
  '});</script>'+
  '<noscript><div><img src="https://mc.yandex.ru/watch/' + metricsId + '" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'+
  '<!-- /Yandex.Metrika counter -->'
  : '';