import React, { lazy } from 'react'

import Layout from '~/views/Layout/index'
import TokenAuth from '~/compents/Auths/tokenAuth'
import HomeLayout from '~/views/HomeLayout/index'
import { IRouteConfig } from '~/compents/router/interface'

export const mapRouterConfig: IRouteConfig[] = [
    {
        path: '/home',
        title: '首页',
        parent: true,
        layout: HomeLayout,
        children: [
            {
                path: '/home/index',
                title: '首页',
                compent: React.lazy(() => import("~/views/home/index"))
            },
            {
                path: '/home/classification',
                title: '分类',
                compent: React.lazy(() => import("~/views/home/classification"))
            },
        ]
    },
    {
        path: '/',
        title: 'home',
        parent: true,
        layout: TokenAuth,
        children: [
            {
                path: '/system',
                title: '系统管理',
                parent: true,
                layout: Layout,
                children: [
                    {
                        path: '/system/home',
                        title: 'Home',
                        compent: React.lazy(() => import("~/views/system/user/index"))
                    },
                    {
                        path: '/system/user',
                        title: '用户管理',
                        compent: React.lazy(() => import("~/views/system/user/index"))
                    },


                ]
            },
            {
                path: '/place',
                title: '我的地盘',
                parent: true,
                layout: Layout,
                children: [
                    {
                        path: '/place/home',
                        title: '个人信息',
                        compent: React.lazy(() => import("~/views/system/user/index"))
                    },
                ]
            },
            {
                path: '/article',
                title: '我的文章',
                parent: true,
                layout: Layout,
                children: [
                    {
                        path: '/article/home',
                        title: '个人信息',
                        compent: React.lazy(() => import("~/views/system/user/index"))
                    },
                ]
            },
            {
                path: '/gallery',
                title: '图库管理',
                parent: true,
                layout: Layout,
            }
        ]

    },
    { path: '/login', title: 'login', parent: false, compent: React.lazy(() => import("~/views/Login/index")) },
    { path: '*', title: 'login', parent: false, compent: React.lazy(() => import("~/views/Login/index")) },
]

