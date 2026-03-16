/**
 * 用于截屏+录制的 构造函数
 * @param {*} videoItem 存放video视频标签的父元素
 * @param {*} video 视频标签id
 * @param {*} isNew 是否执行过该函数（若执行过，则清除按钮监听）
 */
function OutputMedia(videoItem, video, isNew) {
    this.createOutputMediaEle = createEle_init;//初始化
    this.videoItem = $(videoItem ? videoItem : '#div_video_player');//
    this.video = jqGetEle (video ? video : 'videoElement')[0];//视频id
    this.canvas = jqGetEle('output_media_res')[0];//canvas Id
    this.img = jqGetEle('screen_img')[0];//用于截图的img
    this.downloadtag = jqGetEle('saveFile');
    this.resDownload = resource_Download;//保存下载
    this.initCanvas = init_canvas_draw;//canvas初始化
    this.setRecorder = setRecorder;//块数据录制（视频数据保存，录制核心函数之一）
    this.ele_events = element_events;//所有按钮事件监听
    this.record_timer = null;//录制时间的定时器
    this.isNew = isNew;//是否已经new并初始化过；(需要根据此值解绑一次按钮监听)
    // this.codec = codec;//视频流的编码类型codec
    this.remove_element_events = remove_element_events;//解绑事件监听
    this.record_allChunks = [];//录制的视频 块数据
    this.audio_allChunks = [];//录制的音频 块数据
    this.createMuted =bv?bv.muted:null//录屏初始化的时候静音情况（方便判断）
    this.muted = bv?bv.muted:null;//是否静音
    this.audioTrack = null;//目前录制视频流的音轨

}
/**
 * 用于截屏+录制 初始化(创建元素)
 */
var createEle_init = function () {
    var canvasEle = '<canvas class="centeredVideo canvas_media_res" canvas-id="output_media_res" id="output_media_res" type="2d" style="position: absolute;top: 0;opacity: 0;display:none"></canvas>';//用于截屏+录制
    var screenImgEle = '<img class="img" id="screen_img" src="" style="display:none;"/>  ';//用于截屏的img标签
    var downloadEle = '<a href="javascript:;" id="saveFile" style="display:none;"></a>'//用于下载的a标签
    var recordStatusEle = ' <div id="record_status" style="display:none;"><div id="record_status_icon"></div><span id="record_status_countdown">00:00:00</span></div>';//录制状态（计时）
    this.videoItem.append(canvasEle + screenImgEle + downloadEle + recordStatusEle);
    jqGetEle('record_status').css({//录制状态css
        'position': 'absolute',
        'bottom': '50px',
        'right': '30px',
        'font-size': '20px',
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
    })
    jqGetEle('record_status_icon').css({//录制状态icon css
        'display': 'inline-block',
        'width': '17px',
        'height': '17px',
        'background-color': 'red',
        'border-radius': '30px',
        'margin-right': '7px',
    })
    var output = new OutputMedia(0, 0, this.isNew);
    if (this.isNew) output.remove_element_events()
    output.initCanvas();//调用视频录制初始化
    output.ele_events();//开启监听
    window.clearInterval(output.record_timer);//重置计时器
}
/**
 * 事件监听
 */
var element_events = function () {
    var that = this;
    jqGetEle('img_button_snapshot').click(function () {//替换底部-抓拍  截屏
        that.resDownload({
            type: 'image',
            format: 'jpg',
            fileName: 'snapshot'
        });
    });     
   if (bv) {
    bv.on(mpegts.Events.STATISTICS_INFO, () => {
        that.muted = bv.muted;//监听视频的是否静音
    });
   }
}
/**
 * 解绑事件监听
 */
var remove_element_events = function () {
    jqGetEle('img_button_snapshot').off();
    jqGetEle('img_button_record').off();
}

/**
 * canvas画布初始化(将video的播放内容绘制到该元素中)
 */
var init_canvas_draw = function () {
    var canvasCtx = this.canvas.getContext("2d");
    var ratio = window.devicePixelRatio || 1;
    canvasCtx.scale(ratio, ratio);
    // canvas大小与图片大小保持一致，截图没有多余
    this.canvas.width = this.video.offsetWidth * ratio;
    this.canvas.height = this.video.offsetHeight * ratio;
    document.body.onmousedown = e => {//通过点击body任意地方绘制（chrome会禁用自动播放）
        playCanvas(this.video, this.canvas.width, this.canvas.height, canvasCtx)
    };
    setTimeout(() => {//settimeout等待视频加载取得音频轨
        this.setRecorder('video/webm; codecs=vp8');
        // video/webm; codecs = vp8
        // video/webm; codecs = vp9
        // video/webm; codecs = h264
        // video/webm; codecs = avc1
        // video/x - matroska; codecs = avc1
    }, 1500);
}
/**
 * 循环重复不断绘制canvas
 * @param {*} srcvideo video
 * @param {*} ele_width 
 * @param {*} ele_height 
 * @param {*} ctx 
 */
