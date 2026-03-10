/* ══════════════════════════════════════════
   TravelMate — Auth Utility  (tm-auth.js)
   ══════════════════════════════════════════ */

const TmAuth = (() => {
  const KEY = 'tm_user';

  const getUser  = () => JSON.parse(localStorage.getItem(KEY) || 'null');
  const isLogged = () => !!getUser();

  const login = (name, email, role, avatar) => {
    const user = { name, email, role, avatar: avatar || null, joinedAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    window.location.href = 'index.html';
  };

  /* ── redirect by role if on wrong dashboard ── */
  const guardDashboard = () => {
    const u    = getUser();
    const path = window.location.pathname;
    if (path.includes('travel-mate-dashboard') && u && u.role === 'Guide') {
      window.location.href = 'guide-dashboard.html'; return;
    }
    if (path.includes('guide-dashboard')) {
      if (!u) { window.location.href = 'login.html'; return; }
      if (u.role !== 'Guide') { window.location.href = 'travel-mate-dashboard.html'; }
    }
  };

  /* ── inject auth-aware nav items ── */
  const applyNav = () => {
    document.querySelectorAll('#pointsCounter').forEach(el => {
      el.textContent = (Number(localStorage.getItem('tm_points') || 0)) + ' pts';
    });

    const user = getUser();

    document.querySelectorAll('#navLinks').forEach(ul => {
      /* ── STEP 1: hide ALL hardcoded auth-related li items ── */
      ul.querySelectorAll('li').forEach(li => {
        const a = li.querySelector('a');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        const isAuthLink = href.includes('login.html') ||
                           href.includes('signup.html') ||
                           href.includes('travel-mate-dashboard') ||
                           href.includes('guide-dashboard');
        if (isAuthLink && !li.getAttribute('data-auth')) {
          li.style.display = 'none';
          li.setAttribute('data-auth', 'hidden');
        }
      });

      /* ── STEP 2: remove previously injected dynamic li's ── */
      ul.querySelectorAll('li[data-auth="user"], li[data-auth="guest"]').forEach(li => li.remove());

      if (user) {
        const isGuide  = user.role === 'Guide';
        const dashHref = isGuide ? 'guide-dashboard.html' : 'travel-mate-dashboard.html';
        const avatarSrc = user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=22c55e&color=fff&size=32`;

        /* role pill */
        const rolePill = isGuide
          ? `<span style="background:rgba(245,158,11,.15);color:#d97706;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid rgba(245,158,11,.3);white-space:nowrap;">✦ Guide</span>`
          : `<span style="background:rgba(34,197,94,.15);color:#16a34a;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid rgba(34,197,94,.3);white-space:nowrap;">✦ Traveller</span>`;

        /* Dashboard link li */
        const dashLi = document.createElement('li');
        dashLi.setAttribute('data-auth', 'user');
        dashLi.innerHTML = `<a href="${dashHref}">Dashboard</a>`;
        ul.appendChild(dashLi);

        /* User info + logout li */
        const userLi = document.createElement('li');
        userLi.setAttribute('data-auth', 'user');
        userLi.style.cssText = 'display:flex;align-items:center;gap:8px;';
        userLi.innerHTML = `
          ${rolePill}
          <a href="${dashHref}" style="display:flex;align-items:center;gap:6px;text-decoration:none;">
            <img src="${avatarSrc}" alt="${user.name}"
                 style="width:30px;height:30px;border-radius:50%;object-fit:cover;border:2px solid #22c55e;">
            <span style="font-weight:600;color:#22c55e;font-size:14px;">${user.name.split(' ')[0]}</span>
          </a>
          <a href="#" onclick="TmAuth.logout();return false;"
             style="background:#fee2e2;color:#dc2626;padding:4px 12px;border-radius:20px;
                    font-size:13px;font-weight:600;text-decoration:none;margin-left:4px;white-space:nowrap;">
            Logout
          </a>`;
        ul.appendChild(userLi);

      } else {
        /* not logged in → inject Login & Register */
        ['login.html|Login', 'signup.html|Register'].forEach(pair => {
          const [href, label] = pair.split('|');
          const li = document.createElement('li');
          li.setAttribute('data-auth', 'guest');
          li.innerHTML = `<a href="${href}">${label}</a>`;
          ul.appendChild(li);
        });
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { guardDashboard(); applyNav(); });
  } else {
    guardDashboard(); applyNav();
  }

  return { getUser, isLogged, login, logout, applyNav };
})();