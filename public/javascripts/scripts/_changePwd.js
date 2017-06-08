$j(function () {

    $j('#divFormChangePwd form').validate({
        rules: {
            newPassword: {
                equalTo: "#divFormChangePwd input[name=confirm]"
            },
            confirm: {
                equalTo: "#divFormChangePwd input[name=newPassword]"
            }
        },
        onkeyup: function(element) {$j(element).valid()}
    });


    $j('#divFormChangePwd input[type=button]').click(function() {
        console.log('CLICKED');
        $j.post(
            '/user/changePwd', {
                newPassword: $j('#divFormChangePwd input[name=newPassword]').val(),
                data: $j('#divFormChangePwd input[name=data]').val()
            }, function (data) {
                console.log('data : ' + JSON.stringify(data));
                if (data.etat) {
                    if(confirm(data.message)) {
                        goToUrl('/login');
                    } else {
                        goToUrl('/');
                    }
                } else {
                    $j('.changePwdContent .msgInfo').removeClass('msgInfoOk');
                    $j('.changePwdContent .msgInfo').addClass('msgInfoNok');
                    $j('.changePwdContent .msgInfo').html(data.message);
                }
            });
    });

});