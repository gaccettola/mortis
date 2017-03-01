

```
sudo apt-get update 

sudo curl -L https://github.com/dhiltgen/docker-machine-kvm/releases/download/v0.7.0/docker-machine-driver-kvm -o /usr/local/bin/docker-machine-driver-kvm

sudo chmod +x /usr/local/bin/docker-machine-driver-kvm

sudo apt install libvirt-bin qemu-kvm

sudo usermod -a -G libvirtd $(whoami)

newgrp libvirtd

minikube start \
    --cpus=1 \
    --disk-size="10g" \
    --kubernetes-version="v1.5.2" \
    --memory=1024 \
    --vm-driver=kvm
    
    
```


