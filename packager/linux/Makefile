ifndef GROUP_CREATION
	GROUP_CREATION="yes"
endif

all:

install:
ifeq ($(GROUP_CREATION), yes)
	groupadd -f concoursjeunes
endif

	mkdir -p "$(DESTDIR)/usr/lib/ConcoursJeunes"
	mkdir -p "$(DESTDIR)/var/lib/ConcoursJeunes"
	mkdir -p "$(DESTDIR)/usr/bin/"
	mkdir -p "$(DESTDIR)/usr/sbin/"
	mkdir -p "$(DESTDIR)/usr/share/pixmaps"
	mkdir -p "$(DESTDIR)/usr/share/applications"
	
	cp -r usr/lib/ConcoursJeunes/. "$(DESTDIR)/usr/lib/ConcoursJeunes/"
	chmod -R a+Xr,u+w "$(DESTDIR)/usr/lib/ConcoursJeunes"
	chown -R root:root "$(DESTDIR)/usr/lib/ConcoursJeunes"
	install -m755 usr/bin/ConcoursJeunes "$(DESTDIR)/usr/bin/ConcoursJeunes"
	install -m644 usr/share/pixmaps/ConcoursJeunes.xpm "$(DESTDIR)/usr/share/pixmaps/ConcoursJeunes.xpm"
	install -m644 usr/share/applications/ConcoursJeunes.desktop "$(DESTDIR)/usr/share/applications/ConcoursJeunes.desktop"
	cp -r var/lib/ConcoursJeunes/. "$(DESTDIR)/var/lib/ConcoursJeunes/"
	chmod +s "$(DESTDIR)/var/lib/ConcoursJeunes"
	chmod -R a+Xrw "$(DESTDIR)/var/lib/ConcoursJeunes"
ifeq ($(GROUP_CREATION), yes)
	chown -R root:concoursjeunes "$(DESTDIR)/var/lib/ConcoursJeunes"
endif

clean:

remove:
	rm -rf "$(DESTDIR)/usr/lib/ConcoursJeunes"
	rm -f "$(DESTDIR)/usr/bin/ConcoursJeunes"
	rm -f "$(DESTDIR)/usr/sbin/concoursjeunes-applyupdate"
	rm -f "$(DESTDIR)/usr/bin/concoursjeunes-applyupdate"
	rm -f "$(DESTDIR)/usr/share/pixmaps/ConcoursJeunes.xpm"
	rm -f "$(DESTDIR)/usr/share/applications/ConcoursJeunes.desktop"

