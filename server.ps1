$http = New-Object System.Net.HttpListener
$http.Prefixes.Add("http://192.168.0.111:3000/")
$http.Prefixes.Add("http://localhost:3000/")
$http.Start()
Write-Host "Server running! Access on phone at http://192.168.0.111:3000/"

try {
    while ($http.IsListening) {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) { $path = "/index.html" }
        
        $localPath = Join-Path "C:\Users\H&S TECH\.gemini\antigravity\scratch\task-manager-app" $path.TrimStart('/')
        
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($localPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($localPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $http.Stop()
}
