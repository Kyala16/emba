const tipsStrItem = '#info_confirm_answer1,#info_confirm_answer2,#info_confirm_answer3';
const tipsStr = '#confirm_answer1,#confirm_answer1,#confirm_answer1confirm_answer1';
let questionArr = [];
let questionTip1, questionTip2, questionTip3;
$(document).ready(function () {
  fun_init_pageui();
  fun_register_enents();

  isDefaultPWD();
  // ======================================reset start 
  $('#input_retrieval_password_text').bind('blur', blur_reset);
  $('#input_retrieval_password_text').bind('keyup', keyup_reset);
  // ======================================reset end



});
/**
 * 获取默认密码状态
 */
function isDefaultPWD() {
  sdk_getipcparam("/action/get?subject=is_default_passwd", function (val) {
    if (val != false) {
      $xml = $(val);
      var username = $xml.find("username");
      $("#div_login_operations").append(activateStr);
      $("#div_activate_username_text").html(username);

      $('#input_activate_password_text').bind('focus', function () {
        $('#info_password').css('display', 'block');
      });

      $('#input_activate_password_text').bind('blur', blur);
      $('#input_activate_password_text').bind('keyup', keyup);

      $('#input_activate_confirm_text').bind('keyup', confirm_keyup);
      $('#input_activate_confirm_text').bind('blur', function () {
        $('#info_confirm_password').css('display', 'none');
      });
      $("#button_modify_password").click(function () {
        fun_activate();
      });
      // $('#button_login_ipcweb').prop('disabled', true);

      fun_show_activate_password_dialog(true);
      fun_init_pageui();//再次初始化。避免弹窗无翻译
      // fun_show_encryptstring_dialog(true);// -----------------test!!
    }else{
      $("#button_login_ipcweb").click(function () {
        if (!fun_check_login()) return;
        sdk_getipcparam("/action/get?subject=is_default_passwd", function (val) {
          if (!val) {
            fun_do_login(val);
          }else{
            $xml = $(val);
            var username = $xml.find("username");
            $("#div_activate_username_text").html(username);
            fun_show_activate_password_dialog(false);
            fun_show_activate_password_dialog(true);
          }
        })
      });
    }
  });
}
function fun_init_pageui() {
  var itemarray = [];
  itemarray[0] = new combobox_item("item0", "English");
  itemarray[1] = new combobox_item("item1", "简体中文");
  //itemarray[2] = new combobox_item("item2", '繁体中文');
  itemarray[2] = new combobox_item("item3", "Русский");
  //itemarray[4] = new combobox_item("item4", "Deutsch");
  //itemarray[5] = new combobox_item("item5", "日本語");
  combobox("div_language_items", itemarray, "ui-combobox-item", fun_language_selected);

  var language = window.sessionStorage.getItem('bvlanguage');
  if (typeof language == 'string' && language.constructor == String && language.length > 0) {
    var strlang = current_language_string();
    $("#input_language_text").val(strlang);
  } else {
    var curlang;
    if (navigator.browserLanguage) {
      curlang = navigator.browserLanguage;
    } else if (navigator.language) {
      curlang = navigator.language;
    }
    if (curlang.indexOf("en") >= 0) {
      $("#input_language_text").val("English");
      language = "English";
    } else if (curlang.indexOf("zh-tw") >= 0) {
      $("#input_language_text").val("繁体中文");
      language = "繁体中文";
    } else if (curlang.indexOf("zh-cn") >= 0) {
      $("#input_language_text").val("简体中文");
      language = "简体中文";
    } else if (curlang.indexOf("ru") >= 0) {
      $("#input_language_text").val("Русский");
      language = "Russian";
    } else if (curlang.indexOf("ja") >= 0) {
      $("#input_language_text").val("日本語");
      language = "Japanese";
    } else if (curlang.indexOf("de") >= 0) {
      $("#input_language_text").val("Deutsch");
      language = "German";
    } else {
      $("#input_language_text").val("English");
      language = "English";
    }
  }
  $("#input_user_name_text").focus();
  input_edit_restriction("input_password_text", EDIT_RESTRICTION_PASSWORD, 40);
  input_edit_restriction("input_retrieval_password_text", EDIT_RESTRICTION_PASSWORD, 40);
  input_edit_restriction("input_retrieval_confirm_text", EDIT_RESTRICTION_PASSWORD, 40);
  input_edit_restriction("input_activate_password_text", EDIT_RESTRICTION_PASSWORD, 40);
  input_edit_restriction("input_activate_confirm_text", EDIT_RESTRICTION_PASSWORD, 40);

  translate_page_item(TARGET_PAGE_COMMON, "login", "button_login_ipcweb", ITEM_TYPE_VALUE, language);
  translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_expiredate_refresh", ITEM_TYPE_VALUE, language);
  translate_page_item(TARGET_PAGE_COMMON, "reset", "button_save", ITEM_TYPE_VALUE, language);
  translate_page_item(TARGET_PAGE_COMMON, "newpas", "div_retrieval_password_name", ITEM_TYPE_TEXT, language);
  translate_page_item(TARGET_PAGE_SUB_USER, "confirmpwd", "div_retrieval_confirm_name", ITEM_TYPE_TEXT, language);
  translate_page_item(TARGET_PAGE_COMMON, "newpas", "div_activate_passwordtext", ITEM_TYPE_TEXT, language);
  translate_page_item(TARGET_PAGE_SUB_USER, "confirmpwd", "div_activate_confirm_text", ITEM_TYPE_TEXT, language);
  translate_page_item(TARGET_PAGE_COMMON, "username", "div_activate_username", ITEM_TYPE_TEXT, language);
  translate_page_item(TARGET_PAGE_COMMON, "pwdstrength", "div_activate_strength", ITEM_TYPE_TEXT, language);
  translate_page_item(TARGET_PAGE_COMMON, "pwdinfo", "p_activate_text", ITEM_TYPE_TEXT, language);
  translate_page_item(TARGET_PAGE_COMMON, "confirm", "button_modify_password", ITEM_TYPE_VALUE, language);
  translate_page_item(TARGET_PAGE_TIPSTEXT, "pwdnomatch", "confirm_info", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_TIPSTEXT, "inputrule", "inputrule_name,inputrule_reset_name", ITEM_TYPE_TEXT);
  var manageuserTipList = translate_page_item(TARGET_PAGE_TIPSTEXT, "manageuserTipList", "", ITEM_TYPE_NONE).split('**');
  // console.log(manageuserTipList);


  $('#inputrule_content li').each(function (index, element) {
    element.innerText = manageuserTipList[index];
  });
  $('#inputrule_reset_content li').each(function (index, element) {
    element.innerText = manageuserTipList[index];
  });

  var strusername = translate_page_item(TARGET_PAGE_COMMON, "username", "", ITEM_TYPE_NONE, language);
  var strpassword = translate_page_item(TARGET_PAGE_COMMON, "password", "", ITEM_TYPE_NONE, language);
  $("#input_user_name_text").attr("placeholder", strusername);
  $("#input_password_text").attr("placeholder", strpassword);

  // -------------
  let optStr = '';
  questionArr = [];
  for (let i = 0; i < 15; i++) {
    const ele = translate_page_item(TARGET_PAGE_COMMON, `question${i + 1}`, "", ITEM_TYPE_NONE, language);
    optStr += `<option value="${i}">${ele}</option>`;
    questionArr.push(ele)
  }

  sdk_getipcparam("/action/get?subject=answer", function (res) {
    if (res != false) {
      $xml = $(res);
      $xml.find('answer').children().each(function (i) {
        const questionIndex = $(this).text();
        $(`#div_retrieval_reset_q${i + 1}_value`).text(questionArr[questionIndex]);
      });
    }
  });
}

