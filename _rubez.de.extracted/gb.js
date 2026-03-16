$(document).ready(function () {
    fun_multilang_adapter();
    fun_register_events();
    fun_get_rtsp_parameters();
    fun_initialize_pageui();
});
function fun_initialize_pageui() {
    ipedit("ipaddr_rtsp_edit");
}
function fun_register_events() {
    $("#button_rtsp_refresh,#button_rtsp_reset,#button_rtsp_save").click(function () {
        var tagid = this.id.toString();
        if(tagid == "button_rtsp_refresh"){
            fun_on_rtsp_refresh();
        }else if(tagid == "button_rtsp_reset"){
            fun_on_rtsp_reset();
        }else if(tagid == "button_rtsp_save"){
            fun_on_rtsp_save();
        }
    });
	$("#gben").click(function () {
        var strenabled = $("#gben").prop("checked");
        if(strenabled == false){
            $("#SIP_server_id").attr("disabled","disabled");
            $("#server_domain").attr("disabled","disabled");
            $("#ipaddr_rtsp_edit").attr("disabled","disabled");
            $("#dev_port").attr("disabled","disabled");
            $("#dev_id").attr("disabled","disabled");
            $("#dev_pass").attr("disabled","disabled");
            $("#local_SIP_server_port").attr("disabled","disabled");
            
            $("#valid_period").attr("disabled","disabled");
            $("#heart_interval").attr("disabled","disabled");
            $("#max_heart_interval_time").attr("disabled","disabled");
            $("#stream_indexs").attr("disabled","disabled");
            $("#trans_protos").attr("disabled","disabled");
            $("#aisle_code1").attr("disabled","disabled");
            $("#aisle_code2").attr("disabled","disabled");
            $("#aisle_code3").attr("disabled","disabled");
            $("#alarm_level_sc1").attr("disabled","disabled");
            $("#alarm_level_sc2").attr("disabled","disabled");
            $("#alarm_level_sc3").attr("disabled","disabled");
            ipedit("ipaddr_rtsp_edit").disable(true);
        }else{
            $("#SIP_server_id").removeAttr("disabled");
            $("#server_domain").removeAttr("disabled");
            $("#ipaddr_rtsp_edit").removeAttr("disabled");
            $("#dev_port").removeAttr("disabled");
            $("#dev_id").removeAttr("disabled");
            $("#dev_pass").removeAttr("disabled");
            $("#local_SIP_server_port").removeAttr("disabled");
            $("#valid_period").removeAttr("disabled");
            $("#heart_interval").removeAttr("disabled");
            $("#max_heart_interval_time").removeAttr("disabled");
            $("#stream_indexs").removeAttr("disabled");
            $("#trans_protos").removeAttr("disabled");
            $("#aisle_code1").removeAttr("disabled");
            $("#aisle_code2").removeAttr("disabled");
            $("#aisle_code3").removeAttr("disabled");
            $("#alarm_level_sc1").removeAttr("disabled");
            $("#alarm_level_sc2").removeAttr("disabled");
            $("#alarm_level_sc3").removeAttr("disabled");
            ipedit("ipaddr_rtsp_edit").disable(false);
        }
    });
}
function fun_multilang_adapter() {
    translate_page_item(TARGET_PAGE_COMMON,"enablec","gbenble",ITEM_TYPE_TEXT);

    translate_page_item(TARGET_PAGE_SUB_GB,"sipserveid","sip_serveid",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"sipdomain","sip_domain",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"sipserveip","sip_serveip",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"sipserveprot","sip_serveprot",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"devcode","dev_code",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"rejectpass","reject_pass",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"localserveport","local_serveport",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"rejectexpires","reject_expires",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"heartinterval","ht_interval",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"heartmaxtime","ht_maxtime",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"streamtype","stream_index",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"protocol","trans_proto",ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_SUB_GB,"asilecode","asile_code1",ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_SUB_GB,"asilecode","asile_code2",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"asilecode","asile_code3",ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_SUB_GB,"alarmlevel","alarm_level1",ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_SUB_GB,"alarmlevel","alarm_level2",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"alarmlevel","alarm_level3",ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_SUB_GB,"ailsemessgae","aisle_message",ITEM_TYPE_TEXT);
	translate_page_item(TARGET_PAGE_SUB_GB,"alarmmessage","alarm_message",ITEM_TYPE_TEXT);
    translate_page_item(TARGET_PAGE_SUB_GB,"speechoutput","speech_output",ITEM_TYPE_TEXT);
   
    translate_page_item(TARGET_PAGE_COMMON,"refresh","button_rtsp_refresh",ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON,"restore","button_rtsp_reset",ITEM_TYPE_VALUE);
    translate_page_item(TARGET_PAGE_COMMON,"save","button_rtsp_save",ITEM_TYPE_VALUE);

    var mainstreams    = translate_page_item(TARGET_PAGE_SUB_GB,"mainstream","",ITEM_TYPE_NONE);
    var substreams   = translate_page_item(TARGET_PAGE_SUB_GB,"substream","",ITEM_TYPE_NONE);

    $("#stream_indexs option").each(function (i,n){
        if(i == 0){
            $(n).text(mainstreams);
        }else if(i == 1){
            $(n).text(substreams);
        }
    });
}

