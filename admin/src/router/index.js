import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
Vue.use(Router);

// 管理端组件
const Home = ()=>import('@/components/Home');
const aboutme = ()=>import('@/components/aboutme');
const work = ()=>import('@/components/work');
const motto = ()=>import('@/components/mottos');
const user = ()=>import('@/components/user');
const blog = ()=>import('@/components/blog');
const addBlog = ()=>import('@/components/blog/addBlog');
const Notice = ()=>import('@/components/notice');
const addNotice = ()=>import('@/components/notice/addNotice');
const NotFound = ()=>import('@/components/404');
const Login = ()=>import('@/components/login');
const Album = ()=>import('@/components/album');
const AlbumDetail = ()=>import('@/components/album/albumDetail');

// 客户端组件
const clientHome = ()=>import('@/pages/Home');
const Index = ()=>import('@/pages/index');
const Diary = ()=>import('@/pages/diary');
const DiaryDetail = ()=>import('@/pages/diaryDetail');
const Article = ()=>import('@/pages/article');
const ArticleDetail = ()=>import('@/pages/articleDetail');
const Resume = ()=>import('@/pages/resume');

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
                path:'/addBlog',
                name:'addBlog',
                component:addBlog,
                meta: {requiresAuth: true}
            },
            {
                path:'/addNotice',
                name:'addNotice',
                component:addNotice,
                meta: {requiresAuth: true}
            },
            {
                path:'/album',
                name:'album',
                component:Album,
                meta: {requiresAuth: true}
            },
            {
                path:'/albumDetail',
                name:'albumDetail',
                component:AlbumDetail,
                meta: {requiresAuth: true}
            },
            {
                path:'',
                redirect:'/aboutme'
            }

        ]
    },
    {
        path:'/clientHome',
        name:'clientHome',
        component:clientHome,
        children:[
            {
                path:'/index',
                name:'index',
                component:Index
            },
            {
                path:'/diary',
                name:'diary',
                component:Diary
            },
            {
                path:'/diaryDetail',
                name:'diaryDetail',
                component:DiaryDetail
            },
            {
                path:'/article',
                name:'article',
                component:Article
            },
            {
                path:'/articleDetail',
                name:'articleDetail',
                component:ArticleDetail
            },
            {
                path:'',
                redirect:'/index'
            }

        ]
    },
    {
        path:'/resume',
        name:'resume',
        component:Resume

    },
    {
        path:'/admin',
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
        path:'/',
        redirect:'/clientHome'
    },
    {
        path:'*',
        redirect:'/404'
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