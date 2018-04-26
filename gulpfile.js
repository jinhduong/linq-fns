const del = require('del');
const gulp = require('gulp');

gulp.task('clean', function () {
    return del('dist/**/*', { force: true });
});

gulp.task('rl', () => {
    gulp.src('./dist/browser-lib/*.js')
        .pipe(gulp.dest('./release'));
});
