#!/bin/bash - 
echo -e "$RED Debian or Debian derivative OS distro detected, installing programs.. $STD"
DEBIAN_PROGS="nodejs mongodb build-essential libopencv-dev"
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y $DEBIAN_PROGS
git clone https://github.com/estevetarra/projecte2.git
cd projecte2
cd codi
npm install
