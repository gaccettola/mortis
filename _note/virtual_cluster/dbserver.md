
### dbserver1601 for percona server 5.7
```
512 memory / 4gb disk (fixed)
dbadmin
dbadminpass
bridged network
```

### openssh-server
```
sudo apt-get install openssh-server
```

### swap
```
sudo swapon -s
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### percona 5.7
```
sudo apt-get update
sudo apt-get upgrade

wget https://repo.percona.com/apt/percona-release_0.1-4.$(lsb_release -sc)_all.deb
sudo dpkg -i percona-release_0.1-4.$(lsb_release -sc)_all.deb
sudo apt-get update
sudo apt-get install percona-server-server-5.7
```