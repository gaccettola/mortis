
### redis setup notes
```
redis password : echo -n rdserver16001 | sha1sum | awk '{print $1}'
                 93bdfe5ea84a66d73f3874aa793dc77f0676d67e

sudo nano /etc/redis/6379.conf

    bind 127.0.0.1 10.132.56.174
    requirepass 93bdfe5ea84a66d73f3874aa793dc77f0676d67e
    
sudo nano /etc/init.d/redis_6379
    
    CLIEXEC="/usr/local/bin/redis-cli -a 93bdfe5ea84a66d73f3874aa793dc77f0676d67e"
    
sudo service redis_6379 restart
    
    
redis-cli -h 127.0.0.1 -p 6379 -a 93bdfe5ea84a66d73f3874aa793dc77f0676d67e

```
