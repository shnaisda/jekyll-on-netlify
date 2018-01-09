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
$ ALGOLIA_API_KEY='{your_admin_api_key}' jekyll algolia
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

---

### ディレクトリ構成

~~~
.
+-- .git
+-- _includes
|   +-- algolia.html    # 1
|   +-- ganalytics.html # 2
+-- _layouts
|   +-- compress.html   # 3
|   +-- default.html
|   +-- home.html
|   +-- post.html
+-- _posts
|   +-- YYYY-MM-DD-TITLE.md
+-- _site
+-- assets
|   +-- css
|   |   +-- ais-widgets.scss    # 1
|   |   +-- style.scss
|   |   +-- syntax.scss
|   +-- img
|   +-- js
|   |   +-- ais-widgets.js  # 1
+-- .gitignore
+-- _algolia_api_key    # 1
+-- _config.yml
+-- 404.html
+-- ABOUT.md
+-- Gemfile
+-- Gemfile.lock
+-- index.md
+-- Rakefile    # 4
+-- README.md
+-- static.json # 4
~~~

外部ツールのための関連ファイルは番号付けしている。
1. Algolia
1. Google Analytics
1. Compress HTML in Jekyll
1. Heroku

---

### 静的サイトジェネレータの動向

* [Top Open-Source Static Site Generators - StaticGen](https://www.staticgen.com/)