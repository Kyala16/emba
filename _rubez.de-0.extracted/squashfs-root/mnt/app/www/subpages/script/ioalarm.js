var g_outcur = 0;

$(document).ready(function () {
  fun_multilang_adapter();
  fun_get_snapshot_ability();
  fun_initialize_pageui();
  fun_register_events();
});
function fun_get_snapshot_ability() {
  sdk_getipcparam('/action/get?subject=snapability', function (result) {
    if (result != false) {
      $xml = $(result);
      var streamopt = $xml.find('streamopt').text();
      if (!(parseInt(streamopt) <= 0)) {
        $('#div_ioalarm_action_snapshot').css('display', 'block');
      }
    }
  });
}

function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'ioalarmtitle', 'div_table_ioalarm_settings_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'schedule', 'div_table_ioalarm_schedule_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'action', 'div_table_ioalarm_actions_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'triggerlevel', 'div_ioalarm_input_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'outputlevel', 'div_ioalarm_output_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'alarmdn', 'div_ioalarm_daynight_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'currentin', 'div_ioalarm_inputstatus_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'currentout', 'div_ioalarm_outputstatus_name', ITEM_TYPE_TEXT);
  // sub title
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'outputlevelset', 'output_level_sub_title', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'triggerlevelset', 'trigger_level_sub_title', ITEM_TYPE_TEXT);

  /*  */
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'alarmdn', 'label_action_link_toggle', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'outputlevel', 'div_fixed_output_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'fixoutput', 'label_mode_fixed', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'timeroutput', 'label_mode_timer', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'alarmsetting', 'div_ioalarm_alarm_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'linkout', 'label_mode_link', ITEM_TYPE_TEXT);
  /*  */
  translate_page_item(TARGET_PAGE_COMMON, 'mintime', 'div_ioalarm_mintime_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_TIPSTEXT, 'errnotsupport', 'pnote_ioalarm_support', ITEM_TYPE_TEXT);

  var strmax = translate_page_item(TARGET_PAGE_COMMON, 'maximum', '', ITEM_TYPE_NONE);
  var strsecond = translate_page_item(TARGET_PAGE_COMMON, 'second', '', ITEM_TYPE_NONE);
  $('#div_ioalarm_mintime_declare').text('[ ' + strmax + ' 300 ' + strsecond + ' ]');

  translate_page_item(TARGET_PAGE_COMMON, 'sunday', 'div_sunday,label_sunday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'monday', 'div_monday,label_monday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'tuesday', 'div_tuesday,label_tuesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'wednesday', 'div_wednesday,label_wednesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'thursday', 'div_thursday,label_thursday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'friday', 'div_friday,label_friday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'saturday', 'div_saturday,label_saturday', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'alarmout', 'label_action_alarm_output', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'evtblink', 'label_action_alarm_ledblink', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'record', 'label_action_record', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'ftp', 'label_action_ftp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'sendemail', 'label_action_send_email', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'snapshot', 'label_action_snapshot', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'audioout', 'label_action_audio_out', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'notifyserver', 'label_action_notify_server', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'setup', 'button_schedule_sunday_setup,button_schedule_monday_setup,button_schedule_tuesday_setup,button_schedule_wednesday_setup,button_schedule_thursday_setup,button_schedule_friday_setup,button_schedule_saturday_setup', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_ioalarm_save,button_ioalarm_schedule_save,button_schedule_timesection_save,button_ioalarm_actions_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_schedule_timesection_cancel', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_ioalarm_actions_restore,button_ioalarm_schedule_restore,button_ioalarm_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_ioalarm_actions_refresh,button_ioalarm_schedule_refresh,button_ioalarm_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'dststart', 'output_starttime', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'dstend', 'output_endtime', ITEM_TYPE_TEXT);
  var strhigh = translate_page_item(TARGET_PAGE_COMMON, 'high', '', ITEM_TYPE_NONE);
  var strlow = translate_page_item(TARGET_PAGE_COMMON, 'low', '', ITEM_TYPE_NONE);
  var strclose = translate_page_item(TARGET_PAGE_COMMON, 'closes', '', ITEM_TYPE_NONE);
  var stren = translate_page_item(TARGET_PAGE_COMMON, 'enablec', '', ITEM_TYPE_NONE);
  var strtiming = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
  $('#select_ioalarm_daynight option').each(function (i, n) {
    if (i == 0) $(n).text(strclose);
    else if (i == 1) $(n).text(stren);
  });
  $('#select_current_ioalarm_output option').each(function (i, n) {
    if (i == 0) $(n).text(strclose);
    else if (i == 1) $(n).text(strhigh);
    else if (i == 2) $(n).text(strlow);
    else if (i == 3) $(n).text(strtiming);
  });
  $('#select_section_output0 option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });
  $('#select_section_output1 option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });
  $('#select_section_output2 option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });
  $('#select_section_output3 option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });
  $('#select_ioalarm_output_signal option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });
  $('#select_fixed_output option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });
  $('#select_ioalarm_input_signal option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });

  var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
  var strhour = translate_page_item(TARGET_PAGE_COMMON, 'hour', '', ITEM_TYPE_NONE);
  var strdisable = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE);
  var strselall = translate_page_item(TARGET_PAGE_COMMON, 'selall', '', ITEM_TYPE_NONE);
  var strperiod = translate_page_item(TARGET_PAGE_COMMON, 'period', '', ITEM_TYPE_NONE);

  $('#label_schedule_allday').text('7*24 ' + strhour);
  $('#label_schedule_manual').text(strschedule);
  $('#label_scheudle_disable').text(strdisable);
  $('#label_all').text(strselall);

  $('#label_section1').text(strperiod + ' 1:');
  $('#label_section2').text(strperiod + ' 2:');
  $('#label_section3').text(strperiod + ' 3:');
  $('#label_section4').text(strperiod + ' 4:');
  $('#label_section5').text(strperiod + ' 5:');
  $('#label_section6').text(strperiod + ' 6:');

  input_edit_restriction('input_ioalarm_mintime_text', EDIT_RESTRICTION_NUMBER, 3);
}

function fun_register_events() {
  $('#div_table_ioalarm_settings,#div_table_ioalarm_schedule,#div_table_ioalarm_actions').click(function () {
    var tagid = this.id.toString();
    fun_setting_block_switch(tagid);
  });
  $('#radio_schedule_alldays,#radio_schedule_enable,#radio_schedule_disable').click(function () {
    var tagid = this.id.toString();
    fun_on_schedule_mode_change(tagid);
  });
  $('#radio_mode_link,#radio_mode_fixed_enable,#radio_mode_timer_enable').click(function () {
    var tagid = this.id.toString();
    fun_on_alarm_mode_change(tagid);
  });

  $('#button_schedule_sunday_setup,#button_schedule_monday_setup,#button_schedule_tuesday_setup,#button_schedule_wednesday_setup,#button_schedule_thursday_setup,#button_schedule_friday_setup,#button_schedule_saturday_setup').click(function () {
    fun_on_schedule_setup(this.id.toString());
  });
  $('#button_schedule_timesection_save,#button_schedule_timesection_cancel,#button_ioalarm_actions_save,#button_ioalarm_schedule_save').click(function () {
    fun_on_schedule_buttons(this.id.toString());
  });
  $('#check_weekday_alldays').click(function () {
    fun_on_weekday_alldays();
  });
  $('#button_ioalarm_save').click(function () {
    fun_save_ioalarm_parameters();
  });
  $('#button_ioalarm_restore').click(function () {
    fun_ioalarm_restore();
  });
  $('#button_ioalarm_refresh').click(function () {
    fun_ioalarm_refresh();
  });
  $('#button_ioalarm_schedule_restore').click(function () {
    fun_ioalarm_schedule_restore();
  });
  $('#button_ioalarm_schedule_refresh').click(function () {
    fun_ioalarm_schedule_refresh();
  });
  $('#button_ioalarm_actions_restore').click(function () {
    fun_ioalarm_action_restore();
  });
  $('#button_ioalarm_actions_refresh').click(function () {
    fun_ioalarm_action_refresh();
  });
  $('.ioalarm_checkbox_change').click(function () {
    fun_ioalarm_checkbox_change();
  });
  $('#select_current_ioalarm_output').change(function () {
    if ($('#select_current_ioalarm_output').val() == '3') {
      $('#div_output_schedule').css('display', 'block');
    } else {
      $('#div_output_schedule').css('display', 'none');
    }
  });
}

function fun_ioalarm_checkbox_change() {
  var checkboxall = $('#div_setup_weekday_select .ioalarm_checkbox_change').length;
  var checked = $('#div_setup_weekday_select .ioalarm_checkbox_change:checked').length;
  if (checked < checkboxall) {
    $('#check_weekday_alldays').prop('checked', false);
  } else {
    $('#check_weekday_alldays').prop('checked', true);
  }
}

function fun_ioalarm_restore() {
  $('#select_ioalarm_output_signal').val('0');
  $('#select_ioalarm_input_signal').val('0');
  $('#select_ioalarm_daynight').val('0');
  $('#radio_mode_link').prop('checked', true);
  $('#check_action_toggle').prop('checked', false);
  $('#select_fixed_output').val('0');
  $('#select_current_ioalarm_output').val('0');
  $('#div_output_schedule').css('display', 'none');
  timereidt('section_start0').setvalue('00:00:00');
  timereidt('section_end0').setvalue('00:00:00');
  timereidt('section_start1').setvalue('00:00:00');
  timereidt('section_end1').setvalue('00:00:00');
  timereidt('section_start2').setvalue('00:00:00');
  timereidt('section_end2').setvalue('00:00:00');
  timereidt('section_start3').setvalue('00:00:00');
  timereidt('section_end3').setvalue('00:00:00');
  $('#select_section_output0').val('2');
  $('#select_section_output1').val('2');
  $('#select_section_output2').val('2');
  $('#select_section_output3').val('2');
}

function fun_ioalarm_refresh() {
  sdk_getipcparam('/action/get?subject=alarmio', function (result) {
    if (result == false) return;
    $xml = $(result);

    var xmldoc = loadXMLString(String(result));
    var input = xmldoc.getElementsByTagName('input')[0].textContent;
    var output = xmldoc.getElementsByTagName('output')[0].textContent;
    var dnswitch = xmldoc.getElementsByTagName('dnswitch')[0].textContent;
    var outmode = xmldoc.getElementsByTagName('outmode')[0].textContent;
    g_outcur = xmldoc.getElementsByTagName('outcur')[0].textContent;
    var index = 0;
    $xml
      .find('outduty')
      .children()
      .each(function () {
        var secstr = this.innerText;
        var secarr = secstr.split('-');
        var idsstr = 'section_start' + index;
        var idestr = 'section_end' + index;
        var selstr = 'select_section_output' + index;
        if (secarr[0] == 0 && secarr[1] == 0) {
          timereidt(idsstr).setvalue('00:00:00');
          timereidt(idestr).setvalue('00:00:00');
        } else {
          timereidt(idsstr).setvalue(fun_convert_timestdfmt(parseInt(secarr[0])));
          timereidt(idestr).setvalue(fun_convert_timestdfmt(parseInt(secarr[1])));
        }
        $('#' + selstr).val(secarr[2]);
        index++;
      });
    if (input & 1) {
      $('#select_ioalarm_input_signal').val('1');
    } else {
      $('#select_ioalarm_input_signal').val('0');
    }
    if (output & 1) {
      $('#select_ioalarm_output_signal').val('1');
    } else {
      $('#select_ioalarm_output_signal').val('0');
    }
    // $("#select_ioalarm_daynight").val(dnswitch);
    if (dnswitch == 1) {
      $('#check_action_toggle').prop('checked', true);
    } else {
      $('#check_action_toggle').prop('checked', false);
    }

    // $('#select_current_ioalarm_output').val(outmode);
    // if (outmode == 3) {
    //   $('#div_output_schedule').css('display', 'block');
    // } else {
    //   $('#div_output_schedule').css('display', 'none');
    // }
    if (outmode == 0) {
      $('#radio_mode_link').prop('checked', true);
      $('#div_output_schedule').css('display', 'none');
    } else if (outmode == 1) {
      $('#radio_mode_fixed_enable').prop('checked', true);
      $('#div_output_schedule').css('display', 'none');
      $('#select_fixed_output').val(1);
    } else if (outmode == 2) {
      $('#radio_mode_fixed_enable').prop('checked', true);
      $('#div_output_schedule').css('display', 'none');
      $('#select_fixed_output').val(0);
    } else {
      $('#radio_mode_timer_enable').prop('checked', true);
      $('#div_output_schedule').css('display', 'block');
    }
  });
}

function fun_ioalarm_schedule_restore() {
  document.getElementById('radio_schedule_disable').checked = true;
  $('#input_ioalarm_mintime_text').val('10');
  $('#div_schedule_manual').css('display', 'none');
}

function fun_ioalarm_schedule_refresh() {
  fun_get_ioalarm_schedule_parameters();
}

function fun_ioalarm_action_restore() {
  document.getElementById('check_action_iooutput').checked = false;
  document.getElementById('check_action_ledblink').checked = false;
  document.getElementById('check_action_record').checked = false;
  document.getElementById('check_action_ftp').checked = false;
  document.getElementById('check_action_sendemail').checked = false;
  document.getElementById('check_action_snapshot').checked = false;
  document.getElementById('check_action_audioout').checked = false;
  document.getElementById('check_action_evtserver').checked = false;
  document.getElementById('check_action_rsio').checked = false;
}

function fun_ioalarm_action_refresh() {
  document.getElementById('check_action_iooutput').checked = false;
  document.getElementById('check_action_ledblink').checked = false;
  document.getElementById('check_action_record').checked = false;
  document.getElementById('check_action_ftp').checked = false;
  document.getElementById('check_action_sendemail').checked = false;
  document.getElementById('check_action_snapshot').checked = false;
  document.getElementById('check_action_audioout').checked = false;
  document.getElementById('check_action_evtserver').checked = false;
  document.getElementById('check_action_rsio').checked = false;
  fun_get_ioalarm_schedule_parameters();
}

function fun_initialize_pageui() {
  fun_init_schedule_panel_show();
  fun_get_ioalarm_paramenter();
  fun_init_timer_section_item();
}

function fun_setting_block_switch(valid) {
  if (valid == 'div_table_ioalarm_settings') {
    $('#div_table_ioalarm_settings').addClass('cls_tablebar_item_selected');
    $('#div_table_ioalarm_schedule').removeClass('cls_tablebar_item_selected');
    $('#div_table_ioalarm_actions').removeClass('cls_tablebar_item_selected');
    $('#div_ioalarm_settings').css('display', 'block');
    $('#div_ioalarm_schedule').css('display', 'none');
    $('#div_ioalarm_actions').css('display', 'none');
  } else if (valid == 'div_table_ioalarm_schedule') {
    $('#div_table_ioalarm_settings').removeClass('cls_tablebar_item_selected');
    $('#div_table_ioalarm_schedule').addClass('cls_tablebar_item_selected');
    $('#div_table_ioalarm_actions').removeClass('cls_tablebar_item_selected');
    $('#div_ioalarm_settings').css('display', 'none');
    $('#div_ioalarm_schedule').css('display', 'block');
    $('#div_ioalarm_actions').css('display', 'none');
  } else if (valid == 'div_table_ioalarm_actions') {
    $('#div_table_ioalarm_settings').removeClass('cls_tablebar_item_selected');
    $('#div_table_ioalarm_schedule').removeClass('cls_tablebar_item_selected');
    $('#div_table_ioalarm_actions').addClass('cls_tablebar_item_selected');
    $('#div_ioalarm_settings').css('display', 'none');
    $('#div_ioalarm_schedule').css('display', 'none');
    $('#div_ioalarm_actions').css('display', 'block');
  }
}

function fun_on_schedule_mode_change(objid) {
  if (objid == 'radio_schedule_disable') {
    $('#div_schedule_manual').css('display', 'none');
  } else if (objid == 'radio_schedule_enable') {
    $('#div_schedule_manual').css('display', 'block');
  } else if (objid == 'radio_schedule_alldays') {
    $('#div_schedule_manual').css('display', 'none');
  }
}

function fun_on_alarm_mode_change(objid) {
  if (objid == 'radio_mode_link') {
    $('#div_output_schedule').css('display', 'none');
  } else if (objid == 'radio_mode_fixed_enable') {
    $('#div_output_schedule').css('display', 'none');
  } else if (objid == 'radio_mode_timer_enable') {
    $('#div_output_schedule').css('display', 'block');
  }
}

function fun_get_ioalarm_paramenter() {
  for (var index = 0; index < 7; index++) {
    real_schedule_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
  }
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) return;
    $xml = $(result);
    var ioalarmability = $xml.find('ioin').text();
    var fullcolor = $xml.find('fullcolor').text();
    var whled = $xml.find('whled').text();
    var irled = $xml.find('irled').text();
    if (fullcolor == 1 || whled == 1 || irled == 2) {
      $('#div_ioalarm_action_ledblink').css('display', 'block');
    }
    var serialenable = parseInt($xml.find('serial').text()); //RS485
    // console.log(serialenable);
    if (serialenable <= 0) {
      $('#div_ioalarm_action_rsio').css('display', 'none');
    }
    if (ioalarmability > 0) {
      $('#div_note_ioalarm_support').css('display', 'none');
    } else {
      $('#button_ioalarm_save').attr('disabled', 'disabled');
      $('#select_ioalarm_input_signal').attr('disabled', 'disabled');
      $('#select_ioalarm_output_signal').attr('disabled', 'disabled');
      $('#input_ioalarm_mintime_text').attr('disabled', 'disabled');
      $('#radio_schedule_alldays').attr('disabled', 'disabled');
      $('#radio_schedule_enable').attr('disabled', 'disabled');
      $('#radio_schedule_disable').attr('disabled', 'disabled');
      $('#button_ioalarm_schedule_save').attr('disabled', 'disabled');
      $('#select_fixed_output').attr('disabled', 'disabled');
      $('.cls_schedule_radio').attr('disabled', 'disabled');
      $('#button_ioalarm_actions_save').attr('disabled', 'disabled');
      $('#button_ioalarm_actions_restore').attr('disabled', 'disabled');
      $('#button_ioalarm_actions_refresh').attr('disabled', 'disabled');
      $('#button_ioalarm_schedule_restore').attr('disabled', 'disabled');
      $('#button_ioalarm_schedule_refresh').attr('disabled', 'disabled');
      $('#button_ioalarm_restore').attr('disabled', 'disabled');
      $('#button_ioalarm_refresh').attr('disabled', 'disabled');
      $('#select_ioalarm_daynight').attr('disabled', 'disabled');
      $('#select_current_ioalarm_output').attr('disabled', 'disabled');
    }
  });
  sdk_getipcparam('/action/get?subject=alarm&type=0', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var duration = $xml.find('duration').text();
    var outmask = $xml.find('outmask').text();
    if (active == 0) {
      document.getElementById('radio_schedule_disable').checked = true;
    } else if (active == 1) {
      document.getElementById('radio_schedule_alldays').checked = true;
    } else if (active == 2) {
      document.getElementById('radio_schedule_enable').checked = true;
      document.getElementById('div_schedule_manual').style.setProperty('display', 'block');
    }
    $('#input_ioalarm_mintime_text').val(duration);
    var actionmask = parseInt(outmask);
    if (actionmask & 1) {
      document.getElementById('check_action_iooutput').checked = true;
    }
    if (actionmask & (1 << 8)) {
      document.getElementById('check_action_ledblink').checked = true;
    }
    if (actionmask & (1 << 12)) {
      document.getElementById('check_action_snapshot').checked = true;
    }
    if (actionmask & (1 << 13)) {
      document.getElementById('check_action_record').checked = true;
    }
    if (actionmask & (1 << 14)) {
      document.getElementById('check_action_ftp').checked = true;
    }
    if (actionmask & (1 << 16)) {
      document.getElementById('check_action_sendemail').checked = true;
    }
    if (actionmask & (1 << 17)) {
      document.getElementById('check_action_audioout').checked = true;
    }
    if (actionmask & (1 << 18)) {
      document.getElementById('check_action_evtserver').checked = true;
    }
    if (actionmask & (1 << 19)) {
      document.getElementById('check_action_rsio').checked = true;
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
  });
  fun_ioalarm_refresh();
}

setInterval(function () {
  var highval = translate_page_item(TARGET_PAGE_COMMON, 'high', '', ITEM_TYPE_NONE);
  var lowval = translate_page_item(TARGET_PAGE_COMMON, 'low', '', ITEM_TYPE_NONE);
  sdk_getipcparam('/action/get?subject=sysstatus', function (result) {
    if (result == false) return;
    var inputval = $(result).find('ioin').text();
    var outputval = $(result).find('ioout').text();
    if (inputval & 0x01) {
      $('#div_ioalarm_inputstatus_value').text(highval);
    } else {
      $('#div_ioalarm_inputstatus_value').text(lowval);
    }
    if (outputval & 0x01) {
      $('#div_ioalarm_outputstatus_value').text(highval);
    } else {
      $('#div_ioalarm_outputstatus_value').text(lowval);
    }
  });
}, 1000);

function fun_get_ioalarm_schedule_parameters() {
  sdk_getipcparam('/action/get?subject=alarm&type=0', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var duration = $xml.find('duration').text();
    var outmask = $xml.find('outmask').text();
    if (active == 0) {
      document.getElementById('radio_schedule_disable').checked = true;
      document.getElementById('div_schedule_manual').style.setProperty('display', 'none');
    } else if (active == 1) {
      document.getElementById('radio_schedule_alldays').checked = true;
      document.getElementById('div_schedule_manual').style.setProperty('display', 'none');
    } else if (active == 2) {
      document.getElementById('radio_schedule_enable').checked = true;
      document.getElementById('div_schedule_manual').style.setProperty('display', 'block');
    }
    $('#input_ioalarm_mintime_text').val(duration);
    var actionmask = parseInt(outmask);
    if (actionmask & 1) {
      document.getElementById('check_action_iooutput').checked = true;
    }
    if (actionmask & (1 << 8)) {
      document.getElementById('check_action_ledblink').checked = true;
    }
    if (actionmask & (1 << 12)) {
      document.getElementById('check_action_snapshot').checked = true;
    }
    if (actionmask & (1 << 13)) {
      document.getElementById('check_action_record').checked = true;
    }
    if (actionmask & (1 << 14)) {
      document.getElementById('check_action_ftp').checked = true;
    }
    if (actionmask & (1 << 16)) {
      document.getElementById('check_action_sendemail').checked = true;
    }
    if (actionmask & (1 << 17)) {
      document.getElementById('check_action_audioout').checked = true;
    }
    if (actionmask & (1 << 18)) {
      document.getElementById('check_action_evtserver').checked = true;
    }
    if (actionmask & (1 << 19)) {
      document.getElementById('check_action_rsio').checked = true;
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
  });
}

function fun_save_ioalarm_parameters() {
  var dnswitch;
  var input = $('#select_ioalarm_input_signal').val();
  var output = $('#select_ioalarm_output_signal').val();
  if ($('#check_action_toggle').prop('checked')) {
    dnswitch = 1;
  } else {
    dnswitch = 0;
  }
  var outmode;
  if ($('#radio_mode_link').prop('checked')) {
    outmode = 0;
  } else if ($('#radio_mode_fixed_enable').prop('checked') && $('#select_fixed_output').val() == 0) {
    outmode = 2;
  } else if ($('#radio_mode_fixed_enable').prop('checked') && $('#select_fixed_output').val() == 1) {
    outmode = 1;
  } else if ($('#radio_mode_timer_enable').prop('checked')) {
    outmode = 3;
  }

  var sectionarr = [];
  for (var i = 0; i < 4; i++) {
    var idsstr = 'section_start' + i;
    var idestr = 'section_end' + i;
    var selstr = 'select_section_output' + i;
    var level = $('#' + selstr).val();
    sectionarr.push(fun_convert_timestring(timereidt(idsstr).getvalue()) + '-' + fun_convert_timestring(timereidt(idestr).getvalue()) + '-' + level);
  }
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<alarmio>' +
    '<input>' +
    input +
    '</input>' +
    '<output>' +
    output +
    '</output>' +
    '<outcur>' +
    g_outcur +
    '</outcur>' +
    '<dnswitch>' +
    dnswitch +
    '</dnswitch>' +
    '<outmode>' +
    outmode +
    '</outmode>' +
    '<outduty>' +
    '<section>' +
    sectionarr[0] +
    '</section>' +
    '<section>' +
    sectionarr[1] +
    '</section>' +
    '<section>' +
    sectionarr[2] +
    '</section>' +
    '<section>' +
    sectionarr[3] +
    '</section>' +
    '</outduty>' +
    '</alarmio>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=alarmio', targetxml, function (result) {
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

var g_schedule_painter;

function fun_init_schedule_panel_show() {
  g_schedule_painter = new normal_schedule('div_schedule_panel', 720, 224);
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
  if (objid == 'button_schedule_timesection_save') {
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
    fun_save_ioalarm_schedule();
  } else if (objid == 'button_schedule_timesection_cancel') {
    fun_show_setup_dialog(false);
  } else if (objid == 'button_ioalarm_actions_save' || objid == 'button_ioalarm_schedule_save') {
    var actionoutput = document.getElementById('check_action_iooutput').checked;
    var actionledblk = document.getElementById('check_action_ledblink').checked;
    var actionrecord = document.getElementById('check_action_record').checked;
    var actionftp = document.getElementById('check_action_ftp').checked;
    var actionemail = document.getElementById('check_action_sendemail').checked;
    var actionsnapshot = document.getElementById('check_action_snapshot').checked;
    var actionaudio = document.getElementById('check_action_audioout').checked;
    var actionevtserver = document.getElementById('check_action_evtserver').checked;
    var rsio = document.getElementById('check_action_rsio').checked;

    schedule_action_mask = 0;
    if (actionoutput) {
      schedule_action_mask |= 1;
    }
    if (actionledblk) {
      schedule_action_mask |= 1 << 8;
    }
    if (actionrecord) {
      schedule_action_mask |= 1 << 13;
    }
    if (actionftp) {
      schedule_action_mask |= 1 << 14;
    }
    if (actionemail) {
      schedule_action_mask |= 1 << 16;
    }
    if (actionsnapshot) {
      schedule_action_mask |= 1 << 12;
    }
    if (actionaudio) {
      schedule_action_mask |= 1 << 17;
    }
    if (actionevtserver) {
      schedule_action_mask |= 1 << 18;
    }
    if (rsio) {
      schedule_action_mask |= 1 << 19;
    }
    fun_save_ioalarm_schedule();
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
function fun_on_weekday_alldays() {
  var bchecked = document.getElementById('check_weekday_alldays').checked;
  if (bchecked == true) {
    document.getElementById('check_weekday_monday').checked = true;
    document.getElementById('check_weekday_tuesday').checked = true;
    document.getElementById('check_weekday_wednesday').checked = true;
    document.getElementById('check_weekday_thursday').checked = true;
    document.getElementById('check_weekday_friday').checked = true;
    document.getElementById('check_weekday_saturday').checked = true;
    document.getElementById('check_weekday_sunday').checked = true;
  } else {
    $('#check_weekday_monday,#check_weekday_tuesday,#check_weekday_wednesday,#check_weekday_thursday,#check_weekday_friday,#check_weekday_saturday,#check_weekday_sunday').removeAttr('checked');
    if (g_current_set_day == 1) {
      document.getElementById('check_weekday_monday').checked = true;
    } else if (g_current_set_day == 2) {
      document.getElementById('check_weekday_tuesday').checked = true;
    } else if (g_current_set_day == 3) {
      document.getElementById('check_weekday_wednesday').checked = true;
    } else if (g_current_set_day == 4) {
      document.getElementById('check_weekday_thursday').checked = true;
    } else if (g_current_set_day == 5) {
      document.getElementById('check_weekday_friday').checked = true;
    } else if (g_current_set_day == 6) {
      document.getElementById('check_weekday_saturday').checked = true;
    } else if (g_current_set_day == 7) {
      document.getElementById('check_weekday_sunday').checked = true;
    }
  }
}

var g_current_set_day = 0;
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
    $('#div_weekday_sunday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
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
    $('#div_weekday_monday').addClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
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
    $('#div_weekday_tuesday').addClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
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
    $('#div_weekday_wednesday').addClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
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
    $('#div_weekday_thursday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_mondayday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
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
    $('#div_weekday_friday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
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
    $('#div_weekday_saturday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    g_current_set_day = 6;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  }
  fun_show_setup_dialog(true);
}

var real_schedule_timesection = [];
var schedule_action_mask = 0;
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

function fun_save_ioalarm_schedule() {
  var schedulealldays = document.getElementById('radio_schedule_alldays').checked;
  var scheduleenable = document.getElementById('radio_schedule_enable').checked;
  var scheduleactive = 0;
  if (schedulealldays) {
    scheduleactive = 1;
  } else if (scheduleenable) {
    scheduleactive = 2;
  }
  var scheduleduration = document.getElementById('input_ioalarm_mintime_text').value;

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
  sdk_setipcparam('/action/set?subject=alarm&type=0', targetxml, function (result) {
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

function fun_show_setup_dialog(bshow) {
  if (bshow) {
    var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
    $('#div_ioalarm_schedule_setdialog').dialog({
      modal: true,
      title: strschedule,
      width: 920,
      height: 352,
      resizable: false
    });
  } else {
    $('#div_ioalarm_schedule_setdialog').dialog('destroy');
    $('#div_ioalarm_schedule_setdialog').css('display', 'none');
  }
}
