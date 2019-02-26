(function () {
  var tabs = document.querySelectorAll('[role="tab"]');
  var panels = document.querySelectorAll('[role="tabpanel"]');

  var keys = {
    end: 35,
    home: 36,
    left: 37,
    right: 39,
    enter: 13,
    space: 32
  };

  var direction = {
    37: -1,
    39: 1
  };

  for (var i = 0; i < tabs.length; ++i) {
    addListeners(i);
  }

  function addListeners (index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);

    tabs[index].index = index;
  }

  function clickEventListener (event) {
    var tab = event.target.closest('[aria-controls]');
    activateTab(tab);
  }

  function keydownEventListener (event) {
    var key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        focusLastTab();
        break;
      case keys.home:
        event.preventDefault();
        focusFirstTab();
        break;
    }
  }

  function keyupEventListener (event) {
    var key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        switchTabOnArrowPress(event);
        break;
      case keys.enter:
      case keys.space:
        activateTab(event.target);
        break;
    }
  }

  function switchTabOnArrowPress (event) {
    var pressed = event.keyCode;

    if (direction[pressed]) {
      var target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left) {
          focusLastTab();
        }
        else if (pressed === keys.right) {
          focusFirstTab();
        }
      }
    }
  }

  function activateTab (tab) {

    deactivateTabs();

    tab.removeAttribute('tabindex');

    tab.setAttribute('aria-selected', 'true');

    var controls = tab.getAttribute('aria-controls');

    document.getElementById(controls).removeAttribute('hidden');

    tab.focus();
  }

  function deactivateTabs () {
    tabs.forEach( tab => {
      tab.setAttribute('tabindex', '-1');
      tab.setAttribute('aria-selected', 'false');
    });

    panels.forEach( panel => {
      panel.setAttribute('hidden', 'hidden');
    });
  }

  function focusFirstTab () {
    tabs[0].focus();
  }

  function focusLastTab () {
    tabs[tabs.length - 1].focus();
  }
}());