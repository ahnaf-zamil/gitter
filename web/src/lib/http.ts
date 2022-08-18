import axios from "axios";

export const httpClient = axios.create({baseURL: "http://localhost:5000", withCredentials: true});
