var monthdays = { Jan: '31', Feb: '28', Mar: '31', Apr: '30', May: '31', Jun: '30', Jul: '31', Aug: '31', Sep: '30', Oct: '31', Nov: '30', Dec: '31' }
var timezoneindex = [
  '<GMT+14>+14',
  '<GMT+13>+13',
  '<GMT+12>+12',
  'SST11',
  'HAST10',
  'AKST9',
  'PST8',
  'MST7',
  'CSTA6',
  'CSTB6',
  'CST5',
  'EST5',
  'VET4:30',
  'PYT4',
  'CLT4',
  'AST4',
  'NST3:30',
  'BRT3',
  'FNT2',
  'AZOT1',
  'GMT0',
  'CET-1',
  'EETA-2',
  'EETB-2',
  'IST-2',
  'SAST-2',
  'EETC-2',
  'EETD-2',
  'MSK-3',
  'AST-3',
  'IRST-3:30',
  'AZT-4',
  'AFT-4:30',
  'PKT-5',
  'IST-5:30',
  'NPT-5:45',
  'OMST-6',
  'MMT-6:30',
  'WIT-7',
  'CST-8',
  'WST-8',
  'JST-9',
  'CSTA-9:30',
  'CSTB-9:30',
  'EST-10',
  'SBT-11',
  'NFT-11:30',
  'NZST-12',
  'FJT-12',
  'PETT-12',
  'MHT-12',
  'CHAST-12:45',
  'TOT-13'
]
var timezonetexts = [
  'GMT-14',
  'GMT-13',
  'GMT-12(Eniwetok)',
  'GMT-11(Midway Island, Samoa)',
  'GMT-10(Hawaii, the Aleutian Islands)',
  'GMT-09(Alaska)',
  'GMT-08(Las Vegas, San Francisco, Vancouver)',
  'GMT-07(Calgary, Denver, Salt Lake City)',
  'GMT-06(Chicago, Dallas, New Orleans)',
  'GMT-06(Mexico City)',
  'GMT-05(Cuba)',
  'GMT-05(New York, Toronto, Washington, DC)',
  'GMT-04:30(Bolivarian Republic of Venezuela)',
  'GMT-04 (Paraguay)',
  'GMT-04(Paraguay,Chile)',
  'GMT-04(Charlottetown, Manaus)',
  'GMT-03:30(Newfoundland)',
  'GMT-03(Sao Paulo, Brazil)',
  'GMT-02(Noronha, Mid-Atlantic)',
  'GMT-01(Azores, Cape Verde)',
  'GMT(Dublin, Lisbon, London, Reykjavik)',
  'GMT+01(Amsterdam, Berlin, Rome, Stockholm, Warsaw)',
  'GMT+02(Athens, Helsinki, Istanbul, Riga)',
  'GMT+02(Egypt)',
  'GMT+02(Israel)',
  'GMT+02(Johannesburg)',
  'GMT+02(Lebanon)',
  'GMT+02(Syria)',
  'GMT+03(Moscow, Riyadh)',
  'GMT+03(Iraq)',
  'GMT+03:30(Iran)',
  'GMT+04(Abu Dhabi Emirate, Baku)',
  'GMT+04:30(Kabul)',
  'GMT+05(Islamabad, Karachi, Tashkent)',
  'GMT+05:30(Mumbai, Calcutta, New Delhi)',
  'GMT+05:45(Kathmandu)',
  'GMT+06(Novosibirsk, Omsk)',
  'GMT+06:30(Yangon)',
  'GMT+07(Bangkok, Hanoi, Jakarta)',
  'GMT+08(Beijing, Hong Kong, Shanghai)',
  'GMT+08(Perth)',
  'GMT+09(Osaka, Sapporo, Tokyo, Seoul)',
  'GMT+09:30(Darwin)',
  'GMT+09:30(Adelaide)',
  'GMT+10(Hobart, Canberra, Melbourne, Sydney)',
  'GMT+11(Solomon Islands)',
  'GMT+11:30(Norfolk)',
  'GMT+12(Auckland, Wellington)',
  'GMT+12(Fiji)',
  'GMT+12(Kamchatka Peninsula)',
  'GMT+12(Marshall Islands)',
  'GMT+12:45(Chatham)',
  "GMT+13 (Tongatapu, Nuku'alofa)"
]
var monthname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var g_timezone_format_is_old = true
var g_sync_pctime_enable = false
$(document).ready(function () {
  fun_init_general_pageui()
  fun_multilang_adapter()
  fun_getgeneralparam()
  fun_settime_method_change()
  $('#input_dst_enable').click(function () {
    fun_on_dst_enable()
  })
  $('#button_devicetime_restore').click(function () {
    fun_on_restore_devicetime()
  })
  fun_register_all_events()
})
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'datetime', 'div_title_datetime_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'regular', 'div_table_device_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_COMMON, 'status', 'div_datetime_status_title_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'date', 'div_datetime_date_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'time', 'div_datetime_time_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'datetimefmt', 'div_datetime_format_title_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'datefmt', 'div_datetime_dateformat_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'timefmt', 'div_datetime_timeformat_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'timeset', 'div_devicetime_title_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'timezone', 'div_devicetime_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'dstenable', 'label_dst_enable', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'dstbias', 'div_bias_name_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'dststart', 'div_dst_start_time_name_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'dstend', 'div_dst_end_time_name_text', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'syncserver', 'label_ntp_syncserver', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'ntpserver', 'div_ntp_server_addr_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_COMMON, 'port', 'div_ntp_server_port_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'ntpperiod', 'div_ntp_server_interval_name', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'manualset', 'label_manual_set', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_SUB_GENERAL, 'syncpc', 'lable_sync_pc', ITEM_TYPE_TEXT)
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_devicetime_refresh', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_devicetime_save', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_device_name_save', ITEM_TYPE_VALUE)
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_devicetime_restore', ITEM_TYPE_VALUE)
  var strhour = translate_page_item(TARGET_PAGE_COMMON, 'hour', '', ITEM_TYPE_NONE)
  var strminute = translate_page_item(TARGET_PAGE_COMMON, 'minute', '', ITEM_TYPE_NONE)
  var strymd = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'dateymd', '', ITEM_TYPE_NONE)
  var strdmy = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'datedmy', '', ITEM_TYPE_NONE)
  var strmdy = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'datemdy', '', ITEM_TYPE_NONE)
  var str24h = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'timetwentyfour', '', ITEM_TYPE_NONE)
  var str12h = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'timetwelve', '', ITEM_TYPE_NONE)
  var strmonday = translate_page_item(TARGET_PAGE_COMMON, 'monday', '', ITEM_TYPE_NONE)
  var strtuesday = translate_page_item(TARGET_PAGE_COMMON, 'tuesday', '', ITEM_TYPE_NONE)
  var strwednesday = translate_page_item(TARGET_PAGE_COMMON, 'wednesday', '', ITEM_TYPE_NONE)
  var strthursday = translate_page_item(TARGET_PAGE_COMMON, 'thursday', '', ITEM_TYPE_NONE)
  var strfriday = translate_page_item(TARGET_PAGE_COMMON, 'friday', '', ITEM_TYPE_NONE)
  var strsaturday = translate_page_item(TARGET_PAGE_COMMON, 'saturday', '', ITEM_TYPE_NONE)
  var strsunday = translate_page_item(TARGET_PAGE_COMMON, 'sunday', '', ITEM_TYPE_NONE)
  var strjanuary = translate_page_item(TARGET_PAGE_COMMON, 'january', '', ITEM_TYPE_NONE)
  var strfebruary = translate_page_item(TARGET_PAGE_COMMON, 'february', '', ITEM_TYPE_NONE)
  var strmarch = translate_page_item(TARGET_PAGE_COMMON, 'march', '', ITEM_TYPE_NONE)
  var strapril = translate_page_item(TARGET_PAGE_COMMON, 'april', '', ITEM_TYPE_NONE)
  var strmay = translate_page_item(TARGET_PAGE_COMMON, 'may', '', ITEM_TYPE_NONE)
  var strjune = translate_page_item(TARGET_PAGE_COMMON, 'june', '', ITEM_TYPE_NONE)
  var strjuly = translate_page_item(TARGET_PAGE_COMMON, 'july', '', ITEM_TYPE_NONE)
  var straugust = translate_page_item(TARGET_PAGE_COMMON, 'august', '', ITEM_TYPE_NONE)
  var strseptember = translate_page_item(TARGET_PAGE_COMMON, 'september', '', ITEM_TYPE_NONE)
  var stroctober = translate_page_item(TARGET_PAGE_COMMON, 'october', '', ITEM_TYPE_NONE)
  var strnovember = translate_page_item(TARGET_PAGE_COMMON, 'november', '', ITEM_TYPE_NONE)
  var strdecember = translate_page_item(TARGET_PAGE_COMMON, 'december', '', ITEM_TYPE_NONE)
  var strfirst = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'firstweek', '', ITEM_TYPE_NONE)
  var strsecond = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'secondweek', '', ITEM_TYPE_NONE)
  var strthird = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'thirdweek', '', ITEM_TYPE_NONE)
  var strfourth = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'fourthweek', '', ITEM_TYPE_NONE)
  var strlast = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'lastweek', '', ITEM_TYPE_NONE)
  var strdisabled = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE)
  var strenabled = translate_page_item(TARGET_PAGE_COMMON, 'enable', '', ITEM_TYPE_NONE)
  $('#div_ntp_server_interval_tips').text('(1~5)' + strhour)
  $('#sel_dst_bias option').each(function (i, n) {
    if (i == 0) {
      $(n).text('30' + strminute)
    } else if (i == 1) {
      $(n).text('60' + strminute)
    } else if (i == 2) {
      $(n).text('90' + strminute)
    } else if (i == 3) {
      $(n).text('120' + strminute)
    }
  })
  $('#sel_date_format option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strymd)
    } else if (i == 1) {
      $(n).text(strmdy)
    } else if (i == 2) {
      $(n).text(strdmy)
    }
  })
  $('#sel_time_format option').each(function (i, n) {
    if (i == 0) {
      $(n).text(str24h)
    } else if (i == 1) {
      $(n).text(str12h)
    }
  })
  $('#select_device_p2penable option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strdisabled)
    } else if (i == 1) {
      $(n).text(strenabled)
    }
  })
  $('#sel_dst_start_weekday option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strmonday)
    } else if (i == 1) {
      $(n).text(strtuesday)
    } else if (i == 2) {
      $(n).text(strwednesday)
    } else if (i == 3) {
      $(n).text(strthursday)
    } else if (i == 4) {
      $(n).text(strfriday)
    } else if (i == 5) {
      $(n).text(strsaturday)
    } else if (i == 6) {
      $(n).text(strsunday)
    }
  })
  $('#sel_dst_end_weekday option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strmonday)
    } else if (i == 1) {
      $(n).text(strtuesday)
    } else if (i == 2) {
      $(n).text(strwednesday)
    } else if (i == 3) {
      $(n).text(strthursday)
    } else if (i == 4) {
      $(n).text(strfriday)
    } else if (i == 5) {
      $(n).text(strsaturday)
    } else if (i == 6) {
      $(n).text(strsunday)
    }
  })
  $('#sel_dst_start_month option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strjanuary)
    } else if (i == 1) {
      $(n).text(strfebruary)
    } else if (i == 2) {
      $(n).text(strmarch)
    } else if (i == 3) {
      $(n).text(strapril)
    } else if (i == 4) {
      $(n).text(strmay)
    } else if (i == 5) {
      $(n).text(strjune)
    } else if (i == 6) {
      $(n).text(strjuly)
    } else if (i == 7) {
      $(n).text(straugust)
    } else if (i == 8) {
      $(n).text(strseptember)
    } else if (i == 9) {
      $(n).text(stroctober)
    } else if (i == 10) {
      $(n).text(strnovember)
    } else if (i == 11) {
      $(n).text(strdecember)
    }
  })
  $('#sel_dst_end_month option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strjanuary)
    } else if (i == 1) {
      $(n).text(strfebruary)
    } else if (i == 2) {
      $(n).text(strmarch)
    } else if (i == 3) {
      $(n).text(strapril)
    } else if (i == 4) {
      $(n).text(strmay)
    } else if (i == 5) {
      $(n).text(strjune)
    } else if (i == 6) {
      $(n).text(strjuly)
    } else if (i == 7) {
      $(n).text(straugust)
    } else if (i == 8) {
      $(n).text(strseptember)
    } else if (i == 9) {
      $(n).text(stroctober)
    } else if (i == 10) {
      $(n).text(strnovember)
    } else if (i == 11) {
      $(n).text(strdecember)
    }
  })
  $('#sel_dst_start_day option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strfirst)
    } else if (i == 1) {
      $(n).text(strsecond)
    } else if (i == 2) {
      $(n).text(strthird)
    } else if (i == 3) {
      $(n).text(strfourth)
    } else if (i == 4) {
      $(n).text(strlast)
    }
  })
  $('#sel_dst_end_day option').each(function (i, n) {
    if (i == 0) {
      $(n).text(strfirst)
    } else if (i == 1) {
      $(n).text(strsecond)
    } else if (i == 2) {
      $(n).text(strthird)
    } else if (i == 3) {
      $(n).text(strfourth)
    } else if (i == 4) {
      $(n).text(strlast)
    }
  })
  var timezonehtml = ''
  for (var i = 0; i < timezonetexts.length; i++) {
    var tempvalue = translate_page_item(TARGET_PAGE_SUB_GENERAL, 'zone' + String(i), '', ITEM_TYPE_NONE)
    timezonehtml += "<option value='" + String(i) + "'>" + tempvalue + '</option>'
  }
  $('#sel_time_zone').html(timezonehtml)
}
function fun_register_all_events() {
  fun_button_click()
}
function fun_button_click() {
  $('#button_devicetime_refresh,#button_devicetime_save,#button_device_name_refresh').click(function () {
    if (this.id.toString() == 'button_devicetime_refresh') {
      fun_getgeneralparam()
    } else if (this.id.toString() == 'button_devicetime_save') {
      fun_save_devicetime()
    } else if (this.id.toString() == 'button_device_name_refresh') {
      fun_getgeneralparam()
    }
  })
}
function fun_on_dst_enable() {
  var enable = document.getElementById('input_dst_enable').checked
  if (enable) {
    $('#sel_dst_bias').removeAttr('disabled')
    $('#sel_dst_start_month').removeAttr('disabled')
    $('#sel_dst_start_day').removeAttr('disabled')
    $('#sel_dst_start_weekday').removeAttr('disabled')
    $('#sel_dst_end_month').removeAttr('disabled')
    $('#sel_dst_end_day').removeAttr('disabled')
    $('#sel_dst_end_weekday').removeAttr('disabled')
    timereidt('timer_dst_start_time').disable(false)
    timereidt('timer_dst_end_time').disable(false)
  } else {
    $('#sel_dst_bias').attr('disabled', 'disabled')
    $('#sel_dst_start_month').attr('disabled', 'disabled')
    $('#sel_dst_start_day').attr('disabled', 'disabled')
    $('#sel_dst_start_weekday').attr('disabled', 'disabled')
    $('#sel_dst_end_month').attr('disabled', 'disabled')
    $('#sel_dst_end_day').attr('disabled', 'disabled')
    $('#sel_dst_end_weekday').attr('disabled', 'disabled')
    timereidt('timer_dst_start_time').disable(true)
    timereidt('timer_dst_end_time').disable(true)
  }
}
function fun_init_general_pageui() {
  input_edit_restriction('input_ntp_server_addr', EDIT_RESTRICTION_XMLSTD, 32)
  input_edit_restriction('input_ntp_server_port', EDIT_RESTRICTION_NUMBER, 5)
  input_edit_restriction('input_ntp_server_interval', EDIT_RESTRICTION_NUMBER, 1)
  $('#div_devicetime_operation_status').css('display', 'none')
  $('#input_manual_date').datepicker({ changeMonth: true, changeYear: true, yearRange: '-50:+50' })
  if (current_language_number() === 4) {
    $('#input_manual_date').datepicker('option', $.datepicker.regional['zh'])
  } else if (current_language_number() === 25) {
    $('#input_manual_date').datepicker('option', $.datepicker.regional['ru'])
  } else if (current_language_number() === 21) {
    $('#input_manual_date').datepicker('option', $.datepicker.regional['pl'])
  } else if (current_language_number() === 17) {
    $('#input_manual_date').datepicker('option', $.datepicker.regional['ja'])
  } else if (current_language_number() === 7) {
    $('#input_manual_date').datepicker('option', $.datepicker.regional['de'])
  } else {
    $('#input_manual_date').datepicker('option', $.datepicker.regional[''])
  }
  $('#input_manual_date').datepicker('option', { showAnim: 'blind', dateFormat: 'yy-mm-dd' })
  var curdate = new Date()
  var strdate = curdate.getFullYear() + '-' + curdate.getMonth() + '-' + curdate.getDate()
  timereidt('timer_dst_start_time')
  timereidt('timer_dst_end_time')
  timereidt('timer_manual_settime')
  timereidt('timer_dst_start_time').setvalue('00:00:00')
  timereidt('timer_dst_end_time').setvalue('00:00:00')
  timereidt('timer_manual_settime').setvalue('00:00:00')
}
function fun_settime_method_change() {
  $('#input_ntp_enable,#input_manual_enable,#input_syncpc_enable').click(function () {
    if (this.id.toString() == 'input_ntp_enable') {
      if ($('#input_ntp_enable').is(':checked')) {
        $('#input_manual_enable').prop('checked', false)
        $('#input_manual_date').attr('disabled', 'disabled')
        timereidt('timer_manual_settime').disable(true)
        $('#input_syncpc_enable').attr('disabled', 'disabled')
        $('#input_ntp_server_addr').removeAttr('disabled')
        $('#input_ntp_server_port').removeAttr('disabled')
        $('#input_ntp_server_interval').removeAttr('disabled')
        document.getElementById('input_syncpc_enable').checked = false
        g_sync_pctime_enable = false
      } else {
        $('#input_manual_enable').prop('checked', true)
        $('#input_ntp_server_addr').attr('disabled', 'disabled')
        $('#input_ntp_server_port').attr('disabled', 'disabled')
        $('#input_ntp_server_interval').attr('disabled', 'disabled')
        $('#input_manual_date').removeAttr('disabled')
        timereidt('timer_manual_settime').disable(false)
        $('#input_syncpc_enable').removeAttr('disabled')
      }
    } else if (this.id.toString() == 'input_manual_enable') {
      if ($('#input_manual_enable').is(':checked')) {
        $('#input_ntp_enable').prop('checked', false)
        $('#input_ntp_server_addr').attr('disabled', 'disabled')
        $('#input_ntp_server_port').attr('disabled', 'disabled')
        $('#input_ntp_server_interval').attr('disabled', 'disabled')
        $('#input_manual_date').removeAttr('disabled')
        timereidt('timer_manual_settime').disable(false)
        $('#input_syncpc_enable').removeAttr('disabled')
      } else {
        $('#input_ntp_enable').prop('checked', true)
        $('#input_manual_date').attr('disabled', 'disabled')
        timereidt('timer_manual_settime').disable(true)
        $('#input_syncpc_enable').attr('disabled', 'disabled')
        $('#input_ntp_server_addr').removeAttr('disabled')
        $('#input_ntp_server_port').removeAttr('disabled')
        $('#input_ntp_server_interval').removeAttr('disabled')
        document.getElementById('input_syncpc_enable').checked = false
        g_sync_pctime_enable = false
      }
    } else if (this.id.toString() == 'input_syncpc_enable') {
      if ($('#input_syncpc_enable').is(':checked')) {
        $('#input_manual_date').attr('disabled', 'disabled')
        timereidt('timer_manual_settime').disable(true)
        g_sync_pctime_enable = true
        var strdate = new Date()
        var todaymonth = strdate.getMonth() + 1 > 9 ? (strdate.getMonth() + 1).toString() : '0' + (strdate.getMonth() + 1)
        var todayday = strdate.getDate() > 9 ? strdate.getDate().toString() : '0' + strdate.getDate()
        var today = strdate.getFullYear() + '-' + todaymonth + '-' + todayday
        $('#input_manual_date').val(today)
      } else {
        $('#input_manual_date').removeAttr('disabled')
        timereidt('timer_manual_settime').disable(false)
        g_sync_pctime_enable = false
      }
    }
  })
}
var g_device_curtime = 0,
  g_local_curtime = 0,
  g_p2p_enable = '',
  g_device_name = '',
  g_device_timeformat = 0,
  g_device_dateformat = 0
