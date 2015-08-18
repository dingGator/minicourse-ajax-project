
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // article search Key: 8762af37085203c886c425fe2a6f6adc:10:72653839
    // top stories key: Key: 2274487755d72dbca286293624040faf:0:72653839
    //// // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at '+ address +'?');
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address + '';
    $body.append('<img class="bgimg" src="'+streetviewUrl+'">');

    $.getJSON( "ajax/test.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
    $.getJSON(URL,function(data){
        console.log(data);
    });
    return false;
};

$('#form-container').submit(loadData);

// loadData();
