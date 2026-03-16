$(window).ready(function() {
    fun_multilang_adapter();
    fun_resigter_all_event();
    fun_init_remote_parameters();
});
var g_ptz_parameters = "";
function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "rsconfigt", "div_title_serialconfig_text", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "baudrate", "div_serialconfig_baudrate_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "databits", "div_serialconfig_databits_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "stopbits", "div_serialconfig_stopbits_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "verifys", "div_serialconfig_verify_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "datacontrol", "div_serialconfig_datacontrol_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG,"send","div_serialconfig_send_name",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG,"text","label_send_text",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG,"hexadecimal","label_send_hexadecimal",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG,"sendtips","label_send_tips_text",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_serialconfig_refresh", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "restore", "button_serialconfig_reset", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "save", "button_serialconfig_save", ITEM_TYPE_VALUE);
    var strnone, strodd, streven, strenable, strdisable;
    strnone = translate_page_item(TARGET_PAGE_COMMON, "none", "", ITEM_TYPE_NONE);
    strodd = translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "oddcheck", "", ITEM_TYPE_NONE);
    streven = translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "evencheck", "", ITEM_TYPE_NONE);
    strenable = translate_page_item(TARGET_PAGE_COMMON, "enable", "", ITEM_TYPE_NONE);
    strdisable = translate_page_item(TARGET_PAGE_COMMON, "disable", "", ITEM_TYPE_NONE);
    $("#select_serialconfig_verify option").each(function(i, n) {
        if (i == 0) {
            $(n).text(strnone);
        } else if (i == 1) {
            $(n).text(strodd);
        } else if (i == 2) {
            $(n).text(streven);
        }
    });
    $("#select_serialconfig_datacontrol option").each(function(i, n) {
        if (i == 0) {
            $(n).text(strdisable);
        } else if (i == 1) {
            $(n).text(strenable);
        }
    });
}
function fun_resigter_all_event() {
    $("#button_serialconfig_refresh,#button_serialconfig_reset,#button_serialconfig_save").click(function() {
        var objid = this.id.toString();
        if (objid == "button_serialconfig_refresh") {
            fun_onrefresh_parameters();
        } else if (objid == "button_serialconfig_reset") {
            fun_onreset_parameters();
        } else if (objid == "button_serialconfig_save") {
            fun_onsave_parameters();
        }
    });
}
function fun_init_remote_parameters() {
    sdk_getipcparam("/action/get?subject=serial",
    function(result) {
        if (result === false) {
            return;
        }
        g_ptz_parameters = result;
        var baudrate = $(result).find("serial_para").children("baudrate").text();
        var data = $(result).find("serial_para").children("databit").text();
        var stop = $(result).find("serial_para").children("stopbit").text();
        var vertify = $(result).find("serial_para").children("parity").text();
        var flow = $(result).find("serial_para").children("flowctrl").text();
        var cmd     = $(result).find("serial_para").children("cmd").text();
        var cmdtype = $(result).find("serial_para").children("cmd_type").text();
        if (baudrate.length > 0) {
            $("#select_serialconfig_baudrate").val(baudrate);
        }
        if (data == 6 || data == 7 || data == 8) {
            $("#select_serialconfig_databits").val(data);
        }
        if (stop == 1 || stop == 2) {
            $("#select_serialconfig_stopbits").val(stop);
        }
        if (vertify == 0 || vertify == 1 || vertify == 2) {
            $("#select_serialconfig_verify").val(vertify);
        }
        if (flow == 0 || flow == 1) {
            $("#select_serialconfig_datacontrol").val(flow);
        }
        $("#input_serialconfig_send_value").val(cmd);
        if (cmdtype == 0) {
            document.getElementById("radio_send_text").checked = true;
        } else {
            document.getElementById("radio_send_hexadecimal").checked = true;
        }
    });
}
function fun_onrefresh_parameters() {
    fun_init_remote_parameters();
}
function fun_onreset_parameters() {
    $("#select_serialconfig_baudrate").val(2400);
    $("#select_serialconfig_databits").val(8);
    $("#select_serialconfig_stopbits").val(1);
    $("#select_serialconfig_verify").val(0);
    $("#select_serialconfig_datacontrol").val(0);
    $("#input_serialconfig_send_value").val("");
    document.getElementById("radio_send_text").checked = true;
}
function fun_onsave_parameters() {
    var strsuc  = translate_page_item(TARGET_PAGE_TIPSTEXT,"infosave","",ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT,"errrequest","",ITEM_TYPE_NONE);
    var auth    = translate_page_item(TARGET_PAGE_TIPSTEXT,"errauthority","",ITEM_TYPE_NONE);
    var failed  = translate_page_item(TARGET_PAGE_TIPSTEXT,"errset","",ITEM_TYPE_NONE);
    var errinput  = translate_page_item(TARGET_PAGE_TIPSTEXT,"errinput","",ITEM_TYPE_NONE);
    var baudrate = $("#select_serialconfig_baudrate").val();
    var databit = $("#select_serialconfig_databits").val();
    var stopbit = $("#select_serialconfig_stopbits").val();
    var verify = $("#select_serialconfig_verify").val();
    var datactrl = $("#select_serialconfig_datacontrol").val();
    var cmd = $("#input_serialconfig_send_value").val();
    var sendradio = document.getElementById("radio_send_hexadecimal").checked?1:0;
    if (sendradio == 0) {
        if (!cmd.match(/^$|^[a-zA-Z0-9]+$/)) {
            parent.fun_show_tips_dialog(errinput, 0);
            return;
        }
    } else {
        var hspace = cmd.trim().split("");
        for (var j = 0; j < hspace.length; j++) {
            if (hspace[j] == " " && hspace[j-1] == " ") {
                parent.fun_show_tips_dialog(errinput, 0);
                return;
            }
        }
        var hex = cmd.trim().split(/\s+/);
        for (var i = 0; i < hex.length; i++) {
            if (hex[i].length > 2) {
                parent.fun_show_tips_dialog(errinput, 0);
                return;
            } else if (!hex[i].match(/^[A-Fa-f0-9]+$/)){
                parent.fun_show_tips_dialog(errinput, 0);
                return;
            }
        }
    }
    var tagstr = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<request>\n' +
        '<serial_para>\n' +
        '<baudrate>'+baudrate+'</baudrate>\n' +
        '<databit>'+databit+'</databit>\n' +
        '<flowctrl>'+datactrl+'</flowctrl>\n' +
        '<parity>'+verify+'</parity>\n' +
        '<stopbit>'+stopbit+'</stopbit>\n' +
        '<cmd>'+cmd+'</cmd>\n' +
        '<cmd_type>'+sendradio+'</cmd_type>\n' +
        '</serial_para>\n' +
        '</request>';
    sdk_setipcparam("/action/set?subject=serial", tagstr,
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