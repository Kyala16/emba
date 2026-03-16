$(document).ready(function () {
  fun_multilang_adapter();
  fun_register_events();
  fun_get_ability();
  fun_get_abnormality_parameter();
});
function fun_get_ability() {
  sdk_getipcparam('/action/get?subject=snapability', function (result) {
    if (result != false) {
      $xml = $(result);
      var streamopt = $xml.find('streamopt').text();
      if (!(parseInt(streamopt) <= 0)) {
        $('#div_startup_action_snapshot').css('display', 'block');
        $('#div_network_action_snapshot').css('display', 'block');
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
        $('#div_network_action_ledblink').css('display', 'block');
        $('#div_startup_action_ledblink').css('display', 'block');
      }
      var serialenable = parseInt($xml.find('serial').text()); //RS485
      // console.log(serialenable);
      if (serialenable <= 0) {
        $('#div_startup_action_rsio').css('display', 'none');
        $('#div_network_action_rsio').css('display', 'none');
      }
    }
  });
}

function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_ABNORMALITY, 'networkdisconnect', 'div_table_network_disconnect_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_ABNORMALITY, 'startup', 'div_table_device_startup_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'mintime', 'div_pir_mintime_name', ITEM_TYPE_TEXT);

  var strmax = translate_page_item(TARGET_PAGE_COMMON, 'maximum', '', ITEM_TYPE_NONE);
  var strsecond = translate_page_item(TARGET_PAGE_COMMON, 'second', '', ITEM_TYPE_NONE);
  $('#div_pir_mintime_declare').text('[ ' + strmax + ' 300 ' + strsecond + ' ]');

  translate_page_item(TARGET_PAGE_COMMON, 'enable', 'label_network_enable,label_startup_enable', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'alarmout', 'label_action_alarm_output,label_action_alarm_output1', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'evtblink', 'label_action_alarm_ledblink1,label_action_alarm_ledblink', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'record', 'label_action_record,label_action_record1', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'ftp', 'label_action_ftp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'sendemail', 'label_action_send_email', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'snapshot', 'label_action_snapshot,label_action_snapshot1', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'audioout', 'label_action_audio_out,label_action_audio_out1', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'notifyserver', 'label_action_notify_server', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_network_actions_save,button_startup_actions_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_network_actions_restore,button_startup_actions_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_network_actions_refresh,button_startup_actions_refresh', ITEM_TYPE_VALUE);

  input_edit_restriction('input_pir_mintime_text', EDIT_RESTRICTION_NUMBER, 3);
}

function fun_register_events() {
  $('#div_table_network_disconnect,#div_table_device_startup').click(function () {
    var tagid = this.id.toString();
    fun_abmormality_table_switch(tagid);
  });
  $('#button_network_actions_save,#button_startup_actions_save').click(function () {
    if (this.id.toString() == 'button_network_actions_save') {
      fun_save_network_disconnect_actions();
    } else {
      fun_save_device_startup_actions();
    }
  });
  $('#check_network_enable,#check_startup_enable').click(function () {
    var objid = this.id.toString();
    fun_enable_change(objid);
  });
  $('#button_network_actions_restore').click(function () {
    fun_network_action_restore();
  });
  $('#button_network_actions_refresh').click(function () {
    fun_network_action_refresh();
  });
  $('#button_startup_actions_restore').click(function () {
    fun_startup_action_restore();
  });
  $('#button_startup_actions_refresh').click(function () {
    fun_startup_action_refresh();
  });
}

function fun_abmormality_table_switch(tagid) {
  if (tagid == 'div_table_network_disconnect') {
    $('#div_table_network_disconnect').addClass('cls_tablebar_item_selected');
    $('#div_table_device_startup').removeClass('cls_tablebar_item_selected');
    $('#div_network_actions').css('display', 'block');
    $('#div_startup_actions').css('display', 'none');
  } else if (tagid == 'div_table_device_startup') {
    $('#div_table_network_disconnect').removeClass('cls_tablebar_item_selected');
    $('#div_table_device_startup').addClass('cls_tablebar_item_selected');
    $('#div_network_actions').css('display', 'none');
    $('#div_startup_actions').css('display', 'block');
  }
}

