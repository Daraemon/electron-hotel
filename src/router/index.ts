import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const Login = () => import('../views/Login.vue')
const Layout = () => import('../views/Layout.vue')
const DeviceManage1 = () => import('../views/device-manage/DeviceManage1.vue')
const DeviceManage2 = () => import('../views/device-manage/DeviceManage2.vue')
const DeviceManage3 = () => import('../views/device-manage/DeviceManage3.vue')
const DeviceManage4 = () => import('../views/device-manage/DeviceManage4.vue')
const EmployeeManage1 = () => import('../views/employee-manage/EmployeeManage1.vue')
const EmployeeManage2 = () => import('../views/employee-manage/EmployeeManage2.vue')
const ProjectManage = () => import('../views/project-manage/ProjectManage.vue')
const RoomManage = () => import('../views/room-manage/RoomManage.vue')
const SettingManage1 = () => import('../views/setting-manage/SettingManage1.vue')
const SettingManage2 = () => import('../views/setting-manage/SettingManage2.vue')
const WarningManage = () => import('../views/warning-manage/WarningManage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/deviceManage1',
        name: 'DeviceManage1',
        component: DeviceManage1
      },
      {
        path: '/deviceManage2',
        name: 'DeviceManage2',
        component: DeviceManage2
      },
      {
        path: '/deviceManage3',
        name: 'DeviceManage3',
        component: DeviceManage3
      },
      {
        path: '/deviceManage4',
        name: 'DeviceManage4',
        component: DeviceManage4
      },
      {
        path: '/employeeManage1',
        name: 'EmployeeManage1',
        component: EmployeeManage1
      },
      {
        path: '/employeeManage2',
        name: 'EmployeeManage2',
        component: EmployeeManage2
      },
      {
        path: '/projectManage',
        name: 'ProjectManage',
        component: ProjectManage
      },
      {
        path: '/roomManage',
        name: 'RoomManage',
        component: RoomManage
      },
      {
        path: '/settingmanage1',
        name: 'SettingManage1',
        component: SettingManage1
      },
      {
        path: '/settingmanage2',
        name: 'SettingManage2',
        component: SettingManage2
      },
      {
        path: '/warningManage',
        name: 'warningManage',
        component: WarningManage
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