var playCanvas = function (srcvideo, ele_width, ele_height, ctx) {
    ctx.drawImage(srcvideo, 0, 0, ele_width, ele_height);
    requestAnimationFrame(() => { playCanvas(srcvideo, ele_width, ele_height, ctx); })
}
/**
 * 保存下载（图片+视频保存统一函数）
 * @param {*} downloadDataObj 保存的参数（类型：image/record；名称：xxx；格式：png/mp4）
 */
var resource_Download = function (downloadDataObj) {//下载方法整合
    var { type, format, fileName } = downloadDataObj;
    var file_blob;
    var downloadUrl;
    switch (type) {
        case 'image':
            file_blob = this.canvas.toDataURL("image/" + format)
            this.img.setAttribute("src", file_blob);//赋值截图的img标签
            downloadUrl = file_blob
            break;

        case 'record':
            file_blob = new Blob(this.record_allChunks);
            downloadUrl = window.URL.createObjectURL(file_blob);
            break;
        default:
            console.error('错误调用')
            break;
    };
    this.downloadtag.attr("href", downloadUrl).attr("download", fileName + '.' + format); // 把url放到我们的a标签中，并得到a标签对象
    this.downloadtag[0].click()
}
/**
 * 设置录制的块数据 （供下载）
 * @param {*} format 视频编码格式
 * @returns 
 */
var setRecorder = function (format) {
    if (!MediaRecorder.isTypeSupported(format)) {
        console.log('当前浏览器不支持该编码类型'+ format);
        this.setRecorder('video/webm;codecs=h264');
        return;
    }
    var stream = this.canvas.captureStream(60); // 60 FPS recording'
    var recorder = new MediaRecorder(stream, {
        mimeType: format
    });
    recorder.ondataavailable = e => {
        console.log('录制ing');
        this.record_allChunks.push(e.data);//视频流数据
    }
    var that = this;
    var btn_record = jqGetEle('img_button_record');//录制
    btn_record.click(function () {
            var vide_stream, audioTrack;
            if (jqGetEle('videoElement').is('video') && that.muted != that.createMuted) {//video标签才赋值音轨
                vide_stream = that.video.captureStream();
                audioTrack = vide_stream.getAudioTracks()[0];//视频流的音轨
                console.log(audioTrack);
            }
            if (audioTrack) {//有音轨才判断（才能进行切换静音）
                if (that.muted != that.createMuted) {//声音情况与目前录制视频流的状态不一样时
                    switch (that.muted) {
                        case true://静音
                            stream.removeTrack(that.audioTrack);
                            break;
                        case false://开启了声音
                            stream.addTrack(audioTrack);
                            that.audioTrack = audioTrack;
                            break;
                        default:
                            break;
                    }
                    that.createMuted = that.muted;
                    console.log('检测到' + (that.muted ? '无' : '有') + '声音');
                }
            }
            console.log(stream.getTracks());
            var record_type = btn_record.data("recordmemu");
            jqGetEle('div_video_player_show').css('border', record_type ? '' : '2px solid #' + (record_type ? '48bf5c' : 'fb1b63'));//录制红框（正在录制）/绿框（暂停）
            jqGetEle('output_media_res').css('display', record_type ? 'none' : 'block');//录制时显示canvas（防止录制时用户点击静音键发生录制错误）
            jqGetEle('record_status').css('display', record_type ? 'none' : 'block');//录制状态
            if (record_type) {
                window.clearInterval(that.record_timer);//重置计时器setInterval
                jqGetEle('record_status_countdown').text('00:00:00');//重置计时器（视图）
                millisecond = hour = minute = second = 0;
            } else {
                that.record_timer = setInterval(set_timer_num, 50);
            }
            jqGetEle('record_status_icon').css('background-color', (record_type ? '#48bf5c' : '#fb1b63'))
            var start_timeslice=15;
            eval('recorder.' + (record_type ? 'stop()' : 'start('+start_timeslice+')'));
            recorder.onstop = function () {
                that.resDownload({ type: 'record', format: 'mp4', fileName: 'record' })
                that.record_allChunks = [];
            }
            g_video_isrecording = !record_type;
            btn_record.data("recordmemu", !record_type)
    })
}
/**
 * 利用id获取元素的jq对象（没什么作用，纯粹减少代码量）
 * @param {*} val 元素id
 * @returns 返回jq的元素对象
 */
var jqGetEle=function (val) {return $('#'+val)}
/**
 * 录制状态时间 文字处理函数：满足60进一位
 */
var hour, minute, second; //时 分 秒
hour = minute = second = 0; //初始化
var millisecond = 0; //毫秒
function set_timer_num() {//计时
    millisecond = millisecond + 50;
    if (millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
    }
    if (second >= 60) {
        second = 0;
        minute = minute + 1;
    }
    if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
    }
    var countdown_text = toDub(hour) + ':' + toDub(minute) + ':' + toDub(second)
    jqGetEle('record_status_countdown').text(countdown_text)
}
function toDub(n) {
    return n < 10 ? "0" + n : "" + n;
}
