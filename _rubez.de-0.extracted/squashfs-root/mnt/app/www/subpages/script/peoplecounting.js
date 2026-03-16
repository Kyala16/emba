$(document).ready(function () {
  if (current_language_number() == 25) {
    $('#div_table_peoplecount_region').css('width', 190);
  }
  fun_init_uicomponents();
  fun_register_all_events();
  fun_multilang_adapter();
  draws();
});
var g_algorithm_type = 2;
function fun_init_uicomponents() {
  for (i = 1; i <= 24; i++) {
    $('.xaxis').append('<span>' + i + '</span>');
  }

  g_algorithm_type = 7;
  $('#div_peoplecount_scene').css('display', 'none');
  $('#div_peoplecount_showid').css('display', 'block');
  $('#button_region_fullscreen').css('display', 'none');

  $('#input_quotareport_start_date').datepicker({ changeMonth: true, changeYear: true });
  if (current_language_number() === 25) {
    $('#input_quotareport_start_date').datepicker('option', $.datepicker.regional['ru']);
  } else if (current_language_number() === 17) {
    $('#input_quotareport_start_date').datepicker('option', $.datepicker.regional['ja']);
  } else if (current_language_number() === 7) {
    $('#input_quotareport_start_date').datepicker('option', $.datepicker.regional['de']);
  } else if (current_language_number() === 4 || current_language_number() === 0x7c04) {
    $('#input_quotareport_start_date').datepicker('option', $.datepicker.regional['zh']);
  } else {
    $('#input_quotareport_start_date').datepicker('option', $.datepicker.regional['']);
  }
  $('#input_quotareport_start_date').datepicker('option', { showAnim: 'blind', dateFormat: 'yy-mm-dd' });

  $('#input_quotareport_end_date').datepicker({ changeMonth: true, changeYear: true });
  if (current_language_number() === 25) {
    $('#input_quotareport_end_date').datepicker('option', $.datepicker.regional['ru']);
  } else if (current_language_number() === 17) {
    $('#input_quotareport_end_date').datepicker('option', $.datepicker.regional['ja']);
  } else if (current_language_number() === 7) {
    $('#input_quotareport_end_date').datepicker('option', $.datepicker.regional['de']);
  } else if (current_language_number() === 4 || current_language_number() === 0x7c04) {
    $('#input_quotareport_end_date').datepicker('option', $.datepicker.regional['zh']);
  } else {
    $('#input_quotareport_end_date').datepicker('option', $.datepicker.regional['']);
  }
  $('#input_quotareport_end_date').datepicker('option', { showAnim: 'blind', dateFormat: 'yy-mm-dd' });

  sdk_getipcparam('/action/get?subject=devability', function (res) {
    if (res != false) {
      $xml = $(res);
      var peoplecnt_line = $xml.find('peoplecnt_line').text();
      // console.log(peoplecnt_line);
      $('#select_peoplecount_mode').prop('disabled',peoplecnt_line=='0');
      $("#select_peoplecount_mode").find("option[value='2']").remove()
    }
  });
  
  fun_init_draw_panel();
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'basesetting', 'div_table_peoplecount_region_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'allrect', 'button_region_fullscreen', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'confidenceval', 'div_peoplecount_confidence_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'showid', 'label_peoplecount_showid_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'targetmask', 'label_peoplecount_tagmask_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'scenemode', 'div_peoplecount_scene_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'linedirection', 'div_peoplecount_derection_name', ITEM_TYPE_TEXT);
  fase_detect_note = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'facenote', '', ITEM_TYPE_NONE);
  translate_page_item(TARGET_PAGE_COMMON, 'clear', 'button_region_clear', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_region_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'enable', 'label_peoplecnt_enable', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'reporttoftp', 'label_peoplecnt_ftp_upload', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'sendtime', 'div_peoplecnt_ftptime_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'attemptstimes', 'div_peoplecnt_repeat_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'onceaday', 'label_schedule_once', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'schedule', 'label_schedule_time', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'selall', 'button_canvas_selectall', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'clear', 'button_canvas_selectclear', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_region_restore,button_reportftp_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_region_refresh,button_reportftp_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_reportftp_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'startsearch', 'button_quotareport_search', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'reporttoftp', 'div_table_peoplecount_ftpcfg_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'quotaforftp', 'div_table_peoplecount_reportcfg_text,div_page_quotareport_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'reportsend', 'div_page_reportftp_enable_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'sendtime', 'div_page_reportftp_timing_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'attemptstimes', 'div_page_reportftp_times_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'todate', 'div_page_quotareport_to_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'reportsendtime', 'list_column_report_sendingtime', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'uploadsta', 'list_column_upload_status', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'exporttopc', 'list_column_manual_export', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'reportfile', 'list_column_target_file', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'send', 'list_column_manual_send', ITEM_TYPE_TEXT);
  /**********************/
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'resetcounters', 'div_reset_coun_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'autoreset', 'label_autoreset_set', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'manualreset', 'button_manual_reset', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'resettip', 'reset_infotip', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, "linenum", "div_page_peoplecount_mode_text", ITEM_TYPE_TEXT);
  /************************/
  var strmonday = translate_page_item(TARGET_PAGE_COMMON, "monday", "", ITEM_TYPE_NONE);
  var strtuesday = translate_page_item(TARGET_PAGE_COMMON, "tuesday", "", ITEM_TYPE_NONE);
  var strwednesday = translate_page_item(TARGET_PAGE_COMMON, "wednesday", "", ITEM_TYPE_NONE);
  var strthursday = translate_page_item(TARGET_PAGE_COMMON, "thursday", "", ITEM_TYPE_NONE);
  var strfriday = translate_page_item(TARGET_PAGE_COMMON, "friday", "", ITEM_TYPE_NONE);
  var strsaturday = translate_page_item(TARGET_PAGE_COMMON, "saturday", "", ITEM_TYPE_NONE);
  var strsunday = translate_page_item(TARGET_PAGE_COMMON, "sunday", "", ITEM_TYPE_NONE);
  var streveryday = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, "everyday", "", ITEM_TYPE_NONE);
  $("#sel_reset_time_weekday option").each(function (i, n) {
    if (i == 0) {
      $(n).text(streveryday);
    } else if (i == 1) {
      $(n).text(strmonday);
    } else if (i == 2) {
      $(n).text(strtuesday);
    } else if (i == 3) {
      $(n).text(strwednesday);
    } else if (i == 4) {
      $(n).text(strthursday);
    } else if (i == 5) {
      $(n).text(strfriday);
    } else if (i == 6) {
      $(n).text(strsaturday);
    } else if (i == 7) {
      $(n).text(strsunday);
    }
  });
  /**************************************/
  var enable = translate_page_item(TARGET_PAGE_COMMON, 'enable', '', ITEM_TYPE_NONE);
  var disable = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE);
  $('#div_page_peoplecount_enable_text').text(enable);
  $('#select_peoplecount_enable option').each(function (i, n) {
    if (i == 0) $(n).text(disable);
    else if (i == 1) $(n).text(enable);
  });
  $('#select_reportftp_enable option').each(function (i, n) {
    if (i == 0) $(n).text(disable);
    else if (i == 1) $(n).text(enable);
  });
  $(".cls_tablebar_item").css("width", 206);
  timereidt("timer_reportftp_timing");
  timereidt("timer_reportftp_timing").setvalue("00:00:00");
}
function fun_register_all_events() {
  $(".cls_tablebar_item").click(function () {
    var objid = this.id.toString();
    if (objid === "div_table_peoplecount_region") {
      $("#div_page_region").css("display", "block");
      $("#div_page_report_ftp").css("display", "none");
      $("#div_page_quota_report").css("display", "none");
      $("#div_table_peoplecount_region").addClass("cls_tablebar_item_selected");
      $("#div_table_peoplecount_ftpcfg,#div_table_peoplecount_reportcfg").removeClass("cls_tablebar_item_selected")
    } else if (objid === "div_table_peoplecount_ftpcfg") {
      $("#div_page_report_ftp").css("display", "block");
      $("#div_page_quota_report").css("display", "none");
      $("#div_page_region").css("display", "none");
      $("#div_table_peoplecount_ftpcfg").addClass("cls_tablebar_item_selected");
      $("#div_table_peoplecount_region,#div_table_peoplecount_reportcfg").removeClass("cls_tablebar_item_selected")
    } else if (objid === "div_table_peoplecount_reportcfg") {
      $("#div_page_quota_report").css("display", "block");
      $("#div_page_report_ftp").css("display", "none");
      $("#div_page_region").css("display", "none");
      $("#div_table_peoplecount_reportcfg").addClass("cls_tablebar_item_selected");
      $("#div_table_peoplecount_region,#div_table_peoplecount_ftpcfg").removeClass("cls_tablebar_item_selected")
    }
  });
  $('#button_region_clear').click(function () {
    fun_on_base_clear();
  });
  $('#select_peoplecount_enable').click(function () {
    fun_on_peoplecount_change();
  });
  $('#button_region_fullscreen').click(function () {
    fun_on_button_fullscreen();
  });
  $('#button_region_save').click(function () {
    fun_on_base_save();
  });
  $('#button_region_restore').click(function () {
    fun_on_region_restore();
  });
  $('#button_region_refresh').click(function () {
    fun_on_region_refresh();
  });
  $("#button_reportftp_restore,#button_reportftp_refresh,#button_reportftp_save").on('click', function () {
    var objid = this.id.toString();
    if (objid === "button_reportftp_restore") {
      fun_on_people_count_ftp_restore();
    } else if (objid === "button_reportftp_refresh") {
      fun_on_people_count_ftp_refresh();
    } else if (objid === "button_reportftp_save") {
      fun_on_people_count_ftp_save();
    }
  });
  $("#button_quotareport_search").on('click', function () {
    fun_on_people_count_log_search();
  });
  $(".cls_schedule_radio").click(function () {
    var objid = this.id.toString();
    fun_on_schedule_enable_change(objid);
  });
  $("#select_reportftp_enable").change(function () {
    if ($(this).children('option:selected').val() === '0') {
      $("#div_page_schedule_once,#div_page_schedule_time,#div_page_report_ftp_timing,#div_page_schedule_canvas").css("display", "none")
    } else {
      $("#div_page_schedule_once,#div_page_schedule_time").css("display", "block")
      if ($('#radio_schedule_once').is(":checked")) {
        $("#div_page_report_ftp_timing").css("display", "block");
        $("#div_page_schedule_canvas").css("display", "none");
      } else if ($('#radio_schedule_time').is(":checked")) {
        $("#div_page_report_ftp_timing").css("display", "none");
        $("#div_page_schedule_canvas").css("display", "block");
      }
    }
  })
  $("#select_peoplecount_mode").change(function () {//-------------------line 2
    lineNum = parseInt($(this).val());
    isLine2=false;
    video_overlay_draw.clear();
  })
}
function fun_on_schedule_enable_change(objid) {
  if (objid === "radio_schedule_time") {
    document.getElementById("div_page_schedule_canvas").style.setProperty('display', 'block');
    document.getElementById("div_page_report_ftp_timing").style.setProperty('display', 'none');
  } else if (objid === "radio_schedule_once") {
    document.getElementById("div_page_schedule_canvas").style.setProperty('display', 'none');
    document.getElementById("div_page_report_ftp_timing").style.setProperty('display', 'block');
  }
}

