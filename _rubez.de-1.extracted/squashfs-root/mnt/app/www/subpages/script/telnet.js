$(window).ready(function () {
	fun_multilang_adapter();
	fun_register_events();
	fun_get_telnet_parameters();
});
function fun_multilang_adapter() {
	translate_page_item(TARGET_PAGE_COMMON, "restore", "button_telnet_restore", ITEM_TYPE_VALUE);
	translate_page_item(TARGET_PAGE_COMMON, "save", "button_telnet_save", ITEM_TYPE_VALUE);
	translate_page_item(TARGET_PAGE_COMMON, "refresh", "button_telnet_refresh", ITEM_TYPE_VALUE);
	translate_page_item(TARGET_PAGE_COMMON, "enable", "div_telnet_enable_name", ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_TIPSTEXT, "notesecurity","div_security_tips_text",ITEM_TYPE_TEXT);
}
function fun_register_events() {
	$("#button_telnet_refresh").on("click", fun_telnet_refresh);
	$("#button_telnet_restore").on("click", fun_telnet_restore);
	$("#button_telnet_save").on("click", fun_telnet_save);
}
var devname, devdatefmt, devtimefmt, devp2penable, devtelnetenable, devlanguage;
function fun_get_telnet_parameters() {
	sdk_getipcparam("/action/get?subject=devpara", function (result) {
		if (result === false)
			return;
		$xml = $(result);
		devname = $xml.find("name").text();
		devdatefmt = $xml.find("datefmt").text();
		devtimefmt = $xml.find("timefmt").text();
		devp2penable = $xml.find("p2p").text();
		devtelnetenable = $xml.find("telnet").text();
		devlanguage = $xml.find("language").text();
		if (devtelnetenable == 1) {
			$("#check_enable_telent").prop("checked",true);
		} else {
			$("#check_enable_telent").prop("checked",false);
		}
	});
}
function fun_telnet_refresh() {
	fun_get_telnet_parameters();
}
function fun_telnet_restore() {
	$("#check_enable_telent").prop("checked",false);
}
function fun_telnet_save() {
	var telnetenable = $("#check_enable_telent").prop("checked")?1:0;
	var tagxml = '<?xml version="1.0" encoding="utf-8"?>' + '<request>' + '<devpara ver="2.0">' + '<name>' + devname + '</name>' + '<datefmt>' + devdatefmt + '</datefmt>' + '<timefmt>' + devtimefmt + '</timefmt>' + '<language>' + devlanguage + '</language>' + '<p2p>' + devp2penable + '</p2p>' + '<telnet>' + telnetenable + '</telnet>' + '</devpara>' + '</request>';
	var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
	var request = translate_page_item(TARGET_PAGE_TIPSTEXT, "errrequest", "", ITEM_TYPE_NONE);
	var auth = translate_page_item(TARGET_PAGE_TIPSTEXT, "errauthority", "", ITEM_TYPE_NONE);
	var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
	// if (telnetenable == devtelnetenable) {
	// 	parent.fun_show_tips_dialog(strsuc);
	// 	return;
	// }
	sdk_setipcparam("/action/set?subject=devpara", tagxml, function (result) {
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
