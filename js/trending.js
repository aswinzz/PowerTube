
var channelName;
channelName="UCF0pVplsI8R5kcAqgtoRqoA"
$(document).ready(function() {
		 	$.get(
           "https://www.googleapis.com/youtube/v3/channels",{
           	part: 'contentDetails',
           	forUsername: channelName,
           	key: 'AIzaSyBPxaszELtUXG5JuuJOQWioZ0g7uNaCiEE'
           },
           function(data){
           	$.each(data.items,function(i,item){
           		console.log(item);
           		pid = item.contentDetails.relatedPlaylists.uploads;
           		getVids(pid);
           	})
           }
		);
		function getVids(pid){
				$.get(
           "https://www.googleapis.com/youtube/v3/playlistItems",{
           	part: 'snippet',
           	maxResults: 10,
           	playlistId: pid,
           	key: 'AIzaSyBPxaszELtUXG5JuuJOQWioZ0g7uNaCiEE'
           },
           function(data){
           	var output
            $.each(data.items,function(i,item){
           		console.log(item);
           		videTitle=item.snippet.title;
              var thumb = item.snippet.thumbnails.high.url;
              var videoDate = item.snippet.publishedAt;
              var channelTitle = item.snippet.channelTitle;
              videoDes=item.snippet.description;
           		videoId=item.snippet.resourceId.videoId;
           		output='<li><h2>'+videTitle+'</h2><small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '<hr><br><iframe width="300" height="180" src="http://www.youtube.com/embed/'+videoId+'"></iframe><br><br><a href="https://www.ssyoutube.com/watch?v='+videoId+'">Download</a>&nbsp<a href="http://downsub.com/?url=http%3A%2F%2Fwww%2Eyoutube%2Ecom%2Fwatch%3Fv%3D'+videoId+'">&nbspSubtitles</a>&nbsp<a href="http://peggo.co/dvr/'+videoId+'">&nbspMP3</a>&nbsp<a href="https://gifs.com/watch?v='+videoId+'">&nbspWanna Make Gif?</a></li>'
           		//Append to Results
           		$('#results').append(output); 
           	})
           }
		);
		}

});
