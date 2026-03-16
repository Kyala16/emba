$(document).ready(function () {
  fun_multilang_adapter();
  fun_init_pageui();
  fun_register_all_event();
});
var g_dhcpmode;
  function fun_init_pageui() {
    ipedit('ipedit_ipv4_ipaddr');
    ipedit('ipedit_ipv4_submask');
    ipedit('ipedit_ipv4_gateway');
    ipedit('ipedit_ipv4_primarydns');
    ipedit('ipedit_ipv4_secondarydns');
    sdk_getipcparam('/action/get?subject=devability', function (result) {
      if (result == false) return;
     $xml = $(result);
     var featrueab = $xml.find('featrueab').text();
     var netcard = parseInt($xml.find('netcard').text());//

     if (parseInt(featrueab) & 0x40) {
       $('#div_wired_ipv6_address').css('display', 'block');
       $('#div_wired_ipv6_gateway').css('display', 'block');
       $('#div_ipv6_network_setting').css('display', 'block');
     }
     if (netcard == 2) {//????  ???? tcpip  ????
       $('#div_table_tcpip').hide()
      }
    g_dhcpmode = ($xml.find('dhcpmode').text() == 1) ? true : false;//
  });
}
function fun_register_all_event() {
  $('#div_tcpip_setting').css('display', 'none');
  $('#div_table_network_status,#div_table_tcpip').click(function () {
    fun_switch_menu(this.id.toString());
  });
  $('#button_network_refresh,#button_network_save').click(function () {
    if (this.id.toString() == 'button_network_refresh') {
      fun_refresh_network_parameters();
    } else if (this.id.toString() == 'button_network_save') {
      fun_save_network_parameters(true);
    }
  });
  $('#button_tips_confirm,#button_tips_cancel').click(function () {
    if (this.id.toString() == 'button_tips_confirm') {
      fun_show_tips_dialog(false);
      fun_save_network_parameters(false);
    }
    fun_show_tips_dialog(false);
  });
  $('#check_enable_autodns').click(function () {
    fun_ipv4_autonds();
  });
  $('#radio_ipv4_mode_dhcp,#radio_ipv4_mode_static').click(function () {
    fun_ipv4_mode_change();
  });
  $('#radio_ipv6_mode_dhcp,#radio_ipv6_mode_static').click(function () {
    fun_ipv6_mode_change();
  });
  $('#button_network_restore').click(function () {
    fun_restore_network();
  });
  $('#input_ipv4_mtu,#input_ipv6_submask').keydown(function () {
    fun_on_input_keydown(this.id.toString());
  });
  $('#input_ipv4_mtu,#input_ipv6_submask').keyup(function () {
    fun_on_input_keyup(this.id.toString());
  });
  $('input[name="dhcpmode"]').on('click', function () {
    var selectedValue = parseInt($(this).val());
    $('#input_dhcpmode_hostname,#input_dhcpmode_indentifier,#input_dhcpmode_id').prop('disabled', selectedValue == 1 ? false : true);
    $('#div_note_dhcpmode_support').css('display', selectedValue == 1 ? 'block' : 'none');
  });

  fun_get_network_parameters();
}
function fun_ipv6_mode_change() {
  var static = document.getElementById('radio_ipv6_mode_static').checked;
  if (static) {
    $('#input_ipv6_ipaddr,#input_ipv6_gateway,#input_ipv6_submask').removeAttr('disabled');
  } else {
    $('#input_ipv6_ipaddr,#input_ipv6_gateway,#input_ipv6_submask').attr('disabled', 'disabled');
  }
}

function fun_ipv4_autonds() {
  var status = document.getElementById('check_enable_autodns').checked;
  if (status) {
    ipedit('ipedit_ipv4_primarydns').disable(true);
    ipedit('ipedit_ipv4_secondarydns').disable(true);
  } else {
    ipedit('ipedit_ipv4_primarydns').disable(false);
    ipedit('ipedit_ipv4_secondarydns').disable(false);
  }
}