function fun_network_action_restore() {
  document.getElementById('check_network_enable').checked = false;
  $('#input_pir_mintime_text').attr('disabled', 'disabled');
  $('#input_pir_mintime_text').val('10');
  $('#check_action_iooutput').attr('disabled', 'disabled');
  $('#check_action_ledblink').attr('disabled', 'disabled');
  $('#check_action_record').attr('disabled', 'disabled');
  $('#check_action_snapshot').attr('disabled', 'disabled');
  $('#check_action_audioout').attr('disabled', 'disabled');
  $('#check_action_rsio').attr('disabled', 'disabled');

  document.getElementById('check_action_iooutput').checked = false;
  document.getElementById('check_action_ledblink').checked = false;
  document.getElementById('check_action_record').checked = false;
  document.getElementById('check_action_snapshot').checked = false;
  document.getElementById('check_action_audioout').checked = false;
  document.getElementById('check_action_rsio').checked = false;

  $('#div_pir_mintime_name').addClass('cls_item_font_grey');
  $('#label_action_alarm_output1').addClass('cls_item_font_grey');
  $('#label_action_alarm_ledblink1').addClass('cls_item_font_grey');
  $('#label_action_record1').addClass('cls_item_font_grey');
  $('#label_action_snapshot1').addClass('cls_item_font_grey');
  $('#label_action_audio_out1').addClass('cls_item_font_grey');

  $('#div_pir_mintime_name').removeClass('cls_item_font_light');
  $('#label_action_alarm_output1').removeClass('cls_item_font_light');
  $('#label_action_alarm_ledblink1').removeClass('cls_item_font_light');
  $('#label_action_record1').removeClass('cls_item_font_light');
  $('#label_action_snapshot1').removeClass('cls_item_font_light');
  $('#label_action_audio_out1').removeClass('cls_item_font_light');
}

function fun_network_action_refresh() {
  document.getElementById('check_network_enable').checked = false;
  document.getElementById('check_action_iooutput').checked = false;
  document.getElementById('check_action_ledblink').checked = false;
  document.getElementById('check_action_record').checked = false;
  document.getElementById('check_action_snapshot').checked = false;
  document.getElementById('check_action_audioout').checked = false;
  document.getElementById('check_action_rsio').checked = false;
  fun_get_network_action_parameters();
}

function fun_startup_action_restore() {
  document.getElementById('check_startup_enable').checked = false;
  $('#check_startup_action_iooutput').attr('disabled', 'disabled');
  $('#check_startup_action_ledblink').attr('disabled', 'disabled');
  $('#check_startup_action_record').attr('disabled', 'disabled');
  $('#check_startup_action_sendemail').attr('disabled', 'disabled');
  $('#check_startup_action_snapshot').attr('disabled', 'disabled');
  $('#check_startup_action_audioout').attr('disabled', 'disabled');
  $('#check_startup_action_evtserver').attr('disabled', 'disabled');
  $('#check_startup_action_rsio').attr('disabled', 'disabled');
  $('#check_startup_action_ftp').attr('disabled', 'disabled');

  document.getElementById('check_startup_action_iooutput').checked = false;
  document.getElementById('check_startup_action_ledblink').checked = false;
  document.getElementById('check_startup_action_record').checked = false;
  document.getElementById('check_startup_action_ftp').checked = false;
  document.getElementById('check_startup_action_sendemail').checked = false;
  document.getElementById('check_startup_action_snapshot').checked = false;
  document.getElementById('check_startup_action_audioout').checked = false;
  document.getElementById('check_startup_action_evtserver').checked = false;
  document.getElementById('check_startup_action_rsio').checked = false;

  $('#label_action_alarm_output').addClass('cls_item_font_grey');
  $('#label_action_alarm_ledblink').addClass('cls_item_font_grey');
  $('#label_action_record').addClass('cls_item_font_grey');
  $('#label_action_ftp').addClass('cls_item_font_grey');
  $('#label_action_send_email').addClass('cls_item_font_grey');
  $('#label_action_snapshot').addClass('cls_item_font_grey');
  $('#label_action_audio_out').addClass('cls_item_font_grey');
  $('#label_action_notify_server').addClass('cls_item_font_grey');

  $('#label_action_alarm_output').removeClass('cls_item_font_light');
  $('#label_action_alarm_ledblink').removeClass('cls_item_font_light');
  $('#label_action_record').removeClass('cls_item_font_light');
  $('#label_action_ftp').removeClass('cls_item_font_light');
  $('#label_action_send_email').removeClass('cls_item_font_light');
  $('#label_action_snapshot').removeClass('cls_item_font_light');
  $('#label_action_audio_out').removeClass('cls_item_font_light');
  $('#label_action_notify_server').removeClass('cls_item_font_light');
}

