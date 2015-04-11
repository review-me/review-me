({
    block: 'page',
    title: 'review-me',
    favicon: '/favicon.ico',
    head: [
        {elem: 'css', url: '_build.css', ie: false},
        {elem: 'js', url: '_build.js'},
        {elem: 'meta', attrs: {name: 'description', content: ''}},
        {elem: 'meta', attrs: {name: 'keywords', content: ''}},
        {elem: 'meta', attrs: {name: 'viewport', content: 'initial-scale=1, user-scalable=no'}}
    ],
    content: {
        block: 'layout-boot'
    }

});
