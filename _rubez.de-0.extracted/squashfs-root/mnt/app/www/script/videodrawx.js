var VIDEO_DRAWX_COVER_TYPE_LINE = 0;
var VIDEO_DRAWX_COVER_TYPE_RECT = 1;
var VIDEO_DRAWX_COVER_TYPE_PICE = 2;
var VIDEO_DRAWX_COVER_TYPE_DIRE = 4;
var VIDEO_DRAWX_COVER_TYPE_PATH = 5;
var VIDEO_DRAWX_COVER_TYPE_DIRE2 = 6;

var video_drawx_set = [];
var bv = null;
var lineNum = 1;//line num   (1 || 2), default is line 1
var isLine2 = false;

function video_drawx(objid, type) {
  this.frameid = objid;
  this.drawtype = type;
  this.start = video_drawx_start;
  this.startvideo = video_drawx_startvideo;
  this.repos = video_drawx_repos;
  this.enabledraw = video_drawx_enable_draw;
  this.setvalue = video_drawx_setvalue;
  this.getvalue = video_drawx_getvalue;
  this.rectpersent = video_drawx_get_rectangle_persent;
  this.setdrawtype = video_drawx_setdraw_type;
  this.clear = video_drawx_clear;
  this.setrects = video_drawx_setrects;
  this.getrects = video_drawx_getrects;
  this.setdrawindex = video_drawx_setdrawindex;
  this.setcmptfunc = video_drawx_setcomplet_callback;
  this.drawhandle = null;
  this.parameters = null;
  this.canvasid = '';
  video_drawx_set[video_drawx_set.length] = this;
}

function video_drawx_repos() {
  var posy = $('#' + this.frameid).position().top;
  $('#' + this.canvasparentid).css('top', posy);
}

function video_drawx_setdraw_type(type) {
  this.drawtype = type;
  if (null == this.drawhandle) {
    return;
  }
  this.drawhandle.startpoint.x = 0;
  this.drawhandle.startpoint.y = 0;
  this.drawhandle.endpoint.x = 0;
  this.drawhandle.endpoint.y = 0;
  this.drawhandle.drawtype = type;
  if (type === VIDEO_DRAWX_COVER_TYPE_PATH) {
    this.drawhandle.resvpt1.x = 0;
    this.drawhandle.resvpt2.x = 0;
    this.drawhandle.resvpt2.y = 0;
    this.drawhandle.resvpt1.y = 0;
    this.drawhandle.drawindex = 0;
  }
}

function video_drawx_start() {
  Math.random() * 700;
  var num = Math.random() * 700 + 800;
  num = parseInt(num, 10);

  var posx = $('#' + this.frameid).position().left;
  var poxy = $('#' + this.frameid).position().top;
  var width = $('#' + this.frameid).outerWidth();
  var height = $('#' + this.frameid).outerHeight();
  video_drawx_show_video(this.frameid, String(num), width, height);
  var childs = '<div id="video_drawx_parent_' + String(num) + '" style="position: absolute;z-index: 1899;left: ' + posx + 'px; top: ' + poxy + 'px;border: 1px solid transparent; cursor: pointer;background-color: rgba(23,23,23,0.0);width: ' + width + 'px; height: ' + height + 'px;">';
  childs += '<canvas id="video_drawx_canvas_' + String(num) + '" width="' + width + '" height="' + height + '" style="-webkit-user-select: none;"></canvas></div>';
  $('#' + this.frameid)
    .parent()
    .append(childs);
  this.canvasid = 'video_drawx_canvas_' + String(num);
  this.canvasparentid = 'video_drawx_parent_' + String(num);
  this.pictureid = 'img_video_show_' + String(num);
  this.drawhandle = new video_drawx_painter(this.canvasid, this.drawtype, width, height);
  fun_flash_checker('video_drawx_parent_' + String(num));
}

function video_drawx_startvideo() {
  Math.random() * 700;
  var num = Math.random() * 700 + 800;
  num = parseInt(num, 10);
  var width = $('#' + this.frameid).outerWidth();
  var height = $('#' + this.frameid).outerHeight();
  video_drawx_show_video(this.frameid, String(num), width, height);
}

function video_drawx_clear() {
  if (this.drawtype === VIDEO_DRAWX_COVER_TYPE_DIRE || this.drawtype === VIDEO_DRAWX_COVER_TYPE_LINE || this.drawtype === VIDEO_DRAWX_COVER_TYPE_RECT || this.drawtype === VIDEO_DRAWX_COVER_TYPE_DIRE2) {
    this.drawhandle.startpoint.x = 0;
    this.drawhandle.startpoint.y = 0;
    this.drawhandle.endpoint.x = 0;
    this.drawhandle.endpoint.y = 0;
    this.drawhandle.point2 = [  // ---------------line 2
      {
        startpoint1: new fun_point(0, 0),
        endpoint1: new fun_point(0, 0),
      },
      {
        startpoint2: new fun_point(0, 0),
        endpoint2: new fun_point(0, 0),
      },
    ];
  } else if (this.drawtype === VIDEO_DRAWX_COVER_TYPE_PATH) {
    this.drawhandle.startpoint.x = 0;
    this.drawhandle.startpoint.y = 0;
    this.drawhandle.endpoint.x = 0;
    this.drawhandle.endpoint.y = 0;
    this.drawhandle.resvpt1.x = 0;
    this.drawhandle.resvpt1.y = 0;
    this.drawhandle.resvpt2.x = 0;
    this.drawhandle.resvpt2.y = 0;
    this.drawhandle.drawindex = 0;
    this.drawhandle.pointchanged = true;
  } else {
    this.drawhandle.piecesvalue = '';
    //this.drawhandle.szpieces.splice(0,this.drawhandle.szpieces.length);
    for (var key in this.drawhandle.szpieces) {
      this.drawhandle.szpieces[key] = 0;
    }
    //this.drawhandle.mask.splice(0,this.drawhandle.mask.length);
    for (var key in this.drawhandle.mask) {
      this.drawhandle.mask[key] = 0;
    }
  }
}

function video_drawx_setvalue(a, b, c, d) {
  if (this.parameters == null) {
    this.parameters = new video_drawx_parameters(a, b, c, d);
  } else {
    this.parameters.a = a;
    this.parameters.b = b;
    this.parameters.c = c;
    this.parameters.d = d;
  }
  if (this.drawtype === VIDEO_DRAWX_COVER_TYPE_LINE || this.drawtype === VIDEO_DRAWX_COVER_TYPE_RECT || this.drawtype === VIDEO_DRAWX_COVER_TYPE_DIRE || this.drawtype === VIDEO_DRAWX_COVER_TYPE_DIRE2) {
    this.drawhandle.startpoint.x = (a.x * this.drawhandle.drawwidth) / 100;
    this.drawhandle.startpoint.y = (a.y * this.drawhandle.drawheight) / 100;
    this.drawhandle.endpoint.x = (b.x * this.drawhandle.drawwidth) / 100;
    this.drawhandle.endpoint.y = (b.y * this.drawhandle.drawheight) / 100;
    if (c && d) {
      const draw_H = this.drawhandle.drawheight;
      const draw_W = this.drawhandle.drawwidth;
      this.drawhandle.point2 = [
        {
          startpoint1: {
            x: (a.x * draw_W) / 100,
            y: (a.y * draw_H) / 100,
          },
          endpoint1: {
            x: (b.x * draw_W) / 100,
            y: (b.y * draw_H) / 100,
          },
        }, {
          startpoint2: {
            x: (c.x * draw_W) / 100,
            y: (c.y * draw_H) / 100,
          },
          endpoint2: {
            x: (d.x * draw_W) / 100,
            y: (d.y * draw_H) / 100,
          },
        }
      ]
    }
  } else if (this.drawtype === VIDEO_DRAWX_COVER_TYPE_PATH) {
    this.drawhandle.startpoint = new fun_point((a.x * this.drawhandle.drawwidth) / 100, (a.y * this.drawhandle.drawheight) / 100);
    this.drawhandle.endpoint = new fun_point((b.x * this.drawhandle.drawwidth) / 100, (b.y * this.drawhandle.drawheight) / 100);
    this.drawhandle.resvpt1 = new fun_point((c.x * this.drawhandle.drawwidth) / 100, (c.y * this.drawhandle.drawheight) / 100);
    this.drawhandle.resvpt2 = new fun_point((d.x * this.drawhandle.drawwidth) / 100, (d.y * this.drawhandle.drawheight) / 100);
    this.drawhandle.bdrawpath = true;
    this.drawhandle.drawindex = 4;
    this.drawhandle.pointcache = String(a.x) + ',' + String(a.y) + ',' + String(b.x) + ',' + String(b.y) + ',' + String(c.x) + ',' + String(c.y) + ',' + String(d.x) + ',' + String(d.y);
    this.drawhandle.pointchanged = false;
  } else {
    if (c !== null) {
      this.drawhandle.gridrows = a;
      this.drawhandle.gridcolumns = b;
      this.drawhandle.piecesvalue = c;
      var strv = c.split(',');
      for (var r = 0; r < a; r++) {
        for (var col = 0; col < b; col++) {
          var pos = r * b + col;
          var idx = Math.floor(pos / 32);
          var bit = 31 - (pos % 32);
          var mask = parseInt(strv[idx], 16);
          this.drawhandle.szpieces[pos] = (mask >> bit) & 0x01;

          if (((mask >> bit) & 0x01) == 1) {
            this.drawhandle.mask[idx] |= 0x1 << bit;
          } else {
            this.drawhandle.mask[idx] &= ~(0x1 << bit);
          }
        }
      }
    }
  }
}

function fun_points_sort(a, b, c, d, x) {
  var ptarr = new Array(new fun_point(a.x, a.y), new fun_point(b.x, b.y), new fun_point(c.x, c.y), new fun_point(d.x, d.y));
  var len = ptarr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      var bsw = false;
      if (x === 0) {
        if (ptarr[j].x > ptarr[j + 1].x) {
          bsw = true;
        } else if (ptarr[j].x == ptarr[j + 1].x && ptarr[j].y > ptarr[j + 1].y) {
          bsw = true;
        }
      } else if (x === 1) {
        if (ptarr[j].y > ptarr[j + 1].y) {
          bsw = true;
        } else if (ptarr[j].y == ptarr[j + 1].y && ptarr[j].x > ptarr[j + 1].x) {
          bsw = true;
        }
      } else if (x === 2) {
        if (ptarr[j].x < ptarr[j + 1].x) {
          bsw = true;
        } else if (ptarr[j].x == ptarr[j + 1].x && ptarr[j].y < ptarr[j + 1].y) {
          bsw = true;
        }
      } else if (x === 3) {
        if (ptarr[j].y < ptarr[j + 1].y) {
          bsw = true;
        } else if (ptarr[j].y == ptarr[j + 1].y && ptarr[j].x < ptarr[j + 1].x) {
          bsw = true;
        }
      }
      if (bsw) {
        var temp = new fun_point(ptarr[j].x, ptarr[j].y);
        ptarr[j].x = ptarr[j + 1].x;
        ptarr[j].y = ptarr[j + 1].y;
        ptarr[j + 1].x = temp.x;
        ptarr[j + 1].y = temp.y;
      }
    }
  }
  return ptarr;
}