function fun_startup_action_refresh() {
  document.getElementById('check_startup_enable').checked = false;
  document.getElementById('check_startup_action_iooutput').checked = false;
  document.getElementById('check_startup_action_ledblink').checked = false;
  document.getElementById('check_startup_action_record').checked = false;
  document.getElementById('check_startup_action_ftp').checked = false;
  document.getElementById('check_startup_action_sendemail').checked = false;
  document.getElementById('check_startup_action_snapshot').checked = false;
  document.getElementById('check_startup_action_audioout').checked = false;
  document.getElementById('check_startup_action_evtserver').checked = false;
  document.getElementById('check_startup_action_rsio').checked = false;
  fun_get_startup_action_parameters();
}

function fun_enable_change(objid) {
  var enable = document.getElementById(objid).checked;
  if (objid == 'check_network_enable') {
    if (enable) {
      $('#input_pir_mintime_text').removeAttr('disabled');
      $('#check_action_iooutput').removeAttr('disabled');
      $('#check_action_ledblink').removeAttr('disabled');
      $('#check_action_record').removeAttr('disabled');
      $('#check_action_snapshot').removeAttr('disabled');
      $('#check_action_audioout').removeAttr('disabled');
      $('#check_action_rsio').removeAttr('disabled');

      $('#div_pir_mintime_name').removeClass('cls_item_font_grey');
      $('#label_action_alarm_output1').removeClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink1').removeClass('cls_item_font_grey');
      $('#label_action_record1').removeClass('cls_item_font_grey');
      $('#label_action_snapshot1').removeClass('cls_item_font_grey');
      $('#label_action_audio_out1').removeClass('cls_item_font_grey');

      $('#div_pir_mintime_name').addClass('cls_item_font_light');
      $('#label_action_alarm_output1').addClass('cls_item_font_light');
      $('#label_action_alarm_ledblink1').addClass('cls_item_font_light');
      $('#label_action_record1').addClass('cls_item_font_light');
      $('#label_action_snapshot1').addClass('cls_item_font_light');
      $('#label_action_audio_out1').addClass('cls_item_font_light');
    } else {
      $('#input_pir_mintime_text').attr('disabled', 'disabled');
      $('#check_action_iooutput').attr('disabled', 'disabled');
      $('#check_action_ledblink').attr('disabled', 'disabled');
      $('#check_action_record').attr('disabled', 'disabled');
      $('#check_action_snapshot').attr('disabled', 'disabled');
      $('#check_action_audioout').attr('disabled', 'disabled');
      $('#check_action_rsio').attr('disabled', 'disabled');

      $('#div_pir_mintime_name').addClass('cls_item_font_grey');
      $('#label_action_alarm_output1').addClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink1').addClass('cls_item_font_grey');
      $('#label_action_record1').addClass('cls_item_font_grey');
      $('#label_action_snapshot1').addClass('cls_item_font_grey');
      $('#label_action_audio_out1').addClass('cls_item_font_grey');

      $('#div_pir_mintime_name').removeClass('cls_item_font_light');
      $('#label_action_alarm_output1').removeClass('cls_item_font_light');
      $('#label_action_alarm_ledblink1').removeClass('cls_item_font_light');
      $('#label_action_record1').removeClass('cls_item_font_light');
      $('#label_action_snapshot1').removeClass('cls_item_font_light');
      $('#label_action_audio_out1').removeClass('cls_item_font_light');
    }
  } else {
    if (enable) {
      $('#check_startup_action_iooutput').removeAttr('disabled');
      $('#check_startup_action_ledblink').removeAttr('disabled');
      $('#check_startup_action_record').removeAttr('disabled');
      $('#check_startup_action_sendemail').removeAttr('disabled');
      $('#check_startup_action_snapshot').removeAttr('disabled');
      $('#check_startup_action_audioout').removeAttr('disabled');
      $('#check_startup_action_evtserver').removeAttr('disabled');
      $('#check_startup_action_rsio').removeAttr('disabled');
      $('#check_startup_action_ftp').removeAttr('disabled');

      $('#label_action_alarm_output').removeClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink').removeClass('cls_item_font_grey');
      $('#label_action_record').removeClass('cls_item_font_grey');
      $('#label_action_ftp').removeClass('cls_item_font_grey');
      $('#label_action_send_email').removeClass('cls_item_font_grey');
      $('#label_action_snapshot').removeClass('cls_item_font_grey');
      $('#label_action_audio_out').removeClass('cls_item_font_grey');
      $('#label_action_notify_server').removeClass('cls_item_font_grey');

      $('#label_action_alarm_output').addClass('cls_item_font_light');
      $('#label_action_alarm_ledblink').addClass('cls_item_font_light');
      $('#label_action_record').addClass('cls_item_font_light');
      $('#label_action_ftp').addClass('cls_item_font_light');
      $('#label_action_send_email').addClass('cls_item_font_light');
      $('#label_action_snapshot').addClass('cls_item_font_light');
      $('#label_action_audio_out').addClass('cls_item_font_light');
      $('#label_action_notify_server').addClass('cls_item_font_light');
    } else {
      $('#check_startup_action_iooutput').attr('disabled', 'disabled');
      $('#check_startup_action_ledblink').attr('disabled', 'disabled');
      $('#check_startup_action_record').attr('disabled', 'disabled');
      $('#check_startup_action_sendemail').attr('disabled', 'disabled');
      $('#check_startup_action_snapshot').attr('disabled', 'disabled');
      $('#check_startup_action_audioout').attr('disabled', 'disabled');
      $('#check_startup_action_evtserver').attr('disabled', 'disabled');
      $('#check_startup_action_rsio').attr('disabled', 'disabled');
      $('#check_startup_action_ftp').attr('disabled', 'disabled');

      $('#label_action_alarm_output').addClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink').addClass('cls_item_font_grey');
      $('#label_action_record').addClass('cls_item_font_grey');
      $('#label_action_ftp').addClass('cls_item_font_grey');
      $('#label_action_send_email').addClass('cls_item_font_grey');
      $('#label_action_snapshot').addClass('cls_item_font_grey');
      $('#label_action_audio_out').addClass('cls_item_font_grey');
      $('#label_action_notify_server').addClass('cls_item_font_grey');

      $('#label_action_alarm_output').removeClass('cls_item_font_light');
      $('#label_action_alarm_ledblink').removeClass('cls_item_font_light');
      $('#label_action_record').removeClass('cls_item_font_light');
      $('#label_action_ftp').removeClass('cls_item_font_light');
      $('#label_action_send_email').removeClass('cls_item_font_light');
      $('#label_action_snapshot').removeClass('cls_item_font_light');
      $('#label_action_audio_out').removeClass('cls_item_font_light');
      $('#label_action_notify_server').removeClass('cls_item_font_light');
    }
  }
}