function fun_get_rtsp_parameters() {
    sdk_getipcparam("/action/get?subject=gb28181",function (result) {
        if(result == false)
            return;
        $xml = $(result);
        var active = $xml.find("active").text();
        var addr   = $xml.find("servhost").text();
        var servid   = $xml.find("servid").text();
        var servdomain   = $xml.find("servdomain").text();
        var servport   = $xml.find("servport").text();
        var stream = $xml.find("stream").text();
        var proto = $xml.find("proto").text();
        var devid   = $xml.find("devid").text();
        var password   = $xml.find("password").text();
        var expires   = $xml.find("expires").text();
        var hbinterval   = $xml.find("hbinterval").text();
        var hbtimeout   = $xml.find("hbtimeout").text();
        var port   = $xml.find("port").text();
        var video   = $xml.find("video").text();
        var alarm   = $xml.find("alarm").text();
        var audioout   = $xml.find("audioout").text();

        //获取通信编码1和报警等级1的参数
        var varr1=[];
        var vlv1 =""
        var vd1=""
        var v1=""
        var videoarr1= video.split("")

        for(var i=0;i<videoarr1.length;i++){
            if(videoarr1[i] != "v"){
                varr1.push(videoarr1[i])
            }else{
                break
            }
        }

        vlv1 = varr1.join("")
        v1=parseInt(videoarr1.length)-1
        vd1=videoarr1[v1]

        //获取通信编码2和报警等级2的参数
        var videoarr2= alarm.split("")
        var varr2=[];
        var vlv2 =""
        var vd2=""
        var v2

        for(var i=0;i<videoarr2.length;i++){
            if(videoarr2[i] != "a"){
                varr2.push(videoarr2[i])
            }else{
                break
            }
        }

        vlv2 = varr2.join("")
        v2=parseInt(videoarr2.length)-1
        vd2=videoarr2[v2]
        console.log(varr1,varr2)

        //获取通信编码3和报警等级3的参数
        var videoarr3= audioout.split("")
        var varr3=[];
        var vlv3 =""
        var vd3=""
        var v3

        for(var i=0;i<videoarr3.length;i++){
            if(videoarr3[i] != "a"){
                varr3.push(videoarr3[i])
            }else{
                break
            }
        }

        vlv3 = varr3.join("")
        v3=parseInt(videoarr3.length)-1
        vd3=videoarr3[v3]
        console.log(varr1,varr2,varr3)



        if(active == 0){
            $("#SIP_server_id").attr("disabled","disabled");
            $("#server_domain").attr("disabled","disabled");
            $("#ipaddr_rtsp_edit").attr("disabled","disabled");
            $("#dev_port").attr("disabled","disabled");
            $("#dev_id").attr("disabled","disabled");
            $("#dev_pass").attr("disabled","disabled");
            $("#local_SIP_server_port").attr("disabled","disabled");
            $("#valid_period").attr("disabled","disabled");
            $("#heart_interval").attr("disabled","disabled");
            $("#max_heart_interval_time").attr("disabled","disabled");
            $("#stream_indexs").attr("disabled","disabled");
            $("#trans_protos").attr("disabled","disabled");
            $("#aisle_code1").attr("disabled","disabled");
            $("#aisle_code2").attr("disabled","disabled");
            $("#aisle_code3").attr("disabled","disabled");
            $("#alarm_level_sc1").attr("disabled","disabled");
            $("#alarm_level_sc2").attr("disabled","disabled");
            $("#alarm_level_sc3").attr("disabled","disabled");
            ipedit("ipaddr_rtsp_edit").disable(true);
			$("#gben").prop("checked",false);
        }else{
            $("#SIP_server_id").removeAttr("disabled");
            $("#server_domain").removeAttr("disabled");
            $("#ipaddr_rtsp_edit").removeAttr("disabled");
            $("#dev_port").removeAttr("disabled");
            $("#dev_id").removeAttr("disabled");
            $("#dev_pass").removeAttr("disabled");
            $("#local_SIP_server_port").removeAttr("disabled");
            $("#valid_period").removeAttr("disabled");
            $("#heart_interval").removeAttr("disabled");
            $("#max_heart_interval_time").removeAttr("disabled");
            $("#stream_indexs").removeAttr("disabled");
            $("#trans_protos").removeAttr("disabled");
            $("#aisle_code1").removeAttr("disabled");
            $("#aisle_code2").removeAttr("disabled");
            $("#aisle_code3").removeAttr("disabled");
            $("#alarm_level_sc1").removeAttr("disabled");
            $("#alarm_level_sc2").removeAttr("disabled");
            $("#alarm_level_sc3").removeAttr("disabled");
            ipedit("ipaddr_rtsp_edit").disable(false);
			$("#gben").prop("checked",true);
        }
        $("#SIP_server_id").val(servid);
        $("#server_domain").val(servdomain);
        $("#dev_port").val(servport);
        $("#dev_id").val(devid);
        $("#dev_pass").val(password);
        $("#valid_period").val(expires);
        $("#local_SIP_server_port").val(port);
        $("#heart_interval").val(hbinterval);
        $("#max_heart_interval_time").val(hbtimeout);
        $("#stream_indexs").val(stream);
        $("#trans_protos").val(proto);
        $("#aisle_code1").val(vlv1);
        $("#alarm_level1").val(vd1);

        $("#aisle_code2").val(vlv2);
        $("#alarm_level2").val(vd2);

        $("#aisle_code3").val(vlv3);
        $("#alarm_level3").val(vd3);


        ipedit("ipaddr_rtsp_edit").setvalue(addr);
    });
}
addEventListener
function fun_on_rtsp_refresh() {
    fun_get_rtsp_parameters();
}

