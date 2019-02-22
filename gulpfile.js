var gulp = require("gulp");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var bulkSass = require("gulp-sass-bulk-import");

var paths = {
  sass: ["./src/**/*.scss"]
};

gulp.task("default", ["build"]);

gulp.task("build", function(done) {
  gulp
    .src("./src/css-quarks.scss")
    .pipe(bulkSass())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("./dist"))
    .pipe(
      minifyCss({
        keepSpecialComments: 0
      })
    )
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(gulp.dest("./dist"))
    .on("end", done);
});

gulp.task("watch", function() {
  gulp.watch(paths.sass, ["build", "gen-docs"]);
});

gulp.task("gen-docs", function() {
  gulp
    .src("./src/css-quarks.scss")
    .pipe(bulkSass())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      minifyCss({
        keepSpecialComments: 0
      })
    )
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(gulp.dest("./docs"));
});
