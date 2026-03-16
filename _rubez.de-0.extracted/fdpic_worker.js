function msgitem(status,seqno,filename,blob){
    this.sta = status;
    this.seq = seqno;
    this.blob = blob;
    this.file = filename;
    return this;
}

onmessage = function (ev) {
    var seqno = ev.data.seq;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var fname = xhttp.getResponseHeader("FName");
            var fseqn = xhttp.getResponseHeader("FSeqno");
            seqno = parseInt(fseqn);
            var data = this.response;
            var rawdata = [];
            rawdata.push(data);
            var blob = new Blob(rawdata, {type: 'application/octet-stream'});
            postMessage(new msgitem("success",seqno,fname,blob));
        } else if (this.readyState == 4 && this.status != 200) {
            postMessage(new msgitem("failed",0,'',null))
        }
    };
    xhttp.timeout = function () {
        //postMessage(new msgitem("timeout",0,"",null))
    };
    xhttp.open("POST", "/action/face?subject=facepic&last=" + String(seqno), false);
    xhttp.setRequestHeader("X-UA-Compatible", "IE=edge");
    xhttp.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.responseType = 'blob';
    xhttp.timeout = 3000;
    xhttp.send();
};