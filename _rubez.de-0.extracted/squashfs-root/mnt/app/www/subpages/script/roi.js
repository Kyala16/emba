var bv = null;
$(document).ready(function () {
  fun_multilang_adapter();
  fun_init_canvas();
  fun_flash_checker();
  fun_register_events();
  fun_videoShow();
});
function fun_register_events() {
  $('#button_roi_clear,#button_roi_save').click(function () {
    if (this.id.toString() == 'button_roi_clear') {
      fun_clearall();
    } else if (this.id.toString() == 'button_roi_save') {
      fun_save_sections();
    }
  });
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_ROI, 'roititle', 'div_title_roi_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_ROI, 'enableroi', 'lable_enable_roi', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'clear', 'button_roi_clear', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_roi_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'maxrect', 'div_roi_rect_declare', ITEM_TYPE_TEXT);
  /*------------------新增接口处------------------------*/
  translate_page_item(TARGET_PAGE_SUB_ROI, 'roilevel', 'div_roi_content_tips_level', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_ROI, 'nonroifps', 'div_roi_content_tips_nonroifps', ITEM_TYPE_TEXT);
  var rlower, rmiddle, rhigher;
  //rlowerest = translate_page_item(TARGET_PAGE_SUB_ROI, "lowerest","", ITEM_TYPE_NONE);
  rlower = translate_page_item(TARGET_PAGE_SUB_ROI, 'lower', '', ITEM_TYPE_NONE);
  rmiddle = translate_page_item(TARGET_PAGE_SUB_ROI, 'middle', '', ITEM_TYPE_NONE);
  rhigher = translate_page_item(TARGET_PAGE_SUB_ROI, 'higher', '', ITEM_TYPE_NONE);
  //rhigheset = translate_page_item(TARGET_PAGE_SUB_ROI, "higheset","", ITEM_TYPE_NONE);
  //rnonfpsval = translate_page_item(TARGET_PAGE_SUB_ROI, "nonfpsval", "", ITEM_TYPE_NONE);
  $('#id_roi_level_select option').each(function (i, n) {
    if (i === 0) {
      $(n).text(rlower);
    } else if (i === 1) {
      $(n).text(rmiddle);
    } else if (i === 2) {
      $(n).text(rhigher);
    }
  });
  /*--------------------------*/
}
var video_window_width = 640;
var canDrawroi = false;
var video_window_height = 360;
var g_rotate;
var canvas;
var ctx;
function fun_init_canvas() {
  canvas = document.getElementById('canvas_draw_roi');
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  canvas.onmousedown = startdrawgrid;
  canvas.onmouseup = stopdrawgrid;
  canvas.onmousemove = movinggrid;
  canvas.onmouseout = stopdrawgrid;
}
function fun_get_roi_parameter() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      fun_parsexml(this);
    } else {
      fun_parsexml(false);
    }
  };
  xhttp.open('POST', '/action/get?subject=videorio', true);
  xhttp.send();
}
function fun_parsexml(result) {
  if (!result) {
    return;
  }
  var xmldoc = result.responseText;
  var solution = $(xmldoc).find('resolution').text();
  /*更改处-----------------------*/
  var levelVal = $(xmldoc).find('level').text();
  $('#id_roi_level_select').val(levelVal);
  //nonfps的选项固定设置为20个
  var rnonfpsval = 20;
  for (var nonNum = 1; nonNum <= parseInt(rnonfpsval); nonNum++) {
    var itemNode = $('<option></option>');
    itemNode.attr('value', nonNum);
    itemNode.text(nonNum);
    $('#id_roi_nonfps_select').append(itemNode);
  }
  var nonfpsVal = $(xmldoc).find('nonfps').text();
  //nonfpsVal = -1
  if (nonfpsVal == -1) {
    $('#div_roi_nonfps').css('display', 'none');
  } else {
    $('#div_roi_nonfps').css('display', 'block');
  }
  $('#id_roi_nonfps_select').val(nonfpsVal);
  /*--------------------------*/
  var arr = solution.split('x');
  // if (arr[0] > 0 && arr[1] > 0) {
  //   video_window_width = arr[0];
  //   video_window_height = arr[1];
  if (g_rotate == 1) {
    video_window_width = 202;
    video_window_height = 360;
  } else {
    video_window_width = 640;
    video_window_height = 360;
  }
  canvas.width = video_window_width;
  canvas.height = video_window_height;
  enableroi = $(xmldoc).find('active').text();
  if (enableroi == 0) {
    enabledrawroi = false;
    document.getElementById('check_roi_enable').checked = false;
    //----------------------
    document.getElementById('id_roi_level_select').disabled = true;
    document.getElementById('id_roi_nonfps_select').disabled = true;
    //----------------------
    if (CurBrowserIsIE() && null !== g_activex_plugin) {
      g_activex_plugin.SetEnableDraw(0);
    }
  } else {
    enabledrawroi = true;
    document.getElementById('check_roi_enable').checked = true;
    //--------------------
    document.getElementById('id_roi_level_select').disabled = false;
    document.getElementById('id_roi_nonfps_select').disabled = false;
    //---------------------
  }
  var tempIndex = 0;
  $(xmldoc)
    .find('rect')
    .each(function (i) {
      var rectpoints = $(this).text();
      var pointarray = rectpoints.split(',');
      if (pointarray.length === 4) {
        regions[tempIndex].x = parseInt(pointarray[0]) % 16 === 0 ? pointarray[0] : Math.round(parseInt(pointarray[0]) / 16) * 16;
        regions[tempIndex].y = parseInt(pointarray[1]) % 15 === 0 ? pointarray[1] : Math.round(parseInt(pointarray[1]) / 15) * 15;
        regions[tempIndex].w = parseInt(pointarray[2]) % 16 === 0 ? pointarray[2] : Math.round(parseInt(pointarray[2]) / 16) * 16;
        regions[tempIndex].h = parseInt(pointarray[3]) % 15 === 0 ? pointarray[3] : Math.round(parseInt(pointarray[3]) / 15) * 15;
        if (tempIndex === 3) {
          if (CurBrowserIsIE() && g_activex_plugin !== null) {
            var tagpara =
              '' +
              regions[0].x +
              ',' +
              regions[0].y +
              ',' +
              regions[0].w +
              ',' +
              regions[0].h +
              ',' +
              regions[1].x +
              ',' +
              regions[1].y +
              ',' +
              regions[1].w +
              ',' +
              regions[1].h +
              ',' +
              regions[2].x +
              ',' +
              regions[2].y +
              ',' +
              regions[2].w +
              ',' +
              regions[2].h +
              ',' +
              regions[3].x +
              ',' +
              regions[3].y +
              ',' +
              regions[3].w +
              ',' +
              regions[3].h +
              '';
            g_activex_plugin.SetRectangePoints(tagpara);
          }
        }
      }
      tempIndex++;
    });
  canDrawroi = true;
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

function fun_videoShow() {
  sdk_getipcparam('/action/get?subject=cameraimage', function (result) {
    if (result === false) {
      return;
    }
    g_rotate = $(result).find('rotate').text();
    if (g_rotate == 1) {
      video_window_height = 360;
      video_window_width = 202;
      $('#div_roi_video_player').css({
        'object-fit':'contain',
        'width':video_window_width+'px',
        'height':video_window_height+'px',
      });
      // console.log('is zoulang');
    }
    if (!CurBrowserIsIE()) {
      sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (result) {
        if (result != false) {
          $xml = $(result);
          var codec = $xml.find('codec').text();
          if (codec == 1) {
            $('#div_roi_video_player').html("<img id='img_video_show' src='/action/snap' style='width: 100%;height: 100%'/>");
            fun_get_video_picture();
          } else if (codec == 2) {
            var Img_T = "<img style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=0' />";
            $('#div_roi_video_player').html(Img_T);
          } else {
            $('#div_roi_video_player').html('<video id="videoElement" style="border: 1px solid black;" height=' + video_window_height + ' width=' + video_window_width + ' name="videoElement" class="centeredVideo" autoplay></video>');
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
        }
      });
      fun_get_roi_parameter();
    } 
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
    $('#div_roi_draw_mask').css('display', 'none');
  }
}
function fun_on_ieplugin_load() {
  sdk_getipcparam('/action/get?subject=netserv', function (result) {
    if (result != false) {
      $xml = $(result);
      var tcpport = $xml.find('tcp').text();
      var obj = document.getElementById('VIDEO');
      obj.Language = current_language_number();
      obj.UIMode = 11;
      obj.DeviceIp = document.location.hostname;
      obj.TcpPort = tcpport;
      obj.StretchVideo(1);
      obj.SetPieceMaskFormat(24, 40);
      g_activex_plugin = obj;
      fun_get_roi_parameter();
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
var drawGrideMode = 2;
var currentIndex = 0;
var enableroi = 0;
var regions = [];
var sensitivity = 0;
var bStarted = false;
var enabledrawroi = false;
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
  if (currentIndex >= 4 || !enabledrawroi) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (g_rotate == 1) {
    tempx = parseInt(tempx / 10) * 10 + 10;
    tempy = parseInt(tempy / 9) * 9 + 9;
  } else {
    tempx = parseInt(tempx / 16) * 16;
    tempy = parseInt(tempy / 15) * 15;
  }
  regions[currentIndex].x = tempx;
  regions[currentIndex].y = tempy;
  bStarted = true;
}
function stopdrawgrid(evt) {
  if (!bStarted) return;
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (g_rotate == 1) {
    tempx = parseInt(tempx / 10) * 10 + 10;
    tempy = parseInt(tempy / 9) * 9 + 9;
  } else {
    tempx = parseInt(tempx / 16) * 16 + 16;
    tempy = parseInt(tempy / 15) * 15 + 15;
  }
  if (tempx == regions[currentIndex].x) {
    tempx = tempx + 10;
  }
  if (tempy == regions[currentIndex].y) {
    tempy = tempy + 9;
  }
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
  console.log('currentIndex is:' + currentIndex);
}
function fun_clearall() {
  for (var k = 0; k < 4; k++) {
    regions[k].x = 0;
    regions[k].y = 0;
    regions[k].w = 0;
    regions[k].h = 0;
  }
  if (CurBrowserIsIE() && null !== g_activex_plugin) {
    g_activex_plugin.ClearDrawItems();
  }
  currentIndex = 0;
}
function fun_save_sections() {
  var w, h;
  if (CurBrowserIsIE()) {
    if (null !== g_activex_plugin) {
      var strrects = g_activex_plugin.GetRectangleValue();
      var rectpts = strrects.split(',');
      if (rectpts.length === 16) {
        regions[0].x = parseInt(rectpts[0]);
        regions[0].y = parseInt(rectpts[1]);
        regions[0].w = parseInt(rectpts[2]);
        regions[0].h = parseInt(rectpts[3]);
        regions[1].x = parseInt(rectpts[4]);
        regions[1].y = parseInt(rectpts[5]);
        regions[1].w = parseInt(rectpts[6]);
        regions[1].h = parseInt(rectpts[7]);
        regions[2].x = parseInt(rectpts[8]);
        regions[2].y = parseInt(rectpts[9]);
        regions[2].w = parseInt(rectpts[10]);
        regions[2].h = parseInt(rectpts[11]);
        regions[3].x = parseInt(rectpts[12]);
        regions[3].y = parseInt(rectpts[13]);
        regions[3].w = parseInt(rectpts[14]);
        regions[3].h = parseInt(rectpts[15]);
      }
    }
  }
  if (g_rotate == 1) {
    w = video_window_width;
    h = video_window_height;
  } else {
    w = 640;
    h = 360;
  }
  //-----------------------------
  var nonfpsIs1;
  if ($('#div_roi_nonfps').css('display') == 'none') {
    nonfpsIs1 = -1;
  } else {
    nonfpsIs1 = $('#id_roi_nonfps_select').val();
  }
  //------------------------------                                                                                                                                                                                     //-----------------------------------------------------------------------------------------------//
  var xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<videorio>' +
    '<active>' +
    parseInt(enableroi) +
    '</active>' +
    '<resolution>' +
    w +
    'x' +
    h +
    '</resolution>' +
    '<level>' +
    $('#id_roi_level_select').val() +
    '</level>' +
    '<nonfps>' +
    nonfpsIs1 +
    '</nonfps>' +
    '<rect>' +
    regions[0].x +
    ',' +
    regions[0].y +
    ',' +
    regions[0].w +
    ',' +
    regions[0].h +
    '</rect>' +
    '<rect>' +
    regions[1].x +
    ',' +
    regions[1].y +
    ',' +
    regions[1].w +
    ',' +
    regions[1].h +
    '</rect>' +
    '<rect>' +
    regions[2].x +
    ',' +
    regions[2].y +
    ',' +
    regions[2].w +
    ',' +
    regions[2].h +
    '</rect>' +
    '<rect>' +
    regions[3].x +
    ',' +
    regions[3].y +
    ',' +
    regions[3].w +
    ',' +
    regions[3].h +
    '</rect>' +
    '</videorio>' +
    '</request>';
  //----------------------------
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
    var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
    if (this.readyState == 4 && this.status == 200) {
      parent.fun_show_tips_dialog(strsuc);
    } else if (this.readyState == 4 && this.status != 200) {
      parent.fun_show_tips_dialog(failed, 0);
    }
  };
  xhttp.open('POST', '/action/set?subject=videorio', true);
  xhttp.send(String(xml));
}
function fun_enableroi_check() {
  var checked_privacy = document.getElementById('check_roi_enable').checked;
  //--------------
  var options1 = document.getElementById('id_roi_level_select');
  var options2 = document.getElementById('id_roi_nonfps_select');
  //---------------
  if (checked_privacy) {
    enableroi = 1;
    enabledrawroi = true;
    //-------------------
    options1.disabled = false;
    options2.disabled = false;
    //-------------------
    if (CurBrowserIsIE() && null !== g_activex_plugin) {
      g_activex_plugin.SetEnableDraw(1);
    }
  } else {
    enableroi = 0;
    enabledrawroi = false;
    //-------------------
    options1.disabled = true;
    options2.disabled = true;
    //-------------------
    if (CurBrowserIsIE() && null !== g_activex_plugin) {
      g_activex_plugin.ClearDrawItems();
      g_activex_plugin.SetEnableDraw(0);
    }
  }
}
function draw_standard_gride() {
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.strokeRect(0.5, 0.5, video_window_width - 1, video_window_height - 1);
  if (g_rotate == 1) {
    for (var i = 10; i < 202; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i + 0.5, 0);
      ctx.lineTo(i + 0.5, video_window_height);
      ctx.stroke();
    }
    for (var k = 9; k < 360; k += 9) {
      ctx.beginPath();
      ctx.moveTo(0, k + 0.5);
      ctx.lineTo(video_window_width, k + 0.5);
      ctx.stroke();
    }
  } else {
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
}
setInterval(drawsection, 10);
function drawsection() {
  ctx.clearRect(0, 0, video_window_width, video_window_height);
  if (!enabledrawroi || !canDrawroi) return;
  draw_standard_gride();
  ctx.strokeStyle = 'red';
  ctx.fillStyle = '#171717';
  ctx.shadowBlur = 0;
  if (0 === drawGrideMode || 2 === drawGrideMode) {
    for (var j = 0; j < 4; j++) {
      if (regions[j].w > 0 && regions[j].h > 0) {
        ctx.strokeRect(regions[j].x, regions[j].y, regions[j].w, regions[j].h);
        if (g_rotate == 1) {
          for (var tempw = 10; tempw < parseInt(regions[j].w); tempw += 10) {
            ctx.beginPath();
            ctx.moveTo(tempw + parseInt(regions[j].x) + 0.5, parseInt(regions[j].y));
            ctx.lineTo(tempw + parseInt(regions[j].x), parseInt(regions[j].h) + parseInt(regions[j].y));
            ctx.stroke();
          }
          for (var temph = 9; temph < parseInt(regions[j].h); temph += 9) {
            ctx.beginPath();
            ctx.moveTo(parseInt(regions[j].x), temph + parseInt(regions[j].y) - 0.5);
            ctx.lineTo(parseInt(regions[j].w) + parseInt(regions[j].x), temph + parseInt(regions[j].y) + 0.5);
            ctx.stroke();
          }
        } else {
          for (var tempw = 16; tempw < parseInt(regions[j].w); tempw += 16) {
            ctx.beginPath();
            ctx.moveTo(tempw + parseInt(regions[j].x) + 0.5, parseInt(regions[j].y));
            ctx.lineTo(tempw + parseInt(regions[j].x), parseInt(regions[j].h) + parseInt(regions[j].y));
            ctx.stroke();
          }
          for (var temph = 15; temph < parseInt(regions[j].h); temph += 15) {
            ctx.beginPath();
            ctx.moveTo(parseInt(regions[j].x), temph + parseInt(regions[j].y) - 0.5);
            ctx.lineTo(parseInt(regions[j].w) + parseInt(regions[j].x), temph + parseInt(regions[j].y) + 0.5);
            ctx.stroke();
          }
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
