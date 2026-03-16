$(document).ready(function () {
  if (current_language_number() == 25) {
    $('#div_table_facedetect_region').css('width', 190);
    $('#div_table_facedetect_schedule').css('width', 190);
    $('#div_table_facedetect_actions').css('width', 190);
  }
  fun_register_all_events();
  fun_init_schedule_panel();
  fun_multilang_adapter();
  fun_get_ability();
  fun_get_schedule_parameters();
  fun_init_timer_section_item();
  fun_init_draw_panel();
});
function fun_get_ability() {
  sdk_getipcparam('/action/get?subject=snapability', function (result) {
    if (result != false) {
      $xml = $(result);
      var streamopt = $xml.find('streamopt').text();
      if (parseInt(streamopt) <= 0) {
        $('#div_page_action_snapshot').css('display', 'none');
      } else {
        $('#div_page_action_snapshot').css('display', 'block');
      }
    }
  });
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result != false) {
      $xml = $(result);
      var fullcolor = $xml.find('fullcolor').text();
      var whled = $xml.find('whled').text();
      var irled = $xml.find('irled').text();
      if (fullcolor == 1 || whled == 1 || irled == 2) {
        $('#div_page_action_ledblink').css('display', 'block');
      }
      var serialenable = parseInt($xml.find('serial').text()); //RS485
      // console.log(serialenable);
      if (serialenable <= 0) {
        $('#div_page_action_rsio').css('display', 'none');
      }
    }
  });
}

function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'basesetting', 'div_table_facedetect_region_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'schedule', 'div_table_facedetect_schedule_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'action', 'div_table_facedetect_actions_text', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'mintime', 'div_schedule_trigger_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'setup', 'button_schedule_sunday_setup,button_schedule_monday_setup,button_schedule_tuesday_setup,button_schedule_wednesday_setup,button_schedule_thursday_setup,button_schedule_friday_setup,button_schedule_saturday_setup', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'alarmout', 'label_action_alarm_output', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'record', 'label_action_record', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'ftp', 'label_action_ftp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'sendemail', 'label_action_send_email', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'snapshot', 'label_action_snapshot', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'audioout', 'label_action_audio_out', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'notifyserver', 'label_action_notify_server', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'evtblink', 'label_action_alarm_ledblink', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'allrect', 'button_region_fullscreen', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'confidenceval', 'div_confidence_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'targetmask', 'label_humandct_tagmask_name', ITEM_TYPE_TEXT);

  var strmax = translate_page_item(TARGET_PAGE_COMMON, 'maximum', '', ITEM_TYPE_NONE);
  var strsecond = translate_page_item(TARGET_PAGE_COMMON, 'second', '', ITEM_TYPE_NONE);
  $('#div_schedule_trigger_declare').text('[ ' + strmax + ' 300 ' + strsecond + ' ]');

  fase_detect_note = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'facenote', '', ITEM_TYPE_NONE);

  translate_page_item(TARGET_PAGE_COMMON, 'sunday', 'div_sunday,label_sunday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'monday', 'div_monday,label_monday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'tuesday', 'div_tuesday,label_tuesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'wednesday', 'div_wednesday,label_wednesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'thursday', 'div_thursday,label_thursday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'friday', 'div_friday,label_friday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'saturday', 'div_saturday,label_saturday', ITEM_TYPE_TEXT);

  var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
  var strhour = translate_page_item(TARGET_PAGE_COMMON, 'hour', '', ITEM_TYPE_NONE);
  var strdisable = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE);
  var strselall = translate_page_item(TARGET_PAGE_COMMON, 'selall', '', ITEM_TYPE_NONE);
  var strperiod = translate_page_item(TARGET_PAGE_COMMON, 'period', '', ITEM_TYPE_NONE);

  translate_page_item(TARGET_PAGE_COMMON, 'clear', 'button_region_clear', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_region_save', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_schedule_restore,button_actions_restore,button_region_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_schedule_refresh,button_actions_refresh,button_region_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_schedule_save,button_schedule_timesection_save,button_actions_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_schedule_timesection_cancel', ITEM_TYPE_VALUE);

  $('#label_schedule_allday').text('7*24 ' + strhour);
  $('#label_schedule_custom').text(strschedule);
  $('#label_schedule_disable').text(strdisable);
  $('#label_all').text(strselall);

  $('#label_section1').text(strperiod + ' 1:');
  $('#label_section2').text(strperiod + ' 2:');
  $('#label_section3').text(strperiod + ' 3:');
  $('#label_section4').text(strperiod + ' 4:');
  $('#label_section5').text(strperiod + ' 5:');
  $('#label_section6').text(strperiod + ' 6:');

  input_edit_restriction('input_schedule_trigger_value', EDIT_RESTRICTION_NUMBER, 3);
}

