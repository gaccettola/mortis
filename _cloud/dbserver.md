## server db
```
mysql -u root -p
    GRANT ALL PRIVILEGES ON *.* TO "root"@"%" WITH GRANT OPTION;
    CREATE USER "node_process"@"%" IDENTIFIED BY "93bdfe5ea84a66d73f3874aa793dc77f0676d67e";
    GRANT SUPER ON *.* TO "node_process"@"%" IDENTIFIED BY "93bdfe5ea84a66d73f3874aa793dc77f0676d67e";
    GRANT ALL PRIVILEGES ON *.* TO "node_process"@"%";
    CREATE DATABASE mortis_data;
    GRANT ALL PRIVILEGES ON mortis_data.* TO "node_process"@"%";    
exit

```