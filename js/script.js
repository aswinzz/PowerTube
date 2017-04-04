var gapikey = 'AIzaSyCKMpw2nmPnon_gkh4EIXnbiAmrZNw-v4M';

$(function() {
    $("#results").html('');
    
    $(".fancyboxIframe").fancybox({
        maxWidth  : 900,
        maxHeight : 600,
        fitToView : false,
        width   : '90%',
        height    : '90%',
        autoSize  : false,
        closeClick  : false,
        openEffect  : 'none',
        closeEffect : 'none',
        iframe: {
            scrolling : 'auto',
            preload   : true
        }
    });
    
    var searchField = $('#query');
    var icon = $('#search-btn');
    
    $(searchField).on('focus', function() {
        $(this).animate({
            width: '90%'
        }, 400);
        $(icon).animate({
            right: '21px'
        }, 400);
    });
    
    $(searchField).on('blur', function() {
    if(searchField.val() == '') {
            $(searchField).animate({
                width: '45%'
            }, 400, function(){});
            $(icon).animate({
                right: '304px'
            }, 400, function(){});
        }
    }); 
    
    $('#search-form').submit( function(e) {
        e.preventDefault();
    });
});

function search() {
    $('#results').html('');
    $('#buttons').html('');
    
    q = $('#query').val();  
    $.get(
      "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: gapikey
        }, function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            console.log(data);
            
            $.each(data.items, function(i, item) {
                
                var output = getOutput(item);
                
                $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            $('#buttons').append(buttons);
        });
}

function getOutput(item) {
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    
    var output =  '<li>' +
                '<div class="list-left">' +
                  '<img src="' + thumb + '">' +
                '</div>' +
                '<div class="list-right">' +
                  '<h3><a data-fancybox-type="iframe" class="fancyboxIframe" href="http://youtube.com/embed/' + videoID + '?rel=0">' + title + '</a></h3>' +
                  '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small><br><br>' + '<a href="https://www.ssyoutube.com/watch?v='+videoID+'">&nbspVideo</a>&nbsp&nbsp&nbsp<a href="http://peggo.co/dvr/'+videoID+'">MP3</a>&nbsp&nbsp<a href="http://downsub.com/?url=http%3A%2F%2Fwww%2Eyoutube%2Ecom%2Fwatch%3Fv%3D'+videoID+'">Subtitles</a>&nbsp<a href="https://gifs.com/watch?v='+videoID+'">&nbspWanna Make Gif?</a>' +
                '</div>' +
              '</li>' +
              '<div class="clearfix"></div>' +
              '';
    return output;
}

