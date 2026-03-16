var bv = null;
$(document).ready(function () {
  fun_multilang_adapter();
  fun_get_ability();
  fun_register_events();
  fun_initialize_pageui();
  fun_initialize_video();
  fun_init_motion_signal_show();
  fun_init_schedule_panel_show();
  fun_init_timer_section_item();
  fun_get_motion_schedule_params();
  videoShow();
});
function fun_get_ability() {
  sdk_getipcparam('/action/get?subject=snapability', function (result) {
    if (result != false) {
      $xml = $(result);
      var streamopt = $xml.find('streamopt').text();
      if (!(parseInt(streamopt) <= 0)) {
        $('#div_motion_action_snapshot').css('display', 'block');
      }
    }
  });
  sdk_getipcparam('/action/get?subject=devability', function (res) {
    if (res != false) {
      $xml = $(res);
      var fullcolor = $xml.find('fullcolor').text();
      var whled = $xml.find('whled').text();
      var irled = $xml.find('irled').text();
      if (fullcolor == 1 || whled == 1 || irled == 2) {
        $('#div_motion_action_ledblink').css('display', 'block');
      }

      var va = $xml.find('smartva').text();
      if (!(va & (1 << 3))) $('#item_human').hide();
      if (!(va & (1 << 10))) $('#item_vehicle').hide();

      var mdtype = parseInt($xml.find('mdtype').text());
      eval(`$("#ai_md_item").${mdtype?'show':'hide'}()`)

      var serialenable = parseInt($xml.find('serial').text()); //RS485
      if (serialenable <= 0) {
        $('#div_motion_action_rsio').css('display', 'none');
      }
    }
  });
}

function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'zone', 'div_table_motion_region_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'schedule', 'div_table_motion_schedule_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'action', 'div_table_motion_actions_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'enablemotion', 'lable_motion_enable', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'sensitivity', 'div_motion_sensitivity_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'threshold', 'div_motion_threshold_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'allmotions', 'allmotions_radio_label', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'smartmotions', 'smartmotions_radio_label', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'smarttips', 'div_smart_input_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'smarthuman', 'check_human_label', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'smartvehicle', 'check_vehicle_label', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_TIPSTEXT, 'maxrect', 'div_motion_rect_declare', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'mintime', 'div_motion_mintime_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'setup', 'button_schedule_sunday_setup,button_schedule_monday_setup,button_schedule_tuesday_setup,button_schedule_wednesday_setup,button_schedule_thursday_setup,button_schedule_friday_setup,button_schedule_saturday_setup', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_COMMON, 'alarmout', 'label_action_alarm_output', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'evtblink', 'label_action_alarm_ledblink', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'record', 'label_action_record', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'ftp', 'label_action_ftp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'sendemail', 'label_action_send_email', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'snapshot', 'label_action_snapshot', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'audioout', 'label_action_audio_out', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'notifyserver', 'label_action_notify_server', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_motion_actions_save,button_schedule_timesection_save,button_region_save,button_motion_schedule_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_schedule_timesection_cancel', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'removeall', 'button_region_removeall', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_region_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_MOTION, 'allrect', 'button_region_allrect', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_motion_schedule_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_motion_schedule_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_motion_actions_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_motion_actions_refresh', ITEM_TYPE_VALUE);

  var strmax = translate_page_item(TARGET_PAGE_COMMON, 'maximum', '', ITEM_TYPE_NONE);
  var strsecond = translate_page_item(TARGET_PAGE_COMMON, 'second', '', ITEM_TYPE_NONE);

  $('#div_motion_mintime_declare').text('[ ' + strmax + ' 300 ' + strsecond + ' ]');

  translate_page_item(TARGET_PAGE_COMMON, 'sunday', 'div_sunday,label_sunday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'monday', 'div_monday,label_monday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'tuesday', 'div_tuesday,label_tuesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'wednesday', 'div_wednesday,label_wednesday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'thursday', 'div_thursday,label_thursday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'friday', 'div_friday,label_friday', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'saturday', 'div_saturday,label_saturday', ITEM_TYPE_TEXT);

  var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
  var strhour = translate_page_item(TARGET_PAGE_COMMON, 'hour', '', ITEM_TYPE_NONE);
  var strdisable = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE);
  var strselall = translate_page_item(TARGET_PAGE_COMMON, 'selall', '', ITEM_TYPE_NONE);
  var strperiod = translate_page_item(TARGET_PAGE_COMMON, 'period', '', ITEM_TYPE_NONE);

  $('#label_schedule_allday').text('7*24 ' + strhour);
  $('#label_schedule_manual').text(strschedule);
  $('#label_scheudle_disable').text(strdisable);
  $('#label_all').text(strselall);

  $('#label_section1').text(strperiod + ' 1:');
  $('#label_section2').text(strperiod + ' 2:');
  $('#label_section3').text(strperiod + ' 3:');
  $('#label_section4').text(strperiod + ' 4:');
  $('#label_section5').text(strperiod + ' 5:');
  $('#label_section6').text(strperiod + ' 6:');

  input_edit_restriction('input_motion_mintime_text', EDIT_RESTRICTION_NUMBER, 3);
}

function fun_initialize_pageui() {
  $('#slider_motion_sensitivity_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 10,
    min: 1,
    value: 1,
    change: fun_sensitivity_change
  });
  $('#slider_motion_threshold_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 0,
    change: fun_threshold_change
  });
  $('#button_region_removeall,#button_region_restore,#button_region_save').click(function () {
    if (this.id.toString() == 'button_region_removeall') {
      fun_clear_all();
    } else if (this.id.toString() == 'button_region_restore') {
      fun_resotre_default();
    } else if (this.id.toString() == 'button_region_save') {
      fun_save_sections();
    }
  });
}

function fun_register_events() {
  $('#div_table_motion_region,#div_table_motion_schedule,#div_table_motion_actions').click(function () {
    if (this.id.toString() == 'div_table_motion_region') {
      $('#div_table_motion_region').addClass('cls_tablebar_item_selected');
      $('#div_table_motion_schedule,#div_table_motion_actions').removeClass('cls_tablebar_item_selected');
      $('#div_motion_region').css('display', 'block');
      $('#div_motion_schedule,#div_motion_actions').css('display', 'none');
      $('#div_motion_rect_declare').css('display', 'block');
      bPauseSignal = false;
    } else if (this.id.toString() == 'div_table_motion_schedule') {
      $('#div_table_motion_schedule').addClass('cls_tablebar_item_selected');
      $('#div_table_motion_region,#div_table_motion_actions').removeClass('cls_tablebar_item_selected');
      $('#div_motion_schedule').css('display', 'block');
      $('#div_motion_region,#div_motion_actions').css('display', 'none');
      $('#div_motion_rect_declare').css('display', 'none');
      bPauseSignal = true;
    } else if (this.id.toString() == 'div_table_motion_actions') {
      $('#div_table_motion_actions').addClass('cls_tablebar_item_selected');
      $('#div_table_motion_region,#div_table_motion_schedule').removeClass('cls_tablebar_item_selected');
      $('#div_motion_actions').css('display', 'block');
      $('#div_motion_schedule,#div_motion_region').css('display', 'none');
      $('#div_motion_rect_declare').css('display', 'none');
      bPauseSignal = true;
    }
  });
  $('#button_schedule_sunday_setup,#button_schedule_monday_setup,#button_schedule_tuesday_setup,#button_schedule_wednesday_setup,#button_schedule_thursday_setup,#button_schedule_friday_setup,#button_schedule_saturday_setup').click(function () {
    fun_on_schedule_setup(this.id.toString());
  });
  $('#radio_schedule_alldays,#radio_schedule_enable,#radio_schedule_disable').click(function () {
    fun_on_schedule_mode_change(this.id.toString());
  });
  $('#button_schedule_timesection_save,#button_schedule_timesection_cancel,#button_motion_actions_save,#button_motion_schedule_save').click(function () {
    fun_on_schedule_buttons(this.id.toString());
  });
  $('#check_weekday_alldays').click(function () {
    fun_on_weekday_alldays();
  });
  $('#button_region_allrect').click(function () {
    selallareas();
  });
  $('#button_motion_schedule_restore').click(function () {
    fun_motion_schedule_restore();
  });
  $('#button_motion_schedule_refresh').click(function () {
    fun_motion_schedule_refresh();
  });
  $('#button_motion_actions_restore').click(function () {
    fun_motion_action_restore();
  });
  $('#button_motion_actions_refresh').click(function () {
    fun_motion_action_refresh();
  });
  $('.motion_checkbox_change').click(function () {
    fun_motion_checkbox_change();
  });
  $('#div_motion_region_settings input[name="motion_radio"]').change(function () {
    const val = $(this).val()
    fun_motion_region_radio_change(val);
  })
}
function fun_motion_region_radio_change(val) {
  $('#check_human,' +
    '#check_vehicle'
  ).prop('disabled', val == 0);
  $('#check_human_label,#check_vehicle_label,#div_smart_input_name').css('color', val == 0 ? '#7f7f7f' : '#fff');
}
function fun_motion_checkbox_change() {
  var checkboxall = $('#div_setup_weekday_select .motion_checkbox_change').length;
  var checked = $('#div_setup_weekday_select .motion_checkbox_change:checked').length;
  if (checked < checkboxall) {
    $('#check_weekday_alldays').prop('checked', false);
  } else {
    $('#check_weekday_alldays').prop('checked', true);
  }
}

