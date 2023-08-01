// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

// style.scssの監視タスクを作成する
gulp.task("default", () => {
  // ★ style.scssファイルを監視
  return gulp.watch("css/style.scss", () => {
    // style.scssの更新があった場合の処理

    // style.scssファイルを取得
    return (
      gulp
        .src("css/style.scss")
        // Sassのコンパイルを実行
        .pipe(
          sass({
            outputStyle: "expanded",
          })
          // Sassのコンパイルエラーを表示
          // (これがないと自動的に止まってしまう)
          .on("error", sass.logError)
        )
        // cssフォルダー以下に保存
        .pipe(gulp.dest("css"))
    );
  });
});
// browser-syncのプラグインの読み込み
const browserSync = require("browser-sync");

// タスクの設定
gulp.task("browserSyncTask", function () {
  browserSync({
    server: {
      baseDir: "./", // ルートとなるディレクトリを指定
    },
  });

  // ./フォルダ以下のファイルを監視
  gulp.watch("./**",function () {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
  });
});
// 監視ファイル
gulp.task('watch-files', (done) =>  {
    gulp.watch("./*.html", gulp.task('browser-reload'));
    gulp.watch("./css/*.css", gulp.task('browser-reload'));
    gulp.watch("./css/*.scss", gulp.task('sass'));
    gulp.watch("./js/*.js", gulp.task('browser-reload'));
    done();
});