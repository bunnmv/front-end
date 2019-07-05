import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

const userService = {};

userService.getUsers = () => {
    return api.get('user/list');
};

userService.getUser = (id) => {
    return api.get(`user/get/${id}`);
};
userService.createUser = (params) => {
   return api.post('user/create', params);
};
userService.editUser = (id,params) => {
    return api.post(`user/edit/${id}`, params);
};
userService.deleteUser = (id) => {
    return api.post(`user/remove/${id}`);
};
export default userService;