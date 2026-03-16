var bv = null;
$(document).ready(function () {
  fun_multilang_adapter();
  fun_get_devability();
  fun_register_events();
  fun_videoShow();
});
var g_pic_width = 0;
var g_pic_height = 0;
var g_featrueab = 0;
  function fun_get_devability() {
    sdk_getipcparam('/action/get?subject=devability', function (result) {
     if (result == false) {
       return;
     }
     $xml = $(result);
     var showosdpic = $xml.find('osd_pic').text();
     if (showosdpic == '1') {
      $('#div_osd_operations').css('height', '150px');

       $('#div_osd_enable_picture').css('display', 'block');
     }
    var featrueab = parseInt($xml.find('featrueab').text());
    g_featrueab = featrueab;
    $('#div_osd_enable_4g').css('display', featrueab & 0x10 ? 'block' : 'none');

  });
}
function fun_register_events() {
  $('#button_osd_picture_browse,#button_osd_picture_upload,#button_osd_restore_default,#button_osd_save').click(function () {
    if (this.id.toString() == 'button_osd_picture_browse') {
      fun_on_file_browse();
    } else if (this.id.toString() == 'button_osd_picture_upload') {
      fun_on_file_upload();
    } else if (this.id.toString() == 'button_osd_restore_default') {
      fun_on_osd_restore();
    } else if (this.id.toString() == 'button_osd_save') {
      fun_on_osd_save();
    }
  });
  $('#input_osd_picture_select').change(function () {
    var file = $('#input_osd_picture_select').val();
    $('#input_osd_picture_path').val(file);
    var filename = this.files[0];
    var reader = new FileReader();
    reader.onload = function (ev) {
      var data = ev.target.result;
      var image = new Image();
      image.onload = function (ev1) {
        g_pic_width = image.width;
        g_pic_height = image.height;
      };
      image.src = data;
    };
    reader.readAsDataURL(filename);
  });
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_OSD, 'osdtitle', 'div_title_osd_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_OSD, 'devinfo', 'label_enable_sysinfo', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_OSD, 'devtime', 'label_enable_systime', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_OSD, 'devcustom', 'label_enable_custom', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_OSD, 'devpicture', 'label_enable_picture', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_OSD, 'picturenote', 'pnote_picture_type', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_OSD, 'showsignalstrength', 'label_enable_4g', ITEM_TYPE_TEXT);
  
    translate_page_item(TARGET_PAGE_COMMON, 'browse', 'button_osd_picture_browse', ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_SUB_OSD, 'upload', 'button_osd_picture_upload', ITEM_TYPE_VALUE);
   translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_osd_restore_default', ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_osd_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'clear', 'button_osd_4g_clear', ITEM_TYPE_VALUE);
}
function fun_get_osd_param() {
  sdk_getipcparam('/action/get?subject=osd', function (result) {
    if (result != false) {
      $xml = $(result);
      var enable1 = $xml.find('system').children('osditem').children('active').text();
      var strxpos1 = $xml.find('system').children('osditem').children('xpos').text();
      var strypos1 = $xml.find('system').children('osditem').children('ypos').text();
      var enable2 = $xml.find('datetime').children('osditem').children('active').text();
      var strxpos2 = $xml.find('datetime').children('osditem').children('xpos').text();
      var strypos2 = $xml.find('datetime').children('osditem').children('ypos').text();
      var enable3 = $xml.find('picture').children('osditem').children('active').text();
      var strxpos3 = $xml.find('picture').children('osditem').children('xpos').text();
      var strypos3 = $xml.find('picture').children('osditem').children('ypos').text();
      var enable4 = $xml.find('custom').children('osditem').children('active').text();
      var strxpos4 = $xml.find('custom').children('osditem').children('xpos').text();
      var strypos4 = $xml.find('custom').children('osditem').children('ypos').text();
      var customtext = $xml.find('custom').children('ctext').text();
      if (customtext.length > 0) {
        document.getElementById('input_custom_text').value = customtext;
      }
      if (enable1 == 1) {
        document.getElementById('check_enable_sysinfo').checked = true;
      } else {
        document.getElementById('check_enable_sysinfo').checked = false;
      }
      if (enable2 == 1) {
        document.getElementById('check_enable_systime').checked = true;
      } else {
        document.getElementById('check_enable_systime').checked = false;
      }
      if (enable3 == 1) {
        document.getElementById('check_enable_picture').checked = true;
      } else {
        document.getElementById('check_enable_picture').checked = false;
      }
      if (enable4 == 1) {
        document.getElementById('check_enable_custom').checked = true;
      } else {
        document.getElementById('check_enable_custom').checked = false;
      }
      var point1 = new Object();
      point1.x = parseInt((strxpos1 * 640) / 1000) > 3 ? parseInt((strxpos1 * 640) / 1000) - 3 : 0;
      point1.y = parseInt((strypos1 * 360) / 1000) > 3 ? parseInt((strypos1 * 360) / 1000) - 3 : 0;
      var point2 = new Object();
      point2.x = parseInt((strxpos2 * 640) / 1000) > 3 ? parseInt((strxpos2 * 640) / 1000) - 3 : 0;
      point2.y = parseInt((strypos2 * 360) / 1000) > 3 ? parseInt((strypos2 * 360) / 1000) - 3 : 0;
      var point3 = new Object();
      point3.x = parseInt((strxpos3 * 640) / 1000) > 3 ? parseInt((strxpos3 * 640) / 1000) - 3 : 0;
      point3.y = parseInt((strypos3 * 360) / 1000) > 3 ? parseInt((strypos3 * 360) / 1000) - 3 : 0;
      var point4 = new Object();
      point4.x = parseInt((strxpos4 * 640) / 1000) > 3 ? parseInt((strxpos4 * 640) / 1000) - 3 : 0;
      point4.y = parseInt((strypos4 * 360) / 1000) > 3 ? parseInt((strypos4 * 360) / 1000) - 3 : 0;

      var point5 = new Object();
      var enable5
      if (g_featrueab & 0x10) {
        enable5 = $xml.find('mobile_stat').children('osditem').children('active').text();
        $('#check_enable_4g').prop('checked', enable5 == 1)
        var strxpos5 = $xml.find('mobile_stat').children('osditem').children('xpos').text();
        var strypos5 = $xml.find('mobile_stat').children('osditem').children('ypos').text();
        point5.x = parseInt((strxpos5 * 640) / 1000) > 3 ? parseInt((strxpos5 * 640) / 1000) - 3 : 0;
        point5.y = parseInt((strypos5 * 360) / 1000) > 3 ? parseInt((strypos5 * 360) / 1000) - 3 : 0;
       }
      fun_iaitialize_osd_regions(point1, enable1, point2, enable2, point3, enable3, point4, enable4, point5, enable5);
    }
  });
  fun_flash_checker();
}
function fun_on_file_browse() {
  document.getElementById('input_osd_picture_select').click();
}
function fun_on_file_upload() {
  var file = $('#input_osd_picture_select').val();
  var strarray = file.split('.');
  if (strarray[strarray.length - 1] != 'jpg' || g_pic_width > 250 || g_pic_height > 150) {
    var strerrinput = translate_page_item(TARGET_PAGE_SUB_OSD, 'picturenote', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  var upgradeTimeout = 120000;
  $.ajaxFileUpload({
    type: 'post',
    url: '/action/upload?file=logo',
    fileElementId: 'input_osd_picture_select',
    cache: false,
    timeout: upgradeTimeout,
    success: fun_upload_success,
    error: fun_upload_error
  });
}
function fun_upload_success(status) {
  var strtips = translate_page_item(TARGET_PAGE_TIPSTEXT, 'uploadsuc', '', ITEM_TYPE_NONE);
  parent.fun_show_tips_dialog(strtips);
}
function fun_upload_error(message) {
  var strtips = translate_page_item(TARGET_PAGE_TIPSTEXT, 'uploadfai', '', ITEM_TYPE_NONE);
  parent.fun_show_tips_dialog(strtips, 0);
}
function fun_on_osd_restore() {
  document.getElementById('input_custom_text').value = '';
  document.getElementById('check_enable_sysinfo').checked = true;
  document.getElementById('check_enable_systime').checked = true;
  document.getElementById('check_enable_picture').checked = false;
  document.getElementById('check_enable_custom').checked = false;
  var point1 = new Object();
  point1.x = 210.12;
  point1.y = 0;
  var point2 = new Object();
  point2.x = 0;
  point2.y = 0;
  var point3 = new Object();
  point3.x = 603.08;
  point3.y = 0;
  var point4 = new Object();
  point4.x = 423.24;
  point4.y = 0;
  fun_iaitialize_osd_regions(point1, 1, point2, 1, point3, 0, point4, 0);
}

function fun_on_osd_save() {
  fun_save_osd(true);
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

function fun_videoShow() {
  sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (result) {
    if (result != false) {
      $xml = $(result);
      var codec = $xml.find('codec').text();
      if (codec == 1) {
        $('#div_osd_video_player').html("<img id='img_video_show' src='/action/snap' style='width: 100%;height: 100%'/>");
        fun_get_video_picture();
      } else if (codec == 2) {
        var Img_T = "<img style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=0' />";
        $('#div_osd_video_player').html(Img_T);
      } else {
        $('#div_osd_video_player').html('<video id="videoElement" width="640" style="border: 1px solid black;" height="360" name="videoElement" class="centeredVideo" autoplay></video>');
        var videoElement = document.getElementById('videoElement');
        videoElement.addEventListener(
          'click',
          function mouseHandler(event) {
            // 阻止视频默认点击事件
            event.preventDefault();
          },
          false
        );
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
          }
        );
        bv.attachMediaElement(videoElement);
        bv.load();
        bv.play();
      }
    }
  });
  fun_get_osd_param();

}

