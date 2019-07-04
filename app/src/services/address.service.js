import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000',
});

const addressService = {};

addressService.createAddress = (user,params) => {
   return api.post(`user/${user}/address/create`, params);
};
export default addressService;