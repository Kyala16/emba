var g_nWindowWidth = 0,
  g_nWindowHeight = 0;
var g_pluginwidth, g_pluginheight;
var bpluginload = false;
//var qt_ws//待实例化的qt插件
//var qtStatus = false;//qt状态（false,未连接成功，true连接成功）
//  var TIMEOUT = 600000
//   function getStartTime(){
//     let start = localStorage.getItem('loginTimeoutStart')
//     return parseInt(start,10);
//   }
//   function clearTimeoutData() {
//     localStorage.removeItem('loginTimeoutStart');
//   }
//   function checkTimeout() {
//     const startTime = getStartTime();
//     const elapsed = new Date().getTime() - startTime;

//     if (elapsed >= TIMEOUT) {
//       clearTimeoutData();
//       window.location.href = 'login.html'; 
//     } else {
//       setTimeout(() => {
//         clearTimeoutData();
//         window.location.href = 'login.html';
//       }, TIMEOUT - elapsed);
//     }
//   }
$(document).ready(function () {

  fun_multilang_adapter();
  // qt_ws = new QT_WS();//实例化qt插件
  $('#button_playback_control_fullscreen,#button_playback_control_frame').hide();
  // qt_ws.onopen((res) => {
  //   qtStatus = true;
  //   qt_ws.destroyWindow();
  //   $('#button_playback_control_slow,#button_playback_control_play,#button_playback_control_fast,#button_playback_control_speakeroff').show();
  // })
  // qt_ws.onerror(err => {
  //   if (err) qtStatus = false;
  // })
 // qtStatus = false;
  $(window).resize(function () {
    var nWindowWidth = $(window).width();
    var nWindowHeight = document.body.clientHeight;
    var nVscrollWidth = window.innerWidth - document.body.clientWidth;
    if (window.innerHeight) winHeight = window.innerHeight;
    else if (document.body && document.body.clientHeight) winHeight = document.body.clientHeight;
    nWindowHeight = winHeight;
    if (nVscrollWidth > 0) {
      nWindowWidth = nWindowWidth + nVscrollWidth;
    }

    $('.div_content').css({ height: nWindowHeight - 74, width: '100%' });
    $('#div_playback_media_area').css('width', nWindowWidth - 232);
    $('#div_playback_window_area').css({ height: nWindowHeight - 212, width: nWindowWidth - 236 });
    $('#div_playback_control_area').css('width', nWindowWidth - 232);
    $('#div_playback_filelist_area').css('height', nWindowHeight - 78);
    g_pluginheight = nWindowHeight - 214;
    g_pluginwidth = nWindowWidth - 240;

    // if (bpluginload) {
    //   $('#plugin_playback_player').css({ width: g_pluginwidth, height: g_pluginheight });
    // }
    // if (!g_flash_play_stoped) {
    //   $('#plugin_playback_player1').css({ width: g_pluginwidth, height: g_pluginheight });
    // }

    g_nWindowWidth = nWindowWidth;
    g_nWindowHeight = nWindowHeight;
    if (null != g_handle_timeline) {
      g_handle_timeline.resize();
    }
  });
  fun_AllEvent();
});

