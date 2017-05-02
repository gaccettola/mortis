#!/usr/bin/env bash

minikube stop && minikube delete
sleep 2

minikube start && minikube ip
sleep 2

cd ./redis/
./build.sh
cd ..
sleep 2

cd ./percona/
./build.sh
cd ..
sleep 2

minikube ip  && minikube dashboard