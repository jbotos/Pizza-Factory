$(document).ready(function() {

  var pizzaFactory = {};

  var getPizzasUrl = 'http://pizza-server.driver-ready.com/pizzas';
  var postPizzasUrl = 'http://pizza-server.driver-ready.com/pizzas';
  var getPizzaUrl = 'http://pizza-server.driver-ready.com/pizzas/';
  var deletePizzaUrl = 'http://pizza-server.driver-ready.com/pizzas/';

  var navLink = '.nav__link';
  var $navLink = $(navLink);
  var $body = $("body");

  //$(window).hashchange(hashchange);

  //   // Bind the event.
  //   $(window).hashchange(hashchanged);
  //
  //   // Trigger the event (useful on page load).
  //   hashchanged();
  //
  // });
  //
  // function hashchanged(){
  //  var hash = location.hash.replace( /^#/, '' );
  //  //your code
  // }
  if(window.location.hash==''){
    window.location.hash="#pizzas";
    history.pushState(null, null, '#pizzas');
  }
  $(window).on('hashchange load', function() {
    //history.pushState(null, null, window.location.hash);
    loadPageUrl(window.location.hash);
  });

  //console.log(history);

  // if(window.location.hash==''){
	// 	window.location.hash="#pizzas"; // home page, show the default view (user list)
  //   loadPageUrl('#pizzas');
  //   $(window).trigger( "hashchange" );
	// } else {
  //   loadPageUrl(window.location.hash);
	// 	$(window).trigger( "hashchange" ); // user refreshed the browser, fire the appropriate function
	// }


  // $($body).find('.content__pizza-items').delegate(navLink, "click", function(e){
  //   var link = $(this).attr("href");
  //   //$($body).trigger( "hashchange" );
  //
  //   //var url = window.location.hash;
  //   console.log(link);
  //   loadPageUrl(link);
  //   e.preventDefault();
  // });

  $($body).delegate(navLink, "click", function(e){
    //e.preventDefault();
    var link = $(this).attr("href");
    //$($body).trigger( "hashchange" );

    //var url = window.location.hash;
    //console.log(link);
    loadPageUrl();
    //

    // if(history.pushState) {
    //   history.pushState(null, null, link); // URL is now /inbox/N
    //   // showMailItem(); // example function to show email based on link clicked
    // }


    //return false;

  });






  // Bind a callback that executes when document.location.hash changes.
	$(window).bind( "hashchange", function(e) {


    // var url = window.location.hash;
    //
    // console.log(url);

    // var url = Object.extended($.bbq.getState()).keys();
		//
		// if(url.length==1){
		// 	url = url[0];
		// }else{
		// 	return;
		// }

		// url action mapping
		// if(url.has(/^\/pizza$/)){
    //   console.log('show pizza')
		// 	//showUserList();
		// } else if (url.has(/^\/users\/\d+$/)){ // matching /users/1234
		// 	//showUser(url)
		// }
		// add more routes
	});



  function loadPageUrl() {
    var pageUrl = window.location.hash;
    var templatesFolder = 'templates/';

    if (pageUrl.indexOf('/') > -1)
    {
       var pageUrlParams = pageUrl.split('/');
       var pageTemplate = templatesFolder + pageUrlParams[0].toString().replace('#', '') + '.html';
    } else {
       var pageUrlParams = pageUrl;
       var pageTemplate = templatesFolder + pageUrlParams.toString().replace('#', '') + '.html';
    }

    //var pageTemplate = templatesFolder + pageUrlParams[1].replace('#', '') + '.html';
    console.log(pageUrl);

    $.ajax({
        url: pageTemplate,
        dataType: 'html',
        type: 'GET',
        success: function (response) {
          //console.log('the page was loaded', response);
          routeData(pageUrl);
          $($body).find('.content__container').html( response );
        },
        failure: function (error) {
          console.log('the page was NOT loaded', error);
        },
        complete: function (xhr, status) {
          //console.log('the request is complete');
        }
    });
  }



  function routeData(url) {

    if(url == '#pizzas') {
      getPizzas();
    }
  }

  function getPizzas() {
    $.getJSON( getPizzasUrl, function( data ) {
      var pizzaItems = [];
      $.each( data, function( key, val ) {
        //console.log(val);
        //items.push( "<li id='" + key + "'>" + val + "</li>" );

        //var permalink = "<a href='/#pizza__preview/" + key + "' class='nav__link'>" + val.name + "</a>";
        //pizzaItems.push( "<tr><td id=" + key + ">" + permalink + "</td></tr>");

        var permalink = "<a href='/#view-pizza/" + key + "' class='nav__link'>" + val.name + "</a>";
        pizzaItems.push( "<tr><td id=" + key + ">" + permalink + "</td></tr>");
      });

      $('.content__pizza-items').html(pizzaItems);

      //$( "<ul/>", { "class": "my-new-list", html: items.join( "" ) }).appendTo( "body" );
    });
  }



});
