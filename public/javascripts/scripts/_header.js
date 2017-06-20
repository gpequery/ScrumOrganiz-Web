$j(function () {
    /* open popin */
    $j('.headOption.setting').on('click', function () {
        $j('.popinHeaderRight.pseudo').css('display') == 'none' ? $j('.popinHeaderRight.pseudo').show('slow') : $j('.popinHeaderRight.pseudo').hide('slow');
    });

    /* close session before exit */
    $j('.popinHeaderRight .logout').on('click', function () {
        $j.post(
            '/user/closeSession', {}, function () {
                goToUrl('/');
            });
    });

    $j('header#online .project .addProject').on('click', function () {
        var html = '' +
            '<form id="formNewProject">' +
            '<input type="text" name="name" placeholder="Nom" required="required" class="form-control bold"/>' +
            '<textarea name="description" placeholder="Déscription" required="required" form="formNewProject" class="form-control"></textarea>' +
            '</form>';

        $j.confirm({
            title: 'Création d\'un nouveau projet',
            content: html,
            type: 'blue',
            typeAnimated: true,
            boxWidth: '350px',
            useBootstrap: false,
            buttons: {
                formCancel: {
                    text: 'Annuler'
                },
                formSubmit: {
                    text: 'Créer',
                    btnClass: 'btn-blue',
                    action: function () {
                        setTimeout(function() {
                            $j.post(
                                '/project/addProject', {
                                    name: $j('#formNewProject input[name=name]').val(),
                                    description: $j('#formNewProject textarea[name=description]').val(),
                                    date: new Date()
                                }, function (data) {
                                    console.log(JSON.stringify(data));
                                    if (data.etat) {
                                        $j('.jconfirm').remove();
                                    } else {
                                        alert(data.message);
                                    }
                                });
                        }, 300);
                        return false;
                    }
                }
            },
            onContentReady: function () {
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click');
                })
            }
        });
    });
});