function fun_register_all_events() {
  $('.cls_tablebar_item').click(function () {
    var objid = this.id.toString();
    if (objid === 'div_table_facedetect_region') {
      $('#div_page_region').css('display', 'block');
      $('#div_page_schedule').css('display', 'none');
      $('#div_page_actions').css('display', 'none');
      $('#div_table_facedetect_region').addClass('cls_tablebar_item_selected');
      $('#div_table_facedetect_schedule,#div_table_facedetect_actions').removeClass('cls_tablebar_item_selected');
    } else if (objid === 'div_table_facedetect_schedule') {
      $('#div_page_region').css('display', 'none');
      $('#div_page_schedule').css('display', 'block');
      $('#div_page_actions').css('display', 'none');
      $('#div_table_facedetect_schedule').addClass('cls_tablebar_item_selected');
      $('#div_table_facedetect_region,#div_table_facedetect_actions').removeClass('cls_tablebar_item_selected');
    } else if (objid === 'div_table_facedetect_actions') {
      $('#div_page_region').css('display', 'none');
      $('#div_page_schedule').css('display', 'none');
      $('#div_page_actions').css('display', 'block');
      $('#div_table_facedetect_actions').addClass('cls_tablebar_item_selected');
      $('#div_table_facedetect_schedule,#div_table_facedetect_region').removeClass('cls_tablebar_item_selected');
    }
  });
  $('.cls_schedule_setup_dialog_button').click(function () {
    var objid = this.id.toString();
    fun_on_schedule_setup(objid);
  });
  $('.cls_schedule_radio').click(function () {
    var objid = this.id.toString();
    fun_on_schedule_enable_change(objid);
  });
  $('#check_weekday_alldays').click(function () {
    fun_on_setup_select_all();
  });
  $('#button_schedule_timesection_save').click(function () {
    fun_on_setup_save();
  });
  $('#button_schedule_timesection_cancel').click(function () {
    fun_on_setup_cancel();
  });
  $('#button_region_clear').click(function () {
    fun_on_base_clear();
  });
  $('#button_region_save').click(function () {
    fun_on_base_save();
  });
  $('#button_schedule_restore').click(function () {
    fun_on_schedule_restore();
  });
  $('#button_schedule_refresh').click(function () {
    fun_on_schedule_refresh();
  });
  $('#button_schedule_save').click(function () {
    fun_on_schedule_save();
  });
  $('#button_actions_restore').click(function () {
    fun_on_action_restore();
  });
  $('#button_actions_refresh').click(function () {
    fun_on_action_refresh();
  });
  $('#button_actions_save').click(function () {
    fun_on_action_save();
  });
  $('#button_region_restore').click(function () {
    fun_on_region_restore();
  });
  $('#button_region_refresh').click(function () {
    fun_on_region_refresh();
  });
  $('.smartva_checkbox_change').click(function () {
    fun_smartva_checkbox_change();
  });
}

function fun_smartva_checkbox_change() {
  var checkboxall = $('#div_setup_weekday_select .smartva_checkbox_change').length;
  var checked = $('#div_setup_weekday_select .smartva_checkbox_change:checked').length;
  if (checked < checkboxall) {
    $('#check_weekday_alldays').prop('checked', false);
  } else {
    $('#check_weekday_alldays').prop('checked', true);
  }
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

function fun_init_timer_section_item() {
  timereidt('timeredit_one_start');
  timereidt('timeredit_one_end');
  timereidt('timeredit_two_start');
  timereidt('timeredit_two_end');
  timereidt('timeredit_three_start');
  timereidt('timeredit_three_end');
  timereidt('timeredit_four_start');
  timereidt('timeredit_four_end');
  timereidt('timeredit_five_start');
  timereidt('timeredit_five_end');
  timereidt('timeredit_six_start');
  timereidt('timeredit_six_end');

  timereidt('timeredit_one_start').setvalue('00:00:00');
  timereidt('timeredit_one_end').setvalue('00:00:00');
  timereidt('timeredit_two_start').setvalue('00:00:00');
  timereidt('timeredit_two_end').setvalue('00:00:00');
  timereidt('timeredit_three_start').setvalue('00:00:00');
  timereidt('timeredit_three_end').setvalue('00:00:00');
  timereidt('timeredit_four_start').setvalue('00:00:00');
  timereidt('timeredit_four_end').setvalue('00:00:00');
  timereidt('timeredit_five_start').setvalue('00:00:00');
  timereidt('timeredit_five_end').setvalue('00:00:00');
  timereidt('timeredit_six_start').setvalue('00:00:00');
  timereidt('timeredit_six_end').setvalue('00:00:00');
}

function fun_init_draw_panel() {
  $('#slider_humandct_confidence').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 0,
    change: fun_on_slider_change
  });
  $('#div_page_media_area').css('display', 'block');
  if (!CurBrowserIsIE()) {
    if (null == video_overlay_draw) {
      video_overlay_draw = new video_drawx('div_page_video_draw', VIDEO_DRAWX_COVER_TYPE_RECT);
      if (null != video_overlay_draw) {
        video_overlay_draw.start();
        if (null != facedetect_parameters) {
          video_overlay_draw.setvalue(crossline_parameters.start, crossline_parameters.end, null, null);
        }
        video_overlay_draw.enabledraw(false);

        video_overlay_draw.setcmptfunc(fun_drawx_complated_callback);
      }
    }
    fun_get_base_parameters();
  } else {
    $('#div_page_video_draw').html("<OBJECT id='VIDEO' width='" + 640 + "' height='" + 360 + "' align='center' classid='clsid:FEB29125-2FEA-403E-985B-8E4930ABBA56'> </OBJECT><script type='text/javascript' language='JavaScript' event='OnLoad' for='preview_player'>fun_on_ieplugin_load();</script>'");
  }
}

function fun_on_slider_change() {
  var value = $('#slider_humandct_confidence').slider('option', 'value');
  $('#div_confidence_value').text(value);
}

function fun_drawx_complated_callback(index, rectobj) {
  if (rectobj.width * rectobj.height * 2 > 640 * 360) {
  }
}

function fun_init_schedule_panel() {
  g_schedule_painter = new normal_schedule('div_schedule_panel', 720, 224);
}

function fun_show_setup_dialog(bshow) {
  if (bshow) {
    var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
    $('#div_normal_schedule_setdialog').dialog({
      modal: true,
      title: strschedule,
      width: 920,
      height: 352,
      resizable: false
    });
  } else {
    $('#div_normal_schedule_setdialog').dialog('destroy');
    $('#div_normal_schedule_setdialog').css('display', 'none');
  }
}

var g_schedule_painter = null;
var video_window_width = 640;
var video_window_height = 360;
var g_current_set_day = 0;
var real_schedule_timesection = [];
var facedetect_parameters = null;
var schedule_action_mask = 0;
var schedule_action_old_mask = 0;
var crossline_parameters = null;
var video_overlay_draw = null;
var g_activex_plugin = null;
var fase_detect_note = '';

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

function fun_convert_timestring(strtime) {
  var timearr = strtime.split(':');
  return parseInt(timearr[0]) * 3600 + parseInt(timearr[1]) * 60 + parseInt(timearr[2]);
}

