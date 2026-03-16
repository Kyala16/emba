$(document).ready(function () {
  fun_multilang_adapter()
  fun_initiaize_pageui()
  fun_get_audio_support()
  fun_register_events()
})
var g_audioenc_param
function fun_initiaize_pageui() {
  $('#slider_audio_input,#slider_audio_output').slider({ orientation: 'horizontal', range: 'min', max: 100, value: 0, change: fun_slider_change, slide: fun_slider_change })
}
function fun_register_events() {
  $('#button_audio_reset,#button_audio_save').click(function () {
    if (this.id.toString() == 'button_audio_reset') {
      fun_reset_audio_parameters()
    } else if (this.id.toString() == 'button_audio_save') {
      fun_save_audio_parameters()
    }
  })
  $('#check_audio_enable').click(function () {
    fun_audio_enable_change()
  })
  $('#button_audio_refresh').click(function () {
    fun_refresh_audio_parameters()
  })
  $('#select_audio_codec').change(function () {
    fun_change_audio_codec()
  })
  $('#select_audio_sample_ratio').change(function () {
    fun_change_audio_codec()
  })
}
var g_code_val
function fun_change_audio_codec() {
  var codecval = $('#select_audio_codec').val()
  g_code_val = codecval
  if (codecval == 'AAC') {
    $('#div_audio_bitrate').css('display', 'block')
    $('#select_audio_bitrate').html('')
    $xml = $(g_audio_cability)
    $xml
      .find('audioencability')
      .children()
      .each(function () {
        var codename = $(this)[0].nodeName
        if (codename.toUpperCase() == 'AAC') {
          $(this)
            .children('option')
            .each(function () {
              var tempsample = $(this).children('sample').text()
              var sample = $('#select_audio_sample_ratio').val()
              var radio = g_audio_samples[sample]
              if (radio == tempsample) {
                $(this)
                  .children('bitrate')
                  .each(function () {
                    var tempbitrate = $(this).text()
                    $('#select_audio_bitrate').append("<option value='" + tempbitrate + "'>" + tempbitrate + '</option>')
                  })
              }
            })
        }
      })
  } else {
    $('#div_audio_bitrate').css('display', 'none')
  }
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'audiotitle', 'div_title_audio_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'enableaudio', 'label_enable_audio', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'codec', 'div_audio_codec_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'audioin', 'div_audio_input_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'sample', 'div_audio_sample_ratio_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'inputvol', 'div_audio_input_volume_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'outputvol', 'div_audio_output_volume_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_AUDIO, 'bitrates', 'div_audio_bitrate_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_audio_reset', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_audio_save', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_audio_refresh', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'notesupport', 'pnote_audio_support', ITEM_TYPE_TEXT)
  var strmicin = translate_page_item(TARGET_PAGE_SUB_AUDIO, 'micin', '', ITEM_TYPE_NONE)
  var strlinein = translate_page_item(TARGET_PAGE_SUB_AUDIO, 'linein', '', ITEM_TYPE_NONE)
  $('#select_audio_input_type option').each(function (i, n) {
    if (i == 0) $(n).text(strlinein)
    else if (i == 1) $(n).text(strmicin)
  })
}
var g_dev_encode = ''
function fun_get_audio_support() {
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) {
      return
    }
    g_dev_encode = result
    var audioin = $(result).find('ain').text()
    if (parseInt(audioin) > 0) {
      $('#div_note_audio_support').css('display', 'none')
      fun_get_audio_parameters()
    } else {
      $('#div_note_audio_support').css('display', 'block')
      $('#select_audio_codec').attr('disabled', 'disabled')
      $('#div_audio_bitrate').css('display', 'none')
      $('#select_audio_sample_ratio').attr('disabled', 'disabled')
      $('#slider_audio_input').slider('option', { disabled: true })
      $('#slider_audio_output').slider('option', { disabled: true })
      $('#select_audio_input_type').attr('disabled', 'disabled')
      $('#check_audio_enable').attr('disabled', 'disabled')
      $('#button_audio_reset').attr('disabled', 'disabled')
      $('#button_audio_refresh').attr('disabled', 'disabled')
      $('#button_audio_save').attr('disabled', 'disabled')
    }
  })
}
var g_audio_cability = ''
function fun_get_audio_parameters() {
  sdk_getipcparam('/action/get?subject=audioencability', function (result) {
    if (result != false) {
      $('#select_audio_codec').html('')
      $('#select_audio_bitrate').html('')
      g_audio_cability = result
      $xml = $(result)
      var codecshtml = ''
      $xml
        .find('audioencability')
        .children()
        .each(function () {
          // console.log($(this)[0].nodeName);
          var codec = $(this)[0].nodeName;
          if (codec.length > 0) {
            codecshtml += '<option>' + codec + '</option>'
          }
          if (codec.toUpperCase() == 'AAC') {
            $('#div_audio_bitrate').css('display', 'block')
          } else {
            $('#div_audio_bitrate').css('display', 'none')
          }
          $('#select_audio_codec').append('<option>' + codec.toUpperCase() + '</option>')
        })
      fun_get_audio_encode()
    }
  })
  sdk_getipcparam('/action/get?subject=audiovolume', function (result) {
    if (result != false) {
      var xmldoc = loadXMLString(String(result))
      if (xmldoc == null) return
      var inputvol = xmldoc.getElementsByTagName('input')[0]
      var outputvol = xmldoc.getElementsByTagName('output')[0]
      if (inputvol.textContent.length > 0) {
        $('#slider_audio_input').slider('option', 'value', inputvol.textContent)
        $('#div_audio_input_volume_value').text(inputvol.textContent)
      }
      if (outputvol.textContent.length > 0) {
        $('#slider_audio_output').slider('option', 'value', outputvol.textContent)
        $('#div_audio_output_volume_value').text(outputvol.textContent)
      }
    }
  })
}
var g_audio_input_mode = 1
var g_audio_samples = null
function fun_audio_enable_change() {
  var enable = document.getElementById('check_audio_enable').checked
  if (!enable) {
    $('#select_audio_codec').attr('disabled', 'disabled')
    $('#select_audio_sample_ratio').attr('disabled', 'disabled')
    $('#slider_audio_input').slider('option', { disabled: true })
    $('#slider_audio_output').slider('option', { disabled: true })
    if (g_audio_input_mode == 2) {
      $('#select_audio_input_type').attr('disabled', 'disabled')
    }
    $('#select_audio_bitrate').attr('disabled', 'disabled')
  } else {
    $('#select_audio_codec').removeAttr('disabled')
    $('#select_audio_sample_ratio').removeAttr('disabled')
    $('#slider_audio_input').slider('option', { disabled: false })
    $('#slider_audio_output').slider('option', { disabled: false })
    if (g_audio_input_mode == 2) {
      $('#select_audio_input_type').removeAttr('disabled')
    }
    if (g_code_val == 'AAC') {
      $('#div_audio_bitrate').css('display', 'block')
    }
    $('#select_audio_bitrate').removeAttr('disabled')
  }
}
function fun_get_audioenc() {
  sdk_getipcparam('/action/get?subject=audioenc', function (result) {
    if (result != false) {
      $xml = $(result)
      g_audioenc_param = result
      var enableaudio = $xml.find('active').text()
      if (enableaudio == 1) {
        document.getElementById('check_audio_enable').checked = true
        $('#select_audio_codec').removeAttr('disabled')
        $('#slider_audio_input').slider('option', { disabled: false })
        $('#slider_audio_output').slider('option', { disabled: false })
        if (g_audio_input_mode == 2) {
          $('#select_audio_input_type').removeAttr('disabled')
        }
      } else {
        $('#check_audio_enable').prop('checked', false)
        $('#select_audio_codec').attr('disabled', 'disabled')
        $('#select_audio_sample_ratio').attr('disabled', 'disabled')
        $('#slider_audio_input').slider('option', { disabled: true })
        $('#slider_audio_output').slider('option', { disabled: true })
        if (g_audio_input_mode == 2) {
          $('#select_audio_input_type').attr('disabled', 'disabled')
        }
      }
      var audiosample = $xml.find('sample').text()
      g_audio_sample = audiosample
      var audiocodec = $xml.find('codec').text()
      var xmldoc = loadXMLString(String(result))
      if (xmldoc == null) return
      var audioinput = xmldoc.getElementsByTagName('input')[0].textContent
      $('#select_audio_input_type').val(audioinput)
      var straudioenc = ''
      if (audiocodec == 0) {
        $('#select_audio_codec').val('G711U')
        $('#div_audio_bitrate').css('display', 'none')
        straudioenc = 'G711U'
      } else if (audiocodec == 1) {
        $('#select_audio_codec').val('G711A')
        $('#div_audio_bitrate').css('display', 'none')
        straudioenc = 'G711A'
      } else if (audiocodec == 2) {
        $('#select_audio_codec').val('AAC')
        $('#div_audio_bitrate').css('display', 'block')
        straudioenc = 'AAC'
      } else if (audiocodec == 3) {
        $('#select_audio_codec').val('MP2')
        $('#div_audio_bitrate').css('display', 'none')
        straudioenc = 'MP2'
      } else if (audiocodec == 4) {
        $('#select_audio_codec').val('PCM')
        $('#div_audio_bitrate').css('display', 'none')
        straudioenc = 'PCM'
      } else if (audiocodec == 5) {
        $('#select_audio_codec').val('G726')
        $('#div_audio_bitrate').css('display', 'none')
        straudioenc = 'G726'
      }
      var audiotrate = $xml.find('bitrate').text()
      $xml = $(g_audio_cability)
      $xml
        .find('audioencability')
        .children()
        .each(function () {
          var codename = $(this)[0].nodeName
          if (codename.toUpperCase() == straudioenc) {
            $('#select_audio_sample_ratio').html('')
            g_audio_samples = new Array()
            var index = 0
            $(this)
              .children()
              .each(function () {
                var tempsample = $(this).find('sample').text()
                g_audio_samples[g_audio_samples.length] = tempsample
                $('#select_audio_sample_ratio').append("<option value='" + index + "'>" + tempsample + '</option>')
                if (audiosample == tempsample) {
                  $('#select_audio_sample_ratio').val(index)
                }
                index++
              })
          }
          if (codename.toUpperCase() == 'AAC') {
            if (enableaudio == 1) {
              $('#select_audio_bitrate').removeAttr('disabled')
            } else {
              $('#select_audio_bitrate').attr('disabled', 'disabled')
            }
            $(this)
              .children('option')
              .each(function () {
                var tempbitrate = $(this).children('sample').text()
                if (g_audio_sample == tempbitrate) {
                  $(this)
                    .children('bitrate')
                    .each(function () {
                      var tempbitrate = $(this).text()
                      $('#select_audio_bitrate').append("<option value='" + tempbitrate + "'>" + tempbitrate + '</option>')
                    })
                }
              })
          }
        })
      $('#select_audio_bitrate').val(audiotrate)
    }
  })
}
var g_audio_sample
function fun_get_audio_encode() {
  $xml = $(g_dev_encode)
  var audioinput = $xml.find('aimode').text()
  g_audio_input_mode = audioinput
  fun_get_audioenc()
}
function fun_slider_change() {
  var inputvol = $('#slider_audio_input').slider('value')
  var outputvol = $('#slider_audio_output').slider('value')
  $('#div_audio_input_volume_value').text(inputvol)
  $('#div_audio_output_volume_value').text(outputvol)
}
function fun_reset_audio_parameters() {
  document.getElementById('check_audio_enable').checked = true
  $('#select_audio_input_type').val('1')
  $('#slider_audio_input').slider('option', 'value', '80')
  $('#slider_audio_output').slider('option', 'value', '80')
  $('#select_audio_sample_ratio').val('0')
  $('#select_audio_codec').removeAttr('disabled')
  $('#select_audio_sample_ratio').removeAttr('disabled')
  $('#select_audio_codec').html('')
  $('#select_audio_bitrate').html('')
  $xml = $(g_audio_cability)
  var num = 0
  var firval = ''
  $xml
    .find('audioencability')
    .children()
    .each(function () {
      var codename = $(this)[0].nodeName
      $('#select_audio_codec').append('<option>' + codename.toUpperCase() + '</option>')
      num += 1
      if (num == 2) {
        firval = codename.toUpperCase()
      }
      $('#select_audio_codec').val(firval)
      $('#div_audio_bitrate').css('display', 'none')
      console.log(firval)
      if (codename.toUpperCase() == 'G711A') {
        $('#select_audio_codec').val('G711A')
      } else {
        if (firval == 'AAC') {
          $('#div_audio_bitrate').css('display', 'block')
          $('#select_audio_bitrate').removeAttr('disabled')
          $(this)
            .children('option')
            .each(function () {
              var tempsample = $(this).children('sample').text()
              var radio = g_audio_samples[0]
              if (radio == tempsample) {
                var rebit = 0
                $(this)
                  .children('bitrate')
                  .each(function () {
                    var tempbitrate = $(this).text()
                    $('#select_audio_bitrate').append("<option value='" + tempbitrate + "'>" + tempbitrate + '</option>')
                    rebit += 1
                    if (rebit == 1) {
                      $('#select_audio_bitrate').val(tempbitrate)
                    }
                  })
              }
            })
        }
      }
    })
  $('#slider_audio_input').slider('option', { disabled: false })
  $('#slider_audio_output').slider('option', { disabled: false })
  if (g_audio_input_mode == 2) {
    $('#select_audio_input_type').removeAttr('disabled')
  }
}
function fun_refresh_audio_parameters() {
  fun_get_audio_parameters()
}
function fun_save_audio_parameters() {
  $xml = $(g_audioenc_param)
  var bitwidth = $xml.find('bitwidth').text()
  var samples = $('#select_audio_sample_ratio').val()
  var channel = $xml.find('channel').text()
  var inputtype = $('#select_audio_input_type').val()
  var enableaudio = document.getElementById('check_audio_enable').checked
  if (enableaudio) {
    enableaudio = '1'
  } else {
    enableaudio = '0'
  }
  var currindex = $('#select_audio_codec').val()
  if (currindex == 'G711A') {
    currindex = '1'
  } else if (currindex == 'G711U') {
    currindex = '0'
  } else if (currindex == 'AAC') {
    currindex = '2'
  } else if (currindex == 'MP2') {
    currindex = '3'
  } else if (currindex == 'PCM') {
    currindex = '4'
  } else if (currindex == 'G726') {
    currindex = '5'
  }
  var bitrate = $('#select_audio_bitrate').val()
  var tagsample = 8000
  if (typeof g_audio_samples == 'object') {
    if (samples < g_audio_samples.length) {
      tagsample = g_audio_samples[samples]
    }
  }
  var encsuc = false,
    volsuc = false
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE)
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<audioenc ver="2.0">' +
    '<active>' +
    enableaudio +
    '</active>' +
    '<codec>' +
    currindex +
    '</codec>' +
    '<sample>' +
    tagsample +
    '</sample>' +
    '<bitwidth>' +
    bitwidth +
    '</bitwidth>' +
    '<bitrate>' +
    bitrate +
    '</bitrate>' +
    '<channel>' +
    channel +
    '</channel>' +
    '<input>' +
    inputtype +
    '</input>' +
    '</audioenc>' +
    '</request>'
  sdk_setipcparam('/action/set?subject=audioenc', targetxml, function (result) {
    if (result == true) {
      encsuc = true
    }
    if (encsuc && volsuc) {
      parent.fun_show_tips_dialog(strsuc)
    }
  })
  var inputvol = $('#slider_audio_input').slider('value')
  var outputvol = $('#slider_audio_output').slider('value')
  targetxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<audiovolume  ver="2.0">' + '<input>' + inputvol + '</input>' + '<output>' + outputvol + '</output>' + '</audiovolume>' + '</request>'
  sdk_setipcparam('/action/set?subject=audiovolume', targetxml, function (result) {
    if (result) {
      volsuc = true
    }
    if (encsuc && volsuc) {
      parent.fun_show_tips_dialog(strsuc)
    }
  })
}
