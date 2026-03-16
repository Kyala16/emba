var bv = null;
var showva = false;
$(document).ready(function () {
  fun_multilang_adapater();
  fun_initialize_page_ui();
  fun_register_events();
  fun_flash_checker();
  fun_videoShow();
});
function fun_multilang_adapater() {
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'basesetting', 'div_table_facedetection_settings_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'schedule', 'div_table_facedetection_schedule_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'action', 'div_table_facedetection_actions_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'alarmout', 'label_facedetection_iooutput,label_wearmask_iooutput,label_withoutmask_iooutput', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'evtblink', 'label_facedetection_ledblink,label_wearmask_ledblink,label_withoutmask_ledblink', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'record', 'label_facedetection_record,label_wearmask_record,label_withoutmask_record', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'ftp', 'label_facedetection_ftp,label_wearmask_ftp,label_withoutmask_ftp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'sendemail', 'label_facedetection_send_email,label_wearmask_send_email,label_withoutmask_send_email', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'snapshot', 'label_facedetection_snapshot,label_wearmask_snapshot,label_withoutmask_snapshot', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'notifyserver', 'label_action_notify_server', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_facedetection_save,button_schedule_timesection_save,button_facedetection_actions_save,button_facedetection_schedule_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_schedule_timesection_cancel', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'removeall', 'button_region_removeall', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_facedetection_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_facedetection_schedule_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_facedetection_schedule_refresh,button_facedetection_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_facedetection_actions_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_facedetection_actions_refresh', ITEM_TYPE_VALUE);
  var facedetection = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'allface', '', ITEM_TYPE_NONE);
  var withoutmask = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'withoutmask', '', ITEM_TYPE_NONE);
  var wearmask = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'wearmask', '', ITEM_TYPE_NONE);
  translate_page_item(TARGET_PAGE_COMMON, 'mintime', 'div_schedule_facedetection_mintime_name,div_schedule_wearmask_mintime_name,div_schedule_withoutmask_mintime_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'facedetection', 'div_action_schedule_name,div_action_type_name', ITEM_TYPE_TEXT);
  translate_page_item(
    TARGET_PAGE_COMMON,
    'setup',
    'facedetection_button_schedule_sunday_setup,facedetection_button_schedule_monday_setup,facedetection_button_schedule_tuesday_setup,facedetection_button_schedule_wednesday_setup,facedetection_button_schedule_thursday_setup,facedetection_button_schedule_friday_setup,facedetection_button_schedule_saturday_setup',
    ITEM_TYPE_VALUE
  );
  translate_page_item(
    TARGET_PAGE_COMMON,
    'setup',
    'wearmask_button_schedule_sunday_setup,wearmask_button_schedule_monday_setup,wearmask_button_schedule_tuesday_setup,wearmask_button_schedule_wednesday_setup,wearmask_button_schedule_thursday_setup,wearmask_button_schedule_friday_setup,wearmask_button_schedule_saturday_setup',
    ITEM_TYPE_VALUE
  );
  translate_page_item(
    TARGET_PAGE_COMMON,
    'setup',
    'withoutmask_button_schedule_sunday_setup,withoutmask_button_schedule_monday_setup,withoutmask_button_schedule_tuesday_setup,withoutmask_button_schedule_wednesday_setup,withoutmask_button_schedule_thursday_setup,withoutmask_button_schedule_friday_setup,withoutmask_button_schedule_saturday_setup',
    ITEM_TYPE_VALUE
  );
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'facedetection_button_schedule_timesection_save,wearmask_button_schedule_timesection_save,withoutmask_button_schedule_timesection_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'facedetection_button_schedule_timesection_cancel,wearmask_button_schedule_timesection_cancel,withoutmask_button_schedule_timesection_cancel', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'sunday', 'facedetection_div_sunday,facedetection_label_sunday,wearmask_div_sunday,wearmask_label_sunday,withoutmask_div_sunday,withoutmask_label_sunday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'monday', 'facedetection_div_monday,facedetection_label_monday,wearmask_div_monday,wearmask_label_monday,withoutmask_div_monday,withoutmask_label_monday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'tuesday', 'facedetection_div_tuesday,facedetection_label_tuesday,wearmask_div_tuesday,wearmask_label_tuesday,withoutmask_div_tuesday,withoutmask_label_tuesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'wednesday', 'facedetection_div_wednesday,facedetection_label_wednesday,wearmask_div_wednesday,wearmask_label_wednesday,withoutmask_div_wednesday,withoutmask_label_wednesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'thursday', 'facedetection_div_thursday,facedetection_label_thursday,wearmask_div_thursday,wearmask_label_thursday,withoutmask_div_thursday,withoutmask_label_thursday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'friday', 'facedetection_div_friday,facedetection_label_friday,wearmask_div_friday,wearmask_label_friday,withoutmask_div_friday,withoutmask_label_friday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'saturday', 'facedetection_div_saturday,facedetection_label_saturday,wearmask_div_saturday,wearmask_label_saturday,withoutmask_div_saturday,withoutmask_label_saturday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'setup', 'button_facedetection_fileter_max,button_facedetection_fileter_min', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'authorize', 'div_table_facedetection_authorize_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'authstatus', 'div_facedct_authorize_status_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'authkey', 'div_facedct_authorize_key_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_facedetection_authorize_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_facedetection_authorize_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'authnote', 'label_authorize_note_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'enablefd', 'label_facedetection_enable', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'showframe', 'label_facedetection_frame', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'showfaceid', 'label_facedetection_faceid', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'faceconfidence', 'div_facedetection_confid_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'maskconfidence', 'div_mask_confid_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'maskblink', 'label_facedetection_maskblink', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'facefilter', 'div_facedetection_filter_group', ITEM_TYPE_TEXT);
  var strmaxrect = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'maxrect', 'label_facedetection_filter_max', ITEM_TYPE_NONE);
  var strminrect = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'minrect', 'label_facedetection_filter_min', ITEM_TYPE_NONE);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'snapshotmode', 'div_facedetection_snapmode_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'picturecompress', 'div_facedetection_compres_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'uploadinterval', 'div_facedetection_update_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'keeptime', 'div_facedetection_keep_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'delaytime', 'div_facedetection_delay_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'keepsize', 'label_facedetection_faceratio', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'strechface', 'div_facedetection_facezoom_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'workmode', 'div_facedetection_optimization_name', ITEM_TYPE_TEXT);
  var fullframe = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'fullframe', '', ITEM_TYPE_NONE);
  var facerect = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'faceframe', '', ITEM_TYPE_NONE);
  var sbest = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'best', '', ITEM_TYPE_NONE);
  var sgood = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'good', '', ITEM_TYPE_NONE);
  var snorm = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'normal', '', ITEM_TYPE_NONE);
  var strsecond = translate_page_item(TARGET_PAGE_COMMON, 'msecond', '', ITEM_TYPE_NONE);
  $('#label_facedetection_filter_max').text(strmaxrect + '  (W*H)');
  $('#label_facedetection_filter_min').text(strminrect + '  (W*H)');
  var soptiinter = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'optiinterval', '', ITEM_TYPE_NONE);
  var soptiarea = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'optiarea', '', ITEM_TYPE_NONE);
  $('#select_facedct_snapmode option').each(function (i, n) {
    if (i === 0) {
      $(n).text(facerect);
    } else if (i === 1) {
      $(n).text(fullframe);
    }
  });
  $('#select_facedct_compress option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sbest);
    } else if (i === 1) {
      $(n).text(sgood);
    } else if (i === 2) {
      $(n).text(snorm);
    }
  });
  $('#select_facedct_optimization option').each(function (i, n) {
    if (i === 0) {
      $(n).text(soptiinter);
    } else if (i === 1) {
      $(n).text(soptiarea);
    }
  });
  $('#select_schedule_type option').each(function (i, n) {
    if (i === 0) {
      $(n).text(facedetection);
    } else if (i === 1) {
      $(n).text(wearmask);
    } else if (i === 2) {
      $(n).text(withoutmask);
    }
  });
  $('#select_action_type option').each(function (i, n) {
    if (i === 0) {
      $(n).text(facedetection);
    } else if (i === 1) {
      $(n).text(wearmask);
    } else if (i === 2) {
      $(n).text(withoutmask);
    }
  });
  $('#p_facedct_update_value').text('[250-4000]' + strsecond);
  var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
  var strhour = translate_page_item(TARGET_PAGE_COMMON, 'hour', '', ITEM_TYPE_NONE);
  var strdisable = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE);
  var strselall = translate_page_item(TARGET_PAGE_COMMON, 'selall', '', ITEM_TYPE_NONE);
  var strperiod = translate_page_item(TARGET_PAGE_COMMON, 'period', '', ITEM_TYPE_NONE);
  $('#label_schedule_facedetection_allday,#label_schedule_wearmask_allday,#label_schedule_withoutmask_allday').text('7*24 ' + strhour);
  $('#label_schedule_facedetection_manual,#label_schedule_wearmask_manual,#label_schedule_withoutmask_manual').text(strschedule);
  $('#label_schedule_facedetection_disable,#label_schedule_wearmask_disable,#label_schedule_withoutmask_disable').text(strdisable);
  $('#facedetection_label_all,#wearmask_label_all,#withoutmask_label_all').text(strselall);
  $('#facedetection_label_section1,#wearmask_label_section1,#withoutmask_label_section1').text(strperiod + ' 1:');
  $('#facedetection_label_section2,#wearmask_label_section2,#withoutmask_label_section2').text(strperiod + ' 2:');
  $('#facedetection_label_section3,#wearmask_label_section3,#withoutmask_label_section3').text(strperiod + ' 3:');
  $('#facedetection_label_section4,#wearmask_label_section4,#withoutmask_label_section4').text(strperiod + ' 4:');
  $('#facedetection_label_section5,#wearmask_label_section5,#withoutmask_label_section5').text(strperiod + ' 5:');
  $('#facedetection_label_section6,#wearmask_label_section6,#withoutmask_label_section6').text(strperiod + ' 6:');
  var strmax = translate_page_item(TARGET_PAGE_COMMON, 'maximum', '', ITEM_TYPE_NONE);
  var strsecond = translate_page_item(TARGET_PAGE_COMMON, 'second', '', ITEM_TYPE_NONE);
  $('#div_schedule_facedetection_mintime_declare').text('[ ' + strmax + ' 300 ' + strsecond + ' ]');
  $('#div_schedule_wearmask_mintime_declare').text('[ ' + strmax + ' 300 ' + strsecond + ' ]');
  $('#div_schedule_withoutmask_mintime_declare').text('[ ' + strmax + ' 300 ' + strsecond + ' ]');
  input_edit_restriction('input_schedule_facedetection_mintime_text', EDIT_RESTRICTION_NUMBER, 3);
  input_edit_restriction('input_schedule_wearmask_mintime_text', EDIT_RESTRICTION_NUMBER, 3);
  input_edit_restriction('input_schedule_withoutmask_mintime_text', EDIT_RESTRICTION_NUMBER, 3);
  input_edit_restriction('input_facedetection_uploadinterval', EDIT_RESTRICTION_NUMBER, 4);
  input_edit_restriction('input_facedetection_filter_max_width', EDIT_RESTRICTION_NUMBER, 3);
  input_edit_restriction('input_facedetection_filter_max_height', EDIT_RESTRICTION_NUMBER, 3);
  input_edit_restriction('input_facedetection_filter_min_width', EDIT_RESTRICTION_NUMBER, 3);
  input_edit_restriction('input_facedetection_filter_min_height', EDIT_RESTRICTION_NUMBER, 3);
  if (current_language_number() === 25) {
    $('.cls_tablebar_item').css('width', '178');
  }
}
function fun_register_events() {
  $('.cls_tablebar_item').click(function () {
    var tagid = this.id.toString();
    fun_main_page_switch(tagid);
  });
  $('#radio_facedetection_filter_max,#radio_facedetection_filter_min').click(function () {
    fun_filter_index_change(this.id.toString());
  });
  $('#button_facedetection_restore,#button_facedetection_refresh,#button_facedetection_save').click(function () {
    var objid = this.id.toString();
    if (objid === 'button_facedetection_restore') {
      fun_baseparam_restore();
    } else if (objid === 'button_facedetection_refresh') {
      fun_baseparam_refresh();
    } else if (objid === 'button_facedetection_save') {
      fun_baseparam_save();
    }
  });
  $('#button_facedetection_schedule_restore,#button_facedetection_schedule_refresh').click(function () {
    var objid = this.id.toString();
    if (objid === 'button_facedetection_schedule_restore') {
      fun_schedule_restore();
    } else if (objid === 'button_facedetection_schedule_refresh') {
      fun_get_facedct_schedule();
    }
  });
  $('#button_facedetection_actions_restore,#button_facedetection_actions_refresh').click(function () {
    var objid = this.id.toString();
    if (objid === 'button_facedetection_actions_restore') {
      fun_actions_restore();
    } else if (objid === 'button_facedetection_actions_refresh') {
      fun_get_facedct_schedule();
    }
  });
  $('#check_facedetection_maskblink,#check_facedetection_faceid,#check_facedetection_frame').click(function () {
    fun_on_baseparam_checkbox_click(this.id.toString());
  });
  $(
    '#facedetection_button_schedule_sunday_setup,#facedetection_button_schedule_monday_setup,#facedetection_button_schedule_tuesday_setup,#facedetection_button_schedule_wednesday_setup,#facedetection_button_schedule_thursday_setup,#facedetection_button_schedule_friday_setup,#facedetection_button_schedule_saturday_setup'
  ).click(function () {
    fun_on_schedule_facedetection_setup(this.id.toString());
  });
  $('#wearmask_button_schedule_sunday_setup,#wearmask_button_schedule_monday_setup,#wearmask_button_schedule_tuesday_setup,#wearmask_button_schedule_wednesday_setup,#wearmask_button_schedule_thursday_setup,#wearmask_button_schedule_friday_setup,#wearmask_button_schedule_saturday_setup').click(
    function () {
      fun_on_schedule_wearmask_setup(this.id.toString());
    }
  );
  $(
    '#withoutmask_button_schedule_sunday_setup,#withoutmask_button_schedule_monday_setup,#withoutmask_button_schedule_tuesday_setup,#withoutmask_button_schedule_wednesday_setup,#withoutmask_button_schedule_thursday_setup,#withoutmask_button_schedule_friday_setup,#withoutmask_button_schedule_saturday_setup'
  ).click(function () {
    fun_on_schedule_withoutmask_setup(this.id.toString());
  });
  $('#radio_schedule_facedetection_alldays,#radio_schedule_facedetection_enable,#radio_schedule_facedetection_disable').click(function () {
    fun_on_schedule_mode_facedetection_change(this.id.toString());
  });
  $('#radio_schedule_wearmask_alldays,#radio_schedule_wearmask_enable,#radio_schedule_wearmask_disable').click(function () {
    fun_on_schedule_mode_wearmask_change(this.id.toString());
  });
  $('#radio_schedule_withoutmask_alldays,#radio_schedule_withoutmask_enable,#radio_schedule_withoutmask_disable').click(function () {
    fun_on_schedule_mode_withoutmask_change(this.id.toString());
  });
  $(
    '#facedetection_button_schedule_timesection_save,#facedetection_button_schedule_timesection_cancel,#wearmask_button_schedule_timesection_save,#wearmask_button_schedule_timesection_cancel,#withoutmask_button_schedule_timesection_save,#withoutmask_button_schedule_timesection_cancel,#button_facedetection_schedule_save,#button_facedetection_actions_save'
  ).click(function () {
    fun_on_schedule_buttons(this.id.toString());
  });
  $('#facedetection_check_weekday_alldays,#wearmask_check_weekday_alldays,#withoutmask_check_weekday_alldays').click(function () {
    fun_on_weekday_alldays(this.id.toString());
  });
  $('#button_region_allrect').click(function () {
    selallareas();
  });
  $('#input_facedetection_filter_max_width,#input_facedetection_filter_max_height,#input_facedetection_filter_min_width,#input_facedetection_filter_min_height').on('input', function () {
    fun_on_inputedit_text_change(this.id.toString());
  });
  $('#button_facedetection_fileter_max,#button_facedetection_fileter_min').click(function () {
    fun_on_ratio_value_set(this.id.toString());
  });
  $('#select_facedct_optimization').change(function () {
    fun_on_optimization_change();
  });
  $('#button_facedetection_authorize_refresh').click(function () {
    fun_get_facedct_license();
  });
  $('#button_facedetection_authorize_save').click(function () {
    fun_on_facedct_save();
  });
  $('.facedetection_checkbox_change').click(function () {
    fun_facedetection_checkbox_change();
  });
  $('.wearmask_checkbox_change').click(function () {
    fun_wearmask_checkbox_change();
  });
  $('.withoutmask_checkbox_change').click(function () {
    fun_withoutmask_checkbox_change();
  });
  $('#select_schedule_type').change(function () {
    fun_on_schedule_change();
  });
  $('#select_action_type').change(function () {
    fun_on_action_change();
  });
}
function fun_on_schedule_change() {
  var scheduletype = $('#select_schedule_type').val();
  if (scheduletype == 0) {
    $('#div_facedetection_schedule_facedetection').css('display', 'block');
    $('#div_facedetection_schedule_wearmask').css('display', 'none');
    $('#div_facedetection_schedule_withoutmask').css('display', 'none');
  } else if (scheduletype == 1) {
    $('#div_facedetection_schedule_facedetection').css('display', 'none');
    $('#div_facedetection_schedule_wearmask').css('display', 'block');
    $('#div_facedetection_schedule_withoutmask').css('display', 'none');
  } else {
    $('#div_facedetection_schedule_facedetection').css('display', 'none');
    $('#div_facedetection_schedule_wearmask').css('display', 'none');
    $('#div_facedetection_schedule_withoutmask').css('display', 'block');
  }
}
function fun_on_action_change() {
  var actiontype = $('#select_action_type').val();
  if (actiontype == 0) {
    $('#div_facedetection_facedetection').css('display', 'block');
    $('#div_facedetection_wearmask').css('display', 'none');
    $('#div_facedetection_withoutmask').css('display', 'none');
  } else if (actiontype == 1) {
    $('#div_facedetection_facedetection').css('display', 'none');
    $('#div_facedetection_wearmask').css('display', 'block');
    $('#div_facedetection_withoutmask').css('display', 'none');
  } else {
    $('#div_facedetection_facedetection').css('display', 'none');
    $('#div_facedetection_wearmask').css('display', 'none');
    $('#div_facedetection_withoutmask').css('display', 'block');
  }
}
function fun_facedetection_checkbox_change() {
  var checkboxall = $('#facedetection_div_setup_weekday_select .facedetection_checkbox_change').length;
  var checked = $('#facedetection_div_setup_weekday_select .facedetection_checkbox_change:checked').length;
  if (checked < checkboxall) {
    $('#facedetection_check_weekday_alldays').prop('checked', false);
  } else {
    $('#facedetection_check_weekday_alldays').prop('checked', true);
  }
}
function fun_wearmask_checkbox_change() {
  var checkboxall = $('#wearmask_div_setup_weekday_select .wearmask_checkbox_change').length;
  var checked = $('#wearmask_div_setup_weekday_select .wearmask_checkbox_change:checked').length;
  if (checked < checkboxall) {
    $('#wearmask_check_weekday_alldays').prop('checked', false);
  } else {
    $('#wearmask_check_weekday_alldays').prop('checked', true);
  }
}
function fun_withoutmask_checkbox_change() {
  var checkboxall = $('#withoutmask_div_setup_weekday_select .withoutmask_checkbox_change').length;
  var checked = $('#withoutmask_div_setup_weekday_select .withoutmask_checkbox_change:checked').length;
  if (checked < checkboxall) {
    $('#withoutmask_check_weekday_alldays').prop('checked', false);
  } else {
    $('#withoutmask_check_weekday_alldays').prop('checked', true);
  }
}
function fun_initialize_page_ui() {
  $('#slider_facedct_confidence').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 0,
    change: fun_slider_value_change,
    slide: fun_slider_slide
  });
  $('#slider_mask_confidence').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 0,
    change: fun_slider_value_change,
    slide: fun_slider_slide
  });
  $('#slider_facedct_facezoom').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 10,
    min: 1,
    valud: 1,
    change: fun_slider_value_change,
    slide: fun_slider_slide
  });
  $('#slider_facedct_keeptime').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 10,
    min: 1,
    valud: 1,
    change: fun_slider_value_change,
    slide: fun_slider_slide
  });
  $('#slider_facedct_delaytime').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 10,
    min: 5,
    valud: 5,
    change: fun_slider_value_change,
    slide: fun_slider_slide
  });
  fun_init_schedule_panel_show();
  if (!CurBrowserIsIE()) {
    fun_init_canvas();
    fun_get_baseparams();
  }
  fun_init_timer_section_item();
  fun_get_facedct_schedule();
  fun_get_facedct_license();
  fun_get_device_capbility();
}
function fun_get_device_capbility() {
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) {
      return;
    }
    $xml = $(result);
    var ioout = $xml.find('ioout').text();
    var serialenable = $xml.find('serial').text();
    var fullcolor = $xml.find('fullcolor').text();
    var whled = $xml.find('whled').text();
    var irled = $xml.find('irled').text();
    var smartva = $xml.find('smartva').text();
    showva = parseInt(smartva) & (1 << 9) ? true : false;
    if (showva) {
      $('#div_mask_confid').css('display', 'block');
      $('#div_facedetection_maskblink').css('display', 'block');
      $('#div_facedetection_schdule_type').css('display', 'block');
      $('#div_facedetection_action_type').css('display', 'block');
    }
    if (fullcolor == 1 || whled == 1 || irled == 2) {
      $('#div_facedetection_facedetection_ledblink').css('display', 'block');
      $('#div_facedetection_wearmask_ledblink').css('display', 'block');
      $('#div_facedetection_withoutmask_ledblink').css('display', 'block');
    }
    if (serialenable <= 0) {
      $('#div_facedetection_facedetection_rsio').css('display', 'none');
      $('#div_facedetection_wearmask_rsio').css('display', 'none');
      $('#div_facedetection_withoutmask_rsio').css('display', 'none');
    }
    if (ioout <= 0) {
      $('#div_facedetection_facedetection_iooutput').css('display', 'none');
      $('#div_facedetection_wearmask_iooutput').css('display', 'none');
      $('#div_facedetection_withoutmask_iooutput').css('display', 'none');
    }
  });
  sdk_getipcparam('/action/get?subject=snapability', function (result) {
    if (result != false) {
      $xml = $(result);
      var streamopt = $xml.find('streamopt').text();
      if (parseInt(streamopt) <= 0) {
        $('#div_facedetection_facedetection_snapshot').css('display', 'none');
        $('#div_facedetection_wearmask_snapshot').css('display', 'none');
        $('#div_facedetection_withoutmask_snapshot').css('display', 'none');
      }
    }
  });
}
function fun_main_page_switch(id) {
  if (id === 'div_table_facedetection_settings') {
    $('#div_table_facedetection_settings').addClass('cls_tablebar_item_selected');
    $('#div_table_facedetection_schedule,#div_table_facedetection_actions,#div_table_facedetection_authorize').removeClass('cls_tablebar_item_selected');
    $('#div_facedetection_settings').css('display', 'block');
    $('#div_facedetection_schedule,#div_facedetection_actions,#div_facedetection_authorize').css('display', 'none');
  } else if (id === 'div_table_facedetection_schedule') {
    $('#div_table_facedetection_schedule').addClass('cls_tablebar_item_selected');
    $('#div_table_facedetection_settings,#div_table_facedetection_actions,#div_table_facedetection_authorize').removeClass('cls_tablebar_item_selected');
    $('#div_facedetection_schedule').css('display', 'block');
    $('#div_facedetection_settings,#div_facedetection_actions,#div_facedetection_authorize').css('display', 'none');
  } else if (id === 'div_table_facedetection_actions') {
    $('#div_table_facedetection_actions').addClass('cls_tablebar_item_selected');
    $('#div_table_facedetection_schedule,#div_table_facedetection_settings,#div_table_facedetection_authorize').removeClass('cls_tablebar_item_selected');
    $('#div_facedetection_actions').css('display', 'block');
    $('#div_facedetection_schedule,#div_facedetection_settings,#div_facedetection_authorize').css('display', 'none');
  } else if (id === 'div_table_facedetection_authorize') {
    $('#div_table_facedetection_authorize').addClass('cls_tablebar_item_selected');
    $('#div_table_facedetection_schedule,#div_table_facedetection_settings,#div_table_facedetection_actions').removeClass('cls_tablebar_item_selected');
    $('#div_facedetection_authorize').css('display', 'block');
    $('#div_facedetection_schedule,#div_facedetection_settings,#div_facedetection_actions').css('display', 'none');
  }
}
var video_window_width = 640;
var video_window_height = 360;
function CurBrowserIsIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;
  return false;
}
function compatibility_firefox() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? (Sys.ie = s[1]) : (s = ua.match(/firefox\/([\d.]+)/)) ? (Sys.firefox = s[1]) : (s = ua.match(/chrome\/([\d.]+)/)) ? (Sys.chrome = s[1]) : (s = ua.match(/opera.([\d.]+)/)) ? (Sys.opera = s[1]) : (s = ua.match(/version\/([\d.]+).*safari/)) ? (Sys.safari = s[1]) : 0;
  var edge = ua.match(/trident\/([\d.])/);
  if (Sys.firefox || Sys.safari) {
    return true;
  }
  return false;
}
function fun_get_video_picture() {
  Math.random() * 700;
  var num = Math.random() * 700 + 800;
  num = parseInt(num, 10);
  var tagpash = '/action/snap?t=' + String(num);
  $('#img_video_show').attr('src', tagpash);
  setTimeout('fun_get_video_picture();', 1000);
}

