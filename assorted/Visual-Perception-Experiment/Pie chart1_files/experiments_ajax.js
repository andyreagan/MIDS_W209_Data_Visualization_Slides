function question_submit_done(data) {
  console.log(data);
  if(data.success) {
      if(data.scorecard) {
        $("#scorecard").html(data.scorecard);
        $("#submit").remove();
      } else {
        window.location.href = data["next_url"];
      }
  }
}

$(document).ready(function() {
  form_ajax("#create-experiment-form", done_redirect);
  form_ajax("#update-experiment-form", done_highlight, pre_callback_message);
  form_ajax("#activity-remove-form, #activity-add-form", done_refresh);
  form_ajax("#experiment-delete-form", done_redirect);
  form_ajax("#question-submit-form", question_submit_done);
  form_ajax("#submit-experiment-form", done_redirect);
  form_ajax("#confirm-delete-experiment-form", doneRemoveRow);

  media_items = $(".media-item-container");

  for(var i = 0; i < media_items.length; i++) {
    var media_item = $(media_items[i]);
    var flash_duration = parseInt(media_item.data("flash-duration"))
    if(flash_duration > -1) {
      media_item.delay(flash_duration).delay().hide(1);
    }
  }
  
  handleConfirmDeleteModal("experiment");
});
