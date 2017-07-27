# adobeObjects

Simple jQuery plugin that creates PDF or FLASH objects.

```js
//<![CDATA[
    $(document).ready(function(){
        $("#return-label-container").adobeObject({
             type   : "pdf",
             url    : "path-to-file-here...",
             display : {
                 width : "650px",
                 height: "400px"
             },
             params : {
                page   : 1,
                toolbar: 1,
                zoom : {
                    enabled : true,
                    size    : 80
                }
            }
        });
    }); 
    //]]>
```