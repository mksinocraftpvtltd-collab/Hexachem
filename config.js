/* ============================================================
   HEXACHEM — CONTACT INFORMATION
   This is the ONLY file you edit to add, update or modify
   contact details. Save and re-deploy; every page updates.
   ============================================================ */

var HX = {
  display: "+91 96324 10710",        // phone shown to users
  tel:     "+919632410710",          // tel: link  (no spaces, with country code)
  wa:      "919632410710",           // WhatsApp: digits only, country code first, NO "+"
  email:   "business@hexachem.in"    // enquiries inbox
};

/* Office / warehouse locations shown on the Contact page.
   Add, edit or remove entries freely. Leave the array empty []
   to hide the "Where we are" section entirely.
   Each entry: { label, name, lines: [ ... ] }                      */

var OFFICES = [
  {
    label: "Head office",
    name:  "Bengaluru",
    lines: ["Street address", "City, State — PIN", "India"]
  }
  // ,{ label:"Warehouse", name:"City Two", lines:["Address line", "City, State — PIN"] }
];

/* ============================================================
   LEGAL ENTITY  (Phase 1 — interim, per Developer Brief v1.0)
   HEXACHEM is the brand. INDEUR is the registered company.
   This is the SINGLE source for the legal name across the
   footer, Privacy, Terms and Contact legal block.

   >> AFTER the MCA rename to HEXACHEM PERFORMANCE PRIVATE LIMITED,
      change `name` below to the new name. Nothing else moves.
      (CIN stays the same; GSTIN may need a GST update.)
   ============================================================ */
var LEGAL_ENTITY = {
  name:  "INDEUR INNOVATION SERVICES PRIVATE LIMITED",
  brand: "HEXACHEM"
};
