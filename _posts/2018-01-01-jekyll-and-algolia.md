---
layout: post
title: JekyllにAlgoliaを追加してNetlifyにデプロイした備忘録
date: 2018-01-01
category: blog
categoriesTree:
  lvl0: ["備忘録"]
  lvl1: ["備忘録 > web"]
  lvl2: ["備忘録 > web > jekyll"]
---

下記手順は[Algoliaのドキュメント][1]をもとにした。

## Algoliaのレコードに書き込む方法

[プラグイン][2]を利用する。

1. `./Gemfile`に下記を書き込む。
~~~ sh
gem 'jekyll-algolia', '~> 1.0'
~~~ 

1. Algoliaアカウントを作成して、Indexを作成する。
![algolia-indices-view](/assets/img/algolia-indices-view.png)

1. Application IDと読み込み用のAPI Keyを確認する。
![algolia-api-keys-view](/assets/img/algolia-api-keys-view.png)

1. 書き込み用のAPI Keyを作成する。
![algolia-new-key-view.png](/assets/img/algolia-new-key-view.png)

1. `./_config.yml`にパラメータを追記する。
~~~ yml
algolia:
  application_id: 'your_application_id'
  index_name: 'your_index_name'
  read_only_api_key: 'your_read_only_api_key'
~~~ 

1. `./_algolia_api_key`を作成して、書き込み用のAPI Keyをコピペする。Git管理する場合、`./.gitignore`にこのファイルを追加する。
~~~ 
••••••••••••••••••••••••••••••••
~~~

1. 下記コマンドを実行すると、ブログ記事がレコードに更新される。
~~~ 
$ bundl exec jekyll algolia
~~~ 

## Algoliaのレコードを読み込む方法

1. `_includes/algolia.html`を作成して、Algolia関連の設定をまとめる。
    ~~~ html {% raw %}
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/instantsearch.js@2.3/dist/instantsearch.min.css">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/instantsearch.js@2.3/dist/instantsearch-theme-algolia.min.css">
    <script src="//cdn.jsdelivr.net/npm/instantsearch.js@2.3/dist/instantsearch.min.js"></script>
    <script>
    const hitTemplate = function(data) {
      const url = data.url;
      const title = data._highlightResult.title.value;
      return `
        <h1><a href="${url}">${title}</a></h1>
      `;
    }
    const search = instantsearch({
      appId: '{{ site.algolia.application_id }}',
      apiKey: '{{ site.algolia.read_only_api_key }}',
      indexName: '{{ site.algolia.index_name }}',
      urlSync: true
    });
    search.addWidget(instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: hitTemplate
      }
    }));
    search.addWidget(instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search for posts',
    }));
    search.addWidget(instantsearch.widgets.pagination({
      container: '#pagination',
    }));
    search.start();
    </script>
    <style>
    /* ... */
    </style>
    {% endraw %}~~~ 

1. 上記スクリプトで指定したIDのタグにwidgetが挿入される。適当なページに下記を追加する。
    ~~~ html {% raw %}
    <div id="search-box"><!-- SearchBox widget will appear here --></div>
    <div id="hits"><!-- Hits widget will appear here --></div>
    <div id="pagination"><!-- Pagination widget will appear here --></div>

    <!-- Including InstantSearch.js library and styling -->
    {% include algolia.html %}
    {% endraw %}~~~

## カスタムする

サーチ機能の追加方法はドキュメントがある（例えば下記URL）ので割愛する。

* [InstantSearch.js](https://community.algolia.com/instantsearch.js/v2/widgets.html)

書き込みの設定は`./_config.yml`で設定できる。

~~~ yml {% raw %}
algolia:
  nodes_to_index: 'p'
  settings:
    attributesToHighlight: ['title', 'content']
    highlightPreTag: '<em class="search-highlight">'
    highlightPostTag: '</em>'
{% endraw %}~~~ 

## Netlifyにデプロイする

[Netlifyのドキュメント][3]と[Algoliaのドキュメント][4]に丁寧な説明がある。Netlifyのアカウントを作成して下記ファイルを作成する。リポジトリのファイルが更新されると`./netlify.toml`で指定したコマンドが実行される。

1. `./netlify.toml`を作成する。
~~~
[build]
  command = "jekyll build && jekyll algolia"
  publish = "_site"
~~~ 

1. `./.ruby-version`を作成する。**生データのみ**書き込む。
~~~
2.3.3
~~~ 

## デモページ

* [https://community.algolia.com/jekyll-algolia-example/](https://community.algolia.com/jekyll-algolia-example/)

以上。

[1]:https://community.algolia.com/jekyll-algolia/blog.html
[2]:https://github.com/algolia/jekyll-algolia
[3]:https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/
[4]:https://community.algolia.com/jekyll-algolia/netlify.html