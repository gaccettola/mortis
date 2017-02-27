
### rdserver1601 for redis
```
512 memory / 4gb disk (fixed)
rdadmin
rdadminpass
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

### redis
```
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install build-essential
sudo apt-get install tcl8.5

wget http://download.redis.io/releases/redis-3.2.8.tar.gz
tar xzf redis-3.2.8.tar.gz
cd redis-3.2.8
make
sudo make install
cd utils
sudo ./install_server.sh

```