function fun_get_abnormality_parameter() {
  sdk_getipcparam('/action/get?subject=alarm&type=5', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var duration = $xml.find('duration').text();
    var outmask = $xml.find('outmask').text();
    if (active == 0) {
      document.getElementById('check_network_enable').checked = false;
      $('#input_pir_mintime_text').attr('disabled', 'disabled');
      $('#check_action_iooutput').attr('disabled', 'disabled');
      $('#check_action_ledblink').attr('disabled', 'disabled');
      $('#check_action_record').attr('disabled', 'disabled');
      $('#check_action_snapshot').attr('disabled', 'disabled');
      $('#check_action_audioout').attr('disabled', 'disabled');
      $('#check_action_rsio').attr('disabled', 'disabled');

      $('#div_pir_mintime_name').addClass('cls_item_font_grey');
      $('#label_action_alarm_output1').addClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink1').addClass('cls_item_font_grey');
      $('#label_action_record1').addClass('cls_item_font_grey');
      $('#label_action_snapshot1').addClass('cls_item_font_grey');
      $('#label_action_audio_out1').addClass('cls_item_font_grey');

      $('#div_pir_mintime_name').removeClass('cls_item_font_light');
      $('#label_action_alarm_output1').removeClass('cls_item_font_light');
      $('#label_action_alarm_ledblink1').removeClass('cls_item_font_light');
      $('#label_action_record1').removeClass('cls_item_font_light');
      $('#label_action_snapshot1').removeClass('cls_item_font_light');
      $('#label_action_audio_out1').removeClass('cls_item_font_light');
    } else if (active == 1) {
      document.getElementById('check_network_enable').checked = true;
    }
    $('#input_pir_mintime_text').val(duration);
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
    if (actionmask & (1 << 17)) {
      document.getElementById('check_action_audioout').checked = true;
    }
    if (actionmask & (1 << 19)) {
      document.getElementById('check_action_rsio').checked = true;
    }
  });
  sdk_getipcparam('/action/get?subject=alarm&type=1', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var outmask = $xml.find('outmask').text();
    if (active == 0) {
      document.getElementById('check_startup_enable').checked = false;
      $('#check_startup_action_iooutput').attr('disabled', 'disabled');
      $('#check_startup_action_ledblink').attr('disabled', 'disabled');
      $('#check_startup_action_record').attr('disabled', 'disabled');
      $('#check_startup_action_sendemail').attr('disabled', 'disabled');
      $('#check_startup_action_snapshot').attr('disabled', 'disabled');
      $('#check_startup_action_audioout').attr('disabled', 'disabled');
      $('#check_startup_action_evtserver').attr('disabled', 'disabled');
      $('#check_startup_action_rsio').attr('disabled', 'disabled');
      $('#check_startup_action_ftp').attr('disabled', 'disabled');

      $('#label_action_alarm_output').addClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink').addClass('cls_item_font_grey');
      $('#label_action_record').addClass('cls_item_font_grey');
      $('#label_action_ftp').addClass('cls_item_font_grey');
      $('#label_action_send_email').addClass('cls_item_font_grey');
      $('#label_action_snapshot').addClass('cls_item_font_grey');
      $('#label_action_audio_out').addClass('cls_item_font_grey');
      $('#label_action_notify_server').addClass('cls_item_font_grey');

      $('#label_action_alarm_output').removeClass('cls_item_font_light');
      $('#label_action_alarm_ledblink').removeClass('cls_item_font_light');
      $('#label_action_record').removeClass('cls_item_font_light');
      $('#label_action_ftp').removeClass('cls_item_font_light');
      $('#label_action_send_email').removeClass('cls_item_font_light');
      $('#label_action_snapshot').removeClass('cls_item_font_light');
      $('#label_action_audio_out').removeClass('cls_item_font_light');
      $('#label_action_notify_server').removeClass('cls_item_font_light');
    } else if (active == 1) {
      document.getElementById('check_startup_enable').checked = true;
    }
    var actionmask = parseInt(outmask);
    if (actionmask & 1) {
      document.getElementById('check_startup_action_iooutput').checked = true;
    }
    if (actionmask & (1 << 8)) {
      document.getElementById('check_startup_action_ledblink').checked = true;
    }
    if (actionmask & (1 << 12)) {
      document.getElementById('check_startup_action_snapshot').checked = true;
    }
    if (actionmask & (1 << 13)) {
      document.getElementById('check_startup_action_record').checked = true;
    }
    if (actionmask & (1 << 14)) {
      document.getElementById('check_startup_action_ftp').checked = true;
    }
    if (actionmask & (1 << 16)) {
      document.getElementById('check_startup_action_sendemail').checked = true;
    }
    if (actionmask & (1 << 17)) {
      document.getElementById('check_startup_action_audioout').checked = true;
    }
    if (actionmask & (1 << 18)) {
      document.getElementById('check_startup_action_evtserver').checked = true;
    }
    if (actionmask & (1 << 19)) {
      document.getElementById('check_startup_action_rsio').checked = true;
    }
  });
}

