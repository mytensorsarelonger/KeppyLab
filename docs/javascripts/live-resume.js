(function () {
  const canvas = document.getElementById("voxel-canvas");
  const towerLabelLayer = document.getElementById("tower-labels");
  const transcript = document.getElementById("tiny-transcript");
  const form = document.getElementById("tiny-chat");
  const input = document.getElementById("tiny-input");
  const status = document.getElementById("voxel-status");
  const promptButtons = document.querySelectorAll("[data-prompt]");
  const spawnDroneButton = document.getElementById("spawn-drone");
  const runShowcaseButton = document.getElementById("run-showcase");
  const spawnTowersButton = document.getElementById("spawn-towers") || document.getElementById("spawn-tower");
  const spawnPlanetButton = document.getElementById("spawn-planet");
  const spawnBlackHoleButton = document.getElementById("spawn-black-hole");
  const signalMeter = document.getElementById("signal-meter");
  const towerMeter = document.getElementById("tower-meter");
  const threatMeter = document.getElementById("threat-meter");
  const focusMeter = document.getElementById("focus-meter");
  let typedRebuildLevel = 0;

  const facts = [
    {
      key: "stemuli",
      title: "Stemuli",
      color: [0.12, 0.72, 0.62],
      tags: ["stemuli", "head", "product", "ai", "education", "gaming", "fundraising", "client", "roadmap", "district", "customer"],
      text: "Stemuli: Head of Product & AI for an AI-powered educational gaming platform. Work spans product strategy, AI roadmap, fundraising narrative, client-facing product work, hiring scopes, district constraints, and hands-on model behavior.",
      details: [
        "Led Product & AI across product strategy, roadmap ownership, AI research translation, client-facing product work, and fundraising narrative.",
        "Translated research and customer constraints into Linear tickets, IRB-aligned docs, hiring scopes, investor language, and deployment trade-offs.",
        "Worked where schools, districts, bilingual equity requirements, product timelines, and model quality all had to meet.",
      ],
    },
    {
      key: "orb",
      title: "Orb Math",
      color: [0.94, 0.58, 0.18],
      tags: ["orb", "math", "qwen3", "qwen", "post", "training", "synthetic", "eval", "bilingual", "reasoning", "tutoring", "rl"],
      text: "Orb Math: Qwen3 fine-tune for grade-school math tutoring with long-CoT cold start, reasoning RL with verifiable rewards, thinking-mode fusion, general RL, synthetic tutoring data, and evals for reasoning faithfulness.",
      details: [
        "Designed a four-stage post-training plan inspired by DeepSeek-R1 and Qwen3 methodology.",
        "Scaled roughly 40 hand-curated tutoring conversations into a bilingual synthetic-data corpus across student profiles, misconception priors, instructional modes, and curriculum maps.",
        "Evaluated 14B dense versus 30B-A3B MoE tradeoffs for persona adaptation, instructional-mode switching, bilingual support, cost, and deployment complexity.",
      ],
    },
    {
      key: "corider",
      title: "Corider",
      color: [0.48, 0.42, 0.96],
      tags: ["corider", "agent", "coding", "rust", "evals", "tools", "post-training", "model", "behavior", "sft", "repo", "contract"],
      text: "Corider: independent model-behavior, evals, and post-training project for a Rust-native coding collaborator. It ties model spec, normative rules, tool contracts, SFT/eval schemas, synthetic examples, and repo-in-the-loop eval design together.",
      details: [
        "Built a model spec and normative-rule layer for representation-first coding behavior.",
        "Designed a frozen read-only tool contract and evals around tool honesty, scope control, write/run claims, and repo realism.",
        "Used base-vs-adapter reviews to catch regressions like fake tool results, broad implementation collapse, and unsafe claims before shipping.",
      ],
    },
    {
      key: "evals",
      title: "Evals",
      color: [0.86, 0.24, 0.44],
      tags: ["evals", "evaluation", "scoring", "regression", "faithfulness", "rubric", "agent", "quality", "tests"],
      text: "Evals: product-grade evaluation work around conversation quality, reasoning faithfulness, perturbation tests, persona and mode consistency, learning-outcome proxies, coding-agent quality, and regression analysis.",
      details: [
        "Treats evals as product infrastructure, not research theater.",
        "Looks for quality drift in tool use, behavioral boundaries, reasoning faithfulness, and user-trust failures.",
        "Builds rubrics that expose why a model is not ready, not just whether a scalar score moved.",
      ],
    },
    {
      key: "labs",
      title: "Labs fit",
      color: [0.92, 0.22, 0.42],
      tags: ["labs", "frontier", "evals", "model", "behavior", "synthetic", "post-training", "agents", "rag", "open", "models"],
      text: "Labs fit: model behavior, eval design, synthetic data, SFT and post-training loops, RAG, agents, open-model strategy, coding-agent quality, and regression analysis.",
      details: [
        "Strong fit for model behavior, evals, post-training, agent quality, and applied research translation.",
        "Comfortable with open-model strategy, Qwen/DeepSeek-style methodology, and hands-on failure analysis.",
        "Likes the layer where model behavior becomes a product contract.",
      ],
    },
    {
      key: "startup",
      title: "Startup fit",
      color: [0.18, 0.52, 0.92],
      tags: ["startup", "executive", "product", "gtm", "fundraising", "customers", "roadmap", "hiring", "operator", "founder"],
      text: "Startup fit: AI product strategy, roadmap ownership, customer demos, GTM positioning, fundraising narrative, hiring scopes, and founder-adjacent operating work.",
      details: [
        "Can convert ambiguous AI capability into roadmap, customer language, hiring plans, and execution tickets.",
        "Has worked across clients, fundraising narrative, product strategy, and technical implementation.",
        "Best in high-agency environments where product, customers, company story, and model behavior all touch.",
      ],
    },
    {
      key: "systems",
      title: "Systems",
      color: [0.76, 0.78, 0.82],
      tags: ["python", "typescript", "go", "ruby", "racket", "lisp", "postgres", "react", "aws", "docker", "terraform", "kubernetes"],
      text: "Systems: Python, TypeScript, Go, Ruby, Racket/Lisp, FastAPI, PostgreSQL, Neo4j, LanceDB, Chroma, React, Docker, AWS, Terraform, Kubernetes, and long-running product engineering.",
      details: [
        "Has built APIs, product-facing web apps, data systems, AI services, deployment tooling, and internal platforms.",
        "Comfortable crossing backend, frontend, ML-adjacent systems, infrastructure, and product surfaces.",
      ],
    },
    {
      key: "keppylab",
      title: "KeppyLab",
      color: [0.95, 0.83, 0.34],
      tags: ["keppylab", "worldender", "disease", "rag", "games", "knowledge", "graph", "hackathon", "research", "community"],
      text: "KeppyLab: independent AI lab for rapid product experiments across generative games, medical RAG, coding-agent evals, and LLM research notes.",
      details: [
        "Built WorldEnder.ai, a generative text-adventure and LLM game-engine prototype.",
        "Built Disease Lab, a biomedical RAG and knowledge-graph project for rare disease research.",
        "Uses public demos, hackathons, and writing to test applied AI product concepts quickly.",
      ],
    },
    {
      key: "pegasys",
      title: "Pegasys / Fortive",
      color: [0.42, 0.7, 0.92],
      tags: ["pegasys", "fortive", "medical", "object", "detection", "image", "classification", "go", "python", "react", "native"],
      text: "Pegasys Medical / Fortive: consulting work on AI pipelines for object detection and image classification, Go and Python microservices, auth, file upload, metadata, logging, sync, React, and React Native architecture.",
      details: [
        "Turned AI prototypes into usable product features with stakeholders.",
        "Modernized frontend architecture into an Nx-managed monorepo across React and React Native applications.",
      ],
    },
    {
      key: "dolly",
      title: "Dolly",
      color: [0.66, 0.48, 0.3],
      tags: ["dolly", "consultant", "payout", "algorithm", "mobile", "api", "go", "node", "training"],
      text: "Dolly: consulting work debugging payout-algorithm issues across mobile apps, APIs, and older Go/Node services, plus training new hires on distributed service debugging.",
      details: [
        "Paired with senior engineers on long-standing payout bugs.",
        "Helped new hires learn a distributed microservice architecture.",
      ],
    },
    {
      key: "ai2",
      title: "AI2 Incubator",
      color: [0.98, 0.42, 0.62],
      tags: ["ai2", "incubator", "entrepreneur", "residence", "computer", "vision", "video", "react", "websocket", "pulumi"],
      text: "AI2 Incubator: Entrepreneur in Residence and AI builder. Built a real-time laughter-detection computer-vision model, data architecture for Callout.ai, React annotation workflows, Node services, WebSockets, and AWS/Pulumi infrastructure.",
      details: [
        "Worked on video-chat product infrastructure and computer-vision features.",
        "Built annotation workflows and service infrastructure around early AI product experiments.",
      ],
    },
    {
      key: "older",
      title: "Earlier engineering",
      color: [0.55, 0.62, 0.72],
      tags: ["older", "earlier", "engineering", "work", "moz", "rumblemonkey", "godaddy", "blue", "nile", "consultant", "local", "search", "games", "blockchain", "gis"],
      text: "Earlier engineering: Senior Software Engineer at Moz, Founding Software Engineer at RumbleMonkey, and product/web/API consulting across GoDaddy, Smashing Boxes, PugetWorks / Blue Nile, and Intercon.",
      details: [
        "At Moz, built Go/Postgres services and React tools for local-search data quality, customer issue tracking, and GIS-backed search optimization.",
        "At RumbleMonkey, built multiplayer game systems, blockchain-backed user/token event tracking, and real-time betting APIs.",
      ],
    },
  ];

  const stop = new Set("the a an and or to of in for with on about is are was were what why how tell me james you he his i hire fit at can do did does have has into from by as this that it".split(" "));
  const tokenize = (text) => text.toLowerCase().replace(/[^a-z0-9+\- ]/g, " ").split(/\s+/).filter((word) => word && !stop.has(word));
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const factByKey = Object.fromEntries(facts.map((fact) => [fact.key, fact]));
  const corpus = facts.flatMap((fact) => [fact.text, ...fact.details]).join(" ");
  const grams = buildGrams(corpus);

  function buildGrams(text) {
    const words = text.toLowerCase().replace(/[^a-z0-9+\- ]/g, " ").split(/\s+/).filter(Boolean);
    const map = new Map();
    for (let i = 0; i < words.length - 2; i += 1) {
      const key = `${words[i]} ${words[i + 1]}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(words[i + 2]);
    }
    return map;
  }

  function tinyGenerate(seed, maxWords = 18) {
    const seedTerms = tokenize(seed);
    const keys = Array.from(grams.keys());
    let key = keys.find((candidate) => seedTerms.some((term) => candidate.includes(term))) || keys[(seed.length * 17) % keys.length];
    const out = key.split(" ");
    for (let i = 0; i < maxWords; i += 1) {
      const choices = grams.get(key);
      if (!choices || !choices.length) break;
      const pick = choices[(seed.length + i * 7 + out.join("").length) % choices.length];
      out.push(pick);
      key = `${out[out.length - 2]} ${out[out.length - 1]}`;
    }
    return out.join(" ").replace(/\bai\b/g, "AI").replace(/\bqwen3\b/g, "Qwen3").replace(/\brag\b/g, "RAG").replace(/\bsft\b/g, "SFT");
  }

  function scoreFacts(question) {
    const terms = tokenize(question);
    return facts.map((fact) => {
      const haystack = tokenize(`${fact.key} ${fact.title} ${fact.tags.join(" ")} ${fact.text} ${fact.details.join(" ")}`);
      const score = terms.reduce((sum, term) => {
        const exact = haystack.filter((word) => word === term).length;
        const fuzzy = haystack.some((word) => word.includes(term) || term.includes(word)) ? 0.35 : 0;
        return sum + exact + fuzzy;
      }, 0);
      return { fact, score };
    }).sort((a, b) => b.score - a.score);
  }

  function answer(question) {
    const scored = scoreFacts(question);
    const chosen = scored[0].score > 0 ? scored.slice(0, 3).map((item) => item.fact) : [factByKey.keppylab, factByKey.stemuli, factByKey.corider];
    const lead = chosen[0];
    const second = chosen[1];
    const shard = tinyGenerate(`${question} ${lead.title}`, 16);
    const detail = lead.details[(question.length + lead.key.length) % lead.details.length];
    const bridge = second && second.key !== lead.key ? ` Nearby block: ${second.title} because ${second.details[0].charAt(0).toLowerCase()}${second.details[0].slice(1)}` : "";
    return {
      keys: chosen.map((fact) => fact.key),
      text: `${lead.title}: ${lead.text} ${detail} tiny continuation: "${shard}..."${bridge}`,
    };
  }

  function addLine(who, text) {
    const line = document.createElement("p");
    const label = document.createElement("strong");
    label.textContent = `${who}: `;
    line.append(label, document.createTextNode(text));
    transcript.appendChild(line);
    transcript.scrollTop = transcript.scrollHeight;
  }

  function submitQuestion(question) {
    const clean = question.trim();
    if (!clean) return;
    addLine("you", clean);
    const reply = answer(clean);
    activeKeys = reply.keys;
    primaryKey = reply.keys[0];
    sceneEvent(clean, reply.keys);
    repairPulse(primaryKey, 2);
    status.textContent = `local / ${reply.keys.join("+")}`;
    window.setTimeout(() => addLine("tiny", reply.text), 90);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuestion(input.value);
    input.value = "";
    typedRebuildLevel = 0;
  });

  input.addEventListener("input", () => {
    const level = Math.min(9, Math.floor(input.value.trim().length / 12));
    if (level > typedRebuildLevel) {
      typedRebuildLevel = level;
      rebuildTowerStep(primaryKey, 1);
      repairPulse(primaryKey, 1);
    }
  });

  promptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.prompt;
      typedRebuildLevel = 0;
      submitQuestion(input.value);
      input.value = "";
    });
  });

  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
  if (!gl) {
    status.textContent = "webgl unavailable";
    return;
  }

  const vertexSource = `
    attribute vec3 aPosition;
    attribute float aShade;
    uniform mat4 uMatrix;
    varying float vShade;
    void main() {
      vShade = aShade;
      gl_Position = uMatrix * vec4(aPosition, 1.0);
    }
  `;
  const fragmentSource = `
    precision mediump float;
    uniform vec3 uColor;
    varying float vShade;
    void main() {
      gl_FragColor = vec4(uColor * vShade, 1.0);
    }
  `;

  function shader(type, source) {
    const result = gl.createShader(type);
    gl.shaderSource(result, source);
    gl.compileShader(result);
    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(result));
    return result;
  }

  const program = gl.createProgram();
  gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);

  const faces = [
    [[-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], 0.95],
    [[0.5, -0.5, -0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], 0.55],
    [[-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5], 1.12],
    [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5], 0.42],
    [[0.5, -0.5, 0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, -0.5, 0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], 0.78],
    [[-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], 0.7],
  ];
  const cube = [];
  faces.forEach((face) => {
    const shade = face[6];
    face.slice(0, 6).forEach((point) => cube.push(point[0], point[1], point[2], shade));
  });
  const cubeBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube), gl.STATIC_DRAW);

  const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
  const aPosition = gl.getAttribLocation(program, "aPosition");
  const aShade = gl.getAttribLocation(program, "aShade");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(aShade);
  gl.vertexAttribPointer(aShade, 1, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);

  const uMatrix = gl.getUniformLocation(program, "uMatrix");
  const uColor = gl.getUniformLocation(program, "uColor");
  const blocks = [];
  const sparks = [];
  const drones = [];
  const groundTemplate = [];
  const towers = new Map();
  const towerBlueprints = new Map();
  const towerLabels = new Map();
  let blackHole = null;
  let planetShieldFrames = 0;
  let signalIntegrity = 100;
  let threatLevel = 0;
  let towersOnline = 0;
  let repairCharge = 0;
  let showcaseTimers = [];
  let droneSerial = 0;
  let dismantledBlocks = 0;
  let lastDroneReport = 0;
  let activeKeys = ["keppylab"];
  let primaryKey = "keppylab";
  let drag = 0;
  let dragging = false;
  let lastX = 0;
  let targetCenter = [0, 1.8, 0];
  let currentCenter = [0, 1.8, 0];
  let eventClock = 0;

  function addBlock(x, y, z, color, key, scale = 1, kind = "solid") {
    const block = { x, y, z, color, key, scale, kind, born: eventClock };
    blocks.push(block);
    return block;
  }

  for (let x = -11; x <= 11; x += 1) {
    for (let z = -11; z <= 11; z += 1) {
      const ring = Math.abs(x) + Math.abs(z);
      if (ring > 20 || (x * x + z * z > 132 && (x + z) % 2)) continue;
      const y = -1 + (Math.sin(x * 0.8) + Math.cos(z * 0.7) > 1.3 ? 0.18 : 0);
      const grass = ring % 3 === 0 ? [0.19, 0.45, 0.25] : [0.14, 0.38, 0.24];
      groundTemplate.push({ x, y, z, color: grass, scale: 1 });
      addBlock(x, y, z, grass, "ground", 1, "ground");
    }
  }

  const towerLayout = [
    ["stemuli", -7, -4, 6],
    ["orb", -4, 4, 7],
    ["corider", 2, -5, 8],
    ["evals", 5, -2, 6],
    ["labs", 7, 3, 5],
    ["startup", 0, 0, 5],
    ["systems", 8, -7, 4],
    ["keppylab", -8, 6, 5],
    ["pegasys", -1, 8, 4],
    ["dolly", 4, 7, 3],
    ["ai2", -9, 0, 4],
    ["older", 9, 6, 4],
  ];
  towerLayout.forEach(([key, x, z, height]) => {
    towerBlueprints.set(key, { x, z, height });
    buildTower(key, x, z, height);
  });

  if (towerLabelLayer) {
    towerLayout.forEach(([key]) => {
      const fact = factByKey[key];
      if (!fact) return;
      const label = document.createElement("span");
      label.className = "tower-label";
      label.textContent = shortTowerLabel(fact.title);
      label.style.borderColor = `rgba(${Math.round(fact.color[0] * 255)}, ${Math.round(fact.color[1] * 255)}, ${Math.round(fact.color[2] * 255)}, 0.48)`;
      towerLabelLayer.appendChild(label);
      towerLabels.set(key, label);
    });
  }

  function shortTowerLabel(title) {
    return title
      .replace("Earlier engineering", "Earlier")
      .replace("Pegasys / Fortive", "Pegasys")
      .replace("Startup fit", "Startup")
      .replace("Labs fit", "Labs");
  }

  function buildTower(key, x, z, height, sparkle = false) {
    const fact = factByKey[key];
    if (!fact) return;
    towers.set(key, { x, z, height });
    for (let y = 0; y < height; y += 1) addBlock(x, y, z, fact.color, key, 1);
    addBlock(x, height, z, fact.color.map((value) => Math.min(1, value + 0.18)), key, 0.72, "cap");
    if (sparkle) addDebris(x, height + 0.5, z, fact.color, key, 10);
  }

  function releaseBlockClaim(block) {
    if (block && block.claimedBy) delete block.claimedBy;
  }

  function clearDroneTarget(drone) {
    if (drone.target && drone.target.claimedBy === drone.id) releaseBlockClaim(drone.target);
    drone.target = null;
  }

  function updateTowerHeight(key) {
    const tower = towers.get(key);
    if (!tower) return;
    const top = blocks.reduce((max, block) => {
      if (block.key !== key || block.kind === "spark" || block.kind === "signal") return max;
      return Math.max(max, Math.ceil(block.y + block.scale));
    }, 0);
    tower.height = Math.max(0, top);
  }

  function removeSceneBlock(block) {
    releaseBlockClaim(block);
    const blockIndex = blocks.indexOf(block);
    if (blockIndex >= 0) blocks.splice(blockIndex, 1);
    const sparkIndex = sparks.indexOf(block);
    if (sparkIndex >= 0) sparks.splice(sparkIndex, 1);
    if (block && block.key !== "ground") updateTowerHeight(block.key);
  }

  function trimSparks(max = 180) {
    while (sparks.length > max) removeSceneBlock(sparks[0]);
  }

  function addDebris(x, y, z, color, key, count = 7) {
    eventClock += 1;
    for (let i = 0; i < count; i += 1) {
      const angle = eventClock * 0.42 + i * 1.7;
      const lift = 0.28 + (i % 3) * 0.18;
      const tint = color.map((value) => clamp(value + 0.12 - (i % 2) * 0.08, 0, 1));
      const piece = addBlock(x + Math.cos(angle) * 0.36, y + lift, z + Math.sin(angle) * 0.36, tint, key, 0.18 + (i % 2) * 0.04, "spark");
      sparks.push(piece);
    }
    trimSparks();
  }

  function countBlueprintBlocks(key) {
    const blueprint = towerBlueprints.get(key);
    if (!blueprint) return 0;
    let count = 0;
    for (let y = 0; y < blueprint.height; y += 1) {
      if (hasBlueprintBlock(key, blueprint, y)) count += 1;
    }
    if (hasBlueprintBlock(key, blueprint, blueprint.height, "cap")) count += 1;
    return count;
  }

  function getWorldState() {
    let built = 0;
    let total = 0;
    let online = 0;
    towerBlueprints.forEach((blueprint, key) => {
      const towerTotal = blueprint.height + 1;
      const towerBuilt = countBlueprintBlocks(key);
      built += towerBuilt;
      total += towerTotal;
      if (towerBuilt / towerTotal >= 0.72) online += 1;
    });
    const groundTotal = Math.max(1, groundTemplate.length);
    const groundBuilt = blocks.filter((block) => block.key === "ground").length;
    const groundRatio = clamp(groundBuilt / groundTotal, 0, 1);
    const towerRatio = total ? built / total : 1;
    const blackHoleThreat = blackHole ? Math.min(62, 22 + blackHole.age * 0.045) : 0;
    const droneThreat = Math.min(44, drones.length * 6);
    const threat = Math.round(clamp(blackHoleThreat + droneThreat, 0, 100));
    const integrity = Math.round(clamp(towerRatio * 72 + groundRatio * 22 + Math.max(0, 10 - threat * 0.09), 0, 100));
    return { integrity, online, totalTowers: towerBlueprints.size, threat };
  }

  function updateHud() {
    const world = getWorldState();
    signalIntegrity = world.integrity;
    towersOnline = world.online;
    threatLevel = world.threat;
    if (signalMeter) signalMeter.textContent = `${world.integrity}%`;
    if (towerMeter) towerMeter.textContent = `${world.online}/${world.totalTowers}`;
    if (threatMeter) {
      threatMeter.textContent = world.threat > 70 ? "critical" : world.threat > 38 ? "hot" : world.threat > 0 ? "active" : "calm";
    }
    if (focusMeter) {
      const focus = factByKey[primaryKey] || factByKey.keppylab;
      focusMeter.textContent = focus.title;
    }
  }

  function repairPulse(key = primaryKey, intensity = 1) {
    const towerKey = towerBlueprints.has(key) ? key : "keppylab";
    const blueprint = towerBlueprints.get(towerKey);
    const fact = factByKey[towerKey];
    if (!blueprint || !fact) return;
    repairCharge = Math.min(100, repairCharge + intensity * 12);
    eventClock += 1;
    const pulseCount = 5 + intensity * 3;
    for (let i = 0; i < pulseCount; i += 1) {
      const angle = eventClock * 0.6 + i * ((Math.PI * 2) / pulseCount);
      const radius = 1.15 + intensity * 0.25 + (i % 2) * 0.35;
      const y = Math.max(1.2, (towers.get(towerKey)?.height || blueprint.height) * 0.5) + (i % 3) * 0.32;
      sparks.push(addBlock(blueprint.x + Math.cos(angle) * radius, y, blueprint.z + Math.sin(angle) * radius, [0.52, 1, 0.84], towerKey, 0.18, "signal"));
    }
    drones.forEach((drone) => {
      const dx = drone.x - blueprint.x;
      const dz = drone.z - blueprint.z;
      const distance = Math.hypot(dx, drone.y - blueprint.height * 0.5, dz) || 0.001;
      if (distance > 5.5 + intensity * 1.5) return;
      clearDroneTarget(drone);
      drone.stun = Math.max(drone.stun || 0, 36 + intensity * 18);
      drone.x += (dx / distance) * 0.65;
      drone.z += (dz / distance) * 0.65;
      drone.y += 0.24;
    });
    if (blackHole) {
      const distance = Math.hypot(blackHole.x - blueprint.x, blackHole.y - blueprint.height * 0.5, blackHole.z - blueprint.z);
      if (distance < blackHole.radius + 3) blackHole.radius = Math.max(2.6, blackHole.radius - intensity * 0.35);
    }
    trimSparks(190);
  }

  function hasBlueprintBlock(key, blueprint, y, kind = "solid") {
    return blocks.some((block) => {
      const kindMatches = kind === "cap" ? block.kind === "cap" : block.kind === "solid" || block.kind === "query";
      return block.key === key && kindMatches && Math.abs(block.x - blueprint.x) < 0.42 && Math.abs(block.z - blueprint.z) < 0.42 && Math.abs(block.y - y) < 0.42 && block.scale > 0.18;
    });
  }

  function rebuildTowerStep(key = primaryKey, amount = 1) {
    const towerKey = towerBlueprints.has(key) ? key : "keppylab";
    const blueprint = towerBlueprints.get(towerKey);
    const fact = factByKey[towerKey];
    if (!blueprint || !fact) return;
    let built = 0;
    eventClock += 1;
    for (let y = 0; y < blueprint.height && built < amount; y += 1) {
      if (hasBlueprintBlock(towerKey, blueprint, y)) continue;
      const color = fact.color.map((value) => clamp(value + 0.08 + built * 0.02, 0, 1));
      addBlock(blueprint.x, y, blueprint.z, color, towerKey, 0.9, "query");
      built += 1;
    }
    if (built < amount && !hasBlueprintBlock(towerKey, blueprint, blueprint.height, "cap")) {
      addBlock(blueprint.x, blueprint.height, blueprint.z, fact.color.map((value) => Math.min(1, value + 0.18)), towerKey, 0.72, "cap");
      built += 1;
    }
    if (!built) return;
    const tower = towers.get(towerKey) || { x: blueprint.x, z: blueprint.z, height: 0 };
    tower.x = blueprint.x;
    tower.z = blueprint.z;
    tower.height = Math.max(tower.height, blueprint.height);
    towers.set(towerKey, tower);
    targetCenter = [blueprint.x, Math.max(2.4, tower.height * 0.7), blueprint.z];
    status.textContent = `world / ${fact.title} rebuilding`;
  }

  function spawnTower(key = primaryKey) {
    const towerKey = towerBlueprints.has(key) ? key : "keppylab";
    const blueprint = towerBlueprints.get(towerKey);
    const fact = factByKey[towerKey];
    if (!blueprint || !fact) return;
    eventClock += 1;
    for (let i = blocks.length - 1; i >= 0; i -= 1) {
      const block = blocks[i];
      if (block.key === towerKey && block.kind !== "spark") removeSceneBlock(block);
    }
    buildTower(towerKey, blueprint.x, blueprint.z, blueprint.height, true);
    activeKeys = [towerKey, ...activeKeys.filter((activeKey) => activeKey !== towerKey)].slice(0, 3);
    primaryKey = towerKey;
    targetCenter = [blueprint.x, Math.max(2.8, blueprint.height * 0.75), blueprint.z];
    status.textContent = `world / ${fact.title} restored`;
  }

  function spawnAllTowers() {
    eventClock += 1;
    if (blackHole) {
      addDebris(blackHole.x, blackHole.y, blackHole.z, [0.66, 0.35, 1], "blackhole", 14);
      blackHole = null;
    }
    towerBlueprints.forEach((blueprint, key) => {
      for (let i = blocks.length - 1; i >= 0; i -= 1) {
        const block = blocks[i];
        if (block.key === key && block.kind !== "spark" && block.kind !== "signal") removeSceneBlock(block);
      }
      const fact = factByKey[key];
      buildTower(key, blueprint.x, blueprint.z, blueprint.height, false);
      addDebris(blueprint.x, blueprint.height + 0.35, blueprint.z, fact.color, key, 4);
    });
    drones.forEach((drone, index) => {
      clearDroneTarget(drone);
      drone.stun = 420 + index * 20;
      const angle = index * 2.1 + eventClock * 0.4;
      drone.x = Math.cos(angle) * 13;
      drone.y = 5 + (index % 3) * 0.55;
      drone.z = Math.sin(angle) * 13;
    });
    lastDroneReport = dismantledBlocks;
    activeKeys = ["keppylab", "corider", "stemuli"];
    primaryKey = "keppylab";
    repairCharge = 100;
    targetCenter = [0, 3.2, 0];
    status.textContent = "world / skyline restored";
  }

  function spawnPlanet() {
    eventClock += 1;
    for (let i = blocks.length - 1; i >= 0; i -= 1) {
      if (blocks[i].key === "ground") removeSceneBlock(blocks[i]);
    }
    groundTemplate.forEach((ground, index) => {
      const flicker = index % 5 === 0 ? 0.04 : 0;
      const color = ground.color.map((value) => clamp(value + flicker, 0, 1));
      addBlock(ground.x, ground.y, ground.z, color, "ground", ground.scale, "ground");
    });
    planetShieldFrames = 260;
    if (blackHole) {
      blackHole.age = Math.min(blackHole.age, 120);
      blackHole.radius = Math.min(blackHole.radius, 5);
    }
    targetCenter = [0, 1.8, 0];
    status.textContent = "world / planet restored";
  }

  function towerTargets(preferredKey) {
    const candidates = blocks.filter((block) => block.key !== "ground" && block.kind !== "spark" && block.kind !== "signal" && !block.claimedBy && block.scale > 0.12);
    const preferred = candidates.filter((block) => block.key === preferredKey);
    return preferred.length ? preferred : candidates;
  }

  function chooseDroneTarget(drone) {
    const candidates = towerTargets(primaryKey);
    if (!candidates.length) return null;
    const target = candidates.reduce((best, block) => {
      const distance = Math.hypot(block.x - drone.x, block.y - drone.y, block.z - drone.z);
      const activeBonus = activeKeys.includes(block.key) ? 4 : 0;
      const capBonus = block.kind === "cap" ? 2 : 0;
      const score = block.y * 1.35 - distance * 0.18 + activeBonus + capBonus;
      return !best || score > best.score ? { block, score } : best;
    }, null).block;
    target.claimedBy = drone.id;
    return target;
  }

  function spawnDrones(count = 3) {
    eventClock += 1;
    const baseAngle = eventClock * 0.77 + drones.length * 0.31;
    for (let i = 0; i < count; i += 1) {
      const angle = baseAngle + (i / count) * Math.PI * 2;
      drones.push({
        id: `drone-${droneSerial}`,
        x: currentCenter[0] + Math.cos(angle) * 12,
        y: 4.2 + i * 0.42,
        z: currentCenter[2] + Math.sin(angle) * 12,
        target: null,
        speed: 0.055 + i * 0.006,
        scale: 0.34,
        color: [0.62, 0.92, 1],
        phase: angle,
        age: 0,
        stun: 0,
        dismantled: 0,
      });
      droneSerial += 1;
    }
    status.textContent = `world / ${drones.length} drones`;
  }

  function spawnBlackHole() {
    eventClock += 1;
    blackHole = {
      x: currentCenter[0],
      y: Math.max(2.7, currentCenter[1] + 0.5),
      z: currentCenter[2],
      age: 0,
      life: 2600,
      radius: 2.6,
      spin: eventClock * 0.4,
    };
    targetCenter = [blackHole.x, blackHole.y, blackHole.z];
    status.textContent = "world / singularity";
  }

  function clearShowcase() {
    showcaseTimers.forEach((timer) => window.clearTimeout(timer));
    showcaseTimers = [];
  }

  function queueShowcase(delay, action) {
    showcaseTimers.push(window.setTimeout(action, delay));
  }

  function runShowcase() {
    clearShowcase();
    addLine("world", "showcase mode: build the planet, focus the work, introduce threat, then recover the signal.");
    spawnPlanet();
    spawnAllTowers();
    queueShowcase(450, () => submitQuestion("show me Corider and evals"));
    queueShowcase(1250, () => spawnDrones(5));
    queueShowcase(1850, () => {
      repairPulse("corider", 3);
      rebuildTowerStep("corider", 3);
      addLine("world", "typing energy pushes drones back and repairs the focused tower.");
    });
    queueShowcase(2650, () => {
      primaryKey = "stemuli";
      activeKeys = ["stemuli", "startup", "orb"];
      spawnBlackHole();
    });
    queueShowcase(3900, () => {
      repairPulse("stemuli", 2);
      addLine("world", "crisis is live. Ask questions or type to repair signal; summon towers/planet only when you want to save the skyline.");
    });
  }

  function updateDrones(t) {
    drones.forEach((drone) => {
      drone.age += 1;
      if (drone.stun > 0) {
        drone.stun -= 1;
        const drift = t * 1.3 + drone.phase;
        drone.x += Math.cos(drift) * 0.025;
        drone.y += Math.sin(drift * 1.7) * 0.018;
        drone.z += Math.sin(drift) * 0.025;
        return;
      }
      if (!drone.target || !blocks.includes(drone.target) || drone.target.key === "ground") {
        clearDroneTarget(drone);
        drone.target = chooseDroneTarget(drone);
      }

      if (!drone.target) {
        const patrol = t * 0.7 + drone.phase;
        drone.x += (currentCenter[0] + Math.cos(patrol) * 7 - drone.x) * 0.014;
        drone.y += (3.8 + Math.sin(patrol * 1.6) * 0.8 - drone.y) * 0.014;
        drone.z += (currentCenter[2] + Math.sin(patrol) * 7 - drone.z) * 0.014;
        return;
      }

      const target = drone.target;
      const dx = target.x - drone.x;
      const dy = target.y + 0.2 - drone.y;
      const dz = target.z - drone.z;
      const distance = Math.hypot(dx, dy, dz) || 0.001;
      const horizontal = Math.hypot(dx, dz) || 1;
      const weave = Math.sin(t * 8 + drone.phase) * 0.014;
      const speed = blackHole ? drone.speed * 0.86 : drone.speed;
      drone.x += (dx / distance) * speed + (-dz / horizontal) * weave;
      drone.y += (dy / distance) * speed + Math.sin(t * 6 + drone.phase) * 0.004;
      drone.z += (dz / distance) * speed + (dx / horizontal) * weave;

      if (distance < 0.56) {
        const color = target.color || [0.7, 0.9, 1];
        const key = target.key;
        const x = target.x;
        const y = target.y;
        const z = target.z;
        clearDroneTarget(drone);
        removeSceneBlock(target);
        addDebris(x, y, z, color, key, 6);
        drone.dismantled += 1;
        dismantledBlocks += 1;
        if (dismantledBlocks - lastDroneReport >= 6) {
          lastDroneReport = dismantledBlocks;
          status.textContent = `world / ${dismantledBlocks} blocks dismantled`;
        }
      }
    });
  }

  function updateBlackHole(t) {
    if (!blackHole) return;
    blackHole.age += 1;
    blackHole.radius = Math.min(28, 2.6 + blackHole.age * 0.018);
    blackHole.y += Math.sin(t * 1.8 + blackHole.spin) * 0.002;
    const planetHunger = clamp((blackHole.age - 520) / 1180, 0, 1);

    for (let i = blocks.length - 1; i >= 0; i -= 1) {
      const block = blocks[i];
      const isGround = block.key === "ground";
      const dx = blackHole.x - block.x;
      const dy = blackHole.y - block.y;
      const dz = blackHole.z - block.z;
      const distance = Math.hypot(dx, dy, dz) || 0.001;
      const horizontal = Math.hypot(dx, dz) || 1;
      const groundReach = blackHole.radius * (0.45 + planetHunger * 0.85);
      const reachesGround = isGround && planetShieldFrames <= 0 && blackHole.age > 520 && distance < groundReach;
      if (isGround && !reachesGround) continue;
      const reach = blackHole.radius + (block.kind === "spark" || block.kind === "signal" ? 4 : 0);
      if (distance > reach) continue;
      const falloff = clamp(1 - distance / reach, 0, 1);
      const pull = (isGround ? 0.004 + planetHunger * 0.014 : 0.036) * (0.3 + falloff * 1.45);
      const swirl = pull * 0.68;
      block.x += (dx / distance) * pull + (-dz / horizontal) * swirl;
      block.y += (dy / distance) * pull + Math.sin(t * 4 + block.x) * 0.005;
      block.z += (dz / distance) * pull + (dx / horizontal) * swirl;
      block.scale = isGround ? Math.max(0.04, block.scale * (1 - 0.00045 - falloff * (0.0018 + planetHunger * 0.008))) : Math.max(0.04, block.scale * (1 - 0.003 - falloff * 0.012));
      if (isGround) {
        if ((distance < 0.42 && blackHole.age > 760) || (block.scale <= 0.06 && planetHunger > 0.35)) removeSceneBlock(block);
      } else if (distance < 0.48 || block.scale <= 0.06) {
        removeSceneBlock(block);
      }
    }

    for (let i = drones.length - 1; i >= 0; i -= 1) {
      const drone = drones[i];
      const dx = blackHole.x - drone.x;
      const dy = blackHole.y - drone.y;
      const dz = blackHole.z - drone.z;
      const distance = Math.hypot(dx, dy, dz) || 0.001;
      if (distance > blackHole.radius + 1.5) continue;
      const falloff = clamp(1 - distance / (blackHole.radius + 1.5), 0, 1);
      const pull = 0.045 * (0.35 + falloff * 1.4);
      drone.x += (dx / distance) * pull;
      drone.y += (dy / distance) * pull;
      drone.z += (dz / distance) * pull;
      drone.scale = Math.max(0.05, drone.scale * (1 - 0.004 - falloff * 0.018));
      if (distance < 0.5 || drone.scale <= 0.06) {
        clearDroneTarget(drone);
        drones.splice(i, 1);
        addDebris(drone.x, drone.y, drone.z, [0.66, 0.35, 1], "blackhole", 8);
      }
    }

    if (blackHole.age > blackHole.life) {
      blackHole = null;
      status.textContent = drones.length ? `world / ${drones.length} drones` : "local / awake";
    }
  }

  if (spawnDroneButton) {
    spawnDroneButton.addEventListener("click", () => {
      spawnDrones(3);
      addLine("world", "agentic drones spawned. They pick tower blocks, claim targets, and start dismantling the resume skyline.");
    });
  }

  if (runShowcaseButton) {
    runShowcaseButton.addEventListener("click", () => {
      runShowcase();
    });
  }

  if (spawnTowersButton) {
    spawnTowersButton.addEventListener("click", () => {
      spawnAllTowers();
      addLine("world", "all resume towers rebuilt from their blueprints. Skyline back online.");
    });
  }

  if (spawnPlanetButton) {
    spawnPlanetButton.addEventListener("click", () => {
      spawnPlanet();
      addLine("world", "planet floor restored from the original terrain template. Fresh ground gets a short shield window.");
    });
  }

  if (spawnBlackHoleButton) {
    spawnBlackHoleButton.addEventListener("click", () => {
      spawnBlackHole();
      addLine("world", "black hole dropped at the current focus. Nearby blocks now orbit, shrink, and get pulled out of the scene.");
    });
  }

  function sceneEvent(question, keys) {
    eventClock += 1;
    const lead = towers.get(keys[0]) || towers.get("keppylab");
    targetCenter = [lead.x, Math.max(2.4, lead.height * 0.6), lead.z];
    keys.forEach((key, keyIndex) => {
      const tower = towers.get(key);
      const fact = factByKey[key];
      if (!tower || !fact) return;
      const terms = tokenize(question).slice(0, 7);
      const amount = Math.max(4, terms.length + 2);
      for (let i = 0; i < amount; i += 1) {
        const angle = (i / amount) * Math.PI * 2 + eventClock * 0.7 + keyIndex;
        const radius = 1.4 + keyIndex * 0.7 + (i % 2) * 0.25;
        const y = tower.height + 1 + (i % 4) * 0.42;
        const color = fact.color.map((value) => clamp(value + 0.24 - keyIndex * 0.05, 0, 1));
        sparks.push(addBlock(tower.x + Math.cos(angle) * radius, y, tower.z + Math.sin(angle) * radius, color, key, 0.26, "spark"));
      }
      if (/build|grow|more|show|minecraft|summon|make/i.test(question)) {
        rebuildTowerStep(key, 2);
        repairPulse(key, 1);
      }
    });
    trimSparks(160);
  }

  function m4Identity() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  function m4Multiply(a, b) {
    const out = new Array(16);
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function m4Translate(x, y, z) {
    const out = m4Identity();
    out[12] = x;
    out[13] = y;
    out[14] = z;
    return out;
  }
  function m4Scale(s) {
    return [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1];
  }
  function perspective(fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2);
    const nf = 1 / (near - far);
    return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
  }
  function normalize(v) {
    const len = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / len, v[1] / len, v[2] / len];
  }
  function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function lookAt(eye, center, up) {
    const z = normalize([eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]]);
    const x = normalize(cross(up, z));
    const y = cross(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, eye), -dot(y, eye), -dot(z, eye), 1];
  }
  function projectPoint(matrix, x, y, z) {
    const clipX = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12];
    const clipY = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13];
    const clipZ = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14];
    const clipW = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
    if (clipW <= 0.08) return null;
    const ndcX = clipX / clipW;
    const ndcY = clipY / clipW;
    const ndcZ = clipZ / clipW;
    if (ndcX < -1.08 || ndcX > 1.08 || ndcY < -1.08 || ndcY > 1.08 || ndcZ < -1.05 || ndcZ > 1.05) return null;
    return {
      x: (ndcX * 0.5 + 0.5) * canvas.clientWidth,
      y: (-ndcY * 0.5 + 0.5) * canvas.clientHeight,
      z: ndcZ,
    };
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.floor(canvas.clientWidth * ratio);
    const height = Math.floor(canvas.clientHeight * ratio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  canvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    lastX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    drag += (event.clientX - lastX) * 0.008;
    lastX = event.clientX;
  });
  canvas.addEventListener("pointerup", () => {
    dragging = false;
  });

  gl.enable(gl.DEPTH_TEST);

  function drawBlock(block, t, viewProjection) {
    const isActive = activeKeys.includes(block.key);
    const age = Math.max(0, eventClock - (block.born || 0));
    const pulse = block.kind === "blackhole" || block.kind === "signal" ? 1 + Math.sin(t * 7 + block.x) * 0.12 : isActive ? 1 + Math.sin(t * 5 + block.x) * 0.08 : 1;
    const sparkFloat = block.kind === "spark" || block.kind === "signal" ? Math.sin(t * 4 + block.x + block.z) * 0.18 + age * 0.03 : 0;
    const droneFloat = block.kind === "drone" ? Math.sin(t * 9 + block.phase) * 0.14 : 0;
    const bob = isActive && block.y > 3 ? Math.sin(t * 3) * 0.08 : 0;
    const fadeScale = block.kind === "spark" || block.kind === "signal" ? Math.max(0.08, block.scale - age * 0.003) : block.scale;
    const model = m4Multiply(m4Translate(block.x, block.y + bob + sparkFloat + droneFloat, block.z), m4Scale(fadeScale * pulse));
    gl.uniformMatrix4fv(uMatrix, false, new Float32Array(m4Multiply(viewProjection, model)));
    gl.uniform3fv(uColor, new Float32Array(block.color));
    gl.drawArrays(gl.TRIANGLES, 0, 36);
  }

  function drawBlackHole(t, viewProjection) {
    if (!blackHole) return;
    const coreScale = 0.78 + Math.min(0.55, blackHole.age * 0.0025) + Math.sin(t * 5) * 0.08;
    drawBlock({
      x: blackHole.x,
      y: blackHole.y,
      z: blackHole.z,
      color: [0.02, 0.01, 0.06],
      key: "blackhole",
      scale: coreScale,
      kind: "blackhole",
      born: eventClock,
    }, t, viewProjection);

    for (let i = 0; i < 14; i += 1) {
      const angle = blackHole.spin + t * 2.7 + (i / 14) * Math.PI * 2;
      const radius = 1.05 + (i % 3) * 0.18 + Math.sin(t * 3 + i) * 0.06;
      drawBlock({
        x: blackHole.x + Math.cos(angle) * radius,
        y: blackHole.y + Math.sin(angle * 2.0) * 0.18,
        z: blackHole.z + Math.sin(angle) * radius,
        color: i % 2 ? [0.5, 0.12, 0.82] : [0.1, 0.75, 0.86],
        key: "blackhole",
        scale: 0.18 + (i % 2) * 0.04,
        kind: "blackhole",
        born: eventClock,
      }, t, viewProjection);
    }
  }

  function drawSignalField(t, viewProjection) {
    const focus = towerBlueprints.get(primaryKey) || towerBlueprints.get("keppylab");
    if (!focus) return;
    const heat = clamp(signalIntegrity / 100 + repairCharge / 400, 0, 1);
    const signalColor = heat > 0.65 ? [0.24, 1, 0.78] : heat > 0.35 ? [1, 0.72, 0.24] : [1, 0.24, 0.36];
    const coreScale = 0.32 + heat * 0.24 + Math.sin(t * 5) * 0.05;
    drawBlock({
      x: 0,
      y: 1.35 + Math.sin(t * 2.2) * 0.18,
      z: 0,
      color: signalColor,
      key: "signal",
      scale: coreScale,
      kind: "signal",
      born: eventClock,
    }, t, viewProjection);

    const ringCount = 10;
    const radius = 1.25 + heat * 0.55;
    for (let i = 0; i < ringCount; i += 1) {
      const angle = t * 1.8 + (i / ringCount) * Math.PI * 2;
      drawBlock({
        x: focus.x + Math.cos(angle) * radius,
        y: Math.max(1.4, focus.height * 0.72) + Math.sin(angle * 2) * 0.28,
        z: focus.z + Math.sin(angle) * radius,
        color: signalColor,
        key: primaryKey,
        scale: 0.12 + heat * 0.05,
        kind: "signal",
        born: eventClock,
      }, t, viewProjection);
    }
  }

  function updateTowerLabels(viewProjection) {
    if (!towerLabels.size) return;
    const sink = blackHole ? projectPoint(viewProjection, blackHole.x, blackHole.y, blackHole.z) : null;
    towerBlueprints.forEach((blueprint, key) => {
      const label = towerLabels.get(key);
      if (!label) return;
      const tower = towers.get(key) || blueprint;
      const health = countBlueprintBlocks(key) / (blueprint.height + 1);
      const labelY = Math.max(1.6, Math.min(blueprint.height + 1.65, tower.height + 1.35));
      let screen = projectPoint(viewProjection, blueprint.x, labelY, blueprint.z);
      const distanceToBlackHole = blackHole ? Math.hypot(blackHole.x - blueprint.x, blackHole.y - labelY, blackHole.z - blueprint.z) : Infinity;
      const localPull = blackHole ? clamp((blackHole.radius + 5 - distanceToBlackHole) / 12, 0, 1) : 0;
      const globalPull = blackHole ? clamp((blackHole.age - 760) / 1100, 0, 1) : 0;
      const absorption = Math.max(localPull, globalPull);
      label.classList.toggle("is-active", activeKeys.includes(key));
      label.classList.toggle("is-damaged", health < 0.58);
      label.classList.toggle("is-being-sucked", absorption > 0.08);
      if (!screen && sink && absorption > 0.42) screen = sink;
      if (!screen) {
        label.classList.remove("is-visible");
        return;
      }
      if (sink && absorption > 0) {
        screen = {
          x: screen.x + (sink.x - screen.x) * absorption,
          y: screen.y + (sink.y - screen.y) * absorption,
          z: screen.z + (sink.z - screen.z) * absorption,
        };
      }
      const size = (activeKeys.includes(key) ? 1 : 0.88 + health * 0.1) * (1 - absorption * 0.72);
      label.style.transform = `translate(${screen.x}px, ${screen.y}px) translate(-50%, -118%) scale(${size})`;
      label.style.zIndex = String(Math.round((1 - screen.z) * 100));
      label.style.opacity = absorption > 0 ? String(clamp(0.96 - absorption * 0.82, 0.08, 0.96)) : "";
      label.style.filter = absorption > 0 ? `blur(${(absorption * 1.2).toFixed(2)}px)` : "";
      label.classList.add("is-visible");
    });
  }

  function render(time) {
    resize();
    const t = time * 0.001;
    if (planetShieldFrames > 0) planetShieldFrames -= 1;
    repairCharge = Math.max(0, repairCharge - 0.08);
    updateBlackHole(t);
    updateDrones(t);
    updateHud();
    gl.clearColor(0.02, 0.025, 0.035, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    currentCenter = currentCenter.map((value, index) => value + (targetCenter[index] - value) * 0.045);
    const angle = t * 0.1 + drag;
    const radius = 19;
    const eye = [currentCenter[0] + Math.cos(angle) * radius, currentCenter[1] + 10 + Math.sin(t * 0.4) * 1.2, currentCenter[2] + Math.sin(angle) * radius];
    const projection = perspective(Math.PI / 4, canvas.width / canvas.height, 0.1, 90);
    const view = lookAt(eye, currentCenter, [0, 1, 0]);
    const viewProjection = m4Multiply(projection, view);
    updateTowerLabels(viewProjection);

    blocks.forEach((block) => drawBlock(block, t, viewProjection));
    drawSignalField(t, viewProjection);
    drones.forEach((drone) => {
      drawBlock({
        x: drone.x,
        y: drone.y,
        z: drone.z,
        color: drone.color,
        key: "drone",
        scale: drone.scale,
        kind: "drone",
        born: eventClock,
        phase: drone.phase,
      }, t, viewProjection);
    });
    drawBlackHole(t, viewProjection);

    requestAnimationFrame(render);
  }

  sceneEvent("awake keppylab", ["keppylab"]);
  requestAnimationFrame(render);
})();