function fun_motion_schedule_restore() {
  $('#div_schedule_manual').css('display', 'none');
  document.getElementById('radio_schedule_disable').checked = true;
  $('#input_motion_mintime_text').val('10');
}

function fun_motion_schedule_refresh() {
  fun_get_motion_schedule_params();
}

function fun_motion_action_restore() {
  document.getElementById('check_action_iooutput').checked = false;
  document.getElementById('check_action_ledblink').checked = false;
  document.getElementById('check_action_record').checked = false;
  document.getElementById('check_action_ftp').checked = false;
  document.getElementById('check_action_sendemail').checked = false;
  document.getElementById('check_action_snapshot').checked = false;
  document.getElementById('check_action_audioout').checked = false;
  document.getElementById('check_action_evtserver').checked = false;
  document.getElementById('check_action_rsio').checked = false;
}

function fun_motion_action_refresh() {
  fun_motion_action_restore();
  fun_get_motion_schedule_params();
}

function fun_sensitivity_change() {
  var sentext = $('#slider_motion_sensitivity_value').slider('value');
  document.getElementById('div_motion_sensitivity_value_text').innerText = sentext;
  sensitivity = parseInt(sentext) - 1;
}

function fun_threshold_change() {
  var sentext = $('#slider_motion_threshold_value').slider('value');
  document.getElementById('div_motion_threshold_value_text').innerText = sentext;
  threshold = parseInt(sentext);
}

function fun_set_sensitivity_value(value) {
  $('#slider_motion_sensitivity_value').slider('option', 'value', String(value + 1));
}

function fun_set_threshold_value(value) {
  $('#slider_motion_threshold_value').slider('option', 'value', String(value));
}

//==========================================draw motion detection=====================================
var video_window_width = 640;
var video_window_height = 360;
var canvas;
var ctx;
var bCanDrawSection = false;
var g_activex_plugin = null;
var scalex;
var scaley;
function fun_initialize_video() {
  canvas = document.getElementById('canvas_motion_region');
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;

  canvas.onmousedown = startdrawgrid;
  canvas.onclick = onclickedcanvas;
  canvas.onmouseup = stopdrawgrid;
  canvas.onmousemove = movinggrid;
  canvas.onmouseout = stopdrawgrid;
}

function fun_get_motion_param() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parsexml(this);
    } else {
      parsexml(false);
    }
  };
  xhttp.open('POST', '/action/get?subject=motion', true);
  xhttp.send();
}
var g_mdsmart = null;
function parsexml(res) {
  if (!res) return;
  var xmldoc = res.responseText;
  var solution = $(xmldoc).find('resolution').text();
  var arr = solution.split('x');
  canvas.width = video_window_width;
  canvas.height = video_window_height;
  var ws = arr[0];
  var hs = arr[1];
  sensitivity = $(xmldoc).find('sensitivity').text();
  threshold = $(xmldoc).find('threshold').text();
  enablemotion = $(xmldoc).find('active').text();
  fun_set_sensitivity_value(parseInt(sensitivity));
  fun_set_threshold_value(parseInt(threshold));
  if (enablemotion == 0) {
    enaledrawmotion = false;
    document.getElementById('check_motion_enable').checked = false;
    $('#slider_motion_sensitivity_value').slider('option', { disabled: true });
    $('#slider_motion_threshold_value').slider('option', { disabled: true });
    $('#div_motion_sensitivity_text').css('color', '#7f7f7f');
    $('#div_motion_threshold_text').css('color', '#7f7f7f');
    $('#allmotions_radio,#smartmotions_radio').attr("disabled", true);
  } else {
    enaledrawmotion = true;
    document.getElementById('check_motion_enable').checked = true;
  }
  // radio funciton  -------------------------------------
  var mdType = $(xmldoc).find('mdtype').text();

  $('#div_motion_region_settings input[name="motion_radio"]').eq(parseInt(mdType)).prop('checked', true);
  const eleStr = '#check_human,#check_vehicle';
  $(eleStr).prop('disabled', (mdType == 0 && enablemotion != 0));//enable && mdType enable
  $(eleStr + '#div_smart_input_name').css('color', mdType == 0 ? '#7f7f7f' : '#fff');

  $('#check_human,#check_vehicle').attr("disabled", enablemotion == 0?true:mdType==0);

  
  var mdsmart = parseInt($(xmldoc).find('mdsmart').text());
  g_mdsmart = mdsmart;
  switch (mdsmart) {
    case 1:
      $('#check_human').attr('checked', 'true')
      break;
    case 2:
      $('#check_vehicle').attr('checked', 'true')
      break;
    case 3:
      $(eleStr).attr('checked', 'true')
      break;
  }
  // radio funciton end  -----------------------------------
  var tempIndex = 0;
  var scale_x = ws / video_window_width;
  scalex = scale_x;
  var scale_y = hs / video_window_height;
  scaley = scale_y;
  $(xmldoc).find('rect').each(function (i) {
    var rectpoints = $(this).text();
    var pointarray = rectpoints.split(',');
    if (pointarray.length === 4) {
      regions[tempIndex].x = parseInt(pointarray[0] / scale_x);
      regions[tempIndex].y = parseInt(pointarray[1] / scale_y);
      regions[tempIndex].w = parseInt(pointarray[2] / scale_x);
      regions[tempIndex].h = parseInt(pointarray[3] / scale_y);
      // if (tempIndex === 3) {
      // }
    }
    tempIndex++;
  });
  bCanDrawSection = true;
}
function CurBrowserIsIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;
  return false;
}
function compatibility_firefox() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? (Sys.ie = s[1]) : (s = ua.match(/firefox\/([\d.]+)/)) ? (Sys.firefox = s[1]) : (s = ua.match(/chrome\/([\d.]+)/)) ? (Sys.chrome = s[1]) : (s = ua.match(/opera.([\d.]+)/)) ? (Sys.opera = s[1]) : (s = ua.match(/version\/([\d.]+).*safari/)) ? (Sys.safari = s[1]) : 0;
  var edge = ua.match(/trident\/([\d.])/);

  if (Sys.firefox || Sys.safari) {
    return true;
  }
  return false;
}

