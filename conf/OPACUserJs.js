// OPACUserJS, OPAC SPA Project, Jake Deery on behalf of City College Plymouth, 2021
document.addEventListener("DOMContentLoaded", function(event) { 
	//
	// gdpr
	if(localStorage.getItem('-ccp-gdrp-dismissed') == null) $('body').prepend('<div id=\"-gdpr-banner\"><p>This website uses cookies to ensure you get the best experience on our website <a id=\"-gdpr-moreinfo\" href=\"\/\/www.cityplym.ac.uk\/legal-cookies\/\" target=\"_blank\">More info \u00BB<\/a><button id=\"-gdpr-dismiss\" class=\"btn btn-primary\">Dismiss<\/button><\/p><\/div>');
	$('#-gdpr-dismiss, #-gdpr-moreinfo').click(function() {
		localStorage.setItem('-ccp-gdrp-dismissed', 'true');
		$('#-gdpr-banner').remove();
	});

	//
	// site-wide logic (MAIN FUNC)

	// nav menus
	if($('.sco').length == 0) $('ul.nav').first().html('<li><a target=\"_blank\" href=\"https:\/\/moodle.cityplym.ac.uk\/course\/view.php?id=399\" title=\"Name &amp; subject search\" id=\"helpmenu\"><i class=\"fa fa-info-circle fa-icon-white\"><\/i> <span class=\"helplabel\">Help<\/span><\/a><\/li><li><a href=\"\/cgi-bin\/koha\/opac-authorities-home.pl\" title=\"Name &amp; subject search\" id=\"ssmenu\"><i class=\"fa fa-graduation-cap fa-icon-white\"><\/i> <span class=\"sslabel\">Name &amp; subject search<\/span><\/a><\/li><li><a href=\"\/cgi-bin\/koha\/opac-course-reserves.pl\" title=\"Lists\" id=\"listsmenu\"><i class=\"fa fa-list fa-icon-white\"><\/i> <span class=\"listslabel\">Reading lists<\/span><\/a><\/li><li><a href=\"\/cgi-bin\/koha\/opac-shelves.pl?op=list&amp;category=2\" title=\"Lists\" id=\"listsmenu2\"><i class=\"fa fa-list-alt fa-icon-white\"><\/i> <span class=\"listslabel2\">Other lists<\/span><\/a><\/li>');

	// login modal
	$('#loginModal').html('<div class=\"modal-header\"><button type=\"button\" class=\"closebtn\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7<\/button><h2 id=\"modalLoginLabel\">Log in to your account<\/h2><\/div><div id=\"modalAuth\" class=\"modal-body\"><h3>College student?<\/h3><p><a href=\"\/Shibboleth.sso\/Login?target=https:\/\/ccp.koha-ptfs.co.uk'+window.location.pathname+window.location.search+'\" class=\"btn btn-primary\">Go to College login &raquo;<\/a><\/p><h3>Staff or associate?<\/h3><p><a href=\"\/cgi-bin\/koha\/opac-user.pl\" class=\"btn btn-primary\">Go to local Koha login &raquo;<\/a><\/p><\/div>');

	// search box
	$('#translControl1').attr('placeholder', 'Search for books, eBooks, journal articles, DVDs...');

	// moresearches
	$('#moresearches ul').html('<li><a href=\"\/cgi-bin\/koha\/opac-search.pl\">Advanced search<\/a><\/li>');

	// login page
	$('#opac-auth').html('<h2>Log in to your account<\/h2><h3>College student?<\/h3><p><a href=\"\/Shibboleth.sso\/Login?target=https:\/\/ccp.koha-ptfs.co.uk'+window.location.pathname+window.location.search+'\" class=\"btn btn-primary\">Go to College login &raquo;<\/a><\/p><h3>Staff or associate?<\/h3><form action=\"\/cgi-bin\/koha\/opac-user.pl\" name=\"auth\" id=\"auth\" method=\"post\" autocomplete=\"off\"><input type=\"hidden\" name=\"koha_login_context\" value=\"opac\"\/><fieldset class=\"brief\"><label for=\"userid\">Login<\/label><input type=\"text\" size=\"25\" id=\"userid\" name=\"userid\"\/><label for=\"password\">Password<\/label><input type=\"password\" size=\"25\" id=\"password\" name=\"password\"\/><\/fieldset><input type=\"submit\" value=\"Log in\" class=\"btn btn-primary\"\/><div id=\"nologininstructions\"><p>&nbsp;<\/p><p><strong>Don\'t have a password yet?<\/strong><\/p><p>If you don\'t have a password yet, stop by the Library counter the next time you\'re in College. We\'ll happily set one up for you.<\/p><p><strong>Don\'t have a student or staff ID card?<\/strong><\/p><p>If you don\'t have a student or staff ID card, please come and see us and we can provide you with one. Remember to bring valid photo ID.<\/p><\/div><\/form>');

});
