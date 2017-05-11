
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
echo "/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab
```

### redis
```
sudo apt-get update
sudo apt-get upgrade -y

sudo apt-get install -y build-essential
sudo apt-get install -y tcl8.5

wget http://download.redis.io/releases/redis-3.2.8.tar.gz
tar xzf redis-3.2.8.tar.gz
cd redis-3.2.8
make
sudo make install
cd utils

sudo ./install_server.sh

Port           : 25079
Config file    : /etc/redis/25079.conf
Log file       : /var/log/redis_25079.log
Data dir       : /var/lib/redis/25079
Executable     : /usr/local/bin/redis-server
Cli Executable : /usr/local/bin/redis-cli

sudo sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf  

export RD_SERVER_AUTH=93bdfe5ea84a66d73f3874aa793dc77f0676d67e

sudo sed -i "s/.*requirepass.*/requirepass ${RD_SERVER_AUTH}/" /etc/redis/25079.conf 

```