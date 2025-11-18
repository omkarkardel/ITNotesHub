(function(){
  function applyTheme(t){ 
    document.documentElement.setAttribute('data-theme', t); 
    localStorage.setItem('theme', t); 
    var btn=document.getElementById('themeToggle'); 
    if(btn){ 
      var sunIcon = btn.querySelector('.icon-sun');
      var moonIcon = btn.querySelector('.icon-moon');
      if(t==='dark'){
        if(sunIcon) sunIcon.style.display='none';
        if(moonIcon) moonIcon.style.display='block';
        btn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        if(sunIcon) sunIcon.style.display='block';
        if(moonIcon) moonIcon.style.display='none';
        btn.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  }
  function init(){
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var start = saved || (prefersDark ? 'dark':'light');
    applyTheme(start);
    var btn = document.getElementById('themeToggle');
    if(btn){ btn.addEventListener('click', function(){ var current = document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'; applyTheme(current); }); }
  }
  document.addEventListener('DOMContentLoaded', init);
})();