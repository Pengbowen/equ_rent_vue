import request from '@/utils/request'

export const getList = () => {
  return request({
    url: 'http://localhost:8080/router/listAll',
    method: 'get'
  })
}
