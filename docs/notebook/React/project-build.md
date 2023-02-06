## 一、项目搭建

### 1、基础配置



#### 1.1 配置别名

+ **@craco/craco** 
  + 如果版本不对 谷歌 github 去查

```shell
npm i @craco/craco@alpha -D
```

> + 该插件可以将配置信息与`webpack`合并起来
> + 在项目根目录下创建 `craco.config.js` 
>   + 配置完成需要将 `package.json` 运行脚本 `react-scripts`改为`craco`



##### 1.1.1 代码示例

```jsx
const path = require('path');
const resolve = (pathname) => path.resolve(__dirname, pathname);
module.exports = {
  // webpack
  webpack: {
    alias: {
      '@': resolve('src'),//绝对路径
      components: resolve('src/components'),
      utils: resolve('src/utils'),
    },
  },
};
```

#### 1.2 配置less 

+ **craco-less**
  + 如果版本不对 谷歌 github 去查

```shell
npm i craco-less@2.1.0-alpha.0 -D
```

##### 1.2.1 代码示例

```jsx
const CracoLessPlugin = require('craco-less');
module.exports = {
  // less
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
};

```



#### 1.2 css样式重置

+ **normalize.css**

```shell
npm i normalize.css
```

+ 并在自己的项目种写一些自己需要初始化的 css



#### 1.3 主题色，颜色变量抽取



##### 1.3.1 第一种css方案

+ **assets \ css \ variables.less 定义**

```less
@textColor: #484848;
@textColorSecondary: #222;

:root {/*使用css特性根变量*/
  --primary-color: #ff385c;
}

```

+ **使用**

```js
export const FooterWrapper = styled.div`
  margin-top: 100px;
  border-top: 1px solid #ebebeb;
  color: var(--primary-color);//使用css特性变量
`
```

##### 1.3.2 第二种 styled-components 方案

> 利用 styled-components 的 *ThemeProvider* 直接加插入 props

+ **assets / theme / index.js**
  + 定义主题

```js
const theme = {
  color: {
    primaryColor: "#ff385c",
    secondaryColor: "#00848A"
  },
  text: {
    primaryColor: "#484848",
    secondaryColor: "#222"
  },
  mixin: {
    boxShadow: `
      transition: box-shadow 200ms ease;
      &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,.18);
      }
    `  
  }
}

export default theme

```

+ **index.js**
  + 注入主题

```js
import { ThemeProvider } from 'styled-components';
import theme from './assets/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Suspense fallback="loading">
    <Provider store={store}>
      {/* 插入主题 */}
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </Suspense>
  // </React.StrictMode>
);
```

+ **src\components\app-header\c-cpns\header-left\style.js**
  + css in js 使用主题

```js
import styled from 'styled-components';

export const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.primaryColor};

  .logo {
    margin-left: 24px;
    cursor: pointer;
  }
`;

```





### 2、react 路由

#### 2.1 依赖配置

```shell
npm i react-router-dom
```



#### 2.2 代码示例

+ router / index.js

```js
import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = React.lazy(() => import('@/views/home')); //懒加载
const Entire = React.lazy(() => import('@/views/entire'));
const Detail = React.lazy(() => import('@/views/detail'));

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />, //重定向
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/entire',
    element: <Entire />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
];

export default routes;

```



+ index.js

```js
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '@/App';
import 'normalize.css';
import './assets/css/index.less';
import store from './store';

// @ => src: webpack
// 问题: react脚手架隐藏webpack
// 解决一: npm run eject
// 解决二: craco => create-react-app config

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // 处理懒加载的组件
  <Suspense fallback="loading">
    {/* 注入store */}
    <Provider store={store}>
      {/* hash 路由 */}
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </Suspense>
  // </React.StrictMode>
);

```

+ App.jsx

```jsx
import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';

const App = memo(() => {
  return (
    <div className="app">
      <div className="header">header</div>
      {/* 路由切换容器 */}
      <div className="page">{useRoutes(routes)}</div>
      <div className="footer">footer</div>
    </div>
  );
});

export default App;

```







### 3、redux

#### 3.1 依赖配置

```shell
npm install @reduxjs/toolkit react-redux
```

#### 3.2 代码示例



##### 3.2.1 toolkit中的片段使用

+ store / index.js

```js
import { configureStore } from "@reduxjs/toolkit"
import homeReducer from "./modules/home"
import entireReducer from "./modules/entire"

const store = configureStore({
  reducer: {
    home: homeReducer,
    entire: entireReducer
  }
})

export default store

```



+ home.js

```js
import { createSlice } from '@reduxjs/toolkit'


const homeSlice = createSlice({
  name: "home",
  initialState: {
    productList: []
  },
  reducers: {

  }
})

export default homeSlice.reducer

```



##### 3.2.2 react-redux 的 reducer



+ store / index.js

```js
import { configureStore } from "@reduxjs/toolkit"
import homeReducer from "./modules/home"
import entireReducer from "./modules/entire"

const store = configureStore({
  reducer: {
    home: homeReducer,
    entire: entireReducer
  }
})

export default store

```



+ entire / reducer

```js
const initialState = {
  currentPage: 3,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;

```





### 4、加入请求 axios

#### 4.1 配置依赖

```shell
npm i axios
```

#### 4.2 代码示例(简要封装)

+ request / index.js

```js
import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';

class pzRequest {
   static test = "test"
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });

    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );
  }

  request(config) {
    return this.instance.request(config);
  }

  get(config) {
    return this.request({ ...config, method: 'get' });
  }

  post(config) {
    return this.request({ ...config, method: 'post' });
  }
}

export default new pzRequest(BASE_URL, TIMEOUT);

```

+ request / config.js

```js
export const BASE_URL = "" //基础url
export const TIMEOUT = 10000 //超时时间
```



