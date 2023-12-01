
import axios from "axios"

async function apiGetMenus(dataName, dataType, page) {
    const response = await axios.get(`https://api.mudoapi.tech/menus?name=${dataName}&type=${dataType}&perPage=5&page=${page}`)
    return response
}

async function apiDeleteMenu(id) {
    const token = localStorage.getItem('accessToken')
    const response = await axios.delete(`https://api.mudoapi.tech/menu/${id}`, 
        {
            headers: {
                Authorization: token
            }
        })
    return response.data.message
}

async function apiGetMenuDetail(idMenu) {
    const response = await axios.get(`https://api.mudoapi.tech/menu/${idMenu}`)
    return response
}

async function apiEditMenu(id, payload) {
    const token = localStorage.getItem('accessToken')
    const response = await axios.put(`https://api.mudoapi.tech/menu/${id}`, 
        payload,
        {
            headers: {
                Authorization: token
            }
        })
    return response
}

export default {apiGetMenus, apiDeleteMenu, apiGetMenuDetail, apiEditMenu}