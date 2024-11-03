const tableBody = document.getElementById("keywordTable").getElementsByTagName("tbody")[0];

fetch('content/keywords.de.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load JSON data');
    }
    return response.json();
  })
  .then(jsonData => {
    jsonData.forEach(item => {
        const row = tableBody.insertRow();
        item.forEach((text, index) => {
            const cell = row.insertCell();
            const paragraphs = text.split('\n\n').map(p => `${p}<br /><br />`).join('');
            cell.innerHTML = index===0 ? `<strong>${paragraphs}</strong>` : paragraphs; 
        });
    });
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
  });

function filterTable() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const rows = tableBody.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {
        const firstCell = row.cells[0].textContent.toLowerCase();
        row.style.display = firstCell.startsWith(searchInput) ? "" : "none";
    });
}

document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
});
