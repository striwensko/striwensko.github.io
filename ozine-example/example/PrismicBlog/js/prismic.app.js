var SVG = {};
SVG.plusIcon = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>';
SVG.minusIcon = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>';
SVG.loader = '<svg width="28px"  height="28px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="27" stroke-width="7" stroke="#017ADB" stroke-dasharray="42.411500823462205 42.411500823462205" transform="rotate(60 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>';
SVG.search = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>';
SVG.plusCircle = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" class="svg-inline--fa fa-plus-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>';
SVG.shoppingCart = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" class="svg-inline--fa fa-shopping-cart fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>';
SVG.angleLeft = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>';
SVG.angleRight = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>';


PrismicBlog = function(node, data){
  this.UI = {};
  var self = this;
  if (node){
    this.holder = node;
    Ozine.DOM(this.holder, this.UI);
  }
  this.UI.header.search.onkeydown = function(event) {
    if (event.keyCode === 13) {
      self.UI.header.buttons.search.onclick();
    }
  }
  this.UI.header.buttons.search.onclick = function()  {
    Ozine.Data.setState('catalog', {query: self.UI.header.search.value, page: 1, mode: 'search'});
    Ozine.Data.setState('app', {mode: 'catalog'});
    Ozine.Router.navigate('search/' + self.UI.header.search.value);
  }
  this.UI.header.logo.onclick = function(){
    Ozine.Data.setState('app', {mode: 'catalog'});
    Ozine.Data.setState('catalog', { query: '', page: 1, mode: 'search' });
    Ozine.Router.navigate('');
  }

  Ozine.Router.addRoute('search/:query', function(query){
    Ozine.Data.setState('catalog', {query: query, page: 1, mode: 'search'});
    Ozine.Data.setState('app', {mode: 'catalog'});
  });

  Ozine.Router.addRoute('', function(query){
    Ozine.Data.setState('app', {mode: 'catalog'});
    Ozine.Data.setState('catalog', { query: '', page: 1, mode: 'search' });
  });


  Ozine.addState(this);
  this.UI.content.appendChild(new PrismicBlog.Blogs(this.UI.catalog, HYDRATION_DATA).holder);
  this.UI.content.appendChild(new PrismicBlog.Blog(this.UI.product, HYDRATION_DATA).holder);
  Ozine.Data.setState('app', {mode: HYDRATION_DATA.mode});

  Ozine.Router.start();
  this.UI.header.logo.onclick();
}
PrismicBlog.PAGE_SIZE = 5;
PrismicBlog.Blogs = function(node, hydration){
  this.UI = {};
  var self = this;
  if (node){
    this.holder = node;
    this.state = { items: hydration.items };
    Ozine.DOM(this.holder, this.UI);
  } else {
    var html = '';
    html += '<div ref="catalog" ozine-module="catalog" class="catalog">';
    html += '  <div ref="list" class="list"></div>';
    html += '  <b class="paging" ref="paging"></b>';
    html += '  <b ref="loader" class="loader">' + SVG.loader + '</b>';
    html += '</div>';
    this.holder = Ozine.DOM(html, this.UI);
  }
  Ozine.addState(this);
  Ozine.Data.subscribe('catalog', function(state){
    Object.keys(state).length > 0 && self.setState(state);
  });
  Ozine.Data.subscribe('app', function(state){
    state.mode && self.setState({ appMode: state.mode});
  });
  this.state = {
    loading: false,
    page: (node ? 1 : 0),
    items: node ? hydration.items : [],
  }
  if (node){
    this.state.mode = hydration.catalog;
    this.state.query = hydration.catalog_query;
    this.state.page = hydration.catalog_page;
    this.state.totalResults = hydration.catalog_totalResults;
  }
  this.json = new Ozine.JSON();
  this.json.onData = function(){
    var data = this.data;
    self.setState({loading: false, items: data.results, total_pages:data.total_pages});
  }
}
PrismicBlog.REF = 'XVTDCREAACEAlGoC';
//https://sanpancho.cdn.prismic.io/api/v2/documents/search?ref=XVSiWREAACIAk9ff&q=[[at(my.blog.uid,%22getting-to-san-pancho%22)]]

