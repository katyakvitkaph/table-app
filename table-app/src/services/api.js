import axios from "axios";


const baseUrl = "http://localhost:4321";
export const fetchNewUser = () => {
    return axios.get(`${baseUrl}/results`).then(response=> response.data)
}

export const postUser = (task) => {
    return axios.post(`${baseUrl}/results`, task).then(response=> response.data)
}
export const updateUser = (id, update) => {
    return axios.patch(`${baseUrl}/results/${id}`, update).then(response=> response.data)
}