$(window).on('load',function () {
  var nWindowWidth = $(window).width();
  var nWindowHeight = $(window).height();
  var nScrollWidth = window.innerWidth - document.body.clientWidth;
  $('.div_content').css({ height: nWindowHeight - 74, width: '100%' });
  $('#div_playback_media_area').css('width', nWindowWidth - 232);
  $('#div_playback_window_area').css({ height: nWindowHeight - 212, width: nWindowWidth - 236 });
  $('#div_playback_control_area').css('width', nWindowWidth - 232);
  $('#div_playback_filelist_area').css('height', nWindowHeight - 78);
  g_pluginheight = nWindowHeight - 214;
  g_pluginwidth = nWindowWidth - 240;
  $('#div_preview').css('font-size', '14px');
  $('#div_playback').css({
    'background-color': 'rgb(123, 185, 51)',
    'font-size': '15px',
    color: 'white'
  });
  $('#div_configuration').css('font-size', '14px');
  g_nWindowWidth = nWindowWidth;
  g_nWindowHeight = nWindowHeight;
  fun_multilang_adappter();
  // fun_show_playback_plugin();
  fun_initialize_page_components();
  fun_register_playcontrol_event();
});
function fun_AllEvent() {
  $('.div_main_button').click(function () {
    if (this.id == 'div_preview') {
      fun_toTagetpage('preview.html');
    } else if (this.id == 'div_playback') {
      fun_toTagetpage('playback.html');
    } else if (this.id == 'div_configuration') {
      fun_toTagetpage('configuration.html');
    }
  });
  $('#img_btn_exit,#img_btnexit_text').click(function () {
    //exitQT();
    fun_toTagetpage('login.html');
  });
}
function fun_multilang_adappter() {
  translate_page_item(TARGET_PAGE_PLAYBACK, 'stopplay', 'button_playback_control_stop', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'slowplay', 'button_playback_control_slow', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'startplay', 'button_playback_control_play', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'pauseplay', 'button_playback_control_pause', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'fastplay', 'button_playback_control_fast', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'frameplay', 'button_playback_control_frame', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'downloadrec', 'button_playback_control_download', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'fullscreen', 'button_playback_control_fullscreen', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'videoclip', 'button_playback_control_clipvideo', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'speakeron', 'button_playback_control_speakeron', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'speakeroff', 'button_playback_control_speakeroff', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'startsearch', 'button_search_record_file', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'manualrec', 'div_manual_color_piece_decl', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'otheralarmrec', 'div_alarm_color_piece_decl', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PLAYBACK, 'continuousrec', 'div_schedule_color_piece_decl', ITEM_TYPE_TEXT);

  //--------alarm ----
  const ReturnStr = (e, type) => {
    return translate_page_item(type || TARGET_PAGE_PLAYBACK, e, '', ITEM_TYPE_NONE);
  }
  const alarmStr = ReturnStr('alarmrec');
  const alarmArr = [
    { str: 'motionalarm', item: 'div_alarm_color_piece_decl_motion' },
    { str: 'petdetect', item: 'div_alarm_color_piece_decl_petdetect' },
    { str: 'vehicledct', item: 'div_alarm_color_piece_decl_vehicledetect' },
    { str: 'facedetect', item: 'div_alarm_color_piece_decl_facedetection' },
    { str: 'bodydetect', item: 'div_alarm_color_piece_decl_human' },
  ]
  const motionStr = translate_page_item(TARGET_PAGE_CONFIGURATION, 'motion', '', ITEM_TYPE_NONE);
  for (let i = 0; i < alarmArr.length; i++) {
    const ele = alarmArr[i];
    const isAlarm = ReturnStr(ele.str, TARGET_PAGE_PREVIEW);//motion
    $(`#${ele.item}`).text(ele.str == 'motionalarm' ? motionStr :isAlarm )
  }
  //--------alarm end-----
}

function fun_toTagetpage(pagefile) {
  window.location.href = pagefile;
}
function CurBrowserIsIE() {
  //取消qt插件播放
  //if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;
  return false;
}
function fun_get_login_userauth() {
  
  sdk_getipcparam('/action/get?subject=user', function (result) {
     if (result == false) {
      window.location.href = 'login.html';
      return;
    }
    $xml = $(result);
    $xml.find('user').each(function () {
      var username = $(this).find('name').text();
      var option = $(this).find('operation').text();
      
      if (username) {
        $('#span_username').text(username);
        if (option & 2) {
          fun_initialize_playback(true);
        } else {
          fun_initialize_playback(false);
        }
        return;
      }
    });
  });
}

function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_COMMON, 'liveplay', 'div_preview', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'playback', 'div_playback', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'configure', 'div_configuration', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'exit', 'img_btnexit_text', ITEM_TYPE_TEXT);
}

function fun_initialize_playback(bshow) {
  if (!bshow) {
    var strtips = translate_page_item(TARGET_PAGE_PLAYBACK, 'noauth', '', ITEM_TYPE_NONE);
    $('#div_playback_window_area').html("<div  style='width: 100%;height: 48px;text-align: center;margin-top: 200px;color: rgb(123, 185, 51);'>" + strtips + '</div>');
    return;
  }
  // if (!plugin_playback_player.contentDocument) {
  //   return;
  // }
  // bpluginload = true;
  // var version = plugin_playback_player.GetVersion();
  // var verlist = version.split('.');
  // var majorver = parseInt(verlist[0]);
  // var minorver = parseInt(verlist[1]);
  // if (majorver < 3 || (majorver === 3 && minorver < 28)) {
  //   var strtips = translate_page_item(TARGET_PAGE_TIPSTEXT, 'downocx', '', ITEM_TYPE_NONE);
  //   $('#div_playback_window_area').html("<div  style='width: 100%;height: 48px;text-align: center;margin-top: 200px;'><a href='/setup.exe' style='color: #1baafb;'>" + strtips + '</a></div>');
  //   return;
  // }
  // plugin_playback_player.InitUI(0);
  // plugin_playback_player.SetLanguage(current_language_number());
  // var username = $.cookie('bvusername');
  // var password = $.cookie('bvpassword');

  // sdk_getipcparam('/action/get?subject=netserv', function (result) {
  //   if (result != false) {
  //     $xml = $(result);
  //     var tcpport = $xml.find('tcp').text();
  //     plugin_playback_player.SetLoginInfo(0, username, password, document.location.hostname, tcpport);
  //     plugin_playback_player.LoginIPC();
  //   }
  // });
}
function fun_on_plugin_load() {
  fun_get_login_userauth();
}




