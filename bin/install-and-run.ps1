$repoUrl = "https://github.com/tesseral-labs/tesseral-example.git"
$cloneDir = "tesseral-example"
$publishableKey = $env:TESSERAL_PUBLISHABLE_KEY

if (-not $publishableKey) {
  Write-Host "Error: TESSERAL_PUBLISHABLE_KEY is not set."
  exit 1
}

Write-Host "Cloning example repo..."
git clone $repoUrl $cloneDir
Set-Location $cloneDir

Write-Host "Setting up .env file..."
@"
TESSERAL_PUBLISHABLE_KEY=$publishableKey
"@ | Out-File -Encoding ascii .env

Write-Host "Installing dependencies..."
npm install

Write-Host "Starting development server..."
npm run dev
