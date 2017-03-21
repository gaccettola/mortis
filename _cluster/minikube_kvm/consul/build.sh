#!/usr/bin/env bash

# minikube stop && minikube delete

# minikube config set vm-driver kvm
# minikube config set vm-driver virtualbox

# minikube start

minikube docker-env
eval $(minikube docker-env)

docker build -t mortis-consul:001 .

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

minikube service --url=true mortis-consul

# kubectl get pods
# 
# kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 8500
# kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 8500
# kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 8500
# 
# 
# kubectl exec -it xxxxxxxxxxxxxxxxxxxxxxxxxxxxx bash
# kubectl exec -it xxxxxxxxxxxxxxxxxxxxxxxxxxxxx bash
# kubectl exec -it xxxxxxxxxxxxxxxxxxxxxxxxxxxxx bash