function fun_language_selected(itemid) {
  var strlang = "";
  if (itemid == "item0") {
    $("#input_language_text").val("English");
    strlang = "English";
  } else if (itemid == "item1") {
    $("#input_language_text").val("简体中文");
    strlang = "Chinese";
  } else if (itemid == "item2") {
    $("#input_language_text").val("繁体中文");
    strlang = "ChineseTW";
  } else if (itemid == "item3") {
    $("#input_language_text").val("Русский");
    strlang = "Russian";
  } else if (itemid == "item4") {
    $("#input_language_text").val("Deutsch");
    strlang = "German";
  } else if (itemid == "item5") {
    $("#input_language_text").val("日本語");
    strlang = "Japanese";
  }
  translate_page_item(TARGET_PAGE_COMMON, "login", "button_login_ipcweb", ITEM_TYPE_VALUE, strlang);
  translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_expiredate_refresh", ITEM_TYPE_VALUE, strlang);
  translate_page_item(TARGET_PAGE_COMMON, "reset", "button_save", ITEM_TYPE_VALUE, strlang);
  translate_page_item(TARGET_PAGE_COMMON, "newpas", "div_retrieval_password_name", ITEM_TYPE_TEXT, strlang);
  translate_page_item(TARGET_PAGE_SUB_USER, "confirmpwd", "div_retrieval_confirm_name", ITEM_TYPE_TEXT, strlang);
  translate_page_item(TARGET_PAGE_TIPSTEXT, "inputrule", "inputrule_name", ITEM_TYPE_TEXT);
  var manageuserTipList = translate_page_item(TARGET_PAGE_TIPSTEXT, "manageuserTipList", "", ITEM_TYPE_NONE).split('**');
  console.log(manageuserTipList);

  $('#inputrule_content li').each(function (index, element) {
    element.innerText = manageuserTipList[index];
  });

  var strusername = translate_page_item(TARGET_PAGE_COMMON, "username", "", ITEM_TYPE_NONE, strlang);
  var strpassword = translate_page_item(TARGET_PAGE_COMMON, "password", "", ITEM_TYPE_NONE, strlang);
  $("#input_user_name_text").attr("placeholder", strusername);
  $("#input_password_text").attr("placeholder", strpassword);


  let optStr = '';
  questionArr = [];
  for (let i = 0; i < 15; i++) {
    const ele = translate_page_item(TARGET_PAGE_COMMON, `question${i + 1}`, "", ITEM_TYPE_NONE, strlang);
    optStr += `<option value="${i}">${ele}</option>`;
    questionArr.push(ele)
  }
g(questionArr);

  sdk_getipcparam("/action/get?subject=answer", function (res) {
    if (res != false) {
      $xml = $(res);
      $xml.find('answer').children().each(function (i) {
        const questionIndex = $(this).text();
        $(`#div_retrieval_reset_q${i + 1}_value`).text(questionArr[questionIndex]);
      });
    }
  });
}
function fun_register_enents() {
  $("#div_user_name_warning").css("display", "none");
  $("#div_password_warning").css("display", "none");

  $(document).keydown(function (event) {
    if (event.keyCode == 13 || event.keyCode == 108) {
      document.getElementById("button_login_ipcweb").click();
    }
  });
  $("#button_expiredate_refresh").click(function () {
    fun_get_device_info();
  });
  $("#button_save").click(function () {
    fun_save_password();
  });

  $("#input_user_name_text").css("width", "190px");
  $("#input_password_text").css("width", "158px");
  $(".cls_subpage_content_input").css("width", "235px");
  $("#input_retrieval_auth_text").css("width", "258px");
}
function fun_login_eye_showorhide(eyestatus) {
  var password = document.getElementById("input_password_text");
  if (eyestatus == 0) {
    $("#login_eye_show").show();
    $("#login_eye_hide").hide();
    password.type = "text";
  } else {
    $("#login_eye_hide").show();
    $("#login_eye_show").hide();
    password.type = "password";
  }
}
function fun_reset_newpass_eye_showorhide(eyestatus) {
  var password = document.getElementById("input_retrieval_password_text");
  if (eyestatus == 0) {
    $("#reset_newpass_eye_show").show();
    $("#reset_newpass_eye_hide").hide();
    password.type = "text";
  } else {
    $("#reset_newpass_eye_hide").show();
    $("#reset_newpass_eye_show").hide();
    password.type = "password";
  }
}
function fun_reset_confirmpass_eye_showorhide(eyestatus) {
  var password = document.getElementById("input_retrieval_confirm_text");
  if (eyestatus == 0) {
    $("#reset_confirmpass_eye_show").show();
    $("#reset_confirmpass_eye_hide").hide();
    password.type = "text";
  } else {
    $("#reset_confirmpass_eye_hide").show();
    $("#reset_confirmpass_eye_show").hide();
    password.type = "password";
  }
}

