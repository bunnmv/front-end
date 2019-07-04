import axios from 'axios';

// const api = axios.create({
// //     baseURL: '',
// //     // proxy: {
// //     //     host: '127.0.0.1',
// //     //     port: 4000,
// //     // }
// // });

const userService = {};

userService.getUsers = () => {
    return axios.get('user/list');
};

userService.createUser = (params) => {
   return axios.post('user/create/', params);
};
export default userService;