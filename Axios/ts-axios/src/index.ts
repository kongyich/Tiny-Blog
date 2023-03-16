import type { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { bulidURL } from './helpers/url';
import { transformRequest } from './helpers/data';

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
