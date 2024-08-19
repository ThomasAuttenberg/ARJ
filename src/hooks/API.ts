import axios, {type AxiosError} from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => Promise.reject(err));

// Служебный объект, сами запросы - ниже
export function APIFetch(params : {method?:string, endpoint?:string, headers?:Record<string,any>, body?:any}){
  const api_url : string = import.meta.env.VITE_API_URL;
  if(params.endpoint === undefined){
    params.endpoint = "";
  }else{
    if(api_url.slice(-1) === '/' && params.endpoint[0] === '/'){
      params.endpoint = params.endpoint.slice(1);
    }else{
      if(api_url.slice(-1) !== '/' && params.endpoint[0] !== '/'){
        params.endpoint = '/'+ params.endpoint;
      }
    }
  }
  if(!params.method){
    params.method = 'GET';
  }

  return axiosInstance({
    headers: Object(params.headers),
    method: params.method,
    url: api_url + params.endpoint,
    responseType: "json",
    data: params.body,
  })
}

// Загрузка файла
export function uploadFile(file: File){

  const formData = new FormData();
  formData.append('file', file);

  return APIFetch({
    method: "POST",
    endpoint: "/upload-file",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
}
export function createOrder(object: Record<string, any>){
  //console.log(object)
  return APIFetch({
    method: "POST",
    endpoint: "/create-order",
    body: object,
  })
}
export function getCoordinates(){
  return APIFetch({
    endpoint: "/get-coordinates",
  })
}

