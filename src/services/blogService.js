import api from './api'
import { ElNotification } from 'element-plus'

const ENDPOINT = '/blogs/'

export default {
  load (search, page = null, limit = null) {
    let params = {
      ...search,
    }
    if (page && limit) {
      params = { ...params, page, limit }
    }

    return api.get(ENDPOINT + 'load', { params })
  },

  show(id) {
    return api.get(ENDPOINT + 'show/' + id)
  },

  async delete(id) {
    const response = await api.delete(ENDPOINT + 'delete/' + id)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({type: 'success', title: responseTitle ?? 'Deleted!', message: responseMessage ?? 'Success!'})
  },

  async changeActiveStatus(id) {
    const response = await api.put(ENDPOINT + 'change-active-status/' + id)

    let responseTitle = response.data?.title
    let responseMessage = response.data?.message

    ElNotification({ type: 'success', title: responseTitle ?? 'Status changed!', message: responseMessage ?? 'Success!' })
  },
}
