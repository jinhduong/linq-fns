const del = require('del');
const gulp = require('gulp');

gulp.task('clean', function () {
    return del(['dist/**/*']);
});

gulp.task('clean-npm', function () {
    return del(['npm-release/**/*']);
});

gulp.task('rl', () => {
    gulp.src('./dist/browser-lib/*.js')
        .pipe(gulp.dest('./release'));
});

gulp.task('npmrl', () => {
    gulp.src(['dist/**/*', '!dist/browser/**/*', '!dist/browser-lib/**/*', '!dist/demo/**/*', 'package.json',
        'README.md', 'LICENSE'])
        .pipe(gulp.dest('./npm-release'));
})
