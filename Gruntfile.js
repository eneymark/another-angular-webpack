
module.exports = function (grunt) {

    grunt.registerTask('webpack-test-dependencies', function(){
        grunt.config.set('karma.unit.bundleFileName', 'dist/test/webpack/webPackTest.js');
        var filesList = grunt.file.expand({filter: "isFile"},
            ['src/**/*.js']);//sources go here
        var skipped = [
            'src/skipThisFile.js'/*add files here, and they'll be skipped*/
        ];
        filesList.forEach(function(fileName, index) {
            if(skipped.indexOf(fileName) === -1){
                grunt.task.run(['set-replacement:' + fileName +':' + index, 'string-replace', 'karma:unit']);
            }
        })
    });
    grunt.registerTask('set-replacement', function(replacement, number){
        console.log('replacing for ' + replacement + ', file #' + number);
        //in large project, that number can be used to keep moving your loop, so not to process again again after breakage
        grunt.config.set('string-replace.dist.options.replacements', [{
            pattern: '@@toBeReplacedModuleName@@',
            replacement : replacement
        }]);
    });

   grunt.initConfig({

        'string-replace' : {
            dist:{
                files: [{
                    src: 'test/webpack/webpackTest.js',
                    dest: 'dist/'
                }],
                options: {
                    replacements: []//empty cause it will be set dynamically
                }
            }
        },

        karma: {
            'unit': {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        //webpack config with grunt, its standard, and defined by webpack docs.
        webpack : {
            dist: {
                resolve: {
                    modulesDirectories: ['node_modules', '.']
                },
                entry: './src/app.js',
                output: {
                    path: 'generated/',
                    filename: 'bundle.js'
                },
                devtool:'source-map'//generate source map
            }
        }

    });
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-string-replace');
};