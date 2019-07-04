import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
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
export default userService;