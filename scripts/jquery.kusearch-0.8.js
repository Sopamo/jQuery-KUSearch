/**
 * Copyright (c) 2011 Paul Mohr, www.sopamo.de
 * Licence: MIT http://www.opensource.org/licenses/mit-license.php
 *
 **/
;(function($, undefined) {
    var pluginName = 'KUSearch',
            author = 'Paul Mohr',
            defaults = {
                data : '',
                find : '',
                caseSensitive : false,
                text : 'text'
            },
            methods = {
                init : function(options) {
                    var settings = $.extend({},defaults,options);
                    return this.each(function() {
                        // Declaring variables
                        var $this = $(this),$data;
                        // Skip if element has kusearch already
                        if($this.data(pluginName)) return true;
                        // Setting options to the object data
                        $this.data(pluginName, settings);
                        $data = $(settings.data);
                        if(settings.find) $data = $data.find(settings.find);
                        $this.data(pluginName+'-data',$data);
                        $this.kusearch('start');
                        return true;
                    });
                },
                start : function()
                {
                    var $this = $(this);
                    $this.bind('keyup blur',methods.search);
                },
                search : function()
                {
                    var $this = $(this), search = $this.val(), settings = $(this).data(pluginName);
                    if(!settings.caseSensitive)
                    {
                        search = search.toLowerCase();
                    }
                    $.map($(this).data(pluginName+'-data'), function(node) {
                        if(settings.text == 'text') text = $(node).text();
                        else text = $(node).attr(settings.text);
                        if(!settings.caseSensitive)
                        {
                            text = text.toLowerCase();
                        }
                        if(text.indexOf(search) >= 0)
                            $(node).show();
                        else
                            node.style.display='none';
                    });
                },
                stop : function()
                {
                    var $this = $(this);
                    $this.unbind('keyup',methods.search);
                }
            };
    $.fn.kusearch = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.KUSearch');
        }
    };
})(jQuery);