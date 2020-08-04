$(document).ready(function() {

    $.ajax({
        url: 'depression/get/cute',
        contentType: 'application/json',
        success: function(response) {
            var memes = $('.kittens')
            response.data.forEach(function(meme) {
                if (meme.link.includes(".jpg")) {
                    memes.append(createMeme(meme))
                }
            })
            $('.kittens').children('.carousel-item').eq(0).addClass("active");
        }
    })

    $.ajax({
        url: 'depression/get/memes',
        contentType: 'application/json',
        success: function(response) {
            var memes = $('.memes')
            response.data.forEach(function(meme) {
                if (meme.link.includes(".jpg")) {
                    memes.append(createMeme(meme))
                }
            })
            $('.memes').children('.carousel-item').eq(0).addClass("active");
        }
    })

})

function createMeme(meme) {
    var memeElem = "<div class=\"carousel-item embed-responsive-item\">"
    + "<a href=\"#!\" class=\"memeModal\">"
    + "<img class=\"memeImage\" class=\"d-block w-100\" src=\"" + meme.link + "\" alt=\"image from imgur\"></a></div>"
    return memeElem;
}

$(function() {
    $('#memesCarousel').on('click', '.carousel-item', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('.modal').modal('show');   
    });		

    $('#memesCarousel2').on('click', '.carousel-item', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('.modal').modal('show');   
    });		
});