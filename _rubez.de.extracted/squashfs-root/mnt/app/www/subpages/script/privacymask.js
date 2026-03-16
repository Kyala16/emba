var bv = null;
$(document).ready(function () {
  fun_multilang_adapter();
  fun_init_canvas();
  fun_flash_checker();
  fun_clear_rectanges();
  fun_register_enevts();
  fun_videoShow();
});
function fun_register_enevts() {
  $('#button_privacy_mask_clear,#button_privacy_mask_save').click(function () {
    if (this.id.toString() == 'button_privacy_mask_clear') {
      fun_clearall();
      parameterchange = true;
    } else if (this.id.toString() == 'button_privacy_mask_save') {
      fun_save_sections();
    }
  });
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_PRIVACYMASK, 'privacytitle', 'div_title_privacymask_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_PRIVACYMASK, 'enableprivacy', 'label_enable_privacy', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'clear', 'button_privacy_mask_clear', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_privacy_mask_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'maxrect', 'div_privacymack_rect_declare', ITEM_TYPE_TEXT);
}
var video_window_width = 640;
var canDrawprivacy = false;
var parameterchange = false;
var video_window_height = 360;
var g_rotate;
var canvas;
var ctx;
var enableprivacy = 0;
var enabledrawprivacy = false;
var g_activex_plugin = null;
function fun_init_canvas() {
  canvas = document.getElementById('canvas_draw_privacy_mask');
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  canvas.onmousedown = startdrawgrid;
  canvas.onclick = onclickedcanvas;
  canvas.onmouseup = stopdrawgrid;
  canvas.onmousemove = movinggrid;
  canvas.onmouseout = stopdrawgrid;
}
function fun_get_privacy_mask_parameter() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      fun_parsexml(this);
    } else {
      fun_parsexml(false);
    }
  };
  xhttp.open('POST', '/action/get?subject=privacy', true);
  xhttp.send();
}
function fun_parsexml(result) {
  if (!result) {
    return;
  }
  temp_regions.length = 0;
  var xmldoc = result.responseText;
  var solution = $(xmldoc).find('resolution').text();
  var arr = solution.split('x');
  if (g_rotate == 1) {
    video_window_width = 202;
    video_window_height = 360;
  } else {
    video_window_width = 640;
    video_window_height = 360;
  }
  canvas.width = video_window_width;
  canvas.height = video_window_height;
  enableprivacy = $(xmldoc).find('active').text();
  if (enableprivacy == 0) {
    enabledrawprivacy = false;
    document.getElementById('check_privacymask_enable').checked = false;
    if (CurBrowserIsIE() && null !== g_activex_plugin) {
      g_activex_plugin.SetEnableDraw(0);
    }
  } else {
    enabledrawprivacy = true;
    document.getElementById('check_privacymask_enable').checked = true;
  }
  var tempIndex = 0;
  $(xmldoc)
    .find('rect')
    .each(function (i) {
      var rectpoints = $(this).text();
      var pointarray = rectpoints.split(',');
      if (pointarray.length === 4) {
        var tagx = parseInt(pointarray[0]);
        var tagy = parseInt(pointarray[1]);
        var tagw = parseInt(pointarray[2]);
        var tagh = parseInt(pointarray[3]);
        tagx = Math.floor(tagx / 32) * 32;
        tagy = Math.floor(tagy / 32) * 32;
        tagw = Math.floor(tagw / 32) * 32;
        tagh = Math.floor(tagh / 32) * 32;
        if (CurBrowserIsIE()) {
          temp_regions[tempIndex] = new Object();
          temp_regions[tempIndex].x = tagx;
          temp_regions[tempIndex].y = tagy;
          temp_regions[tempIndex].w = tagw;
          temp_regions[tempIndex].h = tagh;
          if (null !== g_activex_plugin && tempIndex === 3) {
          }
        }
      }
      tempIndex++;
    });
  canDrawprivacy = true;
}
function CurBrowserIsIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;
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

