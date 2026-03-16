var g_video_mainstream_cability;
var g_video_substream_cability;
var g_video_thirdstream_cability;
var g_video_fourthstream_cability;

var g_video_mainstream_current;
var g_video_substream_current;
var g_video_thirdstream_current;
var g_video_fourthstream_current;

var g_flags_parameter = 0;
var g_video_mainsolution = '';
var g_video_subsolution = '';
var g_video_thirdsolution = '';
var g_video_fourthsolution = '';

var g_video_maincodec = '';
var g_video_subcodec = '';
var g_video_thirdcodec = '';
var g_video_fourthcodec = '';

var g_resolution_change_needreboot = false;
var g_videocodec_change_needreboot = false;
var targetresolution = '';

var g_video_main_profile;
var g_video_sub_profile;
var g_video_third_profile;
var g_video_fourth_profile;
$(document).ready(function () {
  fun_check_capability();
  fun_multilang_adapter();
  fun_get_video_parameters();
  fun_register_events();
  var stream = parseInt(localStorage.getItem('stream'));
  // stream=6//����
  if (stream >= 4) {//������
    $('#div_title_thirdstream').css('display', 'block');
    fun_get_thirdstream_parameters();
  }
  if (stream >= 5) {//������
    $('#div_title_fourthstream').css('display', 'block');
    fun_get_fourthstream_parameters();
  }
});
function fun_register_events() {
  $('.cls_tablebar_item').click(function () {
    fun_on_tab_switch(this.id.toString());
  });
  $('#button_video_refresh,#button_video_save').click(function () {
    if (this.id.toString() == 'button_video_refresh') {
      fun_refresh_video_parameter();
    } else if (this.id.toString() == 'button_video_reset') {
      fun_reset_video_parameter();
    } else if (this.id.toString() == 'button_video_save') {
      fun_check_need_reboot_or_not();
    }
  });
  $('#button_thirdstream_refresh,#button_thirdstream_save').click(function () {
    if (this.id.toString() == 'button_thirdstream_refresh') {
      fun_refresh_thirdstream_parameter();
    } else if (this.id.toString() == 'button_thirdstream_save') {
      fun_third_check_need_reboot_or_not();
    }
  });
  $('#button_fourthstream_refresh,#button_fourthstream_save').click(function () {
    if (this.id.toString() == 'button_fourthstream_refresh') {
      fun_refresh_fourthstream_parameter();
    } else if (this.id.toString() == 'button_fourthstream_save') {
      fun_fourth_check_need_reboot_or_not();
    }
  });
  $('#select_video_main_resolution,#select_video_sub_resolution').change(function () {
    fun_on_resolution_change(this.id.toString());
  });
  $('#select_video_main_bitrate_type,#select_video_sub_bitrate_type').change(function () {
    fun_on_bitratetype_change(this.id.toString());
  });
  $('#check_enable_video_sub').click(function () {
    fun_on_substream_change();
  });
  $('#select_video_main_codec,#select_video_sub_codec,#select_video_third_codec,#select_video_fourth_codec').change(function () {
    fun_on_codec_change(this.id.toString());
  });
  $('#check_enable_main_smartenc,#check_enable_sub_smartenc,#check_enable_third_smartenc').change(function () {
    fun_on_smartenc_change(this.id.toString());
  });
  $('#button_reboot_confirm').click(function () {
    if ($('#div_title_video').hasClass('cls_tablebar_item_selected')) {
      fun_save_video_parameter();
    } else if ($('#div_title_thirdstream').hasClass('cls_tablebar_item_selected')) {
      fun_save_third_parameter();
    } else {
      fun_save_video_workmode_parameters();
    }
    fun_show_rebootnote_dialog(false);
  });
  $('#button_reboot_cancel').click(function () {
    fun_show_rebootnote_dialog(false);
  });
  $('#button_video_workmode_refresh,#button_video_workmode_save').click(function () {
    if (this.id.toString() === 'button_video_workmode_save') {
      fun_show_rebootnote_dialog(true);
    } else {
      fun_get_workmode_parameters();
    }
  });
  $('#check_enable_video_workmode_hdr,#check_enable_video_workmode_fps,#check_enable_video_workmode_clearhdr').click(function () {
    var checkBoxArr = ['hdr', 'fps', 'clearhdr'];
    for (var index = 0; index < checkBoxArr.length; index++) {
      if (this.id.toString() === 'check_enable_video_workmode_' + checkBoxArr[index]&&$('#check_enable_video_workmode_' + checkBoxArr[index]).prop('checked')) {
        var type = $('#check_enable_video_workmode_' + checkBoxArr[index]).prop('checked');
        for (var j = 0; j < checkBoxArr.length; j++) {
          if ('check_enable_video_workmode_' + checkBoxArr[j] != 'check_enable_video_workmode_' + checkBoxArr[index]) {
            $('#check_enable_video_workmode_' + checkBoxArr[j]).prop('checked', !type);
          }
        }
      }
    }
  });
}
function fun_on_tab_switch(objid) {
  $('#' + objid).addClass('cls_tablebar_item_selected');
  $('.cls_tablebar_item')
    .not($('#' + objid))
    .removeClass('cls_tablebar_item_selected');
  if (objid === 'div_title_video') {
    $('#div_video_codec').show();
    $('#div_video_workmode').hide();
    $('#div_video_thirdstream').hide();
    $('#div_video_fourthstream').hide();
  } else if (objid === 'div_title_workmode') {
    $('#div_video_workmode').show();
    $('#div_video_codec').hide();
    $('#div_video_thirdstream').hide();
    $('#div_video_fourthstream').hide();
  } else if (objid === 'div_title_thirdstream') {
    $('#div_video_thirdstream').show();
    $('#div_video_workmode').hide();
    $('#div_video_codec').hide();
    $('#div_video_fourthstream').hide();
  } else if (objid === 'div_title_fourthstream') {
    $('#div_video_fourthstream').show();
    $('#div_video_workmode').hide();
    $('#div_video_codec').hide();
    $('#div_video_thirdstream').hide();
  }
}
function fun_on_codec_change(objid) {
  if (objid == 'select_video_main_codec') {
    $xml = $(g_video_mainstream_cability);
    var smartenc = $xml.find('smartenc').text();
    if (smartenc == 0) {
      $('#div_video_main_smartenc').css('display', 'none');
    } else {
      var strtype = $('#select_video_main_codec').val();
      if (strtype.toLowerCase() == 'mjpeg') {
        $('#div_video_main_smartenc').css('display', 'none');
      } else {
        $('#div_video_main_smartenc').css('display', 'block');
      }
      if (strtype == 'h264') {
        $('#div_video_main_smartenc_value').text('h264+');
      } else {
        $('#div_video_main_smartenc_value').text('h265+');
      }
    }
  } else if (objid == 'select_video_sub_codec') {
    $xml = $(g_video_substream_cability);
    var smartenc = $xml.find('smartenc').text();
    if (smartenc == 0) {
      $('#div_video_sub_smartenc').css('display', 'none');
    } else {
      var strtype = $('#select_video_sub_codec').val();
      if (strtype.toLowerCase() == 'mjpeg') {
        $('#div_video_sub_smartenc').css('display', 'none');
      } else {
        $('#div_video_sub_smartenc').css('display', 'block');
      }
      if (strtype == 'h264') {
        $('#div_video_sub_smartenc_value').text('h264+');
      } else {
        $('#div_video_sub_smartenc_value').text('h265+');
      }
    }
  } else if (objid == 'select_video_third_codec') {
    $xml = $(g_video_thirdstream_cability);
    var smartenc = $xml.find('smartenc').text();
    if (smartenc == 0) {
      $('#div_video_third_smartenc').css('display', 'none');
    } else {
      var strtype = $('#select_video_third_codec').val();
      if (strtype.toLowerCase() == 'mjpeg') {
        $('#div_video_third_smartenc').css('display', 'none');
      } else {
        $('#div_video_third_smartenc').css('display', 'block');
      }
      if (strtype == 'h264') {
        $('#div_video_third_smartenc_value').text('h264+');
      } else {
        $('#div_video_third_smartenc_value').text('h265+');
      }
    }
  } else if (objid == 'select_video_fourth_codec') {
    $xml = $(g_video_fourthstream_cability);
    var smartenc = $xml.find('smartenc').text();
    if (smartenc == 0) {
      $('#div_video_fourth_smartenc').css('display', 'none');
    } else {
      var strtype = $('#select_video_fourth_codec').val();
      if (strtype.toLowerCase() == 'mjpeg') {
        $('#div_video_fourth_smartenc').css('display', 'none');
      } else {
        $('#div_video_fourth_smartenc').css('display', 'block');
      }
      if (strtype == 'h264') {
        $('#div_video_fourth_smartenc_value').text('h264+');
      } else {
        $('#div_video_fourth_smartenc_value').text('h265+');
      }
    }
  }
}
function fun_on_smartenc_change(objid) {
  if (objid == 'check_enable_main_smartenc') {
    if ($('#check_enable_main_smartenc').is(':checked')) {
      $('#div_video_main_smartenc_value').css('display', 'block');
      $('#select_video_main_encode_quality').attr('disabled', 'disabled');
      $('#select_video_main_key_frame').attr('disabled', 'disabled');
    } else {
      $('#div_video_main_smartenc_value').css('display', 'none');
      $('#select_video_main_encode_quality').attr('disabled', false);
      $('#select_video_main_key_frame').attr('disabled', false);
    }
    if ($('#select_video_main_bitrate_type').val() == 'CBR') {
      $('#select_video_main_encode_quality').attr('disabled', 'disabled');
    }
  } else if (objid == 'check_enable_sub_smartenc') {
    if ($('#check_enable_sub_smartenc').is(':checked')) {
      $('#div_video_sub_smartenc_value').css('display', 'block');
      $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
      $('#select_video_sub_key_frame').attr('disabled', 'disabled');
    } else {
      $('#div_video_sub_smartenc_value').css('display', 'none');
      $('#select_video_sub_encode_quality').attr('disabled', false);
      $('#select_video_sub_key_frame').attr('disabled', false);
    }
    if ($('#select_video_sub_bitrate_type').val() == 'CBR') {
      $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
    }
  } else if (objid == 'check_enable_third_smartenc') {
    if ($('#check_enable_third_smartenc').is(':checked')) {
      $('#div_video_third_smartenc_value').css('display', 'block');
      $('#select_video_third_encode_quality').attr('disabled', 'disabled');
      $('#select_video_third_key_frame').attr('disabled', 'disabled');
    } else {
      $('#div_video_third_smartenc_value').css('display', 'none');
      $('#select_video_third_encode_quality').attr('disabled', false);
      $('#select_video_third_key_frame').attr('disabled', false);
    }
    if ($('#select_video_third_bitrate_type').val() == 'CBR') {
      $('#select_video_third_encode_quality').attr('disabled', 'disabled');
    }
  }
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'thirdstream', 'div_title_thirdstream_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'fourthstream', 'div_title_fourthstream_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'videotitle', 'div_title_video_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'mainstream', 'div_video_main_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'codec', 'div_video_main_codec_name,div_video_third_codec_name,div_video_fourth_codec_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'resolution', 'div_video_main_resolution_name,div_video_third_resolution_name,div_video_fourth_resolution_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'profile', 'div_video_main_profile_name,div_video_third_profile_name,div_video_fourth_profile_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'frameratio', 'div_video_main_frame_rate_name,div_video_third_frame_rate_name,div_video_fourth_frame_rate_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'bitratetype', 'div_video_main_bitrate_type_name,div_video_third_bitrate_type_name,div_video_fourth_bitrate_type_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'bitraterange', 'div_video_main_bitrate_reference_name,div_video_third_bitrate_reference_name,div_video_fourth_bitrate_reference_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'bitrate', 'div_video_main_bitrate_name,div_video_third_bitrate_name,div_video_fourth_bitrate_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'quality', 'div_video_main_encode_quality_name,div_video_third_encode_quality_name,div_video_fourth_encode_quality_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'keyframe', 'div_video_main_key_frame_name,div_video_third_key_frame_name,div_video_fourth_key_frame_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'substream', 'div_video_sub_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'codec', 'div_video_sub_codec_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'resolution', 'div_video_sub_resolution_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'profile', 'div_video_sub_profile_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'frameratio', 'div_video_sub_frame_rate_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'bitratetype', 'div_video_sub_bitrate_type_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'bitraterange', 'div_video_sub_bitrate_reference_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'bitrate', 'div_video_sub_bitrate_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'quality', 'div_video_sub_encode_quality_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'keyframe', 'div_video_sub_key_frame_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'smartenc', 'div_video_main_smartenc_name,div_video_sub_smartenc_name,div_video_third_smartenc_name,div_video_fourth_smartenc_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'withaudio', 'div_video_main_withaudio_name,div_video_sub_withaudio_name,div_video_third_withaudio_name,div_video_fourth_withaudio_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'noteframe', 'select_video_main_frame_rate,select_video_sub_frame_rate', ITEM_TYPE_TOOLTIP);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'notekeyframe', 'select_video_main_key_frame,select_video_sub_key_frame', ITEM_TYPE_TOOLTIP);

  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_video_refresh,button_video_workmode_refresh,button_thirdstream_refresh,button_fourthstream_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_video_save,button_video_workmode_save,button_thirdstream_save,button_fourthstream_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'notevreboot', 'div_note_reboot_content', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_COMMON, 'confirm', 'button_reboot_confirm', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_reboot_cancel', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_video_reset', ITEM_TYPE_VALUE);

  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'videowm', 'div_title_workmode_text', ITEM_TYPE_TEXT);
  input_edit_restriction('input_video_main_bitrate', EDIT_RESTRICTION_NUMBER, 5);
  input_edit_restriction('input_video_sub_bitrate', EDIT_RESTRICTION_NUMBER, 5);
  var strbest = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'best', '', ITEM_TYPE_NONE);
  var strbetter = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'better', '', ITEM_TYPE_NONE);
  var strgood = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'good', '', ITEM_TYPE_NONE);
  var strnormal = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'normal', '', ITEM_TYPE_NONE);
  var strworse = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'worse', '', ITEM_TYPE_NONE);
  var strworst = translate_page_item(TARGET_PAGE_SUB_VIDEO, 'worst', '', ITEM_TYPE_NONE);
  var enable = translate_page_item(TARGET_PAGE_COMMON, 'enable', '', ITEM_TYPE_NONE);
  var stryes = translate_page_item(TARGET_PAGE_COMMON, 'yes', 'button_upnp_add_or_modify', ITEM_TYPE_NONE);
  var strno = translate_page_item(TARGET_PAGE_COMMON, 'not', 'button_upnp_cancel', ITEM_TYPE_NONE);
  if (current_language_number() == 4) {
    $('#div_video_sub_enable_name').text(enable);
  } else {
    $('#div_video_sub_enable_name').text(enable);
  }
  $('#select_video_main_encode_quality option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strbest);
    } else if (i == 1) {
      $(n).text(strbetter);
    } else if (i == 2) {
      $(n).text(strgood);
    } else if (i == 3) {
      $(n).text(strnormal);
    } else if (i == 4) {
      $(n).text(strworse);
    }
  });
  $('#select_video_sub_encode_quality option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strbest);
    } else if (i == 1) {
      $(n).text(strbetter);
    } else if (i == 2) {
      $(n).text(strgood);
    } else if (i == 3) {
      $(n).text(strnormal);
    } else if (i == 4) {
      $(n).text(strworse);
    }
  });
  $('#select_video_third_encode_quality option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strbest);
    } else if (i == 1) {
      $(n).text(strbetter);
    } else if (i == 2) {
      $(n).text(strgood);
    } else if (i == 3) {
      $(n).text(strnormal);
    } else if (i == 4) {
      $(n).text(strworse);
    }
  });
  $('#select_video_fourth_encode_quality option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strbest);
    } else if (i == 1) {
      $(n).text(strbetter);
    } else if (i == 2) {
      $(n).text(strgood);
    } else if (i == 3) {
      $(n).text(strnormal);
    } else if (i == 4) {
      $(n).text(strworse);
    }
  });
}
function fun_check_capability() {
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) {
      return;
    }
    $xml = $(result);
    var shdr = $xml.find('hdr').text();
    var hfps = $xml.find('highfps').text();
    var clearhdr = $xml.find('clearhdr').text();

    if (shdr === '1' || hfps === '1') {
      $('#div_title_workmode').show();
      fun_get_workmode_parameters();
    } else {
      $('#div_video_codec').show();
      $('#div_video_workmode').hide();
      $('#div_title_video').addClass('cls_tablebar_item_selected');
      $('#div_title_workmode').removeClass('cls_tablebar_item_selected');
    }
    if (shdr == '1') {
      $('#div_video_wordmode_hdr').css('display', 'block');
    }

    if (clearhdr == '1') {
      $('#div_video_wordmode_clearhdr').css('display', 'block');
    }

    if (hfps == '1') {
      $('#div_video_video_workmode_fps').css('display', 'block');
    }
  });
}
function fun_get_video_parameters() {
  sdk_getipcparam('/action/get?subject=videoencability&stream=0', function (result) {
    if (result != false) {
      $xml = $(result);
      g_video_mainstream_cability = result;
      $('#select_video_main_codec').html('');
      var smartenc = $xml.find('smartenc').text();
      var rebootv = $xml.find('reboot').text();
      if (smartenc == 0) {
        $('#div_video_main_smartenc').css('display', 'none');
        $('#div_video_sub_smartenc').css('display', 'none');
      }
      $xml
        .find('videoencability')
        .children()
        .each(function () {
          // if ($(this).context.nodeName.toLowerCase() == 'reboot') {
          if ($(this)[0].nodeName.toLowerCase() == 'reboot') {
            return;
          }
          var codec = $(this)[0].nodeName;
          $('#select_video_main_codec').append('<option>' + codec.toLowerCase() + '</option>');
        });
      g_flags_parameter |= 1;
      if ((g_flags_parameter & 0b1111) == 15) {
        fun_initialize_pageui(3, '', '', '', '', true);
      }
      if (parseInt(rebootv) & 1) {
        g_resolution_change_needreboot = true;
      } else {
        g_resolution_change_needreboot = false;
      }
      if (parseInt(rebootv) & 2) {
        g_videocodec_change_needreboot = true;
      } else {
        g_videocodec_change_needreboot = false;
      }
    }
    fun_get_video_parameters_0();
  });
  sdk_getipcparam('/action/get?subject=videoencability&stream=1', function (result) {
    if (result != false) {
      $xml = $(result);
      g_video_substream_cability = result;
      $('#select_video_sub_codec').html('');
      $xml
        .find('videoencability')
        .children()
        .each(function () {
          if ($(this)[0].nodeName.toLowerCase() == 'reboot') {
            return;
          }
          var codec = $(this)[0].nodeName;
          $('#select_video_sub_codec').append('<option>' + codec.toLowerCase() + '</option>');
        });
      g_flags_parameter |= 2;
      if ((g_flags_parameter & 0b1111) == 15) {
        fun_initialize_pageui(3, '', '', '', '', true);
      }
    }
    fun_get_video_parameters_1();
  });
}
function fun_get_video_parameters_0() {
  sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (result) {
    if (result != false) {
      g_video_mainstream_current = result;
      $xml = $(result);
      $videocurrent = $(g_video_mainstream_current);
      var codec = $xml.find('codec').text();
      var solut = $xml.find('resolution').text();
      g_video_main_profile = $videocurrent.find('profile').text();

      if (g_video_main_profile == 0) {
        g_video_main_profile = 'Baseline';
      } else if (g_video_main_profile == 1) {
        g_video_main_profile = 'Main Profile';
      } else if (g_video_main_profile == 2) {
        g_video_main_profile = 'High Profile';
      }
      g_video_mainsolution = solut;
      if (codec == 0) {
        $('#select_video_main_codec').val('h264');
        $('#div_video_main_smartenc_value').text('h264+');
        g_video_maincodec = 'h264';
      } else if (codec == 1) {
        $('#select_video_main_codec').val('h265');
        $('#div_video_main_smartenc_value').text('h265+');
        g_video_maincodec = 'h265';
      } else if (codec == 2) {
        $('#select_video_main_codec').val('mjpeg');
        $('#div_video_main_smartenc').css('display', 'none');
        g_video_maincodec = 'mjpeg';
      }
      var msmarten = $xml.find('smarten').text();
      if (msmarten == 1 && $(g_video_mainstream_cability).find('smartenc').text() != 0) {
        $('#check_enable_main_smartenc').prop('checked', true);
        $('#div_video_main_smartenc_value').css('display', 'block');
        setTimeout(function () {
          $('#select_video_main_encode_quality').attr('disabled', 'disabled');
          $('#select_video_main_key_frame').attr('disabled', 'disabled');
        }, 50);
      } else {
        $('#check_enable_main_smartenc').prop('checked', false);
        $('#div_video_main_smartenc_value').css('display', 'none');
        setTimeout(function () {
          $('#select_video_main_encode_quality').removeAttr('disabled');
          $('#select_video_main_key_frame').removeAttr('disabled');
        }, 50);
      }
      g_flags_parameter |= 4;
      if ((g_flags_parameter & 0b1111) == 15) {
        fun_initialize_pageui(3, '', '', '', '', true);
      }
    }
  });
}

