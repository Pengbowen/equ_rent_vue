import request from '@/utils/request'
import axios from 'axios'
const ROOT_PATH = 'http://localhost:8080/'

// 获取全部的路由菜单
export const getList = () => {
  return request({
    url: ROOT_PATH + 'router/listAll',
    method: 'get'
  })
}

export const addParentRouter = params => {
  return axios.post(ROOT_PATH + 'router/addParentRouter', params)
}

export const deleteRouter = id => {
  return axios.delete(ROOT_PATH + 'router/delete/' + id)
}

export const updateRouter = params => {
  return axios.put(ROOT_PATH + 'router/update', params)
}
