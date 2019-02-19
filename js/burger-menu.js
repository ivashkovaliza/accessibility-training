document.getElementById('burger-menu-btn').addEventListener('click', function(e) {
    var isExpanded = (this.getAttribute('aria-expanded') === 'true');
  
    this.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  });