// === three.js Handleiding - motor ===
// Gebaseerd op de p5.js Cursus-site (zelfde opmaak en gedrag), Nederlandstalig.

// Data structuur met alle onderwerpen
const onderwerpen = [
    {
        id: "over-threejs",
        titel: "Over three.js",
        samenvatting: "Wat is three.js, waar komt het vandaan, en wanneer kies je het in plaats van p5.js?",
        tags: ["three.js", "WebGL", "mrdoob", "introductie", "geschiedenis", "p5.js"],
        contentFile: "content/over-threejs.html",
        categorie: "Introductie"
    },
    {
        id: "van-p5-naar-threejs",
        titel: "Van p5.js naar three.js",
        samenvatting: "De vertaaltabel: elk p5-begrip dat je al kent, naast zijn three.js-equivalent.",
        tags: ["p5.js", "vergelijking", "immediate mode", "retained mode", "scene graph", "vertaaltabel"],
        contentFile: "content/van-p5-naar-threejs.html",
        categorie: "Introductie"
    },
    {
        id: "eerste-scene",
        titel: "Je eerste scene",
        samenvatting: "Het vaste ritueel van elke three.js-sketch: scene, camera, renderer en de animatieloop.",
        tags: ["scene", "camera", "renderer", "setAnimationLoop", "PerspectiveCamera", "WebGLRenderer", "basis"],
        contentFile: "content/eerste-scene.html",
        categorie: "Fundamenten"
    },
    {
        id: "geometrie-materiaal",
        titel: "Geometrie + materiaal = mesh",
        samenvatting: "Vormen bouwen uit twee delen: een geometrie (de vorm) en een materiaal (het uiterlijk).",
        tags: ["geometry", "material", "mesh", "BoxGeometry", "SphereGeometry", "MeshStandardMaterial", "MeshBasicMaterial", "kleur"],
        contentFile: "content/geometrie-materiaal.html",
        categorie: "Fundamenten"
    },
    {
        id: "transformaties-groepen",
        titel: "Transformaties & groepen",
        samenvatting: "Position, rotation en scale per object, en Groups als het nieuwe push()/pop().",
        tags: ["position", "rotation", "scale", "Group", "push", "pop", "scene graph", "transformaties"],
        contentFile: "content/transformaties-groepen.html",
        categorie: "Fundamenten"
    },
    {
        id: "licht",
        titel: "Licht",
        samenvatting: "Zonder licht is alles zwart: AmbientLight, DirectionalLight en PointLight.",
        tags: ["licht", "AmbientLight", "DirectionalLight", "PointLight", "lights", "materialen"],
        contentFile: "content/licht.html",
        categorie: "Fundamenten"
    },
    {
        id: "camera",
        titel: "De camera",
        samenvatting: "Zichthoek, lookAt en camera's op rails - plus de orthografische camera zonder perspectief.",
        tags: ["camera", "fov", "lookAt", "PerspectiveCamera", "OrthographicCamera", "perspectief"],
        contentFile: "content/camera.html",
        categorie: "Fundamenten"
    },
    {
        id: "animatie-tijd",
        titel: "Animatie & tijd",
        samenvatting: "De animatieloop, de Timer, en bewegen met sin() en cos() - net als in p5.",
        tags: ["animatie", "Timer", "setAnimationLoop", "sin", "cos", "frameCount", "tijd"],
        contentFile: "content/animatie-tijd.html",
        categorie: "Beweging & interactie"
    },
    {
        id: "orbitcontrols-resize",
        titel: "OrbitControls & venstergrootte",
        samenvatting: "De camera bedienen met de muis, en je scene netjes laten meeschalen met het venster.",
        tags: ["OrbitControls", "orbitControl", "camera", "resize", "addons", "interactie"],
        contentFile: "content/orbitcontrols-resize.html",
        categorie: "Beweging & interactie"
    },
    {
        id: "raycaster-muis",
        titel: "Klikken op 3D-objecten",
        samenvatting: "Met de Raycaster ontdek je welk object onder de muis zit - het 3D-antwoord op mouseX/mouseY.",
        tags: ["Raycaster", "muis", "interactie", "mouseX", "picking", "pointer"],
        contentFile: "content/raycaster-muis.html",
        categorie: "Beweging & interactie"
    },
    {
        id: "schaduwen",
        titel: "Schaduwen",
        samenvatting: "Echte schaduwen in drie schakelaars: renderer, licht en objecten.",
        tags: ["schaduwen", "shadowMap", "castShadow", "receiveShadow", "licht", "realisme"],
        contentFile: "content/schaduwen.html",
        categorie: "Verdieping"
    },
    {
        id: "texturen",
        titel: "Texturen",
        samenvatting: "Afbeeldingen op je 3D-objecten plakken met de TextureLoader.",
        tags: ["texturen", "TextureLoader", "loadImage", "afbeeldingen", "map", "materialen"],
        contentFile: "content/texturen.html",
        categorie: "Verdieping"
    },
    {
        id: "sfeer-fog",
        titel: "Sfeer: fog & achtergrond",
        samenvatting: "Mist, achtergrondkleur en gekleurd licht: drie kleine ingrepen die een wereld maken.",
        tags: ["fog", "mist", "achtergrond", "sfeer", "FogExp2", "kleur"],
        contentFile: "content/sfeer-fog.html",
        categorie: "Verdieping"
    },
    {
        id: "punten-lijnen",
        titel: "Punten & particles",
        samenvatting: "Duizenden deeltjes in één object: Points, BufferGeometry en de needsUpdate-vlag.",
        tags: ["Points", "particles", "deeltjes", "BufferGeometry", "lijnen", "Line", "sterren"],
        contentFile: "content/punten-lijnen.html",
        categorie: "Verdieping"
    },
    {
        id: "text-3d",
        titel: "3D-tekst",
        samenvatting: "Echte letters met diepte via FontLoader en TextGeometry.",
        tags: ["tekst", "TextGeometry", "FontLoader", "typografie", "letters", "fonts"],
        contentFile: "content/text-3d.html",
        categorie: "Verdieping"
    },
    {
        id: "gltf-modellen",
        titel: "3D-modellen laden",
        samenvatting: "Kant-en-klare modellen (glTF) laden met de GLTFLoader, inclusief hun animaties.",
        tags: ["gltf", "GLTFLoader", "modellen", "Blender", "AnimationMixer", "glb", "Sketchfab"],
        contentFile: "content/gltf-modellen.html",
        categorie: "Verdieping"
    },
    {
        id: "shaders",
        titel: "Shaders",
        samenvatting: "Eigen GLSL-materialen met ShaderMaterial en uniforms - vertrouwd terrein voor p5-shader-kenners.",
        tags: ["shaders", "GLSL", "ShaderMaterial", "uniforms", "vertex", "fragment", "GPU"],
        contentFile: "content/shaders.html",
        categorie: "Verdieping"
    },
    {
        id: "performance-debug",
        titel: "Debuggen & snelheid",
        samenvatting: "Helpers, het lil-gui controlepaneel, en de drie regels die je sketch snel houden.",
        tags: ["debug", "helpers", "AxesHelper", "lil-gui", "performance", "InstancedMesh", "dispose"],
        contentFile: "content/performance-debug.html",
        categorie: "Praktijk"
    },
    {
        id: "eigen-project",
        titel: "Je eigen project",
        samenvatting: "Van live editor naar eigen bestand: de complete startcode, een server en versie-vastpinnen.",
        tags: ["project", "boilerplate", "importmap", "server", "setup", "startcode", "Vite"],
        contentFile: "content/eigen-project.html",
        categorie: "Praktijk"
    },
    {
        id: "verder-leren",
        titel: "Verder leren",
        samenvatting: "De officiële manual, honderden voorbeelden in je lokale clone, en waar je hulp vindt.",
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
            <li><a href="#${onderwerp.id}">${onderwerp.titel}</a></li>
        `).join('');

        return `
            <li class="nav-group" data-category="${group.categorie}">
                <button class="nav-group-toggle" type="button" aria-expanded="false" aria-controls="${groupId}">
                    <span class="nav-group-text">${group.categorie}</span>
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

function renderWelcome() {
    const content = document.getElementById('content');

    const leerpadHtml = navCategories.map(categorie => {
        const items = onderwerpen.filter(o => o.categorie === categorie);
        return `
            <section class="welcome-leerpad-groep">
                <h3>${escapeHtml(categorie)}</h3>
                <ol>
                    ${items.map(o => `<li><a href="#${o.id}">${escapeHtml(o.titel)}</a> - ${escapeHtml(o.samenvatting)}</li>`).join('')}
                </ol>
            </section>
        `;
    }).join('');

    content.innerHTML = `
        <div class="welcome">
            <h2>Welkom bij de three.js Handleiding</h2>
            <p>Deze handleiding helpt je stap voor stap 3D creative coding leren met three.js. Alles wat je al weet van p5.js neem je mee: elk onderwerp legt de link met wat je al kent.</p>
            <p>Volg het leerpad hieronder van boven naar onder, of spring naar wat je nodig hebt. De meeste lessen hebben een live editor om direct in te experimenteren, en sluiten af met oefeningen in drie niveaus: <strong>● Nabootsen</strong> (verander één waarde), <strong>●● Variëren</strong> (breid uit) en <strong>●●● Creëren</strong> (bouw iets nieuws).</p>
            ${leerpadHtml}
        </div>
    `;
}

// === Onderwerp renderen ===

async function renderOnderwerp(onderwerp) {
    const content = document.getElementById('content');

    content.innerHTML = `
        <div class="onderwerp-page">
            <h1>${escapeHtml(onderwerp.titel)}</h1>
            <p>Laden...</p>
        </div>
    `;

    try {
        let htmlContent = '';
        const response = await fetch(onderwerp.contentFile);
        if (response.ok) {
            htmlContent = await response.text();
        } else {
            htmlContent = '<p>Content niet gevonden. Maak een HTML bestand aan in de content/ map.</p>';
        }

        const tags = onderwerp.tags || [];
        const tagsSidebarHtml = tags.length > 0 ? `
            <aside class="tags-sidebar">
                <div id="tags-chip-flow" class="tags-chip-flow">
                    ${tags.map(tag => `<button class="tag-btn" type="button" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join('')}
                </div>
                <div id="tag-context" class="tag-context" aria-live="polite"></div>
            </aside>` : '';

        const idx = onderwerpen.indexOf(onderwerp);
        const prev = idx > 0 ? onderwerpen[idx - 1] : null;
        const next = idx >= 0 && idx < onderwerpen.length - 1 ? onderwerpen[idx + 1] : null;
        const prevHtml = prev
            ? `<a class="page-nav-link page-nav-prev" href="#${prev.id}" aria-label="Vorige: ${escapeHtml(prev.titel)}"><i class="bi bi-chevron-left"></i><span class="page-nav-label">Vorige</span><span class="page-nav-title">${escapeHtml(prev.titel)}</span></a>`
            : '<span class="page-nav-spacer"></span>';
        const nextHtml = next
            ? `<a class="page-nav-link page-nav-next" href="#${next.id}" aria-label="Volgende: ${escapeHtml(next.titel)}"><span class="page-nav-title">${escapeHtml(next.titel)}</span><span class="page-nav-label">Volgende</span><i class="bi bi-chevron-right"></i></a>`
            : '<span class="page-nav-spacer"></span>';

        content.innerHTML = `
            <div class="onderwerp-page">
                <h1>${escapeHtml(onderwerp.titel)}</h1>
                <div class="onderwerp-layout">
                    <div class="onderwerp-content">
                        ${htmlContent}
                        <nav class="page-nav" aria-label="Vorige / Volgende">
                            ${prevHtml}
                            ${nextHtml}
                        </nav>
                    </div>
                    ${tagsSidebarHtml}
                </div>
            </div>
        `;

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
                        <h3 class="tag-context-title">${escapeHtml(tag)}</h3>
                        <p class="tag-context-empty">Geen andere onderwerpen met deze tag.</p>
                    `;
                    return;
                }

                tagContextEl.innerHTML = `
                    <h3 class="tag-context-title">Verwant via "${escapeHtml(tag)}"</h3>
                    <ul class="tag-context-list">
                        ${related.map(o => `
                            <li><a href="#${o.id}">${escapeHtml(o.titel)}</a>
                            <p>${escapeHtml(o.samenvatting)}</p></li>
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
                <h1>${escapeHtml(onderwerp.titel)}</h1>
                <p>Er is een fout opgetreden bij het laden van de content.</p>
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
            const titelMatch = onderwerp.titel.toLowerCase().includes(query);
            const samenvattingMatch = onderwerp.samenvatting.toLowerCase().includes(query);
            const tagsMatch = onderwerp.tags.some(tag => tag.toLowerCase().includes(query));
            return titelMatch || samenvattingMatch || tagsMatch;
        });

        if (results.length > 0) {
            searchResults.classList.add('active');
            searchResults.innerHTML = results.map(onderwerp => `
                <div class="search-result-item" onclick="window.location.hash='${onderwerp.id}'">
                    <h3>${highlightMatch(onderwerp.titel, query)}</h3>
                    <p>${highlightMatch(onderwerp.samenvatting, query)}</p>
                    <p><small>Tags: ${onderwerp.tags.join(', ')}</small></p>
                </div>
            `).join('');
        } else {
            searchResults.classList.add('active');
            searchResults.innerHTML = '<p>Geen resultaten gevonden.</p>';
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

// === Init ===

document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    initNavGroups();
    initRouter();
    initSearch();
    initFontSize();
});
