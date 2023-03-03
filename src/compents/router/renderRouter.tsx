import React, { Fragment, Suspense } from 'react'
import { IRouteConfig } from './interface'
import { Route, Routes, BrowserRouter, HashRouter, Outlet } from 'react-router-dom' 

interface RenderRouterProps {
    routers: IRouteConfig[],
    fallback?: React.ReactNode;
    root?: boolean;
    isHash?: boolean;
}

const getReactNode = (component: React.LazyExoticComponent<React.FC> | React.FC | undefined) => {
    if (!component) return Fragment

    return component
}

const renderList = (routerList: IRouteConfig[]) => {
    return routerList.map(item => {
        const { path, parent, children } = item;
        const Layout = getReactNode(item.layout);
				const Component = getReactNode(item.compent);
        return <Route
            path={ path }
            key={path}
            element={ 
              <Layout>
                <>
                    <Component/>
                    {parent && <Outlet/>}
                </>
              </Layout>
        }
        >
            {!!children && renderList(children)}
        </Route>
    })
}

export const RenderRouter: React.FC<RenderRouterProps> = ({
    routers,
    fallback,
    root = true,
    isHash,
}) => {
    const content = (
        <Suspense fallback={fallback ?? <>加载中</>}>
          <Routes>{renderList(routers)}</Routes>
        </Suspense>
    );

    if (root) {
        if (isHash) {
          return <HashRouter>{content}</HashRouter>;
        }
        return <BrowserRouter>{content}</BrowserRouter>;
    }

    return content
}