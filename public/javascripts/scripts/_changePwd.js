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
        $j.post(
            '/user/changePwd', {
                newPassword: $j('#divFormChangePwd input[name=newPassword]').val(),
                data: $j('#divFormChangePwd input[name=data]').val()
            }, function (data) {
                if (data.etat) {
                    $j.alert({
                        title: '',
                        content: data.message,
                        closeIcon: false,
                        buttons: {
                            yes: {
                                text: 'Oui',
                                btnClass: 'btn-green',
                                action: function () {
                                    goToUrl('/login');
                                }
                            },
                            no: {
                                text: 'Non',
                                btnClass: 'btn-grey',
                                action: function () {
                                    goToUrl('/');
                                }
                            }

                        }
                    });
                } else {
                    $j('.changePwdContent .msgInfo').removeClass('msgInfoOk');
                    $j('.changePwdContent .msgInfo').addClass('msgInfoNok');
                    $j('.changePwdContent .msgInfo').html(data.message);
                }
            });
    });
});