function fun_flash_checker() {
  if (!CurBrowserIsIE()) {
    return;
  }
  var bfind = false;
  for (var i = 0, len = navigator.plugins.length; i < len; i++) {
    var plugin = navigator.plugins[i];
    if (plugin.name.indexOf('Shockwave Flash') >= 0) {
      bfind = true;
      break;
    }
  }
  if (!bfind) {
    $('#div_osd_show').css('display', 'none');
  }
}
var devsystem = 0;
var devdatetime = 1;
var devpicture = 2;
var devcustom = 3;
var show4g = 4;
var regions = [];
var temp_regions = [];
function region(x, y, w, h, e) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.e = e;
}
var obj_canvas;
var ctx_canvas;
var bstartdraw = false;
var currentIndex = -1;
var offsetpoint = new Object();
function fun_initialize_osd_painter() {
  obj_canvas = document.getElementById('canvas_osd_show');
  ctx_canvas = obj_canvas.getContext('2d');
  obj_canvas.width = 640;
  obj_canvas.height = 360;
  ctx_canvas.lineWidth = 2;
  obj_canvas.onmousedown = startdrawgrid;
  obj_canvas.onmouseup = stopdrawgrid;
  obj_canvas.onmousemove = movinggrid;
  obj_canvas.onmouseout = mouseout;
  bstartdraw = true;
}
function obj_point(x, y) {
  this.x = x;
  this.y = y;
  return this;
}
function fun_iaitialize_osd_regions(reg1, e1, reg2, e2, reg3, e3, reg4, e4, reg5, e5) {
  regions[devsystem] = new region(reg1.x, reg1.y, 60, 22, e1);
  regions[devdatetime] = new region(reg2.x, reg2.y, 180, 22, e2);
  regions[devpicture] = new region(reg3.x, reg3.y, 28, 28, e3);
  regions[devcustom] = new region(reg4.x, reg4.y, 200, 22, e4);
  if (g_featrueab & 0x10) {
    regions[show4g] = new region(reg5.x, reg5.y, 200, 30, e5);
  }
  if (!CurBrowserIsIE()) {
    fun_initialize_osd_painter();
  }
}
function draw_system_information() {
  ctx_canvas.strokeStyle = '#cd3333';
  ctx_canvas.strokeRect(parseInt(regions[devsystem].x) + 0.5, parseInt(regions[devsystem].y) + 0.5, regions[devsystem].w, regions[devsystem].h);
}
function draw_device_datetime() {
  ctx_canvas.strokeStyle = '#9932cc';
  ctx_canvas.strokeRect(parseInt(regions[devdatetime].x) + 0.5, parseInt(regions[devdatetime].y) + 0.5, regions[devdatetime].w, regions[devdatetime].h);
}
function draw_device_picture() {
  ctx_canvas.strokeStyle = '#63b8ff';
  ctx_canvas.strokeRect(regions[devpicture].x + 0.5, regions[devpicture].y + 0.5, regions[devpicture].w, regions[devpicture].h);
}
function draw_divece_custom() {
  ctx_canvas.strokeStyle = '#b3ee3a';
  ctx_canvas.strokeRect(regions[devcustom].x + 0.5, regions[devcustom].y + 0.5, regions[devcustom].w, regions[devcustom].h);
}
function draw_show4g_custom() {
  ctx_canvas.strokeStyle = '#df2f36';
  ctx_canvas.strokeRect(regions[show4g].x + 0.5, regions[show4g].y + 0.5, regions[show4g].w, regions[show4g].h);
}
function mousePosition(evt) {
  return { x: evt.offsetX, y: evt.offsetY };
}
function startdrawgrid(evt) {
  if (!bstartdraw) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (tempx >= regions[devsystem].x && tempx <= regions[devsystem].x + regions[devsystem].w && tempy >= regions[devsystem].y && tempy <= regions[devsystem].y + regions[devsystem].h) {
    currentIndex = devsystem;
    offsetpoint.x = tempx - regions[devsystem].x;
    offsetpoint.y = tempy - regions[devsystem].y;
  } else if (tempx >= regions[devdatetime].x && tempx <= regions[devdatetime].x + regions[devdatetime].w && tempy >= regions[devdatetime].y && tempy <= regions[devdatetime].y + regions[devdatetime].h) {
    currentIndex = devdatetime;
    offsetpoint.x = tempx - regions[devdatetime].x;
    offsetpoint.y = tempy - regions[devdatetime].y;
  } else if (tempx >= regions[devpicture].x && tempx <= regions[devpicture].x + regions[devpicture].w && tempy >= regions[devpicture].y && tempy <= regions[devpicture].y + regions[devpicture].h) {
    currentIndex = devpicture;
    offsetpoint.x = tempx - regions[devpicture].x;
    offsetpoint.y = tempy - regions[devpicture].y;
  } else if (tempx >= regions[devcustom].x && tempx <= regions[devcustom].x + regions[devcustom].w && tempy >= regions[devcustom].y && tempy <= regions[devcustom].y + regions[devcustom].h) {
    currentIndex = devcustom;
    offsetpoint.x = tempx - regions[devcustom].x;
    offsetpoint.y = tempy - regions[devcustom].y;
  }


  if (g_featrueab & 0x10) {
    if (tempx >= regions[show4g].x && tempx <= regions[show4g].x + regions[show4g].w && tempy >= regions[show4g].y && tempy <= regions[show4g].y + regions[show4g].h) {
      currentIndex = show4g;
      offsetpoint.x = tempx - regions[show4g].x;
      offsetpoint.y = tempy - regions[show4g].y;
    }
  }
}
function stopdrawgrid(evt) {
  if (currentIndex == -1) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  fun_save_osd(false);
  currentIndex = -1;
}
function movinggrid(evt) {
  if (currentIndex == -1) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  regions[currentIndex].x = tempx - offsetpoint.x;
  regions[currentIndex].y = tempy - offsetpoint.y;
}
function mouseout(evt) {
  currentIndex = -1;
}
function fun_save_osd(bshowinfo) {
  var customtext = document.getElementById('input_custom_text').value;
  var enablesysinfo = document.getElementById('check_enable_sysinfo').checked;
  var enablesystime = document.getElementById('check_enable_systime').checked;
  var enablepicture = document.getElementById('check_enable_picture').checked;
  var enablecustom = document.getElementById('check_enable_custom').checked;
  var enableShow4g = document.getElementById('check_enable_4g').checked ? 1 : 0;


  if (enablesysinfo == true) {
    enablesysinfo = '1';
  } else {
    enablesysinfo = '0';
  }
  if (enablesystime == true) {
    enablesystime = '1';
  } else {
    enablesystime = '0';
  }
  if (enablepicture == true) {
    enablepicture = '1';
  } else {
    enablepicture = '0';
  }
  if (enablecustom == true) {
    enablecustom = '1';
  } else {
    enablecustom = '0';
  }

  var sysinfopoint = new obj_point((parseInt(regions[devsystem].x + 6) * 1000) / 640, (parseInt(regions[devsystem].y + 6) * 1000) / 360);
  var systimepoint = new obj_point((parseInt(regions[devdatetime].x + 6) * 1000) / 640, (parseInt(regions[devdatetime].y + 6) * 1000) / 360);
  var syspicture = new obj_point((parseInt(regions[devpicture].x + 6) * 1000) / 640, (parseInt(regions[devpicture].y + 6) * 1000) / 360);
  var syscustom = new obj_point((parseInt(regions[devcustom].x + 6) * 1000) / 640, (parseInt(regions[devcustom].y + 6) * 1000) / 360);
  var show4g_point = { x: 0, y: 0 };
  if (g_featrueab & 0x10) {
    show4g_point = new obj_point((parseInt(regions[show4g].x + 6) * 1000) / 640, (parseInt(regions[show4g].y + 6) * 1000) / 360);
  }

  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>\
<request>\
<osd ver="2.0">\
<system>\
<osditem>\
<active>' + enablesysinfo + '</active>\
<xpos>' + parseInt(sysinfopoint.x) + '</xpos>\
<ypos>' + parseInt(sysinfopoint.y) + '</ypos>\
</osditem>\
</system>\
<datetime>\
<osditem>\
<active>' + enablesystime + '</active>\
<xpos>' + parseInt(systimepoint.x) + '</xpos>\
<ypos>' + parseInt(systimepoint.y) + '</ypos>\
</osditem>\
</datetime>\
<picture>\
<osditem>\
<active>' + enablepicture + '</active>\
<xpos>' + parseInt(syspicture.x) + '</xpos>\
<ypos>' + parseInt(syspicture.y) + '</ypos>\
</osditem>\
</picture>\
<custom>\
<osditem>\
<active>' + enablecustom + '</active>\
<xpos>' + parseInt(syscustom.x) + '</xpos>\
<ypos>' + parseInt(syscustom.y) + '</ypos>\
</osditem>\
<ctext>' + customtext + '</ctext>\
</custom>\
<mobile_stat>\
<osditem>\
<active>' + enableShow4g + '</active>\
<xpos>' + parseInt(show4g_point.x) + '</xpos>\
<ypos>' + parseInt(show4g_point.y) + '</ypos>\
</osditem>\
</mobile_stat>\
</osd>\
</request>';


  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  sdk_setipcparam('/action/set?subject=osd', targetxml, function (result) {
    if (bshowinfo) {
      if (result == true) {
        parent.fun_show_tips_dialog(strsuc);
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
if (!CurBrowserIsIE()) {
  setInterval(function () {
    if (bstartdraw) {
      ctx_canvas.clearRect(0, 0, 640, 360);
      draw_system_information();
      draw_device_picture();
      draw_device_datetime();
      draw_divece_custom();


      if (g_featrueab & 0x10) draw_show4g_custom();
    }
  }, 20);
}

function mobile_clear_flow_count() {
  var tagetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<mobile_clear_flow_count ver="2.0">' +
    '<enable>1</enable>' +
    '</mobile_clear_flow_count>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=mobile_clear_flow_count', tagetxml, function (result) {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "resetsuc", "", ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
    var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'resetfai', '', ITEM_TYPE_NONE);
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

