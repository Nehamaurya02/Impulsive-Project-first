const { src, dest, series, watch } = require('gulp');

// styles
const scss = require('gulp-sass')(require('sass'));
const auto_prefix = require('gulp-autoprefixer');
const css_compress = require('gulp-clean-css');

function styles() {
  return src('./frontend/src/styles/**/*.scss')
    .pipe(scss())
    .pipe(auto_prefix('last 2 versions'))
    .pipe(css_compress())
    .pipe(dest('./frontend/dist/styles/'));
}

// scripts
const js_compress = require('gulp-terser');

function scripts() {
  return src('./frontend/src/scripts/**/*.js')
    .pipe(js_compress())
    .pipe(dest('./frontend/dist/scripts/'));
}

function watching() {
  watch(
    ['./frontend/src/styles/**/*.scss', './frontend/src/scripts/**/*.js'],
    series(styles, scripts)
  );
}

exports.default = series(styles, scripts, watching);
