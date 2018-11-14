import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }, /*
  {
    path: '/record',
    component: Layout,
    redirect: '/record/index',
    name: '病历管理',
    children: [
      {
        path: 'index',
        component: () => import('@/views/record/index'), // Parent router-view
        name: 'menu1',
        meta: { title: '病历管理' },
        children: [
          {
            path: 'add',
            component: () => import('@/views/record/add'),
            name: 'add',
            meta: { title: 'add' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'menu1-2-1',
                meta: { title: 'menu1-2-1' }
              }
            ]
          }
        ]
      }
    ]
  },*/
  {
    path: '/record',
    component: Layout,
    redirect: '/record/index',
    name: '病例管理',
    meta: { title: '病例管理' },
    children: [{
      path: 'index',
      component: () => import('@/views/record/index'),
      name: 'index',
      meta: { title: '' }
    },
    {
      path: 'info',
      name: '病历详情',
      component: () => import('@/views/record/info'),
      meta: { title: '病历详情' }
    },
    {
      path: '/record/view',
      component: () => import('@/views/record/view'),
      redirect: '/record/view/add',
      name: 'bar',
      meta: { title: '新建病历' },
      children: [{
        path: 'add', // Must write the full path
        component: () => import('@/views/record/add'),
        name: 'add',
        meta: { title: '' }
      },
      {
        path: 'choose',
        component: () => import('@/views/record/choose'),
        name: '新建病历',
        meta: { title: '测评项目选择' }
      }
      ]
    }
    ]
  },
  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'hasRecord',
        name: '已测病历',
        component: () => import('@/views/record/hasRecord'),
        meta: { title: '已测病历' }
      }
    ]
  },
  {
    path: '/evaluation',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '项目测评',
        component: () => import('@/views/evaluation/index'),
        meta: { title: '项目测评' }
      },
      {
        path: 'index0-2',
        name: '项目测评',
        component: () => import('@/views/evaluation/index0-2'),
        meta: { title: '项目测评' }
      },
      {
        path: 'index3-6',
        name: '项目测评',
        component: () => import('@/views/evaluation/index3-6'),
        meta: { title: '项目测评' }
      },
      {
        path: 'index5-0',
        name: '项目测评',
        component: () => import('@/views/evaluation/index5-0'),
        meta: { title: '项目测评' }
      },
      {
        path: 'index1-3-2',
        name: '项目测评',
        component: () => import('@/views/evaluation/index1-3-2'),
        meta: { title: '项目测评' }
      },
      {
        path: 'index-cognize',
        name: '项目测评',
        component: () => import('@/views/evaluation/index-cognize'),
        meta: { title: '项目测评' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '评测报告',
        component: () => import('@/views/report/index'),
        meta: { title: '评测报告' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/view',
    name: '系统管理',
    meta: { title: '系统管理' },
    children: [
      {
        path: '/admin/view',
        component: () => import('@/views/admin/view'), // Parent router-view
        name: 'menu1',
        meta: { title: 'menu1' },
        redirect: '/admin/index',
        children: [
          {
            path: 'index',
            component: () => import('@/views/admin/index'),
            name: 'index',
            meta: { title: 'index' }
          },
          {
            path: 'user',
            component: () => import('@/views/admin/user'),
            name: 'user',
            meta: { title: 'user' }
          },
          {
            path: 'evaluation',
            component: () => import('@/views/admin/evaluation'),
            name: 'evaluation',
            meta: { title: 'evaluation' }
          },
          {
            path: 'recordInquiry',
            component: () => import('@/views/admin/recordInquiry'),
            name: 'recordInquiry',
            meta: { title: 'recordInquiry' }
          },
          {
            path: 'recordSetup',
            component: () => import('@/views/admin/recordSetup'),
            name: 'recordSetup',
            meta: { title: 'recordSetup' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