function fun_get_video_parameters_1() {
  sdk_getipcparam('/action/get?subject=videoenc&stream=1', function (result) {
    if (result != false) {
      g_video_substream_current = result;
      $xml = $(result);
      $videocability = $(g_video_substream_current);
      g_video_sub_profile = $videocability.find('profile').text();

      if (g_video_sub_profile == 0) {
        g_video_sub_profile = 'Baseline';
      } else if (g_video_sub_profile == 1) {
        g_video_sub_profile = 'Main Profile';
      } else if (g_video_sub_profile == 2) {
        g_video_sub_profile = 'High Profile';
      }
      var codec = $xml.find('codec').text();
      var solut = $xml.find('resolution').text();
      g_video_subsolution = solut;
      if (codec == 0) {
        $('#select_video_sub_codec').val('h264');
        $('#div_video_sub_smartenc_value').text('h264+');
        g_video_subcodec = 'h264';
      } else if (codec == 1) {
        $('#select_video_sub_codec').val('h265');
        $('#div_video_sub_smartenc_value').text('h265+');
        g_video_subcodec = 'h265';
      } else if (codec == 2) {
        $('#select_video_sub_codec').val('mjpeg');
        $('#div_video_sub_smartenc').css('display', 'none');
        g_video_subcodec = 'mjpeg';
      }
      var ssmarten = $xml.find('smarten').text();
      if (ssmarten == 1 && $(g_video_mainstream_cability).find('smartenc').text() != 0) {
        $('#check_enable_sub_smartenc').prop('checked', true);
        $('#div_video_sub_smartenc_value').css('display', 'block');
        setTimeout(function () {
          $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
          $('#select_video_sub_key_frame').attr('disabled', 'disabled');
        }, 50);
      } else {
        $('#check_enable_sub_smartenc').prop('checked', false);
        $('#div_video_sub_smartenc_value').css('display', 'none');
        setTimeout(function () {
          $('#select_video_sub_encode_quality').removeAttr('disabled');
          $('#select_video_sub_key_frame').removeAttr('disabled');
        }, 50);
      }
      g_flags_parameter |= 8;
      if ((g_flags_parameter & 0b1111) == 15) {
        fun_initialize_pageui(3, '', '', '', '', true);
      }
    }
  });
}

