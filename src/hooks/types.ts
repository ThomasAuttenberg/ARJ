export type ModalWindowPropsType = {name?:string, phone?:string, email?:string };
export interface IProvidedComponent{
  component: Object,
  props?: Record<string, any>,
  eventListeners?: Record<string, any>,
}