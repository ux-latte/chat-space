$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var image = '';
    if (message.image.url) {
      image = `<img src="${message.image.url}" class="lower-message__image">`;
    }
      var html =
        `<div class="message" data-message-id= "${message.id}">
          <div class="message__upper-info">
            <p class="message__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="message__upper-info__date">
              ${message.date}
            </p>
          </div>
          <p class="message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            ${image}
          </p>
        </div>`
    return html;
  }

  function ScrollToNewMessage(){
   $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      ScrollToNewMessage();
      $('.new_message')[0].reset();
      $(".form__submit").prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });

  $(function(){
    $(function(){
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        setInterval(update, 5000);
      }
    });

    function update(){
      if($('.message')[0]){
        var message_id = $('.message:last').data('message-id');
      } else {
        return false
      }

      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id : message_id },
        dataType: 'json'
      })
      .done(function(data){
        if (data.length){
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.messages').append(html);
          ScrollToNewMessage();
        })
      }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    }
  })

});

