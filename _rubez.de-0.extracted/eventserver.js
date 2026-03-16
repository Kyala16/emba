
$(document).ready(function () {
    fun_multilang_adapter();
    fun_register_events();
    fun_get_evtserver_parameters();
});

function fun_register_events() {
    $("#button_event_server_save").click(function () {
        fun_set_evtserver_parameters();
    });
    $("#button_event_server_test").click(function () {
        fun_test_evtserver();
    });
    $("#button_event_server_restore").click(function () {
        fun_restore_evtserver_parameters();
    });
    $("#select_evtserver_type_one").change(function () {
        fun_evtserver_type_change();
    });
    $("#check_action_alertServe_one,#check_action_alertServe_two").change(function () {
        const eleID = $(this).attr('id').split('_');
        const serverNum = eleID[eleID.length - 1];
        const isCheck = $(this).is(':checked');
        $('#input_event_server_port_' + serverNum + '_text,#input_event_server_address_' + serverNum + '_text').prop('disabled', !isCheck);

    });
    $("#div_event_server_content .cls_subpage_content_input").css("width", "225px");
    $("#input_event_server_password_one_text").css("width", "200px");

}

function fun_password_eye_showorhide(eyestatus) {
    var password = $("#input_event_server_password_one_text")[0];
    var stytus = (eyestatus == 0);
    $("#password_eye_show").css('display', stytus ? 'block' : 'none');
    $("#password_eye_hide").css('display', stytus ? 'none' : 'block');
    password.type = stytus ? "text" : 'password';
}

function fun_evtserver_type_change() {
    var evttype = $("#select_evtserver_type_one").val();
    const eleArr = $("#div_evtserver_one_username," +
        "#div_evtserver_one_password," +
        "#div_evtserver_one_url," +
        "#server_confidential," +
        "#div_smtp_server_dataFormat"
    );
  eval(`eleArr.${(evttype == 0 ? 'hide' : 'show')}()`);

  // mqtt
  $('#select_evtserver_dataFormat option[value="0"]').prop('disabled', evttype == 3);
  $('#select_evtserver_dataFormat').val(evttype == 3 ? 1 : 0);
  $('#div_evtserver_one_clientid').css('display', evttype == 3 ? 'block' : 'none');
  var urlstr = translate_page_item(TARGET_PAGE_SUB_EVTSERVER, evttype == 3 ? 'subtheme' : "url", "", ITEM_TYPE_NONE);

  $('#div_evtserver_url_one_name').text(urlstr);//
}
function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "evtservertitle", "div_table_event_server_text,label_action_alertServe_one_name,label_action_alertServe_two_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "port", "div_evtserver_port_one_name,div_evtserver_port_two_name,div_evtserver_port_three_name,div_evtserver_port_four_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "alias", "div_evtserver_alias_one_name,div_evtserver_alias_two_name,div_evtserver_alias_three_name,div_evtserver_alias_four_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "serveraddr", "div_evtserver_address_one_name,div_evtserver_address_two_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "type", "div_evtserver_type_one_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "username", "div_evtserver_username_one_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "password", "div_evtserver_password_one_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "url", "div_evtserver_url_one_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "dataformat", "div_evtserver_dataFormat_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "confidential", "server_confidential", ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "clientid", "div_evtserver_clientid_one_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "save", "button_event_server_save", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "restore", "button_event_server_restore", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "test", "button_event_server_test", ITEM_TYPE_VALUE);

    input_edit_restriction("input_event_server_address_one_text", EDIT_RESTRICTION_XMLSTD, 32);
    input_edit_restriction("input_event_server_port_one_text", EDIT_RESTRICTION_NUMBER, 5);
    input_edit_restriction("input_event_server_alias_one_text", EDIT_RESTRICTION_XMLSTD, 32);
    input_edit_restriction("input_event_server_username_one_text", EDIT_RESTRICTION_XMLSTD, 32);
    input_edit_restriction("input_event_server_password_one_text", EDIT_RESTRICTION_PASSWORD, 32);
    input_edit_restriction("input_event_server_url_one_text", EDIT_RESTRICTION_XMLSTD, 64);

    var typeprivate = translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "typeprivate", "", ITEM_TYPE_NONE);
    var typehttp = translate_page_item(TARGET_PAGE_SUB_EVTSERVER, "typehttp", "", ITEM_TYPE_NONE);
    $("#select_evtserver_type_one option").each(function (i, n) {
        if (i == 0) {
            $(n).text(typeprivate);
        }
    });
}

