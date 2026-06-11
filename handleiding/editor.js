/**
 * three.js Live Editor Module
 * Gebaseerd op de p5.js editor van de Cursus-site, aangepast voor three.js.
 * Code in <script type="text/three"> is ES-module code: import * as THREE from 'three'
 * De importmap wijst naar de lokale clone in ../three.js/ (shallow clone van mrdoob/three.js).
 */

(function() {
    'use strict';

    // Relatief t.o.v. de handleiding-pagina; srcdoc-iframes erven de base-URL van de pagina.
    const THREE_IMPORTMAP = {
        imports: {
            "three": "../three.js/build/three.module.js",
            "three/addons/": "../three.js/examples/jsm/"
        }
    };

    const editors = new Map();

    function createEditor(container, options = {}) {
        const editorId = 'editor-' + Math.random().toString(36).substr(2, 9);

        const config = {
            code: options.code || '',
            autorun: options.autorun !== false,
            ...options
        };

        const scriptTag = container.querySelector('script[type="text/three"]');
        if (scriptTag && !config.code) {
            config.code = scriptTag.textContent.trim();
        }

        if (container.dataset.code && !config.code) {
            config.code = container.dataset.code;
        }
        if (container.dataset.autorun !== undefined) {
            config.autorun = container.dataset.autorun === 'true';
        }

        container.innerHTML = `
            <div class="p5-editor-container">
                <div class="p5-editor-controls">
                    <div class="p5-editor-brand" aria-hidden="true">
                        <i class="bi bi-box"></i>
                        <span>three.js</span>
                    </div>
                    <div class="p5-editor-actions">
                        <button class="p5-editor-btn p5-editor-btn--primary p5-editor-run" data-action="run" title="Run">
                            <i class="bi bi-play-fill" aria-hidden="true"></i>
                            <span>Run</span>
                        </button>
                        <button class="p5-editor-btn p5-editor-reset" data-action="reset" title="Reset">
                            <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
                            <span>Reset</span>
                        </button>
                    </div>
                </div>
                <div class="p5-editor-split">
                    <div class="p5-editor-code-panel">
                        <textarea class="p5-editor-code" id="${editorId}-code" spellcheck="false">${escapeHtml(config.code)}</textarea>
                    </div>
                    <div class="p5-editor-preview-panel">
                        <iframe class="p5-editor-preview" id="${editorId}-preview"></iframe>
                    </div>
                </div>
                <div class="p5-editor-footer">Draait op three.js - lokale build</div>
            </div>
        `;

        if (scriptTag) {
            scriptTag.remove();
        }

        const codeTextarea = container.querySelector(`#${editorId}-code`);
        const previewIframe = container.querySelector(`#${editorId}-preview`);
        const runBtn = container.querySelector('[data-action="run"]');
        const resetBtn = container.querySelector('[data-action="reset"]');

        const originalCode = config.code;

        // CodeMirror op de textarea, als de bibliotheek geladen is.
        // Valt stil terug op de gewone textarea als de CDN niet bereikbaar is.
        let cm = null;
        if (window.CodeMirror) {
            cm = window.CodeMirror.fromTextArea(codeTextarea, {
                mode: 'javascript',
                lineNumbers: true,
                tabSize: 2,
                indentUnit: 2,
                matchBrackets: true,
                autoCloseBrackets: true,
                lineWrapping: false
            });
        }

        function getCode() {
            return cm ? cm.getValue() : codeTextarea.value;
        }

        function setCode(code) {
            if (cm) {
                cm.setValue(code);
            } else {
                codeTextarea.value = code;
            }
        }

        function runSketch() {
            const code = getCode();

            const html = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<style>
body { margin: 0; padding: 0; overflow: hidden; background: #ffffff; }
/* schaal het canvas mee met het paneel; !important verslaat de inline hoogte */
canvas { max-width: 100%; height: auto !important; }
#three-error { display: none; padding: 16px; font-family: monospace; font-size: 13px; color: #e74c3c; white-space: pre-wrap; }
</style>
<script type="importmap">${JSON.stringify(THREE_IMPORTMAP)}<\/script>
</head>
<body>
<div id="three-error"></div>
<script>
// Module-fouten opvangen en tonen (try/catch werkt niet rond top-level imports)
window.addEventListener('error', function(event) {
    var el = document.getElementById('three-error');
    el.style.display = 'block';
    el.textContent = 'Fout: ' + (event.message || event.error || 'onbekende fout');
});
window.addEventListener('unhandledrejection', function(event) {
    var el = document.getElementById('three-error');
    el.style.display = 'block';
    el.textContent = 'Fout: ' + (event.reason && event.reason.message ? event.reason.message : event.reason);
});
<\/script>
<script type="module">
${code.replace(/<\/script>/gi, '<\\/script>')}
<\/script>
</body>
</html>`;

            try {
                previewIframe.srcdoc = html;
            } catch (error) {
                console.error('Fout bij laden van preview:', error);
            }
        }

        runBtn.addEventListener('click', runSketch);

        resetBtn.addEventListener('click', () => {
            setCode(originalCode);
            runSketch();
        });

        if (config.autorun && originalCode) {
            runSketch();
        }

        editors.set(editorId, {
            container,
            codeTextarea,
            codemirror: cm,
            previewIframe,
            originalCode,
            runSketch
        });

        return editorId;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function initEditors() {
        const editorContainers = document.querySelectorAll('.three-editor');
        editorContainers.forEach(container => {
            if (container.querySelector('.p5-editor-container')) {
                return;
            }
            createEditor(container, {
                code: container.dataset.code || '',
                autorun: container.dataset.autorun !== 'false'
            });
        });
    }

    window.ThreeEditor = {
        init: initEditors,
        create: createEditor,
        editors: editors
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEditors);
    } else {
        initEditors();
    }

    // Herinitialiseer wanneer de SPA nieuwe content laadt
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('three-editor')) {
                            initEditors();
                        } else if (node.querySelectorAll) {
                            if (node.querySelectorAll('.three-editor').length > 0) {
                                initEditors();
                            }
                        }
                    }
                });
            }
        });
    });

    const contentArea = document.getElementById('content');
    if (contentArea) {
        observer.observe(contentArea, {
            childList: true,
            subtree: true
        });
    }
})();
