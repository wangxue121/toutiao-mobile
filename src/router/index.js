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
  }
]

const router = new VueRouter({
  routes
})

export default router