var g_httpurl = "";
function fun_get_evtserver_parameters() {
    sdk_getipcparam("/action/get?subject=evtserver", res => {
        if (res == false) return;
        $xml = $(res);
        $xml.find('evtserver').children().each(function (index) {
            var context = $($(this)[0])
            // console.log(context);
            var type = context.children("type").text();
            var format = context.children("format").text();
            var name = context.children("name").text();
            var authname = context.children("authname").text();
            var authpass = context.children("authpass").text();
            var httpurl = context.children("httpurl").text();
      var clientid = context.children("clientid").text();

            // console.log(index);
            $("#select_evtserver_type_one").val(parseInt(type));//type
            $("#input_event_server_alias_one_text").val(name);//Alias
            $("#select_evtserver_dataFormat").val(format);//Data Format
            $("#input_event_server_username_one_text").val(authname);
            $("#input_event_server_password_one_text").val(authpass);
            $("#input_event_server_url_one_text").val(httpurl);
            var host = context.children("host").text();
            var port = context.children("port").text();
            switch (index) {
                case 0:
                    $("#input_event_server_address_one_text").val(host);
                    $("#input_event_server_port_one_text").val(port);
                    break;
                case 1:
                    $("#input_event_server_address_two_text").val(host);
                    $("#input_event_server_port_two_text").val(port);
                    break;
                default:
                    break;
            }
            $('.cls_schedule_radio').eq(index).prop("checked", !(port == '' && host == ''));
            g_httpurl = httpurl;
            if (type == 0) {
                $("#div_evtserver_one_username," +
                    "#div_evtserver_one_password," +
                    "#div_evtserver_one_url," +
                    "#server_confidential," +
                    "#div_smtp_server_dataFormat"
                ).hide();
            }
      // MQTT
      $('#select_evtserver_dataFormat option[value="0"]').prop('disabled', type == 3);
      $('#select_evtserver_dataFormat').val(type == 3 ? 1 : format);
      $('#div_evtserver_one_clientid').css('display', type == 3 ? 'block' : 'none');
      $('#input_event_server_clientid_one_text').val(clientid);
      var urlstr = translate_page_item(TARGET_PAGE_SUB_EVTSERVER, type == 3 ? 'subtheme' : "url", "", ITEM_TYPE_NONE);
      $('#div_evtserver_url_one_name').text(urlstr);//
        })
    });
}

function fun_restore_evtserver_parameters() {
    $("#select_evtserver_type_one").val(0);
    $("#input_event_server_address_one_text").val("");
    $("#input_event_server_port_one_text").val("2006");
    $("#input_event_server_alias_one_text").val("");
    $("#input_event_server_username_one_text").val("");
    $("#input_event_server_password_one_text").val("");
    $("#input_event_server_url_one_text").val("/event");
    g_httpurl = "/event";
    $("#div_evtserver_one_username," +
        "#div_evtserver_one_password," +
        "#div_evtserver_one_url," +
        "#server_confidential").hide();
}