function fun_get_video_picture() {
  Math.random() * 700;
  var num = Math.random() * 700 + 800;
  num = parseInt(num, 10);
  var tagpash = '/action/snap?t=' + String(num);
  $('#img_video_show').attr('src', tagpash);
  setTimeout('fun_get_video_picture();', 1000);
}

function fun_getrtmpport() {
  var tagport = 1935;
  $.ajax({
    url: '/action/get?subject=netserv',
    type: 'post',
    async: false,
    dataType: 'xml',
    success: function (data) {
      tagport = $(data).find('rtmp').text();
    }
  });
  return parseInt(tagport);
}

function videoShow() {
  sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (res) {
    if (res != false) {
      var rtspport = fun_getrtmpport();
      if (rtspport == 0 || isNaN(rtspport) || rtspport == undefined) {
        rtspport = 1935;
      }
      $xml = $(res);
      var codec = $xml.find('codec').text();
      if (codec == 1) {
        $('#div_motion_video_player').html("<img id='img_video_show' src='/action/snap' style='width: 100%;height: 100%'/>");
        fun_get_video_picture();
      } else if (codec == 2) {//mjpeg类型设备
        var Img_T = "<img style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=0' />";
        $('#div_motion_video_player').html(Img_T);
        // console.log( $('#div_motion_video_player').html());
      } else {
        $('#div_motion_video_player').html('<video id="videoElement" style="border-right: 1px solid black;border-bottom: 1px solid black;" height=' + video_window_height + ' width=' + video_window_width + ' name="videoElement" class="centeredVideo" autoplay></video>');
        var videoElement = document.getElementById('videoElement');
        videoElement.addEventListener('click', function mouseHandler(e) { e.preventDefault(); }, false);
        bv = window.mpegts.createPlayer(
          {
            type: 'flv',
            url: document.location.origin + '/action/stream?subject=flvlive&stream=0',
            withCredentials: false,
            liveBufferLatencyChasing: true,
            hasAudio: false
          },
          {
            lazyLoadMaxDuration: 3 * 60,
            seekType: 'range',
            liveBufferLatencyChasing: true
          }
        );
        bv.attachMediaElement(videoElement);
        bv.load();
        bv.play();
      }
    }
  });
  fun_get_motion_param();
}


//-----------------------------------------------------------
var drawGrideMode = 0;
var currentIndex = 0;
var enablemotion = 0;
var regions = [];
var sensitivity = 0;
var threshold = 0;
var bStarted = false;
var enaledrawmotion = false;
for (var i = 0; i < 4; i++) {
  regions[i] = new Object();
  regions[i].x = 0;
  regions[i].y = 0;
  regions[i].w = 0;
  regions[i].h = 0;
}
function mousePosition(evt) {
  return { x: evt.offsetX, y: evt.offsetY };
}
function startdrawgrid(evt) {
  if (currentIndex >= 4 || !enaledrawmotion) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  tempx = parseInt(tempx / 16) * 16;
  tempy = parseInt(tempy / 15) * 15;
  regions[currentIndex].x = parseInt(tempx);
  regions[currentIndex].y = parseInt(tempy);
  regions[currentIndex].w = 2;
  regions[currentIndex].h = 2;
  bStarted = true;
}
function onclickedcanvas(evt) {
  if (currentIndex >= 4) return;
  bStarted = false;
}
function selallareas() {
  regions[currentIndex].x = 0;
  regions[currentIndex].y = 0;
  regions[currentIndex].w = 640;
  regions[currentIndex].h = 360;
}
function stopdrawgrid(evt) {
  if (!bStarted) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  tempx = parseInt(tempx / 16) * 16 + 16;
  tempy = parseInt(tempy / 15) * 15 + 15;

  if (tempx > 640) {
    tempx = 640;
  }
  if (tempy > 360) {
    tempy = 360;
  }
  if (regions[currentIndex].x >= tempx || regions[currentIndex].y >= tempy) return;
  regions[currentIndex].w = tempx - regions[currentIndex].x;
  regions[currentIndex].h = tempy - regions[currentIndex].y;
  bStarted = false;
  if (currentIndex >= 3) {
    return;
  }
  currentIndex++;
}
function movinggrid(evt) {
  if (!bStarted) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (regions[currentIndex].x >= tempx || regions[currentIndex].y >= tempy) return;
  regions[currentIndex].w = tempx - regions[currentIndex].x;
  regions[currentIndex].h = tempy - regions[currentIndex].y;
}
function fun_clear_all() {
  for (var k = 0; k < 4; k++) {
    regions[k].x = 0;
    regions[k].y = 0;
    regions[k].w = 0;
    regions[k].h = 0;
  }
  currentIndex = 0;
}
function fun_clear_current() {
  for (var k = 0; k < 4; k++) {
    if (parseInt(currentIndex) === k) {
      regions[k].x = 0;
      regions[k].y = 0;
      regions[k].w = 0;
      regions[k].h = 0;
    }
  }
}
function fun_save_sections() {
  // ---parma
  var mdtype = $('input[name="motion_radio"]:checked').val();
  var check_human = $('#check_human').is(':checked');
  var check_vehicle = $('#check_vehicle').is(':checked');
  var mdsmart = 1;
  var errset = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
  if (check_human && check_vehicle) {//is check vehicle & human
    mdsmart = 3;
  } else if (check_vehicle) {//is check vehicle
    mdsmart = 2;
  } else if (check_human) {//is check human
    mdsmart = 1;
  } else if (mdtype == 1 && !check_human && !check_vehicle) {//no check vehicle & human
    parent.fun_show_tips_dialog(errset, 0);
    return;
  }
  if ((g_mdsmart == 1) && ($("#item_human").is(":hidden")) && mdsmart != 3) {
    parent.fun_show_tips_dialog(errset, 0);
  }
  if ((g_mdsmart == 2) && ($("#item_vehicle").is(":hidden")) && mdsmart != 3) {
    parent.fun_show_tips_dialog(errset, 0);
  }
  var xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<motion ver="2.0">' +
    '<active>' +
    parseInt(enablemotion) +
    '</active>' +
    '<mdtype>' + mdtype + '</mdtype>' +
    '<mdsmart>' + mdsmart + '</mdsmart>' +
    '<resolution>640x360</resolution>' +
    '<sensitivity>' +
    parseInt(sensitivity) +
    '</sensitivity>' +
    '<threshold>' +
    parseInt(threshold) +
    '</threshold>' +
    '<rect>' +
    parseInt(regions[0].x) +
    ',' +
    parseInt(regions[0].y) +
    ',' +
    parseInt(regions[0].w) +
    ',' +
    parseInt(regions[0].h) +
    '</rect>' +
    '<rect>' +
    parseInt(regions[1].x) +
    ',' +
    parseInt(regions[1].y) +
    ',' +
    parseInt(regions[1].w) +
    ',' +
    parseInt(regions[1].h) +
    '</rect>' +
    '<rect>' +
    parseInt(regions[2].x) +
    ',' +
    parseInt(regions[2].y) +
    ',' +
    parseInt(regions[2].w) +
    ',' +
    parseInt(regions[2].h) +
    '</rect>' +
    '<rect>' +
    parseInt(regions[3].x) +
    ',' +
    parseInt(regions[3].y) +
    ',' +
    parseInt(regions[3].w) +
    ',' +
    parseInt(regions[3].h) +
    '</rect>' +
    '</motion>' +
    '</request>';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
    if (this.readyState == 4 && this.status == 200) {
      parent.fun_show_tips_dialog(strsuc);
    } else if (this.readyState == 4 && this.status != 400) {
      parent.fun_show_tips_dialog(request, 0);
    } else if (this.readyState == 4 && this.status != 403) {
      parent.fun_show_tips_dialog(auth, 0);
    } else if (this.readyState == 4 && this.status != 500) {
      parent.fun_show_tips_dialog(failed, 0);
    }
  };
  xhttp.open('POST', '/action/set?subject=motion', true);
  xhttp.send(String(xml));
}

