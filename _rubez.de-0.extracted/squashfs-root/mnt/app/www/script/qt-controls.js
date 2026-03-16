const [
	VERSIO,//获取版本号 - 0
	SHOWIDGE,//显示窗口 - 1
	HEARTBEA,//心跳检测 - 2
	AVDECODING,//播放音视频 - 3
	CLOSEPROGRAM,// 结束程序隐藏 - 4
	CAPTURE,//抓拍 - 5
	INTERCOM,//对讲 - 6
	STOPINTERCOM,//对讲取消 - 7
	STARTVIDEOTAPE,//开始录像 - 8
	STOPTVIDEOTAPE,//停止录像 - 9
	VIDEOSEARCH,//录像搜索 - 10
	PLAYBACKFAST,//倍数快放 - 11
	PLAYBACKSLOW,//倍数慢放 - 12
	PLAYBACKSUSPEND,//录像暂停 - 13
	PLAYBACKSTART,//录像开始 - 14
	PLATSTOP,//录像停止 - 15
	REPLAYThEATER,//回放视频 - 16
	HIDE,//隐藏窗口 - 17
	EXIT,//退登  - 18
	WIDGET,//比例 - 19
	GETAVPATH,// 获取文件夹路径 - 20
	SETAVPATH,// 设置保存文件夹 路径 - 21
	POPAVPATH,//打开文件夹选择 - 22
	OPENURL,//根据路径打开文件夹  - 23
	AUDIOCONTROL,//volume  -24
] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const version = "1.00.08";//当前网页代码的版本号  -  【用于判断最新版本 - 弹窗提示】

let qtCtrlTimer = null;//检测心跳的定时器

