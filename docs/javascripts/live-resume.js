(function () {
  const canvas = document.getElementById("voxel-canvas");
  const transcript = document.getElementById("tiny-transcript");
  const form = document.getElementById("tiny-chat");
  const input = document.getElementById("tiny-input");
  const status = document.getElementById("voxel-status");
  const promptButtons = document.querySelectorAll("[data-prompt]");
  const exploreButton = document.getElementById("explore-zone");
  const startBattleButton = document.getElementById("start-battle");
  const trainPetButton = document.getElementById("train-pet");
  const runShowcaseButton = document.getElementById("run-showcase");
  const copyDemoIntroButton = document.getElementById("copy-demo-intro");
  const signalMeter = document.getElementById("signal-meter");
  const winsMeter = document.getElementById("tower-meter");
  const dexMeter = document.getElementById("threat-meter");
  const zoneMeter = document.getElementById("focus-meter");
  const proofKicker = document.getElementById("tower-proof-kicker");
  const proofTitle = document.getElementById("tower-proof-title");
  const proofCopy = document.getElementById("tower-proof-copy");
  const proofChips = document.getElementById("tower-proof-chips");
  const battleKicker = document.getElementById("battle-kicker");
  const battleTitle = document.getElementById("battle-title");
  const battleCopy = document.getElementById("battle-copy");
  const petHpBar = document.getElementById("pet-hp");
  const enemyHpBar = document.getElementById("enemy-hp");
  const petName = document.getElementById("pet-name");
  const petStage = document.getElementById("pet-stage");
  const dexCount = document.getElementById("dex-count");
  const dexList = document.getElementById("sigildex-list");

  const facts = [
    {
      key: "stemuli",
      title: "Stemuli",
      zone: "District Arcade",
      enemy: "Roadmap Hydra",
      color: [0.08, 0.72, 0.62],
      accent: [0.94, 0.78, 0.24],
      map: [2, 2],
      tags: ["stemuli", "product", "ai", "education", "gaming", "fundraising", "district", "roadmap", "customer"],
      proof: "Led Product & AI across roadmap, customer constraints, fundraising story, model behavior, and deployment tradeoffs for an AI-powered education platform.",
      receipts: ["AI product", "fundraising story", "district constraints", "model behavior"],
      text: "Stemuli: Head of Product & AI for an AI-powered educational gaming platform. Work spans product strategy, AI roadmap, fundraising narrative, client-facing product work, hiring scopes, district constraints, and hands-on model behavior.",
      details: [
        "Translated research and customer constraints into Linear tickets, IRB-aligned docs, hiring scopes, investor language, and deployment trade-offs.",
        "Worked where schools, districts, bilingual equity requirements, product timelines, and model quality all had to meet.",
      ],
    },
    {
      key: "corider",
      title: "Corider",
      zone: "Tool Contract Cave",
      enemy: "Hallucination Mimic",
      color: [0.45, 0.42, 0.96],
      accent: [0.52, 0.92, 0.98],
      map: [5, 2],
      tags: ["corider", "agent", "coding", "rust", "tools", "post-training", "model", "behavior", "sft", "contract"],
      proof: "Built a Rust-native coding-collaborator spec, tool contract, SFT/eval schemas, and regression gates for honest agent behavior.",
      receipts: ["Rust", "tool contracts", "SFT", "agent evals"],
      text: "Corider: independent model-behavior, evals, and post-training project for a Rust-native coding collaborator.",
      details: [
        "Built a model spec and normative-rule layer for representation-first coding behavior.",
        "Designed evals around tool honesty, scope control, write/run claims, and repo realism.",
      ],
    },
    {
      key: "evals",
      title: "Evals",
      zone: "Regression Reef",
      enemy: "Metric Mirage",
      color: [0.9, 0.24, 0.38],
      accent: [0.97, 0.72, 0.18],
      map: [8, 2],
      tags: ["evals", "evaluation", "scoring", "regression", "faithfulness", "rubric", "agent", "quality", "tests"],
      proof: "Turns model quality into product infrastructure: rubrics, regression tests, perturbation checks, tool-use honesty, and failure analysis.",
      receipts: ["rubrics", "regression", "faithfulness", "QA loops"],
      text: "Evals: product-grade evaluation work around conversation quality, reasoning faithfulness, perturbation tests, persona consistency, coding-agent quality, and regression analysis.",
      details: [
        "Treats evals as product infrastructure, not research theater.",
        "Builds rubrics that expose why a model is not ready, not just whether a scalar score moved.",
      ],
    },
    {
      key: "orb",
      title: "Orb Math",
      zone: "Tutor Volcano",
      enemy: "Misconception Golem",
      color: [0.94, 0.5, 0.14],
      accent: [0.18, 0.72, 0.58],
      map: [11, 2],
      tags: ["orb", "math", "qwen3", "post", "training", "synthetic", "eval", "bilingual", "reasoning", "tutoring"],
      proof: "Designed a Qwen3 math-tutoring post-training plan with synthetic tutoring data, reasoning RL, bilingual behavior, and faithfulness evals.",
      receipts: ["Qwen3", "synthetic data", "reasoning RL", "evals"],
      text: "Orb Math: Qwen3 fine-tune for grade-school math tutoring with long-CoT cold start, reasoning RL, thinking-mode fusion, synthetic tutoring data, and evals.",
      details: [
        "Scaled hand-curated tutoring conversations into a bilingual synthetic-data corpus.",
        "Evaluated dense versus MoE tradeoffs for persona adaptation, instructional-mode switching, bilingual support, cost, and deployment complexity.",
      ],
    },
    {
      key: "labs",
      title: "Labs fit",
      zone: "Frontier Observatory",
      enemy: "Benchmark Wraith",
      color: [0.72, 0.24, 0.84],
      accent: [0.34, 0.92, 0.74],
      map: [3, 5],
      tags: ["labs", "frontier", "evals", "model", "behavior", "synthetic", "post-training", "agents", "rag", "open"],
      proof: "Strong match for model behavior, eval design, post-training loops, coding-agent quality, and applied research translation.",
      receipts: ["model behavior", "post-training", "agents", "research to product"],
      text: "Labs fit: model behavior, eval design, synthetic data, SFT and post-training loops, RAG, agents, open-model strategy, coding-agent quality, and regression analysis.",
      details: [
        "Comfortable with open-model strategy, Qwen/DeepSeek-style methodology, and hands-on failure analysis.",
        "Likes the layer where model behavior becomes a product contract.",
      ],
    },
    {
      key: "startup",
      title: "Startup fit",
      zone: "Founder Ferry",
      enemy: "Ambiguity Slime",
      color: [0.18, 0.52, 0.92],
      accent: [0.98, 0.72, 0.22],
      map: [6, 5],
      tags: ["startup", "executive", "product", "gtm", "fundraising", "customers", "roadmap", "hiring", "operator", "founder"],
      proof: "Converts ambiguous AI capability into roadmap, customer language, demos, hiring scopes, and execution tickets.",
      receipts: ["roadmap", "customers", "GTM", "high agency"],
      text: "Startup fit: AI product strategy, roadmap ownership, customer demos, GTM positioning, fundraising narrative, hiring scopes, and founder-adjacent operating work.",
      details: [
        "Can convert ambiguous AI capability into roadmap, customer language, hiring plans, and execution tickets.",
        "Best in high-agency environments where product, customers, company story, and model behavior all touch.",
      ],
    },
    {
      key: "systems",
      title: "Systems",
      zone: "Stack Foundry",
      enemy: "Legacy Automaton",
      color: [0.62, 0.72, 0.82],
      accent: [0.38, 0.86, 0.54],
      map: [9, 5],
      tags: ["python", "typescript", "go", "ruby", "postgres", "react", "aws", "docker", "terraform", "kubernetes"],
      proof: "Built APIs, product-facing web apps, data systems, AI services, deployment tooling, and internal platforms across modern stacks.",
      receipts: ["Python", "TypeScript", "Postgres", "AWS"],
      text: "Systems: Python, TypeScript, Go, Ruby, Racket/Lisp, FastAPI, PostgreSQL, Neo4j, LanceDB, Chroma, React, Docker, AWS, Terraform, Kubernetes.",
      details: [
        "Comfortable crossing backend, frontend, ML-adjacent systems, infrastructure, and product surfaces.",
        "Long-running product engineering across modern and older stacks.",
      ],
    },
    {
      key: "keppylab",
      title: "KeppyLab",
      zone: "Prototype Garden",
      enemy: "Scope Bloom",
      color: [0.94, 0.82, 0.25],
      accent: [0.14, 0.78, 0.72],
      map: [12, 5],
      tags: ["keppylab", "games", "rag", "coding", "evals", "llm", "research", "hackathon", "demo"],
      proof: "Rapid experiments across generative games, biomedical RAG, coding-agent evals, LLM research notes, and public demos.",
      receipts: ["WebGL", "RAG", "games", "public demos"],
      text: "KeppyLab: independent AI lab for rapid product experiments across generative games, medical RAG, coding-agent evals, and LLM research notes.",
      details: [
        "Built WorldEnder.ai, a generative text-adventure and LLM game-engine prototype.",
        "Built Disease Lab, a biomedical RAG and knowledge-graph project for rare disease research.",
      ],
    },
    {
      key: "pegasys",
      title: "Pegasys / Fortive",
      zone: "Medical Circuit",
      enemy: "Pipeline Wyvern",
      color: [0.42, 0.7, 0.92],
      accent: [0.96, 0.4, 0.55],
      map: [3, 8],
      tags: ["pegasys", "fortive", "medical", "object", "detection", "image", "classification", "go", "python", "react"],
      proof: "Turned AI prototypes into usable product features across object detection, image classification, services, auth, upload, and app architecture.",
      receipts: ["computer vision", "Go", "Python", "React Native"],
      text: "Pegasys Medical / Fortive: consulting work on AI pipelines for object detection and image classification, Go and Python microservices, auth, file upload, metadata, logging, sync, React, and React Native architecture.",
      details: [
        "Modernized frontend architecture into an Nx-managed monorepo across React and React Native applications.",
        "Turned AI prototypes into usable product features with stakeholders.",
      ],
    },
    {
      key: "dolly",
      title: "Dolly",
      zone: "Payout Pier",
      enemy: "Distributed Knot",
      color: [0.66, 0.48, 0.3],
      accent: [0.42, 0.84, 0.76],
      map: [6, 8],
      tags: ["dolly", "consultant", "payout", "algorithm", "mobile", "api", "go", "node", "training"],
      proof: "Debugged payout-algorithm issues across mobile apps, APIs, and older services while helping new hires learn the architecture.",
      receipts: ["debugging", "payments", "Go", "Node"],
      text: "Dolly: consulting work debugging payout-algorithm issues across mobile apps, APIs, and older Go/Node services, plus training new hires on distributed service debugging.",
      details: [
        "Paired with senior engineers on long-standing payout bugs.",
        "Helped new hires learn a distributed microservice architecture.",
      ],
    },
    {
      key: "ai2",
      title: "AI2 Incubator",
      zone: "Vision Lab",
      enemy: "Prototype Phantom",
      color: [0.98, 0.42, 0.62],
      accent: [0.36, 0.88, 0.98],
      map: [9, 8],
      tags: ["ai2", "incubator", "computer", "vision", "video", "react", "websocket", "pulumi", "annotation"],
      proof: "Built early AI product experiments around real-time computer vision, annotation workflows, WebSockets, and AWS/Pulumi infrastructure.",
      receipts: ["computer vision", "WebSockets", "Pulumi", "annotation UX"],
      text: "AI2 Incubator: Entrepreneur in Residence and AI builder. Built a real-time laughter-detection computer-vision model, data architecture for Callout.ai, React annotation workflows, Node services, WebSockets, and AWS/Pulumi infrastructure.",
      details: [
        "Worked on video-chat product infrastructure and computer-vision features.",
        "Built annotation workflows and service infrastructure around early AI product experiments.",
      ],
    },
    {
      key: "older",
      title: "Earlier engineering",
      zone: "Archive Ruins",
      enemy: "Monolith Beetle",
      color: [0.52, 0.62, 0.72],
      accent: [0.95, 0.7, 0.24],
      map: [12, 8],
      tags: ["older", "earlier", "engineering", "work", "moz", "rumblemonkey", "godaddy", "games", "blockchain", "gis"],
      proof: "Senior and founding engineering work across local-search systems, multiplayer games, blockchain-backed event tracking, APIs, and consulting.",
      receipts: ["Moz", "games", "APIs", "GIS"],
      text: "Earlier engineering: Senior Software Engineer at Moz, Founding Software Engineer at RumbleMonkey, and product/web/API consulting across GoDaddy, Smashing Boxes, PugetWorks / Blue Nile, and Intercon.",
      details: [
        "At Moz, built Go/Postgres services and React tools for local-search data quality, customer issue tracking, and GIS-backed search optimization.",
        "At RumbleMonkey, built multiplayer game systems, blockchain-backed user/token event tracking, and real-time betting APIs.",
      ],
    },
  ];

  const finalBoss = {
    key: "boss",
    title: "Generic ATS",
    zone: "Flattening Gate",
    enemy: "Resume Flattening Engine",
    color: [0.08, 0.1, 0.18],
    accent: [0.98, 0.18, 0.34],
    tags: ["boss", "ats", "generic", "flatten", "pdf", "recruiter", "must", "hire"],
    proof: "The point of SignalDex: proof beats generic resume mush. The demo itself shows product taste, frontend craft, model-facing UX, and weird high-agency shipping.",
    receipts: ["playable proof", "local model", "WebGL", "shareable funnel"],
    text: "Final boss: generic hiring entropy tries to flatten a weird operator-builder into a PDF. Beat it with concrete receipts.",
    details: ["Use specific moves: evals, post-training, product, systems, demos, customers, and proof."],
  };

  const stop = new Set("the a an and or to of in for with on about is are was were what why how tell me james you he his i hire fit at can do did does have has into from by as this that it use show give please".split(" "));
  const factByKey = Object.fromEntries(facts.map((fact) => [fact.key, fact]));
  const allCards = [...facts, finalBoss];
  const demoIntroText = "I built SignalDex: a hidden monster-battler live resume where a tiny local model routes questions into battles, every encounter unlocks a proof card from my work history, and a little signal wyrm evolves as you collect receipts. It is a WebGL resume, a tiny game loop, and a product-taste demo in one link.";
  const aliases = [
    ["evals", ["eval", "evals", "metric", "metrics", "rubric", "regression", "drift", "faithfulness"]],
    ["corider", ["corider", "coding agent", "tool contract", "rust", "sft"]],
    ["stemuli", ["stemuli", "education", "district", "school", "fundraising"]],
    ["startup", ["startup", "founder", "operator", "gtm", "customer", "roadmap"]],
    ["labs", ["labs", "frontier", "research", "post-training", "model behavior"]],
    ["orb", ["orb", "math", "qwen", "tutor", "bilingual"]],
    ["systems", ["systems", "stack", "python", "typescript", "postgres", "aws"]],
    ["older", ["older", "earlier", "archive", "moz", "rumblemonkey"]],
  ];

  const petStages = [
    {
      name: "Signal Wyrm",
      label: "stage 1 / curious hatchling",
      threshold: 0,
      color: [0.36, 0.9, 0.96],
      accent: [0.98, 0.86, 0.28],
      segments: 4,
    },
    {
      name: "Loop Serpent",
      label: "stage 2 / eval-trained familiar",
      threshold: 70,
      color: [0.2, 0.74, 0.98],
      accent: [0.58, 0.98, 0.72],
      segments: 6,
    },
    {
      name: "Receipt Dragon",
      label: "stage 3 / proof-hoarding final form",
      threshold: 170,
      color: [0.48, 0.52, 1],
      accent: [1, 0.72, 0.28],
      segments: 8,
    },
  ];

  const state = {
    activeKey: "keppylab",
    routeIndex: 0,
    player: { x: 12, y: 5, tx: 12, ty: 5 },
    battle: false,
    battleKey: null,
    enemyHp: 100,
    enemyHpMax: 100,
    petHp: 100,
    xp: 0,
    wins: 0,
    stage: 0,
    collected: new Set(),
    particles: [],
    timers: [],
    time: 0,
    shake: 0,
  };

  const storageKey = "keppylab-signaldex-progress-v1";

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state.xp = Number(saved.xp) || 0;
      state.wins = Number(saved.wins) || 0;
      state.stage = clamp(Number(saved.stage) || 0, 0, petStages.length - 1);
      state.collected = new Set(Array.isArray(saved.collected) ? saved.collected : []);
    } catch (error) {
      state.collected = new Set();
    }
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        xp: state.xp,
        wins: state.wins,
        stage: state.stage,
        collected: Array.from(state.collected),
      }));
    } catch (error) {
      // Local storage is optional; the game still works without persistence.
    }
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9+\- ]/g, " ").split(/\s+/).filter((word) => word && !stop.has(word));
  }

  function scoreFacts(text) {
    const lower = text.toLowerCase();
    const words = tokenize(text);
    const explicit = facts.find((fact) => words.includes(fact.key) || lower.includes(fact.title.toLowerCase()));
    const alias = explicit ? null : aliases.find((entry) => entry[1].some((term) => lower.includes(term)));
    const direct = explicit || (alias ? factByKey[alias[0]] : null);
    const scored = facts.map((fact) => {
      const field = `${fact.key} ${fact.title} ${fact.zone} ${fact.enemy} ${fact.tags.join(" ")} ${fact.text} ${fact.details.join(" ")}`.toLowerCase();
      const score = words.reduce((sum, word) => sum + (field.includes(word) ? 1 : 0), 0) + (direct?.key === fact.key ? 8 : 0);
      return { fact, score };
    }).sort((a, b) => b.score - a.score);
    return scored[0].score > 0 ? scored.slice(0, 3).map((item) => item.fact) : [factByKey[state.activeKey] || factByKey.keppylab];
  }

  function tinyReply(text, keys) {
    const lead = keys[0] || factByKey.keppylab;
    const detail = lead.details[(text.length + lead.key.length) % lead.details.length];
    return `${lead.title}: ${lead.proof} Receipt: ${detail}`;
  }

  function currentPet() {
    return petStages[state.stage] || petStages[0];
  }

  function maybeEvolve() {
    const oldStage = state.stage;
    for (let index = petStages.length - 1; index >= 0; index -= 1) {
      if (state.xp >= petStages[index].threshold) {
        state.stage = index;
        break;
      }
    }
    if (state.stage > oldStage) {
      const pet = currentPet();
      addLine("system", `${pet.name} evolved. It looks dangerously employable.`);
      burst(0.28, 0.68, pet.accent, 34);
    }
  }

  function addLine(speaker, text) {
    if (!transcript) return;
    const item = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${speaker}:`;
    item.append(strong, ` ${text}`);
    transcript.appendChild(item);
    while (transcript.children.length > 10) transcript.removeChild(transcript.firstElementChild);
    transcript.scrollTop = transcript.scrollHeight;
  }

  function updateProofCard(card = factByKey[state.activeKey], unlocked = false) {
    if (!card) return;
    if (proofKicker) proofKicker.textContent = unlocked || state.collected.has(card.key) ? "collected proof card" : card.zone;
    if (proofTitle) proofTitle.textContent = card.title;
    if (proofCopy) proofCopy.textContent = unlocked || state.collected.has(card.key) ? card.proof : `Win the ${card.enemy} encounter to unlock the receipt. ${card.text}`;
    if (proofChips) {
      proofChips.replaceChildren(...card.receipts.map((chip) => {
        const item = document.createElement("span");
        item.textContent = chip;
        return item;
      }));
    }
  }

  function updateDex() {
    if (dexCount) dexCount.textContent = `${state.collected.size} collected`;
    if (!dexList) return;
    dexList.replaceChildren(...allCards.map((card) => {
      const item = document.createElement("button");
      const unlocked = state.collected.has(card.key);
      item.type = "button";
      item.className = unlocked ? "is-collected" : "";
      item.textContent = unlocked ? card.title : "???";
      item.addEventListener("click", () => {
        focusCard(card.key);
        updateProofCard(card, unlocked);
      });
      return item;
    }));
  }

  function updateHud() {
    const active = factByKey[state.activeKey] || finalBoss;
    const pet = currentPet();
    if (status) status.textContent = state.battle ? "battle / live" : `route / ${active.zone}`;
    if (signalMeter) signalMeter.textContent = `${state.xp} xp`;
    if (winsMeter) winsMeter.textContent = String(state.wins);
    if (dexMeter) dexMeter.textContent = `${state.collected.size}/${allCards.length}`;
    if (zoneMeter) zoneMeter.textContent = active.zone;
    if (petName) petName.textContent = pet.name;
    if (petStage) petStage.textContent = pet.label;
    if (petHpBar) petHpBar.style.width = `${clamp(state.petHp, 0, 100)}%`;
    if (enemyHpBar) enemyHpBar.style.width = `${state.battle ? clamp((state.enemyHp / state.enemyHpMax) * 100, 0, 100) : 0}%`;
    if (!state.battle && battleKicker && battleTitle && battleCopy) {
      battleKicker.textContent = "wild problem";
      battleTitle.textContent = "No encounter yet";
      battleCopy.textContent = "Explore a zone or type a battle command to start collecting receipts.";
    }
    updateDex();
  }

  function focusCard(key) {
    const card = factByKey[key] || finalBoss;
    state.activeKey = card.key === "boss" ? state.activeKey : card.key;
    if (card.map) {
      state.player.tx = card.map[0];
      state.player.ty = card.map[1];
    }
    updateProofCard(card, state.collected.has(card.key));
    updateHud();
  }

  function exploreNext() {
    const next = facts[state.routeIndex % facts.length];
    state.routeIndex += 1;
    focusCard(next.key);
    addLine("you", `explore ${next.zone}`);
    addLine("professor", `${next.enemy} is prowling near ${next.title}. Ask a sharper question or hit start battle.`);
  }

  function startBattle(key = state.activeKey) {
    const card = factByKey[key] || factByKey.keppylab;
    state.activeKey = card.key;
    state.battle = true;
    state.battleKey = card.key;
    state.enemyHpMax = 92 + state.wins * 5 + state.stage * 16;
    state.enemyHp = state.enemyHpMax;
    state.petHp = Math.max(state.petHp, 58);
    if (battleKicker) battleKicker.textContent = card.zone;
    if (battleTitle) battleTitle.textContent = card.enemy;
    if (battleCopy) battleCopy.textContent = `${card.enemy} appeared. Type a move like "use ${card.receipts[0]} proof" or "debug with ${card.title}".`;
    updateProofCard(card, state.collected.has(card.key));
    addLine("battle", `${card.enemy} appeared in ${card.zone}.`);
    burst(0.7, 0.34, card.accent, 18);
    updateHud();
  }

  function startFinalBoss() {
    state.battle = true;
    state.battleKey = "boss";
    state.enemyHpMax = 180;
    state.enemyHp = state.enemyHpMax;
    state.petHp = Math.max(state.petHp, 70);
    if (battleKicker) battleKicker.textContent = finalBoss.zone;
    if (battleTitle) battleTitle.textContent = finalBoss.enemy;
    if (battleCopy) battleCopy.textContent = "The ATS attempts to flatten all proof into generic keywords. Use concrete receipts.";
    updateProofCard(finalBoss, state.collected.has("boss"));
    addLine("boss", "Generic hiring entropy wants a PDF. It hates playable evidence.");
    burst(0.72, 0.34, finalBoss.accent, 42);
    updateHud();
  }

  function trainPet() {
    state.xp += 12;
    state.petHp = clamp(state.petHp + 20, 0, 100);
    maybeEvolve();
    saveProgress();
    addLine("system", `${currentPet().name} trained on tiny receipts. +12 bond XP.`);
    burst(0.27, 0.66, currentPet().accent, 18);
    updateHud();
  }

  function battleTurn(text, keys) {
    const card = state.battleKey === "boss" ? finalBoss : factByKey[state.battleKey] || keys[0] || factByKey.keppylab;
    const words = tokenize(text);
    const field = `${card.key} ${card.title} ${card.zone} ${card.enemy} ${card.tags.join(" ")} ${card.receipts.join(" ")} ${card.text}`.toLowerCase();
    const tagHits = words.filter((word) => field.includes(word)).length;
    const specificity = Math.min(28, tagHits * 6);
    const powerWords = /(eval|proof|receipt|debug|ship|prototype|research|operator|customer|roadmap|post-training|synthetic|agent|system|contract|fundraising|model|rust|webgl|rag|vision)/i.test(text) ? 14 : 0;
    const heal = /(heal|recover|restore|guard|protect)/i.test(text);
    const vaguePenalty = words.length < 3 ? 8 : 0;
    const damage = Math.max(10, 18 + state.stage * 8 + specificity + powerWords - vaguePenalty);

    if (heal) {
      state.petHp = clamp(state.petHp + 24 + state.stage * 5, 0, 100);
      addLine("you", text);
      addLine("battle", `${currentPet().name} guarded the signal and recovered.`);
      burst(0.28, 0.68, currentPet().accent, 18);
    } else {
      state.enemyHp -= damage;
      state.shake = 10;
      addLine("you", text);
      addLine("battle", `${currentPet().name} used ${tagHits > 1 ? "receipt combo" : "specificity bite"} for ${damage} damage.`);
      burst(0.7, 0.34, card.accent, 24);
    }

    if (state.enemyHp <= 0) {
      winBattle(card);
      return;
    }

    const enemyDamage = clamp(17 - state.stage * 3 + Math.floor((100 - state.enemyHp) / 60), 6, 18);
    state.petHp -= enemyDamage;
    if (state.petHp <= 0) {
      state.petHp = 44;
      state.battle = false;
      addLine("battle", `${card.enemy} scrambled the signal. Your companion retreats, annoyed but fine.`);
    } else {
      addLine("enemy", `${card.enemy} hits back for ${enemyDamage}.`);
    }
    if (battleCopy) battleCopy.textContent = tinyReply(text, [card]);
    updateHud();
  }

  function winBattle(card) {
    const firstWin = !state.collected.has(card.key);
    state.collected.add(card.key);
    state.battle = false;
    state.battleKey = null;
    state.enemyHp = 0;
    state.wins += 1;
    state.xp += firstWin ? 34 : 18;
    maybeEvolve();
    saveProgress();
    updateProofCard(card, true);
    if (battleKicker) battleKicker.textContent = "card unlocked";
    if (battleTitle) battleTitle.textContent = `${card.title} collected`;
    if (battleCopy) battleCopy.textContent = `${card.proof} Receipts: ${card.receipts.join(", ")}.`;
    addLine("victory", `${card.title} proof card collected. ${currentPet().name} gained bond XP.`);
    burst(0.5, 0.46, card.accent, 44);
    updateHud();
  }

  function submitCommand(text) {
    const clean = text.trim();
    if (!clean) return;
    const keys = scoreFacts(clean);
    const lead = keys[0] || factByKey.keppylab;

    if (/final|boss|ats|generic|flatten/i.test(clean)) {
      addLine("you", clean);
      startFinalBoss();
      return;
    }

    if (/showcase|tour|demo|viral|impress/i.test(clean)) {
      addLine("you", clean);
      runShowcase();
      return;
    }

    if (/train|evolve|level|bond/i.test(clean) && !state.battle) {
      addLine("you", clean);
      trainPet();
      return;
    }

    if (state.battle) {
      battleTurn(clean, keys);
      return;
    }

    focusCard(lead.key);
    addLine("you", clean);

    if (/battle|fight|encounter|challenge|bug|drift|regression|monster|problem|summon/i.test(clean)) {
      startBattle(lead.key);
      return;
    }

    addLine("professor", tinyReply(clean, keys));
    if (battleCopy) battleCopy.textContent = `You focused ${lead.title}. Start a battle to unlock its proof card.`;
    updateHud();
  }

  function runShowcase() {
    clearShowcase();
    addLine("system", "Showcase route armed: Corider, eval drift, startup ambiguity, final boss.");
    const steps = [
      () => focusCard("corider"),
      () => startBattle("evals"),
      () => battleTurn("use eval rubrics and regression receipts", [factByKey.evals]),
      () => battleTurn("ship faithfulness tests with coding-agent proof", [factByKey.evals]),
      () => focusCard("startup"),
      () => startBattle("startup"),
      () => battleTurn("use customer roadmap and fundraising narrative", [factByKey.startup]),
      () => startFinalBoss(),
      () => battleTurn("combine evals post-training product systems and WebGL proof", [finalBoss]),
      () => battleTurn("finish with concrete receipts and public demo", [finalBoss]),
    ];
    steps.forEach((step, index) => {
      state.timers.push(window.setTimeout(step, 520 + index * 850));
    });
  }

  function clearShowcase() {
    state.timers.forEach((timer) => window.clearTimeout(timer));
    state.timers = [];
  }

  function copyDemoIntro() {
    const done = () => {
      if (!copyDemoIntroButton) return;
      const original = copyDemoIntroButton.textContent;
      copyDemoIntroButton.textContent = "copied";
      window.setTimeout(() => {
        copyDemoIntroButton.textContent = original || "copy intro";
      }, 1300);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(demoIntroText).then(done).catch(() => fallbackCopy(done));
    } else {
      fallbackCopy(done);
    }
  }

  function fallbackCopy(done) {
    const area = document.createElement("textarea");
    area.value = demoIntroText;
    area.setAttribute("readonly", "readonly");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      done();
    } finally {
      document.body.removeChild(area);
    }
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitCommand(input.value);
    input.value = "";
  });

  promptButtons.forEach((button) => {
    button.addEventListener("click", () => submitCommand(button.dataset.prompt || button.textContent || ""));
  });

  exploreButton?.addEventListener("click", exploreNext);
  startBattleButton?.addEventListener("click", () => startBattle(state.activeKey));
  trainPetButton?.addEventListener("click", trainPet);
  runShowcaseButton?.addEventListener("click", runShowcase);
  copyDemoIntroButton?.addEventListener("click", () => {
    copyDemoIntro();
    addLine("system", "Intro copied. Send it with the hidden SignalDex link.");
  });

  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
  if (!gl) {
    if (status) status.textContent = "webgl unavailable";
    return;
  }

  const vertexShader = compile(gl.VERTEX_SHADER, `
    attribute vec2 a_position;
    attribute vec4 a_color;
    varying vec4 v_color;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_color = a_color;
    }
  `);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying vec4 v_color;
    void main() {
      gl_FragColor = v_color;
    }
  `);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const colorLocation = gl.getAttribLocation(program, "a_color");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.enableVertexAttribArray(colorLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 24, 0);
  gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 24, 8);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  let width = 1;
  let height = 1;
  let vertices = [];

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const nextWidth = Math.max(1, Math.floor(canvas.clientWidth * ratio));
    const nextHeight = Math.max(1, Math.floor(canvas.clientHeight * ratio));
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      gl.viewport(0, 0, nextWidth, nextHeight);
    }
    width = canvas.clientWidth || nextWidth;
    height = canvas.clientHeight || nextHeight;
  }

  function pushRect(x, y, w, h, color) {
    const x1 = x / width * 2 - 1;
    const x2 = (x + w) / width * 2 - 1;
    const y1 = 1 - y / height * 2;
    const y2 = 1 - (y + h) / height * 2;
    const c = color.length === 3 ? [...color, 1] : color;
    vertices.push(
      x1, y1, ...c, x2, y1, ...c, x1, y2, ...c,
      x1, y2, ...c, x2, y1, ...c, x2, y2, ...c,
    );
  }

  function pushFrame(x, y, w, h, color, thickness = 3) {
    pushRect(x, y, w, thickness, color);
    pushRect(x, y + h - thickness, w, thickness, color);
    pushRect(x, y, thickness, h, color);
    pushRect(x + w - thickness, y, thickness, h, color);
  }

  function mapPoint(mx, my) {
    const scale = Math.min(width / 16, height / 10);
    const originX = width * 0.5 - scale * 7.5;
    const originY = height * 0.5 - scale * 4.9;
    return [originX + mx * scale, originY + my * scale, scale];
  }

  function dim(color, amount = 0.6, alpha = 1) {
    return [color[0] * amount, color[1] * amount, color[2] * amount, alpha];
  }

  function burst(nx, ny, color, count = 16) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.PI * 2 * (i / count);
      const speed = 1.4 + (i % 5) * 0.45;
      state.particles.push({
        x: nx * width,
        y: ny * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 42 + (i % 6) * 7,
        size: 4 + (i % 4),
        color: [...color, 0.9],
      });
    }
  }

  function updateParticles() {
    state.particles = state.particles.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.02;
      particle.life -= 1;
      return particle.life > 0;
    });
  }

  function drawParticles() {
    state.particles.forEach((particle) => {
      pushRect(particle.x, particle.y, particle.size, particle.size, [particle.color[0], particle.color[1], particle.color[2], particle.life / 55]);
    });
  }

  function drawOverworld(t) {
    pushRect(0, 0, width, height, [0.025, 0.035, 0.07, 1]);
    pushRect(0, height * 0.62, width, height * 0.38, [0.04, 0.16, 0.14, 1]);
    pushRect(0, height * 0.12, width, height * 0.5, [0.04, 0.08, 0.16, 0.88]);

    const [ox, oy, scale] = mapPoint(0, 0);
    for (let gx = 0; gx < 15; gx += 1) {
      for (let gy = 0; gy < 10; gy += 1) {
        const checker = (gx + gy) % 2 === 0;
        pushRect(ox + gx * scale, oy + gy * scale, scale - 2, scale - 2, checker ? [0.08, 0.24, 0.18, 0.74] : [0.06, 0.2, 0.18, 0.74]);
      }
    }

    facts.forEach((fact, index) => {
      const [x, y, s] = mapPoint(fact.map[0], fact.map[1]);
      const pulse = Math.sin(t * 0.003 + index) * 0.08 + 0.9;
      const collected = state.collected.has(fact.key);
      pushRect(x - s * 0.72, y - s * 0.48, s * 1.35, s * 0.92, dim(fact.color, collected ? 0.9 : 0.55, 0.9));
      pushFrame(x - s * 0.72, y - s * 0.48, s * 1.35, s * 0.92, fact.key === state.activeKey ? [...fact.accent, 0.95] : [1, 1, 1, 0.18], 3);
      pushRect(x - s * 0.18, y - s * 0.26, s * 0.36 * pulse, s * 0.36 * pulse, collected ? [...fact.accent, 0.95] : [0.02, 0.02, 0.04, 0.84]);
    });

    state.player.x += (state.player.tx - state.player.x) * 0.05;
    state.player.y += (state.player.ty - state.player.y) * 0.05;
    const [px, py, ps] = mapPoint(state.player.x, state.player.y);
    drawPet(px - ps * 0.55, py + ps * 0.16, ps * 0.14, t, false);
    drawPlayer(px, py, ps * 0.18, t);
  }

  function drawBattle(t) {
    const card = state.battleKey === "boss" ? finalBoss : factByKey[state.battleKey] || factByKey.keppylab;
    const shake = state.shake > 0 ? Math.sin(t * 0.08) * state.shake : 0;
    state.shake = Math.max(0, state.shake - 0.45);

    pushRect(0, 0, width, height, [0.035, 0.04, 0.08, 1]);
    pushRect(width * 0.08, height * 0.18, width * 0.84, height * 0.52, dim(card.color, 0.48, 0.82));
    pushFrame(width * 0.08, height * 0.18, width * 0.84, height * 0.52, [...card.accent, 0.55], 4);
    pushRect(width * 0.14, height * 0.66, width * 0.34, height * 0.05, [0.16, 0.34, 0.28, 0.9]);
    pushRect(width * 0.58, height * 0.38, width * 0.3, height * 0.05, [0.16, 0.24, 0.34, 0.9]);
    drawPet(width * 0.3, height * 0.58, Math.min(width, height) * 0.018, t, true);
    drawEnemy(width * 0.72 + shake, height * 0.34, Math.min(width, height) * 0.038, card, t);
  }

  function drawPlayer(x, y, size, t) {
    const bob = Math.sin(t * 0.006) * size * 0.25;
    pushRect(x - size * 0.7, y - size * 1.3 + bob, size * 1.4, size * 1.4, [0.16, 0.8, 0.74, 1]);
    pushRect(x - size * 0.5, y - size * 2.1 + bob, size, size, [0.98, 0.8, 0.58, 1]);
    pushRect(x - size * 0.85, y - size * 2.35 + bob, size * 1.7, size * 0.42, [0.05, 0.08, 0.13, 1]);
    pushRect(x - size * 0.58, y + size * 0.1 + bob, size * 0.42, size * 0.7, [0.04, 0.08, 0.16, 1]);
    pushRect(x + size * 0.18, y + size * 0.1 + bob, size * 0.42, size * 0.7, [0.04, 0.08, 0.16, 1]);
  }

  function drawPet(x, y, size, t, battleScale) {
    const pet = currentPet();
    const bodySize = battleScale ? size * 2.6 : size * 1.8;
    for (let i = 0; i < pet.segments; i += 1) {
      const sway = Math.sin(t * 0.008 + i * 0.8) * bodySize * 0.55;
      const sx = x - i * bodySize * 0.72;
      const sy = y + sway + i * bodySize * 0.1;
      const c = i === 0 ? pet.accent : pet.color;
      pushRect(sx, sy, bodySize, bodySize * 0.74, [...c, 1]);
      pushRect(sx + bodySize * 0.18, sy + bodySize * 0.18, bodySize * 0.18, bodySize * 0.18, [0.02, 0.05, 0.09, 1]);
    }
    if (state.stage >= 1) {
      pushRect(x - bodySize * 0.2, y - bodySize * 0.9, bodySize * 0.38, bodySize * 0.75, [...pet.accent, 0.95]);
    }
    if (state.stage >= 2) {
      pushRect(x - bodySize * 1.1, y - bodySize * 1.05, bodySize * 0.75, bodySize * 0.38, [1, 0.9, 0.36, 0.95]);
      pushRect(x - bodySize * 1.1, y + bodySize * 0.92, bodySize * 0.75, bodySize * 0.38, [1, 0.9, 0.36, 0.95]);
    }
  }

  function drawEnemy(x, y, size, card, t) {
    const bob = Math.sin(t * 0.005) * size * 2;
    const c = card.color;
    const a = card.accent;
    pushRect(x - size * 2.2, y - size * 1.6 + bob, size * 4.4, size * 3.2, [...c, 1]);
    pushRect(x - size * 3, y - size * 0.6 + bob, size * 1.2, size * 1.2, dim(c, 0.72, 1));
    pushRect(x + size * 1.8, y - size * 0.6 + bob, size * 1.2, size * 1.2, dim(c, 0.72, 1));
    pushRect(x - size * 1.2, y - size * 2.4 + bob, size * 0.8, size * 0.9, [...a, 1]);
    pushRect(x + size * 0.4, y - size * 2.4 + bob, size * 0.8, size * 0.9, [...a, 1]);
    pushRect(x - size * 0.85, y - size * 0.45 + bob, size * 0.42, size * 0.42, [0.02, 0.02, 0.04, 1]);
    pushRect(x + size * 0.45, y - size * 0.45 + bob, size * 0.42, size * 0.42, [0.02, 0.02, 0.04, 1]);
    pushRect(x - size * 0.72, y + size * 0.75 + bob, size * 1.6, size * 0.28, [...a, 1]);
  }

  function render(t) {
    state.time = t;
    resize();
    vertices = [];
    gl.clearColor(0.02, 0.025, 0.05, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (state.battle) drawBattle(t);
    else drawOverworld(t);
    updateParticles();
    drawParticles();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6);
    requestAnimationFrame(render);
  }

  loadProgress();
  maybeEvolve();
  updateProofCard(factByKey.keppylab, state.collected.has("keppylab"));
  updateHud();
  requestAnimationFrame(render);
}());
