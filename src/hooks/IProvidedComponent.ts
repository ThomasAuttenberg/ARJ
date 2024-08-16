export default interface IProvidedComponent{
  component: Object,
  props?: Record<string, any>,
  eventListeners?: Record<string, any>,
}