PrismicBlog.Blogs.prototype.load = function() {
  var url = 'https://sanpancho.cdn.prismic.io/api/v2/documents/search?ref=' + PrismicBlog.REF;
  url += '&pageSize=' + PrismicBlog.PAGE_SIZE;
  if (this.state.query){
    url += 'q=[[fulltext(document,%22' + this.state.query + '%22)]]';
  }
  var graphQuery = `{
  blog {
    title
    image
  }
}`;
  url += '&graphQuery=' + escape(graphQuery);
  if (this.state.page){
    url += '&page=' + (this.state.page);
  }
  this.json.load(url);
  this.setState({loading: true, mode: 'search'});
}
PrismicBlog.Blogs.prototype.pagingButton = function(page, isSelected){
  var self = this;
  var button = document.createElement('b');
  button.onclick = function(){
    self.setState({ page: page });
  }
  button.innerHTML = page;
  button.className = (isSelected ? 'selected' : '');
  this.UI.paging.appendChild(button);
}
PrismicBlog.Blogs.prototype.onState = function(state){
  this.UI.loader.style.display = (this.state.loading ? '' : 'none');
  this.UI.paging.style.display = (!this.state.loading ? '' : 'none');

  if (state.items) {
    for (var iItem = 0; iItem < state.items.length; iItem++) {
      this.UI.list.appendChild(this.createItem(state.items[iItem]));
    }
    this.UI.paging.innerHTML = '';
    console.log(this.state);
    if (this.state.total_pages > 1){
      var totalPages = this.state.total_pages;
      var minPage = Math.max(this.state.page - 2, 1);
      var maxPage = Math.min(minPage + 4, totalPages);
      minPage = Math.max(maxPage - 4, 1);

      console.log(minPage, maxPage)
      if (minPage > 1) {
        this.pagingButton(1, this.state.page === 1);
      }
      if (minPage > 2) {
        var dots = document.createElement('i');
        dots.innerHTML = '...';
        this.UI.paging.appendChild(dots);
      }
      for (let iPage = minPage; iPage <= maxPage; iPage++) {
        this.pagingButton(iPage, this.state.page === iPage);
      }
      if (maxPage < totalPages - 1) {
        var dots = document.createElement('i');
        dots.innerHTML = '...';
        this.UI.paging.appendChild(dots);
      }
      if (maxPage < totalPages) {
        this.pagingButton(totalPages, this.state.page === totalPages);
      }
    }

  }
  if (state.appMode){
    this.holder.style.display = (state.appMode === 'catalog' ? '' : 'none');
  }

  if (state.hasOwnProperty('query') || state.hasOwnProperty('page')) {
    this.load();
    this.UI.list.innerHTML = '';
  }
}
PrismicBlog.Blogs.prototype.createItem = function(data){

  var UI = {};
  var html = '';
  html += '<div class="catalog-item">';
  html += '  <img ref="img"/>';
  html += '  <span ref="_title" class="title"></span>';
  html += '  <u ref="date" class="date"></u>';
  html += '</div>';

  var node = Ozine.DOM(html, UI);
  node.setAttribute('href', data.uid);
  node.setAttribute('target', '_blank');
  UI._title.innerHTML = data.data.title[0].text;
  UI._title.onclick = function(){
    Ozine.Data.setState('Blog', {uid: data.uid});
    Ozine.Data.setState('app', {mode: 'blog'});
    Ozine.Router.navigate('blog/' + data.uid);
  }
  UI.date.innerHTML = this.dateToString(data.first_publication_date);
  if (data.data.image){
    UI.img.src = data.data.image.url;
  }
  return node;
}
PrismicBlog.Blogs.prototype.dateToString = function(date){
  if (date === '') {
    return '';
  }
  date = new Date(date);
  var hours = date.getHours();
  hours = (hours % 12);
  hours = (hours === 0 ? 12 : hours);
  hours = (hours < 10 ? '0' : '') + hours;
  var minutes = date.getMinutes();
  minutes = (minutes < 10 ? '0' : '') + minutes;

  var data = {};
  var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
  var am_pm = date.getHours() < 12 ? 'AM' : 'PM';
  //data.day = date.getDate() + ' ' + months[date.getMonth()] + ' ' + (date.getFullYear() % 100);
  data.day = date.getDate() + ' ' + months[date.getMonth()] + ' ' + (date.getFullYear());
  data.time = hours + ':' + minutes + am_pm;

  return data.day + ' ' + data.time;
}
//json.load('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=Mo8WvA0Nyy9lLJsaa2G63S6dP5KLH4Qu&q=uber&begin_date=20190101&end_date=20190505')
PrismicBlog.Blog = function(node, hydration){
  var self = this;
  this.UI = {};
  if (node){
    this.holder = node;
    Ozine.DOM(this.holder, this.UI);
  } else {
    var html = '';
    html += '<div ref="product" class="product">';
    html += '  <b ref="loader" class="loader">' + SVG.loader + '</b>';
    html += '  <div class="content" ref="content">';
    html += '    <h1 ref="_title"></h1>';
    html += '    <div class="details">';
    html += '      <div class="left">';
    html += '        <img ref="image"/>';
    html += '      </div>';
    html += '      <div class="right">';
    html += '        <p ref="description"></p>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
    this.holder = Ozine.DOM(html, this.UI);
    this.holder.style.display = 'none';
  }
  Ozine.addState(this);

  this.json = new Ozine.JSON();
  this.json.onData = function(){ self.onLoad(this.data) };

  this.cart = {};
  Ozine.Data.subscribe('Blog', function(state){
    if (state.uid){
      self.setState({ uid: state.uid});
      self.load(state.uid);
    }
  });
  Ozine.Data.subscribe('app', function(state){
    state.mode && self.setState({ appMode: state.mode});
  });
}
PrismicBlog.Blog.prototype.onLoad = function(data){

  var data = data.results[0];
  console.log(data, data.data)
  data = {
    title:data.data.title[0].text,
    description:data.data.blog_content[0] && data.data.blog_content[0].text,
    image: data.data.image.url,
    uid:data.uid,
    date:data.last_publication_date
  };

  console.log(data);
  this.setState({
    blog: data,
    loading: false,
  });
}
PrismicBlog.Blog.prototype.onState = function(state){
  this.UI.loader.style.display = (this.state.loading ? '' : 'none');
  this.UI.content.style.display = (this.state.loading ? 'none' : '');
  if (state.blog){
    this.UI._title.innerHTML = state.blog.title;
    this.UI.image.src = state.blog.image;
    this.UI.description.innerHTML = state.blog.description;
  }
  if (state.appMode){
    this.holder.style.display = (state.appMode === 'blog' ? '' : 'none');
  }
}
PrismicBlog.Blog.prototype.load = function(uid){
  var url = 'https://sanpancho.cdn.prismic.io/api/v2/documents/search?ref=' + PrismicBlog.REF;
  url += '&q=[[at(my.blog.uid,"' + uid + '")]]';
  this.json.load(url);
  this.setState({loading: true, blog: null});
  this.onState({});
}
