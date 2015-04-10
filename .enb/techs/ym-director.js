var vfs = require('enb/lib/fs/async-fs'),
    path = require('path');

module.exports = require('enb/lib/build-flow').create()
    .name('ym-page')
    .target('target', '?')
    .builder(function() {
        var file = path.resolve('libs/director/build/director.js');

        return vfs
            .read(file)
            .then(function(source) {
                return [
                    "modules.define('director', function(provide) {",
                    "var exports = {},",
                    "    module = {exports: exports};",
                    "   " + source,
                    "   provide(module.exports)",
                    "});"
                ].join('\n');
            });
    })
    .createTech();
