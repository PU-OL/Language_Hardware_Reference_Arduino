// save as process-html.js
// Usage: node process-html.js path/to/file.html

const fs = require('fs');
const { JSDOM } = require('jsdom');

if (process.argv.length < 3) {
  console.error("Usage: node process-html.js path/to/file.html");
  process.exit(1);
}

const filePath = process.argv[2];
const cssLink = '<link rel="stylesheet" href="../designfiles/pdfstyle.css">';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;

  const dom = new JSDOM(data);
  const document = dom.window.document;
  const body = document.body;
  const { Node } = dom.window;

  // --- 1. Stylesheet hinzufügen ---
  const head = document.querySelector('head');
  if (head && !document.querySelector(`link[href="../designfiles/pdfstyle.css"]`)) {
    head.insertAdjacentHTML('beforeend', cssLink);
  }

  // --- 2. <p> + <pre> in Wrapper packen ---
  Array.from(document.querySelectorAll('p')).forEach(p => {
    const next = p.nextElementSibling;
    if (next && next.tagName.toLowerCase() === 'pre') {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      p.parentNode.insertBefore(wrapper, p);
      wrapper.appendChild(p);
      wrapper.appendChild(next);
    }
  });

    // --- 2.5 NOTE-Block-Erkennung ---
  Array.from(document.querySelectorAll('blockquote')).forEach(bq => {
    const firstP = bq.querySelector('p');
    if (firstP && firstP.textContent.trim().startsWith('[!NOTE]')) {
      bq.setAttribute('data-type', 'note');
      // Entferne das [!NOTE]-Tag aus dem Inhalt
      firstP.remove();
    }
  });

  // --- 3. Titelsection vom Beginn bis TOC (blockquote.md-toc) ---
  const toc = document.querySelector('blockquote.md-toc');
  if (toc) {
    const titleSection = document.createElement('div');
    titleSection.className = 'title-section';

    const beforeTOC = [];
    for (let node of Array.from(body.childNodes)) {
      if (node === toc) break;
      beforeTOC.push(node);
    }
    beforeTOC.forEach(n => titleSection.appendChild(n));
    body.insertBefore(titleSection, body.firstChild);
  }

  // --- 4. Section-Erkennung (h1–h4 und <strong:first-child>) ---
  const headings = Array.from(body.querySelectorAll('h1, h2, h3, h4'));
  const strongs = Array.from(body.querySelectorAll('p > strong:first-child'));
  const { DOCUMENT_POSITION_FOLLOWING } = Node;

  const sectionStarts = [...headings, ...strongs]
    .filter(el => !el.closest('.title-section'))
    .sort((a, b) =>
      a.compareDocumentPosition(b) & DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );

  // --- 5. DOM neu aufbauen ---
  const newBody = document.createElement('body');
  let currentIndex = 0;

  const bodyChildren = Array.from(body.childNodes);

  while (currentIndex < bodyChildren.length) {
    const node = bodyChildren[currentIndex];

    // Wenn Node eine Titelsection ist, direkt übernehmen
    if (node.classList && node.classList.contains('title-section')) {
      newBody.appendChild(node);
      currentIndex++;
      continue;
    }

    // Ist der Node ein Section-Start?
    if (sectionStarts.includes(node)) {
      const wrapper = document.createElement('div');
      wrapper.className = 'section-block';

      let n = node;
      while (n && !sectionStarts.includes(n.nextSibling)) {
        const nextNode = n.nextSibling;
        wrapper.appendChild(n);
        n = nextNode;
      }

      // Letztes Element anhängen
      if (n) wrapper.appendChild(n);

      newBody.appendChild(wrapper);
      currentIndex = bodyChildren.indexOf(n) + 1;
    } else {
      // Normale Nodes direkt übernehmen
      newBody.appendChild(node);
      currentIndex++;
    }
  }

  body.replaceWith(newBody);

  // --- 6. Datei überschreiben ---
  fs.writeFile(filePath, dom.serialize(), 'utf8', err => {
    if (err) throw err;
    console.log('✅ HTML successfully processed and DOM safely rebuilt!');
  });
});