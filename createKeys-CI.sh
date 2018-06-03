cd android/app/src/main/res/values
sed -i 's:@string/FB_KEY:${FB_KEY}:g' strings.xml
cd ../../../../../../src/components
sed -i 's:Config.GOOGLE_WEBID_KEY:"${GOOGLE_WEBID_KEY}":g' login.js
cd ../../

envsub android/app/src/main/res/values/strings.xml --system
envsub src/components/login.js --system
envsub android/app/google-services.json.template android/app/google-services.json --system
echo 'Your keys have been added to the project.'
