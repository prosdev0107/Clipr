#!/bin/bash

set -xe

# Proxy support so health check won't be constantly degraded

/opt/elasticbeanstalk/bin/healthd-track-pidfile --proxy nginx || true

echo "app deploy 01 ok " >> /tmp/front.log
