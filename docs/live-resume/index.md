---
title: James Allen - SignalDex
description: A hidden playable monster-battler resume where a tiny local model turns James Allen's work history into battles, evolutions, and proof cards.
robots: noindex,nofollow
hide:
  - navigation
  - toc
  - title
search:
  exclude: true
---

<section class="signal-resume" aria-label="James Allen SignalDex live resume">
  <canvas id="voxel-canvas" aria-hidden="true"></canvas>

  <div class="signal-copy">
    <p class="signal-kicker">KeppyLab / playable resume RPG</p>
    <h2>SignalDex</h2>
    <p>Train your companion through the zones of James Allen's journey. Each battle unlocks proof from the work.</p>
    <div class="signal-tags" aria-label="focus areas">
      <span>AI Product</span>
      <span>Evals</span>
      <span>Post-training</span>
      <span>Agents</span>
      <span>Founder mode</span>
    </div>
  </div>

  <div class="signal-console" aria-label="SignalDex game interface">
    <div class="signal-console-head">
      <div>
        <span>current route</span>
        <strong id="voxel-status">route / meadow</strong>
      </div>
      <button type="button" id="copy-demo-intro">copy intro</button>
    </div>

    <div class="journey-map" aria-label="journey zones">
      <div class="journey-map-title">Journey Trials</div>
      <button type="button" data-prompt="explore Stemuli"><span>01</span>District Arcade</button>
      <button type="button" data-prompt="summon Corider"><span>02</span>Tool Contract Cave</button>
      <button type="button" data-prompt="battle evals regression drift"><span>03</span>Regression Reef</button>
      <button type="button" data-prompt="use startup operator move"><span>04</span>Founder Ferry</button>
      <button type="button" data-prompt="show older engineering work"><span>05</span>Archive Ruins</button>
      <button type="button" data-prompt="final boss ATS"><span>??</span>Flattening Gate</button>
    </div>

    <div class="rpg-sidecar">
      <div class="pet-panel" aria-label="companion state">
        <div class="pet-portrait" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div>
          <p>companion</p>
          <strong id="pet-name">Signal Wyrm</strong>
          <span id="pet-stage">stage 1 / curious hatchling</span>
        </div>
      </div>

      <div class="world-hud" aria-label="game state">
        <span>bond <strong id="signal-meter">0 xp</strong></span>
        <span>wins <strong id="tower-meter">0</strong></span>
        <span>dex <strong id="threat-meter">0/13</strong></span>
        <span>zone <strong id="focus-meter">Meadow</strong></span>
      </div>

      <div id="tower-proof" class="tower-proof" aria-live="polite">
        <div>
          <span id="tower-proof-kicker">selected proof card</span>
          <strong id="tower-proof-title">James Allen</strong>
        </div>
        <p id="tower-proof-copy">Ask the tiny model about a zone, win its encounter, and this card turns into concrete proof.</p>
        <div id="tower-proof-chips" class="tower-proof-chips"></div>
      </div>

      <div class="sigildex">
        <div>
          <span>SignalDex</span>
          <strong id="dex-count">0 collected</strong>
        </div>
        <div id="sigildex-list" class="sigildex-list" aria-label="collected proof cards"></div>
      </div>
    </div>

    <div class="rpg-battle-dock" aria-label="battle controls">
      <div class="battle-panel" aria-live="polite">
        <div>
          <span id="battle-kicker">wild problem</span>
          <strong id="battle-title">No encounter yet</strong>
        </div>
        <div class="battle-bars" aria-label="battle health">
          <span><i id="pet-hp"></i></span>
          <span><i id="enemy-hp"></i></span>
        </div>
        <p id="battle-copy">Walk the journey, battle the trial monsters, and use specific proof to evolve your companion.</p>
      </div>

      <form id="tiny-chat" class="tiny-chat">
        <input id="tiny-input" name="question" autocomplete="off" placeholder="try: battle eval drift / use Corider / evolve / show receipts" aria-label="Ask the tiny resume model">
        <button type="submit">cast</button>
      </form>

      <div class="tiny-prompts" aria-label="example commands">
        <button type="button" data-prompt="battle evals regression drift">eval drift</button>
        <button type="button" data-prompt="explore Stemuli">Stemuli</button>
        <button type="button" data-prompt="summon Corider">Corider</button>
        <button type="button" data-prompt="use startup operator move">startup move</button>
        <button type="button" data-prompt="show older engineering work">older work</button>
        <button type="button" data-prompt="final boss ATS">final boss</button>
      </div>

      <div class="world-actions" aria-label="game controls">
        <button type="button" id="explore-zone">explore route</button>
        <button type="button" id="start-battle">start battle</button>
        <button type="button" id="train-pet" class="world-action-build">train companion</button>
        <button type="button" id="run-showcase" class="world-action-showcase">run showcase</button>
      </div>
    </div>

    <div class="tiny-transcript" id="tiny-transcript" aria-live="polite">
      <p><strong>professor:</strong> Welcome to SignalDex. Your companion evolves when you win battles with specific, proof-seeking prompts.</p>
      <p><strong>professor:</strong> Trial monsters guard each journey zone: eval drift, ambiguity, legacy systems, generic hiring entropy.</p>
    </div>

    <div class="funnel-actions" aria-label="follow up actions">
      <a href="mailto:james@keppylab.com?subject=SignalDex%20live%20resume">email James</a>
      <a href="https://www.github.com/keppy">GitHub</a>
      <a href="https://www.keppylab.com">KeppyLab</a>
    </div>
  </div>
</section>

<script src="/javascripts/live-resume.js"></script>
