jQuery(function() {
    $j = jQuery.noConflict();

    $j.getScript('/javascripts/scripts/_template.js', function() {
        console.info('Load was performed --> _template');
    });

    $j.getScript('/javascripts/scripts/_header.js', function() {
        console.info('Load was performed --> _header');
    });

    $j.getScript('/javascripts/scripts/_home.js', function() {
        console.info('Load was performed --> _home');
    });

    $j.getScript('/javascripts/scripts/_signup.js', function() {
        console.info('Load was performed --> _signup');
    });

    $j.getScript('/javascripts/scripts/_login.js', function() {
        console.info('Load was performed --> _login');
    });

    $j.getScript('/javascripts/scripts/_forget.js', function() {
        console.info('Load was performed --> _forget');
    });

    $j.getScript('/javascripts/scripts/_changePwd.js', function() {
        console.info('Load was performed --> _changePwd');
    });

    $j.getScript('/javascripts/scripts/_setting.js', function() {
        console.info('Load was performed --> _setting');
    });
});