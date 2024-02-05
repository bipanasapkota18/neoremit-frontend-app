export const api = {
  login: "/login",
  refreshToken: "/token/refresh",
  init: "/init"
};

export interface TemplateProjectResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