function fun_ispointinline(a, b, c, d, x) {
  if (0 === x) {
    if (d.x > a.x && d.x > b.x && d.x > c.x) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (d.y > a.y && d.y > b.y && d.y > c.y) {
      return 1;
    } else {
      return 0;
    }
  }
  return 0;
}

function fun_lineedge(a, b, c) {
  var r1 = (b.x - a.x) / (b.y - a.y);
  var r2 = (b.x - c.x) / (b.y - c.y);
  if (r1 > 0 && r2 > 0) {
    //if(b.x-a.x > b.x-c.x){
    //	return 1;

    if (b.x - a.x > 0) {
      if (r2 < r1) {
        return 1;
      }
    } else {
      if (r2 > r1) {
        return 1;
      }
    }
  } else if (r1 <= 0 && r2 > 0) {
    if (b.x - a.x >= 0) {
      return 1;
    }
  } else if (r1 > 0 && r2 <= 0) {
    if (b.x - a.x <= 0) {
      return 1;
    }
  } else if (r1 <= 0 && r2 <= 0) {
    //if(Math.abs(b.x-a.x) < Math.abs(b.x-c.x)){
    //	return 1;

    if (b.x - c.x < b.x - a.x && b.x - c.x < 0) {
      return 1;
    } else if (b.x - c.x > b.x - a.x && b.x - c.x > 0) {
      return 1;
    }
  }
  return 0;
}

function fun_point_filter(a, b, c, d, x) {
  var pt = a;
  var pt1 = null;
  if (x === 0) {
    pt = pt.x > b.x ? b : pt;
    if (c !== null) {
      pt = pt.x > c.x ? c : pt;
    }
    if (d !== null) {
      pt = pt.x > d.x ? d : pt;
    }
    pt1 = pt.x === b.x ? b : null;
    if (c !== null) {
      pt1 = pt.x === c.x ? c : null;
    }
    if (d !== null) {
      pt1 = pt.x === d.x ? d : null;
    }
    if (!pt1) {
      return [pt, pt1];
    }
    return pt;
  } else if (x === 1) {
    pt = pt.y < b.y ? pt : b;
    if (c !== null) {
      pt = pt.y < c.y ? pt : c;
    }
    if (d !== null) {
      pt = pt.y < d.y ? pt : d;
    }
    pt1 = pt.y === b.y ? b : null;
    if (c !== null) {
      pt1 = pt.y === c.y ? c : null;
    }
    if (d !== null) {
      pt1 = pt.y === d.y ? d : null;
    }
    if (!pt1) {
      return [pt, pt1];
    }
    return pt;
  } else if (x === 2) {
    pt = pt.x > b.x ? pt : b;
    if (c !== null) {
      pt = pt.x > c.x ? pt : c;
    }
    if (d !== null) {
      pt = pt.x > d.x ? pt : d;
    }
    pt1 = pt.x === b.x ? b : null;
    if (c !== null) {
      pt1 = pt.x === c.x ? c : null;
    }
    if (d !== null) {
      pt1 = pt.x === d.x ? d : null;
    }
    if (!pt1) {
      return [pt, pt1];
    }
    return pt;
  } else if (x === 3) {
    pt = pt.y > b.y ? pt : b;
    if (c !== null) {
      pt = pt.y > c.y ? pt : c;
    }
    if (d !== null) {
      pt = pt.y > d.y ? pt : d;
    }
    pt1 = pt.y === b.y ? b : null;
    if (c !== null) {
      pt1 = pt.y === c.y ? c : null;
    }
    if (d !== null) {
      pt1 = pt.y === d.y ? d : null;
    }
    if (!pt1) {
      return [pt, pt1];
    }
    return pt;
  }
  return null;
}

function IsClockwise(pt1, pt2, pt3, d1, d2) {
  if (d1 > 0 && d2 > 0) {
    if ((pt2.x - pt1.x > 0 && pt3.x - pt2.x > 0) || (pt2.x - pt1.x < 0 && pt3.x - pt2.x < 0)) {
      if (d1 < d2) {
        return true;
      }
    } else {
      if (d1 > d2) {
        return true;
      }
    }
  } else if (d1 < 0 && d2 < 0) {
    if ((pt2.x - pt1.x > 0 && pt3.x - pt2.x > 0) || (pt2.y - pt1.y > 0 && pt3.y - pt2.y > 0)) {
      if (d1 < d2) {
        return true;
      }
    } else {
      if (d1 > d2) {
        return true;
      }
    }
  } else if (d1 < 0 && d2 > 0) {
    if (pt2.x - pt1.x > 0) {
      if (pt3.x - pt2.x > 0) {
        return true;
      }
    } else {
      if (pt3.x - pt2.x < 0) {
        return true;
      }
    }
  } else if (d1 > 0 && d2 < 0) {
    if (pt2.x - pt1.x > 0) {
      if (pt3.x - pt2.x < 0) {
        return true;
      }
    } else {
      if (pt3.x - pt2.x > 0) {
        return true;
      }
    }
  } else if (d1 != 0 && d2 == 0) {
    if (d1 > 0) {
      if (pt3.x == pt2.x) {
        if (pt3.y > pt2.y) {
          if (pt2.x - pt1.x > 0) {
            return true;
          }
        } else {
          if (pt2.x - pt1.x < 0) {
            return true;
          }
        }
      } else if (pt3.y == pt2.y) {
        if (pt3.x > pt2.x) {
          if (pt2.x - pt1.x < 0) {
            return true;
          }
        } else {
          if (pt2.x - pt1.x > 0) {
            return true;
          }
        }
      }
    } else {
      if (pt3.x == pt2.x) {
        if (pt3.y > pt2.y) {
          if (pt2.x - pt1.x > 0) {
            return true;
          }
        } else {
          if (pt2.x - pt1.x < 0) {
            return true;
          }
        }
      } else if (pt3.y == pt2.y) {
        if (pt3.x > pt2.x) {
          if (pt2.x - pt1.x > 0) {
            return true;
          }
        } else {
          if (pt2.x - pt1.x < 0) {
            return true;
          }
        }
      }
    }
  } else if (d1 == 0 && d2 != 0) {
    if (pt2.y == pt1.y) {
      if (pt2.x - pt1.x > 0) {
        if (pt3.y - pt2.y > 0) {
          return true;
        }
      } else {
        if (pt3.y - pt2.y < 0) {
          return true;
        }
      }
    } else {
      if (pt2.y - pt1.y > 0) {
        if (pt3.x - pt2.x < 0) {
          return true;
        }
      } else {
        if (pt3.x - pt2.x > 0) {
          return true;
        }
      }
    }
  } else if (d1 == 0 && d2 == 0) {
    if ((pt2.y - pt1.y < 0 && pt3.x - pt2.x > 0) || (pt2.x - pt1.x > 0 && pt3.y - pt2.y > 0) || (pt2.y - pt1.y > 0 && pt3.x - pt2.x < 0) || (pt2.x - pt1.x < 0 && pt3.y - pt2.y < 0)) {
      return true;
    }
  }
  return false;
}

