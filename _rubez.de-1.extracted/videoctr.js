$(document).ready(function() {
    fun_multilang_adapter();
    fun_get_parameters();
    fun_register_events();
});
function fun_register_events() {
    $("#button_refresh,#button_restore,#button_save").click(function() {
        if (this.id.toString() == "button_refresh") {
            fun_get_parameters();
        } else if (this.id.toString() == "button_save") {
            fun_save_parameters();
        } else {
            $("#select_record_stream_type").val("0");
            $("#select_record_package").val("300");
            $("#select_record_presecond").val("1");
            $("#check_enable_record_overwrite").prop("checked", false);
            $("#select_record_destination_type").val("0");
        }
    });
}
function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_CONFIGURATION, "videoctr", "div_title_videoctr_text", ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "prerecord", "div_pre_record_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "stream", "div_record_stream_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "overwrite", "div_record_overwrite_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "recordpkg", "div_record_package_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "destination", "div_record_destination_name", ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_COMMON, "save", "button_save", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_refresh", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "restore", "button_restore", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_DISK, "disktitle", "div_table_disk_text", ITEM_TYPE_TEXT);
    var strminute = translate_page_item(TARGET_PAGE_COMMON, "minute", "", ITEM_TYPE_NONE);
    var strmain = translate_page_item(TARGET_PAGE_COMMON, "mainstream", "", ITEM_TYPE_NONE);
    var strsub = translate_page_item(TARGET_PAGE_COMMON, "substream", "", ITEM_TYPE_NONE);
    // $("#select_record_presecond option").each(function(i, n) {
    //     if (i == 0) $(n).text("0 " + strsecond);
    //     else if (i == 1) $(n).text("1 " + strsecond);
    //     else if (i == 2) $(n).text("2 " + strsecond);
    //     else if (i == 3) $(n).text("3 " + strsecond);
    // });
    $("#select_record_stream_type option").each(function(i, n) {
        if (i == 0) $(n).text(strmain);
        else if (i == 1) $(n).text(strsub);
    });
    $("#select_record_package option").each(function(i, n) {
        if (i == 0) $(n).text("3 " + strminute);
        else if (i == 1) $(n).text("5 " + strminute);
        else if (i == 2) $(n).text("10 " + strminute);
    });
}

function fun_get_parameters() {
    var strsecond = translate_page_item(TARGET_PAGE_COMMON, "second", "", ITEM_TYPE_NONE);
	sdk_getipcparam("/action/get?subject=record",function(result) {
        if (result == false) return;
        $xml = $(result);
        var stream = $xml.find("stream").text();
        var package = $xml.find("packsec").text();
        var presec = $xml.find("presec").text();
        var recycle = $xml.find("recycle").text();
        var path = $xml.find("path").text();
        $("#select_record_stream_type").val(stream);
        $("#select_record_package").val(package);
        $("#select_record_presecond").val(presec);
        if (recycle == 0) {
            $("#check_enable_record_overwrite").prop("checked", false);
        } else {
            $("#check_enable_record_overwrite").prop("checked", true);
        }
        if (path == 0 || path == 1) {
            $("#select_record_destination_type").val(path);
        }
        var prerec = parseInt(localStorage.getItem("prerec"))
            if(prerec==0){
                $("#div_pre_record").css("display","none");
            }else{
                if(prerec<presec){
                   presec=prerec 
                }
                $("#select_record_presecond").empty();
                for (var j = 1; j <= prerec; j++) {
                    $("#select_record_presecond").append("<option value='" + j + "'>" + String(j) + strsecond + "</option>");
                }
                $("#select_record_presecond option[value='" + presec + "'] ").attr("selected",true);
            }  
    });    
}

function fun_save_parameters() {
	var packsec = $("#select_record_package").val();
    var presec = $("#select_record_presecond").val();
    var stream = $("#select_record_stream_type").val();
    var recycle = $("#check_enable_record_overwrite").prop("checked") ? 1 : 0;
    var path = $("#select_record_destination_type").val();
    var tagxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<record ver="2.0">' + '<packsec>' + packsec + '</packsec>' + '<presec>' + presec + '</presec>' + '<stream>' + stream + '</stream>' + '<recycle>' + recycle + '</recycle>' + '<path>' + path + '</path>' + '</record>' + '</request>';
	sdk_setipcparam("/action/set?subject=record", tagxml,function(result) {
        var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
        var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
        var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
        var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
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
