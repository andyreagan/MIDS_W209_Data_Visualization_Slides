$(document).ready(function() {
  var render_time_field = $.find("#render_time");
  var date = new Date().toISOString();
  $(render_time_field).val(date);

  $(".timed-form").submit(function(event) {
    var date = new Date().toISOString();
    var submit_time_field = $.find("#submit_time");
    $(submit_time_field).val(date)
  })

  $(".stopwatch").runner();
  $(".stopwatch").runner('start');
})
