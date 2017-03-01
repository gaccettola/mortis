#!/usr/bin/env bash

# minikube config set vm-driver kvm
# minikube start

# minikube docker-env
# eval $(minikube docker-env)

# minikube dashboard

docker build -t mortis-mysql:008 .

# docker images

# docker run mortis-redis

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# kubectl port-forward mortis-mysql-XXXXXXXXXX-XXXXX 3306
# kubectl port-forward mortis-mysql-XXXXXXXXXX-XXXXX 3306
# kubectl port-forward mortis-mysql-XXXXXXXXXX-XXXXX 3306


# kubectl exec -it mortis-mysql-XXXXXXXXXX-XXXXX bash
# kubectl exec -it mortis-mysql-XXXXXXXXXX-XXXXX bash
# kubectl exec -it mortis-mysql-XXXXXXXXXX-XXXXX bash


