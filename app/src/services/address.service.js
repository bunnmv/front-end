import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000',
});

const addressService = {};

addressService.getAddresses = (user) => {
   return api.get(`user/${user}/address/list`);
};

addressService.getAddress= (user,id) => {
   return api.get(`user/${user}/address/get/${id}`);
};

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