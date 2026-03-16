$(document).ready(function () {
  fun_multilang_adapter();
  fun_register_events();
  fun_get_users_parameters();
  sdk_getipcparam('/action/get?subject=user&method=wsid', function (result) {
    if (result == false) return;
    $xml = $(result);
    $xml.find('user').each(function () {
      g_config = $(this).find('config').text();
      g_option = $(this).find('operation').text();
      if (!(g_config & 64)) {
        $('#button_usermanage_modify,#button_usermanage_delete,#button_usermanage_add').prop('disabled', true);
        $('#div_usermanage_options').remove();

      }
    })
  })
});
var g_config; var g_option
var g_user_name = ""; var g_user_option_flags = 0; var g_user_config_flags = 0;
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_USER, "usertitle", "div_title_usermanage_text", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, "number", "list_column_number", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, "username", "list_column_username,div_usermanage_username_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "group", "list_column_groupname", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, "password", "div_usermanage_password_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "confirmpwd", "div_usermanage_confirm_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "group", "div_usermanage_group_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "authlist", "div_usermanage_authorities_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, "selall", "label_check_all", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "preview", "label_check_preview", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "playback", "label_check_playback", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "intercom", "label_check_talkback", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "maintain", "label_check_maintain", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "storage", "label_check_storage", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "ptzcontrol", "label_check_ptz", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "upgrade", "label_check_upgrade", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "system", "label_check_system", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "network", "label_check_network", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "audio", "label_check_audio", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "video", "label_check_video", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "event", "label_check_event", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "record", "label_check_record", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "usermgr", "label_check_usermgr", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_USER, "smartav", "label_check_smart", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, "save", "button_usermanage_dialog_save", ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, "cancel", "button_usermanage_dialog_cancel", ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, "add", "button_usermanage_add", ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, "modify", "button_usermanage_modify", ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, "delete", "button_usermanage_delete", ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_TIPSTEXT, "inputrule", "inputrule_name", ITEM_TYPE_TEXT);
  var manageuserTipList = translate_page_item(TARGET_PAGE_TIPSTEXT, "manageuserTipList", "", ITEM_TYPE_NONE).split('**');
  // console.log(manageuserTipList);

  $('#inputrule_content li').each(function (index, element) {
    element.innerText = manageuserTipList[index];
  });

  var stradmin = translate_page_item(TARGET_PAGE_SUB_USER, "administrator", "", ITEM_TYPE_NONE);
  var stroperator = translate_page_item(TARGET_PAGE_SUB_USER, "operator", "", ITEM_TYPE_NONE);
  var strviewer = translate_page_item(TARGET_PAGE_SUB_USER, "viewer", "", ITEM_TYPE_NONE);
  var strmax = translate_page_item(TARGET_PAGE_COMMON, "maximum", "", ITEM_TYPE_NONE);
  var strchar = translate_page_item(TARGET_PAGE_COMMON, "character", "", ITEM_TYPE_NONE);
  $("#div_username_declare").text("[ " + strmax + " 32 " + strchar + " ]");
  $("#div_password_declare").text("[ " + strmax + " 40 " + strchar + " ]");

  $("#select_user_group option").each(function (i, n) {
    if (i == 0)
      $(n).text(stradmin); else if (i == 1)
      $(n).text(stroperator); else if (i == 2)
      $(n).text(strviewer);
  }); if (current_language_number() == 25) { $("#div_title_usermanage").css("width", 260); }
  input_edit_restriction("input_usermanage_username_text", EDIT_RESTRICTION_XMLSTD, 32);
  input_edit_restriction("input_usermanage_password_text", EDIT_RESTRICTION_PASSWORD, 40);
  input_edit_restriction("input_usermanage_confirm_text", EDIT_RESTRICTION_PASSWORD, 40);

  // ======================================reset start 
  $('#input_usermanage_password_text').bind('blur', blur_reset);
  $('#input_usermanage_password_text').bind('keyup', keyup_reset);
  // ======================================reset end
}
function fun_register_events() {
  $("#button_usermanage_add,#button_usermanage_modify,#button_usermanage_delete,#button_usermanage_dialog_save,#button_usermanage_dialog_cancel").click(function () {
    var tagid = this.id.toString();
    if (tagid == "button_usermanage_add") {
      fun_on_usermanager_add();
    } else if (
      tagid == "button_usermanage_modify") {
      fun_on_usermanager_modify();
    } else if (tagid == "button_usermanage_delete") {
      fun_on_usermanager_delete();
    } else if (tagid == "button_usermanage_dialog_save") {
      fun_on_dialog_save();
    } else if (tagid == "button_usermanage_dialog_cancel") {
      fun_on_dialog_cancel();
    }
  });
  $("#check_usermanage_authorities_all").click(function () {
    fun_on_auth_check_all();
  });
  $("#select_user_group").change(function () { fun_on_usergroup_change(); });
  $(".cls_auth_list_item_check").click(function () { fun_auth_checkbox_change(); });
  $("#div_add_or_modify_dialog .cls_subpage_content_input").css("width", "140px");
  $("#input_usermanage_username_text").css("width", "119px");
}

