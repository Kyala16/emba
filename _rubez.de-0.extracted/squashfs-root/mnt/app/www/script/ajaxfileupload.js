jQuery.extend({
	createXHR : function()
	{
		if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                var i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
	},
    
    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id 	 = new Date().getTime()        
		var form = new FormData();
        var requestDone = false;
		form.append("file", document.getElementById(s.fileElementId).files[0]);          
        // Create the request object
        var xhr 		= jQuery.createXHR();
		if(s.progress) {
			xhr.upload.onprogress = function(evt){
				s.progress(evt);
			};
		}

		if ( s.timeout > 0 ) {
            setTimeout(function(){
                if(!requestDone) jQuery.handleError(s, xhr, "timout");
            }, s.timeout);
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState==4) {
                requestDone = true;
                if (s.success) s.success(xhr.status);
            }
        };

		try {
            xhr.open("POST",  s.url);
            xhr.send(form);         
        }catch(e) { 
            jQuery.handleError(s, xhr, "error");
        }		
        
        return {abort: function () {}};
    },

    handleError: function( s, xhr, msg) {
		if (s.error)
			s.error(msg );
	}
});
