var levels = require('enb-bem-techs/techs/levels'),
    levelsToBemdecl = require('enb-bem-techs/techs/levels-to-bemdecl'),
    files = require('enb-bem-techs/techs/files'),
    provide = require('enb/techs/file-provider'),
    bemdecl = require('enb-bem-techs/techs/bemjson-to-bemdecl'),
    deps = require('enb-bem-techs/techs/deps'),
    css = require('enb-stylus/techs/css-stylus'),
    js = require('enb-diverse-js/techs/browser-js'),
    ym = require('enb-modules/techs/prepend-modules'),
    bhServerInclude = require('enb-bh/techs/bh-server-include'),
    bhYm = require('enb-bh/techs/bh-client-module'),
    html = require('enb-bh/techs/html-from-bemjson'),
    mergeFiles = require('enb/techs/file-merge'),
    borschik = require('enb-borschik/techs/borschik'),
    director = require('./techs/ym-director'),
    lodash = require('./techs/ym-lodash'),
    autoprefixer = require('enb-autoprefixer/techs/css-autoprefixer');

module.exports = function(config) {
    var node = 'build';

    config.node(node, function(nodeConfig) {
        nodeConfig.addTechs([
            [provide, {target : '?.bemjson.js'}],
            [levels, {levels: getLevels(config)}],
            [files],
            [deps],
            [bemdecl],
            [css, {target: '?.source.css'}],
            [autoprefixer, {
                sourceTarget: '?.source.css',
                destTarget: '?.prefix.css',
                browserSupport: ['last 2 versions', 'ie 10', 'opera 12.16']
            }],
            [js, { target : '?.source.js' }],
            [ym, {
                source : '?.source.js',
                target : '?.ym.js'
            }],
            [director, {target: '?.ym-director.js'}],
            [lodash, {target: '?.ym-lodash.js'}],
            [bhServerInclude, {jsAttrName: 'data-bem', jsAttrScheme: 'json'}],
            [bhYm, {target : '?.client.bh.js', jsAttrName: 'data-bem', jsAttrScheme: 'json'}],
            [mergeFiles, {
                target : '?.browser+bh+director+lodash.js',
                sources : [
                    '?.ym.js',
                    '?.client.bh.js',
                    '?.ym-director.js',
                    '?.ym-lodash.js'
                ]
            }],
            [html]
        ]);

        nodeConfig.mode('development', function(nodeConfig) {
            nodeConfig.addTechs([
                [
                    require('enb/techs/file-copy'),
                    {sourceTarget: '?.browser+bh+director+lodash.js', destTarget: '_?.js'}
                ],
                [
                    require('enb/techs/file-copy'),
                    {sourceTarget: '?.prefix.css', destTarget: '_?.css'}
                ]
            ]);
        });

        nodeConfig.mode('prod', function(nodeConfig) {
            nodeConfig.addTechs([
                [borschik, { source : '?.browser+bh+director+lodash.js', target : '_?.js' }],
                [borschik, { source : '?.prefix.css', target : '_?.css', freeze: true}]
            ]);
        });

        nodeConfig.addTargets(['_?.js', '_?.css', '?.html']);
    });

};

function getLevels(config) {
    return [
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'libs/bem-components/common.blocks',
        'libs/bem-components/desktop.blocks',
        'libs/bem-components/design/common.blocks',
        'libs/bem-components/design/desktop.blocks',
        'blocks',
        'layouts'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
