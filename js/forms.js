/* ============ SCTTS — demo form handling (no backend in Phase 1) ============ */

document.addEventListener("DOMContentLoaded", function () {
  var contact = document.getElementById("contact-form");
  if (contact) {
    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("c-name").value.trim() || "there";
      toast("Message sent, " + name + "!", "The transport cell replies within one working day.");
      contact.reset();
    });
  }

  var login = document.getElementById("login-form");
  if (login) {
    login.addEventListener("submit", function (e) {
      e.preventDefault();
      var role = document.getElementById("l-role").value;
      toast("Signed in as " + role, "Dashboards arrive in the next phase — this is a demo login.");
      login.reset();
    });
  }

  /* Bus schedule search filter */
  var search = document.getElementById("route-search");
  if (search) {
    search.addEventListener("input", function () {
      var q = search.value.toLowerCase();
      var found = 0;
      document.querySelectorAll("#schedule-body tr").forEach(function (row) {
        var match = row.textContent.toLowerCase().indexOf(q) !== -1;
        row.style.display = match ? "" : "none";
        if (match) found++;
      });
      var empty = document.getElementById("no-results");
      if (empty) empty.style.display = found ? "none" : "block";
    });
  }
});