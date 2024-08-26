import Locale_RU from '@/locale/locale_RU'
import Locale_EN from '@/locale/locale_EN'
import Locale_KZ from '@/locale/locale_KZ'

export const enum LANG{
  RU = 'ru',
  KZ = 'kz',
  EN = 'en'
}

const langObject = {
  [LANG.RU]: () => Locale_RU,
  [LANG.KZ]: () => Locale_KZ,
  [LANG.EN]: () => Locale_EN,
}

export default function getLocale(val: LANG){
  return (langObject[val]() as Record<string, any>)
}


/*

// ASYNC LOADING


const enum LOCALE_IMPORTS{
  //RU='@/hooks/Locale/locale_RU',
  EN="@/hooks/Locale/locale_EN",
}

const langObject = {
  [LANG.RU]: () => import(LOCALE_IMPORTS.RU),
  [LANG.KZ]: () => import(LOCALE_IMPORTS.EN),
  [LANG.EN]: () => import(LOCALE_IMPORTS.EN),
}

export default async function getLocale(val: LANG){
  return (await langObject[val]() as Record<string, any>)
}

 */