function fun_on_peoplecount_change() {
  if ($('#select_peoplecount_enable').val() == 1) {
    $('#input_autoreset_enable').removeAttr('disabled');
    $('#sel_reset_time_weekday').removeAttr('disabled');
    $('#button_manual_reset').removeAttr('disabled');
    timereidt('timer_reset_time').disable(false);
    $('#div_page_video_draw_shade').css('display', 'none');
  } else {
    $('#input_autoreset_enable').attr('disabled', 'disabled');
    $('#sel_reset_time_weekday').attr('disabled', 'disabled');
    $('#button_manual_reset').attr('disabled', 'disabled');
    $('#div_page_video_draw_shade').css('display', 'block');
    timereidt('timer_reset_time').disable(true);
  }
}

var szpieces = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var startdraw = false;
var lasttempy = 0;
function selectall() {
  for (var i = 0; i < 24; i++) {
    this.szpieces[i] = 1;
  }
  this.schdraw();
  this.stopdrawgrid();
}
function disableall() {
  for (var i = 0; i < 24; i++) {
    this.szpieces[i] = 0;
  }
  this.schdraw();
  this.stopdrawgrid();
}
function draws() {
  var obj_canvas = document.getElementById("cavsElem");
  obj_canvas.width = 528;
  obj_canvas.height = 22;
  obj_canvas.style.background = "rgba(201,201,201,.9)";
  this.ctx_canvas = obj_canvas.getContext("2d");
  this.ctx_canvas.lineWidth = 2;
  this.ctx_canvas.shadowBlur = 0;
  var rectW = 22;
  this.ctx_canvas.strokeStyle = "white";
  for (var i = 0; i < 24; i++) {
    this.ctx_canvas.moveTo(rectW * i, 0);
    this.ctx_canvas.lineTo(rectW * i, obj_canvas.height);
  }
  this.ctx_canvas.stroke();
  obj_canvas.onmousedown = this.startdrawgrid;
  obj_canvas.onmouseup = this.stopdrawgrid;
  obj_canvas.onmousemove = this.movinggrid;
  obj_canvas.onmouseout = this.stopdrawgrid;
}
function drawsline() {
  var obj_canvas = document.getElementById("cavsElem");
  obj_canvas.width = 528;
  obj_canvas.height = 22;
  // obj_canvas.style.background='#F2F2F2';
  ctx_canvas = obj_canvas.getContext("2d");
  ctx_canvas.lineWidth = 2;
  ctx_canvas.shadowBlur = 0;
  var rectW = 22;
  ctx_canvas.strokeStyle = "white";
  for (var i = 0; i < 24; i++) {
    ctx_canvas.moveTo(rectW * i, 0);
    ctx_canvas.lineTo(rectW * i, obj_canvas.height);
  }
  ctx_canvas.stroke();
}
function schdraw() {
  ctx_canvas.clearRect(0, 0, 528, 22);
  var grideWidth = 22;
  var grideHeight = 22;
  drawsline();
  ctx_canvas.fillStyle = 'rgba(123,185,51,0.0)';
  ctx_canvas.fillRect(0, 0, 528, 22);
  ctx_canvas.fillStyle = 'rgba(123,185,51,1)';
  ctx_canvas.lineWidth = 1;
  for (var i = 0; i < 1; i++) {
    for (var j = 0; j < 24; j++) {
      if (szpieces[j] & 0x01) {
        this.ctx_canvas.fillRect(grideWidth * j, grideHeight * i, grideWidth, grideHeight);
        this.ctx_canvas.strokeRect(grideWidth * j, grideHeight * i, grideWidth, grideHeight);
      }
    }
  }
}
function stopdrawgrid() {
  schdraw();
  startdraw = false;
}
function startdrawgrid(e) {
  var evt = e || window.event;
  var tempx = evt.offsetX;
  var grideWidth = 22;
  var idx = Math.floor(tempx / grideWidth);
  var val = 0;
  if (szpieces[idx] == 0) {
    val = 1;
  }
  szpieces[idx] = val;
  startdraw = true;
}
function movinggrid(e) {
  if (!startdraw) {
    return;
  }
  var evt = e || window.event;
  var tempx = evt.offsetX;
  var grideWidth = 22;
  var idx = Math.floor(tempx / grideWidth);
  szpieces[idx] = 0x01;
  schdraw();
}
function fun_init_draw_panel() {
  $("#slider_peoplecount_confidence").slider({
    orientation: "horizontal",
    range: "min",
    max: 100,
    value: 0,
    change: fun_on_slider_change
  });
  $("#div_page_media_area").css("display", "block");
  //return;
  if (null == video_overlay_draw) {
    video_overlay_draw = new video_drawx("div_page_video_draw", VIDEO_DRAWX_COVER_TYPE_DIRE);
    if (null != video_overlay_draw) {
      video_overlay_draw.start();
      if (null != peoplecount_parameters) { }
      if (g_algorithm_type === 7) {
        video_overlay_draw.enabledraw(true);
      }
    }
    fun_get_base_parameters();
  }
}
var peoplecount_parameters = null;
var video_overlay_draw = null;
var g_activex_plugin = null;
var fase_detect_note = "";
function real_time_section(start, end) {
  this.start = start;
  this.end = end;
  return this;
}
function fun_peoplecount(enable, ftpup, trytimes, repeat, start, end) {
  this.enable = enable;
  this.ftpup = ftpup;
  this.trytimes = trytimes;
  this.repeat = repeat;
  this.start = start;
  this.end = end;
}
function fun_get_video_picture() {
  Math.random() * 700;
  var num = Math.random() * 700 + 800;
  num = parseInt(num, 10);
  var tagpash = "/action/snap?t=" + String(num);
  $("#img_video_show").attr("src", tagpash);
  setTimeout("fun_get_video_picture();", 1000);
}
function fun_get_base_parameters() {
  sdk_getipcparam("/action/get?subject=counter", function (res) {
    if (res === false) return;
    $xml = $(res);
    var enable = $xml.find('enable').text();
    var ftpup = $xml.find('ftp_enable').text();
    var trytime = $xml.find('ftp_trytime').text();
    var sndtime = $xml.find('ftp_sendtime').text();
    /***********************************************/
    var resetenable = $xml.find('reset_enb').text();
    var resetday = $xml.find('reset_day').text();
    var resetsec = $xml.find('reset_sec').text();
    /***********************************************/
    var timesec = $xml.find('time_sec').text();
    var beginstr = $xml.find('begin').text();
    var endstr = $xml.find('end').text();
    var secarr = parseInt(timesec).toString(2).split("").reverse();
    szpieces = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < secarr.length; i++) {
      szpieces[i] = secarr[i];
    }


    schdraw();
    /******************************/
    //in it 手动和自动清空以及时间
    if (resetenable == 1) {
      $('#input_autoreset_enable').prop('checked', true);
    } else {
      $('#input_autoreset_enable').prop('checked', false);
    }
    $('#sel_reset_time_weekday').val(resetday);
    var resettime = String(Math.floor(resetsec / 3600)) + ':' + String(Math.floor((resetsec % 3600) / 60)) + ':' + String(resetsec % 60);
    timereidt('timer_reset_time').setvalue(resettime);
    /********************----------------------***************/

    if (enable == 1) {
      $('#input_autoreset_enable').removeAttr('disabled');
      $('#sel_reset_time_weekday').removeAttr('disabled');
      $('#button_manual_reset').removeAttr('disabled');
      timereidt('timer_reset_time').disable(false);
      $('#div_page_video_draw_shade').css('display', 'none');
    } else {
      $('#input_autoreset_enable').attr('disabled', 'disabled');
      $('#sel_reset_time_weekday').attr('disabled', 'disabled');
      $('#button_manual_reset').attr('disabled', 'disabled');
      $('#div_page_video_draw_shade').css('display', 'block');
      timereidt('timer_reset_time').disable(true);
    }
    $('#select_peoplecount_enable').val(enable);
    if (ftpup === '0') {
      $("#select_reportftp_enable").val(0);
      $("#div_page_schedule_once,#div_page_schedule_time,#div_page_report_ftp_timing,#div_page_schedule_canvas").css("display", "none");
    }
    if (ftpup === '1' || ftpup === '2') {
      $("#select_reportftp_enable").val(1);
      $("#div_page_schedule_once,#div_page_schedule_time").css("display", "block");
      if (ftpup === '1') {
        $('#radio_schedule_once').prop("checked", true);
        $("#div_page_report_ftp_timing").css("display", "block");
        $("#div_page_schedule_canvas").css("display", "none");
      } else {
        $('#radio_schedule_time').prop("checked", true);
        $("#div_page_report_ftp_timing").css("display", "none");
        $("#div_page_schedule_canvas").css("display", "block");
      }
    }
    trytime = parseInt(trytime);
    if (trytime >= 1 && trytime <= 5) {
      $("#select_reportftp_times").val(trytime);
    }
    var tagtime = String(Math.floor(sndtime / 3600)) + ':' + String(Math.floor((sndtime % 3600) / 60)) + ':' + String(sndtime % 60);
    timereidt("timer_reportftp_timing").setvalue(tagtime);

    var startpoint = new fun_point(beginstr.split(',')[0], beginstr.split(',')[1]);
    var endpoint = new fun_point(endstr.split(',')[0], endstr.split(',')[1]);
    peoplecount_parameters = new fun_peoplecount(enable, ftpup, trytime, sndtime, startpoint, endpoint);

    var beginstr2 = $xml.find('begin2').text();
    var endstr2 = $xml.find('end2').text();
    var startpoint2 = new fun_point(beginstr2.split(',')[0], beginstr2.split(',')[1]);
    var endpoint2 = new fun_point(endstr2.split(',')[0], endstr2.split(',')[1]);

    var num_mode = $xml.find('num').text();
    $('#select_peoplecount_mode').val(num_mode);
    lineNum = parseInt(num_mode);
    var derection= $xml.find('direction').text();
    $('#select_peoplecount_derection').val(derection)

    if (lineNum == 2) {
      video_overlay_draw.setvalue(startpoint, endpoint, startpoint2, endpoint2);
    } else {
      video_overlay_draw.setvalue(startpoint, endpoint, null, null);
    }
  });
}
function fun_on_base_clear() {
  video_overlay_draw.clear();
}
/*********************************/
//手动重置计数
function manualreset() {
  var counters = 1;
  var targetxml = '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<vactrl>' +
    '<reset>' +
    '<counter>' + counters + '</counter>' +
    '</reset>' +
    '</vactrl>' +
    '</request>';

  sdk_setipcparam('/action/set?subject=vactrl', targetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
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
function fun_on_base_save() {
  var enables = $("#select_peoplecount_enable").val();
  var ftpups = $("#select_reportftp_enable").val();
  var num = $('#select_peoplecount_mode').val();
  var derection = $('#select_peoplecount_derection').val()
  if (ftpups == 1 && $('#radio_schedule_time').is(":checked")) {
    ftpups = 2;
  }
  var sndtime = timereidt("timer_reportftp_timing").getvalue();
  var autoreset;
  if ($('#input_autoreset_enable').is(":checked")) {
    autoreset = 1;
  } else {
    autoreset = 0;
  }
  var resetday = $("#sel_reset_time_weekday").val();
  var resettime = timereidt("timer_reset_time").getvalue();
  var arrresettime = resettime.split(':');
  var resettimes;
  if (arrresettime.length === 3) {
    resettimes = parseInt(arrresettime[0]) * 3600;
    resettimes += parseInt(arrresettime[1]) * 60;
    resettimes += parseInt(arrresettime[2]);
  }
  var trytimes = $("#select_reportftp_times").val();
  var arrtime = sndtime.split(':');
  var ntagtime = 0, beginpt, endpt, drawresult;
  var sectime = 0;
  for (var i = 0; i < 24; i++) {
    if (szpieces[i] == 1) {
      sectime += Math.pow(2, i);
    }
  }
  if (arrtime.length === 3) {
    ntagtime = parseInt(arrtime[0]) * 3600;
    ntagtime += parseInt(arrtime[1]) * 60;
    ntagtime += parseInt(arrtime[2]);
  }
  var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
  if (fun_match_time(arrtime)) {
    parent.fun_show_tips_dialog(gtips_input, 0);
    return;
  }
  /*************************/
  //提示成功
  if (fun_match_time(arrresettime)) {
    parent.fun_show_tips_dialog(gtips_input, 0);
    return;
  }
  /******************************/
  let begin2 = '0,0'
  let end2 = '0,0';
  drawresult = video_overlay_draw.getvalue();
  const { a, b, c, d } = drawresult;
  if (null !== video_overlay_draw) {
    beginpt = String(a.x) + ',' + String(a.y);
    endpt = String(b.x) + ',' + String(b.y);
  }
  if (num == '2') {//Ë«ÏßÄ£Ê½
    begin2 = String(c.x) + ',' + String(c.y);
    end2 = String(d.x) + ',' + String(d.y);
    if (end2 == '0,0') {//±ØÐë»­Á½Ìõ
      parent.fun_show_tips_dialog(gtips_input, 0);
      return
    }
    if (isLinesIntersect(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)) {//ÅÐ¶ÏÖØºÏ£¬²»ÔÊÐíÖØºÏ
      parent.fun_show_tips_dialog(gtips_input, 0);
      return
    }

  }
  var targetxml = '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<counter>' +
    '<enable>' + enables + '</enable>' +
    '<ftp_enable>' + ftpups + '</ftp_enable>' +
    '<ftp_trytime>' + trytimes + '</ftp_trytime>' +
    '<time_sec>' + sectime + '</time_sec>' +
    '<ftp_sendtime>' + ntagtime + '</ftp_sendtime>' +
    '<reset_enb>' + autoreset + '</reset_enb>' +
    '<reset_day>' + resetday + '</reset_day>' +
    '<reset_sec>' + resettimes + '</reset_sec>' +
    /*****************************/
    // ---------------------line2 num------
    '<num>' + num + '</num>' +
    '<derection>' + derection + '</derection>' +
    // ---------------------line2 num------
    '<line>' +
    '<begin>' + beginpt + '</begin>' +
    '<end>' + endpt + '</end>' +
    // =--------------------------------line2
    '<begin2>' + begin2 + '</begin2>' +
    '<end2>' + end2 + '</end2>' +
    // =--------------------------------line2 
    '</line>' +
    '</counter>' +
    '</request>';

  sdk_setipcparam('/action/set?subject=counter', targetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
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
function fun_match_time(arrsande) {
  for (var i = 0; i < 3; i++) {
    if (!arrsande[i].match("^[0-9]+$")) {
      return true;
    }
  }
}
function fun_on_region_refresh() {
  fun_get_base_parameters();
}
function fun_on_region_restore() {
  $('#select_peoplecount_enable').val(0);
  $('#input_autoreset_enable').attr('disabled', 'disabled');
  $('#sel_reset_time_weekday').attr('disabled', 'disabled');
  $('#button_manual_reset').attr('disabled', 'disabled');
  $('#div_page_video_draw_shade').css('display', 'block');
  timereidt('timer_reset_time').disable(true);
  //--------------------------------------
  //初始化时间间隔，时间，重置
  $('#sel_reset_time_weekday').val(7);
  timereidt('timer_reset_time').setvalue('00:00:00');
  $('#input_autoreset_enable').prop('checked', false);
  //------------------------------------

  if (CurBrowserIsIE()) {
    if (null !== g_activex_plugin) {
      g_activex_plugin.SetNormalPoints(15, 50, 85, 50);
    }
  } else if (null !== video_overlay_draw) {
    video_overlay_draw.setvalue(new fun_point(15, 50), new fun_point(85, 50));
  }
}
function fun_on_slider_change() {
  var value = $('#slider_peoplecount_confidence').slider('option', 'value');
  $('#div_peoplecount_confidence_value').text(value);
}
function fun_on_button_fullscreen() {
  if (CurBrowserIsIE()) {
  } else if (null !== video_overlay_draw) {
  }
}
function fun_on_ieplugin_load() {
  sdk_getipcparam('/action/get?subject=netserv', function (result) {
    if (result != false) {
      $xml = $(result);
      var tcpport = $xml.find('tcp').text();
      var obj = document.getElementById('VIDEO');
      obj.Language = current_language_number();
      obj.UIMode = 15;
      obj.DeviceIp = document.location.hostname;
      obj.TcpPort = tcpport;
      obj.StretchVideo(1);
      g_activex_plugin = obj;
      fun_get_base_parameters();
    }
  });
}
var g_people_count_file_count = 0;
function fun_insert_people_count_loginfo(file, update, status) {
  var tagstatus;
  var strsucc = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, "sendsuccess", "", ITEM_TYPE_NONE);
  var strfail = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, "sendfailed", "", ITEM_TYPE_NONE);
  var strunsent = translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, "sendready", "", ITEM_TYPE_NONE);
  if (status === '-1') {
    tagstatus = strfail;
  } else if (status === '0') {
    tagstatus = strsucc;
  } else if (status === '1') {
    tagstatus = strunsent;
  }

  var strexport = translate_page_item(TARGET_PAGE_SUB_MAINTAIN, "export", "", ITEM_TYPE_NONE);
  var tagrow = '<tr style="width: 838px;height: 30px;float: left;" class="cls_peoplecount_list_row">' +
    '<th style="width: 170px;border-right: 0px solid black;height: 30px;" id="col_tagfile_' + g_people_count_file_count + '">' + file + '</th>' +
    '<th style="width: 170px;border-right: 0px solid black;height: 30px;">' + update + '</th>' +
    '<th style="width: 170px;border-right: 0px solid black;height: 30px;">' + tagstatus + '</th>' +
    '<th style="width: 170px;height: 26px;"><input type="button" id="button_people_logfile_export_' + g_people_count_file_count + '" class="cls_subpage_content_button" value="' + strexport + '" style="height: 24px;width: 130px;padding-top: -1px;" onclick="fun_on_list_button_click(this.id.toString())"></th>' +
    '<th style="width: 140px;height: 26px;"><input type="button" id="button_people_ftp_send_' + g_people_count_file_count + '" class="cls_subpage_content_button" value="' + strexport + '" style="height: 24px;width: 130px;padding-top: -1px;" onclick="fun_on_send_button_click(this.id.toString())"></th>' +
    '</tr>';
  $("#table_report_mapping_list").append(tagrow);
  g_people_count_file_count++;
}
function fun_on_people_count_ftp_restore() {
  $("#select_reportftp_enable").val(0);
  $("#select_reportftp_times").val(3);
  timereidt("timer_reportftp_timing").setvalue("23:59:59");
  $('#radio_schedule_once').prop("checked", true);
  $("#div_page_schedule_once,#div_page_report_ftp_timing,#div_page_schedule_time,#div_page_schedule_canvas").css("display", "none");
}
function fun_on_people_count_ftp_refresh() {
  fun_get_base_parameters();
}
function fun_on_people_count_ftp_save() {
  fun_on_base_save();
}
function fun_on_people_count_log_search() {
  var startdate = $("#input_quotareport_start_date").val();
  var enddate = $("#input_quotareport_end_date").val();
  var arrstartdate = startdate.split('-');
  var arrenddate = enddate.split('-');
  var startclock = parseInt(arrstartdate[0]) * 12 * 30 + parseInt(arrstartdate[1]) * 30 + parseInt(arrstartdate[2]);
  var endclock = parseInt(arrenddate[0]) * 12 * 30 + parseInt(arrenddate[1]) * 30 + parseInt(arrenddate[2]);
  var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, "errinput", "", ITEM_TYPE_NONE);
  if (startclock > endclock) {
    parent.fun_show_tips_dialog(gtips_input, 0);
    return;
  }
  $("#table_report_mapping_list").html("");
  g_people_count_file_count = 0;

  var tarurl = "/action/peoplecount?subject=peoplecount_info&start=" + startdate + "&end=" + enddate;

  sdk_getipcparam(tarurl, function (result) {
    if (result === false) {
      return;
    }
    $(result).find("peoplecount").each(function (a, b) {
      var tagfile = $(b).find("peoplecountfile").text();
      var sendtime = $(b).find("sendtime").text();
      var upstatus = $(b).find("upstatus").text();

      fun_insert_people_count_loginfo(tagfile, sendtime, upstatus);
    });
  });
}
function show_save_dialog() {
  if (g_wnd.document.readyState == "complete") {
    g_wnd.document.execCommand("SaveAs", true, g_download_filename);
    g_wnd.close();
  } else {
    setTimeout("show_save_dialog();", 500);
  }
}
function fun_on_send_button_click(tid) {
  var idlist = tid.split('_');
  if (idlist.length !== 5) {
    return;
  }
  var tfile = $("#col_tagfile_" + idlist[idlist.length - 1]).text();
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
  $.ajax({
    url: "/action/peoplecount?subject=peoplecount_ftp&name=" + tfile,
    type: 'get',
    async: false,
    timeout: 3000,
    success: function () {
      parent.fun_show_tips_dialog(strsuc);
    },
    error: function (result, error, exception) {
      parent.fun_show_tips_dialog(failed, 0);
    }
  });
}
function fun_on_list_button_click(tagid) {
  var idlist = tagid.split('_');
  if (idlist.length !== 5) {
    return;
  }
  var tagfile = $("#col_tagfile_" + idlist[idlist.length - 1]).text();

  fun_down_report_file_ex(tagfile);
}
var g_wnd = null;
var g_download_filename = '';
function fun_down_report_file_ex(filename) {
  if (CurBrowserIsIE()) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/action/peoplecount?subject=peoplecount_file&name=' + filename, true);
    xhr.responseType = 'blob';
    xhr.onload = function (ev) {
      if (xhr.status === 200) {
        fun_save_file_as(xhr.response, filename);
      }
    };
    xhr.send();
  } else {
    var worker = new Worker('/script/down_worker.js');
    if (worker) {
      worker.onmessage = function (ev) {
        fun_save_file_as(ev.data.blob, ev.data.file);
      };
      worker.postMessage({ file: filename });
    }
  }
}
function fun_save_file_as(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var link = document.getElementById('link');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    link.click();

    window.URL.revokeObjectURL(link.href);
  }
}
