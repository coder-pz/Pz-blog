## 一、Redux 基础

### 1、作用与理念

#### 1.1 作用

> **Redux** 是JavaScript的**状态容器**，提供了**可预测的状态管理**；
>
> + 实现状态管理，数据共享 与 Vue中的 `Vuex` 、`Pinia` 作用相同



#### 1.2 三个核心理念

##### 1.2.1 Store

> + 本地仓库，维护state

##### 1.2.2 action

> + 所有数据的变化，必须通过派发（dispatch）action来更新； 
> + action是一个普通的JavaScript对象，用来描述这次更新的type和content；

##### 1.2.3 reducer

> +  reducer是一个纯函数也必须是一个**纯函数**
> +  reducer做的事情就是将传入的**state**和**action**结合起来生成一个新的state；



### 2、Redux的三大原则

> **单一数据源**
>
> + 整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中：
> + Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护； 
> + 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改； 
>
>  **State是只读的**
>
> + 唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State： 
> + 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state； 
> + 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题； 
>
> **使用纯函数来执行修改**
>
> + 通过reducer将 旧state和 actions联系在一起，并且返回一个新的State： 
> + 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分； 
> + 但是所有的reducer都应该是纯函数，不能产生任何的副作用；



### 3、 使用示例



#### 3.1 基本规范与流程

+ 规范

> 一般规范来说都需要创建四个文件分别处理操作
>
> + index.js
>   + store 仓库
> + reducer.js
>   + reducer 纯函数
> + actionCreators.js
>   + 创建 action
> + constants.js
>   + 常量文件



+ 流程

> + 在 **index.js** 中创建仓库并导入 reducer.js 中的纯函数传入给**createStore**
> + 在 **constants.js** 中放入 **action type的常量**
> + **actionCreators.js** 中动态创建 **action**



#### 3.2 常用方法

+ createStore

  + 创建一个 store

+ store.getState()

+ 获取所有 state

+ store.dispatch

  + 派发 action 

  + 传入一个 action 

    + ```js
      { type: "change_age",age:20 }
      { type: "change_name",name:"lpz" }
      ```

+ store.subscribe

  + 订阅数据变化
  + 传入一个函数，数据变化会触发
  + 返回值是一个函数，并且调用会取消订阅



#### 3.3 代码示例

+ 需要安装 **redux**

**index.js**

```js
/**
 * store 仓库
 */
const { createStore } = require('redux');

const reducer = require('./reducer');

const store = createStore(reducer);
module.exports = store;

```

**reducer.js**

```js
/**
 * reducer 纯函数
 */
const { ADD_COUNTER, CHANGE_AGE } = require('./constants');
const initState = {
  name: 'lpz',
  age: 18,
  counter: 100,
};
// 定义 reducer 纯函数
// 1. 第一个参数 state
// 2. 第二个参数 action
// 返回值：返回值之后会作为 store中存储的state
function reducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_AGE:
      return { ...state, age: action.age };
    case ADD_COUNTER:
      return { ...state, counter: state.counter + action.num };
    default:
      return state;
  }
}

module.exports = reducer;

```

**actionCreators.js**

```js
/**
 * 创建 action
 */
const { ADD_COUNTER, CHANGE_AGE } = require('./constants');

const changeAgeAction = (age) => ({
  type: CHANGE_AGE,
  age,
});

const addCounterAction = (num) => ({
  type: ADD_COUNTER,
  num,
});

module.exports = {
  changeAgeAction,
  addCounterAction,
};

```

**constants**

```js
/**
 * 常量
 */
const ADD_COUNTER = 'add_counter';
const CHANGE_AGE = 'change_age';

module.exports = {
  ADD_COUNTER,
  CHANGE_AGE,
};

```

**使用**

```js
const store = require('./store');
const { changeAgeAction, addCounterAction } = require('./store/actionCreators');

// 添加订阅 (数据变化触发回调函数)
// 返回值调用即取消订阅
const unsubscribe = store.subscribe(() => {
  console.log('订阅数据变化', store.getState());
});

// 派发传入一个 action 行为
store.dispatch(changeAgeAction(21));
store.dispatch(changeAgeAction(22));

// 调用取消，下边的即不会触发订阅回调函数
// unsubscribe();

store.dispatch(addCounterAction(30));
store.dispatch(addCounterAction(60));

```



### 4、react 中使用 redux

