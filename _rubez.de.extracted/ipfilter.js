$(document).ready(function () { fun_multilang_adapter(); fun_initialize_pageui(); fun_get_ipfilter_parameters(); fun_register_events(); }); function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_IPFILTER, "ipfiltertitle", "div_title_ipfilter_text", ITEM_TYPE_TEXT); translate_page_item(TARGET_PAGE_COMMON, "enable", "div_ipfilter_enable_name", ITEM_TYPE_TEXT); translate_page_item(TARGET_PAGE_SUB_IPFILTER, "ipfiltermode", "div_ipfilter_mode_name", ITEM_TYPE_TEXT); translate_page_item(TARGET_PAGE_SUB_IPFILTER, "startip", "list_column_startip,div_ipfilter_start_name", ITEM_TYPE_TEXT); translate_page_item(TARGET_PAGE_SUB_IPFILTER, "endip", "list_column_endip,div_ipfilter_end_name", ITEM_TYPE_TEXT); translate_page_item(TARGET_PAGE_SUB_IPFILTER, "alias", "list_column_alias,div_ipfilter_alias_name", ITEM_TYPE_TEXT); translate_page_item(TARGET_PAGE_COMMON, "save", "button_ipfilter_dialog_save", ITEM_TYPE_VALUE); translate_page_item(TARGET_PAGE_COMMON, "cancel", "button_ipfilter_dialog_cancel", ITEM_TYPE_VALUE); translate_page_item(TARGET_PAGE_COMMON, "add", "button_ipfilter_add", ITEM_TYPE_VALUE); translate_page_item(TARGET_PAGE_COMMON, "modify", "button_ipfilter_modify", ITEM_TYPE_VALUE); translate_page_item(TARGET_PAGE_COMMON, "delete", "button_ipfilter_delete", ITEM_TYPE_VALUE); var stryes = translate_page_item(TARGET_PAGE_COMMON, "yes", "", ITEM_TYPE_NONE); var strnot = translate_page_item(TARGET_PAGE_COMMON, "not", "", ITEM_TYPE_NONE); var strallow = translate_page_item(TARGET_PAGE_SUB_IPFILTER, "allows", "", ITEM_TYPE_NONE); var strforbidden = translate_page_item(TARGET_PAGE_SUB_IPFILTER, "forbidden", "", ITEM_TYPE_NONE); var strsubmask = translate_page_item(TARGET_PAGE_SUB_TCPIP, "submask", "div_ipfilter_submask_name", ITEM_TYPE_NONE); $("#div_ipfilter_submask_name").text(strsubmask.replace(':', '')); $("#select_ipfilter_mode option").each(function (i, n) {
        if (i == 0)
            $(n).text(strallow); else if (i == 1)
            $(n).text(strforbidden);
    }); input_edit_restriction("input_ipfilter_alias_text", EDIT_RESTRICTION_XMLSTD, 32);
}
function fun_register_events() { $("#check_enable_ipfilter").click(function () { fun_on_ipfilter_enable(); }); $("#select_ipfilter_mode").change(function () { fun_on_ipfilter_mode(); }); $("#button_ipfilter_add,#button_ipfilter_modify,#button_ipfilter_delete,#button_ipfilter_dialog_save,#button_ipfilter_dialog_cancel").click(function () { var tagid = this.id.toString(); if (tagid == "button_ipfilter_add") { g_show_tips_dialog = true; fun_on_ipfilter_add(); } else if (tagid == "button_ipfilter_modify") { g_show_tips_dialog = true; fun_on_ipfilter_modify(); } else if (tagid == "button_ipfilter_delete") { g_show_tips_dialog = true; fun_on_ipfilter_delete(); } else if (tagid == "button_ipfilter_dialog_save") { g_show_tips_dialog = true; fun_on_dialog_save(); } else if (tagid == "button_ipfilter_dialog_cancel") { fun_on_dialog_cancel(); } }); $("#input_ipfilter_alias_text").on("propertychange input change", function () { var alias = $("#input_ipfilter_alias_text").val(); if (!fun_check_alias(alias)) { $("#input_ipfilter_alias_text").val(alias.substr(0, 10)); } }); }
function fun_initialize_pageui() { ipedit("ipedit_ipfilter_start"); ipedit("ipedit_ipfilter_end"); ipedit("ipedit_ipfilter_submask"); ipedit("ipedit_ipfilter_start").setvalue("0.0.0.0"); ipedit("ipedit_ipfilter_end").setvalue("0.0.0.0"); ipedit("ipedit_ipfilter_submask").setvalue("255.255.255.0"); }
var g_current_ipfilter_item = -1; var g_ipfilter_item_allow_count = 0; var g_ipfilter_item_deny_count = 0; var g_current_addmode = -1; var g_ipfilter_allow_set = []; var g_ipfilter_deny_set = []; function ipfilter_item(alias, start, end, mask) { this.alias = alias; this.start = start; this.end = end; this.mask = mask; return this; }
function fun_get_ipfilter_parameters() {
    sdk_getipcparam("/action/get?subject=ipfilter", function (result) {
        if (result == false)
            return; $xml = $(result); var active = $xml.find("active").text(); var filter = $xml.find("filter").text(); if (active == 0) { $("#check_enable_ipfilter").prop("checked", false); } else { $("#check_enable_ipfilter").prop("checked", true); }
        $("#select_ipfilter_mode").val(filter); if (active == 0) { $("#select_ipfilter_mode").attr("disabled", "disabled"); $("#button_ipfilter_add").attr("disabled", "disabled"); $("#button_ipfilter_modify").attr("disabled", "disabled"); $("#button_ipfilter_delete").attr("disabled", "disabled"); }
        g_ipfilter_item_allow_count = 0; g_ipfilter_item_deny_count = 0; var tempindex = 0; g_ipfilter_allow_set.length = 0; g_ipfilter_deny_set.length = 0; $xml.find("allow").find("iprule").each(function () {
            var alias = $(this).children("name").text(); var start = $(this).children("start").text(); var end = $(this).children("end").text(); var mask = $(this).children("mask").text(); if (alias.length > 0 && start.length > 0 && end.length > 0) { g_ipfilter_allow_set[tempindex] = new ipfilter_item(alias, start, end, mask); g_ipfilter_item_allow_count++; if (g_ipfilter_item_allow_count >= 4 && filter == 0) { $("#button_ipfilter_add").attr("disabled", "disabled"); } }
            tempindex++; if (tempindex == 4) { fun_flush_ipfilter_list(); }
        }); var tempdenyindex = 0; $xml.find("deny").find("iprule").each(function () {
            var alias = $(this).children("name").text(); var start = $(this).children("start").text(); var end = $(this).children("end").text(); var mask = $(this).children("mask").text(); if (alias.length > 0 && start.length > 0 && end.length > 0) { g_ipfilter_deny_set[tempdenyindex] = new ipfilter_item(alias, start, end, mask); g_ipfilter_item_deny_count++; if (g_ipfilter_item_deny_count >= 4 && filter == 1) { $("#button_ipfilter_add").attr("disabled", "disabled"); } }
            tempdenyindex++; if (tempdenyindex == 4) { fun_flush_ipfilter_list(); }
        });
    });
}
function fun_set_ipfilter_parameters() {
    var enabled = $("#check_enable_ipfilter").prop("checked") ? 1 : 0; var mode = $("#select_ipfilter_mode").val(); fun_flush_ipfilter_list(); var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ipfilter ver="2.0">' + '<active>' + enabled + '</active>' + '<filter>' + mode + '</filter>'; if (mode == 0 && g_ipfilter_allow_set.length <= 0) { }
    targetxml += '<allow>'; for (var index = 0; index < g_ipfilter_allow_set.length; index++) { targetxml += '<iprule>' + '<name>' + g_ipfilter_allow_set[index].alias + '</name>' + '<start>' + g_ipfilter_allow_set[index].start + '</start>' + '<end>' + g_ipfilter_allow_set[index].end + '</end>' + '<mask>' + g_ipfilter_allow_set[index].mask + '</mask>' + '</iprule>'; }
    targetxml += '</allow><deny>'; for (var index = 0; index < g_ipfilter_deny_set.length; index++) { targetxml += '<iprule>' + '<name>' + g_ipfilter_deny_set[index].alias + '</name>' + '<start>' + g_ipfilter_deny_set[index].start + '</start>' + '<end>' + g_ipfilter_deny_set[index].end + '</end>' + '<mask>' + g_ipfilter_deny_set[index].mask + '</mask>' + '</iprule>'; }
    targetxml += '</deny>'; targetxml += '</ipfilter></request>'; sdk_setipcparam("/action/set?subject=ipfilter", targetxml, function (result) {
        var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE); var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE); var strsuc, failed; if (g_current_addmode == 0) { strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "addsuc", "", ITEM_TYPE_NONE); failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "addfai", "", ITEM_TYPE_NONE); } else if (g_current_addmode == 1) { strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "modifysuc", "", ITEM_TYPE_NONE); failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "modifyfai", "", ITEM_TYPE_NONE); } else if (g_current_addmode == 2) { strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "deletesuc", "", ITEM_TYPE_NONE); failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "deletefai", "", ITEM_TYPE_NONE); }
        if (result == true) {
            if (g_show_tips_dialog) { parent.fun_show_tips_dialog(strsuc); }
            fun_get_ipfilter_parameters();
        } else if (result == 400) { parent.fun_show_tips_dialog(request, 0); } else if (result == 403) { parent.fun_show_tips_dialog(auth, 0); } else { parent.fun_show_tips_dialog(failed, 0); }
    });
}
function fun_flush_ipfilter_list() {
    var mode = $("#select_ipfilter_mode").val(); var setlength; if (mode == 0) { setlength = g_ipfilter_allow_set.length; } else if (mode == 1) { setlength = g_ipfilter_deny_set.length; }
    $("#table_ipfilter_list").html(""); for (var index = 0; index < setlength; index++) {
        var alias, start, end; if (mode == 0) { alias = g_ipfilter_allow_set[index].alias; start = g_ipfilter_allow_set[index].start; end = g_ipfilter_allow_set[index].end; } else if (mode == 1) { alias = g_ipfilter_deny_set[index].alias; start = g_ipfilter_deny_set[index].start; end = g_ipfilter_deny_set[index].end; }
        var tagchild = '<tr id="table_row_' + index + '" onclick="fun_on_list_item_click(this.id)" style="padding: 0; float: left; height: 26px" class="cls_ipfilter_list_row cls_ipfilter_list_item_size">' + '<th class="cls_ipfilter_list_item" style="float: left">' + start + '</th>' + '<th class="cls_ipfilter_list_item" style="float: left">' + end + '</th>' + '<th class="cls_ipfilter_list_item" style="width: 190px; float: left;">' + alias + '</th></tr>'; $("#table_ipfilter_list").append(tagchild);
    }
}
function fun_on_list_item_click(objid) { $("#" + objid).addClass("cls_ipfilter_list_row_selected"); $("#" + objid).removeClass("cls_ipfilter_list_row"); $("#table_ipfilter_list").children().each(function () { if (this.id.toString() != objid) { $(this).removeClass("cls_ipfilter_list_row_selected"); $(this).addClass("cls_ipfilter_list_row"); } }); var namearr = objid.split('_'); g_current_ipfilter_item = parseInt(namearr[namearr.length - 1]); }
function fun_on_ipfilter_enable() {
    g_show_tips_dialog = false; var strenable = $("#check_enable_ipfilter").prop("checked") ? 1 : 0; var mode = $("#select_ipfilter_mode").val(); var maxitem = 0; if (mode == 0) { maxitem = g_ipfilter_allow_set.length; } else { maxitem = g_ipfilter_deny_set.length; }
    if (strenable == 0) { $("#select_ipfilter_mode").attr("disabled", "disabled"); $("#button_ipfilter_add").attr("disabled", "disabled"); $("#button_ipfilter_modify").attr("disabled", "disabled"); $("#button_ipfilter_delete").attr("disabled", "disabled"); } else {
        $("#select_ipfilter_mode").removeAttr("disabled"); if (maxitem < 4) { $("#button_ipfilter_add").removeAttr("disabled"); }
        $("#button_ipfilter_modify").removeAttr("disabled"); $("#button_ipfilter_delete").removeAttr("disabled");
    }
    fun_set_ipfilter_parameters();
}
function fun_on_ipfilter_mode() {
    g_show_tips_dialog = false; var mode = $("#select_ipfilter_mode").val(); if (mode == 0) { if (g_ipfilter_allow_set.length >= 4) { $("#button_ipfilter_add").attr("disabled", "disabled"); } else { $("#button_ipfilter_add").removeAttr("disabled"); } } else if (mode == 1) { if (g_ipfilter_deny_set.length >= 4) { $("#button_ipfilter_add").attr("disabled", "disabled"); } else { $("#button_ipfilter_add").removeAttr("disabled"); } }
    fun_set_ipfilter_parameters();
}
var g_show_tips_dialog = false; function fun_show_addormodify_dialog(bshow) { if (bshow) { var strtitle = translate_page_item(TARGET_PAGE_SUB_IPFILTER, "ipfiltertitle", "", ITEM_TYPE_NONE); $("#div_add_or_modify_dialog").dialog({ modal: true, title: strtitle, width: 398, height: 242, resizable: false }); } else { $("#div_add_or_modify_dialog").dialog("destroy"); $("#div_add_or_modify_dialog").css("display", "none"); } }
function fun_on_ipfilter_add() { g_current_addmode = 0; $("#input_ipfilter_alias_text").val(""); ipedit("ipedit_ipfilter_start").setvalue("0.0.0.0"); ipedit("ipedit_ipfilter_end").setvalue("0.0.0.0"); ipedit("ipedit_ipfilter_submask").setvalue("255.255.255.0"); fun_show_addormodify_dialog(true); }
function fun_on_ipfilter_modify() {
    g_current_addmode = 1; var mode = $("#select_ipfilter_mode").val(); var start, end, alias, mask; if (g_current_ipfilter_item >= 0 && g_current_ipfilter_item < 4) {
        if (mode == 0) { start = g_ipfilter_allow_set[g_current_ipfilter_item].start; end = g_ipfilter_allow_set[g_current_ipfilter_item].end; alias = g_ipfilter_allow_set[g_current_ipfilter_item].alias; mask = g_ipfilter_allow_set[g_current_ipfilter_item].mask; } else if (mode == 1) { start = g_ipfilter_deny_set[g_current_ipfilter_item].start; end = g_ipfilter_deny_set[g_current_ipfilter_item].end; alias = g_ipfilter_deny_set[g_current_ipfilter_item].alias; mask = g_ipfilter_deny_set[g_current_ipfilter_item].mask; }
        $("#input_ipfilter_alias_text").val(alias); ipedit("ipedit_ipfilter_start").setvalue(start); ipedit("ipedit_ipfilter_end").setvalue(end); ipedit("ipedit_ipfilter_submask").setvalue(mask); fun_show_addormodify_dialog(true);
    }
}
function fun_on_ipfilter_delete() {
    g_current_addmode = 2; var mode = $("#select_ipfilter_mode").val(); if (g_current_ipfilter_item >= 0 && g_current_ipfilter_item < 4 && mode == 0) {
        for (var index = 0; index < g_ipfilter_allow_set.length; index++) {
            if (index == g_current_ipfilter_item) {
                var offsetitems = g_ipfilter_allow_set.length - index - 1; for (var j = 0; j < offsetitems; j++) { g_ipfilter_allow_set[index + j].start = g_ipfilter_allow_set[index + j + 1].start; g_ipfilter_allow_set[index + j].end = g_ipfilter_allow_set[index + j + 1].end; g_ipfilter_allow_set[index + j].alias = g_ipfilter_allow_set[index + j + 1].alias; g_ipfilter_allow_set[index + j].mask = g_ipfilter_allow_set[index + j + 1].mask; }
                g_ipfilter_allow_set[g_ipfilter_allow_set.length - 1] = null; g_ipfilter_allow_set.length = g_ipfilter_allow_set.length - 1; if (mode == 0) { g_ipfilter_item_allow_count--; if (g_ipfilter_item_allow_count < 4) { $("#button_ipfilter_add").removeAttr("disabled"); } }
                break;
            }
        }
        fun_flush_ipfilter_list(); fun_set_ipfilter_parameters();
    }
    if (g_current_ipfilter_item >= 0 && g_current_ipfilter_item < 4 && mode == 1) {
        for (var index = 0; index < g_ipfilter_deny_set.length; index++) {
            if (index == g_current_ipfilter_item) {
                var offsetitems = g_ipfilter_deny_set.length - index - 1; for (var j = 0; j < offsetitems; j++) { g_ipfilter_deny_set[index + j].start = g_ipfilter_deny_set[index + j + 1].start; g_ipfilter_deny_set[index + j].end = g_ipfilter_deny_set[index + j + 1].end; g_ipfilter_deny_set[index + j].alias = g_ipfilter_deny_set[index + j + 1].alias; g_ipfilter_deny_set[index + j].mask = g_ipfilter_deny_set[index + j + 1].mask; }
                g_ipfilter_deny_set[g_ipfilter_deny_set.length - 1] = null; g_ipfilter_deny_set.length = g_ipfilter_deny_set.length - 1; g_ipfilter_item_deny_count--; if (g_ipfilter_item_deny_count < 4) { $("#button_ipfilter_add").removeAttr("disabled"); }
                break;
            }
        }
        fun_flush_ipfilter_list(); fun_set_ipfilter_parameters();
    }
}
function fun_on_dialog_save() {
    var startip = ipedit("ipedit_ipfilter_start").getvalue(); var endip = ipedit("ipedit_ipfilter_end").getvalue(); var mask = ipedit("ipedit_ipfilter_submask").getvalue(); var alias = $("#input_ipfilter_alias_text").val(); var mode = $("#select_ipfilter_mode").val(); var maskwire1 = fun_bitwiseor_ipaddr(mask, startip); var maskwire2 = fun_bitwiseor_ipaddr(mask, endip); var lip1 = fun_ipaddr_ntohl(startip); var lip2 = fun_ipaddr_ntohl(endip); if (alias.length <= 0 || !fun_check_submask(mask) || !fun_check_ipaddr(startip) || !fun_check_ipaddr(endip) || maskwire1.sec1 !== maskwire2.sec1 || maskwire1.sec2 !== maskwire2.sec2 || maskwire1.sec3 !== maskwire2.sec3 || maskwire1.sec4 !== maskwire2.sec4 || !fun_check_alias(alias)) { var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE); parent.fun_show_tips_dialog(strerrinput, 0); return; }
    if (g_current_addmode == 0) {
        if (mode == 0) { g_ipfilter_allow_set[g_ipfilter_allow_set.length] = new ipfilter_item(alias, startip, endip, mask); if (g_ipfilter_allow_set.length >= 4) { $("#button_ipfilter_add").attr("disabled", "disabled"); } } else if (mode == 1) { g_ipfilter_deny_set[g_ipfilter_deny_set.length] = new ipfilter_item(alias, startip, endip, mask); if (g_ipfilter_deny_set.length >= 4) { $("#button_ipfilter_add").attr("disabled", "disabled"); } }
        fun_flush_ipfilter_list();
    } else if (g_current_addmode == 1) {
        if (mode == 0) { g_ipfilter_allow_set[g_current_ipfilter_item].start = startip; g_ipfilter_allow_set[g_current_ipfilter_item].end = endip; g_ipfilter_allow_set[g_current_ipfilter_item].alias = alias; g_ipfilter_allow_set[g_current_ipfilter_item].mask = mask; } else if (mode == 1) { g_ipfilter_deny_set[g_current_ipfilter_item].start = startip; g_ipfilter_deny_set[g_current_ipfilter_item].end = endip; g_ipfilter_deny_set[g_current_ipfilter_item].alias = alias; g_ipfilter_deny_set[g_current_ipfilter_item].mask = mask; }
        fun_flush_ipfilter_list();
    }
    fun_show_addormodify_dialog(false); fun_set_ipfilter_parameters();
}
function fun_check_alias(stralias) {
    var patt = /.*[\u4e00-\u9fa5]+.*$/; var mtret = stralias.match(patt); if (mtret != null) { if (mtret.length > 0 && stralias.length > 10) { return false; } }
    return true;
}
function fun_bitwiseor_ipaddr(ipaddr1, ipaddr2) {
    var listip1 = ipaddr1.split('.'); var listip2 = ipaddr2.split('.'); if (listip1.length != 4 || listip2.length != 4) { return; }
    return { sec1: (parseInt(listip1[0]) & parseInt(listip2[0])), sec2: (parseInt(listip1[1]) & parseInt(listip2[1])), sec3: (parseInt(listip1[2]) & parseInt(listip2[2])), sec4: (parseInt(listip1[3]) & parseInt(listip2[3])) };
}
function fun_ipaddr_ntohl(ipaddr) {
    var listip = ipaddr.split('.'); if (listip.length !== 4) { return 0; }
    var sec1 = parseInt(listip[0]); var sec2 = parseInt(listip[1]); var sec3 = parseInt(listip[2]); var sec4 = parseInt(listip[3]); return (sec1 << 24) + (sec2 << 16) + (sec3 << 8) + sec4;
}
function fun_check_submask(ipmask) {
    var iplist = ipmask.split('.'); if (iplist.length != 4)
        return false; var ip1 = parseInt(iplist[0]); var ip2 = parseInt(iplist[1]); var ip3 = parseInt(iplist[2]); var ip4 = parseInt(iplist[3]); if (ip1 <= 0)
        return false; if (ip2 > 0 && ip1 != 255)
        return false; if (ip3 > 0 && ip2 != 255)
        return false; if (ip4 > 0 && ip3 != 255)
        return false; if (ip1 != 128 && ip1 != 192 && ip1 != 224 && ip1 != 240 && ip1 != 248 && ip1 != 252 && ip1 != 254 && ip1 != 255) { return false; }
    if (ip2 != 128 && ip2 != 192 && ip2 != 224 && ip2 != 240 && ip2 != 248 && ip2 != 252 && ip2 != 254 && ip2 != 255 && ip2 != 0) { return false; }
    if (ip3 != 128 && ip3 != 192 && ip3 != 224 && ip3 != 240 && ip3 != 248 && ip3 != 252 && ip3 != 254 && ip3 != 255 && ip3 != 0) { return false; }
    if (ip4 != 128 && ip4 != 192 && ip4 != 224 && ip4 != 240 && ip4 != 248 && ip4 != 252 && ip4 != 254 && ip4 != 255 && ip4 != 0) { return false; }
    return true;
}
function fun_check_ipaddr(ipaddr) {
    var iplist = ipaddr.split('.'); if (iplist.length != 4)
        return false; var ip1 = parseInt(iplist[0]); var ip2 = parseInt(iplist[1]); var ip3 = parseInt(iplist[2]); var ip4 = parseInt(iplist[3]); if ((ip1 == 0 && ip2 == 0 && ip3 == 0 && ip4 == 0) || (ip1 == 255 && ip2 == 255 && ip3 == 255 && ip4 == 255) || ip4 == 255) { return false; }
    if (!(ip1 <= 255 && ip1 >= 0) || !(ip2 <= 255 && ip2 >= 0) || !(ip3 <= 255 && ip3 >= 0) || !(ip4 <= 255 && ip4 >= 0)) { return false; }
    return true;
}
function fun_on_dialog_cancel() { fun_show_addormodify_dialog(false); }