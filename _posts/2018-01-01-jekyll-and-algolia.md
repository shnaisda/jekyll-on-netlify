---
layout: post
published: true
title: 'JekyllにAlgoliaを追加した'
date: 2018-01-01
category: blog
categoriesTree:
  lvl0: ["commonplaces"]
  lvl1: ["commonplaces > web"]
  lvl2: ["commonplaces > web > jekyll", "commonplaces > web > algolia"]
---

下記リンク先がきっかけでAlgoliaを知った。

[13 Steps to a Faster Jekyll Website][linkid3]

## プラグインを追加する(レコードの書き込み)

手順は結構手探り。大元はjekyll-algoliaプラグインのGithubだけど情報が少ない[^1]。

1. Algoliaアカウントを作成して、Indexを作成する。
![algolia-indices-view](/assets/img/algolia-indices-view.png)

1. Application IDと読み取り用のAPI Keyを確認する。
![algolia-api-keys-view](/assets/img/algolia-api-keys-view.png)

1. 書き込み用のAPI Keyを作成する。各操作権限にチェックをつける(画像だと見切れてる)。
![algolia-new-key-view.png](/assets/img/algolia-new-key-view.png)

1. `./Gemfile`にプラグインを追記する。
~~~ sh
gem 'jekyll-algolia', '~> 1.0'
~~~ 

1. `./_config.yml`に`application_id`と`index_name`を追記する。
~~~ yml
algolia:
  application_id: 'your_application_id'
  index_name:     'your_index_name'
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

Algoliaのドキュメントを参考にした[^2]。

`_includes/algolia.html`を作成して、Algolia関連の設定をまとめる。

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

上記スクリプトで指定したIDのタグにwidgetが挿入される。適当なページに下記を追加する。

~~~ html {% raw %}
<div id="search-box"><!-- SearchBox widget will appear here --></div>
<div id="hits"><!-- Hits widget will appear here --></div>
<div id="pagination"><!-- Pagination widget will appear here --></div>

<!-- Including InstantSearch.js library and styling -->
{% include algolia.html %}
{% endraw %}~~~

## カスタムする

サーチ機能の追加はドキュメントがあるので割愛。

* [InstantSearch.js][linkid1]
* [API Reference \| Algolia Documentation][linkid2]

書き込みの設定は`./_config.yml`で設定できる。

~~~ yml {% raw %}
algolia:
  nodes_to_index: 'p'
  settings:
    attributesToHighlight: ['title', 'content']
    highlightPreTag: '<em class="search-highlight">'
    highlightPostTag: '</em>'
{% endraw %}~~~ 

もしくは、jekyll-algoliaを使用しないで、ビルド前にプラグインをかませる。`_plugins/algolia.rb`を作成する。ただ、jekyll-algoliaがしてくれていた部分を考えないといけないから、いろいろめんどくさくなる。レコードの同期とか。

~~~ ruby
require 'rubygems'
require 'algoliasearch'

module RunIndexing
  def self.process(site, payload)
    return if @processed
    Algolia.init application_id: "your_application_id",
        api_key: "your_write_api_key"
    index = Algolia::Index.new("your_index_name")
    index.set_settings({
    # ... 
    })
    index.add_objects( [] )
    @processed = true
  end
end

Jekyll::Hooks.register :site, :pre_render do |site, payload|
  puts "Running ruby script before rendering..."
  RunIndexing.process(site, payload)
end
~~~

## HerokuにPushする

前提: [JekyllをHerokuにデプロイした]({% post_url 2017-12-31-jekyll-and-heroku %})。  
HerokuのaddonでもAlgoliaがサポートされている[^3]けど、Rails向けのドキュメントしか見つからなかった。

1. `Rakefile`を書き換える。
~~~ ruby
task "assets:precompile" do
  `(bundle exec jekyll algolia && jekyll build)`
end
~~~

1. ファイルをpushする。
~~~ sh
$ git add .
$ git commit -m "Update Rakefile"
$ git push heroku master
~~~ 

以上。

--- 
[^1]: ["algolia/jekyll-algolia: Add fast and relevant search to your Jekyll site"](https://github.com/algolia/jekyll-algolia)
[^2]: ["Algolia for Jekyll \| Search your Jekyll content with Algolia"](https://community.algolia.com/jekyll-algolia/blog.html)
[^3]: ["Algolia Realtime Search \| Heroku Dev Center"](https://devcenter.heroku.com/articles/algoliasearch)

[linkid1]:https://community.algolia.com/instantsearch.js/ 
[linkid2]:https://www.algolia.com/doc/api-reference/
[linkid3]:https://wiredcraft.com/blog/make-jekyll-fast/#step-8-use-something-like-algolia