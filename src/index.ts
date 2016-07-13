import { Cheerio, load as parseHtml } from "cheerio"

/**
 * 获取所有子元素标签名称并保存在一个数组中返回
 */
function childNames($elem: Cheerio) {
  const childs = []
  for (let i = 0; i < $elem.length; i++) {
    childs.push($elem.eq(i).prop("tagName"))
  }
  return childs
}

// function regexFrom(regString: string) {
//   /^\/(.*)\/(.*)$/
//   return { pattern, flags }
// }

/**
 * 对传入元素进行如下安全检查：
 * 1. 元素内容非中文
 * 1. 上一个元素内容非英文
 * 1. 两个元素子节点数量不相等
 * 1. 两个元素子节点类型不类同
 */
function safeCheck($elem: Cheerio) {
  const regexp = this
  const $prev = $elem.prev()
  // 例如：英文 + 英文 or 中文 + 英文
  if (!regexp.test($elem.text())) { return false }
  // 例如：中文 + 中文
  if (regexp.test($prev.text())) { return false }
  // 子节点数量不相等
  let length = $elem.length
  if (length !== $prev.length) { return false }
  // 子元素类型不类同
  // 例如：
  // span, span
  // span, strong
  const elemChilds = childNames($elem).sort(Math.min)
  const prevChilds = childNames($prev).sort(Math.min)
  return elemChilds.every((_, index) => elemChilds[index] === prevChilds[index])
}

/**
 * 处理流程:
 * 1. 为译文添加 .translated-to
 * 1. 为原文添加 .translated-from
 * 1. 为原文添加 .hidden
 * 1. 交换位置
 */
function translatedHandler($elem: Cheerio) {
  const $prev = $elem.prev()
  // 为译文添加 .translated-to
  $elem.addClass("translated-to")
  // 为原文添加 .translated-from
  $prev.addClass("translated-from")
  // 为原文添加 .hidden
  $prev.addClass("hidden")
  // 交换位置
  $elem.insertBefore($prev)
}

// https://toolchain.gitbook.com/plugins/hooks.html
// https://developer.gitbook.com/plugins/hooks.html
export const hooks = {
  page(page: Gitbook.Page) {
    const getConfig = this.config.get

    // 从配置中读取匹配原文的正则表达式字符串
    const regString = getConfig('pluginsConfig.translated.regexp') || getConfig('translated.regexp')
    // 从该字符串中读取 pattern 与 flags
    const [_, pattern, flags] = regString.match(/^\/(.*)\/(.*)$/)
    // 生成真正的正则表达式对象
    const regexp = new RegExp(pattern, flags)

    const $ = parseHtml(`<html><head></head><body>${page.content}</body></html>`, { decodeEntities: false })
    // 从配置中读取需要处理的标签列表
    const tags = getConfig('pluginsConfig.translated.tags') || getConfig('translated.tags')
    tags.forEach((tag) => {
      // 转换为 Cheerio 数组
      [].map.call($(tag + "+" + tag), (elem) => $(elem))
        // 过滤掉错误的元素
        .filter(safeCheck, regexp)
        // 对剩下的元素进行 translated 操作
        .forEach(translatedHandler)
    })

    page.content = $("body").html()
    return page
  }
}

// https://developer.gitbook.com/plugins/assets.html
export const book = {
  assets: "./out/assets",
  css: ["translated.css"],
  js: ["translated.js"]
}