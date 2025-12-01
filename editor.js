// 1. Initial Setup
window.onload = function() {
    // Initial Highlight
    updateCode('html');
    updateCode('css');
    updateCode('js');
    // Initial Preview
    updatePreview();
};

// 2. Tab Switching Logic
function switchTab(lang) {
    // Hide all editor groups
    document.querySelectorAll('.editor-group').forEach(el => el.classList.remove('active'));
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    // Show selected
    document.getElementById(lang + '-editor').classList.add('active');
    
    // Find the button that was clicked (using a simple loop or event)
    // For simplicity, we just match text content or index, but here is a query approach:
    const buttons = document.querySelectorAll('.tab-btn');
    if(lang === 'html') buttons[0].classList.add('active');
    if(lang === 'css') buttons[1].classList.add('active');
    if(lang === 'js') buttons[2].classList.add('active');
}

// 3. Sync Input with Prism (The Syntax Highlight Logic)
function updateCode(lang) {
    const input = document.getElementById(lang + '-input');
    const output = document.getElementById(lang + '-highlight');
    
    // Copy text from textarea to Prism code block
    // We replace < and > with entities so HTML doesn't render inside the pre block
    let text = input.value;
    
    // Handle the final newline issue in textareas
    if(text[text.length-1] == "\n") {
        text += " "; 
    }

    output.textContent = text;

    // Trigger Prism to recolor the new text
    Prism.highlightElement(output);
}

// 4. Sync Scroll (So highlighted text moves with textarea)
function syncScroll(lang) {
    const input = document.getElementById(lang + '-input');
    const pre = input.parentElement.querySelector('.pre-layer');
    
    pre.scrollTop = input.scrollTop;
    pre.scrollLeft = input.scrollLeft;
}

// 5. The Live Preview (Iframe)
function updatePreview() {
    const html = document.getElementById('html-input').value;
    const css = `<style>${document.getElementById('css-input').value}</style>`;
    const js = `<script>${document.getElementById('js-input').value}<\/script>`;
    
    const iframe = document.getElementById('live-preview');
    const doc = iframe.contentWindow.document;
    
    doc.open();
    doc.write(html + css + js);
    doc.close();
}