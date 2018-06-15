cd android/app/src/main/res/values
sed -i 's:@string/FB_KEY:${FB_KEY}:g' strings.xml
sed -i 's:@string/GOOGLE_MAPS_KEY:${GOOGLE_MAPS_KEY}:g' strings.xml
cd ../../../../../../src/components
sed -i 's:Config.GOOGLE_WEB_CLIENT_ID:"${GOOGLE_WEB_CLIENT_ID}":g' homeLogin.js
cd ../../

envsub android/app/src/main/res/values/strings.xml --system
envsub src/components/homeLogin.js --system
envsub android/app/google-services.json.template android/app/google-services.json --system
echo 'Your keys have been added to the project.'