//reset = =======================listen event========================
var g_resetpwd_vaildate = false;
function blur_reset() {
  // console.log('reset_blur');
  if (g_resetpwd_vaildate) {
    $('#repeat_pwd_tips').css('color', 'cornflowerblue');
    $('#div_retrieval_newpassword_tip').hide();
    $('#div_retrieval_newpassword_tip_info').text('').css('color', 'red');
  }
}
function keyup_reset() {
  // div_retrieval_newpassword_tip
  var val = document.getElementById("input_usermanage_password_text").value.trim();
  var userName= document.getElementById("input_usermanage_username_text").value;
  const { valid, message } = activate_password_vaildate(val,userName);
  if (!valid) {
    g_resetpwd_vaildate = false;//
    $('#div_retrieval_newpassword_tip').show();
    $('#div_retrieval_newpassword_tip_info').text(message).css('color', 'red');
  } else {//验证成功
    g_resetpwd_vaildate = true;//
    $('#div_retrieval_newpassword_tip').show();
    // console.log(message);
    $('#div_retrieval_newpassword_tip_info').text(message).css('color', 'green');//可用的密码

    // setTimeout(() => {
    //   $('#div_retrieval_newpassword_tip').hide();
    //   $('#div_retrieval_newpassword_tip_info').text('').css('color', 'red');
    // }, 3000);
  }
}
//reset = =======================listen event========================