function fun_activate_eye_showorhide(eyestatus) {
  var password = document.getElementById("input_activate_password_text");
  if (eyestatus == 0) {
    $("#activate_newpass_eye_show").show();
    $("#activate_newpass_eye_hide").hide();
    password.type = "text";
  } else {
    $("#activate_newpass_eye_hide").show();
    $("#activate_newpass_eye_show").hide();
    password.type = "password";
  }
}

function fun_activate_confirmpass_eye_showorhide(eyestatus) {
  var password = document.getElementById("input_activate_confirm_text");
  if (eyestatus == 0) {
    $("#activate_confirmpass_eye_show").show();
    $("#activate_confirmpass_eye_hide").hide();
    password.type = "text";
  } else {
    $("#activate_confirmpass_eye_hide").show();
    $("#activate_confirmpass_eye_show").hide();
    password.type = "password";
  }
}
String.prototype.format = function (args) {
  if (arguments.length > 0) {
    var result = this;
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        var reg = new RegExp("({" + key + "})", "g");
        result = result.replace(reg, args[key]);
      }
    } else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == undefined) {
          return "";
        } else {
          var reg = new RegExp("({[" + i + "]})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
    return result;
  } else {
    return this;
  }
}
function fun_check_login() {
  var username = $("#input_user_name_text").val();
  var password = $("#input_password_text").val();
  if (username.length <= 0 || username.length > 32) {
    $("#div_user_name_warning").css("display", "block");
    return false;
  } else if (password.length <= 0 || password.length > 40) {
    $("#div_password_warning").css("display", "block");
    return false;
  }
  return true;
}
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
var strtid = GetQueryString("t");
function fun_do_login(e) {
  if (typeof e!='boolean') return

  var username = $("#input_user_name_text").val();
  var password = $("#input_password_text").val().trim();
  var language = $("#input_language_text").val();
  if (language == "Polski") {
    language = "Polish";
  } else if (language == "Русский") {
    language = "Russian";
  } else if (language == "日本語") {
    language = "Japanese";
  } else if (language == "简体中文") {
    language = "Chinese";
  } else if (language == "繁体中文") {
    language = "ChineseTW";
  } else if (language == "Deutsch") {
    language = "German";
  } else if (language == "English") {
    language = "English";
  }
  
  var access = "";
  access = sha256(strtid + ':' + password);
  fun_postlogin(username, strtid, access, password, language);
}
var timer = 0;
function fun_postlogin(username, tid, access, password, language) {
  var data = 'username=' + username + '&tid=' + tid + '&access=' + access;
  $.ajax({
    url: "/goform/formLogin",
    type: 'post',
    data,
    dataType: 'html',
    async: false,
    timeout: 2000,
    success: function () {
      localStorage.setItem('loginTimeoutStart', new Date().getTime());
      window.sessionStorage.setItem('bvlanguage', language);
      window.location.href = "preview.html";
    },
    error: function (result, error, exception) {
      if (result.status == 403) {
        var restring = result.responseText.split(' ');
        var tipstring = translate_page_item(TARGET_PAGE_TIPSTEXT, "logintimes", "", ITEM_TYPE_NONE, language);
        var tagstring = tipstring.format({
          times: restring[restring.length - 1]
        });
        $("#div_error_tips_area").text(tagstring);
      } else if (result.status == 423) {
        var restring = result.responseText.split(' ');
        var tipstring = translate_page_item(TARGET_PAGE_TIPSTEXT, "loginwait", "", ITEM_TYPE_NONE, language);
        var tagstring = tipstring.format({
          time: restring[restring.length - 1]
        });
        $("#div_error_tips_area").text(tagstring);
      } else {
        translate_page_item(TARGET_PAGE_TIPSTEXT, "errpwd", "div_error_tips_area", ITEM_TYPE_TEXT, language);
      }
      if (timer > 0) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        $("#div_error_tips_area").text("");
        clearTimeout(timer);
        timer = -1;
      }, 10000);
    }
  });
}
function fun_get_device_info() {
  sdk_getipcparam("/get?subject=changepasswd",
    function (result) {
      if (result == false) return;
      var encryptstr = $(result).find("key").text();
      var time = $(result).find("time").text();
      if (encryptstr.length > 0) {
        $("#p_password_encrypt_string").val(encryptstr);
      }
      var secondtime = parseInt(time);
      var h = Math.floor(secondtime / 3600) < 10 ? '0' + Math.floor(secondtime / 3600) : Math.floor(secondtime / 3600);
      var m = Math.floor((secondtime / 60 % 60)) < 10 ? '0' + Math.floor((secondtime / 60 % 60)) : Math.floor((secondtime / 60 % 60));
      var s = Math.floor((secondtime % 60)) < 10 ? '0' + Math.floor((secondtime % 60)) : Math.floor((secondtime % 60));
      var timeformat = h + " " + ":" + " " + m + " " + ":" + " " + s;
      $("#div_retrieval_expiredate_text").text(timeformat);
    });
}
function fun_save_info(info) {
  $("#div_retrieval_copy_info").text(info);
  $("#div_retrieval_copy").css("display", "block");
  setTimeout("document.getElementById('div_retrieval_copy').style.display='none'", 10000);
}
function fun_activate_info(info) {
  $("#div_activate_copy_info").text(info);
  $("#info_confirm_password").hide();
  $("#div_activate_copy").css("display", "block");
  setTimeout("document.getElementById('div_activate_copy').style.display='none'", 2000);
}
/**
 * ------------------------------------===============----重置密码reset
 * @returns 
 */