function fun_get_video_parameters_3() {
  sdk_getipcparam('/action/get?subject=videoenc&stream=3', function (result) {
    if (result != false) {
      g_video_thirdstream_current = result;
      $xml = $(result);
      $videocurrent = $(g_video_thirdstream_current);
      var codec = $xml.find('codec').text();
      var solut = $xml.find('resolution').text();
      g_video_third_profile = $videocurrent.find('profile').text();
      if (g_video_third_profile == 0) {
        g_video_third_profile = 'Baseline';
      } else if (g_video_third_profile == 1) {
        g_video_third_profile = 'Main Profile';
      } else if (g_video_third_profile == 2) {
        g_video_third_profile = 'High Profile';
      }
      g_video_thirdsolution = solut;
      if (codec == 0) {
        $('#select_video_third_codec').val('h264');
        $('#div_video_third_smartenc_value').text('h264+');
        g_video_thirdcodec = 'h264';
      } else if (codec == 1) {
        $('#select_video_third_codec').val('h265');
        $('#div_video_third_smartenc_value').text('h265+');
        g_video_thirdcodec = 'h265';
      } else if (codec == 2) {
        $('#select_video_third_codec').val('mjpeg');
        $('#div_video_third_smartenc').css('display', 'none');
        g_video_thirdcodec = 'mjpeg';
      }
      var msmarten = $xml.find('smarten').text();
      if (msmarten == 1 && $(g_video_thirdstream_cability).find('smartenc').text() != 0) {
        $('#check_enable_third_smartenc').prop('checked', true);
        $('#div_video_third_smartenc_value').css('display', 'block');
        setTimeout(function () {
          $('#select_video_third_encode_quality').attr('disabled', 'disabled');
          $('#select_video_third_key_frame').attr('disabled', 'disabled');
        }, 50);
      } else {
        $('#check_enable_third_smartenc').prop('checked', false);
        $('#div_video_third_smartenc_value').css('display', 'none');
        setTimeout(function () {
          $('#select_video_third_encode_quality').removeAttr('disabled');
          $('#select_video_third_key_frame').removeAttr('disabled');
        }, 50);
      }
      g_flags_parameter |= 32;
      if ((g_flags_parameter & 0b110000) == 48) {
        fun_initialize_pageui(4, '', '', '', '', true);
      }
    }
  });
}
function fun_get_video_parameters_4() {
  sdk_getipcparam('/action/get?subject=videoenc&stream=4', function (result) {
    if (result != false) {
      g_video_fourthstream_current = result;
      $xml = $(result);
      $videocurrent = $(g_video_fourthstream_current);
      var codec = $xml.find('codec').text();
      var solut = $xml.find('resolution').text();
      g_video_fourth_profile = $videocurrent.find('profile').text();
      if (g_video_fourth_profile == 0) {
        g_video_fourth_profile = 'Baseline';
      } else if (g_video_fourth_profile == 1) {
        g_video_fourth_profile = 'Main Profile';
      } else if (g_video_fourth_profile == 2) {
        g_video_fourth_profile = 'High Profile';
      }
      g_video_fourthsolution = solut;
      if (codec == 0) {
        $('#select_video_fourth_codec').val('h264');
        $('#div_video_fourth_smartenc_value').text('h264+');
        g_video_fourthcodec = 'h264';
      } else if (codec == 1) {
        $('#select_video_fourth_codec').val('h265');
        $('#div_video_fourth_smartenc_value').text('h265+');
        g_video_fourthcodec = 'h265';
      } else if (codec == 2) {
        $('#select_video_fourth_codec').val('mjpeg');
        $('#div_video_fourth_smartenc').css('display', 'none');
        g_video_fourthcodec = 'mjpeg';
      }
      var msmarten = $xml.find('smarten').text();
      if (msmarten == 1 && $(g_video_fourthstream_cability).find('smartenc').text() != 0) {
        $('#check_enable_fourth_smartenc').prop('checked', true);
        $('#div_video_fourth_smartenc_value').css('display', 'block');
        setTimeout(function () {
          $('#select_video_fourth_encode_quality').attr('disabled', 'disabled');
          $('#select_video_fourth_key_frame').attr('disabled', 'disabled');
        }, 50);
      } else {
        $('#check_enable_fourth_smartenc').prop('checked', false);
        $('#div_video_fourth_smartenc_value').css('display', 'none');
        setTimeout(function () {
          $('#select_video_fourth_encode_quality').removeAttr('disabled');
          $('#select_video_fourth_key_frame').removeAttr('disabled');
        }, 50);
      }
      g_flags_parameter |= 32;
      if ((g_flags_parameter & 0b110000) == 48) {
        fun_initialize_pageui(8, '', '', '', '', true);
      }
    }
  });
}
function fun_get_thirdstream_parameters() {
  sdk_getipcparam('/action/get?subject=videoencability&stream=3', function (result) {
    if (result != false) {
      $xml = $(result);
      g_video_thirdstream_cability = result;
      $('#select_video_third_codec').html('');
      var smartenc = $xml.find('smartenc').text();
      var rebootv = $xml.find('reboot').text();
      if (smartenc == 0) {
        $('#div_video_third_smartenc').css('display', 'none');
      }
      $xml
        .find('videoencability')
        .children()
        .each(function () {
          if ($(this)[0].nodeName.toLowerCase() == 'reboot') {
            return;
          }
          var codec = $(this)[0].nodeName;
          
          $('#select_video_third_codec').append('<option>' + codec.toLowerCase() + '</option>');
        });
      g_flags_parameter |= 16;
      if ((g_flags_parameter & 0b110000) == 48) {
        fun_initialize_pageui(4, '', '', '', '', true);
      }
      if (parseInt(rebootv) & 1) {
        g_resolution_change_needreboot = true;
      } else {
        g_resolution_change_needreboot = false;
      }
      if (parseInt(rebootv) & 2) {
        g_videocodec_change_needreboot = true;
      } else {
        g_videocodec_change_needreboot = false;
      }
    }
    fun_get_video_parameters_3();
  });
}
function fun_get_fourthstream_parameters() {//������
  // console.log('��������������');
  sdk_getipcparam('/action/get?subject=videoencability&stream=4', function (result) {
    if (result != false) {
      $xml = $(result);
      g_video_fourthstream_cability = result;
      $('#select_video_fourth_codec').html('');
      var smartenc = $xml.find('smartenc').text();
      var rebootv = $xml.find('reboot').text();
      if (smartenc == 0) {
        $('#div_video_fourth_smartenc').css('display', 'none');
      }
      $xml
        .find('videoencability')
        .children()
        .each(function () {
          if ($(this)[0].nodeName.toLowerCase() == 'reboot') {
            return;
          }
          var codec = $(this)[0].nodeName.toLowerCase();
          $('#select_video_fourth_codec').append('<option>' + codec.toLowerCase() + '</option>');
        });
      g_flags_parameter |= 16;
      if ((g_flags_parameter & 0b110000) == 48) {
        fun_initialize_pageui(5, '', '', '', '', true);
      }
      if (parseInt(rebootv) & 1) {
        g_resolution_change_needreboot = true;
      } else {
        g_resolution_change_needreboot = false;
      }
      if (parseInt(rebootv) & 2) {
        g_videocodec_change_needreboot = true;
      } else {
        g_videocodec_change_needreboot = false;
      }
    }
    fun_get_video_parameters_4();
  });
}


