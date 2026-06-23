/* Happy Pill — shared interactions */

/* ============================================
   Demo-only client-side auth (localStorage).
   For showcase purposes — NOT real authentication.
   ============================================ */
const Auth = (function () {
  const USERS_KEY = "hp.users.v1";
  const SESSION_KEY = "hp.session.v1";

  const read = (k, fb) => {
    try { return JSON.parse(localStorage.getItem(k)) ?? fb; }
    catch { return fb; }
  };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  function hash(str) {
    // Non-cryptographic hash so the demo doesn't store raw passwords in plaintext.
    // Real apps must hash server-side (bcrypt/argon2).
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
    return (h >>> 0).toString(16);
  }

  function signup({ name, email, password }) {
    const users = read(USERS_KEY, {});
    const key = email.trim().toLowerCase();
    if (users[key]) throw new Error("An account with that email already exists.");
    users[key] = { name: name.trim(), email: key, pw: hash(password), createdAt: Date.now() };
    write(USERS_KEY, users);
    write(SESSION_KEY, { email: key, name: users[key].name });
    return users[key];
  }

  function login({ email, password }) {
    const users = read(USERS_KEY, {});
    const key = email.trim().toLowerCase();
    const user = users[key];
    if (!user || user.pw !== hash(password)) throw new Error("Incorrect email or password.");
    write(SESSION_KEY, { email: key, name: user.name });
    return user;
  }

  function update({ name, email, password }) {
    const session = current();
    if (!session) throw new Error("Not signed in.");
    const users = read(USERS_KEY, {});
    const user = users[session.email];
    if (!user) throw new Error("Account not found.");

    const newKey = email.trim().toLowerCase();
    if (newKey !== user.email) {
      if (users[newKey]) throw new Error("That email is already in use.");
      delete users[user.email];
      user.email = newKey;
    }
    user.name = name.trim();
    if (password) user.pw = hash(password);
    users[newKey] = user;
    write(USERS_KEY, users);
    write(SESSION_KEY, { email: newKey, name: user.name });
    return user;
  }

  function logout() { localStorage.removeItem(SESSION_KEY); }
  function current() { return read(SESSION_KEY, null); }

  return { signup, login, logout, current, update };
})();

/* ---------- Page interactions ---------- */
(function () {
  "use strict";

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // Scrolled state for navbar
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Active nav link
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.endsWith(path)) a.classList.add("active");
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Show/hide based on auth state
  const session = Auth.current();
  document.querySelectorAll("[data-when-signed-in]").forEach((el) => {
    el.classList.toggle("hidden", !session);
  });
  document.querySelectorAll("[data-when-signed-out]").forEach((el) => {
    el.classList.toggle("hidden", !!session);
  });
})();
