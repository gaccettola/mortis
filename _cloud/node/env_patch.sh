#!/usr/bin/env bash

SERVER_ENV=/home/xavier/mortis/.env

# SERVER_RESTAPI_PORT   =>  25088
sudo sed -i "s/.*SERVER_RESTAPI_PORT.*/SERVER_RESTAPI_PORT=25088/" ${SERVER_ENV}

# DB_SERVER_HOST        =>  10.142.0.5
sudo sed -i "s/.*DB_SERVER_HOST.*/DB_SERVER_HOST=10.142.0.5/" ${SERVER_ENV}

# DB_SERVER_PORT        =>  25066
sudo sed -i "s/.*DB_SERVER_PORT.*/DB_SERVER_PORT=25066/" ${SERVER_ENV}

# RD_SERVER_HOST        => 10.142.0.6
sudo sed -i "s/.*RD_SERVER_HOST.*/RD_SERVER_HOST=10.142.0.6/" ${SERVER_ENV}

# RD_SERVER_PORT        =>  25079
sudo sed -i "s/.*RD_SERVER_PORT.*/RD_SERVER_PORT=25079/" ${SERVER_ENV}


