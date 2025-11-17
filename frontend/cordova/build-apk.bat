@echo off
echo Usando Java 17 para Cordova...
set JAVA_HOME=C:\java17\jdk-17.0.17+10
set PATH=%JAVA_HOME%\bin;%PATH%
java -version
cordova build android --debug
echo APK generado en platforms/android/app/build/outputs/apk/debug/
pause