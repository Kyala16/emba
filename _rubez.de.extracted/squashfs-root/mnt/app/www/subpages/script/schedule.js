$(document).ready(function() {
    fun_multilang_adapter();
    fun_initialize_pageui();
    fun_normal_initialize_pageui();
    fun_register_events();
});
function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "record", "div_table_schedule_record_text", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "snapshot", "div_table_schedule_snapshot_text", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "ftpupload", "div_table_schedule_ftp_upload_text", ITEM_TYPE_TEXT);
    
    translate_page_item(TARGET_PAGE_COMMON, "schedule", "div_schedule_record_schedule_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "enable", "div_schedule_record_enable_name,div_schedule_snapshot_enable_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "restore", "button_schedule_restore", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_schedule_refresh", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "save", "button_schedule_save", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "schedule", "button_record_schedule", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "schedule", "button_snapshot_schedule", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "schedule", "div_schedule_snapshot_schedule_name", ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_COMMON, "setup", "button_schedule_sunday_setup,button_normal_schedule_sunday_setup", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "setup", "button_schedule_monday_setup,button_normal_schedule_monday_setup", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "setup", "button_schedule_tuesday_setup,button_normal_schedule_tuesday_setup", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "setup", "button_schedule_wednesday_setup,button_normal_schedule_wednesday_setup", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "setup", "button_schedule_thursday_setup,button_normal_schedule_thursday_setup", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "setup", "button_schedule_friday_setup,button_normal_schedule_friday_setup", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "setup", "button_schedule_saturday_setup,button_normal_schedule_saturday_setup", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "save", "button_schedule_timesection_save,button_normal_schedule_timesection_save", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, "cancel", "button_schedule_timesection_cancel,button_normal_schedule_timesection_cancel", ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_VIDEO, "notequality", "select_snapshot_quality", ITEM_TYPE_TOOLTIP);
    translate_page_item(TARGET_PAGE_SUB_SCHEDULE, "destination", "div_schedule_snapshot_destination_name", ITEM_TYPE_TEXT);
    var strsunday = translate_page_item(TARGET_PAGE_COMMON, "sunday", "", ITEM_TYPE_NONE);
    var strmonday = translate_page_item(TARGET_PAGE_COMMON, "monday", "", ITEM_TYPE_NONE);
    var strtuesday = translate_page_item(TARGET_PAGE_COMMON, "tuesday", "", ITEM_TYPE_NONE);
    var strwednesday = translate_page_item(TARGET_PAGE_COMMON, "wednesday", "", ITEM_TYPE_NONE);
    var strthursday = translate_page_item(TARGET_PAGE_COMMON, "thursday", "", ITEM_TYPE_NONE);
    var strfirday = translate_page_item(TARGET_PAGE_COMMON, "friday", "", ITEM_TYPE_NONE);
    var strsaturday = translate_page_item(TARGET_PAGE_COMMON, "saturday", "", ITEM_TYPE_NONE);
    var strschedule = translate_page_item(TARGET_PAGE_COMMON, "schedule", "", ITEM_TYPE_NONE);
    var strhour = translate_page_item(TARGET_PAGE_COMMON, "hour", "", ITEM_TYPE_NONE);
    var strdisable = translate_page_item(TARGET_PAGE_COMMON, "disable", "", ITEM_TYPE_NONE);
    var strselall = translate_page_item(TARGET_PAGE_COMMON, "selall", "", ITEM_TYPE_NONE);
    var strperiod = translate_page_item(TARGET_PAGE_COMMON, "period", "", ITEM_TYPE_NONE);
    var strenable = translate_page_item(TARGET_PAGE_COMMON, "enable", "", ITEM_TYPE_NONE);
    $("#label_schedule_allday").text("7*24 " + strhour);
    $("#label_schedule_manual").text(strschedule);
    $("#label_normal_all").text(strselall);
    $("#label_normal_sunday").text(strsunday);
    $("#label_normal_monday").text(strmonday);
    $("#label_normal_tuesday").text(strtuesday);
    $("#label_normal_wednesday").text(strwednesday);
    $("#label_normal_thursday").text(strthursday);
    $("#label_normal_friday").text(strfirday);
    $("#label_normal_saturday").text(strsaturday);
    $("#div_normal_sunday").text(strsunday);
    $("#div_normal_monday").text(strmonday);
    $("#div_normal_tuesday").text(strtuesday);
    $("#div_normal_wednesday").text(strwednesday);
    $("#div_normal_thursday").text(strthursday);
    $("#div_normal_friday").text(strfirday);
    $("#div_normal_saturday").text(strsaturday);
    $("#label_normal_section1").text(strperiod + " 1:");
    $("#label_normal_section2").text(strperiod + " 2:");
    $("#label_normal_section3").text(strperiod + " 3:");
    $("#label_normal_section4").text(strperiod + " 4:");
    $("#label_normal_section5").text(strperiod + " 5:");
    $("#label_normal_section6").text(strperiod + " 6:");
    $("#label_ftpupload_allday").text("7*24 " + strhour);
    $("#label_ftpupload_schedule").text(strschedule);
    $("#label_ftpupload_disable").text(strdisable);
    $("#label_all").text(strselall);
    $("#label_sunday").text(strsunday);
    $("#label_monday").text(strmonday);
    $("#label_tuesday").text(strtuesday);
    $("#label_wednesday").text(strwednesday);
    $("#label_thursday").text(strthursday);
    $("#label_friday").text(strfirday);
    $("#label_saturday").text(strsaturday);
    $("#div_sunday").text(strsunday);
    $("#div_monday").text(strmonday);
    $("#div_tuesday").text(strtuesday);
    $("#div_wednesday").text(strwednesday);
    $("#div_thursday").text(strthursday);
    $("#div_friday").text(strfirday);
    $("#div_saturday").text(strsaturday);
    $("#label_section1").text(strperiod + " 1:");
    $("#label_section2").text(strperiod + " 2:");
    $("#label_section3").text(strperiod + " 3:");
    $("#label_section4").text(strperiod + " 4:");
    $("#label_section5").text(strperiod + " 5:");
    $("#label_section6").text(strperiod + " 6:");
    var strminute = translate_page_item(TARGET_PAGE_COMMON, "minute", "", ITEM_TYPE_NONE);
    var strsecond = translate_page_item(TARGET_PAGE_COMMON, "second", "", ITEM_TYPE_NONE);
    var strdisabled = translate_page_item(TARGET_PAGE_COMMON, "disabled", "", ITEM_TYPE_NONE);
    var strenabled = translate_page_item(TARGET_PAGE_COMMON, "enabled", "", ITEM_TYPE_NONE);
    var strmain = translate_page_item(TARGET_PAGE_COMMON, "mainstream", "", ITEM_TYPE_NONE);
    var strsub = translate_page_item(TARGET_PAGE_COMMON, "substream", "", ITEM_TYPE_NONE);
    $("#select_record_presecond option").each(function(i, n) {
        if (i == 0) $(n).text("0 " + strsecond);
        else if (i == 1) $(n).text("1 " + strsecond);
        else if (i == 2) $(n).text("2 " + strsecond);
        else if (i == 3) $(n).text("3 " + strsecond);
    });
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
function fun_register_events() {
    $("#div_table_schedule_record,#div_table_schedule_snapshot,#div_table_schedule_ftp_upload").click(function() {
        var tagid = this.id.toString();
        fun_main_table_switch(tagid);
    });
    $("#button_schedule_sunday_setup,#button_schedule_monday_setup,#button_schedule_tuesday_setup,#button_schedule_wednesday_setup,#button_schedule_thursday_setup,#button_schedule_friday_setup,#button_schedule_saturday_setup").click(function() {
        var tagid = this.id.toString();
        fun_on_ftp_schedule_setup(tagid);
    });
    $("#check_weekday_alldays").click(function() {
        fun_on_weekday_alldays();
    });
    $("#button_schedule_timesection_save,#button_schedule_timesection_cancel").click(function() {
        if (this.id.toString() == "button_schedule_timesection_save") {
            fun_on_ftp_schedule_save();
        } else {
            fun_on_ftp_schedule_cancel();
        }
    });
    $("#button_schedule_refresh,#button_schedule_restore,#button_schedule_save").click(function() {
        var tagid = this.id.toString();
        if (tagid == "button_schedule_refresh") {
            fun_on_normal_refresh();
        } else if (tagid == "button_schedule_restore") {
            fun_on_normal_restore();
        } else if (tagid == "button_schedule_save") {
            fun_on_normal_save();
        }
    });
    $("#button_normal_schedule_timesection_save,#button_normal_schedule_timesection_cancel").click(function() {
        if (this.id.toString() == "button_normal_schedule_timesection_save") {
            fun_on_normal_schedule_save(true);
        } else {
            fun_on_normal_schedule_cancel();
        }
    });
    $("#button_record_schedule,#button_snapshot_schedule").click(function() {
        fun_on_normal_schedule_show(this.id.toString());
    });
    $("#check_normal_schedule_type_alldays,#check_normal_schedule_type_manual").click(function() {
        var tagid = this.id.toString();
        fun_on_normal_schedule_mode_change(tagid);
    });
    $("#radio_ftpupload_alldays,#radio_ftpupload_disable,#radio_ftpupload_enable").click(function() {
        var tagid = this.id.toString();
        fun_on_ftpupload_chedule_mode_change(tagid);
    });
    $("#check_enable_schedule_snapshot,#check_enable_shedule_record").click(function() {
        fun_on_scheudle_enable_change(this.id.toString());
    });
    fun_on_normal_events();
}
function fun_initialize_pageui() {
    for (var index = 0; index < 7; index++) {
        real_schedule_ftpupload_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
        real_schedule_record_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
        real_schedule_snapshot_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
    }
    fun_get_schedule_parameters(7);
    fun_init_schedule_panel_show();
     
    fun_get_snapshot_parameters();
}
function fun_main_table_switch(objid) {
    if (objid == "div_table_schedule_record") {
        $("#div_table_schedule_record").addClass("cls_tablebar_item_selected");
        $("#div_table_schedule_snapshot,#div_table_schedule_ftp_upload").removeClass("cls_tablebar_item_selected");
        $("#div_schedule_record_content").css("display", "block");
        $("#div_schedule_snapshot_content,#div_schedule_ftpupload_content").css("display", "none");
        g_current_table_page = 0;
        g_normal_scheudle_type = 0;
    } else if (objid == "div_table_schedule_snapshot") {
        $("#div_table_schedule_snapshot").addClass("cls_tablebar_item_selected");
        $("#div_table_schedule_record,#div_table_schedule_ftp_upload").removeClass("cls_tablebar_item_selected");
        $("#div_schedule_snapshot_content").css("display", "block");
        $("#div_schedule_record_content,#div_schedule_ftpupload_content").css("display", "none");
        g_current_table_page = 1;
        g_normal_scheudle_type = 1;
    } else if (objid == "div_table_schedule_ftp_upload") {
        $("#div_table_schedule_ftp_upload").addClass("cls_tablebar_item_selected");
        $("#div_table_schedule_snapshot,#div_table_schedule_record").removeClass("cls_tablebar_item_selected");
        $("#div_schedule_ftpupload_content").css("display", "block");
        $("#div_schedule_record_content,#div_schedule_snapshot_content").css("display", "none");
        g_current_table_page = 2;
    }
}
var g_snapshot_quality, g_snapshot_framerate, g_snapshot_interval, g_snapshot_stream;
function fun_get_snapshot_parameters() {
    sdk_getipcparam("/action/get?subject=snap",
    function(result) {
        if (result == false) return;
        $xml = $(result);
        g_snapshot_framerate = $xml.find("framerate").text();
        g_snapshot_quality = $xml.find("quality").text();
        g_snapshot_interval = $xml.find("interval").text();
        g_snapshot_stream = $xml.find("stream").text();
        var path = $xml.find("path").text();
        if (path == 0 || path == 1) {
            $("#select_snapshot_destination_type").val(path);
        }
    });
}
function fun_get_schedule_parameters(flags) {
    if (flags & 1) {
        sdk_getipcparam("/action/get?subject=schetask&type=1",
        function(result) {
            if (result == false) return;
            $xml = $(result);
            var active = $xml.find("active").text();
            if (active == 0) {
                $("#button_record_schedule").attr("disabled", "disabled");
                $("#check_enable_shedule_record").prop("checked", false);
            } else {
                $("#button_record_schedule").removeAttr("disabled");
                $("#check_enable_shedule_record").prop("checked", true);
            }
            g_normal_record_schedule_enable = active;
            var childindex = 0;
            var sectionindex = 1;
            $xml.find("schedule").children().each(function() {
                $(this).find("tsection").each(function() {
                    var temptext = this.innerText;
                    var timearr = temptext.split('-');
                    if (timearr[0] == 0 && timearr[1] == 0) return;
                    var starttime = parseInt(timearr[0]);
                    var endtime = parseInt(timearr[1]);
                    if (sectionindex == 1) {
                        real_schedule_record_timesection[childindex].tsection1.start = starttime;
                        real_schedule_record_timesection[childindex].tsection1.end = endtime;
                    } else if (sectionindex == 2) {
                        real_schedule_record_timesection[childindex].tsection2.start = starttime;
                        real_schedule_record_timesection[childindex].tsection2.end = endtime;
                    } else if (sectionindex == 3) {
                        real_schedule_record_timesection[childindex].tsection3.start = starttime;
                        real_schedule_record_timesection[childindex].tsection3.end = endtime;
                    } else if (sectionindex == 4) {
                        real_schedule_record_timesection[childindex].tsection4.start = starttime;
                        real_schedule_record_timesection[childindex].tsection4.end = endtime;
                    } else if (sectionindex == 5) {
                        real_schedule_record_timesection[childindex].tsection5.start = starttime;
                        real_schedule_record_timesection[childindex].tsection5.end = endtime;
                    } else if (sectionindex == 6) {
                        real_schedule_record_timesection[childindex].tsection6.start = starttime;
                        real_schedule_record_timesection[childindex].tsection6.end = endtime;
                    }
                    if (childindex < 6) {} else {}
                    sectionindex++;
                });
                sectionindex = 1;
                childindex++;
            });
        });
    }
    if (flags & 2) {
        sdk_getipcparam("/action/get?subject=schetask&type=0",
        function(result) {
            if (result == false) return;
            $xml = $(result);
            var active = $xml.find("active").text();
            if (active == 0) {
                $("#button_snapshot_schedule").attr("disabled", "disabled");
                $("#select_snapshot_destination_type").attr("disabled", "disabled");
                $("#check_enable_schedule_snapshot").prop("checked", false);
            } else {
                $("#button_snapshot_schedule").removeAttr("disabled");
                $("#select_snapshot_destination_type").removeAttr("disabled");
                $("#check_enable_schedule_snapshot").prop("checked", true);
            }
            g_normal_snapshot_schedule_enable = active;
            var childindex = 0;
            var sectionindex = 1;
            $xml.find("schedule").children().each(function() {
                $(this).find("tsection").each(function() {
                    var temptext = this.innerText;
                    var timearr = temptext.split('-');
                    if (timearr[0] == 0 && timearr[1] == 0) return;
                    var starttime = parseInt(timearr[0]);
                    var endtime = parseInt(timearr[1]);
                    if (sectionindex == 1) {
                        real_schedule_snapshot_timesection[childindex].tsection1.start = starttime;
                        real_schedule_snapshot_timesection[childindex].tsection1.end = endtime;
                    } else if (sectionindex == 2) {
                        real_schedule_snapshot_timesection[childindex].tsection2.start = starttime;
                        real_schedule_snapshot_timesection[childindex].tsection2.end = endtime;
                    } else if (sectionindex == 3) {
                        real_schedule_snapshot_timesection[childindex].tsection3.start = starttime;
                        real_schedule_snapshot_timesection[childindex].tsection3.end = endtime;
                    } else if (sectionindex == 4) {
                        real_schedule_snapshot_timesection[childindex].tsection4.start = starttime;
                        real_schedule_snapshot_timesection[childindex].tsection4.end = endtime;
                    } else if (sectionindex == 5) {
                        real_schedule_snapshot_timesection[childindex].tsection5.start = starttime;
                        real_schedule_snapshot_timesection[childindex].tsection5.end = endtime;
                    } else if (sectionindex == 6) {
                        real_schedule_snapshot_timesection[childindex].tsection6.start = starttime;
                        real_schedule_snapshot_timesection[childindex].tsection6.end = endtime;
                    }
                    if (childindex < 6) {} else {}
                    sectionindex++;
                });
                sectionindex = 1;
                childindex++;
            });
        });
    }
    if (flags & 4) {
        sdk_getipcparam("/action/get?subject=schetask&type=2",
        function(result) {
            if (result == false) return;
            $xml = $(result);
            var active = $xml.find("active").text();
            if (active == 0) {
                document.getElementById("radio_ftpupload_disable").checked = true;
                $("#div_schedule_manual").css("display", "none");
            } else if (active == 1) {
                document.getElementById("radio_ftpupload_alldays").checked = true;
                $("#div_schedule_manual").css("display", "none");
            } else if (active == 2) {
                document.getElementById("radio_ftpupload_enable").checked = true;
                $("#div_schedule_manual").css("display", "block");
            }
            var childindex = 0;
            var sectionindex = 1;
            $xml.find("schedule").children().each(function() {
                $(this).find("tsection").each(function() {
                    var temptext = this.innerText;
                    var timearr = temptext.split('-');
                    if (timearr[0] == 0 && timearr[1] == 0) return;
                    var starttime = parseInt(timearr[0]);
                    var endtime = parseInt(timearr[1]);
                    if (sectionindex == 1) {
                        real_schedule_ftpupload_timesection[childindex].tsection1.start = starttime;
                        real_schedule_ftpupload_timesection[childindex].tsection1.end = endtime;
                    } else if (sectionindex == 2) {
                        real_schedule_ftpupload_timesection[childindex].tsection2.start = starttime;
                        real_schedule_ftpupload_timesection[childindex].tsection2.end = endtime;
                    } else if (sectionindex == 3) {
                        real_schedule_ftpupload_timesection[childindex].tsection3.start = starttime;
                        real_schedule_ftpupload_timesection[childindex].tsection3.end = endtime;
                    } else if (sectionindex == 4) {
                        real_schedule_ftpupload_timesection[childindex].tsection4.start = starttime;
                        real_schedule_ftpupload_timesection[childindex].tsection4.end = endtime;
                    } else if (sectionindex == 5) {
                        real_schedule_ftpupload_timesection[childindex].tsection5.start = starttime;
                        real_schedule_ftpupload_timesection[childindex].tsection5.end = endtime;
                    } else if (sectionindex == 6) {
                        real_schedule_ftpupload_timesection[childindex].tsection6.start = starttime;
                        real_schedule_ftpupload_timesection[childindex].tsection6.end = endtime;
                    }
                    if (childindex < 6) {
                        g_schedule_painter.setSection(childindex + 1, sectionindex, starttime, endtime);
                    } else {
                        g_schedule_painter.setSection(0, sectionindex, starttime, endtime);
                    }
                    sectionindex++;
                });
                sectionindex = 1;
                childindex++;
            });
        });
    }
}
function fun_on_ftp_schedule_setup(objid) {
    if (objid == "button_schedule_sunday_setup") {
        document.getElementById("check_weekday_sunday").checked = true;
        document.getElementById("check_weekday_monday").checked = false;
        document.getElementById("check_weekday_tuesday").checked = false;
        document.getElementById("check_weekday_wednesday").checked = false;
        document.getElementById("check_weekday_thursday").checked = false;
        document.getElementById("check_weekday_friday").checked = false;
        document.getElementById("check_weekday_saturday").checked = false;
        document.getElementById("check_weekday_alldays").checked = false;
        $("#div_weekday_sunday").addClass("cls_item_name_selected");
        $("#div_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_weekday_saturday").removeClass("cls_item_name_selected");
        g_current_set_day = 7;
        fun_show_schedule_timesection_inedit(g_current_set_day - 1);
    } else if (objid == "button_schedule_monday_setup") {
        document.getElementById("check_weekday_sunday").checked = false;
        document.getElementById("check_weekday_monday").checked = true;
        document.getElementById("check_weekday_tuesday").checked = false;
        document.getElementById("check_weekday_wednesday").checked = false;
        document.getElementById("check_weekday_thursday").checked = false;
        document.getElementById("check_weekday_friday").checked = false;
        document.getElementById("check_weekday_saturday").checked = false;
        document.getElementById("check_weekday_alldays").checked = false;
        $("#div_weekday_monday").addClass("cls_item_name_selected");
        $("#div_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_weekday_saturday").removeClass("cls_item_name_selected");
        g_current_set_day = 1;
        fun_show_schedule_timesection_inedit(g_current_set_day - 1);
    } else if (objid == "button_schedule_tuesday_setup") {
        document.getElementById("check_weekday_sunday").checked = false;
        document.getElementById("check_weekday_monday").checked = false;
        document.getElementById("check_weekday_tuesday").checked = true;
        document.getElementById("check_weekday_wednesday").checked = false;
        document.getElementById("check_weekday_thursday").checked = false;
        document.getElementById("check_weekday_friday").checked = false;
        document.getElementById("check_weekday_saturday").checked = false;
        document.getElementById("check_weekday_alldays").checked = false;
        $("#div_weekday_tuesday").addClass("cls_item_name_selected");
        $("#div_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_weekday_saturday").removeClass("cls_item_name_selected");
        g_current_set_day = 2;
        fun_show_schedule_timesection_inedit(g_current_set_day - 1);
    } else if (objid == "button_schedule_wednesday_setup") {
        document.getElementById("check_weekday_sunday").checked = false;
        document.getElementById("check_weekday_monday").checked = false;
        document.getElementById("check_weekday_tuesday").checked = false;
        document.getElementById("check_weekday_wednesday").checked = true;
        document.getElementById("check_weekday_thursday").checked = false;
        document.getElementById("check_weekday_friday").checked = false;
        document.getElementById("check_weekday_saturday").checked = false;
        document.getElementById("check_weekday_alldays").checked = false;
        $("#div_weekday_wednesday").addClass("cls_item_name_selected");
        $("#div_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_weekday_saturday").removeClass("cls_item_name_selected");
        g_current_set_day = 3;
        fun_show_schedule_timesection_inedit(g_current_set_day - 1);
    } else if (objid == "button_schedule_thursday_setup") {
        document.getElementById("check_weekday_sunday").checked = false;
        document.getElementById("check_weekday_monday").checked = false;
        document.getElementById("check_weekday_tuesday").checked = false;
        document.getElementById("check_weekday_wednesday").checked = false;
        document.getElementById("check_weekday_thursday").checked = true;
        document.getElementById("check_weekday_friday").checked = false;
        document.getElementById("check_weekday_saturday").checked = false;
        document.getElementById("check_weekday_alldays").checked = false;
        $("#div_weekday_thursday").addClass("cls_item_name_selected");
        $("#div_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_weekday_mondayday").removeClass("cls_item_name_selected");
        $("#div_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_weekday_saturday").removeClass("cls_item_name_selected");
        g_current_set_day = 4;
        fun_show_schedule_timesection_inedit(g_current_set_day - 1);
    } else if (objid == "button_schedule_friday_setup") {
        document.getElementById("check_weekday_sunday").checked = false;
        document.getElementById("check_weekday_monday").checked = false;
        document.getElementById("check_weekday_tuesday").checked = false;
        document.getElementById("check_weekday_wednesday").checked = false;
        document.getElementById("check_weekday_thursday").checked = false;
        document.getElementById("check_weekday_friday").checked = true;
        document.getElementById("check_weekday_saturday").checked = false;
        document.getElementById("check_weekday_alldays").checked = false;
        $("#div_weekday_friday").addClass("cls_item_name_selected");
        $("#div_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_weekday_saturday").removeClass("cls_item_name_selected");
        g_current_set_day = 5;
        fun_show_schedule_timesection_inedit(g_current_set_day - 1);
    } else if (objid == "button_schedule_saturday_setup") {
        document.getElementById("check_weekday_sunday").checked = false;
        document.getElementById("check_weekday_monday").checked = false;
        document.getElementById("check_weekday_tuesday").checked = false;
        document.getElementById("check_weekday_wednesday").checked = false;
        document.getElementById("check_weekday_thursday").checked = false;
        document.getElementById("check_weekday_friday").checked = false;
        document.getElementById("check_weekday_saturday").checked = true;
        document.getElementById("check_weekday_alldays").checked = false;
        $("#div_weekday_saturday").addClass("cls_item_name_selected");
        $("#div_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_weekday_sunday").removeClass("cls_item_name_selected");
        g_current_set_day = 6;
        fun_show_schedule_timesection_inedit(g_current_set_day - 1);
    }
    fun_show_setup_dialog(true);
}
function fun_show_schedule_timesection_inedit(index) {
    if (index >= 0 && index < 7) {
        var timesec1start = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection1.start);
        var timesec1end = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection1.end);
        var timesec2start = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection2.start);
        var timesec2end = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection2.end);
        var timesec3start = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection3.start);
        var timesec3end = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection3.end);
        var timesec4start = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection4.start);
        var timesec4end = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection4.end);
        var timesec5start = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection5.start);
        var timesec5end = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection5.end);
        var timesec6start = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection6.start);
        var timesec6end = fun_convert_timestdfmt(real_schedule_ftpupload_timesection[index].tsection6.end);
        timereidt("timeredit_one_start").setvalue(timesec1start);
        timereidt("timeredit_one_end").setvalue(timesec1end);
        timereidt("timeredit_two_start").setvalue(timesec2start);
        timereidt("timeredit_two_end").setvalue(timesec2end);
        timereidt("timeredit_three_start").setvalue(timesec3start);
        timereidt("timeredit_three_end").setvalue(timesec3end);
        timereidt("timeredit_four_start").setvalue(timesec4start);
        timereidt("timeredit_four_end").setvalue(timesec4end);
        timereidt("timeredit_five_start").setvalue(timesec5start);
        timereidt("timeredit_five_end").setvalue(timesec5end);
        timereidt("timeredit_six_start").setvalue(timesec6start);
        timereidt("timeredit_six_end").setvalue(timesec6end);
    }
}
function fun_on_ftpupload_chedule_mode_change(objid) {
    if (objid == "radio_ftpupload_disable") {
        $("#div_schedule_manual").css("display", "none");
    } else if (objid == "radio_ftpupload_enable") {
        $("#div_schedule_manual").css("display", "block");
    } else if (objid == "radio_ftpupload_alldays") {
        $("#div_schedule_manual").css("display", "none");
    }
}
function fun_show_setup_dialog(bshow) {
    if (bshow) {
        var strschedule = translate_page_item(TARGET_PAGE_COMMON, "schedule", "", ITEM_TYPE_NONE);
        $("#div_ftp_schedule_setdialog").dialog({
            modal: true,
            title: strschedule,
            width: 920,
            height: 352,
            resizable: false
        });
    } else {
        $("#div_ftp_schedule_setdialog").dialog("destroy");
        $("#div_ftp_schedule_setdialog").css("display", "none");
    }
}
function fun_on_weekday_alldays() {
    var bchecked = document.getElementById("check_weekday_alldays").checked;
    if (bchecked == true) {
        document.getElementById("check_weekday_monday").checked = true;
        document.getElementById("check_weekday_tuesday").checked = true;
        document.getElementById("check_weekday_wednesday").checked = true;
        document.getElementById("check_weekday_thursday").checked = true;
        document.getElementById("check_weekday_friday").checked = true;
        document.getElementById("check_weekday_saturday").checked = true;
        document.getElementById("check_weekday_sunday").checked = true;
    } else {
        $("#check_weekday_monday,#check_weekday_tuesday,#check_weekday_wednesday,#check_weekday_thursday,#check_weekday_friday,#check_weekday_saturday,#check_weekday_sunday").removeAttr("checked");
        if (g_current_set_day == 1) {
            document.getElementById("check_weekday_monday").checked = true;
        } else if (g_current_set_day == 2) {
            document.getElementById("check_weekday_tuesday").checked = true;
        } else if (g_current_set_day == 3) {
            document.getElementById("check_weekday_wednesday").checked = true;
        } else if (g_current_set_day == 4) {
            document.getElementById("check_weekday_thursday").checked = true;
        } else if (g_current_set_day == 5) {
            document.getElementById("check_weekday_friday").checked = true;
        } else if (g_current_set_day == 6) {
            document.getElementById("check_weekday_saturday").checked = true;
        } else if (g_current_set_day == 7) {
            document.getElementById("check_weekday_sunday").checked = true;
        }
    }
}
function fun_on_normal_schedule_show(objid) {
    if (objid == "button_record_schedule") {
        g_normal_scheudle_type = 0;
        if (g_normal_record_schedule_enable == 0) {
            g_normal_record_schedule_enable = 1;
        }
        if (g_normal_record_schedule_enable == 1) {
            var tempschedulets = real_schedule_record_timesection;
            tempschedulets[0].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[0].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[1].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[1].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[2].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[2].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[3].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[3].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[4].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[4].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[5].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[5].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[6].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[6].tsection1.end = fun_convert_timestring("24:00:00");
        }
        if (g_normal_record_schedule_enable == 0) {
            document.getElementById("check_normal_schedule_type_disable").checked = true;
            $("#check_normal_schedule_type_manual,#check_normal_schedule_type_alldays").removeAttr("checked");
            $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").attr("disabled", "disabled");
        } else if (g_normal_record_schedule_enable == 1) {
            document.getElementById("check_normal_schedule_type_alldays").checked = true;
            $("#check_normal_schedule_type_manual,#check_normal_schedule_type_disable").removeAttr("checked");
            $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").attr("disabled", "disabled");
            $("#check_normal_weekday_alldays,#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").attr("disabled", "disabled");
            $("#div_normal_schedule_timer_sections .ui-timer-widget").each(function() {
                $(this).attr("disabled", "disabled");
            });
        } else if (g_normal_record_schedule_enable == 2) {
            document.getElementById("check_normal_schedule_type_manual").checked = true;
            $("#check_normal_schedule_type_disable,#check_normal_schedule_type_alldays").removeAttr("checked");
            $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").removeAttr("disabled");
            $("#check_normal_weekday_alldays,#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").removeAttr("disabled");
            $("#div_normal_schedule_timer_sections .ui-timer-widget").each(function() {
                $(this).removeAttr("disabled");
            });
        }
        fun_show_normal_setup_dialog(true);
    } else {
        if (g_normal_snapshot_schedule_enable == 0) {
            g_normal_snapshot_schedule_enable = 1;
        }
        if (g_normal_snapshot_schedule_enable == 1) {
            var tempschedulets = real_schedule_snapshot_timesection;
            tempschedulets[0].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[0].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[1].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[1].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[2].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[2].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[3].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[3].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[4].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[4].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[5].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[5].tsection1.end = fun_convert_timestring("24:00:00");
            tempschedulets[6].tsection1.start = fun_convert_timestring("00:00:00");
            tempschedulets[6].tsection1.end = fun_convert_timestring("24:00:00");
        }
        g_normal_scheudle_type = 1;
        if (g_normal_snapshot_schedule_enable == 0) {
            document.getElementById("check_normal_schedule_type_disable").checked = true;
            $("#check_normal_schedule_type_manual,#check_normal_schedule_type_alldays").removeAttr("checked");
            $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").attr("disabled", "disabled");
        } else if (g_normal_snapshot_schedule_enable == 1) {
            document.getElementById("check_normal_schedule_type_alldays").checked = true;
            $("#check_normal_schedule_type_manual,#check_normal_schedule_type_disable").removeAttr("checked");
            $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").attr("disabled", "disabled");
            $("#check_normal_weekday_alldays,#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").attr("disabled", "disabled");
            $("#div_normal_schedule_timer_sections .ui-timer-widget").each(function() {
                $(this).attr("disabled", "disabled");
            });
        } else if (g_normal_snapshot_schedule_enable == 2) {
            document.getElementById("check_normal_schedule_type_manual").checked = true;
            $("#check_normal_schedule_type_disable,#check_normal_schedule_type_alldays").removeAttr("checked");
            $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").removeAttr("disabled");
            $("#check_normal_weekday_alldays,#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").removeAttr("disabled");
            $("#div_normal_schedule_timer_sections .ui-timer-widget").each(function() {
                $(this).removeAttr("disabled");
            });
        }
        fun_show_normal_setup_dialog(true);
    }
    $("#check_normal_weekday_alldays,#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").removeAttr("checked");
    $("#div_normal_weekday_sunday").removeClass("cls_item_name_selected");
    $("#div_normal_weekday_monday").removeClass("cls_item_name_selected");
    $("#div_normal_weekday_tuesday").removeClass("cls_item_name_selected");
    $("#div_normal_weekday_wednesday").removeClass("cls_item_name_selected");
    $("#div_normal_weekday_thursday").removeClass("cls_item_name_selected");
    $("#div_normal_weekday_friday").removeClass("cls_item_name_selected");
    $("#div_normal_weekday_saturday").removeClass("cls_item_name_selected");
    fun_normal_set_schedule_painter_value();
}
function fun_on_normal_restore() {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "resetsuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "resetfai", "", ITEM_TYPE_NONE);
    if (g_current_table_page == 0) {
        $("#check_enable_shedule_record").prop("checked", false);
        $("#button_record_schedule").attr("disabled", "disabled");
    } else if (g_current_table_page == 1) {
        $("#check_enable_schedule_snapshot").prop("checked", false);
        $("#select_snapshot_destination_type").val("0");
        $("#button_snapshot_schedule").attr("disabled", "disabled");
        $("#select_snapshot_destination_type").attr("disabled", "disabled");
    } else if (g_current_table_page == 2) {
        $("#div_schedule_manual").css("display", "none");
        document.getElementById("radio_ftpupload_disable").checked = true;
        document.getElementById("radio_ftpupload_enable").checked = false;
        document.getElementById("radio_ftpupload_alldays").checked = false;
    }
}
function fun_on_normal_refresh() {
    if (g_current_table_page == 0) {
         
        fun_get_schedule_parameters(1);
    } else if (g_current_table_page == 1) {
        fun_get_snapshot_parameters();
        fun_get_schedule_parameters(2);
    } else if (g_current_table_page == 2) {
        fun_get_schedule_parameters(4);
    }
}
function fun_on_normal_save() {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
    if (g_current_table_page == 0) {
        fun_on_normal_schedule_save(true);
    } else if (g_current_table_page == 1) {
        var path = $("#select_snapshot_destination_type").val();
        var tagxml = '<?xml version="1.0" encoding="utf-8"?>' + '<response>' + '<snap ver="2.0">' + '<framerate>' + g_snapshot_framerate + '</framerate>' + '<quality>' + g_snapshot_quality + '</quality>' + '<interval>' + g_snapshot_interval + '</interval>' + '<stream>' + g_snapshot_stream + '</stream>' + '<path>' + path + '</path>' + '</snap>' + '</response>';
        sdk_setipcparam("/action/set?subject=snap", tagxml,
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
        fun_on_normal_schedule_save(false);
    } else if (g_current_table_page == 2) {
        fun_save_ftpupload_schedule();
    }
}
function fun_on_normal_schedule_save(bshowtips) {
    var alldaycheck = $("#check_normal_schedule_type_alldays").prop('checked');
    var manualcheck = $("#check_normal_schedule_type_manual").prop('checked');
    var disablecheck = 0;
    if (g_normal_scheudle_type == 0) {
        disablecheck = $("#check_enable_shedule_record").prop("checked") ? 1 : 0;
        if (alldaycheck && disablecheck === 1) {
            g_normal_record_schedule_enable = 1;
        } else if (manualcheck && disablecheck === 1) {
            g_normal_record_schedule_enable = 2;
        } else if (disablecheck == 1) {
            g_normal_record_schedule_enable = 1;
        } else if (disablecheck == 0) {
            g_normal_record_schedule_enable = 0;
        }
    } else {
        disablecheck = $("#check_enable_schedule_snapshot").prop("checked") ? 1 : 0;
        if (alldaycheck && disablecheck === 1) {
            g_normal_snapshot_schedule_enable = 1;
        } else if (manualcheck && disablecheck === 1) {
            g_normal_snapshot_schedule_enable = 2;
        } else if (disablecheck == 1) {
            g_normal_snapshot_schedule_enable = 1;
        } else if (disablecheck == 0) {
            g_normal_snapshot_schedule_enable = 0;
        }
    }
    var sundayenable = document.getElementById("check_normal_weekday_sunday").checked;
    var mondayenable = document.getElementById("check_normal_weekday_monday").checked;
    var tuesdayenable = document.getElementById("check_normal_weekday_tuesday").checked;
    var wednesdayenable = document.getElementById("check_normal_weekday_wednesday").checked;
    var thursdayenable = document.getElementById("check_normal_weekday_thursday").checked;
    var fridayenable = document.getElementById("check_normal_weekday_friday").checked;
    var saturdayenable = document.getElementById("check_normal_weekday_saturday").checked;
    var enable1 = true;
    var enable2 = true;
    var enable3 = true;
    var enable4 = true;
    var enable5 = true;
    var enable6 = true;
    var sec1start = timereidt("timeredit_normal_one_start").getvalue();
    var sec1end = timereidt("timeredit_normal_one_end").getvalue();
    var sec2start = timereidt("timeredit_normal_two_start").getvalue();
    var sec2end = timereidt("timeredit_normal_two_end").getvalue();
    var sec3start = timereidt("timeredit_normal_three_start").getvalue();
    var sec3end = timereidt("timeredit_normal_three_end").getvalue();
    var sec4start = timereidt("timeredit_normal_four_start").getvalue();
    var sec4end = timereidt("timeredit_normal_four_end").getvalue();
    var sec5start = timereidt("timeredit_normal_five_start").getvalue();
    var sec5end = timereidt("timeredit_normal_five_end").getvalue();
    var sec6start = timereidt("timeredit_normal_six_start").getvalue();
    var sec6end = timereidt("timeredit_normal_six_end").getvalue();
    var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    if (fun_compare_sande(sec1start, sec1end) || fun_compare_sande(sec2start, sec2end) || fun_compare_sande(sec3start, sec3end) || fun_compare_sande(sec4start, sec4end) || fun_compare_sande(sec5start, sec5end) || fun_compare_sande(sec6start, sec6end)) {
        parent.fun_show_tips_dialog(gtips_input, 0);
        return;
    }
    var tempschedulets = null;
    var tempactive = 0;
    var targetserverpath = "";
    if (g_normal_scheudle_type == 0) {
        tempschedulets = real_schedule_record_timesection;
        tempactive = g_normal_record_schedule_enable;
        targetserverpath = "/action/set?subject=schetask&type=1";
    } else {
        tempschedulets = real_schedule_snapshot_timesection;
        tempactive = g_normal_snapshot_schedule_enable;
        targetserverpath = "/action/set?subject=schetask&type=0";
    }
    if (sundayenable) {
        if (enable1) {
            tempschedulets[6].tsection1.start = fun_convert_timestring(sec1start);
            tempschedulets[6].tsection1.end = fun_convert_timestring(sec1end);
        }
        if (enable2) {
            tempschedulets[6].tsection2.start = fun_convert_timestring(sec2start);
            tempschedulets[6].tsection2.end = fun_convert_timestring(sec2end);
        }
        if (enable3) {
            tempschedulets[6].tsection3.start = fun_convert_timestring(sec3start);
            tempschedulets[6].tsection3.end = fun_convert_timestring(sec3end);
        }
        if (enable4) {
            tempschedulets[6].tsection4.start = fun_convert_timestring(sec4start);
            tempschedulets[6].tsection4.end = fun_convert_timestring(sec4end);
        }
        if (enable5) {
            tempschedulets[6].tsection5.start = fun_convert_timestring(sec5start);
            tempschedulets[6].tsection5.end = fun_convert_timestring(sec5end);
        }
        if (enable6) {
            tempschedulets[6].tsection6.start = fun_convert_timestring(sec6start);
            tempschedulets[6].tsection6.end = fun_convert_timestring(sec6end);
        }
    }
    if (mondayenable) {
        if (enable1) {
            tempschedulets[0].tsection1.start = fun_convert_timestring(sec1start);
            tempschedulets[0].tsection1.end = fun_convert_timestring(sec1end);
        }
        if (enable2) {
            tempschedulets[0].tsection2.start = fun_convert_timestring(sec2start);
            tempschedulets[0].tsection2.end = fun_convert_timestring(sec2end);
        }
        if (enable3) {
            tempschedulets[0].tsection3.start = fun_convert_timestring(sec3start);
            tempschedulets[0].tsection3.end = fun_convert_timestring(sec3end);
        }
        if (enable4) {
            tempschedulets[0].tsection4.start = fun_convert_timestring(sec4start);
            tempschedulets[0].tsection4.end = fun_convert_timestring(sec4end);
        }
        if (enable5) {
            tempschedulets[0].tsection5.start = fun_convert_timestring(sec5start);
            tempschedulets[0].tsection5.end = fun_convert_timestring(sec5end);
        }
        if (enable6) {
            tempschedulets[0].tsection6.start = fun_convert_timestring(sec6start);
            tempschedulets[0].tsection6.end = fun_convert_timestring(sec6end);
        }
    }
    if (tuesdayenable) {
        if (enable1) {
            tempschedulets[1].tsection1.start = fun_convert_timestring(sec1start);
            tempschedulets[1].tsection1.end = fun_convert_timestring(sec1end);
        }
        if (enable2) {
            tempschedulets[1].tsection2.start = fun_convert_timestring(sec2start);
            tempschedulets[1].tsection2.end = fun_convert_timestring(sec2end);
        }
        if (enable3) {
            tempschedulets[1].tsection3.start = fun_convert_timestring(sec3start);
            tempschedulets[1].tsection3.end = fun_convert_timestring(sec3end);
        }
        if (enable4) {
            tempschedulets[1].tsection4.start = fun_convert_timestring(sec4start);
            tempschedulets[1].tsection4.end = fun_convert_timestring(sec4end);
        }
        if (enable5) {
            tempschedulets[1].tsection5.start = fun_convert_timestring(sec5start);
            tempschedulets[1].tsection5.end = fun_convert_timestring(sec5end);
        }
        if (enable6) {
            tempschedulets[1].tsection6.start = fun_convert_timestring(sec6start);
            tempschedulets[1].tsection6.end = fun_convert_timestring(sec6end);
        }
    }
    if (wednesdayenable) {
        if (enable1) {
            tempschedulets[2].tsection1.start = fun_convert_timestring(sec1start);
            tempschedulets[2].tsection1.end = fun_convert_timestring(sec1end);
        }
        if (enable2) {
            tempschedulets[2].tsection2.start = fun_convert_timestring(sec2start);
            tempschedulets[2].tsection2.end = fun_convert_timestring(sec2end);
        }
        if (enable3) {
            tempschedulets[2].tsection3.start = fun_convert_timestring(sec3start);
            tempschedulets[2].tsection3.end = fun_convert_timestring(sec3end);
        }
        if (enable4) {
            tempschedulets[2].tsection4.start = fun_convert_timestring(sec4start);
            tempschedulets[2].tsection4.end = fun_convert_timestring(sec4end);
        }
        if (enable5) {
            tempschedulets[2].tsection5.start = fun_convert_timestring(sec5start);
            tempschedulets[2].tsection5.end = fun_convert_timestring(sec5end);
        }
        if (enable6) {
            tempschedulets[2].tsection6.start = fun_convert_timestring(sec6start);
            tempschedulets[2].tsection6.end = fun_convert_timestring(sec6end);
        }
    }
    if (thursdayenable) {
        if (enable1) {
            tempschedulets[3].tsection1.start = fun_convert_timestring(sec1start);
            tempschedulets[3].tsection1.end = fun_convert_timestring(sec1end);
        }
        if (enable2) {
            tempschedulets[3].tsection2.start = fun_convert_timestring(sec2start);
            tempschedulets[3].tsection2.end = fun_convert_timestring(sec2end);
        }
        if (enable3) {
            tempschedulets[3].tsection3.start = fun_convert_timestring(sec3start);
            tempschedulets[3].tsection3.end = fun_convert_timestring(sec3end);
        }
        if (enable4) {
            tempschedulets[3].tsection4.start = fun_convert_timestring(sec4start);
            tempschedulets[3].tsection4.end = fun_convert_timestring(sec4end);
        }
        if (enable5) {
            tempschedulets[3].tsection5.start = fun_convert_timestring(sec5start);
            tempschedulets[3].tsection5.end = fun_convert_timestring(sec5end);
        }
        if (enable6) {
            tempschedulets[3].tsection6.start = fun_convert_timestring(sec6start);
            tempschedulets[3].tsection6.end = fun_convert_timestring(sec6end);
        }
    }
    if (fridayenable) {
        if (enable1) {
            tempschedulets[4].tsection1.start = fun_convert_timestring(sec1start);
            tempschedulets[4].tsection1.end = fun_convert_timestring(sec1end);
        }
        if (enable2) {
            tempschedulets[4].tsection2.start = fun_convert_timestring(sec2start);
            tempschedulets[4].tsection2.end = fun_convert_timestring(sec2end);
        }
        if (enable3) {
            tempschedulets[4].tsection3.start = fun_convert_timestring(sec3start);
            tempschedulets[4].tsection3.end = fun_convert_timestring(sec3end);
        }
        if (enable4) {
            tempschedulets[4].tsection4.start = fun_convert_timestring(sec4start);
            tempschedulets[4].tsection4.end = fun_convert_timestring(sec4end);
        }
        if (enable5) {
            tempschedulets[4].tsection5.start = fun_convert_timestring(sec5start);
            tempschedulets[4].tsection5.end = fun_convert_timestring(sec5end);
        }
        if (enable6) {
            tempschedulets[4].tsection6.start = fun_convert_timestring(sec6start);
            tempschedulets[4].tsection6.end = fun_convert_timestring(sec6end);
        }
    }
    if (saturdayenable) {
        if (enable1) {
            tempschedulets[5].tsection1.start = fun_convert_timestring(sec1start);
            tempschedulets[5].tsection1.end = fun_convert_timestring(sec1end);
        }
        if (enable2) {
            tempschedulets[5].tsection2.start = fun_convert_timestring(sec2start);
            tempschedulets[5].tsection2.end = fun_convert_timestring(sec2end);
        }
        if (enable3) {
            tempschedulets[5].tsection3.start = fun_convert_timestring(sec3start);
            tempschedulets[5].tsection3.end = fun_convert_timestring(sec3end);
        }
        if (enable4) {
            tempschedulets[5].tsection4.start = fun_convert_timestring(sec4start);
            tempschedulets[5].tsection4.end = fun_convert_timestring(sec4end);
        }
        if (enable5) {
            tempschedulets[5].tsection5.start = fun_convert_timestring(sec5start);
            tempschedulets[5].tsection5.end = fun_convert_timestring(sec5end);
        }
        if (enable6) {
            tempschedulets[5].tsection6.start = fun_convert_timestring(sec6start);
            tempschedulets[5].tsection6.end = fun_convert_timestring(sec6end);
        }
    }
    var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<schetask ver="2.0">' + '<active>' + tempactive + '</active>' + '<schedule>' + '<day>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[0].tsection1.start, tempschedulets[0].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[0].tsection2.start, tempschedulets[0].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[0].tsection3.start, tempschedulets[0].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[0].tsection4.start, tempschedulets[0].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[0].tsection5.start, tempschedulets[0].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[0].tsection6.start, tempschedulets[0].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[1].tsection1.start, tempschedulets[1].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[1].tsection2.start, tempschedulets[1].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[1].tsection3.start, tempschedulets[1].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[1].tsection4.start, tempschedulets[1].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[1].tsection5.start, tempschedulets[1].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[1].tsection6.start, tempschedulets[1].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[2].tsection1.start, tempschedulets[2].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[2].tsection2.start, tempschedulets[2].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[2].tsection3.start, tempschedulets[2].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[2].tsection4.start, tempschedulets[2].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[2].tsection5.start, tempschedulets[2].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[2].tsection6.start, tempschedulets[2].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[3].tsection1.start, tempschedulets[3].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[3].tsection2.start, tempschedulets[3].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[3].tsection3.start, tempschedulets[3].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[3].tsection4.start, tempschedulets[3].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[3].tsection5.start, tempschedulets[3].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[3].tsection6.start, tempschedulets[3].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[4].tsection1.start, tempschedulets[4].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[4].tsection2.start, tempschedulets[4].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[4].tsection3.start, tempschedulets[4].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[4].tsection4.start, tempschedulets[4].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[4].tsection5.start, tempschedulets[4].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[4].tsection6.start, tempschedulets[4].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[5].tsection1.start, tempschedulets[5].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[5].tsection2.start, tempschedulets[5].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[5].tsection3.start, tempschedulets[5].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[5].tsection4.start, tempschedulets[5].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[5].tsection5.start, tempschedulets[5].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[5].tsection6.start, tempschedulets[5].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[6].tsection1.start, tempschedulets[6].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[6].tsection2.start, tempschedulets[6].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[6].tsection3.start, tempschedulets[6].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[6].tsection4.start, tempschedulets[6].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[6].tsection5.start, tempschedulets[6].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(tempschedulets[6].tsection6.start, tempschedulets[6].tsection6.end) + '</tsection>' + '</day>' + '</schedule>' + '</schetask>' + '</request>';
    if (alldaycheck) {
        tempschedulets[0].tsection1.start = fun_convert_timestring("00:00:00");
        tempschedulets[0].tsection1.end = fun_convert_timestring("24:00:00");
        tempschedulets[1].tsection1.start = fun_convert_timestring("00:00:00");
        tempschedulets[1].tsection1.end = fun_convert_timestring("24:00:00");
        tempschedulets[2].tsection1.start = fun_convert_timestring("00:00:00");
        tempschedulets[2].tsection1.end = fun_convert_timestring("24:00:00");
        tempschedulets[3].tsection1.start = fun_convert_timestring("00:00:00");
        tempschedulets[3].tsection1.end = fun_convert_timestring("24:00:00");
        tempschedulets[4].tsection1.start = fun_convert_timestring("00:00:00");
        tempschedulets[4].tsection1.end = fun_convert_timestring("24:00:00");
        tempschedulets[5].tsection1.start = fun_convert_timestring("00:00:00");
        tempschedulets[5].tsection1.end = fun_convert_timestring("24:00:00");
        tempschedulets[6].tsection1.start = fun_convert_timestring("00:00:00");
        tempschedulets[6].tsection1.end = fun_convert_timestring("24:00:00");
    }
    sdk_setipcparam(targetserverpath, targetxml,
    function(result) {
        fun_normal_set_schedule_painter_value();
        if (bshowtips) {
            var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
            var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
            var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
            var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
            if (result == true) {
                parent.fun_show_tips_dialog(strsuc);
                fun_show_normal_setup_dialog(false);
            } else if (result == 400) {
                parent.fun_show_tips_dialog(request, 0);
            } else if (result == 403) {
                parent.fun_show_tips_dialog(auth, 0);
            } else {
                parent.fun_show_tips_dialog(failed, 0);
            }
        }
    });
}
function fun_compare_sande(starttime, endtime) {
    var attrstarttime = starttime.split(':');
    var attrendtime = endtime.split(':');
    for (var i = 0; i < 3; i++) {
        if (!attrstarttime[i].match("^[0-9]+$") || !attrendtime[i].match("^[0-9]+$")) {
            return true;
        }
    }
    var start = parseInt(attrstarttime[0]) * 3600 + parseInt(attrstarttime[1]) * 60 + parseInt(attrstarttime[2]);
    var end = parseInt(attrendtime[0]) * 3600 + parseInt(attrendtime[1]) * 60 + parseInt(attrendtime[2]);
    if (start > end) {
        return true;
    }
}
function fun_on_normal_schedule_cancel() {
    fun_show_normal_setup_dialog(false);
}
function fun_init_schedule_panel_show() {
    g_schedule_painter = new normal_schedule("div_schedule_panel", 720, 224);
}
function fun_save_ftpupload_schedule() {
    var schedisable = document.getElementById("radio_ftpupload_disable").checked;
    var scheenable = document.getElementById("radio_ftpupload_enable").checked;
    var scheallday = document.getElementById("radio_ftpupload_alldays").checked;
    var active = "0";
    if (scheenable) {
        active = "2";
    } else if (scheallday) {
        active = "1";
    }
    var targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<schetask ver="2.0">' + '<active>' + active + '</active>' + '<schedule>' + '<day>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[0].tsection1.start, real_schedule_ftpupload_timesection[0].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[0].tsection2.start, real_schedule_ftpupload_timesection[0].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[0].tsection3.start, real_schedule_ftpupload_timesection[0].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[0].tsection4.start, real_schedule_ftpupload_timesection[0].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[0].tsection5.start, real_schedule_ftpupload_timesection[0].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[0].tsection6.start, real_schedule_ftpupload_timesection[0].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[1].tsection1.start, real_schedule_ftpupload_timesection[1].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[1].tsection2.start, real_schedule_ftpupload_timesection[1].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[1].tsection3.start, real_schedule_ftpupload_timesection[1].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[1].tsection4.start, real_schedule_ftpupload_timesection[1].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[1].tsection5.start, real_schedule_ftpupload_timesection[1].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[1].tsection6.start, real_schedule_ftpupload_timesection[1].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[2].tsection1.start, real_schedule_ftpupload_timesection[2].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[2].tsection2.start, real_schedule_ftpupload_timesection[2].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[2].tsection3.start, real_schedule_ftpupload_timesection[2].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[2].tsection4.start, real_schedule_ftpupload_timesection[2].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[2].tsection5.start, real_schedule_ftpupload_timesection[2].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[2].tsection6.start, real_schedule_ftpupload_timesection[2].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[3].tsection1.start, real_schedule_ftpupload_timesection[3].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[3].tsection2.start, real_schedule_ftpupload_timesection[3].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[3].tsection3.start, real_schedule_ftpupload_timesection[3].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[3].tsection4.start, real_schedule_ftpupload_timesection[3].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[3].tsection5.start, real_schedule_ftpupload_timesection[3].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[3].tsection6.start, real_schedule_ftpupload_timesection[3].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[4].tsection1.start, real_schedule_ftpupload_timesection[4].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[4].tsection2.start, real_schedule_ftpupload_timesection[4].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[4].tsection3.start, real_schedule_ftpupload_timesection[4].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[4].tsection4.start, real_schedule_ftpupload_timesection[4].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[4].tsection5.start, real_schedule_ftpupload_timesection[4].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[4].tsection6.start, real_schedule_ftpupload_timesection[4].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[5].tsection1.start, real_schedule_ftpupload_timesection[5].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[5].tsection2.start, real_schedule_ftpupload_timesection[5].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[5].tsection3.start, real_schedule_ftpupload_timesection[5].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[5].tsection4.start, real_schedule_ftpupload_timesection[5].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[5].tsection5.start, real_schedule_ftpupload_timesection[5].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[5].tsection6.start, real_schedule_ftpupload_timesection[5].tsection6.end) + '</tsection>' + '</day>' + '<day>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[6].tsection1.start, real_schedule_ftpupload_timesection[6].tsection1.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[6].tsection2.start, real_schedule_ftpupload_timesection[6].tsection2.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[6].tsection3.start, real_schedule_ftpupload_timesection[6].tsection3.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[6].tsection4.start, real_schedule_ftpupload_timesection[6].tsection4.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[6].tsection5.start, real_schedule_ftpupload_timesection[6].tsection5.end) + '</tsection>' + '<tsection>' + fun_convert_serverfmt(real_schedule_ftpupload_timesection[6].tsection6.start, real_schedule_ftpupload_timesection[6].tsection6.end) + '</tsection>' + '</day>' + '</schedule>' + '</schetask>' + '</request>';
    sdk_setipcparam("/action/set?subject=schetask&type=2", targetxml,
    function(result) {
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
function fun_on_ftp_schedule_save() {
    var sundayenable = document.getElementById("check_weekday_sunday").checked;
    var mondayenable = document.getElementById("check_weekday_monday").checked;
    var tuesdayenable = document.getElementById("check_weekday_tuesday").checked;
    var wednesdayenable = document.getElementById("check_weekday_wednesday").checked;
    var thursdayenable = document.getElementById("check_weekday_thursday").checked;
    var fridayenable = document.getElementById("check_weekday_friday").checked;
    var saturdayenable = document.getElementById("check_weekday_saturday").checked;
    var enable1 = true;
    var enable2 = true;
    var enable3 = true;
    var enable4 = true;
    var enable5 = true;
    var enable6 = true;
    var sec1start = timereidt("timeredit_one_start").getvalue();
    var sec1end = timereidt("timeredit_one_end").getvalue();
    var sec2start = timereidt("timeredit_two_start").getvalue();
    var sec2end = timereidt("timeredit_two_end").getvalue();
    var sec3start = timereidt("timeredit_three_start").getvalue();
    var sec3end = timereidt("timeredit_three_end").getvalue();
    var sec4start = timereidt("timeredit_four_start").getvalue();
    var sec4end = timereidt("timeredit_four_end").getvalue();
    var sec5start = timereidt("timeredit_five_start").getvalue();
    var sec5end = timereidt("timeredit_five_end").getvalue();
    var sec6start = timereidt("timeredit_six_start").getvalue();
    var sec6end = timereidt("timeredit_six_end").getvalue();
    var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
    if (fun_compare_sande(sec1start, sec1end) || fun_compare_sande(sec2start, sec2end) || fun_compare_sande(sec3start, sec3end) || fun_compare_sande(sec4start, sec4end) || fun_compare_sande(sec5start, sec5end) || fun_compare_sande(sec6start, sec6end)) {
        parent.fun_show_tips_dialog(gtips_input, 0);
        return;
    }
    if (sundayenable) {
        if (enable1) {
            real_schedule_ftpupload_timesection[6].tsection1.start = fun_convert_timestring(sec1start);
            real_schedule_ftpupload_timesection[6].tsection1.end = fun_convert_timestring(sec1end);
            g_schedule_painter.setSection(0, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
            real_schedule_ftpupload_timesection[6].tsection2.start = fun_convert_timestring(sec2start);
            real_schedule_ftpupload_timesection[6].tsection2.end = fun_convert_timestring(sec2end);
            g_schedule_painter.setSection(0, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
            real_schedule_ftpupload_timesection[6].tsection3.start = fun_convert_timestring(sec3start);
            real_schedule_ftpupload_timesection[6].tsection3.end = fun_convert_timestring(sec3end);
            g_schedule_painter.setSection(0, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
            real_schedule_ftpupload_timesection[6].tsection4.start = fun_convert_timestring(sec4start);
            real_schedule_ftpupload_timesection[6].tsection4.end = fun_convert_timestring(sec4end);
            g_schedule_painter.setSection(0, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
            real_schedule_ftpupload_timesection[6].tsection5.start = fun_convert_timestring(sec5start);
            real_schedule_ftpupload_timesection[6].tsection5.end = fun_convert_timestring(sec5end);
            g_schedule_painter.setSection(0, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
            real_schedule_ftpupload_timesection[6].tsection6.start = fun_convert_timestring(sec6start);
            real_schedule_ftpupload_timesection[6].tsection6.end = fun_convert_timestring(sec6end);
            g_schedule_painter.setSection(0, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
    }
    if (mondayenable) {
        if (enable1) {
            real_schedule_ftpupload_timesection[0].tsection1.start = fun_convert_timestring(sec1start);
            real_schedule_ftpupload_timesection[0].tsection1.end = fun_convert_timestring(sec1end);
            g_schedule_painter.setSection(1, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
            real_schedule_ftpupload_timesection[0].tsection2.start = fun_convert_timestring(sec2start);
            real_schedule_ftpupload_timesection[0].tsection2.end = fun_convert_timestring(sec2end);
            g_schedule_painter.setSection(1, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
            real_schedule_ftpupload_timesection[0].tsection3.start = fun_convert_timestring(sec3start);
            real_schedule_ftpupload_timesection[0].tsection3.end = fun_convert_timestring(sec3end);
            g_schedule_painter.setSection(1, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
            real_schedule_ftpupload_timesection[0].tsection4.start = fun_convert_timestring(sec4start);
            real_schedule_ftpupload_timesection[0].tsection4.end = fun_convert_timestring(sec4end);
            g_schedule_painter.setSection(1, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
            real_schedule_ftpupload_timesection[0].tsection5.start = fun_convert_timestring(sec5start);
            real_schedule_ftpupload_timesection[0].tsection5.end = fun_convert_timestring(sec5end);
            g_schedule_painter.setSection(1, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
            real_schedule_ftpupload_timesection[0].tsection6.start = fun_convert_timestring(sec6start);
            real_schedule_ftpupload_timesection[0].tsection6.end = fun_convert_timestring(sec6end);
            g_schedule_painter.setSection(1, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
    }
    if (tuesdayenable) {
        if (enable1) {
            real_schedule_ftpupload_timesection[1].tsection1.start = fun_convert_timestring(sec1start);
            real_schedule_ftpupload_timesection[1].tsection1.end = fun_convert_timestring(sec1end);
            g_schedule_painter.setSection(2, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
            real_schedule_ftpupload_timesection[1].tsection2.start = fun_convert_timestring(sec2start);
            real_schedule_ftpupload_timesection[1].tsection2.end = fun_convert_timestring(sec2end);
            g_schedule_painter.setSection(2, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
            real_schedule_ftpupload_timesection[1].tsection3.start = fun_convert_timestring(sec3start);
            real_schedule_ftpupload_timesection[1].tsection3.end = fun_convert_timestring(sec3end);
            g_schedule_painter.setSection(2, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
            real_schedule_ftpupload_timesection[1].tsection4.start = fun_convert_timestring(sec4start);
            real_schedule_ftpupload_timesection[1].tsection4.end = fun_convert_timestring(sec4end);
            g_schedule_painter.setSection(2, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
            real_schedule_ftpupload_timesection[1].tsection5.start = fun_convert_timestring(sec5start);
            real_schedule_ftpupload_timesection[1].tsection5.end = fun_convert_timestring(sec5end);
            g_schedule_painter.setSection(2, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
            real_schedule_ftpupload_timesection[1].tsection6.start = fun_convert_timestring(sec6start);
            real_schedule_ftpupload_timesection[1].tsection6.end = fun_convert_timestring(sec6end);
            g_schedule_painter.setSection(2, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
    }
    if (wednesdayenable) {
        if (enable1) {
            real_schedule_ftpupload_timesection[2].tsection1.start = fun_convert_timestring(sec1start);
            real_schedule_ftpupload_timesection[2].tsection1.end = fun_convert_timestring(sec1end);
            g_schedule_painter.setSection(3, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
            real_schedule_ftpupload_timesection[2].tsection2.start = fun_convert_timestring(sec2start);
            real_schedule_ftpupload_timesection[2].tsection2.end = fun_convert_timestring(sec2end);
            g_schedule_painter.setSection(3, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
            real_schedule_ftpupload_timesection[2].tsection3.start = fun_convert_timestring(sec3start);
            real_schedule_ftpupload_timesection[2].tsection3.end = fun_convert_timestring(sec3end);
            g_schedule_painter.setSection(3, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
            real_schedule_ftpupload_timesection[2].tsection4.start = fun_convert_timestring(sec4start);
            real_schedule_ftpupload_timesection[2].tsection4.end = fun_convert_timestring(sec4end);
            g_schedule_painter.setSection(3, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
            real_schedule_ftpupload_timesection[2].tsection5.start = fun_convert_timestring(sec5start);
            real_schedule_ftpupload_timesection[2].tsection5.end = fun_convert_timestring(sec5end);
            g_schedule_painter.setSection(3, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
            real_schedule_ftpupload_timesection[2].tsection6.start = fun_convert_timestring(sec6start);
            real_schedule_ftpupload_timesection[2].tsection6.end = fun_convert_timestring(sec6end);
            g_schedule_painter.setSection(3, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
    }
    if (thursdayenable) {
        if (enable1) {
            real_schedule_ftpupload_timesection[3].tsection1.start = fun_convert_timestring(sec1start);
            real_schedule_ftpupload_timesection[3].tsection1.end = fun_convert_timestring(sec1end);
            g_schedule_painter.setSection(4, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
            real_schedule_ftpupload_timesection[3].tsection2.start = fun_convert_timestring(sec2start);
            real_schedule_ftpupload_timesection[3].tsection2.end = fun_convert_timestring(sec2end);
            g_schedule_painter.setSection(4, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
            real_schedule_ftpupload_timesection[3].tsection3.start = fun_convert_timestring(sec3start);
            real_schedule_ftpupload_timesection[3].tsection3.end = fun_convert_timestring(sec3end);
            g_schedule_painter.setSection(4, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
            real_schedule_ftpupload_timesection[3].tsection4.start = fun_convert_timestring(sec4start);
            real_schedule_ftpupload_timesection[3].tsection4.end = fun_convert_timestring(sec4end);
            g_schedule_painter.setSection(4, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
            real_schedule_ftpupload_timesection[3].tsection5.start = fun_convert_timestring(sec5start);
            real_schedule_ftpupload_timesection[3].tsection5.end = fun_convert_timestring(sec5end);
            g_schedule_painter.setSection(4, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
            real_schedule_ftpupload_timesection[3].tsection6.start = fun_convert_timestring(sec6start);
            real_schedule_ftpupload_timesection[3].tsection6.end = fun_convert_timestring(sec6end);
            g_schedule_painter.setSection(4, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
    }
    if (fridayenable) {
        if (enable1) {
            real_schedule_ftpupload_timesection[4].tsection1.start = fun_convert_timestring(sec1start);
            real_schedule_ftpupload_timesection[4].tsection1.end = fun_convert_timestring(sec1end);
            g_schedule_painter.setSection(5, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
            real_schedule_ftpupload_timesection[4].tsection2.start = fun_convert_timestring(sec2start);
            real_schedule_ftpupload_timesection[4].tsection2.end = fun_convert_timestring(sec2end);
            g_schedule_painter.setSection(5, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
            real_schedule_ftpupload_timesection[4].tsection3.start = fun_convert_timestring(sec3start);
            real_schedule_ftpupload_timesection[4].tsection3.end = fun_convert_timestring(sec3end);
            g_schedule_painter.setSection(5, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
            real_schedule_ftpupload_timesection[4].tsection4.start = fun_convert_timestring(sec4start);
            real_schedule_ftpupload_timesection[4].tsection4.end = fun_convert_timestring(sec4end);
            g_schedule_painter.setSection(5, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
            real_schedule_ftpupload_timesection[4].tsection5.start = fun_convert_timestring(sec5start);
            real_schedule_ftpupload_timesection[4].tsection5.end = fun_convert_timestring(sec5end);
            g_schedule_painter.setSection(5, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
            real_schedule_ftpupload_timesection[4].tsection6.start = fun_convert_timestring(sec6start);
            real_schedule_ftpupload_timesection[4].tsection6.end = fun_convert_timestring(sec6end);
            g_schedule_painter.setSection(5, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
    }
    if (saturdayenable) {
        if (enable1) {
            real_schedule_ftpupload_timesection[5].tsection1.start = fun_convert_timestring(sec1start);
            real_schedule_ftpupload_timesection[5].tsection1.end = fun_convert_timestring(sec1end);
            g_schedule_painter.setSection(6, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
        }
        if (enable2) {
            real_schedule_ftpupload_timesection[5].tsection2.start = fun_convert_timestring(sec2start);
            real_schedule_ftpupload_timesection[5].tsection2.end = fun_convert_timestring(sec2end);
            g_schedule_painter.setSection(6, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
        }
        if (enable3) {
            real_schedule_ftpupload_timesection[5].tsection3.start = fun_convert_timestring(sec3start);
            real_schedule_ftpupload_timesection[5].tsection3.end = fun_convert_timestring(sec3end);
            g_schedule_painter.setSection(6, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
        }
        if (enable4) {
            real_schedule_ftpupload_timesection[5].tsection4.start = fun_convert_timestring(sec4start);
            real_schedule_ftpupload_timesection[5].tsection4.end = fun_convert_timestring(sec4end);
            g_schedule_painter.setSection(6, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
        }
        if (enable5) {
            real_schedule_ftpupload_timesection[5].tsection5.start = fun_convert_timestring(sec5start);
            real_schedule_ftpupload_timesection[5].tsection5.end = fun_convert_timestring(sec5end);
            g_schedule_painter.setSection(6, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
        }
        if (enable6) {
            real_schedule_ftpupload_timesection[5].tsection6.start = fun_convert_timestring(sec6start);
            real_schedule_ftpupload_timesection[5].tsection6.end = fun_convert_timestring(sec6end);
            g_schedule_painter.setSection(6, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
        }
    }
    fun_save_ftpupload_schedule();
    fun_show_setup_dialog(false);
}
function fun_on_ftp_schedule_cancel() {
    fun_show_setup_dialog(false);
}
var g_normal_scheudle_type = 0;
var g_normal_schedule_dialog_showed = false;
function fun_show_normal_setup_dialog(bshow) {
    if (bshow) {
        var strschedule = translate_page_item(TARGET_PAGE_COMMON, "schedule", "", ITEM_TYPE_NONE);
        $("#div_normal_schedule_dialog").dialog({
            modal: true,
            title: strschedule,
            width: 980,
            height: 680,
            resizable: false
        });
        g_normal_schedule_dialog_showed = true;
    } else if (g_normal_schedule_dialog_showed) {
        $("#div_normal_schedule_dialog").dialog("close");
        $("#div_normal_schedule_dialog").css("display", "none");
        g_normal_schedule_dialog_showed = false;
    }
}
function fun_on_normal_events() {
    $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").click(function() {
        var tagid = this.id.toString();
        fun_on_nomal_schedule_setup(tagid);
    });
    $("#check_normal_weekday_alldays").click(function() {
        var checked = document.getElementById("check_normal_weekday_alldays").checked;
        if (checked) {
            document.getElementById("check_normal_weekday_monday").checked = true;
            document.getElementById("check_normal_weekday_tuesday").checked = true;
            document.getElementById("check_normal_weekday_wednesday").checked = true;
            document.getElementById("check_normal_weekday_thursday").checked = true;
            document.getElementById("check_normal_weekday_friday").checked = true;
            document.getElementById("check_normal_weekday_saturday").checked = true;
            document.getElementById("check_normal_weekday_sunday").checked = true;
        } else {
            $("#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").removeAttr("checked");
            if (g_normal_current_set_day == 1) {
                document.getElementById("check_normal_weekday_monday").checked = true;
            } else if (g_normal_current_set_day == 2) {
                document.getElementById("check_normal_weekday_tuesday").checked = true;;
            } else if (g_normal_current_set_day == 3) {
                document.getElementById("check_normal_weekday_wednesday").checked = true;;
            } else if (g_normal_current_set_day == 4) {
                document.getElementById("check_normal_weekday_thursday").checked = true;;
            } else if (g_normal_current_set_day == 5) {
                document.getElementById("check_normal_weekday_friday").checked = true;;
            } else if (g_normal_current_set_day == 6) {
                document.getElementById("check_normal_weekday_saturday").checked = true;;
            } else if (g_normal_current_set_day == 7) {
                document.getElementById("check_normal_weekday_sunday").checked = true;;
            }
        }
    });
    $(".normal_checkbox_change").click(function() {
        fun_normal_checkbox_change();
    });
    $(".schedule_checkbox_change").click(function() {
        fun_schedule_checkbox_change();
    });
}
function fun_normal_checkbox_change() {
    var checkboxall = $("#div_normal_setup_weekday_select .normal_checkbox_change").length;
    var checked = $("#div_normal_setup_weekday_select .normal_checkbox_change:checked").length;
    if (checked < checkboxall) {
        $("#check_normal_weekday_alldays").prop("checked", false);
    } else {
        $("#check_normal_weekday_alldays").prop("checked", true);
    }
}
function fun_schedule_checkbox_change() {
    var checkboxall = $("#div_setup_weekday_select .schedule_checkbox_change").length;
    var checked = $("#div_setup_weekday_select .schedule_checkbox_change:checked").length;
    if (checked < checkboxall) {
        $("#check_weekday_alldays").prop("checked", false);
    } else {
        $("#check_weekday_alldays").prop("checked", true);
    }
}
function fun_normal_initialize_pageui() {
    funa_show_normal_schedule_timesection_inedit(7);
    g_normal_schedule_painter = new normal_schedule("div_normal_schedule_panel", 720, 224);
}
function fun_normal_set_schedule_painter_value() {
    var starttime = 0,
    endtime = 0;
    g_normal_schedule_painter.clearSection();
    if (g_normal_scheudle_type == 0) {
        for (var i = 0; i < 7; i++) {
            for (var j = 1; j <= 6; j++) {
                if (j == 1) {
                    starttime = real_schedule_record_timesection[i].tsection1.start;
                    endtime = real_schedule_record_timesection[i].tsection1.end;
                } else if (j == 2) {
                    starttime = real_schedule_record_timesection[i].tsection2.start;
                    endtime = real_schedule_record_timesection[i].tsection2.end;
                } else if (j == 3) {
                    starttime = real_schedule_record_timesection[i].tsection3.start;
                    endtime = real_schedule_record_timesection[i].tsection3.end;
                } else if (j == 4) {
                    starttime = real_schedule_record_timesection[i].tsection4.start;
                    endtime = real_schedule_record_timesection[i].tsection4.end;
                } else if (j == 5) {
                    starttime = real_schedule_record_timesection[i].tsection5.start;
                    endtime = real_schedule_record_timesection[i].tsection5.end;
                } else if (j == 6) {
                    starttime = real_schedule_record_timesection[i].tsection6.start;
                    endtime = real_schedule_record_timesection[i].tsection6.end;
                }
                if (i < 6) {
                    g_normal_schedule_painter.setSection(i + 1, j, starttime, endtime);
                } else {
                    g_normal_schedule_painter.setSection(0, j, starttime, endtime);
                }
            }
        }
    } else {
        for (var i = 0; i < 7; i++) {
            for (var j = 1; j <= 6; j++) {
                if (j == 1) {
                    starttime = real_schedule_snapshot_timesection[i].tsection1.start;
                    endtime = real_schedule_snapshot_timesection[i].tsection1.end;
                } else if (j == 2) {
                    starttime = real_schedule_snapshot_timesection[i].tsection2.start;
                    endtime = real_schedule_snapshot_timesection[i].tsection2.end;
                } else if (j == 3) {
                    starttime = real_schedule_snapshot_timesection[i].tsection3.start;
                    endtime = real_schedule_snapshot_timesection[i].tsection3.end;
                } else if (j == 4) {
                    starttime = real_schedule_snapshot_timesection[i].tsection4.start;
                    endtime = real_schedule_snapshot_timesection[i].tsection4.end;
                } else if (j == 5) {
                    starttime = real_schedule_snapshot_timesection[i].tsection5.start;
                    endtime = real_schedule_snapshot_timesection[i].tsection5.end;
                } else if (j == 6) {
                    starttime = real_schedule_snapshot_timesection[i].tsection6.start;
                    endtime = real_schedule_snapshot_timesection[i].tsection6.end;
                }
                if (i < 6) {
                    g_normal_schedule_painter.setSection(i + 1, j, starttime, endtime);
                } else {
                    g_normal_schedule_painter.setSection(0, j, starttime, endtime);
                }
            }
        }
    }
}
function fun_on_nomal_schedule_setup(objid) {
    if (objid == "button_normal_schedule_sunday_setup") {
        document.getElementById("check_normal_weekday_sunday").checked = true;
        document.getElementById("check_normal_weekday_monday").checked = false;
        document.getElementById("check_normal_weekday_tuesday").checked = false;
        document.getElementById("check_normal_weekday_wednesday").checked = false;
        document.getElementById("check_normal_weekday_thursday").checked = false;
        document.getElementById("check_normal_weekday_friday").checked = false;
        document.getElementById("check_normal_weekday_saturday").checked = false;
        document.getElementById("check_normal_weekday_alldays").checked = false;
        $("#div_normal_weekday_sunday").addClass("cls_item_name_selected");
        $("#div_normal_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_saturday").removeClass("cls_item_name_selected");
        g_normal_current_set_day = 7;
        funa_show_normal_schedule_timesection_inedit(g_normal_current_set_day - 1);
    } else if (objid == "button_normal_schedule_monday_setup") {
        document.getElementById("check_normal_weekday_sunday").checked = false;
        document.getElementById("check_normal_weekday_monday").checked = true;
        document.getElementById("check_normal_weekday_tuesday").checked = false;
        document.getElementById("check_normal_weekday_wednesday").checked = false;
        document.getElementById("check_normal_weekday_thursday").checked = false;
        document.getElementById("check_normal_weekday_friday").checked = false;
        document.getElementById("check_normal_weekday_saturday").checked = false;
        document.getElementById("check_normal_weekday_alldays").checked = false;
        $("#div_normal_weekday_monday").addClass("cls_item_name_selected");
        $("#div_normal_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_saturday").removeClass("cls_item_name_selected");
        g_normal_current_set_day = 1;
        funa_show_normal_schedule_timesection_inedit(g_normal_current_set_day - 1);
    } else if (objid == "button_normal_schedule_tuesday_setup") {
        document.getElementById("check_normal_weekday_sunday").checked = false;
        document.getElementById("check_normal_weekday_monday").checked = false;
        document.getElementById("check_normal_weekday_tuesday").checked = true;
        document.getElementById("check_normal_weekday_wednesday").checked = false;
        document.getElementById("check_normal_weekday_thursday").checked = false;
        document.getElementById("check_normal_weekday_friday").checked = false;
        document.getElementById("check_normal_weekday_saturday").checked = false;
        document.getElementById("check_normal_weekday_alldays").checked = false;
        $("#div_normal_weekday_tuesday").addClass("cls_item_name_selected");
        $("#div_normal_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_saturday").removeClass("cls_item_name_selected");
        g_normal_current_set_day = 2;
        funa_show_normal_schedule_timesection_inedit(g_normal_current_set_day - 1);
    } else if (objid == "button_normal_schedule_wednesday_setup") {
        document.getElementById("check_normal_weekday_sunday").checked = false;
        document.getElementById("check_normal_weekday_monday").checked = false;
        document.getElementById("check_normal_weekday_tuesday").checked = false;
        document.getElementById("check_normal_weekday_wednesday").checked = true;
        document.getElementById("check_normal_weekday_thursday").checked = false;
        document.getElementById("check_normal_weekday_friday").checked = false;
        document.getElementById("check_normal_weekday_saturday").checked = false;
        document.getElementById("check_normal_weekday_alldays").checked = false;
        $("#div_normal_weekday_wednesday").addClass("cls_item_name_selected");
        $("#div_normal_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_saturday").removeClass("cls_item_name_selected");
        g_normal_current_set_day = 3;
        funa_show_normal_schedule_timesection_inedit(g_normal_current_set_day - 1);
    } else if (objid == "button_normal_schedule_thursday_setup") {
        document.getElementById("check_normal_weekday_sunday").checked = false;
        document.getElementById("check_normal_weekday_monday").checked = false;
        document.getElementById("check_normal_weekday_tuesday").checked = false;
        document.getElementById("check_normal_weekday_wednesday").checked = false;
        document.getElementById("check_normal_weekday_thursday").checked = true;
        document.getElementById("check_normal_weekday_friday").checked = false;
        document.getElementById("check_normal_weekday_saturday").checked = false;
        document.getElementById("check_normal_weekday_alldays").checked = false;
        $("#div_normal_weekday_thursday").addClass("cls_item_name_selected");
        $("#div_normal_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_mondayday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_saturday").removeClass("cls_item_name_selected");
        g_normal_current_set_day = 4;
        funa_show_normal_schedule_timesection_inedit(g_normal_current_set_day - 1);
    } else if (objid == "button_normal_schedule_friday_setup") {
        document.getElementById("check_normal_weekday_sunday").checked = false;
        document.getElementById("check_normal_weekday_monday").checked = false;
        document.getElementById("check_normal_weekday_tuesday").checked = false;
        document.getElementById("check_normal_weekday_wednesday").checked = false;
        document.getElementById("check_normal_weekday_thursday").checked = false;
        document.getElementById("check_normal_weekday_friday").checked = true;
        document.getElementById("check_normal_weekday_saturday").checked = false;
        document.getElementById("check_normal_weekday_alldays").checked = false;
        $("#div_normal_weekday_friday").addClass("cls_item_name_selected");
        $("#div_normal_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_sunday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_saturday").removeClass("cls_item_name_selected");
        g_normal_current_set_day = 5;
        funa_show_normal_schedule_timesection_inedit(g_normal_current_set_day - 1);
    } else if (objid == "button_normal_schedule_saturday_setup") {
        document.getElementById("check_normal_weekday_sunday").checked = false;
        document.getElementById("check_normal_weekday_monday").checked = false;
        document.getElementById("check_normal_weekday_tuesday").checked = false;
        document.getElementById("check_normal_weekday_wednesday").checked = false;
        document.getElementById("check_normal_weekday_thursday").checked = false;
        document.getElementById("check_normal_weekday_friday").checked = false;
        document.getElementById("check_normal_weekday_saturday").checked = true;
        document.getElementById("check_normal_weekday_alldays").checked = false;
        $("#div_normal_weekday_saturday").addClass("cls_item_name_selected");
        $("#div_normal_weekday_monday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_tuesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_wednesday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_thursday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_friday").removeClass("cls_item_name_selected");
        $("#div_normal_weekday_sunday").removeClass("cls_item_name_selected");
        g_normal_current_set_day = 6;
        funa_show_normal_schedule_timesection_inedit(g_normal_current_set_day - 1);
    }
}
function funa_show_normal_schedule_timesection_inedit(index) {
    if (index >= 0 && index < 7) {
        var timesec1start, timesec1end, timesec2start, timesec2end, timesec3start, timesec3end, timesec4start, timesec4end, timesec5start, timesec5end, timesec6start, timesec6end;
        if (g_normal_scheudle_type == 0) {
            timesec1start = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection1.start);
            timesec1end = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection1.end);
            timesec2start = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection2.start);
            timesec2end = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection2.end);
            timesec3start = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection3.start);
            timesec3end = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection3.end);
            timesec4start = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection4.start);
            timesec4end = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection4.end);
            timesec5start = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection5.start);
            timesec5end = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection5.end);
            timesec6start = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection6.start);
            timesec6end = fun_convert_timestdfmt(real_schedule_record_timesection[index].tsection6.end);
        } else {
            timesec1start = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection1.start);
            timesec1end = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection1.end);
            timesec2start = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection2.start);
            timesec2end = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection2.end);
            timesec3start = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection3.start);
            timesec3end = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection3.end);
            timesec4start = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection4.start);
            timesec4end = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection4.end);
            timesec5start = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection5.start);
            timesec5end = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection5.end);
            timesec6start = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection6.start);
            timesec6end = fun_convert_timestdfmt(real_schedule_snapshot_timesection[index].tsection6.end);
        }
        timereidt("timeredit_normal_one_start").setvalue(timesec1start);
        timereidt("timeredit_normal_one_end").setvalue(timesec1end);
        timereidt("timeredit_normal_two_start").setvalue(timesec2start);
        timereidt("timeredit_normal_two_end").setvalue(timesec2end);
        timereidt("timeredit_normal_three_start").setvalue(timesec3start);
        timereidt("timeredit_normal_three_end").setvalue(timesec3end);
        timereidt("timeredit_normal_four_start").setvalue(timesec4start);
        timereidt("timeredit_normal_four_end").setvalue(timesec4end);
        timereidt("timeredit_normal_five_start").setvalue(timesec5start);
        timereidt("timeredit_normal_five_end").setvalue(timesec5end);
        timereidt("timeredit_normal_six_start").setvalue(timesec6start);
        timereidt("timeredit_normal_six_end").setvalue(timesec6end);
    } else {
        timereidt("timeredit_normal_one_start").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_one_end").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_two_start").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_two_end").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_three_start").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_three_end").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_four_start").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_four_end").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_five_start").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_five_end").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_six_start").setvalue(fun_convert_timestdfmt(0));
        timereidt("timeredit_normal_six_end").setvalue(fun_convert_timestdfmt(0));
    }
}
function fun_on_normal_schedule_mode_change(objid) {
    if (objid == "check_normal_schedule_type_alldays") {
        $("#check_normal_schedule_type_manual,#check_normal_schedule_type_disable").removeAttr("checked");
        $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").attr("disabled", "disabled");
        $("#check_normal_weekday_alldays,#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").attr("disabled", "disabled");
        $("#div_normal_schedule_timer_sections .ui-timer-widget").each(function() {
            $(this).attr("disabled", "disabled");
        });
    } else if (objid == "check_normal_schedule_type_manual") {
        $("#check_normal_schedule_type_alldays,#check_normal_schedule_type_disable").removeAttr("checked");
        $("#button_normal_schedule_sunday_setup,#button_normal_schedule_monday_setup,#button_normal_schedule_tuesday_setup,#button_normal_schedule_wednesday_setup,#button_normal_schedule_thursday_setup,#button_normal_schedule_friday_setup,#button_normal_schedule_saturday_setup").removeAttr("disabled");
        $("#check_normal_weekday_alldays,#check_normal_weekday_sunday,#check_normal_weekday_monday,#check_normal_weekday_tuesday,#check_normal_weekday_wednesday,#check_normal_weekday_thursday,#check_normal_weekday_friday,#check_normal_weekday_saturday").removeAttr("disabled");
        $("#div_normal_schedule_timer_sections .ui-timer-widget").each(function() {
            $(this).removeAttr("disabled");
        });
    }
}
function fun_on_scheudle_enable_change(objid) {
    if (objid == "check_enable_schedule_snapshot") {
        var tempval = $("#check_enable_schedule_snapshot").prop("checked") ? 1 : 0;
        if (tempval == 0) {
            $("#button_snapshot_schedule").attr("disabled", "disabled");
            $("#select_snapshot_destination_type").attr("disabled", "disabled");
            g_normal_snapshot_schedule_enable = 0;
        } else {
            $("#button_snapshot_schedule").removeAttr("disabled");
            $("#select_snapshot_destination_type").removeAttr("disabled");
            g_normal_snapshot_schedule_enable = 1;
        }
        g_normal_scheudle_type = 1;
    } else {
        var tempval = $("#check_enable_shedule_record").prop("checked") ? 1 : 0;
        if (tempval == 0) {
            $("#button_record_schedule").attr("disabled", "disabled");
            g_normal_record_schedule_enable = 0;
        } else {
            $("#button_record_schedule").removeAttr("disabled");
            g_normal_record_schedule_enable = 1;
        }
        g_normal_scheudle_type = 0;
    }
}
var g_current_set_day = 0;
var real_schedule_record_timesection = [];
var real_schedule_snapshot_timesection = [];
var real_schedule_ftpupload_timesection = [];
var g_normal_record_schedule_enable = 0;
var g_normal_snapshot_schedule_enable = 0;
var g_normal_current_set_day = 0;
var g_normal_schedule_painter = null;
var g_current_table_page = 0;
function real_time_section(start, end) {
    this.start = start;
    this.end = end;
    return this;
}
function real_weekday_timesection(sec1, sec2, sec3, sec4, sec5, sec6) {
    this.tsection1 = sec1;
    this.tsection2 = sec2;
    this.tsection3 = sec3;
    this.tsection4 = sec4;
    this.tsection5 = sec5;
    this.tsection6 = sec6;
    return this;
}
function fun_convert_timestring(strtime) {
    var timearr = strtime.split(':');
    return parseInt(timearr[0]) * 3600 + parseInt(timearr[1]) * 60 + parseInt(timearr[2]);
}
function fun_convert_timestdfmt(ntime) {
    var hour = parseInt(ntime / 3600);
    var minute = parseInt((ntime % 3600) / 60);
    var second = parseInt(ntime % 60);
    var strhour, strminute, strsecond;
    if (hour > 9) {
        strhour = String(hour);
    } else {
        strhour = "0" + String(hour);
    }
    if (minute > 9) {
        strminute = String(minute);
    } else {
        strminute = "0" + String(minute);
    }
    if (second > 9) {
        strsecond = String(second);
    } else {
        strsecond = "0" + String(second);
    }
    return strhour + ":" + strminute + ":" + strsecond;
}
function fun_convert_serverfmt(start, end) {
    return String(start) + "-" + String(end);
}