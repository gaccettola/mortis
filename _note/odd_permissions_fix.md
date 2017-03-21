
### somewhere in the developer setup the permissions were upset, this fixed it
chmod -R 755 .
sudo chown -R $(id -u):$(id -g) .