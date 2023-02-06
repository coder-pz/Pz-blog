## 一、React Hooks

### 1、为什么需要Hook?

+  Hook 是 React 16.8 的新增特性，hooks可以让我们在不编写class的情况下使用`state、生命周期`等特性。



#### 1.1 class 组件的优势

+ class组件可以定义自己的state，用来保存组件自己内部的状态
  +  函数式组件不可以，因为函数每次调用都会产生新的临时变量；
+ class组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑
  + 比如在componentDidMount中发送网络请求，并且该生命周期函数只会执行一次；
  +  函数式组件在学习hooks之前，如果在函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求；
+ class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等；
  + 函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以只让它们调用一次；



#### 1.2 class组件的劣势

+ **复杂组件变得难以理解**
  + 编写一个class组件会出现特别多的代码量，并且随着业务的增多代码量也会变大，也会越来越难维护
+ **组件复用状态很难**
  + 使用高阶组件可以让class组件复用起来，
    + 但是逻辑一复杂，Provider、Consumer 共享一些状态，嵌套就会很多，代码很乱



#### 1.3 hooks的出现

+ hooks 可以让函数组件有状态，并且根据状态变化重新渲染等
+  100% 向后兼容的**：**Hook 不包含任何破坏性改动
+ 无需因为要用hooks 就去将所有代码重构，hooks即便是在老项目中，也是可以使用的。



### 2、useState

#### 2.1 作用与使用

+ useState来自react，需要从react中导入，它是一个hook； 
  + 参数：初始化值，如果不设置为undefined； 
  + 返回值：数组，包含两个元素； 
    + 元素一：当前状态的值（第一调用为初始化值）；
    + 元素二：设置状态值的函数

> Hook 就是 JavaScript 函数，这个函数可以帮助你 钩入（hook into） React State以及生命周期等特性； 



#### 2.2 两个额外规则

1. 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。 
2.  只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。

#### 2.3 代码示例

```jsx
import { memo, useState } from 'react';

// 普通的函数, 里面不能使用hooks
// 在自定义的hooks中, 可以使用react提供的其他hooks: 必须使用use开头
// function useFoo() {
//   const [ message ] = useState("Hello World")
//   return message
// }

function CounterHook(props) {
  // useState 返回一个数组，数组中有两个值，第一个是state值，第二个是设置state的方法
  //并且调用设置方法后会重新调用当前函数
  const [counter, setCounter] = useState(0);
  const [name] = useState('lpz');
  console.log(name);
  return (
    <div>
      <h2>当前计数: {counter}</h2>
      <button onClick={(e) => setCounter(counter + 1)}>+1</button>
      <button onClick={(e) => setCounter(counter - 1)}>-1</button>
    </div>
  );
}

export default memo(CounterHook);

```



### 3、useEffect



#### 3.1 作用与使用

##### 3.1.1 作用 

> 页面渲染完成后，才会按照代码顺序调用，不会阻塞DOM的更新

+ 帮助函数组件实现生命周期
+ 发送网络请求、添加监听事件，移除监听事件



##### 3.1.2 使用	

+ 进入当前页面会调用一次
+ 每次数据变化函数调用也会调用一次
  + 可以设置参数，设置依赖跟据某个值的变化来调用

+ useEffect 有两个参数
  + 第一个参数为回调函数
    + 返回一个回调函数
    +  监听事件时候卸载事件(相当于`componentWillUnmount`)
  + 第二个参数为数组类型
    + 表示受谁的影响，如果变化那么就调用，如果为空数组，那么谁的影响都不受，只在渲染时调用一次
    + 如果不传，那么不管谁变化都会触发回调



#### 3.2 示例代码

```jsx
import React, { memo, useState, useEffect } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('hello useEffect');
  // useEffect 有两个参数
  //第一个参数为回调函数
  //  返回一个回调函数
  //  监听事件时候卸载事件(避免浪费内存)
  //第二个参数为数组类型
  //  表示受谁的影响，如果变化那么就调用，如果为空数组，那么谁的影响都不受，只在渲染时调用一次
  //  如果不传，那么不管谁变化都会触发回调
  useEffect(() => {
    console.log('count 的 useEffect');
    document.title = count;
    return () => {};
  }, [count]);

  useEffect(() => {
    console.log('message 的 useEffect');
    return () => {};
  }, [message]);

  useEffect(() => {
    console.log('发送网络请求, 从服务器获取数据');

    return () => {
      console.log('会在组件被卸载时, 才会执行一次');
    };
  }, []);
  return (
    <div>
      <div>{count}</div>
      <div>{message}</div>
      <button onClick={() => setCount(count + 1)}>count +1</button>
      <button onClick={() => setMessage(`hello lpz`)}>变化</button>
    </div>
  );
});

export default App;

```

