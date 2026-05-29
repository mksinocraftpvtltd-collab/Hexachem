/* ============================================================
   HEXACHEM — site behaviour
   Contact details live in   config.js   (HX, OFFICES)
   Certifications & openings live in   content.js   (CERTIFICATIONS, OPENINGS)
   You normally don't need to edit this file.
   ============================================================ */
(function () {
  "use strict";

  var cfg = (typeof HX !== "undefined") ? HX : { display:"", tel:"", wa:"", email:"" };
  var certs = (typeof CERTIFICATIONS !== "undefined") ? CERTIFICATIONS : [];
  var openings = (typeof OPENINGS !== "undefined") ? OPENINGS : [];
  var offices = (typeof OFFICES !== "undefined") ? OFFICES : [];

  var val  = function (id) { var e = document.getElementById(id); return e && e.value.trim() ? e.value.trim() : ""; };
  var line = function (label, v) { return v ? label + ": " + v + "\n" : ""; };
  var setHref = function (id, href) { var e = document.getElementById(id); if (e) e.href = href; };

  var waURL   = function (text)       { return "https://wa.me/" + cfg.wa + "?text=" + encodeURIComponent(text); };
  var mailURL = function (subj, body) { return "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body); };
  var smsURL  = function (text)       { return "sms:" + cfg.tel + "?&body=" + encodeURIComponent(text); };

  /* ---- render certifications (Home + Quality trust bar) ---- */
  function renderCerts() {
    var bar = document.getElementById("certBar"), list = document.getElementById("certList");
    if (!bar || !list) return;
    if (!certs.length) { bar.hidden = true; return; }
    bar.hidden = false;
    list.innerHTML = certs.map(function (c) { return '<span class="cert"><span class="gdot"></span>' + c + "</span>"; }).join("");
  }

  /* ---- render job openings (Careers + Home preview) ---- */
  function roleHTML(o) {
    return '<a class="role" href="contact.html"><div><div class="rt">' + o.title +
           '</div><div class="rl">' + (o.meta || "") + '</div></div><span class="arr">\u2197</span></a>';
  }
  function renderOpenings() {
    var list = document.getElementById("rolesList"), empty = document.getElementById("rolesEmpty");
    if (list) {
      if (openings.length) { list.hidden = false; list.innerHTML = openings.map(roleHTML).join(""); if (empty) empty.hidden = true; }
      else { list.hidden = true; if (empty) empty.hidden = false; }
    }
    var home = document.getElementById("rolesListHome"), homeEmpty = document.getElementById("homeRolesEmpty");
    if (home) {
      if (openings.length) { home.hidden = false; home.innerHTML = openings.slice(0, 4).map(roleHTML).join(""); if (homeEmpty) homeEmpty.hidden = true; }
      else { home.hidden = true; if (homeEmpty) homeEmpty.hidden = false; }
    }
    var cnt = document.getElementById("openCount"); if (cnt) cnt.textContent = openings.length;
  }

  /* ---- render offices (Contact page) ---- */
  function renderOffices() {
    var el = document.getElementById("officeList"), sec = document.getElementById("officeSection");
    if (!el) return;
    if (!offices.length) { if (sec) sec.hidden = true; return; }
    el.innerHTML = offices.map(function (o) {
      return '<div class="office"><div class="oc">' + o.label + '</div><h4>' + o.name +
             '</h4><p>' + (o.lines || []).join("<br>") + "</p></div>";
    }).join("");
  }

  renderCerts(); renderOpenings(); renderOffices();

  /* ---- static contact links (footer + floating button + contact page) ---- */
  var hello = "Hello HEXACHEM, I'd like to make an enquiry.";
  var helloMail = "Hello HEXACHEM,\n\nI'd like to make an enquiry about:\n\n";
  [["waItem", waURL(hello)], ["fWa", waURL(hello)], ["heroWa", waURL(hello)], ["infoWa", waURL(hello)]].forEach(function (p) { setHref(p[0], p[1]); });
  [["telItem", "tel:" + cfg.tel], ["fTel", "tel:" + cfg.tel], ["infoTel", "tel:" + cfg.tel]].forEach(function (p) { setHref(p[0], p[1]); });
  [["mailItem", mailURL("Enquiry — HEXACHEM", helloMail)], ["fMail", mailURL("Enquiry — HEXACHEM", helloMail)]].forEach(function (p) { setHref(p[0], p[1]); });
  var ip = document.getElementById("infoPhone"); if (ip) ip.textContent = cfg.display;
  var bt = document.getElementById("barTel"); if (bt) bt.href = "tel:" + cfg.tel;
  var bp = document.getElementById("barPhone"); if (bp) bp.textContent = cfg.display;
  document.querySelectorAll("[data-mail]").forEach(function (a) { a.href = "mailto:" + cfg.email; a.textContent = cfg.email; });

  /* ---- floating action button ---- */
  var fw = document.getElementById("fabWrap"), fb = document.getElementById("fabBtn");
  if (fb) {
    fb.addEventListener("click", function (e) { e.stopPropagation(); fw.classList.toggle("open"); });
    document.addEventListener("click", function (e) { if (!fw.contains(e.target)) fw.classList.remove("open"); });
  }

  /* ---- quick-enquiry modal ---- */
  var modal = document.getElementById("enqModal"), mClose = document.getElementById("enqClose");
  function openEnq()  { if (modal) { modal.classList.add("open"); if (fw) fw.classList.remove("open"); } }
  function closeEnq() { if (modal) modal.classList.remove("open"); }
  document.querySelectorAll("[data-enquire]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); openEnq(); }); });
  if (mClose) mClose.addEventListener("click", closeEnq);
  if (modal)  modal.addEventListener("click", function (e) { if (e.target === modal) closeEnq(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeEnq(); });

  function modalText() {
    var t = "HEXACHEM enquiry\n\n";
    t += line("Name", val("m_name")); t += line("Company", val("m_company")); t += line("Interest", val("m_topic"));
    var m = val("m_msg"); if (m) t += "\n" + m + "\n";
    return t;
  }
  function refreshModal() { var t = modalText(); setHref("m_wa", waURL(t)); setHref("m_mail", mailURL("Enquiry — HEXACHEM", t)); setHref("m_sms", smsURL(t)); }
  ["m_name", "m_company", "m_topic", "m_msg"].forEach(function (id) { var e = document.getElementById(id); if (e) e.addEventListener("input", refreshModal); });
  refreshModal();

  /* ---- contact-page quote form ---- */
  var qf = document.getElementById("qform");
  if (qf) {
    function quoteText() {
      var t = "HEXACHEM quote request\n\n";
      t += line("Name", (val("f_first") + " " + val("f_last")).trim());
      t += line("Company", val("f_company")); t += line("Email", val("f_email")); t += line("Phone", val("f_phone"));
      t += line("Delivery country", val("f_country")); t += line("Product family", val("f_family"));
      t += line("Grade / CAS", val("f_grade")); t += line("Volume", val("f_volume")); t += line("Packaging", val("f_pack"));
      var d = val("f_details"); if (d) t += "\nDetails:\n" + d + "\n";
      return t;
    }
    function refreshQuote() { var t = quoteText(); setHref("waBtn", waURL(t)); setHref("mailBtn", mailURL("Quote request — HEXACHEM", t)); setHref("smsBtn", smsURL(t)); }
    qf.querySelectorAll("input,select,textarea").forEach(function (el) { el.addEventListener("input", refreshQuote); });
    refreshQuote();
    qf.addEventListener("submit", function (e) {
      e.preventDefault(); refreshQuote();
      var sBlock = document.getElementById("qsend");
      var status = document.getElementById("qstatus");
      var key = (cfg.formKey || "").trim();
      var showCompose = function () { if (sBlock) { sBlock.style.display = "block"; sBlock.scrollIntoView({ behavior: "smooth", block: "center" }); } };

      // honeypot: if filled, silently treat as handled (likely a bot)
      if (val("f_hp")) { if (status) { status.className = "qstatus show ok"; status.textContent = "Thank you — your enquiry has been sent."; } return; }

      // no key configured -> fall back to the WhatsApp/email compose buttons
      if (!key) { showCompose(); return; }

      var name = (val("f_first") + " " + val("f_last")).trim();
      var payload = {
        access_key: key,
        subject: "New quote request — HEXACHEM" + (val("f_company") ? " (" + val("f_company") + ")" : ""),
        from_name: name || "HEXACHEM website",
        replyto: val("f_email"),
        Name: name, Company: val("f_company"), Email: val("f_email"), Phone: val("f_phone"),
        "Delivery country": val("f_country"), "Product family": val("f_family"),
        "Grade / CAS": val("f_grade"), Volume: val("f_volume"), Packaging: val("f_pack"),
        Details: val("f_details")
      };
      if ((cfg.formCC || "").trim()) payload.ccemail = cfg.formCC.trim();
      var btn = qf.querySelector('button[type="submit"]');
      var lbl = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending\u2026"; }
      if (status) { status.className = "qstatus show sending"; status.textContent = "Sending your enquiry\u2026"; }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.success) {
          if (status) { status.className = "qstatus show ok"; status.textContent = "Thank you, " + (val("f_first") || "there") + " \u2014 your enquiry has been sent. We\u2019ll reply within one business day."; }
          if (sBlock) sBlock.style.display = "none";
          qf.reset(); refreshQuote();
        } else { throw new Error((d && d.message) || "send failed"); }
      })
      .catch(function () {
        if (status) { status.className = "qstatus show err"; status.textContent = "We couldn\u2019t send it automatically \u2014 please use the WhatsApp or email buttons below."; }
        showCompose();
      })
      .then(function () { if (btn) { btn.disabled = false; btn.innerHTML = lbl; } });
    });
  }

  /* ---- shared UI ---- */
  var burger = document.getElementById("burger"), nl = document.getElementById("navlinks");
  if (burger) {
    burger.addEventListener("click", function () { nl.classList.toggle("open"); });
    nl.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { nl.classList.remove("open"); }); });
  }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  var cs = document.querySelectorAll(".chip");
  var items = document.querySelectorAll(".pitem");
  var catCount = document.getElementById("catCount");
  function applyFilter(f) {
    var shown = 0;
    items.forEach(function (it) {
      var ok = (f === "all" || it.getAttribute("data-cat") === f);
      it.classList.toggle("hide", !ok);
      if (ok) shown++;
    });
    if (catCount) catCount.textContent = shown + (shown === 1 ? " grade" : " grades") + " shown — a representative sample of 3,200+ in stock";
  }
  cs.forEach(function (c) {
    c.addEventListener("click", function () {
      cs.forEach(function (x) { x.classList.remove("on"); });
      c.classList.add("on");
      applyFilter(c.getAttribute("data-filter") || "all");
    });
  });
  if (items.length) applyFilter("all");
  /* ---- hero stat count-up ---- */
  (function () {
    var nums = document.querySelectorAll(".hero-stats .v");
    if (!nums.length || !("requestAnimationFrame" in window)) return;
    nums.forEach(function (el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^([\d.,]+)(.*)$/);
      if (!m) return;
      var hasComma = m[1].indexOf(",") > -1;
      var dec = (m[1].split(".")[1] || "").length;
      var target = parseFloat(m[1].replace(/,/g, ""));
      var suffix = m[2], start = null, dur = 1200;
      function fmt(n) {
        var s = dec ? n.toFixed(dec) : Math.round(n).toString();
        if (hasComma) s = Number(s).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
        return s + suffix;
      }
      function step(ts) {
        if (!start) start = ts;
        var prog = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - prog, 3);
        el.textContent = fmt(target * eased);
        if (prog < 1) requestAnimationFrame(step);
      }
      el.textContent = fmt(0);
      requestAnimationFrame(step);
    });
  })();
  /* ---- hero cursor parallax ---- */
  (function () {
    var hero = document.querySelector(".hero"), stage = document.querySelector(".hero-stage");
    if (!hero || !stage) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var raf = 0;
    hero.addEventListener("mousemove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        stage.style.setProperty("--px", (x * 26).toFixed(1) + "px");
        stage.style.setProperty("--py", (y * 26).toFixed(1) + "px");
      });
    });
    hero.addEventListener("mouseleave", function () {
      stage.style.setProperty("--px", "0px");
      stage.style.setProperty("--py", "0px");
    });
  })();
  /* ---- legal entity (brand vs registered company) ---- */
  (function () {
    var L = (typeof LEGAL_ENTITY !== "undefined") ? LEGAL_ENTITY : null;
    if (!L) return;
    document.querySelectorAll("[data-legal]").forEach(function (el) {
      var k = el.getAttribute("data-legal");
      if (L[k]) el.textContent = L[k];
    });
  })();
})();
