export default function loadScript(src : string) {
  return new Promise((resolve, reject) => {

    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      // Если скрипт уже загружен, сразу резолвим промис
      resolve(null);
      return;
    }

    const script = document.createElement('script');;
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}