function fun_convert_serverfmt(start, end) {
  return String(start) + '-' + String(end);
}

function fun_get_video_picture() {
  Math.random() * 700;
  var num = Math.random() * 700 + 800;
  num = parseInt(num, 10);
  var tagpash = '/action/snap?t=' + String(num);
  $('#img_video_show').attr('src', tagpash);
  setTimeout('fun_get_video_picture();', 1000);
}

function fun_on_schedule_enable_change(objid) {
  if (objid === 'radio_schedule_disable') {
    document.getElementById('div_page_schedule_setting').style.setProperty('display', 'none');
  } else if (objid === 'radio_schedule_custom') {
    document.getElementById('div_page_schedule_setting').style.setProperty('display', 'block');
  } else if (objid === 'radio_schedule_allday') {
    document.getElementById('div_page_schedule_setting').style.setProperty('display', 'none');
  }
}

function fun_get_schedule_parameters() {
  for (var index = 0; index < 7; index++) {
    real_schedule_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
  }
  sdk_getipcparam('/action/get?subject=alarm&type=26', function (result) {
    if (result != false) {
      $xml = $(result);
      var active = $xml.find('active').text();
      var duration = $xml.find('duration').text();
      var outmask = $xml.find('outmask').text();

      if (active == 0) {
        document.getElementById('radio_schedule_disable').checked = true;
        document.getElementById('div_page_schedule_setting').style.setProperty('display', 'none');
      } else if (active == 1) {
        document.getElementById('radio_schedule_allday').checked = true;
        document.getElementById('div_page_schedule_setting').style.setProperty('display', 'none');
      } else if (active == 2) {
        document.getElementById('radio_schedule_custom').checked = true;
        document.getElementById('div_page_schedule_setting').style.setProperty('display', 'block');
      }
      $('#input_schedule_trigger_value').val(duration);
      var actionmask = parseInt(outmask);
      if (actionmask & 1) {
        document.getElementById('check_action_iooutput').checked = true;
      } else {
        document.getElementById('check_action_iooutput').checked = false;
      }
      if (actionmask & (1 << 8)) {
        document.getElementById('check_action_ledblink').checked = true;
      } else {
        document.getElementById('check_action_ledblink').checked = false;
      }
      if (actionmask & (1 << 12)) {
        document.getElementById('check_action_snapshot').checked = true;
      } else {
        document.getElementById('check_action_snapshot').checked = false;
      }
      if (actionmask & (1 << 13)) {
        document.getElementById('check_action_record').checked = true;
      } else {
        document.getElementById('check_action_record').checked = false;
      }
      if (actionmask & (1 << 14)) {
        document.getElementById('check_action_ftp').checked = true;
      } else {
        document.getElementById('check_action_ftp').checked = false;
      }
      if (actionmask & (1 << 16)) {
        document.getElementById('check_action_sendemail').checked = true;
      } else {
        document.getElementById('check_action_sendemail').checked = false;
      }
      if (actionmask & (1 << 17)) {
        document.getElementById('check_action_audioout').checked = true;
      } else {
        document.getElementById('check_action_audioout').checked = false;
      }
      if (actionmask & (1 << 18)) {
        document.getElementById('check_action_evtserver').checked = true;
      } else {
        document.getElementById('check_action_evtserver').checked = false;
      }
      if (actionmask & (1 << 19)) {
        document.getElementById('check_action_rsio').checked = true;
      } else {
        document.getElementById('check_action_rsio').checked = false;
      }
      var childindex = 0;
      var sectionindex = 1;
      schedule_action_mask = actionmask;
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
                real_schedule_timesection[childindex].tsection1.start = starttime;
                real_schedule_timesection[childindex].tsection1.end = endtime;
              } else if (sectionindex == 2) {
                real_schedule_timesection[childindex].tsection2.start = starttime;
                real_schedule_timesection[childindex].tsection2.end = endtime;
              } else if (sectionindex == 3) {
                real_schedule_timesection[childindex].tsection3.start = starttime;
                real_schedule_timesection[childindex].tsection3.end = endtime;
              } else if (sectionindex == 4) {
                real_schedule_timesection[childindex].tsection4.start = starttime;
                real_schedule_timesection[childindex].tsection4.end = endtime;
              } else if (sectionindex == 5) {
                real_schedule_timesection[childindex].tsection5.start = starttime;
                real_schedule_timesection[childindex].tsection5.end = endtime;
              } else if (sectionindex == 6) {
                real_schedule_timesection[childindex].tsection6.start = starttime;
                real_schedule_timesection[childindex].tsection6.end = endtime;
              }
              if (childindex < 6) {
                g_schedule_painter.setSection(childindex + 1, sectionindex, starttime, endtime);
              } else {
                g_schedule_painter.setSection(0, sectionindex, starttime, endtime);
              }
              sectionindex++;
            });
          sectionindex = 1;
          childindex++;
        });
    }
  });
}

function fun_get_base_parameters() {
  sdk_getipcparam('/action/get?subject=petdetect', function (result) {
    if (false === result) {
      return;
    }
    $xml = $(result);
    var spt1, spt2, spt3, spt4;
    var ptindex = 0;
    $xml.find('point').each(function () {
      if (ptindex === 0) {
        spt1 = $(this).text();
      } else if (ptindex === 1) {
        spt2 = $(this).text();
      } else if (ptindex === 2) {
        spt3 = $(this).text();
      } else if (ptindex === 3) {
        spt4 = $(this).text();
      }
      ptindex++;
    });
    var confide = $xml.find('confidence').text();
    var border = $xml.find('border').text();
    if (parseInt(confide) >= 0 && parseInt(confide) <= 100) {
      $('#slider_humandct_confidence').slider('option', 'value', confide);
    }

    if (border == 1) {
      $('#check_humandct_tagmask').prop('checked', true);
    } else {
      $('#check_humandct_tagmask').prop('checked', false);
    }
    var pt1s = spt1.split(',');
    var pt2s = spt2.split(',');
    var pt3s = spt3.split(',');
    var pt4s = spt4.split(',');

    if (!((pt1s[0] === pt2s[0] && pt1s[1] === pt2s[1]) || (pt1s[0] === pt3s[0] && pt1s[1] === pt3s[1]) || (pt1s[0] === pt4s[0] && pt1s[1] === pt4s[1]) || (pt2s[0] === pt3s[0] && pt2s[1] === pt3s[1]) || (pt2s[0] === pt4s[0] && pt2s[1] === pt4s[1]) || (pt3s[0] === pt4s[0] && pt3s[1] === pt4s[1]))) {
      if (CurBrowserIsIE()) {
        if (null !== g_activex_plugin) {
          // g_activex_plugin.SetNormalPoints(pt1s[0],pt1s[1],pt3s[0],pt3s[1]);
        }
      } else if (null !== video_overlay_draw) {
        // video_overlay_draw.setvalue(new fun_point(pt1s[0],pt1s[1]),new fun_point(pt3s[0],pt3s[1]),null,null);
      }
    }
  });
}