##### 代码位置

> F:\learn\React\mycode\06_react_redux



#### 4.1 redux-thunk 中间件

> + 需要结合 `applyMiddleware` 使用
> + `redux-thunk` 中间件 允许 `dispatch` 中的 `actione` 返回一个函数
>   + 可以在这个返回函数中做 异步，数据请求等操作
> + `createStore` 第二个参数添加中间件

```js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// redux-thunk 中间件 允许 dispatch 中的 actione 返回一个函数
// createStore 第二个参数添加中间件

// Action 如果返回函数调用的dispatch
// 1. dispatch //派发函数
// 2. getState //store 获取state函数
const store = createStore(reducer, applyMiddleware(thunk));
```



#### 4.2 combineReducers 合并reducer函数

> + 如果将 `store` 抽取多个模块 那么就会有多个 `reducer`
>   + `combineReducers ` 函数可以合并 `reducer` 合并成一个，根据变量名区分

```js
// combineReducers 合并函数
import { createStore, compose, combineReducers } from "redux"

//两个 redux 模块
import counterReducer from './counter';
import homeReducer from './home';

// 多个 reducer 合并组成模块化
const reducer = combineReducers({
  home: homeReducer,
  counter: counterReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

```



#### 4.3 react 与 redux 浏览器调试工具



##### 4.3.1 React Developer Tools

> 查看 react 组件

 

##### 4.3.2 Redux DevTools

