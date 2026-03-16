var g_has_fullcolor = false;
var g_need_reboot = false;
var g_ledsense = '0';
var g_fullcolor;
var g_irled;
var bv = null;
var g_slidshut = 0;
var g_col2grey_lum;
var g_grey2col_lum;
var g_lum_benchmark = 80;// Ji Zhun Zhi
var ispstatTimer=null;
$(document).ready(function () {
  g_gtemplate[0] = new fun_template_item();
  g_gtemplate[1] = new fun_template_item();
  g_gtemplate[2] = new fun_template_item();

  fun_initialize_page_ui();
  fun_check_devability();
  fun_multilang_adapter();
  fun_register_events();

  fun_videoshow();
  
});
function getIspstat() {//get Realtime Brightness
  sdk_getipcparam('/action/get?subject=ispstat', function (res) {
    if (res === false) return;
    $xml = $(res);
    var bright = $xml.find('softir').children('bright').text();
    $('#div_image_daynight_intersync_realtime_value_text').text(bright);
  })

}

function fun_check_devability() {
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result === false) return;
    var corridor = $(result).find('porch').text();
    var irled = $(result).find('irled').text();
    g_irled = irled;
    var fullcolor = $(result).find('fullcolor').text();
    g_fullcolor = fullcolor;
    var ledsense = $(result).find('led_sensitivity').text();
    g_ledsense = ledsense;
    var hsblc = $(result).find('hsblc').text();
    var iris = $(result).find('iris').text();
    var ledctrl = $(result).find('ledctrl').text();
    var smartir = $(result).find('smartir').text();
    var whled = $(result).find('whled').text();
    var ldc = $(result).find('ldc').text();
    var slidshut = parseInt($(result).find('slidshut').text());//滑动快门
    g_slidshut=slidshut;
    // console.log('slidshut='+slidshut);

    if (parseInt(ldc) > 0) {
      $('#div_image_advanced').css('display', 'block');
    } else {
      $('#div_image_advanced').css('display', 'none');
    }

    if (parseInt(iris) > 0) {
      $('#div_image_autoiris').css('display', 'block');
    } else {
      $('#div_image_autoiris').css('display', 'none');
    }
    if (parseInt(smartir) > 0) {
      $('#div_image_smartir_contain').css('display', 'block');
    } else {
      $('#div_image_smartir_contain').css('display', 'none');
    }
    var hsblctext = '';
    if (hsblc == '1') {
      hsblctext = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'hsblc', '', ITEM_TYPE_NONE);
    } else {
      hsblctext = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'hlc', '', ITEM_TYPE_NONE);
    }
    $('#div_image_hlc_name').text(hsblctext);
    if (ledsense == '1') {
      $('#div_ledthreshonlevel').css('display', 'block');
      $('#div_ledthreshofflevel').css('display', 'block');
    } else {
      $('#div_ledthreshonlevel').css('display', 'none');
      $('#div_ledthreshofflevel').css('display', 'none');
    }
    if (fullcolor == 0 && irled == 1) {
      if (whled == 1) {
        $('#div_speed').css('display', 'block');
      } else {
        $('#div_speed').css('display', 'none');
      }
    }
    if (fullcolor == 1 && irled == 1) {
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'supplementledfull', 'div_image_daynight_light_name', ITEM_TYPE_TEXT);
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'blacklightfull', 'div_blacklight_title_text', ITEM_TYPE_TEXT);
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'daynightmodfull', 'div_table_image_daynight_text', ITEM_TYPE_TEXT);
      g_has_fullcolor = true;
      $('#div_table_image_schedule').css('display', 'none');
      $('#div_image_video_model').css('display', 'none');
      $('#div_smartevt').css('display', 'block');
      $('#div_maxlevel').css('display', 'none');
      $('#div_ledlevel').css('display', 'block');
    } else {
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'supplementled', 'div_image_daynight_light_name', ITEM_TYPE_TEXT);
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'blacklightfull', 'div_blacklight_title_text', ITEM_TYPE_TEXT);
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'daynightmod', 'div_table_image_daynight_text', ITEM_TYPE_TEXT);
      g_has_fullcolor = false;
      $('#div_table_image_schedule').css('display', 'block');
      $('#div_smartevt').css('display', 'none');
      $('#div_maxlevel').css('display', 'block');
      $('#div_ledlevel').css('display', 'none');
    }
    if (parseInt(ledctrl) == 1 && parseInt(smartir) == 0) {
      $('#div_smartlevel').css('display', 'block');
    }
    if (fullcolor == 1) {
      $('#div_image_daynight_mode').css('display', 'none');
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'smartled', 'div_image_smartir_name', ITEM_TYPE_TEXT);
    } else {
      $('#div_image_daynight_mode').css('display', 'block');
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'smartir', 'div_image_smartir_name', ITEM_TYPE_TEXT);
    }

    if (parseInt(ledctrl) > 0 && parseInt(irled) > 0) {
      $('#div_image_daynight_light').css('display', 'block');
    } else {
      $('#div_image_daynight_light').css('display', 'none');
    }

    if (irled == '1') {
      $('#div_image_daynight_double_light').css('display', 'none');
    } else if (irled == '2') {
      $('#div_image_daynight_double_light').css('display', 'block');
      $('#div_image_daynight_light').css('display', 'none');
    } else {
      $('#div_image_daynight_double_light').css('display', 'none');
      $('#div_speed').css('display', 'none');
    }

    if (corridor > 0) {
      $('#div_image_video_corridor').css('display', 'block');
      if (corridor & (1 << 7)) {
        g_need_reboot = true;
      }
    }
    fun_get_image_parameters();
  });
}

