// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded - Initializing Demolition Taco Bell Site");

    const loadPartials = async () => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (!headerPlaceholder || !footerPlaceholder) {
            console.error("Header or Footer placeholder not found!");
            return;
        }

        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : './';

        try {
            // Fetch Header... (keep existing code)
            const headerRes = await fetch(`${pathPrefix}partials/header.html`);
            if (!headerRes.ok) throw new Error(`Failed to fetch header: ${headerRes.statusText}`);
            const headerHtml = await headerRes.text();
            headerPlaceholder.innerHTML = headerHtml;
            console.log("Header loaded successfully.");

            // Fetch Footer... (keep existing code)
            const footerRes = await fetch(`${pathPrefix}partials/footer.html`);
            if (!footerRes.ok) throw new Error(`Failed to fetch footer: ${footerRes.statusText}`);
            const footerHtml = await footerRes.text();
            footerPlaceholder.innerHTML = footerHtml;
            console.log("Footer loaded successfully.");


            // --- Post-load actions ---

            setActiveNav(); // Keep this
            setCurrentYear(); // Keep this

            // --- NEW: Edgar Friendly Easter Egg Listener ---
            setupEdgarFriendlyTrigger();
            // --- END NEW ---


        } catch (error) {
            console.error("Error loading partials:", error);
            headerPlaceholder.innerHTML = "<p>Error loading header.</p>";
            footerPlaceholder.innerHTML = "<p>Error loading footer.</p>";
        }
    };

    const setActiveNav = () => {
        // ... (keep existing function)
        const navLinks = document.querySelectorAll('#header-placeholder nav a');
        const currentPath = window.location.pathname; // e.g., "/index.html", "/pages/menu.html"

        console.log("Current Path:", currentPath);

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            // Normalize paths (e.g., ensure index.html matches "/")
            const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath + 'index.html' : currentPath;
            const normalizedLinkPath = linkPath.startsWith('/') ? linkPath : '/' + linkPath; // Ensure starts with /

            // Check if the normalized paths match
            // Special case for root index.html
             if ((normalizedLinkPath === '/index.html' && (normalizedCurrentPath === '/' || normalizedCurrentPath === '/index.html')) ||
                (normalizedLinkPath !== '/index.html' && normalizedCurrentPath === normalizedLinkPath)) {
                link.classList.add('active');
                console.log("Active link set for:", linkPath);
            } else {
                link.classList.remove('active');
            }
        });
    };

    const setCurrentYear = () => {
        // ... (keep existing function)
         const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
            console.log("Current year set.");
        } else {
            console.warn("Current year span not found after footer load.");
        }
    };

    // --- NEW: Edgar Friendly Trigger Function ---
    const setupEdgarFriendlyTrigger = () => {
        const edgarLink = document.getElementById('edgar-link');
        if (edgarLink) {
            console.log("Edgar Friendly trigger link found.");
            edgarLink.addEventListener('click', (event) => {
                event.preventDefault(); // Stop link default action
                console.log("Edgar Friendly trigger clicked!");

                // Apply glitch effect
                document.body.classList.add('glitching');

                // Set timeout to remove glitch and redirect
                setTimeout(() => {
                    document.body.classList.remove('glitching');
                    console.log("Redirecting to Edgar's page...");
                    // Use root-relative path for reliability from any page
                    window.location.href = '/pages/edgar.html';
                }, 800); // Adjust timing (milliseconds) as needed for glitch duration
            });
        } else {
            console.warn("Edgar Friendly trigger link (#edgar-link) not found in footer.");
        }
    };
    // --- END NEW ---


    // --- Initialize ---
    loadPartials();

});