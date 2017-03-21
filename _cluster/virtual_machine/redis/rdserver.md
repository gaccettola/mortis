
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

sudo apt-get install -y build-essential
sudo apt-get install -y tcl8.5

wget http://download.redis.io/releases/redis-3.2.8.tar.gz
tar xzf redis-3.2.8.tar.gz
cd redis-3.2.8
make
sudo make install
cd utils

# sudo ./install_server.sh

sudo cp -f src/redis-sentinel /usr/local/bin
sudo mkdir -p /etc/redis     
sudo cp -f *.conf /etc/redis
rm -rf /tmp/redis-stable*  

sudo sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf  
sudo sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf  
sudo sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf
sudo sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf

export RD_SERVER_AUTH=93bdfe5ea84a66d73f3874aa793dc77f0676d67e

sudo sed -i "s/.*requirepass.*/requirepass ${RD_SERVER_AUTH}/" /etc/redis/redis.conf  

```