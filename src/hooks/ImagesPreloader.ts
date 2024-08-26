const sources = [
  new URL('@/assets/images/eurasionMap.svg', import.meta.url),
  new URL('@/assets/images/eurasionMap-mobile.svg', import.meta.url),
]

export function preloadImages(){

  for(const image of sources){
    const link = document.createElement('link');
    link.as = 'image';
    link.href = image.href
    link.rel="preload";
    document.body.appendChild(link);
  }

}
