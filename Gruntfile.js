/**
 * Created by richieli on 2015/2/12.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        meta: {
            banner: '/**\n*author: <%= pkg.author %>\n*<%= pkg.name %><%= pkg.version %> | <%= pkg.homepage %>\n*/\n\n'
        },
        concat: {
            options: {
                separator: "",
                stripBanners: true,
                banner: "<%= meta.banner %>"
            },
            main: {
                src: "./src/*.js",
                dest: "./dist/iOSBounce-<%= pkg.version %>.js"
            }
        },
        uglify: {
            options: {
                banner: "<%= meta.banner %>"
            },
            main: {
                src: "<%= concat.main.dest %>",
                dest: "./dist/iOSBounce-min-<%= pkg.version %>.js"
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        "./dist/*"
                    ]
                }]
            }
        },
        jsdoc: {
            dist: {
                src: "./src/*.js",
                options: {
                    destination: 'doc'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                //undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                console: true,
                define: true,
                global: true,
                module: true
            },
            gruntfile: {
                src: "Gruntfile.js"
            },
            main: {
                src: "./src/*.js"
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            main: {
                files: '<%= jshint.main.src %>',
                tasks: ['jsdoc', 'clean', 'concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', [
        'jsdoc',
        'clean',
        'concat',
        'uglify',
        'watch'
    ]);
};