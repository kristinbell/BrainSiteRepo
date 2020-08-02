$(document).ready(function() {
	$('body').find('iframe[src*="spotify.com/"]').each(function() {
		$(this).css('width', $(this).parent(1).width() + 'px'); 
        $(this).css('height', $(this).parent(1).height() + 'px');
	});
});


$(window).resize(function() {
	$('body').find('iframe[src*="spotify.com/"]').each(function() {
		$(this).css('width', $(this).parent(1).width() + 'px'); 
        $(this).css('height', $(this).parent(1).height() + 'px');
	});
});

$(function() {
    $('.card-body').on('click', function() {
        var link = $(this).attr('link')

        $(".card-body").removeClass("active");
        $(this).addClass("active");

        $('.spotify').animate({opacity:0}, 1000, function() {
            $('.spotify').attr("src", "https://open.spotify.com/embed/playlist/" + link);
        });
        $('.spotify').delay(400).animate( {opacity:1}, 1000);
    }); 
});