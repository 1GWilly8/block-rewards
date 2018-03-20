var gulp  = require('gulp')
    browserify = require('browserify'),
    exec = require('child_process').exec;
const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');

gulp.task("build", function() {
	// exec('rm dist/bundle.js')
	// exec('touch dist/bundle.js')
    exec('browserify src/index.js -o dist/bundle.js', function (err, stdout, stderr) {
      if (err) {
          console.log(err)
        } else {
          console.log("bundle built");
        }
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


// geth --cache='1024' --testnet --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
// geth --rpc --rpccorsdomain "*" --light --testnet
// parity --chain=ropsten --light --rpccorsdomain "*" -lrpc=trace

