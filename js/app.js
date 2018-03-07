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
				_this.factoryApp.pageData = {};
        _this.router = {};
        _this.navLink = '.nav__link';
        _this.$navLink = $(_this.navLink);
        _this.options = $.extend({}, $.fn.jPizzaFactory.options, options );
        _this.getPageHash();

        $(_this.$body).delegate(_this.navLink, "click", function(e){
          var pageLink = ($(this).attr("href")) ? $(this).attr("href") : $(this).attr("link");
          window.location.href = pageLink;
        });

				$(_this.$body).delegate(".btn__data-update", "click", function(){
					var fromData = $('.data-update').serializeArray()
					_this.updateApiData(fromData);
				});
				$(_this.$body).delegate(".btn__data-create", "click", function(){
					var data = {};
					var fromData = $('.data-create').serializeArray()
					$(fromData).each(function(index, obj){
					    data[obj.name] = obj.value;
					});
					_this.createApiData(data);
				});
				// $(_this.$body).delegate(".btn__data-delete", "click", function(){
				//
				// });
				$.ajaxSetup({
				    cache: false
				});
      },
      getPageHash : function(e) {
        _this = this;
        if(window.location.hash==''){
          window.location.hash="#pizzas";
          history.pushState(null, null, '#pizzas');
        }
        $(window).on('hashchange load', function() {
          //history.pushState(null, null, window.location.hash);
          _this.getPageUrl(); // sets router info
          _this.loadPageUrl();
        });
      },
      getPageUrl : function() {
        _this.router.url = window.location.hash;
				if (_this.router.url.indexOf('/') > -1)
				{
					var pageUrlParams = _this.router.url.split('/');
					_this.router.pageId = pageUrlParams[2];
					_this.router.hash = pageUrlParams[0];
					_this.router.action = pageUrlParams[1];
					_this.router.dataType = pageUrlParams[0].toString().replace('#', '');
					_this.router.template = _this.options.templatesFolder + _this.router.dataType + '-' + _this.router.action + '.html';
				} else {
					_this.router.pageId = false;
					_this.router.action = 'read';
					_this.router.dataType = _this.router.url.toString().replace('#', '');
					_this.router.template = _this.options.templatesFolder + _this.router.dataType + '.html';
				}
      },

      loadPageUrl: function() {
        _this = this;
				if(_this.router.action == 'preview' || _this.router.action == 'update' || _this.router.action == 'read') {
					_this.readApiData();
				} else if(_this.router.action == 'post') {
					_this.updateApiData();
				} else if(_this.router.action == 'delete') {
					_this.deleteApiData();
				}
				 else {
					_this.loadTemplate();
				}
      },
			loadTemplate: function(data = false) {
				$.get(_this.router.template, function(template) {
					var rendered = Mustache.render(template, _this.factoryApp.pageData);
					$(_this.options.contentContainer).html(rendered);
				});
			},
      // GET API DATA
      readApiData: function() {
        var requestUrl = _this.options.apiUrl + '/'+ _this.router.dataType +'/';
        if(_this.router.pageId) {
          requestUrl =  requestUrl + _this.router.pageId;
        }
        $.when( $.ajax({
          type:"GET",
          url: requestUrl,
        }) ).then(function( data ) {

					if(_this.router.pageId == false) {
          	_this.factoryApp.pageData.pizzas = data;
					} else {
						_this.factoryApp.pageData.pizza = data;
					}
          _this.loadTemplate(data);
        });
      },
      createApiData: function(formData) {
				var requestUrl = _this.options.apiUrl + '/'+ _this.router.dataType;
				_this.callApi('POST', requestUrl, formData);
      },
      updateApiData: function(data) {
				var requestUrl = _this.options.apiUrl + '/'+ _this.router.dataType +'/' + _this.router.pageId;
				var formData = { id : _this.router.pageId }
				_this.callApi('PUT', requestUrl, formData);
      },
      deleteApiData: function(data) {
				var requestUrl = _this.options.apiUrl + '/'+ _this.router.dataType +'/' + _this.router.pageId;
				var formData = { id : _this.router.pageId }
				_this.callApi('DELETE', requestUrl, formData);
      },
			callApi: function(callType, requestUrl, formData) {
				$.ajax({
					type: callType,
					url: requestUrl,
					contentType: "application/json; charset=utf-8",
					crossDomain: true,
					dataType: "json",
					data: JSON.stringify(formData),
					complete: function(xhr, textStatus) {
						console.log('xhr');
			      window.location.href = '/#pizzas';
			    },
					error: function (jqXHR, status) {
					  console.log('something went wrong');
					}
        });
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
    };

})(jQuery, window, document);
