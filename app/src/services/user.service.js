import axios from 'axios';

// const api = axios.create({
// //     baseURL: '',
// //     // proxy: {
// //     //     host: '127.0.0.1',
// //     //     port: 4000,
// //     // }
// // });

const userService = {};
userService.getUsers = axios.get('user/list');
export default userService;