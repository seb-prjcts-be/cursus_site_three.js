// === three.js Handleiding - motor ===
// Gebaseerd op de p5.js Cursus-site (zelfde opmaak en gedrag), tweetalig NL/EN.

// === i18n - tweetalig NL/EN ===
let currentLang = localStorage.getItem('lang') || 'nl';

const i18n = {
    nl: {
        siteTitle: "three.js Handleiding",
        subtitle: "3D creative coding voor wie p5.js al kent",
        pageTitle: "three.js Handleiding - 3D creative coding",
        searchPlaceholder: "Zoek op trefwoord...",
        navHeading: "Onderwerpen",
        noResults: "Geen resultaten gevonden.",
        loading: "Laden...",
        contentNotFound: "Content niet gevonden. Maak een HTML bestand aan in de content/ map.",
        loadError: "Er is een fout opgetreden bij het laden van de content.",
        relatedVia: "Verwant via",
        noOtherTopics: "Geen andere onderwerpen met deze tag.",
        welcomeTitle: "Welkom bij de three.js Handleiding",
        welcomeText1: "Deze handleiding helpt je stap voor stap 3D creative coding leren met three.js. Alles wat je al weet van p5.js neem je mee: elk onderwerp legt de link met wat je al kent.",
        welcomeText2: "Volg het leerpad hieronder van boven naar onder, of spring naar wat je nodig hebt. De meeste lessen hebben een live editor om direct in te experimenteren, en sluiten af met oefeningen in drie niveaus: <strong>● Nabootsen</strong> (verander één waarde), <strong>●● Variëren</strong> (breid uit) en <strong>●●● Creëren</strong> (bouw iets nieuws).",
        fontSizeLabel: "Lettergrootte",
        fontSizeSmall: "Kleine letters",
        fontSizeMedium: "Normale letters",
        fontSizeLarge: "Grote letters",
        prev: "Vorige",
        next: "Volgende",
        tagsLabel: "Tags",
        categories: {
            "Introductie": "Introductie",
            "Fundamenten": "Fundamenten",
            "Beweging & interactie": "Beweging & interactie",
            "Verdieping": "Verdieping",
            "Praktijk": "Praktijk"
        }
    },
    en: {
        siteTitle: "three.js Manual",
        subtitle: "3D creative coding for those who already know p5.js",
        pageTitle: "three.js Manual - 3D creative coding",
        searchPlaceholder: "Search by keyword...",
        navHeading: "Topics",
        noResults: "No results found.",
        loading: "Loading...",
        contentNotFound: "Content not found. Create an HTML file in the content/ folder.",
        loadError: "An error occurred while loading the content.",
        relatedVia: "Related via",
        noOtherTopics: "No other topics with this tag.",
        welcomeTitle: "Welcome to the three.js Manual",
        welcomeText1: "This manual helps you learn 3D creative coding step by step with three.js. Everything you already know from p5.js comes along: every topic links back to what you already know.",
        welcomeText2: "Follow the learning path below from top to bottom, or jump to what you need. Most lessons have a live editor to experiment in directly, and end with exercises at three levels: <strong>● Imitate</strong> (change one value), <strong>●● Vary</strong> (extend an example) and <strong>●●● Create</strong> (build something new).",
        fontSizeLabel: "Font size",
        fontSizeSmall: "Small text",
        fontSizeMedium: "Normal text",
        fontSizeLarge: "Large text",
        prev: "Previous",
        next: "Next",
        tagsLabel: "Tags",
        categories: {
            "Introductie": "Introduction",
            "Fundamenten": "Fundamentals",
            "Beweging & interactie": "Motion & interaction",
            "Verdieping": "Going deeper",
            "Praktijk": "In practice"
        }
    }
};

// Tag-vertalingen: NL → EN (API-namen en al-Engelse tags hoeven hier niet in)
const tagTranslations = {
    "introductie": "introduction",
    "geschiedenis": "history",
    "vergelijking": "comparison",
    "vertaaltabel": "translation table",
    "basis": "basics",
    "kleur": "colour",
    "transformaties": "transformations",
    "licht": "light",
    "materialen": "materials",
    "perspectief": "perspective",
    "animatie": "animation",
    "tijd": "time",
    "interactie": "interaction",
    "muis": "mouse",
    "schaduwen": "shadows",
    "realisme": "realism",
    "texturen": "textures",
    "afbeeldingen": "images",
    "mist": "mist",
    "achtergrond": "background",
    "sfeer": "atmosphere",
    "deeltjes": "particles",
    "lijnen": "lines",
    "sterren": "stars",
    "tekst": "text",
    "typografie": "typography",
    "letters": "letters",
    "modellen": "models",
    "voorbeelden": "examples",
    "documentatie": "documentation",
    "startcode": "starter code",
    "inspiratie": "inspiration"
};

