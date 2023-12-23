# ConcoursJeunes 

_ConcoursJeunes is a free Archery contest managment software._

Initially dedicated to the special youth competitions of the FFTA (French Archery Federation), the application can 
however be used for all types of archery competitions.

Application is published under the open source CeCILL V2.0 (An French Right licence compatible with GPL)

# How to install release version ?

## For windows

Download setup-ConcoursJeunes-[last release version].exe in release and execute it.

## For linux

- For debian like distributions (debian, ubuntu, ...), download concoursjeunes_[last release version]_all.deb and run:

  ``sudo dpkg -i concoursjeunes_*_all.deb``

- For Red Hat like distributions (fedora, rhel, suse, ...), download concoursjeunes_[last release version]_all.deb and run:

  ``sudo rpm -i ConcoursJeunes-*.noarch.rpm``

- For other distributions, download ConcoursJeunes-[last release version].tar.gz
  Extract archive in a directory and, in this directory run:

  ``sudo make install``

## Developers environment


1. Clone current repository
2. in the repo subdirectory "packager", create an "security.properties" file. This file should never be committed. 

   Make sure it is mentioned in the .gitignore
3. Write in this security.properties file (replace [] by your own properties):
   ```
   projet.keystorepath=[absolute path to your own signkeystore]
   projet.keystorepassword=[password of your own keystore]
   projet.signkeyalias=[alias of your key]
   projet.signkeyaliaspassword=[password of your key]

   projet.fftaimport.securitypath=packager/
   ```
4. If you aven't keystore, generate it.

   ```
   keytool -keystore [yourkeystorepath].jks -storetype JCEKS -storepass [your password] -genkey -alias
   [key alias] -keypass [key password]
   ```

5. Install, if not already installed, "apache ant" (https://ant.apache.org/) 
6. Install, if not already installed, "apache ivy" (https://ant.apache.org/ivy/)
7. Download pre-requiered resources with command:

   ``ant -f projectBuilder.xml buildgenaratedressources``
8. Get dependencies with command:

   ``ant -buildfile build.xml resolve``
9. At this point you can build and run application with eclipse, vscode or ideaj