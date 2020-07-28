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

    $('#postMessage').on('click', '.submitPost', function(event) {
        
        event.preventDefault();

        var inputName = $('#lonelinessPostName')
        var inputBody = $('#lonelinessPostBody')

        $.ajax( {
            url: 'loneliness/post',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: inputName.val(), textbody: inputBody.val() }),
            success: function(message) {
                console.log(message)
                inputName.val('')
                inputBody.val('')
                var formattedDate = new Date(message.datetime_of_post);
                var posts = $('#posts')
                posts.append(createCard(message._id, message.username, message.body, formattedDate));
            }
        })
    })

    $('#postMessage').on('click', '.clearForm', function(event) {

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
        }  
        
        $(this).remove();
    });
})

function createCard(id, username, body, formattedDate) {
    var li = "<div class=\"bubble-container\" data-id=\""+ id +"\" style=\"width: 100%;\">" 
        + "<div class=\"bubble\">" 
        + "<h5 class=\"card-title\">" 
        + username 
        + "</h5>" 
        + "<h6 class=\"card-subtitle mb-2 text-muted\">" 
        + body 
        + "</h6>"
        + "<h6 class=\"card-subtitle datetime mb-2 text-muted\">" 
        + formattedDate.toLocaleString();
        + "</h6>"
        + "</div>"
        + "</div>" ;
    return li;
}