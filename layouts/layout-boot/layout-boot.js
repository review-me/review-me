modules.define(
    'layout-boot',
    ['i-bem__dom', 'director', 'lodash', 'BEMHTML', 'jquery', 'vow'],
    function(provide, BEMDOM, director, _, BEMHTML, $, vow) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    var requestParams,
                        getGETParams = function parseGetParams() {
                           var $_GET = {};
                           var __GET = window.location.search.substring(1).split("&");
                           for(var i=0; i<__GET.length; i++) {
                              var getVar = __GET[i].split("=");
                              $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
                           }
                           return $_GET;
                        },
                        params = getGETParams();

                    this._curr = this.findElem('placeholder');
                    this._renderLayout('layout-index')();

                    if (params.token) {
                        BEMDOM.replace(this._curr ,'Login: ' + params.name);

                        $.get("https://api.github.com/users/" + params.login + "/repos", function(data) {
                            vow.all(data.map(function(item) {
                                return $.get("https://api.github.com/repos/" + params.login + "/" + item.name + "/pulls");
                            })).spread(function() {
                                // console.log(arguments
                                // do something
                            });
                        });
                    }

                    /*director
                        .Router({
                            '/': this._renderLayout('layout-index'),
                            '/users/:user': this._renderLayout('layout-user'),
                            '/pulls/': this._renderLayout('layout-pulls')
                        })
                        .init();*/
                }
            }
        },
        _renderLayout: function(layoutName) {
            return function() {
                this._curr = BEMDOM.replace(this._curr, BEMHTML.apply({
                    block: layoutName,
                    js: _.toArray(arguments)
                }));
            }.bind(this);
        }
    }));
});
