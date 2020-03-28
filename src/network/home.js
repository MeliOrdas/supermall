import { request } from './request';

export function getHomeMultiData () {
  return request({
    url: '/home/multidata'
  });
}

export function getHomeGoods (type, page) {
  return request({
    url: "/api/h3/home/data",
    params: {
      type,
      page
    }
  });
}