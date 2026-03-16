$(document).ready(function() {
    fun_multilang_adapter();
    fun_init_painter();
    fun_get_disk_parameters();
    fun_register_events();
});
function fun_register_events() {
    $("#button_disk_refresh,#button_disk_format").click(function() {
        if (this.id.toString() == "button_disk_refresh") {
            fun_get_disk_parameters();
        } else {
            fun_show_warnint_tipsdialog(true);
        }
    });
    $("#button_format_confirm").click(function() {
        fun_show_warnint_tipsdialog(false);
        fun_format_disk();
    });
    $("#button_format_cancel").click(function() {
        fun_show_warnint_tipsdialog(false);
    });
    $(".cls_tablebar_item").click(function() {
        $("#div_table_disk").addClass("cls_tablebar_item_selected");
    });
}
function fun_multilang_adapter() {
	translate_page_item(TARGET_PAGE_COMMON, "save", "button_disk_save", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_DISK, "disktitle", "div_table_disk_text", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "status", "div_disk_status_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_DISK, "formatted", "div_disk_formated_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_DISK, "usage", "div_disk_usage_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_disk_refresh", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_DISK, "format", "button_disk_format", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "confirm", "button_format_confirm", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "cancel", "button_format_cancel", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_DISK, "formatting", "div_wait_value", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_TIPSTEXT, "noterecord", "div_disk_record_note", ITEM_TYPE_TEXT);
}
function fun_get_disk_parameters() {
    sdk_getipcparam("/action/get?subject=diskinfo&id=0",
    function(result) {
        if (result == false) return;
        $xml = $(result);
        var disksta = $xml.find("status").text();
        var total = $xml.find("size").text();
        var usage = $xml.find("free").text();
        var percent, tagusagestring, tagtotalstring;
        var strused = translate_page_item(TARGET_PAGE_SUB_DISK, "usedsize", "", ITEM_TYPE_NONE);
        var strtotal = translate_page_item(TARGET_PAGE_SUB_DISK, "unusedsize", "", ITEM_TYPE_NONE);
        if (total > 0) {
            percent = parseInt(((total - usage) * 100) / total);
            tagusagestring = String(((total - usage) / 1073741824).toFixed(2)) + "GB(" + String(percent) + "%) " + strused;
            tagtotalstring = String((usage / 1073741824).toFixed(2)) + "GB(" + String(100 - percent) + "%) " + strtotal;
        } else {
            percent = 0;
            tagusagestring = "0GB(0%) " + strused;
            tagtotalstring = "0GB(0%) " + strtotal;
        }
        g_usage_percent = percent;
        var stryes = translate_page_item(TARGET_PAGE_COMMON, "yes", "", ITEM_TYPE_NONE);
        var strnot = translate_page_item(TARGET_PAGE_COMMON, "not", "", ITEM_TYPE_NONE);
        var strnormal = translate_page_item(TARGET_PAGE_SUB_DISK, "normal", "", ITEM_TYPE_NONE);
        var strabnormal = translate_page_item(TARGET_PAGE_SUB_DISK, "abnormal", "", ITEM_TYPE_NONE);
        var strfull = translate_page_item(TARGET_PAGE_SUB_DISK, "full", "", ITEM_TYPE_NONE);
        var strmount = translate_page_item(TARGET_PAGE_SUB_DISK, "nodisk", "", ITEM_TYPE_NONE);
        var strinstall = translate_page_item(TARGET_PAGE_SUB_DISK, "installed", "", ITEM_TYPE_NONE);
        $("#div_disk_usage_value").text(tagusagestring);
        $("#div_disk_total_value").text(tagtotalstring);
        if (disksta & 1) {
            if (disksta & 2 && !(disksta & 4) && !(disksta & 8)) {
                $("#div_disk_status_value").text(strnormal);
                $("#div_disk_formated_value").text(stryes);
            } else if (disksta & 2 && !(disksta & 4) && (disksta & 8)) {
                $("#div_disk_status_value").text(strabnormal);
                $("#div_disk_formated_value").text(stryes);
            } else if (disksta & 2 && disksta & 4) {
                $("#div_disk_status_value").text(strfull);
                $("#div_disk_formated_value").text(stryes);
            } else if (! (disksta & 2)) {
                $("#div_disk_status_value").text(strinstall);
                $("#div_disk_formated_value").text(strnot);
            }
        } else {
            $("#div_disk_status_value").text(strmount);
            $("#div_disk_formated_value").text(strnot);
            $("#button_disk_format").attr("disabled", "disabled");
        }
    });
}

 

function fun_format_disk() {
    var tagxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<diskfmt>' + '<disk>0</disk>' + '<fmt>0</fmt>' + '</diskfmt>' + '</request>';
    fun_show_wait_dialog(true);
    sdk_setipcparam("/action/set?subject=diskfmt", tagxml,
    function(result) {
        fun_show_wait_dialog(false);
        var strsuccess = translate_page_item(TARGET_PAGE_TIPSTEXT, "formatsuc", "", ITEM_TYPE_NONE);
        var strfaied = translate_page_item(TARGET_PAGE_TIPSTEXT, "formatfai", "", ITEM_TYPE_NONE);
        if (result) {
            parent.fun_show_tips_dialog(strsuccess);
            fun_get_disk_parameters();
        } else {
            parent.fun_show_tips_dialog(strfaied, 0);
        }
    });
}
function fun_show_wait_dialog(bshow) {
    if (bshow) {
        $("#div_wait_format").dialog({
            dialogClass: 'no-close',
            modal: true,
            title: "",
            width: 306,
            height: 178,
            resizable: false
        });
    } else {
        $("#div_wait_format").dialog("destroy");
        $("#div_wait_format").css("display", "none");
    }
}
function fun_show_warnint_tipsdialog(bshow) {
    if (bshow) {
        var tipstext = translate_page_item(TARGET_PAGE_SUB_DISK, "formatips", "", ITEM_TYPE_NONE);
        var confirm = translate_page_item(TARGET_PAGE_COMMON, "confirm", "", ITEM_TYPE_NONE);
        var cancel = translate_page_item(TARGET_PAGE_COMMON, "cancel", "", ITEM_TYPE_NONE);
        $("#div_format_tips_text").text(tipstext);
        $("#div_format_tips_dialog").dialog({
            modal: true,
            title: "",
            width: 377,
            height: 218,
            resizable: false
        });
    } else {
        $("#div_format_tips_dialog").dialog("close");
    }
}
var g_usage_percent = 10;
var g_painter_context = null;
function fun_init_painter() {
    var canvas_obj = document.getElementById("canvas_disk_usage");
    g_painter_context = canvas_obj.getContext("2d");
    canvas_obj.width = 320;
    canvas_obj.height = 320;
    g_painter_context.lineWidth = 1;
    fun_start_painter();
}
function fun_start_painter() {
    setInterval(fun_draw_disk_usage, 50);
}
function fun_draw_disk_usage() {
    g_painter_context.clearRect(0, 0, 320, 320);
    g_painter_context.beginPath();
    g_painter_context.arc(160, 160, 160, 0, 2 * Math.PI);
    g_painter_context.closePath();
    g_painter_context.fillStyle = "#5089bc";
    g_painter_context.fill();
    g_painter_context.beginPath();
    g_painter_context.moveTo(160, 160);
    g_painter_context.arc(160, 160, 160, Math.PI, ((Math.PI * 2) / 100) * (g_usage_percent + 50));
    g_painter_context.closePath();
    g_painter_context.fillStyle = "#97b9e0";
    g_painter_context.fill();
    g_painter_context.strokeStyle = "black";
    g_painter_context.stroke();
}