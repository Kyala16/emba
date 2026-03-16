$(document).ready(function () {
  fun_multilang_adapter();
  fun_get_ddns_parameters();
  fun_register_events();
});
function fun_register_events() {
  $('#button_ddns_refresh,#button_ddns_save').click(function () {
    if (this.id.toString() == 'button_ddns_refresh') {
      fun_refresh_ddns_parameters();
    } else {
      fun_save_ddns_parameters();
    }
  });

  $('#radio_ddns_mode_manual,#radio_ddns_mode_auto').click(function () {
    fun_ddns_mode_change();
  });

  $('#check_enable_ddns').click(function () {
    fun_ddns_enable_change();
  });
  $('#button_ddns_restore').click(function () {
    fun_restore_ddns();
  });
  $('#div_ddns_content .cls_subpage_content_input').css('width', '225px');
  $('#input_ddns_password').css('width', '200px');
}
function fun_password_eye_showorhide(eyestatus) {
  var password = document.getElementById('input_ddns_password');
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
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'ddnstitle', 'div_title_ddns_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'enable', 'div_ddns_item_enable_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'servertype', 'div_ddns_item_servertype_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'serverdomain', 'div_ddns_item_serverdomain_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'username', 'div_ddns_item_username_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'password', 'div_ddns_item_password_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'updateinterval', 'div_ddns_item_interval_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'autoddns', 'lable_ddns_mode_auto', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'hostname', 'div_ddns_item_hostname_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'manualddns', 'lable_ddns_mode_manual', ITEM_TYPE_TEXT);
  var strmin = translate_page_item(TARGET_PAGE_COMMON, 'minute', '', ITEM_TYPE_NONE);
  $('#div_ddns_item_interval_declare').text(strmin + ' [1~10]');
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_ddns_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_ddns_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_ddns_restore', ITEM_TYPE_VALUE);
  input_edit_restriction('input_ddns_serverdomain', EDIT_RESTRICTION_XMLSTD, 32);
  input_edit_restriction('input_ddns_username', EDIT_RESTRICTION_XMLSTD, 32);
  input_edit_restriction('input_ddns_password', EDIT_RESTRICTION_PASSWORD, 32);
  input_edit_restriction('input_ddns_interval', EDIT_RESTRICTION_NUMBER, 2);
}
function fun_get_ddns_parameters() {
  sdk_getipcparam('/action/get?subject=ddns', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var type = $xml.find('type').text();
    var interval = $xml.find('interval').text();
    var domain = $xml.find('domain').text();
    var username = $xml.find('username').text();
    var password = $xml.find('password').text();
    var autoddns = $xml.find('autoddns').text();
    if (autoddns == 0) {
      $('#radio_ddns_mode_manual').prop('checked', true);
      $('#div_ddns_item_hostname_name').css('color', 'rgb(127,127,127)');
      $('#div_ddns_item_hostname_value').css('color', 'rgb(127,127,127)');
    } else {
      $('#radio_ddns_mode_auto').prop('checked', true);
      $('#div_ddns_item_hostname_name').css('color', 'white');
      $('#div_ddns_item_hostname_value').css('color', 'rgb(123,185,51)');
    }
    if (active == 0) {
      $('#select_ddns_item_servertype').attr('disabled', 'disabled');
      $('#input_ddns_serverdomain').attr('disabled', 'disabled');
      $('#input_ddns_username').attr('disabled', 'disabled');
      $('#input_ddns_password').attr('disabled', 'disabled');
      $('#input_ddns_interval').attr('disabled', 'disabled');
      $('#radio_ddns_mode_manual').attr('disabled', 'disabled');
      $('#radio_ddns_mode_auto').attr('disabled', 'disabled');
      $('#div_ddns_item_hostname_name').css('color', 'rgb(127,127,127)');
      $('#div_ddns_item_hostname_value').css('color', 'rgb(127,127,127)');
    } else {
      if (autoddns == 1) {
        $('#select_ddns_item_servertype').attr('disabled', 'disabled');
        $('#input_ddns_serverdomain').attr('disabled', 'disabled');
        $('#input_ddns_username').attr('disabled', 'disabled');
        $('#input_ddns_password').attr('disabled', 'disabled');
        $('#input_ddns_interval').attr('disabled', 'disabled');
      } else {
        $('#select_ddns_item_servertype').removeAttr('disabled');
        $('#input_ddns_serverdomain').removeAttr('disabled');
        $('#input_ddns_username').removeAttr('disabled');
        $('#input_ddns_password').removeAttr('disabled');
        $('#input_ddns_interval').removeAttr('disabled');
      }

      $('#radio_ddns_mode_manual').removeAttr('disabled');
      $('#radio_ddns_mode_auto').removeAttr('disabled');
    }
    interval = parseInt(interval / 60);
    if (active == 0) {
      $('#check_enable_ddns').prop('checked', false);
    } else {
      $('#check_enable_ddns').prop('checked', true);
    }
    $('#select_ddns_item_servertype').val(type);
    $('#input_ddns_interval').val(interval);
    $('#input_ddns_serverdomain').val(domain);
    $('#input_ddns_username').val(username);
    $('#input_ddns_password').val(password);
  });
}
function fun_ddns_enable_change() {
  var enable = $('#check_enable_ddns').prop('checked');
  if (enable == 0) {
    $('#select_ddns_item_servertype').attr('disabled', 'disabled');
    $('#input_ddns_serverdomain').attr('disabled', 'disabled');
    $('#input_ddns_username').attr('disabled', 'disabled');
    $('#input_ddns_password').attr('disabled', 'disabled');
    $('#input_ddns_interval').attr('disabled', 'disabled');
    $('#radio_ddns_mode_manual').attr('disabled', 'disabled');
    $('#radio_ddns_mode_auto').attr('disabled', 'disabled');
    $('#div_ddns_item_hostname_name').css('color', 'rgb(127,127,127)');
    $('#div_ddns_item_hostname_value').css('color', 'rgb(127,127,127)');
  } else {
    var change = $('#radio_ddns_mode_manual').prop('checked');
    if (change) {
      $('#select_ddns_item_servertype').removeAttr('disabled');
      $('#input_ddns_serverdomain').removeAttr('disabled');
      $('#input_ddns_username').removeAttr('disabled');
      $('#input_ddns_password').removeAttr('disabled');
      $('#input_ddns_interval').removeAttr('disabled');
      $('#div_ddns_item_hostname_name').css('color', 'rgb(127,127,127)');
      $('#div_ddns_item_hostname_value').css('color', 'rgb(127,127,127)');
    } else {
      $('#select_ddns_item_servertype').attr('disabled', 'disabled');
      $('#input_ddns_serverdomain').attr('disabled', 'disabled');
      $('#input_ddns_username').attr('disabled', 'disabled');
      $('#input_ddns_password').attr('disabled', 'disabled');
      $('#input_ddns_interval').attr('disabled', 'disabled');
      $('#div_ddns_item_hostname_name').css('color', 'white');
      $('#div_ddns_item_hostname_value').css('color', 'rgb(123,185,51)');
    }
    $('#radio_ddns_mode_manual').removeAttr('disabled');
    $('#radio_ddns_mode_auto').removeAttr('disabled');
  }
}

