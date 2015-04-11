modules.define(
    'contributors',
    ['i-bem__dom', 'director', 'lodash', 'BEMHTML', 'jquery'],
    function(provide, BEMDOM, director, _, BEMHTML, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    var that = this;

                    this._spin = this.findBlockInside('spin');
                    this._spin.setMod('visible', true);

                    $.get("https://api.github.com/repos/"
                        + this.params.login + "/" + this.params.repo
                        + "/contributors?access_token="
                        + JSON.parse(localStorage.getItem('user')).token, function(contributors) {
                            BEMDOM.update(that.elem('items'), BEMHTML.apply(contributors.map(function(contributor) {
                                return {
                                    block: 'contributors',
                                    elem: 'contributor',
                                    login: contributor.login,
                                    avatar: contributor.avatar_url
                                };
                            })));

                            that._spin.delMod('visible');
                    });

                    this.bindTo('contributor', this._onContributorClick.bind(this));
                    this.bindToDomElem(this.elem('contributor'), this._onContributorClick.bind(this));
                }
            }
        },

        _onContributorClick: function(e) {
            debugger;
        }
    }));
}, {
    live : function() {
        this.liveBindTo('contributor', 'click', function(e) {
            debugger;
            this._onContributorClick(e);
        });
        return false; // если инициализация блока не может быть отложена
    }
});
