---
layout: post
published: true
title: 'JekyllをHerokuにデプロイした'
date: 2017-12-31 00:00:00 +0900
category: blog
categoriesTree:
  lvl0: ["commonplaces"]
  lvl1: ["commonplaces > web"]
  lvl2: ["commonplaces > web > jekyll", "commonplaces > web > heroku"]
---
手順はherokuのブログを参考にした[^1]。

1. bundlerとjekyllをインストールする。
~~~ sh
$ gem install bundler jekyll
~~~ 

1. jekyllコマンドでテンプレ作成。
~~~ sh
$ jekyll new jekyll-on-heroku
~~~ 

1. `cd jekyll-on-heroku`してレポジトリを初期化する。
~~~ sh
$ git init
$ git add .
$ git commit -m "jekyll new jekyll-on-heroku"
~~~ 

1. Herokuアカウントを作成してCLIをインストールする。

1. デプロイ先となるHeroku appをCLIで作成する。`<アプリ名>`は任意オプション。つけなければ自動生成される。Herokuへの認証が必要。
~~~ sh
$ heroku create　<アプリ名>
Enter your Heroku credentials:
Email:
Password:
Creating app... done, aqueous-river-12946
https://aqueous-river-12946.herokuapp.com/ | https://git.heroku.com/aqueous-river-12946.git
~~~ 

1. 下記コマンドを実行する。サイト生成と静的サーバーの機能をそれぞれ与えているみたい。
~~~ sh
$ heroku buildpacks:add heroku/ruby
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static
~~~ 

1. `./static.json`をカレントディレクトリ(`jekyll-on-heroku`)に作成する。
~~~ json
{
  "clean_urls": true,
  "https_only": true,
  "root": "_site/"
}
~~~ 

1. `./Rakefile`を作成する。
~~~ rb
task "assets:precompile" do
  exec("jekyll build")
end
~~~ 

1. `./Gemfile`に追記する。バージョンは`ruby -v`で確認して合わせる。
~~~ sh
gem "rake"
ruby "2.4.2"
~~~ 

1. `bundle`を実行する。
~~~ sh
$ bundle
~~~ 

1. 編集したファイルをpushする。
~~~ sh
$ git add .
$ git commit -m "Add static.json and Rake task"
$ git push heroku master
~~~ 

1. エラーが無ければ、`https://<アプリ名>.herokuapp.com/`にアクセスする。

以上。

--- 
[^1]: ["Jekyll on Heroku"](https://blog.heroku.com/jekyll-on-heroku)
