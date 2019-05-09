import { request } from './request'

export default {
  // 处理错误信息
  error (err) {
    console.log('API 请求失败, 错误信息:')
    console.log(err)
  },
  /* Home 页面 */
  // 获取城市列表
  cities (params) {
    return request({
      url: 'v1/cities',
      params
    })
  },
  /* City 页面 */
  // 获取当前城市信息
  cityInfo (param) {
    return request({
      url: `v1/cities/${param}`
    })
  },
  // 搜索地址
  searchInfo (params) {
    return request({
      url: 'v1/pois',
      params
    })
  },
  /* Msite 页面 */
  // 获取地址信息(经纬度, 名字)
  addr (param) {
    return request({
      url: `v2/pois/${param}`
    })
  },
  // 获取食品分类
  foodsCate () {
    return request({
      url: 'v2/index_entry/'
    })
  },
  /* Msite, Food 页面 */
  // 获取商店列表
  shopList (params) {
    return request({
      url: 'shopping/restaurants',
      params
    })
  },
  /* Shop 页面 */
  // 商店信息
  shop (param) {
    return request({
      url: `shopping/restaurant/${param}`
    })
  },
  /* Shop -> goods 组件 */
  // 获取商品信息
  goods (params) {
    return request({
      url: 'shopping/v2/menu',
      params
    })
  },
  /* Shop -> comment 组件 */
  // 获取评论分类
  commentTags (param) {
    return request({
      url: `ugc/v2/restaurants/${param}/ratings/tags`
    })
  },
  // 获取评论信息
  comment (params) {
    return request({
      url: `ugc/v2/restaurants/${params.id}/ratings`,
      params: params.params
    })
  },
  /* Search yem页面 */
  // 获取搜索结果
  searchRes (params) {
    return request({
      url: 'v4/restaurants',
      params
    })
  },
  /* Service 页面 */
  // 获取FAQ
  explain () {
    return request({
      url: 'v3/profile/explain'
    })
  },
  /* Login 页面 */
  // 获取验证码
  captchas () {
    return request({
      url: 'v1/captchas'
    })
  },
}
