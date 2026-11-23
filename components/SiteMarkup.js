/* Static markup of the page. Texts are filled in by lib/aviora.js according to the chosen language (data-i keys). */
export default function SiteMarkup() {
  return (
    <>
      <a className="skip" href="#main" data-i="skip">Skip to content</a>
      
      <svg width="0" height="0" style={{position: "absolute"}} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="gold" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#A9916D" /><stop offset="1" stopColor="#E4C98F" /></linearGradient>
          <symbol id="mark" viewBox="0 0 110 100">
            <path d="M50 6 L47.2 6 L13 92 L16.6 92 Z" fill="currentColor" />
            <path d="M50 6 L55.5 6 L84 79 Q86 88 94 92 L76 92 Q71 90 69 83 Z" fill="currentColor" />
            <path d="M5 92 C30 91 56 68 90 56 L91 58.5 C58 75 34 91 5 92 Z" fill="url(#gold)" />
            <path d="M98 40 L99.8 52 L111 54 L99.8 56 L98 68 L96.2 56 L85 54 L96.2 52 Z" fill="url(#gold)" transform="translate(-4 -2) scale(.94)" />
          </symbol>
          <symbol id="fl-en" viewBox="0 0 18 18"><rect width="18" height="18" fill="#B22234" /><rect y="2.57" width="18" height="2.57" fill="#fff" /><rect y="7.71" width="18" height="2.57" fill="#fff" /><rect y="12.86" width="18" height="2.57" fill="#fff" /><rect width="8.2" height="9.9" fill="#3C3B6E" /></symbol>
          <symbol id="fl-es" viewBox="0 0 18 18"><rect width="18" height="18" fill="#C60B1E" /><rect y="4.5" width="18" height="9" fill="#FFC400" /></symbol>
          <symbol id="fl-fr" viewBox="0 0 18 18"><rect width="18" height="18" fill="#fff" /><rect width="6" height="18" fill="#002654" /><rect x="12" width="6" height="18" fill="#ED2939" /></symbol>
          <symbol id="fl-de" viewBox="0 0 18 18"><rect width="18" height="6" fill="#000" /><rect y="6" width="18" height="6" fill="#DD0000" /><rect y="12" width="18" height="6" fill="#FFCE00" /></symbol>
          <symbol id="fl-it" viewBox="0 0 18 18"><rect width="18" height="18" fill="#fff" /><rect width="6" height="18" fill="#009246" /><rect x="12" width="6" height="18" fill="#CE2B37" /></symbol>
          <symbol id="fl-ja" viewBox="0 0 18 18"><rect width="18" height="18" fill="#fff" /><circle cx="9" cy="9" r="4.4" fill="#BC002D" /></symbol>
          <symbol id="fl-zh" viewBox="0 0 18 18"><rect width="18" height="18" fill="#DE2910" /><path d="M4.6 2.6l.9 2.7h2.8L6 6.9l.9 2.700L4.600 8 2.300 9.600l.9-2.700L.9 5.300h2.800z" fill="#FFDE00" /></symbol>
          <symbol id="fl-ko" viewBox="0 0 18 18"><rect width="18" height="18" fill="#fff" /><circle cx="9" cy="9" r="4.5" fill="#003478" /><path d="M4.5 9a4.5 4.5 0 0 1 9 0a2.25 2.25 0 0 1-4.5 0a2.25 2.25 0 0 0-4.5 0z" fill="#CD2E3A" /></symbol>
          <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M3 12h17M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
          <symbol id="i-arrow-l" viewBox="0 0 24 24"><path d="M21 12H4M10 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
          <symbol id="i-x" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
          <symbol id="i-wa" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M8.8 8.6c.3 2.8 2.7 5.4 5.6 6.2l1.3-1.2-1.9-1-.9.7c-.9-.4-1.6-1.2-2-2l.7-.9-1-1.9z" fill="currentColor" /></symbol>
          <symbol id="i-cal" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M4 10h16M9 3v4M15 3v4" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
          <symbol id="i-ph" viewBox="0 0 24 24"><path d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 6 6L16 13.500 20 15v3a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
        </defs>
      </svg>
      
      <div className="cur-dot" aria-hidden="true"></div>
      <div className="cur-ring" aria-hidden="true"><span className="cur-label"></span></div>
      
      <header className="hdr" id="hdr">
        <a className="logo" href="#home" aria-label="AVIORA"><svg aria-hidden="true"><use href="#mark" /></svg><b>AVIORA</b></a>
        <nav className="nav" id="nav" data-ia="aria.nav" aria-label="Main">
          <a href="#destinations" data-i="nav.dest">Destinations</a>
          <a href="#experiences" data-i="nav.exp">Experiences</a>
          <a href="#bespoke" data-i="nav.bespoke">Bespoke Journeys</a>
          <a href="#celebrations" data-i="nav.cel">Celebrations</a>
          <a href="#story" data-i="nav.story">Our Story</a>
        </nav>
        <div className="hdr-r">
          <div className="lang" id="lang">
            <button className="lang-btn" id="langBtn" aria-haspopup="listbox" aria-expanded="false" aria-controls="langMenu" data-ia="lang.label">
              <svg className="flag" id="langFlag" aria-hidden="true"><use href="#fl-en" /></svg><span id="langCode">EN</span>
              <svg className="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            </button>
            <div className="lang-menu" id="langMenu" role="listbox" data-ia="lang.label">
              <button role="option" data-lang="en"><svg className="flag" aria-hidden="true"><use href="#fl-en" /></svg>English</button>
              <button role="option" data-lang="es"><svg className="flag" aria-hidden="true"><use href="#fl-es" /></svg>Español</button>
              <button role="option" data-lang="fr"><svg className="flag" aria-hidden="true"><use href="#fl-fr" /></svg>Français</button>
              <button role="option" data-lang="de"><svg className="flag" aria-hidden="true"><use href="#fl-de" /></svg>Deutsch</button>
              <button role="option" data-lang="it"><svg className="flag" aria-hidden="true"><use href="#fl-it" /></svg>Italiano</button>
              
              <button role="option" data-lang="zh"><svg className="flag" aria-hidden="true"><use href="#fl-zh" /></svg>简体中文</button>
              
            </div>
          </div>
          <a className="btn btn-sm" href="#plan" data-i="nav.plan">Plan Your Journey</a>
          <button className="burger" id="burger" aria-label="Menu" aria-expanded="false" data-ia="nav.menu"><i></i><i></i></button>
        </div>
      </header>
      
      <div className="mnav" id="mnav" aria-hidden="true">
        <nav>
          <a href="#destinations" data-i="nav.dest">Destinations</a>
          <a href="#experiences" data-i="nav.expFull">Signature Experiences</a>
          <a href="#bespoke" data-i="nav.bespoke">Bespoke Journeys</a>
          <a href="#celebrations" data-i="nav.celFull">Celebrations &amp; Escapes</a>
          <a href="#story" data-i="nav.story">Our Story</a>
          <a href="#plan" data-i="nav.plan">Plan Your Journey</a>
        </nav>
        <div className="mnav-lang" id="mnavLang">
          <button data-lang="en"><svg className="flag" aria-hidden="true"><use href="#fl-en" /></svg>EN</button>
          <button data-lang="es"><svg className="flag" aria-hidden="true"><use href="#fl-es" /></svg>ES</button>
          <button data-lang="fr"><svg className="flag" aria-hidden="true"><use href="#fl-fr" /></svg>FR</button>
          <button data-lang="de"><svg className="flag" aria-hidden="true"><use href="#fl-de" /></svg>DE</button>
          <button data-lang="it"><svg className="flag" aria-hidden="true"><use href="#fl-it" /></svg>IT</button>
          
          <button data-lang="zh"><svg className="flag" aria-hidden="true"><use href="#fl-zh" /></svg>ZH</button>
          
        </div>
      </div>
      
      <main id="main">
      
        {/* HOME / HERO */}
        <section id="home" className="hero-pin" aria-label="AVIORA">
          <div className="hero-stage">
            <div className="hero-media" id="heroMedia">
              <div className="kb"><img data-img="pool" alt="" fetchPriority="high" /></div>
              <div className="hero-shade"></div>
            </div>
            <div className="hero-copy">
              <h1 data-i="hero.title">The Art of Extraordinary Travel</h1>
              <p data-i="hero.sub">Exceptional destinations. Meaningful experiences. Journeys beautifully designed around you.</p>
              <div className="hero-cta">
                <a className="btn btn-solid" href="#plan" data-i="hero.cta1">Plan your journey</a>
                <a className="btn btn-line" href="#destinations" data-i="hero.cta2">Explore destinations</a>
              </div>
            </div>
            <div className="scrollhint" aria-hidden="true"><span data-i="hero.scroll">Scroll</span><i></i></div>
          </div>
          <div className="manifesto">
            <h2 data-i="man.title">Beyond travel. Into extraordinary experiences.</h2>
            <p data-i="man.text"></p>
          </div>
        </section>
      
        {/* WELCOME */}
        <section className="sec" id="welcome">
          <div className="wrap welcome-grid">
            <div data-reveal>
              <p className="lead" data-i="intro.text"></p>
            </div>
            <div className="stats" data-reveal>
              <div className="stat"><b className="count" data-n="4">0</b><span data-i="c.regions"></span></div>
              <div className="stat"><b className="count" data-n="7">0</b><span data-i="c.collections"></span></div>
              <div className="stat"><b className="count" data-n="5">0</b><span data-i="c.worlds"></span></div>
              <div className="stat"><b className="count" data-n="6">0</b><span data-i="c.langs"></span></div>
            </div>
          </div>
        </section>
      
        {/* PHILOSOPHY */}
        <section className="phil" aria-labelledby="philT">
          <div className="px-wrap" data-px><img data-img="villa" alt="" /></div>
          <div className="wrap">
            <h2 id="philT" data-i="phil.title"></h2>
            <p data-i="phil.text"></p>
            <div className="hero-cta">
              <a className="btn btn-solid" href="#destinations" data-i="hero.cta2"></a>
              <a className="btn btn-line" href="#plan" data-i="cta.design"></a>
            </div>
          </div>
        </section>
      
        {/* DESTINATIONS: GUATEMALA */}
        <section className="sec gt" id="destinations">
          <div className="wrap gt-grid">
            <div className="gt-left">
              <div className="gt-head" data-reveal>
                <h2 data-i="gt.title"></h2>
                <p className="body" data-i="gt.text"></p>
              </div>
              <div className="gt-rest">
                <div className="tabs" id="gtTabs" role="group" data-ia="gt.pick"></div>
                <article className="dcard" id="gtCard" aria-live="polite"></article>
              </div>
            </div>
            <div className="gt-map">
              <svg id="gtMap" viewBox="0 0 560 575" role="group" data-ia="gt.map"></svg>
            </div>
          </div>
        </section>
      
        {/* DESTINATIONS: WORLD */}
        <section className="sec world dark" id="world">
          <div className="wrap">
            <div className="world-head" data-reveal>
              <h2 data-i="w.title"></h2>
              <p data-i="w.text"></p>
            </div>
            <div className="chips" id="wChips" role="group" data-ia="w.filter"></div>
            <div className="wmap" id="wmap">
              <svg id="wMap" viewBox="0 0 1000 390" role="group" data-ia="w.map"></svg>
              <article className="dcard w" id="wCard" aria-live="polite"></article>
            </div>
          </div>
        </section>
      
        {/* EXPERIENCES */}
        <section className="sec" id="experiences" style={{paddingBottom: "clamp(60px,8vw,110px)"}}>
          <div className="wrap xp-head" data-reveal>
            <div>
              <h2 data-i="x.title"></h2>
              <p className="body" data-i="x.text"></p>
            </div>
            <div className="arrows">
              <button id="xPrev" data-ia="x.prev"><svg aria-hidden="true"><use href="#i-arrow-l" /></svg></button>
              <button id="xNext" data-ia="x.next"><svg aria-hidden="true"><use href="#i-arrow" /></svg></button>
            </div>
          </div>
          <div className="track" id="track" data-cursor="x.drag"></div>
        </section>
      
        {/* BESPOKE JOURNEYS */}
        <section className="sec bespoke" id="bespoke">
          <div className="wrap bsp-grid">
            <div className="bsp-left">
              <div data-reveal>
                <h2 data-i="b.title"></h2>
                <p className="body" data-i="b.text"></p>
              </div>
              <div className="bsp-frame" id="bspFrame" aria-hidden="true"></div>
            </div>
            <div>
              <div className="tl" id="tl">
                <div className="tl-line"><div className="tl-fill" id="tlFill"></div></div>
                <div className="step" data-img-i="0"><span className="n">01</span><h3 data-i="s1.t"></h3><p data-i="s1.d"></p></div>
                <div className="step" data-img-i="1"><span className="n">02</span><h3 data-i="s2.t"></h3><p data-i="s2.d"></p></div>
                <div className="step" data-img-i="2"><span className="n">03</span><h3 data-i="s3.t"></h3><p data-i="s3.d"></p></div>
                <div className="step" data-img-i="3"><span className="n">04</span><h3 data-i="s4.t"></h3><p data-i="s4.d"></p></div>
              </div>
              <div className="bsp-cta"><a className="btn btn-ink" href="#plan" data-i="cta.design"></a></div>
            </div>
          </div>
        </section>
      
        {/* CELEBRATIONS */}
        <section className="sec" id="celebrations">
          <div className="wrap cel-grid">
            <div className="cel-img">
              <div className="arch a1" data-wipe><img data-img="sunset" alt="" /></div>
              <div className="arch a2" data-wipe><img data-img="candles" alt="" /></div>
            </div>
            <div>
              <div data-reveal>
                <h2 data-i="cel.title"></h2>
                <p className="body" style={{marginTop: "22px"}} data-i="cel.text"></p>
              </div>
              <div className="cel-list">
                <div className="cel-item"><h3 data-i="cel1.t"></h3><p data-i="cel1.d"></p></div>
                <div className="cel-item"><h3 data-i="cel2.t"></h3><p data-i="cel2.d"></p></div>
                <div className="cel-item"><h3 data-i="cel3.t"></h3><p data-i="cel3.d"></p></div>
              </div>
              <div className="cel-cta"><a className="btn btn-ink" href="#plan" data-prefill="celebration" data-i="cel.cta"></a></div>
            </div>
          </div>
        </section>
      
        {/* STORY */}
        <section className="sec dark" id="story">
          <div className="wrap story-grid">
            <div data-reveal>
              <svg className="story-logo" viewBox="0 0 110 100" aria-hidden="true"><use href="#mark" /></svg>
              <h2 data-i="st.title"></h2>
              <p className="body" data-i="st.text"></p>
              <p className="story-close" data-i="st.close"></p>
            </div>
            <div className="arch story-img" data-wipe><img data-img="corridor" alt="" style={{objectPosition: "50% 40%"}} /></div>
          </div>
          <div className="wrap gal">
            <h3 data-i="gal.title" data-reveal></h3>
            <div className="mosaic" id="mosaic"></div>
          </div>
        </section>
      
        {/* PLAN YOUR JOURNEY */}
        <section className="sec plan" id="plan">
          <div className="wrap plan-grid">
            <div className="plan-side">
              <div data-reveal>
                <h2 data-i="p.title"></h2>
                <p className="body" data-i="p.text"></p>
              </div>
              <div className="alt">
                <h4 data-i="c.or"></h4>
                <div className="alt-btns">
                  <button className="btn btn-ghost" id="btnWA" type="button"><svg aria-hidden="true"><use href="#i-wa" /></svg><span data-i="c.wa.t"></span></button>
                  <button className="btn btn-ghost" id="btnCal" type="button"><svg aria-hidden="true"><use href="#i-cal" /></svg><span data-i="c.cal"></span></button>
                  <button className="btn btn-ghost" id="btnCall" type="button" aria-expanded="false" aria-controls="callbox"><svg aria-hidden="true"><use href="#i-ph" /></svg><span data-i="c.call"></span></button>
                </div>
                <div className="callbox" id="callbox">
                  <div className="row">
                    <label className="fld" style={{margin: "0"}}><span className="lbl" data-i="c.call.phone"></span><input type="tel" id="callPhone" autoComplete="tel" inputMode="tel" /></label>
                    <label className="fld" style={{margin: "0"}}><span className="lbl" data-i="c.call.time"></span>
                      <select id="callTime"><option value="am" data-i="t.am"></option><option value="pm" data-i="t.pm"></option><option value="eve" data-i="t.eve"></option></select></label>
                    <button className="btn btn-ink" id="callSend" type="button" data-i="c.call.send"></button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="form" id="form" noValidate>
                <div className="fld"><label htmlFor="fName" data-i="f.name"></label><input id="fName" name="name" autoComplete="name" required /><span className="err" data-err="req"></span></div>
                <div className="fld"><label htmlFor="fEmail" data-i="f.email"></label><input id="fEmail" name="email" type="email" autoComplete="email" required /><span className="err" data-err="email"></span></div>
                <div className="fld"><label htmlFor="fCountry" data-i="f.country"></label><input id="fCountry" name="country" autoComplete="country-name" required /><span className="err" data-err="req"></span></div>
                <div className="fld"><label htmlFor="fPhone" data-i="f.phone"></label><input id="fPhone" name="phone" type="tel" autoComplete="tel" inputMode="tel" /></div>
                <div className="fld"><label htmlFor="fDest" data-i="f.dest"></label><select id="fDest" name="destination"></select></div>
                <div className="fld"><label htmlFor="fDates" data-i="f.dates"></label><input id="fDates" name="dates" data-ip="f.dates.ph" /></div>
                <div className="fld"><span className="lbl" data-i="f.trav"></span>
                  <div className="stepper"><button type="button" id="trM" data-ia="aria.less">−</button><output id="trV" aria-live="polite">2</output><button type="button" id="trP" data-ia="aria.more">+</button></div></div>
                <div className="fld"><span className="lbl" data-i="f.budget"></span><div className="pills" id="fBudget" role="group"></div></div>
                <div className="fld full"><span className="lbl" data-i="f.type"></span><div className="pills" id="fType"></div></div>
                <div className="fld full"><label htmlFor="fMsg" data-i="f.msg"></label><textarea id="fMsg" name="message" data-ip="f.msg.ph"></textarea></div>
                <div className="fld full">
                  <label className="consent"><input type="checkbox" id="fConsent" /><span data-i="f.consent"></span></label>
                  <span className="err" data-err="consent"></span>
                </div>
                <div className="fld full submit-row"><button className="btn btn-ink" type="submit" id="fSubmit" data-i="f.submit"></button></div>
              </form>
              <div className="thanks" id="thanks" tabIndex="-1" role="status">
                <h3 data-i="f.thanks.t"></h3>
                <p data-i="f.thanks"></p>
                <button className="btn btn-ghost" type="button" id="again" data-i="f.again"></button>
              </div>
            </div>
          </div>
          <div className="wrap">
            <div className="faq" id="faq">
              <h3 data-i="faq.title"></h3>
              <details><summary data-i="q1"></summary><p data-i="a1"></p></details>
              <details><summary data-i="q2"></summary><p data-i="a2"></p></details>
              <details><summary data-i="q3"></summary><p data-i="a3"></p></details>
              <details><summary data-i="q4"></summary><p data-i="a4"></p></details>
              <details><summary data-i="q5"></summary><p data-i="a5"></p></details>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="ft">
        <div className="wrap">
          <div className="ft-grid">
            <div>
              <a className="logo" href="#home" aria-label="AVIORA"><svg aria-hidden="true"><use href="#mark" /></svg><b>AVIORA</b></a>
              <p className="t" data-i="ft.tag"></p>
            </div>
            <div>
              <h4 data-i="ft.nav"></h4>
              <ul>
                <li><a href="#destinations" data-i="nav.dest"></a></li>
                <li><a href="#experiences" data-i="nav.expFull"></a></li>
                <li><a href="#bespoke" data-i="nav.bespoke"></a></li>
                <li><a href="#celebrations" data-i="nav.celFull"></a></li>
                <li><a href="#story" data-i="nav.story"></a></li>
                <li><a href="#plan" data-i="nav.plan"></a></li>
              </ul>
            </div>
            <div>
              <h4 data-i="ft.contact"></h4>
              <ul className="muted">
                <li><span data-i="ft.email"></span></li>
                <li><span>WhatsApp · </span><span data-i="ft.phone"></span></li>
                <li><span>Instagram · </span><span data-i="ft.ig"></span></li>
              </ul>
            </div>
          </div>
          <div className="ft-bot">
            <span>© 2026 AVIORA · Luxury Travel &amp; Bespoke Experiences</span>
            <nav><a href="#plan" data-i="ft.priv"></a><a href="#plan" data-i="ft.terms"></a><a href="#plan" data-i="ft.cookie"></a></nav>
          </div>
        </div>
      </footer>
      
      <a className="btn btn-solid fab" id="fab" href="#plan" data-i="nav.plan" style={{background: "var(--esp)", color: "var(--ivory)", borderColor: "var(--champ)"}}>Plan Your Journey</a>
      <button className="totop" id="totop" type="button" data-ia="nav.top" aria-label="Back to top"><svg aria-hidden="true"><use href="#i-arrow" /></svg></button>
      <div className="toast" id="toast" role="status" aria-live="polite"></div>
      
      {/* Immersive experience modal */}
      <div className="xm" id="xm" role="dialog" aria-modal="true" aria-labelledby="xmT" aria-hidden="true">
        <div className="xm-media"><img id="xmImg" alt="" /></div>
        <div className="xm-body" data-lenis-prevent>
          <button className="xm-close" id="xmClose" data-ia="nav.close"><svg aria-hidden="true"><use href="#i-x" /></svg></button>
          <span className="tag" id="xmCount"></span>
          <h3 id="xmT"></h3>
          <p className="body" id="xmD"></p>
          <ul id="xmL"></ul>
          <p className="req" data-i="w.req"></p>
          <div className="xm-actions">
            <a className="btn btn-solid" id="xmCta" href="#plan" data-i="x.cta"></a>
            <div className="xm-nav"><button id="xmPrev" data-ia="x.prev"><svg aria-hidden="true"><use href="#i-arrow-l" /></svg></button><button id="xmNext" data-ia="x.next"><svg aria-hidden="true"><use href="#i-arrow" /></svg></button></div>
          </div>
        </div>
      </div>
      
      {/* Gallery lightbox */}
      <div className="lb" id="lb" role="dialog" aria-modal="true" aria-hidden="true">
        <button className="c" id="lbC" data-ia="nav.close"><svg aria-hidden="true"><use href="#i-x" /></svg></button>
        <button className="p" id="lbP" data-ia="x.prev"><svg aria-hidden="true"><use href="#i-arrow-l" /></svg></button>
        <figure><img id="lbImg" alt="" /><figcaption id="lbCap"></figcaption></figure>
        <button className="n" id="lbN" data-ia="x.next"><svg aria-hidden="true"><use href="#i-arrow" /></svg></button>
      </div>
    </>
  );
}
