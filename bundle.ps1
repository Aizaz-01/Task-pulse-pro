$htmlPath = "C:\Users\H&S TECH\.gemini\antigravity\scratch\task-manager-app\index.html"
$cssPath  = "C:\Users\H&S TECH\.gemini\antigravity\scratch\task-manager-app\styles.css"
$jsPath   = "C:\Users\H&S TECH\.gemini\antigravity\scratch\task-manager-app\app.js"

$html = Get-Content $htmlPath -Raw
$css  = Get-Content $cssPath -Raw
$js   = Get-Content $jsPath -Raw

$styleTag  = "<style>`n" + $css + "`n</style>"
$scriptTag = "<script>`n" + $js + "`n</script>"

$html = $html -replace '<link rel="stylesheet" href="styles.css">', [regex]::Escape($styleTag)
$html = $html -replace '<script src="app.js"></script>', [regex]::Escape($scriptTag)

// Remove regex escape artifacts if any
$html = $html.Replace('\<style\>', '<style>').Replace('\</style\>', '</style>').Replace('\<script\>', '<script>').Replace('\</script\>', '</script>')

$standalonePath = "C:\Users\H&S TECH\.gemini\antigravity\scratch\task-manager-app\TaskPulse-Standalone.html"
Set-Content -Path $standalonePath -Value $html -Encoding UTF8
Set-Content -Path $htmlPath -Value $html -Encoding UTF8

Write-Host "BUNDLED_SUCCESS"
