// 
// ----------------------------------------------------------------------------
// "THE BEER-WARE LICENSE" (Revision 42):
// <magee@ucolick.org> wrote this file. As long as you retain this notice you
// can do whatever you want with this stuff. If we meet some day, and you think
// this stuff is worth it, you can buy me a beer in return. Daniel K. Magee
// ----------------------------------------------------------------------------
// 

(function($){
    $.jADSAnywhere = function(el, query, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // ADS
        base.adsBaseURL = 'http://adsabs.harvard.edu/cgi-bin/nph-abs_connect?type=XML&data_type=XML&start_nr=1';
        // YQL
        // Set callback to base.adsCallback
        base.yqlBaseURL = 'http://query.yahooapis.com/v1/public/yql';
        base.yqlBaseQuery = 'select record from xml where url=';
        
        // Add a reverse reference to the DOM object
        base.$el.data("adsQuery", base);
        
        base.init = function(){
            if( typeof( query ) === "undefined" || query === null ) query = "";
            base.query = query;
            base.options = $.extend({},$.jADSAnywhere.defaultOptions, options);
            
            // Build the loader 
            base.buildLoader();
			
			//Build and encode ADS URL query string
			if(base.options.privateLib) {
			    base.adsURL = base.adsBaseURL+'&library&libid='+base.query+'&libname='+base.options.privateLibName.replace(/ /g, '+')+'&nr_to_return='+base.options.limit;
			} else {
			    base.adsURL = base.adsBaseURL+'&author='+encodeURIComponent(base.query)+'&nr_to_return='+base.options.limit+'&qform=AST';
			    if (base.options.astroDB) base.adsURL += '&db_key=AST';
                if (base.options.physicsDB) base.adsURL += '&db_key=PHY';
                if (base.options.arxivDB) base.adsURL += '&db_key=PRE';
			};
			
            if (base.options.pubYearStart) base.adsURL += '&start_year='+base.options.pubYearStart;
            if (base.options.pubYearEnd) base.adsURL += '&end_year='+base.options.pubYearEnd;
            
			// Build and encode YQL query string
			base.yqlQuery = {q:base.yqlBaseQuery+'"'+base.adsURL+'"', format:'json'};
			
			// Run the query
		    $.ajax({
		        url:           base.yqlBaseURL,
                data:          base.yqlQuery,
                dataType:      'jsonp',
                jsonp:         'callback',
                jsonpCallback: 'adsCallback'
            });
        };
        
        
        base.buildLoader = function(){
            base.$loader = $('<div id="loading">Loading publications from ADS...</div>');
            base.$loader.css({
                'display': 'none',
                'text-align': 'center',
                'z-index': 5000,
                'position': 'fixed',
                'left': '40%',
                'bottom': '40%',
                'padding': '10px',
                'background-color': '#000',
                'opacity': 0.8,
                'color': '#fff',
                '-moz-border-radius': '10px',
                '-webkit-border-radius': '10px',
                'border-radius': '10px'
            });
            base.$loader.appendTo(base.$el).hide();
            base.$loader.ajaxStart(function() {
                $(this).fadeIn(500);
            });
        };
        
        // Formatter
        base.formatRecord = function(rec){
            var html = 
                 '<h5>'+rec.pubdate+'</h5>' +
                 '<h3>'+rec.title+'</h3>' +
                 '<p>'+rec.authors+'</p>' +
                 '<blockquote>'+rec.abs+'</blockquote>' +
                 '<p>'+rec.journal+' <a href="'+rec.url+'">View ADS page</a></p>'
            ;
            
            return html;
        };
        
        // Callback for YQL query
        adsCallback = function(data){
            $.each(data.query.results.records, function(i, item){
                var record = {};
                $.each(item.record, function(key) {
                    var value = item.record[key];
                    if ( typeof(value) === 'object' ){
                        if ( key === 'author' ) record.authors = value.join(', ');
                        if ( key === 'keywords') {
                            record.keywords = ( typeof(value.keyword) === 'object' ) ? value.keyword.join(', ') : value.keyword;
                        };
                        if ( key === 'link') {
                            record.links = {};
                            $.each(value, function(j) {
                                var l = value[j];
                                if (l.type) {
                                    var t = l.type.toLowerCase();
                                    if (t === 'abstract') t = 'abs';
                                    record.links[t] = {name : l.name, url : l.url};
                                };
                            });
                        };
                    } else {
                        if ( key === 'author' ) {
                            record.authors = value;
                        } else if ( key === 'abstract' ) {
                            record.abs = value;
                        } else {
                            record[key] = value; 
                        };
                    };
                });
                // console.log(record);
                base.$el.append(base.formatRecord(record));
            });
            base.$loader.fadeOut(500);
        };
        
        // Run initializer
        base.init();
        
    };
    
    $.jADSAnywhere.defaultOptions = {
        limit: 20,
        privateLib: false,
        privateLibName: null,
        astroDB: true,
        physicsDB: true,
        arxivDB: true,
        pubYearStart: null,
        pubYearEnd: null
    };
    
    $.fn.jADSAnywhere = function(query, options){
        return this.each(function(i){
            (new $.jADSAnywhere(this, query, options));
        });
    };
    
})(jQuery);
