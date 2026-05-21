---
title: James Dominguez - Tiny Resume World
description: A hidden voxel resume with a tiny local language model.
robots: noindex,nofollow
hide:
  - navigation
  - toc
search:
  exclude: true
---

<section class="voxel-resume" aria-label="James Dominguez tiny resume world">
  <canvas id="voxel-canvas" aria-hidden="true"></canvas>

  <div class="voxel-copy">
    <p class="voxel-kicker">KeppyLab / hidden sector</p>
    <h2>James Dominguez</h2>
    <p>
      A playable live resume: ask the tiny model about the work, keep the signal alive,
      and stress-test the skyline with drones, gravity, and rebuild loops.
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
    <div class="tiny-prompts" aria-label="example prompts">
      <button type="button" data-prompt="show me Corider and evals">Corider</button>
      <button type="button" data-prompt="what happened at Stemuli?">Stemuli</button>
      <button type="button" data-prompt="why labs?">labs</button>
      <button type="button" data-prompt="why startup operator?">startup</button>
      <button type="button" data-prompt="show older engineering work">older work</button>
    </div>
    <div class="world-actions" aria-label="world controls">
      <button type="button" id="spawn-drone">spawn drone</button>
      <button type="button" id="run-showcase" class="world-action-showcase">run showcase</button>
      <button type="button" id="spawn-towers" class="world-action-build">summon towers</button>
      <button type="button" id="spawn-planet" class="world-action-build">spawn planet</button>
      <button type="button" id="spawn-black-hole" class="world-action-danger">spawn black hole</button>
    </div>
    <form id="tiny-chat" class="tiny-chat">
      <input id="tiny-input" name="question" autocomplete="off" placeholder="Stemuli / Corider / labs / startup" aria-label="Ask the tiny resume model">
      <button type="submit">send</button>
    </form>
  </div>
</section>

<script src="/javascripts/live-resume.js"></script>
