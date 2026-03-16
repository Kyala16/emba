$(document).ready(function () {
  fun_multilang_adapter();
  fun_get_interface_parameters();
  fun_get_interface_state();
  fun_register_events();
});
var high = translate_page_item(TARGET_PAGE_COMMON, 'high', '', ITEM_TYPE_NONE);
var low = translate_page_item(TARGET_PAGE_COMMON, 'low', '', ITEM_TYPE_NONE);
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'iointerface', 'div_table_interface_status_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'hardwareinfo', 'div_interface_hardware_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'hardwarestate', 'div_interface_state_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'hardwaretest', 'div_interface_test_title_text', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'alarminputnumber', 'div_interface_hardware_in_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'alarmoutputnumber', 'div_interface_hardware_out_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'inputlevel', 'div_interface_state_in_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'inputlevel', 'div_interface_test_in_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'output', 'div_interface_state_out_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'output', 'div_interface_test_name', ITEM_TYPE_TEXT);
  var test = translate_page_item(TARGET_PAGE_SUB_EVTSERVER, 'test', '', ITEM_TYPE_NONE);
  $('#button_devicetime_save').val(test);

  var strhigh = translate_page_item(TARGET_PAGE_COMMON, 'high', '', ITEM_TYPE_NONE);
  var strlow = translate_page_item(TARGET_PAGE_COMMON, 'low', '', ITEM_TYPE_NONE);
  $('#sel_test_out option').each(function (i, n) {
    if (i == 0) $(n).text(strlow);
    else if (i == 1) $(n).text(strhigh);
  });
}

function fun_get_interface_parameters() {
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) return;
    $xml = $(result);
    var ioAlarmIn = $xml.find('ioin').text();
    var ioAlarmOut = $xml.find('ioout').text();
    $('#div_interface_hardware_in_value').text(ioAlarmIn);
    $('#div_interface_hardware_out_value').text(ioAlarmOut);
  });
}

function fun_get_interface_state() {
  setInterval(() => {
    sdk_getipcparam('/action/get?subject=sysstatus', function (result) {
      if (result == false) return;
      $xml = $(result);
      var ioin = $xml.find('ioin').text();
      var ioout = $xml.find('ioout').text();
      if (ioin & 0x01) {
        $('#div_interface_state_in_value').text(high);
        $('#div_interface_test_in_value').text(high);
      } else {
        $('#div_interface_state_in_value').text(low);
        $('#div_interface_test_in_value').text(low);
      }
      if (ioout & 0x01) {
        $('#div_interface_state_out_value').text(high);
      } else {
        $('#div_interface_state_out_value').text(low);
      }
    });
  }, 1000);
}

function fun_register_events() {
  $('#button_devicetime_save').click(function () {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'testsuc', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'testfai', '', ITEM_TYPE_NONE);
    var val = $('#sel_test_out').val();
    var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<alarmio_test>' + '<out_level>' + val + '</out_level>' + '</alarmio_test>' + '</request>';
    sdk_setipcparam('/action/test?subject=alarmio', targetxml, function (result) {
      if (result == true) {
        parent.fun_show_tips_dialog(strsuc);
      } else {
        parent.fun_show_tips_dialog(failed, 0);
      }
    });
  });
}