function fun_password_eye_showorhide(eyestatus) {
  var password = document.getElementById("input_usermanage_password_text");
  if (eyestatus == 0) {
    $("#password_eye_show").show();
    $("#password_eye_hide").hide();
    password.type = "text";
  } else {
    $("#password_eye_hide").show();
    $("#password_eye_show").hide();
    password.type = "password";
  }
}
function fun_confirm_password_eye_showorhide(eyestatus) { var password = document.getElementById("input_usermanage_confirm_text"); if (eyestatus == 0) { $("#confirm_password_eye_show").show(); $("#confirm_password_eye_hide").hide(); password.type = "text"; } else { $("#confirm_password_eye_hide").show(); $("#confirm_password_eye_show").hide(); password.type = "password"; } }
function fun_auth_checkbox_change() { var num = 0; $(".cls_auth_list_item_check[disabled]").each(function () { num += 1; }); var checkboxall = $("#div_usermanage_authorities_list_content .cls_auth_list_item_check").length; var checked = $("#div_usermanage_authorities_list_content .cls_auth_list_item_check:checked").length; if (checked < (checkboxall - num)) { $("#check_usermanage_authorities_all").prop("checked", false); } else { $("#check_usermanage_authorities_all").prop("checked", true); } }
var g_user_count = 0; var g_users_set = []; var g_current_item_index = -1; var g_current_add_mode = -1; function user_items(name, group, config, operation) { this.name = name; this.group = group; this.config = config; this.operation = operation; }
function fun_clear_users_set() { g_users_set.splice(0, g_users_set.length); }
function fun_get_users_parameters() {
  g_user_count = 0;
  fun_clear_users_set(); sdk_getipcparam("/action/get?subject=user", function (result) {
    if (result == false)
      return; $xml = $(result);
    var tempindex = 0; $xml.find("user").each(function () {
      var username = $(this).find("name").text();
      var group = $(this).find("group").text();
      var config = $(this).find("config").text();
      var option = $(this).find("operation").text();
      g_users_set[g_users_set.length] = new user_items(username, group, config, option);
      if (username == 'admin') { g_user_config_flags = config; g_user_option_flags = option; }
      g_user_count++; if (g_user_count == 8) { $("#button_usermanage_add").attr("disabled", "disabled"); }
    });
    fun_flush_user_list();
  });
}
function fun_init_add_auth() {
  $(".cls_auth_list_item_check").each(function () { var tagid = this.id.toString(); document.getElementById(tagid).setAttribute("disabled", true); }); $("#label_check_system,#label_check_network,#label_check_audio,#label_check_video,#label_check_event,#label_check_record,#label_check_usermgr,#label_check_smart,#label_check_preview,#label_check_playback,#label_check_talkback,#label_check_maintain,#label_check_storage,#label_check_ptz,#label_check_upgrade").css("color", "#7f7f7f"); if (g_user_config_flags & 1) { $("#check_authorities_system").removeAttr("disabled"); $("#label_check_system").css("color", "white"); }
  if (g_user_config_flags & 2) { $("#check_authorities_network").removeAttr("disabled"); $("#label_check_network").css("color", "white"); }
  if (g_user_config_flags & 4) { $("#check_authorities_audio").removeAttr("disabled"); $("#label_check_audio").css("color", "white"); }
  if (g_user_config_flags & 8) { $("#check_authorities_video").removeAttr("disabled"); $("#label_check_video").css("color", "white"); }
  if (g_user_config_flags & 16) { $("#check_authorities_event").removeAttr("disabled"); $("#label_check_event").css("color", "white"); }
  if (g_user_config_flags & 32) { $("#check_authorities_record").removeAttr("disabled"); $("#label_check_record").css("color", "white"); }
  if (g_user_config_flags & 64) { $("#check_authorities_usermgr").removeAttr("disabled"); $("#label_check_usermgr").css("color", "white"); }
  if (g_user_config_flags & 128) { $("#check_authorities_smart").removeAttr("disabled"); $("#label_check_smart").css("color", "white"); }
  if (g_user_option_flags & 1) { $("#check_authorities_preview").removeAttr("disabled"); $("#label_check_preview").css("color", "white"); }
  if (g_user_option_flags & 2) { $("#check_authorities_playback").removeAttr("disabled"); $("#label_check_playback").css("color", "white"); }
  if (g_user_option_flags & 4) { $("#check_authorities_talkback").removeAttr("disabled"); $("#label_check_talkback").css("color", "white"); }
  if (g_user_option_flags & 8) { $("#check_authorities_maintain").removeAttr("disabled"); $("#label_check_maintain").css("color", "white"); }
  if (g_user_option_flags & 16) { $("#check_authorities_storage").removeAttr("disabled"); $("#label_check_storage").css("color", "white"); }
  if (g_user_option_flags & 32) { $("#check_authorities_ptz").removeAttr("disabled"); $("#label_check_ptz").css("color", "white"); }
  if (g_user_option_flags & 64) { $("#check_authorities_upgrade").removeAttr("disabled"); $("#label_check_upgrade").css("color", "white"); }
}

function fun_show_addormodify_dialog(bshow) {
  if (bshow) {
    var strtitle = translate_page_item(TARGET_PAGE_SUB_USER, "usertitle", "", ITEM_TYPE_NONE);
    $("#div_add_or_modify_dialog").dialog({
      modal: true, title: strtitle, width: 550, height: 650,
      resizable: false,
      open: function () {
        document.getElementById("input_usermanage_password_text").type = "password";
        $("#password_eye_hide").show(); $("#password_eye_show").hide();
        document.getElementById("input_usermanage_confirm_text").type = "password";
        $("#confirm_password_eye_hide").show(); $("#confirm_password_eye_show").hide();
      }
    });
  } else {
    $("#div_add_or_modify_dialog").dialog("destroy"); $("#div_add_or_modify_dialog").css("display", "none");
  }
}

