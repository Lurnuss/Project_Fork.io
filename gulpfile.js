import gulp from 'gulp'
import concat from 'gulp-concat'
import clean from 'gulp-clean'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import imagemin from 'gulp-imagemin'
import uglify from 'gulp-uglify'
import jsMinify from 'gulp-js-minify'
import cleanCss from 'gulp-clean-css'
import rename from 'gulp-rename'
import gulpif from 'gulp-if'


const sass = gulpSass(dartSass)
browserSync.create()

/***** PATHS ****/

const path = {
	src: {
		scss: './src/scss/**/*.scss',
		js: './src/js/*.js',
		img: './src/images/*',
	},
	prod: {
		self: './dist/',
		css: './dist/css/',
		js: './dist/js/',
		img: './dist/images/',
	},

	handleBuild() {
		this.isProd = process.argv.includes('build')
		this.isDev = !this.isProd
	},
}

path.handleBuild()

/***** FUNCTIONS ****/

const buildScss = () =>
	gulp
		.src(path.src.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulpif(path.isProd, autoprefixer({ cascade: false })))
		.pipe(gulpif(path.isProd, cleanCss({ compatibility: 'ie8' })))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(path.prod.css))
		.pipe(browserSync.stream())
const buildJs = () =>
	gulp
		.src(path.src.js)
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(jsMinify())
		.pipe(gulp.dest(path.prod.js))
		.pipe(browserSync.stream())

const buildImgs = () =>
	gulp
		.src(path.src.img)
		.pipe(imagemin())
		.pipe(gulp.dest(path.prod.img))

const watcher = () => {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})

	gulp.watch('./index.html').on('change', browserSync.reload)
	gulp.watch(path.src.scss, buildScss).on('change', browserSync.reload)
	gulp.watch(path.src.js, buildJs).on('change', browserSync.reload)
	gulp.watch(path.src.img, buildImgs).on('change', browserSync.reload)
}

const cleanBuild = () => gulp.src(path.prod.self, { allowEmpty: true }).pipe(clean())

/***** TASK ****/

const build = gulp.series(buildScss, buildJs)

gulp.task('build', gulp.series(cleanBuild, gulp.parallel(buildImgs, build)))
gulp.task('dev', gulp.series( build, watcher))


