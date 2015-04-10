modules.define(
    'layout-boot',
    ['i-bem__dom', 'director', 'lodash', 'bh'],
    function(provide, BEMDOM, director, _, bh) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this._curr = this.findElem('placeholder');
                    this._renderLayout('layout-index')();

                    director
                        .Router({
                            '/': this._renderLayout('layout-index'),
                            '/users/:user': this._renderLayout('layout-user')
                        })
                        .init();
                }
            }
        },
        _renderLayout: function(layoutName) {
            return function() {
                this._curr = BEMDOM.replace(this._curr, bh.apply({
                    block: layoutName,
                    js: _.toArray(arguments)
                }));
            }.bind(this);
        }
    }));
});
