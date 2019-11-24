// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/ybp',
    children: [
      {
        path: '/dashboard/ybp',
        name: 'ybp',
        // redirect: '/dashboard/workplace',
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] }
      },
      {
        path: '/tdgl',
        name: 'tdgl',
        redirect: '/tdgl/workplace',
        component: RouteView,
        meta: { title: '通道管理', keepAlive: true, icon: 'wallet', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/qd_channel',
            name: 'qd_channel',
            component: () => import('@/views/channel_management/qd_channel/Index'),
            meta: { title: '渠道', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/td_passageway',
            name: 'td_passageway',
            component: () => import('@/views/channel_management/td_passageway/Index'),
            meta: { title: '通道', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/td_group',
            name: 'td_group',
            component: () => import('@/views/channel_management/td_group/Index'),
            meta: { title: '通道组', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/fk_rules',
            name: 'fk_rules',
            component: () => import('@/views/channel_management/fk_rules/Index'),
            meta: { title: '风控规则', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/jygl',
        name: 'jygl',
        redirect: '/tdgl/workplace',
        component: RouteView,
        meta: { title: '交易管理', keepAlive: true, icon: 'pay-circle', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/zf_query',
            name: 'zf_query',
            component: () => import('@/views/transaction_management/zf_query/Index'),
            meta: { title: '支付订单', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/df_order',
            name: 'df_order',
            component: () => import('@/views/transaction_management/df_order/Index'),
            meta: { title: '代付订单', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/tk_query',
            name: 'tk_query',
            component: () => import('@/views/transaction_management/tk_query/Index'),
            meta: { title: '退款查询', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/yhgl',
        name: 'yhgl',
        redirect: '/yhgl/workplace',
        component: RouteView,
        meta: { title: '用户管理', keepAlive: true, icon: 'team', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/yh_user',
            name: 'yh_user',
            component: () => import('@/views/user_management/yh_user/Index'),
            meta: { title: '用户', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/sh_number',
            name: 'sh_number',
            component: () => import('@/views/user_management/sh_number/Index'),
            meta: { title: '商户号', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/js_power',
            name: 'js_power',
            component: () => import('@/views/user_management/js_power/Index'),
            meta: { title: '角色权限', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/yygj',
        name: 'yygj',
        redirect: '/yygj/workplace',
        component: RouteView,
        meta: { title: '运营工具', keepAlive: true, icon: 'solution', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/jk_test',
            name: 'jk_test',
            component: () => import('@/views/operation_tools/jk_test/Index'),
            meta: { title: '接口调试', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/login_log',
            name: 'login_log',
            component: () => import('@/views/operation_tools/login_log/Index'),
            meta: { title: '登录日志', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/cz_record',
            name: 'cz_record',
            component: () => import('@/views/operation_tools/cz_record/Index'),
            meta: { title: '操作记录', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/xtgj',
        name: 'xtgj',
        redirect: '/xtgj/workplace',
        component: RouteView,
        meta: { title: '系统工具', keepAlive: true, icon: 'setting', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/data_maintenance',
            name: 'data_maintenance',
            component: () => import('@/views/system_tools/data_maintenance/Index'),
            meta: { title: '数据维护', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/Interface_ip_white',
            name: 'Interface_ip_white',
            component: () => import('@/views/system_tools/Interface_ip_white/Index'),
            meta: { title: '接口ip白名单', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/site_setup',
            name: 'site_setup',
            component: () => import('@/views/system_tools/site_setup/Index'),
            meta: { title: '站点设置', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
