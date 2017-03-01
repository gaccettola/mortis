

### java sdk
```
cd ~/_Main/_Setup

sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
sudo apt install oracle-java8-set-default

# export JAVA_HOME=/usr/lib/jvm/java-8-oracle
# export PATH="$PATH:$JAVA_HOME/bin"
# source ~/.bashrc

java -version

```


### apache ant
```
cd ~/_Main/_Setup

wget http://www-eu.apache.org/dist//ant/binaries/apache-ant-1.10.1-bin.tar.gz

tar -xvzf apache-ant-1.10.1-bin.tar.gz

rm apache-ant-1.10.1-bin.tar.gz

# export ANT_HOME="$HOME/_Main/_Setup/apache-ant-1.10.1"
# export PATH="$PATH:$ANT_HOME/bin" # Add ant to PATH
# source ~/.bashrc

cd $ANT_HOME

ant -f fetch.xml -Ddest=system

```


### apache maven
```
cd ~/_Main/_Setup

wget http://www.us.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
tar -xvzf apache-maven-3.3.9-bin.tar.gz

rm apache-maven-3.3.9-bin.tar.gz

# export MAVEN_HOME="$HOME/_Main/_Setup/apache-maven-3.3.9"
# export PATH="$PATH:$MAVEN_HOME/bin"
# source ~/.bashrc

```


### rvm
```
cd ~/_Main/_Setup

gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3

\curl -sSL https://get.rvm.io | bash -s stable --ruby

gem update --system
gem install --no-rdoc --no-ri bundler
gem update
gem cleanup

```


### android studio
```
cd ~/Downloads
sudo unzip android-studio-ide-145.3537739-linux.zip -d /opt

cd /opt/android-studio/bin
sh studio.sh 
```


### webstorm
```
cd ~/Downloads

tar -xvzf WebStorm-2016.3.3.tar.gz

sudo mv WebStorm /opt/WebStorm

cd /opt/WebStorm/bin

sh webstorm.sh 
```


### node.js
```
cd ~/_Main/_Setup

mkdir -p ~/.npm-packages

export NPM_PACKAGES="${HOME}/.npm-packages"
export NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
export PATH="$PATH:$NPM_PACKAGES/bin"

unset MANPATH
export MANPATH="$NPM_PACKAGES/share/man:$(MANPATH)"

echo prefix=$NPM_PACKAGES >> ~/.npmrc

wget https://nodejs.org/dist/v6.10.0/node-v6.10.0-linux-x64.tar.gz
tar -C $NPM_PACKAGES --strip-components 1 -xzf node-v6.10.0-linux-x64.tar.gz

rm node-v6.10.0-linux-x64.tar.gz

node --version
npm --version
```


### grunt grunt-cli gulp mocha cordova ionic
```
cd ~/_Main/_Setup

npm install -g grunt grunt-cli

npm install -g gulp mocha cordova ionic

npm install -g electron electron-rebuild

npm install -g appium wd appium-doctor

appium-doctor --android

```


### appium 
```
cd ~/_Main/_Setup

wget https://github.com/appium/appium/archive/v1.4.16.tar.gz
tar -xvzf v1.4.16.tar.gz
rm v1.4.16.tar.gz
mv appium-1.4.16 appium

cd appium
./reset.sh —android  --verbose
```

### 
```
android list sdk --all

# 39- SDK Platform Android 4.4.2, API 19, revision 4
# 97- ARM EABI v7a System Image, Android API 19, revision 5
# 98- Intel x86 Atom System Image, Android API 19, revision 5
# 99- Google APIs ARM EABI v7a System Image, Android API 19, revision 27
# 100- Google APIs Intel x86 Atom System Image, Android API 19, revision 27
# 155- Sources for Android SDK, API 19, revision 2


android update sdk -u -a -t 39
android update sdk -u -a -t 97
android update sdk -u -a -t 98
android update sdk -u -a -t 99
android update sdk -u -a -t 100
android update sdk -u -a -t 155
```

### verify install and create avd
```
npm install -g appium wd appium-doctor

appium-doctor --android

android sdk

android avd

adb devices

adb kill-server && adb devices

```