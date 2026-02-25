@echo off
echo ============================================
echo Starting URL Shortener Website...
echo ============================================

echo.
echo Starting Backend Server on port 5000...
start "Server" cmd /k "cd /d d:\Web_dev\url-shortener\server && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend on port 3000...
start "Client" cmd /k "cd /d d:\Web_dev\url-shortener\client && npm start"

echo.
echo ============================================
echo Website is starting...
echo - Backend Server: http://localhost:5000
echo - Frontend:       http://localhost:3000
echo ============================================
echo.
echo Press any key to close this window (servers will keep running)...
pause > nul
