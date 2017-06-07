$j(function () {

    /* Enables POST navigation everywhere */
    $j('.navigate').on('click', function() {
        goToUrl($j(this).attr('data-url'));
    });


    /* init all validator message */
    $j.extend(jQuery.validator.messages, {
        required: "Champ requis",
        minlength: $j.validator.format("Minimum {0} caractéres."),
        equalTo: 'Renseigner les mêmes valeurs'
    });

    $j.validator.setDefaults({
        errorElement: 'span',
        errorPlacement: function(error, element) {
            $j('.msgInfo').removeClass('msgInfoOk');
            $j('.msgInfo').addClass('msgInfoNok');
            $j('.msgInfo').html(error);

            $j('h1').css('margin-top', '21px');

            $j('input[type=submit]').attr('opacity', 0.4);
            $j('input[type=submit]').attr('disabled', 'disabled');
        },
        success:function(label,element) {
            label.parent().removeClass('error');
            label.remove();
            $j('.msgInfo').removeClass('msgInfoNok');
            $j('.msgInfo').html('');

            $j('h1').css('margin-top', '17px');

            $j('input[type=submit]').attr('opacity', 1);
            $j('input[type=submit]').attr('disabled', false);
        }
    });
});

function goToUrl(url) {
    $j('.formNavigate').attr('action', url);
    $j('.formNavigate').submit();
}