let folderURL = '';//文件夹地址 - 用于不断修改赋值
const toFolder = () => {//调用打开文件夹
	qt_ws.openFolder(folderURL);
}
/**网页顶部 下载qt插件 */
let downloadPlug = () => {
	window.open(qtDownUrl)
}
const generateUUID = () => {//生成uuid
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

const PixelRatio = () => {
	return window.devicePixelRatio;
}

let sysZoom = 1;

const getAutoWH = e => {
	var targetElement = document.querySelector(e);
	const { top, left } = targetElement.getBoundingClientRect();
	const { outerHeight, outerWidth, innerHeight, innerWidth, screenLeft, screenTop } = window;
	const ratio = PixelRatio();
	const whObj = {
		outerHeight: outerHeight * sysZoom,
		outerWidth: outerWidth * sysZoom,
		innerHeight: innerHeight * ratio,
		innerWidth: innerWidth * ratio,
		isLeft: (screenLeft * sysZoom + (left * ratio)),
		isTop: (screenTop * sysZoom + (top * ratio)),
	}
	return whObj;
}
const test_360BOM = () => {//检测chrome内核的360极速浏览器X
	const checkIeForNum = () => {
		return ((navigator.msPointerEnabled == undefined ? true : navigator.msPointerEnabled)
			&& (navigator.msDoNotTrack == 1 || window.doNotTrack == 1)
			&& ((Number(window.screenX) ? (window.screenLeft - window.screenX != 8) : false)
				|| ((navigator.userAgent.indexOf('MSIE 7.0') != -1 || navigator.userAgent.indexOf('MSIE 8.0') != -1) && console.count == undefined)));
	}
	const checkChromeForNum = () => {
		var uas = navigator.userAgent.split(' '),
			result = false;
		if (uas[uas.length - 1].indexOf('Safari') == -1) return result;
		for (var key in navigator.plugins) {
			if (navigator.plugins[key].filename == 'np-mswmp.dll') return !result;
		}
		return result;
	}
	const isNumberBrowser = () => {
		if (navigator.userAgent.indexOf('Safari') != -1) {
			return checkChromeForNum();
		} else {
			return checkIeForNum();
		}
	}
	return isNumberBrowser();
}
const uuid = generateUUID();
const exitQT = () => {//exit  qt  plugin
	if (qtStatus && qt_ws) {
		delete sessionStorage['qtToken'];
		qt_ws.exitLogin();
	}
}

let qt_volume;// YinLiang  ,JinYin type
let qt_mute=false;// YinLiang  ,JinYin type
let volumeTimer;
let qtWindow_h, qtWindow_w;
/**
 * qt插件综合类
 */
class QT_WS {
	constructor() {
		const isLink = 'ws://127.0.0.1:8081';
		this.isLink = 'ws://127.0.0.1:8081';
		this.ws = new WebSocket(isLink);
		this.getStream = false;
		this.token = window.sessionStorage.getItem('qtToken') || '';
		this.sysZoom = 1;
	}
	onmessage(cab) {//返回消息 监听
		this.ws.onmessage = msg => {
			const data = JSON.parse(msg.data);
			if (cab) cab(data);
			const folderStrCtrl = (str) => {
				let strArr = str.split('/');
				strArr = strArr.slice(0, -1);
				return strArr.join('/')
			}
			const showTips = (str, file) => {//打開保存文件夹提示
				$('#res_save_tips').text(str + file);
				$('#res_save_tips').show();
				folderURL = folderStrCtrl(file);
				setTimeout(() => {
					$('#res_save_tips').hide();
				}, 3000);
			}
			switch (data.TYPE) {
				case 0://版本判断Str;
					if (data.VERSION) {
						if (version > data.VERSION.substring(1) && window.location.pathname == '/preview.html') {
							const tipstext1 = translate_page_item(TARGET_PAGE_TIPSTEXT, 'oldversion1', '', ITEM_TYPE_NONE);
							const tipstext2 = translate_page_item(TARGET_PAGE_TIPSTEXT, 'oldversion2', '', ITEM_TYPE_NONE);
							const downloadStr = translate_page_item(TARGET_PAGE_SUB_LOG, 'download', '', ITEM_TYPE_NONE);//下载文字
							const aEle = ' <a href="' + '' + '" style="color:aqua;text-decoration-line: none;margin: 0 3px;">' + downloadStr + '</a>';
							const that = this;
							fun_show_upgradeocx_tips(tipstext1 + aEle + tipstext2, true, function () {
								const tagrequest = '/action/get?subject=videoenc&stream=' + g_channel;
								sdk_getipcparam(tagrequest, function (res) {
									if (res != false) {
										$xml = $(res);
										var codec = parseInt($xml.find('codec').text());
										that.getVideoStream(true, 0, codec);
										const { x, y } = qtWindowsPosition();
										that.showVideo(x, y, g_nplugin_width + 'px', g_nplugin_height + 'px', true);
									}
								})
							});//提示  	
							this.hideWindow();
						}
						this.sysZoom = sysZoom = data.Zoom * 0.01;
						this.token = data.token || window.sessionStorage.getItem('qtToken');
						qt_volume = data.Volume;
						$('#div_slider_volume').slider('value', parseInt(qt_volume));
					}
					break;
				case 3:
					window.sessionStorage.setItem('qtToken', data.token);
					this.token = data.token;
					break;
				case 5:
					var save_str_snap = translate_page_item(TARGET_PAGE_TIPSTEXT, "snapsave", "", ITEM_TYPE_NONE);
					const { Imagepath } = data;
					if (Imagepath) {
						showTips(save_str_snap, Imagepath)
					}
					break;
				case 9:
					var save_str_record = translate_page_item(TARGET_PAGE_TIPSTEXT, "recordsave", "", ITEM_TYPE_NONE);
					const { videofile } = data;
					showTips(save_str_record, videofile)
					break;
				case 21://录像路径保存
					var strsuc = translate_page_item(TARGET_PAGE_TIPSTEXT, "infosave", "", ITEM_TYPE_NONE);
					var failed = translate_page_item(TARGET_PAGE_TIPSTEXT, "errset", "", ITEM_TYPE_NONE);
					parent.fun_show_tips_dialog(strsuc);
					// parent.fun_show_tips_dialog(failed, 0);
					break;
				default:
					break;
			}
		};
	}
	onopen(cab) {//连接监听
		this.ws.onopen = (res) => {
			// console.log('qt Connected success', res);
			clearInterval(qtCtrlTimer);//清除一次
			qtCtrlTimer = null;
			this.heartBeat();
			qtCtrlTimer = setInterval(() => {
				this.heartBeat();
			}, 2000);
			if (cab) cab(res)
		};
	}
	onerror(cab) {//错误监听
		this.ws.onerror = (err) => {
			if (cab) cab(err)
		};
	}
	send(TYPE, msg, cab) {//发送  
		let sendMsg = {
			TYPE, ...msg,
			token: this.token,
		}
		const isOpen = (ws) => {
			return ws.readyState === ws.OPEN
		}
		if (isOpen(this.ws)) {
			this.ws.send(JSON.stringify(sendMsg));
		} else {
			console.info('web socket is closing, reconnecting');
			// clearInterval(qtCtrlTimer);//清除一次
			// qtCtrlTimer = null;
		}
		if (cab) this.onmessage(cab);//若有，从发送直接获取消息回复
	}
	//--------------------------------- 【 以下是send实际方法 】-------------------------------------------
	showVideo(x, y, width, height, z) {//打开窗口
		width = Number(width.slice(0, -2)) - 2;
		height = Number(height.slice(0, -2)) - 4; //【-4】为适当裁剪

		const { availWidth, availHeight } = window.screen;//显示器分辨率width
		const { outerWidth, outerHeight } = window;//浏览器窗口大小
		const is360 = test_360BOM();//
		let bomX = (availWidth == outerWidth) ? -5 : (is360 ? -2 : -11);
		let bomY = (availHeight == outerHeight) ? 1 : (is360 ? -1 : 8);
		if (navigator.userAgent.toLowerCase().indexOf('qqbrowser') > -1) {//qq浏览器额外判断
			bomX = bomY = 0;
		}
		const zoom = PixelRatio();

		x = Math.round((x - bomX));
		y = Math.round((y - bomY));

		this.send(SHOWIDGE, {
			x, y, z, uuid,
			width: Math.round(width * zoom) || 1119,
			height: Math.round(height * zoom) || 802,
			title: document.title,
		});
	}
	getVideoStream(e, stream, codec) {//获取视频流
		if (e) this.getStream = false;
		if (this.getStream) return;
		const ip = document.location.host;//ip
		const port = Number(location.port) || 80;//端口
		const account = $.cookie('bvusername') || window.sessionStorage.getItem('bvusername');//用户名
		const wsid = $.cookie('wsid');
		this.send(AVDECODING, {
			ip,
			account,
			wsid,
			port,
			stream,
			codec,
		}, e => { });
		this.getStream = true;
	}
	destroyWindow() {//销毁
		this.send(CLOSEPROGRAM);
	}
	capture(imagefile) {//抓拍
		this.send(CAPTURE, { openfile: true, imagefile });
	}
	record_start(videofile) {//录制  开始
		this.send(STARTVIDEOTAPE, { openfile: true, videofile });
	}
	record_end(videofile) {//录制  结束
		this.send(STOPTVIDEOTAPE, { openfile: true, videofile });
	}
	getVerison() {//获取版本号
		this.send(VERSIO, {}, () => { });
	}
	searchRecord(date, cab) {//搜索录像 - 【暂时遗弃】
		const { year, month, day } = date;
		this.send(VIDEOSEARCH, {
			year, day, month,
		}, cab);
	}
	quickPlay() {//快速播放
		this.send(PLAYBACKFAST);
	}
	slowPlay() {//慢速播放
		this.send(PLAYBACKSLOW);
	}
	pausePlay() {//暂停    1暂停
		this.send(PLAYBACKSUSPEND, { "pause": 1, });
	}
	playStart() {//开始播放
		this.send(PLAYBACKSTART, { "pause": 0, });
	}
	playStop() {//播放停止
		this.send(PLATSTOP);
	}
	backRecord(date, start, end) {//回放录像
		const { day, year, month } = date;
		const wsid = $.cookie('wsid');
		this.send(REPLAYThEATER, {
			year, month, day, start, end, wsid,
		});
	}
	intercom(e) {//对讲机 开 - 关
		this.send(e ? INTERCOM : STOPINTERCOM,);
	}
	heartBeat(cab) {//心跳 （日期）
		this.send(HEARTBEA, {}, cab);
	}
	hideWindow() {//隐藏窗口
		this.send(HIDE);
	}
	exitLogin() {//退登
		this.send(EXIT);
	}
	setRation(status) {//设置比例
		this.send(WIDGET, {
			status
		});
	}
	getFilePath(cab) {//获取文件夹路径
		this.send(GETAVPATH, {}, e => {
			// console.log(e);
			cab(e)
		});
	}
	setFilePath(path) {//[设置保存]文件夹 路径
		const { imagePath, videoPath } = path;
		this.send(SETAVPATH, {
			imagePath,
			videoPath
		});
	}
	openFileSelect(type, filePath, cab) {//打开文件夹选择
		let isObj = { ...filePath };
		isObj[type] = true;
		this.send(POPAVPATH, isObj, e => {
			cab(e)
		});
	}
	openFolder(urlpath) {//根据 一个 路径 打开文件夹
		this.send(OPENURL, {
			urlpath,
		},);
	}
	setVolume(command, volume,videoMode) {//声音控制  - 静音 /音量
		this.send(AUDIOCONTROL, {
			command, volume,videoMode
		},);
	}
}