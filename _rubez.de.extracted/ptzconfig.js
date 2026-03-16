$(window).ready(function () {
    fun_multilang_adapter();
    fun_resigter_all_event();
    fun_init_remote_parameters();
});
var g_ptz_parameters = "";
function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "ptzconfigt", "div_title_ptzconfig_text", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_UPNP, "protocol", "div_ptzconfig_protocol_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "addressmask", "div_ptzconfig_address_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "baudrate", "div_ptzconfig_baudrate_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "databits", "div_ptzconfig_databits_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "stopbits", "div_ptzconfig_stopbits_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "verifys", "div_ptzconfig_verify_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "datacontrol", "div_ptzconfig_datacontrol_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, 'showzoom', 'label_zoomshow_ptzconfig', ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, 'config3d', 'label_3d_ptzconfig', ITEM_TYPE_TEXT);
  
    translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_ptzconfig_refresh", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "restore", "button_ptzconfig_reset", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "save", "button_ptzconfig_save", ITEM_TYPE_VALUE);
    var strnone, strodd, streven, strenable, strdisable;
    strnone = translate_page_item(TARGET_PAGE_COMMON, "none", "", ITEM_TYPE_NONE);
    strodd = translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "oddcheck", "", ITEM_TYPE_NONE);
    streven = translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, "evencheck", "", ITEM_TYPE_NONE);
    strenable = translate_page_item(TARGET_PAGE_COMMON, "enable", "", ITEM_TYPE_NONE);
    strdisable = translate_page_item(TARGET_PAGE_COMMON, "disable", "", ITEM_TYPE_NONE);
    $("#select_ptzconfig_verify option").each(function (i, n) { if (i == 0) { $(n).text(strnone); } else if (i == 1) { $(n).text(strodd); } else if (i == 2) { $(n).text(streven); } });
    $("#select_ptzconfig_datacontrol option").each(function (i, n) { if (i == 0) { $(n).text(strdisable); } else if (i == 1) { $(n).text(strenable); } });
    input_edit_restriction("input_ptzconfig_address_value", EDIT_RESTRICTION_NUMBER, 3);
}
function fun_resigter_all_event() {
    $("#button_ptzconfig_refresh,#button_ptzconfig_reset,#button_ptzconfig_save").click(function () {
        var objid = this.id.toString();
        if (objid == "button_ptzconfig_refresh") { fun_onrefresh_parameters(); } else if (objid == "button_ptzconfig_reset") { fun_onreset_parameters(); } else if (objid == "button_ptzconfig_save") { fun_onsave_parameters(); }
    });
}
function fun_init_remote_parameters() {
    sdk_getipcparam("/action/get?subject=ptz", function (result) {
        if (result === false) { return; }
        g_ptz_parameters = result; var proto = $(result).find("protocol").text(); var addre = $(result).find("addr").text();
        var baudrate = $(result).find("serial").children("baudrate").text();
        var data = $(result).find("serial").children("databit").text();
        var stop = $(result).find("serial").children("stopbits").text();
        var vertify = $(result).find("serial").children("parity").text();
        var flow = $(result).find("serial").children("flowctrl").text(); if (proto == 1 || proto == 2) { $("#select_ptzconfig_protocol").val(proto); }
        if (addre.length > 0) { $("#input_ptzconfig_address_value").val(addre); }
        if (baudrate.length > 0) { $("#select_ptzconfig_baudrate").val(baudrate); }
        if (data == 6 || data == 7 || data == 8) { $("#select_ptzconfig_databits").val(data); }
        if (stop == 1 || stop == 2) { $("#select_ptzconfig_stopbits").val(stop); }
        if (vertify == 0 || vertify == 1 || vertify == 2) { $("#select_ptzconfig_verify").val(vertify); }
        if (flow == 0 || flow == 1) { $("#select_ptzconfig_datacontrol").val(flow); }
        var zoomshow = $(result).find('zoomshow').text();
        var d3 = $(result).find('switchOf3D').text();
        $('#check_ptzconfig_zoomshow').prop('checked', (zoomshow == '1'))//�佹����
        $('#check_ptzconfig_3d').prop('checked', (d3 == '1'))//3d��λ
    });
}
function fun_onrefresh_parameters() { fun_init_remote_parameters(); }
function fun_onreset_parameters() {
    $("#select_ptzconfig_protocol").val(1);
    $("#input_ptzconfig_address_value").val(1); $("#select_ptzconfig_baudrate").val(2400);
    $("#select_ptzconfig_databits").val(8); $("#select_ptzconfig_stopbits").val(1);
    $("#select_ptzconfig_verify").val(0); $("#select_ptzconfig_datacontrol").val(0);
    $('#check_ptzconfig_zoomshow,' +
        '#check_ptzconfig_3d'
    ).attr('checked', 'true')
}
function fun_onsave_parameters() {
    var proto = $("#select_ptzconfig_protocol").val(); var addre = $("#input_ptzconfig_address_value").val();
    var baudrate = $("#select_ptzconfig_baudrate").val();
    var databit = $("#select_ptzconfig_databits").val();
    var stopbit = $("#select_ptzconfig_stopbits").val();
    var verify = $("#select_ptzconfig_verify").val();
    var datactrl = $("#select_ptzconfig_datacontrol").val();
    var zoomshow = ($('#check_ptzconfig_zoomshow').is(':checked') ? 1 : 0);
    var d3 = ($('#check_ptzconfig_3d').is(':checked') ? 1 : 0);
    if (addre < 1 || addre > 255) {
        var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
        parent.fun_show_tips_dialog(strerrinput, 0); return;
    }
    $xml = $(g_ptz_parameters);
    $xml.find("protocol").text(proto);
    $xml.find('zoomshow').text(zoomshow);
    $xml.find('switchOf3D').text(d3);
    $xml.find("addr").text(addre); $xml.find("serial").children("baudrate").text(baudrate);
    $xml.find("serial").children("databit").text(databit); $xml.find("serial").children("stopbits").text(stopbit);
    $xml.find("serial").children("parity").text(verify); $xml.find("serial").children("flowctrl").text(datactrl);
    var serializer = new XMLSerializer();
    var tagstr = serializer.serializeToString($xml[0]); if (tagstr.length < 64) { tagstr = serializer.serializeToString($xml[1]); }
    if (tagstr.length < 64) { tagstr = serializer.serializeToString($xml[2]); }
    if (tagstr.indexOf("<?xml version") < 0) { tagstr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + tagstr; }
    sdk_setipcparam("/action/set?subject=ptz", tagstr, function (result) {
        var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
        var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
        var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
        var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
        if (result == true) { parent.fun_show_tips_dialog(strsuc); } else if (result == 400) { parent.fun_show_tips_dialog(request, 0); } else if (result == 403) { parent.fun_show_tips_dialog(auth, 0); } else { parent.fun_show_tips_dialog(failed, 0); }
    });
}