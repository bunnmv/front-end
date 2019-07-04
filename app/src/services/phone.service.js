import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000',
});

const phoneService = {};

phoneService.createPhone = (user,params) => {
   return api.post(`user/${user}/phone/create/`, params);
};
export default phoneService;