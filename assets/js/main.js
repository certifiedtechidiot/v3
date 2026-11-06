/* Roshani Enterprises, page behaviour.
   Owner settings: fill in whatsapp (country code, no spaces) and the page
   sends enquiries straight to that number. Left empty, WhatsApp opens the
   share sheet so the visitor picks the chat. */
const SITE = {
  whatsapp: "",
  email: ""
};

const html = document.documentElement;
html.classList.remove("no-js");
html.classList.add("js");

/* Menu under 60rem */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

/* Photograph slots: swap a stand-in for the owner's own file, and drop a
   stand-in that fails to load rather than showing a broken frame. */
const slots = {};
document.querySelectorAll("[data-slot]").forEach((img, index) => {
  slots[img.dataset.slot] = img;
  img.addEventListener(
    "error",
    () => {
      img.closest("figure")?.classList.add("is-missing");
      img.remove();
    },
    { once: true }
  );
  img.dataset.slotIndex = String(index);
});

window.hallmarkSlots = (map = {}) => {
  Object.entries(map).forEach(([name, src]) => {
    const img = slots[name];
    if (img && src) img.src = src;
  });
};

/* Enquiry: write the message, then hand it to WhatsApp */
const form = document.getElementById("enquiry-form");
const status = form?.querySelector(".form__status");

const line = (label, value) => (value ? `${label}: ${value}` : null);

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      "Enquiry for Roshani Enterprises",
      line("Name", String(data.get("name") || "").trim()),
      line("Phone", String(data.get("phone") || "").trim()),
      line("Needs", String(data.get("product") || "").trim()),
      line("Area or quantity", String(data.get("area") || "").trim()),
      line("Site", String(data.get("notes") || "").trim())
    ]
      .filter(Boolean)
      .join("\n");

    const base = SITE.whatsapp
      ? `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`
      : "https://wa.me/";

    window.open(`${base}?text=${encodeURIComponent(message)}`, "_blank", "noopener");

    status.textContent = SITE.whatsapp
      ? "WhatsApp opened with your enquiry ready to send."
      : "WhatsApp opened with your enquiry written out. Pick the yard's chat and send it.";
  });
}
