---
nav:
  title: Components
  path: /components
---

---

## RenderRoutes

> 路由渲染容器
>
> by 李洲

Demo:

```tsx | pure
import React from 'react';
import { RenderRoutes, IRouteConfig } from '@haichuang/components';
import { Button } from '@mui/material';

const Page1 = () => <div>页面1</div>;
const Page2 = () => <div>页面2</div>;

const options: IRouteConfig = [
  { path: '/', component: Page1 },
  { path: '/1', component: Page2 },
];

export default () => {
  return (
    <div>
      <RenderRoutes routes={options} />
    </div>
  );
};
```

### 属性

| 参数     | 说明          | 类型              | 默认值 |
| -------- | ------------- | ----------------- | ------ |
| routes   | 路由配置      | `IRouteConfig`    | -      |
| root     | 是否为根路由  | `boolean`         | -      |
| fallback | 过渡组件      | `React.ReactNode` | -      |
| isHash   | 是否使用 hash | `boolean`         | -      |

### 路由配置 `IRouteConfig`

| 参数      | 说明         | 类型              | 默认值 |
| --------- | ------------ | ----------------- | ------ |
| path      | 路由路径     | `string`          | -      |
| component | 渲染组件     | `React.ReactNode` | -      |
| guard     | 路由守卫     | `React.ReactNode` | -      |
| layout    | 页面布局     | `React.ReactNode` | -      |
| routes    | 子路由       | `IRouteConfig`    | -      |
| parent    | 是否为父路由 | `boolean`         | -      |
| index     | 是否为首页   | `boolean`         | -      |
| redirect  | 重定向地址   | `string`          | -      |