### 4、useContext

#### 3.1 作用与使用



##### 3.1.1 作用

+ 简便使用 `context`



##### 3.1.2 使用

+ 每次context内容变化会重新调用渲染函数
+ 参数
  + 传入一个context
  + 返回当前context的数据



#### 3.2 代码示例



+ context.js
  + 先创建两个context

```jsx
import { createContext } from 'react';

export const UserContext = createContext();

export const ThemeContext = createContext();

```

+ index.js
  + 在插入位置引入

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01_不使用Hook/App';
// import App from './02_计时器实现对比/App';
// import App from './03_useState的使用/App';
// import App from './04_useEffect的使用/App';
import App from './05_useContext的使用/App';
import { UserContext, ThemeContext } from './05_useContext的使用/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //插入context Provider 并设置值
  <UserContext.Provider value={{ name: 'lpz', age: 18 }}>
    <ThemeContext.Provider value={{ color: 'red' }}>
      <App />
    </ThemeContext.Provider>
  </UserContext.Provider>
);

```



+ App.jsx
  + 引入 `useContext` 并使用

```jsx
import React, { memo, useContext } from 'react';
import { UserContext, ThemeContext } from './context';

const App = memo(() => {
  //useContext
  //  每次context内容变化会重新调用渲染函数
  //  传入一个context
  //  返回当前context的数据
  //
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  console.log(user, theme);
  return (
    <div>
      <h2>
        UserContext-{user.name}-{user.age}
      </h2>
      <h2 style={{ color: theme.color }}>ThemeContext</h2>
    </div>
  );
});

export default App;

```



### 5、 useReducer (特殊情况useState的替代品)

#### 5.1 作用与使用



##### 5.1.1 作用

+ 相当于 `useState` 需要的使用 `useReducer` 替换掉

+ 如果碰到复杂数据可以使用
  + 最好优先使用 `redux` ,缺点看起来很乱

##### 5.1.2 使用

+ 需要两个参数返回一个数组
  + 参数
    + 第一个参数为redeucer函数
    + 第二个为初始化state
  + 返回值
    + 第一个索引为state
    + 第二个为dispatch派发函数



#### 5.2 代码示例

```jsx
import React, { memo, useReducer } from 'react';
// import { useState } from 'react'

// 适合用在数据复杂的时候
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter - 1 };
    case 'add_number':
      return { ...state, counter: state.counter + action.num };
    case 'sub_number':
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}

// useReducer+Context => redux

