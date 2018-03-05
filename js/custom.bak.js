$(document).ready(function() {

  var pizzaFactory = {};
  var getPizzasUrl = 'http://pizza-server.driver-ready.com/pizzas';

  $.ajax({
      url: getPizzasUrl,
      dataType: 'json',
      type: 'GET',
      //async: false,
      crossDomain: true,
      //success: function () { },
      //failure: function () { },
      // complete: function (data) {
      //   console.log(data);
      // }
  }).done(function (data) {
    pizzaFactory.pizzas = data;
  });
  console.log(pizzaFactory.pizzas);
  $(pizzaFactory.pizzas).each(function( index ) {
    //console.log( index + ": " + $( this ).text() );
    //pizzaFactory.pizzasHtml[index] = '<tr><td><a href="view-pizza.php">' + name + '</a></td></tr>';
    console.log(index);
  });

  //$( ".content__pizza-items" ).html( pizzaFactory.pizzasHtml );



  //console.log(pizzaFactory);







//   var cities = [];
//
// var $this, input, text, obj;
// $('.line').each(function() {
//    $this = $(this);
//    $input = $this.find("input");
//    text = $this.text();
//    obj = {};
//    obj[text] = $input.val();
//    cities.push(obj);
// });
//
// users[0].cities = cities;




// $('a').on('click', function(e){
//    e.preventDefault( );
//    var pageRef = $(this).attr('href');
//    //callPage(pageRef);
// });













//   $.ajax({
//
//     url: getPizzasUrl,
//     data: myData,
//     type: 'GET',
//     crossDomain: true,
//     dataType: 'jsonp',
//     success: function() { alert("Success"); },
//     error: function() { alert('Failed!'); },
//     beforeSend: setHeader
// });


});
