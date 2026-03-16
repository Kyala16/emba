(function (window, undefined) {
    var document = window.document;
    var Math = window.Math;
    var timeline = function (id) {
        return timeline.funcs.init(id);
    };
    function target_section_item(starts, ends, file, type, audioen, acodec, event) {
        return {
            startsec: starts,
            endsec: ends,
            path: file,
            rectype: type,
            audioen: audioen,
            acodec: acodec,
            event
        };
    }
    function fun_caculate_starttime(mousepos, newunit, oldunit, newlength, oldlength, objhandle) {
        var oldsubtime = mousepos / (oldlength / (oldunit * 60));
        var oldaddtime = (objhandle.renderwidth - mousepos) / (oldlength / (oldunit * 60));
        var postime = oldsubtime + objhandle.showstarttime;
        var newsublen = postime * (newlength / (newunit * 60));
        var newaddlen = (86400 - postime) * (newlength / (newunit * 60));
        if (newsublen < mousepos || newaddlen < objhandle.renderwidth - mousepos) {
            return false;
        }
        objhandle.showstarttime = objhandle.tagstarttime = postime - (mousepos / (newlength / (newunit * 60)));
        objhandle.showendtime = objhandle.showstarttime + objhandle.renderwidth * ((objhandle.lineunit * 60) / objhandle.lineunitlen);
        return true;
    }
    timeline.funcs = timeline.prototype = {
        renderctx: null,//画布上下文
        renderid: '',//画布DOM ID
        lineunit: 120,//时间轴单位时间
        lineunitlen: 120,//时间轴单位长度
        tagsections: null,// 段
        tagstarttime: 0,//时间轴开始时间(移动时间轴)
        tempstarttime: 0,//记录临时开始时间
        bdrawing: false,//是否已经开始绘制
        renderwidth: 0,//画布宽度
        renderheight: 0,//画布高度
        bmousedown: false,//记录鼠标按下
        bmousemove: false,//是否移动
        bunitchange: false,//尺度是否变化
        bsizechange: false,//画布尺寸变化
        bmousehover: false,//鼠标是否悬浮画布中
        bmouseposchange: false,//播放时间变化
        bneedredraw: true,//重绘时间轴
        mousepos: 0,//鼠标悬浮位置
        startmovepos: 0,//开始移动位置
        playpospix: -1,//播放位置像素
        playpostime: 0,//播放位置时间(秒)
        showstarttime: 0,//可见时间轴开始位置(秒)
        showendtime: 0,//可见时间轴结束位置(秒)
        doubleclkcallbk: null,
        parentid: null,
        init: function (id) {
            this.parentid = id;
            var handle = this;
            if (typeof id === "string") {
                var haschild = document.getElementById(id).hasChildNodes();
                if (!haschild) {
                    var cwidth = document.getElementById(id).offsetWidth;
                    var cheight = document.getElementById(id).offsetHeight;
                    var number = Math.floor(Math.random() * 10000);
                    var renderidtag = "canvas_timeline_" + String(number);
                    var childhtml = '<canvas id="' + renderidtag + '" width="' + cwidth + '" height="' + cheight + '" style="cursor: pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;"></canvas>';
                    document.getElementById(id).innerHTML = childhtml;
                    var rendermap = document.getElementById(renderidtag);
                    this.renderctx = rendermap.getContext('2d');
                    this.renderid = renderidtag;
                    this.renderheight = cheight;
                    this.renderwidth = cwidth;
                    this.showendtime = cwidth * ((this.lineunit * 60) / this.lineunitlen);
                } else {
                    var nodename = document.getElementById(id).firstChild.nodeName;
                    if (nodename.toLowerCase() != "canvas") {
                        return null;
                    }
                    this.renderid = document.getElementById(id).firstChild.id;
                    this.renderctx = document.getElementById(this.renderid).getContext('2d');
                }
                document.body.onresize = function (ev) {
                    var cwidth = document.getElementById(id).offsetWidth;
                    var cheight = document.getElementById(id).offsetHeight;
                    document.getElementById(handle.renderid).setAttribute("width", cwidth);
                    document.getElementById(handle.renderid).setAttribute("height", cheight);
                    handle.renderwidth = cwidth;
                    handle.renderheight = cheight;
                    handle.bsizechange = true;
                };
                if (null != this.renderctx) {
                    function mousePosition(evt) { return { x: evt.offsetX, y: evt.offsetY }; }
                    document.getElementById(this.renderid).onmousedown = function (evt) {
                        handle.bmousedown = true;
                        var event = evt || window.event;
                        handle.startmovepos = mousePosition(event).x;
                        handle.tempstarttime = handle.tagstarttime;
                    };
                    document.getElementById(this.renderid).onmouseup = function (evt) {
                        handle.bmousedown = false;
                    };
                    document.getElementById(this.renderid).onmousemove = function (evt) {
                        var event = evt || window.event;
                        var pos = mousePosition(event).x;
                        if (handle.bmousedown === true) {
                            var offset = Math.abs(pos - handle.startmovepos);
                            var offsettime = ((handle.lineunit * 60) / handle.lineunitlen) * offset;
                            if (pos > handle.startmovepos) {
                                handle.tagstarttime = handle.tempstarttime - offsettime;
                            } else if (pos < handle.startmovepos) {
                                handle.tagstarttime = handle.tempstarttime + offsettime;
                            }
                            //handle.startmovepos = pos;
                            if (handle.tagstarttime < 0) {
                                handle.tagstarttime = 0;
                            }
                            var showable = handle.renderwidth * ((handle.lineunit * 60) / handle.lineunitlen);
                            if (showable + handle.tagstarttime > 86400) {
                                handle.tagstarttime = 86400 - showable;
                            }
                            handle.tagstarttime = Math.round(handle.tagstarttime);
                            handle.bmousemove = true;
                        }
                        if (handle.bmousehover) {
                            handle.mousepos = pos;
                        }
                        //handle.bmousehover = true;
                        handle.bmouseposchange = true;
                    };
                    document.getElementById(this.renderid).onmouseenter = function (ev) {
                        handle.bmousehover = true;
                        var event = ev || window.event;
                        handle.mousepos = mousePosition(event).x;
                    };
                    document.getElementById(this.renderid).onmouseleave = function (ev) {
                        handle.bmousehover = false;
                        handle.bneedredraw = true;
                    };
                    document.getElementById(this.renderid).onmouseout = function (evt) {
                        handle.bmousedown = false;
                    };
                    document.getElementById(this.renderid).ondblclick = function (ev) {
                        if (null != handle.doubleclkcallbk) {
                            var audioen;
                            var acodec;
                            var event = ev || window.event;
                            var posx = mousePosition(event).x;
                            var tagtime = handle.showstarttime + (posx * ((handle.lineunit * 60) / handle.lineunitlen));
                            for (var i = 0; i < handle.tagsections.length; i++) {
                                if (tagtime > handle.tagsections[i].startsec && tagtime < handle.tagsections[i].endsec) {
                                    audioen = handle.tagsections[i].audioen;
                                    acodec = handle.tagsections[i].acodec;
                                }
                            }
                            handle.doubleclkcallbk.call(document.getElementById(handle.renderid), Math.round(tagtime), audioen, acodec);
                        }
                    };
                    add_mouse_wheel_event(document.getElementById(this.renderid), "DOMMouseScroll", on_render_wheel);
                    add_mouse_wheel_event(document.getElementById(this.renderid), "mousewheel", on_render_wheel);
                    function add_mouse_wheel_event(element, type, handler) {
                        if (element.addEventListener) {
                            element.addEventListener(type, handler, false);
                        } else if (element.attachEvent) {
                            element.attachEvent("on" + type, handler);
                        } else {
                            element["on" + type] = handler;
                        }
                    }
                    function on_render_wheel(event) {
                        var evt = event ? event : window.event;
                        var posx = mousePosition(evt).x;
                        var value = (evt.wheelDelta) ? (event.wheelDelta) : (-event.detail * 40);

                        if (value < 0) {
                            var tempunit = handle.lineunit;
                            var templenth = handle.lineunitlen;
                            if (handle.lineunit == 1) {
                                handle.lineunit = 10;
                                handle.bunitchange = true;
                            } else if (handle.lineunit == 10) {
                                handle.lineunit = 30;
                                handle.bunitchange = true;
                            } else if (handle.lineunit == 30) {
                                handle.lineunit = 60;
                                handle.bunitchange = true;
                            } else if (handle.lineunit == 60) {
                                handle.lineunit = 120;
                                handle.bunitchange = true;
                            } else if (handle.lineunit == 120) {
                                var gridcount = 1440 / handle.lineunit;
                                handle.lineunitlen = handle.renderwidth / gridcount;
                                handle.showstarttime = 0;
                                handle.showendtime = 86400;
                                handle.tagstarttime = 0;
                            }
                            var gridcount = 1440 / handle.lineunit;
                            var showcount = handle.renderwidth / handle.lineunitlen;
                            if (gridcount < showcount) {
                                handle.lineunitlen = handle.renderwidth / gridcount;
                                handle.showstarttime = 0;
                                handle.showendtime = 86400;
                                handle.tagstarttime = 0;
                            }
                            if (handle.bunitchange === true) {
                                fun_caculate_starttime(posx, handle.lineunit, tempunit, handle.lineunitlen, templenth, handle);
                            }
                        } else if (value > 0) {
                            var tempunit = handle.lineunit;
                            var templenth = handle.lineunitlen;
                            if (handle.lineunit == 120) {
                                handle.lineunit = 60;
                                handle.bunitchange = true;
                            } else if (handle.lineunit == 60) {
                                handle.lineunit = 30;
                                handle.bunitchange = true;
                            } else if (handle.lineunit == 30) {
                                handle.lineunit = 10;
                                handle.bunitchange = true;
                            } else if (handle.lineunit == 10) {
                                handle.lineunit = 1;
                                handle.bunitchange = true;
                            }
                            if (handle.lineunitlen != 120) {
                                handle.lineunitlen = 120;
                                handle.bunitchange = true;
                            }
                            if (handle.bunitchange === true) {
                                fun_caculate_starttime(posx, handle.lineunit, tempunit, handle.lineunitlen, templenth, handle);
                            }
                        }
                    }
                    this.tagsections = new Array();
                    return this;
                }
            }
            return null;
        },
        resize: function () {
            var cwidth = document.getElementById(this.parentid).offsetWidth;
            var cheight = document.getElementById(this.parentid).offsetHeight;
            document.getElementById(this.renderid).setAttribute("width", cwidth);
            document.getElementById(this.renderid).setAttribute("height", cheight);
            this.renderwidth = cwidth;
            this.renderheight = cheight;
            this.bsizechange = true;
        },
        startdraw: function () {
            if (this.bdrawing || this.renderctx === null) {
                return false;
            }

            var handledraw = this;
            window.setInterval(function () {
                if (handledraw.bmousemove || handledraw.bunitchange || handledraw.bsizechange || (handledraw.bmousehover && handledraw.bmouseposchange) || handledraw.bneedredraw) {
                    handledraw.bneedredraw = true;
                }
                if (!handledraw.bneedredraw) {
                    return;
                } else {
                    handledraw.bneedredraw = false;
                }
                handledraw.renderctx.clearRect(0, 0, handledraw.renderwidth, handledraw.renderheight);
                handledraw.renderctx.width = handledraw.renderwidth;
                handledraw.renderctx.height = handledraw.renderheight;

                var tempobject = document.createElement("canvas");
                tempobject.width = handledraw.renderwidth;
                tempobject.height = handledraw.renderheight;
                var temprender = tempobject.getContext('2d');
                fun_draw_background(temprender, handledraw);
                fun_draw_sections(temprender, handledraw);
                fun_draw_playline(temprender, handledraw);
                if (handledraw.bmousehover === true) {
                    fun_draw_pos_datetime(temprender, handledraw);
                    handledraw.bmouseposchange = false;
                }
                handledraw.renderctx.drawImage(tempobject, 0, 0);
            }, 20);
            function fun_check_unit(hdraw) {
                var gridcount = 1440 / hdraw.lineunit;
                var showcount = hdraw.renderwidth / hdraw.lineunitlen;
                if (gridcount < showcount) {
                    if (hdraw.lineunit == 120) {
                        hdraw.lineunit = 60;
                    } else if (hdraw.lineunit == 60) {
                        hdraw.lineunit = 30;
                    } else if (hdraw.lineunit == 30) {
                        hdraw.lineunit = 10;
                    } else if (hdraw.lineunit == 10) {
                        hdraw.lineunit = 1;
                    } else {
                        return false;
                    }
                    hdraw.showendtime = hdraw.showstarttime + hdraw.renderwidth * ((hdraw.lineunit * 60) / hdraw.lineunitlen);
                    fun_check_unit(hdraw);
                }
                //计算移动时间轴后的开始位置
                if (hdraw.bmousemove === true) {
                    hdraw.showstarttime = hdraw.tagstarttime;
                    hdraw.showendtime = hdraw.showstarttime + hdraw.renderwidth * ((hdraw.lineunit * 60) / hdraw.lineunitlen);
                    hdraw.bmousemove = false;
                }
                //计算尺度变化后的开始位置
                if (hdraw.bunitchange === true) {

                    hdraw.bunitchange = false;
                }
                //计算画布尺寸变化后的开始位置
                if (hdraw.bsizechange === true) {

                    hdraw.bsizechange = false;
                }
                //计算播放线位置
                if (hdraw.playpostime >= hdraw.showstarttime && hdraw.playpostime <= hdraw.showendtime) {
                    hdraw.playpospix = (hdraw.playpostime - hdraw.showstarttime) / ((hdraw.lineunit * 60) / hdraw.lineunitlen);
                } else {
                    hdraw.playpospix = -1;
                }
                return true;
            }
            function fun_draw_background(render, hdraw) {
                render.strokeStyle = "#393939";
                render.fillStyle = "#797979";
                render.lineWidth = 4;
                render.width = hdraw.renderwidth;
                render.height = hdraw.renderheight;
                render.font = "12px Arial";
                render.beginPath();
                render.moveTo(0.5, 38);
                render.lineTo(hdraw.renderwidth + 0.5, 38);
                render.stroke();
                //return;
                if (fun_check_unit(hdraw) === true) {
                    var gridcount = Math.ceil(hdraw.renderwidth / hdraw.lineunitlen) + 2;
                    render.lineWidth = 1;
                    render.strokeStyle = "#595959";
                    render.beginPath();
                    var startscale = Math.floor((hdraw.showstarttime / (hdraw.lineunit * 60)));

                    for (var i = 0; Math.floor(i) <= hdraw.renderwidth + hdraw.lineunitlen; i += hdraw.lineunitlen) {
                        var subleng = ((hdraw.showstarttime % (hdraw.lineunit * 60)) * hdraw.lineunitlen) / (hdraw.lineunit * 60);
                        var addleng = hdraw.lineunitlen - subleng - hdraw.lineunitlen;
                        render.moveTo(addleng + 1 + i, 39);
                        render.lineTo(addleng + 1 + i, hdraw.renderheight);
                        var tagtime = Math.ceil((startscale + (i / hdraw.lineunitlen)) * (hdraw.lineunit * 60));
                        var scale = parseInt(hdraw.lineunitlen / 6);
                        for (var j = 1; j <= 5; j++) {
                            render.moveTo(addleng + 1 + i + scale * j, 39);
                            render.lineTo(addleng + 1 + i + scale * j, 45);
                        }
                        var hours = String(Math.floor(tagtime / 3600));
                        var minute = String(Math.floor((tagtime % 3600) / 60));
                        var strtime = "";
                        if (hours.length > 1 && minute.length > 1) {
                            strtime = hours + ":" + minute;
                        } else if (hours.length > 1 && minute.length <= 1) {
                            strtime = hours + ":" + "0" + minute;
                        } else if (hours.length <= 1 && minute.length > 1) {
                            strtime = "0" + hours + ":" + minute;
                        } else {
                            strtime = "0" + hours + ":" + "0" + minute;
                        }
                        render.fillText(strtime, (addleng + 0.5 + i) - 15, 31);
                    }
                    render.stroke();
                }
            }
            function fun_draw_playline(render, hdraw) {
                if (hdraw.playpospix >= 0) {
                    render.lineWidth = 1;
                    render.strokeStyle = "red";
                    render.beginPath();
                    render.moveTo(hdraw.playpospix + 0.5, 1);
                    render.lineTo(hdraw.playpospix + 0.5, hdraw.renderheight - 1);
                    render.stroke();
                }
            }
            function fun_caculate_section_piece(sectitem, hdraw) {
                if (sectitem.startsec < hdraw.showstarttime && sectitem.endsec > hdraw.showstarttime && sectitem.endsec < hdraw.showendtime) {
                    var piecelen = Math.round((sectitem.endsec - hdraw.showstarttime) / ((hdraw.lineunit * 60) / hdraw.lineunitlen)) + 2;
                    var absposx = 0;
                    return { pos: absposx, length: piecelen };
                } else if (sectitem.startsec >= hdraw.showstarttime && sectitem.startsec < hdraw.showendtime && sectitem.endsec > hdraw.showendtime) {
                    var piecelen = Math.round((sectitem.endsec - sectitem.startsec) / ((hdraw.lineunit * 60) / hdraw.lineunitlen));
                    var absposx = Math.round((sectitem.startsec - hdraw.showstarttime) / ((hdraw.lineunit * 60) / hdraw.lineunitlen));
                    return { pos: absposx, length: piecelen };
                } else if (sectitem.startsec >= hdraw.showstarttime && sectitem.startsec < hdraw.showendtime && sectitem.endsec <= hdraw.showendtime) {
                    var piecelen = Math.round((sectitem.endsec - sectitem.startsec) / ((hdraw.lineunit * 60) / hdraw.lineunitlen)) + 2;
                    var absposx = Math.round((sectitem.startsec - hdraw.showstarttime) / ((hdraw.lineunit * 60) / hdraw.lineunitlen));
                    return { pos: absposx, length: piecelen };
                } else if (sectitem.startsec < hdraw.showstarttime && sectitem.endsec > hdraw.showendtime) {
                    var piecelen = (hdraw.showendtime - hdraw.showstarttime) / ((hdraw.lineunit * 60) / hdraw.lineunitlen);
                    var absposx = 0;
                    return { pos: absposx, length: piecelen };
                }
                return null;
            }
            function fun_draw_sections(render, hdraw) {
                const { tagsections, showstarttime, showendtime } = hdraw;
                for (var index = 0; index < tagsections.length; index++) {
                    const ele = tagsections[index];
                    const { startsec, endsec, rectype, event } = ele;
                    if ((startsec >= showstarttime && startsec < showendtime) ||
                        (endsec > showstarttime && endsec <= showendtime) ||
                        (startsec <= showendtime && endsec >= showendtime)) {
                        var piece = fun_caculate_section_piece(ele, hdraw);
                        if (null != piece) {
                            let isColor = '6495ed';
                            switch (rectype) {
                                case 1: //nomoal
                                    isColor = "6495ed";
                                    break;
                                default:
                                    isColor = "f55e23";//other Alarm detect
                                    const alarmArr = [
                                        { bits: 12, color: "c835ec", itemName: 'human' },//no.1
                                        { bits: 25, color: "e79547", itemName: 'vehicledetect' },
                                        { bits: 13, color: "12fc31", itemName: 'facedetection' },
                                        { bits: 26, color: "bdff07", itemName: 'petdetect' },
                                        { bits: 1, color: "30dce9", itemName: 'motion' },
                                    ];
                                    for (let i = 0; i < alarmArr.length; i++) {
                                        const ele = alarmArr[i];
                                        if (event & (1 << ele.bits)) {
                                            const isSupport = $(`#div_playback_video_type_alarm_${ele.itemName}`).is(":visible");
                                            isColor = isSupport ? ele.color : 'f55e23'
                                            break
                                        }
                                    }
                                    break;
                            }
                            render.fillStyle = `#${isColor}`;
                            render.fillRect(piece.pos, 42, piece.length, 15);
                        }
                    }
                }
            }
            function fun_draw_pos_datetime(render, hdraw) {

                if (hdraw.mousepos >= 0 && hdraw.mousepos <= hdraw.renderwidth) {
                    var temptime = hdraw.mousepos * ((hdraw.lineunit * 60) / hdraw.lineunitlen) + hdraw.showstarttime;
                    var hours = Math.floor(temptime / 3600);
                    var minus = Math.floor((temptime % 3600) / 60);
                    var secos = Math.floor(temptime % 60);
                    var strhour, strmin, strsec;
                    if (hours > 9) {
                        strhour = String(hours);
                    } else {
                        strhour = "0" + String(hours);
                    }
                    if (minus > 9) {
                        strmin = String(minus);
                    } else {
                        strmin = "0" + String(minus);
                    }
                    if (secos > 9) {
                        strsec = String(secos);
                    } else {
                        strsec = "0" + String(secos);
                    }
                    var timestring = strhour + ":" + strmin + ":" + strsec;
                    render.strokeStyle = "#cd3700";
                    render.fillStyle = "#eaeaea";
                    render.lineWidth = 2;
                    render.beginPath();
                    render.moveTo(hdraw.mousepos + 1.5, 14);
                    render.lineTo(hdraw.mousepos + 1.5, 56);
                    render.stroke();
                    render.fillText(timestring, hdraw.mousepos - 22, 12);
                }
            }
            this.bdrawing = true;
        },
        constructor: timeline,
        addsection: function (start, ends, file, type, audioen, acodec, event) {//type 1:定时录像 2：报警录像
            if (this.tagsections === null || ends <= start || typeof file != "string" || typeof type != "number") {
                return false;
            }
            this.tagsections[this.tagsections.length] = new target_section_item(start, ends, file, type, audioen, acodec, event);
            this.bneedredraw = true;
            return true;
        },
        clearsections: function () {
            if (this.tagsections === null) {
                return false;
            }
            this.tagsections = new Array();
            this.bneedredraw = true;
            return true;
        },
        setplaytime: function (msec) {
            if (msec >= 0 && msec <= 86400) {
                this.playpostime = msec;
                this.bneedredraw = true;
            }
        },
        addevent: function (type, tagfun) {
            if (typeof type === "string") {
                if (type == "doubleclk" && typeof tagfun === "function") {
                    this.doubleclkcallbk = tagfun;
                }
            }
        },
        stretch: function () {
            var tempunit = this.lineunit;
            var templenth = this.lineunitlen;
            if (this.lineunit == 1) {
                this.lineunit = 10;
                this.bunitchange = true;
            } else if (this.lineunit == 10) {
                this.lineunit = 30;
                this.bunitchange = true;
            } else if (this.lineunit == 30) {
                this.lineunit = 60;
                this.bunitchange = true;
            } else if (this.lineunit == 60) {
                this.lineunit = 120;
                this.bunitchange = true;
            } else if (this.lineunit == 120) {
                var gridcount = 1440 / this.lineunit;
                this.lineunitlen = this.renderwidth / gridcount;
                this.showstarttime = 0;
                this.showendtime = 86400;
                this.tagstarttime = 0;
            }
            var gridcount = 1440 / this.lineunit;
            var showcount = this.renderwidth / this.lineunitlen;
            if (gridcount < showcount) {
                this.lineunitlen = this.renderwidth / gridcount;
                this.showstarttime = 0;
                this.showendtime = 86400;
                this.tagstarttime = 0;
            }
            if (this.bunitchange === true) {
                fun_caculate_starttime(this.renderwidth / 2, this.lineunit, tempunit, this.lineunitlen, templenth, this);
            }
        },
        shrink: function () {
            var tempunit = this.lineunit;
            var templenth = this.lineunitlen;
            if (this.lineunit == 120) {
                this.lineunit = 60;
                this.bunitchange = true;
            } else if (this.lineunit == 60) {
                this.lineunit = 30;
                this.bunitchange = true;
            } else if (this.lineunit == 30) {
                this.lineunit = 10;
                this.bunitchange = true;
            } else if (this.lineunit == 10) {
                this.lineunit = 1;
                this.bunitchange = true;
            }
            if (this.lineunitlen != 120) {
                this.lineunitlen = 120;
                this.bunitchange = true;
            }
            if (this.bunitchange === true) {
                fun_caculate_starttime(this.renderwidth / 2, this.lineunit, tempunit, this.lineunitlen, templenth, this);
            }
        }
    };
    window.timeline = timeline;
})(window);
