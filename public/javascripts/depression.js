
		// Start of snippet from: https://developers.google.com/youtube/iframe_api_reference
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		var players = []; // would contain 1 player for each iframe video
		var player;
		function onYouTubeIframeAPIReady()
		{
			var allMovieIframes = document.getElementById("moviesCarousel").getElementsByTagName('iframe');
			for (currentIFrame of allMovieIframes)
			{
				players.push(new YT.Player('player',
					//currentIFrame.id, // the target iframe video, here it is  either katniss, rancho, or logan
					{ events: { 'onStateChange': onPlayerStateChange } }
				));
			}
		}
		function onPlayerStateChange(event) // triggered everytime ANY iframe video player among the "players" list is played, paused, ended, etc.
		{
			// Check if any iframe video is being played (or is currently buffering to be played)
			// Reference: https://developers.google.com/youtube/iframe_api_reference#Events
			if (event.data == YT.PlayerState.PLAYING || event.data == YT.PlayerState.BUFFERING)
			{
				// If any player has been detected to be currently playing or buffering, pause the carousel from sliding
				// .carousel('pause') - Stops the carousel from cycling through items.
				// Reference: https://getbootstrap.com/docs/4.4/components/carousel/#methods
				$('moviesCarousel').carousel('pause');
			}
			else
			{
				// If there are no currently playing nor buffering videos, resume the sliding of the carousel.
				// This means that once the current video is in a state that is not playing (aside from buffering), either it was:
				//     1. paused intentionally
				//     2. paused as an effect of a slide
				//     3. video has ended
				//     4. wasn't totally played from the start
				//     5. and literally any form where the video timer isn't running ;)
				//     - then the carousel would now resume sliding.
				$('moviesCarousel').carousel();
			}
		}
		// End of snippet from Youtube iframe API
 

		/* Got video slider info. from: https://stackoverflow.com/questions/52924820/pause-bootstrap-carousel-when-playing-youtube-video */