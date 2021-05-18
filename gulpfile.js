const gulp = require("gulp");
const del = require("del");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const sync = require("browser-sync").create();

const clean = () => {
  return del("build");
};

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
};

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write())
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([csso()]))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

const scripts = () => {
  return gulp
    .src("source/js/*.js")
    .pipe(terser())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
};

const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

const copy = (done) => {
  gulp
    .src(
      [
        "source/fonts/*.{woff2,woff}",
        "source/*.webmanifest",
        "source/img/**/*.{jpg,png,svg}",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
  done();
};

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 75 }))
    .pipe(gulp.dest("build/img"));
};

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const reload = (done) => {
  sync.reload();
  done();
};

const watcher = () => {
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/**/*.js", gulp.series(scripts));
};

const build = gulp.series(
  clean,
  sprite,
  copy,
  images,
  createWebp,
  gulp.parallel(html, styles, scripts)
);

exports.build = build;

exports.default = gulp.series(
  clean,
  sprite,
  copy,
  createWebp,
  gulp.parallel(html, styles, scripts),
  server,
  watcher
);
