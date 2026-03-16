$(document).ready(function() {
    fun_multilang_adapter();
    fun_register_events();
    fun_get_smtp_parameters();
});
function fun_get_smtp_parameters() {
    sdk_getipcparam("/action/get?subject=smtp",
    function(result) {
        if (result == false) return;
        $xml = $(result);
        var server = $xml.find("host").text();
        var serverport = $xml.find("port").text();
        var username = $xml.find("username").text();
        var password = $xml.find("password").text();
        var sslenable = $xml.find("ssl").text();
        var sender = $xml.find("sender").text();
        var subj = $xml.find("subject").text();
        var recvemail1, recvemail2, recvemail3, recvemail4;
        var tempindex = 1;
        $xml.find("recipient").each(function() {
            if (tempindex == 1) {
                recvemail1 = $(this).text();
                $("#input_smtp_recipient_one").val(recvemail1);
            } else if (tempindex == 2) {
                // recvemail2 = $(this).text();
                // $("#input_smtp_recipient_two").val(recvemail2);
            } else if (tempindex == 3) {
                // recvemail3 = $(this).text();
                // $("#input_smtp_recipient_three").val(recvemail3);
            } else if (tempindex == 4) {
                // recvemail4 = $(this).text();
                // $("#input_smtp_recipient_four").val(recvemail4);
            }
            tempindex++;
        });
        $("#input_smtp_server_address").val(server);
        $("#select_smtp_ssl_enable").val(sslenable);
        $("#input_smtp_server_port").val(serverport);
        $("#input_smtp_client_username").val(username);
        $("#input_smtp_client_password").val(password);
        $("#input_smtp_client_sender").val(sender);
        $("#input_smtp_send_title").val(subj);
    });
}
function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_SMTP, "smtptitle", "div_title_smtp_text", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SMTP, "smtpserver", "div_smtp_server_host_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "auth", "div_smtp_server_auth_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "port", "div_smtp_server_port_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "username", "div_smtp_client_username_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "password", "div_smtp_client_password_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SMTP, "sender", "div_smtp_client_sender_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "restore", "button_smtp_restore", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_smtp_refresh", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "save", "button_smtp_save", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_SMTP, "test", "button_smtp_test", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_SMTP, "subject", "div_smtp_send_title_name", ITEM_TYPE_TEXT);
    var stremail = translate_page_item(TARGET_PAGE_SUB_SMTP, "receiver", "", ITEM_TYPE_NONE);
    var strnone = translate_page_item(TARGET_PAGE_COMMON, "none", "", ITEM_TYPE_NONE);
    $("#div_smtp_reciever_one_name").text(stremail);
    // $("#div_smtp_reciever_two_name").text(stremail + " 2");
    // $("#div_smtp_reciever_thr_name").text(stremail + " 3");
    // $("#div_smtp_reciever_fou_name").text(stremail + " 4");
    $("#select_smtp_ssl_enable option").each(function(i, n) {
        if (i == 0) {
            $(n).text(strnone);
        }
    });
    input_edit_restriction("input_smtp_server_address", EDIT_RESTRICTION_XMLSTD, 128);
    input_edit_restriction("input_smtp_server_port", EDIT_RESTRICTION_NUMBER, 5);
    input_edit_restriction("input_smtp_client_username", EDIT_RESTRICTION_XMLSTD, 63);
    input_edit_restriction("input_smtp_client_password", EDIT_RESTRICTION_PASSWORD, 63);
    input_edit_restriction("input_smtp_client_sender", EDIT_RESTRICTION_XMLSTD, 63);
    input_edit_restriction("input_smtp_send_title", EDIT_RESTRICTION_XMLSTD, 32);
}
function fun_register_events() {
    $("#button_preset_gmail,#button_preset_msmail,#button_preset_yahoomail,#button_preset_other,#button_smtp_refresh,#button_smtp_save,#button_smtp_test").click(function() {
        var tagid = this.id.toString();
        if (tagid == "button_smtp_refresh") {
            fun_refresh_smtp_parameters();
        } else if (tagid == "button_smtp_save") {
            fun_save_smtp_parameters();
        } else if (tagid == "button_smtp_test") {
            fun_smtp_test();
        } else {
            fun_smtp_preset(tagid);
        }
    });
    $("#button_smtp_restore").click(function() {
        fun_restore_smtp();
    });
    $("#select_smtp_ssl_enable").change(function() {
        fun_smtp_change();
    });
    $("#div_smtp_content .cls_subpage_content_input").css("width", "225px");
    $("#input_smtp_client_password").css("width", "200px");
}
function fun_password_eye_showorhide(eyestatus) {
    var password = document.getElementById("input_smtp_client_password");
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
function fun_smtp_change() {
    var val = $("#select_smtp_ssl_enable").val();
    if (val == 0) {
        $("#input_smtp_server_port").val("25");
    } else if (val == 1) {
        $("#input_smtp_server_port").val("465");
    } else {
        $("#input_smtp_server_port").val("587");
    }
}
function fun_restore_smtp() {
    $("#select_smtp_ssl_enable").val("0");
    $("#input_smtp_server_address").val("");
    $("#input_smtp_server_port").val("25");
    $("#input_smtp_client_username").val("");
    $("#input_smtp_client_password").val("");
    $("#input_smtp_client_sender").val("");
    $("#input_smtp_recipient_one").val("");
    // $("#input_smtp_recipient_two").val("");
    // $("#input_smtp_recipient_three").val("");
    // $("#input_smtp_recipient_four").val("");
    $("#input_smtp_send_title").val("ALARM MAIL");
}
function fun_save_smtp_parameters() {
    var hostaddr = $("#input_smtp_server_address").val();
    var sslenable = $("#select_smtp_ssl_enable").val();
    var hostport = $("#input_smtp_server_port").val();
    var username = $("#input_smtp_client_username").val();
    var password = $("#input_smtp_client_password").val();
    var sender = $("#input_smtp_client_sender").val();
    var recipient1 = $("#input_smtp_recipient_one").val();
    // var recipient2 = $("#input_smtp_recipient_two").val();
    // var recipient3 = $("#input_smtp_recipient_three").val();
    // var recipient4 = $("#input_smtp_recipient_four").val();
    var subj = $("#input_smtp_send_title").val();
    var passreg = /.{0,32}/;
    if (!passreg.test(password)) {
        var strinput = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
        parent.fun_show_tips_dialog(strinput, 0);
        return;
    }
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
    var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<smtp ver="2.0">' + '<host>' + hostaddr + '</host>' + '<port>' + hostport + '</port>' + '<username>' + username + '</username>' + '<password>' + password + '</password>' + '<ssl>' + sslenable + '</ssl>' + '<sender>' + sender + '</sender>' + '<recipient>' + recipient1 + '</recipient>' + '<recipient></recipient>' + '<recipient></recipient>' + '<recipient></recipient>'+ '<subject>' + subj + '</subject>' + '</smtp>' + '</request>';
    sdk_setipcparam("/action/set?subject=smtp", targetxml,
    function(result) {
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
function fun_refresh_smtp_parameters() {
    fun_get_smtp_parameters();
}
function fun_smtp_test() {
    var hostaddr = $("#input_smtp_server_address").val();
    var sslenable = $("#select_smtp_ssl_enable").val();
    var hostport = $("#input_smtp_server_port").val();
    var username = $("#input_smtp_client_username").val();
    var password = $("#input_smtp_client_password").val();
    var sender = $("#input_smtp_client_sender").val();
    var recipient1 = $("#input_smtp_recipient_one").val();
    var passreg = /.{0,32}/;
    if (!passreg.test(password)) {
        var strinput = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
        parent.fun_show_tips_dialog(strinput, 0);
        return;
    }
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "testsuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "testfai", "", ITEM_TYPE_NONE);
    var test1xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<smtp>' + '<host>' + hostaddr + '</host>' + '<port>' + hostport + '</port>' + '<username>' + username + '</username>' + '<password>' + password + '</password>' + '<ssl>' + sslenable + '</ssl>' + '<sender>' + sender + '</sender>' + '<recipient>' + recipient1 + '</recipient>' + '</smtp>' + '</request>';
    sdk_setipcparam("/action/test?subject=smtp", test1xml,
    function(result) {
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
function fun_smtp_preset(objid) {
    var smtpserver, serverport, sslenable;
    if (objid == "button_preset_gmail") {
        smtpserver = "smtp.gmail.com";
        serverport = "465";
        sslenable = "1";
    } else if (objid == "button_preset_msmail") {
        smtpserver = "smtp.live.com";
        serverport = "465";
        sslenable = "1";
    } else if (objid == "button_preset_yahoomail") {
        smtpserver = "smtp.mail.yahoo.com";
        serverport = "465";
        sslenable = "1";
    } else if (objid == "button_preset_other") {
        smtpserver = "";
        serverport = "465";
        sslenable = "1";
    }
    $("#input_smtp_server_address").val(smtpserver);
    $("#select_smtp_ssl_enable").val(sslenable);
    $("#input_smtp_server_port").val(serverport);
}