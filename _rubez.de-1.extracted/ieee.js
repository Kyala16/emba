$(document).ready(function () {
  fun_multilang_adapter();
  fun_get_ieee_parameters();
  fun_register_events();
});

function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_COMMON, 'enable', 'div_ieee_item_enable_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'protocal', 'div_ieee_item_protocol_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'eapolver', 'div_ieee_item_eapol_version_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IEEE, 'idtips', 'div_ieee_item_username_name_tip', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'passwordtips', 'div_ieee_item_password_name_tip', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip1', 'div_ieee_item_tip1_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip2', 'div_ieee_item_tip2_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip3', 'div_ieee_item_tip3_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip4', 'div_ieee_item_tip4_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip5', 'div_ieee_item_tip5_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip6', 'div_ieee_item_tip6_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip7', 'div_ieee_item_tip7_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip8', 'div_ieee_item_tip8_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip9', 'div_ieee_item_tip9_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip10', 'div_ieee_item_tip10_value', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip11', 'div_ieee_item_tip11_value', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_OSD, 'upload', 'button_start_upgrade,button_start_crt,button_start_pem', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_COMMON, 'browse', 'button_select_upgrade,button_select_crt,button_select_pem', ITEM_TYPE_VALUE);


  // translate_page_item(TARGET_PAGE_SUB_IEEE, 'file', 'div_select_upgrade_file_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip3', 'div_select_upgrade_file_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip7', 'div_select_clientcrt_file_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IEEE, 'tip9', 'div_select_clientpem_file_text', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'password', 'div_ieee_item_password_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_ieee_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_ieee_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_ieee_save', ITEM_TYPE_VALUE);

  var stryes = translate_page_item(TARGET_PAGE_COMMON, 'yes', '', ITEM_TYPE_NONE);
  var strnot = translate_page_item(TARGET_PAGE_COMMON, 'not', '', ITEM_TYPE_NONE);

  input_edit_restriction('input_ieee_username', EDIT_RESTRICTION_XMLSTD, 32);
  input_edit_restriction('input_dieee_password', EDIT_RESTRICTION_PASSWORD, 32);
}

