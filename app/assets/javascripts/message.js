$(function() {

  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
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
});
