

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


### webstorm ( optional )
```
cd ~/Downloads

tar -xvzf WebStorm-2016.3.3.tar.gz

sudo mv WebStorm /opt/WebStorm

cd /opt/WebStorm/bin

sh webstorm.sh 

```


### datagrip ( optional )
```
cd ~/Downloads

tar -xvzf datagrip-2016.3.4.tar.gz

sudo mv DataGrip-2016.3.4 /opt/DataGrip

cd /opt/DataGrip/bin

sh datagrip.sh

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

npm install -g cordova
npm install -g gulp
npm install -g mocha
npm install -g grunt
npm install -g grunt-cli
npm install -g ionic
npm install -g appium         
npm install -g wd
npm install -g appium-doctor
npm install -g electron
npm install -g electron-rebuild

npm install -g jscs
npm install -g node-sass
npm install -g bower
npm install -g nativescript
npm install -g typings

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

### list the android sdk available, pull API 21 ( ~ 65% of the android market ) ( recommended )
```
android list sdk --all

#  37- SDK Platform Android 5.0.1, API 21, revision 2
#  92- ARM EABI v7a System Image, Android API 21, revision 4
#  93- Intel x86 Atom_64 System Image, Android API 21, revision 4
#  94- Intel x86 Atom System Image, Android API 21, revision 4
#  95- Google APIs ARM EABI v7a System Image, Android API 21, revision 19
#  96- Google APIs Intel x86 Atom_64 System Image, Android API 21, revision 19
#  97- Google APIs Intel x86 Atom System Image, Android API 21, revision 19
# 129- Google APIs, Android API 21, revision 1
# 154- Sources for Android SDK, API 21, revision 1

android update sdk -u -a -t 37,92,93,94,95,96,97,129,154

```



### verify install and create avd

```
appium-doctor --android

android sdk

android avd

adb devices

adb kill-server && adb devices

```


### kubectl
```
curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/v1.5.2/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

```


### minikube
```
# curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.16.0/minikube-linux-amd64
# curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.17.1/minikube-linux-amd64
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.18.0/minikube-linux-amd64

chmod +x minikube
sudo mv minikube /usr/local/bin/

```


### docker-machine
```
curl -L https://github.com/docker/machine/releases/download/v0.10.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
    chmod +x /tmp/docker-machine &&
    sudo cp /tmp/docker-machine /usr/local/bin/docker-machine

```


### minikube kvm driver
```
sudo apt-get update
sudo apt-get install qemu-kvm libvirt-bin virt-manager

# sudo curl -L https://github.com/dhiltgen/docker-machine-kvm/releases/download/v0.7.0/docker-machine-driver-kvm -o /usr/local/bin/docker-machine-driver-kvm
sudo curl -L https://github.com/dhiltgen/docker-machine-kvm/releases/download/v0.8.2/docker-machine-driver-kvm -o /usr/local/bin/docker-machine-driver-kvm

sudo chmod +x /usr/local/bin/docker-machine-driver-kvm

sudo usermod -a -G libvirtd $(whoami)

newgrp libvirtd

minikube config set vm-driver kvm
minikube start

minikube docker-env
eval $(minikube docker-env)

minikube dashboard

```


### gcloud
```
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init

```