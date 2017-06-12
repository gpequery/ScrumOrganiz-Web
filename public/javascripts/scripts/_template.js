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

            $j('input[type=button]').attr('disabled', 'disabled');
        },
        success:function(label,element) {
            label.parent().removeClass('error');
            label.remove();
            $j('.msgInfo').removeClass('msgInfoNok');
            $j('.msgInfo').html('&nbsp;');

            $j('input[type=button]').attr('disabled', false);
        }
    });


    $j('.headOption.pseudo').on('click', function() {
        console.log('CLICKED');
    });
});

function goToUrl(url) {
    $j('.formNavigate').attr('action', url);
    $j('.formNavigate').submit();
}

