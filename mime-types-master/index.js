/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.模块依赖
 * @private
 * mime模块是一个基于mime-db的MIME类型解析及处理程序，其主要用途是设置某种扩展名的文件的响应程序类型
 * extname获取文件拓展名
 */

var db = require('mime-db')
var extname = require('path').extname

/**
 * Module variables.模块变量
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/     //提取类型的正则表达式
var TEXT_TYPE_REGEXP = /^text\//i

/**
 * Module exports.  模块暴露
 * @public
 * 利用export进行模块创建
 */

exports.charset = charset   //信息编码
exports.charsets = { lookup: charset }  //借助lookup查找信息编码
exports.contentType = contentType   //信息类型
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps   填充扩展/类型映射
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 * 得到一个MIME类型的默认字符集。
 * @param {string} type//参数
 * @return {boolean|string}// 返回值
 */

function charset (type) {   //判断输入类型
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer   待办事项：使用的媒体类型
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8   默认文本/ * UTF-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *创建给定MIME类型或扩展的完整内容类型头。
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?     这应该在这个模块中吗？
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1    //str.indexof()返回指定字符在此字符串中第一次出现处的索引。
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module   使用内容类型或其他模块
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()    //字符串合并
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *获取MIME类型的默认扩展名
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions     得到扩展
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *查找文件路径/扩展的MIME类型。
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)   获取扩展（“扩展”或“扩展”或完整路径）
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }
//判断路径是否为空
  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.    填充扩展和类型映射
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)   源偏好（最少>大多数）
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions   扩展名
    extensions[type] = exts

    // extension -> mime   扩展名> MIME
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping   跳过重映
          continue
        }
      }

      // set the extension -> mime  设置扩展名> MIME
      types[extension] = type
    }
  })
}
