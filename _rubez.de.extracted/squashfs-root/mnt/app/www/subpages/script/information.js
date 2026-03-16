$(document).ready(function () {
    fun_multilang_adapter();
    fun_getsystem_parameters();
});
var g_ipc_date,g_ipc_time,g_ipc_runtime;
var g_devdate_format = 0,g_devtime_format = 0;
function fun_getsystem_parameters() {
    sdk_getipcparam("/action/get?subject=devpara",function (val) {
        if(val != false){
            $xml = $(val);
            var devname = $xml.find("name").text();
            var datefmt = $xml.find("datefmt").text();
            if(datefmt.length > 0){
                $("#sel_date_format").val(datefmt);
            }
            g_devdate_format = datefmt;
            var timefmt = $xml.find("timefmt").text();
            if(timefmt.length > 0){
                $("#sel_time_format").val(timefmt);
            }
            g_devtime_format = timefmt;
        }
    });
    sdk_getipcparam("/action/get?subject=devinfo",function (result) {
        $xml = $(result);
        var softver = $xml.find("softver").text();
        var onvifver = $xml.find("onvifver").text();
        var hardver = $xml.find("hardver").text();
        var seqno   = $xml.find("seqno").text();
        $("#div_system_overview_item_firmware_value").text(softver);
        $("#div_system_overview_item_hardware_value").text(hardver);
        $("#div_system_overview_item_onvif_value").text(onvifver);
        $("#div_system_overview_item_sn_value").text(seqno);
    });
	sdk_getipcparam('/action/get?subject=devability', function (res) {
		if (res == false) return;
		$xml = $(res);
		var netcard = parseInt($xml.find('netcard').text());

		var adapter = 0;
		if (netcard & (1 << 0)) {//有线
			adapter = 0
		}
		if ((netcard & (1 << 1)&&netcard!=3) || netcard == 2) {//����
			adapter = 1
		}
		//   if (netcard == 2) adapter = 1


		sdk_getipcparam("/action/get?subject=network&adapter=" + adapter, function (result) {
			$xml = $(result);
			var macaddr = $xml.find("mac").text();
			var ipaddr = $xml.find("ipv4").children("ip").text();
			$("#div_system_overview_item_mac_value").text(macaddr);
			$("#div_system_overview_item_ip_value").text(ipaddr);
		});
	})
    sdk_getipcparam("/action/get?subject=systime",function (result) {
        $xml = $(result);
        var datetime = $xml.find("datetime").text();
        g_ipc_date = datetime.split('T')[0];
        var arrtime = datetime.split('T')[1].split(':');
        g_ipc_time = parseInt(arrtime[0])*3600 + parseInt(arrtime[1])*60 + parseInt(arrtime[2]);
        $("#div_system_overview_item_datetime_value").text(datetime);
        var timemode = $xml.find("mode").text();
        var strmanual = translate_page_item(TARGET_PAGE_SUB_INFORMATION,"timemanual","",ITEM_TYPE_NONE);
        var strsyncntp = translate_page_item(TARGET_PAGE_SUB_INFORMATION,"timesyncntp","",ITEM_TYPE_NONE);
        if(timemode == "0"){
            $("#div_system_overview_item_timemode_value").text(strmanual);
        }else{
            $("#div_system_overview_item_timemode_value").text(strsyncntp);
        }
        fun_sync_parameter();
    });
    sdk_getipcparam("/action/get?subject=sysstatus",function (result) {
        $xml = $(result);
        var uptime = $xml.find("uptime").text();
        var cpuload = $xml.find("cpu").text();
        $("#div_system_overview_item_cpuload_value").text(cpuload+"%");
        var hours = parseInt(uptime)/3600;
        var minutes = (parseInt(uptime)%3600)/60;
        var seconds = parseInt(uptime)%60;
        g_ipc_runtime= parseInt(uptime);
        $("#div_system_overview_item_uptime_value").text(parseInt(hours)+":"+parseInt(minutes)+":"+parseInt(seconds));
        var strenabled  = translate_page_item(TARGET_PAGE_COMMON,"enabled" ,"",ITEM_TYPE_NONE);
        var strdisabled = translate_page_item(TARGET_PAGE_COMMON,"disabled","",ITEM_TYPE_NONE);
        var enabled = $xml.find("video").text();
        if(enabled == "1"){
            $("#div_system_status_item_video_value").text(strenabled);
        }else{
            $("#div_system_status_item_video_value").text(strdisabled);
        }
        enabled = $xml.find("audio").text();
        if(enabled == "1"){
            $("#div_system_status_item_audio_value").text(strenabled);
        }else{
            $("#div_system_status_item_audio_value").text(strdisabled);
        }
        enabled = $xml.find("ftp").text();
        if(enabled == "1"){
            $("#div_system_status_item_ftp_value").text(strenabled);
        }else{
            $("#div_system_status_item_ftp_value").text(strdisabled);
        }
        enabled = $xml.find("upnp").text();
        if(enabled == "1"){
            $("#div_system_status_item_upnp_value").text(strenabled);
        }else{
            $("#div_system_status_item_upnp_value").text(strdisabled);
        }
        enabled = $xml.find("rtsp").text();
        if(enabled == "1"){
            $("#div_system_status_item_rtsp_value").text(strenabled);
        }else{
            $("#div_system_status_item_rtsp_value").text(strdisabled);
        }
        enabled = $xml.find("record").text();
        if(enabled == "1"){
            $("#div_system_status_item_recording_value").text(strenabled);
        }else{
            $("#div_system_status_item_recording_value").text(strdisabled);
        }
        enabled = $xml.find("snap").text();
        if(enabled == "1"){
            $("#div_system_status_item_snapshot_value").text(strenabled);
        }else{
            $("#div_system_status_item_snapshot_value").text(strdisabled);
        }
        enabled = $xml.find("tcp").text();
        if(enabled == "1"){
            $("#div_system_status_item_tcp_value").text(strenabled);
        }else{
            $("#div_system_status_item_tcp_value").text(strdisabled);
        }
        enabled = $xml.find("ddns").text();
        if(enabled == "1"){
            $("#div_system_status_item_ddns_value").text(strenabled);
        }else{
            $("#div_system_status_item_ddns_value").text(strdisabled);
        }
        enabled = $xml.find("onvif").text();
        if(enabled == "1"){
            $("#div_system_status_item_onvif_value").text(strenabled);
        }else{
            $("#div_system_status_item_onvif_value").text(strdisabled);
        }
    });
}