function fun_show_schedule_timesection_inedit(index) {
  if (index >= 0 && index < 7) {
    var timesec1start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection1.start);
    var timesec1end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection1.end);
    var timesec2start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection2.start);
    var timesec2end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection2.end);
    var timesec3start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection3.start);
    var timesec3end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection3.end);
    var timesec4start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection4.start);
    var timesec4end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection4.end);
    var timesec5start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection5.start);
    var timesec5end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection5.end);
    var timesec6start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection6.start);
    var timesec6end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection6.end);

    timereidt('timeredit_one_start').setvalue(timesec1start);
    timereidt('timeredit_one_end').setvalue(timesec1end);
    timereidt('timeredit_two_start').setvalue(timesec2start);
    timereidt('timeredit_two_end').setvalue(timesec2end);
    timereidt('timeredit_three_start').setvalue(timesec3start);
    timereidt('timeredit_three_end').setvalue(timesec3end);
    timereidt('timeredit_four_start').setvalue(timesec4start);
    timereidt('timeredit_four_end').setvalue(timesec4end);
    timereidt('timeredit_five_start').setvalue(timesec5start);
    timereidt('timeredit_five_end').setvalue(timesec5end);
    timereidt('timeredit_six_start').setvalue(timesec6start);
    timereidt('timeredit_six_end').setvalue(timesec6end);
  }
}

function fun_on_schedule_setup(objid) {
  if (objid == 'button_schedule_sunday_setup') {
    document.getElementById('check_weekday_sunday').checked = true;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#label_sunday').addClass('cls_item_name_selected');
    $('#label_monday').removeClass('cls_item_name_selected');
    $('#label_tuesday').removeClass('cls_item_name_selected');
    $('#label_wednesday').removeClass('cls_item_name_selected');
    $('#label_thursday').removeClass('cls_item_name_selected');
    $('#label_friday').removeClass('cls_item_name_selected');
    $('#label_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 7;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_monday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = true;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#label_monday').addClass('cls_item_name_selected');
    $('#label_sunday').removeClass('cls_item_name_selected');
    $('#label_tuesday').removeClass('cls_item_name_selected');
    $('#label_wednesday').removeClass('cls_item_name_selected');
    $('#label_thursday').removeClass('cls_item_name_selected');
    $('#label_friday').removeClass('cls_item_name_selected');
    $('#label_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 1;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_tuesday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = true;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#label_tuesday').addClass('cls_item_name_selected');
    $('#label_sunday').removeClass('cls_item_name_selected');
    $('#label_monday').removeClass('cls_item_name_selected');
    $('#label_wednesday').removeClass('cls_item_name_selected');
    $('#label_thursday').removeClass('cls_item_name_selected');
    $('#label_friday').removeClass('cls_item_name_selected');
    $('#label_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 2;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_wednesday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = true;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#label_wednesday').addClass('cls_item_name_selected');
    $('#label_sunday').removeClass('cls_item_name_selected');
    $('#label_tuesday').removeClass('cls_item_name_selected');
    $('#label_monday').removeClass('cls_item_name_selected');
    $('#label_thursday').removeClass('cls_item_name_selected');
    $('#label_friday').removeClass('cls_item_name_selected');
    $('#label_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 3;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_thursday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = true;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#label_thursday').addClass('cls_item_name_selected');
    $('#label_monday').removeClass('cls_item_name_selected');
    $('#label_tuesday').removeClass('cls_item_name_selected');
    $('#label_wednesday').removeClass('cls_item_name_selected');
    $('#label_mondayday').removeClass('cls_item_name_selected');
    $('#label_friday').removeClass('cls_item_name_selected');
    $('#label_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 4;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_friday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = true;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#label_friday').addClass('cls_item_name_selected');
    $('#label_monday').removeClass('cls_item_name_selected');
    $('#label_tuesday').removeClass('cls_item_name_selected');
    $('#label_wednesday').removeClass('cls_item_name_selected');
    $('#label_thursday').removeClass('cls_item_name_selected');
    $('#label_sunday').removeClass('cls_item_name_selected');
    $('#label_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 5;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_saturday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = true;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#label_saturday').addClass('cls_item_name_selected');
    $('#label_monday').removeClass('cls_item_name_selected');
    $('#label_tuesday').removeClass('cls_item_name_selected');
    $('#label_wednesday').removeClass('cls_item_name_selected');
    $('#label_thursday').removeClass('cls_item_name_selected');
    $('#label_friday').removeClass('cls_item_name_selected');
    $('#label_sunday').removeClass('cls_item_name_selected');
    g_current_set_day = 6;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  }
  fun_show_setup_dialog(true);
}

