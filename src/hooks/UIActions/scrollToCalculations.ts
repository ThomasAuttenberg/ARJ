import router from '@/router'

export default function (){
  router.push('/');
  setTimeout(()=> {
    const header = document.getElementById('header-desktop');
    const targetElement = document.getElementById('calculation-block');
    const top = (targetElement as HTMLElement).offsetTop;
    window.scrollTo(0, top - (header as HTMLElement).getBoundingClientRect().height);
  });
}