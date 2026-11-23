# Renders cv/resume.html and cv/cv.html to PDFs in assets/ using Microsoft Edge (headless).
# Run from anywhere:  powershell -File cv\build.ps1
$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$assets = Join-Path (Split-Path -Parent $here) "assets"
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe" }

$jobs = @{ "resume.html" = "Talha_Yaseer_Abeer_Resume.pdf"; "cv.html" = "Talha_Yaseer_Abeer_CV.pdf" }
foreach ($src in $jobs.Keys) {
  $in = "file:///" + ((Join-Path $here $src) -replace '\\', '/')
  $out = Join-Path $assets $jobs[$src]
  & $edge --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 "--print-to-pdf=$out" $in | Out-Null
  Write-Output "Built $out"
}
