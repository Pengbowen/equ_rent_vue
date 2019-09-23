import request from '@/utils/request'
import axios from 'axios'
const ROOT_PATH = 'http://localhost:8080/'

// 获取全部的类别
export const getList = () => {
  return axios.get(ROOT_PATH + 'category/listAll')
}
