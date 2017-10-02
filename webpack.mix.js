'use strict'

let { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .setPublicPath('public')

  .js('node_modules/coreui.io/Static_Starter_GULP/js/app.js', 'public/js')

  .scripts([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/pace-js/pace.min.js'
  ], 'public/js/vendor.js')

  .sass('resources/assets/sass/app.scss', 'public/css')
