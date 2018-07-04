sed -i 's:@string/FB_KEY:${FB_KEY}:g' android/app/src/main/res/values/strings.xml
sed -i 's:@string/GOOGLE_MAPS_KEY:${GOOGLE_MAPS_KEY}:g' android/app/src/main/res/values/strings.xml
sed -i 's:Config.GOOGLE_WEB_CLIENT_ID:"${GOOGLE_WEB_CLIENT_ID}":g' src/components/login/homeLogin.js
sed -i 's:Config.GOOGLE_MAPS_KEY:"${GOOGLE_MAPS_KEY}":g' src/components/map/mapScreen.js
sed -i 's:Config.GOOGLE_MAPS_KEY:"${GOOGLE_MAPS_KEY}":g' src/actions/emergencyPlacesAction.js

envsub android/app/src/main/res/values/strings.xml --system
envsub src/components/login/homeLogin.js --system
envsub src/components/map/mapScreen.js --system
envsub src/actions/emergencyPlacesAction.js --system

envsub android/app/google-services.json.template android/app/google-services.json --system
echo 'Your keys have been added to the project.'
