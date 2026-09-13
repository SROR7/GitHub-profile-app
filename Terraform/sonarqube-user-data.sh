#!/bin/bash

set -e

apt-get update -y

apt-get install -y docker.io

systemctl enable --now docker

usermod -aG docker ubuntu

# SonarQube requirements
sysctl -w vm.max_map_count=524288
sysctl -w fs.file-max=131072

cat <<EOF >> /etc/sysctl.conf
vm.max_map_count=524288
fs.file-max=131072
EOF

# Docker volumes
docker volume create sonarqube_data
docker volume create sonarqube_logs
docker volume create sonarqube_extensions

# Run SonarQube
docker run -d \
  --name sonarqube \
  --restart unless-stopped \
  -p 9000:9000 \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_logs:/opt/sonarqube/logs \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  sonarqube:lts-community