const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoPrefixer = require("gulp-autoprefixer");
require("es6-promise").polyfill();
const cssComb = require("gulp-csscomb");
const cmq = require("gulp-merge-media-queries");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;

const imagemin = require("gulp-imagemin");

gulp.task("scss", function () {
  return gulp
    .src(["src/scss/**/*.scss"])
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(cmq({ log: true }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCss())
    .pipe(gulp.dest("public/css"));
});

gulp.task("image", function () {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/images"));
});


gulp.task("js", function () {
  return gulp
    .src(["src/js/**/*.js"])
    .pipe(
      plumber({
        handleError: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("public/js"));
});

gulp.task("serve", function () {
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("src/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("src/images/*", gulp.series("image"));
});
