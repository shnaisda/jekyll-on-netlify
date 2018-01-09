---
layout: default
---

# 管理用の運用メモ

## クローンする。
~~~ sh 
$ heroku login
$ heroku git:clone -a jekyllog
$ cd jekyllog
~~~ 

## ローカルで確認する。
~~~ sh
$ jekyll algolia
$ jekyll s
~~~ 

## 投稿する。
### 記事を作成する。
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

### デプロイする。
1. ローカルで確認して問題なければHerokuへデプロイする。
    ~~~ sh
    $ git add .
    $ git commit -m "Update files"
    $ git push heroku master
    ~~~

