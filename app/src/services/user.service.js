import axios from 'axios';

const userService = {};

userService.getUsers = () => {
    return axios.get('user/list');
};

userService.createUser = (params) => {
   return axios.post('user/create/', params);
};
export default userService;