function fun_resotre_default() {
  document.getElementById('check_motion_enable').checked = false;
  fun_set_sensitivity_value(5);
  fun_set_threshold_value(20);
  fun_clear_all();
  enaledrawmotion = false;
  enablemotion = 0;
  $('#slider_motion_sensitivity_value').slider('option', { disabled: true });
  $('#slider_motion_threshold_value').slider('option', { disabled: true });
  // 
  $('#div_motion_region_settings input[name="motion_radio"]').eq(parseInt(0)).prop('checked', true);
  const eleStr = '#check_human,#check_vehicle';
  $(eleStr).prop('disabled', true);
  $('#allmotions_radio,#smartmotions_radio').prop('disabled', true);
  $(eleStr + '#div_smart_input_name').css('color', '#7f7f7f');
}

function fun_enable_motiondetect() {
  var motion_checked = $('#check_motion_enable').is(':checked');
  enaledrawmotion = motion_checked;
  enablemotion = (motion_checked ? 1 : 0);
  $('#slider_motion_sensitivity_value').slider('option', { disabled: !motion_checked });
  $('#slider_motion_threshold_value').slider('option', { disabled: !motion_checked });
  $('#div_motion_sensitivity_text').css('color', (motion_checked ? '#fff' : '#7f7f7f'));
  $('#div_motion_threshold_text').css('color', (motion_checked ? '#fff' : '#7f7f7f'));
  $('#allmotions_radio,#smartmotions_radio').attr("disabled", !motion_checked);

  var mdtype = $('input[name="motion_radio"]:checked').val();
  $('#check_human,#check_vehicle').attr("disabled", !motion_checked?true:mdtype=='0');
}
function setmotionsensitivity(val) {
  if (val >= 0 && val <= 100) sensitivity = val;
}

function draw_standard_gride() {
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.strokeRect(0.5, 0.5, video_window_width - 1, video_window_height - 1);
  for (var i = 16; i < 640; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i + 0.5, 0);
    ctx.lineTo(i + 0.5, video_window_height);
    ctx.stroke();
  }
  for (var k = 15; k < 360; k += 15) {
    ctx.beginPath();
    ctx.moveTo(0, k + 0.5);
    ctx.lineTo(video_window_width, k + 0.5);
    ctx.stroke();
  }
}
setInterval(drawsection, 10);
function drawsection() {
  if ((!enaledrawmotion || !bCanDrawSection) && ctx) {
    ctx.clearRect(0, 0, video_window_width, video_window_height);
    return;
  }
  if (!ctx) return;

  ctx.clearRect(0, 0, video_window_width, video_window_height);
  draw_standard_gride();
  ctx.strokeStyle = 'rgba(255,0,0,0.6)';
  ctx.fillStyle = '#171717';
  ctx.shadowBlur = 0;
  if (0 === drawGrideMode || 2 === drawGrideMode) {
    for (var j = 0; j < 4; j++) {
      if (regions[j].w > 0 && regions[j].h > 0) {
        if (scalex != 1 || scaley != 1) {
          regions[j].x = parseInt(regions[j].x % 16 == 0 ? regions[j].x : regions[j].x - (regions[j].x % 16));
          regions[j].w = parseInt(regions[j].w % 16 == 0 ? regions[j].w : regions[j].w - (regions[j].w % 16));
          regions[j].y = parseInt(regions[j].y % 15 == 0 ? regions[j].y : regions[j].y - (regions[j].y % 15) + 15);
          regions[j].h = parseInt(regions[j].h % 15 == 0 ? regions[j].h : regions[j].h - (regions[j].h % 15) + 15);
        }
        ctx.strokeRect(regions[j].x, regions[j].y, regions[j].w, regions[j].h);
        for (var tempw = 16; tempw < parseInt(regions[j].w); tempw += 16) {
          ctx.beginPath();
          ctx.moveTo(tempw + parseInt(regions[j].x) + 0.5, parseInt(regions[j].y));
          ctx.lineTo(tempw + parseInt(regions[j].x), parseInt(regions[j].h) + parseInt(regions[j].y));
          ctx.stroke();
        }
        for (var temph = 15; temph < parseInt(regions[j].h); temph += 15) {
          ctx.beginPath();
          ctx.moveTo(parseInt(regions[j].x), temph + parseInt(regions[j].y) + 0.5);
          ctx.lineTo(parseInt(regions[j].w) + parseInt(regions[j].x), temph + parseInt(regions[j].y) + 0.5);
          ctx.stroke();
        }
      }
    }
    fun_show_motion_status();
  } else if (1 === drawGrideMode) {
    for (var n = 0; n < 4; n++) {
      if (regions[n].w > 0 && regions[n].h > 0) {
        ctx.fillRect(regions[n].x, regions[n].y, regions[n].w, regions[n].h);
      }
    }
  }
}

function fun_show_motion_status() {
  var statusarr = g_pieces_status.split(',');
  var tempheight = 29;
  var tempwidth = 20;
  ctx.fillStyle = '#ee9a00';
  var temprows = 18;
  var tempcols = 22;

  var picw = 640 / 22;
  var pich = 360 / 18;

  var col, row;
  for (row = 0; row < 18; row++) {
    for (col = 0; col < 22; col++) {
      var pos = col * 18 + row;
      var temp = parseInt(statusarr[parseInt(pos / 32)], 16);
      if ((temp >> pos % 32) & 0x1) {
        ctx.fillRect(Math.floor((col * picw) / 16) * 16, Math.floor((row * pich) / 15) * 15, Math.ceil(picw / 16) * 16, Math.ceil(pich / 15) * 15);
      }
    }
  }
}

//===============================================electrocardiogram==============================================
var max_point_count = 160;
var window_width = 320;
var window_height = 170;
var pointArray = new Array(max_point_count);
var bStop = false;
var bStart = false;
var bPauseSignal = false;
for (var i = 0; i < 160; i++) {
  pointArray[i] = 0;
}
function addpoint(pt) {
  pt = Math.round(pt);
  pt = parseInt((pt * 168) / 200);
  if (pt >= 168) pt = 167;
  pt = 168 - pt;
  var bfind = false;
  for (var i = 0; i < max_point_count; i++) {
    if (pointArray[i] === 0) {
      pointArray[i] = pt;
      bfind = true;
    }
  }
  if (!bfind) {
    for (var k = 0; k < max_point_count - 1; k++) {
      pointArray[k] = pointArray[k + 1];
    }
    pointArray[max_point_count - 1] = pt;
  }
}
var canvas_ekg;
var ctx_ekg;
var g_pieces_rows = 18;
var g_pieces_column = 22;
var g_pieces_status = '';

function fun_init_motion_signal_show() {
  canvas_ekg = document.getElementById('canvas_motion_signal_show');
  ctx_ekg = canvas_ekg.getContext('2d');
  ctx_ekg.lineWidth = 1;
  canvas_ekg.width = window_width;
  canvas_ekg.height = window_height;
  bStart = true;
}

function fun_get_motion_signal_value() {
  sdk_getipcparam('/action/get?subject=mdstatus', function (result) {
    if (result == false) return 0;
    var strrow = $(result).find('row').text();
    var strcell = $(result).find('cell').text();
    var xmldoc = loadXMLString(String(result));
    if (xmldoc == null) return;
    var strcol = xmldoc.getElementsByTagName('col')[0].textContent;

    g_pieces_status = strcell;

    var signalval = $(result).find('move').text();
    if (signalval > 200) signalval = 200;
    addpoint(signalval);
  });
}