[Redux DevTools github](https://github.com/zalmoxisus/redux-devtools-extension)

+ 需要开启才可以使用
+ 生产模式需要关掉

```js
// 引入 redux 源compose
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

//redux-devtools 允许使用浏览器redux调试工具
// 判断浏览器有没有redux调试工具，有就增强redux中间件开启调试，否则就使用 redux的compose 不开启
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

// redux-thunk 中间件 允许 dispatch 中的 actione 返回一个函数
// createStore 第二个参数添加中间件
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
```



#### 4.4 代码示例 与 异步请求

##### 4.4.1 目录结构

```js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  └─ src
│     ├─ App.jsx
│     ├─ index.js
│     ├─ pages
│     │  ├─ about.jsx
│     │  ├─ category.jsx
│     │  ├─ home.jsx
│     │  └─ profile.jsx
│     ├─ store
│     │  ├─ counter
│     │  │  ├─ actionCreators.js
│     │  │  ├─ constants.js
│     │  │  ├─ index.js
│     │  │  └─ reducer.js
│     │  ├─ home
│     │  │  ├─ actionCreators.js
│     │  │  ├─ constants.js
│     │  │  ├─ index.js
│     │  │  └─ reducer.js
│     │  └─ index.js
│     └─ style.css
```



+ store / index.js

```js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './counter';
import homeReducer from './home';

// 多个 reducer 合并组成模块化
const reducer = combineReducers({
  home: homeReducer,
  counter: counterReducer,
});
//redux-devtools 允许使用浏览器redux调试工具
// 判断浏览器有没有redux调试工具，有就增强redux中间件开启调试，否则就使用 redux的compose 不开启
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

// redux-thunk 中间件 允许 dispatch 中的 actione 返回一个函数
// createStore 第二个参数添加中间件
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

```

##### 4.4.2 store / home 文件夹



+ index.js
  + 导出文件

```js
import reducer from './reducer';

export default reducer;
export * from './actionCreators';

```

+ reducer.js
  + 将传入的`state`和`action`结合起来生成一个新的`state`

```js
import * as actionTypes from './constants';

const initState = {
  banner: [],
  recommend: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return { ...state, banner: action.banner };
    case actionTypes.CHANGE_RECOMMEND:
      return { ...state, recommend: action.recommend };

    default:
      return state;
  }
}

export default reducer;

```

+ actionCreators.js
  + 描述这次更新的type和content

```js
import * as actionTypes from './constants';
import axios from 'axios';

export const changeBannerAction = (banner) => ({
  type: actionTypes.CHANGE_BANNER,
  banner,
});
export const changeRecommendAction = (recommend) => ({
  type: actionTypes.CHANGE_RECOMMEND,
  recommend,
});

export const fetchHomeMultidataAction = () => {
  // Action 如果返回函数调用的dispatch
  // 1. dispatch //派发函数
  // 2. getState //store 获取state函数
  return (dispatch, getState) => {
    console.log(getState().counter);
    axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
      const banner = res.data.data.banner.list;
      const recommend = res.data.data.recommend.list;
      dispatch(changeBannerAction(banner));
      dispatch(changeRecommendAction(recommend));
    });
  };
};

```

+ constants.js
  + 常量文件

```js
export const CHANGE_BANNER = 'change_banner';
export const CHANGE_RECOMMEND = 'change_recommend';

```

##### 4.4.3 store / counter文件夹



+ index.js
  + 导出文件

```js
import reducer from './reducer';

export default reducer;
export * from './actionCreators';

```

+ reducer.js
  + 将传入的`state`和`action`结合起来生成一个新的`state`

```js
import * as actionTypes from './constants';

const initState = {
  counter: 100,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.ADD_COUNTER:
      return { ...state, counter: state.counter + action.num };
    case actionTypes.SUB_COUNTER:
      return { ...state, counter: state.counter - action.num };

    default:
      return state;
  }
}

export default reducer;

```

+ actionCreators.js
  + 描述这次更新的type和content

```js
import * as actionTypes from './constants';

export const addNumberAction = (num) => ({
  type: actionTypes.ADD_COUNTER,
  num,
});
export const subNumberAction = (num) => ({
  type: actionTypes.SUB_COUNTER,
  num,
});

```

+ constants.js
  + 常量文件

```js
export const ADD_COUNTER = 'add_counter';
export const SUB_COUNTER = 'sub_counter';

```



##### 4.4.4 pages 页面

+ about.jsx

```jsx
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addNumberAction, subNumberAction } from '../store/counter';

export class About extends PureComponent {
  // addNumberClick(num){
  // this.props.addNumberClick(num)
  //   }
  //   subNumberClick(num){
  // this.props.subNumberClick(num)
  //   }
  render() {
    const { counter, addNumberClick, subNumberClick, banner, recommend } = this.props;
    return (
      <div className="container">
        <h2>About: {counter}</h2>
        <button onClick={(e) => addNumberClick(1)}>+1</button>
        <button onClick={(e) => subNumberClick(5)}>-5</button>
        <h2>banner</h2>
        <ul>
          {banner.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
        <h2>recommend</h2>
        <ul>
          {recommend.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
  banner: state.home.banner,
  recommend: state.home.recommend,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addNumberClick: (num) => {
      dispatch(addNumberAction(num));
    },
    subNumberClick: (num) => {
      dispatch(subNumberAction(num));
    },
  };
};

// connect 函数
// 1.connect 返回一个高阶组件
// 2.connect 本身是一个高阶函数
//    接收两个参数(函数)
//      第一个是函数将 store 中需要的 state 放置到 props 中返回(默认会传入一个state)
//      第二个是函数将需要的 dispatch 函数 放置到 props中返回(默认会传入一个 redux 中的 dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(About);

```

+ category

```jsx
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { fetchHomeMultidataAction } from '../store/home';

export class Category extends PureComponent {
  componentDidMount() {
    this.props.fetchHomeMultidata();
  }

  render() {
    return (
      <div className="container">
        <h2>Category Page</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // 请求接口 更改store 中的 state数据
  fetchHomeMultidata() {
    // 这里如果返回的是一个函数会给返回的函数传入两个参数
    // 1. dispatch //派发函数
    // 2. getState //store 获取state函数
    dispatch(fetchHomeMultidataAction());
  },
});
// connect 函数
// 1.connect 返回一个高阶组件
// 2.connect 本身是一个高阶函数
//    接收两个参数(函数)
//      第一个是函数将 store 中需要的 state 放置到 props 中返回(默认会传入一个state)
//      第二个是函数将需要的 dispatch 函数 放置到 props中返回(默认会传入一个 redux 中的 dispatch)
export default connect(null, mapDispatchToProps)(Category);

```

+ home.jsx

```jsx
import React, { PureComponent } from 'react';
import store from '../store';
import { addNumberAction } from '../store/counter';

export class Home extends PureComponent {
  constructor() {
    super();

    this.state = {
      counter: store.getState().counter.counter,
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        counter: store.getState().counter.counter,
      });
    });
  }
  addNumberClick(num) {
    store.dispatch(addNumberAction(num));
  }
  render() {
    const { counter } = this.state;
    return (
      <div className="container">
        <h2> Home Counter: {counter}</h2>
        <button onClick={(e) => this.addNumberClick(1)}>+1</button>
        <button onClick={(e) => this.addNumberClick(5)}>+5</button>
      </div>
    );
  }
}

export default Home;

```

+ profile.jsx

```jsx
import React, { PureComponent } from 'react';
import store from '../store';
import { subNumberAction } from '../store/counter';

export class Profile extends PureComponent {
  constructor() {
    super();
    this.state = {
      counter: store.getState().counter.counter,
    };
  }
  componentDidMount() {
    // 订阅 store中的 state变化
    store.subscribe(() => {
      this.setState({
        counter: store.getState().counter.counter,
      });
    });
  }
  subNumberClick(num) {
    store.dispatch(subNumberAction(num));
  }
  render() {
    const { counter } = this.state;
    return (
      <div className="container">
        <h2> Profile Counter: {counter}</h2>
        <button onClick={(e) => this.subNumberClick(1)}>-1</button>

        <button onClick={(e) => this.subNumberClick(5)}>-5</button>
      </div>
    );
  }
}

export default Profile;

```



## 二、Redux Toolkit 



### 1、认识 Redux Toolkit 

+ **Redux Toolkit 是官方推荐的编写 Redux 逻辑的方法**
  + 使用 react-redux 原生写起来会很繁琐，即便是优化也是多个文件不利于管理
  + 而 **redux toolkit** 就是来解决这些问题的



### 2、主要核心 API

#### 2.1 configureStore

> 包装createStore以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供的任何 Redux 中间件，redux-thunk默认包含，并启用 Redux DevTools Extension

**参数**

+ reducer
  + 将 slice 分片中的 reducer 可以组成一个对象传入此处；
+ middleware
  + 可以使用参数，传入其他的中间件；
+ devTools
  + 是否开启 浏览器 devtools 工具，默认为 true





#### 2.2 createSlice

> 接受reducer函数的对象、切片名称和初始状态值，并自动生成切片reducer，并带有相应的actions。



**参数**

+ name
  + 用户标记slice的名称
  + 在 redux-devtool 中可以看到对应的名称
+ initialState
  + 初始化state值
+ reducers
  + 相当于之前的reducer函数
  + 对象类型，并且可以添加很多的函数
  +  函数类似于redux原来reducer中的一个case语句
  + 函数参数
    + 参数一 ：state
    + 参数二 ：调用这个action传入的avtion参数
+ extraReducers
  + 其他 reducer `写入多个函数`
  + 这个配置项可以监听异步 createAsyncThunk 的状态从而做出反应（常用  fulfilled 状态）
    + 传入给函数两个参数
      + 第一个 ：state
        + 存储的数据
      + 第二个 ：avtion
        + 异步请求返回的数据在 payload 中
  + 可以为函数也可以为对象 (具体查看下方示例代码) 
    + 计算属性名写法
    + 函数链式 case 





#### 2.3 createAsyncThunk

> 处理异步
>
> 接受一个动作类型字符串和一个返回承诺的函数，并生成一个pending/fulfilled/rejected基于该承诺分派动作类型的 thunk

**参数**

+ 第一个参数  字符串
  + 设置typePrefix名字
+ 第二个参数 函数
  + 处理逻辑代码
  + 最后要返回异步获取到数据的 传给 `extraReducers`



### 3、代码示例



#### 3.0 重点内容抢先看

##### 3.0.1 深拷贝

> 目前js做彻底的深拷贝很难实现

+ 在 tookit 中 与 原生 redux 中

  + react-redux 需要返回一个全新的 state 

  + @reduxjs/toolkit 中`为了数据不可变性`做了优化 只需要更改内容即可

    ```jsx
    const homeSlice = createSlice({
      name: 'home',
      initialState: {
        banners: [],
        recommends: [],
      },
      reducers: { 
    changeBanners(state, { payload }) {
          // 这里与原生redux有区别
          // 直接赋值即可不需要返回整个 state
          //这里 @reduxjs/toolkit使用了 immerjs 这个库做了深拷贝
          state.banners = payload;
        },
      }
    })
    ```

+ 是因为 使用了  `immerjs ` 这个库

```js
/**
 * immerjs immutabe-js
 * 目前js做彻底的深拷贝很难实现
 * 这两个库可以实现
 * reduxjs/toolkit 底层使用了 immerjs 保证了数据不可变性
 */
```



##### 3.0.2 异步行为

**异步请求有两种方式**

+ 使用 `createAsyncThunk ` 第二个函数形参中的第二个 store.dispatch 传入actione 处理

  ```js
  // createAsyncThunk 会返回请求的状态，三种状态 pending、fulfilled、rejected
  // 第一个参数 设置typePrefix名字
  // 第二个参数 函数
  //      第一个参数为传入的参数
  //      第二个参数为 store
  
  export const fetchHomeMultidataAction = createAsyncThunk(
    'fetch/homemultidata',
    async (extraInfo, { dispatch }) => {
      console.log(extraInfo);
      const res = await axios.get('http://123.207.32.32:8000/home/multidata');
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      dispatch(changeBanners(banners));
      dispatch(changeRecommends(recommends));
      return res.data;
    }
  );
  ```

  

+ 使用 `extraReducers(其他 reducers )` 监听状态

  ```js
   // 额外 reducer
    //  监听 createAsyncThunk 的响应状态
    //    两种方式监听
    // 第一种：[aaa.bb] 计算属性名写法
      extraReducers: {
        // 等待
        [fetchHomeMultidataAction.pending](state, action) {
          console.log('pending', action);
        },
        // 成功
        [fetchHomeMultidataAction.fulfilled](state, { payload }) {
          state.banners = payload.data.banner.list;
          state.recommends = payload.data.recommend.list;
          //   console.log('fulfilled', action);
        },
        // 失败
        [fetchHomeMultidataAction.rejected](state, action) {
          console.log('rejected', action);
        },
      },
  ```

  



#### 3.1 目录结构

```
├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  └─ src
│     ├─ App.jsx
│     ├─ index.js
│     ├─ pages
│     │  ├─ About.jsx
│     │  ├─ Home.jsx
│     │  └─ Profile.jsx
│     ├─ store
│     │  ├─ features
│     │  │  ├─ counter.js
│     │  │  └─ home.js
│     │  └─ index.js
│     └─ style.css
```

#### 3.2 需要依赖

+  @reduxjs/toolkit
+  axios
+ react-redux



#### 3.2 main



**index.js**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

```

**App.jsx**

```jsx
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './style.css';

export class App extends PureComponent {
  render() {
    const { counter } = this.props;

    return (
      <div>
        <h2>App Counter: {counter}</h2>
        <div className="pages">
          <Home />
          <Profile />
          <About />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

export default connect(mapStateToProps)(App);

```



#### 3.3 store



**index.js**

+ store 

```jsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter';
import homeReducer from './features/home';

// 创建store
const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
  },
  // devTools: false,
});
export default store;

```

**features/counter.js**

+ features 为 所有 reducer

```jsx
import { createSlice } from '@reduxjs/toolkit';

// 创建片段
//  片段中含有reducer与action
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 888,
  },
  reducers: {
    // handleNumber(state,active) {},
    handleNumber(state, { payload }) {
      // 这里与原生redux有区别
      // 直接赋值即可不需要返回整个 state
      state.counter = state.counter + payload;
    },
  },
});