function fun_register_events() {
  $('#button_ieee_refresh,#button_ieee_restore,#button_ieee_save').click(function () {
    var objid = this.id.toString();
    if (objid == 'button_ieee_refresh') {
      fun_on_ieee_refresh();
    } else if (objid == 'button_ieee_restore') {
      fun_on_ieee_restore();
    } else if (objid == 'button_ieee_save') {
      fun_on_ieee_save();
    }
  });
  $('#check_enable_ieee').click(function () {
    fun_on_ieee_enable_change();
  });
  $('#select_ieee_item_protocol').change(function () {
    var value = $('#select_ieee_item_protocol').val();
    console.log(value);
    if (value == 0) {
      translate_page_item(TARGET_PAGE_COMMON, 'username', 'div_ieee_item_username_name', ITEM_TYPE_TEXT);
      $('#div_ieee_item_username_name_tip').hide();
      $('#div_ieee_item_password_name_tip').hide();
      $('#div_ieee_item_tip_all').hide();
      $('#div_upgrade_file_select,#div_clientcrt_file_select,#div_clientpem_file_select').hide();
    } else {
      translate_page_item(TARGET_PAGE_SUB_IEEE, 'clientid', 'div_ieee_item_username_name', ITEM_TYPE_TEXT);
      $('#div_ieee_item_username_name_tip').show();
      $('#div_ieee_item_password_name_tip').show();
      $('#div_ieee_item_tip_all').show();
      $('#div_upgrade_file_select,#div_clientcrt_file_select,#div_clientpem_file_select').show();
    }
  });
  $('.cls_subpage_content_button').click(function () {
    // console.log(this.id.toString());
    var eleStr = this.id.toString().split('_')[2]
    switch (this.id.toString()) {
      case 'button_select_upgrade':
      case 'button_select_crt':
      case 'button_select_pem':
        fun_onselect_upgrade_file(eleStr);
        break;
      case 'button_start_upgrade':
      case 'button_start_crt':
      case 'button_start_pem':
        fun_start_upgrade(eleStr);

        break;
      default:
        console.log(this.id.toString());
        break;
    }

    // if (this.id.toString() == 'button_select_file') {
    //   fun_onselect_upgrade_file();
    // } else if (this.id.toString() == 'button_start_upgrade') {
    //   fun_start_upgrade();
    // }
  });

  $('#input_upgrade_select').change(function () {
    var file = $('#input_upgrade_select').val();
    $('#text_select_upgrade_file').attr('value', file);
  });
  $('#input_crt_select').change(function () {
    var file = $('#input_crt_select').val();
    $('#text_select_clientcrt_file').attr('value', file);
  });
  $('#input_pem_select').change(function () {
    var file = $('#input_pem_select').val();
    $('#text_select_clientpem_file').attr('value', file);
  });
}
function isValidFileNameStrict(filename) {
  // 检查文件名是否为空或只有扩展名
  if (!filename || filename.trim() === '' || filename === '.pem' || filename === '.crt') {
      return false;
  }
  
  // 正则表达式检查：必须以 .pem 或 .crt 结尾，且前面有至少一个字符
  const pattern = /^[^\\\/:*?"<>|]+\.(pem|crt)$/i;
  return pattern.test(filename);
}
function fun_start_upgrade(eleStr) {
  console.log(eleStr);
  if ($('#input_' + eleStr + '_select').val() == '') {
    return;
  }
  var urlstr = '';
  console.log($('#input_' + eleStr + '_select').val());
  var arrFliename = $('#input_' + eleStr + '_select').val().split('\\');
  var filename = arrFliename[arrFliename.length - 1];

  // if (['.pem', '.crt'].indexOf(filename) == -1) {//��ֹ�����ļ��ύ
  if (!isValidFileNameStrict(filename)) {//��ֹ�����ļ��ύ
    //TODO;
    console.log('文件名不正确');
    return;
  }
// console.log(eleStr);

urlstr='/action/upload?file=ieee_'+(eleStr=='upgrade'?'ca_cert':(eleStr=='crt'?'cl_cert':'pr_key'));
  // console.log(ulstr);
  
  // return
  var upgradeTimeout = 300000;
// console.log(ulstr);

  var url = (location.protocol + '//' + location.hostname + urlstr);

  // console.log(urlstr);
// console.log(url);


  $.ajaxFileUpload({
    type: 'post',
    url,
    fileElementId: 'input_' + eleStr + '_select',
    cache: false,
    timeout: upgradeTimeout,
    success: fun_upload_success,
    error: fun_upload_error
  });
}
function fun_upload_error() {
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'uploadfai', '', ITEM_TYPE_NONE);
  parent.fun_show_tips_dialog(failed, 0);
}
function fun_upload_success(status) {
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'uploadsuc', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'uploadfai', '', ITEM_TYPE_NONE);

  if (status == 200) {
    parent.fun_show_tips_dialog(strsuc);
  } else {
    parent.fun_show_tips_dialog(failed, 0);
  }
}
function fun_onselect_upgrade_file(eleStr) {//����idѡ���Ӧfile input
  // console.log($('#input_'+eleStr+'_select'));
  $('#input_' + eleStr + '_select').click();
}
function fun_password_eye_showorhide(eyestatus) {
  var password = document.getElementById('input_dieee_password');
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

function fun_get_ieee_parameters() {
  sdk_getipcparam('/action/get?subject=ieee8021x', function (result) {
    if (result == false) return;
    $xml = $(result);
    var active = $xml.find('active').text();
    var username = $xml.find('identity').text();
    var password = $xml.find('password').text();
    var eapoltype = $xml.find('eaptype').text();
    var eapolversion = $xml.find('eapver').text();

    if (active == 0) {
      $('#select_ieee_item_protocol').attr('disabled', 'disabled');
      $('#select_ieee_item_eapol_version').attr('disabled', 'disabled');
      $('#input_ieee_username').attr('disabled', 'disabled');
      $('#input_dieee_password').attr('disabled', 'disabled');
      $('#check_enable_ieee').prop('checked', false);
    } else {
      $('#select_ieee_item_protocol').removeAttr('disabled');
      $('#select_ieee_item_eapol_version').removeAttr('disabled');
      $('#input_ieee_username').removeAttr('disabled');
      $('#input_dieee_password').removeAttr('disabled');
      $('#check_enable_ieee').prop('checked', true);
    }
    if (eapoltype == 0) {
      translate_page_item(TARGET_PAGE_COMMON, 'username', 'div_ieee_item_username_name', ITEM_TYPE_TEXT);
      $('#div_ieee_item_username_name_tip').hide();
      $('#div_ieee_item_password_name_tip').hide();
      $('#div_ieee_item_tip_all').hide();
      $('#div_upgrade_file_select,#div_clientcrt_file_select,#div_clientpem_file_select').hide();
    } else {
      translate_page_item(TARGET_PAGE_SUB_IEEE, 'clientid', 'div_ieee_item_username_name', ITEM_TYPE_TEXT);
      $('#div_ieee_item_username_name_tip').show();
      $('#div_ieee_item_password_name_tip').show();
      $('#div_ieee_item_tip_all').show();
      $('#div_upgrade_file_select,#div_clientcrt_file_select,#div_clientpem_file_select').show();
    }
    $('#select_ieee_item_protocol').val(eapoltype);
    $('#select_ieee_item_eapol_version').val(eapolversion);
    $('#input_ieee_username').val(username);
    $('#input_dieee_password').val(password);
  });
}

function fun_on_ieee_enable_change() {
  var enable = $('#check_enable_ieee').prop('checked') ? 1 : 0;
  if (enable == 0) {
    $('#select_ieee_item_protocol').attr('disabled', 'disabled');
    $('#select_ieee_item_eapol_version').attr('disabled', 'disabled');
    $('#input_ieee_username').attr('disabled', 'disabled');
    $('#input_dieee_password').attr('disabled', 'disabled');
  } else {
    $('#select_ieee_item_protocol').removeAttr('disabled');
    $('#select_ieee_item_eapol_version').removeAttr('disabled');
    $('#input_ieee_username').removeAttr('disabled');
    $('#input_dieee_password').removeAttr('disabled');
  }
}

function fun_on_ieee_refresh() {
  fun_get_ieee_parameters();
}

function fun_on_ieee_restore() {
  $('#check_enable_ieee').prop('checked', false);
  $('#select_ieee_item_protocol').val(1);
  $('#select_ieee_item_eapol_version').val(0);
  $('#input_ieee_username').val('');
  $('#input_dieee_password').val('');
  $('#select_ieee_item_protocol').attr('disabled', 'disabled');
  $('#select_ieee_item_eapol_version').attr('disabled', 'disabled');
  $('#input_ieee_username').attr('disabled', 'disabled');
  $('#input_dieee_password').attr('disabled', 'disabled');
  translate_page_item(TARGET_PAGE_COMMON, 'username', 'div_ieee_item_username_name', ITEM_TYPE_TEXT);
  $('#div_ieee_item_username_name_tip').hide();
  $('#div_ieee_item_password_name_tip').hide();
  $('#div_ieee_item_tip_all').hide();
  $('#div_upgrade_file_select,#div_clientcrt_file_select,#div_clientpem_file_select').hide();
}

function fun_on_ieee_save() {
  var enable = $('#check_enable_ieee').prop('checked') ? 1 : 0;
  var protocol = $('#select_ieee_item_protocol').val();
  var version = $('#select_ieee_item_eapol_version').val();
  var username = $('#input_ieee_username').val();
  var password = $('#input_dieee_password').val();
  var passreg = /.{0,32}/;
  if (!passreg.test(password)) {
    var errinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(errinput, 0);
    return;
  }
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<request>\n' +
    '<ieee8021x ver="2.0">\n' +
    '<active>' + enable + '</active>\n' +
    '<identity>' + username + '</identity>\n' +
    '<eaptype>' + protocol + '</eaptype>\n' +
    '<eapver>' + version + '</eapver>\n' +
    '<password>' + password + '</password>\n' +
    '</ieee8021x>\n' +
    '</request>';

  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  sdk_setipcparam('/action/set?subject=ieee8021x', targetxml, function (result) {
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