function fun_get_network_action_parameters() {
  sdk_getipcparam('/action/get?subject=alarm&type=5', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var duration = $xml.find('duration').text();
    var outmask = $xml.find('outmask').text();
    if (active == 0) {
      document.getElementById('check_network_enable').checked = false;
      $('#input_pir_mintime_text').attr('disabled', 'disabled');
      $('#check_action_iooutput').attr('disabled', 'disabled');
      $('#check_action_ledblink').attr('disabled', 'disabled');
      $('#check_action_record').attr('disabled', 'disabled');
      $('#check_action_snapshot').attr('disabled', 'disabled');
      $('#check_action_audioout').attr('disabled', 'disabled');
      $('#check_action_rsio').attr('disabled', 'disabled');

      $('#div_pir_mintime_name').addClass('cls_item_font_grey');
      $('#label_action_alarm_output1').addClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink1').addClass('cls_item_font_grey');
      $('#label_action_record1').addClass('cls_item_font_grey');
      $('#label_action_snapshot1').addClass('cls_item_font_grey');
      $('#label_action_audio_out1').addClass('cls_item_font_grey');

      $('#div_pir_mintime_name').removeClass('cls_item_font_light');
      $('#label_action_alarm_output1').removeClass('cls_item_font_light');
      $('#label_action_alarm_ledblink1').removeClass('cls_item_font_light');
      $('#label_action_record1').removeClass('cls_item_font_light');
      $('#label_action_snapshot1').removeClass('cls_item_font_light');
      $('#label_action_audio_out1').removeClass('cls_item_font_light');
    } else if (active == 1) {
      document.getElementById('check_network_enable').checked = true;

      $('#input_pir_mintime_text').removeAttr('disabled');
      $('#check_action_iooutput').removeAttr('disabled');
      $('#check_action_ledblink').removeAttr('disabled');
      $('#check_action_record').removeAttr('disabled');
      $('#check_action_snapshot').removeAttr('disabled');
      $('#check_action_audioout').removeAttr('disabled');
      $('#check_action_rsio').removeAttr('disabled');

      $('#div_pir_mintime_name').removeClass('cls_item_font_grey');
      $('#label_action_alarm_output1').removeClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink1').removeClass('cls_item_font_grey');
      $('#label_action_record1').removeClass('cls_item_font_grey');
      $('#label_action_snapshot1').removeClass('cls_item_font_grey');
      $('#label_action_audio_out1').removeClass('cls_item_font_grey');

      $('#div_pir_mintime_name').addClass('cls_item_font_light');
      $('#label_action_alarm_output1').addClass('cls_item_font_light');
      $('#label_action_alarm_ledblink1').addClass('cls_item_font_light');
      $('#label_action_record1').addClass('cls_item_font_light');
      $('#label_action_snapshot1').addClass('cls_item_font_light');
      $('#label_action_audio_out1').addClass('cls_item_font_light');
    }
    $('#input_pir_mintime_text').val(duration);
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
    if (actionmask & (1 << 17)) {
      document.getElementById('check_action_audioout').checked = true;
    }
    if (actionmask & (1 << 19)) {
      document.getElementById('check_action_rsio').checked = true;
    }
  });
}

