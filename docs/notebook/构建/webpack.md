### 文章目录

- [Webpack是干什么的](https://blog.csdn.net/m0_46692959/article/details/106349631#Webpack_1)

- [一、Webpack安装](https://blog.csdn.net/m0_46692959/article/details/106349631#Webpack_8)

- - [安装语句](https://blog.csdn.net/m0_46692959/article/details/106349631#_13)

- [二、webpack使用](https://blog.csdn.net/m0_46692959/article/details/106349631#webpack_22)

- - [1.0、webpack打包 js](https://blog.csdn.net/m0_46692959/article/details/106349631#10webpack_js_26)

  - - [语句](https://blog.csdn.net/m0_46692959/article/details/106349631#_30)
    - [注意点](https://blog.csdn.net/m0_46692959/article/details/106349631#_40)

- [2.0、webpack的配置](https://blog.csdn.net/m0_46692959/article/details/106349631#20webpack_47)

- - [2.1、webpack.config.js文件配置](https://blog.csdn.net/m0_46692959/article/details/106349631#21webpackconfigjs_49)

  - - [配置目的](https://blog.csdn.net/m0_46692959/article/details/106349631#_81)

  - [2.2、package.json文件配置](https://blog.csdn.net/m0_46692959/article/details/106349631#22packagejson_89)

  - - [配置目的](https://blog.csdn.net/m0_46692959/article/details/106349631#_97)
    - [注意点](https://blog.csdn.net/m0_46692959/article/details/106349631#_103)

- [三、webpack的loader是干什么的](https://blog.csdn.net/m0_46692959/article/details/106349631#webpackloader_110)

- - [1.0、webpack 打包 css](https://blog.csdn.net/m0_46692959/article/details/106349631#10webpack__css_122)

  - [2.0、webpack 打包 less](https://blog.csdn.net/m0_46692959/article/details/106349631#20webpack__less_177)

  - [3.0、webpack 打包 图片](https://blog.csdn.net/m0_46692959/article/details/106349631#30webpack___243)

  - - - [base64字符串](https://blog.csdn.net/m0_46692959/article/details/106349631#base64_245)
      - [hash值](https://blog.csdn.net/m0_46692959/article/details/106349631#hash_251)

    - [注意点：](https://blog.csdn.net/m0_46692959/article/details/106349631#_341)

  - [4.0、ES6转为ES5](https://blog.csdn.net/m0_46692959/article/details/106349631#40ES6ES5_379)

- [四、webpack 配置 使用Vue](https://blog.csdn.net/m0_46692959/article/details/106349631#webpack__Vue_422)

- - [1.0、vue对象js文件的应用](https://blog.csdn.net/m0_46692959/article/details/106349631#10vuejs_424)
  - [2.0、利用webpack loader 使用后缀为vue的文件](https://blog.csdn.net/m0_46692959/article/details/106349631#20webpack_loader_vue_496)
  - [2.1、vue文件下多个组件](https://blog.csdn.net/m0_46692959/article/details/106349631#21vue_592)

- [五、webpack的plugin (插件)](https://blog.csdn.net/m0_46692959/article/details/106349631#webpackplugin__640)

- - [1.0、blugin的版权插件](https://blog.csdn.net/m0_46692959/article/details/106349631#10blugin_648)
  - [2.0、打包html文件的plugin](https://blog.csdn.net/m0_46692959/article/details/106349631#20htmlplugin_678)
  - [3.0、js代码压缩的plugin](https://blog.csdn.net/m0_46692959/article/details/106349631#30jsplugin_730)

- [六、webpack搭建本地服务器](https://blog.csdn.net/m0_46692959/article/details/106349631#webpack_777)

- - [1.0、webpack搭建本地服务器](https://blog.csdn.net/m0_46692959/article/details/106349631#10webpack_779)

  - [2.0、webpack的配置分离](https://blog.csdn.net/m0_46692959/article/details/106349631#20webpack_829)

  - - [目的](https://blog.csdn.net/m0_46692959/article/details/106349631#_831)



# Webpack是干什么的

- 可以把浏览器不支持的模块化，转成支持的
- 方便上传到服务器

# 一、Webpack安装

- webpack依赖于node环境
  - 需要使用node中的npm包管理工具来安装

## 安装语句

- npm install webpack@3.6.0 -g
  - 全局安装，不加版本号会默认安装最新版本
  - 脚手架 2 匹配 wepack3.6.0 的版本
- 4.0以后的版本还需要安装一个webpack-cli

# 二、webpack使用

## 1.0、webpack打包 js

### 语句

```js
webpack ./src/main.js ./dist/bundle.js
1
```

- 用webpack工具把./src/main.js打包到./dist/bundle.js
  - 只打包入口文件就可以，入口文件中的其他文件依赖，webpack会自动处理
  - 如果./src/main.js文件中有其他依赖的模块文件那么webpack会自动处理

### 注意点

1. 如果在VScode终端打包不好使，管理员运行vscode 然后在终端输入set-ExecutionPolicy RemoteSigned
2. 建议在cmd中运行

# 2.0、webpack的配置

## 2.1、webpack.config.js文件配置

- 1.新建一个webpack.config.js

  2.配置入口entry（所需打包的文件路径）

  3.配置出口output

  （1）path 指的是文件打包后的存放路径

  （2）path.resolve（）方法将路径或者路径片段的序列号处理成绝对路径

  （3）__dirname表示当前文件所在的目录的绝对路径

  （4）filename是打包后文件的名称

```js
const path = require('path');

module.exports = {
    //入口
    entry:'./src/main.js',
    //出口
    output:{
        path: path.resolve(__dirname,'dist'),//出口的绝对路径,存储打包文件到这个目录下
        filename:'bundle.js'//出口的打包文件名字
    }
}
1234567891011
```

### 配置目的

1. 执行webpack语句时,会去找一个webpack.config.js文件去获取命令
2. 直接执行webpack命令就可以根据文件的内容打包什么文件，打包到哪里

## 2.2、package.json文件配置

- 在scripts脚本中加入"脚本名称": “脚本执行命令”，
  - “build”: “webpack”
  - 这样npm run build就会执行webpack命令来打包

### 配置目的

1. 可以直接npm run 脚本名称 执行相应命令

### 注意点

1. 终端都是找全局来执行命令，如果用本地只能node_modules/.bin/webpack（找到它）来安装本地webpack,如果在package.json中配置脚本就不同了
2. 执行脚本名称时 会优先 去找本地找webpack相应的命令

# 三、webpack的loader是干什么的

- loader简要来说可以叫做转换器
- loader使用过程
  - 步骤一：通过npm安装需要使用的loader
  - 步骤二：在webpack.config.js中的modules关键字下进行配置

## 1.0、webpack 打包 css

- 官网文档
  - https://www.webpackjs.com/loaders/#%E6%A0%B7%E5%BC%8F

1. 如果需要给样式打包，那么需要让入口文件中依赖css样式文件

```js
//引入css依赖
require('./css/normal.css')
12
```

1. 安装 style-loader 与 css-loader

```js
#style-loader负责样式生效
#加上-dev===（开发时依赖）
npm install style-loader --save-dev
123
#css-loader只负责加载
#加上--save-dev===（开发时依赖）
npm install --save-dev css-loader
123
```

1. webpack.config.js文件配置

```js
#加上
module: {
        rules: [
          {
            test: /\.css$/,//匹配以css结尾的文件
            //css-loader只负责加载
            //style-loader负责样式生效
            //使用多个loader是从右边向左读取
            use: ['style-loader','css-loader' ]
          }
        ]
      }
123456789101112
```

1. 重新打包就可以了（npm run 脚本名称）

## 2.0、webpack 打包 less

- 官方文档：
  - https://www.webpackjs.com/loaders/less-loader/

1. 编写好相应的less文件

```less
@fontSize: 50px;//定义变量
@fontColor: orange;

body {
  font-size: @fontSize;//这里调用变量
  color: @fontColor;
}

12345678
```

1. 让入口文件依赖less文件

```js
//引入less依赖
require('./css/special.less')
12
```

1. 安装 less-loader 与 less

```js
#less-loader负责加载
#less负责转义成css
npm install --save-dev less-loader less
#这里注意可能会因为less-loader less 的版本号出问题
#加上-dev===（开发时依赖）
12345
```

1. 配置webpack.config.js文件

```js
#在rules数组中加入
//加载时也是从右往左（下到上）
{
        test: /\.less$/,//匹配所有以less结尾文件
        use: [{
          loader: "style-loader" // creates style nodes from JS strings//负责样式生效
        }, {
          loader: "css-loader" // translates CSS into CommonJS//负责加载
        }, {
          loader: "less-loader" // compiles Less to CSS//编译less变CSS
        }]
      }
123456789101112
```

1. 重新打包就可以了（npm run 脚本名称）

## 3.0、webpack 打包 图片

#### base64字符串

- 可以给图片加密,变成二进制字符串
- 不是很懂可以网站查询

#### hash值

- 用于给你的文件命名32位的hash值，不会重复
  - hash:8 就是设置成8位的hash值
- 官方文档：
  - https://www.webpackjs.com/loaders/url-loader/

1. 在css文件中加上一个背景图片
   - 因为它在css中,css已经被入口文件依赖,故不需要单独依赖

```js
 background: url(../img/timg.jpg);
1
```

1. 安装 url-loader

```js
npm install --save-dev url-loader
1
```

1. 配置webpack.config.js文件

```js
#在rules数组中加入
{
        test: /\.(png|jpg|gif)$/,//匹配这三个后缀结尾的图片
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片, 小于limit时, 会将图片编译成base64字符串形式.
              // 当加载的图片, 大于limit时, 需要使用file-loader模块进行加载.
              limit: 13000,//这里代表的是接受图片多大
            },
          }
        ]
      }
1234567891011121314
```

1. 当图片大小小于limit限制时，会转成base64字符串来显示，但是大于limit限制时需要下载file-loader模块

```js
npm install --save-dev file-loader
1
```

1. 并且大于limit限制的图片会打包到出口文件目录下，生成hash值的名字,而这时浏览器显示的是当前文件夹下的打包之后的图片，为了可以找到图片，在webpack.config.js中的出口加入

```js
  output: {
    publicPath:'dist/',//设置所有涉及url的路径默认都打包到dist/文件下
  },
123
```

1. 做到这里，会发现图片装在了一个文件夹下很乱，那么就在webpack.config.js文件中配置一下url图片打包后的存放路径名字名字名字后缀

```js
   {
        test: /\.(png|jpg|gif)$/,//匹配这三个后缀结尾的图片
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片, 小于limit时, 会将图片编译成base64字符串形式.
              // 当加载的图片, 大于limit时, 需要使用file-loader模块进行加载.
              limit: 13000,//这里代表的是接受图片多大
              name:'img/[name].[hash:8].[ext]',
                //名字：'img文件夹下/图片原本的名字.hash值的八位编码.原本图片的后缀名'
            },
          }
        ]
      }
123456789101112131415
```

### 注意点：

1. 大于limit限制的需要下载`file-loader`模块

   - ```js
     npm install --save-dev file-loader
     1
     ```

2. 大于limit限制的图片会打包到出口文件夹下，浏览器只会到当前文件夹下去找

   - 这时需要配置`webpack.config.js`的出口的`url`路径

   - ```js
      publicPath:'去哪个目录找',
     1
     ```

3. 如果需要图片摆放规范，名字清晰，那么需要在`webpack.config.js`文件匹配图片的options:{}中配置

   - ​	这里配置时一定要加【】才能获取以前的名字

     - 例如name不加【】
       - 以后的图片名字都会叫name

   - ```js
          name:'img/[name].[hash:8].[ext]',
     //名字：'img文件夹下/图片原本的名字.hash值的八位编码.原本图片的后缀名'
      /*img：文件要打包到的文件夹
     name：获取图片原来的名字，放在该位置
     hash:8：为了防止图片名称冲突，依然使用hash，但是我们只保留8位
     ext：使用图片原来的扩展名*/
     
     1234567
     ```

## 4.0、ES6转为ES5

- 官方文档：需要摸索
  - https://www.webpackjs.com/loaders/babel-loader/
  - env：environment （环境）

1. 如果浏览器不支持ES6那么打包就需要ES6转为ES5
2. 利用安装babel-loader来转义

```js
#安装7版本的babel-loader 与 babel-core babel-preset-es2015
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
12
```

1. 配置webpack.config.js

```js
{
        //exclude:排除
        test: /\.js$/,//匹配js文件
        exclude: /(node_modules|bower_components)/,
        use: {//使用
        loader: 'babel-loader',//loader使用babel-loader
          options: {//设置
            presets: ['es2015']
          }
        }
      }
1234567891011
```

1. 重新打包就可以了，打包文件中的ES6语法就被转义成了ES5

# 四、webpack 配置 使用Vue

## 1.0、vue对象js文件的应用

1. 需要先安装vue

```js
npm install vue --save
1
```

1. 在入口文件中导入vue，应用
   - 导入时它会去本地node_modules下边找到vue文件

```js
//5.使用Vue进行开发
//引入Vue依赖
//去本地node_modules下边找到vue文件
import Vue from 'vue'

const app = new Vue({
    el:'#app',
    data:{
        message:'Hello Webpack'
    }
})


//如果想用外边的vuejs那么就这样引入,但是别忘了导出
export default {template:...}//默认导出
import App from './src/app.js'//默认导出的导入
export const App = {template:.....}//命名导出     
import {App} from './src/app.js'//命名导出的导入
123456789101112131415161718
```

1. 这里打包运行时如果报以下错误：

```js
You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
#译文：
您使用的是Vue的仅运行时构建，其中模板编译器不可用。要么将模板预编译为呈现函数，要么使用编译器包含的构建。
123
```

runtime-only => 运行环境-only，代码中，不可以使用任何template

runtiome-compiler => 运行环境-编译器，代码中compiler可以编译template

1. 解决方案：在 webpack.config.js 中配置使用指定vue版本
   - 在webpack.config.js 的 module.exports 下边加入：

```js
resolve:{
    //alias:别名
    alias:{
      //$代表结尾
      'vue$':'vue/dist/vue.esm.js'
        //指定到vue/dist/vue.esm.js文件
    }
  }
12345678
```

1. 重新打包即可

## 2.0、利用webpack loader 使用后缀为vue的文件

1. 新建一个.vue文件在其中编写vue实例
   - vscode <vue有提示，选择默认就可以

```js
<template>
  //这里编写模板
</template>
<script>
    //如果有需要导入的子组件在这里写
export default {//这里代表导出
//这里写函数，js
}
</script>

<style>
//这里写样式
</style>
12345678910111213
```

1. 在入口文件导入vue文件与调用vue文件

```js
//导入vue文件
import App from './vue/App.vue'
//导入 子组件名 来自  ./vue/App.vue

new Vue({
    el:'#app',
    //这里定义#app的模板是子组件标签
    template:'<App></App>',//这里是模板内容
    components:{//组件
        App//组件模板标签名'App':子组件名APP
    }
   
})
12345678910111213
```

- 这里别忘记在index.html中有一个容器

  - ```js
      <div id="app"></div>
    //这里不需要放什么
    12
    ```

1. 需要下载vue的loader来加载到vue文件

```js
#vue-loader 负责加载vue文件
#vue-template-compiler 负责 vue-模板-编译

npm install vue-loader vue-template-compiler --save-dev

12345
```

1. 配置webpack.config.js文件中vue的loader配置

```js
#在rules数组中加入：
{
   test:/\.vue$/,//匹配以.vue结尾的文件
   use:['vue-loader']
}
12345
```

1. 这时打包如果报以下错误：

```js
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
#译文：
vue-loader没有使用相应的插件。确保在webpack配置中包含VueLoaderPlugin。
123
```

- 这里因为 vue-loader 14版本以后需要配置插件才可以加载vue文件
  - 所以这里可以选择去`package.js`on中把`vue-loader`的版本改成13.0.0这样它就只会下载13-14之间的版本
  - 改完之后直接打入 npm install 来安装一下改的依赖

1. 这里重新打包可以了

## 2.1、vue文件下多个组件

1. 在新建一个vue文件写入vue实例当作子组件
2. 在父组件中导入子组件Cpn

```js
#这是父组件
#这是父组件
#这是父组件
<template>
    <div>
        <h2>{{message}}</h2>
        <button @click="Bth">按钮</button>
        <h2 class="title">{{name}}</h2>
        <Cpn></Cpn>	///这里导入子组件标签
    </div>
</template>
<script>
      //在script标签中引入子组件
import Cpn from './Cpn.vue'
//引入 子组件构造名 来自 './Cpn.vue'

export default {
    name:"App",
    components:{//这里父组件需要加入子组件
        Cpn//'子组件标签名'：子组件构造名
    },
      data() {
        return {
            message:'Hello Webpack',
            name:'刘培志',
        }
    },
    methods: {
        Bth(){
            this.message='Hello'
        }
    },
}
</script>
12345678910111213141516171819202122232425262728293031323334
```

1. 树形解构

# 五、webpack的plugin (插件)

- plugin是插件的意思，通常是用于对某个现有的架构进行扩展。
- webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等。
- plugin的使用过程：
  - 步骤一：通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装)
  - 步骤二：在webpack.config.js中的plugins中配置插件。

## 1.0、blugin的版权插件

- BannerPlugin是webpack的版权插件

1. 配置webpack.config.js文件
   - 引入webpack包

```js
const webpack = require('webpack')
1
```

1. 配置webpack.config.js文件的plugins

```js
#在module.exports下边加入
 plugins:[
    new webpack.BannerPlugin('最终版权归Liu Pei Zhi所有')
  ]
1234
```

1. 重新打包，在打包(出口)文件顶部就会有一个版权声明

## 2.0、打包html文件的plugin

- html-webpack-plugin是打包html文件的插件

1. 由于webpack没有自带这个插件，故需要我们自己下载

```js
#如果新版本报错，那么就安装3.2.0版本的
npm install html-webpack-plugin@3.2.0 --save-dev
12
```

1. 配置webpack.config.js文件
   - 引入html-webpack-plugin包

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
1
```

1. 配置webpack.config.js文件中的plugins

```js
 #在module.exports下边加入
plugins:[
    new webpack.BannerPlugin('最终版权归Liu Pei Zhi所有'),
    new HtmlWebpackPlugin({
      template:'index.html',#这里会去当前目录下找模板index.html
    })
  ]
1234567
```

1. 这时应该解决一些以前配置
   - 把webpack.config.js文件的出口publicPath（公共路径）注释||删除
     - 不然打包之后的index.html找不到一些文件或者url图片
2. 因为`html-webpack-plugin`插件打包时会帮忙加入`script`标签所以原本的`index.html`可以不需要加入`script`标签
3. 这里如果配置成功，可以把出口目录(dist)下边的都删除,在重新打包一遍，	🙂看您心情🙂

## 3.0、js代码压缩的plugin

- uglifyjs-webpack-plugin是js代码丑化（压缩）插件
- 这里一丑化，版权的注释就会消失

1. 安装uglifyjs-webpack-plugin插件

```js
#不指定版本可能会出问题，可以尝试
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
12
```

1. 配置webpack.config.js文件
   - 引入uglifyjs-webpack-plugin包

```js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
1
```

1. 配置webpack.config.js文件中的plugins

```js
 #在module.exports下边加入
  plugins:[
    new webpack.BannerPlugin('最终版权归Liu Pei Zhi所有'),
    new HtmlWebpackPlugin({
      template:'index.html',//这里会去当前目录下找模板index.html
    }),
    new UglifyjsWebpackPlugin()#这里是js文件丑化

  ]
123456789
```

1. 之后打包之后就会看到打包后的js被压缩的丑化了

# 六、webpack搭建本地服务器

## 1.0、webpack搭建本地服务器

- 基于node的express框架搭建
- 作用：
  - 不需要做完一步打包一步,可以开着本地服务，你有变化服务器给你自动更新
  - 只需要最后做完时候打包一次就可以

1. 安装webpack-dev-server@2.9.3
   - 安装2.9.3版本因为要和wepack版本3.6.0匹配

```js
npm install --save-dev webpack-dev-server@2.9.3
1
```

1. 配置webpack.config.js文件
   - contentBase：为哪一个文件夹提供本地服务，默认是根文件夹，我们这里要填写./dist
   - port：端口号
   - inline：页面实时刷新
   - historyApiFallback：在SPA页面中，依赖HTML5的history模式

```js
#在module.exports下边加入
devServer:{//搭建本地服务
    contentBase:'./dist',//为这个文件夹提供本地服务
    inline:true,//实时进行监听
  }
12345
```

1. 因为安装在了本地,那么就去package.json文件去配置一下脚本
   - 配置脚本目的：为了可以让他直接去本地去找

```js
#在script脚本中加入
"dev":" webpack-dev-server"//这样会分配一个连接

"dev":" webpack-dev-server --open"//加上--open会直接帮你打开默认浏览器
1234
```

## 2.0、webpack的配置分离

### 目的

- 把webpack.config.js拆分方便统计
- base.config.js
  - 放置公共的东西
  - 开发时和生产时都依赖的东西
- prod.config.js
  - 生产时使用
  - 打包时候用的
- dev.config.js
  - 开发时使用

1. 并且需要安装webpack-merge
   - 用于配置分离的拼接

```js
 npm install webpack-merge --save-dev
1
```

1. webpack-merge使用
   - 将 开发||生产 需要的和公共的合并

```js
#导出=合并(baseconfig,{......})
module.exports = webpackMerge(baseconfig, {
    plugins: [
        new UglifyjsWebpackPlugin()//js打包丑化
    ]
})
123456
```

1. 需要改一下package.json的脚本执行
   - 才能正常使用npm run 打包，num run 开启本地服务

```js
 "build": "webpack --config ./build/prod.config.js", //打包时，去./build/prod.config.js这个自定义的文件去执行
     
  "dev": " webpack-dev-server --open --config ./build/dev.config.js" //开启本地服务时,去./build/dev.config.js自定义文件去执行
123
```

1. 参考在电脑的这个文件夹下

D:\B站VUE\vuejs资料和代码\Day 05\课堂代码5\LearnVuejs05-v2\copy_webpack _ 配置分离 _ 5