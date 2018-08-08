## Set up guide for android
**1. Install JDK 6 or later**

First, install Oracle JDK 8

```
sudo add-apt-repository ppa:webupd8team/java
```
Follow the steps provided in this [link](https://www.wikihow.com/Install-Oracle-Java-on-Ubuntu-Linux) below to set it up.

To make sure, it’s installed successfully, open a terminal and type

```
javac -version
```

Set the JAVA_HOME environment variable to the location of your JDK installation using this [link.](http://www.wikihow.com/Set-Up-Your-Java_Home-Path-in-Ubuntu)


**2. Download and install Android Studio**

[Download the Android Studio package for Linux](https://developer.android.com/sdk/index.html)  and extract it somewhere (e.g home directory).

To launch Android Studio, open a terminal, navigate to the  `android-studio/bin/`  directory, and execute  `studio.sh`.

```
cd android-studio/bin
```

Select whether you want to import previous Android Studio settings or not, then click  **OK**.

Set the  `**ANDROID_HOME**`  environment variable to the location of your Android SDK installation

```
sudo gedit ~/.bashrc
```

```
export ANDROID_HOME=/home/user_directory/Android/Sdk
```