function fun_get_workmode_parameters() {
  sdk_getipcparam('/action/get?subject=videowork', function (result) {
    if (result !== false) {
      $xml = $(result);
      var vhdr = $xml.find('hdr').text();
      var vfps = $xml.find('highfps').text();
      var clearhdr = $xml.find('clearhdr').text();

      if (vhdr === '1') {
        $('#check_enable_video_workmode_hdr').prop('checked', true);
      } else {
        $('#check_enable_video_workmode_hdr').prop('checked', false);
      }
      if (clearhdr === '1') {
        $('#check_enable_video_workmode_clearhdr').prop('checked', true);
      } else {
        $('#check_enable_video_workmode_clearhdr').prop('checked', false);
      }
      if (vfps === '1') {
        $('#check_enable_video_workmode_fps').prop('checked', true);
      } else {
        $('#check_enable_video_workmode_fps').prop('checked', false);
      }
    }
  });
}
var g_mainstream_minbit = 0,
  g_mainstream_maxbit = 0,
  g_substream_minbit = 0,
  g_substream_maxbit = 0;
  g_thirdstream_minbit = 0,
  g_thirdstream_maxbit = 0;
  g_fourthstream_minbit = 0,
  g_fourthstream_maxbit = 0;

function fun_initialize_pageui(flags, mainresolution, subresolution, thirdresolution, fourthresolution, bupdate) {
  // console.log(bupdate);
  if (flags & 1) {
    var codec, resolution, framerate, bitratetype, keyframe, bitrate, quality, profile, audioen;
    $videocurrent = $(g_video_mainstream_current);
    codec = $videocurrent.find('codec').text();
    resolution = $videocurrent.find('resolution').text();
    framerate = $videocurrent.find('framerate').text();
    bitratetype = $videocurrent.find('rc').text();
    keyframe = $videocurrent.find('keygop').text();
    bitrate = $videocurrent.find('bitrate').text();
    quality = $videocurrent.find('quality').text();
    profile = $videocurrent.find('profile').text();
    audioen = $videocurrent.find('audioen').text();
    var tempframe = $('#select_video_main_frame_rate').val();
    var tempkeyframe = $('#select_video_main_key_frame').val();
    fun_clear_plugins_item(1);
    if (mainresolution.length <= 0) {
      targetresolution = resolution;
    } else {
      targetresolution = mainresolution;
    }
    if (codec == 0) {
    } else if (codec == 1) {
    }
    if (quality == 0) {
      quality = 1;
    }
    if (bupdate) {
      $('#select_video_main_encode_quality').val(quality);
      if (bitratetype == 0) {
        $('#select_video_main_bitrate_type').val('VBR');
        $('#select_video_main_encode_quality').attr('disabled', false);
      } else if (bitratetype == 1) {
        $('#select_video_main_bitrate_type').val('CBR');
        $('#select_video_main_encode_quality').attr('disabled', 'disabled');
      }
      if (profile == 0) {
        $('#select_video_main_profile').val('Baseline');
      } else if (profile == 1) {
        $('#select_video_main_profile').val('Main Profile');
      } else if (profile == 2) {
        $('#select_video_main_profile').val('High Profile');
      }
      if (audioen == 1) {
        $('#check_enable_main_withaudio').prop('checked', true);
      } else {
        $('#check_enable_main_withaudio').prop('checked', false);
      }
      $('#input_video_main_bitrate').val(bitrate);
    }
    var maxframerate = 5;
    $videocability = $(g_video_mainstream_cability);
    $videocability
      .find('h264')
      .children('option')
      .each(function () {
        var tempval = $(this).children('resolution').text();
        $('#select_video_main_resolution').append('<option>' + tempval + '</option>');
        if (tempval.toLowerCase() === targetresolution) {
          tempval = $(this).children('framerate').text();
          var temparry = tempval.split('-');
          maxframerate = parseInt(temparry[1]);
          for (var i = parseInt(temparry[0]); i <= parseInt(temparry[1]); i++) {
            $('#select_video_main_frame_rate').append('<option>' + String(i) + '</option>');
          }
          tempval = $(this).children('bitrate').text();
          temparry = tempval.split('-');
          $('#div_video_main_bitrate_reference_value').text('[' + temparry[0] + '...' + temparry[1] + '] kbps');
          g_mainstream_minbit = parseInt(temparry[0]);
          g_mainstream_maxbit = parseInt(temparry[1]);
          if (bitrate > g_mainstream_maxbit) {
            $('#input_video_main_bitrate').val(g_mainstream_maxbit);
          }
          tempval = $(this).children('keygop').text();
          temparry = tempval.split('-');
          for (var j = parseInt(temparry[0]); j <= parseInt(temparry[1]); j++) {
            $('#select_video_main_key_frame').append('<option>' + String(j) + '</option>');
          }
          if (bupdate) {
            $('#select_video_main_key_frame').val(keyframe);
          } else {
            $('#select_video_main_key_frame').val(tempkeyframe);
          }
        }
      });
    $('#select_video_main_resolution').val(targetresolution);
    if (bupdate) {
      $('#select_video_main_frame_rate').val(framerate);
    } else {
      if (tempframe <= maxframerate) {
        $('#select_video_main_frame_rate').val(tempframe);
      } else {
        $('#select_video_main_frame_rate').val(maxframerate);
      }
    }
  }
  if (flags & 2) {
    var codec, resolution, framerate, bitratetype, keyframe, bitrate, quality, profile, active, audioen;
    $videocurrent = $(g_video_substream_current);
    codec = $videocurrent.find('codec').text();
    resolution = $videocurrent.find('resolution').text();
    framerate = $videocurrent.find('framerate').text();
    bitratetype = $videocurrent.find('rc').text();
    keyframe = $videocurrent.find('keygop').text();
    bitrate = $videocurrent.find('bitrate').text();
    quality = $videocurrent.find('quality').text();
    profile = $videocurrent.find('profile').text();
    active = $videocurrent.find('active').text();
    audioen = $videocurrent.find('audioen').text();
    if (active) {
      if (active == 0) {
        if (bupdate) {
          $('#select_video_sub_codec').attr('disabled', 'disabled');
          $('#select_video_sub_resolution').attr('disabled', 'disabled');
          $('#select_video_sub_frame_rate').attr('disabled', 'disabled');
          $('#select_video_sub_bitrate_type').attr('disabled', 'disabled');
          $('#select_video_sub_key_frame').attr('disabled', 'disabled');
          $('#input_video_sub_bitrate').attr('disabled', 'disabled');
          $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
          $('#select_video_sub_profile').attr('disabled', 'disabled');
          $('#check_enable_sub_withaudio').attr('disabled', 'disabled');
          $('#check_enable_sub_smartenc').attr('disabled', 'disabled');
        }
        $('#check_enable_video_sub').prop('checked', false);
      } else {
        if (bupdate) {
          $('#select_video_sub_codec').removeAttr('disabled');
          $('#select_video_sub_resolution').removeAttr('disabled');
          $('#select_video_sub_frame_rate').removeAttr('disabled');
          $('#select_video_sub_bitrate_type').removeAttr('disabled');
          $('#select_video_sub_key_frame').removeAttr('disabled');
          $('#input_video_sub_bitrate').removeAttr('disabled');
          $('#select_video_sub_encode_quality').removeAttr('disabled');
          $('#select_video_sub_profile').removeAttr('disabled');
          $('#check_enable_sub_withaudio').removeAttr('disabled');
          $('#check_enable_sub_smartenc').removeAttr('disabled');
        }
        $('#check_enable_video_sub').prop('checked', true);
      }
    } else {
      $('#check_enable_video_sub').prop('checked', false);
      $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
    }
    var tempframe = $('#select_video_sub_frame_rate').val();
    var tempkeyframe = $('#select_video_sub_key_frame').val();
    fun_clear_plugins_item(2);
    if (subresolution.length <= 0) {
      targetresolution = resolution;
    } else {
      targetresolution = subresolution;
    }
    if (codec == 0) {
    } else if (codec == 1) {
    }
    if (quality == 0) {
      quality = 1;
    }
    if (bupdate) {
      $('#select_video_sub_encode_quality').val(quality);
      if (bitratetype == 0) {
        $('#select_video_sub_bitrate_type').val('VBR');
      } else if (bitratetype == 1) {
        $('#select_video_sub_bitrate_type').val('CBR');
        $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
      }
      if (profile == 0) {
        $('#select_video_sub_profile').val('Baseline');
      } else if (profile == 1) {
        $('#select_video_sub_profile').val('Main Profile');
      } else if (profile == 2) {
        $('#select_video_sub_profile').val('High Profile');
      }
      if (audioen == 1) {
        $('#check_enable_sub_withaudio').prop('checked', true);
      } else {
        $('#check_enable_sub_withaudio').prop('checked', false);
      }
      $('#input_video_sub_bitrate').val(bitrate);
    }
    var maxframerate = 5;
    $videocability = $(g_video_substream_cability);
    $videocability
      .find('h264')
      .children('option')
      .each(function () {
        var tempval = $(this).children('resolution').text();
        $('#select_video_sub_resolution').append('<option>' + tempval + '</option>');
        if (tempval.toLowerCase() === targetresolution) {
          tempval = $(this).children('framerate').text();
          var temparry = tempval.split('-');
          maxframerate = parseInt(temparry[1]);
          for (var i = parseInt(temparry[0]); i <= parseInt(temparry[1]); i++) {
            $('#select_video_sub_frame_rate').append('<option>' + String(i) + '</option>');
          }
          tempval = $(this).children('bitrate').text();
          temparry = tempval.split('-');
          $('#div_video_sub_bitrate_reference_value').text('[' + temparry[0] + '...' + temparry[1] + '] kbps');
          g_substream_minbit = parseInt(temparry[0]);
          g_substream_maxbit = parseInt(temparry[1]);
          if (bitrate > g_substream_maxbit) {
            $('#input_video_sub_bitrate').val(g_substream_maxbit);
          }
          tempval = $(this).children('keygop').text();
          temparry = tempval.split('-');
          for (var j = parseInt(temparry[0]); j <= parseInt(temparry[1]); j++) {
            $('#select_video_sub_key_frame').append('<option>' + String(j) + '</option>');
          }
          if (bupdate) {
            $('#select_video_sub_key_frame').val(keyframe);
          } else {
            $('#select_video_sub_key_frame').val(tempkeyframe);
          }
        }
      });
    $('#select_video_sub_resolution').val(targetresolution);
    if (bupdate) {
      $('#select_video_sub_frame_rate').val(framerate);
    } else {
      if (tempframe <= maxframerate) {
        $('#select_video_sub_frame_rate').val(tempframe);
      } else {
        $('#select_video_sub_frame_rate').val(maxframerate);
      }
    }
  }
  if (flags & 4) {
    var codec, resolution, framerate, bitratetype, keyframe, bitrate, quality, profile, audioen;
    $videocurrent = $(g_video_thirdstream_current);
    codec = $videocurrent.find('codec').text();
    resolution = $videocurrent.find('resolution').text();
    framerate = $videocurrent.find('framerate').text();
    bitratetype = $videocurrent.find('rc').text();
    keyframe = $videocurrent.find('keygop').text();
    bitrate = $videocurrent.find('bitrate').text();
    quality = $videocurrent.find('quality').text();
    profile = $videocurrent.find('profile').text();
    audioen = $videocurrent.find('audioen').text();

    var tempframe = $('#select_video_third_frame_rate').val();
    var tempkeyframe = $('#select_video_third_key_frame').val();
    fun_clear_plugins_item(4);

    if (thirdresolution.length <= 0) {
      targetresolution = resolution;
    } else {
      targetresolution = thirdresolution;
    }
    if (codec == 0) {
    } else if (codec == 1) {
    }
    if (quality == 0) {
      quality = 1;
    }
    if (bupdate) {
      $('#select_video_third_encode_quality').val(quality);
      if (bitratetype == 0) {
        $('#select_video_third_bitrate_type').val('VBR');
        $('#select_video_third_encode_quality').attr('disabled', false);
      } else if (bitratetype == 1) {
        $('#select_video_third_bitrate_type').val('CBR');
        $('#select_video_third_encode_quality').attr('disabled', 'disabled');
      }
      if (profile == 0) {
        $('#select_video_third_profile').val('Baseline');
      } else if (profile == 1) {
        $('#select_video_third_profile').val('Main Profile');
      } else if (profile == 2) {
        $('#select_video_third_profile').val('High Profile');
      }
      if (audioen == 1) {
        $('#check_enable_third_withaudio').prop('checked', true);
      } else {
        $('#check_enable_third_withaudio').prop('checked', false);
      }
      $('#input_video_third_bitrate').val(bitrate);
    }
    var maxframerate = 5;
    $videocability = $(g_video_thirdstream_cability);
    $videocability
      .find('h264')
      .children('option')
      .each(function () {
        var tempval = $(this).children('resolution').text();
        $('#select_video_third_resolution').append('<option>' + tempval + '</option>');
        if (tempval.toLowerCase() === targetresolution) {
          tempval = $(this).children('framerate').text();
          var temparry = tempval.split('-');
          maxframerate = parseInt(temparry[1]);
          for (var i = parseInt(temparry[0]); i <= parseInt(temparry[1]); i++) {
            $('#select_video_third_frame_rate').append('<option>' + String(i) + '</option>');
          }
          tempval = $(this).children('bitrate').text();
          temparry = tempval.split('-');
          $('#div_video_third_bitrate_reference_value').text('[' + temparry[0] + '...' + temparry[1] + '] kbps');
          g_thirdstream_minbit = parseInt(temparry[0]);
          g_thirdstream_maxbit = parseInt(temparry[1]);
          if (bitrate > g_thirdstream_maxbit) {
            $('#input_video_third_bitrate').val(g_thirdstream_maxbit);
          }
          tempval = $(this).children('keygop').text();
          temparry = tempval.split('-');
          for (var j = parseInt(temparry[0]); j <= parseInt(temparry[1]); j++) {
            $('#select_video_third_key_frame').append('<option>' + String(j) + '</option>');
          }
          if (bupdate) {
            $('#select_video_third_key_frame').val(keyframe);
          } else {
            $('#select_video_third_key_frame').val(tempkeyframe);
          }
        }
      });
    $('#select_video_third_resolution').val(targetresolution);
    if (bupdate) {
      $('#select_video_third_frame_rate').val(framerate);
    } else {
      if (tempframe <= maxframerate) {
        $('#select_video_third_frame_rate').val(tempframe);
      } else {
        $('#select_video_third_frame_rate').val(maxframerate);
      }
    }
  }
  // ��������
  if (flags & 8) {
    var codec, resolution, framerate, bitratetype, keyframe, bitrate, quality, profile, audioen;
    $videocurrent = $(g_video_fourthstream_current);
    codec = $videocurrent.find('codec').text();
    resolution = $videocurrent.find('resolution').text();
    framerate = $videocurrent.find('framerate').text();
    bitratetype = $videocurrent.find('rc').text();
    keyframe = $videocurrent.find('keygop').text();
    bitrate = $videocurrent.find('bitrate').text();
    quality = $videocurrent.find('quality').text();
    profile = $videocurrent.find('profile').text();
    audioen = $videocurrent.find('audioen').text();

    var tempframe = $('#select_video_fourth_frame_rate').val();
    var tempkeyframe = $('#select_video_fourth_key_frame').val();
    fun_clear_plugins_item(8);
// console.log(5 & 1);
    if (fourthresolution.length <= 0) {
      targetresolution = resolution;
    } else {
      targetresolution = fourthresolution;
    }
    if (codec == 0) {
    } else if (codec == 1) {
    }
    if (quality == 0) {
      quality = 1;
    }
    if (bupdate) {
      $('#select_video_fourth_encode_quality').val(quality);
      if (bitratetype == 0) {
        $('#select_video_fourth_bitrate_type').val('VBR');
        $('#select_video_fourth_encode_quality').attr('disabled', false);
      } else if (bitratetype == 1) {
        $('#select_video_fourth_bitrate_type').val('CBR');
        $('#select_video_fourth_encode_quality').attr('disabled', 'disabled');
      }
      if (profile == 0) {
        $('#select_video_fourth_profile').val('Baseline');
      } else if (profile == 1) {
        $('#select_video_fourth_profile').val('Main Profile');
      } else if (profile == 2) {
        $('#select_video_fourth_profile').val('High Profile');
      }
      if (audioen == 1) {
        $('#check_enable_fourth_withaudio').prop('checked', true);
      } else {
        $('#check_enable_fourth_withaudio').prop('checked', false);
      }
      $('#input_video_fourth_bitrate').val(bitrate);
    }
    var maxframerate = 5;
    $videocability = $(g_video_fourthstream_cability);
    $videocability
      .find('h264')
      .children('option')
      .each(function () {
        var tempval = $(this).children('resolution').text();
        $('#select_video_fourth_resolution').append('<option>' + tempval + '</option>');
        if (tempval.toLowerCase() === targetresolution) {
          tempval = $(this).children('framerate').text();
          var temparry = tempval.split('-');
          maxframerate = parseInt(temparry[1]);
          for (var i = parseInt(temparry[0]); i <= parseInt(temparry[1]); i++) {
            $('#select_video_fourth_frame_rate').append('<option>' + String(i) + '</option>');
          }
          tempval = $(this).children('bitrate').text();
          temparry = tempval.split('-');
          $('#div_video_fourth_bitrate_reference_value').text('[' + temparry[0] + '...' + temparry[1] + '] kbps');
          g_fourthstream_minbit = parseInt(temparry[0]);
          g_fourthstream_maxbit = parseInt(temparry[1]);
          if (bitrate > g_fourthstream_maxbit) {
            $('#input_video_fourth_bitrate').val(g_fourthstream_maxbit);
          }
          tempval = $(this).children('keygop').text();
          temparry = tempval.split('-');
          for (var j = parseInt(temparry[0]); j <= parseInt(temparry[1]); j++) {
            $('#select_video_fourth_key_frame').append('<option>' + String(j) + '</option>');
          }
          if (bupdate) {
            $('#select_video_fourth_key_frame').val(keyframe);
          } else {
            $('#select_video_fourth_key_frame').val(tempkeyframe);
          }
        }
      });
    $('#select_video_fourth_resolution').val(targetresolution);
    if (bupdate) {
      $('#select_video_fourth_frame_rate').val(framerate);
    } else {
      if (tempframe <= maxframerate) {
        $('#select_video_fourth_frame_rate').val(tempframe);
      } else {
        $('#select_video_fourth_frame_rate').val(maxframerate);
      }
    }
  }
}
function fun_on_resolution_change(objid) {
  if (objid == 'select_video_main_resolution') {
    var valresolution = $('#select_video_main_resolution').val();
    fun_initialize_pageui(1, valresolution, '', '', '', false);
  } else if (objid == 'select_video_sub_resolution') {
    var valresolution = $('#select_video_sub_resolution').val();
    fun_initialize_pageui(2, '', valresolution, '', '', false);
  } else if (objid == 'select_video_third_resolution') {
    var valresolution = $('#select_video_third_resolution').val();
    fun_initialize_pageui(4, '', '', valresolution, '', false);
  } else if (objid == 'select_video_fourth_resolution') {
    var valresolution = $('#select_video_fourth_resolution').val();
    fun_initialize_pageui(8, '', '', '', valresolution, false);
  }
}
function fun_on_bitratetype_change(objid) {
  if (objid == 'select_video_main_bitrate_type') {
    var strtype = $('#select_video_main_bitrate_type').val();
    if (strtype == 'VBR' && !$('#check_enable_main_smartenc').is(':checked')) {
      $('#select_video_main_encode_quality').attr('disabled', false);
    } else {
      $('#select_video_main_encode_quality').attr('disabled', 'disabled');
    }
  } else if (objid == 'select_video_sub_bitrate_type') {
    var strtype = $('#select_video_sub_bitrate_type').val();
    if (strtype == 'VBR' && !$('#check_enable_sub_smartenc').is(':checked')) {
      $('#select_video_sub_encode_quality').attr('disabled', false);
    } else {
      $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
    }
  } else if (objid == 'select_video_third_bitrate_type') {
    var strtype = $('#select_video_third_bitrate_type').val();
    if (strtype == 'VBR' && !$('#check_enable_third_smartenc').is(':checked')) {
      $('#select_video_third_encode_quality').attr('disabled', false);
    } else {
      $('#select_video_third_encode_quality').attr('disabled', 'disabled');
    }
  }
}
function fun_clear_plugins_item(flags) {
  if (flags & 1) {
    $('#select_video_main_resolution').html('');
    $('#select_video_main_key_frame').html('');
    $('#select_video_main_frame_rate').html('');
  } else if (flags & 2) {
    $('#select_video_sub_resolution').html('');
    $('#select_video_sub_key_frame').html('');
    $('#select_video_sub_frame_rate').html('');
  } else if (flags & 4) {
    $('#select_video_third_resolution').html('');
    $('#select_video_third_key_frame').html('');
    $('#select_video_third_frame_rate').html('');
  } else if (flags & 8) {
    $('#select_video_fourth_resolution').html('');
    $('#select_video_fourth_key_frame').html('');
    $('#select_video_fourth_frame_rate').html('');
  }
}
function fun_refresh_video_parameter() {
  fun_get_video_parameters();
}
function fun_reset_video_parameter() {
  fun_initialize_pageui(3, '', '', '', '', true);
}

