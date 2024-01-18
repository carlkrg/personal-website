document.addEventListener('DOMContentLoaded', function() {
    var panels = document.querySelectorAll('.panel');
    var dots = document.querySelectorAll('.dot');
    var dotTitles = document.querySelectorAll('.dot-title');

    function updateDotsAndTitles() {
        let scroll = window.scrollY + window.innerHeight / 2;
        var activeDotIndex = -1;
        var windowWidth = window.innerWidth;

        panels.forEach(function(panel, index) {
            var panelTop = panel.offsetTop;
            var panelBottom = panelTop + panel.offsetHeight;

            if (scroll >= panelTop && scroll <= panelBottom) {
                activeDotIndex = index;
                document.body.style.backgroundColor = panel.dataset.color;
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        dots.forEach(function(dot, index) {
            var activeColor = dot.dataset.activeColor;
            var inactiveColor = dot.dataset.inactiveColor;

            // Keep the active color for all dots on the home screen for larger screens
            if (activeDotIndex === 0 && windowWidth > 576) {
                dot.style.backgroundColor = activeColor;
            } else {
                dot.style.backgroundColor = (index === activeDotIndex) ? activeColor : inactiveColor;
            }
        });

        dotTitles.forEach(function(dotTitle, index) {
            var activeColor = dots[index].dataset.activeColor;

            // Show titles for all dots on the home screen for larger screens
            if (activeDotIndex === 0 && windowWidth > 576) {
                dotTitle.style.display = 'inline-block';
                dotTitle.style.color = activeColor;
            } else if (index === activeDotIndex && windowWidth > 576) {
                dotTitle.style.display = 'inline-block';
                dotTitle.style.color = activeColor;
            } else {
                dotTitle.style.display = 'none';
            }
        });
    }

    window.addEventListener('scroll', updateDotsAndTitles);
    window.addEventListener('resize', updateDotsAndTitles); // Update titles on window resize as well
    updateDotsAndTitles();

    // Hover effect on dots
    document.querySelectorAll('.dot-nav').forEach(function(dotNav) {
        dotNav.addEventListener('mouseenter', function() {
            var dot = this.querySelector('.dot');
            var dotTitle = this.querySelector('.dot-title');
            var hoverColor = dot.dataset.activeColor;

            // Show the hover color for dots on larger screens
            if (window.innerWidth > 576) {
                dot.style.backgroundColor = hoverColor;
                dotTitle.style.color = hoverColor;
                dotTitle.style.display = 'inline-block';
            }
        });

        dotNav.addEventListener('mouseleave', updateDotsAndTitles);
    });

        // Function to show the cookie banner
        window.cb_showCookieBanner = function() {
            var cookieBanner = document.getElementById('cb-cookie-banner');
            if (cookieBanner) {
                cookieBanner.style.display = 'block';
                localStorage.removeItem('cb_cookieBannerDismissed');
            }
        };
    
        // Event listener for the 'Show Cookie Banner' button
        var showCookieBannerBtn = document.getElementById('show-cookie-banner');
        if (showCookieBannerBtn) {
            showCookieBannerBtn.addEventListener('click', function() {
                window.cb_showCookieBanner();
            });
        }
});

document.addEventListener('DOMContentLoaded', function () {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarTogglerIcon = navbarToggler.querySelector('i');

    navbarToggler.addEventListener('click', function () {
        if (navbarTogglerIcon.classList.contains('fa-bars')) {
            navbarTogglerIcon.classList.remove('fa-bars');
            navbarTogglerIcon.classList.add('fa-xmark');
        } else {
            navbarTogglerIcon.classList.remove('fa-xmark');
            navbarTogglerIcon.classList.add('fa-bars');
        }
    });
});


window.cb_hideCookieBanner = function() {
    document.getElementById('cb-cookie-banner').style.display = 'none';
    localStorage.setItem('cb_cookieBannerDismissed', 'true');
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('cb_cookieBannerDismissed') === 'true') {
      document.getElementById('cb-cookie-banner').style.display = 'none';
    } else {
      document.getElementById('cb-cookie-banner').style.display = 'block';
    }
  });
  