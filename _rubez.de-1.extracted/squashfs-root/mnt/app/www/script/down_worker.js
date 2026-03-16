self.onmessage = function (ev) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/action/peoplecount?subject=peoplecount_file&name=' + ev.data.file, true);
    xhr.responseType = 'blob';
    xhr.onload = function (evt) {
        if(xhr.status === 200){
            self.postMessage({blob:this.response,file:ev.data.file});
        }
    };
    xhr.send();
};