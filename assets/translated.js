var regexCN = /[\u4e00-\u9fa5]/

var tagMap = [
  "h1", "h2", "h3",
  "p", "ol", "ul", "table"
]

require(["gitbook", "jQuery"], function (gitbook, $) {
  gitbook.events.bind('page.change', function (e, config) {
    tagMap.forEach(function (tag) {
      $(tag + '+' + tag).each(function (index, cnElem) {
        // 如果当前元素内容不是中文则退出
        if (!regexCN.test(cnElem.textContent)) { return }
        var enElem = cnElem.previousElementSibling
        // 如果上一个元素是中文也退出
        if (regexCN.test(enElem.textContent)) { return }

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