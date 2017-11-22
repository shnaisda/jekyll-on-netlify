---
layout: post
title:  "Blogging with Jekyll and GitHub"
date:   2017-11-22
categories: blog
tags:
- jekyll
- github
- ubuntu 16.04
- demo
---

# Jekyll

## Introduction

The early story of Jekyll is found in [here](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html), which is helpful to learn underlying concept behind the system. 

Get to know how Jekyll works; Install jekyll to local machine, generate template site and activate local server[^1]:
```
$ gem install jekyll bundler
$ jekyll new jekyll-demo
$ cd jekyll-demo
$ bundle exec jekyll serve
```
Open browser and access http://localhost:4000.

## Hosting on GitHub

Demonstration based on ["Adding an existing project to GitHub using the command line - User Documentation"](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/).

1. [Create a new repository](https://help.github.com/articles/creating-a-new-repository/) on GitHub and name it with the following [naming scheme](https://help.github.com/articles/user-organization-and-project-pages/): `<username>.github.io`

1. Open Terminal. Create a new directry using jekyll command and move in.
```
$ jekyll new <username>.github.io && cd $_
```
1. Inirialize the repository and stage changes:
```
$ git init
$ git add .
$ git commit -m "First commit"
```
1. Add remote repository.
```
$ git remote add origin https://github.com/<username>/<username>.github.io.git
```
1. Push to remote.
```
$ git push origin master
```
When user pages are built, they are available at `https://<username>.github.io`.

## Create a Post
As explained in the [template post page]({{ site.baseurl }}{% link _posts/2017-11-21-welcome-to-jekyll.markdown %}), create a `YYYY-MM-DD-name-of-post.ext` file containing [YAML front matter block](https://jekyllrb.com/docs/frontmatter/) and put it in `_posts` directory.

Repeat the previous command sequence to update remote repository; Run `bundle exec jekyll serve` and preview the new post from `http://localhost:4000`. The contents shown in there are static pages generated under `_site` directory. Once checked everything goes well, visit again `https://<username>.github.io` after updating repository:

```
$ git add .
$ git commit -m "First post"
$ git push origin master
```

The following two directories are mentioned above at the moment:

| DIRECTORY  | DESCRIPTION |
|:-----------|:------------|
| _post      | The place to store post pages. Each file must follow the naming conventon: `YYYY-MM-DD-name-of-post.ext` |
| _site      | The static files are kept in here after transfomed by jekyll.       |

They are pieces of Jekyll's standard directory, see more: <https://jekyllrb.com/docs/structure/>.

## Customize 

Demonstration based on [Customizing CSS and HTML in your Jekyll theme](https://help.github.com/articles/customizing-css-and-html-in-your-jekyll-theme/).

### Layout
Build up directory structure something like below:

```
./
├── _config.yml
├── assets/
│   └── css/
│       ├── style.scss
│       └── syntax.css
├── _includes/
│   ├── footer.html
│   ├── header.html
│   └── head.html
├── index.md
├── _layouts/
│   ├── default.html
│   ├── home.html
│   └── post.html
├── _posts/
└── _site/
```

* **> _config.yml**
{% highlight yml %}
title: Your Page title
email: youremail@example.com
markdown: kramdown
theme: minima
{% endhighlight %}

* **> assets/css/style.scss**
{% highlight css %}
{% include /demo/assets/css/style.scss %}
{% endhighlight %}

* **> assets/css/syntax.css**

Install rougify by `$ gem install rougify`; then generate a template:
{% highlight sh %}
$ rougify style base16 > assets/css/syntax.css
{% endhighlight %}

* **> _includes/head.html**
{% highlight html %}
{% include /demo/_includes/head.html %}
{% endhighlight %}

* **> _includes/header.html**
{% highlight html %}
{% include /demo/_includes/header.html %}
{% endhighlight %}

* **> _includes/footer.html**
{% highlight html %}
{% include /demo/_includes/footer.html %}
{% endhighlight %}

* **> index.md**
{% highlight md %}
---
layout: home
---
{% endhighlight %}

* **> _layouts/default.html**
{% highlight html %}
{% include /demo/_layouts/default.html %}
{% endhighlight %}

* **> _layouts/home.html**
{% highlight html %}
{% include /demo/_layouts/home.html %}
{% endhighlight %}

* **> _layouts/post.html**
{% highlight html %}
{% include /demo/_layouts/post.html %}
{% endhighlight %}

### Theme

Pick up a [supported theme](https://pages.github.com/themes/) and Install it to local.
```
$ echo gem "jekyll-theme-minimal" >> Gemfile
$ bundle install
```

Edit `_config.yml` to replace the theme:
```
theme: jekyll-theme-minimal
```
---

[^1]: ["Quick-start guide \| jekyll"](https://jekyllrb.com/docs/quickstart/), Accessed 2017-11-20