function fun_ipv4_mode_change() {
  var static = document.getElementById('radio_ipv4_mode_static').checked;
  if (static) {
    ipedit('ipedit_ipv4_ipaddr').disable(false);
    ipedit('ipedit_ipv4_submask').disable(false);
    ipedit('ipedit_ipv4_gateway').disable(false);
    ipedit('ipedit_ipv4_primarydns').disable(false);
    ipedit('ipedit_ipv4_secondarydns').disable(false);
    $('#check_enable_autodns').attr('disabled', 'disabled');
  } else {
    if (document.getElementById('check_enable_autodns').checked) {
      ipedit('ipedit_ipv4_primarydns').disable(true);
      ipedit('ipedit_ipv4_secondarydns').disable(true);
    } else {
      ipedit('ipedit_ipv4_primarydns').disable(false);
      ipedit('ipedit_ipv4_secondarydns').disable(false);
    }
    $('#check_enable_autodns').removeAttr('disabled');
    ipedit('ipedit_ipv4_ipaddr').disable(true);
    ipedit('ipedit_ipv4_submask').disable(true);
    ipedit('ipedit_ipv4_gateway').disable(true);
  }
  $('#dhcpmode_content,#dhcpmode_manual_inp_content').css('display', static || !g_dhcpmode ? 'none' : 'block');

   $('#input_dhcpmode_hostname,#input_dhcpmode_indentifier,#input_dhcpmode_id').prop('disabled', $('input[name="dhcpmode"]:checked').val() == '1' ? false : true);
    $('#div_note_dhcpmode_support').css('display', !static && ($('input[name="dhcpmode"]:checked').val() == '1') ? 'block' : 'none');
}
function fun_switch_menu(tableid) {
  $('#' + tableid).addClass('cls_tablebar_item_selected');
  if (tableid == 'div_table_network_status') {
    $('#div_table_tcpip').removeClass('cls_tablebar_item_selected');
    $('#div_network_status').css('display', 'block');
    $('#div_tcpip_setting').css('display', 'none');
  } else if (tableid == 'div_table_tcpip') {
    $('#div_table_network_status').removeClass('cls_tablebar_item_selected');
    $('#div_network_status').css('display', 'none');
    $('#div_tcpip_setting').css('display', 'block');
  }
}
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'networksta', 'div_table_network_status_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'tcpip', 'div_table_tcpip_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'wiredsta', 'div_wired_network_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'wifista', 'div_wifi_network_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipv4addr', 'div_wired_ipv4_address_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipv4mask', 'div_wired_ipv4_subnet_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipv4gateway', 'div_wired_ipv4_gateway_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipv6addr', 'div_wired_ipv6_address_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipv6gateway', 'div_wired_ipv6_gateway_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'domain', 'div_wired_domain_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'primarydns', 'div_wired_primary_dns_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'secondarydns', 'div_wired_second_dns_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ntpserver', 'div_wired_ntpserver_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'wificonnect', 'div_wifi_connection_status_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'wifiipaddr', 'div_wifi_ipaddress_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipv4set', 'div_ipv4_network_setting_title_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipv6set', 'div_ipv6_network_setting_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'mode', 'div_ipv4_network_mode_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'static', 'label_ipv4_mode_static', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'dhcp', 'lable_ipv4_mode_dhcp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipaddr', 'div_ipv4_network_ipaddr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'submask', 'div_ipv4_network_submask_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'gateway', 'div_ipv4_network_gateway_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'primarydns', 'div_ipv4_network_primarydns_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'secondarydns', 'div_ipv4_network_secondarydns_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'mtu', 'div_ipv4_network_mtu_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'mode', 'div_ipv6_network_mode_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'static', 'label_ipv6_mode_static', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'dhcp', 'label_ipv6_mode_dhcp', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'ipaddr', 'div_ipv6_network_ipaddr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'submask', 'div_ipv6_network_submask_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'gateway', 'div_ipv6_network_gateway_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'tcpiptips', 'div_tips_text', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'confirm', 'button_tips_confirm', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'cancel', 'button_tips_cancel', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'refresh', 'button_network_refresh', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'save', 'button_network_save', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, 'restore', 'button_network_restore', ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'networktype', 'div_ipv4_network_type_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_DDNS, 'autodns', 'lable_ddns_mode_auto', ITEM_TYPE_TEXT);
 
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'dhcpmode', 'div_dhcpmode_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'manualatips', 'pnote_dhcpmode_support', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'hosename', 'div_dhcpmode_hostname_ipaddr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'indentifie', 'div_dhcpmode_indentifier_ipaddr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_TCPIP, 'classid', 'div_dhcpmode_id_ipaddr_name', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON, 'default', 'lable_ipv4_dhcpmode_default', ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_WIRELESS, 'manual', 'label_ipv4_dhcpmode_manual', ITEM_TYPE_TEXT);
  
  var autotype = translate_page_item(TARGET_PAGE_COMMON, 'auto', 'div_autodns_enable_name', ITEM_TYPE_NONE);
  var tenhalf = translate_page_item(TARGET_PAGE_SUB_TCPIP, 'tenmilhalf', '', ITEM_TYPE_NONE);
  var tenfull = translate_page_item(TARGET_PAGE_SUB_TCPIP, 'tenmilfull', '', ITEM_TYPE_NONE);
  var humhalf = translate_page_item(TARGET_PAGE_SUB_TCPIP, 'hunmilhalf', '', ITEM_TYPE_NONE);
  var humfull = translate_page_item(TARGET_PAGE_SUB_TCPIP, 'hummilfull', '', ITEM_TYPE_NONE);
  $('#select_ipv4_type option').each(function (i, n) {
    if (i == 0) {
      $(n).text(autotype);
    } else if (i == 1) {
      $(n).text(tenhalf);
    } else if (i == 2) {
      $(n).text(tenfull);
    } else if (i == 3) {
      $(n).text(humhalf);
    } else if (i == 4) {
      $(n).text(humfull);
    }
  });
}
var g_ipv4_ipaddress = '';
var g_ipv4_mode = 0;
var g_auto_dns = 0;
var g_ipv6_ipaddress = '';
var g_ipv6_mode = 0;
var g_ipv6_supported = false;
var g_network_protocol = 0;
function fun_get_network_parameters() {
  sdk_getipcparam('/action/get?subject=netstat&adapter=0', function (result) {
    if (result != false) {
      $xml = $(result);
      var ipv4addr = $xml.find('ipv4').children('ip').text();
      var ipv4mode = $xml.find('ipv4').children('mode').text();
      var autodns = $xml.find('autodns').text();
      var ipv4submask = $xml.find('ipv4').children('mask').text();
      var ipv4gateway = $xml.find('ipv4').children('gateway').text();
      var ipv4primarydns = $xml.find('ipv4').children('dns').first().text();
      var ipv4secondarydns = $xml.find('ipv4').children('dns').next().text();
      var ipv4mtu = $xml.find('mtu').text();
      var ipv6mode = $xml.find('ipv6').children('mode').text();
      var ipv6ipaddr = $xml.find('ipv6').children('ip').text();
      var ipv6prefix = $xml.find('ipv6').children('prefixlen').text();
      var ipv6gateway = $xml.find('ipv6').children('gateway').text();
      var ipv4type = $xml.find('type').text();
      var protocol = $xml.find('proto').text();
      if (isNaN(ipv6mode) || ipv6mode.length <= 0) {
        g_ipv6_supported = false;
        $('#radio_ipv6_mode_dhcp,#radio_ipv6_mode_static,#input_ipv6_gateway,#input_ipv6_ipaddr,#input_ipv6_submask').attr('disabled', 'disabled');
      } else {
        g_ipv6_supported = true;
        $('#radio_ipv6_mode_dhcp,#radio_ipv6_mode_static,#input_ipv6_gateway,#input_ipv6_ipaddr,#input_ipv6_submask').removeAttr('disabled');
      }
      g_ipv4_ipaddress = ipv4addr;
      g_ipv4_mode = ipv4mode;
      g_auto_dns = autodns;
      g_ipv6_ipaddress = ipv6ipaddr;
      g_ipv6_mode = ipv6mode;
      g_network_protocol = protocol;
      if (protocol == 3) {
        $('#p_tcpip_mtu_range').text('[1280-1500]');
      }
      if (autodns == 0) {
        $('#check_enable_autodns').prop('checked', false);
      } else {
        $('#check_enable_autodns').prop('checked', true);
      }

      if (ipv4mode == 0) {
        //------------------
        document.getElementById('radio_ipv4_mode_static').checked = true;
        $('#check_enable_autodns').attr('disabled', 'disabled');
      } else {
        document.getElementById('radio_ipv4_mode_dhcp').checked = true;
        ipedit('ipedit_ipv4_ipaddr').disable(true);
        ipedit('ipedit_ipv4_submask').disable(true);
        ipedit('ipedit_ipv4_gateway').disable(true);
        if (autodns == 0) {
          ipedit('ipedit_ipv4_primarydns').disable(false);
          ipedit('ipedit_ipv4_secondarydns').disable(false);
        } else {
          ipedit('ipedit_ipv4_primarydns').disable(true);
          ipedit('ipedit_ipv4_secondarydns').disable(true);
        }

        $('#check_enable_autodns').removeAttr('disabled');
      }

      // ===================DHCP MODE==============================
      var dhcpmode = parseInt($xml.find('dhcpmode').text());
      $('input[name="dhcpmode"][value="' + dhcpmode + '"]').prop('checked', true);

      $('#dhcpmode_content,#dhcpmode_manual_inp_content').css('display', ipv4mode == 1 && g_dhcpmode ? 'block' : 'none');
  
       $('#input_dhcpmode_hostname,#input_dhcpmode_indentifier,#input_dhcpmode_id').prop('disabled', dhcpmode == 1 && ipv4mode == 1 ? false : true);
      $('#div_note_dhcpmode_support').css('display', dhcpmode == 1 && ipv4mode == 1 && g_dhcpmode ? 'block' : 'none');
      var dhcphname = $xml.find('dhcphname').text();
      var dhcpclass = $xml.find('dhcpclass').text();
      var dhcpuser = $xml.find('dhcpuser').text();
      $('#input_dhcpmode_hostname').val(dhcphname)
      $('#input_dhcpmode_indentifier').val(dhcpclass)
      $('#input_dhcpmode_id').val(dhcpuser)
      // ===================DHCP MODE==============================

      if (ipv6mode == 0) {
        document.getElementById('radio_ipv6_mode_static').checked = true;
      } else {
        document.getElementById('radio_ipv6_mode_dhcp').checked = true;
      }
      document.getElementById('div_wired_ipv4_address_value').innerText = ipv4addr;
      document.getElementById('div_wired_ipv4_subnet_value').innerText = ipv4submask;
      document.getElementById('div_wired_ipv4_gateway_value').innerText = ipv4gateway;
      document.getElementById('div_wired_ipv6_address_value').innerText = ipv6ipaddr;
      document.getElementById('div_wired_ipv6_gateway_value').innerText = ipv6gateway;
      document.getElementById('div_wired_primary_dns_value').innerText = ipv4primarydns;
      document.getElementById('div_wired_second_dns_value').innerText = ipv4secondarydns;
      ipedit('ipedit_ipv4_ipaddr').setvalue(ipv4addr);
      ipedit('ipedit_ipv4_submask').setvalue(ipv4submask);
      ipedit('ipedit_ipv4_gateway').setvalue(ipv4gateway);
      ipedit('ipedit_ipv4_primarydns').setvalue(ipv4primarydns);
      ipedit('ipedit_ipv4_secondarydns').setvalue(ipv4secondarydns);
      document.getElementById('input_ipv4_mtu').value = ipv4mtu;
      document.getElementById('input_ipv6_ipaddr').value = ipv6ipaddr;
      document.getElementById('input_ipv6_submask').value = ipv6prefix;
      document.getElementById('input_ipv6_gateway').value = ipv6gateway;
      $('#select_ipv4_type').val(ipv4type);
    }
  });
  sdk_getipcparam('/action/get?subject=systime', function (result) {
    if (result != false) {
      $xml = $(result);
      var ntpserver = $xml.find('ntp').children('host').text();
      document.getElementById('div_wired_ntpserver_value').innerText = ntpserver;
    }
  });
  sdk_getipcparam('/action/get?subject=netstat&adapter=1', function (result) {
    if (result != false) {
      $xml = $(result);
      var linkstatus = $xml.find('link').text();
      var ipaddr = $xml.find('ipv4').children('ip').text();
      var strconnected = translate_page_item(TARGET_PAGE_COMMON, 'connected', '', ITEM_TYPE_NONE);
      var disconnected = translate_page_item(TARGET_PAGE_COMMON, 'disconnected', '', ITEM_TYPE_NONE);
      if (ipaddr.length <= 0) {
        document.getElementById('div_wifi_connection_status_value').innerText = disconnected;
      } else {
        document.getElementById('div_wifi_connection_status_value').innerText = strconnected;
      }
      document.getElementById('div_wifi_ipaddress_value').innerText = ipaddr;
    }
  });
}
function fun_refresh_network_parameters() {
  fun_get_network_parameters();
}
function fun_restore_network() {
  document.getElementById('radio_ipv4_mode_dhcp').checked = true;
  document.getElementById('radio_ipv6_mode_dhcp').checked = true;
  $('#check_enable_autodns').prop('checked', true);
  $('#check_enable_autodns').removeAttr('disabled');
  ipedit('ipedit_ipv4_ipaddr').setvalue('192.168.1.120');
  ipedit('ipedit_ipv4_submask').setvalue('255.255.255.0');
  ipedit('ipedit_ipv4_gateway').setvalue('192.168.1.1');
  ipedit('ipedit_ipv4_primarydns').setvalue('192.168.1.1');
  ipedit('ipedit_ipv4_secondarydns').setvalue('223.6.6.6');
  $('#input_ipv4_mtu').val('1500');
  $('#select_ipv4_type').val(0);
  ipedit('ipedit_ipv4_ipaddr').disable(true);
  ipedit('ipedit_ipv4_submask').disable(true);
  ipedit('ipedit_ipv4_gateway').disable(true);
  ipedit('ipedit_ipv4_primarydns').disable(true);
  ipedit('ipedit_ipv4_secondarydns').disable(true);
  var static = document.getElementById('radio_ipv4_mode_static').checked;
  $('#dhcpmode_content').css('display', static ? 'none' : 'block');

  sdk_getipcparam('/action/get?subject=devpara', function (res) {
    if (res == false) return;
    $xml = $(res);
    var ipcname = $xml.find('name').text();
    $('#input_dhcpmode_hostname').val(ipcname);
  })
  $('#input_dhcpmode_indentifier').val('IPC');
  $('#input_dhcpmode_id').val('IPC');
}
function fun_check_submask(ipmask) {
  var iplist = ipmask.split('.');
  if (iplist.length != 4) return false;
  var ip1 = parseInt(iplist[0]);
  var ip2 = parseInt(iplist[1]);
  var ip3 = parseInt(iplist[2]);
  var ip4 = parseInt(iplist[3]);
  if (ip1 <= 0) return false;
  if (ip2 > 0 && ip1 != 255) return false;
  if (ip3 > 0 && ip2 != 255) return false;
  if (ip4 > 0 && ip3 != 255) return false;
  if (ip1 != 128 && ip1 != 192 && ip1 != 224 && ip1 != 240 && ip1 != 248 && ip1 != 252 && ip1 != 254 && ip1 != 255) {
    return false;
  }
  if (ip2 != 128 && ip2 != 192 && ip2 != 224 && ip2 != 240 && ip2 != 248 && ip2 != 252 && ip2 != 254 && ip2 != 255 && ip2 != 0) {
    return false;
  }
  if (ip3 != 128 && ip3 != 192 && ip3 != 224 && ip3 != 240 && ip3 != 248 && ip3 != 252 && ip3 != 254 && ip3 != 255 && ip3 != 0) {
    return false;
  }
  if (ip4 != 128 && ip4 != 192 && ip4 != 224 && ip4 != 240 && ip4 != 248 && ip4 != 252 && ip4 != 254 && ip4 != 255 && ip4 != 0) {
    return false;
  }
  return true;
}
function fun_check_ipaddr(ipaddr) {
  var iplist = ipaddr.split('.');
  if (iplist.length != 4) return false;
  var ip1 = parseInt(iplist[0]);
  var ip2 = parseInt(iplist[1]);
  var ip3 = parseInt(iplist[2]);
  var ip4 = parseInt(iplist[3]);
  if ((ip1 == 0 && ip2 == 0 && ip3 == 0 && ip4 == 0) || (ip1 == 255 && ip2 == 255 && ip3 == 255 && ip4 == 255)) {
    return false;
  }
  if (!(ip1 <= 255 && ip1 >= 0) || !(ip2 <= 255 && ip2 >= 0) || !(ip3 <= 255 && ip3 >= 0) || !(ip4 <= 255 && ip4 >= 0)) {
    return false;
  }
  return true;
}
function fun_check_ipv6addr(ipv6addr) {
  if (ipv6addr == '' || ipv6addr == '::') {
    return true;
  }
  var ipv6list = ipv6addr.split(':');
  if (ipv6list.length < 3 || (ipv6list[ipv6list.length - 1] == '' && ipv6list.length > 0)) {
    return false;
  }
  var regext1 = /[a-fA-F0-9]{1}/;
  var regext2 = /[a-fA-F0-9]{2}/;
  var regext3 = /[a-fA-F0-9]{3}/;
  var regext4 = /[a-fA-F0-9]{4}/;
  for (var i = 0; i < ipv6list.length; i++) {
    if (ipv6list[i] != '') {
      if (ipv6list[i].length == 1) {
        if (ipv6list[i].search(regext1) != 0) {
          return false;
        }
      } else if (ipv6list[i].length == 2) {
        if (ipv6list[i].search(regext2) != 0) {
          return false;
        }
      } else if (ipv6list[i].length == 3) {
        if (ipv6list[i].search(regext3) != 0) {
          return false;
        }
      } else if (ipv6list[i].length == 4) {
        if (ipv6list[i].search(regext4) != 0) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
}
function fun_bitwiseor_ipaddr(ipaddr1, ipaddr2) {
  var listip1 = ipaddr1.split('.');
  var listip2 = ipaddr2.split('.');
  if (listip1.length != 4 || listip2.length != 4) {
    return;
  }
  return {
    sec1: parseInt(listip1[0]) & parseInt(listip2[0]),
    sec2: parseInt(listip1[1]) & parseInt(listip2[1]),
    sec3: parseInt(listip1[2]) & parseInt(listip2[2]),
    sec4: parseInt(listip1[3]) & parseInt(listip2[3])
  };
}
function fun_check_ipv6_parameters(ipaddr, mask, gateway) {
  var nmask = parseInt(mask);
  if (!(nmask > 0 && nmask < 128) || ipaddr == gateway) {
    return false;
  }
  var listip = ipaddr.split(':');
  var listgw = gateway.split(':');
  if (ipaddr.indexOf('::') >= 0) {
    var len = listip.length;
    var tempobj = new Array();
    for (val in listip) {
      if (listip[val] !== '') {
        tempobj.push(listip[val]);
      } else {
        for (var i = 0; i < 9 - len; i++) {
          tempobj.push('0');
        }
      }
    }
    listip = tempobj;
  }
  if (gateway.indexOf('::') >= 0) {
    var len = listgw.length;
    var tempobj = new Array();
    for (val in listgw) {
      if (listgw[val] !== '') {
        tempobj.push(listgw[val]);
      } else {
        for (var i = 0; i < 9 - len; i++) {
          tempobj.push('0');
        }
      }
    }
    listgw = tempobj;
  }
  var nscnt = Math.floor(nmask / 16);
  var i = 0;
  for (i = 0; i < nscnt; i++) {
    if (listip[i] != listgw[i]) {
      return false;
    }
  }
  if (nmask % 16 == 0) {
    return true;
  }
  if (listip[i] == listgw[i]) {
    return true;
  } else {
    var remask = nmask % 16;
    var tagmask = 0;
    for (var k = 0; k < remask; k++) {
      tagmask += 1 << (15 - k);
    }
    var nscip = parseInt(listip[i], 16);
    var nscgw = parseInt(listgw[i], 16);
    if ((nscip & tagmask) === (nscgw & tagmask)) {
      return true;
    }
  }
  return false;
}

function fun_save_network_parameters(bcheck) {
  var ipv4mode, ipv4ip, ipv4submask, ipv4gateway, ipv4dns1, ipv4type, ipv4dns2, ipv4mtu, ipv6mode, ipv6ip, ipv6submask, ipv6gateway, autodns;
  if (document.getElementById('radio_ipv4_mode_static').checked) {
    ipv4mode = 0;
  } else {
    ipv4mode = 1;
  }
  if (document.getElementById('radio_ipv6_mode_static').checked) {
    ipv6mode = 0;
  } else {
    ipv6mode = 1;
  }

  if (document.getElementById('check_enable_autodns').checked) {
    autodns = 1;
  } else {
    autodns = 0;
  }

  ipv4ip = ipedit('ipedit_ipv4_ipaddr').getvalue();
  ipv4submask = ipedit('ipedit_ipv4_submask').getvalue();
  ipv4gateway = ipedit('ipedit_ipv4_gateway').getvalue();
  ipv4dns1 = ipedit('ipedit_ipv4_primarydns').getvalue();
  ipv4dns2 = ipedit('ipedit_ipv4_secondarydns').getvalue();
  ipv4type = $('#select_ipv4_type').val();
  ipv4mtu = document.getElementById('input_ipv4_mtu').value;
  ipv6ip = document.getElementById('input_ipv6_ipaddr').value;
  ipv6submask = document.getElementById('input_ipv6_submask').value;
  ipv6gateway = document.getElementById('input_ipv6_gateway').value;
  var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
  if (!fun_check_ipv4dns(ipv4dns1, ipv4dns2)) {
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  if (ipv4mtu < 1280 || ipv4mtu > 1500) {
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  if (bcheck) {
    if (ipv4ip != g_ipv4_ipaddress || ipv4mode != g_ipv4_mode || ipv6ip != g_ipv6_ipaddress || (ipv6mode != g_ipv6_mode) | (autodns != g_auto_dns)) {
      if (ipv6ip != g_ipv6_ipaddress || ipv6mode != g_ipv6_mode) {
        g_network_protocol = 3;
      } else {
        g_network_protocol = 1;
      }
      fun_show_tips_dialog(true);
      return;
    }
  }
  ipv6submask = parseInt(ipv6submask);
  var bshowwarning = false;
  if ((isNaN(ipv6submask) || ipv6submask <= 0 || ipv6submask >= 128) && g_ipv6_supported) {
    if (!(ipv6ip == '' || ipv6ip == '::') && !(ipv6gateway == '' || ipv6gateway == '::')) {
      bshowwarning = true;
    }
  }
  if (!fun_check_ipaddr(ipv4ip) || !fun_check_ipaddr(ipv4gateway) || !fun_check_submask(ipv4submask) || !fun_check_ipv6addr(ipv6gateway) || !fun_check_ipv6addr(ipv6ip) || ipv4gateway == ipv4ip || (ipv6ip == ipv6gateway && ipv6ip != '' && ipv6ip != '::' && g_ipv6_supported)) {
    bshowwarning = true;
  }
  var maskmatch1 = fun_bitwiseor_ipaddr(ipv4ip, ipv4submask);
  var maskmatch2 = fun_bitwiseor_ipaddr(ipv4gateway, ipv4submask);
  if (maskmatch1.sec1 != maskmatch2.sec1 || maskmatch1.sec2 != maskmatch2.sec2 || maskmatch1.sec3 != maskmatch2.sec3 || maskmatch1.sec4 != maskmatch2.sec4) {
    bshowwarning = true;
  }
  if (!fun_check_ipaddr(ipv4dns1) && ipv4dns1.length > 3) {
    bshowwarning = true;
  }
  if (!fun_check_ipaddr(ipv4dns2) && ipv4dns2.length > 3) {
    bshowwarning = true;
  }
  if (((ipv4mtu < 500 || ipv4mtu > 1500) && g_network_protocol == 2) || ((ipv4mtu < 1280 || ipv4mtu > 1500) && g_network_protocol == 3) || bshowwarning) {
    var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
    parent.fun_show_tips_dialog(strerrinput, 0);
    return;
  }
  var bsetipv6 = true;
  if (!g_ipv6_supported) {
    ipv6mode = '';
    ipv6gateway = '';
    ipv6ip = '';
    ipv6submask = '';
    bsetipv6 = false;
  } else {
    if (isNaN(parseInt(ipv6submask))) {
      ipv6submask = '';
      bsetipv6 = false;
    }
    if (ipv6ip.length <= 0) {
      ipv6ip = '';
      bsetipv6 = false;
    }
    if (ipv6gateway.length <= 0) {
      ipv6gateway = '';
      bsetipv6 = false;
    }
    if (isNaN(ipv6mode)) {
      ipv6mode = '';
      bsetipv6 = false;
    }
  }
  if (ipv6submask == '' || ipv6ip == '' || ipv6gateway == '' || ipv6ip == '::' || ipv6gateway == '::') {
    bsetipv6 = false;
    if ((g_ipv6_ipaddress != '::' && ipv6ip == '::') || (g_ipv6_ipaddress != '::' && ipv6gateway == '::') || ipv6ip == '' || ipv6gateway == '') {
      var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      parent.fun_show_tips_dialog(strerrinput, 0);
      return;
    }
  }
  if (bsetipv6) {
    if (!fun_check_ipv6_parameters(ipv6ip, ipv6submask, ipv6gateway)) {
      var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      parent.fun_show_tips_dialog(strerrinput, 0);
      return;
    }
  }
  if (ipv6ip.indexOf('::') >= 0) {
    if (ipv6gateway.indexOf('::') < 0) {
      var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      parent.fun_show_tips_dialog(strerrinput, 0);
      return;
    }
  }
  if (ipv6gateway.indexOf('::') >= 0) {
    if (ipv6ip.indexOf('::') < 0) {
      var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      parent.fun_show_tips_dialog(strerrinput, 0);
      return;
    }
  }
  var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, 'infosave', '', ITEM_TYPE_NONE);
  var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errset', '', ITEM_TYPE_NONE);
  var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errauthority', '', ITEM_TYPE_NONE);
  var request = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errrequest', '', ITEM_TYPE_NONE);
  if (bsetipv6) {
    g_network_protocol = 3;
  } else {
    g_network_protocol = 1;
  }
  // ===========dhcp mode==value=======================================
  var dhcpmode = $('input[name="dhcpmode"]:checked').val();
  var dhcphname = $('#input_dhcpmode_hostname').val();
  var dhcpclass = $('#input_dhcpmode_indentifier').val();
  var dhcpuser = $('#input_dhcpmode_id').val();
  if (dhcpmode == '1') {
    if (dhcphname.trim() === "" || dhcpclass.trim() === "" || dhcpuser.trim() === "") {//�ֶ��� ������ ��input
      var strerrinput = translate_page_item(TARGET_PAGE_TIPSTEXT, 'errinput', '', ITEM_TYPE_NONE);
      parent.fun_show_tips_dialog(strerrinput, 0);
      return;
    }
  }
  // ===========dhcp mode===value======================================
  var tagetxml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<request>' +
    '<network ver="2.0">' +
    '<mtu>' +
    ipv4mtu +
    '</mtu>' +
    '<type>' +
    ipv4type +
    '</type>' +
    '<proto>' +
    g_network_protocol +
    '</proto>' +
    '<autodns>' +
    autodns +
    '</autodns>' +
    // ===========dhcp mode===================
    '   <dhcpmode>' + dhcpmode + '</dhcpmode>\n' +
    '   <dhcphname>' + dhcphname + '</dhcphname>\n' +
    '   <dhcpclass>' + dhcpclass + '</dhcpclass>\n' +
    '   <dhcpuser>' + dhcpuser + '</dhcpuser>\n' +
    // ===========dhcp mode===================
    '<ipv4>' +
    '<mode>' +
    ipv4mode +
    '</mode>' +
    '<ip>' +
    ipv4ip +
    '</ip>' +
    '<mask>' +
    ipv4submask +
    '</mask>' +
    '<gateway>' +
    ipv4gateway +
    '</gateway>' +
    '<dns>' +
    ipv4dns1 +
    '</dns>' +
    '<dns>' +
    ipv4dns2 +
    '</dns>' +
    '</ipv4>' +
    '<ipv6>' +
    '<mode>' +
    ipv6mode +
    '</mode>' +
    '<ip>' +
    ipv6ip +
    '</ip>' +
    '<prefixlen>' +
    ipv6submask +
    '</prefixlen>' +
    '<gateway>' +
    ipv6gateway +
    '</gateway>' +
    '</ipv6>' +
    '</network>' +
    '</request>';
  sdk_setipcparam('/action/set?subject=network&adapter=0', tagetxml, function (result) {
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
  if (ipv4mode == 0 && ipv4ip != g_ipv4_ipaddress) {
    parent.fun_toTagetpage('http://' + ipv4ip + '/login.html');
  }
}
function fun_show_tips_dialog(bshow) {
  if (bshow) {
    $('#div_tips_dialog').dialog({ modal: true, title: '', width: 373, height: 212, resizable: false });
  } else {
    $('#div_tips_dialog').dialog('destroy');
  }
}
function fun_check_ipv4dns(ipv4dns1, ipv4dns2) {
  var dns1 = ipv4dns1.split('.');
  var dns2 = ipv4dns2.split('.');
  for (var i = 0; i <= 3; i++) {
    if (dns1.length - i == '' || dns2.length - i == '') {
      return false;
    }
    return true;
  }
}
function fun_on_input_keydown(objid) {
  var event = arguments.callee.caller.arguments[0] || window.event;
  if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) && event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 17 && event.keyCode != 67 && event.keyCode != 37 && event.keyCode != 39) {
    event.returnValue = false;
    event.preventDefault();
    return false;
  }
}
function fun_on_input_keyup(objid) {
  var cruval = parseInt($('#' + objid).val());
  if (!cruval) {
    $('#' + objid).val('');
  } else {
    $('#' + objid).val(cruval.toString());
  }
}
