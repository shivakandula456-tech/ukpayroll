(function () {
  "use strict";

  var forms = Array.prototype.slice.call(document.querySelectorAll("[data-email-form]"));

  if (!forms.length) {
    return;
  }

  function getLabel(field) {
    var wrapper = field.closest(".form-field");
    var label = wrapper ? wrapper.querySelector("label") : null;
    var text = label ? label.textContent.replace(/\*/g, "").replace(/\s+/g, " ").trim() : field.name;

    return text || field.name;
  }

  function encode(value) {
    return encodeURIComponent(String(value || "").replace(/\r?\n/g, "\r\n"));
  }

  forms.forEach(function (form) {
    var status = form.querySelector("[data-form-status]");
    var fallback = form.querySelector("[data-email-link]");
    var address = form.getAttribute("data-email") || "info@actualpay.co.uk";

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        return;
      }

      var fields = Array.prototype.slice.call(form.elements);
      var lines = [];

      fields.forEach(function (field) {
        if (!field.name || field.type === "submit" || field.type === "button" || field.type === "hidden") {
          return;
        }

        if (field.type === "checkbox" && !field.checked) {
          return;
        }

        var value = field.type === "checkbox" ? "Yes" : String(field.value || "").trim();

        if (!value) {
          return;
        }

        lines.push(getLabel(field) + ": " + value);
      });

      lines.push("");
      lines.push("Sent from: " + document.title);
      lines.push(window.location.href);

      var subject = form.getAttribute("data-subject") || "Website enquiry";
      var href = "mailto:" + address + "?subject=" + encode(subject) + "&body=" + encode(lines.join("\n"));

      if (fallback) {
        fallback.href = href;
        fallback.hidden = false;
      }

      if (status) {
        status.hidden = false;
        status.textContent = "Your email app should open with these details ready to send. Nothing is sent until you press send in your email app. If nothing opens, use the email link below or call 020 3727 5590.";
      }

      window.location.href = href;
    });
  });
})();
