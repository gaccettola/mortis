
### dbserver1601 for percona server 5.7
```
512 memory / 4gb disk (fixed)
dbadmin
dbadminpass
bridged network
```

### openssh-server
```
sudo apt-get install -y openssh-server
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

### percona 5.7
```
sudo apt-get update
sudo apt-get upgrade -y

wget https://repo.percona.com/apt/percona-release_0.1-4.$(lsb_release -sc)_all.deb
sudo dpkg -i percona-release_0.1-4.$(lsb_release -sc)_all.deb
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y percona-server-server-5.7
```

```
sudo sed -i 's/^\(bind-address\s.*\)/# \1/' /etc/mysql/my.cnf
sudo sed -i 's/^\(log_error\s.*\)/# \1/' /etc/mysql/my.cnf   
```

```
mysql -u root -p
    GRANT ALL PRIVILEGES ON *.* TO "root"@"%" WITH GRANT OPTION;
    CREATE USER "node_process"@"%" IDENTIFIED BY "93bdfe5ea84a66d73f3874aa793dc77f0676d67e";
    GRANT SUPER ON *.* TO "node_process"@"%" IDENTIFIED BY "93bdfe5ea84a66d73f3874aa793dc77f0676d67e";
    GRANT ALL PRIVILEGES ON *.* TO "node_process"@"%";
    CREATE DATABASE mortis_data;
    GRANT ALL PRIVILEGES ON mortis_data.* TO "node_process"@"%";
```

```
sudo sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/percona-server.conf.d/mysqld.cnf
sudo service mysql stop && sudo service mysql start

```

























