function build() {

  # htmlhint: https://github.com/yaniswang/HTMLHint/
  htmlhint.cmd
  if ($LastExitCode -ne 0)  { return }

  dir -Recurse *.js |% {
    jshint.cmd $_.FullName
    if ($LastExitCode -ne 0) { return }
  }

  dir -Recurse *.css |% {
     csslint.cmd $_.FullName
     if ($LastExitCode -ne 0) { return }
  }

  Start-Process 'cmd.exe' '/c', 'http-server.cmd'
  Start-Process 'http://localhost:8080/bar/index.html'
}

build
