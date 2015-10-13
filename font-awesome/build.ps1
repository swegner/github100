function build() {

  # htmlhint: https://github.com/yaniswang/HTMLHint/
  htmlhint.cmd index.html
  if ($LastExitCode -ne 0)  { return }

  # BootLint: https://github.com/twbs/bootlint
  bootlint.cmd index.html
  if ($LastExitCode -ne 0)  { return }

  .\index.html
}

build