function fun_convertto_percent(szPts) {
  var x0, y0, x1, y1, x2, y2, x3, y3;
  var d1, d2, da, db, dc, dd;

  if (szPts[2].x != szPts[0].x) {
    d1 = (szPts[2].y - szPts[0].y) / (szPts[2].x - szPts[0].x);
  } else {
    d1 = 0;
  }
  if (szPts[3].x != szPts[1].x) {
    d2 = (szPts[3].y - szPts[1].y) / (szPts[3].x - szPts[1].x);
  } else {
    d2 = 0;
  }
  if (szPts[1].x != szPts[0].x) {
    da = (szPts[1].y - szPts[0].y) / (szPts[1].x - szPts[0].x);
  } else {
    da = 0;
  }
  if (szPts[2].x != szPts[1].x) {
    db = (szPts[2].y - szPts[1].y) / (szPts[2].x - szPts[1].x);
  } else {
    db = 0;
  }
  if (szPts[3].x != szPts[2].x) {
    dc = (szPts[3].y - szPts[2].y) / (szPts[3].x - szPts[2].x);
  } else {
    dc = 0;
  }
  if (szPts[0].x != szPts[3].x) {
    dd = (szPts[0].y - szPts[3].y) / (szPts[0].x - szPts[3].x);
  } else {
    dd = 0;
  }
  var bclockwise = IsClockwise(szPts[0], szPts[1], szPts[2], da, db);

  if (d1 > 0) {
    if (bclockwise) {
      if (szPts[2].x - szPts[0].x < 0) {
        x1 = Math.floor(szPts[1].x / 6.4);
        y1 = Math.ceil(szPts[1].y / 3.6);
        x3 = Math.ceil(szPts[3].x / 6.4);
        y3 = Math.floor(szPts[3].y / 3.6);
      } else {
        x1 = Math.ceil(szPts[1].x / 6.4);
        y1 = Math.floor(szPts[1].y / 3.6);
        x3 = Math.floor(szPts[3].x / 6.4);
        y3 = Math.ceil(szPts[3].y / 3.6);
      }
    } else {
      if (szPts[2].x - szPts[0].x < 0) {
        x1 = Math.ceil(szPts[1].x / 6.4);
        y1 = Math.floor(szPts[1].y / 3.6);
        x3 = Math.floor(szPts[3].x / 6.4);
        y3 = Math.ceil(szPts[3].y / 3.6);
      } else {
        x1 = Math.floor(szPts[1].x / 6.4);
        y1 = Math.ceil(szPts[1].y / 3.6);
        x3 = Math.ceil(szPts[3].x / 6.4);
        y3 = Math.floor(szPts[3].y / 3.6);
      }
    }
  } else if (d1 < 0) {
    if (bclockwise) {
      if (szPts[2].x - szPts[0].x > 0) {
        x1 = Math.floor(szPts[1].x / 6.4);
        y1 = Math.floor(szPts[1].y / 3.6);
        x3 = Math.ceil(szPts[3].x / 6.4);
        y3 = Math.ceil(szPts[3].y / 3.6);
      } else {
        x1 = Math.ceil(szPts[1].x / 6.4);
        y1 = Math.ceil(szPts[1].y / 3.6);
        x3 = Math.floor(szPts[3].x / 6.4);
        y3 = Math.floor(szPts[3].y / 3.6);
      }
    } else {
      if (szPts[2].x - szPts[0].x < 0) {
        x1 = Math.floor(szPts[1].x / 6.4);
        y1 = Math.floor(szPts[1].y / 3.6);
        x3 = Math.ceil(szPts[3].x / 6.4);
        y3 = Math.ceil(szPts[3].y / 3.6);
      } else {
        x1 = Math.ceil(szPts[1].x / 6.4);
        y1 = Math.ceil(szPts[1].y / 3.6);
        x3 = Math.floor(szPts[3].x / 6.4);
        y3 = Math.floor(szPts[3].y / 3.6);
      }
    }
  } else if (d1 == 0) {
    if (bclockwise) {
      if (szPts[2].x == szPts[0].x) {
        if (szPts[2].y > szPts[0].y) {
          x1 = Math.ceil(szPts[1].x / 6.4);
          y1 = Math.floor(szPts[1].y / 3.6);
          x3 = Math.floor(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        } else {
          x1 = Math.floor(szPts[1].x / 6.4);
          y1 = Math.floor(szPts[1].y / 3.6);
          x3 = Math.ceil(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        }
      } else {
        if (szPts[2].x < szPts[0].x) {
          x1 = Math.floor(szPts[1].x / 6.4);
          y1 = Math.ceil(szPts[1].y / 3.6);
          x3 = Math.floor(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        } else {
          x1 = Math.floor(szPts[1].x / 6.4);
          y1 = Math.floor(szPts[1].y / 3.6);
          x3 = Math.ceil(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        }
      }
    } else {
      if (szPts[2].x == szPts[0].x) {
        if (szPts[2].y > szPts[0].y) {
          x1 = Math.ceil(szPts[1].x / 6.4);
          y1 = Math.floor(szPts[1].y / 3.6);
          x3 = Math.floor(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        } else {
          x1 = Math.floor(szPts[1].x / 6.4);
          y1 = Math.floor(szPts[1].y / 3.6);
          x3 = Math.ceil(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        }
      } else {
        if (szPts[2].x > szPts[0].x) {
          x1 = Math.floor(szPts[1].x / 6.4);
          y1 = Math.floor(szPts[1].y / 3.6);
          x3 = Math.ceil(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        } else {
          x1 = Math.ceil(szPts[1].x / 6.4);
          y1 = Math.floor(szPts[1].y / 3.6);
          x3 = Math.floor(szPts[3].x / 6.4);
          y3 = Math.floor(szPts[3].y / 3.6);
        }
      }
    }
  }
  if (d2 > 0) {
    if (bclockwise) {
      if (szPts[3].x - szPts[1].x > 0) {
        x0 = Math.floor(szPts[0].x / 6.4);
        y0 = Math.ceil(szPts[0].y / 3.6);
        x2 = Math.ceil(szPts[2].x / 6.4);
        y2 = Math.floor(szPts[2].y / 3.6);
      } else {
        x0 = Math.ceil(szPts[0].x / 6.4);
        y0 = Math.floor(szPts[0].y / 3.6);
        x2 = Math.floor(szPts[2].x / 6.4);
        y2 = Math.ceil(szPts[2].y / 3.6);
      }
    } else {
      if (szPts[3].x - szPts[1].x > 0) {
        x0 = Math.ceil(szPts[0].x / 6.4);
        y0 = Math.floor(szPts[0].y / 3.6);
        x2 = Math.floor(szPts[2].x / 6.4);
        y2 = Math.ceil(szPts[2].y / 3.6);
      } else {
        x0 = Math.floor(szPts[0].x / 6.4);
        y0 = Math.ceil(szPts[0].y / 3.6);
        x2 = Math.ceil(szPts[2].x / 6.4);
        y2 = Math.floor(szPts[2].y / 3.6);
      }
    }
  } else if (d2 < 0) {
    if (bclockwise) {
      if (szPts[3].x - szPts[1].x < 0) {
        x0 = Math.floor(szPts[0].x / 6.4);
        y0 = Math.floor(szPts[0].y / 3.6);
        x2 = Math.ceil(szPts[2].x / 6.4);
        y2 = Math.ceil(szPts[2].y / 3.6);
      } else {
        x0 = Math.ceil(szPts[0].x / 6.4);
        y0 = Math.ceil(szPts[0].y / 3.6);
        x2 = Math.floor(szPts[2].x / 6.4);
        y2 = Math.floor(szPts[2].y / 3.6);
      }
    } else {
      if (szPts[3].x - szPts[1].x > 0) {
        x0 = Math.floor(szPts[0].x / 6.4);
        y0 = Math.floor(szPts[0].y / 3.6);
        x2 = Math.ceil(szPts[2].x / 6.4);
        y2 = Math.ceil(szPts[2].y / 3.6);
      } else {
        x0 = Math.ceil(szPts[0].x / 6.4);
        y0 = Math.ceil(szPts[0].y / 3.6);
        x2 = Math.floor(szPts[2].x / 6.4);
        y2 = Math.floor(szPts[2].y / 3.6);
      }
    }
  } else if (d2 == 0) {
    if (bclockwise) {
      if (szPts[3].x == szPts[1].x) {
        if (szPts[3].y > szPts[1].y) {
          x0 = Math.ceil(szPts[0].x / 6.4);
          y0 = Math.floor(szPts[0].y / 3.6);
          x2 = Math.floor(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        } else {
          x0 = Math.floor(szPts[0].x / 6.4);
          y0 = Math.floor(szPts[0].y / 3.6);
          x2 = Math.ceil(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        }
      } else {
        if (szPts[3].x < szPts[1].x) {
          x0 = Math.floor(szPts[0].x / 6.4);
          y0 = Math.ceil(szPts[0].y / 3.6);
          x2 = Math.floor(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        } else {
          x0 = Math.floor(szPts[0].x / 6.4);
          y0 = Math.floor(szPts[0].y / 3.6);
          x2 = Math.ceil(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        }
      }
    } else {
      if (szPts[3].x == szPts[1].x) {
        if (szPts[3].y > szPts[1].y) {
          x0 = Math.ceil(szPts[0].x / 6.4);
          y0 = Math.floor(szPts[0].y / 3.6);
          x2 = Math.floor(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        } else {
          x0 = Math.floor(szPts[0].x / 6.4);
          y0 = Math.floor(szPts[0].y / 3.6);
          x2 = Math.ceil(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        }
      } else {
        if (szPts[3].x > szPts[1].x) {
          x0 = Math.floor(szPts[0].x / 6.4);
          y0 = Math.floor(szPts[0].y / 3.6);
          x2 = Math.ceil(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        } else {
          x0 = Math.ceil(szPts[0].x / 6.4);
          y0 = Math.floor(szPts[0].y / 3.6);
          x2 = Math.floor(szPts[2].x / 6.4);
          y2 = Math.floor(szPts[2].y / 3.6);
        }
      }
    }
  }
  return [new fun_point(x0, y0), new fun_point(x1, y1), new fun_point(x2, y2), new fun_point(x3, y3)];
}

function fun_check_path_points(a, b, c, d) {
  if ((a.x === b.x && a.y === b.y) || (a.x === c.x && a.y === c.y) || (a.x === d.x && a.y === d.y) || (b.x === c.x && b.y === c.y) || (b.x === d.x && b.y === d.y) || (c.x === d.x && c.y === d.y)) {
    return null;
  }

  var pt1 = new fun_point(0, 0),
    pt2 = new fun_point(0, 0),
    pt3 = new fun_point(0, 0),
    pt4 = new fun_point(0, 0);
  var f1 = fun_points_sort(a, b, c, d, 0);
  var f2 = fun_points_sort(a, b, c, d, 1);
  var f3 = fun_points_sort(a, b, c, d, 2);
  var f4 = fun_points_sort(a, b, c, d, 3);

  if (f1.length === 4 && f2.length === 4 && f3.length === 4 && f4.length === 4) {
    if (a.x < b.x && fun_checkpoint_rotation(a, b, c, d, 640, 360)) {
      pt1.x = a.x;
      pt1.y = a.y;
      pt2.x = b.x;
      pt2.y = b.y;
      pt3.x = c.x;
      pt3.y = c.y;
      pt4.x = d.x;
      pt4.y = d.y;
    } else if (b.x < c.x && fun_checkpoint_rotation(b, c, d, a, 640, 360)) {
      pt1.x = b.x;
      pt1.y = b.y;
      pt2.x = c.x;
      pt2.y = c.y;
      pt3.x = d.x;
      pt3.y = d.y;
      pt4.x = a.x;
      pt4.y = a.y;
    } else if (c.x < d.x && fun_checkpoint_rotation(c, d, a, b, 640, 360)) {
      pt1.x = c.x;
      pt1.y = c.y;
      pt2.x = d.x;
      pt2.y = d.y;
      pt3.x = a.x;
      pt3.y = a.y;
      pt4.x = b.x;
      pt4.y = b.y;
    } else if (d.x < a.x && fun_checkpoint_rotation(d, a, b, c, 640, 360)) {
      pt1.x = d.x;
      pt1.y = d.y;
      pt2.x = a.x;
      pt2.y = a.y;
      pt3.x = b.x;
      pt3.y = b.y;
      pt4.x = c.x;
      pt4.y = c.y;
    } else if (d.x < c.x && fun_checkpoint_rotation(d, c, b, a, 640, 360)) {
      pt1.x = d.x;
      pt1.y = d.y;
      pt2.x = c.x;
      pt2.y = c.y;
      pt3.x = b.x;
      pt3.y = b.y;
      pt4.x = a.x;
      pt4.y = a.y;
    } else if (c.x < b.x && fun_checkpoint_rotation(c, b, a, d, 640, 360)) {
      pt1.x = c.x;
      pt1.y = c.y;
      pt2.x = b.x;
      pt2.y = b.y;
      pt3.x = a.x;
      pt3.y = a.y;
      pt4.x = d.x;
      pt4.y = d.y;
    } else if (b.x < a.x && fun_checkpoint_rotation(b, a, d, c, 640, 360)) {
      pt1.x = b.x;
      pt1.y = b.y;
      pt2.x = a.x;
      pt2.y = a.y;
      pt3.x = d.x;
      pt3.y = d.y;
      pt4.x = c.x;
      pt4.y = c.y;
    } else if (a.x < d.x && fun_checkpoint_rotation(a, d, c, b, 640, 360)) {
      pt1.x = a.x;
      pt1.y = a.y;
      pt2.x = d.x;
      pt2.y = d.y;
      pt3.x = c.x;
      pt3.y = c.y;
      pt4.x = b.x;
      pt4.y = b.y;
    } else {
      console.log('points error--');
    }

    // pt1.x = Math.floor(pt1.x * 100 / this.drawhandle.drawwidth);
    // pt1.y = Math.floor(pt1.y * 100 / this.drawhandle.drawheight);

    // pt2.x = Math.floor(pt2.x * 100 / this.drawhandle.drawwidth);
    // pt2.y = Math.floor(pt2.y * 100 / this.drawhandle.drawheight);

    // pt3.x = Math.floor(pt3.x * 100 / this.drawhandle.drawwidth);
    // pt3.y = Math.floor(pt3.y * 100 / this.drawhandle.drawheight);

    // pt4.x = Math.floor(pt4.x * 100 / this.drawhandle.drawwidth);
    // pt4.y = Math.floor(pt4.y * 100 / this.drawhandle.drawheight);

    var pts = fun_convertto_percent([pt1, pt2, pt3, pt4]);
    if (pts[0].x >= pts[1].x) {
      if (pt2[1].x > 0) {
        pts[0].x = pts[1].x - 1;
      } else {
        pts[1].x = pts[0].x + 1;
      }
    }
    return new Array(pts[0], pts[1], pts[2], pts[3]);

    // if (pt1.x >= pt2.x) {
    //     if (pt2.x > 0) {
    //         pt1.x = pt2.x - 1;
    //     } else {
    //         pt2.x = pt1.x + 1;
    //     }
    // }
    //return new Array(pt1, pt2, pt3, pt4);
  }
  return null;
}

function fun_checkpoint_rotation(a, b, c, d, x, y) {
  var va = (b.y - a.y) / (b.x - a.x);
  var vb = (c.y - b.y) / (c.x - b.x);
  // if(c.x <= b.x && c.y < b.y){
  // 	if(vb < va && va > 0){
  // 		return true;
  // 	}
  // }else if(c.x > b.x && c.y <= b.y){
  // 	if(va < 0 && vb > va){
  // 		return true;
  // 	}
  // }else if(c.x >= b.x && c.y > b.y){
  // 	if(vb > va){
  // 		return true;
  // 	}
  // }else if(c.x < b.x && c.y >= b.y) {
  // 	if(va > 0 || (va < 0 && vb < va)){
  // 		return true;
  // 	}
  // }
  if (va < vb && c.x >= b.x) {
    return true;
  } else if (va > vb && c.x < b.x && c.y > b.y) {
    return true;
  }
  return false;
}

function fun_min(a, b, c) {
  var i = a < b ? a : b;
  i = i < c ? i : c;
  return i;
}

function fun_max(a, b, c) {
  var i = a > b ? a : b;
  i = i > c ? i : c;
  return i;
}

function video_drawx_getvalue() {
  if (this.drawtype === VIDEO_DRAWX_COVER_TYPE_LINE || this.drawtype === VIDEO_DRAWX_COVER_TYPE_RECT || this.drawtype === VIDEO_DRAWX_COVER_TYPE_DIRE || this.drawtype === VIDEO_DRAWX_COVER_TYPE_DIRE2) {
    var a = Math.floor((this.drawhandle.startpoint.x * 100) / this.drawhandle.drawwidth);
    var b = Math.floor((this.drawhandle.startpoint.y * 100) / this.drawhandle.drawheight);
    var c = Math.floor((this.drawhandle.endpoint.x * 100) / this.drawhandle.drawwidth);
    var d = Math.floor((this.drawhandle.endpoint.y * 100) / this.drawhandle.drawheight);
    if (lineNum == 2) {
      const [line1, line2] = this.drawhandle.point2;
      const draw_W = this.drawhandle.drawwidth;
      const draw_H = this.drawhandle.drawheight;


      const isCorrectLine = calculateAngle(line1.startpoint1, line1.endpoint1, line2.startpoint2, line2.endpoint2);
         return video_drawx_parameters(
         new fun_point((line1.startpoint1.x * 100) / draw_W, (line1.startpoint1.y * 100) / draw_H),
           new fun_point((line1.endpoint1.x * 100) / draw_W, (line1.endpoint1.y * 100) / draw_H),
        new fun_point(((isCorrectLine ? 0 : line2.startpoint2.x) * 100) / draw_W, ((isCorrectLine ? 0 : line2.startpoint2.y) * 100) / draw_H),
        new fun_point(((isCorrectLine ? 0 : line2.endpoint2.x) * 100) / draw_W, ((isCorrectLine ? 0 : line2.endpoint2.y) * 100) / draw_H),
      );
    } else {
      return video_drawx_parameters(new fun_point(a, b), new fun_point(c, d), null, null);
    }
  } else if (this.drawtype === VIDEO_DRAWX_COVER_TYPE_PATH) {
    if (!this.drawhandle.pointchanged) {
      var pts = this.drawhandle.pointcache.split(',');
      if (pts.length === 8) {
        return new Array(new fun_point(parseInt(pts[0]), parseInt(pts[1])), new fun_point(parseInt(pts[2]), parseInt(pts[3])), new fun_point(parseInt(pts[4]), parseInt(pts[5])), new fun_point(parseInt(pts[6]), parseInt(pts[7])));
      } else {
        return new Array(new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0));
      }
    } else if (this.drawhandle.drawindex === 0) {
      return new Array(new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0));
    } else if (this.drawhandle.drawindex === 4) {
      return fun_check_path_points.call(this, this.drawhandle.startpoint, this.drawhandle.endpoint, this.drawhandle.resvpt1, this.drawhandle.resvpt2);
    } else {
      return new Array(new fun_point(0, 0), new fun_point(0, 0), new fun_point(0, 0));
    }
  } else if (this.drawtype === VIDEO_DRAWX_COVER_TYPE_PICE) {
    return video_drawx_parameters(this.drawhandle.startpoint, this.drawhandle.endpoint, this.drawhandle.mask);
  }
}

function video_drawx_setrects(rects) {
  if (null === this.drawhandle || this.drawtype !== VIDEO_DRAWX_COVER_TYPE_RECT) {
    return false;
  }
  this.drawhandle.bdrawrects = false;
  if (typeof rects === 'object') {
    this.drawhandle.rectangles = new Array();
    for (var i = 0; i < rects.length; i++) {
      this.drawhandle.rectangles[i] = fun_rectangle(rects[i].left, rects[i].top, rects[i].width, rects[i].height);
    }
  }
  if (this.drawhandle.rectangles.length > 0) {
    this.drawhandle.bdrawrects = true;
    return true;
  }
  return false;
}

function video_drawx_getrects() {
  if (null === this.drawhandle || this.drawtype !== VIDEO_DRAWX_COVER_TYPE_RECT) {
    return null;
  }
  if (null === this.drawhandle.rectangles) {
    return null;
  }
  return this.drawhandle.rectangles;
}

function video_drawx_setdrawindex(index) {
  if (null === this.drawhandle || this.drawtype !== VIDEO_DRAWX_COVER_TYPE_RECT) {
    return false;
  }
  this.drawhandle.drawindex = index;
  return true;
}

function video_drawx_setcomplet_callback(funcallback) {
  if (null === this.drawhandle || this.drawtype !== VIDEO_DRAWX_COVER_TYPE_RECT) {
    return false;
  }
  if (typeof funcallback !== 'function') {
    return false;
  }
  this.drawhandle.funrectcmpt = funcallback;
  return true;
}

function video_drawx_get_rectangle_persent() {
  var rectchild = (this.drawhandle.endpoint.x - this.drawhandle.startpoint.x) * (this.drawhandle.endpoint.y - this.drawhandle.startpoint.y);
  var rectparent = this.drawhandle.drawwidth * this.drawhandle.drawheight;
  return (rectchild / rectparent) * 100;
}

function video_drawx_enable_draw(bdraw) {
  if (typeof bdraw === 'boolean') {
    this.drawhandle.bdraw = bdraw;
  }
}

function CurBrowserIsIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;
  return false;
}

function compatibility_firefox() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? (Sys.ie = s[1]) : (s = ua.match(/firefox\/([\d.]+)/)) ? (Sys.firefox = s[1]) : (s = ua.match(/chrome\/([\d.]+)/)) ? (Sys.chrome = s[1]) : (s = ua.match(/opera.([\d.]+)/)) ? (Sys.opera = s[1]) : (s = ua.match(/version\/([\d.]+).*safari/)) ? (Sys.safari = s[1]) : 0;
  var edge = ua.match(/trident\/([\d.])/);

  if (Sys.firefox || Sys.safari) {
    return true;
  }
  return false;
}

function fun_getrtmpport() {
  var tagport = 1935;
  $.ajax({
    url: '/action/get?subject=netserv',
    type: 'post',
    async: false,
    dataType: 'xml',
    success: function (data) {
      tagport = $(data).find('rtmp').text();
    }
  });
  return parseInt(tagport);
}

function video_drawx_show_video(parent, childnum, width, height) {
  sdk_getipcparam('/action/get?subject=videoenc&stream=0', function (result) {
    if (result != false) {
      $xml = $(result);
      var codec = $xml.find('codec').text();
      if (codec == 1) {
        $('#' + parent).html("<img id='img_video_show_" + childnum + "' src='/action/snap' style='width: 100%;height: 100%'/>");
        video_drawx_get_video_picture();
      } else if (codec == 2) {
        var Img_T = "<img style='width: 100%;height: 100%;' src='/action/stream?subject=mjpeg&stream=0' />";
        $('#' + parent).html(Img_T);
      } else {
        $('#' + parent).html('<video id="videoElement" height=' + (height - 10) + ' width=' + width + ' style="border-right: 1px solid black;border-bottom: 1px solid black;" name="videoElement" class="centeredVideo" autoplay></video>');
        var videoElement = document.getElementById('videoElement');
        videoElement.addEventListener(
          'click',
          function mouseHandler(event) {
            // 阻止视频默认点击事件
            event.preventDefault();
          },
          false
        );
        bv = window.mpegts.createPlayer(
          {
            type: 'flv',
            url: document.location.origin + '/action/stream?subject=flvlive&stream=0',
            withCredentials: false,
            liveBufferLatencyChasing: true,
            hasAudio: false
          },
          {
            lazyLoadMaxDuration: 3 * 60,
            seekType: 'range',
            liveBufferLatencyChasing: true
          }
        );
        bv.attachMediaElement(videoElement);
        bv.load();
        bv.play();
      }
    }
  });
}

function fun_flash_checker(drawlayer) {
  if (!CurBrowserIsIE()) {
    return;
  }
  var bfind = false;
  for (var i = 0, len = navigator.plugins.length; i < len; i++) {
    var plugin = navigator.plugins[i];
    if (plugin.name.indexOf('Shockwave Flash') >= 0) {
      bfind = true;
      break;
    }
  }
  if (!bfind) {
    $('#' + drawlayer).css('display', 'none');
  }
}

function video_drawx_get_video_picture() {
  if (video_drawx_set.length <= 0) return;
  for (var index in video_drawx_set) {
    Math.random() * 700;
    var num = Math.random() * 700 + 800;
    num = parseInt(num, 10);
    var tagpash = '/action/snap?t=' + String(num);
    $('#' + video_drawx_set[index].pictureid).attr('src', tagpash);
    setTimeout('video_drawx_get_video_picture();', 1000);
  }
}

function mousePosition(evt) {
  return { x: evt.offsetX, y: evt.offsetY };
}

function video_drawx_parameters(a, b, c, d) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  return this;
}

function video_drawx_check_rectangle(startpoint, endpoint) {
  if (startpoint.x < endpoint.x && startpoint.y < endpoint.y) {
    return fun_rectangle(startpoint.x, startpoint.y, endpoint.x - startpoint.x, endpoint.y - startpoint.y);
  } else if (startpoint.x > endpoint.x && startpoint.y > endpoint.y) {
    return fun_rectangle(endpoint.x, endpoint.y, startpoint.x - endpoint.x, startpoint.y - endpoint.y);
  } else if (startpoint.x < endpoint.x && startpoint.y > endpoint.y) {
    return fun_rectangle(startpoint.x, endpoint.y, endpoint.x - startpoint.x, startpoint.y - endpoint.y);
  } else if (startpoint.x > endpoint.x && startpoint.y < endpoint.y) {
    return fun_rectangle(endpoint.x, startpoint.y, startpoint.x - endpoint.x, endpoint.y - startpoint.y);
  } else if (startpoint.x === endpoint.x && startpoint.y > endpoint.y) {
    return fun_rectangle(startpoint.x, endpoint.y, 1, startpoint.y - endpoint.y);
  } else if (startpoint.x === endpoint.x && startpoint.y < endpoint.y) {
    return fun_rectangle(startpoint.x, startpoint.y, 1, endpoint.y - startpoint.y);
  } else if (startpoint.x > endpoint.x && startpoint.y === endpoint.y) {
    return fun_rectangle(endpoint.x, endpoint.y, startpoint.x - endpoint.x, 1);
  } else if (startpoint.x < endpoint.x && startpoint.y === endpoint.y) {
    return fun_rectangle(startpoint.x, startpoint.y, endpoint.x - startpoint.x, 1);
  } else if (startpoint.x === endpoint.x && startpoint.y === endpoint.y) {
    return fun_rectangle(startpoint.x, startpoint.y, 1, 1);
  } else {
    return null;
  }
}

function fun_get_line_extension_point(pt1, pt2, maxx, maxy) {
  var ptret = new fun_point(0, 0);
  var mx, my;
  if (pt1.x !== pt2.x && pt1.y !== pt2.y) {
    if (pt1.x - pt2.x > 0 && pt1.y - pt2.y > 0) {
      my = pt1.y - (pt1.x * (pt1.y - pt2.y)) / (pt1.x - pt2.x);
      if (my >= 0) {
        ptret.x = 0;
        ptret.y = my;
      } else {
        mx = pt1.x - (pt1.y * (pt1.x - pt2.x)) / (pt1.y - pt2.y);
        ptret.x = mx;
        ptret.y = 0;
      }
    } else if (pt1.x - pt2.x < 0 && pt1.y - pt2.y > 0) {
      mx = pt1.x - (pt1.y * (pt1.x - pt2.x)) / (pt1.y - pt2.y);
      if (mx >= 0 && mx <= maxx) {
        ptret.x = mx;
        ptret.y = 0;
      } else {
        my = pt1.y - ((pt1.x - maxx) * (pt1.y - pt2.y)) / (pt1.x - pt2.x);
        ptret.x = maxx;
        ptret.y = my;
      }
    } else if (pt1.x - pt2.x < 0 && pt1.y - pt2.y < 0) {
      mx = pt1.x - ((pt1.y - maxy) * (pt1.x - pt2.x)) / (pt1.y - pt2.y);
      if (mx > 0 && mx <= maxx) {
        ptret.x = mx;
        ptret.y = maxy;
      } else {
        my = pt1.y - ((pt1.x - maxx) * (pt1.y - pt2.y)) / (pt1.x - pt2.x);
        ptret.x = maxx;
        ptret.y = my;
      }
    } else if (pt1.x - pt2.x > 0 && pt1.y - pt2.y < 0) {
      my = pt1.y - (pt1.x * (pt1.y - pt2.y)) / (pt1.x - pt2.x);
      if (my >= 0 && my <= maxy) {
        ptret.x = 0;
        ptret.y = my;
      } else {
        mx = pt1.x - ((pt1.y - maxy) * (pt1.x - pt2.x)) / (pt1.y - pt2.y);
        ptret.x = mx;
        ptret.y = maxy;
      }
    }
    return ptret;
  } else {
    if (pt1.x === pt2.x) {
      if (pt1.y > pt2.y) {
        ptret.x = pt1.x;
        ptret.y = 0;
      } else {
        ptret.x = pt1.x;
        ptret.y = maxy;
      }
    } else {
      if (pt1.x > pt2.x) {
        ptret.x = 0;
        ptret.y = pt2.y;
      } else {
        ptret.x = maxx;
        ptret.y = pt2.y;
      }
    }
    return ptret;
  }
  return null;
}

function painter_mousedown(evt) {
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (this.parentobj.drawtype !== VIDEO_DRAWX_COVER_TYPE_PICE && this.parentobj.drawtype !== VIDEO_DRAWX_COVER_TYPE_PATH) {
    if (this.parentobj.bdrawrects) {
      this.parentobj.temppoint = new fun_point(tempx, tempy);
      this.parentobj.rectangles[this.parentobj.drawindex].left = parseInt(tempx);
      this.parentobj.rectangles[this.parentobj.drawindex].top = parseInt(tempy);
      this.parentobj.rectangles[this.parentobj.drawindex].width = parseInt(tempx) - this.parentobj.rectangles[this.parentobj.drawindex].left;
      this.parentobj.rectangles[this.parentobj.drawindex].height = parseInt(tempy) - this.parentobj.rectangles[this.parentobj.drawindex].top;
    } else {
      this.parentobj.startpoint.x = tempx;
      this.parentobj.startpoint.y = tempy;
      this.parentobj.endpoint.x = tempx;
      this.parentobj.endpoint.y = tempy;
      // ---------------------------------------多线段========================
      let point2 = this.parentobj.point2;
      if (isLine2) {
        point2[1].startpoint2.x = tempx;
        point2[1].startpoint2.y = tempy;
        point2[1].endpoint2.x = tempx;
        point2[1].endpoint2.y = tempy;
      } else {
        point2[0].startpoint1.x = tempx;
        point2[0].startpoint1.y = tempy;
        point2[0].endpoint1.x = tempx;
        point2[0].endpoint1.y = tempy;
        point2[1].startpoint2.x = 0;
        point2[1].startpoint2.y = 0;
        point2[1].endpoint2.x = 0;
        point2[1].endpoint2.y = 0;
      }
      // ---------------------------------------多线段========================
    }
  } else if (this.parentobj.drawtype === VIDEO_DRAWX_COVER_TYPE_PATH) {
    var bchanged = false;
    if (this.parentobj.drawindex === 0) {
      this.parentobj.startpoint.x = tempx;
      this.parentobj.startpoint.y = tempy;
      this.parentobj.drawindex = 1;
      bchanged = true;
    } else if (this.parentobj.drawindex === 1) {
      if (this.parentobj.startpoint.x !== tempx || this.parentobj.startpoint.y !== tempy) {
        this.parentobj.endpoint.x = tempx;
        this.parentobj.endpoint.y = tempy;
        this.parentobj.drawindex = 2;
        bchanged = true;
      }
    } else if (this.parentobj.drawindex === 2) {
      if (!((tempx - this.parentobj.startpoint.x) / (tempy - this.parentobj.startpoint.y) === (this.parentobj.endpoint.x - this.parentobj.startpoint.x) / (this.parentobj.endpoint.y - this.parentobj.startpoint.y))) {
        this.parentobj.resvpt1.x = tempx;
        this.parentobj.resvpt1.y = tempy;
        this.parentobj.drawindex = 3;
        bchanged = true;
      }
    } else if (this.parentobj.drawindex === 3) {
      var ctx = this.parentobj.drawcontext.canvasctx;
      var bsuc = true;
      ctx.beginPath();
      ctx.moveTo(this.parentobj.startpoint.x, this.parentobj.startpoint.y);
      ctx.lineTo(this.parentobj.endpoint.x, this.parentobj.endpoint.y);
      ctx.lineTo(this.parentobj.resvpt1.x, this.parentobj.resvpt1.y);
      ctx.closePath();
      if (ctx.isPointInPath(tempx, tempy)) {
        bsuc = false;
        return;
      }
      if (bsuc) {
        var pta = this.parentobj.startpoint;
        var ptb = this.parentobj.endpoint;
        var ptc = this.parentobj.resvpt1;

        var maxx = this.parentobj.drawwidth;
        var maxy = this.parentobj.drawheight;

        var ptm = fun_get_line_extension_point(ptb, pta, maxx, maxy);
        var ptn = fun_get_line_extension_point(ptb, ptc, maxx, maxy);

        if (ptm.x === ptn.x || ptm.y === ptn.y) {
          ctx.beginPath();
          ctx.moveTo(ptm.x, ptm.y);
          ctx.lineTo(ptb.x, ptb.y);
          ctx.lineTo(ptn.x, ptn.y);
          ctx.closePath();
          if (ctx.isPointInPath(tempx, tempy)) {
            this.parentobj.resvpt2.x = tempx;
            this.parentobj.resvpt2.y = tempy;
            this.parentobj.drawindex = 4;
            bchanged = true;
          }
        } else if ((ptm.x === 0 && ptn.y === 0) || (ptm.y === 0 && ptn.x === 0)) {
          ctx.beginPath();
          ctx.moveTo(ptm.x, ptm.y);
          ctx.lineTo(ptb.x, ptb.y);
          ctx.lineTo(ptn.x, ptn.y);
          ctx.closePath();
          if (ctx.isPointInPath(tempx, tempy)) {
            this.parentobj.resvpt2.x = tempx;
            this.parentobj.resvpt2.y = tempy;
            this.parentobj.drawindex = 4;
            bchanged = true;
          } else {
            ctx.beginPath();
            ctx.moveTo(ptm.x, ptm.y);
            ctx.lineTo(0, 0);
            ctx.lineTo(ptn.x, ptn.y);
            ctx.closePath();
            if (!ctx.isPointInPath(ptb.x, ptb.y)) {
              if (ctx.isPointInPath(tempx, tempy)) {
                this.parentobj.resvpt2.x = tempx;
                this.parentobj.resvpt2.y = tempy;
                this.parentobj.drawindex = 4;
                bchanged = true;
              }
            } else {
              if (ptm.x === 0 && ptn.y === 0) {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(maxx, 0);
                ctx.lineTo(maxx, maxy);
                ctx.lineTo(0, maxy);
                ctx.closePath();
              } else {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(0, maxy);
                ctx.lineTo(maxx, maxy);
                ctx.lineTo(maxx, 0);
                ctx.closePath();
              }
              if (ctx.isPointInPath(tempx, tempy)) {
                this.parentobj.resvpt2.x = tempx;
                this.parentobj.resvpt2.y = tempy;
                this.parentobj.drawindex = 4;
                bchanged = true;
              }
            }
          }
        } else if ((ptm.x === 0 && ptn.y === maxy) || (ptm.y === maxy && ptn.x === 0)) {
          ctx.beginPath();
          ctx.moveTo(ptm.x, ptm.y);
          ctx.lineTo(ptb.x, ptb.y);
          ctx.lineTo(ptn.x, ptn.y);
          ctx.closePath();
          if (ctx.isPointInPath(tempx, tempy)) {
            this.parentobj.resvpt2.x = tempx;
            this.parentobj.resvpt2.y = tempy;
            this.parentobj.drawindex = 4;
            bchanged = true;
          } else {
            ctx.beginPath();
            ctx.moveTo(ptm.x, ptm.y);
            ctx.lineTo(0, maxy);
            ctx.lineTo(ptn.x, ptn.y);
            ctx.closePath();
            if (!ctx.isPointInPath(ptb.x, ptb.y)) {
              if (ctx.isPointInPath(tempx, tempy)) {
                this.parentobj.resvpt2.x = tempx;
                this.parentobj.resvpt2.y = tempy;
                this.parentobj.drawindex = 4;
                bchanged = true;
              }
            } else {
              if (ptm.x === 0 && ptn.y === maxy) {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(maxx, maxy);
                ctx.lineTo(maxx, 0);
                ctx.lineTo(0, 0);
                ctx.closePath();
              } else {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(0, 0);
                ctx.lineTo(maxx, 0);
                ctx.lineTo(maxx, maxy);
                ctx.closePath();
              }
            }
          }
        } else if ((ptm.x === maxx && ptn.y === maxy) || (ptm.y === maxy && ptn.x === maxx)) {
          ctx.beginPath();
          ctx.moveTo(ptm.x, ptm.y);
          ctx.lineTo(ptb.x, ptb.y);
          ctx.lineTo(ptn.x, ptn.y);
          ctx.closePath();
          if (ctx.isPointInPath(tempx, tempy)) {
            this.parentobj.resvpt2.x = tempx;
            this.parentobj.resvpt2.y = tempy;
            this.parentobj.drawindex = 4;
            bchanged = true;
          } else {
            ctx.beginPath();
            ctx.moveTo(ptm.x, ptm.y);
            ctx.lineTo(maxx, maxy);
            ctx.lineTo(ptn.x, ptn.y);
            ctx.closePath();
            if (!ctx.isPointInPath(ptb.x, ptb.y)) {
              if (ctx.isPointInPath(tempx, tempy)) {
                this.parentobj.resvpt2.x = tempx;
                this.parentobj.resvpt2.y = tempy;
                this.parentobj.drawindex = 4;
                bchanged = true;
              }
            } else {
              if (ptm.x === maxx && ptn.y === maxy) {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(0, maxy);
                ctx.lineTo(0, 0);
                ctx.lineTo(maxx, 0);
                ctx.closePath();
              } else {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(maxx, 0);
                ctx.lineTo(0, 0);
                ctx.lineTo(0, maxy);
                ctx.closePath();
              }
              if (ctx.isPointInPath(tempx, tempy)) {
                this.parentobj.resvpt2.x = tempx;
                this.parentobj.resvpt2.y = tempy;
                this.parentobj.drawindex = 4;
                bchanged = true;
              }
            }
          }
        } else if ((ptm.y === 0 && ptn.x === maxx) || (ptm.x === maxx && ptn.y === 0)) {
          ctx.beginPath();
          ctx.moveTo(ptm.x, ptm.y);
          ctx.lineTo(ptb.x, ptb.y);
          ctx.lineTo(ptn.x, ptn.y);
          ctx.closePath();
          if (ctx.isPointInPath(tempx, tempy)) {
            this.parentobj.resvpt2.x = tempx;
            this.parentobj.resvpt2.y = tempy;
            this.parentobj.drawindex = 4;
            bchanged = true;
          } else {
            ctx.beginPath();
            ctx.moveTo(ptm.x, ptm.y);
            ctx.lineTo(maxx, 0);
            ctx.lineTo(ptn.x, ptn.y);
            ctx.closePath();
            if (!ctx.isPointInPath(ptb.x, ptb.y)) {
              if (ctx.isPointInPath(tempx, tempy)) {
                this.parentobj.resvpt2.x = tempx;
                this.parentobj.resvpt2.y = tempy;
                this.parentobj.drawindex = 4;
                bchanged = true;
              }
            } else {
              if (ptm.y === 0 && ptn.x === maxx) {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(maxx, maxy);
                ctx.lineTo(0, maxy);
                ctx.lineTo(0, 0);
                ctx.closePath();
              } else {
                ctx.beginPath();
                ctx.moveTo(ptm.x, ptm.y);
                ctx.lineTo(ptn.x, ptn.y);
                ctx.lineTo(0, 0);
                ctx.lineTo(0, maxy);
                ctx.lineTo(maxx, maxy);
                ctx.closePath();
              }
              if (ctx.isPointInPath(tempx, tempy)) {
                this.parentobj.resvpt2.x = tempx;
                this.parentobj.resvpt2.y = tempy;
                this.parentobj.drawindex = 4;
                bchanged = true;
              }
            }
          }
        } else if ((ptm.x === 0 && ptn.x === maxx) || (ptm.x === maxx && ptn.x === 0)) {
          //if(Math.abs((pta.y - ptb.y)/(pta.x-ptb.x)) < Math.abs((ptb.y - ptc.y)/(ptb.x - ptc.x))){//bottom
          var vsy = pta.y - ((pta.x - ptc.x) * (pta.y - ptb.y)) / (pta.x - ptb.x);
          if (vsy < ptc.y) {
            ctx.beginPath();
            if (ptm.x === 0) {
              ctx.moveTo(ptm.x, ptm.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(ptn.x, ptn.y);
              ctx.lineTo(maxx, maxy);
              ctx.lineTo(0, maxy);
            } else {
              ctx.moveTo(ptn.x, ptn.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptm.x, ptm.y);
              ctx.lineTo(maxx, maxy);
              ctx.lineTo(0, maxy);
            }
            ctx.closePath();
            if (ctx.isPointInPath(tempx, tempy)) {
              this.parentobj.resvpt2.x = tempx;
              this.parentobj.resvpt2.y = tempy;
              this.parentobj.drawindex = 4;
              bchanged = true;
            }
          } else {
            ctx.beginPath();
            if (ptm.x === 0) {
              ctx.moveTo(ptm.x, ptm.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(ptn.x, ptn.y);
              ctx.lineTo(maxx, 0);
              ctx.lineTo(0, 0);
            } else {
              ctx.moveTo(ptn.x, ptn.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptm.x, ptm.y);
              ctx.lineTo(maxx, 0);
              ctx.lineTo(0, 0);
            }
            ctx.closePath();
            if (ctx.isPointInPath(tempx, tempy)) {
              this.parentobj.resvpt2.x = tempx;
              this.parentobj.resvpt2.y = tempy;
              this.parentobj.drawindex = 4;
              bchanged = true;
            }
          }
        } else if ((ptm.y === 0 && ptn.y === maxy) || (ptm.y === maxy && ptn.y === 0)) {
          //if(Math.abs((ptc.y - ptb.y)/(ptc.x - ptb.x)) < Math.abs((ptb.y - pta.y)/(ptb.x - pta.x))){//left
          var vsx = pta.x - ((pta.y - ptc.y) * (pta.x - ptb.x)) / (pta.y - ptb.y);
          if (vsx > ptc.x) {
            ctx.beginPath();
            if (ptm.y === 0) {
              ctx.moveTo(ptm.x, ptm.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(ptn.x, ptn.y);
              ctx.lineTo(0, maxy);
              ctx.lineTo(0, 0);
            } else {
              ctx.moveTo(ptn.x, ptn.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptm.x, ptm.y);
              ctx.lineTo(0, maxy);
              ctx.lineTo(0, 0);
            }
            ctx.closePath();
            if (ctx.isPointInPath(tempx, tempy)) {
              this.parentobj.resvpt2.x = tempx;
              this.parentobj.resvpt2.y = tempy;
              this.parentobj.drawindex = 4;
              bchanged = true;
            }
          } else {
            ctx.beginPath();
            if (ptm.y === 0) {
              ctx.moveTo(ptm.x, ptm.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(ptn.x, ptn.y);
              ctx.lineTo(maxx, maxy);
              ctx.lineTo(maxx, 0);
            } else {
              ctx.moveTo(ptm.x, ptm.y);
              ctx.lineTo(pta.x, pta.y);
              ctx.lineTo(ptc.x, ptc.y);
              ctx.lineTo(ptn.x, ptn.y);
              ctx.lineTo(maxx, maxy);
              ctx.lineTo(maxx, 0);
            }
            ctx.closePath();
            if (ctx.isPointInPath(tempx, tempy)) {
              this.parentobj.resvpt2.x = tempx;
              this.parentobj.resvpt2.y = tempy;
              this.parentobj.drawindex = 4;
              bchanged = true;
            }
          }
        }
      }
      if (bchanged) {
        this.parentobj.pointchanged = true;
      }
    }
  } else {
    var width = this.parentobj.drawwidth;
    var height = this.parentobj.drawheight;
    var rows = this.parentobj.gridrows;
    var columns = this.parentobj.gridcolumns;
    var rowheight = height / rows;
    var columnwidth = width / columns;
    var idx = Math.floor(tempy / rowheight) * columns + Math.floor(tempx / columnwidth);

    var val = 0;
    if (this.parentobj.szpieces[idx] == 0) {
      val = 1;
    }
    this.parentobj.szpieces[idx] = val;

    var idxx = Math.floor(idx / 32);
    var bit = 31 - (idx % 32);
    if (val == 1) {
      this.parentobj.mask[idxx] |= 0x1 << bit;
    } else {
      this.parentobj.mask[idxx] &= ~(0x1 << bit);
    }
  }
  this.parentobj.bstartdraw = true;
}

function painter_mouseup(evt) {
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (this.parentobj.bstartdraw && this.parentobj.drawtype != VIDEO_DRAWX_COVER_TYPE_PATH) {
    if (this.parentobj.bdrawrects) {
      //this.parentobj.rectangles[this.parentobj.drawindex].width = parseInt(tempx)-this.parentobj.rectangles[this.parentobj.drawindex].left;
      //this.parentobj.rectangles[this.parentobj.drawindex].height = parseInt(tempy)-this.parentobj.rectangles[this.parentobj.drawindex].top;
      this.parentobj.rectangles[this.parentobj.drawindex] = video_drawx_check_rectangle(this.parentobj.temppoint, new fun_point(tempx, tempy));
    } else {
      this.parentobj.endpoint.x = tempx;
      this.parentobj.endpoint.y = tempy;
      // ---------------------------------------多线段========================
      let point2 = this.parentobj.point2;
      if (isLine2) {//若线1有值，则赋值线2
        const [line1, line2] = point2;
        const { startpoint1, endpoint1 } = line1;
        const { startpoint2, endpoint2 } = line2;  
        if (calculateAngle(startpoint1, endpoint1, startpoint2, endpoint2)) {
          point2[1].endpoint2.x=point2[1].startpoint2.x= 0;
          point2[1].endpoint2.y=point2[1].startpoint2.y = 0;
          console.log(this.parentobj.point2);
        }else{
          point2[1].endpoint2.x = tempx;
          point2[1].endpoint2.y = tempy;
          isLine2 = !isLine2;
        }
       } else {
         point2[0].endpoint1.x = tempx;
          point2[0].endpoint1.y = tempy;
        isLine2 = !isLine2;
        }
  
      // ---------------------------------------多线段========================
    }
    if (null !== this.parentobj.funrectcmpt) {
      if (null !== this.parentobj.rectangles) {
        this.parentobj.funrectcmpt(this.parentobj.drawindex, this.parentobj.rectangles[this.parentobj.drawindex]);
      } else {
        this.parentobj.funrectcmpt(0, video_drawx_check_rectangle(this.parentobj.startpoint, this.parentobj.endpoint));
      }
    }
    this.parentobj.bstartdraw = false;
  }
}

function painter_mousemove(evt) {
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (this.parentobj.bstartdraw) {
    if (this.parentobj.drawtype !== VIDEO_DRAWX_COVER_TYPE_PICE && this.parentobj.drawtype !== VIDEO_DRAWX_COVER_TYPE_PATH) {
      if (this.parentobj.bdrawrects) {
        // this.parentobj.rectangles[this.parentobj.drawindex].width = parseInt(tempx)-this.parentobj.rectangles[this.parentobj.drawindex].left;
        // this.parentobj.rectangles[this.parentobj.drawindex].height = parseInt(tempy)-this.parentobj.rectangles[this.parentobj.drawindex].top;
        this.parentobj.rectangles[this.parentobj.drawindex] = video_drawx_check_rectangle(this.parentobj.temppoint, new fun_point(tempx, tempy));
      } else {
        this.parentobj.endpoint.x = tempx;
        this.parentobj.endpoint.y = tempy;
        // ---------------------------------------多线段========================
        let point2 = this.parentobj.point2;
        if (isLine2) {//若线1有值，则赋值线2
          point2[1].endpoint2.x = tempx;
          point2[1].endpoint2.y = tempy;
        } else {
          point2[0].endpoint1.x = tempx;
          point2[0].endpoint1.y = tempy;
        }
        // ---------------------------------------多线段========================
      }
    } else if (this.parentobj.drawtype === VIDEO_DRAWX_COVER_TYPE_PATH) {
    } else {
      var width = this.parentobj.drawwidth;
      var height = this.parentobj.drawheight;
      var rows = this.parentobj.gridrows;
      var columns = this.parentobj.gridcolumns;
      var rowheight = height / rows;
      var columnwidth = width / columns;
      var idx = Math.floor(tempy / rowheight) * columns + Math.floor(tempx / columnwidth);
      this.parentobj.szpieces[idx] = 0x01;
      var idxx = Math.floor(idx / 32);
      var bit = 31 - (idx % 32);
      this.parentobj.mask[idxx] |= 0x1 << bit;
    }
  }
}

function painter_mouseout(evt) {
  evt = evt || window.event;
  var tempx = mousePosition(evt).x;
  var tempy = mousePosition(evt).y;
  if (tempx < 0) {
    tempx = 0;
  }
  if (tempy < 0) {
    tempy = 0;
  }
  if (tempx > 624) {
    tempx = 624;
  }
  if (tempy > 360) {
    tempy = 360;
  }
  if (this.parentobj.bstartdraw) {
    if (this.parentobj.bdrawrects) {
      this.parentobj.rectangles[this.parentobj.drawindex] = video_drawx_check_rectangle(this.parentobj.temppoint, new fun_point(tempx, tempy));
    } else if (this.parentobj.drawtype !== VIDEO_DRAWX_COVER_TYPE_PATH) {
      this.parentobj.endpoint.x = tempx;
      this.parentobj.endpoint.y = tempy;
      // ---------------------------------------多线段========================
      let point2 = this.parentobj.point2;
      if (isLine2) {//若线1有值，则赋值线2
        point2[1].endpoint2.x = tempx;
        point2[1].endpoint2.y = tempy;
      } else {
        point2[0].endpoint1.x = tempx;
        point2[0].endpoint1.y = tempy;
      }
      // ---------------------------------------多线段========================
    }
    if (null !== this.parentobj.funrectcmpt) {
      this.parentobj.funrectcmpt(this.parentobj.drawindex, this.parentobj.rectangles[this.parentobj.drawindex]);
    }
    this.parentobj.bstartdraw = false;
  }
}

function video_drawx_init_painter(objid, parentobj) {
  var canvas = document.getElementById(objid);
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';
  ctx.shadowBlur = 0;
  canvas.onmousedown = painter_mousedown;
  canvas.onmouseup = painter_mouseup;
  canvas.onmousemove = painter_mousemove;
  canvas.onmouseout = painter_mouseout;
  canvas.parentobj = parentobj;
  this.canvasobj = canvas;
  this.canvasctx = ctx;
  return this;
}

function video_drawx_painter(objid, type, width, height) {
  this.drawline = video_drawx_line;
  this.drawrectangle = video_drawx_rectangle;
  this.drawrectangles = video_drawx_multi_rectangle;
  this.drawpieces = video_drawx_pieces;
  this.drawdirection = video_drawx_dirction;
  this.drawdirection2 = video_drawx_dirction2;
  this.drawpath = video_draw_points_path;
  this.drawcontext = video_drawx_init_painter(objid, this);
  this.drawtype = type;
  this.drawwidth = width;
  this.drawheight = height;
  this.bdraw = true;
  this.startpoint = new fun_point(0, 0);
  this.endpoint = new fun_point(0, 0);
  this.point2 = [//line 2 Arr  多线段----=======================
    {
      startpoint1: new fun_point(0, 0),
      endpoint1: new fun_point(0, 0),
    },
    {
      startpoint2: new fun_point(0, 0),
      endpoint2: new fun_point(0, 0),
    },
  ];
  this.isLine2 = false;
  this.resvpt1 = new fun_point(0, 0);
  this.resvpt2 = new fun_point(0, 0);
  this.temppoint = new fun_point(0, 0);
  this.gridrows = 0;
  this.gridcolumns = 0;
  this.piecesvalue = '';
  this.szpieces = [];
  this.mask = [];
  this.bstartdraw = false;
  this.rectangles = null;
  this.funrectcmpt = null;
  this.bdrawrects = false;
  this.bdrawpath = false;
  this.drawindex = 0;
  this.pointcache = '';
  this.pointchanged = false;
}

setInterval(video_drawx_drawobjects, 30);

function video_drawx_drawobjects() {
  if (video_drawx_set.length <= 0) return;
  for (var index in video_drawx_set) {
    var object = video_drawx_set[index];
    if (null === object.drawhandle) {
      continue;
    }
    if (!object.drawhandle.bdraw) {
      continue;
    }
    if (object.drawtype == VIDEO_DRAWX_COVER_TYPE_LINE) {
      object.drawhandle.drawline();
    } else if (object.drawtype == VIDEO_DRAWX_COVER_TYPE_RECT) {
      if (object.drawhandle.bdrawrects) {
        object.drawhandle.drawrectangles();
      } else {
        object.drawhandle.drawrectangle();
      }
    } else if (object.drawtype == VIDEO_DRAWX_COVER_TYPE_PICE) {
      object.drawhandle.drawpieces();
    } else if (object.drawtype == VIDEO_DRAWX_COVER_TYPE_DIRE) {
      object.drawhandle.drawdirection();
    } else if (object.drawtype === VIDEO_DRAWX_COVER_TYPE_PATH) {
      object.drawhandle.drawpath();
    } else if (object.drawtype == VIDEO_DRAWX_COVER_TYPE_DIRE2) {
      object.drawhandle.drawdirection2();
    }
  }
}

function fun_point(x, y) {
  this.x = parseInt(x);
  this.y = parseInt(y);
}

function fun_rectangle(x, y, w, h) {
  return { left: x, top: y, width: w, height: h };
}

function drawLine(pen, x0, y0, x1, y1) {
  pen.moveTo(x0, y0);
  pen.lineTo(x1, y1);
  pen.stroke();
}

function vecPaint(pen, x0, y0, x1, y1, type) {
  var nX = x1 - x0;
  var nY = y1 - y0;
  var dl = Math.sqrt(nX * nX + nY * nY);
  var cx = Math.floor(x0 + nX / 2);
  var cy = Math.floor(y0 + nY / 2);
  nX = nX / dl;
  nY = nY / dl;
  var p = 20;
  //drawLine(pen, cx, cy, cx - nY * p / 2, cy + nX * p / 2);
  var sx = cx + nY * p;
  var sy = cy - nX * p;
  // drawLine(pen, cx, cy, sx, sy);
  p = 30;
  pen.font = '14px Arial';
  if (type) {
    pen.fillText(type==1?'A':'B', cx - (nY * p + 10) / 8, cy+5);
  } else {
    pen.fillText('A', cx - (nY * p + 10) / 2, cy + (nX * p + 10) / 2);
    pen.fillText('B', cx + nY * p - 4, cy - nX * p);
  }
  nX = Math.floor(sx - cx);
  nY = Math.floor(sy - cy);
  dl = Math.sqrt(nX * nX + nY * nY);
  cx = cx + nX / 1.8;
  cy = cy + nY / 1.8;
  nX = nX / dl;
  nY = nY / dl;
  //drawLine(pen, sx, sy, cx - nY * 8, cy + nX * 8);
  //drawLine(pen, sx, sy, cx + nY * 8, cy - nX * 8);
  pen.save();
  pen.beginPath();
  // pen.moveTo(cx - nY * 7, cy + nX * 7);
  // pen.lineTo(sx, sy);
  // pen.lineTo(cx + nY * 7, cy - nX * 7);
  pen.closePath();
  pen.fill();
  pen.restore();
}
function vecPaint2(pen, x0, y0, x1, y1) {
  var nX = x1 - x0;
  var nY = y1 - y0;
  var dl = Math.sqrt(nX * nX + nY * nY);
  var cx = Math.floor(x0 + nX / 2);
  var cy = Math.floor(y0 + nY / 2);
  nX = nX / dl;
  nY = nY / dl;
  var p = 32;
  drawLine(pen, cx, cy, cx - (nY * p) / 2, cy + (nX * p) / 2);
  var sx = cx + nY * p;
  var sy = cy - nX * p;
  drawLine(pen, cx, cy, sx, sy);
  nX = Math.floor(sx - cx);
  nY = Math.floor(sy - cy);
  dl = Math.sqrt(nX * nX + nY * nY);
  cx = cx + nX / 2;
  cy = cy + nY / 2;
  nX = nX / dl;
  nY = nY / dl;
  drawLine(pen, sx, sy, cx - nY * 5, cy + nX * 5);
  drawLine(pen, sx, sy, cx + nY * 5, cy - nX * 5);
}

function video_drawx_line() {
  var startx = this.startpoint.x;
  var starty = this.startpoint.y;
  var endx = this.endpoint.x;
  var endy = this.endpoint.y;
  var ctx = this.drawcontext.canvasctx;
  ctx.clearRect(0, 0, this.drawwidth, this.drawheight);
  if (!(startx == endx && starty == endy)) {
    ctx.beginPath();
    ctx.moveTo(startx + 0.5, starty);
    ctx.lineTo(endx + 0.5, endy);
    ctx.stroke();
  }
}

function video_drawx_rectangle() {
  var startx = this.startpoint.x;
  var starty = this.startpoint.y;
  var endx = this.endpoint.x;
  var endy = this.endpoint.y;
  var ctx = this.drawcontext.canvasctx;
  ctx.clearRect(0, 0, this.drawwidth, this.drawheight);
  if (startx != endx && starty != endy) {
    if (startx < endx && starty < endy) ctx.strokeRect(startx, starty, endx - startx, endy - starty);
    else if (startx > endx && starty < endy) ctx.strokeRect(endx, starty, startx - endx, endy - starty);
    else if (startx > endx && starty > endy) ctx.strokeRect(endx, endy, startx - endx, starty - endy);
    else if (startx < endx && starty > endy) ctx.strokeRect(startx, endy, endx - startx, starty - endy);
  }
}

function video_drawx_multi_rectangle() {
  if (null === this.rectangles) {
    return;
  }
  var ctx = this.drawcontext.canvasctx;
  ctx.clearRect(0, 0, this.drawwidth, this.drawheight);
  for (index in this.rectangles) {
    if (this.rectangles[index].left >= 0 && this.rectangles[index].top >= 0 && this.rectangles[index].width > 0 && this.rectangles[index].height > 0) {
      if (index == 0) {
        ctx.strokeStyle = '#6495ED';
      } else if (index == 1) {
        ctx.strokeStyle = '#CD3700';
      } else {
        ctx.strokeStyle = '#7A378B';
      }
      ctx.strokeRect(this.rectangles[index].left, this.rectangles[index].top, this.rectangles[index].width, this.rectangles[index].height);
    }
  }
}

function video_drawx_draw_gride(ctx, width, height, rows, columns, szpics) {
  var gridewidth = width / columns;
  var grideheight = height / rows;
  ctx.fillStyle = 'rgba(255,0,0,0.0)';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(255,0,0,0.5)';
  for (var v = 0; v < rows; v++) {
    for (var h = 0; h < columns; h++) {
      if (szpics[v * columns + h] & 0x01) ctx.fillRect(gridewidth * h, grideheight * v, gridewidth, grideheight);
    }
  }
}

function video_drawx_pieces() {
  var ctx = this.drawcontext.canvasctx;
  ctx.clearRect(0, 0, this.drawwidth, this.drawheight);
  video_drawx_draw_gride(ctx, this.drawwidth, this.drawheight, this.gridrows, this.gridcolumns, this.szpieces);
}

function video_drawx_dirction() {
   var ctx = this.drawcontext.canvasctx;
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 2]);
    ctx.clearRect(0, 0, this.drawwidth, this.drawheight);
  const renderLine = (startObj, endObj, type) => {
    if (!(startObj.x == endObj.x && startObj.y == endObj.y)) {
      ctx.beginPath();
      ctx.moveTo(startObj.x + 0.5, startObj.y);
      ctx.lineTo(endObj.x + 0.5, endObj.y);
      ctx.stroke();
      vecPaint(ctx, startObj.x, startObj.y, endObj.x, endObj.y, type);
    }
  }
  const point2 = this.point2;
  const [line1, line2] = point2;
  const { startpoint1, endpoint1 } = line1;
  const { startpoint2, endpoint2 } = line2;
  if (lineNum == 2) {
    renderLine(startpoint1, endpoint1, 1)//line1
    renderLine(startpoint2, endpoint2, 2)//line2
  } else {
    renderLine(this.startpoint, this.endpoint)
  }
}
function video_drawx_dirction2() {
  const point2 = this.point2;
  const [line1, line2] = point2;
  const { startpoint1, endpoint1 } = line1;
  const { startpoint2, endpoint2 } = line2;

  const ctx = this.drawcontext.canvasctx;
  ctx.clearRect(0, 0, this.drawwidth, this.drawheight);
  const renderLine = (startObj, endObj) => {
    if (!(startObj.x == endObj.x && startObj.y == endObj.y)) {
      ctx.beginPath();
      ctx.moveTo(startObj.x + 0.5, startObj.y);
      ctx.lineTo(endObj.x + 0.5, endObj.y);
      ctx.stroke();
      vecPaint2(ctx, startObj.x, startObj.y, endObj.x, endObj.y,);
    }
  }
  if (lineNum == 2) {
    renderLine(startpoint1, endpoint1)//line1
    renderLine(startpoint2, endpoint2)//line2
  } else {
    renderLine(this.startpoint, this.endpoint)
  }
}

function video_draw_points_path() {
  var ctx = this.drawcontext.canvasctx;
  ctx.clearRect(0, 0, this.drawwidth, this.drawheight);
  if (this.drawindex === 1) {
    if ((this.startpoint.x > 0 && this.startpoint.y >= 0) || (this.startpoint.x >= 0 && this.startpoint.y > 0)) {
      ctx.save();
      ctx.fillStyle = '#87CEFA';
      ctx.beginPath();
      ctx.arc(this.startpoint.x, this.startpoint.y, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
  } else if (this.drawindex === 2) {
    ctx.save();

    ctx.fillStyle = '#87CEFA';
    ctx.beginPath();
    ctx.arc(this.startpoint.x, this.startpoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.endpoint.x, this.endpoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#87CEFA';
    ctx.beginPath();
    ctx.moveTo(this.startpoint.x, this.startpoint.y);
    ctx.lineTo(this.endpoint.x, this.endpoint.y);
    ctx.stroke();
    ctx.restore();
  } else if (this.drawindex === 3) {
    ctx.save();

    ctx.fillStyle = '#87CEFA';
    ctx.beginPath();
    ctx.arc(this.startpoint.x, this.startpoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.endpoint.x, this.endpoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.resvpt1.x, this.resvpt1.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#87CEFA';
    ctx.beginPath();
    ctx.moveTo(this.startpoint.x, this.startpoint.y);
    ctx.lineTo(this.endpoint.x, this.endpoint.y);
    ctx.lineTo(this.resvpt1.x, this.resvpt1.y);
    ctx.stroke();
    ctx.restore();
  } else if (this.drawindex === 4) {
    ctx.save();

    ctx.fillStyle = '#87CEFA';
    ctx.beginPath();
    ctx.arc(this.startpoint.x, this.startpoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.endpoint.x, this.endpoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.resvpt1.x, this.resvpt1.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.resvpt2.x, this.resvpt2.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#87CEFA';
    ctx.beginPath();
    ctx.moveTo(this.startpoint.x, this.startpoint.y);
    ctx.lineTo(this.endpoint.x, this.endpoint.y);
    ctx.lineTo(this.resvpt1.x, this.resvpt1.y);
    ctx.lineTo(this.resvpt2.x, this.resvpt2.y);
    ctx.closePath();
    ctx.stroke();

    var minx, miny, maxx, maxy;
    minx = this.startpoint.x < this.endpoint.x ? this.startpoint.x : this.endpoint.x;
    minx = minx < this.resvpt1.x ? minx : this.resvpt1.x;
    minx = minx < this.resvpt2.x ? minx : this.resvpt2.x;
    miny = this.startpoint.y < this.endpoint.y ? this.startpoint.y : this.endpoint.y;
    miny = miny < this.resvpt1.y ? miny : this.resvpt1.y;
    miny = miny < this.resvpt2.y ? miny : this.resvpt2.y;
    maxx = this.startpoint.x > this.endpoint.x ? this.startpoint.x : this.endpoint.x;
    maxx = maxx > this.resvpt1.x ? maxx : this.resvpt1.x;
    maxx = maxx > this.resvpt2.x ? maxx : this.resvpt2.x;
    maxy = this.startpoint.y > this.endpoint.y ? this.startpoint.y : this.endpoint.y;
    maxy = maxy > this.resvpt1.y ? maxy : this.resvpt1.y;
    maxy = maxy > this.resvpt2.y ? maxy : this.resvpt2.y;
    var grd = ctx.createLinearGradient(0, 0, 0, maxy - miny);
    grd.addColorStop(0, 'rgba(135,206,250,0.3)');
    grd.addColorStop(1, 'rgba(135,206,250,0.1)');
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.restore();
  }
}


function isLinesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {//PanDuan Shuang Xian ChongHe
  let k1 = (y2 - y1) / (x2 - x1);
  let k2 = (y4 - y3) / (x4 - x3);
  if (k1 === k2 && (y2 - y1) !== (y4 - y3)) {
    return false;
  }
  if (k1 === k2 && (y2 - y1) === (y4 - y3)) {
    return (x1 !== x3 && y1 !== y3);
  }
  let b1 = y1 - k1 * x1;
  let b2 = y3 - k2 * x3;
  let x = (b2 - b1) / (k1 - k2);
  let y = k1 * x + b1;
  let isXInRange1 = x >= Math.min(x1, x2) && x <= Math.max(x1, x2);
  let isYInRange1 = y >= Math.min(y1, y2) && y <= Math.max(y1, y2);
  let isXInRange2 = x >= Math.min(x3, x4) && x <= Math.max(x3, x4);
  let isYInRange2 = y >= Math.min(y3, y4) && y <= Math.max(y3, y4);

  return isXInRange1 && isYInRange1 && isXInRange2 && isYInRange2;
}
function calculateAngle(start1, end1, start2, end2) {
  const line1 = { x1: start1.x, y1: start1.y, x2: end1.x, y2: end1.y }
  const line2 = { x1: start2.x, y1: start2.y, x2: end2.x, y2: end2.y }
  
  const vec1 = { x: line1.x2 - line1.x1, y: line1.y2 - line1.y1 };
  const vec2 = { x: line2.x2 - line2.x1, y: line2.y2 - line2.y1 };

  const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;

  const magnitude1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
  const magnitude2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);

  if (magnitude1 === 0 || magnitude2 === 0){
    console.error("One of the lines has zero length");
    return false
  }

    const cosTheta = dotProduct / (magnitude1 * magnitude2);

  const clampedCosTheta = Math.max(-1, Math.min(1, cosTheta));

  const angleRad = Math.acos(clampedCosTheta);
  const angleDeg = angleRad * (180 / Math.PI);

  return angleDeg > 60;
}