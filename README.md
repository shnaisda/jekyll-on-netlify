---
layout: default
---

# 管理用の運用メモ

## 投稿する。
### [Prose.io](http://prose.io)で記事を作成する。
1. ファイル`./_posts/YEAR-MONTH-DAY-title.md`を作成する。

1. 作成したファイルにMetaデータを挿入する。コメントアウト以外は必須。
    ~~~ md
    ---
    title: 'Post Title'
    date: 2018-01-01
    layout: post
    category: blog
    categoriesTree:
      lvl0: ["Animal", "Cook"]
    #  lvl1: ["Animal > Fish"]
    #  lvl2: ["Animal > Fish > Dark sleeper"]
    ---
    ... post content
    ~~~ 

---

### 静的サイトジェネレータの動向

* [Top Open-Source Static Site Generators - StaticGen](https://www.staticgen.com/)