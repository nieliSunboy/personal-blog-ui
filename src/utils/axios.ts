import axios, {AxiosRequestConfig} from 'axios';
import { message } from './message';
import { getToken, removeToken, removeCookies } from './anth'
export enum ResponseStatus {
  Ok = 0,
  InvalidToken = 401,
  Error = 50,
  Disabled = 62,

}

export interface IResponseResult<T = any> {
  code: ResponseStatus;
  msg: string;
  error?: null | string[];
  data: T;
}

/**
 * 列表数据返回格式
 */
export interface IResultList<T = any> {
  current: number;
  total: number;
  size: number;
  data: T[];
}

export const myAxios = axios.create({
	baseURL: 'http://localhost:8083'
});

myAxios.interceptors.request.use(
	(config: any) => {
		// 如果token存在,则在请求头添加token参数
    // if (SSH.getItem('token')) {
    //     config.headers.token = `${SSH.getItem('token')}`
    // }
    // 登录类型使用histron；判断 登录凭证 是否存在
		const token = getToken();
		if (token) {
			config.headers.Authorization = "Bearer " + token;
		}

		return config;
	},
	(err) => {
    return Promise.reject(err);
  }
);

const ErrorResult = { code: -1, data: null };

let resetCount = Number(localStorage.getItem('resetCount')) || 0;

let timer: NodeJS.Timeout;

myAxios.interceptors.response.use(
	function (response) {
		if(response.data.code === ResponseStatus.InvalidToken || response.data.status === ResponseStatus.InvalidToken) {
			//  登录过期，执行跳转路由到 login 页面
			message.error("登录出错", { preventDuplicate: true });
			removeToken();
			removeCookies("userInfo");
			removeCookies("refresh_token");
			removeCookies("expires_time");
			window.location.reload();
		} else {
			localStorage.removeItem('resetCount');
		}
		if (response.data.code === ResponseStatus.Disabled) {
      if (window.location.pathname !== "/none") {
        const url = document.location.origin + "/none";
        document.location.href = url;
      }
    }
		return Promise.resolve(response.data);
	},
	function (error) {
    // 对响应错误做点什么
    message.error(
      error.response.data.error?.[0] || error.response.data.message
    );
    return Promise.reject(ErrorResult);
  }
)

const handleError = async (err: any): Promise<IResponseResult<null>> => {
  message.error("请求发生错误");
  return { ...ErrorResult, msg: err?.message ?? "请求发生错误" };
};

export async function getReq<T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
) {
  return myAxios.get<T>(url, config).catch(handleError);
}

export async function postReq<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  return myAxios.post<T>(url, data, config).catch(handleError);
}

export async function putReq<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  return myAxios.put<T>(url, data, config).catch(handleError);
}

export async function deleteReq<T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
) {
  return myAxios.delete<T>(url, config).catch(handleError);
}


