// 1. Select Elements
const grid = document.getElementById('glossary-grid');
const input = document.getElementById('search-input');
let typingTimer; // Timer for debounce (don't search while typing fast)

// 2. Render Function (Local Data)
function renderCards(data) {
    grid.innerHTML = ''; // Clear grid

    if (data.length === 0) {
        // Don't show "Not Found" yet, wait for Wikipedia check
        return; 
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'term-card';
        card.innerHTML = `
            <h3 class="term-title">${item.term}</h3>
            <p class="term-def">${item.def}</p>
            <span class="term-tag">${item.tag || 'Web'}</span>
        `;
        grid.appendChild(card);
    });
}

// 3. Wikipedia Search Function (The Web Lookup)
async function searchWikipedia(term) {
    // Show loading state
    grid.innerHTML = `<p style="color: #0f0; font-family: 'VT323';">Scanning the web for "${term}"...</p>`;

    try {
        // Use Wikipedia's Summary API
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Not found');

        const data = await response.json();

        // Filter out "Not found" or generic pages
        if (data.type === 'standard') {
            const card = document.createElement('div');
            card.className = 'term-card';
            // Add a special border style for web results
            card.style.borderColor = '#00bcd4'; 
            
            card.innerHTML = `
                <h3 class="term-title">${data.title} <small style="font-size:0.6em">(Wiki)</small></h3>
                <p class="term-def">${data.extract}</p>
                <span class="term-tag" style="background:#00bcd4; color:#000;">World Wide Web</span>
            `;
            grid.innerHTML = ''; // Clear loading text
            grid.appendChild(card);
        } else {
            grid.innerHTML = '<p style="color: #666;">Term not found in database or public records.</p>';
        }

    } catch (error) {
        grid.innerHTML = '<p style="color: #666;">No matching terms found.</p>';
    }
}

// 4. Main Filter Logic
function handleSearch(text) {
    const lowerFilter = text.toLowerCase();

    // A. Search Local Database First
    const localMatches = glossaryData.filter(item => {
        return item.term.toLowerCase().includes(lowerFilter) || 
               item.def.toLowerCase().includes(lowerFilter);
    });

    // B. If we have local matches, show them
    if (localMatches.length > 0) {
        renderCards(localMatches);
    } 
    // C. If input is long enough and NO local matches, ask Wikipedia
    else if (text.length > 3) {
        searchWikipedia(text);
    } 
    // D. If input is empty, show everything
    else if (text.length === 0) {
        renderCards(glossaryData);
    }
    else {
         grid.innerHTML = '<p style="color: #666;">Keep typing...</p>';
    }
}

// 5. Event Listener with "Debounce"
// This waits 500ms after you stop typing to prevent spamming Wikipedia
input.addEventListener('input', (e) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        handleSearch(e.target.value);
    }, 500); // Wait 0.5 seconds
});

// Initial Load
renderCards(glossaryData);