function renderpath() {
  ctx_ekg.beginPath();
  ctx_ekg.moveTo(0.5, pointArray[0] + 0.5);
  for (var j = 1; j < max_point_count; j++) {
    ctx_ekg.lineTo(j * 2, pointArray[j]);
  }
}
function rendergrade() {
  var offset = parseInt(window_height / 10);
  var base = offset;
  for (var m = 0; m < 10; m++) {
    ctx_ekg.beginPath();
    ctx_ekg.moveTo(0.5, base + 0.5);
    ctx_ekg.lineTo(window_width + 20, base);
    ctx_ekg.stroke();
    base += offset;
  }
  ctx_ekg.strokeStyle = '#436eee';
  offset = window_height / 100;
  ctx_ekg.beginPath();
  ctx_ekg.moveTo(0, parseInt(offset * (100 - threshold)) + 0.5);
  ctx_ekg.lineTo(window_width, parseInt(offset * (100 - threshold)) + 0.5);
  ctx_ekg.stroke();
}
function StopPanel() {
  bStop = true;
}
function StartPanel() {
  bStop = false;
}
setInterval(function () {
  if (!bStop && bStart && !bPauseSignal) {
    ctx_ekg.clearRect(0, 0, 320, 170);
    ctx_ekg.strokeStyle = '#a6a6a6';
    rendergrade();
    ctx_ekg.strokeStyle = '#ff0000';
    fun_get_motion_signal_value();
    renderpath();
    ctx_ekg.stroke();
  }
}, 200);

//===========================schedule=============================
var g_schedule_painter;

function fun_init_schedule_panel_show() {
  g_schedule_painter = new normal_schedule('div_schedule_panel', 720, 224);
}

var g_current_set_day = 0;
function fun_on_schedule_setup(objid) {
  if (objid == 'button_schedule_sunday_setup') {
    document.getElementById('check_weekday_sunday').checked = true;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#div_weekday_sunday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 7;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_monday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = true;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#div_weekday_monday').addClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 1;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_tuesday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = true;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#div_weekday_tuesday').addClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 2;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_wednesday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = true;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#div_weekday_wednesday').addClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 3;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_thursday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = true;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#div_weekday_thursday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_mondayday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 4;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_friday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = true;
    document.getElementById('check_weekday_saturday').checked = false;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#div_weekday_friday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    $('#div_weekday_saturday').removeClass('cls_item_name_selected');
    g_current_set_day = 5;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  } else if (objid == 'button_schedule_saturday_setup') {
    document.getElementById('check_weekday_sunday').checked = false;
    document.getElementById('check_weekday_monday').checked = false;
    document.getElementById('check_weekday_tuesday').checked = false;
    document.getElementById('check_weekday_wednesday').checked = false;
    document.getElementById('check_weekday_thursday').checked = false;
    document.getElementById('check_weekday_friday').checked = false;
    document.getElementById('check_weekday_saturday').checked = true;
    document.getElementById('check_weekday_alldays').checked = false;
    $('#div_weekday_saturday').addClass('cls_item_name_selected');
    $('#div_weekday_monday').removeClass('cls_item_name_selected');
    $('#div_weekday_tuesday').removeClass('cls_item_name_selected');
    $('#div_weekday_wednesday').removeClass('cls_item_name_selected');
    $('#div_weekday_thursday').removeClass('cls_item_name_selected');
    $('#div_weekday_friday').removeClass('cls_item_name_selected');
    $('#div_weekday_sunday').removeClass('cls_item_name_selected');
    g_current_set_day = 6;
    fun_show_schedule_timesection_inedit(g_current_set_day - 1);
  }
  fun_show_setup_dialog(true);
}

var real_schedule_timesection = [];
var schedule_action_mask = 0;
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

function fun_show_schedule_timesection_inedit(index) {
  if (index >= 0 && index < 7) {
    var timesec1start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection1.start);
    var timesec1end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection1.end);
    var timesec2start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection2.start);
    var timesec2end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection2.end);
    var timesec3start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection3.start);
    var timesec3end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection3.end);
    var timesec4start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection4.start);
    var timesec4end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection4.end);
    var timesec5start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection5.start);
    var timesec5end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection5.end);
    var timesec6start = fun_convert_timestdfmt(real_schedule_timesection[index].tsection6.start);
    var timesec6end = fun_convert_timestdfmt(real_schedule_timesection[index].tsection6.end);

    timereidt('timeredit_one_start').setvalue(timesec1start);
    timereidt('timeredit_one_end').setvalue(timesec1end);
    timereidt('timeredit_two_start').setvalue(timesec2start);
    timereidt('timeredit_two_end').setvalue(timesec2end);
    timereidt('timeredit_three_start').setvalue(timesec3start);
    timereidt('timeredit_three_end').setvalue(timesec3end);
    timereidt('timeredit_four_start').setvalue(timesec4start);
    timereidt('timeredit_four_end').setvalue(timesec4end);
    timereidt('timeredit_five_start').setvalue(timesec5start);
    timereidt('timeredit_five_end').setvalue(timesec5end);
    timereidt('timeredit_six_start').setvalue(timesec6start);
    timereidt('timeredit_six_end').setvalue(timesec6end);
  }
}

