if( typeof Object.create !== 'function') {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}
(function($, window, document, undefined) {

    var pizzaFactory = {
   		init: function( options, elem ) {

        var _this = this;
        _this.elem = elem;
        _this.$elem = $(elem);
        _this.$body = $('body');
        _this.factoryApp = {};
        _this.navLink = '.nav__link';
        _this.$navLink = $(_this.navLink);
        _this.options = $.extend({}, $.fn.jPizzaFactory.options, options );
        _this.getPageHash();

        $(_this.$body).delegate(_this.navLink, "click", function(e){
          if($(this).attr("href")) {
            var link = $(this).attr("href");
          }
          if($(this).attr("link")) {
            var link = $(this).attr("link");
            window.location = link;
          }
        });
      },
      getPageHash : function(e) {
        _this = this;
        if(window.location.hash==''){
          window.location.hash="#pizza__read";
          history.pushState(null, null, '#pizza__read');
        }
        $(window).on('hashchange load', function() {
          //history.pushState(null, null, window.location.hash);
          _this.loadPageUrl();
        });
      },
      getPageUrl : function() {
        var pageUrl = window.location.hash;
        if (pageUrl.indexOf('/') > -1)
        {
           var pageUrlParams = pageUrl.split('/');
           var pageTemplate = _this.options.templatesFolder + pageUrlParams[0].toString().replace('#', '') + '.html';
        } else {
           var pageUrlParams = pageUrl;
           var pageTemplate = _this.options.templatesFolder + pageUrlParams.toString().replace('#', '') + '.html';
        }
        return pageTemplate;
      },

      loadPageUrl: function() {
        _this = this;
        _this.readApiData({ id: false, type: 'pizzas' });
      },

      // GET API DATA
      readApiData: function(dataReq) {
        var requestUrl = _this.options.apiUrl + '/'+ dataReq.type +'/';
        var dataResponse = [];
        if(dataReq.id) {
          requestUrl =  requestUrl + dataReq.id;
        }

        $.when( $.ajax({
          type:"GET",
          url: requestUrl,
        }) ).then(function( data ) {
          _this.factoryApp.pizzas = data;
          $.get(_this.getPageUrl(), function(template) {
            var rendered = Mustache.render(template, _this.factoryApp);
            $('.content__container').html(rendered);
          });
        });
      },

      createApiData: function(data) {

      },
      updateApiData: function(data) {

      },
      deleteApiData: function(data) {

      }

    } // end var pizzaFactory = {
    $.fn.jPizzaFactory = function( options ) {
    	return this.each(function() {
    		var jPizzaFactory = Object.create(pizzaFactory);
    		jPizzaFactory.init(options, this);
    	});
    };

    // default options
    $.fn.jPizzaFactory.options = {
      templatesFolder : 'templates/',
      apiUrl : 'http://pizza-server.driver-ready.com',
      getPizzasUrl : 'http://pizza-server.driver-ready.com/pizzas',
      postPizzasUrl : 'http://pizza-server.driver-ready.com/pizzas',
      getPizzaUrl : 'http://pizza-server.driver-ready.com/pizzas',
      deletePizzaUrl : 'http://pizza-server.driver-ready.com/pizzas',
      getToppingsUrl : 'http://pizza-server.driver-ready.com/toppings',
      postToppingsUrl : 'http://pizza-server.driver-ready.com/toppings',
      getToppingUrl : 'http://pizza-server.driver-ready.com/topping',
      deleteToppingUrl : 'http://pizza-server.driver-ready.com/topping',
    };

})(jQuery, window, document);
