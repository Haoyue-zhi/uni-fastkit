export enum HTTP_STATUS_CODE_MESSAGE {
  '请求错误(400)' = 400,
  '未授权，请重新登录(401)' = 401,
  '拒绝访问(403)' = 403,
  '请求出错(404)' = 404,
  '请求超时(408)' = 408,
  '服务器错误(500)' = 500,
  '服务未实现(501)' = 501,
  '网络错误(502)' = 502,
  '服务不可用(503)' = 503,
  '网络超时(504)' = 504,
  'HTTP版本不受支持(505)' = 505,
}

export enum BUSINESS_STATUS_CODE {
  Success = 0, // 成功
  Error = 400, // 错误
  Unauthorized = 401, // 未授权
  Forbidden = 403, // 禁止访问（原为forbidden）
  NotFound = 404, // 未找到（原为notFound）
  MethodNotAllowed = 405, // 方法不允许（原为methodNotAllowed）
  RequestTimeout = 408, // 请求超时（原为requestTimeout）
  InternalServerError = 500, // 服务器错误（原为internalServerError）
  NotImplemented = 501, // 未实现（原为notImplemented）
  BadGateway = 502, // 网关错误（原为badGateway）
  ServiceUnavailable = 503, // 服务不可用（原为serviceUnavailable）
  GatewayTimeout = 504, // 网关超时（原为gatewayTimeout）
  HttpVersionNotSupported = 505, // HTTP版本不支持（原为httpVersionNotSupported）
}