function fun_ddns_mode_change() {
  var change = $('#radio_ddns_mode_manual').prop('checked');
  if (change == 0) {
    $('#select_ddns_item_servertype').attr('disabled', 'disabled');
    $('#input_ddns_serverdomain').attr('disabled', 'disabled');
    $('#input_ddns_username').attr('disabled', 'disabled');
    $('#input_ddns_password').attr('disabled', 'disabled');
    $('#input_ddns_interval').attr('disabled', 'disabled');
    $('#div_ddns_item_hostname_name').css('color', 'white');
    $('#div_ddns_item_hostname_value').css('color', 'rgb(123,185,51)');
  } else {
    $('#select_ddns_item_servertype').removeAttr('disabled');
    $('#input_ddns_serverdomain').removeAttr('disabled');
    $('#input_ddns_username').removeAttr('disabled');
    $('#input_ddns_password').removeAttr('disabled');
    $('#input_ddns_interval').removeAttr('disabled');
    $('#div_ddns_item_hostname_name').css('color', 'rgb(127,127,127)');
    $('#div_ddns_item_hostname_value').css('color', 'rgb(127,127,127)');
  }
}
function fun_refresh_ddns_parameters() {
  fun_get_ddns_parameters();
}
function fun_restore_ddns() {
  $('#check_enable_ddns').prop('checked', false);
  $('#select_ddns_item_servertype').val('0');
  $('#input_ddns_interval').val('10');
  $('#input_ddns_serverdomain').val('');
  $('#input_ddns_username').val('');
  $('#input_ddns_password').val('');
  $('#select_ddns_item_servertype').attr('disabled', 'disabled');
  $('#input_ddns_interval').attr('disabled', 'disabled');
  $('#input_ddns_serverdomain').attr('disabled', 'disabled');
  $('#input_ddns_username').attr('disabled', 'disabled');
  $('#input_ddns_password').attr('disabled', 'disabled');
  $('#radio_ddns_mode_manual').attr('disabled', 'disabled');
  $('#radio_ddns_mode_auto').prop('checked', 'checked');
  $('#radio_ddns_mode_auto').attr('disabled', 'disabled');
  $('#div_ddns_item_hostname_name').css('color', 'rgb(127,127,127)');
  $('#div_ddns_item_hostname_value').css('color', 'rgb(127,127,127)');
}
function fun_save_ddns_parameters() {
  var active = $('#check_enable_ddns').prop('checked') ? 1 : 0;
  var autoddns = $('#radio_ddns_mode_manual').prop('checked') ? 0 : 1;
  var type = $('#select_ddns_item_servertype').val();
  var interval = $('#input_ddns_interval').val();
  var domain = $('#input_ddns_serverdomain').val();
  var username = $('#input_ddns_username').val();
  var password = $('#input_ddns_password').val();
  var passreg = /.{0,32}/;
  if (!(parseInt(interval) > 0 && parseInt(interval) <= 10) || !passreg.test(password)) {
    var strinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strinput, 0);
    return;
  }
  interval = parseInt(interval) * 60;
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<ddns ver="2.0">' +
    '<active>' +
    active +
    '</active>' +
    '<autoddns>' +
    autoddns +
    '</autoddns>' +
    '<type>' +
    type +
    '</type>' +
    '<interval>' +
    interval +
    '</interval>' +
    '<domain>' +
    domain +
    '</domain>' +
    '<username>' +
    username +
    '</username>' +
    '<password>' +
    password +
    '</password>' +
    '</ddns>' +
    '</request>';
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  sdk_setipcparam('/action/set?subject=ddns', targetxml, function (result) {
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
