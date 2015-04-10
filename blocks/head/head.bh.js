module.exports = function(bh) {
    bh.match('head', function(ctx) {
        ctx.content('HEAD');
    });
};
