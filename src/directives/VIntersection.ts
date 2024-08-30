
import { type Ref, ref, type VNode } from 'vue'

/*

  Watchs what element is main element on the page

 */

const options  = {
  threshold: [0, 0.25, 0.5, 0.75, 1],
}
let visibleElements : HTMLElement[] = [];
const handlersMap : Map<HTMLElement, [Function, number]> = new Map();


const observer = new IntersectionObserver((entries)=>{
  //window.requestIdleCallback(()=> {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        visibleElements = visibleElements.filter(item => item !== el);
        visibleElements.push(el);
      } else {
        visibleElements = visibleElements.filter(item => item !== el);
      }
      let topElPos = 9999999;
      let topEl: HTMLElement | null = visibleElements.length != 0 ? visibleElements[0] : null;
      visibleElements.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < topElPos && itemTop >= 0) {
          topElPos = itemTop;
          topEl = item;
        }
      });
      if (topEl) {
        const handler = handlersMap.get(topEl);
        if (handler) handler[0](handler[1]);
      }
    })
 // });
}, options);

export default {
  mounted: (el: HTMLElement, binding: any) => {

      handlersMap.set(el, [binding.value[0],binding.value[1]]);
      observer.observe(el);

  }
}
