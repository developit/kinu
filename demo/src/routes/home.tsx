import '../homepage.css';

export default function Home() {
  return (
    <div class="home">
      {/* ── Navigation ── */}
      <nav class="atelier-nav">
        <div class="atelier-nav-inner">
          <a href="/" class="atelier-logo">Kinu</a>
          <div class="atelier-links">
            <a href="/docs" class="atelier-link is-active">Collections</a>
            <a href="/docs/overview" class="atelier-link">Philosophy</a>
            <a href="/getting-started" class="atelier-link">Atelier</a>
            <a href="/docs/commands" class="atelier-link">Archive</a>
          </div>
          <a href="/getting-started" class="atelier-cta-btn">Get Started</a>
        </div>
      </nav>

      {/* ── Main ── */}
      <main class="atelier-main">

        {/* ── Hero ── */}
        <section class="hero-section">
          <div class="hero-grid">
            <div>
              <h1 class="hero-headline">
                Preact UI toolkit. <br />
                <span class="accent">10x smaller</span> <br />
                than you think.
              </h1>
              <p class="hero-subtitle">
                Intuitive for humans+LLMs. A high-performance architecture wrapped in an editorial shell.
              </p>
            </div>
            <div class="hero-visual">
              <div class="hero-display">
                <div class="hero-display-glow silk-glow" />
                <div class="hero-display-grid earthy-grid" />
                <div class="hero-display-frame">
                  <div class="hero-display-header">
                    <span class="hero-display-label">System: Active</span>
                    <iconify-icon icon="material-symbols:terminal" class="hero-display-icon" />
                  </div>
                  <div class="hero-display-footer">
                    <div class="hero-display-bar">
                      <div class="hero-display-bar-fill" />
                    </div>
                    <span class="hero-display-meta">0.082kb Gzipped Payload</span>
                  </div>
                </div>
              </div>
              <div class="hero-badge">
                <span class="hero-badge-text">Revision 4.02</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Laboratory ── */}
        <section class="lab-section">
          <div class="lab-inner">
            <div class="section-header">
              <span class="section-label">Laboratory</span>
              <h2 class="section-title">The Technical Workspace</h2>
            </div>
            <div class="lab-grid">
              {/* Task orchestrator */}
              <div class="task-card">
                <div class="task-card-header">
                  <h3 class="task-card-title">Task Orchestrator</h3>
                  <div class="task-card-dots">
                    <div class="task-card-dot active" />
                    <div class="task-card-dot inactive" />
                  </div>
                </div>
                <div class="task-list-items">
                  <div class="task-row">
                    <div class="task-row-left">
                      <div class="task-checkbox checked">
                        <div class="task-checkbox-inner" />
                      </div>
                      <span class="task-name">Initialize technical shader pipeline</span>
                    </div>
                    <span class="task-priority high">High</span>
                  </div>
                  <div class="task-row">
                    <div class="task-row-left">
                      <div class="task-checkbox" />
                      <span class="task-name muted">Calibrate silk-layer density</span>
                    </div>
                    <span class="task-priority med">Med</span>
                  </div>
                  <div class="task-row">
                    <div class="task-row-left">
                      <div class="task-checkbox" />
                      <span class="task-name muted">Finalize atelier documentation</span>
                    </div>
                    <span class="task-priority low">Low</span>
                  </div>
                </div>
              </div>

              {/* System parameters */}
              <div class="params-card">
                <h3 class="params-title">System Parameters</h3>
                <div class="params-controls">
                  <div class="param-group">
                    <div class="param-label-row">
                      <span>Atmospheric Blur</span>
                      <span class="param-value">64%</span>
                    </div>
                    <input type="range" class="param-slider" min="0" max="100" value="64" />
                  </div>
                  <div class="param-group">
                    <div class="param-label-row">
                      <span>Data Frequency</span>
                      <span class="param-value">12hz</span>
                    </div>
                    <input type="range" class="param-slider" min="0" max="100" value="32" />
                  </div>
                  <button class="deploy-btn" type="button">Deploy Build</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Architecture ── */}
        <section class="arch-section">
          <div class="arch-inner">
            <div class="arch-text">
              <span class="arch-label">Architecture</span>
              <h2 class="arch-heading">A Clever Facade.</h2>
              <p class="arch-desc">
                Kinu offers the ergonomics of a heavy toolkit with the weight of a whisper.
                Built for high-stakes technical environments where speed is not an option—it is the standard.
              </p>
              <div class="arch-stats">
                <div class="arch-stat">
                  <div class="arch-stat-value">0.3ms</div>
                  <div class="arch-stat-label">Runtime Latency</div>
                </div>
                <div class="arch-stat">
                  <div class="arch-stat-value">No-Dep</div>
                  <div class="arch-stat-label">External Weight</div>
                </div>
              </div>
            </div>
            <div class="arch-visual">
              <div class="arch-image-wrapper">
                <div class="arch-image-bg" />
                <div class="arch-image-overlay" />
                <div class="arch-quote-card">
                  <iconify-icon icon="material-symbols:architecture" class="arch-quote-icon" />
                  <p class="arch-quote-text">
                    "The precision of Kinu allows our engineers to ship with confidence and our designers to dream without constraint."
                  </p>
                  <div class="arch-quote-attribution">
                    Lead Architect, Vertex Corp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section class="features-section">
          <div class="features-grid">
            {/* Large card */}
            <div class="feature-card-large">
              <iconify-icon icon="material-symbols:hub" class="feature-card-large-icon" />
              <h3>Semantic Interoperability</h3>
              <p>Kinu is built to be read by both humans and LLMs, ensuring your codebase remains future-proof in the age of AI-assisted development.</p>
            </div>
            {/* Primary accent card */}
            <div class="feature-card-primary">
              <iconify-icon icon="material-symbols:bolt" class="feature-card-primary-icon" style="font-variation-settings: 'FILL' 1;" />
              <div>
                <h3>Instant Velocity</h3>
                <p>Deploy sophisticated UI patterns in minutes, not weeks.</p>
              </div>
            </div>
            {/* Bottom cards */}
            <div class="feature-card-sm">
              <h3>01. Modular</h3>
              <p>Extensible core components designed for infinite customization.</p>
            </div>
            <div class="feature-card-sm">
              <h3>02. Accessible</h3>
              <p>WAI-ARIA compliance baked into every primitive element.</p>
            </div>
            <div class="feature-card-sm">
              <h3>03. Performant</h3>
              <p>Optimized VDOM diffing for buttery smooth 60fps animations.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer class="atelier-footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">Kinu</div>
            <p class="footer-tagline">
              Engineering the digital atelier. <br /> Precise. Silent. Performance-first.
            </p>
          </div>
          <div class="footer-column">
            <h4>Craft</h4>
            <a href="/docs/overview">Philosophy</a>
            <a href="/docs">Documentation</a>
            <a href="https://github.com/nicehash-developit/kinu">Community</a>
          </div>
          <div class="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div class="footer-newsletter">
            <h4>Newsletter</h4>
            <div class="footer-input-wrapper">
              <input type="email" class="footer-email-input" placeholder="Email Address" />
              <button class="footer-submit-btn" type="button" aria-label="Subscribe">
                <iconify-icon icon="material-symbols:arrow-forward" />
              </button>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">&copy; 2024 Kinu Technical Atelier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