function fun_multilang_adapter() {
  // translate_page_item(TARGET_PAGE_SUB_IMAGE, 'irlevel', 'div_irlevel_name', ITEM_TYPE_TEXT);
  // translate_page_item(TARGET_PAGE_SUB_IMAGE, 'maxlevel', 'div_maxlevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'speed', 'div_speed_title_text', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'blclevel', 'div_image_blclevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'hlclevel', 'div_image_hlclevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'wdrlevel', 'div_image_wdrlevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'lightsene', 'div_image_lightsense_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'gain', 'div_image_aegain_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgbase', 'div_table_image_base_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'schedule', 'div_table_image_schedule_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'standard', 'div_video_standard_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'mirror', 'div_video_mirror_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'corridor', 'div_video_corridor_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgtemplate', 'div_image_model_template_item_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgmodel', 'div_image_video_model_title', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgadjust', 'div_image_adjustment_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgprofile', 'div_image_output_mode_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'saturation', 'div_image_saturation_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'brightness', 'div_image_brightness_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'sharpness', 'div_image_sharpness_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'contrast', 'div_image_contrast_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'blc', 'div_image_blc_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'wdr', 'div_image_wdr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'wb', 'div_image_whitebalance_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'rgain', 'div_image_redgain_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'ggain', 'div_image_greengain_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'bgain', 'div_image_bluegain_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'expsettings', 'div_image_exposure_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'expmode', 'div_image_exposure_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'shutter', 'div_image_shutter_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgenhancement', 'div_image_enhancement_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'metering', 'div_image_lightmetering_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'iris', 'div_image_autoiris_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'defog', 'div_image_defog_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'nr', 'div_image_3dnr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgadvance', 'div_image_advanced_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'ldc', 'div_image_ldc_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgconf', 'div_image_schedule_day_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'periodset', 'div_image_schedule_timing_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'daymode', 'div_image_period_day_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'nightmode', 'div_image_period_night_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'daynight', 'div_image_daynight_mode_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'icut', 'div_image_icut_timing_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'periodset', 'div_image_daynight_timing_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'bwtocolor', 'div_image_daynight_intersync_tocolor_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'colortobw', 'div_image_daynight_intersync_togrey_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'colortogreydelay', 'div_image_daynight_intersync_dayrange_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'greytocolordelay', 'div_image_daynight_intersync_nightrange_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'RealtimeBrightness', 'div_image_daynight_intersync_realtime_name', ITEM_TYPE_TEXT);//Realtime Brightness

  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'supplementled2', 'div_image_daynight_double_light_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'smartevt', 'div_smartevt_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'ledlevel', 'div_ledlevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'ledlevel', 'div_smartlevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'evtblink', 'div_evtblink_name', ITEM_TYPE_TEXT);

  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'ledonlevel', 'div_ledthreshonlevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_IMAGE, 'ledofflevel', 'div_ledthreshofflevel_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_image_baseinfo_restore,button_image_schedule_restore,button_image_daynight_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_image_baseinfo_refresh,button_image_schedule_refresh,button_image_daynight_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_image_baseinfo_save,button_image_schedule_save,button_image_daynight_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_TIPSTEXT, 'notevreboot', 'div_note_reboot_content', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'confirm', 'button_reboot_confirm', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_reboot_cancel', ITEM_TYPE_VALUE);

  var snone, svert, shoriz, svandh, senable, sdisable, snormal, sday, snight, scustom, sstandard, sbright, svivid, sgentle, sauto, soutdoor, sindoor, slamp, smanual, sglobal, smiddle, stiming, scolor, sbw, ssync, sopen, sclose, sfixed, smart, infrared, turnoff, white;
  snone = translate_page_item(TARGET_PAGE_COMMON, 'none', '', ITEM_TYPE_NONE);
  svert = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'vertical', '', ITEM_TYPE_NONE);
  shoriz = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'horizontal', '', ITEM_TYPE_NONE);
  svandh = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'verandhor', '', ITEM_TYPE_NONE);
  senable = translate_page_item(TARGET_PAGE_COMMON, 'enable', '', ITEM_TYPE_NONE);
  sdisable = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE);
  snormal = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgnormal', '', ITEM_TYPE_NONE);
  sday = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'daymode', '', ITEM_TYPE_NONE);
  snight = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'nightmode', '', ITEM_TYPE_NONE);
  scustom = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'custom', '', ITEM_TYPE_NONE);
  sstandard = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'normal', '', ITEM_TYPE_NONE);
  sbright = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'bright', '', ITEM_TYPE_NONE);
  svivid = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'colorful', '', ITEM_TYPE_NONE);
  sgentle = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'pastel', '', ITEM_TYPE_NONE);
  sauto = translate_page_item(TARGET_PAGE_COMMON, 'auto', '', ITEM_TYPE_NONE);
  soutdoor = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'outdoor', '', ITEM_TYPE_NONE);
  sindoor = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'indoor', '', ITEM_TYPE_NONE);
  slamp = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'fluorescent', '', ITEM_TYPE_NONE);
  smanual = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'manual', '', ITEM_TYPE_NONE);
  sglobal = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'global', '', ITEM_TYPE_NONE);
  smiddle = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'middle', '', ITEM_TYPE_NONE);
  stiming = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'timing', '', ITEM_TYPE_NONE);
  scolor = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'color', '', ITEM_TYPE_NONE);
  sbw = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'bw', '', ITEM_TYPE_NONE);
  ssync = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'intersync', '', ITEM_TYPE_NONE);
  sopen = translate_page_item(TARGET_PAGE_COMMON, 'opens', '', ITEM_TYPE_NONE);
  sclose = translate_page_item(TARGET_PAGE_COMMON, 'closes', '', ITEM_TYPE_NONE);
  smart = translate_page_item(TARGET_PAGE_COMMON, 'smart', '', ITEM_TYPE_NONE);
  infrared = translate_page_item(TARGET_PAGE_COMMON, 'infrared', '', ITEM_TYPE_NONE);
  white = translate_page_item(TARGET_PAGE_COMMON, 'white', '', ITEM_TYPE_NONE);
  turnoff = translate_page_item(TARGET_PAGE_COMMON, 'turnoff', '', ITEM_TYPE_NONE);
  sfixed = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'imgfixed', '', ITEM_TYPE_NONE);

  flash = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'flash', '', ITEM_TYPE_NONE);
  mediumflash = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'mediumflash', '', ITEM_TYPE_NONE);
  slowflash = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'slowflash', '', ITEM_TYPE_NONE);
  always = translate_page_item(TARGET_PAGE_SUB_IMAGE, 'always', '', ITEM_TYPE_NONE);

  $('#div_image_daynight_period_day_name').text(scolor);
  $('#div_image_daynight_period_night_name').text(sbw);
  $('#div_image_icut_period_night_name').text(scolor);
  $('#div_image_icut_period_day_name').text(sauto);

  $('#select_video_mirror option').each(function (i, n) {
    if (i === 0) {
      $(n).text(snone);
    } else if (i === 1) {
      $(n).text(svert);
    } else if (i === 2) {
      $(n).text(shoriz);
    } else if (i === 3) {
      $(n).text(svandh);
    }
  });
  $('#select_video_corridor option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });

  $('#select_video_image_templates option').each(function (i, n) {
    if (i === 0) {
      $(n).text(snormal);
    } else if (i === 1) {
      $(n).text(sday);
    } else if (i === 2) {
      $(n).text(snight);
    }
  });
  $('#select_image_output_mode option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sstandard);
    } else if (i === 1) {
      $(n).text(sbright);
    } else if (i === 2) {
      $(n).text(svivid);
    } else if (i === 3) {
      $(n).text(sgentle);
    } else if (i === 4) {
      $(n).text(scustom);
    }
  });
  $('#select_image_blc_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_image_wdr_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_image_whitebalance_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sauto);
    } else if (i === 1) {
      $(n).text(soutdoor);
    } else if (i === 2) {
      $(n).text(sindoor);
    } else if (i === 3) {
      $(n).text(slamp);
    } else if (i === 4) {
      $(n).text(smanual);
    }
  });
  $('#select_image_exposure_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sauto);
    } else if (i === 1) {
      $(n).text(sfixed);
    }
  });
  $('#select_image_lightmetering_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sglobal);
    } else if (i === 1) {
      $(n).text(smiddle);
    }
  });
  $('#select_image_autoiris_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_image_defog_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_image_smartir_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_image_dnr2d_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_image_dnr3d_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_image_schedule_day_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(snormal);
    } else if (i === 1) {
      $(n).text(sday);
    } else if (i === 2) {
      $(n).text(snight);
    } else if (i === 3) {
      $(n).text(stiming);
    } else if (i === 4) {
      $(n).text(sauto);
    }
  });
  $('#select_image_daynight_mode_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sauto);
    } else if (i === 1) {
      $(n).text(scolor);
    } else if (i === 2) {
      $(n).text(sbw);
    } else if (i === 3) {
      $(n).text(stiming);
    } else if (i === 4) {
      $(n).text(ssync);
    }
  });
  $('#select_image_daynight_light_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sauto);
    } else if (i === 1) {
      $(n).text(sopen);
    } else if (i === 2) {
      $(n).text(sclose);
    }
  });
  $('#select_image_daynight_light_double_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(smart);
    } else if (i === 1) {
      $(n).text(infrared);
    } else if (i === 2) {
      $(n).text(white);
    } else if (i === 3) {
      $(n).text(turnoff);
    }
  });
  $('#select_image_hlc_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_smartevt_value option').each(function (i, n) {
    if (i === 0) {
      $(n).text(sdisable);
    } else if (i === 1) {
      $(n).text(senable);
    }
  });
  $('#select_speed_value option').each(function (i, n) {
    if (i === 1) {
      $(n).text(slowflash);
    } else if (i === 2) {
      $(n).text(mediumflash);
    } else if (i === 3) {
      $(n).text(flash);
    } else if (i === 0) {
      $(n).text(always);
    }
  });
}

function fun_initialize_page_ui() {
  $(
    '#slider_image_saturation_value,#slider_image_brightness_value,#slider_image_sharpness_value,#slider_image_contrast_value,#slider_image_3dnr_value,#slider_image_ldc_value,#slider_image_redgain_value,#slider_image_greengain_value,#slider_image_bluegain_value,#slider_image_blclevel_value,#slider_image_hlclevel_value,#slider_image_wdrlevel_value'
  ).slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 0,
    change: fun_slider_change
  });
  $('#slider_maxlevel_value,#slider_smartlevel_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 5,
    value: 0,
    change: fun_slider_change
  });
  $('#slider_ledlevel_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 5,
    value: 0,
    change: fun_slider_change
  });
  $('#slider_image_daynight_intersync_tocolor_value,#slider_ledthreshonlevel,#slider_ledthreshofflevel').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 1,
    change: fun_slider_change
  });
  $('#slider_image_lightsense_value,#slider_image_aegain_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    min: 1,
    value: 1,
    change: fun_slider_change
  });
  $('#slider_image_daynight_intersync_togrey_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 100,
    value: 0,
    change: fun_slider_change
  });
  $('#slider_image_daynight_intersync_nightrange_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 600,
    value: 0,
    change: fun_slider_change
  });
  $('#slider_image_daynight_intersync_dayrange_value').slider({
    orientation: 'horizontal',
    range: 'min',
    max: 600,
    value: 0,
    change: fun_slider_change
  });
  $('#slider_daynight_schedule_timing_value,#slider_daynight_daynight_timing_value').slider({
    orientation: 'horizontal',
    range: true,
    max: 1440,
    values: rangevalues,
    create: slidertooltip,
    slide: sliderslide,
    change: fun_range_slider_change
  });
  $('#slider_icut_daynight_timing_value').slider({
    orientation: 'horizontal',
    range: true,
    max: 1440,
    values: rangevalues,
    create: slidertooltip,
    slide: sliderslide,
    change: fun_range_slider_change
  });
}

var rangevalues = [200, 600];
var slidertooltip = function (event, ui) {
  if (event.target.id !== 'slider_daynight_schedule_timing_value' && event.target.id !== 'slider_daynight_daynight_timing_value' && event.target.id !== 'slider_icut_daynight_timing_value') {
    return;
  }
  for (var i = 0; i < 2; i++) {
    var curvalue = ui.value || rangevalues[i];
    var target = $(event.target).children('.ui-slider-handle')[i];
    if (target === undefined) {
      continue;
    }
    if (0 === i) {
      $(target).mouseenter(function () {
        var par = $(this).parents('.slider_range_style').attr('id');
        if (typeof par !== 'string') {
          return;
        }
        var slidervalue = $('#' + par).slider('option', 'values');
        showslidertooltip(this, slidervalue[0], true);
      });
      $(target).mouseleave(function () {
        var par = $(this).parents('.slider_range_style').attr('id');
        if (typeof par !== 'string') {
          return;
        }
        var slidervalue = $('#' + par).slider('option', 'values');
        showslidertooltip(this, slidervalue[0], false);
      });
    } else {
      $(target).mouseenter(function () {
        var par = $(this).parents('.slider_range_style').attr('id');
        if (typeof par !== 'string') {
          return;
        }
        var slidervalue = $('#' + par).slider('option', 'values');
        showslidertooltip(this, slidervalue[1], true);
      });
      $(target).mouseleave(function () {
        var par = $(this).parents('.slider_range_style').attr('id');
        if (typeof par !== 'string') {
          return;
        }
        var slidervalue = $('#' + par).slider('option', 'values');
        //var slidervalue = $("#slider_daynight_schedule_timing_value").slider('option','values');
        showslidertooltip(this, slidervalue[1], false);
      });
    }
  }
};

var sliderslide = function (event, ui) {
  showslidertooltip(ui.handle, ui.value, true);
};

var showslidertooltip = function (target, value, bshow) {
  var tooltip;
  if (parseInt(value) == value) {
    if (value / 60 < 10) {
      if (value % 60 < 10) {
        tooltip = '<span class="tooltip-time">' + '0' + String(Math.floor(value / 60)) + ':0' + String(value % 60) + '</span>';
      } else {
        tooltip = '<span class="tooltip-time">' + '0' + String(Math.floor(value / 60)) + ':' + String(value % 60) + '</span>';
      }
    } else {
      if (value % 60 < 10) {
        tooltip = '<span class="tooltip-time">' + String(Math.floor(value / 60)) + ':0' + String(value % 60) + '</span>';
      } else {
        tooltip = '<span class="tooltip-time">' + String(Math.floor(value / 60)) + ':' + String(value % 60) + '</span>';
      }
    }
  } else {
    tooltip = '<span class="tooltip-time">' + String(Math.floor(value / 60)) + ':' + String(value % 60) + '</span>';
  }
  if (bshow) {
    $(target).html(tooltip);
  } else {
    $(target).html('');
  }
};

