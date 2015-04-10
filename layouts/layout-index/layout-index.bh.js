module.exports = function(bh) {
    bh.match('layout-index', function(ctx) {
        ctx.content({
            block : 'button',
            mods : { theme : 'islands', size : 'xl' },
            text : 'review'
        });
    });
};
