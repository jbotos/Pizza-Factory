$(document).ready(function() {

  var pizzaFactory = {};

  var getPizzasUrl = 'http://pizza-server.driver-ready.com/pizzas';
  var postPizzasUrl = 'http://pizza-server.driver-ready.com/pizzas';
  var getPizzaUrl = 'http://pizza-server.driver-ready.com/pizzas/';
  var deletePizzaUrl = 'http://pizza-server.driver-ready.com/pizzas/';

  var getToppingsUrl = 'http://pizza-server.driver-ready.com/toppings';
  var postToppingsUrl = 'http://pizza-server.driver-ready.com/toppings';
  var getToppingUrl = 'http://pizza-server.driver-ready.com/topping/';
  var deleteToppingUrl = 'http://pizza-server.driver-ready.com/topping/';

  var navLink = '.nav__link';
  var $navLink = $(navLink);
  var $body = $("body");

  if(window.location.hash==''){
    window.location.hash="#pizza__read";
    history.pushState(null, null, '#pizza__read');
  }
  $(window).on('hashchange load', function() {
    //history.pushState(null, null, window.location.hash);
    loadPageUrl(window.location.hash);
  });

  $($body).delegate(navLink, "click", function(e){
    if($(this).attr("href")) {
      var link = $(this).attr("href");
    }
    if($(this).attr("link")) {
      var link = $(this).attr("link");
      window.location = link;
    }

    loadPageUrl();
  });

  // Bind a callback that executes when document.location.hash changes.
	$(window).bind( "hashchange", function(e) {

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

    if(url == '#pizza__read') {
      getPizzas();
    }

    if(url == '#topping__read') {
      getToppings();
    }
  }

  // function getPizzas() {
  //   $.getJSON( getPizzasUrl, function( data ) {
  //     var pizzaItems = [];
  //     $.each( data, function( key, val ) {
  //       //var pizzaColTitle = "<li id=" + key + "><a href='/#pizza__preview/" + key + "' class='nav__link'>" + val.name + "</a></li>";
  //       var pizzaColTitle = "<li id=" + key + ">" + val.name + "</li>";
  //       var pizzaColDescription = "<li>" + val.description + "</li>";
  //       var pizzaRow = "<ul class='ul__list ul__list--col-2 nav__link' link='/#pizza__preview/" + key + "'>" + pizzaColTitle + pizzaColDescription + "</ul>";
  //       pizzaItems.push(pizzaRow);
  //     });
  //     $('.content__pizza-items').html(pizzaItems);
  //   });
  // }


  function getPizzas() {
    $.getJSON( getPizzasUrl, function( data ) {
      var pizzaItems = [];
      $.each( data, function( key, val ) {
        var pizzaData = {
            id: val.id,
            name: val.name,
            description: val.description,
        };
        pizzaItems.push(pizzaData);
      });
      $('.content__pizza-items').loadTemplate("partials/pizza__listing.html", pizzaItems);
    });
  }



  // $('.nav__pizza').click(function() {
  //   console.log(this);
  // });

  function getToppings() {
    $.getJSON( getToppingsUrl, function( data ) {
      var toppingItems = [];
      $.each( data, function( key, val ) {
        var toppingColTitle = "<li id=" + key + ">" + val.name + "</li>";
        var toppingColDescription = "<li>" + val.description + "</li>";
        var toppingRow = "<ul class='row ul__list ul__list--col-2 nav__link' link='/#topping__preview/"+ key +"'>" + toppingColTitle + toppingColDescription + "</ul>";
        toppingItems.push(toppingRow);
      });
      $('.content__topping-items').html(toppingItems);
    });
  }

  function createTopping(topping) {
    $.post( getToppingsUrl, function( data ) {
      $( ".message" ).html( data );
      // var toppingItems = [];
      // $.each( data, function( key, val ) {
      //   var toppingColTitle = "<li id=" + key + "><a href='/#topping__preview/" + key + "' class='nav__link'>" + val.name + "</a></li>";
      //   var toppingColDescription = "<li>" + val.description + "</li>";
      //   var toppingRow = "<ul class='row ul__list ul__list--col-2'>" + toppingColTitle + toppingColDescription + "</ul>";
      //   toppingItems.push(toppingRow);
      // });
      //$('.content__topping-items').html(toppingItems);
    });
  }

});
