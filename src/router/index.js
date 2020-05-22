import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login/'
// const Login = () => import('@/views/login')

Vue.use(VueRouter)

// 路由表
const routes = [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    // component: Login
    // 路由懒加载
    component: () => import('@/views/login')
  },
  // 搜索页面
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/look',
        name: 'look',
        component: () => import('@/views/look')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  // 用户个人资料
  {
    path: '/userProfile',
    name: 'userProfile',
    component: () => import('@/views/user-profile')
  },
  // 小智同学
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  }
]

const router = new VueRouter({
  routes
})

export default router
