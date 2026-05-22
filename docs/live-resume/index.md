---
title: James Allen - Tiny Resume World
description: A playable WebGL resume where a tiny local language model reshapes a living proof-of-work world.
robots: noindex,nofollow
hide:
  - navigation
  - toc
search:
  exclude: true
---

<section class="voxel-resume" aria-label="James Allen tiny resume world">
  <canvas id="voxel-canvas" aria-hidden="true"></canvas>
  <div id="tower-labels" class="tower-labels" aria-hidden="true"></div>

  <div class="voxel-copy">
    <p class="voxel-kicker">KeppyLab / playable proof of work</p>
    <h2>James Allen</h2>
    <p>
      A living resume system: ask the local model about the work, stress-test the skyline
      with agents and black holes, then repair the signal with language.
    </p>
    <div class="voxel-tags" aria-label="focus areas">
      <span>Product &amp; AI</span>
      <span>Evals</span>
      <span>Post-training</span>
      <span>Agents</span>
      <span>Playable resume</span>
    </div>
  </div>

  <div class="voxel-console" aria-label="Tiny resume language model">
    <div class="voxel-console-head">
      <span>tiny local lm</span>
      <span id="voxel-status">local / awake</span>
    </div>
    <div class="mission-card">
      <strong>Objective: protect the resume signal.</strong>
      <span>Each tower is a case-study node. Prompts focus proof; typing repairs structure; chaos tools stress-test the system.</span>
    </div>
    <div id="tiny-transcript" class="tiny-transcript" aria-live="polite">
      <p><strong>tiny:</strong> objective: keep the resume signal online. Ask about the work to focus a tower; type to repair it.</p>
      <p><strong>tiny:</strong> drones dismantle towers. Black holes bend the scene. Summon towers and restore planet when the system gets spicy.</p>
    </div>
    <div class="world-hud" aria-label="world state">
      <span>signal <strong id="signal-meter">100%</strong></span>
      <span>towers <strong id="tower-meter">12/12</strong></span>
      <span>threat <strong id="threat-meter">calm</strong></span>
      <span>focus <strong id="focus-meter">KeppyLab</strong></span>
    </div>
    <div id="tower-proof" class="tower-proof" aria-live="polite">
      <div>
        <span id="tower-proof-kicker">selected tower</span>
        <strong id="tower-proof-title">KeppyLab</strong>
      </div>
      <p id="tower-proof-copy">Independent AI lab for generative games, RAG, coding-agent evals, and fast product experiments.</p>
      <div id="tower-proof-chips" class="tower-proof-chips"></div>
    </div>
    <div class="receipt-strip" aria-label="technical receipts">
      <span>Raw WebGL</span>
      <span>Local retrieval model</span>
      <span>Procedural labels</span>
      <span>Agent simulation</span>
      <span>No backend</span>
    </div>
    <div class="tiny-prompts" aria-label="example prompts">
      <button type="button" data-prompt="show me Corider and evals">Corider</button>
      <button type="button" data-prompt="what happened at Stemuli?">Stemuli</button>
      <button type="button" data-prompt="why labs?">labs</button>
      <button type="button" data-prompt="why startup operator?">startup</button>
      <button type="button" data-prompt="show older engineering work">older work</button>
      <button type="button" data-prompt="show me evals under pressure">under pressure</button>
    </div>
    <div class="world-actions" aria-label="world controls">
      <button type="button" id="spawn-drone">spawn drone</button>
      <button type="button" id="run-showcase" class="world-action-showcase">run showcase</button>
      <button type="button" id="spawn-towers" class="world-action-build">summon towers</button>
      <button type="button" id="spawn-planet" class="world-action-build">spawn planet</button>
      <button type="button" id="spawn-black-hole" class="world-action-danger">spawn black hole</button>
    </div>
    <div class="funnel-actions" aria-label="follow up actions">
      <button type="button" id="copy-demo-intro">copy intro</button>
      <a href="mailto:james@keppylab.com?subject=Playable%20live%20resume">email James</a>
      <a href="https://www.github.com/keppy">GitHub</a>
    </div>
    <form id="tiny-chat" class="tiny-chat">
      <input id="tiny-input" name="question" autocomplete="off" placeholder="try: show evals under pressure / black hole / repair signal" aria-label="Ask the tiny resume model">
      <button type="submit">send</button>
    </form>
  </div>
</section>

<script src="/javascripts/live-resume.js"></script>
