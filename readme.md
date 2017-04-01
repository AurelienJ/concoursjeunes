# For build project:

To build front-end (Typescript / Angular 4)
=====================

Pre-require:
-------------------
nodejs >= 6.1 with npm
gulp (npm install -g gulp)

Command
-------------------

```bash
cd src-client
npm install
#for debug mode
gulp default
#or for prod mode
gulp prod
```

To Build backend
=====================

Pre-require:
-------------------
java >=8
ant
ivy

__To build all-system, a linux environment is required with : __
* debbuild
* rpm-build
* mkisofs (for build macosx)
* makensis (for windows build)

Command
-------------------

run "ant" to build for your system or "ant all-system" to build for Windows, MacOSX and Linux (tar.gz, db, rpm)

 
