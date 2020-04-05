import { request } from './request';

export function getHomeMultiData () {
  return request({
    url: '/home/multidata'
  }).catch(err => err);
}

export function getHomeGoods (type, page) {
  return request({
    url: "/api/h8/home/data",
    params: {
      type,
      page
    }
  }).catch(err => err);
}