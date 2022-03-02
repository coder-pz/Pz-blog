# 方法属性：methods：{}

## 1.用于定义方法，函数



### 实例

```js
 methods: {//方法,用于定义函数
            add: function () {
                console.log('add被执行');
                this.counter++
            },
            sub: function () {
                console.log('sub被执行');
                this.counter--
            }
        },
```

# 计算属性：computed：{}

## 类似于methods:{}

### 实例

```js
 <h2>总价格: {{totalPrice}}</h2>
//这里的totalPrice实则是一个参数，不是一个方法没必要加()


computed: {
      totalPrice: function () {
          //totalPrice是一个参数，他里边是一个函数
        let result = 0
        for (let i=0; i < this.books.length; i++) {//把books循环一遍
          result += this.books[i].price
        }
        return result//返回出来遍历的
      }

    },
```



# 过滤属性：filters:{}

## 1.过滤你想要的东西

### 实例

```js
 <td>{{item.price | showPrice}}</td>
//￥45.00
//￥price.00

	<h2>总价格:{{sum | showPrice}}</h2>
//￥66.00
//￥sum.00

filters: {//过滤器属性
    showPrice(price) {//过滤到这个price时
      return '¥' + price.toFixed(2)
      //返回 ￥ + price 和 保留price两位小时
    }
```



# 注册组件：components：{}

```js
 components: {
      cpn: {//子组件标签名
        template: '#cpn',//绑定子组件模板
        data() {//子组件数据
          return {
            name: '我是cpn组件的name'
          }
        },
      }
    }
```

