import axios from 'axios';
import addressService from "./address.service";

const api = axios.create({
   baseURL: 'http://localhost:3000',
});

const phoneService = {};

phoneService.getPhones = (user) => {
   return api.get(`user/${user}/phone/list`);
};

phoneService.createPhone = (user,params) => {
   return api.post(`user/${user}/phone/create`, params);
};
phoneService.editPhone = (user,id,params) => {
   return api.post(`user/${user}/phone/edit/${id}`, params);
};
phoneService.deletePhone = (user,id) => {
   return api.post(`user/${user}/phone/remove/${id}`);
};
export default phoneService;