#!/bin/bash - 
echo -e "$RED Debian or Debian derivative OS distro detected, installing programs.. $STD"
DEBIAN_PROGS="nodejs npm build-essential"
#mongodb libopencv-dev"
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y $DEBIAN_PROGS
sudo apt-get update && sudo apt-get install -y openalpr openalpr-daemon openalpr-utils libopenalpr-dev

#install pi blaster
git clone https://github.com/sarfata/pi-blaster
cd pi-blaster
sudo apt-get install debhelper dh-autoreconf dh-systemd dpkg-dev \
  init-system-helpers autoconf
dpkg-buildpackage -us -uc -i && sudo dpkg -i ../pi-blaster*.deb
cd ..
rm pi-blaster_*

#git clone https://github.com/estevetarra/projecte2.git
#cd projecte2
#cd codi
#npm install
