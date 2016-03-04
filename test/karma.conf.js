module.exports = function (config) {
    var files = [
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-mocks/angular-mocks.js'
    ];
    var srcCodeFiles = [
        'src/**/app.js',
        'test/unit/**/*.js'
    ];
    if(config.bundleFileName) {
       files.push(config.bundleFileName);
    }
    else {
        files = files.concat(srcCodeFiles);
    }
    config.set({
        basePath: '../',

        files: files,

        exclude: [
            'test/webpack/webpackTest.js'
        ],

        preprocessors: {
            'src/**/*.js': ['webpack'],
            'dist/test/**/*.js': ['webpack']
        },
        autoWatch: false,
        frameworks: ['jasmine'],

        browsers: ['Chrome'],
        webpack : {
                 resolve: {
                    modulesDirectories: ['node_modules', '../.']
                }

        },
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-webpack'
        ]
    });
};