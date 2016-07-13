require([
  'gitbook',
  'jquery'
], function (gitbook, $) {
  gitbook.events.bind('page.change', () => $(".translated-to")
    // 点击译文，切换显示原文
    .on("click", function (e) {
      const elem = this
      e.stopPropagation()
      $(elem).next().toggleClass("hidden")
    })
    // 点击原文，隐藏自身
    .next().on("click", function (e) {
      const elem = this
      e.stopPropagation()
      $(elem).addClass("hidden")
    }))
})