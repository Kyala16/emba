var g_bShowPtzWindow = false;
var browserisie = false;
var g_nWindowWidth = 0,
  g_nWindowHeight = 0;
var g_nplugin_width, g_nplugin_height;
var g_npreset_items = 128;
var g_ncruise_count = 3;
var g_accordion_secount = 4;
var g_ocx_plugin = null;
var g_stream_port = 6000;
var bv = null;
var switch_channel = 0;
var g_wiper = 0; //
var g_recordsPath, g_snapPath;

$(document).ready(function () {
  fun_init_page_ui();
  fun_device_ability();
  fun_get_current_video_resolution(0);
  fun_multilang_adapter();
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
    $('.div_content').css('height', nWindowHeight - 74);
    g_nWindowWidth = nWindowWidth;
    g_nWindowHeight = nWindowHeight;
    g_nplugin_height = nWindowHeight - 130;
    if (g_ptzoraf_support) {
      if (g_bShowPtzWindow) {
        $('#div_media_content').css({ width: nWindowWidth - 240, height: nWindowHeight - 88 });
        g_nplugin_width = nWindowWidth - 252;
        $('#div_video_player_show').css('width', g_nWindowWidth - 244);
      } else {
        $('#div_media_content').css({ width: nWindowWidth - 22, height: nWindowHeight - 88 });
        $('#div_video_player_show').css('width', g_nWindowWidth - 26);
        g_nplugin_width = nWindowWidth - 32;
      }
    } else {
      $('#div_media_content').css({ width: nWindowWidth - 16, height: nWindowHeight - 88 });
      $('#div_video_player_show').css('width', g_nWindowWidth - 19);
      g_nplugin_width = nWindowWidth - 24;
    }
    $('#div_video_player_show').css('height', nWindowHeight - 126);
    $('#div_hide_button').css('margin-top', (nWindowHeight - 160) / 2);
    $('#div_ptzctrl_area').css('height', nWindowHeight - 83);
    $('#div_preset_content').css('height', nWindowHeight - 476);
    if (browserisie) {
      $('#preview_player').css({ width: g_nplugin_width, height: g_nplugin_height });
    } else {
      $('#div_video_player').css({ width: g_nplugin_width, height: g_nplugin_height });
      if (g_video_shot_ratio == 1 || g_video_shot_ratio == 4) {
        $('video').css({ width: g_nplugin_width, height: g_nplugin_height });
      } else if (g_video_shot_ratio == 2) {
        fun_aspect_ratio(4, 3);
      } else if (g_video_shot_ratio == 3) {
        fun_aspect_ratio(16, 9);
      }
    }
    fun_on_video_size_change();
  });
  fun_register_events();
  fun_getalarm_information();
  getfisheyeparam();
  var stream = parseInt(localStorage.getItem('stream'));
  if (stream >= 4) {//三码流
    $('#img_video_stream_channel3').css('display', 'inline-block');
    $('#div_video_stream_select').css('width', 106);
  } else {
    $('#img_video_stream_channel3').css('display', 'none');
    $('#div_video_stream_select').css('width', 72);
  }
  if (stream >= 5) {//四码流
    $('#img_video_stream_channel4').css('display', 'inline-block');
    $('#div_video_stream_select').css('width', 140);
  }
});
$(window).on('load', function () {
  var nWindowWidth = $(window).width();
  var nWindowHeight = $(window).height();
  var nScrollWidth = window.innerWidth - document.body.clientWidth;
  $('.div_content').css('height', nWindowHeight - 74);
  $('#div_preview').css({
    'background-color': 'rgb(123, 182, 51)',
    'font-size': '15px',
    color: 'white'
  });
  $('#div_listitem_preset').addClass('cls_preset_header_selected');
  $('#div_playback').css('font-size', '14px');
  $('#div_configuration').css('font-size', '14px');
  g_nWindowWidth = nWindowWidth;
  g_nWindowHeight = nWindowHeight;
  if (g_ptzoraf_support) {
    if (g_bShowPtzWindow) {
      $('#div_media_content').css({ width: nWindowWidth - 240, height: nWindowHeight - 88 });
      $('#div_video_player_show').css('width', g_nWindowWidth - 244);
    } else {
      $('#div_media_content').css({ width: nWindowWidth - 22, height: nWindowHeight - 88 });
      $('#div_video_player_show').css('width', g_nWindowWidth - 25);
    }
  } else {
    $('#div_media_content').css({ width: nWindowWidth - 16, height: nWindowHeight - 88 });
    $('#div_video_player_show').css('width', g_nWindowWidth - 19);
  }
  g_nplugin_height = nWindowHeight - 130;
  g_nplugin_width = nWindowWidth - 30;
  $('#div_video_player_show').css('height', nWindowHeight - 126);
  $('#div_hide_button').css('margin-top', (nWindowHeight - 160) / 2);
  $('#div_ptzctrl_area').css('height', nWindowHeight - 83);
  $('#div_preset_content').css('height', nWindowHeight - 476);
  var acdheight = nWindowHeight - 37 * g_accordion_secount - 110;
  $('#div_face_detection_show').height(acdheight);
  $('#div_hide_button').html("<img src='/ui/images/hide.png' onclick='fun_switch_ptzwindw_status()'>");
  fun_get_video_image();
  fun_videoShow(0);
  fun_get_login_user();
  fun_InitPrestList();
  fun_init_cruise_list();
  fun_switch_ptzwindw_status();
  fun_AllEvent();
});

var g_user_configmask = 0;
var g_user_optionmask = 0;
function fun_initui_by_auth(configmask, optionmask, cab) {
  g_user_configmask = configmask;
  g_user_optionmask = optionmask;
  var guidemask = 0;
  if (configmask & 128) { }
  if (optionmask & 1) { }
  if (optionmask & 2) {
    $('#div_playback').css('display', 'block')
   }else{
    $('#div_playback').remove()
   }
  if (optionmask & 4) {
      $('#img_button_talkback_off').css('display', 'block')
   }else{
      $('#img_button_talkback_off').remove()
      $('#img_button_talkback_on').remove()
   }
  if (optionmask & 8) {
    guidemask |= 128;
  }
  if (optionmask & 16) {
    $('#div_submenu_item_disk').css('display', 'block');
  } else {
    $('#div_submenu_item_disk').css('display', 'none');
  }
  if (optionmask & 32) {
  }else{
    $('#div_ptz_control_panel').remove()
  }
  if (cab) {//if callback ,to callback
    cab(optionmask)
  }


}

