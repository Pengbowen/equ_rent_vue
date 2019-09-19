import request from '@/utils/request'

export const getList = () => {
  return request({
    url: 'http:///localhost:8080/carsouel/list',
    method: 'get'
  })
}

export const updateCarsouel = param => {
  return request({
    url: 'http:///localhost:8080/carsouel/update',
    method: 'put',
    params: param
  })
}
export const deleteCarsouel = id => {
  return request({
    url: 'http:///localhost:8080/carsouel/delete/' + id,
    method: 'delete'
  })
}