function fun_register_playcontrol_event() {
  $('.img_button_cut').hover(function () {
    var objid = this.id.toString();
    if (objid == 'button_playback_control_stop') {
      $('#button_playback_control_stop').attr('src', '/ui/images/playback/stop1.png');
    } else if (objid == 'button_playback_control_slow') {
      $('#button_playback_control_slow').attr('src', '/ui/images/playback/slow1.png');
    } else if (objid == 'button_playback_control_play') {
      $('#button_playback_control_play').attr('src', '/ui/images/playback/play1.png');
    } else if (objid == 'button_playback_control_pause') {
      $('#button_playback_control_pause').attr('src', '/ui/images/playback/pause1.png');
    } else if (objid == 'button_playback_control_fast') {
      $('#button_playback_control_fast').attr('src', '/ui/images/playback/fast1.png');
    } else if (objid == 'button_playback_control_frame') {
      $('#button_playback_control_frame').attr('src', '/ui/images/playback/frame1.png');
    }
  });
  $('.img_button_cut').mouseout(function () {
    var objid = this.id.toString();
    if (objid == 'button_playback_control_stop') {
      $('#button_playback_control_stop').attr('src', '/ui/images/playback/stop.png');
    } else if (objid == 'button_playback_control_slow') {
      $('#button_playback_control_slow').attr('src', '/ui/images/playback/slow.png');
    } else if (objid == 'button_playback_control_play') {
      $('#button_playback_control_play').attr('src', '/ui/images/playback/play.png');
    } else if (objid == 'button_playback_control_pause') {
      $('#button_playback_control_pause').attr('src', '/ui/images/playback/pause.png');
    } else if (objid == 'button_playback_control_fast') {
      $('#button_playback_control_fast').attr('src', '/ui/images/playback/fast.png');
    } else if (objid == 'button_playback_control_frame') {
      $('#button_playback_control_frame').attr('src', '/ui/images/playback/frame.png');
    }
  });
  $('.img_button_cut_right').hover(function () {
    var objid = this.id.toString();
    if (objid == 'button_playback_control_download') {
      $('#button_playback_control_download').attr('src', '/ui/images/playback/download1.png');
    } else if (objid == 'button_playback_control_fullscreen') {
      $('#button_playback_control_fullscreen').attr('src', '/ui/images/videocontrol/fullscreenhover.png');
    } else if (objid == 'button_playback_control_clipvideo') {
      $('#button_playback_control_clipvideo').attr('src', '/ui/images/playback/clip1.png');
    } else if (objid == 'button_playback_control_speakeron') {
      $('#button_playback_control_speakeron').attr('src', '/ui/images/videocontrol/volumehover.png');
    } else if (objid == 'button_playback_control_speakeroff') {
      $('#button_playback_control_speakeroff').attr('src', '/ui/images/videocontrol/mutehover.png');
    }
    clearTimeout(volumeTimer);
    if (objid == 'button_playback_control_speakeron') {
      $('#div_slider_volume').show();
    }
    if (objid == 'button_playback_control_speakeroff') {
      $('#div_slider_volume').hide();
    }
    });

  $('#div_slider_volume').hover(function () {
    clearTimeout(volumeTimer);
    $('#div_slider_volume').show();
  })
  $('#div_slider_volume').mouseout(function () {
    clearTimeout(volumeTimer);
    volumeTimer = setTimeout(() => {
      $('#div_slider_volume').hide();
    }, 700);
  })

  $('.img_button_cut_right').mouseout(function () {
    var objid = this.id.toString();
    if (objid == 'button_playback_control_download') {
      $('#button_playback_control_download').attr('src', '/ui/images/playback/download.png');
    } else if (objid == 'button_playback_control_fullscreen') {
      $('#button_playback_control_fullscreen').attr('src', '/ui/images/videocontrol/fullscreen.png');
    } else if (objid == 'button_playback_control_clipvideo') {
      $('#button_playback_control_clipvideo').attr('src', '/ui/images/playback/clip.png');
    } else if (objid == 'button_playback_control_speakeron') {
      $('#button_playback_control_speakeron').attr('src', '/ui/images/videocontrol/volume.png');
    } else if (objid == 'button_playback_control_speakeroff') {
      $('#button_playback_control_speakeroff').attr('src', '/ui/images/videocontrol/mute.png');
    }
    if (objid == 'button_playback_control_speakeron') {
      volumeTimer = setTimeout(() => {
        $('#div_slider_volume').hide();
      }, 700);
    }

  });
  $('#button_search_record_file').click(function () {
    fun_on_button_search();
  });
  $('.img_button_cut').click(function () {
    var objid = this.id.toString();
    if (objid == 'button_playback_control_stop') {
      fun_on_control_button_click(BUTTON_FLAG_STOP);
    } else if (objid == 'button_playback_control_slow') {
      fun_on_control_button_click(BUTTON_FLAG_SLOW);
    } else if (objid == 'button_playback_control_play') {
      fun_on_control_button_click(BUTTON_FLAG_PLAY);
    } else if (objid == 'button_playback_control_pause') {
      fun_on_control_button_click(BUTTON_FLAG_PAUSE);
    } else if (objid == 'button_playback_control_fast') {
      fun_on_control_button_click(BUTTON_FLAG_FAST);
    } else if (objid == 'button_playback_control_frame') {
      fun_on_control_button_click(BUTTON_FLAG_FRAME);
    }
  });
  $('.img_button_cut_right').click(function () {
    var objid = this.id.toString();
    if (objid == 'button_playback_control_download') {
      fun_on_control_button_click(BUTTON_FLAG_DOWNLOAD);
    } else if (objid == 'button_playback_control_fullscreen') {
      fun_on_control_button_click(BUTTON_FLAG_FULLSCREEN);
    } else if (objid == 'button_playback_control_clipvideo') {
      fun_on_control_button_click(BUTTON_FLAG_CLIP);
    } else if (objid == 'button_playback_control_speakeron') {
      fun_on_control_button_click(BUTTON_FLAG_MUTE);
    } else if (objid == 'button_playback_control_speakeroff') {
      fun_on_control_button_click(BUTTON_FLAG_SPEAKERON);
    }
  });
  $('.img_button_cut_min').click(function () {
    if (this.id.toString() == 'button_playback_control_stretch') {
      if (null != g_handle_timeline) {
        g_handle_timeline.shrink();
      }
    } else {
      if (null != g_handle_timeline) {
        g_handle_timeline.stretch();
      }
    }
  });
}
var bv = null;
var time = 0;
var flvurl = '';
var g_current_browser_isie = false;
var g_handle_timeline = null;
var g_record_file_list = null;
var g_play_time = 3600;
var g_current_date = '';
var g_status_count = 0;
var g_view_mask = 0;
var g_interid = null;
var g_flash_play_stoped = true;
var g_flash_play_ssid = 0;
var g_playback_speed = 0;
var g_playback_play_frame = false;
var BUTTON_FLAG_STOP = 0;
var BUTTON_FLAG_SLOW = 1;
var BUTTON_FLAG_PLAY = 6;
var BUTTON_FLAG_PAUSE = 7;
var BUTTON_FLAG_FAST = 2;
var BUTTON_FLAG_FRAME = 3;
var BUTTON_FLAG_SPEAKERON = 8;
var BUTTON_FLAG_CLIP = 4;
var BUTTON_FLAG_FULLSCREEN = 5;
var BUTTON_FLAG_DOWNLOAD = 9;
var BUTTON_FLAG_MUTE = 10;
function fun_initialize_page_components() {
  $('#div_playback_calender').datepicker({
    inline: true,
    showOtherMonths: true,
    onSelect: fun_on_datechange,
    onChangeMonthYear: fun_on_mouthyear_change
  });
  if (current_language_number() === 4) {
    $('#div_playback_calender').datepicker('option', $.datepicker.regional['zh']);
  } else if (current_language_number() === 25) {
    $('#div_playback_calender').datepicker('option', $.datepicker.regional['ru']);
  } else if (current_language_number() === 21) {
    $('#div_playback_calender').datepicker('option', $.datepicker.regional['pl']);
  } else if (current_language_number() === 17) {
    $('#div_playback_calender').datepicker('option', $.datepicker.regional['ja']);
  } else if (current_language_number() === 7) {
    $('#div_playback_calender').datepicker('option', $.datepicker.regional['de']);
  } else {
    $('#div_playback_calender').datepicker('option', $.datepicker.regional['']);
  }
  $('#div_playback_calender').datepicker('option', 'dateFormat', 'yy-mm-dd');
  g_handle_timeline = timeline('div_playback_control_timeline_content');
  g_handle_timeline.startdraw();
  g_handle_timeline.setplaytime(g_play_time);
  g_handle_timeline.addevent('doubleclk', fun_on_timeline_doubleclick);
  var curdate = new Date();
  var year = curdate.getFullYear();
  var month = curdate.getMonth();
  fun_on_mouthyear_change(year, month + 1);
  $('#div_slider_volume').slider({
    orientation: 'vertical',
    range: 'min',
    max: 100,
    value: 0,
    animate: true,
    change: function (e, ui) {
      const val = ui.value
     // qt_ws.setVolume(qt_mute, val, 1);
      //qt_volume = val;
      // qt_volume,qt_mute;
    }
  });
}
function fun_on_datechange(tagdate) {
  setTimeout(fun_set_calender_mask, 100);
}
function fun_on_mouthyear_change(tagyear, tagmonth) {
  var stryear = String(tagyear);
  var strmonth = String(tagmonth);
  if (strmonth.length === 1) {
    strmonth = '0' + strmonth;
  }
  fun_get_devability()
  fun_get_recordfile_by_month(stryear + strmonth);
}
function fun_set_calender_mask() {
  $('#div_playback_calender')
    .find('a')
    .each(function (index) {
      var curday = parseInt($(this).text());
      if (!isNaN(curday)) {
        if (g_view_mask & (0x01 << (curday - 1))) {
          this.style.background = 'rgb(123, 185, 51)';
        } else {
          this.style.background = '';
        }
      }
    });
}
setInterval(function () {
  if (null != g_handle_timeline) {
    if (bv != null) {
      if (!g_flash_play_stoped) {
        var nts = parseInt(bv.currentTime);
        var curtime = time + nts;
        if (g_play_time !== Math.floor(curtime)) {
          g_handle_timeline.setplaytime(Math.floor(curtime));
          g_play_time = Math.floor(curtime);
        }
        if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
          return;
        }
      }
    } else {
      // console.log(qtStatus);
    }
  }
}, 200);

