function build() {

  # htmlhint: https://github.com/yaniswang/HTMLHint/
  htmlhint.cmd
  if ($LastExitCode -ne 0)  { return }

  $jsInputs = dir -Recurse *.js |% FullName |? { $_ -notmatch 'bower_components' }
  foreach ($jsFile in $jsInputs) {
    jshint.cmd $jsFile
    if ($LastExitCode -ne 0) { return }
  }

  Start-Process 'cmd.exe' '/c', 'http-server.cmd'
  Start-Process 'http://localhost:8080/index.html'
}

build
