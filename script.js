document.addEventListener('DOMContentLoaded', function () {

  // ─── Mobile Nav Toggle ───
  var toggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      navList.classList.toggle('open');
      var expanded = navList.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // ─── Active nav link highlight ───
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === currentPath) {
      links[i].classList.add('active');
    } else {
      links[i].classList.remove('active');
    }
  }

  // ─── Smooth scroll for anchor links ───
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var j = 0; j < anchorLinks.length; j++) {
    anchorLinks[j].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

});
