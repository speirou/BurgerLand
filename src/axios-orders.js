import axios from "axios";

const instance = axios.create({ baseURL: "https://burgerland-bd38b.firebaseio.com/"});

export default instance;