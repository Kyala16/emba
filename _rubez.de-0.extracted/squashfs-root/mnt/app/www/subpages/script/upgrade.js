
$(document).ready(function () {
    fun_multilang_adapter();
    fun_register_all_event();
    fun_get_device_information();
});

var g_upgrade_completed = false;
var g_wait_completed = true;
var g_wait_timeout = 300;
var g_count_down = false;

function fun_register_all_event() {
    $(".cls_subpage_content_button").click(function () {
         if(this.id.toString() == "button_select_file"){
             fun_onselect_upgrade_file();
         }else if(this.id.toString() == "button_start_upgrade"){
             fun_start_upgrade();
         }
    });
    $("#input_file_select").change(function () {
        var file = $("#input_file_select").val();
        $("#text_select_upgrade_file").attr("value",file);
    });
}
function fun_onselect_upgrade_file() {
    $("#input_file_select").click();
}

function fun_get_device_information() {
    sdk_getipcparam("/action/get?subject=devinfo",function (result) {
        if(result == false)
            return;
        var devmode = $(result).find("model").text();
        $("#div_tips_text_two").text(devmode);
    });
}

function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"upgradetitle","div_table_information_text",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"devconfirm1","div_tips_text_one",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"devconfirm2","div_tips_text_three",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"selectfile","div_select_upgrade_file_text",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"upgradenote1","div_information_first",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"upgradenote2","div_information_second",ITEM_TYPE_TEXT);

    translate_page_item(TARGET_PAGE_COMMON,     "browse","button_select_file",ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"startupgrade","button_start_upgrade",ITEM_TYPE_VALUE);

    translate_page_item(TARGET_PAGE_SUB_UPGRADE,"waitupgrade","div_wait_time_tips",ITEM_TYPE_TEXT);
}

function fun_start_upgrade() {
    if($("#input_file_select").val() == ""){
        return;
    }
    g_upgrade_completed = false;
    g_wait_completed = true;
    g_wait_timeout = 300;
    g_count_down   = false;

    fun_show_progress_dialog(true);
    $("#div_progressbar").progressbar("value",0);
    $("#div_progress_text").text("0%");
    var upgradeTimeout = 300000;
    $.ajax({
        url: '/action/upgrade?op=prepare', type: 'POST', async: true,
        success:function(port) {
            var urlstr = "/action/upload?file=firmware";
            if (port != "") {
                urlstr = location.protocol + "//" + location.hostname + ":" + port + "/action/upload?file=firmware";
            }
            $.ajaxFileUpload({
                type: "post",
                url: urlstr,
                fileElementId: 'input_file_select',
                cache: false,
                timeout: upgradeTimeout,
                success: fun_upload_success,
                progress: fun_upload_progress,
                error: fun_upload_error
            });
        },
        error:function () {
            fun_upload_error();
        }
    });
}

function fun_show_progress_dialog(bshow) {
    $("#div_wait_for_gugrade_completed").css("display","none");
    $("#div_upgrade_status").css("display","none");
    var strtitle = translate_page_item(TARGET_PAGE_SUB_UPGRADE,"upgradeprogress","",ITEM_TYPE_NONE);
    if(bshow) {
        $("#div_progress_dialog").dialog({
            dialogClass: 'no-close',
            modal: true,
            title:strtitle,
            width: 520,
            height: 200,
            resizable:false,
            beforeClose:function () {
                if(!g_upgrade_completed)
                {
                    return false;
                }
            }
        });
        var progressbar = $("#div_progressbar"),
            progresstext = $("#div_progress_text");
        progressbar.progressbar({
            value:false,
            height:12,
            value:1,
            change:function () {
                progresstext.text(progressbar.progressbar("value")+"%");
            },
            complete:fun_upload_completed
        });
    }else {
        $("#div_progress_dialog").dialog("destroy");
    }
}
function fun_upload_completed() {
    if(!g_wait_completed){
        return;
    }
    g_count_down = true;
    $("#div_wait_for_gugrade_completed").css("display","block");
    var temptext = g_wait_timeout-- + "s";
    $("#div_wait_time_text").attr("value",temptext);
    if(g_wait_completed){
        g_wait_completed = false;
        g_wait_timeout = 300;
        setTimeout(fun_upgrade_countdown,1000);
    }
}
function fun_upload_error() {
    var strstatu = translate_page_item(TARGET_PAGE_SUB_UPGRADE,"uploaderror","",ITEM_TYPE_NONE);
    $("#div_upgrade_status").css("display","block");
    $("#div_upgrade_status_text").text(strstatu);
    //setTimeout(func_close_dialog,5000);
}
function fun_upload_success(status) {
    var strerrfile  = translate_page_item(TARGET_PAGE_SUB_UPGRADE,"fileerror","",ITEM_TYPE_NONE);
    var strsuccess  = translate_page_item(TARGET_PAGE_SUB_UPGRADE,"upgradesuccess","",ITEM_TYPE_NONE);
    var strhardware = translate_page_item(TARGET_PAGE_SUB_UPGRADE,"hardnotmatch","",ITEM_TYPE_NONE);
    var strfailed   = translate_page_item(TARGET_PAGE_SUB_UPGRADE,"upgradefailed","",ITEM_TYPE_NONE);

    $("#div_upgrade_status").css("display","block");
    if(status == 200){
        $("#div_upgrade_status_text").css("color","#1baafb");
        $("#div_upgrade_status_text").text(strsuccess);
    }else if(status == 415){
        $("#div_upgrade_status_text").text(strerrfile);
    }else if(status == 416){
        $("#div_upgrade_status_text").text(strhardware);
    }else{
        $("#div_upgrade_status_text").text(strfailed);
    }
    g_count_down = false;
    setTimeout(func_close_dialog,5000);
}
function fun_upload_progress(evt) {
    var completeratio = Math.round((evt.loaded/evt.total)*100);
    $("#div_progressbar").progressbar("value",completeratio);
}
function func_close_dialog() {
    g_upgrade_completed = true;
    fun_show_progress_dialog(false);
}
function fun_upgrade_countdown() {
    if(!g_count_down) {
        return;
    }
    var waitstring = String(g_wait_timeout) + "s";
    $("#div_wait_time_text").text(waitstring);
    if(g_wait_timeout > 0){
        g_wait_timeout--;
        setTimeout(fun_upgrade_countdown,1000);
    }
}
