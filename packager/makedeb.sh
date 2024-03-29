#!/bin/sh

# se rend dans le repertoire contenant le tar.gz
cd pack/linux/
mkdir deb
cd deb

# construit le .orig necessaire à la creation du deb
cp ../ConcoursJeunes-$VERSION.tar.gz concoursjeunes_$VERSION.orig.tar.gz

# crée le repertoire de version décompressé
mkdir concoursjeunes-$VERSION
# décompresse le contenu du .orig dedans
cp concoursjeunes_$VERSION.orig.tar.gz concoursjeunes-$VERSION/
cd concoursjeunes-$VERSION
tar zxvf concoursjeunes_$VERSION.orig.tar.gz
rm concoursjeunes_$VERSION.orig.tar.gz
#copie le debian
mkdir debian
#cp ../../../../packager/linux/debian/compat debian/
echo 10 > debian/compat
cp ../../../../packager/linux/debian/control debian/
cp ../../../../packager/linux/debian/copyright debian/
cp ../../../../packager/linux/debian/dirs debian/
cp ../../../../packager/linux/debian/postinst debian/
cp ../../../../packager/linux/debian/rules debian/
mkdir debian/source
cp ../../../../packager/linux/debian/source/format debian/source
sed 's/) stable/-1) stable/g' ../../../../pack/changelog.txt > debian/changelog

#construit le paquet
dpkg-buildpackage -rfakeroot
