var gulp = require('gulp'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
webserver = require('gulp-webserver');

uglify = require('gulp-uglify');
// 样式处理任务
gulp.task('styles', function() {  
    return gulp.src('css/*.css')    //引入所有CSS
      .pipe(rename({ suffix: '.min' }))   //重命名
      .pipe(minifycss())                  //CSS压缩
      .pipe(gulp.dest('dist/css'))      //压缩版输出
  });
  // JS处理任务
gulp.task('scripts', function() {  
    return gulp.src('js/*.js')      //引入所有需处理的JS
      .pipe(rename({ suffix: '.min' }))         //重命名
      .pipe(uglify())                           //压缩JS
      .pipe(gulp.dest('dist/js'))        //压缩版输出
  });
  gulp.task('serve',['styles','scripts'], function(){
    
    gulp.src('./').pipe(webserver({
      livereload:true,
      open:true,
      directoryListing:true
    }));
  });