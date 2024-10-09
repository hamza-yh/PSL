// Function to construct the correct path to navbar.html
function getNavbarPath() {
    // Get the current location's pathname
    const pathname = window.location.pathname;

    // Check if we're in a subdirectory (like /pages/)
    if (pathname.includes('/pages/')) {
        // If in pages directory, return the relative path
        return '../navbar.html';  // Go up one level to reach the root
    } else {
        // If in root, return absolute path
        return '/navbar.html';
    }
}

// Fetch the content of navbar.html and insert it into the navbar div
fetch(getNavbarPath())
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));