const App = memo(() => {
  // const [count, setCount] = useState(0)
  //useReducer
  //  第一个参数为redeucer函数
  //  第二个为初始化state
  //返回值
  //  返回一个数组
  //    第一个索引为state
  //    第二个为dispatch派发函数
  const [state, dispatch] = useReducer(reducer, { counter: 0, friends: [], user: {} });

   //可以避免出现复杂类型需要多个定义useState 
  // const [counter, setCounter] = useState()
  // const [friends, setFriends] = useState()
  // const [user, setUser] = useState()
  return (
    <div>
      <h2>当前计数: {state.counter}</h2>
      <button onClick={(e) => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={(e) => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={(e) => dispatch({ type: 'add_number', num: 5 })}>+5</button>
      <button onClick={(e) => dispatch({ type: 'sub_number', num: 5 })}>-5</button>
      <button onClick={(e) => dispatch({ type: 'add_number', num: 100 })}>+100</button>
    </div>
  );
});

export default App;

```



### 6、 useCallback

#### 6.1 作用与使用

##### 6.1.1 作用

+ `useCallback` 可以做性能优化

  + 只有在给子组件传函数的时候才会有性能优化

  > 一个子组件在传入的props中如果是一个函数，父组件的render只要是调用子组件都会重新渲染，因为每次父组件渲染都会将传入的函数重新创建。
  >
  > 而 useCallback 即做了优化，给`useCallback`一个依赖数组，那么只有数组中的依赖变化才会去让函数重新创建。



##### 6.1.2 使用

+ useCallback
  + 参数
    + 第一个参数是一个回调函数
    + 第二个参数是一个依赖数组
  + 返回值
    +  memoized (有记忆的函数)



#### 6.2 useCallback 闭包陷阱 优化

##### 6.2.1 闭包陷阱的介绍

> + 在一个闭包函数被调用时，获取到一个函数变量每次调用都是第一次传入的值
> + useCallback 如果不传入依赖的变量，那么每次调用都是第一次获取到的count值

##### 6.2.2 优化

+ 可以使用 `useRef` 的 `current` 属性来当作需要依赖的值
  + 因为 `useRef` 每次render调用时不会重新创建，但是`countRef.current`会去获取到最新的值
  + 这时即便是子组件依赖这个值，那么也不会重新渲染，
  + 因为`useRef` 没有变化 ，`shouldComponentUpdate`只是做了浅层比较，不同才会重新渲染

```jsx
  // 进一步的优化: 当count发生改变时, 也使用同一个函数(了解)
  // 做法一: 将count依赖移除掉, 缺点: 闭包陷阱
  // 做法二: useRef, 在组件多次渲染时, 返回的是同一个值
  const countRef = useRef();
  countRef.current = count;
  const increment = useCallback(function foo() {
    console.log('increment');
    setCount(countRef.current + 1);
  }, []);
```

#### 6.3 代码示例

```jsx
import React, { memo, useState, useCallback, useRef } from 'react';

// useCallback
//  第一个参数是一个回调函数
//  第二个参数是一个依赖变量的数组

// useCallback性能优化的点:
//  1.当需要将一个函数传递给子组件时, 最好使用useCallback进行优化, 将优化之后的函数, 传递给子组件
//    这么做的意义在于，如果不是跟子组件相关的数据变化，那么子组件不需要重新渲染
//    普通函数每次都会创建一个新的函数，所以每次的子组件都会重新渲染

// props中的属性发生改变时, 组件本身就会被重新渲染
const Home = memo(function (props) {
  const { increment } = props;
  console.log('Home被渲染');
  return (
    <div>
      <button onClick={increment}>increment+1</button>
      {/* 100个子组件 */}
    </div>
  );
});

const App = memo(function () {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('hello');

  // 闭包陷阱: useCallback
  /**
   * 闭包陷阱的介绍
   *  在一个闭包函数被调用时，获取到一个函数变量每次调用都是第一次传入的值
   *  useCallback 如果不传入依赖的变量，那么每次调用都是第一次获取到的count值
   *
   */

  //useCallback
  //  只有count变化useCallback中的回调函数会变成一个新的函数
  //  这个时候使用这个函数的子组件才会被重新渲染
  // const increment = useCallback(
  //   function foo() {
  //     console.log('increment');
  //     setCount(count + 1);
  //   },
  //   [count]
  // );

  // 进一步的优化: 当count发生改变时, 也使用同一个函数(了解)
  // 做法一: 将count依赖移除掉, 缺点: 闭包陷阱
  // 做法二: useRef, 在组件多次渲染时, 返回的是同一个值
  const countRef = useRef();
  countRef.current = count;
  const increment = useCallback(function foo() {
    console.log('increment');
    setCount(countRef.current + 1);
  }, []);

  // 普通的函数
  //  每次state变化,子组件都会重新渲染
  // 因为每次都会创建一个新的increment函数
  // const increment = () => {
  //   setCount(count+1)
  // }

  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={increment}>+1</button>
      <Home increment={increment} />
      <h2>message:{message}</h2>
      <button onClick={(e) => setMessage(Math.random())}>修改message</button>
    </div>
  );
});

// function foo(name) {
//   function bar() {
//     console.log(name)
//   }
//   return bar
// }

// const bar1 = foo("lpz")
// bar1() // lpz
// bar1() // lpz

// const bar2 = foo("kobe")
// bar2() // kobe

// bar1() // lpz

export default App;

```

### 7、 useMemo

#### 7.1 作用与使用

##### 7.1.1 作用

+ useMemo的作用与useCallback作用一致
  + 处理子组件是否要渲染的性能优化

##### 7.1.2 使用

+ 参数
  + 第一个参数为回调函数
    + 这个回调函数返回一个值
  + 第二个参数为依赖数组
+ 返回值
  + 返回一个值



#### 7.2 代码示例

```jsx
import React, { memo, useCallback } from 'react';
import { useMemo, useState } from 'react';

const HelloWorld = memo(function (props) {
  console.log('HelloWorld被渲染~');
  return <h2>Hello World</h2>;
});
//useMemo
//  第一个参数为回调函数
//    这个回调函数返回一个值
//  第二个参数为依赖数组
//  返回值
//      返回一个值

function calcNumTotal(num) {
  // console.log("calcNumTotal的计算过程被调用~")
  let total = 0;
  for (let i = 1; i <= num; i++) {
    total += i;
  }
  return total;
}

const App = memo(() => {
  const [count, setCount] = useState(0);

  // const result = calcNumTotal(50)

  // 1.不依赖任何的值, 进行计算
  const result = useMemo(() => {
    return calcNumTotal(50);
  }, []);

  // 2.依赖count
  // const result = useMemo(() => {
  //   return calcNumTotal(count*2)
  // }, [count])

  // 3.useMemo和useCallback的对比
  function fn() {}
  // const increment = useCallback(fn, [])
  // const increment2 = useMemo(() => fn, [])

  // 4.使用useMemo对子组件渲染进行优化
  // const info = { name: "why", age: 18 }
  const info = useMemo(() => ({ name: 'why', age: 18 }), []);

  return (
    <div>
      <h2>计算结果: {result}</h2>
      <h2>计数器: {count}</h2>
      <button onClick={(e) => setCount(count + 1)}>+1</button>

      <HelloWorld result={result} info={info} />
    </div>
  );
});

export default App;

```

### 8、useRef

#### 8.1 作用与使用

##### 8.1.1 作用

+ 可以获取到dom元素
+ 可以给`useCallback` 做避免`闭包陷阱`的出现
  + 因为 `useRef` 不会每次 render时候都创建一个新的会保存在内存中

##### 8.1.2 使用

+ 调用`useRef`函数
  + 返回一个实例



#### 8.2 代码示例

```jsx
import React, { memo, useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

let obj = null;

const App = memo(() => {
  const [count, setCount] = useState(0);
  const nameRef = useRef();
  console.log(obj === nameRef);
  obj = nameRef;

  // 通过useRef解决闭包陷阱
  const countRef = useRef();
  countRef.current = count;

  const increment = useCallback(() => {
    setCount(countRef.current + 1);
  }, []);

  return (
    <div>
      <h2>Hello World: {count}</h2>
      <button onClick={(e) => setCount(count + 1)}>+1</button>
      <button onClick={increment}>+1</button>
    </div>
  );
});

export default App;

```

### 9、useImperativeHandle

#### 9.1 作用与使用

##### 9.1.1  作用

+ 对父组件的ref做安全处理,允许访问的一些操作,使用其他不生效
+  useImperativeHandle 返回的对象会绑定在 父组件ref中的current中

##### 9.1.2 使用

+ 参数
  + 第一个参数为父组件传入的`ref`
  + 第二个参数为一个函数，返回一个对象，绑定在父组件的 `useRef.current`上。



#### 9.2 代码示例

```jsx
import React, { memo, useRef, forwardRef, useImperativeHandle } from 'react';

// 因为是函数组件没有实例,所以需要forwardRef包裹返回
const HelloWorld = memo(
  forwardRef((props, ref) => {
    const inputRef = useRef(); //子组件内部自己定义一个ref,父组件操作时拦截使用自己的ref做操作

    // 子组件对父组件传入的ref进行处理
    // 对父组件的ref做安全处理,允许访问的一些操作,使用其他不生效
    // useImperativeHandle 返回的对象会绑定在 父组件ref中的current中
    useImperativeHandle(ref, () => {
      return {
        focus() {
          console.log('focus');
          inputRef.current.focus();
        },
        setValue(value) {
          inputRef.current.value = value;
        },
      };
    });

    return <input type="text" ref={inputRef} />;
  })
);

const App = memo(() => {
  const titleRef = useRef();
  const inputRef = useRef();

  function handleDOM() {
    // console.log(inputRef.current)
    inputRef.current.focus();
    // inputRef.current.value = ""
    inputRef.current.setValue('哈哈哈');
  }

  return (
    <div>
      <h2 ref={titleRef}>哈哈哈</h2>
      <HelloWorld ref={inputRef} />
      <button onClick={handleDOM}>DOM操作</button>
    </div>
  );
});

export default App;

```



### 10、useLayoutEffect 

#### 10.1 作用与使用

##### 10.1.1 作用

> 可以应用于页面某个元素等于一个值的时候不在DOM中显示，监听拦截

+ 与 useEffect 类似
+ 区别在于
  + `useEffect` 等待DOM渲染完成再去执行，不会阻塞DOM更新
  + `useEffect` 先执行后DOM渲染，会阻塞DOM更新



##### 10.1.2 使用

+ 参数
  + 第一参数为回调函数
  + 第二个参数为依赖数组



#### 10.2 代码示例

```jsx
import React, { memo, useEffect, useLayoutEffect, useState } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(100);
  //useEffect 因为时在渲染DOM后执行,所以设置为0时候会闪烁一下,先0后随机数

  // useEffect(() => {
  //   console.log('useEffect');
  //   if (count === 0) {
  //     setCount(Math.random() + 99);
  //   }
  // });

  //useLayoutEffect 不会出现闪烁,在发现是0时候,及时阻塞DOM重新渲染

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    if (count === 0) {
      setCount(Math.random() + 99);
    }
  });

  console.log('App render');

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={(e) => setCount(0)}>设置为0</button>
    </div>
  );
});

