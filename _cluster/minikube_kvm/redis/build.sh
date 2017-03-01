#!/usr/bin/env bash

# minikube config set vm-driver kvm
minikube start

minikube docker-env
eval $(minikube docker-env)

minikube dashboard

docker build -t mortis-redis:001 .

# docker images

# docker run mortis-redis

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

kubectl get pods

kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 6379
kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 6379
kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 6379


kubectl exec -it xxxxxxxxxxxxxxxxxxxxxxxxxxxxx bash
kubectl exec -it xxxxxxxxxxxxxxxxxxxxxxxxxxxxx bash
kubectl exec -it xxxxxxxxxxxxxxxxxxxxxxxxxxxxx bash
