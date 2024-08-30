export const getPhoneMask = () => ({
  mask:'+{7}(000)000-00-00',
  prepare: (appended:string, masked:any) => {
    if (appended === '8' && masked.value === '') {
      return '+7';
    }
    return appended;
  },
});

export const getCISCityMask = () => ({
  mask: /^[А-ЯЁа-яё\s-]+$/
});
export const getIntegerMask = (min: number = Number.MIN_VALUE, max: number = Number.MAX_VALUE) => ({
  mask: Number,
  min: min,
  max: max,
});
export const getTNCodeMask = () => ({
  mask: /^\d{0,10}$/
})
export const getNumberMask  =  (scale:number = 3, maxIntegerPartDigits: number = 9) => {
  const regex = new RegExp(`^\\d{1,${maxIntegerPartDigits}}(\\.(\\d{1,${scale}})?)?$`);
  return {
    mask: regex,
    prepare: (appended:string) => {
      const endIndex = appended.length - 1;
      if (appended[endIndex] === ',') {
        appended = appended.slice(0,endIndex) + '.';
      }
      return appended;
    }
  }
};