import { defineStore } from 'pinia'
import locale_RU from '@/locale/locale_RU'
import getLocale, { LANG } from '@/hooks/Locale/Locale'

export const useLangStore = defineStore('lang', {
  state: () => ({
    _localeStrings: locale_RU as Record<string, any>,
    _locale: LANG.RU
  }),
  getters: {
    locale: (state) => state._locale,
    langStrings: (state) => state._localeStrings,
  },
  actions: {
    setLang(val : LANG) {
      this._localeStrings = getLocale(val);
      this._locale = val;
    },
  },
});