
### percona setup notes

```
cd /etc/mysql/percona-server.conf.d
sudo nano mysqld.cnf

    bind-address 0.0.0.0
```  
 
 
```
mysql -u root -p

DROP USER 'node_process'@'192.168.1.78';
DROP USER 'node_process'@'xavier';

CREATE USER 'node_process'@'192.168.1.78' IDENTIFIED BY '123456';
CREATE USER 'node_process'@'xavier' IDENTIFIED BY '123456';

GRANT SUPER ON *.* TO 'node_process'@'192.168.1.78' IDENTIFIED BY '123456';
GRANT SUPER ON *.* TO 'node_process'@'xavier' IDENTIFIED BY '123456';

GRANT ALL PRIVILEGES ON *.* TO 'node_process'@'192.168.1.78';
GRANT ALL PRIVILEGES ON *.* TO 'node_process'@'xavier';

CREATE DATABASE node_data;
GRANT ALL PRIVILEGES ON node_data.* TO 'node_process'@'192.168.1.78';
GRANT ALL PRIVILEGES ON node_data.* TO 'node_process'@'xavier';

FLUSH PRIVILEGES;

quit

sudo service mysql restart
```