function fun_get_startup_action_parameters() {
  sdk_getipcparam('/action/get?subject=alarm&type=1', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var outmask = $xml.find('outmask').text();
    if (active == 0) {
      document.getElementById('check_startup_enable').checked = false;
      $('#check_startup_action_iooutput').attr('disabled', 'disabled');
      $('#check_startup_action_ledblink').attr('disabled', 'disabled');
      $('#check_startup_action_record').attr('disabled', 'disabled');
      $('#check_startup_action_sendemail').attr('disabled', 'disabled');
      $('#check_startup_action_snapshot').attr('disabled', 'disabled');
      $('#check_startup_action_audioout').attr('disabled', 'disabled');
      $('#check_startup_action_evtserver').attr('disabled', 'disabled');
      $('#check_startup_action_rsio').attr('disabled', 'disabled');
      $('#check_startup_action_ftp').attr('disabled', 'disabled');

      $('#label_action_alarm_output').addClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink').addClass('cls_item_font_grey');
      $('#label_action_record').addClass('cls_item_font_grey');
      $('#label_action_ftp').addClass('cls_item_font_grey');
      $('#label_action_send_email').addClass('cls_item_font_grey');
      $('#label_action_snapshot').addClass('cls_item_font_grey');
      $('#label_action_audio_out').addClass('cls_item_font_grey');
      $('#label_action_notify_server').addClass('cls_item_font_grey');

      $('#label_action_alarm_output').removeClass('cls_item_font_light');
      $('#label_action_alarm_ledblink').removeClass('cls_item_font_light');
      $('#label_action_record').removeClass('cls_item_font_light');
      $('#label_action_ftp').removeClass('cls_item_font_light');
      $('#label_action_send_email').removeClass('cls_item_font_light');
      $('#label_action_snapshot').removeClass('cls_item_font_light');
      $('#label_action_audio_out').removeClass('cls_item_font_light');
      $('#label_action_notify_server').removeClass('cls_item_font_light');
    } else if (active == 1) {
      document.getElementById('check_startup_enable').checked = true;
      $('#check_startup_action_iooutput').removeAttr('disabled');
      $('#check_startup_action_ledblink').removeAttr('disabled');
      $('#check_startup_action_record').removeAttr('disabled');
      $('#check_startup_action_sendemail').removeAttr('disabled');
      $('#check_startup_action_snapshot').removeAttr('disabled');
      $('#check_startup_action_audioout').removeAttr('disabled');
      $('#check_startup_action_evtserver').removeAttr('disabled');
      $('#check_startup_action_rsio').removeAttr('disabled');
      $('#check_startup_action_ftp').removeAttr('disabled');

      $('#label_action_alarm_output').removeClass('cls_item_font_grey');
      $('#label_action_alarm_ledblink').removeClass('cls_item_font_grey');
      $('#label_action_record').removeClass('cls_item_font_grey');
      $('#label_action_ftp').removeClass('cls_item_font_grey');
      $('#label_action_send_email').removeClass('cls_item_font_grey');
      $('#label_action_snapshot').removeClass('cls_item_font_grey');
      $('#label_action_audio_out').removeClass('cls_item_font_grey');
      $('#label_action_notify_server').removeClass('cls_item_font_grey');

      $('#label_action_alarm_output').addClass('cls_item_font_light');
      $('#label_action_alarm_ledblink').addClass('cls_item_font_light');
      $('#label_action_record').addClass('cls_item_font_light');
      $('#label_action_ftp').addClass('cls_item_font_light');
      $('#label_action_send_email').addClass('cls_item_font_light');
      $('#label_action_snapshot').addClass('cls_item_font_light');
      $('#label_action_audio_out').addClass('cls_item_font_light');
      $('#label_action_notify_server').addClass('cls_item_font_light');
    }
    var actionmask = parseInt(outmask);
    if (actionmask & 1) {
      document.getElementById('check_startup_action_iooutput').checked = true;
    }
    if (actionmask & (1 << 8)) {
      document.getElementById('check_startup_action_ledblink').checked = true;
    }
    if (actionmask & (1 << 12)) {
      document.getElementById('check_startup_action_snapshot').checked = true;
    }
    if (actionmask & (1 << 13)) {
      document.getElementById('check_startup_action_record').checked = true;
    }
    if (actionmask & (1 << 14)) {
      document.getElementById('check_startup_action_ftp').checked = true;
    }
    if (actionmask & (1 << 16)) {
      document.getElementById('check_startup_action_sendemail').checked = true;
    }
    if (actionmask & (1 << 17)) {
      document.getElementById('check_startup_action_audioout').checked = true;
    }
    if (actionmask & (1 << 18)) {
      document.getElementById('check_startup_action_evtserver').checked = true;
    }
    if (actionmask & (1 << 19)) {
      document.getElementById('check_startup_action_rsio').checked = true;
    }
  });
}

