

import config from '@/config';
import axios from 'axios'

 export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

 let isRefreshing = false;

  let pendingQue : {
     resolve:(value:unknown) => void,
     reject:(error:unknown) => void
  }[] = [];

  const processQue = (error:unknown) =>{
     pendingQue.forEach((promise) => {
         if(error){
            promise.reject(error)
         } else {
            promise.resolve(null)
         }
     })

     pendingQue = [];
  }

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // function (response) {
  //   // Any status code that lie within the range of 2xx cause this function to trigger
  //   // Do something with response data
  //   return response;
  // },
  // function (error) {
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   return Promise.reject(error);
  // }

  (response) => {
       return response;
  }, async (error) => {

    const originalRequest  = error.config;

      if (error.response.status === 500 &&
       error.response.data.message === 'jwt expired' && 
       !originalRequest._retry
       ) 
       {
            console.log('your token has expired')

            originalRequest._retry = true;

            if(isRefreshing){
              return new Promise((resolve, reject) =>{
                 pendingQue.push({resolve, reject})
              })
              .then(() => axiosInstance(originalRequest))
              .catch((error)=> Promise.reject(error))
            }

            isRefreshing = true;

            try {
               const res  = await axiosInstance.post('/auth/refresh-token')
               console.log('new  token arrived', res)

              processQue(null) 
             return  axiosInstance(originalRequest)

            } catch (error){
              processQue(error)
              return Promise.reject(error)
            } finally {
               isRefreshing = false
            }

       }

      //  for Everything else, 

       return Promise.reject(error)
  }

);

    