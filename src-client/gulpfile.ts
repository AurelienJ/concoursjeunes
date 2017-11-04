const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const cache = require('gulp-cached');
const path = require("path");
const preprocess = require('gulp-preprocess');
//const fileinclude = require('gulp-file-include');

const destinationDir = "./scripts/";
const distDir = "../WebContent/root/dev/www";
var packageJson = require('./package.json');

var isDebug = true;
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

    var tsResult = gulp.src("scripts/app/**/*.ts")
        .pipe(cache("compiling"))
        .pipe(preprocess({context: { DEBUG: isDebug}}))
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {includeContent:false, sourceRoot:'./'}))
        .pipe(gulp.dest(destinationDir + "/app"));
});

/**
 * Build the project.
 */
gulp.task("build", ['compile'], () => {
    console.log("Building the project ...")
});

gulp.task("dist", [ "clean" ], () => {
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

    gulp.src("node_modules/ngx-bootstrap/datepicker/themes/bs/bs-datepicker-view.html")
        .pipe(gulp.dest(distDir + ""));
})

gulp.task('distDebug', ["dist", "build"], () => {
    var modules = Object.keys(packageJson.dependencies);
    var moduleFiles = modules.map((module) => {
        return 'node_modules/' + module + '/**/*.*';
    });

    gulp.src(moduleFiles, { base: 'node_modules' })
        .pipe(gulp.dest(distDir + '/node_modules'));

    gulp.src("scripts/**")
        .pipe(gulp.dest(distDir + "/scripts"));

    gulp.src("cgu.html")
        .pipe(preprocess())
        .pipe(gulp.dest(distDir));

    gulp.src("index.html")
        .pipe(preprocess({context: { DEBUG: true}}))
        .pipe(gulp.dest(distDir));
});

gulp.task('distProd', ["dist"], () => {
    gulp.src("scripts/bundle.js")
        .pipe(gulp.dest(distDir + "/scripts/app"));
    //gulp.src("scripts/**/*.html")
    //    .pipe(gulp.dest(distDir + "/scripts"));

    gulp.src("node_modules/bootstrap/dist/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/bootstrap/dist/css"));
    gulp.src("node_modules/select2/dist/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/select2/dist/css"));
    gulp.src("node_modules/font-awesome/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/font-awesome/css"));  
    gulp.src("node_modules/admin-lte/dist/css/**")
        .pipe(gulp.dest(distDir + "/node_modules/admin-lte/dist/css"));
    gulp.src("node_modules/ngx-bootstrap/datepicker/bs-datepicker.css")
        .pipe(gulp.dest(distDir + "/node_modules/ngx-bootstrap/datepicker"));

    gulp.src("node_modules/bootstrap/dist/fonts/**")
        .pipe(gulp.dest(distDir + "/node_modules/bootstrap/dist/fonts"));
    gulp.src("node_modules/font-awesome/fonts/**")
        .pipe(gulp.dest(distDir + "/node_modules/font-awesome/fonts")); 

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
    gulp.src("node_modules/select2/dist/js/**")
        .pipe(gulp.dest(distDir + "/node_modules/select2/dist/js"));
    gulp.src("node_modules/admin-lte/dist/js/**")
        .pipe(gulp.dest(distDir + "/node_modules/admin-lte/dist/js"));
    gulp.src("node_modules/jquery-slimscroll/jquery.slimscroll.min.js")
        .pipe(gulp.dest(distDir + "/node_modules/jquery-slimscroll"));
    gulp.src("node_modules/date-input-polyfill/date-input-polyfill.dist.js")
        .pipe(gulp.dest(distDir + "/node_modules/date-input-polyfill"));

    gulp.src("node_modules/admin-lte/plugins/iCheck/**")
        .pipe(gulp.dest(distDir + "/node_modules/admin-lte/plugins/iCheck"));

    gulp.src("cgu.html")
        .pipe(preprocess())
        .pipe(gulp.dest(distDir));

    return gulp.src("index.html")
        .pipe(preprocess())
        .pipe(gulp.dest(distDir));
});

gulp.task('copyResources', () => {
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

    gulp.src("scripts/**/*.html")
        .pipe(gulp.dest(distDir + "/scripts"));

    gulp.src("index.html")
        .pipe(preprocess())
        .pipe(gulp.dest(distDir));
});

gulp.task('watch', () => {
  gulp.watch('scripts/**/*.ts', ['build']);
});

gulp.task('default', ['watch', 'distDebug']);

gulp.task('prod', () => {
    isDebug = false;
    gulp.start("distProd");
});