function fun_save_password() {
  // var authcode = $("#input_retrieval_auth_text").val();
  var password = $("#input_retrieval_password_text").val();//密码----
  var confirm = $("#input_retrieval_confirm_text").val();//确认密码
  var passreg = /\s/;
  if (password != confirm) {
    var strwarning = translate_page_item(TARGET_PAGE_TIPSTEXT, "pwdnomatch", "", ITEM_TYPE_NONE);
    console.log('password != confirm');
    fun_save_info(strwarning);
    return;
  }
  if (password == "" || passreg.test(password)) {
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    console.log('password == "" || passreg.test(password');
    fun_save_info(failed);
    return;
  }
  var encryption = new Base64();
  // var encryptstr = encryption.encode(password);

  getKey(password, aesString => {

    var encryptstr = encryption.encode(aesString);

    var verifyXml = '<?xml version="1.0" encoding="utf-8"?>' +
      '<request>' +
      '<answer ver="2.0">' +
      '<option>' +
      '<question>0</question>' +
      '</option>' +
      '<option>' +
      '<question>0</question>' +
      '</option>' +
      '<option>' +
      '<question>0</question>' +
      '</option>' +
      '<newpwd>' + encryptstr + '</newpwd>' +
      '</answer>' +
      '</request>';
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "resetsuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "resetfai", "", ITEM_TYPE_NONE);
    sdk_setipcparam("/action/set?subject=verify", verifyXml, function (res) {
      if (res == true) {

        fun_save_info(strsuc);
      } else if (res == 400) {
        fun_save_info(request);
        return;
      } else if (res == 403) {
        fun_save_info(auth);
        return;
      } else {
        fun_save_info(failed);
        return;
      }
    })
  })


}
/**
 * 激活
 * @returns 
 */
