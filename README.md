# wepy-plugin-preprocess

## 用途

* 小程序wepy框架下的 preprocess plugin配置
* 对项目文件进行 preprocess 处理

## 安装

```
npm install wepy-plugin-preprocess --save-dev
```

## 配置`wepy.config.js`

* 为 plugins 添加 preprocess 对象，支持单个或者多个规则，多个规则可以以 Array 或者 Object 实现。
* 每个规则的filter 是个正则表达式。
* 每个规则通过context配置条件上下文。


```
module.exports.plugins = {
    'preprocess': {             //加载 wepy-plugin-preprocess
        filter: /config\.js$/,  //条件
        context: {              //preprocess 的context参数
            ENV: 'prod'
        }
    }
};


module.exports.plugins = {
    'preprocess': [
        {
            filter: /config\.js$/,
            context: {
                ENV: 'prod'
            }
        }, {
            filter: /index\.html$/,
            context: {
                ENV: 'prod'
            }
        }
    ]
};

module.exports.plugins = {
    'preprocess': {
        'process-js': {
            filter: /config\.js$/,
            context: {
                ENV: 'prod'
            }
        },
        'process-html': {
            filter: /index\.html$/,
            context: {
                ENV: 'prod'
            }
        }
    }
};
```