function t(key) {
    return i18n[currentLang][key] || i18n['nl'][key] || key;
}

function tTag(tag) {
    if (currentLang === 'nl') return tag;
    const lower = tag.toLowerCase();
    if (tagTranslations[lower]) {
        // Behoud hoofdlettergebruik van het origineel
        if (tag[0] === tag[0].toUpperCase() && tag[0] !== tag[0].toLowerCase()) {
            const translated = tagTranslations[lower];
            return translated[0].toUpperCase() + translated.slice(1);
        }
        return tagTranslations[lower];
    }
    return tag;
}

function tCat(categorie) {
    return i18n[currentLang].categories[categorie] || categorie;
}

function topicTitle(onderwerp) {
    if (currentLang !== 'nl' && onderwerp.en && onderwerp.en.titel) {
        return onderwerp.en.titel;
    }
    return onderwerp.titel;
}

function topicSummary(onderwerp) {
    if (currentLang !== 'nl' && onderwerp.en && onderwerp.en.samenvatting) {
        return onderwerp.en.samenvatting;
    }
    return onderwerp.samenvatting;
}

function topicContentFile(onderwerp) {
    if (currentLang !== 'nl' && onderwerp.contentFile) {
        return onderwerp.contentFile.replace('content/', 'content/en/');
    }
    return onderwerp.contentFile;
}

