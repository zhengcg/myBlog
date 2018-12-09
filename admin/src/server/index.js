/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '../store/store'
import router from '../router'

// axios 配置
axios.defaults.timeout = 50000;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.authorization = `token ${store.state.token}`;//${}es6语法，在字符串中使用变量。
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// http response 拦截器

axios.interceptors.response.use(
    response => {
        if(response.data.code==401){
            router.replace({
                name: 'login'
                // query: {redirect: router.currentRoute.fullPath}                       
            })

        }
        return response;
    },
    error => {
        if (error.response) {
            // alert(error.response.code)
            // console.log(error.response.status)
           this.$message({
                  message:"服务错误",
                  type: 'error'
                }); 
            switch (error.response.status) {
                case 202:
                    // 401 清除token信息并跳转到登录页面
                    // store.commit("logout");
                    router.replace({
                        path: 'login'
                        // query: {redirect: router.currentRoute.fullPath}                       
                    });break;
                case 201:
                    // 401 清除token信息并跳转到登录页面
                    // store.commit("logout");
                    router.replace({
                        path: 'login'
                        // query: {redirect: router.currentRoute.fullPath}                       
                    });break;
                case 500:
                // store.commit("logout");
                    router.replace({
                        path: 'login'
                        // query: {redirect: router.currentRoute.fullPath}                       
                    });break;
                case 404:
                // store.commit("logout");
                    router.replace({
                        path: 'login'
                        // query: {redirect: router.currentRoute.fullPath}                       
                    });break;
                case 502:
                // store.commit("logout");
                
                    router.replace({
                        path: 'login'
                        // query: {redirect: router.currentRoute.fullPath}                       
                    });break;
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        // return Promise.reject(error.response.data)
    });
export default axios;
