
export enum METHODSTYPE {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
  HEAD = 'head',
  OPTIONS = 'options',
  PATCH = 'patch'
}

export interface AxiosRequestConfig {
  url: string,
  method?: METHODSTYPE,
  params?: any,
  data?: any,
}
