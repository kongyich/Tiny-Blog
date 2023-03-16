import type { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url';
import { transformRequest } from './helpers/data';
import { processHeaders } from './helpers/headers';

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformURL(config: AxiosRequestConfig) {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
