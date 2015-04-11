modules.define(
    'user',
    ['i-bem__dom', 'director', 'lodash', 'BEMHTML'],
    function(provide, BEMDOM, director, _, BEMHTML) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this._usernameLink = this.findBlockInside(this.elem('user-login'), 'link');
                }
            },
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

        setUser: function(text, url, picUrl) {
            this._usernameLink.setUrl(url);
            this._usernameLink.domElem.text(text);

            if (picUrl) {
                this.elem('user-pic').css('background', 'url(' + picUrl + ')');
                this.elem('user-pic').css('background-size', '100%');
            }
        }
    }));
});
