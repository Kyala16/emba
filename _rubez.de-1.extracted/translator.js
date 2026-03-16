var ITEM_TYPE_NONE = 0;
var ITEM_TYPE_VALUE = 1;
var ITEM_TYPE_TEXT = 2;
var ITEM_TYPE_TOOLTIP = 3;
var TARGET_PAGE_COMMON = 0;
var TARGET_PAGE_PREVIEW = 1;
var TARGET_PAGE_PLAYBACK = 2;
var TARGET_PAGE_CONFIGURATION = 3;
var TARGET_PAGE_TIPSTEXT = 4;
var TARGET_PAGE_SUB_GUIDE = 5;
var TARGET_PAGE_SUB_GENERAL = 6;
var TARGET_PAGE_SUB_MAINTAIN = 7;
var TARGET_PAGE_SUB_UPGRADE = 8;
var TARGET_PAGE_SUB_INFORMATION = 9;
var TARGET_PAGE_SUB_LOG = 10;
var TARGET_PAGE_SUB_TCPIP = 11;
var TARGET_PAGE_SUB_PORT = 12;
var TARGET_PAGE_SUB_WIFI = 13;
var TARGET_PAGE_SUB_PPPOE = 14;
var TARGET_PAGE_SUB_SMTP = 15;
var TARGET_PAGE_SUB_UPNP = 16;
var TARGET_PAGE_SUB_DDNS = 17;
var TARGET_PAGE_SUB_RTSP = 18;
var TARGET_PAGE_SUB_RTMP = 19;
var TARGET_PAGE_SUB_VOIP = 20;
var TARGET_PAGE_SUB_AUDIO = 21;
var TARGET_PAGE_SUB_VIDEO = 22;
var TARGET_PAGE_SUB_OSD = 23;
var TARGET_PAGE_SUB_IMAGE = 24;
var TARGET_PAGE_SUB_PRIVACYMASK = 25;
var TARGET_PAGE_SUB_ROI = 26;
var TARGET_PAGE_SUB_LOCAL = 27;
var TARGET_PAGE_SUB_DISK = 28;
var TARGET_PAGE_SUB_FTP = 29;
var TARGET_PAGE_SUB_NFS = 30;
var TARGET_PAGE_SUB_SCHEDULE = 31;
var TARGET_PAGE_SUB_EVTSERVER = 32;
var TARGET_PAGE_SUB_MOTION = 33;
var TARGET_PAGE_SUB_IOALARM = 34;
var TARGET_PAGE_SUB_PIR = 35;
var TARGET_PAGE_SUB_ABNORMALITY = 36;
var TARGET_PAGE_SUB_USER = 37;
var TARGET_PAGE_SUB_IPFILTER = 38;
var TARGET_PAGE_SUB_SNMP = 39;
var TARGET_PAGE_SUB_IEEE = 40;
var TARGET_PAGE_SUB_PTZCONFIG = 41;
var TARGET_PAGE_SUB_BONJOUR = 42;
var TARGET_PAGE_SUB_QOS = 43;
var TARGET_PAGE_SUB_HTTPS = 44;
var TARGET_PAGE_SUB_WIRELESS = 45;
var TARGET_PAGE_SUB_VPN = 46;
var TARGET_PAGE_SUB_GB = 48;
var TARGET_PAGE_SUB_AVANALYSIS = 49;
var global_language_file = '';
function translate_page_item(page, item, itemid, itemtype, taglang) {
  if (item.length < 0) return false;
  if (global_language_file.length <= 0 || taglang) {
    var curlanguage=window.sessionStorage.getItem('bvlanguage');
    var curlang = taglang ? taglang : curlanguage;
    var targetfilepath = '';
    if (curlang == 'English') {
      targetfilepath = '/ui/language/english.xml';
    } else if (curlang == 'Chinese') {
      targetfilepath = '/ui/language/chinese.xml';
    } else if (curlang == 'Russian') {
      targetfilepath = '/ui/language/russian.xml';
    } else if (curlang == 'Polish') {
      targetfilepath = '/ui/language/polish.xml';
    } else if (curlang == 'Japanese') {
      targetfilepath = '/ui/language/japanese.xml';
    } else if (curlang == 'German') {
      targetfilepath = '/ui/language/german.xml';
    } else if (curlang == 'ChineseTW') {
      targetfilepath = '/ui/language/chineset.xml';
    } else {
      targetfilepath = '/ui/language/english.xml';
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        global_language_file = this.responseText;
      } else if (this.readyState == 4 && this.status != 200) {
        return false;
      }
    };
    xhttp.open('GET', targetfilepath, false);
    xhttp.send();
  }
  if (global_language_file.length <= 0) return false;
  var targetnode;
  if (page === TARGET_PAGE_COMMON) {
    targetnode = $(global_language_file).find('common');
  } else if (page === TARGET_PAGE_PREVIEW) {
    targetnode = $(global_language_file).find('preview');
  } else if (page === TARGET_PAGE_PLAYBACK) {
    targetnode = $(global_language_file).find('playback');
  } else if (page === TARGET_PAGE_CONFIGURATION) {
    targetnode = $(global_language_file).find('configuration');
  } else if (page === TARGET_PAGE_TIPSTEXT) {
    targetnode = $(global_language_file).find('tipsinfo');
  } else if (page === TARGET_PAGE_SUB_GUIDE) {
    targetnode = $(global_language_file).find('guide');
  } else if (page === TARGET_PAGE_SUB_GENERAL) {
    targetnode = $(global_language_file).find('general');
  } else if (page === TARGET_PAGE_SUB_MAINTAIN) {
    targetnode = $(global_language_file).find('maintain');
  } else if (page === TARGET_PAGE_SUB_UPGRADE) {
    targetnode = $(global_language_file).find('upgrade');
  } else if (page === TARGET_PAGE_SUB_PTZCONFIG) {
    targetnode = $(global_language_file).find('ptzconfig');
  } else if (page === TARGET_PAGE_SUB_INFORMATION) {
    targetnode = $(global_language_file).find('information');
  } else if (page === TARGET_PAGE_SUB_LOG) {
    targetnode = $(global_language_file).find('log');
  } else if (page === TARGET_PAGE_SUB_TCPIP) {
    targetnode = $(global_language_file).find('tcpip');
  } else if (page === TARGET_PAGE_SUB_PORT) {
    targetnode = $(global_language_file).find('port');
  } else if (page === TARGET_PAGE_SUB_WIFI) {
    targetnode = $(global_language_file).find('wifi');
  } else if (page === TARGET_PAGE_SUB_PPPOE) {
    targetnode = $(global_language_file).find('pppoe');
  } else if (page === TARGET_PAGE_SUB_SMTP) {
    targetnode = $(global_language_file).find('smtp');
  } else if (page === TARGET_PAGE_SUB_UPNP) {
    targetnode = $(global_language_file).find('upnp');
  } else if (page === TARGET_PAGE_SUB_DDNS) {
    targetnode = $(global_language_file).find('ddns');
  } else if (page === TARGET_PAGE_SUB_RTSP) {
    targetnode = $(global_language_file).find('rtsp');
  } else if (page === TARGET_PAGE_SUB_RTMP) {
    targetnode = $(global_language_file).find('rtmp');
  } else if (page === TARGET_PAGE_SUB_VOIP) {
    targetnode = $(global_language_file).find('voip');
  } else if (page === TARGET_PAGE_SUB_SNMP) {
    targetnode = $(global_language_file).find('snmp');
  } else if (page === TARGET_PAGE_SUB_IEEE) {
    targetnode = $(global_language_file).find('ieee');
  } else if (page === TARGET_PAGE_SUB_GB) {
    targetnode = $(global_language_file).find('gb');
  } else if (page === TARGET_PAGE_SUB_AUDIO) {
    targetnode = $(global_language_file).find('audio');
  } else if (page === TARGET_PAGE_SUB_VIDEO) {
    targetnode = $(global_language_file).find('video');
  } else if (page === TARGET_PAGE_SUB_OSD) {
    targetnode = $(global_language_file).find('osd');
  } else if (page === TARGET_PAGE_SUB_IMAGE) {
    targetnode = $(global_language_file).find('imagesettings');
  } else if (page === TARGET_PAGE_SUB_PRIVACYMASK) {
    targetnode = $(global_language_file).find('privacymask');
  } else if (page === TARGET_PAGE_SUB_ROI) {
    targetnode = $(global_language_file).find('roi');
  } else if (page === TARGET_PAGE_SUB_LOCAL) {
    targetnode = $(global_language_file).find('local');
  } else if (page === TARGET_PAGE_SUB_DISK) {
    targetnode = $(global_language_file).find('disk');
  } else if (page === TARGET_PAGE_SUB_FTP) {
    targetnode = $(global_language_file).find('ftp');
  } else if (page === TARGET_PAGE_SUB_NFS) {
    targetnode = $(global_language_file).find('nfs');
  } else if (page === TARGET_PAGE_SUB_SCHEDULE) {
    targetnode = $(global_language_file).find('schedule');
  } else if (page === TARGET_PAGE_SUB_EVTSERVER) {
    targetnode = $(global_language_file).find('evtserver');
  } else if (page === TARGET_PAGE_SUB_MOTION) {
    targetnode = $(global_language_file).find('motion');
  } else if (page === TARGET_PAGE_SUB_IOALARM) {
    targetnode = $(global_language_file).find('ioalarm');
  } else if (page === TARGET_PAGE_SUB_PIR) {
    targetnode = $(global_language_file).find('pir');
  } else if (page === TARGET_PAGE_SUB_ABNORMALITY) {
    targetnode = $(global_language_file).find('abnormality');
  } else if (page === TARGET_PAGE_SUB_USER) {
    targetnode = $(global_language_file).find('user');
  } else if (page === TARGET_PAGE_SUB_IPFILTER) {
    targetnode = $(global_language_file).find('ipfilter');
  } else if (page === TARGET_PAGE_SUB_AVANALYSIS) {
    targetnode = $(global_language_file).find('avanalysis');
  } else if (page === TARGET_PAGE_SUB_BONJOUR) {
    targetnode = $(global_language_file).find('bonjour');
  } else if (page === TARGET_PAGE_SUB_QOS) {
    targetnode = $(global_language_file).find('qos');
  } else if (page === TARGET_PAGE_SUB_HTTPS) {
    targetnode = $(global_language_file).find('https');
  } else if (page === TARGET_PAGE_SUB_WIRELESS) {
    targetnode = $(global_language_file).find('wireless');
  } else if (page === TARGET_PAGE_SUB_VPN) {
    targetnode = $(global_language_file).find('vpn');
  }
  var targetitemtext = $(targetnode).find(item).text();
  if (typeof targetitemtext == 'string' && targetitemtext.constructor == String && targetitemtext.length > 0) {
    var objarr = itemid.split(',');
    for (var index in objarr) {
      var tempid = objarr[index];
      if (itemtype === ITEM_TYPE_VALUE) {
        $('#' + tempid).val(targetitemtext);
      } else if (itemtype === ITEM_TYPE_TEXT) {
        $('#' + tempid).text(targetitemtext);
      } else if (itemtype === ITEM_TYPE_TOOLTIP) {
        $('#' + tempid).attr('title', targetitemtext);
      } else if (itemtype === ITEM_TYPE_NONE) {
        return targetitemtext;
      }
    }
    return true;
  } else {
    if (itemtype === ITEM_TYPE_VALUE) {
      return false;
    } else if (itemtype === ITEM_TYPE_TEXT) {
      return false;
    } else if (itemtype === ITEM_TYPE_TOOLTIP) {
      return false;
    } else if (itemtype === ITEM_TYPE_NONE) {
      return '';
    }
  }
  return false;
}
function current_language_number() {
  var curlang=window.sessionStorage.getItem('bvlanguage');
  if (curlang == 'English') {
    return 9;
  } else if (curlang == 'Chinese') {
    return 4;
  } else if (curlang == 'ChineseTW') {
    return 0x7c04;
  } else if (curlang == 'Russian') {
    return 25;
  } else if (curlang == 'Polish') {
    return 21;
  } else if (curlang == 'Japanese') {
    return 17;
  } else if (curlang == 'German') {
    return 7;
  } else {
    return 9;
  }
}
function current_language_string(taglang) {
  var curlang=window.sessionStorage.getItem('bvlanguage');
  if (curlang == 'English') {
    return 'English';
  } else if (curlang == 'Chinese') {
    return '简体中文';
  } else if (curlang == 'ChineseTW') {
    return '繁體中文';
  } else if (curlang == 'Russian') {
    return 'Русский';
  } else if (curlang == 'Polish') {
    return 'Polski';
  } else if (curlang == 'Japanese') {
    return '日本語';
  } else if (curlang == 'German') {
    return 'Deutsch';
  } else {
    return 'English';
  }
}
