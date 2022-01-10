---
page: true
---

<section id="hero">
  <img class="hero-logo" src="/logo-lg.svg" />

  <h1 class="tagline">
    Gitart Vue <span class="accent">Dialog</span><br>
  </h1>
  <p class="description">
    Beautiful dialogs (Vue 3 only)
  </p>

  <p class="actions">
    <a class="btn btn--primary get-started" href="/guide/introduction.html">Get Started <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg></a>
    <a class="btn ml-4" href="/guide/quick-start.html">Install</a>
  </p>
  <p class="pt-8">
    <span class="block mb-3 text-gray-500">
      See examples:
    </span>
    <a class="btn ml-4" href="/examples/">Editable</a>
    <a class="btn ml-4" href="https://michaelgitart.github.io/gitart-vue-dialog/">Advanced</a>
  </p>
</section>

<section id="highlights" class="vt-box-container">
  <div class="vt-box">
    <h3>Customizable</h3>
    <p>Stylize your dialogues as you wish. By default, there is only a frame to minimize the size of the package.</p>
  </div>
  <div class="vt-box">
    <h3>Launch Programmatically</h3>
    <p>Run your dialogs from any method without inserting them into the template.</p>
  </div>
  <div class="vt-box">
    <h3>Typescript Support</h3>
    <p>Take full advantage of typescript.</p>
  </div>
</section>

<style scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.hero-logo {
  margin: 0 auto 20px;
  width: 220px;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent, .dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.actions a {
  /* font-size: 16px; */
  /* display: inline-block; */
  /* background-color: var(--vt-c-bg-mute); */
  /* padding: 8px 18px; */
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
}

.actions .get-started {
  /* font-weight: 600; */
  /* background-color: var(--vt-c-green); */
  /* color: #fff; */
  /* margin-right: 18px */
}

.actions .icon {
  display: inline;
  position: relative;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover {
  background-color: var(--vt-c-green-dark);
  transition-duration: 0.2s;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

#special-sponsor {
  border-top: 1px solid var(--vt-c-divider-light);
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 12px 24px;
  text-align: center;
}

#special-sponsor span {
  color: var(--vt-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  margin: 0 24px;
}

#special-sponsor img {
  display: inline-block;
  vertical-align: middle;
  height: 36px;
}

.dark #special-sponsor img {
  filter: grayscale(1) invert(1);
}

#highlights {
  max-width: 960px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

#highlights h3 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

@media (max-width: 960px) {
  .hero-logo {
    width: 180px;
    max-width: 50%;
  }
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }
  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 64px 32px;
  }
  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }
  #special-sponsor img {
    display: block;
    margin: 2px auto 1px;
  }
  #highlights h3 {
    margin-bottom: 0.6em;
  }
  #highlights .vt-box {
    padding: 20px 36px;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
