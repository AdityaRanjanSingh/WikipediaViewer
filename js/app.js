function getRandomArticle() {
  $("#content").empty();
  $("#content").hide();
  $("#content").html('<object type="text/html" data="https://en.wikipedia.org/wiki/Special:Random" width="100%" height="600px" style="background-color="transparent"; overflow:auto;"/>');
  setTimeout(myFunction(), 500)

}

function myFunction() {
  $("#content").fadeIn(1000);
}

function onSearchButtonClick() {
  $("#SearchButton").hide();
  $("#SearchFieldAndRefresh").show();
  $("#SearchFieldAndRefresh").animate({
    width: "300px",

  }, 1000);
}

$("#SearchButton").mouseenter(function() {
  $("#SearchButton").animate({
    fontSize: "70px"
  });
});
$("#SearchButton").mouseleave(function() {
  $("#SearchButton").animate({
    fontSize: "40px"
  });
})
$("#SearchFieldAndRefresh").hide();
getRandomArticle();
/* $("#searchField").hide(); */

function onSearchString() {
  $("#content").empty();
  console.log("process");
  //  $("#searchField").fadeIn(3000);
  var title = $("#searchField").val();
  console.log(title);
  var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var cb = '&callback=JSON_CALLBACK';
  var page = 'https://en.wikipedia.org/?curid=';
  console.log(api + title + cb);

  $.ajax(api + title + cb, {
    dataType: "jsonp",
    success: function(wikiResponse) {
      console.log(wikiResponse.query.pages);
      for (var pageId in wikiResponse.query.pages) {
        if (wikiResponse.query.pages.hasOwnProperty(pageId)) {
          var title;
          var Image;
          var Description;
          var tile;
          title = '<p class="heading">' + wikiResponse.query.pages[pageId].title + '</p>';
          Image = '<div class="col-md-4 Image"><img  align="middle"  src="' + wikiResponse.query.pages[pageId].thumbnail.source + '" height="' + wikiResponse.query.pages[pageId].thumbnail.height + '" width="' + wikiResponse.query.pages[pageId].thumbnail.width + '" ></img></div>';
          Description = '<div class="Description">' + '<p>' + wikiResponse.query.pages[pageId].extract + '</p>' + '</div>';
          tile = '<a href="' + page + wikiResponse.query.pages[pageId].pageid + '" target="#content"><div class="tile row">' + Image + '<div class="text col-md-8">' + title + Description + '</div></div></a>';
          console.log(wikiResponse.query.pages[pageId].thumbnail);
          console.log(wikiResponse.query.pages[pageId].title);
          $("#content").append(tile);
        }
      }

    }
  });
  /*     angular.forEach(results, function(v,k)  {r
    $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
  }) */

}