function fun_activate() {

  var pwd = $('#input_activate_password_text').val();
  var confirm_pwd = $('#input_activate_confirm_text').val();
  if (pwd != confirm_pwd) {
    var strwarning = translate_page_item(TARGET_PAGE_TIPSTEXT, "pwdnomatch", "", ITEM_TYPE_NONE);
    console.log('pwd != confirm_pwd');
    fun_activate_info(strwarning);
    return;
  }
  if (pwd == "") {
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    console.log('pwd == ""');
    fun_activate_info(failed);
    return;
  }
  if (!g_activatepwd_vaildate) {
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    console.log('g_activatepwd_vaildate');
    fun_activate_info(failed);
    return;
  }

  // return
  var encryption = new Base64();

  $(tipsStrItem).css('visibility', 'hidden');
  $(tipsStr).text('');

  getKey(pwd, aesString => {
    var encryptstr = encryption.encode(aesString);
    var answerXml = '<?xml version="1.0" encoding="utf-8"?>' +
      '<request>' +
      '<answer ver="2.0">' +
      '<newpwd>' + encryptstr + '</newpwd>' +
      '</answer>' +
      '</request>';
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "activatesuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "activatefai", "", ITEM_TYPE_NONE);
    sdk_setipcparam("/action/set?subject=answer", answerXml, function (res) {
      if (res == true) {
        fun_activate_info(strsuc);
        setTimeout(() => {
          fun_show_activate_password_dialog(false)
        }, 1500);
      } else if (res == 400) {
        fun_activate_info(request);
        return;
      } else if (res == 403) {
        fun_activate_info(auth);
        return;
      } else {
        fun_activate_info(failed);
        return;
      }
    })
  })
}
function fun_show_activate_password_dialog(bshow) {
  if (bshow) {
    var title = translate_page_item(TARGET_PAGE_COMMON, "activate", "", ITEM_TYPE_NONE);
    $("#div_activate_password").dialog({
      modal: true,
      closeOnEscape: false,
      title: title,
      width: 660,
      height:500,
      top:150,
      resizeable: false,
      // open: function () { },
      close: function () { },
      closeOnEscape: false,
      open: function () { $(".ui-dialog-titlebar-close").remove(); }

    });
  } else {
    $("#div_activate_password").dialog("destroy");
    $("#div_activate_password").css("display", "none");
  }
};

