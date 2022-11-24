:: Check if Nodejs is installed
where node > nul 2>&1
if errorlevel 1 (
  echo "Nodejs is not installed, please install it from https://nodejs.org/en/download/"
  exit /b 1
)
:: Check if YARN installed if not install it
where yarn > nul 2>&1
if errorlevel 1 (
  echo "YARN is not installed, installing it now..."
  npm install -g yarn
)

:: run the app
yarn start