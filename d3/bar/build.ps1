function build() {

  # htmlhint: https://github.com/yaniswang/HTMLHint/
  htmlhint.cmd index.html
  if ($LastExitCode -ne 0)  { return }

  jshint.cmd app.js
  if ($LastExitCode -ne 0) { return }

  .\index.html
}

build
