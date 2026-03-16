$(document).ready(function () {
  fun_multilang_adapter()
  fun_register_all_events()
  fun_check_suppor_status()
  fun_get_snapshot_parameters()
})
var g_snapshot_path
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_COMMON, 'snapshot', 'div_title_snapshot_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'errnotsupport', 'pnote_snapshot_support', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'noteurl', 'p_url_note', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_SCHEDULE, 'quality', 'div_snapshot_quality_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_SCHEDULE, 'framerate', 'div_snapshot_framerate_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_SCHEDULE, 'interval', 'div_snapshot_interval_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_SCHEDULE, 'stream', 'div_snapshot_stream_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_SCHEDULE, 'mjpeg', 'div_snapshot_mjpeg_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_SCHEDULE, 'snapshoturl', 'div_snapshot_url_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_snapshot_restore', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_snapshot_refresh', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_snapshot_save', ITEM_TYPE_VALUE)
  var strmain = translate_page_item(TARGET_PAGE_COMMON, 'mainstream', '', ITEM_TYPE_NONE)
  var strsub = translate_page_item(TARGET_PAGE_COMMON, 'substream', '', ITEM_TYPE_NONE)
  $('#select_snapshot_streamtype option').each(function (i, n) {
    if (i == 0) $(n).text(strmain)
    else if (i == 1) $(n).text(strsub)
  })
  var strsecond = translate_page_item(TARGET_PAGE_COMMON, 'second', '', ITEM_TYPE_NONE)
  $('#div_snapshot_interval_range').text(strsecond + '(1~600)')
  input_edit_restriction('input_snapshot_interval', EDIT_RESTRICTION_NUMBER, 3)
}
function fun_check_suppor_status() {
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) return
    var streams = $(result).find('stream').text()
    if (streams > 2) {
      $('#div_snapshot_support_status').css('display', 'none')
    } else {
      $('#div_snapshot_support_status').css('display', 'block')
      $('#select_snapshot_quality').attr('disabled', 'disabled')
      $('#select_snapshot_framerate').attr('disabled', 'disabled')
      $('#select_snapshot_streamtype').attr('disabled', 'disabled')
      $('#input_snapshot_interval').attr('disabled', 'disabled')
      $('#button_snapshot_restore').attr('disabled', 'disabled')
      $('#button_snapshot_refresh').attr('disabled', 'disabled')
      $('#button_snapshot_save').attr('disabled', 'disabled')
    }
  })
}
var g_snapshot_cability = ''
var g_snapshot_stream = 0
var g_snapshot_framerate = 0
function fun_register_all_events() {
  $('#button_snapshot_refresh,#button_snapshot_restore,#button_snapshot_save').click(function () {
    var objid = this.id.toString()
    if (objid == 'button_snapshot_refresh') {
      fun_get_snapshot_parameters()
    } else if (objid == 'button_snapshot_restore') {
      $('#select_snapshot_quality').val(7)
      $('#input_snapshot_interval').val(1)
      $xml = $(g_snapshot_cability)
      var streamopt = $xml.find('streamopt').text()
      $('#select_snapshot_framerate').html('')
      if (streamopt & 0x1) {
        var streammain = $xml.find('stream0').text()
        var tempsmain = streammain.split('-')
        for (var i = parseInt(tempsmain[0]); i <= parseInt(tempsmain[1]); i++) {
          $('#select_snapshot_framerate').append("<option value='" + i + "'>" + String(i) + '</option>')
        }
        $('#select_snapshot_framerate').val(tempsmain[0])
        $('#select_snapshot_streamtype').val(0)
      } else if (streamopt & 0x2) {
        var streamsub = $xml.find('stream1').text()
        var tempssub = streamsub.split('-')
        for (var j = parseInt(tempssub[0]); j <= parseInt(tempssub[1]); j++) {
          $('#select_snapshot_framerate').append("<option value='" + j + "'>" + String(j) + '</option>')
        }
        $('#select_snapshot_framerate').val(tempssub[0])
        $('#select_snapshot_streamtype').val(1)
      }
    } else if (objid == 'button_snapshot_save') {
      fun_save_snapshot_parameters()
    }
  })
  $('#select_snapshot_streamtype').change(function () {
    fun_change_snapshot_streamtype()
  })
}
function fun_change_snapshot_streamtype() {
  var streamtype = $('#select_snapshot_streamtype').val()
  $xml = $(g_snapshot_cability)
  $('#select_snapshot_framerate').html('')
  if (streamtype == 0) {
    var streammain = $xml.find('stream0').text()
    var tempsmain = streammain.split('-')
    for (var i = parseInt(tempsmain[0]); i <= parseInt(tempsmain[1]); i++) {
      $('#select_snapshot_framerate').append("<option value='" + i + "'>" + String(i) + '</option>')
    }
  } else {
    var streamsub = $xml.find('stream1').text()
    var tempssub = streamsub.split('-')
    for (var j = parseInt(tempssub[0]); j <= parseInt(tempssub[1]); j++) {
      $('#select_snapshot_framerate').append("<option value='" + j + "'>" + String(j) + '</option>')
    }
  }
}
function fun_get_snapshot_parameters() {
  sdk_getipcparam('/action/get?subject=snap', function (result) {
    if (result == false) return
    $xml = $(result)
    var framerate = $xml.find('framerate').text()
    var quality = $xml.find('quality').text()
    var interval = $xml.find('interval').text()
    var stream = $xml.find('stream').text()
    g_snapshot_stream = stream
    g_snapshot_framerate = framerate
    var path = $xml.find('path').text()
    $('#select_snapshot_quality').val(quality)
    $('#input_snapshot_interval').val(interval)
    $('#select_snapshot_streamtype').val(stream)
    if (path == 0 || path == 1) {
      g_snapshot_path = path
    }
    var host = document.location.host
    $('#div_snapshot_mjpeg_value').text('http://' + host + '/action/stream?subject=mjpeg&user=admin&pwd=admin12345')
    $('#div_snapshot_url_value').text('http://' + host + '/action/snap?cam=0&user=admin&pwd=admin12345')
    fun_get_snapshot_ability_parameters()
  })
}
function fun_get_snapshot_ability_parameters() {
  sdk_getipcparam('/action/get?subject=snapability', function (result) {
    if (result == false) return
    g_snapshot_cability = result
    $xml = $(result)
    var streamopt = $xml.find('streamopt').text()
    var streammain = $xml.find('stream0').text()
    var streamsub = $xml.find('stream1').text()
    if (parseInt(streamopt) == 0x01 || parseInt(streamopt) == 0x02) {
      $('#select_snapshot_streamtype').attr('disabled', 'disabled')
    } else {
      $('#select_snapshot_streamtype').removeAttr('disabled')
    }
    $('#select_snapshot_framerate').html('')
    if (g_snapshot_stream == 0) {
      var tempsmain = streammain.split('-')
      for (var i = parseInt(tempsmain[0]); i <= parseInt(tempsmain[1]); i++) {
        $('#select_snapshot_framerate').append("<option value='" + i + "'>" + String(i) + '</option>')
      }
    } else {
      var tempssub = streamsub.split('-')
      for (var j = parseInt(tempssub[0]); j <= parseInt(tempssub[1]); j++) {
        $('#select_snapshot_framerate').append("<option value='" + j + "'>" + String(j) + '</option>')
      }
    }
    $('#select_snapshot_framerate').val(g_snapshot_framerate)
  })
}
function fun_save_snapshot_parameters() {
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE)
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE)
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE)
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE)
  var framerate = $('#select_snapshot_framerate').val()
  var quality = $('#select_snapshot_quality').val()
  var stream = $('#select_snapshot_streamtype').val()
  var interval = $('#input_snapshot_interval').val()
  if (interval < 0 || interval > 600) {
    var strinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE)
    parent.fun_show_tips_dialog(strinput, 0)
    return
  }
  var tagxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<response>' +
    '<snap ver="2.0">' +
    '<framerate>' +
    framerate +
    '</framerate>' +
    '<quality>' +
    quality +
    '</quality>' +
    '<interval>' +
    interval +
    '</interval>' +
    '<stream>' +
    stream +
    '</stream>' +
    '<path>' +
    g_snapshot_path +
    '</path>' +
    '</snap>' +
    '</response>'
  sdk_setipcparam('/action/set?subject=snap', tagxml, function (result) {
    if (result == true) {
      parent.fun_show_tips_dialog(strsuc)
    } else if (result == 400) {
      parent.fun_show_tips_dialog(request, 0)
    } else if (result == 403) {
      parent.fun_show_tips_dialog(auth, 0)
    } else {
      parent.fun_show_tips_dialog(failed, 0)
    }
  })
}
