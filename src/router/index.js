import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'auth',
    component: () => import('@/pages/auth/Login.vue'),
  },
  {
    path: '/',
    name: 'dashboard' ,
    component: () => import('@/pages/Index.vue'),
  },

  // profile (auth)
  {
    path: '/profile/change-password',
    name: 'change_password',
    component: () => import('../pages/auth/ChangePassword.vue'),
  },

  // blogs
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('@/pages/blogs/Index.vue'),
    alias: ['/'],
  },
  {
    path: '/blog/:id',
    name: 'blog_show' ,
    component: () => import('@/pages/blogs/ShowBlog.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(), routes, linkActiveClass: 'menu-item-active',
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta

  if (authorize) {
    if (authorize.filter(row => row === true).length === 0) {
      return next({ name: 'dashboard' })
    }
  }

  next()
})


export default router
