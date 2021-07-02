// OPACUserJS, OPAC SPA Project, Jake Deery on behalf of City College Plymouth, 2021
document.addEventListener("DOMContentLoaded", function(event) { 
	//
	// gdpr
	if(localStorage.getItem('-ccp-gdrp-dismissed') == null) $('body').prepend('<div id=\"-gdpr-banner\"><p>This website uses cookies to ensure you get the best experience on our website <a id=\"-gdpr-moreinfo\" href=\"#!\/privacy-policy\">More info \u00BB<\/a><button id=\"-gdpr-dismiss\" class=\"btn btn-primary\">Dismiss<\/button><\/p><\/div>');
	$('#-gdpr-dismiss, #-gdpr-moreinfo').click(function() {
		localStorage.setItem('-ccp-gdrp-dismissed', 'true');
		$('#-gdpr-banner').remove();
	});

	//
	// site-wide logic (MAIN FUNC)

	// nav menus
	$('.navbar-inner ul.nav').first().html('<li><a target=\"_blank\" href=\"https:\/\/moodle.cityplym.ac.uk\/course\/view.php?id=399\" title=\"Help\" id=\"helpmenu\"><i class=\"fa fa-info-circle fa-icon-white\"><\/i> <span class=\"helplabel\">Help<\/span><\/a><\/li><li><a target=\"_blank\" href=\"https:\/\/forms.gle\/2NKzKTWrzHtcanuL7\" title=\"Feedback\" id=\"feedbackmenu\"><i class=\"fa fa-comments fa-icon-white\"><\/i> <span class=\"feedbacklabel\">Feedback<\/span><\/a><\/li><li><a href=\"\/cgi-bin\/koha\/opac-authorities-home.pl\" title=\"Name &amp; subject search\" id=\"ssmenu\"><i class=\"fa fa-graduation-cap fa-icon-white\"><\/i> <span class=\"sslabel\">Name &amp; subject search<\/span><\/a><\/li><li><a href=\"\/cgi-bin\/koha\/opac-course-reserves.pl\" title=\"Lists\" id=\"listsmenu\"><i class=\"fa fa-list fa-icon-white\"><\/i> <span class=\"listslabel\">Reading lists<\/span><\/a><\/li><li><a href=\"\/cgi-bin\/koha\/opac-shelves.pl?op=list&amp;category=2\" title=\"Virtual shelves\" id=\"listsmenu2\"><i class=\"fa fa-bookmark fa-icon-white\"><\/i> <span class=\"listslabel2\">Virtual shelves<\/span><\/a><\/li>');

	// login modal
	$('#loginModal').html('<div class=\"modal-header\"><button type=\"button\" class=\"closebtn\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7<\/button><h2 id=\"modalLoginLabel\">Log in to your account<\/h2><\/div><div id=\"modalAuth\" class=\"modal-body\"><h3>College student or staff?<\/h3><p><a href=\"\/Shibboleth.sso\/Login?target=https:\/\/ccp.koha-ptfs.co.uk\/cgi-bin\/koha\/opac-user.pl\" class=\"btn btn-primary\">Go to College login &raquo;<\/a><\/p><h3>College associate?<\/h3><p><a href=\"\/cgi-bin\/koha\/opac-user.pl\" class=\"btn btn-primary\">Go to local Koha login &raquo;<\/a><\/p><\/div>');

	// search box
	$('#translControl1').attr('placeholder', 'Search for books, eBooks, journal articles, DVDs...');

	// moresearches
	$('#moresearches').html('<ul><li><a href=\"\/cgi-bin\/koha\/opac-search.pl\">Advanced search<\/a><\/li><\/ul>');

	// login page
	if($('#auth').length > 0 && $('#opac-auth').children('h4').eq(1).length > 0) {
		$('#opac-auth').children('h4').eq(0).text('College student or staff?');
		$('#opac-auth').children('p').eq(0).html('<a href=\"\/Shibboleth.sso\/Login?target=https:\/\/ccp.koha-ptfs.co.uk\/cgi-bin\/koha\/opac-main.pl\" class=\"btn btn-primary\">Go to College login &raquo;<\/a>');
		$('#opac-auth').children('h4').eq(1).text('College associate?');
		$('#opac-auth').children('p').eq(1).text('Please enter the login details provided to you by the Library team');
		$('#nologininstructions').html('<p style=\"padding:1rem 0\">If you don\'t have a College ID card or password, visit the Library counter, where we will be able to provide these to you. Please note: if you need a College ID, please bring photo ID and proof of enrolment.<\/p>');
	} else if($('#auth').length > 0 && $('#opac-auth').children('h4').eq(1).length < 1) {
		$('#opac-auth').children('h4').eq(0).text('College associate?');
		$('#opac-auth').children('p').eq(0).text('Please enter the login details provided to you by the Library team');
		$('#nologininstructions').html('<p style=\"padding:1rem 0\">If you don\'t have a College ID card or password, visit the Library counter, where we will be able to provide these to you. Please note: if you need a College ID, please bring photo ID and proof of enrolment.<\/p>');
	}
});
