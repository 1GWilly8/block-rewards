var gulp  = require('gulp')
    browserify = require('browserify'),
    exec = require('child_process').exec;
const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');

gulp.task("build", function() {
	// exec('rm dist/bundle.js')
	// exec('touch dist/bundle.js')
    exec('browserify src/fauxIndex.js -o dist/bundle.js', function (err, stdout, stderr) {
        console.log("bundle built");
      });
});

gulp.task("watch", function() {
    gulp.watch("src/**", ["build"]);
});

gulp.task('test', () => {
  console.log('It works!');
});

gulp.task('http', (done) => {
  const app = connect().use(serveStatic('./'));
  http.createServer(app).listen(9000, done);
});