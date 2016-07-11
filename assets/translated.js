var regexCN = /[\u4e00-\u9fa5]/

var tagList = [
  "h1", "h2", "h3", "h4",
  "p", "ol", "ul", "table"
]

function getNames(nodes) {
  return Array.prototype.map.call(nodes, function (node) {
    return node.nodeName
  }).sort(Math.min)
}

require(["gitbook", "jQuery"], function (gitbook, $) {
  gitbook.events.bind('page.change', function (e, config) {
    tagList.forEach(function (tag) {
      $(tag + '+' + tag).each(function (index, cnElem) {
        /* 
         * 检查
         */
        // 如果当前元素内容不是中文则退出
        if (!regexCN.test(cnElem.textContent)) { return }
        var enElem = cnElem.previousElementSibling
        // 如果上一个元素是中文也退出
        if (regexCN.test(enElem.textContent)) { return }

        // 如果两个元素的子元素节点数量不恒等，退出
        var cnChildNodes = cnElem.childNodes
        var enChildNodes = enElem.childNodes
        if (cnChildNodes.length !== enChildNodes.length) { return }
        // 获取子节点名称列表并按从小到大排序
        var cnChildNames = getNames(cnChildNodes)
        var enChildNames = getNames(enChildNodes)
        var isSameChild = cnChildNames.every(function (name, index) {
          return cnChildNames[index] === enChildNames[index]
        })
        if (!isSameChild) { return }

        /*
         * 操作
         */
        // 添加 class
        cnElem.classList.add("translated-cn")
        enElem.classList.add("translated-en")
        // 交换元素位置
        cnElem.parentNode.insertBefore(cnElem, enElem)
        // 默认隐藏英文原文
        enElem.classList.toggle("hidden")
        // 添加点击事件
        cnElem.addEventListener("click", function () {
          enElem.classList.toggle("hidden")
        })
        enElem.addEventListener("click", function () {
          enElem.classList.toggle("hidden")
        })
      })
    })
  })
})