export const { handleNumber } = counterSlice.actions;

export default counterSlice.reducer;

```



**features/home.js**

```jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * immerjs immutabe-js
 * 目前js做彻底的深拷贝很难实现
 * 这两个库可以实现
 * reduxjs/toolkit 底层使用了 immerjs 保证了数据不可变性
 */
/**
 * 异步请求(两种方案)
 * 1. 使用 createAsyncThunk 第二个函数形参中的第二个 store.dispatch 传入actione 处理
 * 2. 使用 extraReducers 监听状态
 */
// createAsyncThunk 会返回请求的状态，三种状态 pending、fulfilled、rejected
// 第一个参数 设置typePrefix名字
// 第二个参数 函数
//      第一个参数为传入的参数
//      第二个参数为 store
export const fetchHomeMultidataAction = createAsyncThunk(
  'fetch/homemultidata',
  async (extraInfo, { dispatch }) => {
    console.log(extraInfo);
    const res = await axios.get('http://123.207.32.32:8000/home/multidata');
    const banners = res.data.data.banner.list;
    const recommends = res.data.data.recommend.list;
    dispatch(changeBanners(banners));
    dispatch(changeRecommends(recommends));
    return res.data;
  }
);
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banners: [],
    recommends: [],
  },
  reducers: {
    changeBanners(state, { payload }) {
      // 这里与原生redux有区别
      // 直接赋值即可不需要返回整个 state
      //这里 @reduxjs/toolkit使用了 immerjs 这个库做了深拷贝
      state.banners = payload;
    },
    changeRecommends(state, { payload }) {
      state.recommends = payload;
    },
  },
  // 额外 reducer
  //  监听 createAsyncThunk 的响应状态
  //    两种方式监听
  // 第一种：[aaa.bb] 计算属性名写法
  //   extraReducers: {
  //     // 等待
  //     [fetchHomeMultidataAction.pending](state, action) {
  //       console.log('pending', action);
  //     },
  //     // 成功
  //     [fetchHomeMultidataAction.fulfilled](state, { payload }) {
  //       state.banners = payload.data.banner.list;
  //       state.recommends = payload.data.recommend.list;
  //       //   console.log('fulfilled', action);
  //     },
  //     // 失败
  //     [fetchHomeMultidataAction.rejected](state, action) {
  //       console.log('rejected', action);
  //     },
  //   },

  //   第二种：函数链式 case (类似switch的case)
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeMultidataAction.pending, (state, action) => {
        console.log('pending', action);
      })
      .addCase(fetchHomeMultidataAction.fulfilled, (state, { payload }) => {
        console.log('fulfilled');
        // state.banners = payload.data.banner.list;
        // state.recommends = payload.data.recommend.list;
        // console.log('fulfilled', action);
      });
  },
});

