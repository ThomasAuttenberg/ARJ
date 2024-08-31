import router from '@/router'

export default function (){
  router.push('/')
  setTimeout(()=> {
    const header = document.getElementById('header-desktop');
    const targetElement = document.getElementById('calculation-block');
    const top = (targetElement as HTMLElement).offsetTop;
    window.scrollTo({
      top: top - (header as HTMLElement).getBoundingClientRect().height,
      behavior: 'smooth'
    });
  });
}