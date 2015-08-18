
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

        $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

/*
// article search Key: 8762af37085203c886c425fe2a6f6adc:10:72653839
// top stories key: Key: 2274487755d72dbca286293624040faf:0:72653839
*/
    // load nytimes

    var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityStr+'&page=2&sort=newest&api-key=8762af37085203c886c425fe2a6f6adc:10:72653839';

  // YOUR CODE GOES HERE!

    $.getJSON(nytUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About '+ cityStr)

        articles =data.response.docs;
        for (var i =0; i< articles.length; i++) {
        var article = articles[i];
        $nytElem.append('<li class="article">'+'<a href"'+article.web_url+'">'+article.headline.main+'</a>'+
                    '<p>' +article.snippet +'<p>'+
                    '</li>');
                    };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    })

    // load wikipedia

    var wikiUrl = 'http://en.wikipedia.org//w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

$.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    //jsonp: "callback"
    // Work with the response
    success: function( response ) {
      //  console.log( response );     // server response
        var articleList = response[1];
        for (var i =0; i<articleList.length; i++){
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/'+ articleStr;
            $wikiElem.append('<li><a href="' + url+'">'+ articleStr +'</a></li>');
                    };
    clearTimeout(wikiRequestTimeout);
    }});

return false;
};



$('#form-container').submit(loadData);
