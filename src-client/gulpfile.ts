const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const cache = require('gulp-cached');
const Builder = require('systemjs-builder');
const path = require("path");
const preprocess = require('gulp-preprocess');
//const fileinclude = require('gulp-file-include');

const destinationDir = "./scripts/";
const distDir = "../WebContent/root/dev/www";
var packageJson = require('./package.json');
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del([distDir], {force: true}, cb);
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

gulp.task("dist", ["clean", "build"], () => {
    gulp.src("fonts/**")
        .pipe(gulp.dest(distDir + "/fonts"));

    gulp.src("images/**")
        .pipe(gulp.dest(distDir + "/images"));
    gulp.src("images.large/**")
        .pipe(gulp.dest(distDir + "/images.large"));
    gulp.src("images.small/**")
        .pipe(gulp.dest(distDir + "/images.small"));

    gulp.src("styles/**")
        .pipe(gulp.dest(distDir + "/styles"));
})

gulp.task('distDebug', ["dist"], () => {
  var modules = Object.keys(packageJson.dependencies);
  var moduleFiles = modules.map((module) => {
    return 'node_modules/' + module + '/**/*.*';
  });

  gulp.src(moduleFiles, { base: 'node_modules' })
    .pipe(gulp.dest(distDir + '/node_modules'));

  gulp.src("scripts/**")
        .pipe(gulp.dest(distDir + "/scripts"));

  gulp.src("index.html")
        .pipe(preprocess({context: { DEBUG: true}}))
        .pipe(gulp.dest(distDir));
});

gulp.task('distProd', ["bundle","dist"], () => {
    gulp.src("scripts/app/bundle.js")
        .pipe(gulp.dest(distDir + "/scripts/app"));
    gulp.src("scripts/**/*.html")
        .pipe(gulp.dest(distDir + "/scripts"));

    gulp.src("node_modules/bootstrap/dist/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/bootstrap/dist/css"));
    gulp.src("node_modules/select2/dist/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/select2/dist/css"));
    gulp.src("node_modules/font-awesome/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/font-awesome/css"));  
    gulp.src("node_modules/admin-lte/dist/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/admin-lte/dist/css"));

    gulp.src("node_modules/core-js/client/**")
        .pipe(gulp.dest(distDir + "/node_modules/core-js/client"));
    gulp.src("node_modules/zone.js/dist/**")
        .pipe(gulp.dest(distDir + "/node_modules/zone.js/dist"));
    gulp.src("node_modules/reflect-metadata/**")
        .pipe(gulp.dest(distDir + "/node_modules/reflect-metadata"));
    gulp.src("node_modules/jquery/dist/**")
        .pipe(gulp.dest(distDir + "/node_modules/jquery/dist"));
    gulp.src("node_modules/bootstrap/dist/js/**")
        .pipe(gulp.dest(distDir + "/node_modules/bootstrap/dist/js"));
    gulp.src("node_modules/admin-lte/dist/js/**")
        .pipe(gulp.dest(distDir + "/node_modules/admin-lte/dist/js"));

    return gulp.src("index.html")
        .pipe(preprocess({context: { DEBUG: true}}))
        .pipe(gulp.dest(distDir));
});

gulp.task('watch', function(){
  gulp.watch('scripts/**/*.ts', ['build']);
});

gulp.task('default', ['watch', 'distDebug']);

gulp.task('prod', ['distProd']);