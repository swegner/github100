function build() {

  # htmlhint: https://github.com/yaniswang/HTMLHint/
  htmlhint.cmd index.html
  if ($LastExitCode -ne 0)  { return }

  jshint.cmd app.js
  if ($LastExitCode -ne 0) { return }

  csslint.cmd style.css
  if ($LastExitCode -ne 0) { return }

  Start-Process 'cmd.exe' '/c', 'http-server.cmd'
  Start-Process 'http://localhost:8080'
}

build
