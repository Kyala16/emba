
$(document).ready(function () {
    fun_multilang_adapter();
    // fun_initialize_pageui();


    fun_register_events();
    fun_show_ocx_plugin();

    fun_get_pluginpath_parameters()
});


function fun_initialize_pageui() {
    $("#button_select_record_path,#button_select_snapshot_path,#radio_local_pictype_bmp,#radio_local_pictype_jpg,#button_local_param_save,#button_local_param_restore").attr("disabled", "disabled");
}

function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_LOCAL, "localtitle", "div_table_local_text", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_TIPSTEXT, "errmastinqt", "pnote_support_inie", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_LOCAL, "liverecord", "div_local_record_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_LOCAL, "livesnapshot", "div_local_snapshot_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_LOCAL, "picturetype", "div_local_pictype_name", ITEM_TYPE_TEXT);

    translate_page_item(TARGET_PAGE_COMMON, "browse", "button_select_record_path", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "browse", "button_select_snapshot_path", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "save", "button_local_param_save", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "restore", "button_local_param_restore", ITEM_TYPE_VALUE);

    if (!CurBrowserIsIE()) {
        translate_page_item(TARGET_PAGE_TIPSTEXT, "supportinqt", "pnote_support_inie", ITEM_TYPE_TEXT);
    }

    if (current_language_number() == 25) {
        $("#div_table_local").css("width", 260);
    }
    if (current_language_number() == 25) {
        $("#div_table_local").css("width", 211);
        $("#div_table_local_text").css("width", 210);
    }
}

function CurBrowserIsIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    return false;
}

function fun_register_events() {
    $("#button_local_param_save").click(function () {
        fun_on_save_parameters();
    });
    $("#button_local_param_restore").click(function () {
        fun_on_restore_parameters();
    });
}
function fun_get_pluginpath_parameters() {
    sdk_getipcparam("/action/get?subject=pluginpath", function (res) {
        if (res == false) return;
        $xml = $(res);
        var records = $xml.find("records").text();
        var snaphost = $xml.find("snaphost").text();
        $('#input_local_snapshot_path_show').val(snaphost);
        $('#input_local_record_path_show').val(records);

    });
}
function fun_on_ipcocx_loaded() {
    var recordpath = preview_player.GetRecordPath();
    var snapshotpath = preview_player.GetSnapshotPath();
    var snapshottype = preview_player.GetSnapshotType();

    $("#button_select_record_path,#button_select_snapshot_path,#radio_local_pictype_bmp,#radio_local_pictype_jpg,#button_local_param_save,#button_local_param_restore").removeAttr("disabled");
    $("#div_local_note").css("display", "none");

    $("#input_local_record_path_show").val(recordpath);
    $("#input_local_snapshot_path_show").val(snapshotpath);
    if (snapshottype == 1) {
        $("#radio_local_pictype_bmp").attr("checked", "checked");
    } else if (snapshottype == 2) {
        $("#radio_local_pictype_jpg").attr("checked", "checked");
    }
}

function CurBrowserIsIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    return false;
}

function fun_show_ocx_plugin() {
    if (CurBrowserIsIE()) {
        $("#div_ipcocx_area").html("<OBJECT id='preview_player' class='cls_plugin_player' width=1 height=1  align='center' classid='clsid:FEB29125-2FEA-403E-985B-8E4930ABBA56'><script event='OnLoad' for='preview_player'>fun_on_ipcocx_loaded();</script></OBJECT>");
    }
}

// function fun_on_select_record_path() {

//    console.log('选择录像保存地址');

//     // var recordpath = preview_player.GetSelectFolder();
//     // if(recordpath.length>0)
//     //     $("#input_local_record_path_show").val(recordpath);
// }

// function fun_on_select_picture_path() {
//     console.log('选择抓拍保存地址');
//     // var picturepath = preview_player.GetSelectFolder();
//     // if(picturepath.length>0)
//     //     $("#input_local_snapshot_path_show").val(picturepath);
// }



function fun_on_restore_parameters() {
    $("#input_local_snapshot_path_show").val("C:/WebPlugin/snapshot/");
    $("#input_local_record_path_show").val("C:/WebPlugin/records/");
}

function fun_on_save_parameters() {

    var snapPath = $("#input_local_snapshot_path_show").val();
    var recordPath = $("#input_local_record_path_show").val();
    var showTips =function(str) {
        $('#save_tips_str').text(str);


        $('#save_tips').show();
        setTimeout(() => {
            $('#save_tips').hide();
        }, 3000);
    }
    var tipstext = function (eleName) {
        return translate_page_item(TARGET_PAGE_TIPSTEXT, eleName, "", ITEM_TYPE_NONE);
    }
    if (snapPath.length>=256) {
        showTips(tipstext('savelengthsnap'));
        return
    }
    if (recordPath.length>=256) {
        showTips(tipstext('savelengthrecord'));
        return
    }
    var targetxml = '<?xml version="1.0" encoding="utf-8"?>' +
        '<request>' +
        '<pluginpath>' +
        '<records>' + recordPath + '</records>' +
        '<snaphost>' + snapPath + '</snaphost>' +
        '</pluginpath>' +
        '</request>';
    sdk_setipcparam("/action/set?subject=pluginpath", targetxml, function (res) {
 
        switch (res) {
            case true:
                parent.fun_show_tips_dialog(tipstext("infosave"));
                break;
            case 400:
                parent.fun_show_tips_dialog(tipstext("errrequest"), 0);
                break;
            case 403:
                parent.fun_show_tips_dialog(tipstext("errauthority"), 0);
                break;
            default:
                parent.fun_show_tips_dialog(tipstext("errset"), 0);
                break;
        }
    })



    console.log('保存地址');
}