function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "sysinfo", "div_table_information_text", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "sysoverview", "div_system_overview_title_text", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "sysstatus", "div_system_status_title_text", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "firmver", "div_system_overview_item_firmware_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "hardver", "div_system_overview_item_hardware_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "onvifver", "div_system_overview_item_onvif_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "mac", "div_system_overview_item_mac_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "sn", "div_system_overview_item_sn_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "ipaddr", "div_system_overview_item_ip_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "datetime", "div_system_overview_item_datetime_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "uptime", "div_system_overview_item_uptime_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "timemode", "div_system_overview_item_timemode_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "cpu", "div_system_overview_item_cpuload_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "video", "div_system_status_item_video_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "audio", "div_system_status_item_audio_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "ftp", "div_system_status_item_ftp_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "upnp", "div_system_status_item_upnp_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "rtsp", "div_system_status_item_rtsp_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "recording", "div_system_status_item_recording_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "snapshot", "div_system_status_item_snapshot_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "tcp", "div_system_status_item_tcp_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "ddns", "div_system_status_item_ddns_name", ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_INFORMATION, "onvif", "div_system_status_item_onvif_name", ITEM_TYPE_TEXT);
  if (current_language_number() == 25) {
    $("#div_table_information").css("width", 260);
  }
  if (current_language_number() == 25) {
    $("#div_table_information").css("width", 160);
  }
}

function fun_sync_parameter() {
  sdk_getipcparam("/action/get?subject=sysstatus", function (result) {
    $xml = $(result);
    var cpuload = $xml.find("cpu").text();
    $("#div_system_overview_item_cpuload_value").text(cpuload + "%");
  });
  g_ipc_runtime++;
  var runtimehour = parseInt(g_ipc_runtime / 3600);
  var runtimeminu = parseInt((g_ipc_runtime % 3600) / 60);
  var runtimeseco = parseInt(g_ipc_runtime % 60);
  $("#div_system_overview_item_uptime_value").text(runtimehour + ":" + runtimeminu + ":" + runtimeseco);
  g_ipc_time++;
  runtimehour = parseInt(g_ipc_time / 3600);
  runtimeminu = parseInt((g_ipc_time % 3600) / 60);
  runtimeseco = parseInt(g_ipc_time % 60);
  var strhour, strminute, strsecond;
  if (runtimeminu > 9) {
    strminute = String(runtimeminu);
  } else {
    strminute = "0" + String(runtimeminu);
  }
  if (runtimeseco > 9) {
    strsecond = String(runtimeseco);
  } else {
    strsecond = "0" + String(runtimeseco);
  }
  if (runtimehour > 9) {
    strhour = String(runtimehour);
  } else {
    strhour = "0" + String(runtimehour);
  }
  var stripcdate = "",
    stripctime = "";
  if (g_devdate_format == 0) {
    stripcdate = g_ipc_date;
  } else if (g_devdate_format == 1) {
    var datearr = g_ipc_date.split('-');
    stripcdate = datearr[1] + "-" + datearr[2] + "-" + datearr[0];
  } else if (g_devdate_format == 2) {
    var datearr = g_ipc_date.split('-');
    stripcdate = datearr[2] + "-" + datearr[1] + "-" + datearr[0];
  }
  if (g_devtime_format == 0) {
    stripctime = strhour + ":" + strminute + ":" + strsecond;
  } else {
    if (runtimehour >= 12) {
      if (runtimehour - 12 > 9) {
        strhour = String(runtimehour - 12);
      } else {
        strhour = "0" + String(runtimehour - 12);
      }
      stripctime = strhour + ":" + strminute + ":" + strsecond + " PM";
    } else {
      stripctime = strhour + ":" + strminute + ":" + strsecond + " AM";
    }
  }
  $("#div_system_overview_item_datetime_value").text(stripcdate + " T " + stripctime);
  setTimeout(fun_sync_parameter, 1000);
}