//<![CDATA[   
    (function($){
        $.fn.adobeObject = function(options){
            var settings = $.extend({
                type        : "pdf",        // pdf | swf
                url         : "",           // the url to the pdf|swf file.
                display     : {
                    width   : "500px",      // width in pixels
                    height  : "500px"       // height in pixels
                },
                params      : {},           // see object params for defualts
                browser     : window.navigator.userAgent
            }, options);
            /**
             * defualt object params
             */
            var pdf_params = {
                page        : 0,        // pdf : the page number to start on
                zoom        : {
                    enabled : false,    // pdf : true|false
                    size    : 100       // pdf : the zoom of the pdf object
                },      
                view        : "Fit",    // pdf : Fit, FitH, FitV - how to display
                scrollbar   : 0,        // pdf : 1|0 
                toolbar     : 0,        // pdf : 1|0
                statusbar   : 0,        // pdf : 1|0
                navpanes    : 0   
            };


            var swf_params = {
                play        : true,     // swf : true|false - auto play
                loop        : true,     // swf : true|false - continuous play
                menu        : false,    // swf : true|false - movie menu
                quality     : "best",   // swf : low, autolow, autohigh, medium, high, best
                scale       : "defualt",// swf : defualt, noborder, exactfit, noscale
                bgcolor     : "#FFFFFF" // swf : html color codes
            };

           return this.each(function(){

               var container = this;

               var adobeObject = {
                   methods : {
                       init : function(){
                            if (settings.type === "pdf"){
                                adobeObject.methods.setParams(pdf_params);
                                adobeObject.pdfObject.build();  
                            } else if (settings.type === "swf"){
                                adobeObject.methods.setParams(swf_params);
                                adobeObject.swfObject.build();
                            }
                       },

                       browserCheck : function(){
                            if (settings.browser.indexOf("MSIE") !== -1){
                                return "ie";
                            } else {
                                return "other";
                            }
                       },

                       setParams : function(params){
                            for (var prop in params){
                                if (typeof settings.params[prop] === null || typeof settings.params[prop] === "undefined"){
                                    settings.params[prop] = params[prop];
                                }
                            }  
                       }        
                   },

                   pdfObject : {        
                        getUrl : function(){
                            var url = settings.url + "#";
                            for (var prop in settings.params){
                                if ((prop !== "zoom") && (prop !== "view")){
                                    url += prop + "=" + settings.params[prop] + "&";
                                }
                            }

                            if (settings.params.zoom.enabled){
                                url += "zoom=" + settings.params.zoom.size;
                            } else {
                                url += "view=" + settings.params.view; 
                            }

                            return url;
                        },

                        build : function(){
                            if (adobeObject.methods.browserCheck() === "ie"){
                                var html = '<object type="application/pdf" data="' + this.getUrl() + '" width="' + settings.display.width +'" height="' + settings.display.height + '"></object>';
                                container.innerHTML = html;
                            } else {
                                var element = document.createElement("object");
                                element.style.width = settings.display.width;
                                element.style.height = settings.display.height;
                                element.setAttribute("type", "application/pdf");
                                element.setAttribute("data", this.getUrl());
                                container.appendChild(element); 
                            }
                        }
                   },

                   swfObject : {
                        getUrl : function(){
                            return settings.url;
                        },

                        build : function(){
                            if (adobeObject.methods.browserCheck() === "ie"){
                                var html = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + settings.display.width + '" height="' + settings.display.height + '">';
                                    html += '<param name="movie" value="' + this.getUrl() + '" />';
                                    for (var prop in settings.params){
                                        html += '<param name="' + prop + '" value="' + settings.params[prop] +'" />';
                                    }
                                    html += '</object>';
                                container.innerHTML = html;
                            } else {
                                var element = document.createElement("object");
                                element.style.width = settings.display.width;
                                element.style.height = settings.display.height;
                                element.setAttribute("type", "application/x-shockwave-flash");
                                element.setAttribute("data", this.getUrl());
                                container.appendChild(element);
                                for (var prop in settings.params){
                                    this.addParamTag(element, prop, settings.params[prop]);
                                }
                            }
                        },

                        addParamTag : function(element, name, value){
                            var newParam = document.createElement("param");
                            newParam.setAttribute("name", name);
                            newParam.setAttribute("value", value);
                            element.appendChild(newParam);
                        }
                   }
               };

               adobeObject.methods.init();

           });
        };
   })( jQuery );
 //]]>  