function blur() {
  var pwd = document.getElementById("input_activate_password_text").value.trim();
  if (pwd == "") {
    $('#info_password').css('display', 'none');
  } else {
    if (keyup()) {
      $('#info_password').css('display', 'none');
      $('#button_modify_password').removeAttr('disabled');
    } else {
      $('#info_password').css('display', 'block');
      $('#button_modify_password').attr('disabled', true);
    }
  }
};
/**
 * 密碼强度
 * @returns 
 */
function keyup() {
  var flag = false;
  var value = document.getElementById("input_activate_password_text").value.trim();
  var value_length = value.length;
  var code_length = 0;
  var condition1 = false;
  var condition2 = false;

  if (value_length > 5 && value_length <= 40) {
    condition1 = true;
  }
  if (!/\s/.test(value)) {
    condition2 = true;
  }
  if (/[0-9]/.test(value)) {
    code_length++;
  }
  if (/[a-z]/.test(value)) {
    code_length++;
  }
  if (/[A-Z]/.test(value)) {
    code_length++;
  }
  if (/\W/.test(value)) {
    code_length++;
  }
  if (code_length >= 3 && condition1 && condition2) {
    $('.s1').css('background-color', 'green');
    $('.s2').css('background-color', 'green');
    $('.s3').css('background-color', 'green');
    $('.s4').html(translate_page_item(TARGET_PAGE_COMMON, "strong", "", ITEM_TYPE_NONE)).css('color', 'green');
  } else if (code_length == 2 && condition1 && condition2) {
    $('.s1').css('background-color', '#FFA500');
    $('.s2').css('background-color', '#FFA500');
    $('.s3').css('background-color', '#ccc');
    $('.s4').html(translate_page_item(TARGET_PAGE_COMMON, "middle", "", ITEM_TYPE_NONE)).css('color', '#FFA500');
  } else if (code_length == 1 && condition1 && condition2) {
    $('.s1').css('background-color', 'red');
    $('.s2').css('background-color', '#ccc');
    $('.s3').css('background-color', '#ccc');
    $('.s4').html(translate_page_item(TARGET_PAGE_COMMON, "weak", "", ITEM_TYPE_NONE)).css('color', 'red');
  } else {
    $('.s1').css('background-color', '#ccc');
    $('.s2').css('background-color', '#ccc');
    $('.s3').css('background-color', '#ccc');
    $('.s4').html(' ').css('color', '#ccc');
  }
  const { valid, message } = activate_password_vaildate(value, 'admin');
  console.log(valid);

  if (!valid) {
    g_activatepwd_vaildate = false;//
    $('#div_activateval_newpassword_tip').show();
    $('#div_activateval_newpassword_tip_info').text(message).css('color', 'red');
  } else {//验证成功
    g_activatepwd_vaildate = true;//
    $('#div_activateval_newpassword_tip').show();
    $('#div_activateval_newpassword_tip_info').text(message).css('color', 'green');
    setTimeout(() => {
      $('#div_activateval_newpassword_tip').hide();
      $('#div_activateval_newpassword_tip_info').text('').css('color', 'red');
    }, 3000);
  }

  if (condition1 && condition2 && g_activatepwd_vaildate) {
    flag = true;
  }
  return flag;
}

