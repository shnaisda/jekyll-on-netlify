---
layout: default
---

# BLOG管理用のメモ

## リモートを追加する。
* https://help.github.com/articles/adding-a-remote/

## クローンする。
* https://help.github.com/articles/fetching-a-remote/

## ローカルで確認する。
~~~ sh
$ jekyll algolia
$ jekyll s
~~~ 

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
    
### デプロイする。
* https://help.github.com/articles/pushing-to-a-remote/

1. ローカルで確認して問題なければHerokuへデプロイする。
    ~~~ sh
    $ git add .
    $ git commit -m "Update files"
    $ git push origin master
    ~~~
