$j(function () {

    $j('#divFormChangePwd form').validate({
        rules: {
            newPassword: {
                equalTo: "#divFormChangePwd input[name=confirm]"
            },
            confirm: {
                equalTo: "#divFormChangePwd input[name=newPassword]"
            }
        }, onkeyup: function(element) {$j(element).valid()}
    });

});