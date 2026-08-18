$port = 8080
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" } | Select-Object -First 1).IPAddress
if (-not $ip) { $ip = "192.168.0.111" }

$listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, $port)
$listener.Start()
Write-Host "MOBILE_SERVER_LIVE: http://${ip}:${port}/"

$docRoot = "C:\Users\H&S TECH\.gemini\antigravity\scratch\task-manager-app"

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $stream = $client.GetStream()
            $buffer = New-Object byte[] 8192
            $read = $stream.Read($buffer, 0, $buffer.Length)
            
            if ($read -gt 0) {
                $requestStr = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $read)
                $firstLine = $requestStr.Split("`n")[0]
                $parts = $firstLine.Split(' ')
                if ($parts.Length -ge 2) {
                    $path = $parts[1].Split('?')[0]
                    if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) { $path = "/index.html" }
                    
                    $file = Join-Path $docRoot $path.TrimStart('/').Replace('/', '\')
                    
                    if (Test-Path $file -PathType Leaf) {
                        $content = [System.IO.File]::ReadAllBytes($file)
                        $contentType = "text/html; charset=utf-8"
                        if ($file.EndsWith(".css")) { $contentType = "text/css" }
                        elseif ($file.EndsWith(".js")) { $contentType = "application/javascript" }
                        
                        $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($content.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                        
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($content, 0, $content.Length)
                    } else {
                        $notFound = "HTTP/1.1 404 Not Found`r`nContent-Length: 0`r`nConnection: close`r`n`r`n"
                        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                    }
                }
            }
        } catch {} finally {
            $client.Close()
        }
    }
} finally {
    $listener.Stop()
}
