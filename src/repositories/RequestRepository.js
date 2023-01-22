export default class RequestRepository {
  constructor(axios) {
    this.axios = axios
  }

  request(options) {

    return this.axios.default(options)
  }
}