import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://tips-back.vercel.app/'
    baseURL: 'http://localhost:666'
});

export default instance;