function fun_set_evtserver_parameters() {
    var type = $("#select_evtserver_type_one").val();
    var name = $("#input_event_server_alias_one_text").val();

    var authname = $("#input_event_server_username_one_text").val();
    var authpass = $("#input_event_server_password_one_text").val();
    var httpurl = $("#input_event_server_url_one_text").val();
    var dataformat = $('#select_evtserver_dataFormat').val();
  var clientid = $('#input_event_server_clientid_one_text').val();
  
     var host1 = $("#input_event_server_address_one_text").val();
     var port1 = $("#input_event_server_port_one_text").val();
     var host2 = $("#input_event_server_address_two_text").val();
      var port2 = $("#input_event_server_port_two_text").val();
     var passreg = /.{0,32}/;
     if (type == 1) {
          if (httpurl == "") httpurl = g_httpurl;
  }
  // else {
  //   httpurl = g_httpurl
  // };


    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
    var input = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    var ischeck1 = $('#check_action_alertServe_one').is(':checked');
    var ischeck2 = $('#check_action_alertServe_two').is(':checked');
    if (ischeck1) {
        if (!host1) {
            parent.fun_show_tips_dialog(input, 0);
            console.error('input server #1  content');
            return;
        }
  }
  if (ischeck2) {
    if (!host2) {
      parent.fun_show_tips_dialog(input, 0);
      console.error('input server #2  content');
      return;
    }
  }
  if (!ischeck2 && !ischeck1) {//
    parent.fun_show_tips_dialog(input, 0);
    console.error('must input 1 event content');
         return;
      }
      if (port1 > 65535 || !httpurl.match("^$|^[a-zA-Z0-9\/]+$") || !passreg.test(authpass) || port2 > 65535) {
         parent.fun_show_tips_dialog(input, 0);
          return;
      }
      if (port1 == '' && ischeck1) port1 = 80;
      if (port2 == '' && ischeck2) port2 = 80;
  // console.log('port1=' + port1);
  // console.log('port2=' + port2);
  var types_str = '<type>' + type + '</type>';//http/udp/mqtt
     var format_str = '<format>' + (type == '0' ? '0' : dataformat) + '</format>';//json\xml
     var name_str = '<name>' + name + '</name>';//alias
     var authName_str = '<authname>' + authname + '</authname>';//username
      var authPw_str = '<authpass>' + authpass + '</authpass>';//password
      var httpUrl_str = '<httpurl>' + httpurl + '</httpurl>';//Post URL
  var clientid_str = '<clientid>' + clientid + '</clientid>';//Post URL

  var baseStr = types_str + format_str + name_str + authName_str + authPw_str + httpUrl_str + clientid_str;
    var tagetxml = '<?xml version="1.0" encoding="utf-8"?>' +
        '<request>' +
        '<evtserver>' +
        '<eserver>' +
        baseStr +
        '<host>' + host1 + '</host>' +
        '<port>' + port1 + '</port>' +
        '</eserver>' +
        // --------------------------------------------------------
        '<eserver>' +
        baseStr +
        '<host>' + host2 + '</host>' +
        '<port>' + port2 + '</port>' +
        '</eserver>' +
        '</evtserver>' +
        '</request>';
    sdk_setipcparam("/action/set?subject=evtserver", tagetxml, function (result) {
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

function fun_test_evtserver() {
    var type = $("#select_evtserver_type_one").val();
    var host1 = $("#input_event_server_address_one_text").val();
    var port1 = $("#input_event_server_port_one_text").val();
    var host2 = $("#input_event_server_address_two_text").val();
    var port2 = $("#input_event_server_port_two_text").val();
    var name = $("#input_event_server_alias_one_text").val();
    var dataformat = $('#select_evtserver_dataFormat').val();
    var authname = $("#input_event_server_username_one_text").val();
    var authpass = $("#input_event_server_password_one_text").val();
    var httpurl = $("#input_event_server_url_one_text").val();
  var clientid = $("#input_event_server_clientid_one_text").text();
     var passreg = /.{0,32}/;
    var input = translate_page_item(TARGET_PAGE_TIPSTEXT,"errinput","",ITEM_TYPE_NONE);
     if (!passreg.test(authpass)) {
        parent.fun_show_tips_dialog(input,0);
          return;
      }
     var ischeck1 = $('#check_action_alertServe_one').is(':checked');
      var ischeck2 = $('#check_action_alertServe_two').is(':checked');
     if (!ischeck1) host1 = port1 = '';
      if (!ischeck2) host2 = port2 = '';
     const authInfo_str = e => {
         let str = '<authname>' + (e ? authname : '') + '</authname>' +
             '<authpass>' + (e ? authpass : '') + '</authpass>' +
              '<httpurl>' + (e ? httpurl : '') + '</httpurl>' +
             '<type>' + (e ? type : '') + '</type>' +
              '<name>' + (e ? name : '') + '</name>' +
      '<clientid>' + (e ? clientid : '') + '</clientid>' +
            '<format>' + (e ? (type == '0' ? '0' : dataformat) : '') + '</format>';//json\xml
        return str;
    };
    var tagxml = '<?xml version="1.0" encoding="utf-8"?>' +
        '<request>' +
        '<evtserver>' +
        '<eserver>' +
        '<host>' + host1 + '</host>' +
        '<port>' + port1 + '</port>' +
        authInfo_str(ischeck1) +
        '</eserver>' +
        // -------------------------------------
        '<eserver>' +
        '<host>' + host2 + '</host>' +
        '<port>' + port2 + '</port>' +
        authInfo_str(ischeck2) +
        '</eserver>' +
        '</evtserver>' +
        '</request>';
    var testsuccess = translate_page_item(TARGET_PAGE_TIPSTEXT, "testsuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var testfailed = translate_page_item(TARGET_PAGE_TIPSTEXT, "testfai", "", ITEM_TYPE_NONE);
    sdk_setipcparam("/action/test?subject=evtserver", tagxml, function (res) {
        if (res == true) {
            parent.fun_show_tips_dialog(testsuccess);
        } else if (res == 400) {
            parent.fun_show_tips_dialog(request, 0);
        } else if (res == 403) {
            parent.fun_show_tips_dialog(auth, 0);
        } else {
            parent.fun_show_tips_dialog(testfailed, 0);
        }
    });
}