function fun_save_schedule() {
  var schedulealldays = document.getElementById('radio_schedule_allday').checked;
  var scheduleenable = document.getElementById('radio_schedule_custom').checked;
  var scheduleactive = 0;
  if (schedulealldays) {
    scheduleactive = 1;
  } else if (scheduleenable) {
    scheduleactive = 2;
  }
  var scheduleduration = document.getElementById('input_schedule_trigger_value').value;

  if (scheduleduration <= 0 || scheduleduration > 300) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<alarmevt ver="2.0">' +
    '<active>' +
    scheduleactive +
    '</active>' +
    '<duration>' +
    scheduleduration +
    '</duration>' +
    '<outmask>' +
    schedule_action_mask +
    '</outmask>' +
    '<schedule>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection1.start, real_schedule_timesection[0].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection2.start, real_schedule_timesection[0].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection3.start, real_schedule_timesection[0].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection4.start, real_schedule_timesection[0].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection5.start, real_schedule_timesection[0].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection6.start, real_schedule_timesection[0].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection1.start, real_schedule_timesection[1].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection2.start, real_schedule_timesection[1].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection3.start, real_schedule_timesection[1].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection4.start, real_schedule_timesection[1].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection5.start, real_schedule_timesection[1].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection6.start, real_schedule_timesection[1].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection1.start, real_schedule_timesection[2].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection2.start, real_schedule_timesection[2].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection3.start, real_schedule_timesection[2].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection4.start, real_schedule_timesection[2].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection5.start, real_schedule_timesection[2].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection6.start, real_schedule_timesection[2].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection1.start, real_schedule_timesection[3].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection2.start, real_schedule_timesection[3].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection3.start, real_schedule_timesection[3].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection4.start, real_schedule_timesection[3].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection5.start, real_schedule_timesection[3].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection6.start, real_schedule_timesection[3].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection1.start, real_schedule_timesection[4].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection2.start, real_schedule_timesection[4].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection3.start, real_schedule_timesection[4].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection4.start, real_schedule_timesection[4].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection5.start, real_schedule_timesection[4].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection6.start, real_schedule_timesection[4].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection1.start, real_schedule_timesection[5].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection2.start, real_schedule_timesection[5].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection3.start, real_schedule_timesection[5].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection4.start, real_schedule_timesection[5].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection5.start, real_schedule_timesection[5].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection6.start, real_schedule_timesection[5].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection1.start, real_schedule_timesection[6].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection2.start, real_schedule_timesection[6].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection3.start, real_schedule_timesection[6].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection4.start, real_schedule_timesection[6].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection5.start, real_schedule_timesection[6].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection6.start, real_schedule_timesection[6].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '</schedule>' +
    '</alarmevt>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=alarm&type=26', targetxml, function (result) {
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

function fun_on_base_clear() {
  if (CurBrowserIsIE()) {
    if (null !== g_activex_plugin) {
      g_activex_plugin.ClearDrawItems();
    }
  } else if (null !== video_overlay_draw) {
    video_overlay_draw.clear();
  }
}

function fun_on_base_save() {
  var tagmask = $('#check_humandct_tagmask').prop('checked') ? 1 : 0;
  var confide = $('#slider_humandct_confidence').slider('value');
  var points = null;
  var tagrect = null;

  if (CurBrowserIsIE()) {
    if (null !== g_activex_plugin) {
      var strpts = g_activex_plugin.GetRectangleValue();
      var ptslist = strpts.split(',');
      if (ptslist.length === 4) {
        points = new Array(new fun_point(ptslist[0], ptslist[1]), new fun_point(ptslist[2], ptslist[1]), new fun_point(ptslist[2], ptslist[3]), new fun_point(ptslist[0], ptslist[3]));
      } else {
        points = new Array(new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0));
      }
    }
  } else {
    if (null !== video_overlay_draw) {
      points = video_overlay_draw.getvalue();
      tagrect = video_drawx_check_rectangle(points.a, points.b);
    }
    if (null === points || points.length !== 4) {
      if (tagrect.width * tagrect.height > 5000) {
        var errarea = translate_page_item(TARGET_PAGE_TIPSTEXT, 'rectlarge', '', ITEM_TYPE_NONE);
        parent.fun_show_tips_dialog(errarea, 0);
        return;
      }
      //points = new Array(new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0));
      points = new Array(new fun_point(tagrect.left, tagrect.top), new fun_point(tagrect.left + tagrect.width, tagrect.top), new fun_point(tagrect.left + tagrect.width, tagrect.top + tagrect.height), new fun_point(tagrect.left, tagrect.top + tagrect.height));
    }
  }
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<request>\n' +
    '<petdetect ver="2.0">\n' +
    '<enable>1</enable>\n' +
    '<confidence>' +
    confide +
    '</confidence>\n' +
    '<border>' +
    tagmask +
    '</border>\n' +
    '<polygon>\n' +
    '<point>' +
    points[0].x +
    ',' +
    points[0].y +
    '</point>\n' +
    '<point>' +
    points[1].x +
    ',' +
    points[1].y +
    '</point>\n' +
    '<point>' +
    points[2].x +
    ',' +
    points[2].y +
    '</point>\n' +
    '<point>' +
    points[3].x +
    ',' +
    points[3].y +
    '</point>\n' +
    '</polygon>\n' +
    '</petdetect>\n' +
    '</request>';
  sdk_setipcparam('/action/set?subject=petdetect', targetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
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

function fun_on_setup_save() {
  var sundayenable = document.getElementById('check_weekday_sunday').checked;
  var mondayenable = document.getElementById('check_weekday_monday').checked;
  var tuesdayenable = document.getElementById('check_weekday_tuesday').checked;
  var wednesdayenable = document.getElementById('check_weekday_wednesday').checked;
  var thursdayenable = document.getElementById('check_weekday_thursday').checked;
  var fridayenable = document.getElementById('check_weekday_friday').checked;
  var saturdayenable = document.getElementById('check_weekday_saturday').checked;

  var enable1 = true;
  var enable2 = true;
  var enable3 = true;
  var enable4 = true;
  var enable5 = true;
  var enable6 = true;

  var sec1start = timereidt('timeredit_one_start').getvalue();
  var sec1end = timereidt('timeredit_one_end').getvalue();
  var sec2start = timereidt('timeredit_two_start').getvalue();
  var sec2end = timereidt('timeredit_two_end').getvalue();
  var sec3start = timereidt('timeredit_three_start').getvalue();
  var sec3end = timereidt('timeredit_three_end').getvalue();
  var sec4start = timereidt('timeredit_four_start').getvalue();
  var sec4end = timereidt('timeredit_four_end').getvalue();
  var sec5start = timereidt('timeredit_five_start').getvalue();
  var sec5end = timereidt('timeredit_five_end').getvalue();
  var sec6start = timereidt('timeredit_six_start').getvalue();
  var sec6end = timereidt('timeredit_six_end').getvalue();
  var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
  if (fun_compare_sande(sec1start, sec1end) || fun_compare_sande(sec2start, sec2end) || fun_compare_sande(sec3start, sec3end) || fun_compare_sande(sec4start, sec4end) || fun_compare_sande(sec5start, sec5end) || fun_compare_sande(sec6start, sec6end)) {
    parent.fun_show_tips_dialog(gtips_input, 0);
    return;
  }
  if (sundayenable) {
    if (enable1) {
      real_schedule_timesection[6].tsection1.start = fun_convert_timestring(sec1start);
      real_schedule_timesection[6].tsection1.end = fun_convert_timestring(sec1end);
      g_schedule_painter.setSection(0, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
    }
    if (enable2) {
      real_schedule_timesection[6].tsection2.start = fun_convert_timestring(sec2start);
      real_schedule_timesection[6].tsection2.end = fun_convert_timestring(sec2end);
      g_schedule_painter.setSection(0, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
    }
    if (enable3) {
      real_schedule_timesection[6].tsection3.start = fun_convert_timestring(sec3start);
      real_schedule_timesection[6].tsection3.end = fun_convert_timestring(sec3end);
      g_schedule_painter.setSection(0, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
    }
    if (enable4) {
      real_schedule_timesection[6].tsection4.start = fun_convert_timestring(sec4start);
      real_schedule_timesection[6].tsection4.end = fun_convert_timestring(sec4end);
      g_schedule_painter.setSection(0, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
    }
    if (enable5) {
      real_schedule_timesection[6].tsection5.start = fun_convert_timestring(sec5start);
      real_schedule_timesection[6].tsection5.end = fun_convert_timestring(sec5end);
      g_schedule_painter.setSection(0, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
    }
    if (enable6) {
      real_schedule_timesection[6].tsection6.start = fun_convert_timestring(sec6start);
      real_schedule_timesection[6].tsection6.end = fun_convert_timestring(sec6end);
      g_schedule_painter.setSection(0, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
    }
  }
  if (mondayenable) {
    if (enable1) {
      real_schedule_timesection[0].tsection1.start = fun_convert_timestring(sec1start);
      real_schedule_timesection[0].tsection1.end = fun_convert_timestring(sec1end);
      g_schedule_painter.setSection(1, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
    }
    if (enable2) {
      real_schedule_timesection[0].tsection2.start = fun_convert_timestring(sec2start);
      real_schedule_timesection[0].tsection2.end = fun_convert_timestring(sec2end);
      g_schedule_painter.setSection(1, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
    }
    if (enable3) {
      real_schedule_timesection[0].tsection3.start = fun_convert_timestring(sec3start);
      real_schedule_timesection[0].tsection3.end = fun_convert_timestring(sec3end);
      g_schedule_painter.setSection(1, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
    }
    if (enable4) {
      real_schedule_timesection[0].tsection4.start = fun_convert_timestring(sec4start);
      real_schedule_timesection[0].tsection4.end = fun_convert_timestring(sec4end);
      g_schedule_painter.setSection(1, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
    }
    if (enable5) {
      real_schedule_timesection[0].tsection5.start = fun_convert_timestring(sec5start);
      real_schedule_timesection[0].tsection5.end = fun_convert_timestring(sec5end);
      g_schedule_painter.setSection(1, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
    }
    if (enable6) {
      real_schedule_timesection[0].tsection6.start = fun_convert_timestring(sec6start);
      real_schedule_timesection[0].tsection6.end = fun_convert_timestring(sec6end);
      g_schedule_painter.setSection(1, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
    }
  }
  if (tuesdayenable) {
    if (enable1) {
      real_schedule_timesection[1].tsection1.start = fun_convert_timestring(sec1start);
      real_schedule_timesection[1].tsection1.end = fun_convert_timestring(sec1end);
      g_schedule_painter.setSection(2, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
    }
    if (enable2) {
      real_schedule_timesection[1].tsection2.start = fun_convert_timestring(sec2start);
      real_schedule_timesection[1].tsection2.end = fun_convert_timestring(sec2end);
      g_schedule_painter.setSection(2, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
    }
    if (enable3) {
      real_schedule_timesection[1].tsection3.start = fun_convert_timestring(sec3start);
      real_schedule_timesection[1].tsection3.end = fun_convert_timestring(sec3end);
      g_schedule_painter.setSection(2, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
    }
    if (enable4) {
      real_schedule_timesection[1].tsection4.start = fun_convert_timestring(sec4start);
      real_schedule_timesection[1].tsection4.end = fun_convert_timestring(sec4end);
      g_schedule_painter.setSection(2, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
    }
    if (enable5) {
      real_schedule_timesection[1].tsection5.start = fun_convert_timestring(sec5start);
      real_schedule_timesection[1].tsection5.end = fun_convert_timestring(sec5end);
      g_schedule_painter.setSection(2, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
    }
    if (enable6) {
      real_schedule_timesection[1].tsection6.start = fun_convert_timestring(sec6start);
      real_schedule_timesection[1].tsection6.end = fun_convert_timestring(sec6end);
      g_schedule_painter.setSection(2, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
    }
  }
  if (wednesdayenable) {
    if (enable1) {
      real_schedule_timesection[2].tsection1.start = fun_convert_timestring(sec1start);
      real_schedule_timesection[2].tsection1.end = fun_convert_timestring(sec1end);
      g_schedule_painter.setSection(3, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
    }
    if (enable2) {
      real_schedule_timesection[2].tsection2.start = fun_convert_timestring(sec2start);
      real_schedule_timesection[2].tsection2.end = fun_convert_timestring(sec2end);
      g_schedule_painter.setSection(3, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
    }
    if (enable3) {
      real_schedule_timesection[2].tsection3.start = fun_convert_timestring(sec3start);
      real_schedule_timesection[2].tsection3.end = fun_convert_timestring(sec3end);
      g_schedule_painter.setSection(3, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
    }
    if (enable4) {
      real_schedule_timesection[2].tsection4.start = fun_convert_timestring(sec4start);
      real_schedule_timesection[2].tsection4.end = fun_convert_timestring(sec4end);
      g_schedule_painter.setSection(3, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
    }
    if (enable5) {
      real_schedule_timesection[2].tsection5.start = fun_convert_timestring(sec5start);
      real_schedule_timesection[2].tsection5.end = fun_convert_timestring(sec5end);
      g_schedule_painter.setSection(3, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
    }
    if (enable6) {
      real_schedule_timesection[2].tsection6.start = fun_convert_timestring(sec6start);
      real_schedule_timesection[2].tsection6.end = fun_convert_timestring(sec6end);
      g_schedule_painter.setSection(3, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
    }
  }
  if (thursdayenable) {
    if (enable1) {
      real_schedule_timesection[3].tsection1.start = fun_convert_timestring(sec1start);
      real_schedule_timesection[3].tsection1.end = fun_convert_timestring(sec1end);
      g_schedule_painter.setSection(4, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
    }
    if (enable2) {
      real_schedule_timesection[3].tsection2.start = fun_convert_timestring(sec2start);
      real_schedule_timesection[3].tsection2.end = fun_convert_timestring(sec2end);
      g_schedule_painter.setSection(4, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
    }
    if (enable3) {
      real_schedule_timesection[3].tsection3.start = fun_convert_timestring(sec3start);
      real_schedule_timesection[3].tsection3.end = fun_convert_timestring(sec3end);
      g_schedule_painter.setSection(4, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
    }
    if (enable4) {
      real_schedule_timesection[3].tsection4.start = fun_convert_timestring(sec4start);
      real_schedule_timesection[3].tsection4.end = fun_convert_timestring(sec4end);
      g_schedule_painter.setSection(4, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
    }
    if (enable5) {
      real_schedule_timesection[3].tsection5.start = fun_convert_timestring(sec5start);
      real_schedule_timesection[3].tsection5.end = fun_convert_timestring(sec5end);
      g_schedule_painter.setSection(4, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
    }
    if (enable6) {
      real_schedule_timesection[3].tsection6.start = fun_convert_timestring(sec6start);
      real_schedule_timesection[3].tsection6.end = fun_convert_timestring(sec6end);
      g_schedule_painter.setSection(4, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
    }
  }
  if (fridayenable) {
    if (enable1) {
      real_schedule_timesection[4].tsection1.start = fun_convert_timestring(sec1start);
      real_schedule_timesection[4].tsection1.end = fun_convert_timestring(sec1end);
      g_schedule_painter.setSection(5, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
    }
    if (enable2) {
      real_schedule_timesection[4].tsection2.start = fun_convert_timestring(sec2start);
      real_schedule_timesection[4].tsection2.end = fun_convert_timestring(sec2end);
      g_schedule_painter.setSection(5, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
    }
    if (enable3) {
      real_schedule_timesection[4].tsection3.start = fun_convert_timestring(sec3start);
      real_schedule_timesection[4].tsection3.end = fun_convert_timestring(sec3end);
      g_schedule_painter.setSection(5, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
    }
    if (enable4) {
      real_schedule_timesection[4].tsection4.start = fun_convert_timestring(sec4start);
      real_schedule_timesection[4].tsection4.end = fun_convert_timestring(sec4end);
      g_schedule_painter.setSection(5, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
    }
    if (enable5) {
      real_schedule_timesection[4].tsection5.start = fun_convert_timestring(sec5start);
      real_schedule_timesection[4].tsection5.end = fun_convert_timestring(sec5end);
      g_schedule_painter.setSection(5, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
    }
    if (enable6) {
      real_schedule_timesection[4].tsection6.start = fun_convert_timestring(sec6start);
      real_schedule_timesection[4].tsection6.end = fun_convert_timestring(sec6end);
      g_schedule_painter.setSection(5, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
    }
  }
  if (saturdayenable) {
    if (enable1) {
      real_schedule_timesection[5].tsection1.start = fun_convert_timestring(sec1start);
      real_schedule_timesection[5].tsection1.end = fun_convert_timestring(sec1end);
      g_schedule_painter.setSection(6, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
    }
    if (enable2) {
      real_schedule_timesection[5].tsection2.start = fun_convert_timestring(sec2start);
      real_schedule_timesection[5].tsection2.end = fun_convert_timestring(sec2end);
      g_schedule_painter.setSection(6, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
    }
    if (enable3) {
      real_schedule_timesection[5].tsection3.start = fun_convert_timestring(sec3start);
      real_schedule_timesection[5].tsection3.end = fun_convert_timestring(sec3end);
      g_schedule_painter.setSection(6, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
    }
    if (enable4) {
      real_schedule_timesection[5].tsection4.start = fun_convert_timestring(sec4start);
      real_schedule_timesection[5].tsection4.end = fun_convert_timestring(sec4end);
      g_schedule_painter.setSection(6, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
    }
    if (enable5) {
      real_schedule_timesection[5].tsection5.start = fun_convert_timestring(sec5start);
      real_schedule_timesection[5].tsection5.end = fun_convert_timestring(sec5end);
      g_schedule_painter.setSection(6, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
    }
    if (enable6) {
      real_schedule_timesection[5].tsection6.start = fun_convert_timestring(sec6start);
      real_schedule_timesection[5].tsection6.end = fun_convert_timestring(sec6end);
      g_schedule_painter.setSection(6, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
    }
  }
  fun_show_setup_dialog(false);
  fun_save_schedule();
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

function fun_on_setup_cancel() {
  fun_show_setup_dialog(false);
}

function fun_on_setup_select_all() {
  var check = $('#check_weekday_alldays').prop('checked');
  if (check) {
    $('#check_weekday_sunday').prop('checked', true);
    $('#check_weekday_monday').prop('checked', true);
    $('#check_weekday_tuesday').prop('checked', true);
    $('#check_weekday_wednesday').prop('checked', true);
    $('#check_weekday_thursday').prop('checked', true);
    $('#check_weekday_friday').prop('checked', true);
    $('#check_weekday_saturday').prop('checked', true);
  } else {
    $('#check_weekday_sunday').prop('checked', false);
    $('#check_weekday_monday').prop('checked', false);
    $('#check_weekday_tuesday').prop('checked', false);
    $('#check_weekday_wednesday').prop('checked', false);
    $('#check_weekday_thursday').prop('checked', false);
    $('#check_weekday_friday').prop('checked', false);
    $('#check_weekday_saturday').prop('checked', false);
  }
  if (g_current_set_day == 1) {
    $('#check_weekday_monday').prop('checked', true);
  } else if (g_current_set_day == 2) {
    $('#check_weekday_tuesday').prop('checked', true);
  } else if (g_current_set_day == 3) {
    $('#check_weekday_wednesday').prop('checked', true);
  } else if (g_current_set_day == 4) {
    $('#check_weekday_thursday').prop('checked', true);
  } else if (g_current_set_day == 5) {
    $('#check_weekday_friday').prop('checked', true);
  } else if (g_current_set_day == 6) {
    $('#check_weekday_saturday').prop('checked', true);
  } else if (g_current_set_day == 7) {
    $('#check_weekday_sunday').prop('checked', true);
  }
}

function fun_on_schedule_restore() {
  $('#input_schedule_trigger_value').val('10');
  document.getElementById('div_page_schedule_setting').style.setProperty('display', 'none');
  $('#radio_schedule_disable').prop('checked', true);
}

function fun_on_schedule_refresh() {
  fun_get_schedule_parameters();
}

function fun_on_schedule_save() {
  fun_save_schedule();
}

function fun_on_action_restore() {
  document.getElementById('check_action_iooutput').checked = false;
  document.getElementById('check_action_ledblink').checked = false;
  document.getElementById('check_action_record').checked = false;
  document.getElementById('check_action_ftp').checked = false;
  document.getElementById('check_action_sendemail').checked = false;
  document.getElementById('check_action_snapshot').checked = false;
  document.getElementById('check_action_audioout').checked = false;
  document.getElementById('check_action_evtserver').checked = false;
  document.getElementById('check_action_rsio').checked = false;
  schedule_action_mask = 0;
}

function fun_on_action_refresh() {
  fun_get_schedule_parameters();
}

function fun_on_region_restore() {
  $('#check_humandct_tagmask').prop('checked', false);
  $('#slider_humandct_confidence').slider('value', 50);
  if (CurBrowserIsIE()) {
    if (null !== g_activex_plugin) {
      // g_activex_plugin.SetNormalPoints(15,15,85,85);
    }
  } else if (null !== video_overlay_draw) {
    // video_overlay_draw.setvalue(new fun_point(15,15),new fun_point(85,85),null,null);
  }
}

function fun_on_region_refresh() {
  fun_get_base_parameters();
}

function fun_on_action_save() {
  var actionoutput = document.getElementById('check_action_iooutput').checked;
  var actionledblk = document.getElementById('check_action_ledblink').checked;
  var actionrecord = document.getElementById('check_action_record').checked;
  var actionftp = document.getElementById('check_action_ftp').checked;
  var actionemail = document.getElementById('check_action_sendemail').checked;
  var actionsnapshot = document.getElementById('check_action_snapshot').checked;
  var actionaudio = document.getElementById('check_action_audioout').checked;
  var actionevtserver = document.getElementById('check_action_evtserver').checked;
  var rsio = document.getElementById('check_action_rsio').checked;

  if (actionoutput) {
    schedule_action_mask |= 1;
  } else {
    schedule_action_mask &= ~1;
  }
  if (actionledblk) {
    schedule_action_mask |= 1 << 8;
  } else {
    schedule_action_mask &= ~(1 << 8);
  }
  if (actionrecord) {
    schedule_action_mask |= 1 << 13;
  } else {
    schedule_action_mask &= ~(1 << 13);
  }
  if (actionftp) {
    schedule_action_mask |= 1 << 14;
  } else {
    schedule_action_mask &= ~(1 << 14);
  }
  if (actionemail) {
    schedule_action_mask |= 1 << 16;
  } else {
    schedule_action_mask &= ~(1 << 16);
  }
  if (actionsnapshot) {
    schedule_action_mask |= 1 << 12;
  } else {
    schedule_action_mask &= ~(1 << 12);
  }
  if (actionaudio) {
    schedule_action_mask |= 1 << 17;
  } else {
    schedule_action_mask &= ~(1 << 17);
  }
  if (actionevtserver) {
    schedule_action_mask |= 1 << 18;
  } else {
    schedule_action_mask &= ~(1 << 18);
  }
  if (rsio) {
    schedule_action_mask |= 1 << 19;
  } else {
    schedule_action_mask &= ~(1 << 19);
  }
  fun_save_schedule();
}

function fun_on_ieplugin_load() {
  sdk_getipcparam('/action/get?subject=netserv', function (result) {
    if (result != false) {
      $xml = $(result);
      var tcpport = $xml.find('tcp').text();
      var obj = document.getElementById('VIDEO');
      obj.Language = current_language_number();
      obj.UIMode = 9;
      obj.DeviceIp = document.location.hostname;
      obj.TcpPort = tcpport;
      obj.StretchVideo(1);
      g_activex_plugin = obj;
      obj.SetEnableDraw(0);
      fun_get_base_parameters();
    }
  });
}
