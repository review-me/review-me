modules.define(
    'layout-boot',
    ['i-bem__dom', 'director', 'lodash', 'BEMHTML', 'jquery', 'vow'],
    function(provide, BEMDOM, director, _, BEMHTML, $, vow) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    var that = this,
                        // блок с кнопкой авторизации / информацией юзера
                        userBlock = this.findBlockInside('user'),
                        userInSrorage = JSON.parse(localStorage.getItem('user')),
                        GETParams = this._getGETParams();

                    this._content = this.elem('placeholder');

                    this._paranja = this.findBlockInside('paranja');
                    this._spin = this.findBlockInside('spin');

                    // если есть залогиненный юзер
                    if (userInSrorage) {
                        // показываем паранжу и спиннер
                        this.setMod('progress', 'yes');

                        $.get("https://api.github.com/user?token=" + userInSrorage.token, function(userData) {
                            // получить сылку на аватарку
                            // у нас проблемы, по этому токену говорит, что мне не авторизованы,
                            // нужно лезить в документацию
                        });

                        // идем за данными про pr'ы юзера
                        $.get("https://api.github.com/users/" + userInSrorage.login + "/repos", function(data) {
                            vow.all(data.map(function(item) {
                                return $.get("https://api.github.com/repos/" + userInSrorage.login + "/" + item.name + "/pulls");
                            })).spread(function() {
                                //  обновить и показать блок пользователя
                                userBlock.setUser(userInSrorage.login);
                                userBlock.setMod('type', 'user');

                                // обновить  view
                                that._content = BEMDOM.replace(that._content, BEMHTML.apply({
                                    block: 'layout-pulls',
                                    items: that._glueArs(arguments)
                                }));

                                // спрятать спиннер и паранжу
                                that.delMod('progress');
                            });
                        });
                    } else {
                        if (GETParams.token) {
                            localStorage.setItem('user', JSON.stringify({
                                token: GETParams.token,
                                login: GETParams.login,
                                name: GETParams.name
                            }));

                            //переходим на url без GET-параметров
                            location.href = location.href.replace(/\?.*/, '');
                        } else {
                            // показываем кнопку залогинивания
                            userBlock.setMod('type', 'login');

                            // и можно показать какую-то заглушку в контенте
                        }
                    }
                    /*director
                        .Router({
                            '/': this._renderLayout('layout-index'),
                            '/users/:user': this._renderLayout('layout-user'),
                            '/pulls/': this._renderLayout('layout-pulls')
                        })
                        .init();*/
                }
            },
            progress: {
                yes: function() {
                    this._paranja.setMod('visible', 'yes');
                    this._spin.setMod('visible', true);
                },
                '': function() {
                    this._paranja.delMod('visible');
                    this._spin.delMod('visible');
                }
            }
        },

        /*_renderLayout: function(layoutName) {
            return function() {
                this._curr = BEMDOM.replace(this._curr, BEMHTML.apply({
                    block: layoutName,
                    js: _.toArray(arguments)
                }));
            }.bind(this);
        },*/

        _getGETParams: function() {
           var $_GET = {},
                __GET = window.location.search.substring(1).split("&");

           for(var i=0; i<__GET.length; i++) {
              var getVar = __GET[i].split("=");
              $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
           }

           return $_GET;
        },

        _glueArs: function(args) {
            var i,
                res = [];
            for (i = 0; i < args.length; i++) {
                res = res.concat(args[i]);
            }

            return res;
        }
    }));
});