function fun_on_rtsp_reset() {
    $("#gben").prop("checked",false);
    ipedit("ipaddr_rtsp_edit").setvalue("192.168.1.35");
    $("#SIP_server_id").val("34020000002000000001");
    $("#server_domain").val("34020000");
    $("#dev_port").val("5060");
    $("#dev_id").val("34020000001310000001");
    $("#dev_pass").val("12345678");
    $("#local_SIP_server_port").val("5060");
    $("#valid_period").val("3600");
    $("#heart_interval").val("60");
    $("#max_heart_interval_time").val("3");
    $("#stream_indexs").val("0");
    $("#trans_protos").val("0");
    $("#aisle_code1").val("34020000001310000001");
    $("#aisle_code2").val("34020000001340000001");
    $("#aisle_code3").val("34020000001370000001");
    $("#alarm_level_sc1").val("1");
    $("#alarm_level_sc2").val("1");
    $("#alarm_level_sc3").val("1");

    $("#SIP_server_id").attr("disabled","disabled");
    $("#server_domain").attr("disabled","disabled");
    $("#ipaddr_rtsp_edit").attr("disabled","disabled");
    $("#dev_port").attr("disabled","disabled");
    $("#dev_id").attr("disabled","disabled");
    $("#dev_pass").attr("disabled","disabled");
    $("#local_SIP_server_port").attr("disabled","disabled");
    $("#valid_period").attr("disabled","disabled");
    $("#heart_interval").attr("disabled","disabled");
    $("#max_heart_interval_time").attr("disabled","disabled");
    $("#stream_indexs").attr("disabled","disabled");
    $("#trans_protos").attr("disabled","disabled");
    $("#aisle_code1").attr("disabled","disabled");
    $("#aisle_code2").attr("disabled","disabled");
    $("#aisle_code3").attr("disabled","disabled");
    $("#alarm_level_sc1").attr("disabled","disabled");
    $("#alarm_level_sc2").attr("disabled","disabled");
    $("#alarm_level_sc3").attr("disabled","disabled");
    ipedit("ipaddr_rtsp_edit").disable(true);
}

