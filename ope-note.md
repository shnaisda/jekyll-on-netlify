---
layout: default
---

# 運用メモ

## Git Clone
~~~ sh 
$ git clone https://git.heroku.com/jekyllog.git
~~~ 

## 投稿
1. 記事を作成する。ファイル名は命名規則に従う。
~~~ 
YEAR-MONTH-DAY-title.md
~~~ 

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

1. ポストをpushする。
~~~ sh
$ git add _posts
$ git commit -m "Update posts"
$ git push heroku master
~~~ 