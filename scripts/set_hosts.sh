#!/bin/bash

HOSTFILE="/etc/hosts"
HOSTIP="127.0.0.1"
HOSTDOMAIN="tieraid.io"

if !(grep -q $HOSTDOMAIN "$HOSTFILE"); then
    echo "$HOSTIP $HOSTDOMAIN" | sudo tee -a /etc/hosts
fi

