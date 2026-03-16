$(document).ready(function () {
  fun_multilang_adapter();
  fun_initialize_pageui();
  fun_register_all_event();
  fun_get_auto_reboot_parameters();
});
var g_maintaintype = -1;
function fun_register_all_event() {
  $('.cls_subpage_content_button').click(function () {
    if (this.id.toString() == 'button_reboot_device') {
      g_maintaintype = 1;
      fun_show_reboot_tips_dialog(true);
    }
  });
  $('#button_tips_dialog_confirm').click(function () {
    fun_tips_confirm();
  });
  $('#button_tips_dialog_cancel').click(function () {
    fun_tips_cancel();
  });
  $('#input_file_import').change(function () {
    fun_upload_config();
  });
  $('#button_reboot_save').click(function () {
    fun_save_auto_reboot();
  });
  $('#check_auto_reboot_enable').click(function () {
    fun_on_autoreboot_enable();
  });
  $('#button_reboot_refresh').click(function () {
    fun_get_auto_reboot_parameters();
  });
  $('#button_reboot_restore').click(function () {
    fun_restore_reboot();
  });
}
function fun_initialize_pageui() {
  timereidt('timer_auto_reboot_time').setvalue('00:00:00');
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'maintaintitle', 'div_table_datetime_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'autoreboot', 'check_autoreboot_text,div_autoreboot_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'cfgdeclare', 'div_import_export_declare_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'notereboot', 'pnote_reboot', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'noterestore', 'pnote_restore_factory', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'devmaintain', 'div_device_maintain_title_text', ITEM_TYPE_TEXT);
  //translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'notedefault', 'pnote_restore_default', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_reboot_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'reboot', 'button_reboot_device', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_COMMON, 'confirm', 'button_tips_dialog_confirm', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_tips_dialog_cancel', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_reboot_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_reboot_restore,button_restore_default_setting', ITEM_TYPE_VALUE);
  var streveryday = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'everyday', '', ITEM_TYPE_NONE);
  var strmonday = translate_page_item(TARGET_PAGE_COMMON, 'monday', '', ITEM_TYPE_NONE);
  var strtuesday = translate_page_item(TARGET_PAGE_COMMON, 'tuesday', '', ITEM_TYPE_NONE);
  var strwednesday = translate_page_item(TARGET_PAGE_COMMON, 'wednesday', '', ITEM_TYPE_NONE);
  var strthursday = translate_page_item(TARGET_PAGE_COMMON, 'thursday', '', ITEM_TYPE_NONE);
  var strfriday = translate_page_item(TARGET_PAGE_COMMON, 'friday', '', ITEM_TYPE_NONE);
  var strsaturday = translate_page_item(TARGET_PAGE_COMMON, 'saturday', '', ITEM_TYPE_NONE);
  var strsunday = translate_page_item(TARGET_PAGE_COMMON, 'sunday', '', ITEM_TYPE_NONE);
  $('#select_weekday option').each(function (i, n) {
    if (i == 0) {
      $(n).text(streveryday);
    } else if (i == 1) {
      $(n).text(strmonday);
    } else if (i == 2) {
      $(n).text(strtuesday);
    } else if (i == 3) {
      $(n).text(strwednesday);
    } else if (i == 4) {
      $(n).text(strthursday);
    } else if (i == 5) {
      $(n).text(strfriday);
    } else if (i == 6) {
      $(n).text(strsaturday);
    } else if (i == 7) {
      $(n).text(strsunday);
    }
  });
}
function fun_convert_to_client(timesec) {
  var hour = parseInt(timesec / 3600);
  var minu = parseInt((timesec % 3600) / 60);
  var seco = parseInt(timesec % 60);
  var hourstr, minustr, secostr;
  if (hour > 9) {
    hourstr = String(hour);
  } else {
    hourstr = '0' + String(hour);
  }
  if (minu > 9) {
    minustr = String(minu);
  } else {
    minustr = '0' + String(minu);
  }
  if (seco > 9) {
    secostr = String(seco);
  } else {
    secostr = '0' + String(seco);
  }
  return hourstr + ':' + minustr + ':' + secostr;
}
function fun_convert_to_server(timestr) {
  var timearr = timestr.split(':');
  if (timearr.length != 3) return 0;
  return parseInt(timearr[0]) * 3600 + parseInt(timearr[1] * 60) + parseInt(timearr[2]);
}
function fun_on_autoreboot_enable() {
  var enable = document.getElementById('check_auto_reboot_enable').checked;
  if (enable) {
    $('#select_weekday').removeAttr('disabled');
    timereidt('timer_auto_reboot_time').disable(false);
  } else {
    $('#select_weekday').attr('disabled', 'disabled');
    timereidt('timer_auto_reboot_time').disable(true);
  }
}
function fun_restore_reboot() {
  document.getElementById('check_auto_reboot_enable').checked = false;
  $('#select_weekday').val(1);
  timereidt('timer_auto_reboot_time').setvalue('02:00:00');
  $('#select_weekday').attr('disabled', 'disabled');
  timereidt('timer_auto_reboot_time').disable(true);
}
function fun_save_auto_reboot() {
  var enable = document.getElementById('check_auto_reboot_enable').checked;
  var mode = $('#select_weekday').val();
  var time = timereidt('timer_auto_reboot_time').getvalue();
  var autotime = time.split(':');
  var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
  if (fun_match_time(autotime)) {
    parent.fun_show_tips_dialog(gtips_input, 0);
    return;
  }
  if (!enable) {
    mode = 0;
  }
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var servertime = fun_convert_to_server(time);
  var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<autoreboot>' + '<mode>' + mode + '</mode>' + '<time>' + servertime + '</time>' + '</autoreboot>' + '</request>';
  sdk_setipcparam('/action/set?subject=autoreboot', targetxml, function (result) {
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
function fun_match_time(arrsande) {
  for (var i = 0; i < 3; i++) {
    if (!arrsande[i].match('^[0-9]+$')) {
      return true;
    }
  }
}
function fun_get_auto_reboot_parameters() {
  sdk_getipcparam('/action/get?subject=autoreboot', function (result) {
    if (result != false) {
      $xml = $(result);
      var mode = $xml.find('mode').text();
      var time = $xml.find('time').text();
      if (mode == 0) {
        document.getElementById('check_auto_reboot_enable').checked = false;
        $('#select_weekday').val(1);
        $('#select_weekday').attr('disabled', 'disabled');
        timereidt('timer_auto_reboot_time').disable(true);
      } else {
        document.getElementById('check_auto_reboot_enable').checked = true;
        $('#select_weekday').val(mode);
        $('#select_weekday').removeAttr('disabled');
        timereidt('timer_auto_reboot_time').disable(false);
      }
      timereidt('timer_auto_reboot_time').setvalue(fun_convert_to_client(time));
    }
  });
}
function fun_reboot_device() {
  var tagetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<maintain>' + '<type>0</type>' + '</maintain>' + '</request>';
  var strsuc = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'rebootsuc', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'rebooterr', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  sdk_setipcparam('/action/set?subject=maintain', tagetxml, function (result) {
    if (result == true) {
      parent.funi_show_wait_dialog(document.location.host);
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}
function fun_restore_factory_device() {
  var tagetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<maintain>' + '<type>1</type>' + '</maintain>' + '</request>';
  var strsuc = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'restoresuc', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'restoreerr', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  sdk_setipcparam('/action/set?subject=maintain', tagetxml, function (result) {
    if (result == true) {
      parent.funi_show_wait_dialog('192.168.1.120');
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}
function fun_restore_default_device() {
  var tagetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<maintain>' + '<type>2</type>' + '</maintain>' + '</request>';
  var strsuc = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'restoresuc', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, 'restoreerr', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  sdk_setipcparam('/action/set?subject=maintain', tagetxml, function (result) {
    if (result == true) {
      parent.funi_show_wait_dialog(document.location.host);
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}
function fun_upload_config() {
  var file = $('#input_file_import').val();
  var upgradeTimeout = 120000;
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'configuploadsuc', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'configuploadfai', '', ITEM_TYPE_NONE);
  $.ajaxFileUpload({
    type: 'post',
    url: '/action/import',
    fileElementId: 'input_file_import',
    cache: false,
    timeout: upgradeTimeout,
    success: function (status) {
      if (status == 200) {
        parent.fun_show_tips_dialog(strsuc);
      } else {
        parent.fun_show_tips_dialog(failed, 0);
      }
    },
    error: function (evt) {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}

function CurBrowserIsIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;
  return false;
}

function fun_tips_confirm() {
  fun_show_reboot_tips_dialog(false);
  if (g_maintaintype == 1) {
    fun_reboot_device();
  } else if (g_maintaintype == 2) {
    fun_restore_factory_device();
  } else if (g_maintaintype == 3) {
    fun_restore_default_device();
  }
  g_maintaintype = -1;
}
function fun_tips_cancel() {
  g_maintaintype = -1;
  fun_show_reboot_tips_dialog(false);
}
function fun_show_reboot_tips_dialog(bshow) {
  if (bshow) {
    if (g_maintaintype == 1) {
      translate_page_item(TARGET_PAGE_TIPSTEXT, 'manualreboot', 'div_reboot_tips_content', ITEM_TYPE_TEXT);
    } else if (g_maintaintype == 2) {
      translate_page_item(TARGET_PAGE_TIPSTEXT, 'manualrestore', 'div_reboot_tips_content', ITEM_TYPE_TEXT);
    } else if (g_maintaintype == 3) {
      translate_page_item(TARGET_PAGE_TIPSTEXT, 'manualdefault', 'div_reboot_tips_content', ITEM_TYPE_TEXT);
    }
    $('#div_reboot_tips').dialog({ modal: true, title: '', width: 385, height: 170, resizable: false });
  } else {
    $('#div_reboot_tips').dialog('destroy');
    $('#div_reboot_tips').css('display', 'none');
  }
}