function fun_save_network_disconnect_actions() {
  var enable = document.getElementById('check_network_enable').checked;
  var mintime = document.getElementById('input_pir_mintime_text').value;
  var alarm = document.getElementById('check_action_iooutput').checked;
  var blink = document.getElementById('check_action_ledblink').checked;
  var record = document.getElementById('check_action_record').checked;
  var snapshot = document.getElementById('check_action_snapshot').checked;
  var audio = document.getElementById('check_action_audioout').checked;
  var rsio1 = document.getElementById('check_action_rsio').checked;

  if (mintime <= 0 || mintime > 300) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }

  var tartmask = 0;
  var strenable = '';
  if (enable) {
    strenable = '1';
  } else {
    strenable = '0';
  }
  if (alarm) {
    tartmask |= 1;
  }
  if (blink) {
    tartmask |= 1 << 8;
  }
  if (record) {
    tartmask |= 1 << 13;
  }
  if (snapshot) {
    tartmask |= 1 << 12;
  }
  if (audio) {
    tartmask |= 1 << 17;
  }
  if (rsio1) {
    tartmask |= 1 << 19;
  }
  var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<alarmevt>' + '<active>' + strenable + '</active>' + '<duration>' + mintime + '</duration>' + '<outmask>' + tartmask + '</outmask>' + '<schedule>' + '<day/>' + '</schedule>' + '</alarmevt>' + '</request>';
  sdk_setipcparam('/action/set?subject=alarm&type=5', targetxml, function (result) {
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

function fun_save_device_startup_actions() {
  var enable = document.getElementById('check_startup_enable').checked;
  var alarm = document.getElementById('check_startup_action_iooutput').checked;
  var blink = document.getElementById('check_startup_action_ledblink').checked;
  var record = document.getElementById('check_startup_action_record').checked;
  var ftp = document.getElementById('check_startup_action_ftp').checked;
  var email = document.getElementById('check_startup_action_sendemail').checked;
  var snapshot = document.getElementById('check_startup_action_snapshot').checked;
  var audio = document.getElementById('check_startup_action_audioout').checked;
  var evtserver = document.getElementById('check_startup_action_evtserver').checked;
  var rsio = document.getElementById('check_startup_action_rsio').checked;

  var tartmask = 0;
  var strenable = '';
  if (enable) {
    strenable = '1';
  } else {
    strenable = '0';
  }

  if (alarm) {
    tartmask |= 1;
  }
  if (blink) {
    tartmask |= 1 << 8;
  }
  if (record) {
    tartmask |= 1 << 13;
  }
  if (ftp) {
    tartmask |= 1 << 14;
  }
  if (email) {
    tartmask |= 1 << 16;
  }
  if (snapshot) {
    tartmask |= 1 << 12;
  }
  if (audio) {
    tartmask |= 1 << 17;
  }
  if (evtserver) {
    tartmask |= 1 << 18;
  }
  if (rsio) {
    tartmask |= 1 << 19;
  }

  var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<alarmevt>' + '<active>' + strenable + '</active>' + '<duration>0</duration>' + '<outmask>' + tartmask + '</outmask>' + '<schedule>' + '<day/>' + '</schedule>' + '</alarmevt>' + '</request>';
  sdk_setipcparam('/action/set?subject=alarm&type=1', targetxml, function (result) {
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
