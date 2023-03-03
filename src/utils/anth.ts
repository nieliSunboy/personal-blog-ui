import Cookies from "js-cookie";

export const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}
  
export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeCookies(cookieKey: string) {
    return Cookies.remove(cookieKey);
  }
  
  export function setCookies(cookieKey: string, token: string) {
    return Cookies.set(cookieKey, token);
  }

// url 处理t
export const jsonSearchFu = (strSearch: string) => {
    if (strSearch.indexOf("?") > -1) {
      strSearch = strSearch.substring(strSearch.indexOf("?") + 1);
    }
    let jsonSearch: any = {};
    let arrSearch = strSearch.split("&");
    if (arrSearch === null) {
      return;
    }
    arrSearch.forEach((element) => {
      if (element !== "") {
        let arrParam = element.split("=");
        if (arrParam.length > 1) {
          jsonSearch[arrParam[0]] = arrParam[1];
        }
      }
    });
    return jsonSearch;
  };