// Function to get the correct footer path
function getFooterPath() {
    const pathname = window.location.pathname;
    return pathname.includes('/pages/') ? '../footer.html' : '/footer.html';
}

// Fetch and inject the footer content
fetch(getFooterPath())
    .then(response => response.text())
    .then(data => {
        const footerElement = document.createElement('footer'); // Create footer element
        footerElement.innerHTML = data; // Set the fetched HTML as the footer content
        document.body.appendChild(footerElement); // Append the footer to the body
    })
    .catch(error => console.error('Error loading footer:', error));