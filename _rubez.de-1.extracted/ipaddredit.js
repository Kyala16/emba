var ipedits = [];
function ipedit(id) {
    for(var index = 0;index < ipedits.length;index++)
    {
        if(id == ipedits[index].parentid){
            return ipedits[index];
        }
    }
    var strhtml = '<input id="'+id+'_sec1" class="ui-ipedit-widget" maxlength="3" onkeydown="deal_ipedit_event(0,this.id)" onchange="ipedit_text_change(this.id)" onkeyup="deal_ipedit_event(1,this.id)" style="border: none;height: 100%;background-color: transparent;outline: none;margin-left: 2px;"  type="text" onfocus="this.select()" onmouseup="this.select()">.'+
                  '<input id="'+id+'_sec2" class="ui-ipedit-widget" maxlength="3" onkeydown="deal_ipedit_event(0,this.id)" onchange="ipedit_text_change(this.id)" onkeyup="deal_ipedit_event(1,this.id)" style="border: none;height: 100%;background-color: transparent;outline: none;margin-left: 2px;"  type="text" onfocus="this.select()" onmouseup="this.select()">.'+
                  '<input id="'+id+'_sec3" class="ui-ipedit-widget" maxlength="3" onkeydown="deal_ipedit_event(0,this.id)" onchange="ipedit_text_change(this.id)" onkeyup="deal_ipedit_event(1,this.id)" style="border: none;height: 100%;background-color: transparent;outline: none;margin-left: 2px;"  type="text" onfocus="this.select()" onmouseup="this.select()">.'+
                  '<input id="'+id+'_sec4" class="ui-ipedit-widget" maxlength="3" onkeydown="deal_ipedit_event(0,this.id)" onchange="ipedit_text_change(this.id)" onkeyup="deal_ipedit_event(1,this.id)" style="border: none;height: 100%;background-color: transparent;outline: none;margin-left: 2px;"  type="text" onfocus="this.select()" onmouseup="this.select()">';
    document.getElementById(id).innerHTML = strhtml;
    $("#"+id).css({"border":"1px solid #242424","outline":"none"});
    var tempedit = new Object();
    tempedit.getvalue = ipedit_get_value;
    tempedit.parentid = id;
    tempedit.setvalue = ipedit_set_value;
    tempedit.disable  = ipedit_disabled;
    ipedits[ipedits.length] = tempedit;
    return tempedit;
}

function ipedit_get_value() {
    var strvalue = "";
    var strsec1 = $("#"+this.parentid+"_sec1").val();
    var strsec2 = $("#"+this.parentid+"_sec2").val();
    var strsec3 = $("#"+this.parentid+"_sec3").val();
    var strsec4 = $("#"+this.parentid+"_sec4").val();
    strvalue = strsec1+"."+strsec2+"."+strsec3+"."+strsec4;
    if (this.parentid == "ipedit_ipv4_primarydns" || this.parentid == "ipedit_ipv4_secondarydns") {
        if(strsec1 == "") {
            strvalue = ""+"."+strsec2+"."+strsec3+"."+strsec4;
            return strvalue;
        }else if(strsec2 == "") {
            strvalue = strsec1+"."+""+"."+strsec3+"."+strsec4;
            return strvalue;
        }else if(strsec3 == "") {
            strvalue = strsec1+"."+strsec2+"."+""+"."+strsec4;
            return strvalue;
        }else if(strsec4 == "") {
            strvalue = strsec1+"."+strsec2+"."+strsec3+"."+"";
            return strvalue;
        }
        return strvalue;
    }else {
        if(strsec1 == "" || strsec2 == "" || strsec3 == "" || strsec4 == "") {
            return String("");
        }
        return strvalue;
    }
}

function ipedit_text_change(objid) {
    var text = $("#"+objid).val();
    var temptext = text.replace('.','');
    $("#"+objid).val(temptext);
}

function ipedit_set_value(val) {
    if(typeof val != 'string' || val.constructor != String)
        return false;
    if(val == ""){
        document.getElementById(this.parentid+"_sec1").value = "";
        document.getElementById(this.parentid+"_sec2").value = "";
        document.getElementById(this.parentid+"_sec3").value = "";
        document.getElementById(this.parentid+"_sec4").value = "";
    }
    var arrip = val.split('.');
    if(arrip.length != 4)
        return false;
    document.getElementById(this.parentid+"_sec1").value = arrip[0];
    document.getElementById(this.parentid+"_sec2").value = arrip[1];
    document.getElementById(this.parentid+"_sec3").value = arrip[2];
    document.getElementById(this.parentid+"_sec4").value = arrip[3];
}

function deal_ipedit_event(evtnum,id) {
	var arrname = String(id).split('_');
	var currsec = arrname[arrname.length - 1];
    var event=arguments.callee.caller.arguments[0]||window.event;
	var codenum = event.keyCode;
	console.log(codenum);
    if(evtnum == 0){
        //del---backspace---left---right
		if((event.keyCode != 46) && (event.keyCode != 8) && (event.keyCode != 37) && (event.keyCode != 39)) {
            if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
                event.returnValue = false;
                event.preventDefault();
                return false;
            }
        }
    }else {
        if(event.keyCode == 110 || event.keyCode == 190){
            move_to_next_sec(id);
            event.returnValue=false;
            return;
        }
        var currvalue = parseInt($("#"+id).val());
        if(isNaN(currvalue)){
            $("#"+id).val("");
            return;
        }
        if(0 > currvalue){
            $("#"+id).val("");
            return;
        }else{
            $("#"+id).val(currvalue.toString());
        }
        if(currvalue>255){
            var strvalue = currvalue.toString();
			var realvalue = strvalue[0] + strvalue[1];
			var maxvalue = strvalue[0] + strvalue[1] + strvalue[2];
			if(maxvalue<=255){
                document.getElementById(id).value = maxvalue;
            }else {
                document.getElementById(id).value = realvalue;
            }
			move_to_next_sec(id);
        }else if(currvalue.length >=3){
			move_to_next_sec(id);
		}
    }
}
function move_to_next_sec(id) {
    var arrname = String(id).split('_');
    var currsec = arrname[arrname.length - 1];
    var tagetid ="";
    if(currsec == "sec1"){
        tagetid = id.replace("sec1","sec2");
        document.getElementById(tagetid).focus();
    }else if(currsec == "sec2"){
        tagetid = id.replace("sec2","sec3");
        document.getElementById(tagetid).focus();
    }else if(currsec == "sec3"){
        tagetid = id.replace("sec3","sec4");
        document.getElementById(tagetid).focus();
    }
}
function ipedit_disabled(bdisabled) {
    if(bdisabled) {
        $("#" + this.parentid + "_sec1").attr("disabled", "disabled");
        $("#" + this.parentid + "_sec2").attr("disabled", "disabled");
        $("#" + this.parentid + "_sec3").attr("disabled", "disabled");
        $("#" + this.parentid + "_sec4").attr("disabled", "disabled");
    }else{
        $("#" + this.parentid + "_sec1").removeAttr("disabled");
        $("#" + this.parentid + "_sec2").removeAttr("disabled");
        $("#" + this.parentid + "_sec3").removeAttr("disabled");
        $("#" + this.parentid + "_sec4").removeAttr("disabled");
    }
}