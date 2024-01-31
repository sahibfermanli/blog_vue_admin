import api from './api'
import { ElNotification } from 'element-plus'

const ENDPOINT = '/statistics/'

export default {
  load () {
    return api.get(ENDPOINT + '')
  },
}
