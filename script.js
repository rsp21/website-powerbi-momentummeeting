const correctPassword = "710";

function showReport(reportType) {
    // Hide all panels on mobile
    const panels = document.querySelectorAll('.report-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
        panel.classList.add('mobile-hidden');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected panel and activate tab
    const selectedPanel = document.getElementById(reportType + '-panel');
    selectedPanel.classList.add('active');
    selectedPanel.classList.remove('mobile-hidden');
    event.target.classList.add('active');
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

// Focus on password input when page loads
window.onload = function() {
    document.getElementById('password').focus();
    handleResize(); // Set initial layout
};

// Handle window resize
window.addEventListener('resize', handleResize);