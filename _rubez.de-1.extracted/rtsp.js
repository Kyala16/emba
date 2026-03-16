$(document).ready(function () {
  fun_multilang_adapter();
  fun_register_events();
  fun_get_rtsp_parameters();
  fun_initialize_pageui();
});
function fun_initialize_pageui() {
  ipedit('ipaddr_rtsp_edit');
  sdk_getipcparam('/action/get?subject=devability', function (result) {
    if (result == false) return;
    $xml = $(result);
    var smartva_alg = parseInt($xml.find('smartva_alg').text());
    if (smartva_alg==15||smartva_alg==11||smartva_alg==10||smartva_alg==12||smartva_alg==7) {
      $('#div_rtsp_metdata_enable_item').show()
    }
  });
}
function fun_register_events() {
  $('#button_rtsp_refresh,#button_rtsp_reset,#button_rtsp_save').click(function () {
    var tagid = this.id.toString();
    var funName = tagid.split('_')[2];
    eval('fun_on_rtsp_' + funName + '()')
  });
  $('#check_enable_rtsp_broadcast').click(function () {
    var strenabled = $('#check_enable_rtsp_broadcast').prop('checked');
    if (strenabled == false) {
      $('#input_rtsp_broadcast_port').attr('disabled', 'disabled');
      $('#input_rtsp_broadcast_ttl').attr('disabled', 'disabled');
      ipedit('ipaddr_rtsp_edit').disable(true);
    } else {
      $('#input_rtsp_broadcast_port').removeAttr('disabled');
      $('#input_rtsp_broadcast_ttl').removeAttr('disabled');
      ipedit('ipaddr_rtsp_edit').disable(false);
    }
  });
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'rtsptitle', 'div_title_rtsp_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'rtspinfo', 'div_rtsp_information_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'auth', 'div_rtsp_auth_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'metdata', 'div_rtsp_metdata_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'mainstream', 'div_rtsp_mainstream_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'substream', 'div_rtsp_substream_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_VIDEO, 'thirdstream', 'div_rtsp_thirstream_name', ITEM_TYPE_TEXT);//第三码流
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'rtspbrodcast', 'div_rtsp_broadcast_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'enablemulticast', 'div_rtsp_broadcast_enable_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'multicastaddress', 'div_rtsp_broadcast_address_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'port', 'div_rtsp_broadcast_port_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'ttl', 'div_rtsp_broadcast_ttl_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_RTSP, 'rtspbroadcast', 'div_rtsp_broadcast_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_rtsp_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_rtsp_reset', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_rtsp_save', ITEM_TYPE_VALUE);
  var strenable = translate_page_item(TARGET_PAGE_COMMON, 'enable', '', ITEM_TYPE_NONE);
  var strdisable = translate_page_item(TARGET_PAGE_COMMON, 'disable', '', ITEM_TYPE_NONE);
  input_edit_restriction('input_rtsp_broadcast_port', EDIT_RESTRICTION_NUMBER, 5);
  input_edit_restriction('input_rtsp_broadcast_ttl', EDIT_RESTRICTION_NUMBER, 3);
}
function fun_get_rtsp_parameters() {
  sdk_getipcparam('/action/get?subject=rtsp', function (result) {
    if (result == false) return;
    $xml = $(result);
    var auth = $xml.find('auth').text();
    var active = $xml.find('active').text();
    var port = $xml.find('port').text();
    var addr = $xml.find('addr').text();
    var ttl = $xml.find('ttl').text();
    if (active == 0) {
      $('#input_rtsp_broadcast_port').attr('disabled', 'disabled');
      $('#input_rtsp_broadcast_ttl').attr('disabled', 'disabled');
      ipedit('ipaddr_rtsp_edit').disable(true);
      $('#check_enable_rtsp_broadcast').prop('checked', false);
    } else {
      $('#input_rtsp_broadcast_port').removeAttr('disabled');
      $('#input_rtsp_broadcast_ttl').removeAttr('disabled');
      ipedit('ipaddr_rtsp_edit').disable(false);
      $('#check_enable_rtsp_broadcast').prop('checked', true);
    }
    $('#check_enable_rtsp_auth').prop('checked', auth==1);

    var metdata = $xml.find('metdata').text();
    $('#check_enable_rtsp_metdata').prop('checked', metdata == 1);//metdata

    ipedit('ipaddr_rtsp_edit').setvalue(addr);
    $('#input_rtsp_broadcast_port').val(port);
    $('#input_rtsp_broadcast_ttl').val(ttl);
  });
  // sdk_getipcparam('/action/get?subject=netserv', function (result) {
  //   if (result == false) return;
  //   var rtspport = $(result).find('rtsp').text();
  //   $('#div_rtsp_mainstream_value_text').text('rtsp://' + window.location.hostname + ':' + rtspport + '/live/main');
  //   $('#div_rtsp_substream_value_text').text('rtsp://' + window.location.hostname + ':' + rtspport + '/live/sub');
  // });
  sdk_getipcparam('/action/get?subject=rtspurl&stream=0', function (result) {
    if (result == false) return;
    var url = $(result).find('url').text();
    $('#div_rtsp_mainstream_value_text').text(url);
  });
  sdk_getipcparam('/action/get?subject=rtspurl&stream=1', function (result) {
    if (result == false) return;
    var url = $(result).find('url').text();
    $('#div_rtsp_substream_value_text').text(url);
  });
  
  var stream=parseInt(localStorage.getItem('stream'));
  if (stream>=4) {//若设备支持第三码流，显示其信息
    $('#div_rtsp_thir_stream').css('display', 'block')
    sdk_getipcparam('/action/get?subject=rtspurl&stream=3', function (res) {
      if (res == false) return;
      var url = $(res).find('url').text();
      $('#div_rtsp_thirstream_value_text').text(url);
    });
  }
  if (stream>=5) {//若设备支持第四码流，显示其信息
    $('#div_rtsp_fourth_stream').css('display', 'block')
    sdk_getipcparam('/action/get?subject=rtspurl&stream=4', function (res) {
      if (res == false) return;
      var url = $(res).find('url').text();
      $('#div_rtsp_fourthstream_value_text').text(url);
    });
  }
}
function fun_on_rtsp_refresh() {
  fun_get_rtsp_parameters();
}
function fun_on_rtsp_reset() {
  $('#check_enable_rtsp_auth').prop('checked', true);
  $('#check_enable_rtsp_broadcast').prop('checked', false);
  ipedit('ipaddr_rtsp_edit').setvalue('224.0.0.1');
  $('#input_rtsp_broadcast_port').val('10000');
  $('#input_rtsp_broadcast_ttl').val('64');
  ipedit('ipaddr_rtsp_edit').disable(true);
  $('#input_rtsp_broadcast_port').attr('disabled', 'disabled');
  $('#input_rtsp_broadcast_ttl').attr('disabled', 'disabled');
}
function fun_on_rtsp_save() {
  var auth = $('#check_enable_rtsp_auth').prop('checked') ? 1 : 0;
  var active = $('#check_enable_rtsp_broadcast').prop('checked') ? 1 : 0;
  var metdata = $('#check_enable_rtsp_metdata').prop('checked') ? 1 : 0;//metdata
  var address = ipedit('ipaddr_rtsp_edit').getvalue();
  var port = $('#input_rtsp_broadcast_port').val();
  var ttl = $('#input_rtsp_broadcast_ttl').val();
  function tipsItem(str) {  
    return translate_page_item(TARGET_PAGE_TIPSTEXT, str, '', ITEM_TYPE_NONE);
  }
  var addrarr = address.split('.');
  if (addrarr[0] > 239 || addrarr[1] > 255 || addrarr[2] > 255 || addrarr[3] > 254 || addrarr[0] < 224 || addrarr[3] < 1 || ttl < 64 || ttl > 255 || port < 10000 || port > 50000) {
    parent.fun_show_tips_dialog(tipsItem('errinput'), 0);
    return;
  }
  var targetxml =
    '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<rtsp ver="2.0">' + '<auth>' + auth + '</auth>'+ '<metdata>' + metdata + '</metdata>' + '<mcast>' + '<active>' + active + '</active>' + '<port>' + port + '</port>' + '<addr>' + address + '</addr>' + '<ttl>' + ttl + '</ttl>' + '</mcast>' + '</rtsp>' + '</request>';
    // '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<rtsp ver="2.0">' + '<auth>' + auth + '</auth>' + '<mcast>' + '<active>' + active + '</active>' + '<port>' + port + '</port>' + '<addr>' + address + '</addr>' + '<ttl>' + ttl + '</ttl>' + '</mcast>' + '</rtsp>' + '</request>';
  sdk_setipcparam('/action/set?subject=rtsp', targetxml, function (res) {
    if (res == true) {
      parent.fun_show_tips_dialog(tipsItem('infosave'));
    } else if (res == 400) {
      parent.fun_show_tips_dialog(tipsItem('errrequest'), 0);
    } else if (res == 403) {
      parent.fun_show_tips_dialog(tipsItem('errauthority'), 0);
    } else {
      parent.fun_show_tips_dialog(tipsItem('errset'), 0);
    }
  });
}