function fun_init_components_ui() {
  $('#div_accordion').accordion({ heightStyle: 'content' });

  $('#div_slider_ptzctrl_speed').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 6,
    min: 1,
    value: 1,
    change: fun_on_slider_change
  });
  $('#div_slider_image_saturation,#div_slider_image_brightness,#div_slider_image_contrast,#div_slider_image_sharpness').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 0,
    change: fun_on_slider_change
  });
  $('#div_slider_fisheye_centerx,#div_slider_fisheye_centery').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 127,
    min: -127,
    value: 0,
    change: fun_on_fisheye_param_change
  });
  $('#div_slider_fisheye_inner').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 98,
    min: 0,
    value: 0,
    change: fun_on_fisheye_param_change
  });
  $('#div_slider_fisheye_outer').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    min: 2,
    value: 0,
    change: fun_on_fisheye_param_change
  });
  $('#div_slider_fisheye_angle').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 359,
    min: 0,
    value: 0,
    change: fun_on_fisheye_param_change
  });
  // -----------------------------------

  $('#div_slider_volume').slider({
    orientation: 'vertical',
    range: 'min',
    max: 100,
    value: 0,
    animate: true,
    change: function (e, ui) {
      const val = ui.value
      // qt_ws.setVolume(qt_mute, val, 0);
      // qt_volume = val;
      // qt_volume,qt_mute;
    }
  });
  //-------------------------------------------
  $('#div_slider_fisheye_centerx').slider('disable');
  $('#div_slider_fisheye_centery').slider('disable');
  $('#div_slider_fisheye_inner').slider('disable');
  $('#div_slider_fisheye_outer').slider('disable');
  $('#div_slider_fisheye_angle').slider('disable');
  $('#button_fisheye_param_save').attr('disabled', true);
  fun_get_videoimage_parameters();
  getptzparam();
  initialize_cruise_item_points();
  initialize_cruise_add_preset_list();
  initialize_trackpath_list();
}
function fun_get_login_user() {
    sdk_getipcparam('/action/get?subject=user&method=wsid', function (result) {
     if (result == false) {
      window.location.href = 'login.html';
      return;
    }
    $xml = $(result);
    $xml.find('user').each(function () {
      var username = $(this).find('name').text();
       var config = $(this).find('config').text();
      var option = $(this).find('operation').text();
     
      if (username) {
        fun_initui_by_auth(config, option, function (optionmask) {})
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
function fun_initialize_playback(bshow) {
  if (!bshow) {
    var strtips = translate_page_item(TARGET_PAGE_PLAYBACK, 'noauth', '', ITEM_TYPE_NONE);
    $('#div_playback_window_area').html("<div  style='width: 100%;height: 48px;text-align: center;margin-top: 200px;color: #1baafb;'>" + strtips + '</div>');
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
var g_video_isrecording = false;
var g_video_isezooming = false;
function fun_register_events() {
  var btn_group_id = '#img_button_talkback_off,#img_button_talkback_on,#img_button_snapshot,#img_button_record,#img_button_audio_off,#img_button_audio_on';
  $(btn_group_id).hover(function () {
    var tagid = this.id.toString();
    var btnGroup = {
      'img_button_talkback_off': 'talkbackoffhover',
      'img_button_talkback_on': 'talkbackonhover',
      'img_button_snapshot': 'snapshothover',
      'img_button_record': 'recordon',
      'img_button_audio_off': 'mutehover',
      'img_button_audio_on': 'volumehover',
    }
    $('#' + tagid).attr('src', 'ui/images/videocontrol/' + btnGroup[tagid] + '.png');
    if (tagid == 'img_button_audio_on') {
      $('#div_slider_volume').show();
    }
    if (tagid == 'img_button_audio_off') {
      $('#div_slider_volume').hide();
    }
  });
  $(btn_group_id).mouseout(function () {
    var tagid = this.id.toString();
    var btnGroup = {
      'img_button_talkback_off': 'talkbackoff',
      'img_button_talkback_on': 'talkbackon',
      'img_button_snapshot': 'snapshot',
      'img_button_record': 'recordoff',
      'img_button_audio_off': 'mute',
      'img_button_audio_on': 'volume',
    }
    switch (tagid) {
      case 'img_button_record':
        if (!g_video_isrecording) {
          $('#' + tagid).attr('src', 'ui/images/videocontrol/recordoff.png');
        }
        break;
      case 'img_button_audio_on':
        volumeTimer = setTimeout(() => {
          $('#div_slider_volume').hide();
        }, 700);
        break;
      default:
        $('#' + tagid).attr('src', 'ui/images/videocontrol/' + btnGroup[tagid] + '.png');
        break;
    }
  });
  $(btn_group_id).click(function () {
    var tagid = this.id.toString();
    switch (tagid) {
      case 'img_button_talkback_off':
        $('#' + tagid).css('display', 'none');
        $('#img_button_talkback_on').css('display', 'inline');
        //fun_ie_plugin_talkback(true);
        break;
      case 'img_button_talkback_on':
        $('#' + tagid).css('display', 'none');
        $('#img_button_talkback_off').css('display', 'inline');
        //fun_ie_plugin_talkback(false);
        break;
      case 'img_button_audio_off':
        //qt_ws.getVerison();
       // qt_ws.setVolume(true, qt_volume, 0)// // qt_volume,qt_mute;
        $('#' + tagid).css('display', 'none');
        $('#img_button_audio_on').css('display', 'inline');
        //qt_mute = true;
        break;
      case 'img_button_audio_on':
       // qt_ws.setVolume(false, qt_volume, 0)// // qt_volume,qt_mute;
        $('#' + tagid).css('display', 'none');
        $('#img_button_audio_off').css('display', 'inline');
       // qt_mute = false;
        break;

      default:
        break;
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
  $('#btn_video_ratio,#btn_stream_type').click(function () {
    if (this.id.toString() == 'btn_video_ratio') {
      fun_on_video_ratio();
    } else if (this.id.toString() == 'btn_stream_type') {
      fun_on_video_stream();
    }
  });
  $('#div_video_ratio_select,#div_video_stream_select').mouseleave(function () {
    $('#' + this.id.toString()).css('display', 'none');
  });
  $('#img_video_ratio_normal,#img_video_ratio_43,#img_video_ratio_169,#img_video_ratio_stretch').click(function () {
    var objid = this.id.toString();
    if (objid == 'img_video_ratio_normal') {
      fun_on_video_ratio_select(1);
    } else if (objid == 'img_video_ratio_43') {
      fun_on_video_ratio_select(2);
    } else if (objid == 'img_video_ratio_169') {
      fun_on_video_ratio_select(3);
    } else if (objid == 'img_video_ratio_stretch') {
      fun_on_video_ratio_select(4);
    }
  });
  $('#img_video_stream_channel1,#img_video_stream_channel2,#img_video_stream_channel3,#img_video_stream_channel4').click(function () {
    var objid = this.id.toString();
    fun_on_video_stream_select(objid);
  });
  $('#button_tips_dialog_close').click(function () {
    fun_hide_tipdialog();
  });
  $('#span_ptzctrl_zoomsub,#span_ptzctrl_zoomadd,#span_ptzctrl_focusadd,#span_ptzctrl_focussub,#span_ptzctrl_autofocus,#span_ptzctrl_irisadd,#span_ptzctrl_irissub').mousedown(function () {
    var objid = this.id.toString();
    if (objid == 'span_ptzctrl_zoomsub') {
      PtzZoomOut();
    } else if (objid == 'span_ptzctrl_zoomadd') {
      PtzZoomIn();
    } else if (objid == 'span_ptzctrl_focusadd') {
      PtzFocusFar();
    } else if (objid == 'span_ptzctrl_focussub') {
      PtzFocusNear();
    } else if (objid == 'span_ptzctrl_autofocus') {
      PtzAutoFocus();
    } else if (objid == 'span_ptzctrl_irisadd') {
      ptzirisadd();
    } else if (objid == 'span_ptzctrl_irissub') {
      ptzirissub();
    }
  });
  $('#span_ptzctrl_zoomsub,#span_ptzctrl_zoomadd,#span_ptzctrl_focusadd,#span_ptzctrl_focussub,#span_ptzctrl_autofocus,#span_ptzctrl_irisadd,#span_ptzctrl_irissub').mouseup(function () {
    var objid = this.id.toString();
    PtzStop();
  });
  $('#span_ptzctrl_middle').click(function () {
    PtzAjust();
  });
  $('#span_ptzctrl_leftup,#span_ptzctrl_up,#span_ptzctrl_rightup,#span_ptzctrl_left,#span_ptzctrl_right,#span_ptzctrl_leftdown,#span_ptzctrl_down,#span_ptzctrl_rightdown').mousedown(function () {
    var objid = this.id.toString();
    if (objid == 'span_ptzctrl_leftup') {
      ptzview_lu();
    } else if (objid == 'span_ptzctrl_up') {
      ptzview_u();
    } else if (objid == 'span_ptzctrl_rightup') {
      ptzview_ru();
    } else if (objid == 'span_ptzctrl_left') {
      ptzview_l();
    } else if (objid == 'span_ptzctrl_right') {
      ptzview_r();
    } else if (objid == 'span_ptzctrl_leftdown') {
      ptzview_ld();
    } else if (objid == 'span_ptzctrl_down') {
      ptzview_d();
    } else if (objid == 'span_ptzctrl_rightdown') {
      ptzview_rd();
    }
  });
  $('#span_ptzctrl_leftup,#span_ptzctrl_up,#span_ptzctrl_rightup,#span_ptzctrl_left,#span_ptzctrl_right,#span_ptzctrl_leftdown,#span_ptzctrl_down,#span_ptzctrl_rightdown').mouseup(function () {
    ptzview_stp();
  });
  $('.cls_button_streamtype').click(function () {
    var elemid = this.id.toString();
    onfisheye_button_click(elemid);
  });
  $('.cls_preset_header_item').click(function () {
    var objid = this.id.toString();
    onptzmenu_handle_click(objid);
  });
  $('#button_fisheye_param_save').click(function () {
    setfisheyecalib();
  });
  // if (qtStatus) {//截屏、录制 qt插件版
  //   $('#img_button_snapshot,#img_button_record').click(function () {
  //     var objid = this.id.toString();
  //     switch (objid) {
  //       case 'img_button_snapshot':
  //         fun_ie_plugin_snapshot()
  //         break;
  //       case 'img_button_record':
  //         g_video_isrecording = !g_video_isrecording;
  //         fun_ie_plugin_record(g_video_isrecording);
  //         // $('#' + tagid).attr('src', 'ui/images/videocontrol/recordoff.png');
  //         // $('#' + tagid).attr('src', 'ui/images/videocontrol/recordon.png');
  //         break;
  //     }
  //   })
  // }
}
var g_ptzoraf_support = true;
var g_fisheye_support_num = 0;
var g_fisheye_install = -1;
//var g_fisheye_mode = -1;
function fun_device_ability() {
  $.ajax({
    url: '/action/get?subject=devability',
    async: false,
    success: function (data) {
      $xml = $(data);
      var ptzaf = $xml.find('ptz').text();
      var fisheye = $xml.find('fisheye').text();
      var smartva = $xml.find('smartva').text();
      var advptz = $xml.find('avdptz').text();
      var npa = parseInt(ptzaf);
      if (smartva.length > 0) {
        smartva = parseInt(smartva);
      } else {
        smartva = 0;
      }
      var stream = $xml.find('stream').text();
      // localStorage.setItem('stream', 6);//第四码流 测试用
      localStorage.setItem('stream', stream);//码流参数:>=4第三码流；>=5第四码流

      if (fisheye.length > 0) {
        fisheye = parseInt(fisheye);
      }
      if (advptz & 8) {
        $('#div_listitem_trackpath').css('display', 'block');
        onptzmenu_handle_click('div_listitem_trackpath');
      }
      if (advptz & 4) {
        $('#div_listitem_alternate').css('display', 'block');
        onptzmenu_handle_click('div_listitem_alternate');
      }
      if (advptz & 2) {
        $('#div_listitem_cruise').css('display', 'block');
        onptzmenu_handle_click('div_listitem_cruise');
      }
      if (advptz & 1) {
        $('#div_listitem_preset').css('display', 'block');
        onptzmenu_handle_click('div_listitem_preset');
      }
      if (advptz == 0) {
        $('#div_preset_content').css('display', 'none');
        $('#div_preset_operations').css('display', 'none');
        $('#div_cruise_content').css('display', 'none');
        $('#div_cruise_operations').css('display', 'none');
        $('#div_alternate_content').css('display', 'none');
        $('#div_trackpath_contect').css('display', 'none');
      }
      if (npa & 0x1) {
        $('#span_ptzctrl_zoomadd').css('display', 'inline-block');
        $('#span_ptzctrl_zoomsub').css('display', 'inline-block');
        $('#span_ptzctrl_middle').css('display', 'inline-block');
        $('#span_ptzctrl_focussub').css('display', 'inline-block');
        $('#span_ptzctrl_autofocus').css('display', 'inline-block');
        $('#span_ptzctrl_focusadd').css('display', 'inline-block');
        $('#div_ptxctrl_direction').css({ height: '35px', width: '112px', margin: '10px 40px 0 40px' });
        $('#div_ptzctrl_extend').css({ height: '35px' });
      }
      if (npa & 0x2) {
        $('#span_ptzctrl_leftup').css('display', 'inline-block');
        $('#span_ptzctrl_up').css('display', 'inline-block');
        $('#span_ptzctrl_rightup').css('display', 'inline-block');
        $('#span_ptzctrl_left').css('display', 'inline-block');
        $('#span_ptzctrl_middle').css('display', 'inline-block');
        $('#span_ptzctrl_right').css('display', 'inline-block');
        $('#span_ptzctrl_leftdown').css('display', 'inline-block');
        $('#span_ptzctrl_down').css('display', 'inline-block');
        $('#span_ptzctrl_rightdown').css('display', 'inline-block');
        $('#div_ptxctrl_direction').css({ height: '75px', width: '112px', margin: '10px 40px 0 40px' });
        $('#div_ptzctrl_extend').css({ height: '35px' });
      }
      if (npa & 0x1 && npa & 0x2) {
        $('#span_ptzctrl_irissub').css('display', 'inline-block');
        $('#span_ptzctrl_irisadd').css('display', 'inline-block');
        $('#div_ptxctrl_direction').css({ height: '75px', width: '195px', margin: '10px 0 0 2px' });
        $('#div_ptzctrl_extend').css({ height: '75px' });
      }
      if (npa & 0x4) {
        $('#span_ptzctrl_zoomadd').css('display', 'inline-block');
        $('#span_ptzctrl_irisadd').css('display', 'inline-block');
        $('#span_ptzctrl_zoomsub').css('display', 'inline-block');
        $('#span_ptzctrl_irissub').css('display', 'inline-block');
        $('#span_ptzctrl_focussub').css('display', 'inline-block');
        $('#span_ptzctrl_autofocus').css('display', 'inline-block');
        $('#span_ptzctrl_focusadd').css('display', 'inline-block');
        $('#span_ptzctrl_leftup').css('display', 'inline-block');
        $('#span_ptzctrl_up').css('display', 'inline-block');
        $('#span_ptzctrl_rightup').css('display', 'inline-block');
        $('#span_ptzctrl_left').css('display', 'inline-block');
        $('#span_ptzctrl_middle').css('display', 'inline-block');
        $('#span_ptzctrl_right').css('display', 'inline-block');
        $('#span_ptzctrl_leftdown').css('display', 'inline-block');
        $('#span_ptzctrl_down').css('display', 'inline-block');
        $('#span_ptzctrl_rightdown').css('display', 'inline-block');
        $('#div_ptxctrl_direction').css({ height: '75px', width: '195px', margin: '10px 0 0 2px' });
        $('#div_ptzctrl_extend').css({ height: '75px' });
      }
      if (npa > 0) {
        $('#pmenu_ptz_control,#div_ptz_control_panel').show();
      } else {
        $('#pmenu_ptz_control,#div_ptz_control_panel').hide();
        $('#div_accordion').accordion('option', 'active', 1);
        $('#div_accordion').accordion('option', 'heightStyle', 'auto');
        g_accordion_secount--;
      }
      if (fisheye > 0) {
        $('#pmenu_fish_eye_control,#div_fish_eye_control').show();
        g_fisheye_support = true;
        if (fisheye & 1) {
          g_fisheye_support_num += 1;
          g_fisheye_install = 1;
        }
        if (fisheye & (1 << 1)) {
          g_fisheye_support_num += 1;
          g_fisheye_install = 0;
        }
        if (fisheye & (1 << 2)) {
          g_fisheye_support_num += 1;
          g_fisheye_install = 2;
        }
      } else {
        $('#pmenu_fish_eye_control,#div_fish_eye_control').hide();
        g_fisheye_support = false;
        g_accordion_secount--;
      }
      if (!(smartva & (1 << 4))) {
        $('#pmenu_face_detection_control,#div_face_detection_control').hide();
        g_accordion_secount--;
      } else {
        sdk_getipcparam('/action/get?subject=valicense', function (results) {
          if (results === false) {
            return;
          }
          $xmls = $(results);
          var status = parseInt($xmls.find('status').text());
          if (status & 0x8) {
            setTimeout('fun_get_facedct_pictures()', 300);
          }
        });
      }
      get_pluginpath();
    }
  });
}
function get_pluginpath() {
  sdk_getipcparam("/action/get?subject=pluginpath", function (res) {
    if (res == false) return;
    $xml = $(res);
    var records = $xml.find("records").text();
    var snaphost = $xml.find("snaphost").text();
    g_recordsPath = records;
    g_snapPath = snaphost;
  });
}
function fun_on_video_ratio() {
  fun_show_video_ratio_select(true);
}
function fun_on_video_stream() {
  if (!g_fisheye_support) {
    fun_show_video_stream_select(true);
  }
}
function fun_show_video_ratio_select(bshow) {
  if (bshow) {
    $parent = $('#div_video_ratio_select').prev();
    var pheigh = $parent.height();
    var ptop = $parent.offset().top;
    var pleft = $parent.offset().left;
    $('#div_video_ratio_select').css({ position: 'absolute', left: pleft, top: ptop + pheigh + 5, 'z-index': '1998' });
    $('#div_video_ratio_select').css('display', 'block');
    $('#div_video_stream_select').css('display', 'none');
  } else {
    $('#div_video_ratio_select').css('display', 'none');
  }
}
function fun_show_video_stream_select(bshow) {
  if (bshow) {
    $parent = $('#div_video_stream_select').prev();
    var pheigh = $parent.height();
    var ptop = $parent.offset().top;
    var pleft = $parent.offset().left;
    $('#div_video_stream_select').css({ position: 'absolute', left: pleft, top: ptop + pheigh + 5, 'z-index': '1998' });
    $('#div_video_stream_select').css('display', 'block');
    $('#div_video_ratio_select').css('display', 'none');
  } else {
    $('#div_video_stream_select').css('display', 'none');
  }
}
var g_video_shot_ratio = 4;
function fun_aspect_ratio(width, height) {
  var w = (g_nplugin_height * width) / height;
  var h = (g_nplugin_width * height) / width;
  if (w > g_nplugin_width) {
    $('video').css({ width: g_nplugin_width, height: h });
  } else {
    $('video').css({ width: w, height: g_nplugin_height });
  }
}
function fun_on_video_ratio_select(type) {
  fun_show_video_ratio_select(false);
  var obj = $('#preview_player')[0];
  // if (!obj) return;
  var rationObj = {
    '1': 'ratio1x',
    '2': 'ratio4_3',
    '3': 'ratio16_9',
    '4': 'stretch',
  }
  if (qtStatus && isShow) {
   // qt_ws.setRation(type - 1);
  } else {
    if (type == 1) {
      $('video').css({ width: g_nplugin_width, height: g_nplugin_height });
      $('#div_video_player #videoElement').css('object-fit', 'contain');
    } else if (type == 2) {
      fun_aspect_ratio(4, 3);
    } else if (type == 3) {
      fun_aspect_ratio(16, 9);
    } else if (type == 4) {
      $('video').css({ width: g_nplugin_width, height: g_nplugin_height });
    }
    if (type > 1) $('#div_video_player #videoElement').css('object-fit', 'fill');
  }
  $('#button_video_ratio_select').attr('src', '/ui/images/videocontrol/' + rationObj[type] + '.png');
  g_video_shot_ratio = type;
}
function fun_on_video_stream_select(objid) {
  fun_show_video_stream_select(false);
  var isName = objid.split('_')[objid.split('_').length - 1];
  if (objid == 'img_video_stream_channel1' && switch_channel != 0) {
    switch_channel = 0;
  } else if (objid == 'img_video_stream_channel2' && switch_channel != 1) {
    switch_channel = 1;
  } else if (objid == 'img_video_stream_channel3' && switch_channel != 2) {
    switch_channel = 2;
  } else if (objid == 'img_video_stream_channel4' && switch_channel != 3) {
    switch_channel = 3;
  }
  $('#button_video_stream_select').attr('src', '/ui/images/videocontrol/' + isName + '.png');
  // fun_switch_channel(switch_channel);
  fun_videoShow(switch_channel);
  fun_get_current_video_resolution(switch_channel);
}

function fun_init_page_ui() {
  $('#img_button_audio_on,#img_button_talkback_on').css('display', 'none');
  fun_init_components_ui();
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_COMMON, 'liveplay', 'div_preview', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'playback', 'div_playback', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'configure', 'div_configuration', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'exit', 'img_btnexit_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'ratio', 'btn_video_ratio', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'channel', 'btn_stream_type', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'audio', 'img_button_audio_off', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'audio', 'img_button_audio_on', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'intercom', 'img_button_talkback_off', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'intercom', 'img_button_talkback_on', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'snapshot', 'img_button_snapshot', ITEM_TYPE_TOOLTIP);
  // translate_page_item(TARGET_PAGE_PREVIEW, 'consecutivesnapshot', 'img_button_consecutive_snapshot', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'record', 'img_button_record', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'ezoom', 'img_button_ezoom', ITEM_TYPE_TOOLTIP);
  // translate_page_item(TARGET_PAGE_PREVIEW, 'fullscreen', 'img_button_fullscreen', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'ptzcontrol', 'pmenu_ptz_control', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'imageset', 'pmenu_image_control', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'fisheye', 'pmenu_fish_eye_control', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'facedetection', 'pmenu_face_detection_control', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'zoomadd', 'span_ptzctrl_zoomadd', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'zoomsub', 'span_ptzctrl_zoomsub', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'focusadd', 'span_ptzctrl_focusadd', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'autofocus', 'span_ptzctrl_autofocus', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'focussub', 'span_ptzctrl_focussub', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'irisadd', 'span_ptzctrl_irisadd', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'irissub', 'span_ptzctrl_irissub', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'ptzspeed', 'div_slider_ptzctrl_speed', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'saturation', 'div_slider_image_saturation', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'brightness', 'div_slider_image_brightness', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'sharpness', 'div_slider_image_sharpness', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'contrast', 'div_slider_image_contrast', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgprofile', 'div_videostream_type_declare', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'display', 'div_image_setting_declare', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'install', 'div_fisheye_install_declare', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'displaymode', 'div_fisheye_displaymode_declare', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'normal', 'img_video_ratio_normal', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'ratio43', 'img_video_ratio_43', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'ratio169', 'img_video_ratio_169', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'stretch', 'img_video_ratio_stretch', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_COMMON, 'mainstream', 'img_video_stream_channel1', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_COMMON, 'substream', 'img_video_stream_channel2', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'thirdstream', 'img_video_stream_channel3', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'preset', 'div_listitem_preset', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'cruise', 'div_listitem_cruise', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'cruise', 'div_cruise_index_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'calltag', 'div_preset_button_call', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'edittag', 'div_preset_button_edit', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'deletetag', 'div_preset_button_delete', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'calltag', 'div_cruise_button_call', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'deletetag', 'div_cruise_button_delete', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'stoptag', 'div_cruise_button_stop', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'addpoint', 'div_cruise_button_add', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'deletepoint', 'div_cruise_button_minus', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'mvdown', 'div_cruise_button_down', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'startscan', 'div_alternate_button_start', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'stopscan', 'div_alternate_button_end', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'startpattern', 'div_trackpath_button_start', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'stoppattern', 'div_trackpath_button_end', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'linearscan', 'div_listitem_alternate', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'pattern', 'div_listitem_trackpath', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'calltag', 'div_alternate_button_call,div_trackpath_button_call', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'stoptag', 'div_alternate_button_stop,div_trackpath_button_stop', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'deletetag', 'div_trackpath_button_delete', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'pattern', 'div_trackpath_index_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'fisheyepara', 'label_fisheye_parameters', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_PREVIEW, 'centerx', 'div_slider_fisheye_centerx', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'centery', 'div_slider_fisheye_centery', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'innerrad', 'div_slider_fisheye_inner', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'outerrad', 'div_slider_fisheye_outer', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_PREVIEW, 'reflineangle', 'div_slider_fisheye_angle', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_fisheye_param_save', ITEM_TYPE_VALUE);

  if (!CurBrowserIsIE()) {//test
    $('#img_button_ezoom').css('display', 'none');
    $('#img_button_fullscreen').css('display', 'none');
    $('#img_button_consecutive_snapshot').css('display', 'none');

    $('#img_button_audio_off').css({ float: 'right', 'margin-left': '5px' });
    $('#img_button_audio_on').css({ float: 'right', 'margin-left': '5px' });
    $('#img_button_talkback_on').css({ float: 'right', 'margin-left': '5px' });
    $('#img_button_talkback_off').css({ float: 'right', 'margin-left': '5px' });
    $('#img_button_record').css({ float: 'right', 'margin-left': '5px' });//
    $('#img_button_snapshot').css({ float: 'right', 'margin-left': '5px' });

    // $('#img_button_consecutive_snapshot').css({ float: 'right', 'margin-right': '20px' });
  }
  var alarmtitle = translate_page_item(TARGET_PAGE_PREVIEW, 'noalarm', '', ITEM_TYPE_NONE);
  $('#img_alarm_tips').attr('title', alarmtitle);
  var strcustom = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'custom', '', ITEM_TYPE_NONE);
  var strnormal = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'normal', '', ITEM_TYPE_NONE);
  var strcolorful = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'colorful', '', ITEM_TYPE_NONE);
  var strpastel = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'pastel', '', ITEM_TYPE_NONE);
  var strbright = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'bright', '', ITEM_TYPE_NONE);
  $('#select_image_preset option').each(function (i, n) {
    if (i == 4) {
      $(n).text(strcustom);
    } else if (i == 0) {
      $(n).text(strnormal);
    } else if (i == 1) {
      $(n).text(strbright);
    } else if (i == 2) {
      $(n).text(strcolorful);
    } else if (i == 3) {
      $(n).text(strpastel);
    }
  });
}
function fun_menu_switch(val) {
  $('#' + val).css({
    'background-color': 'rgb(123, 185, 51)',
    'font-size': '15px',
    color: 'white'
  });
  if (val == 'div_preview') {
    fun_toTagetpage('preview.html');
  } else if (val == 'div_playback') {
    fun_toTagetpage('playback.html');
  } else if (val == 'div_configuration') {
    fun_toTagetpage('configuration.html');
  }
}
function fun_switch_ptzwindw_status(cab) {
  if (g_ptzoraf_support) {
    if (g_bShowPtzWindow) {
      $('#div_ptzctrl_area').css({ display: 'none' });
      $('#div_hide_button').html("<img src='ui/images/show.png' style=\"cursor:pointer;\" onclick='fun_switch_ptzwindw_status()'>");
      $('#div_media_content').css({ width: g_nWindowWidth - 22, height: g_nWindowHeight - 88 });
      $('#div_video_player_show').css('width', g_nWindowWidth - 26);
      g_nplugin_width = g_nWindowWidth - 32;
      g_bShowPtzWindow = false;
    } else {
      $('#div_ptzctrl_area').css('display', 'block');
      $('#div_hide_button').html("<img src='ui/images/hide.png' style=\"cursor:pointer;\" onclick='fun_switch_ptzwindw_status()'>");
      $('#div_media_content').css({ width: g_nWindowWidth - 240, height: g_nWindowHeight - 88 });
      $('#div_video_player_show').css('width', g_nWindowWidth - 244);
      g_nplugin_width = g_nWindowWidth - 252;
      g_bShowPtzWindow = !cab;
    }
  } else {
    g_nplugin_width = g_nWindowWidth - 24;
    g_bShowPtzWindow = false;
  }
  if (browserisie) {
    $('#preview_player').css({ width: g_nplugin_width, height: g_nplugin_height });
  } else {
    $('#div_video_player').css({
      width: g_nplugin_width,
      height: g_nplugin_height
    });
    if (g_video_shot_ratio == 1 || g_video_shot_ratio == 4) {
      $('video').css({ width: g_nplugin_width, height: g_nplugin_height });
    } else if (g_video_shot_ratio == 2) {
      fun_aspect_ratio(4, 3);
    } else if (g_video_shot_ratio == 3) {
      fun_aspect_ratio(16, 9);
    }
  }

  if (cab) {
    cab()
  } else {
    // if (qt_ws && qtStatus && isShow) {
    //   const { x, y } = qtWindowsPosition();
    //   qt_ws.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', true);
    // }
  }
}
function fun_InitPrestList() {
  var listhtml = '';
  var strpreset = translate_page_item(TARGET_PAGE_PREVIEW, 'preset', '', ITEM_TYPE_NONE);
  var strunset = translate_page_item(TARGET_PAGE_PREVIEW, 'unset', '', ITEM_TYPE_NONE);
  var strinset = translate_page_item(TARGET_PAGE_PREVIEW, 'inset', '', ITEM_TYPE_NONE);
  var presetname;
  var presetstatus;
  var strindex = '';
  for (var i = 1; i <= g_npreset_items; i++) {
    presetname = strpreset + i;
    presetstatus = strunset;
    if (g_preset_name.length > i - 1) {
      if (g_preset_name[i - 1].length > 0) {
        presetname = g_preset_name[i - 1];
        presetstatus = strinset;
      }
    }
    if (i < 10) {
      strindex = '00' + i.toString();
    } else if (i >= 10 && i < 100) {
      strindex = '0' + i.toString();
    } else {
      strindex = i.toString();
    }
    listhtml += "<div id='div_list_preset_item_setting_" + i + "' class='cls_list_item' ondblclick='fun_preset_list_dbclick(this.id.toString())' onclick='fun_preset_list_click(this.id.toString())' style='border:0;margin:0;padding:0;height:26px;width:100%;font-size: 12px;color: #ccc;'>";
    listhtml += "<div style='height:22px;width: 20px;margin:3px 0 0 2px;padding:0;float: left;'>" + strindex + '</div>';
    listhtml += "<div id='div_preset_name_" + i + "' style='height:22px;width:80px;margin:2px 0 0 4px;padding:0 0 0 1px;float: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>" + presetname + '</div>';
    listhtml += "<input id='input_preset_name_" + i + "' style='height:18px;width: 80px;float: left;display: none;' onblur='setpresetname(this.id.toString())' onkeydown='fun_on_presetname_keydown(this.id.toString())' value='" + presetname + "' maxlength='6'/>";
    listhtml += "<div id='div_preset_status_" + i + "' style='height:22px;width: 49px;margin:2px 0 0 0;padding:0;float: left;'>" + presetstatus + '</div>';
    listhtml += '</div>';
  }
  $('#div_preset_content').html(listhtml);
}
function fun_init_cruise_list() {
  var listhtml = '';
  for (var i = 1; i <= g_ncruise_count; i++) {
    listhtml += "<option value='" + i + "'>" + i + '</option>';
  }
  $('#select_cruise_index').html(listhtml);
}
function fun_AllEvent() {
  $('#img_btn_exit,#img_btnexit_text').click(function () {
    //exitQT();
    fun_toTagetpage('login.html');
  });
  for (var j = 1; j <= g_npreset_items; j++) {
    var parentitem = '#div_list_preset_item_setting_' + j;
    $(parentitem.toString()).mouseover(function () {
      var namearray = this.id.split('_');
      var childnumber = namearray[namearray.length - 1];
      if (childnumber.length > 0) {
        var childitem = '#img_list_presest_item_image_' + childnumber;
        var childitem1 = '#img_list_presest_item_play_' + childnumber;
        $(childitem).css('display', 'block');
        $(childitem1).css('display', 'block');
      }
    });
    $(parentitem.toString()).mouseout(function () {
      var namearray = this.id.split('_');
      var childnumber = namearray[namearray.length - 1];
      if (childnumber.length > 0) {
        var childitem = '#img_list_presest_item_image_' + childnumber;
        var childitem1 = '#img_list_presest_item_play_' + childnumber;
        $(childitem).css('display', 'none');
        $(childitem1).css('display', 'none');
      }
    });
  }
  $('.cls_preset_btn_setting').click(function () {
    var objid = this.id.toString();
    var strarr = objid.split('_');
    var index = strarr[strarr.length - 1];
    $('#div_preset_name_' + index).css('display', 'none');
    $('#input_preset_name_' + index).css('display', 'inline');
    $('#input_preset_name_' + index).select();
  });
  $('.cls_preset_btn_start').click(function () {
    var objid = this.id.toString();
    var strarr = objid.split('_');
    var index = strarr[strarr.length - 1];
    callpreset(index);
  });
  $('#div_preset_button_call').click(function () {
    callpreset(g_npreset_list_item_index);
  });
  $('#div_preset_button_edit').click(function () {
    fun_preset_list_dbclick('div_list_preset_item_setting_' + g_npreset_list_item_index);
    return;
  });
  $('#div_preset_button_delete').click(function () {
    if (g_preset_name[parseInt(g_npreset_list_item_index) - 1].length <= 0) {
      return;
    }
    deletepreset(g_npreset_list_item_index);
    g_preset_name[parseInt(g_npreset_list_item_index) - 1] = '';
    var strpreset = translate_page_item(TARGET_PAGE_PREVIEW, 'preset', '', ITEM_TYPE_NONE);
    $('#div_preset_name_' + g_npreset_list_item_index).text(strpreset + g_npreset_list_item_index);
    $('#input_preset_name_' + g_npreset_list_item_index).val(strpreset + g_npreset_list_item_index);
    var strunset = translate_page_item(TARGET_PAGE_PREVIEW, 'unset', '', ITEM_TYPE_NONE);
    $('#div_preset_status_' + g_npreset_list_item_index).text(strunset);
  });
  $('#select_image_preset').click(function () {
    fun_image_preset_change();
  });
  $('#div_cruise_button_call,#div_cruise_button_stop,#div_cruise_button_delete,#div_cruise_button_add,#div_cruise_button_minus,#div_cruise_button_down').click(function () {
    var objid = this.id.toString();
    if (objid == 'div_cruise_button_call') {
      on_cruise_call();
    } else if (objid == 'div_cruise_button_delete') {
      on_cruise_delete();
    } else if (objid == 'div_cruise_button_stop') {
      on_cruise_stop();
    } else if (objid == 'div_cruise_button_add') {
      if (!$('#div_cruise_button_add').hasClass('cls_cruise_buttons_disabled')) {
        show_cruise_points_add(true);
      }
    } else if (objid == 'div_cruise_button_minus') {
      if (!$('#div_cruise_button_minus').hasClass('cls_cruise_buttons_disabled')) {
        on_cruise_point_delete();
      }
    } else if (objid == 'div_cruise_button_down') {
      on_cruise_point_down();
    }
  });
  $('#div_alternate_button_start,#div_alternate_button_end,#div_alternate_button_call,#div_alternate_button_stop,#div_trackpath_button_start,#div_trackpath_button_end,#div_trackpath_button_call,#div_trackpath_button_stop,#div_trackpath_button_delete').click(function () {
    var objid = this.id.toString();
    if (objid == 'div_alternate_button_start') {
      fun_on_alternate_start();
    } else if (objid == 'div_alternate_button_end') {
      fun_on_alternate_end();
    } else if (objid == 'div_alternate_button_call') {
      fun_on_alternate_call();
    } else if (objid == 'div_alternate_button_stop') {
      fun_on_alternate_stop();
    } else if (objid == 'div_trackpath_button_start') {
      fun_on_trackpath_start();
    } else if (objid == 'div_trackpath_button_end') {
      fun_on_trackpath_end();
    } else if (objid == 'div_trackpath_button_call') {
      fun_on_trackpath_call();
    } else if (objid == 'div_trackpath_button_stop') {
      fun_on_trackpath_stop();
    } else if (objid == 'div_trackpath_button_delete') {
      fun_on_trackpath_delete();
    }
  });
  $('#select_cruise_index').change(function () {
    on_cruise_index_change();
  });
  $('#select_trackpath_index').change(function () {
    on_trackpath_index_change();
  });
  $('#check_enable_fisheye_settings').on('click', function () {
    fun_on_start_fisheyeset_change();
  });
}
var g_npreset_list_item_index = -1;
function fun_preset_list_dbclick(objid) {
  var strarr = objid.split('_');
  var index = strarr[strarr.length - 1];
  $('#div_preset_name_' + index).css('display', 'none');
  $('#input_preset_name_' + index).css('display', 'inline');
  $('#input_preset_name_' + index).select();
}
function fun_preset_list_click(objid) {
  for (var i = 1; i <= g_npreset_items; i++) {
    $('#div_list_preset_item_setting_' + i).removeClass('cls_list_item_select');
  }
  $('#' + objid).addClass('cls_list_item_select');
  var strarr = objid.split('_');
  g_npreset_list_item_index = strarr[strarr.length - 1];
}
var g_alarm_url_assessid = '';
var g_alarm_hastipsed = false;
var g_alarm_pictype = 0;
var g_alarm_sparkling_count = 0;
function fun_getalarm_information() {
  sdk_getipcparam('/action/alarm?subject=subcript', function (result) {
    if (result == false) return;
    var tarurl = $(result).find('url').text();
    var arrurl = tarurl.split('=');
    if (arrurl.length > 0) {
      var strid = arrurl[arrurl.length - 1];
      g_alarm_url_assessid = strid;
      fun_on_get_alarminfo();
    }
  });
}
function fun_on_get_alarminfo() {
  if (g_alarm_url_assessid.length > 0) {
    var targeturl = '/action/alarm?subject=query&id=' + g_alarm_url_assessid;
    sdk_getipcparam(targeturl, function (result) {
      if (result != false) {
        $xml = $(result);
        var alarmtype = $xml.find('topic').text();
        var statusnum = $xml.find('status').text();
        if (statusnum == 1) {
          var alarmtitle = '';
          function getAlarmStr(e) { return translate_page_item(TARGET_PAGE_PREVIEW, e, '', ITEM_TYPE_NONE); }
          if (alarmtype == 'IO') {
            alarmtitle = getAlarmStr('ioalarm');
          } else if (alarmtype == 'MOTION') {
            alarmtitle = getAlarmStr('motionalarm');
          } else if (alarmtype == 'PIR') {
            alarmtitle = getAlarmStr('piralarm');
          } else if (alarmtype == 'CROSSLINE') {
            fblinkActiveXLayerItem();
            alarmtitle = getAlarmStr('etypecrossline');
          } else if (alarmtype == 'INSTRUSION') {
            fblinkActiveXLayerItem();
            alarmtitle = getAlarmStr('etypeinstrusion');
          } else if (alarmtype == 'HUMANDECTION') {
            alarmtitle = getAlarmStr('bodydetect');
          } else if (alarmtype == 'FACEDECTION') {
            alarmtitle = getAlarmStr('facedetect');
          } else if (alarmtype == 'FACEDECTION_MASK') {
            alarmtitle = getAlarmStr('wearmask');
          } else if (alarmtype == 'FACEDECTION_NOMASK') {
            alarmtitle = getAlarmStr('withoutmask');
          } else if (alarmtype == 'FACERECO_FAILURE') {
            alarmtitle = getAlarmStr('facerecogfail');
          } else if (alarmtype == 'FACERECO_BNAME') {
            alarmtitle = getAlarmStr('facerecogblist');
          } else if (alarmtype == 'FACERECO_WNAME') {
            alarmtitle = getAlarmStr('facerecogwlist');
          } else if (alarmtype == 'OBJECTLEFTLOST') {
            alarmtitle = getAlarmStr('leftmoved');
          } else if (alarmtype == 'LOITERING') {
            alarmtitle = getAlarmStr('etypeloitering');
          } else if (alarmtype == 'PETDETECTION') {
            alarmtitle = getAlarmStr('petdetect');
          } else if (alarmtype == 'VECHELDECTION') {
            alarmtitle = getAlarmStr('vehicledct');
          } else if (alarmtype == 'FALLDETECTION') {
            alarmtitle = getAlarmStr('falldct');
          } else if (alarmtype == 'FIREWORKSDETECTION') {
            alarmtitle = getAlarmStr('smokefire');
          }
          $('#img_alarm_tips').attr('title', alarmtitle);
          if (!g_alarm_hastipsed) {
            g_alarm_sparkling_count = 40;
            g_alarm_hastipsed = true;
            fun_switch_alarm_picture();
          }
        }
      } else {
        fun_getalarm_information();
        return;
      }
    });
  }
  setTimeout(fun_on_get_alarminfo, 200);
}
var activex_ocx_player = null;
var blinktarget = false;
function fblinkActiveXLayerItem() {
  if (null !== activex_ocx_player && blinktarget === true) {
    activex_ocx_player.SetLayerItemBlink(0);
  }
}
function fun_switch_alarm_picture() {
  if (g_alarm_pictype == 0) {
    g_alarm_pictype = 1;
    $('#img_alarm_tips').attr('src', '/ui/images/alarm1.png');
  } else {
    g_alarm_pictype = 0;
    $('#img_alarm_tips').attr('src', '/ui/images/alarm.png');
  }
  if (g_alarm_sparkling_count == 0) {
    $('#img_alarm_tips').attr('src', '/ui/images/alarm.png');
    g_alarm_hastipsed = false;
    var alarmtitle = translate_page_item(TARGET_PAGE_PREVIEW, 'noalarm', '', ITEM_TYPE_NONE);
    $('#img_alarm_tips').attr('title', alarmtitle);
  } else {
    g_alarm_sparkling_count--;
    setTimeout(fun_switch_alarm_picture, 500);
  }
}
var g_video_image_iscorridor = false;
var g_rotate = 0;
function fun_get_video_image(cab) {
  sdk_getipcparam('/action/get?subject=videoimage', function (result) {
    if (result != false) {
      $xml = $(result);
      var rotate = $xml.find('rotate').text();
      g_rotate = rotate;
      if (rotate == 1) {
        g_video_image_iscorridor = true;
        if (cab) cab
        fun_on_video_ratio_select(1)
      }
    }
  });
}
function fun_toTagetpage(pagefile) {
  window.location.href = pagefile;
}
function fun_image_preset_change() {
  var curval = $('#select_image_preset').val();
  var bsend = false;
  if (curval != g_outstyle) {
    bsend = true;
  }
  if (curval == 4) {
    g_outstyle = 4;
    $('#div_slider_image_saturation').slider('value', g_custom_saturation);
    $('#div_slider_image_brightness').slider('value', g_custom_brightness);
    $('#div_slider_image_sharpness').slider('value', g_custom_sharpness);
    $('#div_slider_image_contrast').slider('value', g_custom_contrast);

    $('#div_slider_image_saturation').slider('option', { disabled: false });
    $('#div_slider_image_brightness').slider('option', { disabled: false });
    $('#div_slider_image_sharpness').slider('option', { disabled: false });
    $('#div_slider_image_contrast').slider('option', { disabled: false });
  } else if (curval == 0) {
    g_outstyle = 0;
    $('#div_slider_image_saturation').slider('value', '50');
    $('#div_slider_image_brightness').slider('value', '50');
    $('#div_slider_image_sharpness').slider('value', '50');
    $('#div_slider_image_contrast').slider('value', '50');

    $('#div_slider_image_saturation').slider('option', { disabled: true });
    $('#div_slider_image_brightness').slider('option', { disabled: true });
    $('#div_slider_image_sharpness').slider('option', { disabled: true });
    $('#div_slider_image_contrast').slider('option', { disabled: true });
  } else if (curval == 1) {
    g_outstyle = 1;
    $('#div_slider_image_saturation').slider('value', '50');
    $('#div_slider_image_brightness').slider('value', '85');
    $('#div_slider_image_sharpness').slider('value', '60');
    $('#div_slider_image_contrast').slider('value', '50');

    $('#div_slider_image_saturation').slider('option', { disabled: true });
    $('#div_slider_image_brightness').slider('option', { disabled: true });
    $('#div_slider_image_sharpness').slider('option', { disabled: true });
    $('#div_slider_image_contrast').slider('option', { disabled: true });
  } else if (curval == 2) {
    g_outstyle = 2;
    $('#div_slider_image_saturation').slider('value', '80');
    $('#div_slider_image_brightness').slider('value', '67');
    $('#div_slider_image_sharpness').slider('value', '60');
    $('#div_slider_image_contrast').slider('value', '60');

    $('#div_slider_image_saturation').slider('option', { disabled: true });
    $('#div_slider_image_brightness').slider('option', { disabled: true });
    $('#div_slider_image_sharpness').slider('option', { disabled: true });
    $('#div_slider_image_contrast').slider('option', { disabled: true });
  } else if (curval == 3) {
    g_outstyle = 3;
    $('#div_slider_image_saturation').slider('value', '48');
    $('#div_slider_image_brightness').slider('value', '60');
    $('#div_slider_image_sharpness').slider('value', '35');
    $('#div_slider_image_contrast').slider('value', '50');

    $('#div_slider_image_saturation').slider('option', { disabled: true });
    $('#div_slider_image_brightness').slider('option', { disabled: true });
    $('#div_slider_image_sharpness').slider('option', { disabled: true });
    $('#div_slider_image_contrast').slider('option', { disabled: true });
  }
  if (bsend) {
    fun_send_videoimage_parameter();
  }
}

function CurBrowserIsIE() {
  //取消qt插件播放
  //if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;
  return false;
}

function tryToSetVideodrawItems() {
  $.ajax({
    //intrusion
    url: '/action/get?subject=alarm&type=11',
    type: 'POST',
    async: true,
    success: function (result, status, xhr) {
      if (status === 'success') {
        var active = $(result).find('active').text();
        if (active === '1' || active === '2') {
          $.ajax({
            url: '/action/get?subject=instrusion',
            type: 'POST',
            success: function (result1) {
              $xml = $(result1);
              var spt1, spt2, spt3, spt4;
              var ptindex = 0;
              if ($xml.find('blink').text() === '1') {
                blinktarget = true;
              }
              $xml.find('point').each(function () {
                if (ptindex === 0) {
                  spt1 = $(this).text();
                } else if (ptindex === 1) {
                  spt2 = $(this).text();
                } else if (ptindex === 2) {
                  spt3 = $(this).text();
                } else if (ptindex === 3) {
                  spt4 = $(this).text();
                }
                ptindex++;
              });

              var avalid = spt1 === spt2 || spt1 === spt3 || spt1 === spt4 || spt2 === spt3 || spt3 === spt4 ? false : true;

              if (null !== activex_ocx_player && avalid) {
                activex_ocx_player.SetPolygonPoints(spt1 + ',' + spt2 + ',' + spt3 + ',' + spt4);
                activex_ocx_player.SetEnableItem(0xa4);
              }
            }
          });
        }
      }
    }
  });
  $.ajax({
    //crossline
    url: '/action/get?subject=alarm&type=10',
    type: 'POST',
    async: true,
    success: function (result, status, xhr) {
      if (status === 'success') {
        var active = $(result).find('active').text();
        if (active === '1' || active === '2') {
          $.ajax({
            url: '/action/get?subject=crossline',
            type: 'POST',
            success: function (result1) {
              $xml = $(result1);
              if ($xml.find('blink').text() === '1') {
                blinktarget = true;
              }
              var beginpt = $xml.find('begin').text();
              var endpt = $xml.find('end').text();
              var pt1, pt2;
              var startptarr = beginpt.split(',');
              var endptarr = endpt.split(',');
              if (startptarr.length === 2) {
                pt1 = new fun_point(parseInt(startptarr[0]), parseInt(startptarr[1]));
              }
              if (endptarr.length === 2) {
                pt2 = new fun_point(parseInt(endptarr[0]), parseInt(endptarr[1]));
              }
              if (null !== activex_ocx_player) {
                activex_ocx_player.SetNormalPoints(pt1.x, pt1.y, pt2.x, pt2.y);
                activex_ocx_player.SetEnableItem(0xa2);
              }
            }
          });
        }
      }
    }
  });
}

function fun_point(x, y) {
  this.x = x;
  this.y = y;
}
function fun_show_upgradeocx_tips(tipstext, autoOpen, beforeClose,) {//qt ------------------------  ie
  // var tipstext = translate_page_item(TARGET_PAGE_PREVIEW, 'newocx', '', ITEM_TYPE_NONE);
  $('#div_upgrade_ocx_text').html(tipstext);
  $('#div_upgrade_ocx_dialog').dialog({
    autoOpen: autoOpen || false,
    modal: true,
    title: '',
    width: 377,
    height: 218,
    resizable: false,
    beforeClose,
  });
}

// function fun_ie_plugin_talkback(bopen) {
//   qt_ws.intercom(bopen)
// }

// function fun_ie_plugin_snapshot() {//除ie外功能转移至output-media.js
//   qt_ws.capture(g_snapPath);
// }

function fun_ie_plugin_consecutive_snapshot() {
  var obj = $('#preview_player')[0];
  if (!obj) return;
  obj.MultSnapshot(3);
}

// function fun_ie_plugin_record(bstart) {//除ie外功能转移至output-media.js
//   eval('qt_ws.record_' + (bstart ? 'start' : 'end') + '(g_recordsPath)');
// }

// function qtWindowsPosition() {
//   const { isLeft, isTop, outerHeight, innerHeight } = getAutoWH('#div_video_player');
//   let x = isLeft;
//   let y = isTop + (outerHeight - innerHeight);
//   return { x, y }
// }

var ishasAudio = false;
var isNewOutPut = false;
// var qt_ws //
// var qtStatus = true;//qt
// var qtWindow_x, qtWindow_y;
let isShow = false;
let g_channel;
function fun_videoShow(channel) {
  var hasAudio = ishasAudio;
  var enableaudio = false;
  var audiocodec = false;
  var curlanguage = window.sessionStorage.getItem('bvlanguage');
  var xglang;

  if (channel > 1) {
    channel += 1;
    g_channel = channel;
  };
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
  sdk_getipcparam('/action/get?subject=audioenc', function (result) {
    if (result != false) {
      $xml = $(result);
      if ($xml.find('active').text() == 1) enableaudio = true;
      if ($xml.find('codec').text() == 2) audiocodec = true;
    }
  });
  var tagrequest = '/action/get?subject=videoenc&stream=' + channel;
  // console.log(qtStatus ? 'success' : 'error');
  //qtStatus = false;

  //localStorage.setItem('qtCtrlTips', true);//qt控件缓存、用户使用仅弹出一次
  switchStream();
  // if (!isShow) qt_ws = new QT_WS();//实例化qt插件 [未打开qt窗口需要尝试连接]
  // if (!qtStatus) {//web状态下改码流
  //   switchStream();
  //   return
  // }
  // if (isShow) {
  //   sdk_getipcparam(tagrequest, function (res) {
  //     if (res != false) {
  //       $xml = $(res);
  //       var codec = parseInt($xml.find('codec').text());
  //       // console.log(codec);
  //       qt_ws.getVideoStream(true, channel, codec);
  //       const { x, y } = qtWindowsPosition();
  //       qt_ws.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', true);
  //       setTimeout(() => {
  //         qt_ws.setVolume(qt_mute, qt_volume, 0);
  //       }, 2000);
  //     }
  //   })
  //   return
  // }

  // qt_ws.onerror((err) => {
  //   qtStatus = false;
  //   $('#img_button_talkback_off,#img_button_audio_off').hide();
  //   // console.error('Got error', err);

  //   if (!(Boolean(localStorage.getItem('qtCtrlTips')))) {//无缓存时，弹出下载控件提示
  //     var noInstallStr = translate_page_item(TARGET_PAGE_TIPSTEXT, 'noinstllqt', '', ITEM_TYPE_NONE);//未安装文字
  //     fun_show_upgradeocx_tips(noInstallStr, true, function () {
  //       localStorage.setItem('qtCtrlTips', true);//qt控件缓存、用户使用仅弹出一次
  //       switchStream();
  //     });//提示    
  //   } else {
  //     switchStream();
  //   }
  // })
  // 切换 ptz 窗口状态
  // fun_switch_ptzwindw_status(function () {
  //   qt_ws.onopen(() => {
  //     fun_show_upgradeocx_tips('', false);//提示    
  //     qt_ws.destroyWindow();
  //     qtStatus = true;
  //     if (!isShow) {
  //       sdk_getipcparam(tagrequest, function (res) {
  //         if (res != false) {
  //           $xml = $(res);
  //           var codec = parseInt($xml.find('codec').text());
  //           const { x, y } = qtWindowsPosition();
  //           qt_ws.getVideoStream(false, channel, codec);
  //           qt_ws.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', true);
  //           qt_ws.setRation(g_rotate == '1' ? 0 : 3);
  //           isShow = true;
  //           qt_ws.getVerison();
  //         }
  //       })

  //     }
  //     window.onfocus = function () {
  //       //焦点在当前窗口
  //       //功能函数
  //       console.log('已聚焦');
  //       const { x, y } = qtWindowsPosition();
  //       const newVerTips = $('#div_upgrade_ocx_dialog').dialog('isOpen');
  //       if (!newVerTips && isShow && qtWindow_x != x && qtWindow_y != y) return
  //       qt_ws.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', !newVerTips);
  //     }
  //     setInterval(() => {//执行一次随窗口移动的 定时器
  //       const { x, y } = qtWindowsPosition();
  //       if (isShow && qtWindow_x == x && qtWindow_y == y && qtWindow_h == g_nplugin_height && qtWindow_w == g_nplugin_width) return
  //       setTimeout(() => {
  //         sdk_getipcparam(tagrequest, function (res) {
  //           if (res != false) {
  //             $xml = $(res);
  //             var codec = parseInt($xml.find('codec').text());
  //             qt_ws.getVideoStream(false, channel, codec);
  //             const newVerTips = $('#div_upgrade_ocx_dialog').dialog('isOpen');
  //             qt_ws.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', !newVerTips);
  //           }
  //         })
  //       }, 100);
  //       qtWindow_x = x;
  //       qtWindow_y = y;
  //       qtWindow_h = g_nplugin_height;
  //       qtWindow_w = g_nplugin_width;
  //     }, 10);
  //     window.onblur = function () {
  //       //焦点不在当前窗口 --功能函数
  //       const { x, y } = qtWindowsPosition();
  //       qt_ws.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', false);
  //       qtWindow_x = x;
  //       qtWindow_y = y;
  //       qtWindow_h = g_nplugin_height;
  //       qtWindow_w = g_nplugin_width;
  //     }
  //     document.addEventListener('visibilitychange', function () {
  //       if (document.hidden) {
  //         // 选项卡被切换，执行需要的操作
  //         qt_ws.hideWindow();
  //       } else {
  //         sdk_getipcparam(tagrequest, function (res) {
  //           if (res != false) {
  //             $xml = $(res);
  //             var codec = parseInt($xml.find('codec').text());
  //             qt_ws.getVideoStream(true, channel, codec);
  //           }
  //         })
  //         // 选项卡恢复，执行需要的操作
  //       }
  //     });
  //     document.onmousedown = function () {
  //       const { x, y } = qtWindowsPosition();
  //       const newVerTips = $('#div_upgrade_ocx_dialog').dialog('isOpen');
  //       qt_ws.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', !newVerTips);
  //     };
  //   })
  // });


  // web模式
  function switchStream() {
    sdk_getipcparam(tagrequest, function (result) {
      if (result != false) {
        $xml = $(result);
        var codec = $xml.find('codec').text();
        var audioen = $xml.find('audioen').text();
        if (enableaudio && audiocodec && audioen == 1) ishasAudio = true;
        if (bv != null) {
          bv.unload();
          bv.detachMediaElement();
          bv.destroy();
          bv = null;
        }
        if (codec == 2) {
          var Img_strArr = ["<img id='videoElement' style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=", "' />"]
          $('#div_video_player').html(Img_strArr[0] + (channel > 1 ? channel - 1 : channel) + Img_strArr[1]);

        } else {
          var url = '/action/stream?subject=flvlive&stream=' + channel;
          if (bv == null) {
            $('#div_video_player').html('');
            var videoEle = '<video id="videoElement" name="videoElement" class="centeredVideo" controls autoplay playsinline muted disablePictureInPicture></video>';
            $('#div_video_player').html(videoEle);
            var videoElement = $('#videoElement')[0];
            videoElement.addEventListener('click', function mouseHandler(e) { e.preventDefault(); }, false);// 阻止视频默认点击事件
            videoElement.muted = true;
            bv = window.mpegts.createPlayer(
              {
                type: 'flv',
                isLive: true,
                url: document.location.origin + url,
                withCredentials: false,
                liveBufferLatencyChasing: true
              },
              {
                lazyLoadMaxDuration: 3 * 60,
                seekType: 'range',
                liveBufferLatencyChasing: true,
                enableInfo: true,
                enableWorker: false,
                enableStashBuffer: false,
                stashInitialSize: 128,
                deferLoadAfterSourceOpen: false,
              }
            );
            bv.attachMediaElement(videoElement);
            bv.load();
            bv.play();
          }
        }
        var output = new OutputMedia('', 'videoElement', isNewOutPut);//截屏录制
        output.createOutputMediaEle();//初始化
        isNewOutPut = true;//已经执行过初始化截屏录制
      }
      fun_get_video_image();
    });
  }
  setTimeout('fun_adjuast_video_area();', 1500);
}
function fun_adjuast_video_area() {
  if (browserisie) {
    $('#preview_player').css({ margin: '2px 0 0 2px' });
    $('#preview_player').addClass('cls_player_size_change');
  } else {
    $('#div_video_player').css({
      margin: '2px 0 0 2px'
    });
    $('#div_video_player').addClass('cls_player_size_change');
  }
}
function fun_on_slider_change() {
  if (!g_video_loaded) return;
  var curid = this.id.toString();
  var slidervalue = 0;
  var bimage = false;
  var curmode = $('#select_image_preset').val();
  if (curid == 'div_slider_ptzctrl_speed') {
    slidervalue = $('#div_slider_ptzctrl_speed').slider('value');
    $('#div_ptzctrl_speed_value').text(slidervalue);
    setptzspeed(parseInt(slidervalue) - 1);
  } else if (curid == 'div_slider_image_saturation') {
    slidervalue = $('#div_slider_image_saturation').slider('value');
    $('#div_image_saturation_value').text(slidervalue);
    if (g_saturation != slidervalue) {
      g_saturation = parseInt(slidervalue);
    }
    if (curmode == 4) {
      g_custom_saturation = g_saturation;
      bimage = true;
    }
  } else if (curid == 'div_slider_image_brightness') {
    slidervalue = $('#div_slider_image_brightness').slider('value');
    $('#div_image_brightness_value').text(slidervalue);
    if (g_brightness != slidervalue) {
      g_brightness = parseInt(slidervalue);
    }
    if (curmode == 4) {
      g_custom_brightness = g_brightness;
      bimage = true;
    }
  } else if (curid == 'div_slider_image_contrast') {
    slidervalue = $('#div_slider_image_contrast').slider('value');
    $('#div_image_contrast_value').text(slidervalue);
    if (g_contrast != slidervalue) {
      g_contrast = parseInt(slidervalue);
    }
    if (curmode == 4) {
      g_custom_contrast = g_contrast;
      bimage = true;
    }
  } else if (curid == 'div_slider_image_sharpness') {
    slidervalue = $('#div_slider_image_sharpness').slider('value');
    $('#div_image_sharpness_value').text(slidervalue);
    if (g_sharpness != slidervalue) {
      g_sharpness = parseInt(slidervalue);
    }
    if (curmode == 4) {
      g_custom_sharpness = g_sharpness;
      bimage = true;
    }
  }
  if (bimage) {
    fun_send_videoimage_parameter();
  }
}
var g_outstyle, g_saturation, g_brightness, g_sharpness, g_contrast, g_blc, g_wdr, g_dnmode, g_whitebalance, g_shutter, g_mirror, g_lightmeter, g_iris, g_videostd, g_defog, g_noise, g_ldc;
var g_dntsc, g_dncolor, g_dngrey, g_wbrgain, g_wbggain, g_wbbgain;
var g_custom_saturation = 50,
  g_custom_brightness = 50,
  g_custom_sharpness = 50,
  g_custom_contrast = 50;
var g_video_loaded = false;
var g_audio_on = false;
function fun_get_videoimage_parameters() {
  sdk_getipcparam('/action/get?subject=videoimage', function (result) {
    if (result != false) {
      $xml = $(result);
      g_outstyle = $xml.find('imgstyle').text();
      g_videostd = $xml.find('freq').text();
      g_saturation = $xml.find('saturation').text();
      g_brightness = $xml.find('brightness').text();
      g_sharpness = $xml.find('sharpness').text();
      g_contrast = $xml.find('contrast').text();
      g_blc = $xml.find('backlight').text();
      g_wdr = $xml.find('wdr').text();
      g_dnmode = $xml.find('daynight').children('mode').text();
      g_whitebalance = $xml.find('whitebalance').children('mode').text();
      g_shutter = $xml.find('shutter').text();
      g_mirror = $xml.find('mirror').text();
      g_lightmeter = $xml.find('metter').text();
      g_iris = $xml.find('iris').text();
      g_noise = $xml.find('noise').text();
      g_defog = $xml.find('defog').text();
      g_ldc = $xml.find('ldc').text();
      g_dntsc = $xml.find('daynight').children('tsection').text();
      g_dncolor = $xml.find('daynight').children('color').text();
      g_dngrey = $xml.find('daynight').children('grey').text();
      g_wbrgain = $xml.find('whitebalance').children('rgain').text();
      g_wbggain = $xml.find('whitebalance').children('ggain').text();
      g_wbbgain = $xml.find('whitebalance').children('bgain').text();
      if (g_outstyle == 0) {
        $('#select_image_preset').val(0);
        $('#div_slider_image_saturation').slider('option', { disabled: true });
        $('#div_slider_image_brightness').slider('option', { disabled: true });
        $('#div_slider_image_contrast').slider('option', { disabled: true });
        $('#div_slider_image_sharpness').slider('option', { disabled: true });

        $('#div_slider_image_saturation').slider('value', '50');
        $('#div_slider_image_brightness').slider('value', '50');
        $('#div_slider_image_sharpness').slider('value', '50');
        $('#div_slider_image_contrast').slider('value', '50');
        $('#div_image_saturation_value').text('50');
        $('#div_image_brightness_value').text('50');
        $('#div_image_sharpness_value').text('50');
        $('#div_image_contrast_value').text('50');
      } else if (g_outstyle == 2) {
        $('#select_image_preset').val(2);
        $('#div_slider_image_saturation').slider('option', { disabled: true });
        $('#div_slider_image_brightness').slider('option', { disabled: true });
        $('#div_slider_image_contrast').slider('option', { disabled: true });
        $('#div_slider_image_sharpness').slider('option', { disabled: true });

        $('#div_slider_image_saturation').slider('value', '80');
        $('#div_slider_image_brightness').slider('value', '67');
        $('#div_slider_image_sharpness').slider('value', '60');
        $('#div_slider_image_contrast').slider('value', '60');
        $('#div_image_saturation_value').text('80');
        $('#div_image_brightness_value').text('67');
        $('#div_image_sharpness_value').text('60');
        $('#div_image_contrast_value').text('60');
      } else if (g_outstyle == 3) {
        $('#select_image_preset').val(3);
        $('#div_slider_image_saturation').slider('option', { disabled: true });
        $('#div_slider_image_brightness').slider('option', { disabled: true });
        $('#div_slider_image_contrast').slider('option', { disabled: true });
        $('#div_slider_image_sharpness').slider('option', { disabled: true });

        $('#div_slider_image_saturation').slider('value', '48');
        $('#div_slider_image_brightness').slider('value', '60');
        $('#div_slider_image_sharpness').slider('value', '35');
        $('#div_slider_image_contrast').slider('value', '50');
        $('#div_image_saturation_value').text('48');
        $('#div_image_brightness_value').text('60');
        $('#div_image_sharpness_value').text('35');
        $('#div_image_contrast_value').text('50');
      } else if (g_outstyle == 1) {
        $('#select_image_preset').val(1);
        $('#div_slider_image_saturation').slider('option', { disabled: true });
        $('#div_slider_image_brightness').slider('option', { disabled: true });
        $('#div_slider_image_contrast').slider('option', { disabled: true });
        $('#div_slider_image_sharpness').slider('option', { disabled: true });

        $('#div_slider_image_saturation').slider('value', '50');
        $('#div_slider_image_brightness').slider('value', '85');
        $('#div_slider_image_sharpness').slider('value', '60');
        $('#div_slider_image_contrast').slider('value', '50');
        $('#div_image_saturation_value').text('50');
        $('#div_image_brightness_value').text('85');
        $('#div_image_sharpness_value').text('60');
        $('#div_image_contrast_value').text('50');
      } else {
        $('#select_image_preset').val(4);
        g_custom_saturation = g_saturation;
        g_custom_brightness = g_brightness;
        g_custom_sharpness = g_sharpness;
        g_custom_contrast = g_contrast;
        $('#div_slider_image_saturation').slider('option', 'value', g_saturation);
        $('#div_slider_image_brightness').slider('option', 'value', g_brightness);
        $('#div_slider_image_contrast').slider('option', 'value', g_contrast);
        $('#div_slider_image_sharpness').slider('option', 'value', g_sharpness);
        $('#div_image_saturation_value').text(g_saturation);
        $('#div_image_brightness_value').text(g_brightness);
        $('#div_image_sharpness_value').text(g_sharpness);
        $('#div_image_contrast_value').text(g_contrast);
      }
    }
    g_video_loaded = true;
  });
}
function fun_send_videoimage_parameter() {
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<videoimage>' +
    '<freq>' +
    g_videostd +
    '</freq>' +
    '<imgstyle>' +
    g_outstyle +
    '</imgstyle>' +
    '<saturation>' +
    g_saturation +
    '</saturation>' +
    '<sharpness>' +
    g_sharpness +
    '</sharpness>' +
    '<contrast>' +
    g_contrast +
    '</contrast>' +
    '<brightness>' +
    g_brightness +
    '</brightness>' +
    '<mirror>' +
    g_mirror +
    '</mirror>' +
    '<noise>' +
    g_noise +
    '</noise>' +
    '<ldc>' +
    g_ldc +
    '</ldc>' +
    '<defog>' +
    g_defog +
    '</defog>' +
    '<rotate>' +
    g_rotate +
    '</rotate>' +
    '<daynight>' +
    '<mode>' +
    g_dnmode +
    '</mode>' +
    '<tsection>' +
    g_dntsc +
    '</tsection>' +
    '<color>' +
    g_dncolor +
    '</color>' +
    '<grey>' +
    g_dngrey +
    '</grey>' +
    '</daynight>' +
    '<widedynamic>' +
    '<wdr>' +
    g_wdr +
    '</wdr>' +
    '<backlight>' +
    g_blc +
    '</backlight>' +
    '</widedynamic>' +
    '<autoexposure>' +
    '<metter>' +
    g_lightmeter +
    '</metter>' +
    '<shutter>' +
    g_shutter +
    '</shutter>' +
    '<iris>' +
    g_iris +
    '</iris>' +
    '</autoexposure>' +
    '<whitebalance>' +
    '<mode>' +
    g_whitebalance +
    '</mode>' +
    '<rgain>' +
    g_wbrgain +
    '</rgain>' +
    '<ggain>' +
    g_wbggain +
    '</ggain>' +
    '<bgain>' +
    g_wbbgain +
    '</bgain>' +
    '</whitebalance>' +
    '</videoimage>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=videoimage', targetxml, function (result) {
    if (!result) {
    }
  });
}
function PtzAjust() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<protocol>0</protocol>' + '<cmd>20000001</cmd>' + '<addr>1</addr>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function PtzStop() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<protocol>0</protocol>' + '<cmd>0</cmd>' + '<addr>1</addr>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function PtzFocusFar() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4</cmd>' + '<addr>1</addr>' + '<focus>0</focus>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function PtzFocusNear() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4</cmd>' + '<addr>1</addr>' + '<focus>1/focus>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function PtzZoomIn() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>8</cmd>' + '<addr>1</addr>' + '<zoom>1/zoom>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function PtzZoomOut() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>8</cmd>' + '<addr>1</addr>' + '<zoom>0/zoom>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function PtzAutoFocus() {
  var xml = '<?xml version="1.0" encoding="utf-8"?><request><ptzcmd><cmd>4113</cmd><addr>1</addr><focus>1/focus></ptzcmd></request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function ptzirisadd() {
  var xml = '<?xml version="1.0" encoding="utf-8"?><request><ptzcmd><cmd>4102</cmd><addr>1</addr><iris>1</iris></ptzcmd></request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function ptzirissub() {
  var xml = '<?xml version="1.0" encoding="utf-8"?><request><ptzcmd><cmd>4102</cmd><addr>1</addr><iris>0</iris></ptzcmd></request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function fun_show_tipdialog(tipstext) {
  $('#div_media_coverage').css('display', 'block');
  $('#div_tips_dialog_content').text(tipstext);
  $('#div_tips_dialog').show(300);
}
function fun_hide_tipdialog() {
  $('#div_media_coverage').css('display', 'none');
  $('#div_tips_dialog').hide(300);
}

function setpresetname(objid) {
  var presetname = $('#' + objid).val();
  var strarr = objid.split('_');
  var index = strarr[strarr.length - 1];
  var strreg = /^\s+\S*/;
  if (presetname == '' || strreg.test(presetname)) {
    $('#' + objid).val($('#div_preset_name_' + index).text());
    $('#' + objid).css('display', 'none');
    $('#div_preset_name_' + index).css('display', 'block');
    return;
  }
  $('#' + objid).css('display', 'none');
  $('#div_preset_name_' + index).css('display', 'block');
  $('#div_preset_name_' + index).text(presetname);
  g_preset_name[index - 1] = presetname;
  setpreset(index, presetname);
  var strinset = translate_page_item(TARGET_PAGE_PREVIEW, 'inset', '', ITEM_TYPE_NONE);
  $('#div_preset_status_' + g_npreset_list_item_index).text(strinset);
}
function fun_on_presetname_keydown(objid) {
  var event = arguments.callee.caller.arguments[0] || window.event;
  if (event.keyCode == 13) {
    setpresetname(objid);
  }
}
function ptzview(cmd, hori, vert) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>' + cmd + '</cmd>' + '<move>' + '<hori>' + hori + '</hori>' + '<vert>' + vert + '</vert>' + '</move>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function ptzview_lu() {
  ptzview(3, 0, 0);
}
function ptzview_u() {
  ptzview(2, 0, 0);
}
function ptzview_ru() {
  ptzview(3, 1, 0);
}
function ptzview_l() {
  ptzview(1, 0, 0);
}
function ptzview_r() {
  ptzview(1, 1, 0);
}
function ptzview_ld() {
  ptzview(3, 0, 1);
}
function ptzview_d() {
  ptzview(2, 0, 1);
}
function ptzview_rd() {
  ptzview(3, 1, 1);
}
function ptzview_stp() {
  ptzview(0, 0, 0);
}
function onfisheye_button_click(objid) {
  if (g_enable_fisheye_setting) {
    return;
  }
  if (objid == 'div_fisheye_install_cell') {
    $('#div_fisheye_install_cell').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_desktop,#div_fisheye_install_wall').removeClass('cls_fisheye_button_select');
    $('#div_fisheye_install_origin,#div_fisheye_install_360,#div_fisheye_install_fourrect,#div_fisheye_install_split,#div_fisheye_install_wsplit,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    if (g_fisheye_support_num == 3) {
      $('#div_fisheye_install_fourrect').css('display', 'block');
      $('#div_fisheye_install_180').css('display', 'block');
      $('#div_fisheye_install_360').css('display', 'block');
      $('#div_fisheye_install_origin').css('display', 'block');
      $('#div_fisheye_install_split').css('display', 'block');
      $('#div_fisheye_install_wsplit').css('display', 'block');
      g_fisheye_install = 1;
    }
  } else if (objid == 'div_fisheye_install_desktop') {
    $('#div_fisheye_install_desktop').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_cell,#div_fisheye_install_wall').removeClass('cls_fisheye_button_select');
    $('#div_fisheye_install_origin,#div_fisheye_install_360,#div_fisheye_install_fourrect,#div_fisheye_install_split,#div_fisheye_install_wsplit,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    if (g_fisheye_support_num == 3) {
      $('#div_fisheye_install_fourrect').css('display', 'block');
      $('#div_fisheye_install_180').css('display', 'block');
      $('#div_fisheye_install_360').css('display', 'none');
      $('#div_fisheye_install_origin').css('display', 'block');
      $('#div_fisheye_install_split').css('display', 'block');
      $('#div_fisheye_install_wsplit').css('display', 'block');
      g_fisheye_install = 0;
    }
  } else if (objid == 'div_fisheye_install_wall') {
    $('#div_fisheye_install_wall').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_desktop,#div_fisheye_install_cell').removeClass('cls_fisheye_button_select');
    $('#div_fisheye_install_origin,#div_fisheye_install_360,#div_fisheye_install_fourrect,#div_fisheye_install_split,#div_fisheye_install_wsplit,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    if (g_fisheye_support_num == 3) {
      $('#div_fisheye_install_fourrect').css('display', 'block');
      $('#div_fisheye_install_180').css('display', 'none');
      $('#div_fisheye_install_360').css('display', 'block');
      $('#div_fisheye_install_origin').css('display', 'block');
      $('#div_fisheye_install_split').css('display', 'none');
      $('#div_fisheye_install_wsplit').css('display', 'block');
      g_fisheye_install = 2;
    }
  } else if (objid == 'div_fisheye_install_origin') {
    $('#div_fisheye_install_origin').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_360,#div_fisheye_install_fourrect,#div_fisheye_install_split,#div_fisheye_install_wsplit,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    callfisheye(g_fisheye_install, 0);
    g_fisheye_mode = 0;
  } else if (objid == 'div_fisheye_install_360') {
    $('#div_fisheye_install_360').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_origin,#div_fisheye_install_fourrect,#div_fisheye_install_split,#div_fisheye_install_wsplit,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    callfisheye(g_fisheye_install, 1);
    g_fisheye_mode = 1;
  } else if (objid == 'div_fisheye_install_fourrect') {
    $('#div_fisheye_install_fourrect').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_360,#div_fisheye_install_origin,#div_fisheye_install_split,#div_fisheye_install_wsplit,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    if (g_fisheye_install == 1 || g_fisheye_install == 2) {
      callfisheye(g_fisheye_install, 2);
      g_fisheye_mode = 2;
    } else {
      callfisheye(g_fisheye_install, 1);
      g_fisheye_mode = 1;
    }
  } else if (objid == 'div_fisheye_install_split') {
    $('#div_fisheye_install_split').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_360,#div_fisheye_install_fourrect,#div_fisheye_install_origin,#div_fisheye_install_wsplit,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    if (g_fisheye_install == 1 || g_fisheye_install == 2) {
      callfisheye(g_fisheye_install, 3);
      g_fisheye_mode = 3;
    } else {
      callfisheye(g_fisheye_install, 2);
      g_fisheye_mode = 2;
    }
  } else if (objid == 'div_fisheye_install_wsplit') {
    $('#div_fisheye_install_wsplit').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_360,#div_fisheye_install_fourrect,#div_fisheye_install_split,#div_fisheye_install_origin,#div_fisheye_install_180').removeClass('cls_fisheye_button_select');
    if (g_fisheye_install == 0 || g_fisheye_install == 2) {
      callfisheye(g_fisheye_install, 3);
      g_fisheye_mode = 3;
    } else {
      callfisheye(g_fisheye_install, 4);
      g_fisheye_mode = 4;
    }
  } else if (objid == 'div_fisheye_install_180') {
    $('#div_fisheye_install_180').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_360,#div_fisheye_install_fourrect,#div_fisheye_install_split,#div_fisheye_install_wsplit,#div_fisheye_install_origin').removeClass('cls_fisheye_button_select');
    if (g_fisheye_install == 0) {
      callfisheye(g_fisheye_install, 4);
      g_fisheye_mode = 4;
    } else if (g_fisheye_install == 1) {
      callfisheye(g_fisheye_install, 5);
      g_fisheye_mode = 5;
    }
  }
}
function onptzmenu_handle_click(objid) {
  if (objid == 'div_listitem_preset') {
    $('#div_listitem_preset').addClass('cls_preset_header_selected');
    $('#div_listitem_cruise').removeClass('cls_preset_header_selected');
    $('#div_listitem_alternate').removeClass('cls_preset_header_selected');
    $('#div_listitem_trackpath').removeClass('cls_preset_header_selected');
    $('#div_preset_content').css('display', 'block');
    $('#div_preset_operations').css('display', 'block');
    $('#div_cruise_content').css('display', 'none');
    $('#div_cruise_operations').css('display', 'none');
    $('#div_alternate_content').css('display', 'none');
    $('#div_trackpath_contect').css('display', 'none');
  } else if (objid == 'div_listitem_cruise') {
    $('#div_listitem_preset').removeClass('cls_preset_header_selected');
    $('#div_listitem_cruise').addClass('cls_preset_header_selected');
    $('#div_listitem_alternate').removeClass('cls_preset_header_selected');
    $('#div_listitem_trackpath').removeClass('cls_preset_header_selected');
    $('#div_preset_content').css('display', 'none');
    $('#div_preset_operations').css('display', 'none');
    $('#div_cruise_content').css('display', 'block');
    $('#div_cruise_operations').css('display', 'block');
    $('#div_alternate_content').css('display', 'none');
    $('#div_trackpath_contect').css('display', 'none');
  } else if (objid == 'div_listitem_alternate') {
    $('#div_listitem_preset').removeClass('cls_preset_header_selected');
    $('#div_listitem_cruise').removeClass('cls_preset_header_selected');
    $('#div_listitem_alternate').addClass('cls_preset_header_selected');
    $('#div_listitem_trackpath').removeClass('cls_preset_header_selected');
    $('#div_preset_content').css('display', 'none');
    $('#div_preset_operations').css('display', 'none');
    $('#div_cruise_content').css('display', 'none');
    $('#div_cruise_operations').css('display', 'none');
    $('#div_alternate_content').css('display', 'block');
    $('#div_trackpath_contect').css('display', 'none');
  } else if (objid == 'div_listitem_trackpath') {
    $('#div_listitem_preset').removeClass('cls_preset_header_selected');
    $('#div_listitem_cruise').removeClass('cls_preset_header_selected');
    $('#div_listitem_alternate').removeClass('cls_preset_header_selected');
    $('#div_listitem_trackpath').addClass('cls_preset_header_selected');
    $('#div_preset_content').css('display', 'none');
    $('#div_preset_operations').css('display', 'none');
    $('#div_cruise_content').css('display', 'none');
    $('#div_cruise_operations').css('display', 'none');
    $('#div_alternate_content').css('display', 'none');
    $('#div_trackpath_contect').css('display', 'block');
  }
}
var g_cruise_list = [];
var g_cruise_index = 0;
var g_trackpath_index = 1;
var g_trackpath_count = 0;
var g_cruise_point_index = -1;
var g_cruise_point_count = [];
var g_trackpath_list = new Array(false, false, false);
function cruise_point_items(index, time) {
  return { ptindex: index, staytime: time };
}
function show_cruise_points_add(show) {
  initialize_cruise_add_preset_list();
  if (true == show) {
    var left = $('#div_cruise_button_add').offset().left;
    var top = $('#div_cruise_button_add').offset().top - 168;
    $('#div_cruise_point_add').css({ left: left, top: top, display: 'block' });
    $('#div_cruise_point_add').mouseleave(function () {
      $(this).css('display', 'none');
    });
  } else {
    $('#div_cruise_point_add').css('display', 'none');
  }
}
function on_cruise_index_change() {
  var curindex = $('#select_cruise_index').val();
  g_cruise_index = parseInt(curindex) - 1;
  initialize_cruise_item_points();
}
function on_trackpath_index_change() {
  var curindex = $('#select_trackpath_index').val();
  g_trackpath_index = parseInt(curindex);
}
function initialize_trackpath_list() {
  var listhtml = '';
  for (var i = 1; i <= 3; i++) {
    listhtml += "<option value='" + i + "'>" + i + '</option>';
  }
  $('#select_trackpath_index').html(listhtml);
}
function on_cruise_point_delete() {
  if (g_cruise_point_index < 0) {
    return;
  }
  g_cruise_list[g_cruise_index][g_cruise_point_index].ptindex = 0;
  if (g_cruise_point_index <= g_cruise_point_count[g_cruise_index] - 1) {
    var temparray = new Array();
    var tempindex = 0;
    for (var i = 0; i < g_cruise_list[g_cruise_index].length; i++) {
      if (g_cruise_list[g_cruise_index][i].ptindex > 0) {
        temparray[tempindex] = g_cruise_list[g_cruise_index][i];
        tempindex++;
      }
    }
    g_cruise_list[g_cruise_index] = temparray;
  } else {
    g_cruise_list[g_cruise_index] = new Array();
  }
  g_cruise_point_count[g_cruise_index] = 0;
  for (var i = 0; i < g_cruise_list[g_cruise_index].length; i++) {
    if (g_cruise_list[g_cruise_index][i].ptindex > 0) {
      g_cruise_point_count[g_cruise_index]++;
    }
  }
  g_cruise_point_index = -1;
  initialize_cruise_item_points();
  send_cruise_parameters();
}
function on_cruise_point_down() {
  if (g_cruise_point_index < 0) {
    return;
  }
  if (g_cruise_point_index >= 32) {
    return;
  }
  var tempindex = -1;
  if (g_cruise_point_index == g_cruise_point_count[g_cruise_index] - 1) {
    var tempv = g_cruise_list[g_cruise_index][g_cruise_point_count[g_cruise_index] - 1];
    for (var i = g_cruise_point_count[g_cruise_index] - 1; i >= 1; i--) {
      g_cruise_list[g_cruise_index][i] = g_cruise_list[g_cruise_index][i - 1];
    }
    g_cruise_list[g_cruise_index][0] = tempv;
    tempindex = 0;
  } else {
    var tempv = g_cruise_list[g_cruise_index][g_cruise_point_index];
    if (tempv == undefined) {
      return;
    }
    g_cruise_list[g_cruise_index][g_cruise_point_index] = g_cruise_list[g_cruise_index][g_cruise_point_index + 1];
    g_cruise_list[g_cruise_index][g_cruise_point_index + 1] = tempv;
    tempindex = g_cruise_point_index + 1;
  }
  initialize_cruise_item_points();
  send_cruise_parameters();
  fun_set_cruise_point_select(tempindex);
}
function on_cruise_call() {
  callcruise(g_cruise_index + 1);
}
function on_cruise_delete() {
  deletecruise(g_cruise_index + 1);
  g_cruise_list[g_cruise_index] = new Array();
  g_cruise_point_count[g_cruise_index] = 0;
  initialize_cruise_item_points();
}
function on_cruise_stop() {
  PtzStop();
}
function send_cruise_parameters() {
  var xmlpieces = '<index>' + (parseInt(g_cruise_index) + 1) + '</index>';
  for (var i = 0; i < g_cruise_list[g_cruise_index].length; i++) {
    xmlpieces += '<cruisepoint>';
    xmlpieces += '<preset>' + g_cruise_list[g_cruise_index][i].ptindex + '</preset>';
    xmlpieces += '<speed>1</speed>';
    xmlpieces += '<second>' + g_cruise_list[g_cruise_index][i].staytime + '</second>';
    xmlpieces += '</cruisepoint>';
  }
  setcruise(xmlpieces);
}
function initialize_cruise_item_points() {
  if (g_cruise_list.length <= 0 || g_cruise_list.length <= g_cruise_index) {
    $('#div_cruise_point').html('');
    return;
  }
  var listcontent = '';
  $('#div_cruise_point').html('');
  var tempindex = 0;
  var strpreset = translate_page_item(TARGET_PAGE_PREVIEW, 'preset', '', ITEM_TYPE_NONE);
  var strstay = translate_page_item(TARGET_PAGE_PREVIEW, 'staytime', '', ITEM_TYPE_NONE);
  var strsecd = translate_page_item(TARGET_PAGE_COMMON, 'second', '', ITEM_TYPE_NONE);
  strsecd = ' ' + strsecd;
  for (var i = 0; i < g_cruise_list[g_cruise_index].length; i++) {
    if (g_cruise_list[g_cruise_index][i].ptindex > 0) {
      var staysec = g_cruise_list[g_cruise_index][i].staytime;
      listcontent += "<div id='div_cruise_point_item_" + tempindex + "' class='cls_list_item' style='height: 26px;' onclick='on_cruise_point_item_clicked(this.id.toString())'>";
      listcontent += "<div id='div_cruise_point_item_value_" + tempindex + "' style='height: 22px;color: #ccc;margin-left: 10px;width: 85px;margin-top: 2px;float: left;'>" + strpreset + ' ' + g_cruise_list[g_cruise_index][i].ptindex + '</div>';
      listcontent += "<select id='select_cruise_point_item_stay_" + tempindex + "' title='" + strstay + "' style='width: 68px;margin: 2px 0;float: right;' onchange='on_cruise_point_staytime_change(this.id.toString())'>";
      if (staysec <= 5) {
        listcontent += "<option value='" + 5 + "' selected>" + 5 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 5 + "'>" + 5 + strsecd + '</option>';
      }
      if (staysec <= 10 && staysec > 5) {
        listcontent += "<option value='" + 10 + "' selected>" + 10 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 10 + "'>" + 10 + strsecd + '</option>';
      }
      if (staysec <= 20 && staysec > 10) {
        listcontent += "<option value='" + 20 + "' selected>" + 20 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 20 + "'>" + 20 + strsecd + '</option>';
      }
      if (staysec <= 30 && staysec > 20) {
        listcontent += "<option value='" + 30 + "' selected>" + 30 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 30 + "'>" + 30 + strsecd + '</option>';
      }
      if (staysec <= 45 && staysec > 30) {
        listcontent += "<option value='" + 45 + "' selected>" + 45 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 45 + "'>" + 45 + strsecd + '</option>';
      }
      if (staysec <= 60 && staysec > 45) {
        listcontent += "<option value='" + 60 + "' selected>" + 60 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 60 + "'>" + 60 + strsecd + '</option>';
      }
      if (staysec <= 90 && staysec > 60) {
        listcontent += "<option value='" + 90 + "' selected>" + 90 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 90 + "'>" + 90 + strsecd + '</option>';
      }
      if (staysec > 90) {
        listcontent += "<option value='" + 120 + "' selected>" + 120 + strsecd + '</option>';
      } else {
        listcontent += "<option value='" + 120 + "'>" + 120 + strsecd + '</option>';
      }
      listcontent += '</select>';
      listcontent += '</div>';
      tempindex++;
    }
  }
  $('#div_cruise_point').html(listcontent);
  if (g_cruise_point_count[g_cruise_index] >= 32) {
    $('#div_cruise_button_add').removeClass('cls_cruise_buttons');
    $('#div_cruise_button_add').addClass('cls_cruise_buttons_disabled');
    $('#div_cruise_button_minus').addClass('cls_cruise_buttons');
    $('#div_cruise_button_minus').removeClass('cls_cruise_buttons_disabled');
  } else if (g_cruise_point_count[g_cruise_index] == 0) {
    $('#div_cruise_button_minus').addClass('cls_cruise_buttons_disabled');
    $('#div_cruise_button_minus').removeClass('cls_cruise_buttons');
    $('#div_cruise_button_add').addClass('cls_cruise_buttons');
    $('#div_cruise_button_add').removeClass('cls_cruise_buttons_disabled');
  } else {
    $('#div_cruise_button_add').addClass('cls_cruise_buttons');
    $('#div_cruise_button_add').removeClass('cls_cruise_buttons_disabled');
    $('#div_cruise_button_minus').addClass('cls_cruise_buttons');
    $('#div_cruise_button_minus').removeClass('cls_cruise_buttons_disabled');
  }
}
function on_cruise_point_staytime_change(objid) {
  var listname = objid.split('_');
  var tempindex = parseInt(listname[listname.length - 1]);
  if (tempindex <= g_cruise_list[g_cruise_index].length - 1) {
    g_cruise_list[g_cruise_index][tempindex].staytime = $('#' + objid).val();
  }
  send_cruise_parameters();
}
function initialize_cruise_add_preset_list() {
  $('#div_cruise_point_add').html('');
  var listcontent = '';
  var strpreset = translate_page_item(TARGET_PAGE_PREVIEW, 'preset', '', ITEM_TYPE_NONE);
  for (var i = 0; i < g_preset_name.length; i++) {
    if (g_preset_name[i].length > 0) {
      listcontent +=
        "<div id='div_cruise_point_add_item_" +
        i +
        "' class='cls_list_item' onclick='on_cruise_point_add_item_clicked(this.id.toString())'><div id='div_cruise_point_add_item_value_" +
        i +
        "' style='height: 22px;color: #ccc;margin-left: 12px;margin-top: 2px;'>" +
        strpreset +
        ' ' +
        (i + 1) +
        '</div></div>';
    }
  }
  $('#div_cruise_point_add').html(listcontent);
}
function on_cruise_point_item_clicked(objid) {
  var listname = objid.split('_');
  g_cruise_point_index = parseInt(listname[listname.length - 1]);
  for (var i = 0; i < g_cruise_point_count[g_cruise_index]; i++) {
    $('#div_cruise_point_item_' + i).removeClass('cls_list_item_select');
  }
  $('#' + objid).addClass('cls_list_item_select');
}
function fun_set_cruise_point_select(index) {
  g_cruise_point_index = parseInt(index);
  for (var i = 0; i < g_cruise_point_count[g_cruise_index]; i++) {
    $('#div_cruise_point_item_' + i).removeClass('cls_list_item_select');
  }
  $('#div_cruise_point_item_' + index).addClass('cls_list_item_select');
}
function on_cruise_point_add_item_clicked(objid) {
  var listname = objid.split('_');
  g_cruise_list[g_cruise_index][g_cruise_list[g_cruise_index].length] = new cruise_point_items(parseInt(listname[listname.length - 1]) + 1, 5);
  g_cruise_point_count[g_cruise_index] = 0;
  for (var i = 0; i < g_cruise_list[g_cruise_index].length; i++) {
    if (g_cruise_list[g_cruise_index][i].ptindex > 0) {
      g_cruise_point_count[g_cruise_index]++;
    }
  }
  initialize_cruise_item_points();
  show_cruise_points_add(false);
  send_cruise_parameters();
}
function initialize_fisheye_view(install, view) {
  var fisheyesubitems = [
    ['#div_fisheye_install_origin', '#div_fisheye_install_fourrect', '#div_fisheye_install_split', '#div_fisheye_install_wsplit', '#div_fisheye_install_180'],
    ['#div_fisheye_install_origin', '#div_fisheye_install_360', '#div_fisheye_install_fourrect', '#div_fisheye_install_split', '#div_fisheye_install_wsplit', '#div_fisheye_install_180'],
    ['#div_fisheye_install_origin', '#div_fisheye_install_360', '#div_fisheye_install_fourrect', '#div_fisheye_install_wsplit']
  ];
  if (install == 1) {
    $('#div_fisheye_install_cell').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_fourrect').css('display', 'block');
    $('#div_fisheye_install_180').css('display', 'block');
    $('#div_fisheye_install_360').css('display', 'block');
    $('#div_fisheye_install_origin').css('display', 'block');
    $('#div_fisheye_install_split').css('display', 'block');
    $('#div_fisheye_install_wsplit').css('display', 'block');
    g_fisheye_install = 1;
  } else if (install == 0) {
    $('#div_fisheye_install_desktop').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_fourrect').css('display', 'block');
    $('#div_fisheye_install_180').css('display', 'block');
    $('#div_fisheye_install_360').css('display', 'none');
    $('#div_fisheye_install_origin').css('display', 'block');
    $('#div_fisheye_install_split').css('display', 'block');
    $('#div_fisheye_install_wsplit').css('display', 'block');
    g_fisheye_install = 0;
  } else if (install == 2) {
    $('#div_fisheye_install_wall').addClass('cls_fisheye_button_select');
    $('#div_fisheye_install_fourrect').css('display', 'block');
    $('#div_fisheye_install_180').css('display', 'none');
    $('#div_fisheye_install_360').css('display', 'block');
    $('#div_fisheye_install_origin').css('display', 'block');
    $('#div_fisheye_install_split').css('display', 'none');
    $('#div_fisheye_install_wsplit').css('display', 'block');
    g_fisheye_install = 2;
  }
  for (var i = 0; i < fisheyesubitems[install].length; i++) {
    $(fisheyesubitems[install][i]).css('display', 'inline');
    if (i == view) {
      $(fisheyesubitems[install][i]).addClass('cls_fisheye_button_select');
    }
  }
}
function getfisheyeparam() {
  $.ajax({
    url: '/action/get?subject=fisheye',
    type: 'post',
    dataType: 'xml',
    async: false,
    success: function (xml) {
      var install = $(xml).find('install').text();
      var view = $(xml).find('view').text();
      if (g_fisheye_support_num != 3) {
        install = g_fisheye_install;
      }
      initialize_fisheye_view(install, view);
    }
  });
}
function callfisheye(install, view) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<fisheye>' + '<install>' + install + '</install>' + '<view>' + view + '</view>' + '</fisheye>' + '</fisheye>';
  $.ajax({
    url: '/action/set?subject=fisheye',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
var g_preset_name = [];
var g_ptz_parameters = '';
function getptzparam() {
  $.ajax({
    url: '/action/get?subject=ptz',
    type: 'post',
    dataType: 'xml',
    async: false,
    success: function (xml) {
      g_ptz_parameters = xml;
      var speed = $(xml).find('speed').first().text();
      $('#div_slider_ptzctrl_speed').slider('value', parseInt(speed) + 1);
      $('#div_ptzctrl_speed_value').text(parseInt(speed) + 1);
      $(xml)
        .find('preset')
        .children('pname')
        .each(function () {
          if (g_preset_name.length < g_npreset_items) {
            g_preset_name[g_preset_name.length] = $(this).text();
          }
        });
      var tempindex = 0;
      g_cruise_point_count[0] = 0;
      g_cruise_point_count[1] = 0;
      g_cruise_point_count[2] = 0;
      $(xml)
        .find('cruise')
        .each(function () {
          var points = 0;
          $(this)
            .find('cruisepoint')
            .each(function () {
              if (points == 0) {
                g_cruise_list[tempindex] = new Array();
              }
              var pointindex = $(this).children('preset').text();
              var pointtimes = $(this).children('second').text();
              if (pointindex > 0) {
                g_cruise_list[tempindex][points] = new cruise_point_items(pointindex, pointtimes);
                g_cruise_point_count[tempindex]++;
                points++;
              }
            });
          tempindex++;
        });
      g_trackpath_count = 0;
      var trackpathindex = 0;
      $(xml)
        .find('pattern')
        .children()
        .each(function () {
          if ($(this).text().length > 0) {
            if (trackpathindex < 3) {
              g_trackpath_list[trackpathindex] = true;
            }
            g_trackpath_count++;
          } else {
            if (trackpathindex < 3) {
              g_trackpath_list[trackpathindex] = false;
            }
          }
          trackpathindex++;
        });
    }
  });
}
function setptzspeed(val) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptz ver="2.0">' + '<speed>' + val + '</speed>' + '</ptz>' + '</request>';
  if (g_ptz_parameters.length <= 0) {
    return;
  }
  $tagxml = $(g_ptz_parameters);
  $tagxml.find('ptz').children('speed').text(val);
  var serializer = new XMLSerializer();
  var tagstr = serializer.serializeToString($tagxml[0]);
  if (tagstr.length < 64) {
    tagstr = serializer.serializeToString($tagxml[1]);
  }
  if (tagstr.length < 64) {
    tagstr = serializer.serializeToString($tagxml[2]);
  }
  if (tagstr.indexOf('<?xml version') < 0) {
    tagstr = '<?xml version="1.0" encoding="utf-8"?>' + tagstr;
  }
  $.ajax({
    url: '/action/set?subject=ptz',
    type: 'post',
    data: tagstr,
    dataType: 'xml',
    async: true
  });
}
function callpreset(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4097</cmd>' + '<preset>' + '<index>' + index + '</index>' + '</preset>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function setpreset(index, name) {
  if (name.length <= 0) {
    return;
  }
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4098</cmd>' + '<preset>' + '<index>' + index + '</index>' + '<name>' + name + '</name>' + '</preset>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function deletepreset(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4099</cmd>' + '<preset>' + '<index>' + index + '</index>' + '</preset>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function callcruise(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4105</cmd>' + '<cruise>' + '<index>' + index + '</index>' + '</cruise>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function setcruise(cruisespoints) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4103</cmd>' + '<cruise>' + cruisespoints + '</cruise>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function deletecruise(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4104</cmd>' + '<cruise>' + '<index>' + index + '</index>' + '</cruise>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function fun_on_alternate_start() {
  setalternatestart();
}
function fun_on_alternate_end() {
  setalternateend();
}
function fun_on_alternate_call() {
  callalternate();
}
function fun_on_alternate_stop() {
  PtzStop();
}
function fun_on_trackpath_start() {
  settrackpath(g_trackpath_index);
}
function fun_on_trackpath_end() {
  endtrackpath(g_trackpath_index);
}
function fun_on_trackpath_call() {
  calltrackpath(g_trackpath_index);
}
function fun_on_trackpath_stop() {
  PtzStop();
}
function fun_on_trackpath_delete() {
  deletetrackpath(g_trackpath_index);
}
function setalternatestart() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4106</cmd>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function setalternateend() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4107</cmd>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function callalternate() {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4108</cmd>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function settrackpath(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4109</cmd>' + '<pattern>' + '<index>' + index + '</index>' + '</pattern>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function endtrackpath(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4110</cmd>' + '<pattern>' + '<index>' + index + '</index>' + '<name>tk</name>' + '</pattern>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function calltrackpath(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4111</cmd>' + '<pattern>' + '<index>' + index + '</index>' + '</pattern>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function deletetrackpath(index) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ptzcmd>' + '<cmd>4112</cmd>' + '<pattern>' + '<index>' + index + '</index>' + '</pattern>' + '</ptzcmd>' + '</request>';
  $.ajax({
    url: '/action/ptz?subject=ctrl',
    type: 'post',
    data: xml,
    dataType: 'xml',
    async: true
  });
}
function fun_on_fisheye_param_change() {
  if (g_bis_setting) {
    return;
  }
  var curid = this.id.toString();
  if (curid === 'div_slider_fisheye_centerx') {
    var value = $('#div_slider_fisheye_centerx').slider('value');
    $('#div_fisheye_centerx_value').text(value);
    g_centerpt_offsetx = value;
    if (CurBrowserIsIE() && null != g_ocx_plugin) {
      g_ocx_plugin.SetCenterPoint(g_video_width / 2 + g_centerpt_offsetx, g_video_height / 2 + g_centerpt_offsety);
    }
  } else if (curid === 'div_slider_fisheye_centery') {
    var value = $('#div_slider_fisheye_centery').slider('value');
    $('#div_fisheye_centery_value').text(value);
    g_centerpt_offsety = value;
    if (CurBrowserIsIE() && null != g_ocx_plugin) {
      g_ocx_plugin.SetCenterPoint(g_video_width / 2 + g_centerpt_offsetx, g_video_height / 2 + g_centerpt_offsety);
    }
  } else if (curid === 'div_slider_fisheye_inner') {
    var value1 = $('#div_slider_fisheye_inner').slider('value');
    var value2 = $('#div_slider_fisheye_outer').slider('value');
    if (value1 > value2 - 2) {
      $('#div_slider_fisheye_outer').slider('value', parseInt(value1) + 2);
      $('#div_fisheye_outer_value').text(parseInt(value1) + 2 + '%');
      g_outer_radius = value1 + 2;
    }
    $('#div_fisheye_inner_value').text(value1 + '%');
    g_inner_radius = value1;
    if (CurBrowserIsIE() && null != g_ocx_plugin) {
      g_ocx_plugin.SetClipAnnulus((g_inner_radius / 100) * g_refrence_radius, (g_outer_radius / 100) * g_refrence_radius);
    }
  } else if (curid === 'div_slider_fisheye_outer') {
    var value1 = $('#div_slider_fisheye_inner').slider('value');
    var value2 = $('#div_slider_fisheye_outer').slider('value');
    if (value2 - 2 < value1) {
      $('#div_slider_fisheye_inner').slider('value', parseInt(value2) - 2);
      $('#div_fisheye_inner_value').text(parseInt(value2) - 2 + '%');
      g_inner_radius = value2 - 2;
    }
    $('#div_fisheye_outer_value').text(value2 + '%');
    g_outer_radius = value2;
    if (CurBrowserIsIE() && null != g_ocx_plugin) {
      g_ocx_plugin.SetClipAnnulus((g_inner_radius / 100) * g_refrence_radius, (g_outer_radius / 100) * g_refrence_radius);
    }
  } else if (curid === 'div_slider_fisheye_angle') {
    var value = $('#div_slider_fisheye_angle').slider('value');
    $('#div_fisheye_angle_value').text(value);
    g_guides_angle = value;
    if (CurBrowserIsIE() && null != g_ocx_plugin) {
      g_ocx_plugin.SetReflineAngle(g_guides_angle);
    }
  }
}
function fun_on_start_fisheyeset_change() {
  var enable = $('#check_enable_fisheye_settings').prop('checked');
  if (enable) {
    $('#div_slider_fisheye_centerx').slider('enable');
    $('#div_slider_fisheye_centery').slider('enable');
    $('#div_slider_fisheye_inner').slider('enable');
    $('#div_slider_fisheye_outer').slider('enable');
    $('#div_slider_fisheye_angle').slider('enable');
    $('#button_fisheye_param_save').attr('disabled', false);
    g_enable_fisheye_setting = true;
    if (CurBrowserIsIE() && null !== g_ocx_plugin) {
      g_ocx_plugin.SetFisheyeGuides(1);
    } else {
      $('#div_video_draw').css('display', 'block');
    }
    callfisheye(g_fisheye_install, 0);
  } else {
    $('#div_slider_fisheye_centerx').slider('disable');
    $('#div_slider_fisheye_centery').slider('disable');
    $('#div_slider_fisheye_inner').slider('disable');
    $('#div_slider_fisheye_outer').slider('disable');
    $('#div_slider_fisheye_angle').slider('disable');
    $('#button_fisheye_param_save').attr('disabled', true);
    g_enable_fisheye_setting = false;
    if (CurBrowserIsIE() && null !== g_ocx_plugin) {
      g_ocx_plugin.SetFisheyeGuides(0);
    } else {
      $('#div_video_draw').css('display', 'none');
    }
    callfisheye(g_fisheye_install, g_fisheye_mode);
  }
}
function getfisheyecalib() {
  $.ajax({
    url: '/action/get?subject=fisheyecalib',
    type: 'post',
    dataType: 'xml',
    async: true,
    success: function (xml) {
      g_guides_angle = parseInt($(xml).find('viewangle').text());
      g_centerpt_xcoor = parseInt($(xml).find('xcenter').text());
      g_centerpt_ycoor = parseInt($(xml).find('ycenter').text());
      g_centerpt_offsetx = parseInt($(xml).find('xoffset').text());
      g_centerpt_offsety = parseInt($(xml).find('yoffset').text());
      g_inner_radius = Math.floor((parseInt($(xml).find('inradius').text()) * 100) / g_refrence_radius);
      g_outer_radius = Math.floor((parseInt($(xml).find('radius').text()) * 100) / g_refrence_radius);
      showfisheyeparam();
    }
  });
}
function setfisheyecalib() {
  var tagxml =
    '<?xml vertion="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<fisheyecalib ver="2.0">' +
    '<radius>' +
    Math.round((g_refrence_radius * g_outer_radius) / 100) +
    '</radius>' +
    '<xoffset>' +
    g_centerpt_offsetx +
    '</xoffset>' +
    '<yoffset>' +
    g_centerpt_offsety +
    '</yoffset>' +
    '<xcenter>' +
    g_centerpt_xcoor +
    '</xcenter>' +
    '<ycenter>' +
    g_centerpt_ycoor +
    '</ycenter>' +
    '<inradius>' +
    Math.round((g_refrence_radius * g_inner_radius) / 100) +
    '</inradius>' +
    '<viewangle>' +
    g_guides_angle +
    '</viewangle>' +
    '</fisheyecalib>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=fisheyecalib', tagxml, function (result) { });
}
var g_fisheye_support = false;
var g_enable_fisheye_setting = false;
var g_get_fisheye_param = true;
var g_centerpt_xcoor = 0;
var g_centerpt_ycoor = 0;
var g_centerpt_offsetx = 0;
var g_centerpt_offsety = 0;
var g_guides_angle = 0;
var g_inner_radius = 0;
var g_outer_radius = 0;
var g_video_width = 0;
var g_video_height = 0;
var g_refrence_radius = 0;
var g_flash_refrence_radiusx = 0;
var g_flash_refrence_radiusy = 0;
var g_flash_startptx = 0;
var g_flash_startpty = 0;
var g_bis_setting = false;
var g_draw_context = null;
function showfisheyeparam() {
  g_bis_setting = true;
  $('#div_slider_fisheye_centerx').slider('value', g_centerpt_offsetx);
  $('#div_slider_fisheye_centery').slider('value', g_centerpt_offsety);
  $('#div_slider_fisheye_inner').slider('value', g_inner_radius);
  $('#div_slider_fisheye_outer').slider('value', g_outer_radius);
  $('#div_slider_fisheye_angle').slider('value', g_guides_angle);
  g_bis_setting = false;
  $('#div_fisheye_centerx_value').text(g_centerpt_offsetx);
  $('#div_fisheye_centery_value').text(g_centerpt_offsety);
  $('#div_fisheye_inner_value').text(g_inner_radius + '%');
  $('#div_fisheye_outer_value').text(g_outer_radius + '%');
  $('#div_fisheye_angle_value').text(g_guides_angle);
  if (CurBrowserIsIE()) {
    if (null !== g_ocx_plugin) {
      if (g_enable_fisheye_setting) {
        g_ocx_plugin.SetFisheyeGuides(1);
      }
      g_ocx_plugin.SetCenterPoint(g_video_width / 2 + g_centerpt_offsetx, g_video_height / 2 + g_centerpt_offsety);
      g_ocx_plugin.SetClipAnnulus((g_inner_radius * g_refrence_radius) / 100, (g_outer_radius * g_refrence_radius) / 100);
      g_ocx_plugin.SetReflineAngle(g_guides_angle);
    }
  } else {
    fun_show_fisheye_para_inflash();
  }
}
function fun_check_fisheye_settings(stream) {
  if (stream === 0) {
    $('#button_fisheye_param_save').attr('disabled', false);
    $('#div_slider_fisheye_centerx').slider('enable');
    $('#div_slider_fisheye_centery').slider('enable');
    $('#div_slider_fisheye_inner').slider('enable');
    $('#div_slider_fisheye_outer').slider('enable');
    $('#div_slider_fisheye_angle').slider('enable');
  } else if (stream === 1) {
    $('#button_fisheye_param_save').attr('disabled', true);
    $('#div_slider_fisheye_centerx').slider('disable');
    $('#div_slider_fisheye_centery').slider('disable');
    $('#div_slider_fisheye_inner').slider('disable');
    $('#div_slider_fisheye_outer').slider('disable');
    $('#div_slider_fisheye_angle').slider('disable');
  } else if (stream === 3) {
    $('#button_fisheye_param_save').attr('disabled', true);
    $('#div_slider_fisheye_centerx').slider('disable');
    $('#div_slider_fisheye_centery').slider('disable');
    $('#div_slider_fisheye_inner').slider('disable');
    $('#div_slider_fisheye_outer').slider('disable');
    $('#div_slider_fisheye_angle').slider('disable');
  }
}
function fun_get_current_video_resolution(stream) {
  if (g_enable_fisheye_setting) {
    fun_check_fisheye_settings(stream);
  }
  sdk_getipcparam('/action/get?subject=videoenc&stream=' + stream, function (result) {
    if (result != false) {
      $xml = $(result);
      var resolution = $xml.find('resolution').text();
      var whs = resolution.split('x');
      if (whs.length === 2) {
        g_video_width = parseInt(whs[0]);
        g_video_height = parseInt(whs[1]);
        g_refrence_radius = g_video_width > g_video_height ? g_video_height / 2 : g_video_width / 2;
      }
    }
  });
}
function fun_show_fisheye_para_inflash() {
  var ptx = $('#div_video_player_show').position().top;
  var pty = $('#div_video_player_show').position().left;
  var taghtml =
    '<div id="div_video_draw" style="width: ' +
    g_nplugin_width +
    'px;height: ' +
    g_nplugin_height +
    'px;z-index: 1999;position: absolute;top:' +
    ptx +
    'px;left:' +
    pty +
    'px;">' +
    '<canvas id="canvas_liveview_region" width="' +
    g_nplugin_width +
    '" height="' +
    g_nplugin_height +
    '"></canvas>' +
    '</div>';
  $('#div_video_player_show').append(taghtml);
  setTimeout(fun_init_videodraw_inflash, 400);
}
function fun_on_video_size_change() {
  var canvas = document.getElementById('canvas_liveview_region');
  if (canvas) {
    canvas.setAttribute('width', g_nplugin_width);
    canvas.setAttribute('height', g_nplugin_height);
  }
}
function fun_init_videodraw_inflash() {
  var canvas = document.getElementById('canvas_liveview_region');
  if (canvas) {
    g_draw_context = canvas.getContext('2d');
    if (g_draw_context) {
      g_draw_context.lineWidth = 4;
      setInterval(fun_draw_fisheye_parameters, 50);
    }
  }
}
function fun_draw_fisheye_parameters() {
  if (!g_enable_fisheye_setting) {
    return;
  }
  if (g_video_height <= 0 || g_video_width <= 0 || null === g_draw_context) {
    return;
  }
  g_draw_context.lineWidth = 4;
  g_draw_context.lineCap = 'round';
  var refline = g_nplugin_width < g_nplugin_height ? g_nplugin_width / 2 : g_nplugin_height / 2;
  var offsetx = fun_transform_coordinate(g_centerpt_offsetx, g_video_width, g_nplugin_width);
  var offsety = fun_transform_coordinate(g_centerpt_offsety, g_video_height, g_nplugin_height);
  g_draw_context.clearRect(0, 0, g_nplugin_width, g_nplugin_height);
  if (g_video_width > 0 && g_video_height > 0) {
    g_draw_context.fillStyle = 'red';
    g_draw_context.beginPath();
    g_draw_context.arc(g_nplugin_width / 2 + offsetx, g_nplugin_height / 2 + offsety, 8, 0, 2 * Math.PI);
    g_draw_context.fill();
  }
  if (g_inner_radius < g_outer_radius && g_outer_radius < g_refrence_radius) {
    fun_calculate_radius();
    g_draw_context.strokeStyle = '#00b0f0';
    baseellipse(g_draw_context, g_nplugin_width / 2 + offsetx, g_nplugin_height / 2 + offsety, (g_flash_refrence_radiusx * g_inner_radius) / 100, (g_flash_refrence_radiusy * g_inner_radius) / 100);
    g_draw_context.strokeStyle = '#ffc000';
    baseellipse(g_draw_context, g_nplugin_width / 2 + offsetx, g_nplugin_height / 2 + offsety, (g_flash_refrence_radiusx * g_outer_radius) / 100, (g_flash_refrence_radiusy * g_outer_radius) / 100);
  }
  if (g_guides_angle >= 0 && g_guides_angle <= 360) {
    fun_calculate_line_points(g_guides_angle);
    g_draw_context.strokeStyle = '#00b050';
    g_draw_context.beginPath();
    g_draw_context.moveTo(g_nplugin_width / 2 + offsetx - g_flash_startptx, g_nplugin_height / 2 + offsety - g_flash_startpty);
    g_draw_context.lineTo(g_nplugin_width / 2 + offsetx + g_flash_startptx, g_nplugin_height / 2 + offsety + g_flash_startpty);
    g_draw_context.stroke();
  }
}
function baseellipse(context, x, y, a, b) {
  var step = a > b ? 1 / a : 1 / b;
  context.beginPath();
  context.moveTo(x + a, y);
  for (var i = 0; i < 2 * Math.PI; i += step) {
    context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
  }
  context.closePath();
  context.stroke();
}
function fun_calculate_radius() {
  g_flash_refrence_radiusy = g_nplugin_height / 2;
  g_flash_refrence_radiusx = (g_nplugin_width * g_video_height) / g_video_width / 2;
}
function fun_calculate_line_points(angle) {
  if (angle > 180) {
    angle -= 180;
  }
  g_flash_startptx = Math.cos((angle * Math.PI * 2) / 360) * ((g_flash_refrence_radiusx * g_outer_radius) / 100);
  g_flash_startpty = Math.sin((angle * Math.PI * 2) / 360) * ((g_flash_refrence_radiusy * g_outer_radius) / 100);
}
function fun_transform_coordinate(a, b, c) {
  var temp = Math.round((a * c) / b);
  return temp;
}
var seqno = -1;
var picture_count = 0;
var fdworker = null;
function worker_msg_item(a) {
  this.seq = a;
  return this;
}
function fun_get_facedct_pictures() {
  if (CurBrowserIsIE()) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var fname = xhttp.getResponseHeader('FName');
        var fseqn = xhttp.getResponseHeader('FSeqno');
        seqno = parseInt(fseqn);
        var blob = this.response;
        var rawdata = [];
        rawdata.push(blob);
        var tagurl = window.URL.createObjectURL(new Blob(rawdata, { type: 'application/octet-stream' }));
        fun_add_picture_to_list(tagurl, fname);
        fun_get_facedct_pictures();
      } else if (this.readyState == 4 && this.status != 200) {
        setTimeout('fun_get_facedct_pictures()', 600);
      }
    };
    xhttp.open('POST', '/action/face?subject=facepic&last=' + String(seqno), false);
    xhttp.setRequestHeader('X-UA-Compatible', 'IE=edge');
    xhttp.setRequestHeader('Cache-Control', 'no-cache, must-revalidate');
    xhttp.setRequestHeader('Pragma', 'no-cache');
    xhttp.responseType = 'blob';
    xhttp.send();
  } else {
    if (null === fdworker) {
      fdworker = new Worker('/script/fdpic_worker.js');
      fdworker.onmessage = function (ev) {
        if (ev.data.sta === 'success') {
          var tagurl = window.URL.createObjectURL(ev.data.blob);
          seqno = ev.data.seq;
          fun_add_picture_to_list(tagurl, ev.data.file);
          fun_get_facedct_pictures();
        } else if (ev.data.sta === 'failed' || ev.data.sta === 'timeout') {
          setTimeout('fun_get_facedct_pictures()', 400);
        }
      };
    }
    fdworker.postMessage(new worker_msg_item(seqno));
  }
}

function fun_add_picture_to_list(url, faceid) {
  var idlist = faceid.split('_');
  var tagpicid = idlist[idlist.length - 2];
  var tagpicitem =
    '<div id="div_image_row_' +
    seqno +
    '" class="cls_picture_list_item">' +
    '<img id="img_facedct_capture_' +
    seqno +
    '" style="width: 130px;height: 130px;">' +
    '<label id="label_face_id_' +
    seqno +
    '" style="height: 24px;width: auto;text-align: center;font-size: 16px;font-weight: bold;position: relative;top:-26px;">ID:' +
    tagpicid +
    '</label>' +
    '</div>';
  $('#div_face_detection_show').append(tagpicitem);
  var img = document.getElementById('img_facedct_capture_' + seqno);
  if (picture_count > 20) {
    var childrows = document.getElementById('div_face_detection_show').childNodes;
    document.getElementById('div_face_detection_show').removeChild(childrows[0]);
    picture_count--;
  }
  img.onload = function (ev) {
    window.URL.revokeObjectURL(url);
    picture_count++;
    var height = document.getElementById('div_face_detection_show').scrollHeight;
    $('#div_face_detection_show').scrollTop(height);
  };
  img.src = url;
}