function fun_register_events() {
  $('.cls_tablebar_item').click(function () {
    fun_main_tab_switch(this.id.toString());
  });
  $('.cls_image_accordion_title').click(function () {
    fun_accordion_click(this.id.toString());
  });
  $('.cls_subpage_content_button').click(function () {
    var objid = this.id.toString();
    fun_on_option_button_click(objid);
  });
  $('.cls_subpage_content_select').change(function () {
    var objid = this.id.toString();
    fun_on_combobox_change(objid);
  });
  $('#button_reboot_confirm').click(function () {
    var currotate = $('#select_video_corridor').val();
    g_rotate = currotate;
    fun_save_image_parameters();
    setTimeout('fun_videoshow()', 3000);
    fun_show_rebootnote_dialog(false);
  });
  $('#button_reboot_cancel').click(function () {
    fun_show_rebootnote_dialog(false);
  });
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

function fun_videoshow() {
  $('#div_image_video_show').html('');
  sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (result) {
    if (result != false) {
      $xml = $(result);
      var codec = $xml.find('codec').text();
      if (codec == 1) {
        $('#div_image_video_show').html("<img id='img_video_show' src='/action/snap' style='width: 100%;height: 100%'/>");
        fun_get_video_picture();
      } else if (codec == 2) {
        var Img_T = "<img style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=0' />";
        $('#div_image_video_show').html(Img_T);
      } else {
        $('#div_image_video_show').html('<video id="videoElement" height="288" width="460" style="border: 1px solid black;" name="videoElement" class="centeredVideo" autoplay></video>');
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
}

function fun_main_tab_switch(val) {
  if (val === 'div_table_image_base') {
    $('#' + val).addClass('cls_tablebar_item_selected');
    $('.cls_tablebar_item')
      .not($('#' + val))
      .removeClass('cls_tablebar_item_selected');
    $('#div_image_baseinfo').show();
    $('.cls_image_tab_context').not($('#div_image_baseinfo')).hide();

    clearInterval(ispstatTimer);
    ispstatTimer=null;
   } else if (val === 'div_table_image_schedule') {
      $('#' + val).addClass('cls_tablebar_item_selected');
     $('.cls_tablebar_item')
       .not($('#' + val))
       .removeClass('cls_tablebar_item_selected');
      $('#div_iamge_schedule').show();
      $('.cls_image_tab_context').not($('#div_iamge_schedule')).hide();

    clearInterval(ispstatTimer);
    ispstatTimer=null;
    } else if (val === 'div_table_image_daynight') {
      $('#' + val).addClass('cls_tablebar_item_selected');
      $('.cls_tablebar_item')
        .not($('#' + val))
        .removeClass('cls_tablebar_item_selected');
     $('#div_image_daynight').show();
      $('.cls_image_tab_context').not($('#div_image_daynight')).hide();

    ispstatTimer=setInterval(getIspstat, 200);//timer
  }
}

function fun_accordion_click(val) {
  var tagid = val;
  if (tagid === 'div_image_adjustment_title') {
    if ($('#div_image_adjustment_title_image').hasClass('cls_image_accordion_item_open')) {
      return;
    }
    $('#div_image_adjustment_title_image').removeClass('cls_image_accordion_item_close');
    $('#div_image_adjustment_title_image').addClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_adjustment_title_image')).removeClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_adjustment_title_image')).addClass('cls_image_accordion_item_close');
    $('#div_image_adjustment_group').slideToggle(256);
    $('.cls_image_baseinfo_itemgroup').not($('#div_image_adjustment_group')).slideUp(256);
  } else if (tagid === 'div_image_exposure_title') {
    if ($('#div_image_exposure_title_image').hasClass('cls_image_accordion_item_open')) {
      return;
    }
    $('#div_image_exposure_title_image').removeClass('cls_image_accordion_item_close');
    $('#div_image_exposure_title_image').addClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_exposure_title_image')).removeClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_exposure_title_image')).addClass('cls_image_accordion_item_close');
    $('#div_image_exposure_group').slideToggle(256);
    $('.cls_image_baseinfo_itemgroup').not($('#div_image_exposure_group')).slideUp(256);
  } else if (tagid === 'div_image_enhancement_title') {
    if ($('#div_image_enhancement_title_image').hasClass('cls_image_accordion_item_open')) {
      return;
    }
    $('#div_image_enhancement_title_image').removeClass('cls_image_accordion_item_close');
    $('#div_image_enhancement_title_image').addClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_enhancement_title_image')).removeClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_enhancement_title_image')).addClass('cls_image_accordion_item_close');
    $('#div_image_enhancement_group').slideToggle(256);
    $('.cls_image_baseinfo_itemgroup').not($('#div_image_enhancement_group')).slideUp(256);
  } else if (tagid === 'div_image_advanced_title') {
    if ($('#div_image_advanced_title_image').hasClass('cls_image_accordion_item_open')) {
      return;
    }
    $('#div_image_advanced_title_image').removeClass('cls_image_accordion_item_close');
    $('#div_image_advanced_title_image').addClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_advanced_title_image')).removeClass('cls_image_accordion_item_open');
    $('.cls_image_accordion_item').not($('#div_image_advanced_title_image')).addClass('cls_image_accordion_item_close');
    $('#div_image_advanced_group').slideToggle(256);
    $('.cls_image_baseinfo_itemgroup').not($('#div_image_advanced_group')).slideUp(256);
  }
}

var g_imgparacache;
var g_template_index = 0;
var g_rotate, g_standard, g_mirror, g_schedule, g_daysection;
var g_colortogreydelay, g_greytocolordelay, g_dnmode, g_dnirled, g_dnsection, g_dncolor, g_dngrey, g_icutvalue, g_delay1, g_delay2, g_smartevt, g_ledlevel, g_threshonlevel, g_threshofflevel, g_smartir, g_smartirlevel, g_speed;
var g_gtemplate = [];
var g_corridorchange = false;

function fun_template_item() {
  this.imgstyle = 0;
  this.imgsaturation = 0;
  this.imgsharpness = 0;
  this.imgcontrast = 0;
  this.imgbrightness = 0;
  this.imgnoise = 0;
  this.imgblclevel = 0;
  this.imghlclevel = 0;
  this.imgwdrlevel = 0;
  this.imgaegain = 0;
  this.imglightsense = 0;
  this.imgldc = 0;
  this.imgdefog = 0;
  // this.imgsmartir = 0;
  this.imgwdr = 0;
  this.imgbacklight = 0;
  this.imgexpmode = 0;
  this.imgexpmetter = 0;
  this.imgexpshutter = 0;
  this.imgexpiris = 0;
  this.imgwbmode = 0;
  this.imgwbrgain = 0;
  this.imgwbggain = 0;
  this.imgwbbgain = 0;
  this.img2d = 0;
  this.img3d = 0;
  this.hlc = 0;
}

function fun_get_image_parameters() {
  sdk_getipcparam('/action/get?subject=cameraimage', function (result) {
    if (result === false) return;

    g_imgparacache = result;
    $xml = $(result);
    g_rotate = $xml.find('rotate').text();
    g_standard = $xml.find('freq').text();
    g_mirror = $xml.find('mirror').text();

    var tcc = $xml.find('mode');
    g_schedule = $(tcc[0]).text();
    g_daysection = $($xml.find('daysect')[0]).text();

    g_dnmode = $xml.find('daynight').children('mode').text();
    g_dnirled = $xml.find('daynight').children('irled').text();
    g_smartir = $xml.find('daynight').children('smartiren').text();
    g_smartirlevel = $xml.find('daynight').children('smartirlevel').text();
    g_dnsection = $xml.find('daynight').children('daysect').text();
    g_dncolor = $xml.find('daynight').children('color').text();
    g_dngrey = $xml.find('daynight').children('grey').text();
    g_smartevt = $xml.find('daynight').children('smartevt').text();
    g_speed = $xml.find('daynight').children('evtblink').text();
    g_ledlevel = $xml.find('daynight').children('ledlevel').text();
    g_threshonlevel = $xml.find('daynight').children('ledthreshonlevel').text();
    g_threshofflevel = $xml.find('daynight').children('ledthreshofflevel').text();

    var tmpindex = 0;
    $xml.find('imagescene').each(function () {
      if (tmpindex > 2) {
        return;
      }
      $imgps = $(this);
      g_gtemplate[tmpindex].imgstyle = $imgps.find('imgstyle').text();
      g_gtemplate[tmpindex].imgsaturation = $imgps.find('saturation').text();
      g_gtemplate[tmpindex].imgsharpness = $imgps.find('sharpness').text();
      g_gtemplate[tmpindex].imgcontrast = $imgps.find('contrast').text();
      g_gtemplate[tmpindex].imgbrightness = $imgps.find('brightness').text();
      g_gtemplate[tmpindex].imgnoise = $imgps.find('noise').text();
      g_gtemplate[tmpindex].imgldc = $imgps.find('ldc').text();
      g_gtemplate[tmpindex].imgdefog = $imgps.find('defog').text();
      // g_gtemplate[tmpindex].imgsmartir = $imgps.find('smartir').text();
      g_gtemplate[tmpindex].img2d = $imgps.find('dnr2d').text();
      g_gtemplate[tmpindex].img3d = $imgps.find('dnr3d').text();
      //==============
      g_gtemplate[tmpindex].hlc = $imgps.find('highlight').text(); //hlc
      g_gtemplate[tmpindex].imgwdr = $imgps.find('widedynamic').find('wdr').text(); //wdr
      g_gtemplate[tmpindex].imgbacklight = $imgps.find('widedynamic').find('backlight').text(); //blc
      //=====================
      g_gtemplate[tmpindex].imgaegain = $imgps.find('autoexposure').find('aegain').text(); //aegain
      g_gtemplate[tmpindex].imglightsense = $imgps.find('autoexposure').find('lightsense').text(); //lightsense
      //=====================
      g_gtemplate[tmpindex].imgwdrlevel = $imgps.find('widedynamic').find('wdrlevel').text();
      g_gtemplate[tmpindex].imgblclevel = $imgps.find('widedynamic').find('blclevel').text();
      g_gtemplate[tmpindex].imghlclevel = $imgps.find('widedynamic').find('hlclevel').text();
      g_gtemplate[tmpindex].imgexpmode = $imgps.find('autoexposure').find('mode').text();
      g_gtemplate[tmpindex].imgexpmetter = $imgps.find('autoexposure').find('metter').text();
      g_gtemplate[tmpindex].imgexpshutter = $imgps.find('autoexposure').find('shutter').text();
      g_gtemplate[tmpindex].imgexpiris = $imgps.find('autoexposure').find('iris').text();

      g_gtemplate[tmpindex].imgwbmode = $imgps.find('whitebalance').find('mode').text();
      g_gtemplate[tmpindex].imgwbrgain = $imgps.find('whitebalance').find('rgain').text();
      g_gtemplate[tmpindex].imgwbggain = $imgps.find('whitebalance').find('ggain').text();
      g_gtemplate[tmpindex].imgwbbgain = $imgps.find('whitebalance').find('bgain').text();

      tmpindex++;
    });
    sdk_getipcparam('/action/get?subject=softir ', function (res) {
      if (res === false) return;
      $xml = $(res);
      var col2grey_lum =parseInt( $xml.find('col2grey').children('lum').text());
      var grey2col_lum = parseInt($xml.find('grey2col').children('lum').text());
      g_col2grey_lum = col2grey_lum;
      g_grey2col_lum = grey2col_lum;
      fun_init_page_item_values();
    })
  });
  sdk_getipcparam('/action/get?subject=ircut', function (res) {
    if (res === false) return;
    $xml = $(res);
    g_colortogreydelay = $xml.find('col2greydelay').text();
    g_greytocolordelay = $xml.find('grey2coldelay').text();
    $('#slider_image_daynight_intersync_dayrange_value').slider('option', 'value', g_colortogreydelay);
    $('#slider_image_daynight_intersync_nightrange_value').slider('option', 'value', g_greytocolordelay);
    var autoval = $xml.find('autotime').text();
    g_icutvalue = autoval;
    var values = autoval.split('-');
    if (values.length == 2) {
      $('#slider_icut_daynight_timing_value').slider('option', 'values', [Math.floor(values[0] / 60), Math.floor(values[1] / 60)]);
    }
  });
}

