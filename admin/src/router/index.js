import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
Vue.use(Router);


import Home from '@/components/Home'
import aboutme from '@/components/aboutme';
import work from '@/components/work';
import motto from '@/components/mottos';
import user from '@/components/user';
import blog from '@/components/blog';
// 公告管理
import Notice from '@/components/notice';
// 编辑/添加/查看公告
import addNotice from '@/components/notice/addNotice';
//404
import NotFound from '@/components/404';
// 登陆
import Login from '@/components/login';

const router=new Router({
  routes: [
    {
        path:'/home',
        name: 'home',
        component: Home,
        children:[
            {
                path:'/aboutme',
                name:'aboutme',
                component:aboutme,
                meta: {requiresAuth: true}
            },
            {
                path:'/work',
                name:'work',
                component:work,
                meta: {requiresAuth: true}
            },
            {
                path:'/motto',
                name:'motto',
                component:motto,
                meta: {requiresAuth: true}
            },
            {
                path:'/notice',
                name:'notice',
                component:Notice,
                meta: {requiresAuth: true}
            },
            {
                path:'/user',
                name:'user',
                component:user,
                meta: {requiresAuth: true}
            },
            {
                path:'/blog',
                name:'blog',
                component:blog,
                meta: {requiresAuth: true}
            },
            {
                path:'/addNotice',
                name:'addNotice',
                component:addNotice,
                meta: {requiresAuth: true}
            },
            {
                path:'',
                redirect:'/aboutme'
            }

        ]
    },
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/404',
        name:'404',
        component:NotFound
    },   
    {
        path:'*',
        redirect:'/login'
    }
    
  ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit("login", window.localStorage.getItem('token'))
}

var self=this;
router.beforeEach((to, from, next) => {
    let isLogin=to.matched[to.matched.length-1].meta.requiresAuth;
    if (isLogin) {
        if (store.state.token) {        
            next()                                    
        }
        else {
            next({
                path: '/login'
 
            })
        }
    }
    else {
        next();
    }
})


export default router;