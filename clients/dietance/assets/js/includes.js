function loadInclude(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const el = document.getElementById(placeholderId);
            if (el) el.innerHTML = html;
        });
}

loadInclude('assets/includes/topbar.html', 'topbar-placeholder');
loadInclude('assets/includes/navbar.html', 'navbar-placeholder');
loadInclude('assets/includes/footer.html', 'footer-placeholder');