function fun_reanalysis_parameters() {
  if (typeof g_imgparacache === 'string' && g_imgparacache.length > 0) {
    //g_imgparacache = result;
    $xml = $(g_imgparacache);
    g_rotate = $xml.find('rotate').text();
    g_standard = $xml.find('freq').text();
    g_mirror = $xml.find('mirror').text();
    var tcc = $xml.find('mode');
    g_schedule = $(tcc[0]).text();
    g_daysection = $($xml.find('daysect')[0]).text();

    g_dnmode = $xml.find('daynight').children('mode').text();
    g_dnirled = $xml.find('daynight').children('irled').text();
    g_smartir = $xml.find('daynight').children('smartiren').text();
    g_smartirlevel = $xml.find('daynight').children('smartirlevel').text();
    g_dnsection = $xml.find('daynight').children('daysect').text();
    g_dncolor = $xml.find('daynight').children('color').text();
    g_dngrey = $xml.find('daynight').children('grey').text();

    var tmpindex = 0;
    $xml.find('imagescene').each(function () {
      if (tmpindex > 2) {
        return;
      }
      $imgps = $(this);
      g_gtemplate[tmpindex].imgstyle = $imgps.find('imgstyle').text();
      g_gtemplate[tmpindex].imgsaturation = $imgps.find('saturation').text();
      g_gtemplate[tmpindex].imgsharpness = $imgps.find('sharpness').text();
      g_gtemplate[tmpindex].imgcontrast = $imgps.find('contrast').text();
      g_gtemplate[tmpindex].imgbrightness = $imgps.find('brightness').text();
      g_gtemplate[tmpindex].imgnoise = $imgps.find('noise').text();
      g_gtemplate[tmpindex].imgldc = $imgps.find('ldc').text();
      g_gtemplate[tmpindex].imgdefog = $imgps.find('defog').text();
      // g_gtemplate[tmpindex].imgsmartir = $imgps.find('smartir').text();
      g_gtemplate[tmpindex].img2d = $imgps.find('dnr2d').text();
      g_gtemplate[tmpindex].img3d = $imgps.find('dnr3d').text();
      g_gtemplate[tmpindex].hlc = $imgps.find('highlight').text();

      g_gtemplate[tmpindex].imgwdr = $imgps.find('widedynamic').find('wdr').text();
      g_gtemplate[tmpindex].imgbacklight = $imgps.find('widedynamic').find('backlight').text();
      g_gtemplate[tmpindex].imgexpmode = $imgps.find('autoexposure').find('mode').text();
      g_gtemplate[tmpindex].imgexpmetter = $imgps.find('autoexposure').find('metter').text();
      g_gtemplate[tmpindex].imgexpshutter = $imgps.find('autoexposure').find('shutter').text();
      g_gtemplate[tmpindex].imgexpiris = $imgps.find('autoexposure').find('iris').text();
      g_gtemplate[tmpindex].imgaegain = $imgps.find('autoexposure').find('aegain').text();
      g_gtemplate[tmpindex].imglightsense = $imgps.find('autoexposure').find('lightsense').text();
      g_gtemplate[tmpindex].imgwbmode = $imgps.find('whitebalance').find('mode').text();
      g_gtemplate[tmpindex].imgwbrgain = $imgps.find('whitebalance').find('rgain').text();
      g_gtemplate[tmpindex].imgwbggain = $imgps.find('whitebalance').find('ggain').text();
      g_gtemplate[tmpindex].imgwbbgain = $imgps.find('whitebalance').find('bgain').text();
      g_gtemplate[tmpindex].imgwdrlevel = $imgps.find('widedynamic').find('wdrlevel').text();
      g_gtemplate[tmpindex].imgblclevel = $imgps.find('widedynamic').find('blclevel').text();
      g_gtemplate[tmpindex].imghlclevel = $imgps.find('widedynamic').find('hlclevel').text();

      tmpindex++;
    });
  }
}

