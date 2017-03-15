
## starting the debug configuration of the solution

##### start the mysql ( percona ) and redis servers
```
minikube start \
    --cpus=1 \
    --disk-size="10g" \
    --kubernetes-version="v1.5.2" \
    --memory=1024 \
    --vm-driver=kvm
  
kubectl get pods
    
```

##### get the pod names
```
kubectl get pods
```

##### forward the ports 
```
kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 3306
kubectl port-forward xxxxxxxxxxxxxxxxxxxxxxxxxxxxx 6379
```

##### prepare the restapi, from ./mortis/server_restapi
```
./_prepare.sh
```

##### start the restapi, from ./mortis/server_restapi/debug
```
node server_restapi.js
```

##### prepare the client desktop, from ./mortis/client_desktop
```
./_prepare.sh
```

##### start the desktop client, from ./mortis/client_desktop/debug 
```
node ./gulp/start
```

##### prepare and start the web client, from ./mortis/client_web
```
./_prepare.sh
```

##### prepare the mobile client, from ./mortis/client_mobile 
```
./_prepare.sh
```

##### start the mobile client with the android emulator, from ./mortis/client_mobile 
```
./_prepare_run_android.sh
```

##### start the mobile client with the browser, from ./mortis/client_mobile 
```
./_prepare_run_browser.sh
```