function fun_refresh_thirdstream_parameter() {
  fun_get_thirdstream_parameters();
  $('#select_video_sub_codec').val('h264');
  $('#select_video_sub_profile').val('Main Profile');
  $('#select_video_sub_bitrate_type').val('VBR');
  $('#select_video_main_encode_quality').val(2);
  $('#select_video_sub_encode_quality').val(2);
}
function fun_refresh_fourthstream_parameter() {
  fun_get_fourthstream_parameters();
}
function fun_on_substream_change() {
  var streamenable = $('#check_enable_video_sub').prop('checked') ? 1 : 0;
  if (streamenable == 0) {
    $('#select_video_sub_codec').attr('disabled', 'disabled');
    $('#select_video_sub_resolution').attr('disabled', 'disabled');
    $('#select_video_sub_frame_rate').attr('disabled', 'disabled');
    $('#select_video_sub_bitrate_type').attr('disabled', 'disabled');
    $('#select_video_sub_key_frame').attr('disabled', 'disabled');
    $('#input_video_sub_bitrate').attr('disabled', 'disabled');
    $('#select_video_sub_encode_quality').attr('disabled', 'disabled');
    $('#select_video_sub_profile').attr('disabled', 'disabled');
    $('#check_enable_sub_withaudio').attr('disabled', 'disabled');
    $('#check_enable_sub_smartenc').attr('disabled', 'disabled');
  } else {
    $('#select_video_sub_codec').removeAttr('disabled');
    $('#select_video_sub_resolution').removeAttr('disabled');
    $('#select_video_sub_frame_rate').removeAttr('disabled');
    $('#select_video_sub_bitrate_type').removeAttr('disabled');
    $('#select_video_sub_key_frame').removeAttr('disabled');
    $('#input_video_sub_bitrate').removeAttr('disabled');
    $('#select_video_sub_profile').removeAttr('disabled');
    $('#check_enable_sub_withaudio').removeAttr('disabled');
    $('#check_enable_sub_smartenc').removeAttr('disabled');
    fun_on_bitratetype_change('select_video_sub_bitrate_type');
  }
}
function fun_show_rebootnote_dialog(bshow) {
  if (bshow) {
    $('#div_note_reboot_dialog').dialog({
      modal: true,
      title: '',
      width: 377,
      height: 218,
      resizable: false
    });
  } else {
    $('#div_note_reboot_dialog').dialog('destroy');
    $('#div_note_reboot_dialog').css('display', 'none');
  }
}
function fun_check_need_reboot_or_not() {
  var codec1 = $('#select_video_main_codec').val();
  var resolution1 = $('#select_video_main_resolution').val();
  var codec2 = $('#select_video_sub_codec').val();
  var resolution2 = $('#select_video_sub_resolution').val();
  var profile1 = $('#select_video_main_profile').val();
  var profile2 = $('#select_video_sub_profile').val();
  var reboot_confirm = false;

  if (g_videocodec_change_needreboot && (codec1 !== g_video_maincodec || codec2 !== g_video_subcodec || profile1 !== g_video_main_profile || profile2 !== g_video_sub_profile)) {
    reboot_confirm = true;
  }
  if (g_resolution_change_needreboot && (resolution1 !== g_video_mainsolution || resolution2 !== g_video_subsolution)) {
    reboot_confirm = true;
  }

  if (reboot_confirm) {
    fun_show_rebootnote_dialog(true);
  } else {
    fun_save_video_parameter();
  }
}
function fun_save_video_parameter() {
  var codec, resolution, framerate, bitratetype, keyframe, bitrate, quality, profile, audioen, smarten;
  codec = $('#select_video_main_codec').val();
  resolution = $('#select_video_main_resolution').val();
  framerate = $('#select_video_main_frame_rate').val();
  bitratetype = $('#select_video_main_bitrate_type').val();
  keyframe = $('#select_video_main_key_frame').val();
  bitrate = $('#input_video_main_bitrate').val();
  quality = $('#select_video_main_encode_quality').val();
  profile = $('#select_video_main_profile').val();
  audioen = $('#check_enable_main_withaudio').prop('checked') ? 1 : 0;
  smarten = $('#check_enable_main_smartenc').prop('checked') ? 1 : 0;
  var bitrate2 = $('#input_video_sub_bitrate').val();
  if (bitrate < g_mainstream_minbit || bitrate > g_mainstream_maxbit || bitrate2 < g_substream_minbit || bitrate2 > g_substream_maxbit) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  if (codec == 'h264') {
    codec = '0';
  } else if (codec == 'h265') {
    codec = '1';
  } else if (codec == 'mjpeg') {
    codec = '2';
  }
  if (profile == 'Baseline') {
    profile = '0';
  } else if (profile == 'Main Profile') {
    profile = '1';
  } else if (profile == 'High Profile') {
    profile = '2';
  }
  if (bitratetype == 'VBR') {
    bitratetype = '0';
  } else if (bitratetype == 'CBR') {
    bitratetype = '1';
  }
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<videoenc  ver="2.0">' +
    '<active>1</active>' +
    '<codec>' +
    codec +
    '</codec>' +
    '<resolution>' +
    resolution +
    '</resolution>' +
    '<framerate>' +
    framerate +
    '</framerate>' +
    '<rc>' +
    bitratetype +
    '</rc>' +
    '<keygop>' +
    keyframe +
    '</keygop>' +
    '<bitrate>' +
    bitrate +
    '</bitrate>' +
    '<quality>' +
    quality +
    '</quality>' +
    '<profile>' +
    profile +
    '</profile>' +
    '<audioen>' +
    audioen +
    '</audioen>' +
    '<smarten>' +
    smarten +
    '</smarten>' +
    '</videoenc>' +
    '</request>';
  sdk_setipcparam(
    '/action/set?subject=videoenc&stream=0',
    targetxml,
    function (result) {
      if (result == true) {
        parent.fun_show_tips_dialog(strsuc);
      } else if (result == 400) {
        parent.fun_show_tips_dialog(request, 0);
      } else if (result == 403) {
        parent.fun_show_tips_dialog(auth, 0);
      } else {
        parent.fun_show_tips_dialog(failed, 0);
      }
    },
    false
  );
  codec = $('#select_video_sub_codec').val();
  resolution = $('#select_video_sub_resolution').val();
  framerate = $('#select_video_sub_frame_rate').val();
  bitratetype = $('#select_video_sub_bitrate_type').val();
  keyframe = $('#select_video_sub_key_frame').val();
  bitrate = $('#input_video_sub_bitrate').val();
  quality = $('#select_video_sub_encode_quality').val();
  profile = $('#select_video_sub_profile').val();
  audioen = $('#check_enable_sub_withaudio').prop('checked') ? 1 : 0;
  smarten = $('#check_enable_sub_smartenc').prop('checked') ? 1 : 0;
  var streamenable = $('#check_enable_video_sub').prop('checked') ? 1 : 0;
  if (codec == 'h264') {
    codec = '0';
  } else if (codec == 'h265') {
    codec = '1';
  } else if (codec == 'mjpeg') {
    codec = '2';
  }
  if (profile == 'Baseline') {
    profile = '0';
  } else if (profile == 'Main Profile') {
    profile = '1';
  } else if (profile == 'High Profile') {
    profile = '2';
  }
  if (bitratetype == 'VBR') {
    bitratetype = '0';
  } else if (bitratetype == 'CBR') {
    bitratetype = '1';
  }
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<videoenc  ver="2.0">' +
    '<active>' +
    streamenable +
    '</active>' +
    '<codec>' +
    codec +
    '</codec>' +
    '<resolution>' +
    resolution +
    '</resolution>' +
    '<framerate>' +
    framerate +
    '</framerate>' +
    '<rc>' +
    bitratetype +
    '</rc>' +
    '<keygop>' +
    keyframe +
    '</keygop>' +
    '<bitrate>' +
    bitrate +
    '</bitrate>' +
    '<quality>' +
    quality +
    '</quality>' +
    '<profile>' +
    profile +
    '</profile>' +
    '<audioen>' +
    audioen +
    '</audioen>' +
    '<smarten>' +
    smarten +
    '</smarten>' +
    '</videoenc>' +
    '</request>';
  sdk_setipcparam(
    '/action/set?subject=videoenc&stream=1',
    targetxml,
    function (result) {
      if (result == true) {
        parent.fun_show_tips_dialog(strsuc);
      } else if (result == 400) {
        parent.fun_show_tips_dialog(request, 0);
      } else if (result == 403) {
        parent.fun_show_tips_dialog(auth, 0);
      } else {
        parent.fun_show_tips_dialog(failed, 0);
      }
    },
    false
  );
}