function fun_save_image_parameters() {
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<response>' +
    '<cameraimage ver="2.0">' +
    '<freq>' +
    g_standard +
    '</freq>' +
    '<rotate>' +
    g_rotate +
    '</rotate>' +
    '<mirror>' +
    g_mirror +
    '</mirror>' +
    '<mode>' +
    g_schedule +
    '</mode>' +
    '<daysect>' +
    g_daysection +
    '</daysect>' +
    '<imagescene>' +
    '<imgstyle>' +
    g_gtemplate[0].imgstyle +
    '</imgstyle>' +
    '<saturation>' +
    g_gtemplate[0].imgsaturation +
    '</saturation>' +
    '<sharpness>' +
    g_gtemplate[0].imgsharpness +
    '</sharpness>' +
    '<contrast>' +
    g_gtemplate[0].imgcontrast +
    '</contrast>' +
    '<brightness>' +
    g_gtemplate[0].imgbrightness +
    '</brightness>' +
    '<noise>' +
    g_gtemplate[0].imgnoise +
    '</noise>' +
    '<ldc>' +
    g_gtemplate[0].imgldc +
    '</ldc>' +
    '<defog>' +
    g_gtemplate[0].imgdefog +
    '</defog>' +
    // '<smartir>' +
    // g_gtemplate[0].imgsmartir +
    // '</smartir>' +
    '<dnr2d>' +
    g_gtemplate[0].img2d +
    '</dnr2d>' +
    '<dnr3d>' +
    g_gtemplate[0].img3d +
    '</dnr3d>' +
    '<widedynamic>' +
    '<blclevel>' +
    g_gtemplate[0].imgblclevel +
    '</blclevel>' +
    '<hlclevel>' +
    g_gtemplate[0].imghlclevel +
    '</hlclevel>' +
    '<wdrlevel>' +
    g_gtemplate[0].imgwdrlevel +
    '</wdrlevel>' +
    '<wdr>' +
    g_gtemplate[0].imgwdr +
    '</wdr>' +
    '<backlight>' +
    g_gtemplate[0].imgbacklight +
    '</backlight>' +
    '<highlight>' +
    g_gtemplate[0].hlc +
    '</highlight>' +
    '</widedynamic>' +
    '<autoexposure>' +
    '<aegain>' +
    g_gtemplate[0].imgaegain +
    '</aegain>' +
    '<lightsense>' +
    g_gtemplate[0].imglightsense +
    '</lightsense>' +
    '<mode>' +
    g_gtemplate[0].imgexpmode +
    '</mode>' +
    '<metter>' +
    g_gtemplate[0].imgexpmetter +
    '</metter>' +
    '<shutter>' +
    g_gtemplate[0].imgexpshutter +
    '</shutter>' +
    '<iris>' +
    g_gtemplate[0].imgexpiris +
    '</iris>' +
    '</autoexposure>' +
    '<whitebalance>' +
    '<mode>' +
    g_gtemplate[0].imgwbmode +
    '</mode>' +
    '<rgain>' +
    g_gtemplate[0].imgwbrgain +
    '</rgain>' +
    '<ggain>' +
    g_gtemplate[0].imgwbggain +
    '</ggain>' +
    '<bgain>' +
    g_gtemplate[0].imgwbbgain +
    '</bgain>' +
    '</whitebalance>' +
    '</imagescene>' +
    '<imagescene>' +
    '<imgstyle>' +
    g_gtemplate[1].imgstyle +
    '</imgstyle>' +
    '<saturation>' +
    g_gtemplate[1].imgsaturation +
    '</saturation>' +
    '<sharpness>' +
    g_gtemplate[1].imgsharpness +
    '</sharpness>' +
    '<contrast>' +
    g_gtemplate[1].imgcontrast +
    '</contrast>' +
    '<brightness>' +
    g_gtemplate[1].imgbrightness +
    '</brightness>' +
    '<noise>' +
    g_gtemplate[1].imgnoise +
    '</noise>' +
    '<ldc>' +
    g_gtemplate[1].imgldc +
    '</ldc>' +
    '<defog>' +
    g_gtemplate[1].imgdefog +
    '</defog>' +
    // '<smartir>' +
    // g_gtemplate[1].imgsmartir +
    // '</smartir>' +
    '<dnr2d>' +
    g_gtemplate[1].img2d +
    '</dnr2d>' +
    '<dnr3d>' +
    g_gtemplate[1].img3d +
    '</dnr3d>' +
    '<widedynamic>' +
    '<blclevel>' +
    g_gtemplate[1].imgblclevel +
    '</blclevel>' +
    '<hlclevel>' +
    g_gtemplate[1].imghlclevel +
    '</hlclevel>' +
    '<wdrlevel>' +
    g_gtemplate[1].imgwdrlevel +
    '</wdrlevel>' +
    '<wdr>' +
    g_gtemplate[1].imgwdr +
    '</wdr>' +
    '<backlight>' +
    g_gtemplate[1].imgbacklight +
    '</backlight>' +
    '<highlight>' +
    g_gtemplate[1].hlc +
    '</highlight>' +
    '</widedynamic>' +
    '<autoexposure>' +
    '<aegain>' +
    g_gtemplate[1].imgaegain +
    '</aegain>' +
    '<lightsense>' +
    g_gtemplate[1].imglightsense +
    '</lightsense>' +
    '<mode>' +
    g_gtemplate[1].imgexpmode +
    '</mode>' +
    '<metter>' +
    g_gtemplate[1].imgexpmetter +
    '</metter>' +
    '<shutter>' +
    g_gtemplate[1].imgexpshutter +
    '</shutter>' +
    '<iris>' +
    g_gtemplate[1].imgexpiris +
    '</iris>' +
    '</autoexposure>' +
    '<whitebalance>' +
    '<mode>' +
    g_gtemplate[1].imgwbmode +
    '</mode>' +
    '<rgain>' +
    g_gtemplate[1].imgwbrgain +
    '</rgain>' +
    '<ggain>' +
    g_gtemplate[1].imgwbggain +
    '</ggain>' +
    '<bgain>' +
    g_gtemplate[1].imgwbbgain +
    '</bgain>' +
    '</whitebalance>' +
    '</imagescene>' +
    '<imagescene>' +
    '<imgstyle>' +
    g_gtemplate[2].imgstyle +
    '</imgstyle>' +
    '<saturation>' +
    g_gtemplate[2].imgsaturation +
    '</saturation>' +
    '<sharpness>' +
    g_gtemplate[2].imgsharpness +
    '</sharpness>' +
    '<contrast>' +
    g_gtemplate[2].imgcontrast +
    '</contrast>' +
    '<brightness>' +
    g_gtemplate[2].imgbrightness +
    '</brightness>' +
    '<noise>' +
    g_gtemplate[2].imgnoise +
    '</noise>' +
    '<ldc>' +
    g_gtemplate[2].imgldc +
    '</ldc>' +
    '<defog>' +
    g_gtemplate[2].imgdefog +
    '</defog>' +
    // '<smartir>' +
    // g_gtemplate[2].imgsmartir +
    // '</smartir>' +
    '<dnr2d>' +
    g_gtemplate[2].img2d +
    '</dnr2d>' +
    '<dnr3d>' +
    g_gtemplate[2].img3d +
    '</dnr3d>' +
    '<widedynamic>' +
    '<blclevel>' +
    g_gtemplate[2].imgblclevel +
    '</blclevel>' +
    '<hlclevel>' +
    g_gtemplate[2].imghlclevel +
    '</hlclevel>' +
    '<wdrlevel>' +
    g_gtemplate[2].imgwdrlevel +
    '</wdrlevel>' +
    '<wdr>' +
    g_gtemplate[2].imgwdr +
    '</wdr>' +
    '<backlight>' +
    g_gtemplate[2].imgbacklight +
    '</backlight>' +
    '<highlight>' +
    g_gtemplate[2].hlc +
    '</highlight>' +
    '</widedynamic>' +
    '<autoexposure>' +
    '<aegain>' +
    g_gtemplate[2].imgaegain +
    '</aegain>' +
    '<lightsense>' +
    g_gtemplate[2].imglightsense +
    '</lightsense>' +
    '<mode>' +
    g_gtemplate[2].imgexpmode +
    '</mode>' +
    '<metter>' +
    g_gtemplate[2].imgexpmetter +
    '</metter>' +
    '<shutter>' +
    g_gtemplate[2].imgexpshutter +
    '</shutter>' +
    '<iris>' +
    g_gtemplate[2].imgexpiris +
    '</iris>' +
    '</autoexposure>' +
    '<whitebalance>' +
    '<mode>' +
    g_gtemplate[2].imgwbmode +
    '</mode>' +
    '<rgain>' +
    g_gtemplate[2].imgwbrgain +
    '</rgain>' +
    '<ggain>' +
    g_gtemplate[2].imgwbggain +
    '</ggain>' +
    '<bgain>' +
    g_gtemplate[2].imgwbbgain +
    '</bgain>' +
    '</whitebalance>' +
    '</imagescene>' +
    '<daynight>' +
    '<mode>' +
    g_dnmode +
    '</mode>' +
    '<irled>' +
    g_dnirled +
    '</irled>' +
    '<smartiren>' +
    g_smartir +
    '</smartiren>' +
    '<smartirlevel>' +
    g_smartirlevel +
    '</smartirlevel>' +
    '<daysect>' +
    g_dnsection +
    '</daysect>' +
    '<color>' +
    g_dncolor +
    '</color>' +
    '<grey>' +
    g_dngrey +
    '</grey>' +
    '<smartevt>' +
    g_smartevt +
    '</smartevt>' +
    '<evtblink>' +
    g_speed +
    '</evtblink>' +
    '<ledlevel>' +
    g_ledlevel +
    '</ledlevel>' +
    '<ledthreshonlevel>' +
    g_threshonlevel +
    '</ledthreshonlevel>' +
    '<ledthreshofflevel>' +
    g_threshofflevel +
    '</ledthreshofflevel>' +
    '</daynight>' +
    '</cameraimage>' +
    '</response>';

  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);

  sdk_setipcparam('/action/set?subject=cameraimage', targetxml, function (result) {
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
  var targeticutpara = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<ircut>' + '<col2greydelay>' + g_colortogreydelay + '</col2greydelay>' + '<grey2coldelay>' + g_greytocolordelay + '</grey2coldelay>' + '<autotime>' + g_icutvalue + '</autotime>' + '</ircut>' + '</request>';
  sdk_setipcparam('/action/set?subject=ircut', targeticutpara, function (res) { });
}

function fun_init_page_item_values() {
  $('#select_video_standard').val(g_standard);
  $('#select_video_mirror').val(g_mirror);
  $('#select_video_corridor').val(g_rotate);
  $('#select_image_schedule_day_value').val(g_schedule);

  var valpair1 = g_daysection.split('-');
  $('#slider_daynight_schedule_timing_value').slider('option', 'values', [Math.floor(valpair1[0] / 60), Math.floor(valpair1[1] / 60)]);
  //$("#select_image_schedule_day_value").val(g_schedule);
  if (g_dnmode == 3) {
    $('#div_image_daynight_timing_items').css('display', 'block');
  } else {
    $('#div_image_daynight_timing_items').css('display', 'none');
  }
  if (g_schedule == 3) {
    $('#div_schedule_timing_settings').css('display', 'block');
  } else {
    $('#div_schedule_timing_settings').css('display', 'none');
  }

  var valpair2 = g_dnsection.split('-');
  $('#slider_daynight_daynight_timing_value').slider('option', 'values', [Math.floor(valpair2[0] / 60), Math.floor(valpair2[1] / 60)]);
  $('#slider_image_daynight_intersync_tocolor_value').slider('option', 'value', g_dncolor);
  $('#slider_image_daynight_intersync_togrey_value').slider('option', 'value', g_dngrey);

  var g_col2grey_lum_actual_val = parseInt(g_col2grey_lum) + (((g_dncolor - 50) * 10) * g_lum_benchmark * -1)
  var g_grey2col_lum_actual_val = parseInt(g_grey2col_lum) + (((g_dngrey - 50) * 10) * g_lum_benchmark * 1)
  $('#div_image_daynight_intersync_tocolor_value_text').text(g_dncolor + ' ( ' + g_col2grey_lum_actual_val + ' ) ');
  $('#div_image_daynight_intersync_togrey_value_text').text(g_dngrey + ' ( ' + g_grey2col_lum_actual_val + ' ) ');

  $('#select_image_daynight_light_value').val(g_dnirled);

  $('#select_image_daynight_light_double_value').val(g_dnirled);

  if (g_irled == 2) {
    if (g_dnirled == 0 || g_dnirled == 1) {
      $('#div_image_smartir_contain').css('display', 'block');
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'smartir', 'div_image_smartir_name', ITEM_TYPE_TEXT);
      $('#div_smartevt').css('display', 'none');
      $('#div_image_daynight_mode').css('display', 'block');
      $('#div_maxlevel').css('display', 'block');
      $('#div_ledthreshonlevel').css('display', 'block');
      $('#div_ledthreshofflevel').css('display', 'block');
      $('#div_ledlevel').css('display', 'none');
    } else if (g_dnirled == 2) {
      $('#div_image_smartir_contain').css('display', 'block');
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'smartled', 'div_image_smartir_name', ITEM_TYPE_TEXT);
      $('#div_smartevt').css('display', 'block');
      $('#div_image_daynight_mode').css('display', 'none');
      $('#div_maxlevel').css('display', 'none');
      $('#div_ledthreshonlevel').css('display', 'block');
      $('#div_ledthreshofflevel').css('display', 'block');
      $('#div_ledlevel').css('display', 'block');
    } else {
      $('#div_image_smartir_contain').css('display', 'none');
      $('#div_smartevt').css('display', 'none');
      $('#div_maxlevel').css('display', 'block');
      $('#div_ledthreshonlevel').css('display', 'none');
      $('#div_ledthreshofflevel').css('display', 'none');
      $('#div_ledlevel').css('display', 'none');
      $('#div_image_daynight_mode').css('display', 'block');
    }
  }

  $('#div_maxlevel_value_text').val(g_smartirlevel);
  $('#slider_maxlevel_value').slider('option', 'value', g_smartirlevel);

  $('#div_smartlevel_value_text').val(g_smartirlevel);
  $('#slider_smartlevel_value').slider('option', 'value', g_smartirlevel);
  $('#select_smartevt_value').val(g_smartevt);
  $('#select_speed_value').val(g_speed);
  $('#slider_ledlevel_value').slider('option', 'value', g_ledlevel);
  $('#div_ledlevel_value_text').text(g_ledlevel);
  $('#select_image_daynight_mode_value').val(g_dnmode);
  $('#slider_ledthreshonlevel').slider('option', 'value', g_threshonlevel);
  $('#div_ledthreshonlevel_value_text').text(g_threshonlevel);
  $('#slider_ledthreshofflevel').slider('option', 'value', g_threshofflevel);
  $('#div_ledthreshofflevel_value_text').text(g_threshofflevel);
  if (g_dnmode == 3) {
    $('#div_image_daynight_timing_items').css('display', 'block');
    $('#div_image_daynight_intersync_items').css('display', 'none');
  } else if (g_dnmode == 4) {
    $('#div_image_daynight_timing_items').css('display', 'none');
    $('#div_image_daynight_intersync_items').css('display', 'block');
  } else {
    $('#div_image_daynight_timing_items').css('display', 'none');
    $('#div_image_daynight_intersync_items').css('display', 'none');
  }

  if (g_template_index >= 0 && g_template_index < 3) {
    if (g_gtemplate[g_template_index].imgstyle == 4) {
      $('#div_image_output_items').css('display', 'block');
    } else {
      $('#div_image_output_items').css('display', 'none');
    }

    $('#select_video_image_templates').val(g_template_index);
    $('#select_image_output_mode').val(g_gtemplate[g_template_index].imgstyle);
    $('#slider_image_saturation_value').slider('option', 'value', g_gtemplate[g_template_index].imgsaturation);
    $('#div_image_saturation_value_text').text(g_gtemplate[g_template_index].imgsaturation);
    $('#slider_image_brightness_value').slider('option', 'value', g_gtemplate[g_template_index].imgbrightness);
    $('#div_image_brightness_value_text').text(g_gtemplate[g_template_index].imgbrightness);
    $('#slider_image_sharpness_value').slider('option', 'value', g_gtemplate[g_template_index].imgsharpness);
    $('#div_image_sharpness_value_text').text(g_gtemplate[g_template_index].imgsharpness);
    $('#slider_image_contrast_value').slider('option', 'value', g_gtemplate[g_template_index].imgcontrast);
    $('#div_image_contrast_value_text').text(g_gtemplate[g_template_index].imgcontrast);
    $('#slider_image_redgain_value').slider('option', 'value', g_gtemplate[g_template_index].imgwbrgain);
    $('#slider_image_blclevel_value').slider('option', 'value', g_gtemplate[g_template_index].imgblclevel);
    $('#div_image_blclevel_value_text').text(g_gtemplate[g_template_index].imgblclevel);
    $('#slider_image_hlclevel_value').slider('option', 'value', g_gtemplate[g_template_index].imghlclevel);
    $('#div_image_hlclevel_value_text').text(g_gtemplate[g_template_index].imghlclevel);
    $('#slider_image_wdrlevel_value').slider('option', 'value', g_gtemplate[g_template_index].imgwdrlevel);
    $('#div_image_wdrlevel_value_text').text(g_gtemplate[g_template_index].imgwdrlevel);

    $('#slider_image_lightsense_value').slider('option', 'value', g_gtemplate[g_template_index].imglightsense);
    $('#div_image_lightsense_value_text').text(g_gtemplate[g_template_index].imglightsense);
    $('#slider_image_aegain_value').slider('option', 'value', g_gtemplate[g_template_index].imgaegain);
    $('#div_image_aegain_value_text').text(g_gtemplate[g_template_index].imgaegain);

    if (g_gtemplate[g_template_index].imgbacklight == 1) {
      $('#div_image_blc_level').css('display', 'block');
    } else {
      $('#div_image_blc_level').css('display', 'none');
    }
    if (g_gtemplate[g_template_index].hlc == 1) {
      $('#div_image_hlc_level').css('display', 'block');
    } else {
      $('#div_image_hlc_level').css('display', 'none');
    }
    if (g_gtemplate[g_template_index].imgwdr == 1) {
      $('#div_image_wdr_level').css('display', 'block');
    } else {
      $('#div_image_wdr_level').css('display', 'none');
    }
    $('#div_image_redgain_value_text').text(g_gtemplate[g_template_index].imgwbrgain);
    $('#slider_image_greengain_value').slider('option', 'value', g_gtemplate[g_template_index].imgwbggain);
    $('#div_image_greengain_value_text').text(g_gtemplate[g_template_index].imgwbggain);
    $('#slider_image_bluegain_value').slider('option', 'value', g_gtemplate[g_template_index].imgwbbgain);
    $('#div_image_bluegain_value_text').text(g_gtemplate[g_template_index].imgwbbgain);



    $('#div_image_whitebalance_manual_items').css('display', g_gtemplate[g_template_index].imgwbmode == 4 ? 'block' : 'none');//三原色曝光


    $('#select_image_blc_value').val(g_gtemplate[g_template_index].imgbacklight);
    $('#select_image_wdr_value').val(g_gtemplate[g_template_index].imgwdr);
    $('#select_image_whitebalance_value').val(g_gtemplate[g_template_index].imgwbmode);
    $('#select_image_hlc_value').val(g_gtemplate[g_template_index].hlc);

    $('#select_image_exposure_value').val(g_gtemplate[g_template_index].imgexpmode);
    if (g_gtemplate[g_template_index].imgexpmode == 1&&g_slidshut==1) {
      $('#div_image_lightsense').css('display', 'block');
      $('#div_image_aegain').css('display', 'block');
    } else {
      $('#div_image_lightsense').css('display', 'none');
      $('#div_image_aegain').css('display', 'none');
    }

    $('#select_image_shutter_value').val(g_gtemplate[g_template_index].imgexpshutter);
    if (parseInt(g_gtemplate[g_template_index].imgexpmetter) > 1) {
      $('#select_image_lightmetering_value').val(1);
    } else {
      $('#select_image_lightmetering_value').val(g_gtemplate[g_template_index].imgexpmetter);
    }

    $('#select_image_autoiris_value').val(g_gtemplate[g_template_index].imgexpiris);
    $('#select_image_defog_value').val(g_gtemplate[g_template_index].imgdefog);
    $('#slider_image_3dnr_value').slider('option', 'value', g_gtemplate[g_template_index].imgnoise);
    $('#div_image_3dnr_value_text').text(g_gtemplate[g_template_index].imgnoise);

    $('#select_image_dnr2d_value').val(g_gtemplate[g_template_index].img2d);
    $('#select_image_dnr3d_value').val(g_gtemplate[g_template_index].img3d);

    if (g_gtemplate[g_template_index].img2d == 1) {
      $('#div_image_3dnr').css('display', 'block');
    } else {
      $('#div_image_3dnr').css('display', 'none');
    }

    $('#slider_image_ldc_value').slider('option', 'value', g_gtemplate[g_template_index].imgldc);
    $('#div_image_ldc_value_text').text(g_gtemplate[g_template_index].imgldc);

    $('#select_image_smartir_value').val(g_smartir);

    if (g_smartir == 0) {
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'irlevel', 'div_maxlevel_name', ITEM_TYPE_TEXT);
    } else {
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'maxlevel', 'div_maxlevel_name', ITEM_TYPE_TEXT);
    }
  }
}

