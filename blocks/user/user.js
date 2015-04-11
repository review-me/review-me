modules.define(
    'user',
    ['i-bem__dom', 'director', 'lodash', 'BEMHTML'],
    function(provide, BEMDOM, director, _, BEMHTML) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            type: {
                login: function() {
                    this
                        .delMod(this.elem('login-button'), 'visibility')
                        .setMod(this.elem('user-info'), 'visibility', 'hidden');
                },
                user: function() {
                    this
                        .delMod(this.elem('user-info'), 'visibility')
                        .setMod(this.elem('login-button'), 'visibility', 'hidden');
                }
            }
        },

        setUser: function(login, picUrl) {
            this.elem('user-login').text(login);

            if (picUrl) {
                this.elem('user-pic').css('background', 'url(' + picUrl + ')');
                this.elem('user-pic').css('background-size', '100%');
            }
        }
    }));
});
