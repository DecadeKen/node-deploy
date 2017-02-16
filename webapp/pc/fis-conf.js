var path = require('path');
// default settings. fis3 release

// // fis.set('project.fileType.text', 'svn,.svn');
// fis.set('project.ignore', []);

// Global start

fis.hook('commonjs', {});
fis.match('*.{js,css}', {
    useHash: true
});

fis.match('::image', {
    useHash: true
});



fis.match('*.js', {
    isMod: true
})
.match('common/dep/*.js', {
    isMod: false
})
.match('server.js', {
    isMod: false
});


// fis.match('*.css', {
//     // optimizer: fis.plugin('clean-css')
// });

fis.match('*.png', {
    // optimizer: fis.plugin('png-compressor')
});

fis.match('**/_*.scss', {
        release: false
    })
    .match('**.scss', {
        rExt: '.css',
        parser: fis.plugin('node-sass-nfd', {})
    });

// Global end

// default media is `dev`
fis.media('dev')
    .match('*', {
        useHash: false,
        // optimizer: null
    })
    .match(/\/(.+)\.tpl$/, { // js 模版一律用 .tpl 作为后缀
        isMod: true,
        rExt: 'js',
        id: '$1.tpl',
        url: '$0.tpl',
        moduleId: '$1.tpl',
        release: '$0.tpl', // 发布的后的文件名，避免和同目录下的 js 冲突
        parser: fis.plugin('imweb-tplv2')
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: false,
            processor: {
                '.html': 'html'
            },
            useInlineMap: false,
            resourceType: 'mod'
        })
    })
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: path.resolve(__dirname, '../pc-dev')
        })
    });


// extends GLOBAL config
fis.media('production');
