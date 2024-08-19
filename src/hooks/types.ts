export type ModalWindowPropsType = {name?:string, phone?:string, email?:string, success?:boolean};
export interface IProvidedComponent{
  component: Object,
  props?: Record<string, any>,
  eventListeners?: Record<string, any>,
}
export interface InputValuesKeys{
  model:string|undefined,
  required?:boolean,
  error?:boolean,
  transform?:Function,
}