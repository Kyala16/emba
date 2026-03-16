$(document).ready(function () {
  fun_multilang_adapter();
  fun_register_events();
  fun_get_vpn_parameters();
});
function fun_register_events() {
  $('#button_vpn_restore,#button_vpn_refresh,#button_vpn_save').click(function () {
    if (this.id.toString() == 'button_vpn_save') {
      fun_save_vpn_parameters();
    } else if (this.id.toString() == 'button_vpn_restore') {
      fun_restore_vpn_parameters();
    } else {
      fun_get_vpn_parameters();
    }
  });
  $('#check_enable_vpn').click(function () {
    var enable = $('#check_enable_vpn').prop('checked') ? 1 : 0;
    if (enable == 1) {
      $('#input_name,#input_serveraddr,#input_username,#input_password').removeAttr('disabled');
    } else {
      $('#input_name,#input_serveraddr,#input_username,#input_password').attr('disabled', 'disabled');
    }
  });
  $('.cls_subpage_content_input').css('width', '224px');
  $('#input_password').css('width', '200px');
}
function fun_password_eye_showorhide(eyestatus) {
  var password = document.getElementById('input_password');
  if (eyestatus == 0) {
    $('#password_eye_show').show();
    $('#password_eye_hide').hide();
    password.type = 'text';
  } else {
    $('#password_eye_hide').show();
    $('#password_eye_show').hide();
    password.type = 'password';
  }
}
function fun_multilang_adapter() {
  input_edit_restriction('input_name', EDIT_RESTRICTION_PASSWORD, 32);
  input_edit_restriction('input_serveraddr', EDIT_RESTRICTION_PASSWORD, 32);
  input_edit_restriction('input_username', EDIT_RESTRICTION_PASSWORD, 32);
  input_edit_restriction('input_password', EDIT_RESTRICTION_PASSWORD, 32);
  translate_page_item(TARGET_PAGE_COMMON, 'enable', 'label_enable_vpn_declare', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VPN, 'name', 'div_vpn_name_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_EVTSERVER, 'serveraddr', 'div_vpn_serveraddr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'username', 'div_vpn_username_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'password', 'div_vpn_password_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_vpn_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_vpn_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_vpn_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_PPPOE, 'connectsta', 'div_vpn_connectstatus_name', ITEM_TYPE_TEXT);
}
function fun_get_vpn_parameters() {
  sdk_getipcparam('/action/get?subject=l2tp', function (result) {
    if (result != false) {
      $xml = $(result);
      var enable = $xml.find('enable').text();
      var name = $xml.find('name').text();
      var serveraddr = $xml.find('server').text();
      var username = $xml.find('username').text();
      var password = $xml.find('passwd').text();
      var strstatus = $xml.find('status').text();
      if (enable == 1) {
        $('#check_enable_vpn').prop('checked', true);
        $('#input_name,#input_serveraddr,#input_username,#input_password').removeAttr('disabled');
      } else {
        $('#check_enable_vpn').prop('checked', false);
        $('#input_name,#input_serveraddr,#input_username,#input_password').attr('disabled', 'disabled');
      }
      var strconnected = translate_page_item(TARGET_PAGE_COMMON, 'connected', '', ITEM_TYPE_NONE);
      var strdisconnected = translate_page_item(TARGET_PAGE_COMMON, 'disconnected', '', ITEM_TYPE_NONE);
      if (strstatus == 0) {
        $('#div_vpn_connectstatus_value').text(strdisconnected);
      } else {
        $('#div_vpn_connectstatus_value').text(strconnected);
      }
      $('#input_name').val(name);
      $('#input_serveraddr').val(serveraddr);
      $('#input_username').val(username);
      $('#input_password').val(password);
    }
  });
}
function fun_save_vpn_parameters() {
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  var errinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
  var enable = $('#check_enable_vpn').prop('checked') ? 1 : 0;
  var name = $('#input_name').val();
  var serveraddr = $('#input_serveraddr').val();
  var username = $('#input_username').val();
  var password = $('#input_password').val();

  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<l2tp ver="2.0">' + '<enable>' + enable + '</enable>' + '<name>' + name + '</name>' + '<server>' + serveraddr + '</server>' + '<username>' + username + '</username>' + '<passwd>' + password + '</passwd>' + '</l2tp>' + '</request>';
  sdk_setipcparam('/action/set?subject=l2tp', targetxml, function (result) {
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
function fun_restore_vpn_parameters() {
  $('#check_enable_vpn').prop('checked', true);
  $('#input_name').val('testvpn');
  $('#input_serveraddr').val('192.168.1.99');
  $('#input_username').val('tanx');
  $('#input_password').val('12345');
  $('#input_name,#input_serveraddr,#input_username,#input_password').removeAttr('disabled', 'disabled');
}