export default App;

```



## 二、自定义hooks

### 1、设置本地localStorage

#### 1.1 代码示例

+ App.jsx

```jsx
import React, { memo } from 'react';
import { useLocalStorage } from './hooks';

const App = memo(() => {
  console.log('App函数组件加载');
  const [token, setToken] = useLocalStorage('token');
  const [message, setMessage] = useLocalStorage('message');
  return (
    <div>
      <h2>token:{token}</h2>
      <h2>message:{message}</h2>
      <button onClick={(e) => setToken('加入token')}>设置token</button>
      <button onClick={(e) => setMessage('hello 自定义hooks')}>设置name</button>
    </div>
  );
});

export default App;

```

+ useLocalStorage.js
  + hook

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key) {
  // 设置初始值,没有值即为空
  const [data, setData] = useState(() => {
    const item = localStorage.getItem(key);
    if (!item) return '';
    return JSON.parse(item);
  });
  //   监听data变化,变化即调用回调渲染页面
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
export default useLocalStorage;
```



## 三、 redux 中的hooks

### 1、useSelector

#### 1.1 作用与使用

+ 获取 redux 中的state



#### 1.2 使用与性能 *

+ 第一个参数 是一个函数
  + 这个函数的第一个参数是state
  +  返回一个使用的state对象

