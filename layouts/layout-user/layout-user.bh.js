module.exports = function(bh) {
    bh.match('layout-user', function(ctx, json) {
        ctx.content('this is user content! userId = ' + json.js[0]);
    });
};
