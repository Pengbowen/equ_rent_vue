import request from '@/utils/request'
import axios from 'axios'
export const getList = () => {
  return request({
    url: 'http://localhost:8080/router/listAll',
    method: 'get'
  })
}

export const addParentRouter = params => {
  return axios.post('http://localhost:8080/router/addParentRouter', params)
}

export const deleteRouter = id => {
  return axios.delete('http://localhost:8080/router/delete/' + id)
}
