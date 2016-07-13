> This page is all English [translation by Google](https://translate.google.com/)

> 本页面所有英文[通过谷歌翻译](https://translate.google.com/)

# To switch the display two languages

# 切换显示两种语言

gitbook 3.2.0 does not properly parse ul list, so only supports `<= version of 3.1.1`

gitbook 3.2.0 不能正确解析 ul 列表，所以只支持 `<=3.1.1` 的版本

* translated：Click to To switch the display original
* original：Click to hide itself


* 译文：点击切换显示原文
* 原文：点击隐藏自身

See the source for more details

具体细节请看源码

> **Important**: 
The plugin isn't online translation, but translated based on the existing content.

> **注意**：
本插件并非在线翻译，而是根据已有内容进行翻译。

## Install

## 安装

Add the below to your `book.json` file, then run `gitbook install` : (Plugin will ignore it)

```json
{
    "plugins": ["translated"]
}
```

## Usage (Plugin will ignore it)

英文与中文：(Plugin will ignore it)

```markdown
the quick brown fox jumps over the lazy dog

跑得飞快的棕色狐狸跳过懒惰的狗

```

![english-with-chinese](./etc.gif)

Chinese with English:

中文与英文：

Configure `book.json`:

设置 `book.json`：

```json
{
    "pluginsConfig": {
        "translated": {
            "regexp": "/[a-zA-Z]/"
        }
    }
}
```

```markdown
```

![chinese-with-english](./cte.gif)

just work...


## Configuration

## 配置

Configure `book.json` again:

还是打开 `book.json`：

```json
{
    "plugins": ["translated"],
    "pluginsConfig": {
        "translated": {
            // 匹配译文的完整正则表达式（默认：中文）
            "regexp": "/[\u4e00-\u9fa5]/gi",
            // 需要被 translated 处理的标签
            "tags": ["h1","h2","h3","h4","h5","h6","p","ol","ul","table"]
        }
    }
}
```

## Preview

## 预览

![preview](./preview.gif)
