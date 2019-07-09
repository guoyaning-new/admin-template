import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "@/store";

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://10.10.13.14:7654/', // api的base_url
  timeout: 66666666000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.withCredentials = true;
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone拦截器
let flag = 0;
service.interceptors.response.use(
  response => {
    const res = response.data;
    // console.log(res);
    if (!res.success) {
      // 2999:登录过期
      if (res.errorCode == 2999) {
        flag += 1;
        if (flag == 1) {
          MessageBox.confirm(
            "你已被登出，可以取消继续留在该页面，或者重新登录",
            "确定登出",
            {
              confirmButtonText: "重新登录",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              flag = 0;
              location.reload();
            })
            .catch(() => {
              flag = 0;
            });
        }
      } else {
        res.msg ? (res.errorMessage = res.msg) : "";
        Message({
          message: res.errorMessage || "错误",
          type: "error",
          duration: 5 * 1000
        });
      }
      return Promise.reject(res);
    } else {
      return response.data;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