function fun_videoShow() {
  if (!CurBrowserIsIE()) {
    sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (result) {
      if (result != false) {
        $xml = $(result);
        var codec = $xml.find('codec').text();
        if (codec == 1) {
          $('#div_facedetection_video_player').html("<img id='img_video_show' src='/action/snap' style='width: 100%;height: 100%'/>");
          fun_get_video_picture();
        } else if (codec == 2) {
          var Img_T = "<img style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=0' />";
          $('#div_facedetection_video_player').html(Img_T);
        } else {
          $('#div_facedetection_video_player').html('<video id="videoElement" height=' + video_window_height + ' width=' + video_window_width + ' style="border: 1px solid black;" name="videoElement" class="centeredVideo" autoplay></video>');
          var videoElement = document.getElementById('videoElement');
          videoElement.addEventListener(
            'click',
            function mouseHandler(event) {
              // 阻止视频默认点击事件
              event.preventDefault();
            },
            false
          );
          bv = window.mpegts.createPlayer(
            {
              type: 'flv',
              url: document.location.origin + '/action/stream?subject=flvlive&stream=0',
              withCredentials: false,
              liveBufferLatencyChasing: true,
              hasAudio: false
            },
            {
              lazyLoadMaxDuration: 3 * 60,
              seekType: 'range',
              liveBufferLatencyChasing: true
            }
          );
          bv.attachMediaElement(videoElement);
          bv.load();
          bv.play();
        }
      }
    });
  } else {
    $('#div_facedetection_video_player').html(
      "<OBJECT id='VIDEO' width='" + 640 + "' height='" + 360 + "' align='center' classid='clsid:FEB29125-2FEA-403E-985B-8E4930ABBA56'> </OBJECT><script type='text/javascript' language='JavaScript' event='OnLoad' for='preview_player'>fun_on_ieplugin_load();</script>"
    );
    $('#div_facedetection_video_drawer').remove();
  }
}
function fun_flash_checker() {
  if (!CurBrowserIsIE()) {
    return;
  }
  var bfind = false;
  for (var i = 0, len = navigator.plugins.length; i < len; i++) {
    var plugin = navigator.plugins[i];
    if (plugin.name.indexOf('Shockwave Flash') >= 0) {
      bfind = true;
      break;
    }
  }
  if (!bfind) {
    $('#div_facedetection_video_drawer').css('display', 'none');
  }
}
function fun_on_baseparam_checkbox_click(objid) {
  if (objid === 'check_facedetection_frame') {
    if ($('#check_facedetection_frame').prop('checked') === false) {
      $('#check_facedetection_faceid').prop('checked', false);
      $('#check_facedetection_maskblink').prop('checked', false);
    }
  } else if (objid === 'check_facedetection_maskblink') {
    if ($('#check_facedetection_maskblink').prop('checked') === true) {
      $('#check_facedetection_frame').prop('checked', true);
    }
  } else {
    if ($('#check_facedetection_faceid').prop('checked') === true) {
      $('#check_facedetection_frame').prop('checked', true);
    }
  }
}
var canvas;
var ctx;
var rects = [new position_item(0, 0, 0, 0), new position_item(0, 0, 0, 0)];
var rectsper = [new position_item(0, 0, 0, 0), new position_item(0, 0, 0, 0)];
var bdrawing = false;
var benabledraw = true;
var bratiochange = false;
var currectindex = 1;
var rectitemmask = 2;
function position_item(a, b, c, d) {
  this.x1 = a;
  this.y1 = b;
  this.x2 = c;
  this.y2 = d;
  return this;
}
function mousePosition(evt) {
  return {
    x: evt.offsetX,
    y: evt.offsetY
  };
}
function fun_init_canvas() {
  canvas = document.getElementById('canvas_facedetection_region');
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  canvas.onmousedown = startdrawgrid;
  canvas.onmouseup = stopdrawgrid;
  canvas.onmousemove = movinggrid;
  canvas.onmouseout = stopdrawgrid;
}
function startdrawgrid(evt) {
  if (!benabledraw) {
    return;
  }
  rects[currectindex].x1 = mousePosition(evt).x;
  rects[currectindex].y1 = mousePosition(evt).y;
  rects[currectindex].x2 = rects[currectindex].x1;
  rects[currectindex].y2 = rects[currectindex].y1;
  bdrawing = true;
}
function stopdrawgrid(evt) {
  if (!bdrawing) {
    return;
  }
  var point = mousePosition(evt);
  var x1 = rects[currectindex].x1;
  var y1 = rects[currectindex].y1;
  if (x1 < point.x && y1 < point.y) {
    rects[currectindex].x2 = point.x;
    rects[currectindex].y2 = point.y;
  } else if (x1 >= point.x && y1 < point.y) {
    rects[currectindex].x1 = point.x;
    rects[currectindex].y1 = y1;
    rects[currectindex].x2 = x1;
    rects[currectindex].y2 = point.y;
  } else if (x1 >= point.x && y1 >= point.y) {
    rects[currectindex].x1 = point.x;
    rects[currectindex].y1 = point.y;
    rects[currectindex].x2 = x1;
    rects[currectindex].y2 = y1;
  } else if (x1 < point.x && y1 >= point.y) {
    rects[currectindex].x1 = x1;
    rects[currectindex].y1 = point.y;
    rects[currectindex].x2 = point.x;
    rects[currectindex].y2 = y1;
  }
  bdrawing = false;
  if (currectindex == 0) {
    var rect1 = convertorect(rects[0]);
    var rect2 = convertorect(rects[1]);
    if (rect1.w >= rect2.w) {
      if (rects[0].x1 < rects[0].x2) {
        rects[0].x2 = rects[0].x1 + rect2.w - 7;
      } else {
        rects[0].x2 = rects[0].x1 - rect2.w + 7;
      }
    }
    if (rect1.h >= rect2.h) {
      if (rects[0].y1 < rects[0].y2) {
        rects[0].y2 = rects[0].y1 + rect2.h - 4;
      } else {
        rects[0].y2 = rects[0].y1 - rect2.h + 4;
      }
    }
  } else {
    var rect1 = convertorect(rects[0]);
    var rect2 = convertorect(rects[1]);
    if (rect2.w <= rect1.w) {
      if (rects[1].x1 < rects[1].x2) {
        rects[1].x2 = rects[1].x1 + rect1.w + 7;
        if (rects[1].x2 > 638) {
          rects[1].x1 = rects[1].x1 - (rects[1].x2 - 638);
          rects[1].x2 = rects[1].x2 - (rects[1].x2 - 638);
        }
      } else {
        rects[1].x2 = rects[1].x1 - rect1.w - 7;
        if (rects[1].x2 < 2) {
          rects[1].x1 = rects[1].x1 + 2 - rects[1].x2;
          rects[1].x2 = rects[1].x2 + 2 - rects[1].x2;
        }
      }
    }
    if (rect2.h <= rect1.h) {
      if (rects[1].y1 < rects[1].y2) {
        rects[1].y2 = rects[1].y1 + rect1.h + 4;
        if (rects[1].y2 > 358) {
          rects[1].y1 = rects[1].y1 - (rects[1].y2 - 358);
          rects[1].y2 = rects[1].y2 - (rects[1].y2 - 358);
        }
      } else {
        rects[1].y2 = rects[1].y1 - rect1.h - 4;
        if (rects[1].y2 < 2) {
          rects[1].y1 = rects[1].y1 + 2 - rects[1].y2;
          rects[1].y2 = rects[1].y2 + 2 - rects[1].y2;
        }
      }
    }
  }
  rectsper[currectindex].x1 = Math.floor(rects[currectindex].x1 / 6.4);
  rectsper[currectindex].x2 = Math.floor(rects[currectindex].x2 / 6.4);
  rectsper[currectindex].y1 = Math.floor(rects[currectindex].y1 / 3.6);
  rectsper[currectindex].y2 = Math.floor(rects[currectindex].y2 / 3.6);
  if (0 === currectindex) {
    $('#input_facedetection_filter_min_width').val(rectsper[currectindex].x2 - rectsper[currectindex].x1);
    $('#input_facedetection_filter_min_height').val(rectsper[currectindex].y2 - rectsper[currectindex].y1);
  } else {
    var widthpercent = rectsper[currectindex].x2 - rectsper[currectindex].x1;
    var heightpercent = rectsper[currectindex].y2 - rectsper[currectindex].y1;
    if (widthpercent < 0 && heightpercent < 0) {
      $('#input_facedetection_filter_max_width').val(-widthpercent);
      $('#input_facedetection_filter_max_height').val(-heightpercent);
    } else if (widthpercent < 0 && heightpercent >= 0) {
      $('#input_facedetection_filter_max_width').val(-widthpercent);
      $('#input_facedetection_filter_max_height').val(heightpercent);
    } else if (widthpercent >= 0 && heightpercent < 0) {
      $('#input_facedetection_filter_max_width').val(widthpercent);
      $('#input_facedetection_filter_max_height').val(-heightpercent);
    } else {
      $('#input_facedetection_filter_max_width').val(widthpercent);
      $('#input_facedetection_filter_max_height').val(heightpercent);
    }
  }
  bratiochange = true;
}
function movinggrid(evt) {
  if (!bdrawing) {
    return;
  }
  var point = mousePosition(evt);
  rects[currectindex].x2 = point.x;
  rects[currectindex].y2 = point.y;
}
function convertorect(pts) {
  var a, b, c, d;
  if (pts.x2 >= pts.x1 && pts.y2 >= pts.y1) {
    a = pts.x1;
    b = pts.y1;
    c = pts.x2 - pts.x1;
    d = pts.y2 - pts.y1;
  } else if (pts.x2 < pts.x1 && pts.y2 < pts.y1) {
    a = pts.x2;
    b = pts.y2;
    c = pts.x1 - pts.x2;
    d = pts.y1 - pts.y2;
  } else if (pts.x2 < pts.x1 && pts.y2 >= pts.y1) {
    a = pts.x2;
    b = pts.y1;
    c = pts.x1 - pts.x2;
    d = pts.y2 - pts.y1;
  } else if (pts.x2 >= pts.x1 && pts.y2 < pts.y1) {
    a = pts.x1;
    b = pts.y2;
    c = pts.x2 - pts.x1;
    d = pts.y1 - pts.y2;
  }
  return { x: a, y: b, w: c, h: d };
}
function drawrectangle() {
  if (!benabledraw) {
    return;
  }
  ctx.clearRect(0, 0, video_window_width, video_window_height);

  if (rectitemmask & (0x01 << 1)) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    var tagrec = convertorect(rects[1]);
    if (tagrec.w > 0 && tagrec.h > 0) {
      ctx.strokeRect(tagrec.x, tagrec.y, tagrec.w, tagrec.h);
    }
  }
  if (rectitemmask & 0x01) {
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    var tagrec = convertorect(rects[0]);
    if (tagrec.w > 0 && tagrec.h > 0) {
      ctx.strokeRect(tagrec.x, tagrec.y, tagrec.w, tagrec.h);
    }
  }
}
if (!CurBrowserIsIE()) {
  setInterval(drawrectangle, 25);
}
function fun_percent_to_pixel(index, w, h) {
  var tagw = w,
    tagh = h;
  if (0 === index) {
    if (w >= 0) {
      if (w >= rectsper[1].x2 - rectsper[1].x1) {
        tagw = rectsper[1].x2 - rectsper[1].x1 - 1;
      }
    }
    if (h >= 0) {
      if (h >= rectsper[1].y2 - rectsper[1].y1) {
        tagh = rectsper[1].y2 - rectsper[1].y1 - 1;
      }
    }
  } else {
    if (w >= 0) {
      if (w <= rectsper[0].x2 - rectsper[0].x1) {
        tagw = rectsper[0].x2 - rectsper[0].x1 + 1;
      }
    }
    if (h >= 0) {
      if (h <= rectsper[0].y2 - rectsper[0].y1) {
        tagh = rectsper[0].y2 - rectsper[0].y1 + 1;
      }
    }
  }
  if (rectsper[index].x1 + tagw > 100) {
    rectsper[index].x1 = 100 - tagw;
    rectsper[index].x2 = rectsper[index].x1 + tagw;
  } else {
    rectsper[index].x2 = rectsper[index].x1 + tagw;
  }
  if (rectsper[index].y1 + tagh > 100) {
    rectsper[index].y1 = 100 - tagh;
    rectsper[index].y2 = rectsper[index].y1 + tagh;
  } else {
    rectsper[index].y2 = rectsper[index].y1 + tagh;
  }

  rects[index].x1 = Math.floor(rectsper[index].x1 * 6.4);
  rects[index].x2 = Math.floor(rectsper[index].x2 * 6.4);
  rects[index].y1 = Math.floor(rectsper[index].y1 * 3.6);
  rects[index].y2 = Math.floor(rectsper[index].y2 * 3.6);
  return { w: tagw, h: tagh };
}
function fun_on_inputedit_text_change(objid) {
  var width = -1,
    height = -1;
  var index = -1;
  if (objid === 'input_facedetection_filter_max_width') {
    width = $('#input_facedetection_filter_max_width').val();
    index = 1;
    if (parseInt(width) > 100) {
      $('#input_facedetection_filter_max_width').val('100');
    }
  } else if (objid === 'input_facedetection_filter_max_height') {
    height = $('#input_facedetection_filter_max_height').val();
    index = 1;
    if (parseInt(height) > 100) {
      $('#input_facedetection_filter_max_height').val('100');
    }
  } else if (objid === 'input_facedetection_filter_min_width') {
    width = $('#input_facedetection_filter_min_width').val();
    index = 0;
    if (parseInt(width) > 100) {
      $('#input_facedetection_filter_min_width').val('100');
    }
  } else if (objid === 'input_facedetection_filter_min_height') {
    height = $('#input_facedetection_filter_min_height').val();
    index = 0;
    if (parseInt(height) > 100) {
      $('#input_facedetection_filter_min_height').val('100');
    }
  }
  return;
}
function fun_on_ratio_value_set(objid) {
  var width = -1,
    height = -1;
  var index = -1;
  if (objid === 'button_facedetection_fileter_max') {
    index = 1;
    width = $('#input_facedetection_filter_max_width').val();
    height = $('#input_facedetection_filter_max_height').val();
  } else {
    index = 0;
    width = $('#input_facedetection_filter_min_width').val();
    height = $('#input_facedetection_filter_min_height').val();
  }

  width = parseInt(width);
  height = parseInt(height);
  if (index >= 0 && index <= 1) {
    var rect = fun_percent_to_pixel(index, width, height);
    if (width >= 0) {
      if (rect.w !== width) {
        if (0 === index) {
          $('#input_facedetection_filter_min_width').val(rect.w);
        } else {
          $('#input_facedetection_filter_max_width').val(rect.w);
        }
      }
    }
    if (height >= 0) {
      if (rect.h !== height) {
        if (0 === index) {
          $('#input_facedetection_filter_min_height').val(rect.h);
        } else {
          $('#input_facedetection_filter_max_height').val(rect.h);
        }
      }
    }
  }
  bratiochange = true;
}
function fun_filter_index_change(objid) {
  var bmax = $('#radio_facedetection_filter_max').prop('checked') ? true : false;
  var bmin = $('#radio_facedetection_filter_min').prop('checked') ? true : false;
  if (objid === 'radio_facedetection_filter_max') {
    if (bmax) {
      currectindex = 1;
      if (null !== g_activex_plugin) {
        g_activex_plugin.SetLayerDrawIndex(0);
        g_ocxdraw_index = 0;
      }
    } else if (bmin) {
      currectindex = 0;
      if (null !== g_activex_plugin) {
        g_activex_plugin.SetLayerDrawIndex(1);
        g_ocxdraw_index = 1;
      }
    } else {
      currectindex = -1;
      if (null !== g_activex_plugin) {
        g_activex_plugin.SetLayerDrawIndex(3);
        g_ocxdraw_index = -1;
      }
    }
  } else if (objid === 'radio_facedetection_filter_min') {
    if (bmin) {
      currectindex = 0;
      if (null !== g_activex_plugin) {
        g_activex_plugin.SetLayerDrawIndex(1);
        g_ocxdraw_index = 1;
      }
    } else if (bmax) {
      currectindex = 1;
      if (null !== g_activex_plugin) {
        g_activex_plugin.SetLayerDrawIndex(0);
        g_ocxdraw_index = 0;
      }
    } else {
      currectindex = -1;
      if (null !== g_activex_plugin) {
        g_activex_plugin.SetLayerDrawIndex(3);
        g_ocxdraw_index = -1;
      }
    }
  }
  var ocxmask = 0;
  if (bmax) {
    rectitemmask |= 0x01 << 1;
    ocxmask |= 0x01;
  } else {
    rectitemmask &= ~(0x01 << 1);
    ocxmask &= ~0x01;
  }
  if (bmin) {
    rectitemmask |= 0x01;
    ocxmask |= 0x01 << 1;
  } else {
    rectitemmask &= ~0x01;
    ocxmask &= ~(0x01 << 1);
  }
  if (null !== g_activex_plugin) {
    g_activex_plugin.SetItemShow(ocxmask);
  }
}
function fun_on_optimization_change() {
  var index = $('#select_facedct_optimization').val();
  if ('0' === index) {
    $('#div_facedetection_update').css('display', 'block');
    $('#div_facedetection_keep').css('display', 'none');
    $('#div_facedetection_delay').css('display', 'none');
  } else {
    $('#div_facedetection_update').css('display', 'none');
    $('#div_facedetection_keep').css('display', 'block');
    $('#div_facedetection_delay').css('display', 'block');
  }
}
function fun_slider_slide(event, ui) {
  var tagid = this.id.toString();
  if (tagid === 'slider_facedct_confidence') {
    $('#p_facedct_confidence_value').text(ui.value);
  } else if (tagid === 'slider_mask_confidence') {
    $('#p_mask_confidence_value').text(ui.value);
  } else if (tagid === 'slider_facedct_facezoom') {
    $('#p_facedct_facezoom_value').text(ui.value + 'X');
  }
}
function fun_slider_value_change(event, ui) {
  var tagid = this.id.toString();
  if (tagid === 'slider_facedct_confidence') {
    $('#p_facedct_confidence_value').text(ui.value);
  } else if (tagid === 'slider_mask_confidence') {
    $('#p_mask_confidence_value').text(ui.value);
  } else if (tagid === 'slider_facedct_facezoom') {
    $('#p_facedct_facezoom_value').text(ui.value + 'X');
  } else if (tagid === 'slider_facedct_keeptime') {
    $('#p_facedct_keeptieme_value').text(ui.value);
  } else if (tagid === 'slider_facedct_delaytime') {
    $('#p_facedct_delaytime_value').text(ui.value);
  }
}
var g_basepara_cache;
function fun_get_baseparams() {
  sdk_getipcparam('/action/get?subject=facedetect', function (result) {
    if (result === false) {
      return;
    }
    $xml = $(result);
    g_basepara_cache = result;
    var enable = $xml.find('enable').text();
    var confid = $xml.find('confidence').text();
    var maskconfid = $xml.find('maskconfd').text();
    var filmin = $xml.find('fmin').text();
    var filmax = $xml.find('fmax').text();
    var picqua = $xml.find('pquality').text();
    var pictype = $xml.find('pmode').text();
    var border = $xml.find('border').text();
    var showid = $xml.find('id').text();
    var mask = $xml.find('mask').text();
    var update = $xml.find('update').text();
    var zoom = $xml.find('zoom').text();
    var ratio = $xml.find('ratio').text();
    var wkmode = $xml.find('mode').text();
    var kptime = $xml.find('keep').text();
    var dytime = $xml.find('delay').text();
    kptime = parseInt(kptime);
    dytime = parseInt(dytime);
    if (enable == 0) {
      $('#check_fadecetection_enable').prop('checked', false);
    } else if (enable == 1) {
      $('#check_fadecetection_enable').prop('checked', true);
    }
    if (border == 0) {
      $('#check_facedetection_frame').prop('checked', false);
    } else if (border == 1) {
      $('#check_facedetection_frame').prop('checked', true);
    }
    if (showid == 0) {
      $('#check_facedetection_faceid').prop('checked', false);
    } else if (showid == 1) {
      $('#check_facedetection_faceid').prop('checked', true);
    }
    if (mask == 0) {
      $('#check_facedetection_maskblink').prop('checked', false);
    } else if (mask == 1) {
      $('#check_facedetection_maskblink').prop('checked', true);
    }
    if (confid >= 0 && confid <= 100) {
      $('#slider_facedct_confidence').slider('option', 'value', confid);
    } else {
      $('#slider_facedct_confidence').slider('option', 'value', 50);
    }
    if (maskconfid >= 0 && maskconfid <= 100) {
      $('#slider_mask_confidence').slider('option', 'value', maskconfid);
    } else {
      $('#slider_mask_confidence').slider('option', 'value', 30);
    }
    if (kptime >= 1 && kptime <= 10) {
      $('#slider_facedct_keeptime').slider('option', 'value', kptime);
    }
    if (dytime >= 5 && dytime <= 10) {
      $('#slider_facedct_delaytime').slider('option', 'value', dytime);
    }
    if (picqua >= 0 && picqua <= 2) {
      $('#select_facedct_compress').val(parseInt(picqua));
    } else {
      $('#select_facedct_compress').val(0);
    }
    if (pictype == 0 || pictype == 1) {
      $('#select_facedct_snapmode').val(pictype);
    }
    if ('0' === wkmode) {
      $('#select_facedct_optimization').val('0');
      $('#div_facedetection_update').css('display', 'block');
      $('#div_facedetection_keep').css('display', 'none');
      $('#div_facedetection_delay').css('display', 'none');
    } else {
      $('#select_facedct_optimization').val('1');
      $('#div_facedetection_update').css('display', 'none');
      $('#div_facedetection_keep').css('display', 'block');
      $('#div_facedetection_delay').css('display', 'block');
    }
    if (update >= 250 && update <= 4000) {
      $('#input_facedetection_uploadinterval').val(update);
    }
    if (ratio === '1') {
      $('#check_fadecetection_faceratio').prop('checked', true);
    } else {
      $('#check_fadecetection_faceratio').prop('checked', false);
    }
    if (zoom >= 1 && zoom <= 10) {
      $('#slider_facedct_facezoom').slider('option', 'value', zoom);
    }
    var ptmin = filmin.split(',');
    var ptmax = filmax.split(',');
    if (ptmin.length === 4) {
      rects[0].x1 = Math.floor(ptmin[0] * 6.4);
      rects[0].y1 = Math.floor(ptmin[1] * 3.6);
      rects[0].x2 = Math.floor(ptmin[2] * 6.4);
      rects[0].y2 = Math.floor(ptmin[3] * 3.6);

      rectsper[0].x1 = parseInt(ptmin[0]);
      rectsper[0].y1 = parseInt(ptmin[1]);
      rectsper[0].x2 = parseInt(ptmin[2]);
      rectsper[0].y2 = parseInt(ptmin[3]);

      $('#input_facedetection_filter_min_width').val(rectsper[0].x2 - rectsper[0].x1);
      $('#input_facedetection_filter_min_height').val(rectsper[0].y2 - rectsper[0].y1);
    }
    if (ptmax.length === 4) {
      rects[1].x1 = Math.floor(ptmax[0] * 6.4);
      rects[1].y1 = Math.floor(ptmax[1] * 3.6);
      rects[1].x2 = Math.floor(ptmax[2] * 6.4);
      rects[1].y2 = Math.floor(ptmax[3] * 3.6);

      rectsper[1].x1 = parseInt(ptmax[0]);
      rectsper[1].y1 = parseInt(ptmax[1]);
      rectsper[1].x2 = parseInt(ptmax[2]);
      rectsper[1].y2 = parseInt(ptmax[3]);

      $('#input_facedetection_filter_max_width').val(rectsper[1].x2 - rectsper[1].x1);
      $('#input_facedetection_filter_max_height').val(rectsper[1].y2 - rectsper[1].y1);

      if (CurBrowserIsIE()) {
        if (null != g_activex_plugin) {
          var strpara = '' + rects[1].x1 + ',' + rects[1].y1 + ',' + String(rects[1].x2 - rects[1].x1) + ',' + String(rects[1].y2 - rects[1].y1) + ',' + rects[0].x1 + ',' + rects[0].y1 + ',' + String(rects[0].x2 - rects[0].x1) + ',' + String(rects[0].y2 - rects[0].y1) + ',0,0,0,0,0,0,0,0';
          g_activex_plugin.SetRectangePoints(strpara);
        }
      }
    }
  });
}
function fun_init_baseparameters() {
  $('#check_facedetection_frame').prop('checked', true);
  $('#check_facedetection_faceid').prop('checked', false);
  $('#check_facedetection_maskblink').prop('checked', false);
  $('#slider_facedct_confidence').slider('option', 'value', 65);
  $('#slider_mask_confidence').slider('option', 'value', 30);
  $('#input_facedetection_uploadinterval').val(250);
  $('#select_facedct_compress').val(1);
  $('#select_facedct_optimization').val(0);
  $('#check_fadecetection_faceratio').prop('checked', true);
  $('#slider_facedct_facezoom').slider('option', 'value', 4);
  $('#p_facedct_confidence_value').text(65);
  $('#p_facedct_facezoom_value').text('4X');
  $('#slider_facedct_keeptime').slider('option', 'value', 1);
  $('#slider_facedct_delaytime').slider('option', 'value', 5);
  $('#p_facedct_keeptieme_value').text('1');
  $('#p_facedct_delaytime_value').text('5');

  $('#div_facedetection_update').css('display', 'block');
  $('#div_facedetection_keep').css('display', 'none');
  $('#div_facedetection_delay').css('display', 'none');

  rects[0].x1 = Math.floor(48 * 6.4);
  rects[0].y1 = Math.floor(48 * 3.6);
  rects[0].x2 = Math.floor(51 * 6.4);
  rects[0].y2 = Math.floor(51 * 3.6);
  rectsper[0].x1 = parseInt(48);
  rectsper[0].y1 = parseInt(48);
  rectsper[0].x2 = parseInt(51);
  rectsper[0].y2 = parseInt(51);
  $('#input_facedetection_filter_min_width').val(rectsper[0].x2 - rectsper[0].x1);
  $('#input_facedetection_filter_min_height').val(rectsper[0].y2 - rectsper[0].y1);
  rects[1].x1 = Math.floor(5 * 6.4);
  rects[1].y1 = Math.floor(5 * 3.6);
  rects[1].x2 = Math.floor(90 * 6.4);
  rects[1].y2 = Math.floor(90 * 3.6);
  rectsper[1].x1 = parseInt(5);
  rectsper[1].y1 = parseInt(5);
  rectsper[1].x2 = parseInt(90);
  rectsper[1].y2 = parseInt(90);
  $('#input_facedetection_filter_max_width').val(rectsper[1].x2 - rectsper[1].x1);
  $('#input_facedetection_filter_max_height').val(rectsper[1].y2 - rectsper[1].y1);
}
function fun_save_baseparams() {
  var enable = $('#check_fadecetection_enable').prop('checked');
  var frame = $('#check_facedetection_frame').prop('checked');
  var faceid = $('#check_facedetection_faceid').prop('checked');
  var mask = $('#check_facedetection_maskblink').prop('checked');
  var confid = $('#slider_facedct_confidence').slider('option', 'value');
  var maskconfid = $('#slider_mask_confidence').slider('option', 'value');
  var compres = $('#select_facedct_compress').val();
  var pmode = $('#select_facedct_snapmode').val();
  var mode = $('#select_facedct_optimization').val();
  var update = $('#input_facedetection_uploadinterval').val();
  var zoom = $('#slider_facedct_facezoom').slider('option', 'value');
  var ratio = $('#check_fadecetection_faceratio').prop('checked') ? 1 : 0;
  var kptime = $('#slider_facedct_keeptime').slider('option', 'value');
  var dytime = $('#slider_facedct_delaytime').slider('option', 'value');
  var senable, sframe, sfaceid, smask;
  if (enable) {
    senable = 1;
  } else {
    senable = 0;
  }
  if (frame) {
    sframe = 1;
  } else {
    sframe = 0;
  }
  if (faceid) {
    sfaceid = 1;
  } else {
    sfaceid = 0;
  }
  if (mask) {
    smask = 1;
  } else {
    smask = 0;
  }
  var errstr = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
  if (!(update >= 250 && update <= 4000)) {
    parent.fun_show_tips_dialog(errstr, 0);
    return;
  }
  var sfacemax = null,
    sfacemin = null;
  sfacemax = String(rectsper[1].x1 + ',' + rectsper[1].y1 + ',' + rectsper[1].x2 + ',' + rectsper[1].y2);
  sfacemin = String(rectsper[0].x1 + ',' + rectsper[0].y1 + ',' + rectsper[0].x2 + ',' + rectsper[0].y2);
  if (rectsper[1].x2 - rectsper[1].x1 == 0 || rectsper[1].y2 - rectsper[1].y1 == 0) {
    parent.fun_show_tips_dialog(errstr, 0);
    return;
  }
  var tagxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<facedetect>' +
    '<enable>' +
    senable +
    '</enable>' +
    '<confidence>' +
    confid +
    '</confidence>' +
    '<maskconfd>' +
    maskconfid +
    '</maskconfd>' +
    '<fmin>' +
    sfacemin +
    '</fmin>' +
    '<fmax>' +
    sfacemax +
    '</fmax>' +
    '<pquality>' +
    parseInt(compres) +
    '</pquality>' +
    '<mode>' +
    mode +
    '</mode>' +
    '<update>' +
    update +
    '</update>' +
    '<ratio>' +
    ratio +
    '</ratio>' +
    '<zoom>' +
    zoom +
    '</zoom>' +
    '<keep>' +
    kptime +
    '</keep>' +
    '<delay>' +
    dytime +
    '</delay>' +
    '<show>' +
    '<border>' +
    sframe +
    '</border>' +
    '<id>' +
    sfaceid +
    '</id>' +
    '<mask>' +
    smask +
    '</mask>' +
    '</show>' +
    '</facedetect>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=facedetect', tagxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
    if (result == true) {
      parent.fun_show_tips_dialog(strsuc);
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}
var g_schedule_facedetection_painter;
var g_schedule_wearmask_painter;
var g_schedule_withoutmask_painter;
function fun_init_schedule_panel_show() {
  g_schedule_facedetection_painter = new normal_schedule('div_schedule_facedetection_panel', 720, 224);
  g_schedule_wearmask_painter = new normal_schedule('div_schedule_wearmask_panel', 720, 224);
  g_schedule_withoutmask_painter = new normal_schedule('div_schedule_withoutmask_panel', 720, 224);
}
var g_current_set_day_facedetection = 0;
var g_current_set_day_wearmask = 0;
var g_current_set_day_withoutmask = 0;
function fun_on_schedule_facedetection_setup(objid) {
  fun_show_facedetection_setup_dialog(true);
  if (objid == 'facedetection_button_schedule_sunday_setup') {
    document.getElementById('facedetection_check_weekday_sunday').checked = true;
    document.getElementById('facedetection_check_weekday_monday').checked = false;
    document.getElementById('facedetection_check_weekday_tuesday').checked = false;
    document.getElementById('facedetection_check_weekday_wednesday').checked = false;
    document.getElementById('facedetection_check_weekday_thursday').checked = false;
    document.getElementById('facedetection_check_weekday_friday').checked = false;
    document.getElementById('facedetection_check_weekday_saturday').checked = false;
    document.getElementById('facedetection_check_weekday_alldays').checked = false;
    $('#facedetection_div_weekday_sunday').addClass('cls_item_name_selected');
    $('#facedetection_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_facedetection = 7;
    fun_show_schedule_facedetection_timesection_inedit(g_current_set_day_facedetection - 1);
  } else if (objid == 'facedetection_button_schedule_monday_setup') {
    document.getElementById('facedetection_check_weekday_sunday').checked = false;
    document.getElementById('facedetection_check_weekday_monday').checked = true;
    document.getElementById('facedetection_check_weekday_tuesday').checked = false;
    document.getElementById('facedetection_check_weekday_wednesday').checked = false;
    document.getElementById('facedetection_check_weekday_thursday').checked = false;
    document.getElementById('facedetection_check_weekday_friday').checked = false;
    document.getElementById('facedetection_check_weekday_saturday').checked = false;
    document.getElementById('facedetection_check_weekday_alldays').checked = false;
    $('#facedetection_div_weekday_monday').addClass('cls_item_name_selected');
    $('#facedetection_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_facedetection = 1;
    fun_show_schedule_facedetection_timesection_inedit(g_current_set_day_facedetection - 1);
  } else if (objid == 'facedetection_button_schedule_tuesday_setup') {
    document.getElementById('facedetection_check_weekday_sunday').checked = false;
    document.getElementById('facedetection_check_weekday_monday').checked = false;
    document.getElementById('facedetection_check_weekday_tuesday').checked = true;
    document.getElementById('facedetection_check_weekday_wednesday').checked = false;
    document.getElementById('facedetection_check_weekday_thursday').checked = false;
    document.getElementById('facedetection_check_weekday_friday').checked = false;
    document.getElementById('facedetection_check_weekday_saturday').checked = false;
    document.getElementById('facedetection_check_weekday_alldays').checked = false;
    $('#facedetection_div_weekday_tuesday').addClass('cls_item_name_selected');
    $('#facedetection_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_facedetection = 2;
    fun_show_schedule_facedetection_timesection_inedit(g_current_set_day_facedetection - 1);
  } else if (objid == 'facedetection_button_schedule_wednesday_setup') {
    document.getElementById('facedetection_check_weekday_sunday').checked = false;
    document.getElementById('facedetection_check_weekday_monday').checked = false;
    document.getElementById('facedetection_check_weekday_tuesday').checked = false;
    document.getElementById('facedetection_check_weekday_wednesday').checked = true;
    document.getElementById('facedetection_check_weekday_thursday').checked = false;
    document.getElementById('facedetection_check_weekday_friday').checked = false;
    document.getElementById('facedetection_check_weekday_saturday').checked = false;
    document.getElementById('facedetection_check_weekday_alldays').checked = false;
    $('#facedetection_div_weekday_wednesday').addClass('cls_item_name_selected');
    $('#facedetection_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_facedetection = 3;
    fun_show_schedule_facedetection_timesection_inedit(g_current_set_day_facedetection - 1);
  } else if (objid == 'facedetection_button_schedule_thursday_setup') {
    document.getElementById('facedetection_check_weekday_sunday').checked = false;
    document.getElementById('facedetection_check_weekday_monday').checked = false;
    document.getElementById('facedetection_check_weekday_tuesday').checked = false;
    document.getElementById('facedetection_check_weekday_wednesday').checked = false;
    document.getElementById('facedetection_check_weekday_thursday').checked = true;
    document.getElementById('facedetection_check_weekday_friday').checked = false;
    document.getElementById('facedetection_check_weekday_saturday').checked = false;
    document.getElementById('facedetection_check_weekday_alldays').checked = false;
    $('#facedetection_div_weekday_thursday').addClass('cls_item_name_selected');
    $('#facedetection_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_mondayday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_facedetection = 4;
    fun_show_schedule_facedetection_timesection_inedit(g_current_set_day_facedetection - 1);
  } else if (objid == 'facedetection_button_schedule_friday_setup') {
    document.getElementById('facedetection_check_weekday_sunday').checked = false;
    document.getElementById('facedetection_check_weekday_monday').checked = false;
    document.getElementById('facedetection_check_weekday_tuesday').checked = false;
    document.getElementById('facedetection_check_weekday_wednesday').checked = false;
    document.getElementById('facedetection_check_weekday_thursday').checked = false;
    document.getElementById('facedetection_check_weekday_friday').checked = true;
    document.getElementById('facedetection_check_weekday_saturday').checked = false;
    document.getElementById('facedetection_check_weekday_alldays').checked = false;
    $('#facedetection_div_weekday_friday').addClass('cls_item_name_selected');
    $('#facedetection_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_facedetection = 5;
    fun_show_schedule_facedetection_timesection_inedit(g_current_set_day_facedetection - 1);
  } else if (objid == 'facedetection_button_schedule_saturday_setup') {
    document.getElementById('facedetection_check_weekday_sunday').checked = false;
    document.getElementById('facedetection_check_weekday_monday').checked = false;
    document.getElementById('facedetection_check_weekday_tuesday').checked = false;
    document.getElementById('facedetection_check_weekday_wednesday').checked = false;
    document.getElementById('facedetection_check_weekday_thursday').checked = false;
    document.getElementById('facedetection_check_weekday_friday').checked = false;
    document.getElementById('facedetection_check_weekday_saturday').checked = true;
    document.getElementById('facedetection_check_weekday_alldays').checked = false;
    $('#facedetection_div_weekday_saturday').addClass('cls_item_name_selected');
    $('#facedetection_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#facedetection_div_weekday_sunday').removeClass('cls_item_name_selected');
    g_current_set_day_facedetection = 6;
    fun_show_schedule_facedetection_timesection_inedit(g_current_set_day_facedetection - 1);
  }
}
function fun_on_schedule_wearmask_setup(objid) {
  fun_show_wearmask_setup_dialog(true);
  if (objid == 'wearmask_button_schedule_sunday_setup') {
    document.getElementById('wearmask_check_weekday_sunday').checked = true;
    document.getElementById('wearmask_check_weekday_monday').checked = false;
    document.getElementById('wearmask_check_weekday_tuesday').checked = false;
    document.getElementById('wearmask_check_weekday_wednesday').checked = false;
    document.getElementById('wearmask_check_weekday_thursday').checked = false;
    document.getElementById('wearmask_check_weekday_friday').checked = false;
    document.getElementById('wearmask_check_weekday_saturday').checked = false;
    document.getElementById('wearmask_check_weekday_alldays').checked = false;
    $('#wearmask_div_weekday_sunday').addClass('cls_item_name_selected');
    $('#wearmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_wearmask = 7;
    fun_show_schedule_wearmask_timesection_inedit(g_current_set_day_wearmask - 1);
  } else if (objid == 'wearmask_button_schedule_monday_setup') {
    document.getElementById('wearmask_check_weekday_sunday').checked = false;
    document.getElementById('wearmask_check_weekday_monday').checked = true;
    document.getElementById('wearmask_check_weekday_tuesday').checked = false;
    document.getElementById('wearmask_check_weekday_wednesday').checked = false;
    document.getElementById('wearmask_check_weekday_thursday').checked = false;
    document.getElementById('wearmask_check_weekday_friday').checked = false;
    document.getElementById('wearmask_check_weekday_saturday').checked = false;
    document.getElementById('wearmask_check_weekday_alldays').checked = false;
    $('#wearmask_div_weekday_monday').addClass('cls_item_name_selected');
    $('#wearmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_wearmask = 1;
    fun_show_schedule_wearmask_timesection_inedit(g_current_set_day_wearmask - 1);
  } else if (objid == 'wearmask_button_schedule_tuesday_setup') {
    document.getElementById('wearmask_check_weekday_sunday').checked = false;
    document.getElementById('wearmask_check_weekday_monday').checked = false;
    document.getElementById('wearmask_check_weekday_tuesday').checked = true;
    document.getElementById('wearmask_check_weekday_wednesday').checked = false;
    document.getElementById('wearmask_check_weekday_thursday').checked = false;
    document.getElementById('wearmask_check_weekday_friday').checked = false;
    document.getElementById('wearmask_check_weekday_saturday').checked = false;
    document.getElementById('wearmask_check_weekday_alldays').checked = false;
    $('#wearmask_div_weekday_tuesday').addClass('cls_item_name_selected');
    $('#wearmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_wearmask = 2;
    fun_show_schedule_wearmask_timesection_inedit(g_current_set_day_wearmask - 1);
  } else if (objid == 'wearmask_button_schedule_wednesday_setup') {
    document.getElementById('wearmask_check_weekday_sunday').checked = false;
    document.getElementById('wearmask_check_weekday_monday').checked = false;
    document.getElementById('wearmask_check_weekday_tuesday').checked = false;
    document.getElementById('wearmask_check_weekday_wednesday').checked = true;
    document.getElementById('wearmask_check_weekday_thursday').checked = false;
    document.getElementById('wearmask_check_weekday_friday').checked = false;
    document.getElementById('wearmask_check_weekday_saturday').checked = false;
    document.getElementById('wearmask_check_weekday_alldays').checked = false;
    $('#wearmask_div_weekday_wednesday').addClass('cls_item_name_selected');
    $('#wearmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_wearmask = 3;
    fun_show_schedule_wearmask_timesection_inedit(g_current_set_day_wearmask - 1);
  } else if (objid == 'wearmask_button_schedule_thursday_setup') {
    document.getElementById('wearmask_check_weekday_sunday').checked = false;
    document.getElementById('wearmask_check_weekday_monday').checked = false;
    document.getElementById('wearmask_check_weekday_tuesday').checked = false;
    document.getElementById('wearmask_check_weekday_wednesday').checked = false;
    document.getElementById('wearmask_check_weekday_thursday').checked = true;
    document.getElementById('wearmask_check_weekday_friday').checked = false;
    document.getElementById('wearmask_check_weekday_saturday').checked = false;
    document.getElementById('wearmask_check_weekday_alldays').checked = false;
    $('#wearmask_div_weekday_thursday').addClass('cls_item_name_selected');
    $('#wearmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_mondayday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_wearmask = 4;
    fun_show_schedule_wearmask_timesection_inedit(g_current_set_day_wearmask - 1);
  } else if (objid == 'wearmask_button_schedule_friday_setup') {
    document.getElementById('wearmask_check_weekday_sunday').checked = false;
    document.getElementById('wearmask_check_weekday_monday').checked = false;
    document.getElementById('wearmask_check_weekday_tuesday').checked = false;
    document.getElementById('wearmask_check_weekday_wednesday').checked = false;
    document.getElementById('wearmask_check_weekday_thursday').checked = false;
    document.getElementById('wearmask_check_weekday_friday').checked = true;
    document.getElementById('wearmask_check_weekday_saturday').checked = false;
    document.getElementById('wearmask_check_weekday_alldays').checked = false;
    $('#wearmask_div_weekday_friday').addClass('cls_item_name_selected');
    $('#wearmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_wearmask = 5;
    fun_show_schedule_wearmask_timesection_inedit(g_current_set_day_wearmask - 1);
  } else if (objid == 'wearmask_button_schedule_saturday_setup') {
    document.getElementById('wearmask_check_weekday_sunday').checked = false;
    document.getElementById('wearmask_check_weekday_monday').checked = false;
    document.getElementById('wearmask_check_weekday_tuesday').checked = false;
    document.getElementById('wearmask_check_weekday_wednesday').checked = false;
    document.getElementById('wearmask_check_weekday_thursday').checked = false;
    document.getElementById('wearmask_check_weekday_friday').checked = false;
    document.getElementById('wearmask_check_weekday_saturday').checked = true;
    document.getElementById('wearmask_check_weekday_alldays').checked = false;
    $('#wearmask_div_weekday_saturday').addClass('cls_item_name_selected');
    $('#wearmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#wearmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    g_current_set_day_wearmask = 6;
    fun_show_schedule_wearmask_timesection_inedit(g_current_set_day_wearmask - 1);
  }
}
function fun_on_schedule_withoutmask_setup(objid) {
  fun_show_withoutmask_setup_dialog(true);
  if (objid == 'withoutmask_button_schedule_sunday_setup') {
    document.getElementById('withoutmask_check_weekday_sunday').checked = true;
    document.getElementById('withoutmask_check_weekday_monday').checked = false;
    document.getElementById('withoutmask_check_weekday_tuesday').checked = false;
    document.getElementById('withoutmask_check_weekday_wednesday').checked = false;
    document.getElementById('withoutmask_check_weekday_thursday').checked = false;
    document.getElementById('withoutmask_check_weekday_friday').checked = false;
    document.getElementById('withoutmask_check_weekday_saturday').checked = false;
    document.getElementById('withoutmask_check_weekday_alldays').checked = false;
    $('#withoutmask_div_weekday_sunday').addClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_withoutmask = 7;
    fun_show_schedule_withoutmask_timesection_inedit(g_current_set_day_withoutmask - 1);
  } else if (objid == 'withoutmask_button_schedule_monday_setup') {
    document.getElementById('withoutmask_check_weekday_sunday').checked = false;
    document.getElementById('withoutmask_check_weekday_monday').checked = true;
    document.getElementById('withoutmask_check_weekday_tuesday').checked = false;
    document.getElementById('withoutmask_check_weekday_wednesday').checked = false;
    document.getElementById('withoutmask_check_weekday_thursday').checked = false;
    document.getElementById('withoutmask_check_weekday_friday').checked = false;
    document.getElementById('withoutmask_check_weekday_saturday').checked = false;
    document.getElementById('withoutmask_check_weekday_alldays').checked = false;
    $('#withoutmask_div_weekday_monday').addClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_withoutmask = 1;
    fun_show_schedule_withoutmask_timesection_inedit(g_current_set_day_withoutmask - 1);
  } else if (objid == 'withoutmask_button_schedule_tuesday_setup') {
    document.getElementById('withoutmask_check_weekday_sunday').checked = false;
    document.getElementById('withoutmask_check_weekday_monday').checked = false;
    document.getElementById('withoutmask_check_weekday_tuesday').checked = true;
    document.getElementById('withoutmask_check_weekday_wednesday').checked = false;
    document.getElementById('withoutmask_check_weekday_thursday').checked = false;
    document.getElementById('withoutmask_check_weekday_friday').checked = false;
    document.getElementById('withoutmask_check_weekday_saturday').checked = false;
    document.getElementById('withoutmask_check_weekday_alldays').checked = false;
    $('#withoutmask_div_weekday_tuesday').addClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_withoutmask = 2;
    fun_show_schedule_withoutmask_timesection_inedit(g_current_set_day_withoutmask - 1);
  } else if (objid == 'withoutmask_button_schedule_wednesday_setup') {
    document.getElementById('withoutmask_check_weekday_sunday').checked = false;
    document.getElementById('withoutmask_check_weekday_monday').checked = false;
    document.getElementById('withoutmask_check_weekday_tuesday').checked = false;
    document.getElementById('withoutmask_check_weekday_wednesday').checked = true;
    document.getElementById('withoutmask_check_weekday_thursday').checked = false;
    document.getElementById('withoutmask_check_weekday_friday').checked = false;
    document.getElementById('withoutmask_check_weekday_saturday').checked = false;
    document.getElementById('withoutmask_check_weekday_alldays').checked = false;
    $('#withoutmask_div_weekday_wednesday').addClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_withoutmask = 3;
    fun_show_schedule_withoutmask_timesection_inedit(g_current_set_day_withoutmask - 1);
  } else if (objid == 'withoutmask_button_schedule_thursday_setup') {
    document.getElementById('withoutmask_check_weekday_sunday').checked = false;
    document.getElementById('withoutmask_check_weekday_monday').checked = false;
    document.getElementById('withoutmask_check_weekday_tuesday').checked = false;
    document.getElementById('withoutmask_check_weekday_wednesday').checked = false;
    document.getElementById('withoutmask_check_weekday_thursday').checked = true;
    document.getElementById('withoutmask_check_weekday_friday').checked = false;
    document.getElementById('withoutmask_check_weekday_saturday').checked = false;
    document.getElementById('withoutmask_check_weekday_alldays').checked = false;
    $('#withoutmask_div_weekday_thursday').addClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_mondayday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_withoutmask = 4;
    fun_show_schedule_withoutmask_timesection_inedit(g_current_set_day_withoutmask - 1);
  } else if (objid == 'withoutmask_button_schedule_friday_setup') {
    document.getElementById('withoutmask_check_weekday_sunday').checked = false;
    document.getElementById('withoutmask_check_weekday_monday').checked = false;
    document.getElementById('withoutmask_check_weekday_tuesday').checked = false;
    document.getElementById('withoutmask_check_weekday_wednesday').checked = false;
    document.getElementById('withoutmask_check_weekday_thursday').checked = false;
    document.getElementById('withoutmask_check_weekday_friday').checked = true;
    document.getElementById('withoutmask_check_weekday_saturday').checked = false;
    document.getElementById('withoutmask_check_weekday_alldays').checked = false;
    $('#withoutmask_div_weekday_friday').addClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day_withoutmask = 5;
    fun_show_schedule_withoutmask_timesection_inedit(g_current_set_day_withoutmask - 1);
  } else if (objid == 'withoutmask_button_schedule_saturday_setup') {
    document.getElementById('withoutmask_check_weekday_sunday').checked = false;
    document.getElementById('withoutmask_check_weekday_monday').checked = false;
    document.getElementById('withoutmask_check_weekday_tuesday').checked = false;
    document.getElementById('withoutmask_check_weekday_wednesday').checked = false;
    document.getElementById('withoutmask_check_weekday_thursday').checked = false;
    document.getElementById('withoutmask_check_weekday_friday').checked = false;
    document.getElementById('withoutmask_check_weekday_saturday').checked = true;
    document.getElementById('withoutmask_check_weekday_alldays').checked = false;
    $('#withoutmask_div_weekday_saturday').addClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_monday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_friday').removeClass('cls_item_name_selected');
    $('#withoutmask_div_weekday_sunday').removeClass('cls_item_name_selected');
    g_current_set_day_withoutmask = 6;
    fun_show_schedule_withoutmask_timesection_inedit(g_current_set_day_withoutmask - 1);
  }
}
var real_schedule_facedetection_timesection = [];
var real_schedule_wearmask_timesection = [];
var real_schedule_withoutmask_timesection = [];
var schedule_facedetection_mask = 0;
var schedule_wearmask_mask = 0;
var schedule_withoutmask_mask = 0;
function real_time_section(start, end) {
  this.start = start;
  this.end = end;
  return this;
}
function real_weekday_timesection(sec1, sec2, sec3, sec4, sec5, sec6) {
  this.tsection1 = sec1;
  this.tsection2 = sec2;
  this.tsection3 = sec3;
  this.tsection4 = sec4;
  this.tsection5 = sec5;
  this.tsection6 = sec6;
  return this;
}
function fun_show_schedule_facedetection_timesection_inedit(index) {
  if (index >= 0 && index < 7) {
    var timesec1start = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection1.start);
    var timesec1end = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection1.end);
    var timesec2start = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection2.start);
    var timesec2end = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection2.end);
    var timesec3start = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection3.start);
    var timesec3end = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection3.end);
    var timesec4start = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection4.start);
    var timesec4end = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection4.end);
    var timesec5start = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection5.start);
    var timesec5end = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection5.end);
    var timesec6start = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection6.start);
    var timesec6end = fun_convert_timestdfmt(real_schedule_facedetection_timesection[index].tsection6.end);
    timereidt('facedetection_timeredit_one_start').setvalue(timesec1start);
    timereidt('facedetection_timeredit_one_end').setvalue(timesec1end);
    timereidt('facedetection_timeredit_two_start').setvalue(timesec2start);
    timereidt('facedetection_timeredit_two_end').setvalue(timesec2end);
    timereidt('facedetection_timeredit_three_start').setvalue(timesec3start);
    timereidt('facedetection_timeredit_three_end').setvalue(timesec3end);
    timereidt('facedetection_timeredit_four_start').setvalue(timesec4start);
    timereidt('facedetection_timeredit_four_end').setvalue(timesec4end);
    timereidt('facedetection_timeredit_five_start').setvalue(timesec5start);
    timereidt('facedetection_timeredit_five_end').setvalue(timesec5end);
    timereidt('facedetection_timeredit_six_start').setvalue(timesec6start);
    timereidt('facedetection_timeredit_six_end').setvalue(timesec6end);
  }
}
function fun_show_schedule_wearmask_timesection_inedit(index) {
  if (index >= 0 && index < 7) {
    var timesec1start = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection1.start);
    var timesec1end = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection1.end);
    var timesec2start = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection2.start);
    var timesec2end = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection2.end);
    var timesec3start = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection3.start);
    var timesec3end = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection3.end);
    var timesec4start = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection4.start);
    var timesec4end = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection4.end);
    var timesec5start = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection5.start);
    var timesec5end = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection5.end);
    var timesec6start = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection6.start);
    var timesec6end = fun_convert_timestdfmt(real_schedule_wearmask_timesection[index].tsection6.end);
    timereidt('wearmask_timeredit_one_start').setvalue(timesec1start);
    timereidt('wearmask_timeredit_one_end').setvalue(timesec1end);
    timereidt('wearmask_timeredit_two_start').setvalue(timesec2start);
    timereidt('wearmask_timeredit_two_end').setvalue(timesec2end);
    timereidt('wearmask_timeredit_three_start').setvalue(timesec3start);
    timereidt('wearmask_timeredit_three_end').setvalue(timesec3end);
    timereidt('wearmask_timeredit_four_start').setvalue(timesec4start);
    timereidt('wearmask_timeredit_four_end').setvalue(timesec4end);
    timereidt('wearmask_timeredit_five_start').setvalue(timesec5start);
    timereidt('wearmask_timeredit_five_end').setvalue(timesec5end);
    timereidt('wearmask_timeredit_six_start').setvalue(timesec6start);
    timereidt('wearmask_timeredit_six_end').setvalue(timesec6end);
  }
}
function fun_show_schedule_withoutmask_timesection_inedit(index) {
  if (index >= 0 && index < 7) {
    var timesec1start = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection1.start);
    var timesec1end = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection1.end);
    var timesec2start = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection2.start);
    var timesec2end = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection2.end);
    var timesec3start = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection3.start);
    var timesec3end = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection3.end);
    var timesec4start = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection4.start);
    var timesec4end = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection4.end);
    var timesec5start = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection5.start);
    var timesec5end = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection5.end);
    var timesec6start = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection6.start);
    var timesec6end = fun_convert_timestdfmt(real_schedule_withoutmask_timesection[index].tsection6.end);
    timereidt('withoutmask_timeredit_one_start').setvalue(timesec1start);
    timereidt('withoutmask_timeredit_one_end').setvalue(timesec1end);
    timereidt('withoutmask_timeredit_two_start').setvalue(timesec2start);
    timereidt('withoutmask_timeredit_two_end').setvalue(timesec2end);
    timereidt('withoutmask_timeredit_three_start').setvalue(timesec3start);
    timereidt('withoutmask_timeredit_three_end').setvalue(timesec3end);
    timereidt('withoutmask_timeredit_four_start').setvalue(timesec4start);
    timereidt('withoutmask_timeredit_four_end').setvalue(timesec4end);
    timereidt('withoutmask_timeredit_five_start').setvalue(timesec5start);
    timereidt('withoutmask_timeredit_five_end').setvalue(timesec5end);
    timereidt('withoutmask_timeredit_six_start').setvalue(timesec6start);
    timereidt('withoutmask_timeredit_six_end').setvalue(timesec6end);
  }
}
function fun_on_schedule_mode_facedetection_change(objid) {
  if (objid == 'radio_schedule_facedetection_disable') {
    $('#div_schedule_facedetection_manual').css('display', 'none');
  } else if (objid == 'radio_schedule_facedetection_enable') {
    $('#div_schedule_facedetection_manual').css('display', 'block');
  } else if (objid == 'radio_schedule_facedetection_alldays') {
    $('#div_schedule_facedetection_manual').css('display', 'none');
  }
}
function fun_on_schedule_mode_wearmask_change(objid) {
  if (objid == 'radio_schedule_wearmask_disable') {
    $('#div_schedule_wearmask_manual').css('display', 'none');
  } else if (objid == 'radio_schedule_wearmask_enable') {
    $('#div_schedule_wearmask_manual').css('display', 'block');
  } else if (objid == 'radio_schedule_wearmask_alldays') {
    $('#div_schedule_wearmask_manual').css('display', 'none');
  }
}
function fun_on_schedule_mode_withoutmask_change(objid) {
  if (objid == 'radio_schedule_withoutmask_disable') {
    $('#div_schedule_withoutmask_manual').css('display', 'none');
  } else if (objid == 'radio_schedule_withoutmask_enable') {
    $('#div_schedule_withoutmask_manual').css('display', 'block');
  } else if (objid == 'radio_schedule_withoutmask_alldays') {
    $('#div_schedule_withoutmask_manual').css('display', 'none');
  }
}
function fun_convert_timestring(strtime) {
  var timearr = strtime.split(':');
  return parseInt(timearr[0]) * 3600 + parseInt(timearr[1]) * 60 + parseInt(timearr[2]);
}
function fun_convert_timestdfmt(ntime) {
  var hour = parseInt(ntime / 3600);
  var minute = parseInt((ntime % 3600) / 60);
  var second = parseInt(ntime % 60);
  var strhour, strminute, strsecond;
  if (hour > 9) {
    strhour = String(hour);
  } else {
    strhour = '0' + String(hour);
  }
  if (minute > 9) {
    strminute = String(minute);
  } else {
    strminute = '0' + String(minute);
  }
  if (second > 9) {
    strsecond = String(second);
  } else {
    strsecond = '0' + String(second);
  }
  return strhour + ':' + strminute + ':' + strsecond;
}
function fun_convert_serverfmt(start, end) {
  return String(start) + '-' + String(end);
}
function fun_on_schedule_buttons(objid) {
  if (objid == 'facedetection_button_schedule_timesection_save' || objid == 'withoutmask_button_schedule_timesection_save' || objid == 'wearmask_button_schedule_timesection_save') {
    if (objid == 'facedetection_button_schedule_timesection_save') {
      var sundayenable = document.getElementById('facedetection_check_weekday_sunday').checked;
      var mondayenable = document.getElementById('facedetection_check_weekday_monday').checked;
      var tuesdayenable = document.getElementById('facedetection_check_weekday_tuesday').checked;
      var wednesdayenable = document.getElementById('facedetection_check_weekday_wednesday').checked;
      var thursdayenable = document.getElementById('facedetection_check_weekday_thursday').checked;
      var fridayenable = document.getElementById('facedetection_check_weekday_friday').checked;
      var saturdayenable = document.getElementById('facedetection_check_weekday_saturday').checked;
      var enable1 = true;
      var enable2 = true;
      var enable3 = true;
      var enable4 = true;
      var enable5 = true;
      var enable6 = true;
      var sec1start = timereidt('facedetection_timeredit_one_start').getvalue();
      var sec1end = timereidt('facedetection_timeredit_one_end').getvalue();
      var sec2start = timereidt('facedetection_timeredit_two_start').getvalue();
      var sec2end = timereidt('facedetection_timeredit_two_end').getvalue();
      var sec3start = timereidt('facedetection_timeredit_three_start').getvalue();
      var sec3end = timereidt('facedetection_timeredit_three_end').getvalue();
      var sec4start = timereidt('facedetection_timeredit_four_start').getvalue();
      var sec4end = timereidt('facedetection_timeredit_four_end').getvalue();
      var sec5start = timereidt('facedetection_timeredit_five_start').getvalue();
      var sec5end = timereidt('facedetection_timeredit_five_end').getvalue();
      var sec6start = timereidt('facedetection_timeredit_six_start').getvalue();
      var sec6end = timereidt('facedetection_timeredit_six_end').getvalue();
      var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      if (fun_compare_sande(sec1start, sec1end) || fun_compare_sande(sec2start, sec2end) || fun_compare_sande(sec3start, sec3end) || fun_compare_sande(sec4start, sec4end) || fun_compare_sande(sec5start, sec5end) || fun_compare_sande(sec6start, sec6end)) {
        parent.fun_show_tips_dialog(gtips_input, 0);
        return;
      }
      if (sundayenable) {
        if (enable1) {
          real_schedule_facedetection_timesection[6].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_facedetection_timesection[6].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_facedetection_painter.setSection(0, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_facedetection_timesection[6].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_facedetection_timesection[6].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_facedetection_painter.setSection(0, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_facedetection_timesection[6].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_facedetection_timesection[6].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_facedetection_painter.setSection(0, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_facedetection_timesection[6].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_facedetection_timesection[6].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_facedetection_painter.setSection(0, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_facedetection_timesection[6].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_facedetection_timesection[6].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_facedetection_painter.setSection(0, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_facedetection_timesection[6].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_facedetection_timesection[6].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_facedetection_painter.setSection(0, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (mondayenable) {
        if (enable1) {
          real_schedule_facedetection_timesection[0].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_facedetection_timesection[0].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_facedetection_painter.setSection(1, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_facedetection_timesection[0].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_facedetection_timesection[0].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_facedetection_painter.setSection(1, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_facedetection_timesection[0].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_facedetection_timesection[0].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_facedetection_painter.setSection(1, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_facedetection_timesection[0].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_facedetection_timesection[0].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_facedetection_painter.setSection(1, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_facedetection_timesection[0].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_facedetection_timesection[0].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_facedetection_painter.setSection(1, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_facedetection_timesection[0].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_facedetection_timesection[0].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_facedetection_painter.setSection(1, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (tuesdayenable) {
        if (enable1) {
          real_schedule_facedetection_timesection[1].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_facedetection_timesection[1].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_facedetection_painter.setSection(2, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_facedetection_timesection[1].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_facedetection_timesection[1].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_facedetection_painter.setSection(2, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_facedetection_timesection[1].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_facedetection_timesection[1].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_facedetection_painter.setSection(2, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_facedetection_timesection[1].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_facedetection_timesection[1].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_facedetection_painter.setSection(2, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_facedetection_timesection[1].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_facedetection_timesection[1].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_facedetection_painter.setSection(2, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_facedetection_timesection[1].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_facedetection_timesection[1].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_facedetection_painter.setSection(2, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (wednesdayenable) {
        if (enable1) {
          real_schedule_facedetection_timesection[2].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_facedetection_timesection[2].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_facedetection_painter.setSection(3, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_facedetection_timesection[2].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_facedetection_timesection[2].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_facedetection_painter.setSection(3, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_facedetection_timesection[2].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_facedetection_timesection[2].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_facedetection_painter.setSection(3, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_facedetection_timesection[2].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_facedetection_timesection[2].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_facedetection_painter.setSection(3, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_facedetection_timesection[2].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_facedetection_timesection[2].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_facedetection_painter.setSection(3, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_facedetection_timesection[2].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_facedetection_timesection[2].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_facedetection_painter.setSection(3, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (thursdayenable) {
        if (enable1) {
          real_schedule_facedetection_timesection[3].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_facedetection_timesection[3].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_facedetection_painter.setSection(4, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_facedetection_timesection[3].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_facedetection_timesection[3].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_facedetection_painter.setSection(4, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_facedetection_timesection[3].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_facedetection_timesection[3].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_facedetection_painter.setSection(4, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_facedetection_timesection[3].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_facedetection_timesection[3].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_facedetection_painter.setSection(4, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_facedetection_timesection[3].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_facedetection_timesection[3].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_facedetection_painter.setSection(4, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_facedetection_timesection[3].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_facedetection_timesection[3].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_facedetection_painter.setSection(4, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (fridayenable) {
        if (enable1) {
          real_schedule_facedetection_timesection[4].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_facedetection_timesection[4].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_facedetection_painter.setSection(5, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_facedetection_timesection[4].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_facedetection_timesection[4].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_facedetection_painter.setSection(5, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_facedetection_timesection[4].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_facedetection_timesection[4].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_facedetection_painter.setSection(5, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_facedetection_timesection[4].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_facedetection_timesection[4].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_facedetection_painter.setSection(5, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_facedetection_timesection[4].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_facedetection_timesection[4].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_facedetection_painter.setSection(5, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_facedetection_timesection[4].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_facedetection_timesection[4].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_facedetection_painter.setSection(5, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (saturdayenable) {
        if (enable1) {
          real_schedule_facedetection_timesection[5].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_facedetection_timesection[5].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_facedetection_painter.setSection(6, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_facedetection_timesection[5].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_facedetection_timesection[5].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_facedetection_painter.setSection(6, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_facedetection_timesection[5].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_facedetection_timesection[5].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_facedetection_painter.setSection(6, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_facedetection_timesection[5].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_facedetection_timesection[5].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_facedetection_painter.setSection(6, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_facedetection_timesection[5].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_facedetection_timesection[5].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_facedetection_painter.setSection(6, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_facedetection_timesection[5].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_facedetection_timesection[5].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_facedetection_painter.setSection(6, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      fun_show_facedetection_setup_dialog(false);
    } else if (objid == 'wearmask_button_schedule_timesection_save') {
      var sundayenable = document.getElementById('wearmask_check_weekday_sunday').checked;
      var mondayenable = document.getElementById('wearmask_check_weekday_monday').checked;
      var tuesdayenable = document.getElementById('wearmask_check_weekday_tuesday').checked;
      var wednesdayenable = document.getElementById('wearmask_check_weekday_wednesday').checked;
      var thursdayenable = document.getElementById('wearmask_check_weekday_thursday').checked;
      var fridayenable = document.getElementById('wearmask_check_weekday_friday').checked;
      var saturdayenable = document.getElementById('wearmask_check_weekday_saturday').checked;
      var enable1 = true;
      var enable2 = true;
      var enable3 = true;
      var enable4 = true;
      var enable5 = true;
      var enable6 = true;
      var sec1start = timereidt('wearmask_timeredit_one_start').getvalue();
      var sec1end = timereidt('wearmask_timeredit_one_end').getvalue();
      var sec2start = timereidt('wearmask_timeredit_two_start').getvalue();
      var sec2end = timereidt('wearmask_timeredit_two_end').getvalue();
      var sec3start = timereidt('wearmask_timeredit_three_start').getvalue();
      var sec3end = timereidt('wearmask_timeredit_three_end').getvalue();
      var sec4start = timereidt('wearmask_timeredit_four_start').getvalue();
      var sec4end = timereidt('wearmask_timeredit_four_end').getvalue();
      var sec5start = timereidt('wearmask_timeredit_five_start').getvalue();
      var sec5end = timereidt('wearmask_timeredit_five_end').getvalue();
      var sec6start = timereidt('wearmask_timeredit_six_start').getvalue();
      var sec6end = timereidt('wearmask_timeredit_six_end').getvalue();
      var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      if (fun_compare_sande(sec1start, sec1end) || fun_compare_sande(sec2start, sec2end) || fun_compare_sande(sec3start, sec3end) || fun_compare_sande(sec4start, sec4end) || fun_compare_sande(sec5start, sec5end) || fun_compare_sande(sec6start, sec6end)) {
        parent.fun_show_tips_dialog(gtips_input, 0);
        return;
      }
      if (sundayenable) {
        if (enable1) {
          real_schedule_wearmask_timesection[6].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_wearmask_timesection[6].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_wearmask_painter.setSection(0, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_wearmask_timesection[6].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_wearmask_timesection[6].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_wearmask_painter.setSection(0, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_wearmask_timesection[6].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_wearmask_timesection[6].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_wearmask_painter.setSection(0, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_wearmask_timesection[6].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_wearmask_timesection[6].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_wearmask_painter.setSection(0, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_wearmask_timesection[6].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_wearmask_timesection[6].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_wearmask_painter.setSection(0, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_wearmask_timesection[6].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_wearmask_timesection[6].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_wearmask_painter.setSection(0, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (mondayenable) {
        if (enable1) {
          real_schedule_wearmask_timesection[0].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_wearmask_timesection[0].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_wearmask_painter.setSection(1, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_wearmask_timesection[0].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_wearmask_timesection[0].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_wearmask_painter.setSection(1, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_wearmask_timesection[0].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_wearmask_timesection[0].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_wearmask_painter.setSection(1, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_wearmask_timesection[0].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_wearmask_timesection[0].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_wearmask_painter.setSection(1, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_wearmask_timesection[0].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_wearmask_timesection[0].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_wearmask_painter.setSection(1, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_wearmask_timesection[0].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_wearmask_timesection[0].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_wearmask_painter.setSection(1, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (tuesdayenable) {
        if (enable1) {
          real_schedule_wearmask_timesection[1].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_wearmask_timesection[1].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_wearmask_painter.setSection(2, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_wearmask_timesection[1].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_wearmask_timesection[1].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_wearmask_painter.setSection(2, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_wearmask_timesection[1].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_wearmask_timesection[1].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_wearmask_painter.setSection(2, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_wearmask_timesection[1].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_wearmask_timesection[1].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_wearmask_painter.setSection(2, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_wearmask_timesection[1].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_wearmask_timesection[1].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_wearmask_painter.setSection(2, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_wearmask_timesection[1].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_wearmask_timesection[1].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_wearmask_painter.setSection(2, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (wednesdayenable) {
        if (enable1) {
          real_schedule_wearmask_timesection[2].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_wearmask_timesection[2].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_wearmask_painter.setSection(3, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_wearmask_timesection[2].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_wearmask_timesection[2].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_wearmask_painter.setSection(3, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_wearmask_timesection[2].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_wearmask_timesection[2].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_wearmask_painter.setSection(3, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_wearmask_timesection[2].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_wearmask_timesection[2].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_wearmask_painter.setSection(3, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_wearmask_timesection[2].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_wearmask_timesection[2].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_wearmask_painter.setSection(3, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_wearmask_timesection[2].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_wearmask_timesection[2].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_wearmask_painter.setSection(3, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (thursdayenable) {
        if (enable1) {
          real_schedule_wearmask_timesection[3].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_wearmask_timesection[3].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_wearmask_painter.setSection(4, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_wearmask_timesection[3].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_wearmask_timesection[3].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_wearmask_painter.setSection(4, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_wearmask_timesection[3].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_wearmask_timesection[3].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_wearmask_painter.setSection(4, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_wearmask_timesection[3].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_wearmask_timesection[3].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_wearmask_painter.setSection(4, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_wearmask_timesection[3].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_wearmask_timesection[3].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_wearmask_painter.setSection(4, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_wearmask_timesection[3].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_wearmask_timesection[3].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_wearmask_painter.setSection(4, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (fridayenable) {
        if (enable1) {
          real_schedule_wearmask_timesection[4].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_wearmask_timesection[4].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_wearmask_painter.setSection(5, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_wearmask_timesection[4].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_wearmask_timesection[4].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_wearmask_painter.setSection(5, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_wearmask_timesection[4].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_wearmask_timesection[4].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_wearmask_painter.setSection(5, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_wearmask_timesection[4].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_wearmask_timesection[4].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_wearmask_painter.setSection(5, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_wearmask_timesection[4].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_wearmask_timesection[4].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_wearmask_painter.setSection(5, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_wearmask_timesection[4].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_wearmask_timesection[4].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_wearmask_painter.setSection(5, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (saturdayenable) {
        if (enable1) {
          real_schedule_wearmask_timesection[5].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_wearmask_timesection[5].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_wearmask_painter.setSection(6, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_wearmask_timesection[5].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_wearmask_timesection[5].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_wearmask_painter.setSection(6, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_wearmask_timesection[5].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_wearmask_timesection[5].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_wearmask_painter.setSection(6, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_wearmask_timesection[5].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_wearmask_timesection[5].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_wearmask_painter.setSection(6, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_wearmask_timesection[5].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_wearmask_timesection[5].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_wearmask_painter.setSection(6, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_wearmask_timesection[5].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_wearmask_timesection[5].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_wearmask_painter.setSection(6, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      fun_show_wearmask_setup_dialog(false);
    } else if (objid == 'withoutmask_button_schedule_timesection_save') {
      var sundayenable = document.getElementById('withoutmask_check_weekday_sunday').checked;
      var mondayenable = document.getElementById('withoutmask_check_weekday_monday').checked;
      var tuesdayenable = document.getElementById('withoutmask_check_weekday_tuesday').checked;
      var wednesdayenable = document.getElementById('withoutmask_check_weekday_wednesday').checked;
      var thursdayenable = document.getElementById('withoutmask_check_weekday_thursday').checked;
      var fridayenable = document.getElementById('withoutmask_check_weekday_friday').checked;
      var saturdayenable = document.getElementById('withoutmask_check_weekday_saturday').checked;
      var enable1 = true;
      var enable2 = true;
      var enable3 = true;
      var enable4 = true;
      var enable5 = true;
      var enable6 = true;
      var sec1start = timereidt('withoutmask_timeredit_one_start').getvalue();
      var sec1end = timereidt('withoutmask_timeredit_one_end').getvalue();
      var sec2start = timereidt('withoutmask_timeredit_two_start').getvalue();
      var sec2end = timereidt('withoutmask_timeredit_two_end').getvalue();
      var sec3start = timereidt('withoutmask_timeredit_three_start').getvalue();
      var sec3end = timereidt('withoutmask_timeredit_three_end').getvalue();
      var sec4start = timereidt('withoutmask_timeredit_four_start').getvalue();
      var sec4end = timereidt('withoutmask_timeredit_four_end').getvalue();
      var sec5start = timereidt('withoutmask_timeredit_five_start').getvalue();
      var sec5end = timereidt('withoutmask_timeredit_five_end').getvalue();
      var sec6start = timereidt('withoutmask_timeredit_six_start').getvalue();
      var sec6end = timereidt('withoutmask_timeredit_six_end').getvalue();
      var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      if (fun_compare_sande(sec1start, sec1end) || fun_compare_sande(sec2start, sec2end) || fun_compare_sande(sec3start, sec3end) || fun_compare_sande(sec4start, sec4end) || fun_compare_sande(sec5start, sec5end) || fun_compare_sande(sec6start, sec6end)) {
        parent.fun_show_tips_dialog(gtips_input, 0);
        return;
      }
      if (sundayenable) {
        if (enable1) {
          real_schedule_withoutmask_timesection[6].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_withoutmask_timesection[6].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_withoutmask_painter.setSection(0, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_withoutmask_timesection[6].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_withoutmask_timesection[6].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_withoutmask_painter.setSection(0, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_withoutmask_timesection[6].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_withoutmask_timesection[6].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_withoutmask_painter.setSection(0, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_withoutmask_timesection[6].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_withoutmask_timesection[6].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_withoutmask_painter.setSection(0, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_withoutmask_timesection[6].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_withoutmask_timesection[6].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_withoutmask_painter.setSection(0, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_withoutmask_timesection[6].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_withoutmask_timesection[6].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_withoutmask_painter.setSection(0, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (mondayenable) {
        if (enable1) {
          real_schedule_withoutmask_timesection[0].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_withoutmask_timesection[0].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_withoutmask_painter.setSection(1, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_withoutmask_timesection[0].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_withoutmask_timesection[0].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_withoutmask_painter.setSection(1, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_withoutmask_timesection[0].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_withoutmask_timesection[0].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_withoutmask_painter.setSection(1, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_withoutmask_timesection[0].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_withoutmask_timesection[0].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_withoutmask_painter.setSection(1, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_withoutmask_timesection[0].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_withoutmask_timesection[0].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_withoutmask_painter.setSection(1, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_withoutmask_timesection[0].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_withoutmask_timesection[0].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_withoutmask_painter.setSection(1, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (tuesdayenable) {
        if (enable1) {
          real_schedule_withoutmask_timesection[1].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_withoutmask_timesection[1].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_withoutmask_painter.setSection(2, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_withoutmask_timesection[1].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_withoutmask_timesection[1].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_withoutmask_painter.setSection(2, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_withoutmask_timesection[1].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_withoutmask_timesection[1].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_withoutmask_painter.setSection(2, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_withoutmask_timesection[1].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_withoutmask_timesection[1].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_withoutmask_painter.setSection(2, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_withoutmask_timesection[1].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_withoutmask_timesection[1].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_withoutmask_painter.setSection(2, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_withoutmask_timesection[1].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_withoutmask_timesection[1].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_withoutmask_painter.setSection(2, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (wednesdayenable) {
        if (enable1) {
          real_schedule_withoutmask_timesection[2].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_withoutmask_timesection[2].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_withoutmask_painter.setSection(3, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_withoutmask_timesection[2].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_withoutmask_timesection[2].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_withoutmask_painter.setSection(3, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_withoutmask_timesection[2].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_withoutmask_timesection[2].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_withoutmask_painter.setSection(3, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_withoutmask_timesection[2].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_withoutmask_timesection[2].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_withoutmask_painter.setSection(3, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_withoutmask_timesection[2].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_withoutmask_timesection[2].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_withoutmask_painter.setSection(3, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_withoutmask_timesection[2].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_withoutmask_timesection[2].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_withoutmask_painter.setSection(3, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (thursdayenable) {
        if (enable1) {
          real_schedule_withoutmask_timesection[3].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_withoutmask_timesection[3].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_withoutmask_painter.setSection(4, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_withoutmask_timesection[3].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_withoutmask_timesection[3].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_withoutmask_painter.setSection(4, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_withoutmask_timesection[3].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_withoutmask_timesection[3].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_withoutmask_painter.setSection(4, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_withoutmask_timesection[3].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_withoutmask_timesection[3].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_withoutmask_painter.setSection(4, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_withoutmask_timesection[3].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_withoutmask_timesection[3].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_withoutmask_painter.setSection(4, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_withoutmask_timesection[3].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_withoutmask_timesection[3].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_withoutmask_painter.setSection(4, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (fridayenable) {
        if (enable1) {
          real_schedule_withoutmask_timesection[4].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_withoutmask_timesection[4].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_withoutmask_painter.setSection(5, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_withoutmask_timesection[4].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_withoutmask_timesection[4].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_withoutmask_painter.setSection(5, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_withoutmask_timesection[4].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_withoutmask_timesection[4].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_withoutmask_painter.setSection(5, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_withoutmask_timesection[4].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_withoutmask_timesection[4].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_withoutmask_painter.setSection(5, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_withoutmask_timesection[4].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_withoutmask_timesection[4].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_withoutmask_painter.setSection(5, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_withoutmask_timesection[4].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_withoutmask_timesection[4].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_withoutmask_painter.setSection(5, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      if (saturdayenable) {
        if (enable1) {
          real_schedule_withoutmask_timesection[5].tsection1.start = fun_convert_timestring(sec1start);
          real_schedule_withoutmask_timesection[5].tsection1.end = fun_convert_timestring(sec1end);
          g_schedule_withoutmask_painter.setSection(6, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
          real_schedule_withoutmask_timesection[5].tsection2.start = fun_convert_timestring(sec2start);
          real_schedule_withoutmask_timesection[5].tsection2.end = fun_convert_timestring(sec2end);
          g_schedule_withoutmask_painter.setSection(6, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
          real_schedule_withoutmask_timesection[5].tsection3.start = fun_convert_timestring(sec3start);
          real_schedule_withoutmask_timesection[5].tsection3.end = fun_convert_timestring(sec3end);
          g_schedule_withoutmask_painter.setSection(6, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
          real_schedule_withoutmask_timesection[5].tsection4.start = fun_convert_timestring(sec4start);
          real_schedule_withoutmask_timesection[5].tsection4.end = fun_convert_timestring(sec4end);
          g_schedule_withoutmask_painter.setSection(6, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
          real_schedule_withoutmask_timesection[5].tsection5.start = fun_convert_timestring(sec5start);
          real_schedule_withoutmask_timesection[5].tsection5.end = fun_convert_timestring(sec5end);
          g_schedule_withoutmask_painter.setSection(6, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
          real_schedule_withoutmask_timesection[5].tsection6.start = fun_convert_timestring(sec6start);
          real_schedule_withoutmask_timesection[5].tsection6.end = fun_convert_timestring(sec6end);
          g_schedule_withoutmask_painter.setSection(6, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
      }
      fun_show_withoutmask_setup_dialog(false);
    }
    fun_save_facedct_schedule();
  } else if (objid == 'facedetection_button_schedule_timesection_cancel' || objid == 'wearmask_button_schedule_timesection_cancel' || objid == 'withoutmask_button_schedule_timesection_cancel') {
    if (objid == 'facedetection_button_schedule_timesection_cancel') {
      fun_show_facedetection_setup_dialog(false);
    } else if (objid == 'wearmask_button_schedule_timesection_cancel') {
      fun_show_wearmask_setup_dialog(false);
    } else if (objid == 'withoutmask_button_schedule_timesection_cancel') {
      fun_show_withoutmask_setup_dialog(false);
    }
  } else if (objid == 'button_facedetection_schedule_save' || objid == 'button_facedetection_actions_save') {
    var facedetectionoutput = document.getElementById('check_facedetection_iooutput').checked;
    var facedetectionledblk = document.getElementById('check_facedetection_ledblink').checked;
    var facedetectionrecord = document.getElementById('check_facedetection_record').checked;
    var facedetectionftp = document.getElementById('check_facedetection_ftp').checked;
    var facedetectionemail = document.getElementById('check_facedetection_sendemail').checked;
    var facedetectionsnapshot = document.getElementById('check_facedetection_snapshot').checked;
    var facedetectionrsio = document.getElementById('check_facedetection_rsio').checked;
    var wearmaskoutput = document.getElementById('check_wearmask_iooutput').checked;
    var wearmaskledblk = document.getElementById('check_wearmask_ledblink').checked;
    var wearmaskrecord = document.getElementById('check_wearmask_record').checked;
    var wearmaskftp = document.getElementById('check_wearmask_ftp').checked;
    var wearmaskemail = document.getElementById('check_wearmask_sendemail').checked;
    var wearmasksnapshot = document.getElementById('check_wearmask_snapshot').checked;
    var wearmaskrsio = document.getElementById('check_wearmask_rsio').checked;
    var withoutmaskoutput = document.getElementById('check_withoutmask_iooutput').checked;
    var withoutmaskledblk = document.getElementById('check_withoutmask_ledblink').checked;
    var withoutmaskrecord = document.getElementById('check_withoutmask_record').checked;
    var withoutmaskftp = document.getElementById('check_withoutmask_ftp').checked;
    var withoutmaskemail = document.getElementById('check_withoutmask_sendemail').checked;
    var withoutmasksnapshot = document.getElementById('check_withoutmask_snapshot').checked;
    var withoutmaskrsio = document.getElementById('check_withoutmask_rsio').checked;
    schedule_facedetection_mask = 0;
    schedule_wearmask_mask = 0;
    schedule_withoutmask_mask = 0;
    if (facedetectionoutput) {
      schedule_facedetection_mask |= 1;
    }
    if (facedetectionledblk) {
      schedule_facedetection_mask |= 1 << 8;
    }
    if (facedetectionsnapshot) {
      schedule_facedetection_mask |= 1 << 12;
    }
    if (facedetectionrecord) {
      schedule_facedetection_mask |= 1 << 13;
    }
    if (facedetectionftp) {
      schedule_facedetection_mask |= 1 << 14;
    }
    if (facedetectionemail) {
      schedule_facedetection_mask |= 1 << 16;
    }
    if (facedetectionrsio) {
      schedule_facedetection_mask |= 1 << 19;
    }
    if (wearmaskoutput) {
      schedule_wearmask_mask |= 1;
    }
    if (wearmaskledblk) {
      schedule_wearmask_mask |= 1 << 8;
    }
    if (wearmasksnapshot) {
      schedule_wearmask_mask |= 1 << 12;
    }
    if (wearmaskrecord) {
      schedule_wearmask_mask |= 1 << 13;
    }
    if (wearmaskftp) {
      schedule_wearmask_mask |= 1 << 14;
    }
    if (wearmaskemail) {
      schedule_wearmask_mask |= 1 << 16;
    }
    if (wearmaskrsio) {
      schedule_wearmask_mask |= 1 << 19;
    }
    if (withoutmaskoutput) {
      schedule_withoutmask_mask |= 1;
    }
    if (withoutmaskledblk) {
      schedule_withoutmask_mask |= 1 << 8;
    }
    if (withoutmasksnapshot) {
      schedule_withoutmask_mask |= 1 << 12;
    }
    if (withoutmaskrecord) {
      schedule_withoutmask_mask |= 1 << 13;
    }
    if (withoutmaskftp) {
      schedule_withoutmask_mask |= 1 << 14;
    }
    if (withoutmaskemail) {
      schedule_withoutmask_mask |= 1 << 16;
    }
    if (withoutmaskrsio) {
      schedule_withoutmask_mask |= 1 << 19;
    }
    fun_save_facedct_schedule();
    if (objid == 'button_facedetection_actions_save') {
      fun_save_baseparams();
    }
  }
}
function fun_compare_sande(starttime, endtime) {
  var attrstarttime = starttime.split(':');
  var attrendtime = endtime.split(':');
  for (var i = 0; i < 3; i++) {
    if (!attrstarttime[i].match('^[0-9]+$') || !attrendtime[i].match('^[0-9]+$')) {
      return true;
    }
  }
  var start = parseInt(attrstarttime[0]) * 3600 + parseInt(attrstarttime[1]) * 60 + parseInt(attrstarttime[2]);
  var end = parseInt(attrendtime[0]) * 3600 + parseInt(attrendtime[1]) * 60 + parseInt(attrendtime[2]);
  if (start > end) {
    return true;
  }
}
function fun_on_weekday_alldays(objid) {
  if (objid === 'facedetection_check_weekday_alldays') {
    var bchecked = document.getElementById('facedetection_check_weekday_alldays').checked;
    if (bchecked == true) {
      document.getElementById('facedetection_check_weekday_monday').checked = true;
      document.getElementById('facedetection_check_weekday_tuesday').checked = true;
      document.getElementById('facedetection_check_weekday_wednesday').checked = true;
      document.getElementById('facedetection_check_weekday_thursday').checked = true;
      document.getElementById('facedetection_check_weekday_friday').checked = true;
      document.getElementById('facedetection_check_weekday_saturday').checked = true;
      document.getElementById('facedetection_check_weekday_sunday').checked = true;
    } else {
      $('#facedetection_check_weekday_monday,#facedetection_check_weekday_tuesday,#facedetection_check_weekday_wednesday,#facedetection_check_weekday_thursday,#facedetection_check_weekday_friday,#facedetection_check_weekday_saturday,#facedetection_check_weekday_sunday').removeAttr('checked');
      if (g_current_set_day_facedetection == 1) {
        document.getElementById('facedetection_check_weekday_monday').checked = true;
      } else if (g_current_set_day_facedetection == 2) {
        document.getElementById('facedetection_check_weekday_tuesday').checked = true;
      } else if (g_current_set_day_facedetection == 3) {
        document.getElementById('facedetection_check_weekday_wednesday').checked = true;
      } else if (g_current_set_day_facedetection == 4) {
        document.getElementById('facedetection_check_weekday_thursday').checked = true;
      } else if (g_current_set_day_facedetection == 5) {
        document.getElementById('facedetection_check_weekday_friday').checked = true;
      } else if (g_current_set_day_facedetection == 6) {
        document.getElementById('facedetection_check_weekday_saturday').checked = true;
      } else if (g_current_set_day_facedetection == 7) {
        document.getElementById('facedetection_check_weekday_sunday').checked = true;
      }
    }
  } else if (objid === 'wearmask_check_weekday_alldays') {
    var bchecked = document.getElementById('wearmask_check_weekday_alldays').checked;
    if (bchecked == true) {
      document.getElementById('wearmask_check_weekday_monday').checked = true;
      document.getElementById('wearmask_check_weekday_tuesday').checked = true;
      document.getElementById('wearmask_check_weekday_wednesday').checked = true;
      document.getElementById('wearmask_check_weekday_thursday').checked = true;
      document.getElementById('wearmask_check_weekday_friday').checked = true;
      document.getElementById('wearmask_check_weekday_saturday').checked = true;
      document.getElementById('wearmask_check_weekday_sunday').checked = true;
    } else {
      $('#wearmask_check_weekday_monday,#wearmask_check_weekday_tuesday,#wearmask_check_weekday_wednesday,#wearmask_check_weekday_thursday,#wearmask_check_weekday_friday,#wearmask_check_weekday_saturday,#wearmask_check_weekday_sunday').removeAttr('checked');
      if (g_current_set_day_wearmask == 1) {
        document.getElementById('wearmask_check_weekday_monday').checked = true;
      } else if (g_current_set_day_wearmask == 2) {
        document.getElementById('wearmask_check_weekday_tuesday').checked = true;
      } else if (g_current_set_day_wearmask == 3) {
        document.getElementById('wearmask_check_weekday_wednesday').checked = true;
      } else if (g_current_set_day_wearmask == 4) {
        document.getElementById('wearmask_check_weekday_thursday').checked = true;
      } else if (g_current_set_day_wearmask == 5) {
        document.getElementById('wearmask_check_weekday_friday').checked = true;
      } else if (g_current_set_day_wearmask == 6) {
        document.getElementById('wearmask_check_weekday_saturday').checked = true;
      } else if (g_current_set_day_wearmask == 7) {
        document.getElementById('wearmask_check_weekday_sunday').checked = true;
      }
    }
  } else if (objid === 'withoutmask_check_weekday_alldays') {
    var bchecked = document.getElementById('withoutmask_check_weekday_alldays').checked;
    if (bchecked == true) {
      document.getElementById('withoutmask_check_weekday_monday').checked = true;
      document.getElementById('withoutmask_check_weekday_tuesday').checked = true;
      document.getElementById('withoutmask_check_weekday_wednesday').checked = true;
      document.getElementById('withoutmask_check_weekday_thursday').checked = true;
      document.getElementById('withoutmask_check_weekday_friday').checked = true;
      document.getElementById('withoutmask_check_weekday_saturday').checked = true;
      document.getElementById('withoutmask_check_weekday_sunday').checked = true;
    } else {
      $('#withoutmask_check_weekday_monday,#withoutmask_check_weekday_tuesday,#withoutmask_check_weekday_wednesday,#withoutmask_check_weekday_thursday,#withoutmask_check_weekday_friday,#withoutmask_check_weekday_saturday,#withoutmask_check_weekday_sunday').removeAttr('checked');
      if (g_current_set_day_withoutmask == 1) {
        document.getElementById('withoutmask_check_weekday_monday').checked = true;
      } else if (g_current_set_day_withoutmask == 2) {
        document.getElementById('withoutmask_check_weekday_tuesday').checked = true;
      } else if (g_current_set_day_withoutmask == 3) {
        document.getElementById('withoutmask_check_weekday_wednesday').checked = true;
      } else if (g_current_set_day_withoutmask == 4) {
        document.getElementById('withoutmask_check_weekday_thursday').checked = true;
      } else if (g_current_set_day_withoutmask == 5) {
        document.getElementById('withoutmask_check_weekday_friday').checked = true;
      } else if (g_current_set_day_withoutmask == 6) {
        document.getElementById('withoutmask_check_weekday_saturday').checked = true;
      } else if (g_current_set_day_withoutmask == 7) {
        document.getElementById('withoutmask_check_weekday_sunday').checked = true;
      }
    }
  }
}
function fun_get_facedct_schedule() {
  for (var index = 0; index < 7; index++) {
    real_schedule_facedetection_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
    real_schedule_wearmask_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
    real_schedule_withoutmask_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
  }
  sdk_getipcparam('/action/get?subject=alarm&type=13', function (result) {
    if (result != false) {
      $xml = $(result);
      var active = $xml.find('active').text();
      var duration = $xml.find('duration').text();
      var enumlation = $xml.find('enumlation').text();
      var outmask = $xml.find('outmask').text();
      if (active == 0) {
        document.getElementById('radio_schedule_facedetection_disable').checked = true;
        document.getElementById('div_schedule_facedetection_manual').style.setProperty('display', 'none');
      } else if (active == 1) {
        document.getElementById('radio_schedule_facedetection_alldays').checked = true;
        document.getElementById('div_schedule_facedetection_manual').style.setProperty('display', 'none');
      } else if (active == 2) {
        document.getElementById('radio_schedule_facedetection_enable').checked = true;
        document.getElementById('div_schedule_facedetection_manual').style.setProperty('display', 'block');
      }
      $('#input_schedule_facedetection_mintime_text').val(duration);
      if (enumlation == 1) {
        $('#check_facedetection_motionemulation').prop('checked', true);
      } else {
        $('#check_facedetection_motionemulation').prop('checked', false);
      }
      var facedetectionmask = parseInt(outmask);
      schedule_facedetection_mask = facedetectionmask;
      if (facedetectionmask & 1) {
        document.getElementById('check_facedetection_iooutput').checked = true;
      } else {
        document.getElementById('check_facedetection_iooutput').checked = false;
      }
      if (facedetectionmask & (1 << 8)) {
        document.getElementById('check_facedetection_ledblink').checked = true;
      } else {
        document.getElementById('check_facedetection_ledblink').checked = false;
      }
      if (facedetectionmask & (1 << 12)) {
        document.getElementById('check_facedetection_snapshot').checked = true;
      } else {
        document.getElementById('check_facedetection_snapshot').checked = false;
      }
      if (facedetectionmask & (1 << 13)) {
        document.getElementById('check_facedetection_record').checked = true;
      } else {
        document.getElementById('check_facedetection_record').checked = false;
      }
      if (facedetectionmask & (1 << 14)) {
        document.getElementById('check_facedetection_ftp').checked = true;
      } else {
        document.getElementById('check_facedetection_ftp').checked = false;
      }
      if (facedetectionmask & (1 << 16)) {
        document.getElementById('check_facedetection_sendemail').checked = true;
      } else {
        document.getElementById('check_facedetection_sendemail').checked = false;
      }
      if (facedetectionmask & (1 << 19)) {
        document.getElementById('check_facedetection_rsio').checked = true;
      } else {
        document.getElementById('check_facedetection_rsio').checked = false;
      }
      var childindex = 0;
      var sectionindex = 1;
      $xml
        .find('schedule')
        .children()
        .each(function () {
          $(this)
            .find('tsection')
            .each(function () {
              var temptext = this.innerText;
              var timearr = temptext.split('-');
              if (timearr[0] == 0 && timearr[1] == 0) return;
              var starttime = parseInt(timearr[0]);
              var endtime = parseInt(timearr[1]);
              if (sectionindex == 1) {
                real_schedule_facedetection_timesection[childindex].tsection1.start = starttime;
                real_schedule_facedetection_timesection[childindex].tsection1.end = endtime;
              } else if (sectionindex == 2) {
                real_schedule_facedetection_timesection[childindex].tsection2.start = starttime;
                real_schedule_facedetection_timesection[childindex].tsection2.end = endtime;
              } else if (sectionindex == 3) {
                real_schedule_facedetection_timesection[childindex].tsection3.start = starttime;
                real_schedule_facedetection_timesection[childindex].tsection3.end = endtime;
              } else if (sectionindex == 4) {
                real_schedule_facedetection_timesection[childindex].tsection4.start = starttime;
                real_schedule_facedetection_timesection[childindex].tsection4.end = endtime;
              } else if (sectionindex == 5) {
                real_schedule_facedetection_timesection[childindex].tsection5.start = starttime;
                real_schedule_facedetection_timesection[childindex].tsection5.end = endtime;
              } else if (sectionindex == 6) {
                real_schedule_facedetection_timesection[childindex].tsection6.start = starttime;
                real_schedule_facedetection_timesection[childindex].tsection6.end = endtime;
              }
              if (childindex < 6) {
                g_schedule_facedetection_painter.setSection(childindex + 1, sectionindex, starttime, endtime);
              } else {
                g_schedule_facedetection_painter.setSection(0, sectionindex, starttime, endtime);
              }
              sectionindex++;
            });
          sectionindex = 1;
          childindex++;
        });
    }
  });
  sdk_getipcparam('/action/get?subject=alarm&type=20', function (result) {
    if (result != false) {
      $xml = $(result);
      var active = $xml.find('active').text();
      var duration = $xml.find('duration').text();
      var enumlation = $xml.find('enumlation').text();
      var outmask = $xml.find('outmask').text();
      if (active == 0) {
        document.getElementById('radio_schedule_wearmask_disable').checked = true;
        document.getElementById('div_schedule_wearmask_manual').style.setProperty('display', 'none');
      } else if (active == 1) {
        document.getElementById('radio_schedule_wearmask_alldays').checked = true;
        document.getElementById('div_schedule_wearmask_manual').style.setProperty('display', 'none');
      } else if (active == 2) {
        document.getElementById('radio_schedule_wearmask_enable').checked = true;
        document.getElementById('div_schedule_wearmask_manual').style.setProperty('display', 'block');
      }
      $('#input_schedule_wearmask_mintime_text').val(duration);
      if (enumlation == 1) {
        $('#check_wearmask_motionemulation').prop('checked', true);
      } else {
        $('#check_wearmask_motionemulation').prop('checked', false);
      }
      var wearmaskmask = parseInt(outmask);
      schedule_wearmask_mask = wearmaskmask;
      if (wearmaskmask & 1) {
        document.getElementById('check_wearmask_iooutput').checked = true;
      } else {
        document.getElementById('check_wearmask_iooutput').checked = false;
      }
      if (wearmaskmask & (1 << 8)) {
        document.getElementById('check_wearmask_ledblink').checked = true;
      } else {
        document.getElementById('check_wearmask_ledblink').checked = false;
      }
      if (wearmaskmask & (1 << 12)) {
        document.getElementById('check_wearmask_snapshot').checked = true;
      } else {
        document.getElementById('check_wearmask_snapshot').checked = false;
      }
      if (wearmaskmask & (1 << 13)) {
        document.getElementById('check_wearmask_record').checked = true;
      } else {
        document.getElementById('check_wearmask_record').checked = false;
      }
      if (wearmaskmask & (1 << 14)) {
        document.getElementById('check_wearmask_ftp').checked = true;
      } else {
        document.getElementById('check_wearmask_ftp').checked = false;
      }
      if (wearmaskmask & (1 << 16)) {
        document.getElementById('check_wearmask_sendemail').checked = true;
      } else {
        document.getElementById('check_wearmask_sendemail').checked = false;
      }
      if (wearmaskmask & (1 << 19)) {
        document.getElementById('check_wearmask_rsio').checked = true;
      } else {
        document.getElementById('check_wearmask_rsio').checked = false;
      }
      var childindex = 0;
      var sectionindex = 1;
      $xml
        .find('schedule')
        .children()
        .each(function () {
          $(this)
            .find('tsection')
            .each(function () {
              var temptext = this.innerText;
              var timearr = temptext.split('-');
              if (timearr[0] == 0 && timearr[1] == 0) return;
              var starttime = parseInt(timearr[0]);
              var endtime = parseInt(timearr[1]);
              if (sectionindex == 1) {
                real_schedule_wearmask_timesection[childindex].tsection1.start = starttime;
                real_schedule_wearmask_timesection[childindex].tsection1.end = endtime;
              } else if (sectionindex == 2) {
                real_schedule_wearmask_timesection[childindex].tsection2.start = starttime;
                real_schedule_wearmask_timesection[childindex].tsection2.end = endtime;
              } else if (sectionindex == 3) {
                real_schedule_wearmask_timesection[childindex].tsection3.start = starttime;
                real_schedule_wearmask_timesection[childindex].tsection3.end = endtime;
              } else if (sectionindex == 4) {
                real_schedule_wearmask_timesection[childindex].tsection4.start = starttime;
                real_schedule_wearmask_timesection[childindex].tsection4.end = endtime;
              } else if (sectionindex == 5) {
                real_schedule_wearmask_timesection[childindex].tsection5.start = starttime;
                real_schedule_wearmask_timesection[childindex].tsection5.end = endtime;
              } else if (sectionindex == 6) {
                real_schedule_wearmask_timesection[childindex].tsection6.start = starttime;
                real_schedule_wearmask_timesection[childindex].tsection6.end = endtime;
              }
              if (childindex < 6) {
                g_schedule_wearmask_painter.setSection(childindex + 1, sectionindex, starttime, endtime);
              } else {
                g_schedule_wearmask_painter.setSection(0, sectionindex, starttime, endtime);
              }
              sectionindex++;
            });
          sectionindex = 1;
          childindex++;
        });
    }
  });
  sdk_getipcparam('/action/get?subject=alarm&type=21', function (result) {
    if (result != false) {
      $xml = $(result);
      var active = $xml.find('active').text();
      var duration = $xml.find('duration').text();
      var enumlation = $xml.find('enumlation').text();
      var outmask = $xml.find('outmask').text();
      if (active == 0) {
        document.getElementById('radio_schedule_withoutmask_disable').checked = true;
        document.getElementById('div_schedule_withoutmask_manual').style.setProperty('display', 'none');
      } else if (active == 1) {
        document.getElementById('radio_schedule_withoutmask_alldays').checked = true;
        document.getElementById('div_schedule_withoutmask_manual').style.setProperty('display', 'none');
      } else if (active == 2) {
        document.getElementById('radio_schedule_withoutmask_enable').checked = true;
        document.getElementById('div_schedule_withoutmask_manual').style.setProperty('display', 'block');
      }
      $('#input_schedule_withoutmask_mintime_text').val(duration);
      if (enumlation == 1) {
        $('#check_withoutmask_motionemulation').prop('checked', true);
      } else {
        $('#check_withoutmask_motionemulation').prop('checked', false);
      }
      var withoutmaskmask = parseInt(outmask);
      schedule_withoutmask_mask = withoutmaskmask;
      if (withoutmaskmask & 1) {
        document.getElementById('check_withoutmask_iooutput').checked = true;
      } else {
        document.getElementById('check_withoutmask_iooutput').checked = false;
      }
      if (withoutmaskmask & (1 << 8)) {
        document.getElementById('check_withoutmask_ledblink').checked = true;
      } else {
        document.getElementById('check_withoutmask_ledblink').checked = false;
      }
      if (withoutmaskmask & (1 << 12)) {
        document.getElementById('check_withoutmask_snapshot').checked = true;
      } else {
        document.getElementById('check_withoutmask_snapshot').checked = false;
      }
      if (withoutmaskmask & (1 << 13)) {
        document.getElementById('check_withoutmask_record').checked = true;
      } else {
        document.getElementById('check_withoutmask_record').checked = false;
      }
      if (withoutmaskmask & (1 << 14)) {
        document.getElementById('check_withoutmask_ftp').checked = true;
      } else {
        document.getElementById('check_withoutmask_ftp').checked = false;
      }
      if (withoutmaskmask & (1 << 16)) {
        document.getElementById('check_withoutmask_sendemail').checked = true;
      } else {
        document.getElementById('check_withoutmask_sendemail').checked = false;
      }
      if (withoutmaskmask & (1 << 19)) {
        document.getElementById('check_withoutmask_rsio').checked = true;
      } else {
        document.getElementById('check_withoutmask_rsio').checked = false;
      }
      var childindex = 0;
      var sectionindex = 1;
      $xml
        .find('schedule')
        .children()
        .each(function () {
          $(this)
            .find('tsection')
            .each(function () {
              var temptext = this.innerText;
              var timearr = temptext.split('-');
              if (timearr[0] == 0 && timearr[1] == 0) return;
              var starttime = parseInt(timearr[0]);
              var endtime = parseInt(timearr[1]);
              if (sectionindex == 1) {
                real_schedule_withoutmask_timesection[childindex].tsection1.start = starttime;
                real_schedule_withoutmask_timesection[childindex].tsection1.end = endtime;
              } else if (sectionindex == 2) {
                real_schedule_withoutmask_timesection[childindex].tsection2.start = starttime;
                real_schedule_withoutmask_timesection[childindex].tsection2.end = endtime;
              } else if (sectionindex == 3) {
                real_schedule_withoutmask_timesection[childindex].tsection3.start = starttime;
                real_schedule_withoutmask_timesection[childindex].tsection3.end = endtime;
              } else if (sectionindex == 4) {
                real_schedule_withoutmask_timesection[childindex].tsection4.start = starttime;
                real_schedule_withoutmask_timesection[childindex].tsection4.end = endtime;
              } else if (sectionindex == 5) {
                real_schedule_withoutmask_timesection[childindex].tsection5.start = starttime;
                real_schedule_withoutmask_timesection[childindex].tsection5.end = endtime;
              } else if (sectionindex == 6) {
                real_schedule_withoutmask_timesection[childindex].tsection6.start = starttime;
                real_schedule_withoutmask_timesection[childindex].tsection6.end = endtime;
              }
              if (childindex < 6) {
                g_schedule_withoutmask_painter.setSection(childindex + 1, sectionindex, starttime, endtime);
              } else {
                g_schedule_withoutmask_painter.setSection(0, sectionindex, starttime, endtime);
              }
              sectionindex++;
            });
          sectionindex = 1;
          childindex++;
        });
    }
  });
  $('#select_schedule_type').val(0);
  $('#div_facedetection_schedule_facedetection').css('display', 'block');
  $('#div_facedetection_schedule_wearmask').css('display', 'none');
  $('#div_facedetection_schedule_withoutmask').css('display', 'none');
  $('#select_action_type').val(0);
  $('#div_facedetection_facedetection').css('display', 'block');
  $('#div_facedetection_wearmask').css('display', 'none');
  $('#div_facedetection_withoutmask').css('display', 'none');
}
function fun_save_facedct_schedule() {
  var fdschedulealldays = document.getElementById('radio_schedule_facedetection_alldays').checked;
  var fdscheduleenable = document.getElementById('radio_schedule_facedetection_enable').checked;
  var fdscheduleactive = 0;
  if (fdschedulealldays) {
    fdscheduleactive = 1;
  } else if (fdscheduleenable) {
    fdscheduleactive = 2;
  }
  var wmschedulealldays = document.getElementById('radio_schedule_wearmask_alldays').checked;
  var wmscheduleenable = document.getElementById('radio_schedule_wearmask_enable').checked;
  var wmscheduleactive = 0;
  if (wmschedulealldays) {
    wmscheduleactive = 1;
  } else if (wmscheduleenable) {
    wmscheduleactive = 2;
  }
  var wtschedulealldays = document.getElementById('radio_schedule_withoutmask_alldays').checked;
  var wtscheduleenable = document.getElementById('radio_schedule_withoutmask_enable').checked;
  var wtscheduleactive = 0;
  if (wtschedulealldays) {
    wtscheduleactive = 1;
  } else if (wtscheduleenable) {
    wtscheduleactive = 2;
  }
  var fdscheduleduration = document.getElementById('input_schedule_facedetection_mintime_text').value;
  var wmscheduleduration = document.getElementById('input_schedule_wearmask_mintime_text').value;
  var wtscheduleduration = document.getElementById('input_schedule_withoutmask_mintime_text').value;
  if (fdscheduleduration <= 0 || fdscheduleduration > 300 || wmscheduleduration <= 0 || wmscheduleduration > 300 || wtscheduleduration <= 0 || wtscheduleduration > 300) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  var fdtargetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<alarmevt ver="2.0">' +
    '<active>' +
    fdscheduleactive +
    '</active>' +
    '<duration>' +
    fdscheduleduration +
    '</duration>' +
    '<outmask>' +
    schedule_facedetection_mask +
    '</outmask>' +
    '<schedule>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[0].tsection1.start, real_schedule_facedetection_timesection[0].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[0].tsection2.start, real_schedule_facedetection_timesection[0].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[0].tsection3.start, real_schedule_facedetection_timesection[0].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[0].tsection4.start, real_schedule_facedetection_timesection[0].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[0].tsection5.start, real_schedule_facedetection_timesection[0].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[0].tsection6.start, real_schedule_facedetection_timesection[0].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[1].tsection1.start, real_schedule_facedetection_timesection[1].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[1].tsection2.start, real_schedule_facedetection_timesection[1].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[1].tsection3.start, real_schedule_facedetection_timesection[1].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[1].tsection4.start, real_schedule_facedetection_timesection[1].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[1].tsection5.start, real_schedule_facedetection_timesection[1].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[1].tsection6.start, real_schedule_facedetection_timesection[1].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[2].tsection1.start, real_schedule_facedetection_timesection[2].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[2].tsection2.start, real_schedule_facedetection_timesection[2].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[2].tsection3.start, real_schedule_facedetection_timesection[2].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[2].tsection4.start, real_schedule_facedetection_timesection[2].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[2].tsection5.start, real_schedule_facedetection_timesection[2].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[2].tsection6.start, real_schedule_facedetection_timesection[2].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[3].tsection1.start, real_schedule_facedetection_timesection[3].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[3].tsection2.start, real_schedule_facedetection_timesection[3].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[3].tsection3.start, real_schedule_facedetection_timesection[3].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[3].tsection4.start, real_schedule_facedetection_timesection[3].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[3].tsection5.start, real_schedule_facedetection_timesection[3].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[3].tsection6.start, real_schedule_facedetection_timesection[3].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[4].tsection1.start, real_schedule_facedetection_timesection[4].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[4].tsection2.start, real_schedule_facedetection_timesection[4].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[4].tsection3.start, real_schedule_facedetection_timesection[4].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[4].tsection4.start, real_schedule_facedetection_timesection[4].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[4].tsection5.start, real_schedule_facedetection_timesection[4].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[4].tsection6.start, real_schedule_facedetection_timesection[4].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[5].tsection1.start, real_schedule_facedetection_timesection[5].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[5].tsection2.start, real_schedule_facedetection_timesection[5].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[5].tsection3.start, real_schedule_facedetection_timesection[5].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[5].tsection4.start, real_schedule_facedetection_timesection[5].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[5].tsection5.start, real_schedule_facedetection_timesection[5].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[5].tsection6.start, real_schedule_facedetection_timesection[5].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[6].tsection1.start, real_schedule_facedetection_timesection[6].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[6].tsection2.start, real_schedule_facedetection_timesection[6].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[6].tsection3.start, real_schedule_facedetection_timesection[6].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[6].tsection4.start, real_schedule_facedetection_timesection[6].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[6].tsection5.start, real_schedule_facedetection_timesection[6].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_facedetection_timesection[6].tsection6.start, real_schedule_facedetection_timesection[6].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '</schedule>' +
    '</alarmevt>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=alarm&type=13', fdtargetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
    if (result == true) {
      parent.fun_show_tips_dialog(strsuc);
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
  if (!showva) {
    return;
  }
  var wmtargetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<alarmevt ver="2.0">' +
    '<active>' +
    wmscheduleactive +
    '</active>' +
    '<duration>' +
    wmscheduleduration +
    '</duration>' +
    '<outmask>' +
    schedule_wearmask_mask +
    '</outmask>' +
    '<schedule>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[0].tsection1.start, real_schedule_wearmask_timesection[0].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[0].tsection2.start, real_schedule_wearmask_timesection[0].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[0].tsection3.start, real_schedule_wearmask_timesection[0].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[0].tsection4.start, real_schedule_wearmask_timesection[0].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[0].tsection5.start, real_schedule_wearmask_timesection[0].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[0].tsection6.start, real_schedule_wearmask_timesection[0].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[1].tsection1.start, real_schedule_wearmask_timesection[1].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[1].tsection2.start, real_schedule_wearmask_timesection[1].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[1].tsection3.start, real_schedule_wearmask_timesection[1].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[1].tsection4.start, real_schedule_wearmask_timesection[1].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[1].tsection5.start, real_schedule_wearmask_timesection[1].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[1].tsection6.start, real_schedule_wearmask_timesection[1].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[2].tsection1.start, real_schedule_wearmask_timesection[2].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[2].tsection2.start, real_schedule_wearmask_timesection[2].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[2].tsection3.start, real_schedule_wearmask_timesection[2].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[2].tsection4.start, real_schedule_wearmask_timesection[2].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[2].tsection5.start, real_schedule_wearmask_timesection[2].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[2].tsection6.start, real_schedule_wearmask_timesection[2].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[3].tsection1.start, real_schedule_wearmask_timesection[3].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[3].tsection2.start, real_schedule_wearmask_timesection[3].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[3].tsection3.start, real_schedule_wearmask_timesection[3].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[3].tsection4.start, real_schedule_wearmask_timesection[3].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[3].tsection5.start, real_schedule_wearmask_timesection[3].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[3].tsection6.start, real_schedule_wearmask_timesection[3].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[4].tsection1.start, real_schedule_wearmask_timesection[4].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[4].tsection2.start, real_schedule_wearmask_timesection[4].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[4].tsection3.start, real_schedule_wearmask_timesection[4].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[4].tsection4.start, real_schedule_wearmask_timesection[4].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[4].tsection5.start, real_schedule_wearmask_timesection[4].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[4].tsection6.start, real_schedule_wearmask_timesection[4].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[5].tsection1.start, real_schedule_wearmask_timesection[5].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[5].tsection2.start, real_schedule_wearmask_timesection[5].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[5].tsection3.start, real_schedule_wearmask_timesection[5].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[5].tsection4.start, real_schedule_wearmask_timesection[5].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[5].tsection5.start, real_schedule_wearmask_timesection[5].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[5].tsection6.start, real_schedule_wearmask_timesection[5].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[6].tsection1.start, real_schedule_wearmask_timesection[6].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[6].tsection2.start, real_schedule_wearmask_timesection[6].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[6].tsection3.start, real_schedule_wearmask_timesection[6].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[6].tsection4.start, real_schedule_wearmask_timesection[6].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[6].tsection5.start, real_schedule_wearmask_timesection[6].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_wearmask_timesection[6].tsection6.start, real_schedule_wearmask_timesection[6].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '</schedule>' +
    '</alarmevt>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=alarm&type=20', wmtargetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
    if (result == true) {
      parent.fun_show_tips_dialog(strsuc);
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
  var wttargetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<alarmevt ver="2.0">' +
    '<active>' +
    wtscheduleactive +
    '</active>' +
    '<duration>' +
    wtscheduleduration +
    '</duration>' +
    '<outmask>' +
    schedule_withoutmask_mask +
    '</outmask>' +
    '<schedule>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[0].tsection1.start, real_schedule_withoutmask_timesection[0].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[0].tsection2.start, real_schedule_withoutmask_timesection[0].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[0].tsection3.start, real_schedule_withoutmask_timesection[0].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[0].tsection4.start, real_schedule_withoutmask_timesection[0].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[0].tsection5.start, real_schedule_withoutmask_timesection[0].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[0].tsection6.start, real_schedule_withoutmask_timesection[0].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[1].tsection1.start, real_schedule_withoutmask_timesection[1].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[1].tsection2.start, real_schedule_withoutmask_timesection[1].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[1].tsection3.start, real_schedule_withoutmask_timesection[1].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[1].tsection4.start, real_schedule_withoutmask_timesection[1].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[1].tsection5.start, real_schedule_withoutmask_timesection[1].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[1].tsection6.start, real_schedule_withoutmask_timesection[1].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[2].tsection1.start, real_schedule_withoutmask_timesection[2].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[2].tsection2.start, real_schedule_withoutmask_timesection[2].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[2].tsection3.start, real_schedule_withoutmask_timesection[2].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[2].tsection4.start, real_schedule_withoutmask_timesection[2].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[2].tsection5.start, real_schedule_withoutmask_timesection[2].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[2].tsection6.start, real_schedule_withoutmask_timesection[2].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[3].tsection1.start, real_schedule_withoutmask_timesection[3].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[3].tsection2.start, real_schedule_withoutmask_timesection[3].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[3].tsection3.start, real_schedule_withoutmask_timesection[3].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[3].tsection4.start, real_schedule_withoutmask_timesection[3].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[3].tsection5.start, real_schedule_withoutmask_timesection[3].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[3].tsection6.start, real_schedule_withoutmask_timesection[3].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[4].tsection1.start, real_schedule_withoutmask_timesection[4].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[4].tsection2.start, real_schedule_withoutmask_timesection[4].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[4].tsection3.start, real_schedule_withoutmask_timesection[4].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[4].tsection4.start, real_schedule_withoutmask_timesection[4].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[4].tsection5.start, real_schedule_withoutmask_timesection[4].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[4].tsection6.start, real_schedule_withoutmask_timesection[4].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[5].tsection1.start, real_schedule_withoutmask_timesection[5].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[5].tsection2.start, real_schedule_withoutmask_timesection[5].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[5].tsection3.start, real_schedule_withoutmask_timesection[5].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[5].tsection4.start, real_schedule_withoutmask_timesection[5].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[5].tsection5.start, real_schedule_withoutmask_timesection[5].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[5].tsection6.start, real_schedule_withoutmask_timesection[5].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[6].tsection1.start, real_schedule_withoutmask_timesection[6].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[6].tsection2.start, real_schedule_withoutmask_timesection[6].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[6].tsection3.start, real_schedule_withoutmask_timesection[6].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[6].tsection4.start, real_schedule_withoutmask_timesection[6].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[6].tsection5.start, real_schedule_withoutmask_timesection[6].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_withoutmask_timesection[6].tsection6.start, real_schedule_withoutmask_timesection[6].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '</schedule>' +
    '</alarmevt>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=alarm&type=21', wttargetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
    if (result == true) {
      parent.fun_show_tips_dialog(strsuc);
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}
function fun_init_timer_section_item() {
  timereidt('facedetection_timeredit_one_start');
  timereidt('facedetection_timeredit_one_end');
  timereidt('facedetection_timeredit_two_start');
  timereidt('facedetection_timeredit_two_end');
  timereidt('facedetection_timeredit_three_start');
  timereidt('facedetection_timeredit_three_end');
  timereidt('facedetection_timeredit_four_start');
  timereidt('facedetection_timeredit_four_end');
  timereidt('facedetection_timeredit_five_start');
  timereidt('facedetection_timeredit_five_end');
  timereidt('facedetection_timeredit_six_start');
  timereidt('facedetection_timeredit_six_end');
  timereidt('facedetection_timeredit_one_start').setvalue('00:00:00');
  timereidt('facedetection_timeredit_one_end').setvalue('00:00:00');
  timereidt('facedetection_timeredit_two_start').setvalue('00:00:00');
  timereidt('facedetection_timeredit_two_end').setvalue('00:00:00');
  timereidt('facedetection_timeredit_three_start').setvalue('00:00:00');
  timereidt('facedetection_timeredit_three_end').setvalue('00:00:00');
  timereidt('facedetection_timeredit_four_start').setvalue('00:00:00');
  timereidt('facedetection_timeredit_four_end').setvalue('00:00:00');
  timereidt('facedetection_timeredit_five_start').setvalue('00:00:00');
  timereidt('facedetection_timeredit_five_end').setvalue('00:00:00');
  timereidt('facedetection_timeredit_six_start').setvalue('00:00:00');
  timereidt('facedetection_timeredit_six_end').setvalue('00:00:00');
  timereidt('wearmask_timeredit_one_start');
  timereidt('wearmask_timeredit_one_end');
  timereidt('wearmask_timeredit_two_start');
  timereidt('wearmask_timeredit_two_end');
  timereidt('wearmask_timeredit_three_start');
  timereidt('wearmask_timeredit_three_end');
  timereidt('wearmask_timeredit_four_start');
  timereidt('wearmask_timeredit_four_end');
  timereidt('wearmask_timeredit_five_start');
  timereidt('wearmask_timeredit_five_end');
  timereidt('wearmask_timeredit_six_start');
  timereidt('wearmask_timeredit_six_end');
  timereidt('wearmask_timeredit_one_start').setvalue('00:00:00');
  timereidt('wearmask_timeredit_one_end').setvalue('00:00:00');
  timereidt('wearmask_timeredit_two_start').setvalue('00:00:00');
  timereidt('wearmask_timeredit_two_end').setvalue('00:00:00');
  timereidt('wearmask_timeredit_three_start').setvalue('00:00:00');
  timereidt('wearmask_timeredit_three_end').setvalue('00:00:00');
  timereidt('wearmask_timeredit_four_start').setvalue('00:00:00');
  timereidt('wearmask_timeredit_four_end').setvalue('00:00:00');
  timereidt('wearmask_timeredit_five_start').setvalue('00:00:00');
  timereidt('wearmask_timeredit_five_end').setvalue('00:00:00');
  timereidt('wearmask_timeredit_six_start').setvalue('00:00:00');
  timereidt('wearmask_timeredit_six_end').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_one_start');
  timereidt('withoutmask_timeredit_one_end');
  timereidt('withoutmask_timeredit_two_start');
  timereidt('withoutmask_timeredit_two_end');
  timereidt('withoutmask_timeredit_three_start');
  timereidt('withoutmask_timeredit_three_end');
  timereidt('withoutmask_timeredit_four_start');
  timereidt('withoutmask_timeredit_four_end');
  timereidt('withoutmask_timeredit_five_start');
  timereidt('withoutmask_timeredit_five_end');
  timereidt('withoutmask_timeredit_six_start');
  timereidt('withoutmask_timeredit_six_end');
  timereidt('withoutmask_timeredit_one_start').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_one_end').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_two_start').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_two_end').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_three_start').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_three_end').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_four_start').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_four_end').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_five_start').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_five_end').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_six_start').setvalue('00:00:00');
  timereidt('withoutmask_timeredit_six_end').setvalue('00:00:00');
}
function fun_baseparam_restore() {
  fun_init_baseparameters();
}
function fun_baseparam_refresh() {
  bratiochange = false;
  fun_get_baseparams();
}
function fun_baseparam_save() {
  fun_save_baseparams();
  bratiochange = false;
}
function fun_schedule_restore() {
  $('#div_schedule_facedetection_manual').css('display', 'none');
  document.getElementById('radio_schedule_facedetection_disable').checked = true;
  $('#div_schedule_wearmask_manual').css('display', 'none');
  document.getElementById('radio_schedule_wearmask_disable').checked = true;
  $('#div_schedule_withoutmask_manual').css('display', 'none');
  document.getElementById('radio_schedule_withoutmask_disable').checked = true;
  $('#input_schedule_facedetection_mintime_text').val('10');
  $('#input_schedule_wearmask_mintime_text').val('10');
  $('#input_schedule_withoutmask_mintime_text').val('10');
  $('#select_schedule_type').val(0);
  $('#div_facedetection_schedule_facedetection').css('display', 'block');
  $('#div_facedetection_schedule_wearmask').css('display', 'none');
  $('#div_facedetection_schedule_withoutmask').css('display', 'none');
}
function fun_actions_restore() {
  document.getElementById('check_facedetection_record').checked = false;
  document.getElementById('check_facedetection_ftp').checked = false;
  document.getElementById('check_facedetection_sendemail').checked = false;
  document.getElementById('check_facedetection_snapshot').checked = false;
  document.getElementById('check_facedetection_iooutput').checked = false;
  document.getElementById('check_facedetection_rsio').checked = false;
  document.getElementById('check_facedetection_ledblink').checked = false;
  document.getElementById('check_wearmask_record').checked = false;
  document.getElementById('check_wearmask_ftp').checked = false;
  document.getElementById('check_wearmask_sendemail').checked = false;
  document.getElementById('check_wearmask_snapshot').checked = false;
  document.getElementById('check_wearmask_iooutput').checked = false;
  document.getElementById('check_wearmask_rsio').checked = false;
  document.getElementById('check_wearmask_ledblink').checked = false;
  document.getElementById('check_wearmask_motionemulation').checked = false;
  document.getElementById('check_withoutmask_record').checked = false;
  document.getElementById('check_withoutmask_ftp').checked = false;
  document.getElementById('check_withoutmask_sendemail').checked = false;
  document.getElementById('check_withoutmask_snapshot').checked = false;
  document.getElementById('check_withoutmask_iooutput').checked = false;
  document.getElementById('check_withoutmask_rsio').checked = false;
  document.getElementById('check_withoutmask_ledblink').checked = false;
  document.getElementById('check_withoutmask_motionemulation').checked = false;
  $('#select_action_type').val(0);
  $('#div_facedetection_facedetection').css('display', 'block');
  $('#div_facedetection_wearmask').css('display', 'none');
  $('#div_facedetection_withoutmask').css('display', 'none');
}
function fun_show_facedetection_setup_dialog(bshow) {
  if (bshow) {
    var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
    $('#div_facedetection_schedule_facedetection_setdialog').dialog({
      modal: true,
      title: strschedule,
      width: 920,
      height: 352,
      resizable: false
    });
  } else {
    $('#div_facedetection_schedule_facedetection_setdialog').dialog('destroy');
    $('#div_facedetection_schedule_facedetection_setdialog').css('display', 'none');
  }
}
function fun_show_wearmask_setup_dialog(bshow) {
  if (bshow) {
    var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
    $('#div_facedetection_schedule_wearmask_setdialog').dialog({
      modal: true,
      title: strschedule,
      width: 920,
      height: 352,
      resizable: false
    });
  } else {
    $('#div_facedetection_schedule_wearmask_setdialog').dialog('destroy');
    $('#div_facedetection_schedule_wearmask_setdialog').css('display', 'none');
  }
}
function fun_show_withoutmask_setup_dialog(bshow) {
  if (bshow) {
    var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
    $('#div_facedetection_schedule_withoutmask_setdialog').dialog({
      modal: true,
      title: strschedule,
      width: 920,
      height: 352,
      resizable: false
    });
  } else {
    $('#div_facedetection_schedule_withoutmask_setdialog').dialog('destroy');
    $('#div_facedetection_schedule_withoutmask_setdialog').css('display', 'none');
  }
}
function fun_get_facedct_license() {
  sdk_getipcparam('/action/get?subject=valicense', function (result) {
    if (result === false) {
      return;
    }
    $xml = $(result);
    var status = $xml.find('status').text();
    var strkey = $xml.find('key').text();

    var authok = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'authorized', '', ITEM_TYPE_NONE);
    var unauth = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'unauthorized', '', ITEM_TYPE_NONE);

    if (status === '0') {
      $('#div_facedct_autoorize_status_text').text(authok);
      $('#input_facedetection_authorize_key').attr('readonly', 'readonly');
      $('#button_facedetection_authorize_save').attr('disabled', 'disabled');
    } else {
      $('#div_facedct_autoorize_status_text').text(unauth);
      $('#input_facedetection_authorize_key').removeAttr('readonly');
      $('#button_facedetection_authorize_save').removeAttr('disabled');
    }
    if (strkey.length > 0) {
      $('#input_facedetection_authorize_key').val(strkey);
    }
  });
}
function fun_on_facedct_save() {
  var authkey = $('#input_facedetection_authorize_key').val();
  var tagxml = '<?xml vertion="1.0" encoding="utf-8"?>' + '<request>' + '<valicense ver="2.0">' + '<status>0</status>' + '<key>' + authkey + '</key>' + '<valicense>' + '<request>';

  var mustinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
  var authsuc = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'suctorboot', '', ITEM_TYPE_NONE);
  var authfai = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'authfailed', '', ITEM_TYPE_NONE);
  if (authkey.length <= 0) {
    parent.fun_show_tips_dialog(mustinput, 0);
  }
  sdk_setipcparam('/action/set?subject=valicense', tagxml, function (result) {
    if (true === result) {
      parent.fun_show_tips_dialog(authsuc);
    } else {
      parent.fun_show_tips_dialog(authfai, 0);
    }
  });
}
var g_activex_plugin = null;
var g_ocxdraw_index = 0;
function fun_on_ieplugin_load() {
  sdk_getipcparam('/action/get?subject=netserv', function (result) {
    if (result != false) {
      $xml = $(result);
      var tcpport = $xml.find('tcp').text();
      var obj = document.getElementById('VIDEO');
      obj.Language = current_language_number();
      obj.UIMode = 14;
      obj.DeviceIp = document.location.hostname;
      obj.TcpPort = tcpport;
      obj.StretchVideo(1);
      obj.SetItemShow(1);
      obj.SetLayerDrawIndex(0);
      g_activex_plugin = obj;
      addEvent(obj, 'OnDrawItemChange', fun_on_ocxplugin_drawevent);
      fun_get_baseparams();
    }
  });
}
function addEvent(element, type, handler) {
  if (element.attachEvent) {
    element.attachEvent(type, handler);
  } else if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  }
}
function fun_on_ocxplugin_drawevent(strpts) {
  var ptslist = strpts.split(',');
  if (ptslist.length !== 16) {
    return;
  }
  var rectadjust = false;
  var x1, y1, w1, h1, x2, y2, w2, h2;
  x1 = parseInt(ptslist[0]);
  y1 = parseInt(ptslist[1]);
  w1 = parseInt(ptslist[2]);
  h1 = parseInt(ptslist[3]);
  x2 = parseInt(ptslist[4]);
  y2 = parseInt(ptslist[5]);
  w2 = parseInt(ptslist[6]);
  h2 = parseInt(ptslist[7]);

  if (0 == g_ocxdraw_index) {
    if (w1 <= w2) {
      w1 = w2 + 7;
      while (w1 + x1 > 633 && x1 > 0) {
        x1--;
      }
      rectadjust = true;
    }
    if (h1 <= h2) {
      h1 = h2 + 4;
      while (h1 + y1 > 352 && y1 > 0) {
        y1--;
      }
      rectadjust = true;
    }

    rectsper[1].x1 = Math.floor(x1 / 6.4);
    rectsper[1].x2 = Math.floor(w1 / 6.4) + rectsper[1].x1;
    rectsper[1].y1 = Math.floor(y1 / 3.6);
    rectsper[1].y2 = Math.floor(h1 / 3.6) + rectsper[1].y1;
  } else if (1 == g_ocxdraw_index) {
    if (w1 <= w2) {
      w2 = w1 - 7;
      rectadjust = true;
    }
    if (h1 <= h2) {
      h2 = h1 - 4;
      rectadjust = true;
    }

    rectsper[0].x1 = Math.floor(x2 / 6.4);
    rectsper[0].x2 = Math.floor(w2 / 6.4) + rectsper[0].x1;
    rectsper[0].y1 = Math.floor(y2 / 3.6);
    rectsper[0].y2 = Math.floor(h2 / 3.6) + rectsper[0].y1;
  }
  if (rectadjust) {
    var strpara = '' + x1 + ',' + y1 + ',' + w1 + ',' + h1 + ',' + x2 + ',' + y2 + ',' + w2 + ',' + h2 + ',0,0,0,0,0,0,0,0';
    g_activex_plugin.SetRectangePoints(strpara);
  }
  if (1 === g_ocxdraw_index) {
    $('#input_facedetection_filter_min_width').val(rectsper[0].x2 - rectsper[0].x1);
    $('#input_facedetection_filter_min_height').val(rectsper[0].y2 - rectsper[0].y1);
  } else {
    $('#input_facedetection_filter_max_width').val(rectsper[1].x2 - rectsper[1].x1);
    $('#input_facedetection_filter_max_height').val(rectsper[1].y2 - rectsper[1].y1);
  }
}
