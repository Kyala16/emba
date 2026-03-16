/**
 * Created by Eiven on 2017/5/24.
 */
function sdk_getipcparam(val,fcallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200){
          fcallback(this.responseText);
      }else if(this.readyState == 4 && this.status != 200){
          fcallback(false);
      }
    };
    xhttp.open("POST",val,true);
	xhttp.setRequestHeader("X-UA-Compatible","IE=edge");
    xhttp.setRequestHeader("Cache-Control","no-cache, must-revalidate");
    xhttp.setRequestHeader("Pragma","no-cache");
    xhttp.send();
}
function sdk_getipcresource(val,fcallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            fcallback(this.response);
        }else if(this.readyState == 4 && this.status != 200){
            fcallback(false);
        }
    };
    xhttp.open("GET",val,true);
    xhttp.send();
}
function sdk_setipcparam(val,data,fcallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            fcallback(true);
        }else if(this.readyState == 4 && this.status == 500){
            fcallback(false);
        }else if(this.readyState == 4 && this.status == 400){
            fcallback(400);//bad request
        }else if(this.readyState == 4 && this.status == 403){
            fcallback(403);//auth
        }else if(this.readyState == 4 && this.status == 409){
            fcallback(409);//exist
        }
    };
    var sync = true;
    if(arguments.length === 4){
        if(typeof arguments[3] === "boolean"){
            sync = arguments[3];
        }
    }
    xhttp.open("POST",val,sync);
    xhttp.send(String(data));
}
function loadXMLDoc(dname)
{
    var xmlDoc=null;
    //判断浏览器的类型
    //支持IE浏览器
    if(!window.DOMParser && window.ActiveXObject){
        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
        for(var i=0;i<xmlDomVersions.length;i++){
            try{
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                break;
            }catch(e){
            }
        }
    }
    //支持Mozilla浏览器
    else if(document.implementation && document.implementation.createDocument){
        try{
            /* document.implementation.createDocument('','',null); 方法的三个参数说明
             * 第一个参数是包含文档所使用的命名空间URI的字符串；
             * 第二个参数是包含文档根元素名称的字符串；
             * 第三个参数是要创建的文档类型（也称为doctype）
             */
            xmlDoc = document.implementation.createDocument('','',null);
        }catch(e){
        }
    }
    else{
        return null;
    }
    if(xmlDoc!=null){
        xmlDoc.async = false;
        xmlDoc.load(dname);
    }
    return xmlDoc;
}

function loadXMLString(xmlString) {
    var xmlDoc=null;
    //判断浏览器的类型
    //支持IE浏览器
    if(!window.DOMParser && window.ActiveXObject){ //window.DOMParser 判断是否是非ie浏览器
        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
        for(var i=0;i<xmlDomVersions.length;i++){
            try{
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                break;
            }catch(e){
            }
        }
    }
    //支持Mozilla浏览器
    else if(window.DOMParser && document.implementation && document.implementation.createDocument){
        try{
            /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
             * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
             * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
             * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
             */
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        }catch(e){
        }
    }
    else{
        return null;
    }
    return xmlDoc;
}