+  第二个参数为浅层比较
  + 只有使用到的值变化了，才会去渲染组件
  + 如果不传入第二个参数，那么每次 `useSelector` store 数据有变化，都会重新渲染会影响性能



### 2、useDispatch

#### 2.1 作用与使用

+ 获取 `dispatch`派发函数



#### 2.2 使用

+ 调用 `useDispatch`返回一个`dispatch` 函数



### 3、shallowEqual

#### 3.1 作用与使用

+ 做浅层比较
  + 作为 `useSelector` 的第二个参数



### 1.2.3 代码示例



+ store/index.js

```jsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;

```

+ counter.js

```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 99,
    message: 'Hello World',
  },
  reducers: {
    addNumberAction(state, { payload }) {
      state.count = state.count + payload;
    },
    subNumberAction(state, { payload }) {
      state.count = state.count - payload;
    },

    changeMessageAction(state, { payload }) {
      console.log(payload);
      state.message = payload;
    },
  },
});

export const { addNumberAction, subNumberAction, changeMessageAction } = counterSlice.actions;
export default counterSlice.reducer;

```

+ App.jsx

```jsx
import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { changeMessageAction, addNumberAction, subNumberAction } from './store/modules/counter';

// memo高阶组件包裹起来的组件有对应的特点: 只有props发生改变时, 才会重新渲染
// useSelector 缺点
//  只要useSelector 里边不管什么变化，即便是没有使用到 props 都会变化，memo就会重新渲染组件
//  useSelector 第二个参数 传入 shallowEqual 做浅层比较，只有使用到的值有变化再会渲染，此问题就会解决
const Home = memo((props) => {
  //useSelector 获取 redux 中的state
  //  第一个参数 是一个函数
  //    第一个参数是state
  //    返回一个使用的state对象
  //  第二个参数为浅层比较
  //    只有使用到的值变化了，才会去渲染组件

  const { message } = useSelector(
    (state) => ({
      message: state.counter.message,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const changeMessage = (msg) => {
    dispatch(changeMessageAction(msg));
  };
  console.log('Home 渲染');
  return (
    <div>
      <h2>Home:{message}</h2>
      <button onClick={(e) => changeMessage('Hello Redux Hook')}>变化message</button>
    </div>
  );
});

const App = memo((props) => {
  console.log('App 渲染');
  //useSelector 获取状态
  //  第一个参数为函数返回需要的state
  const { coute } = useSelector((state) => ({ coute: state.counter.count }), shallowEqual);
  // redux hook useDispatch 直接获取dispatch
  const dispatch = useDispatch();

  function addNumber(num) {
    dispatch(addNumberAction(num));
  }
  function subNumber(num) {
    dispatch(subNumberAction(num));
  }
  return (
    <div>
      <h2>App:{coute}</h2>
      <button onClick={(e) => addNumber(2)}>+2</button>
      <button onClick={(e) => subNumber(2)}>-2</button>
      <Home />
    </div>
  );
});

export default App;

```



