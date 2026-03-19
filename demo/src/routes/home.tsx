import {Button, ToastContainer, Slider, Checkbox} from 'kinu';
import {Nav} from '../nav';

export default function Home() {
  return (
    <div class="home">
      <ToastContainer />
      <Nav />

      {/* ── Hero Section ── */}
      <section class="hero-section">
        <div class="hero-bg-glow" aria-hidden="true" />
        <div class="hero-inner">
          <h1 class="hero-title">
            Preact UI toolkit.{' '}
            <br />
            <span class="hero-accent">10x smaller</span> than you think.
          </h1>
          <p class="hero-tagline">Intuitive for humans + LLMs</p>
          <div class="hero-desc-wrap">
            <p class="hero-description">
              Kinu: The Japanese word for silk. An ultra-thin, consistent
              layer of styling and ergonomics. Performance as a product
              feature, not an after-thought.
            </p>
          </div>
          <div class="hero-buttons">
            <a href="/getting-started" class="btn-pill btn-dark">
              Start Building
            </a>
            <a href="/docs" class="btn-pill btn-outline-light">
              View Benchmarks
            </a>
          </div>
        </div>

        {/* Fluid Visual Element */}
        <div class="hero-image-wrap">
          <img
            class="hero-image"
            alt="Abstract white silk fabric flowing in air"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD4t96svJh9sUhAPBSpwgVhySABo_of9a7hkkAzjrGPGErQbMDktIxbcOUwwH9E2PQqx7YID--LKqJyt0Fjq8rnU6paqZAlDEYSSrFemSSNFJlmNq5wvyzWrs4rT8wY5AtERHPPAMpX_bHntfkMPHdbBM3_jts83DhK3c2SPLAciU8hP_24GzyQCTV2j6C5SU241SQXWsDCiUiuSqd4cwkJ_IuB1ShAurdjDMM1dc5QYxeq3jCmoWPBxIQPgOol7_saTuowNRxrCnr"
          />
          <div class="hero-image-overlay" aria-hidden="true" />
        </div>
      </section>

      {/* ── Philosophy Section (dark) ── */}
      <section class="philosophy-section">
        <div class="philosophy-grid">
          <div class="philosophy-text">
            <h2 class="philosophy-heading">
              Constraint-Driven<br />Innovation.
            </h2>
            <p class="philosophy-body">
              We believe the best experiences aren't built by adding more,
              but by refining what's essential. Kinu follows the 80/20 rule:
              20% of the primitives solve 80% of the UI challenges.
            </p>
            <div class="philosophy-stats">
              <div class="stat-block">
                <span class="stat-value">0.8kb</span>
                <span class="stat-label">Gzipped Core</span>
              </div>
              <div class="stat-block">
                <span class="stat-value">&lt;1ms</span>
                <span class="stat-label">Time to Interactive</span>
              </div>
            </div>
          </div>
          <div class="philosophy-visual">
            <div class="philosophy-circle">
              <img
                class="philosophy-image"
                alt="Monochromatic macro photography of zen stones"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM7vxr9gXZ17bIJRiUSE1L5XjJ91ZUp5FyBLtqLYWWX8kz_r44cjYiVjAT4F9gjnu5ZF6HowqlIhiXfQn8wcvySJd5I6ZkCluTM5gUAw28tsjRL-W5QxYVrdjMgZ6vrYMG2ZevRbFkkuV5E1Z_EvhlfvrTdRhr6EndESta5sw-R3Ex5vQld6e1l8SIl6azJToqDLZcg5B1WNNgBLpsLWftLWfn-OGebhOKL8mk3vAXnifnFuhkCcauUBJz_gX_6_4dsz5QijfxqXmK"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Frictionless Primitives ── */}
      <section class="primitives-section">
        <div class="primitives-inner">
          <div class="primitives-header">
            <span class="section-eyebrow">The Atelier</span>
            <h2 class="section-heading">Frictionless Primitives</h2>
          </div>
          <div class="primitives-grid">
            {/* Slider Card */}
            <div class="primitive-card">
              <div class="primitive-demo">
                <div class="demo-slider-wrap">
                  <div class="demo-slider-track">
                    <div class="demo-slider-fill" style="width:66%" />
                    <div class="demo-slider-thumb" style="left:66%" />
                  </div>
                  <div class="demo-slider-labels">
                    <span>Intensity</span>
                    <span>68%</span>
                  </div>
                </div>
              </div>
              <h3 class="primitive-title">Fluid Sliders</h3>
              <p class="primitive-desc">
                Sub-pixel precision with zero input lag. Built on native range inputs.
              </p>
            </div>

            {/* Todo Card */}
            <div class="primitive-card">
              <div class="primitive-demo">
                <div class="demo-todo-list">
                  <div class="demo-todo-item done">
                    <div class="demo-todo-check checked">
                      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <span class="demo-todo-text line-through">Initialize workspace</span>
                  </div>
                  <div class="demo-todo-item active">
                    <div class="demo-todo-check checked">
                      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <span class="demo-todo-text bold">Refine layout hierarchy</span>
                  </div>
                  <div class="demo-todo-item">
                    <div class="demo-todo-check" />
                    <span class="demo-todo-text">Deploy to production</span>
                  </div>
                </div>
              </div>
              <h3 class="primitive-title">Optimistic Lists</h3>
              <p class="primitive-desc">
                Instant feedback loops with built-in state synchronization.
              </p>
            </div>

            {/* Buttons Card */}
            <div class="primitive-card">
              <div class="primitive-demo">
                <div class="demo-buttons-stack">
                  <button class="demo-btn-primary" type="button">
                    Primary Action
                  </button>
                  <button class="demo-btn-ghost" type="button">
                    Ghost Variant
                  </button>
                </div>
              </div>
              <h3 class="primitive-title">Tactile Interactions</h3>
              <p class="primitive-desc">
                Carefully tuned spring physics for every click and hover state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HTML as First-Class Citizen ── */}
      <section class="native-section">
        <div class="native-inner">
          <div class="native-header">
            <h2 class="native-heading">
              <em>HTML</em> as a First-Class Citizen
            </h2>
            <p class="native-subhead">
              Kinu doesn't reinvent the wheel; it completes it. We use native
              semantic elements with a thin veneer of elegance.
            </p>
          </div>
          <div class="code-comparison">
            {/* Kinu Code */}
            <div class="code-panel code-panel-light">
              <div class="code-panel-header">
                <span class="code-panel-label primary">Kinu Approach</span>
                <div class="code-panel-dots">
                  <span /><span /><span />
                </div>
              </div>
              <pre class="code-panel-code">{`<Kinu.Button
  variant="fluid"
  size="xl"
  onClick={deploy}
>
  Redefine Everything
</Kinu.Button>

<Kinu.Dialog open={isOpen} onDismiss={close}>
  <Kinu.Header>Confirm Action</Kinu.Header>
</Kinu.Dialog>`}</pre>
            </div>

            {/* Native Output */}
            <div class="code-panel code-panel-dark">
              <div class="code-panel-header">
                <span class="code-panel-label muted">Native Output</span>
                <div class="code-panel-dots dark">
                  <span /><span /><span />
                </div>
              </div>
              <pre class="code-panel-code">{`<button class="kn-btn kn-fluid kn-xl">
  Redefine Everything
</button>

<dialog open class="kn-dialog">
  <header>Confirm Action</header>
</dialog>`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true" />
        <div class="cta-inner">
          <h2 class="cta-heading">Redefine Everything.</h2>
          <p class="cta-body">The web was meant to feel this smooth.</p>
          <div class="cta-buttons">
            <a
              href="https://github.com/nicebui/kinu"
              class="btn-pill btn-white"
            >
              Clone the Repo
            </a>
            <a href="/docs" class="cta-link">
              Read the philosophy
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo">KINU</span>
            <span class="footer-copy">
              &copy; 2024 Kinu Technical Atelier. Constraint-Driven Excellence.
            </span>
          </div>
          <div class="footer-links">
            <a href="#">Twitter</a>
            <a href="https://github.com/nicebui/kinu">GitHub</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
