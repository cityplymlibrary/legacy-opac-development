$(document).ready(function () {

    // Change catalog to catalogue in search dropdown select
    $("#masthead_search :contains('Library catalog')").html("Library catalogue");
    
    $("#moresearches li :contains('Authority search')").html("Name and subject search");
    
    $("#header_img").hide();
    $("#cartmenulink").hide();
    $("#members li p.navbar-text").hide();
    $("div#login").hide();
    $(".loginModal-trigger").hide();
    
    $("div#moresearches ul").append('<a href="/cgi-bin/koha/opac-shelves.pl?op=list&category=2">Lists</a>');
    
    //Change Collection advanced search tab to Format
    $("a:contains('Collection')").html('Format');
    
    $('head').append('<link rel="apple-touch-icon" sizes="120x120" href="http://www.moodleandmedia.com/lockdown/logos/apple-touch-icon-120x120-precomposed.png"/> <link rel="apple-touch-icon" sizes="152x152" href="http://www.moodleandmedia.com/lockdown/logos/apple-touch-icon-152x152-precomposed.png"/>');
    
      //Custom plymouth hide lists button in header
        $('a#listsmenu').hide();
        $('li.search_history').hide();
      
    var courseReserves = $("a:contains('Course reserves')");
    var nameAndSubjectSearch = $("a:contains('Name and subject search')");
      courseReserves.attr("href", "https://ccp.koha-ptfs.co.uk/cgi-bin/koha/opac-authorities-home.pl");
      courseReserves.text("Name and subject search");
      nameAndSubjectSearch.attr("href", "https://ccp.koha-ptfs.co.uk/cgi-bin/koha/opac-course-reserves.pl");
      nameAndSubjectSearch.text("Reading lists");
    
      /* include custom js file */
      $(document).ready(function () {
        $('#logo').click(function () {
            window.location.href = '/cgi-bin/koha/opac-main.pl';
        }); // add click for mobile devices
    
        //Hide LCF Archive from the hold pickup list
    
        $("[id^=branch] option[value='LCFA']").remove();
    
        //End of hide hold pickup location snippet.
    
        $('#opac-main .mastheadsearch').remove();
    
        // JF/MG - Get OPAC URL parameters so we can find the query parameter
        function getUrlVars() {
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                if (!(hash[0] in vars)) {
                    vars.push(hash[0]);
                    vars[hash[0]] = decodeURIComponent(hash[1]);
                } else {
                    vars[hash[0]] = vars[hash[0]] + '~' + decodeURIComponent(hash[1]);
                }
            }
            return vars;
        }
    
        var queryString1 = getUrlVars()['q'];
        var queryString = unescape(queryString1);
        var queryString2 = queryString.replace(/~/g, ' ');
        var queryString2 = queryString.replace(/\+/g, ' ');
        // END Get parameters
    
        // Keep querystring in search box after a search
        if (queryString !== 'undefined') {
            $('#field_search1').val(queryString2);
        }
    
        // JM - Document Title
        $((document.title = 'City College Plymouth Library Catalogue'));
    
        // Change catalog to UAL collections and ebooks in search dropdown select
        $("#masthead_search :contains('Library catalog')").html('Library catalogue');
    
        // AS - Date Slider on facets
        $.getScript('/opac-tmpl/bootstrap/lib/slider/js/bootstrap-slider.js', function () {
            // AS - advanced get UrlVars: deal with multiple query params.
            var myGetUrlVars = function () {
                var vars = [],
                    hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                // We return an array, with each key an array of values.
                // (Each query param could occur more than once).
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    var k = hash[0];
                    var v = hash[1];
                    if (vars[k] instanceof Array) {
                        vars[k].push(v);
                    } else {
                        vars.push(k);
                        vars[k] = [v];
                    }
                }
                return vars;
            };
            var urlVars = myGetUrlVars();
            var limit_yr = urlVars['limit-yr'];
            if (typeof limit_yr == 'undefined') {
                limit_yr = decodeURIComponent(urlVars['limit']);
                if (limit_yr.includes('yr,st-numeric')) {
                    limit_yr = limit_yr.match(/yr,st-numeric\S*,/g);
                    limit_yr[0] = limit_yr[0].replace('yr,st-numeric=', '');
                    limit_yr[0] = limit_yr[0].replace(',', '');
                }
            }
            if (limit_yr instanceof Array && !limit_yr[0] == '') {
                original = limit_yr[0].split('-').join(',');
            }
            var startyear = new Date().getFullYear() - 100;
            var endyear = new Date().getFullYear();
            if (typeof original == 'undefined') {
                var original = startyear + ',' + endyear;
            }
            //var original = startyear+","+endyear;
            $('#search-facets > ul').append(
                "<li id='date-li'><h1 id='date-range'>Date Range</h1>" +
                    '<ul>' +
                    '<li>' +
                    '<input id="ualdateslider" type="text" value="' +
                    original +
                    '" data-slider-min="' +
                    startyear +
                    '" data-slider-max="' +
                    endyear +
                    '" data-slider-step="1" data-slider-value="[' +
                    original +
                    ']" />' +
                    '</br>' +
                    '<input type="text" name="stext" id="stext" style="width:35%;" value="' +
                    startyear +
                    '" /> to <input type="text" name="etext" id="etext" style="width:35%;" value="' +
                    endyear +
                    '" />' +
                    '<button id="ualdaterefine" type="button" class="btn btn-primary btn-sm">Refine Date</button>' +
                    '</li>' +
                    '</ul>' +
                    '</li>'
            );
            if (typeof original != 'undefined') {
                var yrs = original.split(',');
                $('#stext').val(yrs[0]);
                $('#etext').val(yrs[1]);
            }
            if ($('#ualdateslider').prop('value')) {
                $('#ualdateslider').bootstrapSlider({ tooltip: 'hide' });
            }
            $('#ualdateslider').on('slide', function (slideEvt) {
                var limitdates = slideEvt.value.toString().split(',');
                $('#stext').val(limitdates[0]);
                $('#etext').val(limitdates[1]);
            });
            $('#stext').change(function (e) {
                $('#ualdateslider').bootstrapSlider(
                    'setValue',
                    [parseInt($('#stext').val()), parseInt($('#etext').val())],
                    true,
                    true
                );
            });
            $('#etext').change(function () {
                $('#ualdateslider').bootstrapSlider(
                    'setValue',
                    [parseInt($('#stext').val()), parseInt($('#etext').val())],
                    true,
                    true
                );
            });
            $('#ualdaterefine').click(function () {
                var url = '';
                //var range = $("#ualdateslider").val().split(",").join("-");
                var range = $('#stext').val() + '-' + $('#etext').val();
                if (limit_yr) {
                    var qstring = urlVars
                        .map(function (val) {
                            if (val == 'limit-yr') {
                                return val + '=' + range;
                            } else {
                                return val + '=' + urlVars[val].join('&' + val + '=');
                            }
                        })
                        .join('&');
                    url = '//' + location.hostname + location.pathname + '?' + qstring;
                } else {
                    url = location + '&limit-yr=' + range;
                }
                location.assign(url);
            });
        });
    
        $('#facetcontainer ul li ul').addClass('hide');
        $('#facetcontainer ul li').click(function () {
            $(this).toggleClass('active');
            $('.hide', this).slideToggle();
        });
    
        // MG auto expand facets that have a filter applied or where show more has been clicked
        function expandFacet(f) {
            if (document.getElementById(f + '_id')) {
                document.getElementById(f + '_id').click();
            }
        }
    
        // build an array from the limit and nolimit URL parameters
        function getFacetLimits(limitvars, nolimitvars) {
            var facetlimits = new Array();
            if (typeof limitvars != 'undefined') {
                var facet;
                var limits = limitvars.split('~');
                if (typeof nolimitvars != 'undefined') {
                    var pos = limits.indexOf(nolimitvars);
                    limits.splice(pos, 1);
                }
                for (var i = 0; i < limits.length; i++) {
                    facet = limits[i].split(':');
                    if (!(facet[0] in facetlimits)) {
                        facetlimits.push(facet[0]);
                    }
                }
            }
            return facetlimits;
        }
    
        // grab the value from expand URL parameter
        function getMoreFacets(expandvars) {
            var expandfacet;
            if (typeof expandvars != 'undefined') {
                var expand = expandvars.split('#');
                expandfacet = expand[0];
            }
            return expandfacet;
        }
        var facetvars = getUrlVars(); // get a hash of all URL parameters
        var facetlimits = getFacetLimits(facetvars.limit, facetvars.nolimit); // get an array of limit parameters with nolimit parameters removed
        var expandfacet = getMoreFacets(facetvars.expand); // get a value for any facet where Show more has been clicked
    
        // combine facets that have limits applied and show more facets
        if (typeof expandfacet != 'undefined') {
            facetlimits.push(expandfacet);
        }
        // take out empty vars
        facetlimits = facetlimits.filter(Boolean);
        // unique values only
        var expandFacets = facetlimits.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        // expand facets in the array
        if (typeof expandFacets !== 'undefined') {
            for (var i = 0, len = expandFacets.length; i < len; i++) {
                expandFacet(expandFacets[i]);
            }
        }
    
        // AS - END of date slider
        
        // Remove default user menu
        $('#user-menu').remove();
    
        // Menu Icons
        $("#menu [href='/cgi-bin/koha/opac-user.pl']").append('<i class="fa fa-file-text-o fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-account.pl']").append(
            '<i class="fa fa-exclamation-triangle fa-2x"></i>'
        );
        $("#menu [href='/cgi-bin/koha/opac-search-history.pl']").append('<i class="fa fa-search fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-readingrecord.pl']").append('<i class="fa fa-mail-reply fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-suggestions.pl']").append('<i class="fa fa-book fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-shelves.pl?op=list&category=1']").append(
            '<i class="fa fa-list-ol fa-2x"></i>'
        );
        //$("#menu [href='/cgi-bin/koha/opac-shelves.pl?display=privateshelves']").append('<i class="fa fa-list-ol fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-messaging.pl']").append('<i class="fa fa-file-text-o fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-ill.pl']").append('<i class="fa fa-file-text-o fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-memberentry.pl']").append('<i class="fa fa-user fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-tags.pl?mine=1']").append('<i class="fa fa-tags fa-2x"></i>');
        $("#menu [href='/cgi-bin/koha/opac-passwd.pl']").append('<i class="fa fa-unlock-alt fa-2x"></i>');
    
        // Wikipedia search auto-complete help
        /*    $("#field_search").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: "https://en.wikipedia.org/w/api.php",
                    dataType: "jsonp",
                    data: {
                        'action': "opensearch",
                        'format': "json",
                        'search': request.term
                    },
                    success: function(data) {
                        response(data[1]);
                    }
                });
            }
        });
    
        // Spellcheck "search again"
        $(document).on('click', '#spellcheck-search', function(event) {
            event.preventDefault();
            var url = window.location.href;
            $("[id^=spellsuggest-]").each(function() {
                var mis = $(this).attr('id').replace('spellsuggest-', '');
                var sel = $(this).val();
                url = url.replace(mis, encodeURIComponent(sel));
            });
            window.location = url;
        });
    
        // Wikipedia search auto-complete help for search results page
        $("#field_search1").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: "https://en.wikipedia.org/w/api.php",
                    dataType: "jsonp",
                    data: {
                        'action': "opensearch",
                        'format': "json",
                        'search': request.term
                    },
                    success: function(data) {
                        response(data[1]);
                    }
                });
            }
        });
    */
    
        // Hide Search options by default and display on click
        $('.search-opt').hide();
        $('.search-opt-cust').hide();
        $('.search-opt-home').hide();
    
        $(document).on('click', function (e) {
            var elem = $(e.target).closest('.transl1, .ui-autocomplete-input'),
                box = $(e.target).closest('.search-opt');
    
            if (elem.length) {
                // the anchor was clicked
                e.preventDefault(); // prevent the default action
                $('.search-opt').toggle(); // toggle visibility
            } else if (!box.length) {
                // the document, but not the anchor or the div
                $('.search-opt').hide(); // was clicked, hide it !
            }
        });
    
        $(document).on('click', function (e) {
            var elem = $(e.target).closest('#c_fullRecord, .TextInput'),
                box = $(e.target).closest('.search-opt-cust');
    
            if (elem.length) {
                // the anchor was clicked
                e.preventDefault(); // prevent the default action
                $('.search-opt-cust').toggle(); // toggle visibility
            } else if (!box.length) {
                // the document, but not the anchor or the div
                $('.search-opt-cust').hide(); // was clicked, hide it !
            }
        });
    
        $(document).on('click', function (e) {
            var elem = $(e.target).closest('#fullRecord, .TextInput'),
                box = $(e.target).closest('.search-opt-home');
    
            if (elem.length) {
                // the anchor was clicked
                e.preventDefault(); // prevent the default action
                $('.search-opt-home').toggle(); // toggle visibility
            } else if (!box.length) {
                // the document, but not the anchor or the div
                $('.search-opt-home').hide(); // was clicked, hide it !
            }
        });
    
        // MR - Login
        // Add login dropdown
        $('#moresearches').append(
            //'<a href="/Shibboleth.sso/Login?target=https://ccp.koha-ptfs.co.uk/cgi-bin/koha/opac-main.pl" id="login_button_mr" class="helpBtn">Login</a>' 		// shib login
            '<a href="/cgi-bin/koha/opac-user.pl" id="login_button_mr" class="helpBtn">Login</a>' // native login
        );
        
        // change content of auth modal
        $('#modalAuth').html('<div class="modal-body"><h2>College student?</h2><h3><a href="/Shibboleth.sso/Login?target=https://ccp.koha-ptfs.co.uk' + window.location.pathname + window.location.search + '">Go to College login &raquo;</a></h3><h2>Staff or associate?</h2><h3><a href="/cgi-bin/koha/opac-user.pl">Go to local Koha login &raquo;</a></h3></div>');
        
        // opac-user remove h2, h3, h4, p in opac-auth area
        $('#opac-auth > h2').remove();
        $('#opac-auth > h3').remove();
        $('#opac-auth > h4').remove();
        $('#opac-auth > p').remove();    
        
        // change contents of opac-usr page
        $('#auth').html('<h1>Log in to The Library</h1><h2>College student?</h2><h3><a href="/Shibboleth.sso/Login?target=https://ccp.koha-ptfs.co.uk' + window.location.pathname + window.location.search + '">Go to College login &raquo;</a></h3><h2>Staff or associate?</h2><h3><a href="#" id="authShowLnk">Click here to show login &raquo;</a></h3><div id="authBox" style="display:none"><input type="hidden" name="koha_login_context" value="opac"><fieldset class="brief"><label for="userid">Login</label><input type="text" size="25" id="userid" name="userid"><label for="password">Password</label><input type="password" size="25" id="password" name="password"></fieldset><input type="submit" value="Log in" class="btn"><div><strong>New to the Library catalogue?</strong><br />You will need a Library PIN to access our services. Please email <a href="mailto:library&#64;cityplym&#46;ac&#46;uk">library@cityplym.ac.uk</a> and we\'ll get that sorted for you.</div></div>');
        
        // change authLink fucntions
        $('#authShowLnk').click( function( event ) {
            event.preventDefault();
              if($('#authBox').css('display') == 'none') {
              $('#authBox').css('display', 'inline-block');
              $('#authShowLnk').html('Click here to hide login &laquo;');
            } else if($('#authBox').css('display') == 'inline-block') {
              $('#authBox').css('display', 'none');
              $('#authShowLnk').html('Click here to show login &raquo;');
            }
        });
        
        // change login button functions
        $('#login_button_mr').click( function( event ) {
          event.preventDefault();
          $("#loginModal").modal("show");
        });
        
        // Remove local password reset option - Shib transition
        $('#forgotpassword').remove();
    
        // Add user dropdown
        $('#moresearches').append(
            '<div class="dropdown pull-right" id="user_menu_mr"><button class="btn btn-default dropdown-toggle" type="button" id="usermenuDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Your account<span class="caret"></span></button><div id="user-dropdown" class="dropdown-menu" aria-labelledby="user-dropdown-menu"><div class="btn"><a href="/cgi-bin/koha/opac-search-history.pl" title="View your search history">Search history</a> [<a class="logout" href="/cgi-bin/koha/opac-search-history.pl?action=delete" title="Delete your search history" onclick="return confirm(MSG_DELETE_SEARCH_HISTORY);">x</a>]</div><div class="btn"><a href="/cgi-bin/koha/opac-account.pl">Fines</a></div><div class="btn"><a href="/cgi-bin/koha/opac-user.pl">Summary</a></div><div class="btn"><a class="logout" id="logout_mr" href="/cgi-bin/koha/opac-main.pl?logout.x=1">Log out</a></div></div></div>'
        );
    
        // Control which displays (depending if logged in)
        if ($(".loggedinusername").length) {
            $("a#login_button_mr").hide();
            $("div#user_menu_mr").show();
        } else {
            $("a#login_button_mr").show();
            $("div#user_menu_mr").hide();
        }
        // MR - END
    
        $('#moresearches').append(
            '<div class="screenOptions">Screen Options<div class="screenOptionsDropDown"><div class="fontSizes"><span class="fontSize">Font size</span><div class="sizeDown">A</div><div class="normal">A</div><div class="sizeUp">A</div></div><div class="defaultOption">Default Style</div><div class="creamOption">Cream with Black Text</div><div class="blueOption">Blue with Black Text</div><div class="blackOption">Black with Yellow Text</div></div></div><a href="http://moodle.cityplym.ac.uk/course/view.php?id=399" target="_blank" class="helpBtn">Help</a>'
        );
    
        var sizeUp = $.cookie('sizeUp');
        if (sizeUp) {
            $('body').attr('class', sizeUp);
        }
        $('.sizeUp').click(function () {
            $('body').addClass('sizeUpFont');
            $('body').removeClass('normal sizeDownFont');
            $.cookie('sizeUp', $('body').attr('class'));
        });
        $('.normal').click(function () {
            $('body').removeClass('sizeUpFont');
            $.cookie('sizeUp', $('body').attr('class'));
        });
    
        var sizeDown = $.cookie('sizeDown');
        if (sizeDown) {
            $('body').attr('class', sizeDown);
        }
        $('.sizeDown').click(function () {
            $('body').addClass('sizeDownFont');
            $('body').removeClass('normal sizeUpFont');
            $.cookie('sizeDown', $('body').attr('class'));
        });
        $('.normal').click(function () {
            $('body').removeClass('sizeDownFont');
            $.cookie('sizeDown', $('body').attr('class'));
        });
    
        $('.screenOptionsDropDown').hide();
    
        $(document).on('click', function (e) {
            var elem = $(e.target).closest('.screenOptions'),
                box = $(e.target).closest('.screenOptionsDropDown');
    
            if (elem.length) {
                // the anchor was clicked
                e.preventDefault(); // prevent the default action
                $('.screenOptionsDropDown').toggle(); // toggle visibility
            } else if (!box.length) {
                // the document, but not the anchor or the div
                $('.screenOptionsDropDown').hide(); // was clicked, hide it !
            }
        });
    
        var cream_class = $.cookie('cream_class');
        if (cream_class) {
            $('body').attr('class', cream_class);
        }
        $('.creamOption').click(function () {
            $('body').addClass('cream');
            $('body').removeClass('blue black branch-default');
            $.cookie('cream_class', $('body').attr('class'), { path: '/' });
            $.cookie('black_class', null, { expires: -1, path: '/' });
            $.cookie('blue_class', null, { expires: -1, path: '/' });
        });
    
        var blue_class = $.cookie('blue_class');
        if (blue_class) {
            $('body').attr('class', blue_class);
        }
        $('.blueOption').click(function () {
            $('body').addClass('blue');
            $('body').removeClass('cream black branch-default');
            $.cookie('blue_class', $('body').attr('class'), { path: '/' });
            $.cookie('black_class', null, { expires: -1, path: '/' });
            $.cookie('cream_class', null, { expires: -1, path: '/' });
        });
    
        var black_class = $.cookie('black_class');
        if (black_class) {
            $('body').attr('class', black_class);
        }
        $('.blackOption').click(function () {
            $('body').addClass('black');
            $('body').removeClass('cream blue branch-default');
            $.cookie('black_class', $('body').attr('class'), { path: '/' });
            $.cookie('blue_class', null, { expires: -1, path: '/' });
            $.cookie('cream_class', null, { expires: -1, path: '/' });
        });
        $('.defaultOption').click(function () {
            $('body').attr('class', '');
            $.cookie('black_class', null, { expires: -1, path: '/' });
            $.cookie('blue_class', null, { expires: -1, path: '/' });
            $.cookie('cream_class', null, { expires: -1, path: '/' });
        });
    
        // AI - Relates to placing of "did you mean" box
        //$("#toolbar").detach().prependTo("#top-pages");
        $('#didyoumean').detach().prependTo('#top-pages');
        $('#numresults').detach().prependTo('#top-pages');
    });
    
    // Print Circ History
    $(document).ready(function () {
        $("h3:contains('Loan history')").append(
            '<h3 class="print push-right fa fa-print"><a href="#print"> Print Loan History</a></h3>'
        );
        $('h3 h3.print a').click(function () {
            window.print();
            return false;
        });
    });
    
    // Hide Analytics links
    $("span.label:contains('Analytics: ')").hide();
    $("a:contains('Show analytics')").hide();

    
    // BS phrase search reformatter for Koha simple search 20190108
    $("[id^=searchsubmit]").click( function() {
         var form = $(this).parents('form').attr('id');
         var ksearch = $("[id^=field_search]").val();
         var orig_search=ksearch;
         // see if phrase search wanted
         var phrsearchreq = ksearch.match(/[\"].*[\"]/g);		
         if (phrsearchreq) {                     
             // check if and or not appear in the search string as these may be being used as search terms so should be left alone.
             var boolpcheck = ksearch.match(/[\"](AND|and|OR|or|NOT|not)[\"]/g);		
             if (!boolpcheck) {				
                ksearch=format_phrase_search(ksearch);
             }
         }
         if(orig_search == ksearch)
         {
            return true;
         }
         else
         {
            newUrl = window.location.protocol + "/cgi-bin/koha/opac-search.pl?" + ksearch;
            window.location.replace(newUrl)
            return false;
         }
    
    });
      
      
    function format_phrase_search(q)
    {
     //take all between double-quotes, prepend with kw,phr= and lose double-quotes
     var sphrase = q.match(/\"(.*)\"/);
     // glue whatever was before and after to the end
     var othersearchterms = q.replace(/\".*\"/,"").trim();
     var searchstr = "q=kw%2Cphr%3D" + sphrase[1].replace(/\s+/,"+");
     if(othersearchterms.length > 0 ) {
        searchstr += "&idx=kw&q=" + othersearchterms;
     } 
     return searchstr + "&do=Search&sort_by=relevance";
    }
    // end BS js
	
	//
	// test spa script
	if(window.location.pathname == '/' || window.location.pathname == '/cgi-bin/koha/opac-main.pl') {
		
		// listen for changes in the url
		spa_inject_payload();
		window.addEventListener('popstate', function (event) {
			spa_inject_payload();
		});
	}
	
	function spa_inject_payload() {
		// vars
		var id = window.location.hash.substring(3);
		
		if(id == 'test1') {
			// set metadata
			$(document).attr('title', 'City College Plymouth catalogue › Test page 1');
			// now set the main body
			$('#wrap').html('<h1>Test page 1<\/h1><p>This is test page 1 of 2. Use the links below to move about this SPA<\/p><hr \/><p><strong>Options:<\/strong> <a href=\"#!\/test1\">Goto test page 1<\/a> | <a href=\"#!\/test2\">Goto test page 2<\/a><\/p>');

		} else if(id == 'test2') {
			// set metadata
			$(document).attr('title', 'City College Plymouth catalogue › Test page 1');
			// now set the main body
			$('#wrap').html('<h1>Test page 2<\/h1><p>This is test page 2 of 2. Use the links below to move about this SPA<\/p><hr \/><p><strong>Options:<\/strong> <a href=\"#!\/test1\">Goto test page 1<\/a> | <a href=\"#!\/test2\">Goto test page 2<\/a><\/p>');
			
		}
	}
});