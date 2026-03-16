var type = 'system'
$(function(){
  fun_multilang_adapter();
   fun_get_log();
  fun_register_all_event();
  $("#button_refresh_systemlog").click(function(){
    fun_get_log();
  });
  $("#button_download_systemlog").click(function(){
    fun_down_log();
  });
});
function fun_get_log(){
  sdk_getipcparam(`/action/log?type=${type}`,function(result){
    if(result!=false){
      var retstring=String(result);
      var targetItems=retstring.split('\n');
      var targettext="<p>";
      for(var i=0;i<targetItems.length;i++){
        targettext+=targetItems[i]+" <br /> ";
      }
      targettext+="</p>"
      if(type == 'system'){
        $("#div_systemlog_content").html(targettext);
      }else if(type == 'business'){
         $("#div_businesslog_content").html(targettext);
      }
      
    }
  });
}
function CurBrowserIsIE(){
  if(!!window.ActiveXObject||"ActiveXObject"in window) return true;
  return false;
}
function show_save_dialog(){
  if(g_wnd.document.readyState=="complete"){
    g_wnd.document.execCommand("SaveAs",true,"ipclog.txt");
    g_wnd.close();
  }else{
    setTimeout("show_save_dialog();",500);
  }}
var g_wnd=null;
function fun_down_log(){
  if(CurBrowserIsIE()){
    var targetwndname="savelogfile";
    var wnd=window.open("",targetwndname);
    var link=document.getElementById("link");
    link.target=targetwndname;
    link.href=`http://${document.location.host}/action/log?type=${type}`;
    link.click();
    g_wnd=wnd;
    $(g_wnd).ready(show_save_dialog);
  }else{
    var wnd=window.open(`http://${document.location.host}/action/log?type=${type}`);
    wnd.document.execCommand("SaveAs",false,`${type}log.txt`);
  }
}
function fun_multilang_adapter(){
  translate_page_item(TARGET_PAGE_SUB_LOG,"syslog","div_table_systemlog_text",ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_SUB_LOG,"bsslog","div_table_business_text",ITEM_TYPE_TEXT);
  translate_page_item(TARGET_PAGE_COMMON,"refresh","button_refresh_systemlog",ITEM_TYPE_VALUE);
  translate_page_item(TARGET_PAGE_SUB_LOG,"download","button_download_systemlog",ITEM_TYPE_VALUE);
}
function fun_register_all_event() {
  $('#div_table_systemlog,#div_table_businesslog').click(function () {
    fun_switch_menu(this.id.toString());
  });
}
function fun_switch_menu(tableid){
  $('#' + tableid).addClass('cls_tablebar_item_selected');
  if(tableid == 'div_table_systemlog'){
    type = 'system';
     fun_get_log();
    $('#div_table_businesslog').removeClass('cls_tablebar_item_selected');
    $('#div_systemlog_content').css('display','block');
    $('#div_businesslog_content').css('display','none');
  }else if(tableid == 'div_table_businesslog'){
    type = 'business'
    fun_get_log();
    $('#div_table_systemlog').removeClass('cls_tablebar_item_selected');
    $('#div_systemlog_content').css('display','none');
    $('#div_businesslog_content').css('display','block');
  }
}