function fun_third_check_need_reboot_or_not() {
  var codec = $('#select_video_third_codec').val();
  var resolution = $('#select_video_third_resolution').val();
  var profile = $('#select_video_third_profile').val();
  var reboot_confirm = false;

  if (g_videocodec_change_needreboot && (codec !== g_video_thirdcodec || profile !== g_video_third_profile)) {
    reboot_confirm = true;
  }
  if (g_resolution_change_needreboot && resolution !== g_video_thirdsolution) {
    reboot_confirm = true;
  }

  if (reboot_confirm) {
    fun_show_rebootnote_dialog(true);
  } else {
    fun_save_third_parameter();
  }
}
function fun_fourth_check_need_reboot_or_not() {
  var codec = $('#select_video_fourth_codec').val();
  var resolution = $('#select_video_fourth_resolution').val();
  var profile = $('#select_video_fourth_profile').val();
  var reboot_confirm = false;

  if (g_videocodec_change_needreboot && (codec !== g_video_fourthcodec || profile !== g_video_fourth_profile)) {
    reboot_confirm = true;
  }
  if (g_resolution_change_needreboot && resolution !== g_video_fourthsolution) {
    reboot_confirm = true;
  }

  if (reboot_confirm) {
    fun_show_rebootnote_dialog(true);
  } else {
    fun_save_fourth_parameter();
  }
}

