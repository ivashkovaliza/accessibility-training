(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  var btnTranscription = document.querySelector(".btn-transcription");
  var transcription = document.querySelector("#transcription-text");
  var changeablePost = document.querySelector("#changeable-post");
  var flag = 1;

  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  btnTranscription.addEventListener("click", function() {
    transcription.classList.toggle("is-active-transcription");
  });

 setInterval(function() {
    changeablePost.textContent = flag % 2 ?  'What is Lorem Ipsum?' : 'Why do we use Ipsum?';
    flag++;
  }, 60000);
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

