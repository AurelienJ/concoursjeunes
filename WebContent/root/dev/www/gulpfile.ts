const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const cache = require('gulp-cached');
const Builder = require('systemjs-builder');
const path = require("path");
//const fileinclude = require('gulp-file-include');

const destinationDir = "./scripts/"
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del([destinationDir], {force: true}, cb);
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", () => {

    var tsResult = gulp.src("scripts/**/*.ts")
        .pipe(cache("compiling"))
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {includeContent:false, sourceRoot:'./'}))
        .pipe(gulp.dest(destinationDir));
});

gulp.task('bundle', ["compile"], () => {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder(".", destinationDir + 'systemjs.config.js');

    /*
       the parameters of the below buildStatic() method are:
           - your transcompiled application boot file (the one wich would contain the bootstrap(MyApp, [PROVIDERS]) function - in my case 'dist/app/boot.js'
           - the output (file into which it would output the bundled code)
           - options {}
    */
    return builder
        .buildStatic(destinationDir + 'app/main.js', 
            destinationDir + 'app/bundle.js',
            { minify: true, sourceMaps: false })
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

/**
 * Build the project.
 */
gulp.task("build", ['compile'], () => {
    console.log("Building the project ...")
});

gulp.task('watch', function(){
  gulp.watch('scripts/**/*.ts', ['build']);
});

gulp.task('default', ['watch', 'build']);

gulp.task('prod', ['watch', 'build', 'bundle']);