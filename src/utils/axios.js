import axios from 'axios';

export const requestApi = {
   get: (url) => {
      return axios.get(url);
   },
   post: (url, data) => {
      // request body -> string
      if (typeof data === 'string') {
         return axios.post(url, data.replace(/"/g, ''), {
            headers: {
               'Content-Type': 'text/plain',
            },
         });
      }
      // request body -> json
      return axios.post(url, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
   },
   patch: (url, data) => {
      // request body -> string
      if (typeof data === 'string') {
         return axios.patch(url, data.replace(/"/g, ''), {
            headers: {
               'Content-Type': 'text/plain',
            },
         });
      }
      // request body -> json
      return axios.patch(url, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
   },
   put: (url, data) => {
      // request body -> string
      if (typeof data === 'string') {
         return axios.put(url, data.replace(/"/g, ''), {
            headers: {
               'Content-Type': 'text/plain',
            },
         });
      }
      // request body -> json
      return axios.put(url, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
   },
   delete: (url, data) => {
      // request body -> string
      if (typeof data === 'string') {
         return axios.delete(url, data.replace(/"/g, ''), {
            headers: {
               'Content-Type': 'text/plain',
            },
         });
      }
      // request body -> json
      return axios.delete(url, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
   },
};
