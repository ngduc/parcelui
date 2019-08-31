import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
const fetch = require('whatwg-fetch')

// use native browser implementation if it supports Aborting
const fetch2 = 'signal' in new Request('') ? window.fetch : fetch
const controllerMap: any = {} // map of group names for aborting, ex: { FETCH_USERS: [ctrl1, ctrl2] }

const DEFAULT_PARAMS = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'omit' // include OR omit
}
const baseURL = process.env.API_BASE_URL // 'https://localhost:3003/';
let token = ''

/* --------------------------------------------------------------------------- */

interface IError {
  code: number
  type: string
  message: string
}
interface IFetchOptions {
  group?: string
}

/* tslint:disable-next-line */
export const ErrorType = {
  ERROR: 'ERROR',
  ABORTED: 'ABORTED',
  EXCEPTION: 'EXCEPTION'
}

let onError = (params: any) => {} // ({ error, message, response }) => {}

export function setupReq(options: any) {
  onError = options.onError
}

const getResponseError = ({ path, response }: { path: string; response: any }): IError | null => {
  if (response && response.code && response.code !== 200) {
    const { code, message } = response
    const ret = { code, message, type: 'ERROR' }
    console.log('ERROR: ', ret)
    onError({ path, code, message, response })
    return ret
  }
  return null
}

const getExceptionError = (e: any): IError => {
  if (e.message === 'The user aborted a request.') {
    return { code: e.code, type: ErrorType.ABORTED, message: e.message } // aborted request
  }
  return { code: e.code, type: ErrorType.EXCEPTION, message: e.message } // generic exception
}

/* ---------------------------- */
interface IBuildParams {
  method: string
  data?: any
  options?: IFetchOptions
}
const buildParams = ({ method, data, options }: IBuildParams) => {
  let params = {
    ...DEFAULT_PARAMS,
    method,
    headers: { 'Content-Type': 'application/json' }
  }
  if (options && options.group) {
    // create a controller & add it to the Group
    const ctrl = new AbortController()
    controllerMap[options.group] = controllerMap[options.group] || []
    controllerMap[options.group].push(ctrl)

    params = Object.assign(params, { signal: ctrl.signal })
  }
  if (data) {
    params = Object.assign(params, { body: JSON.stringify(data) })
  }
  if (token) {
    params.headers = Object.assign(params.headers, {
      Authorization: `Bearer ${token}`
    })
  }
  return params
}

/* ---------------------------- */
export async function setToken(tokenStr: string) {
  token = tokenStr
}

/* ---------------------------- */
export async function reqGet(path: string, options?: IFetchOptions) {
  let response
  let error: IError | null
  try {
    const r = await fetch2(baseURL + path, buildParams({ options, method: 'GET' }))
    response = await r.json()
    error = getResponseError({ path, response })
  } catch (e) {
    error = getExceptionError(e)
  }
  return { error, res: error ? null : response }
}

/* ---------------------------- */
export async function reqPost(path: string, data: any, options?: IFetchOptions) {
  let response
  let error: IError | null
  try {
    const r = await fetch2(baseURL + path, buildParams({ data, options, method: 'POST' }))
    response = await r.json()
    error = getResponseError({ path, response })
  } catch (e) {
    error = getExceptionError(e)
  }
  return { error, res: error ? null : response }
}

/* ---------------------------- */
export async function reqPut(path: string, data: any, options?: IFetchOptions) {
  let response
  let error: IError | null
  try {
    const r = await fetch2(baseURL + path, buildParams({ data, options, method: 'PUT' }))
    response = await r.json()
    error = getResponseError({ path, response })
  } catch (e) {
    error = getExceptionError(e)
  }
  return { error, res: error ? null : response }
}

/* ---------------------------- */
export async function reqDelete(path: string, data: any, options?: IFetchOptions) {
  let response
  let error: IError | null
  try {
    const r = await fetch2(baseURL + path, buildParams({ data, options, method: 'DELETE' }))
    response = await r.json()
    error = getResponseError({ path, response })
  } catch (e) {
    error = getExceptionError(e)
  }
  return { error, res: error ? null : response }
}

/* ---------------------------- */
// abort requests with the same group
export async function abortGroup(group: string) {
  const ctrlArr = controllerMap[group]
  if (!ctrlArr) {
    return
  }
  for (const ctrl of ctrlArr) {
    if (ctrl && ctrl.abort) {
      ctrl.abort()
    }
  }
}

/* ---------------------------- */
// handle error
export function handleError(error: any) {
  if (error.type === ErrorType.ABORTED) {
    console.log('fetchData aborted.')
  } else if (error.type === ErrorType.EXCEPTION) {
    console.log('--- EXCEPTION: ', error) // e.g. API's HTTPS Cert expired
    // logout();
  } else {
    console.log('--- ERROR: ', error)
  }
}
