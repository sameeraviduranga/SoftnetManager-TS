$ErrorActionPreference = "Stop"

$Source = Join-Path $env:GITHUB_WORKSPACE "dist"
$Destination = "C:\inetpub\SoftnetManager\Frontend"
$AppPool = "SoftnetManager.Frontend"

Write-Host "Source      : $Source"
Write-Host "Destination : $Destination"
Write-Host "App Pool    : $AppPool"

if (-not (Test-Path $Source)) {
    throw "dist folder does not exist: $Source"
}

if (-not (Test-Path $Destination)) {
    throw "IIS frontend folder does not exist: $Destination"
}

Import-Module WebAdministration

# Confirm that the application pool exists.
if (-not (Test-Path "IIS:\AppPools\$AppPool")) {
    throw "IIS Application Pool '$AppPool' does not exist."
}

try {
    Write-Host "Checking IIS Application Pool state..."

    $State = (Get-WebAppPoolState -Name $AppPool).Value

    if ($State -ne "Stopped") {
        Write-Host "Stopping IIS Application Pool..."

        Stop-WebAppPool -Name $AppPool -ErrorAction Stop
    }
    else {
        Write-Host "Application Pool is already stopped."
    }

    # Wait until the pool is fully stopped.
    $Timeout = 30
    $Elapsed = 0

    do {
        Start-Sleep -Seconds 1
        $Elapsed++

        $State = (Get-WebAppPoolState -Name $AppPool).Value

        if ($State -eq "Stopped") {
            break
        }
    } while ($Elapsed -lt $Timeout)

    if ($State -ne "Stopped") {
        throw "Application Pool failed to stop within $Timeout seconds. Current state: $State"
    }

    Write-Host "Application Pool stopped successfully."

    Write-Host "Cleaning old frontend files..."

    Get-ChildItem -Path $Destination -Force |
    Where-Object { $_.Name -ne "web.config" } |
    Remove-Item -Recurse -Force

    Write-Host "Copying new frontend files..."

    Copy-Item `
        -Path "$Source\*" `
        -Destination $Destination `
        -Recurse `
        -Force

    Write-Host "Frontend files copied successfully."
}
finally {
    Write-Host "Checking whether IIS Application Pool needs to start..."

    $State = (Get-WebAppPoolState -Name $AppPool).Value

    if ($State -ne "Started") {
        if ($State -eq "Stopped") {
            Write-Host "Starting IIS Application Pool..."

            Start-WebAppPool -Name $AppPool -ErrorAction Stop
        }

        # Wait until the pool is fully started.
        $Timeout = 30
        $Elapsed = 0

        do {
            Start-Sleep -Seconds 1
            $Elapsed++

            $State = (Get-WebAppPoolState -Name $AppPool).Value

            if ($State -eq "Started") {
                break
            }
        } while ($Elapsed -lt $Timeout)

        if ($State -ne "Started") {
            throw "Application Pool failed to start within $Timeout seconds. Current state: $State"
        }
    }

    Write-Host "Application Pool is started."
}

Write-Host "Frontend deployment completed successfully."