function fun_getgeneralparam() {
  sdk_getipcparam('/action/get?subject=devpara', function (val) {
    if (val != false) {
      $xml = $(val)
      var devname = $xml.find('name').text()
      if (devname.length > 0) {
      }
      g_device_name = devname
      var datefmt = $xml.find('datefmt').text()
      if (datefmt.length > 0) {
        $('#sel_date_format').val(datefmt)
      }
      g_device_dateformat = datefmt
      var timefmt = $xml.find('timefmt').text()
      if (timefmt.length > 0) {
        $('#sel_time_format').val(timefmt)
      }
      g_device_timeformat = timefmt
      var p2p = $xml.find('p2p').text()
      $('#select_device_p2penable').val(p2p)
      g_p2p_enable = p2p
    }
  })
  sdk_getipcparam('/action/get?subject=systime', function (val) {
    if (val != false) {
      $xml = $(val)
      var datetime = $xml.find('datetime').text().split('T')
      $('#input_manual_date').val(datetime[0])
      if (g_device_dateformat == 0) {
        $('#div_datetime_date_value').text(datetime[0])
      } else if (g_device_dateformat == 1) {
        var datearr = datetime[0].split('-')
        $('#div_datetime_date_value').text(datearr[1] + '-' + datearr[2] + '-' + datearr[0])
      } else if (g_device_dateformat == 2) {
        var datearr = datetime[0].split('-')
        $('#div_datetime_date_value').text(datearr[2] + '-' + datearr[1] + '-' + datearr[0])
      }
      if (g_device_timeformat == 0) {
        $('#div_datetime_time_value').text(datetime[1])
      } else {
        var timearr = datetime[1].split(':')
        if (timearr[0] >= 12) {
          $('#div_datetime_time_value').text(String(timearr[0] - 12) + ':' + String(timearr[1]) + ':' + String(timearr[2]) + ' PM')
        } else {
          $('#div_datetime_time_value').text(String(timearr[0]) + ':' + String(timearr[1]) + ':' + String(timearr[2]) + ' AM')
        }
      }
      timereidt('timer_manual_settime').setvalue(datetime[1])
      $('#input_manual_date').removeAttr('disabled')
      timereidt('timer_manual_settime').disable(false)
      g_sync_pctime_enable = false
      var arrtime = datetime[1].split(':')
      g_device_curtime = parseInt(arrtime[0]) * 3600 + parseInt(arrtime[1]) * 60 + parseInt(arrtime[2])
      var curtime = new Date()
      g_local_curtime = curtime.getHours() * 3600 + curtime.getMinutes() * 60 + curtime.getSeconds()
      var dstactive = $xml.find('dst').children('active').text()
      if (dstactive == 1) {
        $('#input_dst_enable').prop('checked', true)
        $('#sel_dst_bias').removeAttr('disabled')
        $('#sel_dst_start_month').removeAttr('disabled')
        $('#sel_dst_start_day').removeAttr('disabled')
        $('#sel_dst_start_weekday').removeAttr('disabled')
        $('#sel_dst_end_month').removeAttr('disabled')
        $('#sel_dst_end_day').removeAttr('disabled')
        $('#sel_dst_end_weekday').removeAttr('disabled')
        timereidt('timer_dst_start_time').disable(false)
        timereidt('timer_dst_end_time').disable(false)
      } else {
        $('#input_dst_enable').prop('checked', false)
        $('#sel_dst_bias').attr('disabled', 'disabled')
        $('#sel_dst_start_month').attr('disabled', 'disabled')
        $('#sel_dst_start_day').attr('disabled', 'disabled')
        $('#sel_dst_start_weekday').attr('disabled', 'disabled')
        $('#sel_dst_end_month').attr('disabled', 'disabled')
        $('#sel_dst_end_day').attr('disabled', 'disabled')
        $('#sel_dst_end_weekday').attr('disabled', 'disabled')
        timereidt('timer_dst_start_time').disable(true)
        timereidt('timer_dst_end_time').disable(true)
      }
      g_timezone_format_is_old = true
      var timezone = $xml.find('tz').text()
      var i = 0
      for (; i < timezonetexts.length; i++) {
        if (timezoneindex[i] == timezone) {
          break
        } else if (timezone == 'GMT+14') {
          i = 0
          g_timezone_format_is_old = false
          break
        } else if (timezone == 'GMT+13') {
          i = 1
          g_timezone_format_is_old = false
          break
        } else if (timezone == 'GMT+12') {
          i = 2
          g_timezone_format_is_old = false
          break
        }
      }
      $('#sel_time_zone').val(i)
      var settimemode = $xml.find('mode').text()
      $('#input_ntp_enable').removeAttr('checked')
      $('#input_syncpc_enable').removeAttr('checked')
      $('#input_manual_enable').removeAttr('checked')
      if (settimemode == 1) {
        document.getElementById('input_ntp_enable').checked = true
        $('#input_manual_date').attr('disabled', 'disabled')
        timereidt('timer_manual_settime').disable(true)
        $('#input_syncpc_enable').attr('disabled', 'disabled')
        $('#input_ntp_server_addr').removeAttr('disabled')
        $('#input_ntp_server_port').removeAttr('disabled')
        $('#input_ntp_server_interval').removeAttr('disabled')
      } else if (settimemode == 0) {
        document.getElementById('input_manual_enable').checked = true
        $('#input_ntp_server_addr').attr('disabled', 'disabled')
        $('#input_ntp_server_port').attr('disabled', 'disabled')
        $('#input_ntp_server_interval').attr('disabled', 'disabled')
        $('#input_manual_date').removeAttr('disabled')
        timereidt('timer_manual_settime').disable(false)
        $('#input_syncpc_enable').removeAttr('disabled')
      }
      var ntphost = $xml.find('host').text()
      if (ntphost.length > 0) {
        $('#input_ntp_server_addr').val(ntphost)
      }
      var ntpport = $xml.find('port').text()
      if (ntpport.length > 0) {
        $('#input_ntp_server_port').val(ntpport)
      }
      var ntpinterval = $xml.find('interval').text()
      if (ntpinterval.length > 0) {
        $('#input_ntp_server_interval').val(ntpinterval)
      }
      var dstoffset = $xml.find('dst').children('offset').text()
      if (dstoffset.length > 0) {
        if (dstoffset == 1800) {
          $('#sel_dst_bias').val(0)
        } else if (dstoffset == 3600) {
          $('#sel_dst_bias').val(1)
        } else if (dstoffset == 5400) {
          $('#sel_dst_bias').val(2)
        } else if (dstoffset == 7200) {
          $('#sel_dst_bias').val(3)
        }
      }
      $xml
        .find('dst')
        .children('begin')
        .each(function () {
          var month = $(this).children('month').text()
          var day = $(this).children('day').text()
          var week = $(this).children('week').text()
          var second = $(this).children('second').text()
          var nhour = parseInt(second / 3600)
          var nminute = parseInt((second % 3600) / 60)
          var nsecond = parseInt(second % 60)
          var strhour, strminute, strsecond
          if (nhour > 9) {
            strhour = String(nhour)
          } else {
            strhour = '0' + String(nhour)
          }
          if (nminute > 9) {
            strminute = String(nminute)
          } else {
            strminute = '0' + String(nminute)
          }
          if (nsecond > 9) {
            strsecond = String(nsecond)
          } else {
            strsecond = '0' + String(nsecond)
          }
          var strtime = strhour + ':' + strminute + ':' + strsecond
          $('#sel_dst_start_month').val(parseInt(month))
          $('#sel_dst_start_day').val(parseInt(week))
          $('#sel_dst_start_weekday').val(parseInt(day))
          timereidt('timer_dst_start_time').setvalue(strtime)
        })
      $xml
        .find('dst')
        .children('end')
        .each(function () {
          var month = $(this).children('month').text()
          var day = $(this).children('day').text()
          var week = $(this).children('week').text()
          var second = $(this).children('second').text()
          var nhour = parseInt(second / 3600)
          var nminute = parseInt((second % 3600) / 60)
          var nsecond = parseInt(second % 60)
          var strhour, strminute, strsecond
          if (nhour > 9) {
            strhour = String(nhour)
          } else {
            strhour = '0' + String(nhour)
          }
          if (nminute > 9) {
            strminute = String(nminute)
          } else {
            strminute = '0' + String(nminute)
          }
          if (nsecond > 9) {
            strsecond = String(nsecond)
          } else {
            strsecond = '0' + String(nsecond)
          }
          var strtime = strhour + ':' + strminute + ':' + strsecond
          $('#sel_dst_end_month').val(parseInt(month))
          $('#sel_dst_end_day').val(parseInt(week))
          $('#sel_dst_end_weekday').val(parseInt(day))
          timereidt('timer_dst_end_time').setvalue(strtime)
        })
    }
  })
  sdk_getipcparam('/action/get?subject=devinfo', function (val) {
    if (val != false) {
      $xml = $(val)
      var software = $xml.find('softver').text()
      if (software.length > 0) {
        $('#lable_device_infomation_firmware').text(software)
      }
      var hardware = $xml.find('hardver').text()
      if (hardware.length > 0) {
        $('#lable_device_infomation_hardware').text(hardware)
      }
      var p2pnumber = $xml.find('qrcode').text()
      if (p2pnumber.length > 0) {
        $('#lable_device_p2pnumber').text(p2pnumber)
      }
      var seqno = $xml.find('seqno').text()
      $('#lable_device_infomation_serial').text(seqno)
    }
  })
  sdk_getipcparam('/action/get?subject=network&adapter=0', function (val) {
    if (val != false) {
      $xml = $(val)
      var macaddr = $xml.find('mac').text()
      if (macaddr.length > 0) {
        $('#lable_device_infomation_mac').text(macaddr)
      }
    }
  })
}
function fun_on_restore_devicetime() {
  $('#sel_date_format').val('2')
  $('#sel_time_format').val('0')
  $('#sel_time_zone').val('28')
  $('#sel_dst_bias').val('1')
  $('#sel_dst_start_month').val('0')
  $('#sel_dst_start_day').val('0')
  $('#sel_dst_start_weekday').val('0')
  $('#sel_dst_end_month').val('0')
  $('#sel_dst_end_day').val('0')
  $('#sel_dst_end_weekday').val('0')
  timereidt('timer_dst_start_time').setvalue('02:00:00')
  timereidt('timer_dst_end_time').setvalue('02:00:00')
  $('#input_ntp_server_addr').val('81.30.199.67')
  $('#input_ntp_server_port').val('123')
  $('#input_ntp_server_interval').val('1')
  document.getElementById('input_ntp_enable').checked = true
  document.getElementById('input_dst_enable').checked = false
  document.getElementById('input_manual_enable').checked = false
  document.getElementById('input_syncpc_enable').checked = false
  $('#sel_dst_bias').attr('disabled', 'disabled')
  $('#sel_dst_start_month').attr('disabled', 'disabled')
  $('#sel_dst_start_day').attr('disabled', 'disabled')
  $('#sel_dst_start_weekday').attr('disabled', 'disabled')
  $('#sel_dst_end_month').attr('disabled', 'disabled')
  $('#sel_dst_end_day').attr('disabled', 'disabled')
  $('#sel_dst_end_weekday').attr('disabled', 'disabled')
  $('#input_ntp_server_addr').removeAttr('disabled')
  $('#input_ntp_server_port').removeAttr('disabled')
  $('#input_ntp_server_interval').removeAttr('disabled')
  $('#input_manual_date').attr('disabled', 'disabled')
  timereidt('timer_manual_settime').disable(true)
  $('#input_syncpc_enable').attr('disabled', 'disabled')
  timereidt('timer_dst_start_time').disable(true)
  timereidt('timer_dst_end_time').disable(true)
}
function fun_get_string_time(ntime) {
  var hour = parseInt(ntime / 3600)
  var minute = parseInt((ntime % 3600) / 60)
  var second = parseInt(ntime % 60)
  var strhour, strminute, strsecond
  if (hour > 9) {
    strhour = String(hour)
  } else {
    strhour = '0' + String(hour)
  }
  if (minute > 9) {
    strminute = String(minute)
  } else {
    strminute = '0' + String(minute)
  }
  if (second > 9) {
    strsecond = String(second)
  } else {
    strsecond = '0' + String(second)
  }
  return strhour + ':' + strminute + ':' + strsecond
}
setInterval(function () {
  if (g_device_curtime > 0) {
    g_device_curtime++
  }
  if (g_local_curtime > 0) {
    g_local_curtime++
  }
  var temptimestr = fun_get_string_time(g_device_curtime)
  if (g_device_timeformat == 0) {
    $('#div_datetime_time_value').text(temptimestr)
  } else {
    var timearr = temptimestr.split(':')
    if (timearr[0] >= 12) {
      $('#div_datetime_time_value').text(String(timearr[0] - 12) + ':' + String(timearr[1]) + ':' + String(timearr[2]) + ' PM')
    } else {
      $('#div_datetime_time_value').text(String(timearr[0]) + ':' + String(timearr[1]) + ':' + String(timearr[2]) + ' AM')
    }
  }
  if (g_sync_pctime_enable) {
    temptimestr = fun_get_string_time(g_local_curtime)
    timereidt('timer_manual_settime').setvalue(temptimestr)
  } else {
  }
}, 1000)
function fun_save_devicetime() {
  var timezoneindexnumber = $('#sel_time_zone option:selected').val()
  var datefmtindex = $('#sel_date_format option:selected').val()
  var timefmtindex = $('#sel_time_format option:selected').val()
  var dstenabled = 0
  if ($('#input_dst_enable').is(':checked')) {
    dstenabled = 1
  }
  var settimemethod = 1
  if ($('#input_manual_enable').is(':checked')) {
    settimemethod = 0
  }
  var gtips_input = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE)
  var gtips_saveerr = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE)
  var gtips_savesuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE)
  var gtips_auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE)
  var gtips_request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE)
  var ntpserver = $('#input_ntp_server_addr').val()
  var ntpport = $('#input_ntp_server_port').val()
  var ntpinterval = $('#input_ntp_server_interval').val()
  var datetime = ''
  var datestring = $('#input_manual_date').val()
  var timestring = timereidt('timer_manual_settime').getvalue()
  var arrtime = timestring.split(':')
  if (ntpserver == '' || ntpport <= 0 || ntpport > 65535 || ntpinterval < 1 || ntpinterval > 5 || fun_match_time(arrtime)) {
    parent.fun_show_tips_dialog(gtips_input, 0)
    return
  }
  if (parseInt(arrtime[0]) == 24) {
    timestring = '00:00:00'
  }
  datetime = datestring + 'T' + timestring
  var dstoffset = $('#sel_dst_bias').val()
  if (dstoffset == 0) {
    dstoffset = '1800'
  } else if (dstoffset == 1) {
    dstoffset = '3600'
  } else if (dstoffset == 2) {
    dstoffset = '5400'
  } else if (dstoffset == 3) {
    dstoffset = '7200'
  }
  var dststartmonth = $('#sel_dst_start_month').val()
  var dststartday = $('#sel_dst_start_day').val()
  var dststartweek = $('#sel_dst_start_weekday').val()
  var dststarttime = timereidt('timer_dst_start_time').getvalue()
  var dstendmonth = $('#sel_dst_end_month').val()
  var dstendday = $('#sel_dst_end_day').val()
  var dstendweek = $('#sel_dst_end_weekday').val()
  var dstendtime = timereidt('timer_dst_end_time').getvalue()
  dststartmonth = dststartmonth
  dststartday = dststartday
  dstendmonth = dstendmonth
  dstendday = dstendday
  var arrstart = dststarttime.split(':')
  dststarttime = String(parseInt(arrstart[0]) * 3600 + parseInt(arrstart[1]) * 60 + parseInt(arrstart[2]))
  var arrend = dstendtime.split(':')
  dstendtime = String(parseInt(arrend[0]) * 3600 + parseInt(arrend[1]) * 60 + parseInt(arrend[2]))
  var dststartminus = parseInt(arrstart[0]) * 60 + parseInt(arrstart[1])
  var dstendminus = parseInt(arrend[0]) * 60 + parseInt(arrend[1])
  var starttime = (parseInt(dststartmonth) + 1) * 7 * 7 * 24 * 60 + (parseInt(dststartweek) + 1) * 7 * 24 * 60 + (parseInt(dststartday) + 1) * 24 * 60 + dststartminus
  var endtime = (parseInt(dstendmonth) + 1) * 7 * 7 * 24 * 60 + (parseInt(dstendweek) + 1) * 7 * 24 * 60 + (parseInt(dstendday) + 1) * 24 * 60 + dstendminus
  if (fun_match_time(arrstart) || fun_match_time(arrend) || starttime > endtime) {
    parent.fun_show_tips_dialog(gtips_input, 0)
    return
  }
  var tagtz
  if (timezoneindexnumber == 0) {
    tagtz = 'GMT+14'
  } else if (timezoneindexnumber == 1) {
    tagtz = 'GMT+13'
  } else if (timezoneindexnumber == 2) {
    tagtz = 'GMT+12'
  } else {
    tagtz = timezoneindex[timezoneindexnumber]
  }
  var bsys = 0,
    bdev = 0
  var tagetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<systime ver="2.0">' +
    '<mode>' +
    settimemethod +
    '</mode>' +
    '<tz>' +
    tagtz +
    '</tz>' +
    '<datetime>' +
    datetime +
    '</datetime>' +
    '<dst>' +
    '<active>' +
    dstenabled +
    '</active>' +
    '<offset>' +
    dstoffset +
    '</offset>' +
    '<begin>' +
    '<month>' +
    dststartmonth +
    '</month>' +
    '<week>' +
    dststartday +
    '</week>' +
    '<day>' +
    dststartweek +
    '</day>' +
    '<second>' +
    dststarttime +
    '</second>' +
    '</begin>' +
    '<end>' +
    '<month>' +
    dstendmonth +
    '</month>' +
    '<week>' +
    dstendday +
    '</week>' +
    '<day>' +
    dstendweek +
    '</day>' +
    '<second>' +
    dstendtime +
    '</second>' +
    '</end>' +
    '</dst>' +
    '<ntp>' +
    '<host>' +
    ntpserver +
    '</host>' +
    '<port>' +
    ntpport +
    '</port>' +
    '<interval>' +
    ntpinterval +
    '</interval>' +
    '</ntp>' +
    '</systime>' +
    '</request>'
  sdk_setipcparam('/action/set?subject=systime', tagetxml, function (result) {
    if (result == true) {
      bsys = 1
    } else if (result == 400) {
      bsys = 2
    } else if (result == 403) {
      bsys = 3
    } else {
      bsys = 4
    }
    if (bsys > 0 && bdev > 0) {
      if (bsys == 1 && bdev == 1) {
        parent.fun_show_tips_dialog(gtips_savesuc)
      } else if (bsys == 2 || bdev == 2) {
        parent.fun_show_tips_dialog(gtips_request, 0)
      } else if (bsys == 3 || bdev == 3) {
        parent.fun_show_tips_dialog(gtips_auth, 0)
      } else if (bsys == 4 || bdev == 4) {
        parent.fun_show_tips_dialog(gtips_saveerr, 0)
      }
    }
  })
  tagetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<devpara ver="2.0">' +
    '<name>' +
    g_device_name +
    '</name>' +
    '<datefmt>' +
    datefmtindex +
    '</datefmt>' +
    '<timefmt>' +
    timefmtindex +
    '</timefmt>' +
    '<language>0</language>' +
    '<p2p>' +
    g_p2p_enable +
    '</p2p>' +
    '</devpara>' +
    '</request>'
  sdk_setipcparam('/action/set?subject=devpara', tagetxml, function (result) {
    if (result == true) {
      bdev = 1
    } else if (result == 400) {
      bdev = 2
    } else if (result == 403) {
      bdev = 3
    } else {
      bdev = 4
    }
    if (bsys > 0 && bdev > 0) {
      if (bsys == 1 && bdev == 1) {
        parent.fun_show_tips_dialog(gtips_savesuc)
        fun_getgeneralparam()
      } else if (bsys == 2 || bdev == 2) {
        parent.fun_show_tips_dialog(gtips_request, 0)
      } else if (bsys == 3 || bdev == 3) {
        parent.fun_show_tips_dialog(gtips_auth, 0)
      } else if (bsys == 4 || bdev == 4) {
        parent.fun_show_tips_dialog(gtips_saveerr, 0)
      }
    }
  })
}
function fun_match_time(arrsande) {
  for (var i = 0; i < 3; i++) {
    if (!arrsande[i].match('^[0-9]+$')) {
      return true
    }
  }
}
