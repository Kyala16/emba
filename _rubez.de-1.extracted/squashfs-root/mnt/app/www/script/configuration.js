var g_nWindowWidth = 0,
  g_nWindowHeight = 0;
var g_subpage_name = '';
//var qt_ws//qt
//var qtStatus = false;//qt connect status（false-fail，true-success）
  // var TIMEOUT = 600000
  // function getStartTime(){
  //   let start = localStorage.getItem('loginTimeoutStart')
  //   return parseInt(start,10);
  // }
  // function clearTimeoutData() {
  //   localStorage.removeItem('loginTimeoutStart');
  // }
  // function checkTimeout() {
  //   const startTime = getStartTime();
  //   const elapsed = new Date().getTime() - startTime;

  //   if (elapsed >= TIMEOUT) {
  //     clearTimeoutData();
  //     window.location.href = 'login.html'; 
  //   } else {
  //     setTimeout(() => {
  //       clearTimeoutData();
  //       window.location.href = 'login.html';
  //     }, TIMEOUT - elapsed);
  //   }
  // }
$(document).ready(function () {
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
    $('#div_configuration_content').css({ height: nWindowHeight - 42, width: nWindowWidth });
    $('#div_children_page_area').css('height', nWindowHeight - 78);
    $('#div_show_detail').css('width', nWindowWidth - 250);
    $('#div_declare').css('width', nWindowWidth - 250);
    var subpageheight = nWindowHeight - 104;
    if (nWindowHeight > 660 && nWindowWidth > 1100) {
      $('#div_declare').css('display', 'block');
    } else {
      $('#div_children_page_area').css('height', nWindowHeight - 42);
      $('#div_declare').css('display', 'none');
      subpageheight = nWindowHeight - 66;
    }
    $('#frame_subpage').attr({ width: nWindowWidth - 370, height: subpageheight });
    g_nWindowWidth = nWindowWidth;
    g_nWindowHeight = nWindowHeight;
  });
  $('#div_preview').css('font-size', '14px');
  $('#div_playback').css('font-size', '14px');
  $('#div_configuration').css('font-size', '14px');
  $('#frame_subpage').scrollHeight;


  // ===========================iframe========================================
  const isValidString = (str) => {
    const regex = /^subpages\/.*\.html\?slce=/;
    return regex.test(str);
  }
  const iframe = $('#frame_subpage')[0];
  // 创建观察者实例
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        var newSrc = $(iframe).attr('src');
        // console.log('iframe src changed to:', newSrc);
        if (isValidString(newSrc) || newSrc == 'subpages/guide.html') { // 处理 src 变化后的逻辑
          // console.log('is true');
        } else {
          //exitQT();
          localStorage.clear();
          fun_toTagetpage('login.html');
        }
      }
    });
  });

  // 配置观察选项
  const config = { attributes: true, attributeFilter: ['src'] };
  // 开始观察目标节点
  observer.observe(iframe, config);

  // observer.disconnect(); // del 
  // ===========================iframe========================================

  fun_Register_Event();
});
$(window).on('load', function () {
  var nWindowWidth = $(window).width();
  var nWindowHeight = $(window).height();
  var nScrollWidth = window.innerWidth - document.body.clientWidth;
  $('#div_configuration_content').css({ height: nWindowHeight - 40, width: '100%', 'margin-top': '2px' });
  $('#div_show_detail').css('width', nWindowWidth - 251);
  $('#div_declare').css('width', nWindowWidth - 250);
  $('#div_children_page_area').css('height', nWindowHeight - 78);
  var subpageheight = nWindowHeight - 106;
  if (nWindowHeight > 660 && nWindowWidth > 1100) {
    $('#div_declare').css('display', 'block');
  } else {
    $('#div_children_page_area').css('height', nWindowHeight - 42);
    $('#div_declare').css('display', 'none');
    subpageheight = nWindowHeight - 70;
  }
  $('#frame_subpage').attr({ width: nWindowWidth - 370, height: subpageheight });

  $('#div_preview').css({ 'font-size': '14px' });
  $('#div_playback').css('font-size', '14px');
  $('#div_configuration').css({
    'font-size': '14px',
    color: 'white',
    'background-color': 'rgb(123, 185, 51)'
  });
  g_nWindowWidth = nWindowWidth;
  g_nWindowHeight = nWindowHeight;
  fun_get_login_user();
});
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
        if(username == 'admin'){
          //checkTimeout()
          $('#div_submenu_item_log').css('display', 'block');
        }else{
          $('#div_submenu_item_log').remove();
        }
        $('#span_username').text(username);
        fun_initui_by_auth(config, option, function (optionmask) {
          // qt_ws = new QT_WS();//
          // qt_ws.onopen((res) => {
          //   qtStatus = true;
          //   qt_ws.destroyWindow();
          //   console.log('connect success-configuration');
          //   $('#div_submenu_item_localsettings').css('display', (optionmask & 16 && qtStatus) ? 'block' : 'none');
          // })
          // qt_ws.onerror(err => {
          //   if (err) qtStatus = false;
          //   $('#div_submenu_item_localsettings').css('display', (optionmask & 16 && qtStatus) ? 'block' : 'none');
          // })
        });
        // fun_initui_by_auth(config, option);
        fun_check_devability();
        return;
      }
    });
  });
}
function fun_check_devability() {
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) return;
    $xml = $(result);
    var ptzenable = $xml.find('ptz').text();
    var prerec = $xml.find('prerec').text();
    localStorage.setItem('prerec', prerec);
    var serialenable = $xml.find('serial').text();
    var featrueab = $xml.find('featrueab').text();
    var disk = parseInt($xml.find('disk').text());
    var ioalarmability = parseInt($xml.find('ioout').text());
    var pir = $xml.find('pir').text();
    var adapter = $xml.find('netcard').text();
    var nvrproto = $xml.find('nvrproto').text();
    if (!(parseInt(nvrproto) & 0x01)) {
      $('#div_submenu_item_onvif').css('display', 'none');
    }

    if (parseInt(pir) > 0) {
      $('#div_submenu_item_pir').css('display', 'block');
    } else {
      $('#div_submenu_item_pir').css('display', 'none');
    }
    if (ioalarmability > 0) {
      $('#div_submenu_item_alarminterface').css('display', 'block');
    } else {
      $('#div_submenu_item_alarminterface').css('display', 'none');
    }
    if (disk == 0) {
      $('#div_submenu_item_disk').css('display', 'none');
    }
    var smartva = parseInt($xml.find('smartva').text());
    if ((smartva & 1)) {
      // $('#div_submenu_item_peoplecounting').css('display', 'none');
      if (!($('#div_submenu_item_peoplecounting').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_peoplecounting" class="cls_submenu_items_text">
        <p id="pmenu_sub_peoplecounting">People Counting</p>
      </div>`);
      }
      
    }
    if ((smartva & (1 << 1))) {
      // $('#div_submenu_item_crosslinedetect').css('display', 'none');
      if (!($('#div_submenu_item_crosslinedetect').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_crosslinedetect" class="cls_submenu_items_text">
        <p id="pmenu_sub_crossline">Crossing Line Detection</p>
      </div>`);
      }
      
    }
    if ((smartva & (1 << 2))) {
      // $('#div_submenu_item_intrusiondetect').css('display', 'none');
      if (!($('#div_submenu_item_intrusiondetect').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_intrusiondetect" class="cls_submenu_items_text">
        <p id="pmenu_sub_intrusion">Intrusion Detection</p>
      </div>`);
      }
  
    }
    if ((smartva & (1 << 3))) {
      // $('#div_submenu_item_humandetect').css('display', 'none');
      if (!($('#div_submenu_item_humandetect').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_humandetect" class="cls_submenu_items_text">
        <p id="pmenu_sub_humandetect">Human Detection</p>
      </div>`);
      }

    }
    if ((smartva & (1 << 4))) {
      // $('#div_submenu_item_facedetection').css('display', 'none');
      if (!($('#div_submenu_item_facedetection').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_facedetection" class="cls_submenu_items_text">
        <p id="pmenu_sub_facedetection">Face detection</p>
      </div>`);
      }
      
    }
    if ((smartva & (1 << 6))) {
      // $('#div_submenu_item_loiteringdetection').css('display', 'none');
      if (!($('#div_submenu_item_loiteringdetection').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_loiteringdetection" class="cls_submenu_items_text">
        <p id="pmenu_sub_loiteringdetection">Loitering Detection</p>
      </div>`);
      }
     
    }
    if ((smartva & (1 << 10))) {
      // $('#div_submenu_item_vehicledetect').css('display', 'none');
      if (!($('#div_submenu_item_vehicledetect').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_vehicledetect" class="cls_submenu_items_text">
        <p id="pmenu_sub_vehicledetect">Vehicle Detection</p>
      </div>`);
      }
      
    }
    if ((smartva & (1 << 11))) {
      // $('#div_submenu_item_petdetect').css('display', 'none');
      if (!($('#div_submenu_item_petdetect').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_petdetect" class="cls_submenu_items_text">
        <p id="pmenu_sub_petdetect">Pet Detection</p>
      </div>`);
      }
    
    }
    if ((smartva & (1 << 13))) {
      // $('#div_submenu_item_fall').css('display', 'none');
      if (!($('#div_submenu_item_fall').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_fall" class="cls_submenu_items_text">
        <p id="pmenu_sub_fall">Fall Detection</p>
      </div>`);
      }
      
    }
    if ((smartva & (1 << 14))) {
      console.log(2222);
      // $('#div_submenu_item_smokefire').css('display', 'none');
      if (!($('#div_submenu_item_smokefire').length)) {
        $("#div_menuitem_smartva_subitems").append(`<div id="div_submenu_item_smokefire" class="cls_submenu_items_text">
        <p id="pmenu_sub_smokefire">Smoke and fire Detection</p>
      </div>`);
      }
    }

    $('.cls_submenu_items_text').click(function () {
      if (g_last_menuid.length > 0) {
        var tempid = '#' + g_last_menuid;
        $(tempid).removeClass('cls_submenu_item_selected');
      }
      $('#' + this.id.toString()).addClass('cls_submenu_item_selected');
      g_last_menuid = this.id.toString();
      // fun_ToTagetSubpage(this.id);
      fun_submenu_click(this.id);
    });
    
    if (!(parseInt(ptzenable) & 0x4)) {
      $('#div_submenu_item_ptzconfig').css('display', 'none');
    }
    if (parseInt(serialenable) <= 0) {
      $('#div_submenu_item_serialconfig').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x01)) {
      $('#div_submenu_item_qos').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x02)) {
      $('#div_submenu_item_bonjour').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x08)) {
      $('#div_submenu_item_https').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x10)) {
      $('#div_submenu_item_wireless').css('display', 'none');
      $('#div_submenu_item_vpn').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x100)) {
      $('#div_submenu_item_pppoe').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x04)) {
      $('#div_submenu_item_snmp').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x80)) {
      $('#div_submenu_item_ieee').css('display', 'none');
    }
    if (!(parseInt(featrueab) & 0x400)) {
      $('#div_submenu_item_gb').css('display', 'none');
    }

  });
}
var g_user_configmask = 0;
var g_user_optionmask = 0;
function fun_initui_by_auth(configmask, optionmask, cab) {
  g_user_configmask = configmask;
  g_user_optionmask = optionmask;
  var guidemask = 0;
  if (configmask & 1) {
    guidemask |= 1;
    guidemask |= 64;
    $('#div_submenu_item_general').css('display', 'block');
    $('#div_submenu_item_automaintain').css('display', 'block');
    $('#div_submenu_item_datetime').css('display', 'block');
  } else {
    $('#div_submenu_item_general').remove();
    $('#div_submenu_item_automaintain').remove()
    $('#div_submenu_item_datetime').remove();
  }
  if (configmask & 2) {
    guidemask |= 4;
    guidemask |= 8;
    $('#div_submenu_item_tcpip').css('display', 'block');
    $('#div_submenu_item_port').css('display', 'block');
    $('#div_submenu_item_wifi').css('display', 'block');
    $('#div_submenu_item_pppoe').css('display', 'block');
    $('#div_submenu_item_smtp').css('display', 'block');
    $('#div_submenu_item_upnp').css('display', 'block');
    $('#div_submenu_item_ddns').css('display', 'block');
    $('#div_submenu_item_rtsp').css('display', 'block');
    $('#div_submenu_item_rtmp').css('display', 'block');
    $('#div_submenu_item_voip').css('display', 'block');
    $('#div_submenu_item_ftp').css('display', 'block');
    $('#div_submenu_item_nfs').css('display', 'block');
    $('#div_submenu_item_snmp').css('display', 'block');
    $('#div_submenu_item_ieee').css('display', 'block');
    $('#div_submenu_item_https').css('display', 'block');
    $('#div_submenu_item_qos').css('display', 'block');
  } else {
    $('#div_menuitem_network_subitems').remove()
    $('#div_menuitem_network_parent').remove();
  }
  if (configmask & 4) {
    guidemask |= 16;
    $('#div_submenu_item_audio').css('display', 'block');
  } else {
    $('#div_submenu_item_audio').remove();
  }
  if (configmask & 8) {
    guidemask |= 32;
    $('#div_submenu_item_video').css('display', 'block');
    $('#div_submenu_item_osd').css('display', 'block');
    $('#div_submenu_item_imagesettings').css('display', 'block');
    $('#div_submenu_item_privacymask').css('display', 'block');
    $('#div_submenu_item_roi').css('display', 'block');
    $('#div_submenu_item_snapshot').css('display', 'block');
  } else {
    $('#div_submenu_item_video').remove();
    $('#div_submenu_item_osd').remove();
    $('#div_submenu_item_imagesettings').remove();
    $('#div_submenu_item_privacymask').remove();
    $('#div_submenu_item_roi').remove();
    $('#div_submenu_item_snapshot').remove();
  }
  if(!(configmask & 4)&&!(configmask & 8)){
    $('#div_menuitem_avcodec_parent').remove();
  }
  if (configmask & 16) {
    $('#div_submenu_item_eventserver').css('display', 'block');
    $('#div_submenu_item_motiondetect').css('display', 'block');
    $('#div_submenu_item_ioalarm').css('display', 'block');
    $('#div_submenu_item_abnormality').css('display', 'block');
  } else {
    $('#div_menuitem_event_parent').remove();
    $('#div_menuitem_event_subitems').remove();
  }
  if (configmask & 32) {
    $('#div_submenu_item_schedule').css('display', 'block');
    $('#div_submenu_item_videoctr').css('display', 'block');
  } else {
     $('#div_submenu_item_schedule').remove();
     $('#div_submenu_item_videoctr').remove();
    $('#div_menuitem_storage_parent').remove();
  }
  
  if (configmask & 64) {
    guidemask |= 2;
    $('#div_submenu_item_manageuser').css('display', 'block');
  } else {
    $('#div_submenu_item_manageuser').remove();
  }
  if (configmask & 128) { 
     $('#div_menuitem_smartva_pare').css('display', 'block');
  }else{
     $('#div_menuitem_smartva_parent').remove()
    
  }
  if (optionmask & 1) { }
  if (optionmask & 2) {
    $('#div_playback').css('display', 'block')
   }else{
    $('#div_playback').remove()
   }
  if (optionmask & 4) {
      
   }
  if (optionmask & 8) {
    guidemask |= 128;
  }
  if (optionmask & 16) {
    $('#div_submenu_item_disk').css('display', 'block');
  } else {
    $('#div_submenu_item_disk').remove();
  }
  if (optionmask & 32) {
    $('#div_ptzctrl_area').css('display', 'block');
  }else{
    $('#div_ptzctrl_area').css('display', 'block');
  }
  if (optionmask & 64) {
    $('#div_submenu_item_upgrade').css('display', 'block');
  } else {
    $('#div_submenu_item_upgrade').remove();
  }
  document.getElementById('frame_subpage').contentWindow.funi_set_button_disable(guidemask);
  // console.log(optionmask);
  if (cab) {//if callback ,to callback
    cab(optionmask)
  }


}
var g_last_menuid = '';
function fun_Register_Event() {
  $('.cls_menu_item').click(function () {
    fun_menuitem_click(this.id);
  });
  // $('.cls_submenu_items_text').click(function () {
  //   if (g_last_menuid.length > 0) {
  //     var tempid = '#' + g_last_menuid;
  //     $(tempid).removeClass('cls_submenu_item_selected');
  //   }
  //   $('#' + this.id.toString()).addClass('cls_submenu_item_selected');
  //   g_last_menuid = this.id.toString();
  //   // fun_ToTagetSubpage(this.id);
  //   fun_submenu_click(this.id);
  // });
  $('.div_main_button').click(function () {
    fun_switch_mainpages(this.id);
  });
  $('#img_btn_exit,#img_btnexit_text').click(function () {
    //exitQT();
    fun_toTagetpage('login.html');
  });
  $('#frame_subpage').on('load', function () {
    fun_on_subpage_load();
  });
  $('#button_tips_dialog_close').click(function () {
    fun_hide_tips_dislog();
  });
}
function fun_submenu_click(val) {
  if (val.toString() == 'div_submenu_item_facedetection') {
    var status = parseInt(localStorage.getItem('status'));
    if (status & 0x8) {
      fun_ToTagetSubpage(val.toString());
    } else {
      var unauthstr1 = translate_page_item(TARGET_PAGE_TIPSTEXT, 'unauth', '', ITEM_TYPE_NONE);
      fun_show_tips_dialog(unauthstr1, 0);
    }
  } else if (
    val.toString() == 'div_submenu_item_peoplecounting' ||
    val.toString() == 'div_submenu_item_humandetect' ||
    val.toString() == 'div_submenu_item_vehicledetect' ||
    val.toString() == 'div_submenu_item_petdetect' ||
    val.toString() == 'div_submenu_item_fall' ||
    val.toString() == 'div_submenu_item_crosslinedetect' ||
    val.toString() == 'div_submenu_item_intrusiondetect' ||
    val.toString() == 'div_submenu_item_smokefire' ||
    val.toString() == 'div_submenu_item_loiteringdetection'
  ) {
    var status = parseInt(localStorage.getItem('status'));
    if ((status & 0x3) == 2) {
      fun_ToTagetSubpage(val.toString());
    } else {
      var unauthstr2 = translate_page_item(TARGET_PAGE_TIPSTEXT, 'unauth', '', ITEM_TYPE_NONE);
      fun_show_tips_dialog(unauthstr2, 0);
    }
  } else {
    fun_ToTagetSubpage(val.toString());
  }
}
function fun_menuitem_click(val) {
  if (val.toString() == 'div_menuitem_base_settings_parent') {
    $curbtn = $('#' + val.toString());
    $curbtn.addClass('cls_menu_item_selected');
    $('.cls_menu_item').not($curbtn).removeClass('cls_menu_item_selected');
    $('.cls_submenu_items').slideUp(256);
    $('#frame_subpage').attr('src', 'subpages/guide.html');
    g_subpage_name = 'guide.html';
  } else if (val.toString() == 'div_menuitem_smartva_parent') {
    sdk_getipcparam('/action/get?subject=valicense', function (result) {
      if (result != false) {
        $xml = $(result);
        var status = parseInt($xml.find('status').text());
        localStorage.setItem('status', status);
        // if (status == 0) {
        $curbtn = $('#' + val.toString());
        $curbtn.addClass('cls_menu_item_selected');
        $('.cls_menu_item').not($curbtn).removeClass('cls_menu_item_selected');
        $next = $('#' + val.toString()).next();
        $next.slideToggle(256);
        $('.cls_submenu_items').not($next).slideUp(256);
        // }
        // else {
        //     var unauthstr = translate_page_item(TARGET_PAGE_TIPSTEXT, "unauth", "", ITEM_TYPE_NONE);
        //     fun_show_tips_dialog(unauthstr, 0);
        // }
      }
    });
  } else {
    $curbtn = $('#' + val.toString());
    $curbtn.addClass('cls_menu_item_selected');
    $('.cls_menu_item').not($curbtn).removeClass('cls_menu_item_selected');
    $next = $('#' + val.toString()).next();
    $next.slideToggle(256);
    $('.cls_submenu_items').not($next).slideUp(256);
  }
}
function fun_switch_mainpages(page) {
  if (page == 'div_preview') {
    fun_toTagetpage('preview.html');
  } else if (page == 'div_playback') {
    fun_toTagetpage('playback.html');
  } else if (page == 'div_configuration') {
    fun_toTagetpage('configuration.html');
  }
}
function fun_toTagetpage(pagefile) {
  window.location.href = pagefile;
}
function fun_ToTagetSubpage(val) {
  var num = Math.random() * 653700 + 800;
  num = parseInt(num, 10);
  var arraystr = val.toString().split('_');
  var tagetsubpage = 'subpages/' + arraystr[arraystr.length - 1] + '.html' + '?slce=' + String(num);
  g_subpage_name = arraystr[arraystr.length - 1] + '.html' + '?slce=' + String(num);
  $('#frame_subpage').attr('src', tagetsubpage);
}
function funi_ServerToGuide(val) {
  var tempval = val.toString();
  if (tempval == 'datetime') {
    $('#div_menuitem_system_parent').click();
    $('#div_submenu_item_datetime').click();
  } else if (tempval == 'users') {
    $('#div_menuitem_security_parent').click();
    $('#div_submenu_item_manageuser').click();
  } else if (tempval == 'tcpip') {
    $('#div_menuitem_network_parent').click();
    $('#div_submenu_item_tcpip').click();
  } else if (tempval == 'portsettings') {
    $('#div_menuitem_network_parent').click();
    $('#div_submenu_item_port').click();
  } else if (tempval == 'audio') {
    $('#div_menuitem_avcodec_parent').click();
    $('#div_submenu_item_audio').click();
  } else if (tempval == 'video') {
    $('#div_menuitem_avcodec_parent').click();
    $('#div_submenu_item_video').click();
  } else if (tempval == 'systemstatus') {
    $('#div_menuitem_system_parent').click();
    $('#div_submenu_item_information').click();
    g_subpage_index = 1;
  } else if (tempval == 'maintenance') {
    $('#div_menuitem_system_parent').click();
    $('#div_submenu_item_automaintain').click();
  }
}
function funi_show_wait_dialog(host) {
  fun_show_dialog(true);
  g_target_host = host;
  setInterval('fun_get_device_parameters()', 10000);
}
var g_target_host;
function fun_get_device_parameters() {
  $.ajax({
    url: 'http://' + g_target_host + '/action/get?subject=devpara',
    timeout: 1000,
    type: 'POST',
    async: true,
    complete: function () {
      setTimeout('fun_to_login_page()', 26000);
    },
    error: function () { }
  });
}
function fun_to_login_page() {
  window.location.href = 'http://' + g_target_host;
}
function fun_show_dialog(bshow) {
  if (bshow) {
    $('#div_wait_login').dialog({
      dialogClass: 'no-close',
      modal: true,
      title: '',
      width: 306,
      height: 188,
      resizable: false
    });
  } else {
    $('#div_wait_login').dialog('destroy');
    $('#div_wait_login').css('display', 'none');
  }
}
var g_subpage_index = -1;
function fun_on_subpage_load() {
  var currentpage = document.getElementById('frame_subpage').contentWindow.location.href;
  var arrpage = currentpage.split('/');
  if (arrpage[arrpage.length - 1] == 'guide.html') {
    //fun_initui_by_auth(g_user_configmask, g_user_optionmask);
    fun_get_login_user()
  }
  // if ((arrpage[arrpage.length - 1]).indexOf('localsettings.html') !== -1) {
  //   document.getElementById('frame_subpage').contentWindow.getQT(qt_ws);
  // }
  if (arrpage[arrpage.length - 1] != g_subpage_name && g_subpage_name != '') {
   // exitQT();
    fun_toTagetpage('login.html');
  } else if (g_subpage_index > 0) {
    g_subpage_index = -1;
  }
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_IOALARM, 'iointerface', 'pmenu_sub_interface', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'liveplay', 'div_preview', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'playback', 'div_playback', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'configure', 'div_configuration', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'exit', 'img_btnexit_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'videoctr', 'pmenu_sub_videoctr', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'basesetting', 'pmenu_base_settings', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'system', 'pmenu_system', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'network', 'pmenu_network', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'avsetting', 'pmenu_audio_video', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'storage', 'pmenu_storage', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'event', 'pmenu_event', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'security', 'pmenu_security', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'general', 'pmenu_sub_general', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'maintain', 'pmenu_sub_maintain', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'upgrade', 'pmenu_sub_upgrade', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, 'ptzconfigt', 'pmenu_sub_ptzconfig', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_PTZCONFIG, 'rsconfigt', 'pmenu_sub_serialconfig', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'information', 'pmenu_sub_information', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'log', 'pmenu_sub_log', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'tcpip', 'pmenu_sub_tcpip', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'port', 'pmenu_sub_port', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'wifi', 'pmenu_sub_wifi', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'pppoe', 'pmenu_sub_pppoe', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'smtp', 'pmenu_sub_smtp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'upnp', 'pmenu_sub_upnp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'ddns', 'pmenu_sub_ddns', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'rtsp', 'pmenu_sub_rtsp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'rtmp', 'pmenu_sub_rtmp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'voip', 'pmenu_sub_voip', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'audio', 'pmenu_sub_audio', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'video', 'pmenu_sub_video', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'osd', 'pmenu_sub_osd', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'imagesetting', 'pmenu_sub_image', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'privacymask', 'pmenu_sub_privacymask', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'roi', 'pmenu_sub_roi', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'localsetting', 'pmenu_sub_local', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'disk', 'pmenu_sub_storage', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'ftp', 'pmenu_sub_ftp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'schedule', 'pmenu_sub_schedule', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'evtserver', 'pmenu_sub_eventserver', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'motion', 'pmenu_sub_motion', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'ioalarm', 'pmenu_sub_ioalarm', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'pir', 'pmenu_sub_pir', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'abnormality', 'pmenu_sub_abnormality', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'user', 'pmenu_sub_manageuser', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_CONFIGURATION, 'ipfilter', 'pmenu_sub_ipfilter', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'snapshot', 'pmenu_sub_snapshot', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'datetime', 'pmenu_sub_datetime', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_WIRELESS, 'mobile', 'pmenu_sub_wireless', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'waitmessage', 'p_wait_message', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'humandct', 'pmenu_sub_humandetect', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'vehicledct', 'pmenu_sub_vehicledetect', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'crosslinedct', 'pmenu_sub_crossline', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'intrusiondct', 'pmenu_sub_intrusion', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'falldct', 'pmenu_sub_fall', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'smokefire', 'pmenu_sub_smokefire', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'petdetect', 'pmenu_sub_petdetect', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'videoanalysis', 'pmenu_smartva', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'peoplecount', 'pmenu_sub_peoplecounting', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'etypeloitering', 'pmenu_sub_loiteringdetection', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'facedetection', 'pmenu_sub_facedetection', ITEM_TYPE_TEXT);

  // 包裹
  translate_page_item(TARGET_PAGE_SUB_AVANALYSIS, 'leftmoved', 'pmenu_sub_leftremoved', ITEM_TYPE_TEXT);

}
function fun_show_tips_dialog(tipstring, type) {
  $('#div_tips_dialog_content').text(tipstring);
  if (type == 0) {
    $('#div_tips_dialog_content').css('color', '#ff4040');
  } else {
    $('#div_tips_dialog_content').css('color', 'rgb(123, 185, 51)');
  }
  $('#div_tips_dialog').show(300);
  setTimeout(fun_hide_tips_dislog, 5000);
}
function fun_hide_tips_dislog() {
  $('#div_tips_dialog').hide(300);
}
