---
layout: post
title: 'JekyllにAlgoliaを追加した備忘録'
date: 2018-01-01
category: blog
categoriesTree:
  lvl0: ["備忘録"]
  lvl1: ["備忘録 > web"]
  lvl2: ["備忘録 > web > jekyll"]
---

手順は主に[Algoliaのドキュメント][1]を参考にした。

## プラグインを追加する(レコードの書き込み)

Jekyll用の[プラグイン][2]があるので利用する。

1. `./Gemfile`にプラグインを追記する。
~~~ sh
gem 'jekyll-algolia', '~> 1.0'
~~~ 

1. Algoliaアカウントを作成して、Indexを作成する。
![algolia-indices-view](/assets/img/algolia-indices-view.png)

1. Application IDと読み取り用のAPI Keyを確認する。
![algolia-api-keys-view](/assets/img/algolia-api-keys-view.png)

1. 書き込み用のAPI Keyを作成する。各操作権限にチェックをつける(画像だと見切れてる)。
![algolia-new-key-view.png](/assets/img/algolia-new-key-view.png)

1. `./_config.yml`にパラメータを追記する。
~~~ yml
algolia:
  application_id: 'your_application_id'
  index_name: 'your_index_name'
  read_only_api_key: 'your_read_only_api_key'
~~~ 

1. `./_algolia_api_key`を作成して、書き込み用のAPI Keyをコピペする。
~~~ 
••••••••••••••••••••••••••••••••
~~~ 

1. 下記コマンドを実行すると、ブログ記事に対してインデックスが付く。設定がデフォルトの場合、内容に`<p>`タグが無いと対象外。
~~~ 
$ bundl exec jekyll algolia
~~~ 

## ページに検索機能を付ける(レコードの読み込み)

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

サーチ機能の追加はドキュメントがある（下記URLとか）ので割愛する。

* [InstantSearch.js](https://community.algolia.com/instantsearch.js/)
* [API Reference \| Algolia Documentation](https://www.algolia.com/doc/api-reference/)

書き込みの設定は`./_config.yml`で設定できる。

~~~ yml {% raw %}
algolia:
  nodes_to_index: 'p'
  settings:
    attributesToHighlight: ['title', 'content']
    highlightPreTag: '<em class="search-highlight">'
    highlightPostTag: '</em>'
{% endraw %}~~~ 

以上。

---
[^fn1]:[Algolia Realtime Search \| Heroku Dev Center](https://devcenter.heroku.com/articles/algoliasearch)

[1]:https://community.algolia.com/jekyll-algolia/blog.html
[2]:https://github.com/algolia/jekyll-algolia