function fun_record_section_item(starts, ends, type, filepath, size, audioen, acodec, event) {
  return { startsec: starts, endsec: ends, rectype: type, fullpath: filepath, filesize: size, audioen, acodec, event };
}
function fun_on_button_search() {
  var seldate = $('#div_playback_calender').datepicker('getDate');
  var stryear = String(seldate.getFullYear());
  var strmonth = String(seldate.getMonth() + 1);
  var strday = String(seldate.getDate());
  if (strmonth.length === 1) {
    strmonth = '0' + strmonth;
  }
  if (strday.length === 1) {
    strday = '0' + strday;
  }
  g_current_date = stryear + strmonth + strday;
  fun_get_recordfile_by_date(stryear + strmonth + strday);
}
// function qtWindowsPosition() {
//   const playbackEle = '#div_playback_window_area'
//   const { isLeft, isTop, outerHeight, innerHeight, } = getAutoWH(playbackEle);
//   let x = isLeft;
//   let y = isTop + (outerHeight - innerHeight);
//   const w = $(playbackEle).css('width');
//   const h = $(playbackEle).css('height');
//   return { x, y, w, h }
// }
// function visibilitychange(tagtime) {//监听选项卡-函数
//   if (document.hidden) {
//     // 选项卡被切换，执行需要的操作
//     qt_ws.hideWindow();
//   } else {
//     const year = Number(String(g_current_date).substring(0, 4));
//     const month = Number(String(g_current_date).substring(4, 6));
//     const day = Number(String(g_current_date).substring(6, 8));
//     const date = { day, month, year, }
//     qt_ws.backRecord(date, time, 86400);
//     const { x, y, w, h } = qtWindowsPosition();
//     qt_ws.showVideo(x, y, w, h, true);
//     console.log('选项卡恢复');
//     // 选项卡恢复，执行需要的操作
//   }
// }
var isFocusTimer = null;
let isShow = false;
//var qtWindow_x, qtWindow_y;
function fun_on_timeline_doubleclick(tagtime, audioen, acodec) {
  g_play_time = Math.floor(tagtime);
  time = tagtime;
  if (qtStatus) {//qt插件端
    // clearInterval(isFocusTimer);
    // isShow = false
    // g_handle_timeline.setplaytime(Math.floor(tagtime));
    // if (!isShow) {
    //   const year = Number(String(g_current_date).substring(0, 4));
    //   const month = Number(String(g_current_date).substring(4, 6));
    //   const day = Number(String(g_current_date).substring(6, 8));
    //   const date = { day, month, year, }
    //   qt_ws.backRecord(date, tagtime, 86400);
    //   const { x, y, w, h } = qtWindowsPosition();
    //   qt_ws.showVideo(x, y, w, h, true);
    //   qt_ws.getVerison();
    //   setTimeout(() => {
    //     qt_ws.setVolume(qt_mute, qt_volume, 1)// // qt_volume,qt_mute;
    //   }, 2000);
    //   isShow = true;
    //   document.removeEventListener('visibilitychange', visibilitychange)
    //   $('#button_playback_control_play').hide();
    //   $('#button_playback_control_pause').show();
    // }
    // window.onfocus = function () {
    //   //在当前窗口
    //   if (!isShow) return;
    //   const { x, y, w, h } = qtWindowsPosition();
    //   if (isShow && qtWindow_x != x && qtWindow_y != y) return;
    //   qt_ws.showVideo(x, y, w, h, true);
    // }
    // isFocusTimer = setInterval(() => {//执行一次随窗口移动的 定时器
    //   const { x, y, w, h } = qtWindowsPosition();
    //   if (isShow && qtWindow_x == x && qtWindow_y == y && qtWindow_h == h && qtWindow_w == w) return;


    //    if ($('#button_playback_control_play').css('display') == 'block') return;//停止状态
    //     qt_ws.showVideo(x, y, w, h, true);
    //     qtWindow_x = x;
    //    qtWindow_y = y;
    //   qtWindow_w = w;
    //   qtWindow_h = h;
    // }, 100);
    // window.onblur = function () {
    //   //不在当前窗口
    //   if (!isShow) return;
    //   const { x, y, w, h } = qtWindowsPosition();
    //   qt_ws.showVideo(x, y, w, h, false);
    //   qtWindow_x = x;
    //   qtWindow_y = y;
    // }
    // document.addEventListener('visibilitychange', visibilitychange);
    // document.onmousedown = function () {
    //   if (isShow) {
    //     const { x, y, w, h } = qtWindowsPosition();
    //     qt_ws.showVideo(x, y, w, h, true);
    //   }
    // };

  } else {//web端 var playbackEle = '#div_playback_window_area';
    if (bv != null) {
      bv.unload();
      bv.detachMediaElement();
      bv.destroy();
      g_flash_play_stoped = true;
    }
    // $("#div_playback_window_area").html("");
    bv = null;
    if (audioen == undefined || acodec == undefined) {
      g_handle_timeline.setplaytime(Math.floor(tagtime));
      g_play_time = Math.floor(tagtime);
      return;
    }
    var curlanguage = window.sessionStorage.getItem('bvlanguage');
    var xglang;
    var lang_Arr = [
      { cur: 'Chinese', xg: 'zh-cn' },
      { cur: 'Russian', xg: 'ru' },
      { cur: 'Polish', xg: 'po' },
      { cur: 'Japanese', xg: 'jp' },
      { cur: 'German', xg: 'gm' },
      { cur: 'Korean', xg: 'ko' },
      { cur: 'ChineseTW', xg: 'ch' },
      { cur: 'English', xg: 'en' },
    ]
    for (var i = 0; i < lang_Arr.length; i++) {
      if (curlanguage == lang_Arr[i].cur) xglang = lang_Arr[i].xg;
    }

    g_play_time = parseInt(tagtime);
    var tagdatetime = g_current_date + '-' + tagtime + '-86400';
    var uuid = Math.round(Math.random() * 4200000);
    g_flash_play_ssid = String(uuid);
    flvurl = '/action/stream?subject=flvplayback&date=' + String(g_current_date) + '&time=' + tagtime + '-86400&sid=' + String(uuid);
    $('#div_playback_window_area').html('<video id="videoElement" name="videoElement" class="centeredVideo" controls autoplay playsinline muted disablePictureInPicture></video>');
    var videoElement = document.getElementById('videoElement');
    if (bv == null) {
      videoElement.addEventListener('click', function mouseHandler(e) { e.preventDefault(); }, false);// 阻止视频默认点击事件
      videoElement.muted = true;
      bv = window.mpegts.createPlayer(
        {
          type: 'flv',
          url: document.location.origin + flvurl,
          withCredentials: false,
          autoplay: true
        },
        {
          lazyLoadMaxDuration: 3 * 60,
          seekType: 'range'
        }
      );
      bv.attachMediaElement(videoElement);
      bv.load();
      bv.play();
      videoElement.addEventListener('ended',
        function fn() {
          if (bv != null) {
            bv.unload();
            bv.detachMediaElement();
            bv.destroy();
            bv = null;
          }
          g_flash_play_stoped = true;
          $('#button_search_record_file').removeAttr('disabled');
        },
        false
      );
    }
    g_flash_play_stoped = false;
  }
  $('#button_search_record_file').attr('disabled', 'disabled');
}
function fun_on_control_button_click(btnflag) {
  if (btnflag === BUTTON_FLAG_STOP) {
    if (isShow && qtStatus && qt_ws) {
      //  if (!isShow) return;
      //   qt_ws.playStop();
      //  qt_ws.destroyWindow();
      //   qt_ws.hideWindow();
      //   $('#button_playback_control_pause').css('display', 'none');
      //   $('#button_playback_control_play').css('display', 'inline');
      //   document.removeEventListener('visibilitychange', visibilitychange)
      //   isShow = false;
     } else {
       bv.destroy(true);
       g_flash_play_stoped = true;
       $('#div_playback_window_area').html('');
        bv = null;
     }
     $('#button_search_record_file').removeAttr('disabled');
    } else if (btnflag === BUTTON_FLAG_SLOW) {
     // if (isShow && qtStatus && qt_ws) {
       // console.log('BUTTON_FLAG_SLOW');
      //  qt_ws.slowPlay();
      //  const { x, y, w, h } = qtWindowsPosition();
      //  qt_ws.showVideo(x, y, w, h, true);
     // }
    } else if (btnflag === BUTTON_FLAG_PLAY) {
   // if (isShow && qtStatus && qt_ws) {
        // console.log('BUTTON_FLAG_PLAY');
        // qt_ws.playStart();
        // $('#button_playback_control_play').css('display', 'none');
        // $('#button_playback_control_pause').css('display', 'inline');
     // }
   } else if (btnflag === BUTTON_FLAG_PAUSE) {
    //if (isShow && qtStatus && qt_ws) {
        // console.log('BUTTON_FLAG_PAUSE');
      //   qt_ws.pausePlay();
      //   const { x, y, w, h } = qtWindowsPosition();
      //   qt_ws.showVideo(x, y, w, h, true);
      //  $('#button_playback_control_pause').css('display', 'none');
      //  $('#button_playback_control_play').css('display', 'inline');
    //  }
    } else if (btnflag === BUTTON_FLAG_FAST) {
    //if (isShow && qtStatus && qt_ws) {
       // console.log('BUTTON_FLAG_FAST');
      //  qt_ws.quickPlay();
      //  const { x, y, w, h } = qtWindowsPosition();
      //   qt_ws.showVideo(x, y, w, h, true);
     //}
   } else if (btnflag === BUTTON_FLAG_FRAME) {
    // if (isShow && qtStatus && qt_ws) {
    //   console.log('BUTTON_FLAG_FRAME');
    //  }
   } else if (btnflag === BUTTON_FLAG_SPEAKERON) {
    // if (isShow && qtStatus && qt_ws) {
    //    $('#button_playback_control_speakeron').css('display', 'inline');
    //    $('#button_playback_control_speakeroff').css('display', 'none');
    //   qt_ws.getVerison();
    //   qt_mute = true;
    //   qt_ws.setVolume(qt_mute, qt_volume, 1)// // qt_volume,qt_mute;
    //   }
   } else if (btnflag === BUTTON_FLAG_CLIP) {
    } else if (btnflag === BUTTON_FLAG_FULLSCREEN) {
    } else if (btnflag === BUTTON_FLAG_DOWNLOAD) {
      fun_show_download_dialog(true);
   } else if (btnflag === BUTTON_FLAG_MUTE) {
    // if (isShow && qtStatus && qt_ws) {
    //    $('#button_playback_control_speakeroff').css('display', 'inline');
    //     $('#button_playback_control_speakeron').css('display', 'none');
    //   qt_mute = false;
    //   qt_ws.setVolume(qt_mute, qt_volume, 1)// // qt_volume,qt_mute;
    // }
  }
}
function fun_get_devability() {
  sdk_getipcparam('/action/get?subject=devability', function (res) {
    if (res != false) {
      $xml = $(res);
      var smartva = parseInt($xml.find('smartva').text());
      // 人脸
      if (!(smartva & (1 << 4))) {
        $('#div_playback_video_type_alarm_facedetection').hide();
      }
      // 人xing
      if (!(smartva & (1 << 3))) {
        $('#div_playback_video_type_alarm_human').hide();
      }
      //车辆
      if (!(smartva & (1 << 10))) {
        $('#div_playback_video_type_alarm_vehicledetect').hide();
      }
      //宠物
      if (!(smartva & (1 << 11))) {
        $('#div_playback_video_type_alarm_petdetect').hide();
      }
    }
  });
}
function fun_get_recordfile_by_month(date) {
  var tagrequest =
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<request>\n' +
    '   <recsearch>\n' +
    '     <mode>0</mode>\n' +
    '     <chn>1</chn> \n' +
    '     <date>' +
    date +
    '</date>\n' +
    '     <begin>0</begin>\n' +
    '     <end>0</end>\n' +
    '     <type>3</type>\n' +
    '     <stream>3<stream/>\n' +
    '    </recsearch>\n' +
    '</request>';
  queryRec(tagrequest, function (res) {
    var datemask = $(res).find('rmask').text();
    if (datemask.length > 0) {
      if (!isNaN(parseInt(datemask))) {
        g_view_mask = parseInt(datemask);
      } else {
        g_view_mask = 0;
      }
    } else {
      g_view_mask = 0;
    }
    setTimeout(fun_set_calender_mask, 100);
  })
}
function fun_get_recordfile_by_date(date) {
  var data =
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<request>\n' +
    '   <recsearch>\n' +
    '     <mode>1</mode>\n' +
    '     <chn>1</chn> \n' +
    '     <date>' +
    date +
    '</date>\n' +
    '     <begin>0</begin>\n' +
    '     <end>86400</end>\n' +
    '     <type>3</type>\n' +
    '     <stream>3<stream/>\n' +
    '    </recsearch>\n' +
    '</request>';
  queryRec(data, function (result) {
    g_record_file_list = new Array();
    g_handle_timeline.clearsections();
    $xml = $(result);
    $xml.find('recorddesc').each(function (index) {
      var begin = $(this).find('begin').text();
      var end = $(this).find('end').text();
      var type = $(this).find('type').text();
      var path = $(this).find('path').text();
      var size = $(this).find('size').text();
      var audioen = $(this).find('audioen').text();
      var acodec = $(this).find('acodec').text();
      var event = $(this).find('event').text();
      if (parseInt(type) === 3) {
        type = 2;
      }
      g_record_file_list[g_record_file_list.length] = new fun_record_section_item(begin, end, type, path, size, audioen, acodec, event);
      g_handle_timeline.addsection(parseInt(begin), parseInt(end), path, parseInt(type), parseInt(audioen), parseInt(acodec), parseInt(event));
    });
  })
}
function queryRec(data, resolve) {//scarch rec data
  $.ajax({
    url: '/action/stream?subject=recsearch',
    type: 'post',
    data,
    dataType: 'html',
    async: false,
    timeout: 2000,
    success: resolve
  });
}
function fun_show_download_dialog(bshow) {
  var screexwidth = window.screen.availWidth;
  var screenheight = window.screen.availHeight;
  var xpos = (screexwidth - 980) / 2;
  var ypos = (screenheight - 614) / 2;
  var ts = Math.random() * 0xffffffff;
  if (false) {
    var result = window.showModelessDialog('/recdownload.html?refer=' + String(ts), window, 'dialogWidth=980px;dialogHeight=614px;status=no');
  } else {
    var result = window.open('/recdownload.html?refer=' + String(ts), '_blank', 'modal=yes,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=980, height=614,left=' + String(xpos) + ',top=' + String(ypos) + '');
  }
}
