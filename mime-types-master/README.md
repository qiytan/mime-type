# mime-types
MIME类型
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

The ultimate javascript content-type utility.
最终的javascript内容类型实用程序
Similar to [the `mime@1.x` module](https://www.npmjs.com/package/mime), except:
类似于mime@1.x模块,除了:
- __No fallbacks.__ Instead of naively returning the first available type,
  `mime-types` simply returns `false`, so do
  `var type = mime.lookup('unrecognized') || 'application/octet-stream'`.
  没有回退，不是直接的返回第一个可用的类型，mime-types一般返回false，所以执行var type = mime.lookup('unrecognized') || 'application/octet-stream'.
- No `new Mime()` business, so you could do `var lookup = require('mime-types').lookup`.
没有new Mine（）事务，所以你可以使用 var lookup = require mime-types').lookup.
- No `.define()` functionality
没有 .define() 功能
- Bug fixes for `.lookup(path)`
通过 .lookup(path)进行错误修复
Otherwise, the API is compatible with `mime` 1.x.
否则，API与mime 1. x兼容。
## Install
安装
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
这是一个通过npm注册表可用的node.js模块。安装使用npm安装命令:$npm install mime-types
```sh
$ npm install mime-types
```

## Adding Types
添加类型
All mime types are based on [mime-db](https://www.npmjs.com/package/mime-db),
so open a PR there if you'd like to add mime types.
所有MIME 类型都是基于mime-db，所以你想要添加MIME类型，打开一个端口。
## API
API模块
```js
var mime = require('mime-types')
```

All functions return `false` if input is invalid or not found.
如果输入无效或没有查找到，所有函数返回flase。
### mime.lookup(path)
mime的lookup事件,用于查询路径
Lookup the content-type associated with a file.
查询与文件相关联的内容类型
```js
mime.lookup('json')             // 'application/json'
mime.lookup('.md')              // 'text/markdown'
mime.lookup('file.html')        // 'text/html'
mime.lookup('folder/file.js')   // 'application/javascript'
mime.lookup('folder/.htaccess') // false

mime.lookup('cats') // false
```

### mime.contentType(type)
mime的contentType事件
Create a full content-type header given a content-type or extension.
创建一个包含内容类型或扩展的完整内容类型标头。
```js
mime.contentType('markdown')  // 'text/x-markdown; charset=utf-8'
mime.contentType('file.json') // 'application/json; charset=utf-8'

// from a full path
mime.contentType(path.extname('/path/to/file.json')) // 'application/json; charset=utf-8'
```

### mime.extension(type)

Get the default extension for a content-type.
获取内容类型的默认扩展名。
```js
mime.extension('application/octet-stream') // 'bin'
```

### mime.charset(type)

Lookup the implied default charset of a content-type.
查找一个内容类型的隐含的默认字符集。

```js
mime.charset('text/markdown') // 'UTF-8'
```

### var type = mime.types[extension]

A map of content-types by extension.
内容类型的扩展。
### [extensions...] = mime.extensions[type]

A map of extensions by content-type.
一个通过内容类型延伸的地图。
## License
许可证
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/mime-types.svg
[npm-url]: https://npmjs.org/package/mime-types
[node-version-image]: https://img.shields.io/node/v/mime-types.svg
[node-version-url]: https://nodejs.org/en/download/
[travis-image]: https://img.shields.io/travis/jshttp/mime-types/master.svg
[travis-url]: https://travis-ci.org/jshttp/mime-types
[coveralls-image]: https://img.shields.io/coveralls/jshttp/mime-types/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/mime-types
[downloads-image]: https://img.shields.io/npm/dm/mime-types.svg
[downloads-url]: https://npmjs.org/package/mime-types
