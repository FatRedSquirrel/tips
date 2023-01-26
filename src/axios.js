import axios from "axios";

const instance = axios.create({
    baseURL: 'https://tips-back.vercel.app/'
});

export default instance;