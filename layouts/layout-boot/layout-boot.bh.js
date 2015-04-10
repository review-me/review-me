module.exports = function(bh) {
    bh.match('layout-boot', function(ctx) {
        ctx
            .content([
                {block: 'head', content: 'head'},
                {elem: 'placeholder'},
                {block: 'footer', content: 'footer'}
            ])
            .js(true);
    });
};
