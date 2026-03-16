
var EDIT_RESTRICTION_NUMBER = 1; //0-9
var EDIT_RESTRICTION_CHARACTOR = 2; //a-zA-Z
var EDIT_RESTRICTION_COMMA = 4; //...
var EDIT_RESTRICTION_BACKSLASH = 8; // //
var EDIT_RESTRICTION_COLON = 16;// ::
var EDIT_RESTRICTION_NOBLANK = 32;
var EDIT_RESTRICTION_XMLSTD = 64;
var EDIT_RESTRICTION_WILDCARD = 128;
var EDIT_RESTRICTION_PASSWORD = 256;

var input_edit_restriction_items = new Array();

String.prototype.getByteLength = function () {
  var totallength = 0;
  var charCode;
  for (var i = 0; i < this.length; i++) {
    charCode = this.charCodeAt(i);
    if (charCode < 0x007f) {
      totallength++;
    }
    else if ((0x0080 <= charCode) && (charCode < 0x07ff)) {
      totallength += 2;
    }
    else if ((0x0800 <= charCode) && (charCode < 0xffff)) {
      totallength += 3;
    }
    else {
      totallength += 4;
    }
  }
  return totallength;
};

function input_edit_restriction(id, mask, mxlength) {
  if (!($("#" + id).is("input"))) {// && $("#"+id).attr("type") == "text")){
    return false;
  }
  function restriction_item(id, mask, mxlength) {
    return { elemid: id, nmask: mask, mxlen: mxlength, laststr: "" };
  }
  input_edit_restriction_items[input_edit_restriction_items.length] = restriction_item(id, mask, mxlength);
  if (typeof (mxlength) == "number" && mxlength > 0) {
    $("#" + id).attr("maxlength", mxlength);
  }
  $("#" + id).keydown(function () {
    // console.log(arguments[0]);
    var curid = this.id.toString();
    // var event = arguments.callee.caller.arguments[0] || window.event;
    var event = arguments[0] || window.event;
    var tagmask = 0xff;
    var index = 0;
    var mxlength = 0;
    for (var i = 0; i < input_edit_restriction_items.length; i++) {
      if (curid == input_edit_restriction_items[i].elemid) {
        tagmask = input_edit_restriction_items[i].nmask;
        index = i;
        mxlength = input_edit_restriction_items[i].mxlen;
        break;
      }
    }
    if (tagmask > 0 && !(tagmask & EDIT_RESTRICTION_XMLSTD)) {
      if (((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) && !(tagmask & EDIT_RESTRICTION_NUMBER)) {
        //event.returnValue = false;
        //event.preventDefault();
        //return false;
      }
      if ((event.keyCode >= 65 && event.keyCode <= 90) && !(tagmask & EDIT_RESTRICTION_CHARACTOR)) {
        //event.returnValue = false;
        //event.preventDefault();
        //return false;
      }
      if ((event.keyCode == 191) && !(tagmask & EDIT_RESTRICTION_BACKSLASH)) {
        //event.returnValue = false;
        //event.preventDefault();
        //return false;
      }
      if ((event.keyCode == 190 || event.keyCode == 110) && !(tagmask & EDIT_RESTRICTION_COMMA)) {
        //event.returnValue = false;
        //event.preventDefault();
        //return false;
      }
      if ((event.keyCode == 186) && !(tagmask & EDIT_RESTRICTION_COLON)) {
        //event.returnValue = false;
        //event.preventDefault();
        //return false;
      }
    }
    input_edit_restriction_items[index].laststr = $(this).val();
  });
  $("#" + id).keyup(function () {
    var curid = this.id.toString();
    //var event=arguments.callee.caller.arguments[0]||window.event;
    var tagmask = 0xff;
    var index = -1;
    var mxlength = 0;
    for (var i = 0; i < input_edit_restriction_items.length; i++) {
      if (curid == input_edit_restriction_items[i].elemid) {
        tagmask = input_edit_restriction_items[i].nmask;
        mxlength = input_edit_restriction_items[i].mxlen;
        index = i;
        break;
      }
    }
    if (tagmask > 0) {
      var regexpstr = "^[";
      if (tagmask & EDIT_RESTRICTION_NUMBER) {
        regexpstr += "0-9";
      }
      if (tagmask & EDIT_RESTRICTION_CHARACTOR) {
        regexpstr += "a-zA-Z";
      }
      if (tagmask & EDIT_RESTRICTION_COLON) {
        regexpstr += ":";
      }
      if (tagmask & EDIT_RESTRICTION_BACKSLASH) {
        regexpstr += "/";
      }
      if (tagmask & EDIT_RESTRICTION_COMMA) {
        regexpstr += ".";
      }
      if (tagmask & EDIT_RESTRICTION_WILDCARD) {
        regexpstr += "~!@#\\$%\\^&\\*()_\\+=-\\?\\[\\],<.>/\\?\\:\\;\"\'\\\\";
      }
      regexpstr += "]{0,}";
      var curval = $(this).val();
      var lastval = '';
      var reg = new RegExp(regexpstr, "g");
      if (tagmask & EDIT_RESTRICTION_XMLSTD && curval.length > 0) {
        var reg1 = new RegExp("[^<>%;#\'\"]", "g");
        if (regexpstr.length > 7) {
          lastval = curval.match(reg)[0];
        } else {
          lastval = curval;
        }
        var strarr = lastval.match(reg1);
        if (null === strarr) {
          lastval = "";
        }
        else if (strarr.length > 0) {
          lastval = "";
          for (var i = 0; i < strarr.length; i++) {
            lastval += strarr[i];
          }
        } else {
          lastval = "";
        }
      } else if (EDIT_RESTRICTION_PASSWORD & tagmask && curval.length > 0) {
        var regstr = "[\\w~!@&#\\$%\\^\\*\\(\\)_\\+=\\-}{\\[\\]\\\\|;:',\\./\\?\"]";
        var reg1 = new RegExp(regstr, 'g');
        if (regexpstr.length > 7) {
          lastval = curval.match(reg)[0];
        } else {
          lastval = curval;
        }
        var strarr = lastval.match(reg1);
        if (null === strarr) {
          lastval = "";
        }
        else if (strarr.length > 0) {
          lastval = "";
          for (var i = 0; i < strarr.length; i++) {
            lastval += strarr[i];
          }
        } else {
          lastval = "";
        }

      } else if (regexpstr.length > 7) {
        //$(this).val(curval.match(reg));
        lastval = curval.match(reg)[0];
      } else {
        return true;
      }

      var curlen = lastval.getByteLength();
      while (curlen > mxlength) {
        lastval = lastval.slice(0, lastval.length - 1);
        curlen = lastval.getByteLength();
      }

      $(this).val(String(lastval));
      input_edit_restriction_items[index].laststr = String(lastval);
    }
  });
}