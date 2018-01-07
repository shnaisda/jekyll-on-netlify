---
layout: default
---

# 運用メモ

## クローンする。

~~~ sh 
$ heroku login
$ heroku git:clone -a jekyllog
$ cd jekyllog
~~~ 

## ローカル

* `bundle exec jekyll algolia`
* `bundle exec jekyll s`

## 投稿する。
1. 記事を作成する。ファイル名は命名規則`./_posts/YEAR-MONTH-DAY-title.md`に従う。

1. 作成したファイルにMetaデータを挿入する。コメントアウト以外は必須。
~~~ yml
---
title: 'Hilarious Title'
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

1. デプロイする。
~~~ sh
$ git add .
$ git commit -m "Update files"
$ git push heroku master
~~~

## 参考。

### Markdown
* [kramdown Syntax][id1]

### Jekyll
* [Jekyll Tips][id2]

[id1]:https://kramdown.gettalong.org/syntax.html
[id2]:http://jekylltips-ja.github.io/