function fun_on_videostd_change() {
  var valindex = $('#select_video_standard').val();
  g_standard = valindex;
}

function fun_on_template_change() {
  var valindex = $('#select_video_image_templates').val();
  g_template_index = parseInt(valindex);
  fun_init_page_item_values();
}

function fun_on_videoimage_mode_change() {
  var valindex = $('#select_image_output_mode').val();
  if (g_template_index == 0) {
    g_gtemplate[0].imgstyle = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgstyle = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgstyle = valindex;
  }
  if (valindex == 4) {
    $('#div_image_output_items').css('display', 'block');
  } else {
    $('#div_image_output_items').css('display', 'none');
  }
}

function fun_on_blc_change() {
  var valindex = $('#select_image_blc_value').val();
  if (valindex === '1') {
    $('#div_image_blc_level').css('display', 'block');
  } else {
    $('#div_image_blc_level').css('display', 'none');
  }
  if (g_template_index == 0) {
    g_gtemplate[0].imgbacklight = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgbacklight = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgbacklight = valindex;
  }
}

function fun_on_hlc_change() {
  var valindex = $('#select_image_hlc_value').val();
  if (valindex === '1') {
    $('#div_image_hlc_level').css('display', 'block');
  } else {
    $('#div_image_hlc_level').css('display', 'none');
  }
  if (g_template_index == 0) {
    g_gtemplate[0].hlc = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].hlc = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].hlc = valindex;
  }
}

function fun_on_wdr_change() {
  var valindex = $('#select_image_wdr_value').val();
  if (valindex === '1') {
    $('#div_image_wdr_level').css('display', 'block');
  } else {
    $('#div_image_wdr_level').css('display', 'none');
  }
  if (g_template_index == 0) {
    g_gtemplate[0].imgwdr = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgwdr = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgwdr = valindex;
  }
}

function fun_on_whitebalance_change() {
  var valindex = $('#select_image_whitebalance_value').val();

  $('#div_image_whitebalance_manual_items').css('display', valindex === '4' ? 'block' : 'none');

  if (g_template_index == 0) {
    g_gtemplate[0].imgwbmode = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgwbmode = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgwbmode = valindex;
  }
}

