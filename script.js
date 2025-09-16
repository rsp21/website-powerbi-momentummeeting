const correctPassword = "710";

// Centralized report sources and metadata
const reports = [
    {
        id: 'inbound',
        title: '📞 Inbound Reports',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiZGI3MTc5ZWYtZGM4ZS00NWZiLTkxZjgtMWYyZjY5Zjk1NDQ2IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=7c1150d819507205e891',
        iframeTitle: 'Momentum Meetings - Inbound'
    },
    {
        id: 'outbound',
        title: '📤 Outbound Reports',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiZGI3MTc5ZWYtZGM4ZS00NWZiLTkxZjgtMWYyZjY5Zjk1NDQ2IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=6646072d92c2c39791ba',
        iframeTitle: 'Momentum Meetings - Outbound'
    },
    {
        id: 'sdr',
        title: '👤 Sales Development Representative',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiZGI3MTc5ZWYtZGM4ZS00NWZiLTkxZjgtMWYyZjY5Zjk1NDQ2IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=42700f3fac1781150674',
        iframeTitle: 'Momentum Meetings - Sales Development Representative'
    },
    {
        id: 'operations',
        title: '🗒️ Operations',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiZGI3MTc5ZWYtZGM4ZS00NWZiLTkxZjgtMWYyZjY5Zjk1NDQ2IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=567f6564fbd10616532f',
        iframeTitle: 'Momentum Meetings - Logistics'
    },
    {
        id: 'warehouse',
        title: '🏭 Warehouse',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiZGI3MTc5ZWYtZGM4ZS00NWZiLTkxZjgtMWYyZjY5Zjk1NDQ2IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=249da8e8b3eb6b69fb8e',
        iframeTitle: 'Warehouse KPI'
    },
    {
        id: 'daily-table',
        title: '🤑 Daily Sales - Table',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiMWM3NDllNzQtYjZlYS00YzE0LTkwYTUtNjcwMjRlMmYxNjk3IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=c2418531722854082d91',
        iframeTitle: 'Sales Live KPI'
    },
    {
        id: 'daily-graph',
        title: '📊 Daily Sales - Graph',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiMWM3NDllNzQtYjZlYS00YzE0LTkwYTUtNjcwMjRlMmYxNjk3IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=2d7485cadfd33af41210',
        iframeTitle: 'Daily Sales - Graph'
    },
    {
        id: 'live-sales',
        title: '❤️ Live Sales',
        src: 'https://app.powerbi.com/view?r=eyJrIjoiMWM3NDllNzQtYjZlYS00YzE0LTkwYTUtNjcwMjRlMmYxNjk3IiwidCI6IjlmNDY1ZDNhLTA5MDgtNDMxYS05ZDdmLTRkNDAwMDAyODRhYSIsImMiOjZ9&pageName=3d11ae15d30754cb9185',
        iframeTitle: 'Sales Live KPI'
    }
];

function buildReports() {
    const grid = document.querySelector('.reports-grid');
    if (!grid) return;

    // Clear existing content (if any)
    grid.innerHTML = '';

    reports.forEach((r, index) => {
        const section = document.createElement('div');
        section.className = 'report-section';

        const title = document.createElement('div');
        title.className = 'report-title';
        title.textContent = r.title;

        const panel = document.createElement('div');
        panel.className = 'report-panel';
        panel.id = `${r.id}-panel`;

        // make the first report active by default
        if (index === 0) {
            panel.classList.add('active');
        }

        const iframe = document.createElement('iframe');
        iframe.title = r.iframeTitle || r.title;
        iframe.src = r.src;
        iframe.allowFullscreen = true;

        panel.appendChild(iframe);
        section.appendChild(title);
        section.appendChild(panel);

        grid.appendChild(section);
    });
}

function showReport(reportType, evt) {
    // Hide all panels on mobile
    const panels = document.querySelectorAll('.report-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
        panel.classList.add('mobile-hidden');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // If there is a matching tab (desktop/mobile tabs), activate it
    const matchingTab = document.querySelector(`.tab[data-report="${reportType}"]`);
    if (matchingTab) matchingTab.classList.add('active');
    if (evt && evt.target && evt.target.classList) evt.target.classList.add('active');

    // Show selected panel
    const selectedPanel = document.getElementById(reportType + '-panel');
    if (selectedPanel) {
        selectedPanel.classList.add('active');
        selectedPanel.classList.remove('mobile-hidden');
    }
}

function handleResize() {
    const isMobile = window.innerWidth <= 767;
    const panels = document.querySelectorAll('.report-panel');

    if (isMobile) {
        // Mobile: show only active panel
        panels.forEach(panel => {
            if (!panel.classList.contains('active')) {
                panel.classList.add('mobile-hidden');
            }
        });
    } else {
        // Desktop: show all panels
        panels.forEach(panel => {
            panel.classList.remove('mobile-hidden');
            panel.classList.add('active');
        });
    }
}

function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (enteredPassword === correctPassword) {
        // Hide login form and show dashboard
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
        document.body.style.background = '#f8f9fa';
        errorMessage.style.display = 'none';
    } else {
        // Show error message
        errorMessage.style.display = 'block';
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

function logout() {
    // Show login form and hide dashboard
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('dashboardContainer').style.display = 'none';
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
}

// Allow Enter key to submit password
document.getElementById('password').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Focus on password input and build reports when page loads
window.onload = function() {
    document.getElementById('password').focus();
    buildReports();
    handleResize(); // Set initial layout
};

// Handle window resize
window.addEventListener('resize', handleResize);