## 四、SSR与SPA



### 1、SPA单页面富应用的两个缺点

+ 首屏渲染速度

  + 需要下载 js 才会渲染页面

+ SEO的优化

  > 例如：
  >
  > + 百度爬虫只会爬取 index.html 但是SPA页面的index.htm只有一个div 、meta、title一些东西，搜索的关键字很少就会导致网站流量不行
  > + 但是谷歌搜索引擎是会下载代码，做一个深入的seo



### 2、SSR

#### 2.1 定义

> + SSR（**Server Side Rendering，服务端渲染**），指的是页面在服务器端已经生成了完成的HTML页面结构，不需要浏览器执行代码，创建页面结构
>
> + 对应的是CSR（**Client Side Rendering，客户端渲染**），
>
>   我们开发的SPA页面通常依赖的就是客户端渲染；



+ **我们可以借助于Node来帮助我们执行JavaScript代码，提前完成页面的渲染**



### 3、SSR同构应用

#### 3.1 定义

> 一套代码既可以在服务端运行又可以在客户端运行，这就是同构应用。

+ 当用户发出请求时，先在服务器通过SSR渲染出首页的内容。
+  但是对应的代码同样可以在客户端被执行。
+  执行的目的包括事件绑定等以及其他页面切换时也可以在客户端被渲染；



### 4、Hydration

#### 4.1定义

+ 在进行`ssr`时候页面的 html 只是一堆字符串而已
  + 并没有js交互行为，函数什么的都调用不了
+ 在第一次 node 将也买你呈现为 html 外，客户端一些框架在页面加载和呈现中`注入` js交互性，在浏览器中在执行一次
  + **这个注入的过程就叫做 Hydration**



## 五、useId

### 1、作用与使用

#### 1.1 作用

+ 在SSR同构应用中，客户端与服务端渲染可能会出现某个ID不同导致一些问题

+ 例:

  > 一个div在服务端渲染 ID 是aa 而在客户端就是 bb，这个时候js如果根据id获取就会出现问题

  + useId 可以在客户端渲染和服务端渲染中使用一个相同的id，就不会出现以上情况



#### 1.2 使用

+ 调用 `useId`函数返回一个 id



### 2、代码示例

```jsx
import React, { memo, useId, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)

  const id = useId()
  console.log(id)

  return (
    <div>
      <button onClick={e => setCount(count+1)}>count+1:{count}</button>

      <label htmlFor={id}>
        用户名:<input id={id} type="text" />
      </label>
    </div>
  )
})

export default App

```



## 六、useTransition

### 1、作用与使用

#### 1.1 作用

+ 返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。

#### 1.2 使用

+ 调用 `useTransition` 函数
  + 返回数组 有两个值
    + 第一个为 Boolean 是否加载完成
    + 第二个 函数 过渡任务执行



### 2、代码示例

```jsx
import React, { memo, useState, useTransition } from 'react'
import namesArray from './namesArray'//数组随机数

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const [ pending, startTransition ] = useTransition()

  function valueChangeHandle(event) {
    startTransition(() => {
      const keyword = event.target.value
      const filterShowNames = namesArray.filter(item => item.includes(keyword))
      setShowNames(filterShowNames)
    })
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: {pending && <span>data loading</span>} </h2>
      <ul>
        {
          showNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App

```



## 七、useDeferredValue

### 1、作用与使用

#### 1.1 作用

+ useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后

#### 1.2 使用



### 2、代码示例

```jsx
import React, { memo, useState, useDeferredValue } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const deferedShowNames = useDeferredValue(showNames)

  function valueChangeHandle(event) {
    const keyword = event.target.value
    const filterShowNames = namesArray.filter(item => item.includes(keyword))
    setShowNames(filterShowNames)
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: </h2>
      <ul>
        {
          deferedShowNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App

```