function fun_on_exposure_change() {
  var valindex = $('#select_image_exposure_value').val();
  if (valindex === '1'&& g_slidshut==1) {
    $('#div_image_lightsense').css('display', 'block');
    $('#div_image_aegain').css('display', 'block');
  } else {
    $('#div_image_lightsense').css('display', 'none');
    $('#div_image_aegain').css('display', 'none');
  }
  if (g_template_index == 0) {
    g_gtemplate[0].imgexpmode = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgexpmode = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgexpmode = valindex;
  }
}

function fun_on_shutter_change() {
  var valindex = $('#select_image_shutter_value').val();
  if (g_template_index == 0) {
    g_gtemplate[0].imgexpshutter = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgexpshutter = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgexpshutter = valindex;
  }
}

function fun_on_mirror_change() {
  var valindex = $('#select_video_mirror').val();
  g_mirror = valindex;
}

function fun_on_lightmetering_change() {
  var valindex = $('#select_image_lightmetering_value').val();
  if (g_template_index == 0) {
    g_gtemplate[0].imgexpmetter = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgexpmetter = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgexpmetter = valindex;
  }
}

function fun_on_iris_change() {
  var valindex = $('#select_image_autoiris_value').val();
  if (g_template_index == 0) {
    g_gtemplate[0].imgexpiris = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgexpiris = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgexpiris = valindex;
  }
}

function fun_on_defog_change() {
  var valindex = $('#select_image_defog_value').val();
  if (g_template_index == 0) {
    g_gtemplate[0].imgdefog = valindex;
  } else if (g_template_index == 1) {
    g_gtemplate[1].imgdefog = valindex;
  } else if (g_template_index == 2) {
    g_gtemplate[2].imgdefog = valindex;
  }
}

//function fun_on_corridor_change() {
//    var valindex = $("#select_video_corridor").val();
//    g_rotate = valindex;
//}

function fun_on_smartir_change() {
  var valindex = $('#select_image_smartir_value').val();

  g_smartir = valindex;
  if (g_smartir == 0) {
    translate_page_item(TARGET_PAGE_SUB_IMAGE, 'irlevel', 'div_maxlevel_name', ITEM_TYPE_TEXT);
  } else {
    translate_page_item(TARGET_PAGE_SUB_IMAGE, 'maxlevel', 'div_maxlevel_name', ITEM_TYPE_TEXT);
  }
}

function fun_on_schedule_day_change() {
  var valindex = $('#select_image_schedule_day_value').val();
  if (valindex !== '3') {
    $('#div_schedule_timing_settings').css('display', 'none');
  } else {
    $('#div_schedule_timing_settings').css('display', 'block');
  }
  g_schedule = valindex;
}

function fun_on_schedule_night_change() { }

function fun_on_daynight_mode_change() {
  var valindex = $('#select_image_daynight_mode_value').val();
  if (valindex !== '3') {
    $('#div_image_daynight_timing_items').css('display', 'none');
  }
  if (valindex !== '4') {
    $('#div_image_daynight_intersync_items').css('display', 'none');
  }
  if (valindex === '0') {
    g_dnmode = 0;
  } else if (valindex === '1') {
    g_dnmode = 1;
  } else if (valindex === '2') {
    g_dnmode = 2;
  } else if (valindex === '3') {
    g_dnmode = 3;
    $('#div_image_daynight_timing_items').css('display', 'block');
  } else if (valindex === '4') {
    g_dnmode = 4;
    $('#div_image_daynight_intersync_items').css('display', 'block');
  }
}

function fun_on_infrared_light_change() {
  var valindex = $('#select_image_daynight_light_value').val();
  var ledindex = $('#select_image_smartir_value').val();
  g_dnirled = valindex;
}
function fun_on_infrared_double_light_change() {
  var valindex = $('#select_image_daynight_light_double_value').val();
  //var valindex_ = $('#select_image_smartir_value').val();
  g_dnirled = valindex;
  if (g_irled == 2) {
    if (valindex == 0 || valindex == 1) {
      $('#div_image_smartir_contain').css('display', 'block');
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'smartir', 'div_image_smartir_name', ITEM_TYPE_TEXT);
      $('#div_smartevt').css('display', 'none');
      $('#div_maxlevel').css('display', 'block');
      $('#div_image_daynight_mode').css('display', 'block');
      $('#div_ledthreshonlevel').css('display', 'block');
      $('#div_ledthreshofflevel').css('display', 'block');
    } else if (valindex == 2) {
      $('#div_image_smartir_contain').css('display', 'block');
      translate_page_item(TARGET_PAGE_SUB_IMAGE, 'smartled', 'div_image_smartir_name', ITEM_TYPE_TEXT);
      $('#div_smartevt').css('display', 'block');
      $('#div_maxlevel').css('display', 'none');
      $('#div_ledthreshonlevel').css('display', 'block');
      $('#div_ledthreshofflevel').css('display', 'block');
      $('#div_image_daynight_mode').css('display', 'none');
    } else {
      $('#div_image_smartir_contain').css('display', 'none');
      $('#div_smartevt').css('display', 'none');
      $('#div_maxlevel').css('display', 'block');
      $('#div_ledthreshonlevel').css('display', 'none');
      $('#div_ledthreshofflevel').css('display', 'none');
      $('#div_image_daynight_mode').css('display', 'block');
    }
  }
}
function fun_on_speed_value_change() {
  var valindex = $('#select_speed_value').val();
  g_speed = valindex;
}

function fun_on_smartevt_value_change() {
  var valindex = $('#select_smartevt_value').val();
  g_smartevt = valindex;
}
function fun_on_white_led_change() { }

function fun_on_dnr2d_value_change() {
  var value = $('#select_image_dnr2d_value').val();
  g_gtemplate[g_template_index].img2d = value;
  if (value === '1') {
    $('#div_image_3dnr').css('display', 'block');
  } else {
    $('#div_image_3dnr').css('display', 'none');
  }
}

function fun_on_dnr3d_value_change() {
  var value = $('#select_image_dnr3d_value').val();
  g_gtemplate[g_template_index].img3d = value;
}

function fun_slider_change() {
  var objid = this.id.toString();
  var slidervalue;
  if (objid === 'slider_image_saturation_value') {
    slidervalue = $('#slider_image_saturation_value').slider('value');
    $('#div_image_saturation_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgsaturation = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgsaturation = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgsaturation = slidervalue;
    }
  } else if (objid === 'slider_image_brightness_value') {
    slidervalue = $('#slider_image_brightness_value').slider('value');
    $('#div_image_brightness_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgbrightness = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgbrightness = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgbrightness = slidervalue;
    }
  } else if (objid === 'slider_image_blclevel_value') {
    slidervalue = $('#slider_image_blclevel_value').slider('value');
    $('#div_image_blclevel_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgblclevel = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgblclevel = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgblclevel = slidervalue;
    }
  } else if (objid === 'slider_image_hlclevel_value') {
    slidervalue = $('#slider_image_hlclevel_value').slider('value');
    $('#div_image_hlclevel_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imghlclevel = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imghlclevel = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imghlclevel = slidervalue;
    }
  } else if (objid === 'slider_image_wdrlevel_value') {
    slidervalue = $('#slider_image_wdrlevel_value').slider('value');
    $('#div_image_wdrlevel_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgwdrlevel = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgwdrlevel = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgwdrlevel = slidervalue;
    }
  } else if (objid === 'slider_image_lightsense_value') {
    slidervalue = $('#slider_image_lightsense_value').slider('value');
    $('#div_image_lightsense_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imglightsense = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imglightsense = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imglightsense = slidervalue;
    }
  } else if (objid === 'slider_image_aegain_value') {
    slidervalue = $('#slider_image_aegain_value').slider('value');
    $('#div_image_aegain_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgaegain = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgaegain = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgaegain = slidervalue;
    }
  } else if (objid === 'slider_image_sharpness_value') {
    slidervalue = $('#slider_image_sharpness_value').slider('value');
    $('#div_image_sharpness_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgsharpness = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgsharpness = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgsharpness = slidervalue;
    }
  } else if (objid === 'slider_image_contrast_value') {
    slidervalue = $('#slider_image_contrast_value').slider('value');
    $('#div_image_contrast_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgcontrast = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgcontrast = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgcontrast = slidervalue;
    }
  } else if (objid === 'slider_image_3dnr_value') {
    slidervalue = $('#slider_image_3dnr_value').slider('value');
    $('#div_image_3dnr_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgnoise = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgnoise = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgnoise = slidervalue;
    }
  } else if (objid === 'slider_image_ldc_value') {
    slidervalue = $('#slider_image_ldc_value').slider('value');
    $('#div_image_ldc_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgldc = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgldc = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgldc = slidervalue;
    }
  } else if (objid === 'slider_image_redgain_value') {
    slidervalue = $('#slider_image_redgain_value').slider('value');
    $('#div_image_redgain_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgwbrgain = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgwbrgain = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgwbrgain = slidervalue;
    }
  } else if (objid === 'slider_image_greengain_value') {
    slidervalue = $('#slider_image_greengain_value').slider('value');
    $('#div_image_greengain_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgwbggain = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgwbggain = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgwbggain = slidervalue;
    }
  } else if (objid === 'slider_image_bluegain_value') {
    slidervalue = $('#slider_image_bluegain_value').slider('value');
    $('#div_image_bluegain_value_text').text(slidervalue);
    if (g_template_index == 0) {
      g_gtemplate[0].imgwbbgain = slidervalue;
    } else if (g_template_index == 1) {
      g_gtemplate[1].imgwbbgain = slidervalue;
    } else if (g_template_index == 2) {
      g_gtemplate[2].imgwbbgain = slidervalue;
    }
  } else if (objid === 'slider_image_daynight_intersync_tocolor_value') {
    slidervalue = $('#slider_image_daynight_intersync_tocolor_value').slider('value');
    var g_col2grey_lum_actual_val = parseInt(g_col2grey_lum) + (((slidervalue - 50) * 10) * g_lum_benchmark * -1)
    $('#div_image_daynight_intersync_tocolor_value_text').text(slidervalue + ' ( ' + g_col2grey_lum_actual_val + ' ) ');

    g_dncolor = slidervalue;
    // if (g_dncolor <= g_dngrey) {
    //   g_dngrey = g_dncolor - 1;
    //   $('#slider_image_daynight_intersync_togrey_value').slider('option', 'value', g_dngrey);
    // }
  } else if (objid === 'slider_image_daynight_intersync_togrey_value') {
    slidervalue = $('#slider_image_daynight_intersync_togrey_value').slider('value');
    var g_grey2col_lum_actual_val = parseInt(g_grey2col_lum) + (((slidervalue - 50) * 10) * g_lum_benchmark * 1)
    $('#div_image_daynight_intersync_togrey_value_text').text(slidervalue+ ' ( ' + g_grey2col_lum_actual_val + ' ) ');
    g_dngrey = slidervalue;
    // if (g_dngrey >= g_dncolor) {
    //   g_dncolor = g_dngrey + 1;
    //   $('#slider_image_daynight_intersync_tocolor_value').slider('option', 'value', g_dncolor);
    // }
  } else if (objid === 'slider_image_daynight_intersync_dayrange_value') {
    slidervalue = $('#slider_image_daynight_intersync_dayrange_value').slider('value');
    $('#div_image_daynight_intersync_dayrange_value_text').text(slidervalue + ' s');
    g_colortogreydelay = slidervalue;
  } else if (objid === 'slider_image_daynight_intersync_nightrange_value') {
    slidervalue = $('#slider_image_daynight_intersync_nightrange_value').slider('value');
    $('#div_image_daynight_intersync_nightrange_value_text').text(slidervalue + ' s');
    g_greytocolordelay = slidervalue;
  }else if (objid === 'slider_ledlevel_value') {
    slidervalue = $('#slider_ledlevel_value').slider('value');
    $('#div_ledlevel_value_text').text(slidervalue);
    g_ledlevel = slidervalue;
  } else if (objid === 'slider_ledthreshonlevel') {
    slidervalue = $('#slider_ledthreshonlevel').slider('value');
    $('#div_ledthreshonlevel_value_text').text(slidervalue);
    g_threshonlevel = slidervalue;
  } else if (objid === 'slider_ledthreshofflevel') {
    slidervalue = $('#slider_ledthreshofflevel').slider('value');
    $('#div_ledthreshofflevel_value_text').text(slidervalue);
    g_threshofflevel = slidervalue;
  } else if (objid === 'slider_maxlevel_value') {
    slidervalue = $('#slider_maxlevel_value').slider('value');
    $('#div_maxlevel_value_text').text(slidervalue);
    g_smartirlevel = slidervalue;
  } else if (objid === 'slider_smartlevel_value') {
    slidervalue = $('#slider_smartlevel_value').slider('value');
    $('#div_smartlevel_value_text').text(slidervalue);
    g_smartirlevel = slidervalue;
  }
}

