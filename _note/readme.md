### common tools, desktop setup
- nodejs          : 6.10.0 is the current LTS
- cordova         : glabally installed
- gulp            : glabally installed
- mocha           : glabally installed


### kubectl ( used by both minikube and gcloud )
- installation
- linux
```
curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/v1.5.2/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

### minikube
- the local developer enviroment for services
- aligns well with kubernetes

- installation : https://github.com/kubernetes/minikube/releases
- linux
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.16.0/minikube-linux-amd64
chmod +x minikube
sudo mv minikube /usr/local/bin/
```


### gcloud
- the soltuon should be work on any of the turnkey providers out there, aws, digital ocean,
  - gcloud was selected partly for thier stability, partly for their costs, partly for thier trial



### webstorm
- one of the only parts of this soltion that is not open source and free
  - atom is better in some ways, worse in others

### https://github.com/velikanov/opensource-candies