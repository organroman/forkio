import gulp from 'gulp'
import concat from 'gulp-concat'
import clean from 'gulp-clean'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import imagemin from 'gulp-imagemin'
import uglify from 'gulp-uglify'
import minifyjs from 'gulp-js-minify'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'

// gulp +
// gulp-sass +
// browser-sync +
// gulp-js-minify +
// gulp-uglify +
// gulp-clean-css +
// gulp-clean +
// gulp-concat +
// gulp-imagemin +
// gulp-autoprefixer +

// Рабочее задание build должно включать следующие подзадания:
//
// + очистка папки dist;
// компиляция scss файлов в css;
// добавление вендорных префиксов к CSS свойствам для поддержки последних нескольких версий каждого из браузеров;
// удаление неиспользуемого css-кода;
// конкатенация всех css файлов в один styles.min.css и его минификация;
// конкатенация всех js файлов в один scripts.min.js и его минификация;
// копирование минифицированных итоговых styles.min.css и scripts.min.js файлов в папку dist;
// оптимизация картинок и копирование их в папку dist/img;
//
//
// Рабочее задание dev должно включать следующие подзадания:
//
//     Запуск сервера и последующее отслеживание изменений *.js и *.scss файлов в папке src;
// При изменении - пересборка и копирование объединенных и минифицированных файлов styles.min.css и scripts.min.js в папку dist, перезагрузка вашей html-страницы.

const sass = gulpSass(dartSass)
browserSync.create()

/***** PATHS ****/

const path = {
    src: {
        scss: './src/scss/**/*.scss',
        js: './src/js/*.js',
        img: './src/images/*',
    },
    dist: {
        self: './dist/',
        css: './dist/css/',
        js: './dist/js/',
        img: './dist/images',
    }
}

/***** FUNCTIONS ****/

const buildScss = () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest(path.dist.css))
        // .pipe(browserSync.stream())
)

const devScss = async () => {
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.stream())
}

const buildJs = () => (
    gulp.src(path.src.js)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(minifyjs())
        .pipe(rename("scripts.min.js"))
        .pipe(gulp.dest(path.dist.js))
        // .pipe(browserSync.stream())
)

const devJs = async () => {
    gulp.src(path.src.js)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(minifyjs())
        .pipe(rename("scripts.min.js"))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.stream())
}

const buildImages = () => (
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.img))
)

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./index.html').on("change", browserSync.reload);
    // gulp.watch(path.src.scss, buildScss).on('change', browserSync.reload)
    gulp.watch(path.src.scss, devScss).on('change', browserSync.reload)
    // gulp.watch(path.src.js, buildJs).on("change", browserSync.reload);
    gulp.watch(path.src.js, devJs).on("change", browserSync.reload);
    gulp.watch(path.src.img, buildImages).on("change", browserSync.reload);

}

const cleanBuild = () => gulp.src(path.dist.self, { allowEmpty: true }).pipe(clean())


/***** TASK ****/

const build = gulp.series(buildScss, buildJs)
//
// gulp.task('dev', gulp.series(cleanBuild, gulp.parallel(buildImages, build), watcher))
gulp.task('dev', gulp.series(devScss, devJs, watcher))
gulp.task('build', gulp.series(cleanBuild, gulp.parallel(buildImages, build), watcher))

// gulp.series
// gulp.parallel

