---
layout: post
title: 'Scrapyで遊んだ備忘録'
date: 2018-01-03
category: blog
categoriesTree:
  lvl0: ["備忘録"]
  lvl1: ["備忘録 > web"]
  lvl2: ["備忘録 > web > scrapy"]
---

スクレイピングに興味があったので遊んでみた。  

## Target
なんでもよかったけど、簡単にできそうなトピックとして、[wikiの死没情報][1]からデータを抜き出す。若いながらも、wikiに取り上げられるくらい有名で夭逝した人物って？疑問に思った。西暦・月ごとに死没情報がまとめられているので、各ページの最年少を取り出す。

プロジェクトを作成する。
~~~ sh
$ scrapy startproject wiki
$ cd wiki
$ scrapy genspider death_by_year en.wikipedia.org
~~~

`./wiki/spiders/death_by_year.py`を編集する。

~~~ python
# -*- coding: utf-8 -*-
import scrapy

class DeathByYearSpider(scrapy.Spider):
    name = 'death_by_year'
    
    allowed_domains = ['en.wikipedia.org']
    start_urls = [
        'https://en.wikipedia.org/wiki/Lists_of_deaths_by_year'
        ]
    custom_settings = {
        "DOWNLOAD_DELAY": 0.1,
    }
    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url, callback=self.parse, cookies={})
    def parse(self, response):
        items = response.xpath(u'//tr/td/div/ul/li/a/@href')
        for item in items:
            if item is not None:
                yield response.follow(item, callback=self.parse_detail, cookies={})
    # TODOs in visited content page.
    def parse_detail(self, response):
        items = response.xpath(
            u'//div[@class="mw-parser-output"]/ul/li/a[1]/following-sibling::text()[1][normalize-space(.)]'
            )
        year = response.url.split('/')[-1]
        yield {
          'year': year,
          'record': items.extract()
        } # -> this data set will be processed by pipelines.py
~~~

`./wiki/pipelines.py`を編集する。

~~~ python
# -*- coding: utf-8 -*-
from scrapy.exceptions import DropItem
import logging
import re

class WikiPipeline(object):
    def process_item(self, item, spider):
        list_of_age = []
        if None in [item[k] for k,v in item.items()]:
            raise DropItem("Missing value in %s" % item)
        else:
            data_in_text = item['record']
            for data in data_in_text:
                res = re.search(r'( \d\d, .*)', data)
                if res:
                    detail = res.group(1).replace(',',' ').strip().split()
                    list_of_age.append( detail )
        if list_of_age:
            logging.info( item['year'] )
            logging.info( ' '.join( min(list_of_age, key=(lambda x: x[0])) ) )
~~~

`./wiki/settings.py`に追記する。

~~~ sh
LOG_LEVEL = 'INFO'

ITEM_PIPELINES = {
    'wiki.pipelines.WikiPipeline': 300,
}
~~~

実行する。

~~~ sh
$ scrapy crawl death_by_year --logfile log.txt
~~~

結果抜粋。左から、年齢、国籍、（第二国籍、）注目された理由(、死因）。
~~~
2018-01-03 19:53:57 [scrapy.core.engine] INFO: Spider opened
2018-01-03 19:53:57 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min)
2018-01-03 19:53:59 [root] INFO: Deaths_in_January_2018
2018-01-03 19:53:59 [root] INFO: 45 Kyrgyz politician heart attack.
2018-01-03 19:54:00 [root] INFO: Deaths_in_December_2017
2018-01-03 19:54:00 [root] INFO: 17 German alpine skier downhill race crash.
2018-01-03 19:54:00 [root] INFO: Deaths_in_September_2017
2018-01-03 19:54:00 [root] INFO: 17 Indian student suicide by hanging.
2018-01-03 19:54:00 [root] INFO: Deaths_in_November_2017
2018-01-03 19:54:00 [root] INFO: 20 Swedish racehorse euthanized.
2018-01-03 19:54:00 [root] INFO: Deaths_in_October_2017
2018-01-03 19:54:00 [root] INFO: 16 Australian racehorse foaling complications.
2018-01-03 19:54:01 [root] INFO: Deaths_in_March_2017
2018-01-03 19:54:01 [root] INFO: 24 Irish-bred racehorse euthanized.
2018-01-03 19:54:01 [root] INFO: Deaths_in_July_2017
2018-01-03 19:54:01 [root] INFO: 11 American racehorse euthanized.
2018-01-03 19:54:01 [root] INFO: Deaths_in_May_2017
2018-01-03 19:54:01 [root] INFO: 21 Colombian footballer (
2018-01-03 19:54:01 [root] INFO: Deaths_in_April_2017
2018-01-03 19:54:01 [root] INFO: 15 American victim of police shooting shot.
2018-01-03 19:54:01 [root] INFO: Deaths_in_January_2017
2018-01-03 19:54:01 [root] INFO: 25 American convicted murderer suicide by hanging.
2018-01-03 19:54:01 [root] INFO: Deaths_in_August_2017
2018-01-03 19:54:01 [root] INFO: 30 Swedish journalist (
2018-01-03 19:54:01 [root] INFO: Deaths_in_October_2014
2018-01-03 19:54:01 [root] INFO: 11 American thoroughbred racehorse injuries sustained in paddock accident.
...
~~~

馬と事件の被害者が多かった。あとはスポーツ選手・女優・俳優・王子・ラッパー・テロリスト・犬．．．とか。表にまとめたりすればそれらしくなるんだろうけど、意味ないし、世の中に普通に情報として[ある](http://www.deadoraliveinfo.com/dead.Nsf/viewdocs-nf/diedyoung)。スクレイピングの一連の流れを記録できたのでここで終わり。

## Git Repo
今回作成したプロジェクトをGitHubにデプロイした。
* [https://github.com/shnaisda/scrapy-demo.git](https://github.com/shnaisda/scrapy-demo.git)

[1]:https://en.wikipedia.org/wiki/Lists_of_deaths_by_year
