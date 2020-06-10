export type HttpMethod = 'get' | 'post' | 'delete' | 'put'

export type RouterPath = string | string[] | RegExp

export interface RouterParams {
    method: HttpMethod,
    path: RouterPath
}

export interface RouterPathConfig {
    target: any
    methodName: string,
    params: RouterParams
}
