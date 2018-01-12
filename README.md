---
layout: default
---

# 投稿の手順

## クローンする。
~~~ sh
git clone https://github.com/shnaisda/jekyll-on-netlify.git
~~~ 

## ローカルで確認する。
1. Algoliaのレコードを更新する。
    ~~~ sh
    $ ALGOLIA_API_KEY='{your_admin_api_key}' jekyll algolia
    ~~~
    * もしくは、`_algolia_api_key`を作成して下記コマンド。
        ~~~ sh
        $ jekyll algolia
        ~~~
    
1. ローカルサーバを立てて、`http://localhost:4000/`へアクセスする。
    ~~~ sh
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
      lvl0: ["Animal"]
    #  lvl1: ["Animal > Fish"]
    #  lvl2: ["Animal > Fish > Dark sleeper"]
    ---
    ... post content
    ~~~

### デプロイする。

1. `git init`コマンドで初期化する。

1. リモートを追加する。
    ~~~ sh
    $ git remote add origin https://github.com/shnaisda/jekyll-on-netlify.git
    ~~~

1. ローカルで確認して問題なければデプロイする。
    ~~~ sh
    $ git add .
    $ git commit -m "Update files"
    $ git push origin master
    ~~~
