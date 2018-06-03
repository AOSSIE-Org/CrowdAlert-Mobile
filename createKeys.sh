# envsub --env-file keys.env src/components/login.js
# envsub --env-file keys.env android/app/src/main/res/values/strings.xml
envsub --env-file .env android/app/google-services.json.template android/app/google-services.json
echo 'Your keys have been added.'