export const { changeBanners, changeRecommends } = homeSlice.actions;
export default homeSlice.reducer;

```

#### 3.4 pages

**Profile.jsx**

```jsx
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { handleNumber } from '../store/features/counter';
import { fetchHomeMultidataAction } from '../store/features/home';

export class Profile extends PureComponent {
  componentDidMount() {
    this.props.fetchHomeMultidata({ name: 'lpz' });
  }
  handleClickNumber(num) {
    this.props.handleNumber(num);
  }
  render() {
    const { counter, banners, recommends } = this.props;

    return (
      <div>
        <h2>Profile Counter:{counter}</h2>
        <button onClick={(e) => this.handleClickNumber(5)}>5</button>
        <button onClick={(e) => this.handleClickNumber(10)}>10</button>
        <button onClick={(e) => this.handleClickNumber(-20)}>20</button>
        <h2>banners:</h2>
        <ul>
          {banners.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
        <h2>recommends:</h2>
        <ul>
          {recommends.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  counter: state.counter.counter,
  banners: state.home.banners,
  recommends: state.home.recommends,
});

const mapDispatchToProps = (dispatch) => ({
  handleNumber(num) {
    dispatch(handleNumber(num));
  },
  fetchHomeMultidata(params) {
    dispatch(fetchHomeMultidataAction(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

```

## 三、实现 connect

### 1、目录结构

```
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
   ├─ App.jsx
   ├─ hoc
   │  ├─ connect.js
   │  ├─ index.js
   │  └─ StoreContext.js
   ├─ index.js
   ├─ pages
   │  ├─ About.jsx
   │  ├─ Home.jsx
   │  └─ Profile.jsx
   ├─ store
   │  ├─ features
   │  │  ├─ counter.js
   │  │  └─ home.js
   │  └─ index.js
   └─ style
```

### 2、重点提前看

+ 高阶函数与高阶组件构成

> connect(storeToProps,dispatchToProps)(组件)
>
> + 传入两个参数与一个组件
>   + 第一个参数将`store`中的 `state` 转为`props`
>   + 第二个参数将`store`中的 `dispatch` 转为`props`
>   + 第三个组件为被操作组件
> + 返回一个高阶组件



+ 在根节点使用 `createContext` 把 `store` 注入

+ 在高阶组件中绑定 `createContext`  

  ```js
  import { StoreContext } from './StoreContext';
  // 绑定 context 此时 context 就是store
  NewComponent.contextType = StoreContext;
  ```

+ 这时可以在 `constructor` 中第二个参数或继承到获取到注入的 context

  + 而这时的 context 就是 store 本身

+ 在高阶组件中将 调用组件需要的 store 中 state 和 dispatch 传入props

  ```js
    this.state = mapStateToProps(context.getState()); //获取上层组件需要的state
  
  //高阶组件 render
   const stateObj = mapStateToProps(this.context.getState());
          const dispatchObj = mapDispatchToProps(this.context.dispatch);
          return <WrapperComponent {...this.props} {...stateObj} {...dispatchObj} />;
  ```

+ 在 生命周期中 订阅一下store变化

  ```js
     componentDidMount() {
          // 发布订阅监听 store 变化
          //  订阅数据变化
          //  传入一个函数，数据变化会触发
          //  返回值是一个函数，并且调用会取消订阅
          this.unsubscribe = this.context.subscribe(() => {
            // this.forceUpdate()
            this.setState(mapStateToProps(this.context.getState()));
          });
        }
     componentWillUnmount() {
          this.unsubscribe();
        }
  ```



### 3、代码示例

+ 根 - index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StoreContext } from './hoc';

import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* 利用react createContext 注入context */}
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </Provider>
  // </React.StrictMode>
);

```

+ hoc - index.js

```js
export { StoreContext } from './StoreContext'; // react createContext 注入
export { connect } from './connect'; //connect 函数

```

+ hoc - StoreContext.js

```js
import { createContext } from 'react';

export const StoreContext = createContext();

```

+ hoc - connect.js
  + connect 函数

```js
import React, { PureComponent } from 'react';
import { StoreContext } from './StoreContext';
// import store from '../store';
// connect的参数:
// 参数一: 函数
// 参数二: 函数
// 返回值: 函数 => 高阶组件
export function connect(mapStateToProps, mapDispatchToProps) {
  // 函数返回高阶组件
  return (WrapperComponent) => {
    class NewComponent extends PureComponent {
      constructor(props, context) {
        console.log(context);
        super(props);

        this.state = mapStateToProps(context.getState()); //获取上层组件需要的state
      }

      componentDidMount() {
        // 发布订阅监听 store 变化
        //  订阅数据变化
        //  传入一个函数，数据变化会触发
        //  返回值是一个函数，并且调用会取消订阅
        this.unsubscribe = this.context.subscribe(() => {
          // this.forceUpdate()
          this.setState(mapStateToProps(this.context.getState()));
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const stateObj = mapStateToProps(this.context.getState());
        const dispatchObj = mapDispatchToProps(this.context.dispatch);
        return <WrapperComponent {...this.props} {...stateObj} {...dispatchObj} />;
      }
    }
    // 绑定 context 此时 context 就是store
    NewComponent.contextType = StoreContext;
    return NewComponent;
  };
}

```

+ About.jsx

```jsx
import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import { connect } from '../hoc';
import { handleNumber } from '../store/features/counter';

export class About extends PureComponent {
  render() {
    const { counter } = this.props;
    return (
      <div>
        <h2>About Counter:{counter}</h2>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(handleNumber(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(About);

```





## 四、中间件

### 1、中间件原理

> 中间件做的事情即是在调用某个方法时，做一个拦截去调用自己的方法在这之间做一些操作



### 2、实现中间件

#### 2.1 日志中间件 log

```js
// 日志中间件 做拦截
function log(store) {
  // 保存原本的 store.dispatch
  const next = store.dispatch;
  function logAndDispatch(action) {
    console.log('当前派发的action:', action);
    // 使用原有的dispatch 派发
    next(action);
    console.log('派发之后的结果', store.getState());
  }
  // 修改原本 store.dispatch;
  // 名词 : Monkey Patching => 猴补丁 => 篡改现有的代码,对整体的执行逻辑进行修改
  store.dispatch = logAndDispatch;
}
log(store);
```



#### 2.2 允许 dispatch 传入函数 thunk

```js
// 实现 redux-thunk 中间件 允许dispatch 传入函数
function thunk(store) {
  // 保存原本的 store.dispatch
  const next = store.dispatch;
  function dispatchThunk(action) {
    if (typeof action === 'function') {
      // 这里的store.dispatch 就等于 dispatchThunk 会重新进来
      // 避免使用者在自己的代码中又调用了 dispatch 传入函数
      // 这里的 store.getState 是传入的函数
      action(store.dispatch, store.getState);
    } else {
      next(action);
    }
  }
  // 修改原本 store.dispatch;
  // 名词 : Monkey Patching => 猴补丁 => 篡改现有的代码,对整体的执行逻辑进行修改
  store.dispatch = dispatchThunk;
}
thunk(store);
```

