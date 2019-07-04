import axios from 'axios';

const addressService = {};

addressService.createAddress = (user,params) => {
   return axios.post(`user/${user}/address/create/`, params);
};
export default addressService;