// Data structuur met alle onderwerpen
const onderwerpen = [
    {
        id: "over-threejs",
        titel: "Over three.js",
        samenvatting: "Wat is three.js, waar komt het vandaan, en wanneer kies je het in plaats van p5.js?",
        en: {
            titel: "About three.js",
            samenvatting: "What is three.js, where does it come from, and when do you pick it instead of p5.js?"
        },
        tags: ["three.js", "WebGL", "mrdoob", "introductie", "geschiedenis", "p5.js"],
        contentFile: "content/over-threejs.html",
        categorie: "Introductie"
    },
    {
        id: "van-p5-naar-threejs",
        titel: "Van p5.js naar three.js",
        samenvatting: "De vertaaltabel: elk p5-begrip dat je al kent, naast zijn three.js-equivalent.",
        en: {
            titel: "From p5.js to three.js",
            samenvatting: "The translation table: every p5 concept you already know, next to its three.js equivalent."
        },
        tags: ["p5.js", "vergelijking", "immediate mode", "retained mode", "scene graph", "vertaaltabel"],
        contentFile: "content/van-p5-naar-threejs.html",
        categorie: "Introductie"
    },
    {
        id: "eerste-scene",
        titel: "Je eerste scene",
        samenvatting: "Het vaste ritueel van elke three.js-sketch: scene, camera, renderer en de animatieloop.",
        en: {
            titel: "Your first scene",
            samenvatting: "The fixed ritual of every three.js sketch: scene, camera, renderer and the animation loop."
        },
        tags: ["scene", "camera", "renderer", "setAnimationLoop", "PerspectiveCamera", "WebGLRenderer", "basis"],
        contentFile: "content/eerste-scene.html",
        categorie: "Fundamenten"
    },
    {
        id: "geometrie-materiaal",
        titel: "Geometrie + materiaal = mesh",
        samenvatting: "Vormen bouwen uit twee delen: een geometrie (de vorm) en een materiaal (het uiterlijk).",
        en: {
            titel: "Geometry + material = mesh",
            samenvatting: "Building shapes from two parts: a geometry (the form) and a material (the look)."
        },
        tags: ["geometry", "material", "mesh", "BoxGeometry", "SphereGeometry", "MeshStandardMaterial", "MeshBasicMaterial", "kleur"],
        contentFile: "content/geometrie-materiaal.html",
        categorie: "Fundamenten"
    },
    {
        id: "transformaties-groepen",
        titel: "Transformaties & groepen",
        samenvatting: "Position, rotation en scale per object, en Groups als het nieuwe push()/pop().",
        en: {
            titel: "Transformations & groups",
            samenvatting: "Position, rotation and scale per object, and Groups as the new push()/pop()."
        },
        tags: ["position", "rotation", "scale", "Group", "push", "pop", "scene graph", "transformaties"],
        contentFile: "content/transformaties-groepen.html",
        categorie: "Fundamenten"
    },
    {
        id: "licht",
        titel: "Licht",
        samenvatting: "Zonder licht is alles zwart: AmbientLight, DirectionalLight en PointLight.",
        en: {
            titel: "Light",
            samenvatting: "Without light everything is black: AmbientLight, DirectionalLight and PointLight."
        },
        tags: ["licht", "AmbientLight", "DirectionalLight", "PointLight", "lights", "materialen"],
        contentFile: "content/licht.html",
        categorie: "Fundamenten"
    },
    {
        id: "camera",
        titel: "De camera",
        samenvatting: "Zichthoek, lookAt en camera's op rails - plus de orthografische camera zonder perspectief.",
        en: {
            titel: "The camera",
            samenvatting: "Field of view, lookAt and cameras on rails - plus the orthographic camera without perspective."
        },
        tags: ["camera", "fov", "lookAt", "PerspectiveCamera", "OrthographicCamera", "perspectief"],
        contentFile: "content/camera.html",
        categorie: "Fundamenten"
    },
    {
        id: "animatie-tijd",
        titel: "Animatie & tijd",
        samenvatting: "De animatieloop, de Timer, en bewegen met sin() en cos() - net als in p5.",
        en: {
            titel: "Animation & time",
            samenvatting: "The animation loop, the Timer, and moving with sin() and cos() - just like in p5."
        },
        tags: ["animatie", "Timer", "setAnimationLoop", "sin", "cos", "frameCount", "tijd"],
        contentFile: "content/animatie-tijd.html",
        categorie: "Beweging & interactie"
    },
    {
        id: "orbitcontrols-resize",
        titel: "OrbitControls & venstergrootte",
        samenvatting: "De camera bedienen met de muis, en je scene netjes laten meeschalen met het venster.",
        en: {
            titel: "OrbitControls & window size",
            samenvatting: "Controlling the camera with the mouse, and letting your scene resize neatly with the window."
        },
        tags: ["OrbitControls", "orbitControl", "camera", "resize", "addons", "interactie"],
        contentFile: "content/orbitcontrols-resize.html",
        categorie: "Beweging & interactie"
    },
    {
        id: "raycaster-muis",
        titel: "Klikken op 3D-objecten",
        samenvatting: "Met de Raycaster ontdek je welk object onder de muis zit - het 3D-antwoord op mouseX/mouseY.",
        en: {
            titel: "Clicking 3D objects",
            samenvatting: "With the Raycaster you find out which object sits under the mouse - the 3D answer to mouseX/mouseY."
        },
        tags: ["Raycaster", "muis", "interactie", "mouseX", "picking", "pointer"],
        contentFile: "content/raycaster-muis.html",
        categorie: "Beweging & interactie"
    },
    {
        id: "schaduwen",
        titel: "Schaduwen",
        samenvatting: "Echte schaduwen in drie schakelaars: renderer, licht en objecten.",
        en: {
            titel: "Shadows",
            samenvatting: "Real shadows in three switches: renderer, light and objects."
        },
        tags: ["schaduwen", "shadowMap", "castShadow", "receiveShadow", "licht", "realisme"],
        contentFile: "content/schaduwen.html",
        categorie: "Verdieping"
    },
    {
        id: "texturen",
        titel: "Texturen",
        samenvatting: "Afbeeldingen op je 3D-objecten plakken met de TextureLoader.",
        en: {
            titel: "Textures",
            samenvatting: "Sticking images onto your 3D objects with the TextureLoader."
        },
        tags: ["texturen", "TextureLoader", "loadImage", "afbeeldingen", "map", "materialen"],
        contentFile: "content/texturen.html",
        categorie: "Verdieping"
    },
    {
        id: "sfeer-fog",
        titel: "Sfeer: fog & achtergrond",
        samenvatting: "Mist, achtergrondkleur en gekleurd licht: drie kleine ingrepen die een wereld maken.",
        en: {
            titel: "Atmosphere: fog & background",
            samenvatting: "Fog, background colour and coloured light: three small touches that make a world."
        },
        tags: ["fog", "mist", "achtergrond", "sfeer", "FogExp2", "kleur"],
        contentFile: "content/sfeer-fog.html",
        categorie: "Verdieping"
    },
    {
        id: "punten-lijnen",
        titel: "Punten & particles",
        samenvatting: "Duizenden deeltjes in één object: Points, BufferGeometry en de needsUpdate-vlag.",
        en: {
            titel: "Points & particles",
            samenvatting: "Thousands of particles in a single object: Points, BufferGeometry and the needsUpdate flag."
        },
        tags: ["Points", "particles", "deeltjes", "BufferGeometry", "lijnen", "Line", "sterren"],
        contentFile: "content/punten-lijnen.html",
        categorie: "Verdieping"
    },
    {
        id: "text-3d",
        titel: "3D-tekst",
        samenvatting: "Echte letters met diepte via FontLoader en TextGeometry.",
        en: {
            titel: "3D text",
            samenvatting: "Real letters with depth using FontLoader and TextGeometry."
        },
        tags: ["tekst", "TextGeometry", "FontLoader", "typografie", "letters", "fonts"],
        contentFile: "content/text-3d.html",
        categorie: "Verdieping"
    },
    {
        id: "gltf-modellen",
        titel: "3D-modellen laden",
        samenvatting: "Kant-en-klare modellen (glTF) laden met de GLTFLoader, inclusief hun animaties.",
        en: {
            titel: "Loading 3D models",
            samenvatting: "Loading ready-made models (glTF) with the GLTFLoader, including their animations."
        },
        tags: ["gltf", "GLTFLoader", "modellen", "Blender", "AnimationMixer", "glb", "Sketchfab"],
        contentFile: "content/gltf-modellen.html",
        categorie: "Verdieping"
    },
    {
        id: "shaders",
        titel: "Shaders",
        samenvatting: "Eigen GLSL-materialen met ShaderMaterial en uniforms - vertrouwd terrein voor p5-shader-kenners.",
        en: {
            titel: "Shaders",
            samenvatting: "Your own GLSL materials with ShaderMaterial and uniforms - familiar ground for p5 shader users."
        },
        tags: ["shaders", "GLSL", "ShaderMaterial", "uniforms", "vertex", "fragment", "GPU"],
        contentFile: "content/shaders.html",
        categorie: "Verdieping"
    },
    {
        id: "performance-debug",
        titel: "Debuggen & snelheid",
        samenvatting: "Helpers, het lil-gui controlepaneel, en de drie regels die je sketch snel houden.",
        en: {
            titel: "Debugging & speed",
            samenvatting: "Helpers, the lil-gui control panel, and the three rules that keep your sketch fast."
        },
        tags: ["debug", "helpers", "AxesHelper", "lil-gui", "performance", "InstancedMesh", "dispose"],
        contentFile: "content/performance-debug.html",
        categorie: "Praktijk"
    },
    {
        id: "eigen-project",
        titel: "Je eigen project",
        samenvatting: "Van live editor naar eigen bestand: de complete startcode, een server en versie-vastpinnen.",
        en: {
            titel: "Your own project",
            samenvatting: "From live editor to your own file: the complete starter code, a server and version pinning."
        },
        tags: ["project", "boilerplate", "importmap", "server", "setup", "startcode", "Vite"],
        contentFile: "content/eigen-project.html",
        categorie: "Praktijk"
    },
    {
        id: "verder-leren",
        titel: "Verder leren",
        samenvatting: "De officiële manual, honderden voorbeelden in je lokale clone, en waar je hulp vindt.",
        en: {
            titel: "Learning more",
            samenvatting: "The official manual, hundreds of examples in your local clone, and where to find help."
        },
        tags: ["documentatie", "voorbeelden", "manual", "examples", "links", "inspiratie"],
        contentFile: "content/verder-leren.html",
        categorie: "Praktijk"
    }
];