function fun_on_rtsp_save() {
	var en = $("#gben").prop("checked")?1:0;
    var ad = ipedit("ipaddr_rtsp_edit").getvalue();
    var servid    = $("#SIP_server_id").val();
    var servdomain     = $("#server_domain").val();
    var servport     = $("#dev_port").val();
    var devid     = $("#dev_id").val();
    var password     = $("#dev_pass").val();
    var port     = $("#local_SIP_server_port").val();
    var expires     = $("#valid_period").val();
    var hbinterval     = $("#heart_interval").val();
    var hbtimeout     = $("#max_heart_interval_time").val();
    var stream    = $("#stream_indexs").val();
    var proto     = $("#trans_protos").val();
    


    var id1     = $("#aisle_code1").val();
    var address1     = $("#alarm_level_sc1").val();
    var id2     = $("#aisle_code2").val();
    var address2    = $("#alarm_level_sc2").val();
    var id3     = $("#aisle_code3").val();
    var address3    = $("#alarm_level_sc3").val();
    // console.log(en,ad,servid,servdomain,servport,devid,password,port,expires,hbinterval,hbtimeout,id1,id2,address1,address2)
    var devidarr =devid.split("");
    var servidarr=servid.split("");
    var servdomainarr=servdomain.split("");
    var strsuc  = translate_page_item(TARGET_PAGE_TIPSTEXT,"infosave","",ITEM_TYPE_NONE);
    var request = translate_page_item(TARGET_PAGE_TIPSTEXT,"errrequest","",ITEM_TYPE_NONE);
    var strauth    = translate_page_item(TARGET_PAGE_TIPSTEXT,"errauthority","",ITEM_TYPE_NONE);
    var failed  = translate_page_item(TARGET_PAGE_TIPSTEXT,"errset","",ITEM_TYPE_NONE);
    var strinput= translate_page_item(TARGET_PAGE_TIPSTEXT,"errinput","",ITEM_TYPE_NONE);
    var id1_arr=id1.split("")
    var id2_arr=id1.split("")
    // console.log(devidarr,servidarr,servdomainarr,id1_arr,id2_arr)
    if (en == 0) {
        if(expires < 60 || expires > 7200 || hbinterval < 10 || hbinterval > 300 || hbtimeout < 3 || hbtimeout > 10 || servport < 1 || servport > 65535 || port < 1 || port > 65535 || servidarr.length>31 || servdomainarr.length > 31|| servid =="" || ad == "" || id1_arr.length >31|| id2_arr.length >31|| password ==""|| servdomain =="" ||id1 == ""|| id2== ""|| devid=="" || devidarr.length >31 || devidarr.length < 19 || servidarr.length < 20 || servdomainarr < 8){
            parent.fun_show_tips_dialog(strinput,0);
            return;
        }
        }
    if (en == 1) {
        if(expires < 60 || expires > 7200 || hbinterval < 10 || hbinterval > 300 || hbtimeout < 3 || hbtimeout > 10 || servport < 1 || servport > 65535 || port < 1 || port > 65535 || servidarr.length>31 || servdomainarr.length > 31|| servid =="" || ad == "" || id1_arr.length >31|| id2_arr.length >31|| password ==""|| servdomain =="" ||id1 == ""|| id2== ""|| devid=="" ||  devidarr.length >31 || devidarr.length < 19 || servidarr.length < 20 || servdomainarr < 8){
            parent.fun_show_tips_dialog(strinput,0);
        return;
    }
    }

    var targetxml ='<?xml version="1.0" encoding="utf-8"?>' +
        '<request>' +
            '<gb28181 ver="2.0">' +
                '<active>'+en+'</active>' +
                '<servid>'+servid+'</servid>' +
                '<servdomain>'+servdomain+'</servdomain>' +
                '<servhost>'+ad+'</servhost>' +
                '<servport>'+servport+'</servport>' +
                '<stream>'+stream+'</stream>' +
                '<proto>'+proto+'</proto>' +
                '<devid>'+devid+'</devid>' +
                '<port>'+port+'</port>' +
                '<password>'+password+'</password>' +
                '<expires>'+expires+'</expires>' +
                '<hbinterval>'+hbinterval+'</hbinterval>' +
                '<hbtimeout>'+hbtimeout+'</hbtimeout>' +
                '<video>' +
                    '<channel>'+
                        '<id>'+id1+'</id>' +
                        '<name>video</name>' +
                        '<level>'+address1+'</level>' +
                    '</channel>'+
                '</video>' +
                '<alarm>' +
                    '<channel>'+
                        '<id>'+id2+'</id>' +
                        '<name>alarm</name>' +
                        '<level>'+address2+'</level>' +
                    '</channel>'+
                '</alarm>' +
                '<audioout>' +
                    '<channel>'+
                        '<id>'+id3+'</id>' +
                        '<name>audioout</name>' +
                        '<level>'+address3+'</level>' +
                    '</channel>'+
                '</audioout>' +
            '</gb28181>' +
        '</request>';

    sdk_setipcparam("/action/set?subject=gb28181",targetxml,function (result) {
        if (result == true) {
            parent.fun_show_tips_dialog(strsuc);
        } else if (result == 400) {
            parent.fun_show_tips_dialog(request, 0);
        } else if (result == 403) {
            parent.fun_show_tips_dialog(strauth, 0);
        } else {
            parent.fun_show_tips_dialog(failed, 0);
        }
    });
}




