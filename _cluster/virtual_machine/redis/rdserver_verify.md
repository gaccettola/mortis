
### redis setup notes
```
redis password : echo -n rdserver16001 | sha1sum | awk '{print $1}'
                 93bdfe5ea84a66d73f3874aa793dc77f0676d67e

sudo nano /etc/redis/25079.conf

    bind 127.0.0.1 10.132.56.174
    requirepass 93bdfe5ea84a66d73f3874aa793dc77f0676d67e
    
sudo nano /etc/init.d/redis_25079
    
    CLIEXEC="/usr/local/bin/redis-cli -a 93bdfe5ea84a66d73f3874aa793dc77f0676d67e"
    
sudo service redis_25079 restart
    
    
redis-cli -h 127.0.0.1 -p 25079 -a 93bdfe5ea84a66d73f3874aa793dc77f0676d67e

```


### redisdesktop ( build from source )

#### get source
```
git clone --recursive https://github.com/uglide/RedisDesktopManager.git -b 0.8.0 rdm && cd ./rdm
```

#### build on linux ( ubuntu )
```
cd src/
./configure
source /opt/qt56/bin/qt56-env.sh && qmake && make && sudo make install
cd /usr/share/redis-desktop-manager/bin
sudo mv qt.conf qt.backup
```

#### run
```
/usr/share/redis-desktop-manager/bin/rdm
```
