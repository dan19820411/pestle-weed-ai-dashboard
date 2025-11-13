# NEP AI Dashboard - Automated Deployment Script
# Save as: deploy.ps1
# Run with: .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEP AI Dashboard - Auto Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git not found!" -ForegroundColor Red
    Write-Host "Install Git from: https://git-scm.com" -ForegroundColor Yellow
    pause
    exit
}

# Check if vercel CLI is installed
Write-Host "Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version
    Write-Host "✓ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install Vercel CLI!" -ForegroundColor Red
        pause
        exit
    }
    Write-Host "✓ Vercel CLI installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 1: Initialize Git Repository" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (Test-Path ".git") {
    Write-Host "Git repository already initialized" -ForegroundColor Yellow
} else {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

# Create .gitignore if doesn't exist
if (-Not (Test-Path ".gitignore")) {
    @"
node_modules
.next
.vercel
.env*.local
*.log
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
    Write-Host "✓ .gitignore created" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 2: Commit Changes" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

git add .
git commit -m "NEP AI Dashboard - Ready for deployment"
Write-Host "✓ Changes committed" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 3: Deploy to Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You will be prompted to:" -ForegroundColor Yellow
Write-Host "1. Login to Vercel (if not already)" -ForegroundColor Yellow
Write-Host "2. Select/create a project" -ForegroundColor Yellow
Write-Host "3. Confirm deployment settings" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to start deployment..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Deploy to Vercel
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your NEP AI Dashboard is now live!" -ForegroundColor Green
    Write-Host "Check the Vercel output above for your deployment URL" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Typical URL format: https://nep-ai-dashboard.vercel.app" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "✗ Deployment failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above" -ForegroundColor Yellow
}

pause
