import type { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  console.log(headers)
  Object.keys(headers).forEach(key => {
    if (data === null && key.toLowerCase() === 'content-type') {
      delete headers[key]
    } else {
      request.setRequestHeader(key, headers[key])
    }
  })

  request.send(data)
}
