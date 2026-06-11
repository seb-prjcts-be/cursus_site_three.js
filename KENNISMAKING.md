# Three.js voor wie p5.js al kent

> Naslagdocument bij dit project. De cursus zelf is de **handleiding-site**
> in de stijl van de p5-cursussite, met 20 lespagina's, live three.js-editors
> en oefeningen: **http://localhost/three/handleiding/**
> (of kortweg http://localhost/three/ - die stuurt je door)

## Het grote verschil in één zin

**p5 is immediate mode, three.js is retained mode.**
In p5 teken je elk frame alles opnieuw (`draw()` wist en hertekent).
In three.js bouw je één keer een *scene graph* (een boom van objecten),
en daarna *muteer* je die objecten — de renderer tekent wat er in de boom zit.

```
p5:        elk frame → "teken een cirkel op x,y"        (commando's)
three.js:  één keer  → "er BESTAAT een bol, hij staat op x,y"  (objecten)
           elk frame → "bol.position.x = ..."           (eigenschappen wijzigen)
```

Dit is dezelfde mentale sprong als van `ellipse()` naar een class `Ball`
met properties die je in `draw()` aanpast — maar dan ingebakken in de library.

## De vertaaltabel

| p5.js (WEBGL mode) | three.js | opmerking |
|---|---|---|
| `createCanvas(w, h, WEBGL)` | `new THREE.WebGLRenderer()` + `renderer.setSize(w, h)` | renderer maakt zelf een `<canvas>` die je in de DOM hangt |
| de impliciete "wereld" | `new THREE.Scene()` | in p5 onzichtbaar, hier een expliciet object |
| impliciete camera / `camera()` | `new THREE.PerspectiveCamera(fov, aspect, near, far)` | je móét er een maken, niets is impliciet |
| `draw()` loop | `renderer.setAnimationLoop(animate)` | zelfde idee als draw: 60×/sec |
| `background(20)` | `scene.background = new THREE.Color(0x141414)` | één keer instellen, niet elk frame |
| `box(50)` / `sphere(25)` | `Geometry` + `Material` + `Mesh` | vorm en uiterlijk zijn gescheiden objecten, samen worden ze een Mesh |
| `fill(255, 0, 125)` | `new THREE.MeshStandardMaterial({color: 0xff007d})` | materiaal hoort bij het object, niet bij de tekenstaat |
| `translate()/rotate()` | `mesh.position` / `mesh.rotation` / `mesh.scale` | geen matrix-stack: elk object draagt zijn eigen transform |
| `push()` / `pop()` | `new THREE.Group()` met kinderen | hiërarchie zit in de boom: kind beweegt mee met ouder |
| `lights()` | `DirectionalLight`, `AmbientLight`, ... | lichten zijn objecten die je aan de scene toevoegt |
| `orbitControl()` | `OrbitControls` (addon uit examples/jsm) | vrijwel identiek gevoel |
| `frameCount` / `millis()` | `new THREE.Timer()` → `update()` + `getElapsed()` | seconden i.p.v. frames; framerate-onafhankelijk |
| `windowResized()` | `window.addEventListener('resize', ...)` | camera.aspect + renderer.setSize zelf bijwerken |
| `mouseX/mouseY` | `pointermove`-listener + `Raycaster` voor 3D-picking | "welk object zit onder de muis" is een expliciete stap |

## Het vaste ritueel (vergelijk met setup/draw)

Elke three.js-sketch heeft dezelfde vier stappen — dit is jouw nieuwe
`createCanvas`-reflex:

```js
// 1. SCENE — de wereld (p5: bestaat impliciet)
const scene = new THREE.Scene();

// 2. CAMERA — het oog (p5: impliciet, hier verplicht)
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. RENDERER — het canvas (p5: createCanvas)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// 4. LOOP — de draw() (p5: draw)
renderer.setAnimationLoop(() => renderer.render(scene, camera));
```

Onthoudregel: **scene, camera, renderer, loop**. Zonder één van de vier: zwart scherm.

## Valkuilen vanuit p5-gewoontes

1. **Niet elk frame objecten aanmaken.** `new THREE.SphereGeometry()` in de
   loop is de three.js-versie van `loadImage()` in `draw()` — geheugenlek.
   Maak in "setup", muteer in de loop.
2. **Y wijst omhoog** (zoals p5 WEBGL, anders dan p5 2D waar y omlaag wijst).
3. **Kleuren zijn hex-getallen**: `0xff007d`, niet `(255, 0, 125)`.
   `new THREE.Color('rgb(255,0,125)')` mag ook.
4. **Hoeken zijn radialen** — net als p5, maar er is geen `angleMode(DEGREES)`.
5. **Materialen reageren op licht.** `MeshStandardMaterial` zonder licht in de
   scene = zwart object. Voor "gewoon een kleur zoals fill()" zonder licht:
   `MeshBasicMaterial`.
6. **Modules vereisen een server.** `file://` werkt niet — gebruik
   http://localhost/three/... (zelfde Apache als je andere projecten).

## Hoe de geclonede repo gebruiken

De clone in `three.js/` is tegelijk **library** en **leerschat**:

- `three.js/build/three.module.js` — de library die onze lessen importeren
- `three.js/examples/` — honderden officiële demo's; open ze lokaal via
  http://localhost/three/three.js/examples/ en lees de bron van wat je mooi vindt
- `three.js/examples/jsm/` — addons (OrbitControls, loaders, post-processing)
- `three.js/manual/` — de officiële handleiding als lokale website

Geen npm, geen bundler nodig: onze lessen gebruiken een `importmap`
(zie les01) die "three" rechtstreeks naar de build-map laat wijzen.

## Leerpad

Het volledige leerpad leeft nu in de handleiding-site:
**http://localhost/three/handleiding/** — 20 lessen in 5 categorieën
(Introductie, Fundamenten, Beweging & interactie, Verdieping, Praktijk),
met live editors en oefeningen in 3 niveaus (Nabootsen / Variëren / Creëren).
De welkomstpagina toont het complete overzicht.
