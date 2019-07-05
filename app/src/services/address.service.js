import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000',
});

const addressService = {};

addressService.createAddress = (user,params) => {
   return api.post(`user/${user}/address/create`, params);
};
addressService.editAddress = (user,id,params) => {
   return api.post(`user/${user}/address/edit/${id}`, params);
};
addressService.deleteAddress = (user,id) => {
   return api.post(`user/${user}/address/remove/${id}`);
};
export default addressService;