
export function preloadImage(url : URL){

    const link = document.createElement('link');
    link.as = 'image';
    link.href = url.href;
    link.rel="preload";
    document.body.appendChild(link);

}