function fun_videoShow() {
  sdk_getipcparam('/action/get?subject=cameraimage', function (result) {
    if (result === false) {
      return;
    }
    g_rotate = $(result).find('rotate').text();
    if (g_rotate == 1) {
      video_window_height = 360;
      video_window_width = 202;
    }
      sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (result) {
        if (result != false) {
          $xml = $(result);
          var codec = $xml.find('codec').text();
          if (codec == 1) {
            $('#div_privacymask_video_player').html("<img id='img_video_show' src='/action/snap' style='width: 100%;height: 100%'/>");
            fun_get_video_picture();
          } else if (codec == 2) {
            var Img_T = "<img style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=0' />";
            $('#div_privacymask_video_player').html(Img_T);
          } else {
            $('#div_privacymask_video_player').html('<video id="videoElement" style="border: 1px solid black;" width=' + video_window_width + ' height=' + video_window_height + ' name="videoElement" class="centeredVideo" autoplay></video>');
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
                liveBufferLatencyChasing: true
              }
            );
            bv.attachMediaElement(videoElement);
            bv.load();
            bv.play();
          }
          sdk_getipcparam('/action/get?subject=videoimage', function (res) {
            if (res != false) {
              $xml = $(res);
              var rotate = $xml.find('rotate').text();
              if (rotate == 1) {
                $('#div_privacymask_video_player').css({
                  'object-fit':'contain',
                  'width':video_window_width+'px',
                  'height':video_window_height+'px',
              });
                
              }
            }
          });      
        }
      });
      fun_get_privacy_mask_parameter();
  });
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
    $('#div_privacymask_draw_mask').css('display', 'none');
  }
}
function fun_on_ieplugin_load() {
  sdk_getipcparam('/action/get?subject=netserv', function (result) {
    if (result != false) {
      $xml = $(result);
      var tcpport = $xml.find('tcp').text();
      var obj = document.getElementById('VIDEO');
      obj.Language = current_language_number();
      obj.UIMode = 13;
      obj.DeviceIp = document.location.hostname;
      obj.TcpPort = tcpport;
      obj.StretchVideo(1);
      obj.SetPieceMaskFormat(12, 20);
      g_activex_plugin = obj;
      addEvent(obj, 'OnDrawItemChange', fun_on_activex_drawchanged);
      fun_get_privacy_mask_parameter();
    }
  });
}
function addEvent(element, type, handler) {
  if (element.attachEvent) {
    element.attachEvent(type, handler);
  } else if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  }
}
function fun_on_activex_drawchanged(strpts) {
  console.log(strpts);
  var ptlist = strpts.split(',');
  if (ptlist.length === 16) {
    temp_regions[0].x = parseInt(ptlist[0]);
    temp_regions[0].y = parseInt(ptlist[1]);
    temp_regions[0].w = parseInt(ptlist[2]);
    temp_regions[0].h = parseInt(ptlist[3]);
    temp_regions[1].x = parseInt(ptlist[4]);
    temp_regions[1].y = parseInt(ptlist[5]);
    temp_regions[1].w = parseInt(ptlist[6]);
    temp_regions[1].h = parseInt(ptlist[7]);
    temp_regions[2].x = parseInt(ptlist[8]);
    temp_regions[2].y = parseInt(ptlist[9]);
    temp_regions[2].w = parseInt(ptlist[10]);
    temp_regions[2].h = parseInt(ptlist[11]);
    temp_regions[3].x = parseInt(ptlist[12]);
    temp_regions[3].y = parseInt(ptlist[13]);
    temp_regions[3].w = parseInt(ptlist[14]);
    temp_regions[3].h = parseInt(ptlist[15]);
    bdrawchanged = true;
    parameterchange = true;
  }
}
var drawGrideMode = 1;
var currentIndex = 0;
var regions = [];
var temp_regions = [];
var bStarted = false;
var bdrawchanged = false;
function fun_clear_rectanges() {
  for (var i = 0; i < 4; i++) {
    regions[i] = new Object();
    regions[i].x = 0;
    regions[i].y = 0;
    regions[i].w = 0;
    regions[i].h = 0;
  }
  currentIndex = 0;
}
function mousePosition(evt) {
  return { x: evt.offsetX, y: evt.offsetY };
}
function startdrawgrid(evt) {
  if (currentIndex >= 4 || !enabledrawprivacy) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  regions[currentIndex].x = Math.floor(tempx / 32) * 32;
  regions[currentIndex].y = Math.floor(tempy / 32) * 32;
  regions[currentIndex].w = 32;
  regions[currentIndex].h = 32;
  parameterchange = true;
  bStarted = true;
}
function onclickedcanvas(evt) {
  if (currentIndex >= 4) return;
  bStarted = false;
}
function stopdrawgrid(evt) {
  if (!bStarted) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (regions[currentIndex].x >= tempx || regions[currentIndex].y >= tempy) return;
  regions[currentIndex].w = Math.ceil((tempx - regions[currentIndex].x) / 32) * 32;
  regions[currentIndex].h = Math.ceil((tempy - regions[currentIndex].y) / 32) * 32;
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
  regions[currentIndex].w = Math.ceil((tempx - regions[currentIndex].x) / 32) * 32;
  regions[currentIndex].h = Math.ceil((tempy - regions[currentIndex].y) / 32) * 32;
  console.log('currentIndex is:' + currentIndex);
}
function fun_clearall() {
  for (var k = 0; k < 4; k++) {
    regions[k].x = 0;
    regions[k].y = 0;
    regions[k].w = 0;
    regions[k].h = 0;
    if (temp_regions.length > 0) {
      temp_regions[k].x = 0;
      temp_regions[k].y = 0;
      temp_regions[k].w = 0;
      temp_regions[k].h = 0;
    }
  }
  currentIndex = 0;
  parameterchange = true;
  if (CurBrowserIsIE() && null !== g_activex_plugin) {
    g_activex_plugin.ClearDrawItems();
  }
  fun_save_sections();
}
function fun_save_sections() {
  if (CurBrowserIsIE() && bdrawchanged) {
    for (var i = 0; i < 4; i++) {
      regions[i].x = temp_regions[i].x;
      regions[i].y = temp_regions[i].y;
      regions[i].w = temp_regions[i].w;
      regions[i].h = temp_regions[i].h;
    }
  }
  var xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<privacy>' +
    '<active>' +
    parseInt(enableprivacy) +
    '</active>' +
    '<resolution>' +
    video_window_width +
    'x' +
    video_window_height +
    '</resolution>' +
    '<rect>' +
    Math.floor(parseInt(regions[0].x) / 32) * 32 +
    ',' +
    Math.floor(parseInt(regions[0].y) / 32) * 32 +
    ',' +
    (Math.ceil(parseInt(regions[0].w) / 32) * 32 > video_window_width ? video_window_width : Math.ceil(parseInt(regions[0].w) / 32) * 32) +
    ',' +
    (Math.ceil(parseInt(regions[0].h) / 32) * 32 > video_window_height ? video_window_height : Math.ceil(parseInt(regions[0].h) / 32) * 32) +
    '</rect>' +
    '<rect>' +
    Math.floor(parseInt(regions[1].x) / 32) * 32 +
    ',' +
    Math.floor(parseInt(regions[1].y) / 32) * 32 +
    ',' +
    (Math.ceil(parseInt(regions[1].w) / 32) * 32 > video_window_width ? video_window_width : Math.ceil(parseInt(regions[1].w) / 32) * 32) +
    ',' +
    (Math.ceil(parseInt(regions[1].h) / 32) * 32 > video_window_height ? video_window_height : Math.ceil(parseInt(regions[1].h) / 32) * 32) +
    '</rect>' +
    '<rect>' +
    Math.floor(parseInt(regions[2].x) / 32) * 32 +
    ',' +
    Math.floor(parseInt(regions[2].y) / 32) * 32 +
    ',' +
    (Math.ceil(parseInt(regions[2].w) / 32) * 32 > video_window_width ? video_window_width : Math.ceil(parseInt(regions[2].w) / 32) * 32) +
    ',' +
    (Math.ceil(parseInt(regions[2].h) / 32) * 32 > video_window_height ? video_window_height : Math.ceil(parseInt(regions[2].h) / 32) * 32) +
    '</rect>' +
    '<rect>' +
    Math.floor(parseInt(regions[3].x) / 32) * 32 +
    ',' +
    Math.floor(parseInt(regions[3].y) / 32) * 32 +
    ',' +
    (Math.ceil(parseInt(regions[3].w) / 32) * 32 > video_window_width ? video_window_width : Math.ceil(parseInt(regions[3].w) / 32) * 32) +
    ',' +
    (Math.ceil(parseInt(regions[3].h) / 32) * 32 > video_window_height ? video_window_height : Math.ceil(parseInt(regions[3].h) / 32) * 32) +
    '</rect>' +
    '</privacy>' +
    '</request>';
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  if (!parameterchange) {
    parent.fun_show_tips_dialog(strsuc);
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parent.fun_show_tips_dialog(strsuc);
      fun_clear_rectanges();
      parameterchange = false;
      bdrawchanged = false;
      if (CurBrowserIsIE() && null !== g_activex_plugin) {
        g_activex_plugin.ClearDrawItems();
      }
    } else if (this.readyState == 4 && this.status != 200) {
      parent.fun_show_tips_dialog(failed, 0);
    }
  };
  xhttp.open('POST', '/action/set?subject=privacy', true);
  console.log(String(xml));
  xhttp.send(String(xml));
}
function fun_enable_privacy_mask_check() {
  var checked_privacy = document.getElementById('check_privacymask_enable').checked;
  if (checked_privacy) {
    enableprivacy = 1;
    enabledrawprivacy = true;
    if (CurBrowserIsIE() && null !== g_activex_plugin) {
      g_activex_plugin.SetEnableDraw(1);
    }
  } else {
    enableprivacy = 0;
    enabledrawprivacy = false;
    if (CurBrowserIsIE() && null !== g_activex_plugin) {
      g_activex_plugin.ClearDrawItems();
      g_activex_plugin.SetEnableDraw(0);
    }
  }
  parameterchange = true;
}
if (!CurBrowserIsIE()) {
  setInterval(drawsection, 15);
}
function drawsection() {
  ctx.clearRect(0, 0, video_window_width, video_window_height);
  if (!enabledrawprivacy || !canDrawprivacy) return;
  ctx.strokeStyle = 'red';
  ctx.fillStyle = '#171717';
  ctx.shadowBlur = 0;
  if (0 === drawGrideMode || 2 === drawGrideMode) {
    for (var j = 0; j < 1; j++) {
      if (regions[j].w > 0 && regions[j].h > 0) {
        ctx.strokeRect(regions[j].x, regions[j].y, regions[j].w, regions[j].h);
        for (var tempw = 5; tempw < regions[j].w; tempw += 5) {
          ctx.beginPath();
          ctx.moveTo(tempw + regions[j].x, regions[j].y);
          ctx.lineTo(tempw + regions[j].x, regions[j].h + regions[j].y);
          ctx.stroke();
        }
        for (var temph = 20; temph < regions[j].h; temph += 20) {
          ctx.beginPath();
          ctx.moveTo(regions[j].x, temph + regions[j].y);
          ctx.lineTo(regions[j].w + regions[j].x, temph + regions[j].y);
          ctx.stroke();
        }
      }
    }
  } else if (1 === drawGrideMode) {
    for (var n = 0; n < 4; n++) {
      if (regions[n].w > 0 && regions[n].h > 0) {
        if (regions[n].x >= 2 && regions[n].y >= 2) {
          ctx.fillRect(regions[n].x, regions[n].y, regions[n].w, regions[n].h);
        } else {
          ctx.fillRect(regions[n].x, regions[n].y, regions[n].w, regions[n].h);
        }
      }
    }
  }
}
