# Three.js leren vanuit p5.js

## Missie
Seb (p5.js-expert, auteur van p5.waves, docent LAB44) leert three.js.
Aanpak: elke les vertrekt vanuit een p5-concept dat hij al kent en
vertaalt dat naar het three.js-equivalent. Lessen zijn zelfstandige
HTML-bestanden die lokaal draaien via http://localhost/three/...

## Boom
```
three/
├── index.html          ← doorverwijzing: localhost/three/ → handleiding/
├── cloud.md            ← dit bestand
├── KENNISMAKING.md     ← de p5 → three.js vertaalgids
├── three.js/           ← shallow clone van github.com/mrdoob/three.js
│   ├── build/three.module.js      ← de library zelf (ES module)
│   └── examples/jsm/              ← addons zoals OrbitControls
└── handleiding/        ← three.js HANDLEIDING-SITE in p5-cursussite-stijl
    ├── index.html      ← SPA-schil (header, nav, zoek, content)
    ├── main.js         ← motor + onderwerpenlijst (20 lespagina's, 5 categorieën)
    ├── editor.js       ← live three.js-editor (script type="text/three")
    ├── style.css       ← kopie van p5_cursus_site + leerpad-blok welkomstpagina
    ├── editor.css      ← idem, + .three-editor selector
    └── content/        ← lespagina's als HTML-fragmenten, met oefeningen
```
Handleiding draait op http://localhost/three/handleiding/
Nieuwe lespagina = fragment in handleiding/content/ + entry in
de onderwerpen-array in handleiding/main.js.

## Regels
- Drempel laag houden: elk voorbeeld is één index.html, geen build-tools,
  geen npm — imports wijzen rechtstreeks naar ../three.js/build/ via importmap.
- Elke les legt de link met p5 expliciet in commentaar ("in p5 zou je...").
- Drie.js draait NIET vanaf file:// — altijd via de lokale Apache
  (http://localhost/three/). Dat is dezelfde reden als p5 met loadImage.
- Nieuwe lessen krijgen mapjes lesNN-onderwerp/ en komen in de Boom hierboven.

## Notities
- 2026-06-11: Project gestart. Shallow clone van three.js in three.js/,
  KENNISMAKING.md geschreven als brug vanuit p5-kennis.
- 2026-06-11: Handleiding-site gebouwd in handleiding/ in de opmaak van
  p5_cursus_site (zelfde style.css, eigen slankere main.js + three-editor).
- 2026-06-11: THREE.Clock is deprecated in deze clone - gebruik THREE.Timer
  (timer.update() in de loop, dan timer.getElapsed()).
- 2026-06-11: Cursus uitgebreid naar 20 lessen (incl. schaduwen, particles,
  3D-tekst, glTF, shaders, lil-gui) + oefeningen in 3 niveaus per praktijkles
  (zelfde opmaak als cursussite: .topic-oefeningen / .oefening-niveau).
- 2026-06-11: Clone is three.js 0.184.0; boilerplate in les eigen-project
  pint dezelfde versie op het CDN.
- 2026-06-11: les01-eerste-scene/ verwijderd (vervangen door de les
  "Je eerste scene" in de handleiding); root-index.html stuurt door
  naar handleiding/.
- 2026-06-11: CodeMirror 5 (CDN, cdnjs) toegevoegd aan de live editors:
  syntax-kleuring, regelnummers, haakjes-match. editor.js valt stil terug
  op de gewone textarea als de CDN onbereikbaar is. Token-kleuren in
  huisstijl via editor.css.
- 2026-06-11: GSAP pagina-overgang toegevoegd aan de handleiding (zelfde
  blok als p5-cursussite): animatePageIn() in main.js + GSAP 3.13.0 CDN.
  Herbruikbare uitleg: C:\server\htdocs\building_blocks\GSAP\pagina_overgang.
- 2026-06-11: GSAP accordeon-stagger in de nav (animateNavGroupItems():
  menu-items glijden trapsgewijs binnen bij openklappen; immediateRender
  tegen flits). Blok: building_blocks\GSAP\accordeon_stagger.