function fun_get_motion_schedule_params() {
  for (var index = 0; index < 7; index++) {
    real_schedule_timesection[index] = new real_weekday_timesection(new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0), new real_time_section(0, 0));
  }
  sdk_getipcparam('/action/get?subject=alarm&type=2', function (result) {
    if (result != false) {
      $xml = $(result);
      var active = $xml.find('active').text();
      var duration = $xml.find('duration').text();

      var outmask = $xml.find('outmask').text();
      if (active == 0) {
        document.getElementById('radio_schedule_disable').checked = true;
        document.getElementById('div_schedule_manual').style.setProperty('display', 'none');
      } else if (active == 1) {
        document.getElementById('radio_schedule_alldays').checked = true;
        document.getElementById('div_schedule_manual').style.setProperty('display', 'none');
      } else if (active == 2) {
        document.getElementById('radio_schedule_enable').checked = true;
        document.getElementById('div_schedule_manual').style.setProperty('display', 'block');
      }
      $('#input_motion_mintime_text').val(duration);

      var actionmask = parseInt(outmask);
      if (actionmask & 1) {
        document.getElementById('check_action_iooutput').checked = true;
      }
      if (actionmask & (1 << 8)) {
        document.getElementById('check_action_ledblink').checked = true;
      }
      if (actionmask & (1 << 12)) {
        document.getElementById('check_action_snapshot').checked = true;
      }
      if (actionmask & (1 << 13)) {
        document.getElementById('check_action_record').checked = true;
      }
      if (actionmask & (1 << 14)) {
        document.getElementById('check_action_ftp').checked = true;
      }
      if (actionmask & (1 << 16)) {
        document.getElementById('check_action_sendemail').checked = true;
      }
      if (actionmask & (1 << 17)) {
        document.getElementById('check_action_audioout').checked = true;
      }
      if (actionmask & (1 << 18)) {
        document.getElementById('check_action_evtserver').checked = true;
      }
      if (actionmask & (1 << 19)) {//485
        document.getElementById('check_action_rsio').checked = true;
      }
      var childindex = 0;
      var sectionindex = 1;
      $xml
        .find('schedule')
        .children()
        .each(function () {
          $(this)
            .find('tsection')
            .each(function () {
              var temptext = this.innerText;
              var timearr = temptext.split('-');
              if (timearr[0] == 0 && timearr[1] == 0) return;
              var starttime = parseInt(timearr[0]);
              var endtime = parseInt(timearr[1]);
              if (sectionindex == 1) {
                real_schedule_timesection[childindex].tsection1.start = starttime;
                real_schedule_timesection[childindex].tsection1.end = endtime;
              } else if (sectionindex == 2) {
                real_schedule_timesection[childindex].tsection2.start = starttime;
                real_schedule_timesection[childindex].tsection2.end = endtime;
              } else if (sectionindex == 3) {
                real_schedule_timesection[childindex].tsection3.start = starttime;
                real_schedule_timesection[childindex].tsection3.end = endtime;
              } else if (sectionindex == 4) {
                real_schedule_timesection[childindex].tsection4.start = starttime;
                real_schedule_timesection[childindex].tsection4.end = endtime;
              } else if (sectionindex == 5) {
                real_schedule_timesection[childindex].tsection5.start = starttime;
                real_schedule_timesection[childindex].tsection5.end = endtime;
              } else if (sectionindex == 6) {
                real_schedule_timesection[childindex].tsection6.start = starttime;
                real_schedule_timesection[childindex].tsection6.end = endtime;
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
    }
  });
}

function fun_on_schedule_mode_change(objid) {
  if (objid == 'radio_schedule_disable') {
    $('#div_schedule_manual').css('display', 'none');
  } else if (objid == 'radio_schedule_enable') {
    $('#div_schedule_manual').css('display', 'block');
  } else if (objid == 'radio_schedule_alldays') {
    $('#div_schedule_manual').css('display', 'none');
  }
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
    strhour = '0' + String(hour);
  }
  if (minute > 9) {
    strminute = String(minute);
  } else {
    strminute = '0' + String(minute);
  }
  if (second > 9) {
    strsecond = String(second);
  } else {
    strsecond = '0' + String(second);
  }
  return strhour + ':' + strminute + ':' + strsecond;
}

function fun_convert_serverfmt(start, end) {
  return String(start) + '-' + String(end);
}

function fun_on_schedule_buttons(objid) {
  if (objid == 'button_schedule_timesection_save') {
    var sundayenable = document.getElementById('check_weekday_sunday').checked;
    var mondayenable = document.getElementById('check_weekday_monday').checked;
    var tuesdayenable = document.getElementById('check_weekday_tuesday').checked;
    var wednesdayenable = document.getElementById('check_weekday_wednesday').checked;
    var thursdayenable = document.getElementById('check_weekday_thursday').checked;
    var fridayenable = document.getElementById('check_weekday_friday').checked;
    var saturdayenable = document.getElementById('check_weekday_saturday').checked;

    var enable1 = true;
    var enable2 = true;
    var enable3 = true;
    var enable4 = true;
    var enable5 = true;
    var enable6 = true;

    var sec1start = timereidt('timeredit_one_start').getvalue();
    var sec1end = timereidt('timeredit_one_end').getvalue();
    var sec2start = timereidt('timeredit_two_start').getvalue();
    var sec2end = timereidt('timeredit_two_end').getvalue();
    var sec3start = timereidt('timeredit_three_start').getvalue();
    var sec3end = timereidt('timeredit_three_end').getvalue();
    var sec4start = timereidt('timeredit_four_start').getvalue();
    var sec4end = timereidt('timeredit_four_end').getvalue();
    var sec5start = timereidt('timeredit_five_start').getvalue();
    var sec5end = timereidt('timeredit_five_end').getvalue();
    var sec6start = timereidt('timeredit_six_start').getvalue();
    var sec6end = timereidt('timeredit_six_end').getvalue();
    var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    if (fun_compare_sande(sec1start, sec1end) || fun_compare_sande(sec2start, sec2end) || fun_compare_sande(sec3start, sec3end) || fun_compare_sande(sec4start, sec4end) || fun_compare_sande(sec5start, sec5end) || fun_compare_sande(sec6start, sec6end)) {
      parent.fun_show_tips_dialog(gtips_input, 0);
      return;
    }
    if (sundayenable) {
      if (enable1) {
        real_schedule_timesection[6].tsection1.start = fun_convert_timestring(sec1start);
        real_schedule_timesection[6].tsection1.end = fun_convert_timestring(sec1end);
        g_schedule_painter.setSection(0, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
      }
      if (enable2) {
        real_schedule_timesection[6].tsection2.start = fun_convert_timestring(sec2start);
        real_schedule_timesection[6].tsection2.end = fun_convert_timestring(sec2end);
        g_schedule_painter.setSection(0, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
      }
      if (enable3) {
        real_schedule_timesection[6].tsection3.start = fun_convert_timestring(sec3start);
        real_schedule_timesection[6].tsection3.end = fun_convert_timestring(sec3end);
        g_schedule_painter.setSection(0, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
      }
      if (enable4) {
        real_schedule_timesection[6].tsection4.start = fun_convert_timestring(sec4start);
        real_schedule_timesection[6].tsection4.end = fun_convert_timestring(sec4end);
        g_schedule_painter.setSection(0, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
      }
      if (enable5) {
        real_schedule_timesection[6].tsection5.start = fun_convert_timestring(sec5start);
        real_schedule_timesection[6].tsection5.end = fun_convert_timestring(sec5end);
        g_schedule_painter.setSection(0, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
      }
      if (enable6) {
        real_schedule_timesection[6].tsection6.start = fun_convert_timestring(sec6start);
        real_schedule_timesection[6].tsection6.end = fun_convert_timestring(sec6end);
        g_schedule_painter.setSection(0, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
      }
    }
    if (mondayenable) {
      if (enable1) {
        real_schedule_timesection[0].tsection1.start = fun_convert_timestring(sec1start);
        real_schedule_timesection[0].tsection1.end = fun_convert_timestring(sec1end);
        g_schedule_painter.setSection(1, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
      }
      if (enable2) {
        real_schedule_timesection[0].tsection2.start = fun_convert_timestring(sec2start);
        real_schedule_timesection[0].tsection2.end = fun_convert_timestring(sec2end);
        g_schedule_painter.setSection(1, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
      }
      if (enable3) {
        real_schedule_timesection[0].tsection3.start = fun_convert_timestring(sec3start);
        real_schedule_timesection[0].tsection3.end = fun_convert_timestring(sec3end);
        g_schedule_painter.setSection(1, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
      }
      if (enable4) {
        real_schedule_timesection[0].tsection4.start = fun_convert_timestring(sec4start);
        real_schedule_timesection[0].tsection4.end = fun_convert_timestring(sec4end);
        g_schedule_painter.setSection(1, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
      }
      if (enable5) {
        real_schedule_timesection[0].tsection5.start = fun_convert_timestring(sec5start);
        real_schedule_timesection[0].tsection5.end = fun_convert_timestring(sec5end);
        g_schedule_painter.setSection(1, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
      }
      if (enable6) {
        real_schedule_timesection[0].tsection6.start = fun_convert_timestring(sec6start);
        real_schedule_timesection[0].tsection6.end = fun_convert_timestring(sec6end);
        g_schedule_painter.setSection(1, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
      }
    }
    if (tuesdayenable) {
      if (enable1) {
        real_schedule_timesection[1].tsection1.start = fun_convert_timestring(sec1start);
        real_schedule_timesection[1].tsection1.end = fun_convert_timestring(sec1end);
        g_schedule_painter.setSection(2, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
      }
      if (enable2) {
        real_schedule_timesection[1].tsection2.start = fun_convert_timestring(sec2start);
        real_schedule_timesection[1].tsection2.end = fun_convert_timestring(sec2end);
        g_schedule_painter.setSection(2, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
      }
      if (enable3) {
        real_schedule_timesection[1].tsection3.start = fun_convert_timestring(sec3start);
        real_schedule_timesection[1].tsection3.end = fun_convert_timestring(sec3end);
        g_schedule_painter.setSection(2, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
      }
      if (enable4) {
        real_schedule_timesection[1].tsection4.start = fun_convert_timestring(sec4start);
        real_schedule_timesection[1].tsection4.end = fun_convert_timestring(sec4end);
        g_schedule_painter.setSection(2, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
      }
      if (enable5) {
        real_schedule_timesection[1].tsection5.start = fun_convert_timestring(sec5start);
        real_schedule_timesection[1].tsection5.end = fun_convert_timestring(sec5end);
        g_schedule_painter.setSection(2, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
      }
      if (enable6) {
        real_schedule_timesection[1].tsection6.start = fun_convert_timestring(sec6start);
        real_schedule_timesection[1].tsection6.end = fun_convert_timestring(sec6end);
        g_schedule_painter.setSection(2, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
      }
    }
    if (wednesdayenable) {
      if (enable1) {
        real_schedule_timesection[2].tsection1.start = fun_convert_timestring(sec1start);
        real_schedule_timesection[2].tsection1.end = fun_convert_timestring(sec1end);
        g_schedule_painter.setSection(3, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
      }
      if (enable2) {
        real_schedule_timesection[2].tsection2.start = fun_convert_timestring(sec2start);
        real_schedule_timesection[2].tsection2.end = fun_convert_timestring(sec2end);
        g_schedule_painter.setSection(3, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
      }
      if (enable3) {
        real_schedule_timesection[2].tsection3.start = fun_convert_timestring(sec3start);
        real_schedule_timesection[2].tsection3.end = fun_convert_timestring(sec3end);
        g_schedule_painter.setSection(3, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
      }
      if (enable4) {
        real_schedule_timesection[2].tsection4.start = fun_convert_timestring(sec4start);
        real_schedule_timesection[2].tsection4.end = fun_convert_timestring(sec4end);
        g_schedule_painter.setSection(3, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
      }
      if (enable5) {
        real_schedule_timesection[2].tsection5.start = fun_convert_timestring(sec5start);
        real_schedule_timesection[2].tsection5.end = fun_convert_timestring(sec5end);
        g_schedule_painter.setSection(3, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
      }
      if (enable6) {
        real_schedule_timesection[2].tsection6.start = fun_convert_timestring(sec6start);
        real_schedule_timesection[2].tsection6.end = fun_convert_timestring(sec6end);
        g_schedule_painter.setSection(3, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
      }
    }
    if (thursdayenable) {
      if (enable1) {
        real_schedule_timesection[3].tsection1.start = fun_convert_timestring(sec1start);
        real_schedule_timesection[3].tsection1.end = fun_convert_timestring(sec1end);
        g_schedule_painter.setSection(4, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
      }
      if (enable2) {
        real_schedule_timesection[3].tsection2.start = fun_convert_timestring(sec2start);
        real_schedule_timesection[3].tsection2.end = fun_convert_timestring(sec2end);
        g_schedule_painter.setSection(4, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
      }
      if (enable3) {
        real_schedule_timesection[3].tsection3.start = fun_convert_timestring(sec3start);
        real_schedule_timesection[3].tsection3.end = fun_convert_timestring(sec3end);
        g_schedule_painter.setSection(4, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
      }
      if (enable4) {
        real_schedule_timesection[3].tsection4.start = fun_convert_timestring(sec4start);
        real_schedule_timesection[3].tsection4.end = fun_convert_timestring(sec4end);
        g_schedule_painter.setSection(4, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
      }
      if (enable5) {
        real_schedule_timesection[3].tsection5.start = fun_convert_timestring(sec5start);
        real_schedule_timesection[3].tsection5.end = fun_convert_timestring(sec5end);
        g_schedule_painter.setSection(4, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
      }
      if (enable6) {
        real_schedule_timesection[3].tsection6.start = fun_convert_timestring(sec6start);
        real_schedule_timesection[3].tsection6.end = fun_convert_timestring(sec6end);
        g_schedule_painter.setSection(4, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
      }
    }
    if (fridayenable) {
      if (enable1) {
        real_schedule_timesection[4].tsection1.start = fun_convert_timestring(sec1start);
        real_schedule_timesection[4].tsection1.end = fun_convert_timestring(sec1end);
        g_schedule_painter.setSection(5, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
      }
      if (enable2) {
        real_schedule_timesection[4].tsection2.start = fun_convert_timestring(sec2start);
        real_schedule_timesection[4].tsection2.end = fun_convert_timestring(sec2end);
        g_schedule_painter.setSection(5, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
      }
      if (enable3) {
        real_schedule_timesection[4].tsection3.start = fun_convert_timestring(sec3start);
        real_schedule_timesection[4].tsection3.end = fun_convert_timestring(sec3end);
        g_schedule_painter.setSection(5, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
      }
      if (enable4) {
        real_schedule_timesection[4].tsection4.start = fun_convert_timestring(sec4start);
        real_schedule_timesection[4].tsection4.end = fun_convert_timestring(sec4end);
        g_schedule_painter.setSection(5, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
      }
      if (enable5) {
        real_schedule_timesection[4].tsection5.start = fun_convert_timestring(sec5start);
        real_schedule_timesection[4].tsection5.end = fun_convert_timestring(sec5end);
        g_schedule_painter.setSection(5, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
      }
      if (enable6) {
        real_schedule_timesection[4].tsection6.start = fun_convert_timestring(sec6start);
        real_schedule_timesection[4].tsection6.end = fun_convert_timestring(sec6end);
        g_schedule_painter.setSection(5, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
      }
    }
    if (saturdayenable) {
      if (enable1) {
        real_schedule_timesection[5].tsection1.start = fun_convert_timestring(sec1start);
        real_schedule_timesection[5].tsection1.end = fun_convert_timestring(sec1end);
        g_schedule_painter.setSection(6, 1, fun_convert_timestring(sec1start), fun_convert_timestring(sec1end));
      }
      if (enable2) {
        real_schedule_timesection[5].tsection2.start = fun_convert_timestring(sec2start);
        real_schedule_timesection[5].tsection2.end = fun_convert_timestring(sec2end);
        g_schedule_painter.setSection(6, 2, fun_convert_timestring(sec2start), fun_convert_timestring(sec2end));
      }
      if (enable3) {
        real_schedule_timesection[5].tsection3.start = fun_convert_timestring(sec3start);
        real_schedule_timesection[5].tsection3.end = fun_convert_timestring(sec3end);
        g_schedule_painter.setSection(6, 3, fun_convert_timestring(sec3start), fun_convert_timestring(sec3end));
      }
      if (enable4) {
        real_schedule_timesection[5].tsection4.start = fun_convert_timestring(sec4start);
        real_schedule_timesection[5].tsection4.end = fun_convert_timestring(sec4end);
        g_schedule_painter.setSection(6, 4, fun_convert_timestring(sec4start), fun_convert_timestring(sec4end));
      }
      if (enable5) {
        real_schedule_timesection[5].tsection5.start = fun_convert_timestring(sec5start);
        real_schedule_timesection[5].tsection5.end = fun_convert_timestring(sec5end);
        g_schedule_painter.setSection(6, 5, fun_convert_timestring(sec5start), fun_convert_timestring(sec5end));
      }
      if (enable6) {
        real_schedule_timesection[5].tsection6.start = fun_convert_timestring(sec6start);
        real_schedule_timesection[5].tsection6.end = fun_convert_timestring(sec6end);
        g_schedule_painter.setSection(6, 6, fun_convert_timestring(sec6start), fun_convert_timestring(sec6end));
      }
    }
    fun_show_setup_dialog(false);
    fun_save_motion_schedule();
  } else if (objid == 'button_schedule_timesection_cancel') {
    fun_show_setup_dialog(false);
  } else if (objid == 'button_motion_actions_save' || objid == 'button_motion_schedule_save') {
    var actionoutput = document.getElementById('check_action_iooutput').checked;
    var actionledblk = document.getElementById('check_action_ledblink').checked;
    var actionrecord = document.getElementById('check_action_record').checked;
    var actionftp = document.getElementById('check_action_ftp').checked;
    var actionemail = document.getElementById('check_action_sendemail').checked;
    var actionsnapshot = document.getElementById('check_action_snapshot').checked;
    var actionaudio = document.getElementById('check_action_audioout').checked;
    var actionevtserver = document.getElementById('check_action_evtserver').checked;
    var rsio = document.getElementById('check_action_rsio').checked;

    schedule_action_mask = 0;
    if (actionoutput) {
      schedule_action_mask |= 1;
    }
    if (actionledblk) {
      schedule_action_mask |= 1 << 8;
    }
    if (actionrecord) {
      schedule_action_mask |= 1 << 13;
    }
    if (actionftp) {
      schedule_action_mask |= 1 << 14;
    }
    if (actionemail) {
      schedule_action_mask |= 1 << 16;
    }
    if (actionsnapshot) {
      schedule_action_mask |= 1 << 12;
    }
    if (actionaudio) {
      schedule_action_mask |= 1 << 17;
    }
    if (actionevtserver) {
      schedule_action_mask |= 1 << 18;
    }
    if (rsio) {
      schedule_action_mask |= 1 << 19;
    }
    fun_save_motion_schedule();
  }
}
function fun_compare_sande(starttime, endtime) {
  var attrstarttime = starttime.split(':');
  var attrendtime = endtime.split(':');
  for (var i = 0; i < 3; i++) {
    if (!attrstarttime[i].match('^[0-9]+$') || !attrendtime[i].match('^[0-9]+$')) {
      return true;
    }
  }
  var start = parseInt(attrstarttime[0]) * 3600 + parseInt(attrstarttime[1]) * 60 + parseInt(attrstarttime[2]);
  var end = parseInt(attrendtime[0]) * 3600 + parseInt(attrendtime[1]) * 60 + parseInt(attrendtime[2]);
  if (start > end) {
    return true;
  }
}
function fun_on_weekday_alldays() {
  var bchecked = document.getElementById('check_weekday_alldays').checked;
  if (bchecked == true) {
    document.getElementById('check_weekday_monday').checked = true;
    document.getElementById('check_weekday_tuesday').checked = true;
    document.getElementById('check_weekday_wednesday').checked = true;
    document.getElementById('check_weekday_thursday').checked = true;
    document.getElementById('check_weekday_friday').checked = true;
    document.getElementById('check_weekday_saturday').checked = true;
    document.getElementById('check_weekday_sunday').checked = true;
  } else {
    $('#check_weekday_monday,#check_weekday_tuesday,#check_weekday_wednesday,#check_weekday_thursday,#check_weekday_friday,#check_weekday_saturday,#check_weekday_sunday').removeAttr('checked');
    if (g_current_set_day == 1) {
      document.getElementById('check_weekday_monday').checked = true;
    } else if (g_current_set_day == 2) {
      document.getElementById('check_weekday_tuesday').checked = true;
    } else if (g_current_set_day == 3) {
      document.getElementById('check_weekday_wednesday').checked = true;
    } else if (g_current_set_day == 4) {
      document.getElementById('check_weekday_thursday').checked = true;
    } else if (g_current_set_day == 5) {
      document.getElementById('check_weekday_friday').checked = true;
    } else if (g_current_set_day == 6) {
      document.getElementById('check_weekday_saturday').checked = true;
    } else if (g_current_set_day == 7) {
      document.getElementById('check_weekday_sunday').checked = true;
    }
  }
}

function fun_save_motion_schedule() {
  var schedulealldays = document.getElementById('radio_schedule_alldays').checked;
  var scheduleenable = document.getElementById('radio_schedule_enable').checked;
  var scheduleactive = 0;
  if (schedulealldays) {
    scheduleactive = 1;
  } else if (scheduleenable) {
    scheduleactive = 2;
  }
  var scheduleduration = document.getElementById('input_motion_mintime_text').value;

  if (scheduleduration <= 0 || scheduleduration > 300) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<alarmevt ver="2.0">' +
    '<active>' +
    scheduleactive +
    '</active>' +
    '<duration>' +
    scheduleduration +
    '</duration>' +
    '<outmask>' +
    schedule_action_mask +
    '</outmask>' +
    '<schedule>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection1.start, real_schedule_timesection[0].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection2.start, real_schedule_timesection[0].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection3.start, real_schedule_timesection[0].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection4.start, real_schedule_timesection[0].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection5.start, real_schedule_timesection[0].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[0].tsection6.start, real_schedule_timesection[0].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection1.start, real_schedule_timesection[1].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection2.start, real_schedule_timesection[1].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection3.start, real_schedule_timesection[1].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection4.start, real_schedule_timesection[1].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection5.start, real_schedule_timesection[1].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[1].tsection6.start, real_schedule_timesection[1].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection1.start, real_schedule_timesection[2].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection2.start, real_schedule_timesection[2].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection3.start, real_schedule_timesection[2].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection4.start, real_schedule_timesection[2].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection5.start, real_schedule_timesection[2].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[2].tsection6.start, real_schedule_timesection[2].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection1.start, real_schedule_timesection[3].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection2.start, real_schedule_timesection[3].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection3.start, real_schedule_timesection[3].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection4.start, real_schedule_timesection[3].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection5.start, real_schedule_timesection[3].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[3].tsection6.start, real_schedule_timesection[3].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection1.start, real_schedule_timesection[4].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection2.start, real_schedule_timesection[4].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection3.start, real_schedule_timesection[4].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection4.start, real_schedule_timesection[4].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection5.start, real_schedule_timesection[4].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[4].tsection6.start, real_schedule_timesection[4].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection1.start, real_schedule_timesection[5].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection2.start, real_schedule_timesection[5].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection3.start, real_schedule_timesection[5].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection4.start, real_schedule_timesection[5].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection5.start, real_schedule_timesection[5].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[5].tsection6.start, real_schedule_timesection[5].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '<day>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection1.start, real_schedule_timesection[6].tsection1.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection2.start, real_schedule_timesection[6].tsection2.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection3.start, real_schedule_timesection[6].tsection3.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection4.start, real_schedule_timesection[6].tsection4.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection5.start, real_schedule_timesection[6].tsection5.end) +
    '</tsection>' +
    '<tsection>' +
    fun_convert_serverfmt(real_schedule_timesection[6].tsection6.start, real_schedule_timesection[6].tsection6.end) +
    '</tsection>' +
    '</day>' +
    '</schedule>' +
    '</alarmevt>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=alarm&type=2', targetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
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

function fun_init_timer_section_item() {
  timereidt('timeredit_one_start');
  timereidt('timeredit_one_end');
  timereidt('timeredit_two_start');
  timereidt('timeredit_two_end');
  timereidt('timeredit_three_start');
  timereidt('timeredit_three_end');
  timereidt('timeredit_four_start');
  timereidt('timeredit_four_end');
  timereidt('timeredit_five_start');
  timereidt('timeredit_five_end');
  timereidt('timeredit_six_start');
  timereidt('timeredit_six_end');

  timereidt('timeredit_one_start').setvalue('00:00:00');
  timereidt('timeredit_one_end').setvalue('00:00:00');
  timereidt('timeredit_two_start').setvalue('00:00:00');
  timereidt('timeredit_two_end').setvalue('00:00:00');
  timereidt('timeredit_three_start').setvalue('00:00:00');
  timereidt('timeredit_three_end').setvalue('00:00:00');
  timereidt('timeredit_four_start').setvalue('00:00:00');
  timereidt('timeredit_four_end').setvalue('00:00:00');
  timereidt('timeredit_five_start').setvalue('00:00:00');
  timereidt('timeredit_five_end').setvalue('00:00:00');
  timereidt('timeredit_six_start').setvalue('00:00:00');
  timereidt('timeredit_six_end').setvalue('00:00:00');
}

function fun_show_setup_dialog(bshow) {
  if (bshow) {
    var strschedule = translate_page_item(TARGET_PAGE_COMMON, 'schedule', '', ITEM_TYPE_NONE);
    $('#div_motion_schedule_setdialog').dialog({
      modal: true,
      title: strschedule,
      width: 920,
      height: 352,
      resizable: false
    });
  } else {
    $('#div_motion_schedule_setdialog').dialog('destroy');
    $('#div_motion_schedule_setdialog').css('display', 'none');
  }
}