function fun_range_slider_change(event, ui) {
  var vals = ui.values;
  var tagid = this.id.toString();
  if (vals[0] == vals[1]) {
    var sval = String(vals[0] * 60 - 1) + '-' + String(vals[1] * 60);
  } else {
    var sval = String(vals[0] * 60) + '-' + String(vals[1] * 60);
  }
  if (tagid === 'slider_daynight_schedule_timing_value') {
    g_daysection = sval;
  } else if (tagid === 'slider_daynight_daynight_timing_value') {
    g_dnsection = sval;
  } else if (tagid === 'slider_icut_daynight_timing_value') {
    g_icutvalue = sval;
  }
}

function fun_on_combobox_change(val) {
  if (val === 'select_video_standard') {
    fun_on_videostd_change();
  } else if (val === 'select_video_corridor') {
    // fun_on_corridor_change();
  } else if (val === 'select_video_image_templates') {
    fun_on_template_change();
  } else if (val === 'select_image_output_mode') {
    fun_on_videoimage_mode_change();
  } else if (val === 'select_image_blc_value') {
    fun_on_blc_change();
  } else if (val === 'select_image_hlc_value') {
    fun_on_hlc_change();
  } else if (val === 'select_image_wdr_value') {
    fun_on_wdr_change();
  } else if (val === 'select_image_whitebalance_value') {
    fun_on_whitebalance_change();
  } else if (val === 'select_image_exposure_value') {
    fun_on_exposure_change();
  } else if (val === 'select_image_shutter_value') {
    fun_on_shutter_change();
  } else if (val === 'select_video_mirror') {
    fun_on_mirror_change();
  } else if (val === 'select_image_lightmetering_value') {
    fun_on_lightmetering_change();
  } else if (val === 'select_image_autoiris_value') {
    fun_on_iris_change();
  } else if (val === 'select_image_defog_value') {
    fun_on_defog_change();
  } else if (val === 'select_image_smartir_value') {
    fun_on_smartir_change();
  } else if (val === 'select_image_schedule_day_value') {
    fun_on_schedule_day_change();
  } else if (val === 'select_image_schedule_night_value') {
    fun_on_schedule_night_change();
  } else if (val === 'select_image_daynight_mode_value') {
    fun_on_daynight_mode_change();
  } else if (val === 'select_image_daynight_light_value') {
    fun_on_infrared_light_change();
  } else if (val === 'select_image_daynight_light_double_value') {
    fun_on_infrared_double_light_change();
  } else if (val === 'select_image_daynight_led_value') {
    fun_on_white_led_change();
  } else if (val === 'select_image_dnr2d_value') {
    fun_on_dnr2d_value_change();
  } else if (val === 'select_image_dnr3d_value') {
    fun_on_dnr3d_value_change();
  } else if (val === 'select_smartevt_value') {
    fun_on_smartevt_value_change();
  } else if (val === 'select_speed_value') {
    fun_on_speed_value_change();
  }
}

function fun_on_option_button_click(val) {
  if (val === 'button_image_baseinfo_restore') {
    fun_on_image_restore();
  } else if (val === 'button_image_baseinfo_refresh') {
    fun_on_image_refresh();
  } else if (val === 'button_image_baseinfo_save') {
    fun_on_image_save();
  } else if (val === 'button_image_schedule_restore') {
    fun_on_schedule_restore();
  } else if (val === 'button_image_schedule_refresh') {
    fun_on_schedule_refresh();
  } else if (val === 'button_image_schedule_save') {
    fun_on_schedule_save();
  } else if (val === 'button_image_daynight_restore') {
    fun_on_daynight_restore();
  } else if (val === 'button_image_daynight_refresh') {
    fun_on_daynight_refresh();
  } else if (val === 'button_image_daynight_save') {
    fun_on_daynight_save();
  }
}

function fun_resotre_defulat_parameters(mask) {
  if (0 === mask) {
    g_standard = 0;
    g_mirror = 0;
    g_rotate = 0;

    for (var i = 0; i < g_gtemplate.length; i++) {
      g_gtemplate[i].imgstyle = 0;
      g_gtemplate[i].imgsharpness = 50;
      g_gtemplate[i].imgbrightness = 50;
      g_gtemplate[i].imgsaturation = 50;
      g_gtemplate[i].imgcontrast = 50;
      g_gtemplate[i].imgnoise = 50;
      g_gtemplate[i].imgblclevel = 50;
      g_gtemplate[i].imghlclevel = 50;
      g_gtemplate[i].imgwdrlevel = 50;
      g_gtemplate[i].imgaegain = 16;
      g_gtemplate[i].imglightsense = 16;
      g_gtemplate[i].img3d = 1;
      g_gtemplate[i].img2d = 1;
      g_gtemplate[i].imgldc = 0;
      g_gtemplate[i].hlc = 0;
      g_gtemplate[i].imgdefog = 0;
      // g_gtemplate[i].imgsmartir = 0;
      g_gtemplate[i].imgwdr = 0;
      g_gtemplate[i].imgbacklight = 0;
      g_gtemplate[i].imgexpmode = 0;
      g_gtemplate[i].imgexpmetter = 0;
      g_gtemplate[i].imgexpshutter = 6;
      g_gtemplate[i].imgexpiris = 1;
      g_gtemplate[i].imgwbmode = 0;
      g_gtemplate[i].imgwbrgain = 50;
      g_gtemplate[i].imgwbggain = 50;
      g_gtemplate[i].imgwbbgain = 50;
    }
  } else if (1 === mask) {
    g_schedule = 0;
    g_daysection = '21600-64800';
  } else if (2 === mask) {
    g_dnmode = 0;
    g_dnirled = 0;
    g_smartir = 1;
    g_smartirlevel = 5;
    g_smartevt = 0;
    g_speed = 0;
    g_ledlevel = 5;
    g_dnsection = '21600-64800';
    g_dncolor = 10;
    g_colortogreydelay = 2;
    g_greytocolordelay = 5;
    g_dngrey = 5;
    g_icutvalue = '0-86400';
    g_threshonlevel = 50;
    g_threshofflevel = 50;
    $('#slider_icut_daynight_timing_value').slider('option', 'values', [0, 1440]);
  }
}

function fun_on_image_restore() {
  g_template_index = 0;
  //fun_reanalysis_parameters();
  fun_resotre_defulat_parameters(0);
  fun_init_page_item_values();
}

function fun_on_image_refresh() {
  g_template_index = 0;
  fun_get_image_parameters();
}

function fun_on_image_save() {
  var currotate = $('#select_video_corridor').val();
  if (g_rotate != currotate) {
    if (g_need_reboot) {
      fun_show_rebootnote_dialog(true);
    } else {
      g_rotate = currotate;
      fun_save_image_parameters();
      setTimeout('fun_videoshow()', 3000);
    }
  } else {
    fun_save_image_parameters();
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

function fun_on_schedule_restore() {
  g_template_index = 0;
  //fun_reanalysis_parameters();
  fun_resotre_defulat_parameters(1);
  fun_init_page_item_values();
}

function fun_on_schedule_refresh() {
  g_template_index = 0;
  fun_get_image_parameters();
}

function fun_on_schedule_save() {
  fun_save_image_parameters();
}

function fun_on_daynight_restore() {
  g_template_index = 0;
  //fun_reanalysis_parameters();
  fun_resotre_defulat_parameters(2);
  fun_init_page_item_values();
}

function fun_on_daynight_refresh() {
  g_template_index = 0;
  fun_get_image_parameters();
}

function fun_on_daynight_save() {
  fun_save_image_parameters();
}