const navCategories = ["Introductie", "Fundamenten", "Beweging & interactie", "Verdieping", "Praktijk"];

// === Helpers ===

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// === Navigatie ===

function setGroupOpen(group, isOpen) {
    group.classList.toggle('is-open', isOpen);
    const toggle = group.querySelector('.nav-group-toggle');
    if (toggle) {
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

function updateActiveNav(activeId) {
    const navLinks = document.querySelectorAll('#nav-list a');
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${activeId}`;
        if (isActive) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    const navGroups = document.querySelectorAll('.nav-group');
    navGroups.forEach(group => {
        const hasActive = group.querySelector('a.active');
        group.classList.toggle('is-active-group', Boolean(hasActive));
        setGroupOpen(group, Boolean(hasActive));
    });
}

function buildNav() {
    const navList = document.getElementById('nav-list');
    const groups = navCategories.map(categorie => ({
        categorie,
        items: onderwerpen.filter(onderwerp => onderwerp.categorie === categorie)
    }));

    navList.innerHTML = groups.map(group => {
        const groupId = `nav-group-${slugify(group.categorie)}`;
        const itemsMarkup = group.items.map(onderwerp => `
            <li><a href="#${onderwerp.id}">${escapeHtml(topicTitle(onderwerp))}</a></li>
        `).join('');

        return `
            <li class="nav-group" data-category="${group.categorie}">
                <button class="nav-group-toggle" type="button" aria-expanded="false" aria-controls="${groupId}">
                    <span class="nav-group-text">${escapeHtml(tCat(group.categorie))}</span>
                    <span class="nav-group-meta">
                        <span class="nav-group-icon" aria-hidden="true"></span>
                    </span>
                </button>
                <ul class="nav-sublist" id="${groupId}">
                    ${itemsMarkup}
                </ul>
            </li>
        `;
    }).join('');
}

function closeOtherNavGroups(currentGroup) {
    const navGroups = document.querySelectorAll('.nav-group');
    navGroups.forEach(group => {
        if (group !== currentGroup) {
            setGroupOpen(group, false);
        }
    });
}

function initNavGroups() {
    const navGroups = document.querySelectorAll('.nav-group');
    navGroups.forEach(group => {
        const toggle = group.querySelector('.nav-group-toggle');
        if (!toggle) {
            return;
        }
        toggle.addEventListener('click', () => {
            const shouldOpen = !group.classList.contains('is-open');
            closeOtherNavGroups(group);
            setGroupOpen(group, shouldOpen);
        });
    });
}

// === Router ===

function initRouter() {
    function loadOnderwerp() {
        const hash = window.location.hash.slice(1);
        const onderwerp = hash ? onderwerpen.find(o => o.id === hash) : null;

        window.scrollTo(0, 0);

        if (onderwerp) {
            renderOnderwerp(onderwerp);
            updateActiveNav(onderwerp.id);
        } else {
            renderWelcome();
            updateActiveNav(null);
        }
    }

    window.addEventListener('hashchange', loadOnderwerp);
    loadOnderwerp();
}

// Laat de blokken van een vers geladen pagina zacht na elkaar verschijnen (GSAP).
// Valt stil terug op direct tonen als GSAP ontbreekt of de gebruiker minder beweging wil.
// Zie building_blocks/GSAP/pagina_overgang voor uitleg.
function animatePageIn(content) {
    if (typeof gsap === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const contentRoot = content.querySelector('.onderwerp-content');
    const targets = contentRoot
        ? [content.querySelector('.onderwerp-page > h1'), ...contentRoot.children]
        : Array.from(content.querySelectorAll('.welcome > *'));
    const sidebar = content.querySelector('.tags-sidebar');
    if (sidebar) targets.push(sidebar);

    const blocks = targets.filter(Boolean);
    if (!blocks.length) return;

    gsap.from(blocks, {
        opacity: 0,
        y: 14,
        duration: 0.45,
        ease: 'power2.out',
        // amount verdeelt de totale vertraging over alle blokken,
        // zodat lange pagina's niet seconden blijven nadruppelen
        stagger: { amount: 0.45 },
        clearProps: 'opacity,transform'
    });
}

function renderWelcome() {
    const content = document.getElementById('content');

    const leerpadHtml = navCategories.map(categorie => {
        const items = onderwerpen.filter(o => o.categorie === categorie);
        return `
            <section class="welcome-leerpad-groep">
                <h3>${escapeHtml(tCat(categorie))}</h3>
                <ol>
                    ${items.map(o => `<li><a href="#${o.id}">${escapeHtml(topicTitle(o))}</a> - ${escapeHtml(topicSummary(o))}</li>`).join('')}
                </ol>
            </section>
        `;
    }).join('');

    content.innerHTML = `
        <div class="welcome">
            <h2>${escapeHtml(t('welcomeTitle'))}</h2>
            <p>${escapeHtml(t('welcomeText1'))}</p>
            <p>${t('welcomeText2')}</p>
            ${leerpadHtml}
        </div>
    `;
    animatePageIn(content);
}

// === Onderwerp renderen ===

async function renderOnderwerp(onderwerp) {
    const content = document.getElementById('content');

    content.innerHTML = `
        <div class="onderwerp-page">
            <h1>${escapeHtml(topicTitle(onderwerp))}</h1>
            <p>${escapeHtml(t('loading'))}</p>
        </div>
    `;

    try {
        let htmlContent = '';
        const fetchPath = topicContentFile(onderwerp);
        let response = await fetch(fetchPath);
        // Fallback naar NL als EN-bestand niet bestaat
        if (!response.ok && currentLang !== 'nl') {
            response = await fetch(onderwerp.contentFile);
        }
        if (response.ok) {
            htmlContent = await response.text();
        } else {
            htmlContent = `<p>${escapeHtml(t('contentNotFound'))}</p>`;
        }

        const tags = onderwerp.tags || [];
        const tagsSidebarHtml = tags.length > 0 ? `
            <aside class="tags-sidebar">
                <div id="tags-chip-flow" class="tags-chip-flow">
                    ${tags.map(tag => `<button class="tag-btn" type="button" data-tag="${escapeHtml(tag)}">${escapeHtml(tTag(tag))}</button>`).join('')}
                </div>
                <div id="tag-context" class="tag-context" aria-live="polite"></div>
            </aside>` : '';

        const idx = onderwerpen.indexOf(onderwerp);
        const prev = idx > 0 ? onderwerpen[idx - 1] : null;
        const next = idx >= 0 && idx < onderwerpen.length - 1 ? onderwerpen[idx + 1] : null;
        const prevHtml = prev
            ? `<a class="page-nav-link page-nav-prev" href="#${prev.id}" aria-label="${t('prev')}: ${escapeHtml(topicTitle(prev))}"><i class="bi bi-chevron-left"></i><span class="page-nav-label">${t('prev')}</span><span class="page-nav-title">${escapeHtml(topicTitle(prev))}</span></a>`
            : '<span class="page-nav-spacer"></span>';
        const nextHtml = next
            ? `<a class="page-nav-link page-nav-next" href="#${next.id}" aria-label="${t('next')}: ${escapeHtml(topicTitle(next))}"><span class="page-nav-title">${escapeHtml(topicTitle(next))}</span><span class="page-nav-label">${t('next')}</span><i class="bi bi-chevron-right"></i></a>`
            : '<span class="page-nav-spacer"></span>';

        content.innerHTML = `
            <div class="onderwerp-page">
                <h1>${escapeHtml(topicTitle(onderwerp))}</h1>
                <div class="onderwerp-layout">
                    <div class="onderwerp-content">
                        ${htmlContent}
                        <nav class="page-nav" aria-label="${t('prev')} / ${t('next')}">
                            ${prevHtml}
                            ${nextHtml}
                        </nav>
                    </div>
                    ${tagsSidebarHtml}
                </div>
            </div>
        `;

        animatePageIn(content);

        // Tag-zijbalk: klik op een tag toont verwante onderwerpen die die tag delen
        const sidebar = content.querySelector('.tags-sidebar');
        if (sidebar) {
            const tagContextEl = sidebar.querySelector('#tag-context');
            let activeTag = null;

            const showTagContext = (tag) => {
                activeTag = tag;
                sidebar.querySelectorAll('.tag-btn').forEach(btn => {
                    btn.classList.toggle('is-active', btn.dataset.tag === tag);
                });

                const related = onderwerpen.filter(o =>
                    o.id !== onderwerp.id && o.tags.some(t => t.toLowerCase() === tag.toLowerCase())
                );

                if (related.length === 0) {
                    tagContextEl.innerHTML = `
                        <h3 class="tag-context-title">${escapeHtml(tTag(tag))}</h3>
                        <p class="tag-context-empty">${escapeHtml(t('noOtherTopics'))}</p>
                    `;
                    return;
                }

                tagContextEl.innerHTML = `
                    <h3 class="tag-context-title">${escapeHtml(t('relatedVia'))} "${escapeHtml(tTag(tag))}"</h3>
                    <ul class="tag-context-list">
                        ${related.map(o => `
                            <li><a href="#${o.id}">${escapeHtml(topicTitle(o))}</a>
                            <p>${escapeHtml(topicSummary(o))}</p></li>
                        `).join('')}
                    </ul>
                `;
            };

            sidebar.addEventListener('click', (event) => {
                const tagButton = event.target.closest('[data-tag]');
                if (tagButton) {
                    showTagContext(tagButton.dataset.tag);
                }
            });

            if (tags.length > 0) {
                showTagContext(tags[0]);
            }
        }

        // Initialiseer live editors na korte delay zodat DOM is bijgewerkt
        setTimeout(() => {
            if (window.ThreeEditor && window.ThreeEditor.init) {
                window.ThreeEditor.init();
            }
        }, 100);
    } catch (error) {
        console.error('Error loading content:', error);
        content.innerHTML = `
            <div class="onderwerp-page">
                <h1>${escapeHtml(topicTitle(onderwerp))}</h1>
                <p>${escapeHtml(t('loadError'))}</p>
            </div>
        `;
    }
}

// === Zoeken ===

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        const results = onderwerpen.filter(onderwerp => {
            const titelMatch = topicTitle(onderwerp).toLowerCase().includes(query)
                || onderwerp.titel.toLowerCase().includes(query);
            const samenvattingMatch = topicSummary(onderwerp).toLowerCase().includes(query)
                || onderwerp.samenvatting.toLowerCase().includes(query);
            const tagsMatch = onderwerp.tags.some(tag =>
                tag.toLowerCase().includes(query) || tTag(tag).toLowerCase().includes(query)
            );
            return titelMatch || samenvattingMatch || tagsMatch;
        });

        if (results.length > 0) {
            searchResults.classList.add('active');
            searchResults.innerHTML = results.map(onderwerp => `
                <div class="search-result-item" onclick="window.location.hash='${onderwerp.id}'">
                    <h3>${highlightMatch(topicTitle(onderwerp), query)}</h3>
                    <p>${highlightMatch(topicSummary(onderwerp), query)}</p>
                    <p><small>${escapeHtml(t('tagsLabel'))}: ${onderwerp.tags.map(tag => tTag(tag)).join(', ')}</small></p>
                </div>
            `).join('');
        } else {
            searchResults.classList.add('active');
            searchResults.innerHTML = `<p>${escapeHtml(t('noResults'))}</p>`;
        }
    });
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// === Lettergrootte ===

function initFontSize() {
    const saved = localStorage.getItem('fontsize') || 'medium';

    function setSize(size) {
        document.documentElement.setAttribute('data-fontsize', size);
        localStorage.setItem('fontsize', size);
        document.querySelectorAll('.font-size-btn').forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.size === size);
        });
    }

    document.querySelectorAll('.font-size-btn').forEach(btn => {
        btn.addEventListener('click', () => setSize(btn.dataset.size));
    });

    setSize(saved);
}

// === Taalwissel ===

function applyStaticTexts() {
    document.title = t('pageTitle');
    const siteTitle = document.querySelector('header h1');
    if (siteTitle) siteTitle.textContent = t('siteTitle');
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) subtitle.textContent = t('subtitle');
    const navHeading = document.querySelector('#main-nav h2');
    if (navHeading) navHeading.textContent = t('navHeading');
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = t('searchPlaceholder');
    const fontControls = document.querySelector('.font-size-controls');
    if (fontControls) fontControls.setAttribute('aria-label', t('fontSizeLabel'));
    const fontBtns = document.querySelectorAll('.font-size-btn');
    const fontTitles = [t('fontSizeSmall'), t('fontSizeMedium'), t('fontSizeLarge')];
    fontBtns.forEach((btn, i) => { btn.title = fontTitles[i]; });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    // Update taalknop actieve staat
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    applyStaticTexts();

    // Herbouw navigatie
    buildNav();
    initNavGroups();

    // Herlaad huidig topic of welcome
    const hash = window.location.hash.slice(1);
    const onderwerp = hash ? onderwerpen.find(o => o.id === hash) : null;
    if (onderwerp) {
        renderOnderwerp(onderwerp);
        updateActiveNav(onderwerp.id);
    } else {
        renderWelcome();
        updateActiveNav(null);
    }
}

function initLang() {
    const saved = localStorage.getItem('lang') || 'nl';
    currentLang = saved;
    document.documentElement.setAttribute('lang', saved);
    document.documentElement.setAttribute('data-lang', saved);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.lang === saved);
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    applyStaticTexts();
}

// === Init ===

document.addEventListener('DOMContentLoaded', () => {
    initLang();
    buildNav();
    initNavGroups();
    initRouter();
    initSearch();
    initFontSize();
});
