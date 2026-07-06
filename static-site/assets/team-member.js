(function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");
  var member = (window.TEAM_MEMBERS || []).find(function (m) {
    return m.slug === slug;
  });

  var head = document.getElementById("member-head");
  var bioEl = document.getElementById("member-bio");

  if (!member) {
    if (head) head.style.display = "none";
    if (bioEl) bioEl.textContent = "Team member not found.";
    return;
  }

  document.title = member.name + " · NYU Ethical Tech CoLab";

  var photoEl = document.getElementById("member-photo");
  photoEl.src = "../public/team/" + member.photo;
  photoEl.alt = member.name + " headshot";

  document.getElementById("member-name").textContent = member.name;
  document.getElementById("member-role").textContent = member.role;

  var orgEl = document.getElementById("member-org");
  if (member.org) {
    orgEl.textContent = member.org;
    orgEl.style.display = "";
  }

  var linkedinEl = document.getElementById("member-linkedin");
  if (member.linkedin) {
    linkedinEl.href = member.linkedin;
    linkedinEl.style.display = "";
  }

  var bioText = member.bio || "Bio coming soon.";
  bioEl.innerHTML = "";
  bioText.split(/\n\n+/).forEach(function (para) {
    var p = document.createElement("p");
    p.textContent = para;
    bioEl.appendChild(p);
  });
})();
