import { useLangStore } from '@/stores/lang'
import getLocale, { LANG } from '@/hooks/Locale/Locale'

export function determineLocale(){
  const lang = navigator.language
  const languageCode = lang.substring(0,2);

  switch (languageCode){
    case 'ru':
      useLangStore().setLang(LANG.RU);
      break;
    case 'kk':
      useLangStore().setLang(LANG.KZ);
      break;
    default:
      useLangStore().setLang(LANG.EN);
      break;
  }
}