//reset = =======================listen event========================
var g_activatepwd_vaildate = false;
var g_resetpwd_vaildate = false;
function blur_reset() {
  // console.log('reset_blur');
  if (g_resetpwd_vaildate) {
    $('#div_retrieval_newpassword_tip').hide();
    $('#div_retrieval_newpassword_tip_info').text('').css('color', 'red');

    $('#repeat_pwd_tips').css('color', 'cornflowerblue');
  }

}
let retrieval = '';
function keyup_reset() {
  var val = document.getElementById("input_retrieval_password_text").value.trim();
  const { valid, message } = activate_password_vaildate(val, 'admin');
  if (!valid) {
    g_resetpwd_vaildate = false;//
    $('#div_retrieval_newpassword_tip').show();
    $('#div_retrieval_newpassword_tip_info').text(message).css('color', 'red');
  } else {//验证成功
    g_resetpwd_vaildate = true;//
    // console.log(val);
    if (retrieval != val) {
      $('#div_retrieval_newpassword_tip').show();
      retrieval = val;
      $('#div_retrieval_newpassword_tip_info').text(message).css('color', 'green');
    }
  }
}
//reset = =======================listen event========================



function confirm_keyup() {
  if ($('#input_activate_confirm_text').val() == $('#input_activate_password_text').val()) {
    $('#info_confirm_password').css('display', 'none');
  } else {
    $('#div_activate_copy').hide();
    $('#info_confirm_password').css('display', 'block');
    $('#info_password').css('display', 'none');
  }
}
/**
 * 问题不允许相同-验证函数
 * @param {*} e 
 * @returns 
 */
const changSelect = e => {
  // e.preventDefault();
  $(tipsStrItem).css('visibility', 'hidden');
  $(tipsStr).text('');
  for (let i = 0; i < 3; i++) {
    const ii = i + 1;
    const ele_i = eval('q' + ii);
    for (let j = 0; j < 3; j++) {
      const jj = j + 1;
      const ele_j = eval('q' + jj);
      if (ele_i == ele_j && ii != jj) {
        $(`#info_confirm_answer${ii},#info_confirm_answer${jj}`).css('visibility', 'visible')
        $(`#confirm_answer${ii},#confirm_answer${jj}`).text(questionTip1);
      }
    }
  }
  if ($(tipsStr).text() == '') {
    return true;
  }
}


