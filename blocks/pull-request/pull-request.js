modules.define(
    'pull-request',
    ['i-bem__dom', 'BEMHTML'],
    function(provide, BEMDOM, BEMHTML){
        provide(BEMDOM.decl(this.name, {

            onSetMod: {
                js: function() {
                    var repo = this.params.repo,
                        login = this.params.login,
                        button = this.findBlockInside('button'),
                        popup = this.findBlockOutside('page').findBlockInside('popup'),
                        contributors = BEMHTML.apply({ block: 'contributors', js: { repo: repo, login: login }  });

                    button.on('click', function() {
                        popup.setAnchor(button).setContent(contributors).setMod("visible", true);
                    }, this);
                }
            }

        }));
    }
);
