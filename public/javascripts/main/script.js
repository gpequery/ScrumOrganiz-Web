$j(function() {
    $j.getScript('/javascripts/scripts/_template.js', function() {
        console.info('LOAD STATUS : Load was performed --> _template');
    });

    $j.getScript('/javascripts/scripts/_home.js', function() {
        console.info('LOAD STATUS : Load was performed --> _home');
    });

    $j.getScript('/javascripts/scripts/_signup.js', function() {
        console.info('LOAD STATUS : Load was performed --> _signup');
    });
});