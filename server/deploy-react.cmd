
@echo off
echo Running npm run build...
npm run build

echo Removing old server/build...
rmdir /s /q server/build

echo Copying new build to server/build...
xcopy /E /I /Y build server/build

echo Build copied successfuly to server/build!
pause