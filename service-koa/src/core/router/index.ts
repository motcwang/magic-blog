export type HttpMethod = 'get' | 'post' | 'delete' | 'put'

export interface IRouterParams {
    method: HttpMethod,
    path: string
}