function fun_save_third_parameter() {
  var codec, resolution, framerate, bitratetype, keyframe, bitrate, quality, profile, audioen, smarten;
  codec = $('#select_video_third_codec').val();
  resolution = $('#select_video_third_resolution').val();
  framerate = $('#select_video_third_frame_rate').val();
  bitratetype = $('#select_video_third_bitrate_type').val();
  keyframe = $('#select_video_third_key_frame').val();
  bitrate = $('#input_video_third_bitrate').val();
  quality = $('#select_video_third_encode_quality').val();
  profile = $('#select_video_third_profile').val();
  audioen = $('#check_enable_third_withaudio').prop('checked') ? 1 : 0;
  smarten = $('#check_enable_third_smartenc').prop('checked') ? 1 : 0;
  if (bitrate < g_thirdstream_minbit || bitrate > g_thirdstream_maxbit) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }

  if (codec == 'h264') {
    codec = '0';
  } else if (codec == 'h265') {
    codec = '1';
  } else if (codec == 'mjpeg') {
    codec = '2';
  }
  if (profile == 'Baseline') {
    profile = '0';
  } else if (profile == 'Main Profile') {
    profile = '1';
  } else if (profile == 'High Profile') {
    profile = '2';
  }
  if (bitratetype == 'VBR') {
    bitratetype = '0';
  } else if (bitratetype == 'CBR') {
    bitratetype = '1';
  }

  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);

  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<videoenc  ver="2.0">' +
    '<active>1</active>' +
    '<codec>' +
    codec +
    '</codec>' +
    '<resolution>' +
    resolution +
    '</resolution>' +
    '<framerate>' +
    framerate +
    '</framerate>' +
    '<rc>' +
    bitratetype +
    '</rc>' +
    '<keygop>' +
    keyframe +
    '</keygop>' +
    '<bitrate>' +
    bitrate +
    '</bitrate>' +
    '<quality>' +
    quality +
    '</quality>' +
    '<profile>' +
    profile +
    '</profile>' +
    '<audioen>' +
    audioen +
    '</audioen>' +
    '<smarten>' +
    smarten +
    '</smarten>' +
    '</videoenc>' +
    '</request>';
  sdk_setipcparam(
    '/action/set?subject=videoenc&stream=3',
    targetxml,
    function (result) {
      if (result == true) {
        parent.fun_show_tips_dialog(strsuc);
      } else if (result == 400) {
        parent.fun_show_tips_dialog(request, 0);
      } else if (result == 403) {
        parent.fun_show_tips_dialog(auth, 0);
      } else {
        parent.fun_show_tips_dialog(failed, 0);
      }
    },
    false
  );
}
function fun_save_fourth_parameter() {
  var codec, resolution, framerate, bitratetype, keyframe, bitrate, quality, profile, audioen, smarten;
  codec = $('#select_video_fourth_codec').val();
  resolution = $('#select_video_fourth_resolution').val();
  framerate = $('#select_video_fourth_frame_rate').val();
  bitratetype = $('#select_video_fourth_bitrate_type').val();
  keyframe = $('#select_video_fourth_key_frame').val();
  bitrate = $('#input_video_fourth_bitrate').val();
  quality = $('#select_video_fourth_encode_quality').val();
  profile = $('#select_video_fourth_profile').val();
  audioen = $('#check_enable_fourth_withaudio').prop('checked') ? 1 : 0;
  smarten = $('#check_enable_fourth_smartenc').prop('checked') ? 1 : 0;
  if (bitrate < g_fourthstream_minbit || bitrate > g_fourthstream_maxbit) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }

  if (codec == 'h264') {
    codec = '0';
  } else if (codec == 'h265') {
    codec = '1';
  } else if (codec == 'mjpeg') {
    codec = '2';
  }
  if (profile == 'Baseline') {
    profile = '0';
  } else if (profile == 'Main Profile') {
    profile = '1';
  } else if (profile == 'High Profile') {
    profile = '2';
  }
  if (bitratetype == 'VBR') {
    bitratetype = '0';
  } else if (bitratetype == 'CBR') {
    bitratetype = '1';
  }

  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<videoenc  ver="2.0">' +
    '<active>1</active>' +
    '<codec>' + codec + '</codec>' +
    '<resolution>' + resolution + '</resolution>' +
    '<framerate>' + framerate + '</framerate>' +
    '<rc>' + bitratetype + '</rc>' +
    '<keygop>' + keyframe + '</keygop>' +
    '<bitrate>' + bitrate + '</bitrate>' +
    '<quality>' + quality + '</quality>' +
    '<profile>' + profile + '</profile>' +
    '<audioen>' + audioen + '</audioen>' +
    '<smarten>' + smarten + '</smarten>' +
    '</videoenc>' + '</request>';
  sdk_setipcparam(
    '/action/set?subject=videoenc&stream=4',
    targetxml,
    function (result) {
      if (result == true) {
        parent.fun_show_tips_dialog(strsuc);
      } else if (result == 400) {
        parent.fun_show_tips_dialog(request, 0);
      } else if (result == 403) {
        parent.fun_show_tips_dialog(auth, 0);
      } else {
        parent.fun_show_tips_dialog(failed, 0);
      }
    },
    false
  );
}

function fun_save_video_workmode_parameters() {
  var vhdr = $('#check_enable_video_workmode_hdr').prop('checked') ? 1 : 0;
  var vfps = $('#check_enable_video_workmode_fps').prop('checked') ? 1 : 0;
  var chdr = $('#check_enable_video_workmode_clearhdr').prop('checked') ? 1 : 0;

  var targetxmlprefix = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<videowork ver="2.0">' 
  var target_hdr='<hdr>' + vhdr + '</hdr>' 
  var target_fps='<highfps>' + vfps + '</highfps>' 
  var target_clearhdr='<clearhdr>' + chdr + '</clearhdr>'
  var targetxmlsuffix = '</videowork>' + '</request>';
  var targetxml = targetxmlprefix+target_hdr+target_fps+target_clearhdr+targetxmlsuffix;
  sdk_setipcparam('/action/set?subject=videowork', targetxml, function (result) {
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
