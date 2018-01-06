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
      <p><small>${content}</small></p>
    </section>
  `;
}
