$(window).ready(function () {
  fun_multilang_adapter();
  fun_get_telnet_parameters();
});
function fun_multilang_adapter() {
  translate_page_item(TARGET_PAGE_COMMON, "restore", "button_telnet_restore", ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, "save", "button_telnet_save", ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_telnet_refresh", ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_TIPSTEXT, "check", "div_telnet_enable_name", ITEM_TYPE_TEXT);;
  translate_page_item(TARGET_PAGE_TIPSTEXT, "noteonvif", "div_security_tips_text", ITEM_TYPE_TEXT);
}
var devname, devdatefmt, devtimefmt, devp2penable, devtelnetenable, devlanguage, devonvif;
let rtspJson = {}
function fun_get_telnet_parameters() {
  sdk_getipcparam("/action/get?subject=devpara", function (res) {
    if (res === false) return;
    $xml = $(res);
    devname = $xml.find("name").text();
    devdatefmt = $xml.find("datefmt").text();
    devtimefmt = $xml.find("timefmt").text();
    devp2penable = $xml.find("p2p").text();
    devtelnetenable = $xml.find("telnet").text();
    devlanguage = $xml.find("language").text();
    devonvif = $xml.find("ovfauth").text();

    $("#check_enable_onvif").prop("checked", devonvif == 2);
  });
  sdk_getipcparam('/action/get?subject=rtsp', function (res) {
    if (res == false) return;
    $xml = $(res);
    function returnRes(str) {
      return $xml.find(str).text()
    }
    var auth = returnRes('auth');
    var active = returnRes('active');
    var port = returnRes('port');
    var addr = returnRes('addr');
    var ttl = returnRes('ttl');
    rtspJson = {auth, active, port, addr, ttl }
  })
}
function fun_telnet_refresh() {
  fun_get_telnet_parameters();
}
function fun_telnet_restore() {
  $("#check_enable_onvif").prop("checked", false);
}
function fun_telnet_save() {
  var onvif_enable = $("#check_enable_onvif").prop("checked") ? 2 : 0;
  const showTips = tagStr => {
                var tipStr = translate_page_item(TARGET_PAGE_TIPSTEXT, tagStr, '', ITEM_TYPE_NONE);
                parent.fun_show_tips_dialog(tipStr, tagStr == 'infosave' ? null : 0);
              }
  var targetxml =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<request>' +
        '<rtsp ver="2.0">' +
        '<auth>' + (onvif_enable == 2 ? 1 : 0) + '</auth>' +
        '<mcast>' +
        '<active>' + rtspJson.active + '</active>' +
        '<port>' + rtspJson.port + '</port>' +
        '<addr>' + rtspJson.addr + '</addr>' +
        '<ttl>' + rtspJson.ttl + '</ttl>' +
        '</mcast>' +
        '</rtsp>' +
        '</request>';
      sdk_setipcparam('/action/set?subject=rtsp', targetxml, function (res) {
        if (res == true) {
          // showTips('infosave') 
           var tagxml = `<?xml version="1.0" encoding="utf-8"?> 
              <request>  
              <devpara ver="2.0"> 
                <name>${devname}</name> 
                <datefmt>${devdatefmt}</datefmt> 
                <timefmt>${devdatefmt}</timefmt> 
                <language>${devdatefmt}</language> 
                <p2p>${devp2penable}</p2p> 
                <telnet>${devtelnetenable}</telnet> 
                <ovfauth>${onvif_enable}</ovfauth> 
              </devpara> 
              </request>`;

              

              sdk_setipcparam("/action/set?subject=devpara", tagxml, function (result) {
                if (result == true) {
                   showTips('infosave')
                }
                else if (result == 400) { showTips('errrequest') }
                else if (result == 403) { showTips('errauthority') }
                else showTips('errset')
              });
        }
        else if (res == 400) { showTips('errrequest') }
        else if (res == 403) { showTips('errauthority') }
        else { showTips('errset') }
      });
  
}
