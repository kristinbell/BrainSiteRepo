$(document).ready(function() {
    $.ajax({
        url: 'loneliness/get',
        contentType: 'application/json',
        success: function(response) {
            var posts = $('#posts')
            posts.empty();
            response.forEach(function(message) {
                var formattedDate = new Date(message.datetime_of_post);
                posts.append(createCard(message._id, message.username, message.body, formattedDate));
            })
        }
    })
  });

$(function() {

    $('#postMessage').submit(function(event) {

        event.preventDefault();

        var inputName = $('#lonelinessPostName').attr('name')
        var inputBody = $('#lonelinessPostBody')

        $.ajax( {
            url: 'loneliness/post',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: inputName, textbody: inputBody.val() }),
            success: function(message) {
                console.log(message)
                inputBody.val('')
                var formattedDate = new Date(message.datetime_of_post);
                var posts = $('#posts')
                posts.append(createCard(message._id, message.username, message.body, formattedDate));
                var board = $('.board-content');
                board.scrollTop = board.scrollHeight;
            }
        })
    })

    $('#postMessage').on('click', '#clearForm', function(event) {

        event.preventDefault();

        $('#lonelinessPostName').val('');
        $('#lonelinessPostBody').val('');
    })

    $('#posts').on('click', '.bubble-container', function() {
        if (confirm("Do you want to delete this post?")) {
            $.ajax({
                url: 'loneliness/' + $(this).data('id'),
                method: 'DELETE',
                contentType: 'application/json',
                success: function(response) {
                    console.log(response)
                }
            })
            $(this).remove();
        }  
    });

    $('#signUp').submit(function(event) {

        event.preventDefault();

        var username = $('#username').val()
        var password = $('#password').val()
        $('#username').val('');
        $('#password').val('');

        $.ajax( {
            url: 'auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
            success: function(message) {
                if (message === "success") {
                    window.location.reload();
                } else {
                    alert("Sorry, you entered the wrong password! Please try again.")
                }
            }
        })
    });

    $('#signUp').on('click', '#logoutUser', function(event) {

        event.preventDefault();

        $.ajax( {
            url: 'auth/logout',
            method: 'POST',
            contentType: 'application/json',
            success: function(message) {
                window.location.reload();
            }
        })
    })
    
})

function createCard(id, username, body, formattedDate) {
    var li = "<div class=\"bubble-container\" data-id=\""+ id +"\" style=\"width: 100%;\">" 
        + "<div class=\"bubble\">" 
        + "<h5 class=\"card-title small-caps\">" 
        + username 
        + "</h5>" 
        + "<h6 class=\"card-subtitle mb-2\">" 
        + body 
        + "</h6>"
        + "<p class=\"card-subtitle datetime mb-2\">" 
        + formattedDate.toLocaleString();
        + "</p>"
        + "</div>"
        + "</div>" ;
    return li;
}