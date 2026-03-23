// 全局配置文件
const BASE_URL = 'https://w.huangjinao.club'

const API = {
  getCategories: BASE_URL + '/get',
  uploadImage:   BASE_URL + '/upload',
  submitRepair:  BASE_URL + '/store',
  allRepairs:    BASE_URL + '/all',
  loadingRepairs: BASE_URL + '/loading',
  taskRepairs:   BASE_URL + '/task',
}

const SUPPORT_PHONE = '13034003710'

module.exports = {
  API,
  SUPPORT_PHONE,
}