function fun_flush_user_list() {
  $("#table_usermanage_list").html(""); if (g_users_set.length < 8) { $("#button_usermanage_add").removeAttr("disabled"); }
  var stradmin = translate_page_item(TARGET_PAGE_SUB_USER, "administrator", "", ITEM_TYPE_NONE); var stroperator = translate_page_item(TARGET_PAGE_SUB_USER, "operator", "", ITEM_TYPE_NONE); var strviewer = translate_page_item(TARGET_PAGE_SUB_USER, "viewer", "", ITEM_TYPE_NONE); for (var index = 0; index < g_users_set.length; index++) {
    var username = g_users_set[index].name; var usergroup = g_users_set[index].group; if (usergroup == 0) { usergroup = stradmin; } else if (usergroup == 1) { usergroup = stroperator; } else if (usergroup == 2) { usergroup = strviewer; }
    var tagchild = '<tr id="table_row_' + index + '" onclick="fun_on_list_item_click(this.id)" style="padding: 0; float: left; height: 26px" class="cls_usermanage_list_row cls_usermanage_list_item_size">' + '<th class="cls_usermanage_list_item" style="float: left">' + String(index + 1) + '</th>' + '<th class="cls_usermanage_list_item" style="float: left">' + username + '</th>' + '<th class="cls_usermanage_list_item" style="width: 190px; float: left;">' + usergroup + '</th>' + '</tr>';
    $("#table_usermanage_list").append(tagchild);
  }
}
var g_ismodify_owner = false;
function fun_on_list_item_click(objid) {
  $("#" + objid).addClass("cls_usermanage_list_row_selected");
  $("#" + objid).removeClass("cls_usermanage_list_row");
  $("#table_usermanage_list").children().each(function () {
    if (this.id.toString() != objid) {
      $(this).removeClass("cls_usermanage_list_row_selected");
      $(this).addClass("cls_usermanage_list_row");
    }
  });
  var namearr = objid.split('_');
  g_current_item_index = parseInt(namearr[namearr.length - 1]);
  if (g_users_set[g_current_item_index].name == g_user_name) {
    g_ismodify_owner = true;
  } else {
    g_ismodify_owner = false;
  }
  if (g_current_item_index == 0) {
    $("#button_usermanage_delete").attr("disabled", "disabled");
  } else {
    if (g_users_set[g_current_item_index].name == g_user_name) {
      $("#button_usermanage_delete").attr("disabled", "disabled");
    } else {
      if (g_config & 64) {
        $("#button_usermanage_delete").removeAttr("disabled");
      }
    }
  }
  if (g_users_set[g_current_item_index].name == "admin" && g_users_set[g_current_item_index].name != g_user_name) {
    $("#button_usermanage_modify").attr("disabled", "disabled");
  } else {
    if (g_config & 64) {
      $("#button_usermanage_modify").removeAttr("disabled");
    }
  }
}
function fun_set_user_authorities(config, operation) {
  document.getElementById("check_authorities_system").checked = false; document.getElementById("check_authorities_network").checked = false; document.getElementById("check_authorities_audio").checked = false; document.getElementById("check_authorities_video").checked = false; document.getElementById("check_authorities_event").checked = false; document.getElementById("check_authorities_record").checked = false; document.getElementById("check_authorities_usermgr").checked = false; document.getElementById("check_authorities_smart").checked = false; document.getElementById("check_authorities_preview").checked = false; document.getElementById("check_authorities_playback").checked = false; document.getElementById("check_authorities_talkback").checked = false; document.getElementById("check_authorities_maintain").checked = false; document.getElementById("check_authorities_storage").checked = false; document.getElementById("check_authorities_ptz").checked = false; document.getElementById("check_authorities_upgrade").checked = false; if (config & 1) { document.getElementById("check_authorities_system").checked = true; }
  if (config & 2) { document.getElementById("check_authorities_network").checked = true; }
  if (config & 4) { document.getElementById("check_authorities_audio").checked = true; }
  if (config & 8) { document.getElementById("check_authorities_video").checked = true; }
  if (config & 16) { document.getElementById("check_authorities_event").checked = true; }
  if (config & 32) { document.getElementById("check_authorities_record").checked = true; }
  if (config & 64) { document.getElementById("check_authorities_usermgr").checked = true; }
  if (config & 128) { document.getElementById("check_authorities_smart").checked = true; }
  if (operation & 1) { document.getElementById("check_authorities_preview").checked = true; }
  if (operation & 2) { document.getElementById("check_authorities_playback").checked = true; }
  if (operation & 4) { document.getElementById("check_authorities_talkback").checked = true; }
  if (operation & 8) { document.getElementById("check_authorities_maintain").checked = true; }
  if (operation & 16) { document.getElementById("check_authorities_storage").checked = true; }
  if (operation & 32) { document.getElementById("check_authorities_ptz").checked = true; }
  if (operation & 64) { document.getElementById("check_authorities_upgrade").checked = true; }
  fun_auth_checkbox_change();
}
function fun_add_user(username, password, group, config, option) {
  var encryption = new Base64();
  getKey(password,aesString=>{
    // var encryptstr = encryption.encode(password);
    var encryptstr = encryption.encode(aesString);
    // console.log('base64 加密='+encryptstr);
    var tempstr = encryption.decode(encryptstr);
    var targetxml = '<?xml version="1.0" encoding="utf-8"?>' +
      '<request>' +
      '<user>' +
      '<name>' + username + '</name>' +
      '<password>' + encryptstr + '</password>' +
      '<group>' + parseInt(group) + '</group>' +
      '<permit>' +
      '<config>' + String(config) + '</config>' +
      '<operation>' + String(option) + '</operation>' +
      '</permit>' +
      '</user>' +
      '</request>';
    sdk_setipcparam("/action/set?subject=user&do=add&method=wsid", targetxml, function (result) {
      var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "addsuc", "", ITEM_TYPE_NONE);
      var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
      var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
      var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "addfai", "", ITEM_TYPE_NONE);
      var uexist = translate_page_item(TARGET_PAGE_TIPSTEXT, "userexist", "", ITEM_TYPE_NONE);
      if (result == true) {
        fun_show_addormodify_dialog(false);
        parent.fun_show_tips_dialog(strsuc);
        fun_get_users_parameters();
      } else if (result == 400) {
        parent.fun_show_tips_dialog(request, 0);
      } else if (result == 403) {
        parent.fun_show_tips_dialog(auth, 0);
      } else if (result == 409) {
        parent.fun_show_tips_dialog(uexist, 0);
      } else { parent.fun_show_tips_dialog(failed, 0); }
    });
  })
  

}
function fun_delete_user(username) {
  if (username == "admin") {
    var strwarning = translate_page_item(TARGET_PAGE_TIPSTEXT, "erradmin", "", ITEM_TYPE_NONE); parent.fun_show_tips_dialog(strwarning, 0);
    return;
  }
  if (!(g_config & 64)) {
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(auth, 0);
    return
  }
  var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<user>' + '<name>' + username + '</name>' + '</user>' + '</request>';
  sdk_setipcparam("/action/set?subject=user&do=del&method=wsid", targetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "deletesuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "deletefai", "", ITEM_TYPE_NONE);
    if (result == true) {
      parent.fun_show_tips_dialog(strsuc);
      fun_get_users_parameters();
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}
function fun_modify_user(username, password, group, config, option) {
  var encryption = new Base64();
  //  var encryptstr = encryption.encode(password);
   getKey(password,aesString=>{
    var encryptstr = encryption.encode(aesString);
    var targetxml = '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<user>' +
    '<name>' + username + '</name>' +
    '<password>' + encryptstr + '</password>' +
    '<group>' + parseInt(group) + '</group>' +
    '<permit>' +
    '<config>' + parseInt(config) + '</config>' +
    '<operation>' + parseInt(option) + '</operation>' +
    '</permit>' +
    '</user>' +
    '</request>';
  sdk_setipcparam("/action/set?subject=user&do=modify&method=wsid", targetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "modifysuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "modifyfai", "", ITEM_TYPE_NONE);
    if (result == true) {
      fun_show_addormodify_dialog(false);
      if (g_ismodify_owner) {
        parent.fun_toTagetpage("../login.html");
      }
      parent.fun_show_tips_dialog(strsuc); fun_get_users_parameters();
    } else if (result == 400) { parent.fun_show_tips_dialog(request, 0); } else if (result == 403) { parent.fun_show_tips_dialog(auth, 0); } else { parent.fun_show_tips_dialog(failed, 0); }
  });
   })
 
}
function fun_on_usermanager_add() {
  g_current_add_mode = 0;
  fun_set_user_authorities(0, 0);
  $("#input_usermanage_username_text").val("");
  $("#select_user_group").val("0");
  $("#input_usermanage_password_text").val("");
  $("#input_usermanage_confirm_text").val("");
  $("#input_usermanage_username_text").removeAttr("disabled");
  $("#select_user_group").removeAttr("disabled");
  $("#check_usermanage_authorities_all").removeAttr("disabled");
  $("#label_check_all").css("color", "white");
  fun_on_usergroup_change();
  fun_init_add_auth();
  fun_show_addormodify_dialog(true);
}
function fun_on_usermanager_modify() {
  g_current_add_mode = 1;
  if (g_current_item_index >= 0 && g_current_item_index < g_users_set.length) {
    fun_set_user_authorities(0, 0);
    $("#input_usermanage_username_text").val("");
    $("#select_user_group").val("0");
    $("#input_usermanage_password_text").val("");
    $("#input_usermanage_confirm_text").val("");
    var username = g_users_set[g_current_item_index].name;
    var groupname = g_users_set[g_current_item_index].group;
    var config = g_users_set[g_current_item_index].config;
    var option = g_users_set[g_current_item_index].operation;
    $("#input_usermanage_username_text").val(username);
    $("#select_user_group").val(groupname);
    $("#input_usermanage_username_text").attr("disabled", "disabled");
    $("#select_user_group").removeAttr("disabled");
    fun_on_usergroup_change();
    fun_set_user_authorities(parseInt(config), parseInt(option));
    if (username == "admin" || username == g_user_name) {
      document.getElementById("check_usermanage_authorities_all").setAttribute("disabled", true);
      document.getElementById("check_authorities_system").setAttribute("disabled", true);
      document.getElementById("check_authorities_network").setAttribute("disabled", true);
      document.getElementById("check_authorities_audio").setAttribute("disabled", true);
      document.getElementById("check_authorities_video").setAttribute("disabled", true);
      document.getElementById("check_authorities_event").setAttribute("disabled", true);
      document.getElementById("check_authorities_record").setAttribute("disabled", true);
      document.getElementById("check_authorities_usermgr").setAttribute("disabled", true);
      document.getElementById("check_authorities_smart").setAttribute("disabled", true);
      document.getElementById("check_authorities_preview").setAttribute("disabled", true);
      document.getElementById("check_authorities_playback").setAttribute("disabled", true);
      document.getElementById("check_authorities_talkback").setAttribute("disabled", true);
      document.getElementById("check_authorities_maintain").setAttribute("disabled", true);
      document.getElementById("check_authorities_storage").setAttribute("disabled", true);
      document.getElementById("check_authorities_ptz").setAttribute("disabled", true);
      document.getElementById("check_authorities_upgrade").setAttribute("disabled", true);
      $("#select_user_group").attr("disabled", "disabled");
      $("#label_check_all,#label_check_system,#label_check_network,#label_check_audio,#label_check_video,#label_check_event,#label_check_record,#label_check_usermgr,#label_check_smart,#label_check_preview,#label_check_playback,#label_check_talkback,#label_check_maintain,#label_check_storage,#label_check_ptz,#label_check_upgrade").css("color", "#7f7f7f");
    } else {
      document.getElementById("check_usermanage_authorities_all").removeAttribute("disabled"); $("#label_check_all").css("color", "white");
    }
    fun_show_addormodify_dialog(true);
  }
}
function fun_on_usermanager_delete() {
  if (g_current_item_index >= 0 && g_current_item_index < g_users_set.length) {
    var username = g_users_set[g_current_item_index].name;
    fun_delete_user(username);
  }
}
function fun_on_dialog_save() {
  var username = $("#input_usermanage_username_text").val();
  var password = $("#input_usermanage_password_text").val();
  var confirm = $("#input_usermanage_confirm_text").val();
  var group = $("#select_user_group").val();
  var namereg = /^[A-Za-z0-9]+$/;
  var passreg = /.{0,32}/;
  // console.log(g_resetpwd_vaildate);
  if (!g_resetpwd_vaildate) {//校验密码  格式
    var errinput = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(errinput, 0); return;
  }

  if (!namereg.test(username) || password == "") {
    var errinput = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(errinput, 0); return;
  }
  if (password != confirm) {
    var strwarning = translate_page_item(TARGET_PAGE_TIPSTEXT, "pwdnomatch", "", ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strwarning, 0); return;
  }

  var system = document.getElementById("check_authorities_system").checked;
  var network = document.getElementById("check_authorities_network").checked;
  var audio = document.getElementById("check_authorities_audio").checked;
  var video = document.getElementById("check_authorities_video").checked;
  var event = document.getElementById("check_authorities_event").checked;
  var record = document.getElementById("check_authorities_record").checked;
  var usermgr = document.getElementById("check_authorities_usermgr").checked;
  var smart = document.getElementById("check_authorities_smart").checked;
  var preview = document.getElementById("check_authorities_preview").checked;
  var playback = document.getElementById("check_authorities_playback").checked;
  var talkback = document.getElementById("check_authorities_talkback").checked;
  var maintain = document.getElementById("check_authorities_maintain").checked;
  var storage = document.getElementById("check_authorities_storage").checked;
  var ptz = document.getElementById("check_authorities_ptz").checked;
  var upgrade = document.getElementById("check_authorities_upgrade").checked;
  var configmask = 0, optionmask = 0;
  if (system) { configmask |= 1; }
  if (network) { configmask |= 2; }
  if (audio) { configmask |= 4; }
  if (video) { configmask |= 8; }
  if (event) { configmask |= 16; }
  if (record) { configmask |= 32; }
  if (usermgr) { configmask |= 64; }
  if (smart) { configmask |= 128; }
  if (preview) { optionmask |= 1; }
  if (playback) { optionmask |= 2; }
  if (talkback) { optionmask |= 4; }
  if (maintain) { optionmask |= 8; }
  if (storage) { optionmask |= 16; }
  if (ptz) { optionmask |= 32; }
  if (upgrade) { optionmask |= 64; }
  // console.log(password);
  // return

  if (g_current_add_mode == 0) {
    fun_add_user(username, password, group, configmask, optionmask);
  } else if (g_current_add_mode == 1) {
    fun_modify_user(username, password, group, configmask, optionmask);
  }
}
function fun_on_dialog_cancel() { fun_show_addormodify_dialog(false); }
function fun_on_usergroup_change() {
  var groupnum = $("#select_user_group").val();
  $(".cls_auth_list_item_check").each(function () {
    var tagid = this.id.toString();
    document.getElementById(tagid).setAttribute("disabled", true);
  });
  document.getElementById("check_usermanage_authorities_all").checked = false;
  document.getElementById("check_authorities_system").checked = false;
  document.getElementById("check_authorities_network").checked = false;
  document.getElementById("check_authorities_audio").checked = false;
  document.getElementById("check_authorities_video").checked = false;
  document.getElementById("check_authorities_event").checked = false;
  document.getElementById("check_authorities_record").checked = false;
  document.getElementById("check_authorities_usermgr").checked = false;
  document.getElementById("check_authorities_smart").checked = false;
  document.getElementById("check_authorities_preview").checked = false;
  document.getElementById("check_authorities_playback").checked = false;
  document.getElementById("check_authorities_talkback").checked = false;
  document.getElementById("check_authorities_maintain").checked = false;
  document.getElementById("check_authorities_storage").checked = false;
  document.getElementById("check_authorities_ptz").checked = false;
  document.getElementById("check_authorities_upgrade").checked = false;
  $("#label_check_system,#label_check_network,#label_check_audio,#label_check_video,#label_check_event,#label_check_record,#label_check_usermgr,#label_check_smart,#label_check_preview,#label_check_playback,#label_check_talkback,#label_check_maintain,#label_check_storage,#label_check_ptz,#label_check_upgrade").css("color", "#7f7f7f");
  if (groupnum == 0) {
    if (g_user_config_flags & 1) { $("#check_authorities_system").removeAttr("disabled"); $("#label_check_system").css("color", "white"); }
    if (g_user_config_flags & 2) { $("#check_authorities_network").removeAttr("disabled"); $("#label_check_network").css("color", "white"); }
    if (g_user_config_flags & 4) { $("#check_authorities_audio").removeAttr("disabled"); $("#label_check_audio").css("color", "white"); }
    if (g_user_config_flags & 8) { $("#check_authorities_video").removeAttr("disabled"); $("#label_check_video").css("color", "white"); }
    if (g_user_config_flags & 16) { $("#check_authorities_event").removeAttr("disabled"); $("#label_check_event").css("color", "white"); }
    if (g_user_config_flags & 32) { $("#check_authorities_record").removeAttr("disabled"); $("#label_check_record").css("color", "white"); }
    if (g_user_config_flags & 64) { $("#check_authorities_usermgr").removeAttr("disabled"); $("#label_check_usermgr").css("color", "white"); }
    if (g_user_config_flags & 128) { $("#check_authorities_smart").removeAttr("disabled"); $("#label_check_smart").css("color", "white"); }
    if (g_user_option_flags & 1) { $("#check_authorities_preview").removeAttr("disabled"); $("#label_check_preview").css("color", "white"); }
    if (g_user_option_flags & 2) { $("#check_authorities_playback").removeAttr("disabled"); $("#label_check_playback").css("color", "white"); }
    if (g_user_option_flags & 4) { $("#check_authorities_talkback").removeAttr("disabled"); $("#label_check_talkback").css("color", "white"); }
    if (g_user_option_flags & 8) { $("#check_authorities_maintain").removeAttr("disabled"); $("#label_check_maintain").css("color", "white"); }
    if (g_user_option_flags & 16) { $("#check_authorities_storage").removeAttr("disabled"); $("#label_check_storage").css("color", "white"); }
    if (g_user_option_flags & 32) { $("#check_authorities_ptz").removeAttr("disabled"); $("#label_check_ptz").css("color", "white"); }
    if (g_user_option_flags & 64) { $("#check_authorities_upgrade").removeAttr("disabled"); $("#label_check_upgrade").css("color", "white"); }
  } else if (groupnum == 1) {
    if (g_user_config_flags & 2) { document.getElementById("check_authorities_network").removeAttribute("disabled"); $("#label_check_network").css("color", "white"); }
    if (g_user_config_flags & 4) { document.getElementById("check_authorities_audio").removeAttribute("disabled"); $("#label_check_audio").css("color", "white"); }
    if (g_user_config_flags & 8) { document.getElementById("check_authorities_video").removeAttribute("disabled"); $("#label_check_video").css("color", "white"); }
    if (g_user_config_flags & 16) { document.getElementById("check_authorities_event").removeAttribute("disabled"); $("#label_check_event").css("color", "white"); }
    if (g_user_config_flags & 32) { document.getElementById("check_authorities_record").removeAttribute("disabled"); $("#label_check_record").css("color", "white"); }
    if (g_user_config_flags & 128) { document.getElementById("check_authorities_smart").removeAttribute("disabled"); $("#label_check_smart").css("color", "white"); }
    if (g_user_option_flags & 1) { document.getElementById("check_authorities_preview").removeAttribute("disabled"); $("#label_check_preview").css("color", "white"); }
    if (g_user_option_flags & 2) { document.getElementById("check_authorities_playback").removeAttribute("disabled"); $("#label_check_playback").css("color", "white"); }
    if (g_user_option_flags & 4) { document.getElementById("check_authorities_talkback").removeAttribute("disabled"); $("#label_check_talkback").css("color", "white"); }
    if (g_user_option_flags & 32) { document.getElementById("check_authorities_ptz").removeAttribute("disabled"); $("#label_check_ptz").css("color", "white"); }
  } else if (groupnum == 2) {
    if (g_user_option_flags & 1) { document.getElementById("check_authorities_preview").removeAttribute("disabled"); $("#label_check_preview").css("color", "white"); }
    if (g_user_option_flags & 2) { document.getElementById("check_authorities_playback").removeAttribute("disabled"); $("#label_check_playback").css("color", "white"); }
    if (g_user_option_flags & 4) { document.getElementById("check_authorities_talkback").removeAttribute("disabled"); $("#label_check_talkback").css("color", "white"); }
    if (g_user_option_flags & 32) { document.getElementById("check_authorities_ptz").removeAttribute("disabled"); $("#label_check_ptz").css("color", "white"); }
  }
}
function fun_on_auth_check_all() {
  var checked = document.getElementById("check_usermanage_authorities_all").checked;
  $(".cls_auth_list_item_check").each(function () {
    var tagid = this.id.toString();
    var disabled = document.getElementById(tagid).getAttribute('disabled');
    if (!disabled && checked) { document.getElementById(tagid).checked = true; } else if (!disabled && !checked) { document.getElementById(tagid).checked = false; }
  });
}