/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
	var path = {
		'npm' : 'node_modules'	
	};
	
    // map tells the System loader where to look for things
    var map = {
        'app':                        'scripts/app',
        
        // angular bundles
        '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
        '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/src/browser': 'node_modules/@angular/platform-browser/src/browser',
        '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
        '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
        '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
        
        // other libraries
        'rxjs':                      'node_modules/rxjs',
        'lodash':                    'node_modules/lodash/lodash.min.js',
        'moment':                    'node_modules/moment/min/moment-with-locales.min.js',
        //'jquery':                    'node_modules/jquery/dist/jquery.min.js',
        //'jquery-slimscroll':         'node_modules/jquery-slimscroll/jquery.slimscroll.min.js',
        'select2':                   'node_modules/select2/dist/js/select2.js',
        'datatable':                 'scripts/app/datatable',
        'ngx-order-pipe':            'node_modules/ngx-order-pipe/dist/bundles/ngx-order-pipe.umd.js',
        'ngx-bootstrap':             'node_modules/ngx-bootstrap',
        'ng2-dnd':                   'node_modules/ng2-dnd/bundles/index.umd.js'
    };
    
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js',
                                        meta: {
                                            './*.js': {
                                               loader: 'scripts/systemjs-angular-loader.js'
                                            }
                                        }
                                      },
        'rxjs':                       { defaultExtension: 'js' },
        'datatable':                  { main: 'index.js', defaultExtension: 'js' },
        'ngx-bootstrap':              { format: 'cjs', main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js' }
    };
    
//    var ngPackageNames = [
//        'common',
//        'compiler',
//        'core',
//        'forms',
//        'http',
//        'platform-browser',
//        'platform-browser-dynamic',
//        'router',
//        'router-deprecated',
//        'upgrade',
//    ];
//    // Individual files (~300 requests):
//    function packIndex(pkgName) {
//        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
//    }
//    // Bundled (~40 requests):
//    function packUmd(pkgName) {
//        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
//    }
//    // Most environments should use UMD; some (Karma) need the individual index files
//    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
//    // Add package entries for angular packages
//    ngPackageNames.forEach(setPackageConfig);
    
    var config = {
    	path: path,
        map: map,
        packages: packages
    };
    System.config(config);
})(this);