const hitTemplate = function(data) {
  /* console.log(Object.keys(data)); */
  const date = moment.unix(data.date).format('MMM D, YYYY');
  const url = data.url;
  const title = data._highlightResult.title.value;
  const categoriesTree = data.categoriesTree;
  const content = data._snippetResult.content.value;
  /* get hierarchical categories */
  if (categoriesTree) {
    arr = Object.keys(categoriesTree).sort();
    lastidx = arr[arr.length - 1];
    breadcrumb = categoriesTree[lastidx].join(', ');
  }
  /* Template literals are enclosed by the back-tick (` `) */
  return `
    <section>
      <h2 class="title"><a href="${url}">${title}</a></h2>
      <h4 class="subtitle">${date} | ${breadcrumb}</h4>
      <hr>
      <p><small>${content}</small></p>
    </section>
  `;
}

var hits = instantsearch.widgets.hits({
  container: '#hits',
  cssClasses: {
    item: 'card'
  },
  templates: {
    empty: 'No results',
    item: hitTemplate
  }
});
var searchBox = instantsearch.widgets.searchBox({
  container: '#search-box',
  placeholder: 'Search for posts',
  poweredBy: true
});
var pagination = instantsearch.widgets.pagination({
  container: '#pagination',
});
var hierarchicalMenu = instantsearch.widgets.hierarchicalMenu({
  container: '#hierarchical-categories',
  autoHideContainer: false,
  attributes: ['categoriesTree.lvl0', 'categoriesTree.lvl1', 'categoriesTree.lvl2'],
  templates: {
    header: '<span>Categories</span>'
  }
});
var numericRefinementList = instantsearch.widgets.numericRefinementList({
  container: '#calendar',
  attributeName: 'date',
  autoHideContainer: false,
  options: [
    {name: 'All'},
    {start:1514732400, name: '2018'},
    {start:1483228800, end:1514732399, name: '2017'}
  ],
  templates: {
    header: '<span>Calendar</span>'
  }
});

var clearAll = instantsearch.widgets.clearAll({
  container: '#clear-all',
  templates: {
    link: 'Clear All'
  },
  autoHideContainer: false,
  clearsQuery: true,
});
