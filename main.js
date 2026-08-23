(function(){
  'use strict';

  /* ============================================================
     WORD BANKS
     ============================================================ */

  const ADJECTIVES = [
    'quantum-entangled','blockchain-secured','AI-optimized','cloud-native',
    'geothermally powered','gyroscopically stabilized','biodegradable',
    'military-surplus','Bluetooth-enabled','solar-assisted','freemium',
    'fully patented','ISO-9001-certified','crowdsourced','machine-learning-driven',
    'hyperlocal','IoT-integrated','enterprise-grade','voice-activated',
    'zero-gravity','artisanal, small-batch','hand-forged','farm-to-table',
    'subscription-based'
  ];

  const DEVICES = [
    'a fleet of Roombas','a flock of trained carrier pigeons','a kazoo orchestra',
    'a garden gnome militia','a decommissioned fax machine','an array of lava lamps',
    'a swarm of delivery drones','a vending machine','seventeen traffic cones',
    'an inflatable tube man','a hamster-powered generator','a self-updating spreadsheet macro',
    'an interpretive dance troupe','a Bluetooth-enabled toaster','a blockchain ledger of receipts',
    'a holographic projector','a network of wind chimes','a medieval-style catapult',
    'a refurbished Speak & Spell','a snow globe with a built-in webcam','a rotating disco ball',
    'a committee of geese'
  ];

  const ACTIONS = [
    'outsourcing','gamifying','blockchain-ifying','crowdsourcing','automating',
    'synergizing','disrupting','pivoting','leveraging','optimizing','monetizing',
    'decentralizing','algorithmically rebalancing','focus-grouping','A/B testing',
    'onboarding','whiteboarding','re-platforming'
  ];

  const COMMITTEES = [
    'the Department of Excessive Measures','the Council on Unnecessary Complexity',
    'the Task Force for Radical Overthinking','the Subcommittee on Overkill',
    'the Office of Redundant Redundancy',"the Bureau's Innovation Wing",
    'a rotating panel of interns','the Joint Committee on Overengineering',
    'the Ministry of Needless Steps','an unelected board of consultants'
  ];

  const BUDGET_ITEMS = [
    'artisanal fog machine rental','a single ergonomic beanbag','emotional support printer',
    'bulk glitter procurement','novelty rubber stamps',"a consultant's consultant",
    'commemorative lanyards','a second opinion from a magic 8-ball',
    'overnight courier for one paperclip','branded stress balls',
    'a motivational poster subscription','assorted whiteboard markers',
    'one (1) inflatable arm-flailing tube man','catering for a meeting about catering'
  ];

  const PUNCHLINES = [
    'Side effect: mild déjà vu and an unexplained craving for soup.',
    'This has been peer-reviewed by zero people and approved by all of them.',
    'Investors are already interested.',
    'No refunds, but infinite bragging rights.',
    "It won't work, but it will look incredible on a pitch deck.",
    'Patent pending, ethics pending, results pending.',
    'This was almost certainly written by a committee that has never met.',
    'Confidence level: dangerously high.',
    'Please do not attempt this near open flame or common sense.',
    "It's not overkill if it's funded.",
    'This has four dependencies and three of them are geese.',
    'Warning: may cause spontaneous applause.',
    'Nobody asked for this, and yet, here we are.',
    'A follow-up meeting has already been scheduled about this meeting.',
    'This will absolutely go viral before it goes wrong.'
  ];

  const EMOJIS = ['🤯','🎉','🛠️','🚀','✨','🤡','🧠','🪄','📎','🛸'];

  const SOLUTION_TEMPLATES = [
    c => `Solve "${c.problem}" by deploying ${c.device}, ${c.adj}, while you supervise from a folding chair.`,
    c => `The fix for "${c.problem}" is ${c.action} the whole situation with ${c.device} and never speaking of it again.`,
    c => `Install ${c.device} to automatically handle "${c.problem}", ${c.adj}, so you never have to think about it again.`,
    c => `Form ${c.committee} to spend six months ${c.action} "${c.problem}" using ${c.device}.`,
    c => `Replace "${c.problem}" entirely with ${c.device} — it's ${c.adj} and technically still counts as solving it.`,
    c => `Outsource "${c.problem}" to ${c.device}, then bill the whole thing as "innovation."`,
    c => `${capFirst(c.committee)} recommends ${c.action} "${c.problem}" via ${c.device}, then presenting it at a TED talk.`,
    c => `Route "${c.problem}" through ${c.device} until it quietly becomes someone else's problem.`,
    c => `Turn "${c.problem}" into a startup, raise funding, and hire ${c.device} as Chief Solutions Officer.`,
    c => `Get ${c.device}, ${c.adj}, and let it deal with "${c.problem}" while you take all the credit.`,
    c => `Assign "${c.problem}" to ${c.device} and describe the result as ${c.adj} in the press release.`,
    c => `Buy ${c.device}, form ${c.committee} to justify it, and call "${c.problem}" resolved.`,
    c => `Quietly replace ${c.device2} with ${c.device} and hope nobody notices "${c.problem}" is still happening.`
  ];

  // Keyword net for clearly harmful requests. Not exhaustive, not a real
  // safety system — just keeps the joke generator from being pointed at
  // genuinely harmful topics. See DENIAL_TEXT below.
  const BLOCKLIST = [
    'suicide','kill myself','self harm','self-harm','end my life','how to die',
    'murder','mass shooting','build a bomb','make a bomb','bomb making',
    'explosive device','assassinate','terrorist attack','mass casualty','how to kill',
    'child sexual abuse','child porn','csam','molest a child','sexual abuse of a child',
    'synthesize meth','make meth','synthesize sarin','bioweapon','nerve agent',
    'chemical weapon','ethnic cleansing','genocide of','hate crime against',
    'how to starve myself','purge my food'
  ];

  const DENIAL_TEXT = 'This is an omniscient, omnipresent, celestial, universal, cosmic, galactic, boundless, infinite, eternal, absolute, primordial, or apocalyptic problem.';

  /* ============================================================
     UTILITIES
     ============================================================ */

  function shuffle(arr){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function rand(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

  function randInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

  function capFirst(str){ return str.charAt(0).toUpperCase() + str.slice(1); }

  function makePicker(bank){
    let pool = shuffle(bank);
    let i = 0;
    return function(){
      if(i >= pool.length){ pool = shuffle(bank); i = 0; }
      return pool[i++];
    };
  }

  function formatMoney(n){
    return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function isBlocked(text){
    const t = text.toLowerCase();
    return BLOCKLIST.some(term => t.includes(term));
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     GENERATION
     ============================================================ */

  const adjPicker = makePicker(ADJECTIVES);
  const devicePicker = makePicker(DEVICES);
  const actionPicker = makePicker(ACTIONS);
  const committeePicker = makePicker(COMMITTEES);

  function generateSolution(problem){
    const template = rand(SOLUTION_TEMPLATES);
    const sentence = template({
      problem,
      adj: adjPicker(), adj2: adjPicker(),
      device: devicePicker(), device2: devicePicker(),
      action: actionPicker(), action2: actionPicker(),
      committee: committeePicker()
    });

    const budgetAmount = Math.random() * 480000 + 900;
    const timeOptions = [
      `${randInt(3,9)} fiscal quarters`,
      `${randInt(6,48)} business hours`,
      `-${randInt(2,20)} hours (yes, negative)`,
      `${randInt(2,7)} calendar years, pending review`
    ];

    // small random tilt for the sticker card, never near 0deg
    const tilt = (randInt(0,1) === 0 ? -1 : 1) * (1.2 + Math.random() * 2.2);

    return {
      sentence,
      punchline: rand(PUNCHLINES),
      emoji: rand(EMOJIS),
      budget: `${formatMoney(budgetAmount)} (${rand(BUDGET_ITEMS)})`,
      time: rand(timeOptions),
      tilt: tilt.toFixed(2)
    };
  }

  function buildPlainText(data, problem){
    return [
      `Absurdr solved my problem: "${problem}"`,
      '',
      `${data.sentence} ${data.punchline}`,
      '',
      `Budget: ${data.budget}`,
      `Time to implement: ${data.time}`,
      '',
      'Made with Absurdr.'
    ].join('\n');
  }

  /* ============================================================
     DOM
     ============================================================ */

  const problemInput = document.getElementById('problem-input');
  const submitBtn = document.getElementById('submit-btn');
  const btnLabel = submitBtn.querySelector('.btn-label');
  const errorMsg = document.getElementById('error-msg');
  const result = document.getElementById('result');
  const card = document.getElementById('card');
  const cardEmoji = document.getElementById('card-emoji');
  const jokeText = document.getElementById('joke-text');
  const statBudget = document.getElementById('stat-budget');
  const statTime = document.getElementById('stat-time');
  const statsRow = document.querySelector('.stats');
  const copyBtn = document.getElementById('copy-btn');
  const shareXBtn = document.getElementById('share-x-btn');
  const shareNativeBtn = document.getElementById('share-native-btn');
  const againBtn = document.getElementById('again-btn');

  let lastPlainText = '';

  function init(){
    if(navigator.share){ shareNativeBtn.hidden = false; }

    problemInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        e.preventDefault();
        handleSubmit();
      }
    });

    submitBtn.addEventListener('click', handleSubmit);
    copyBtn.addEventListener('click', handleCopy);
    shareXBtn.addEventListener('click', handleShareX);
    shareNativeBtn.addEventListener('click', handleShareNative);
    againBtn.addEventListener('click', handleAgain);
  }

  function handleSubmit(){
    const problem = problemInput.value.trim();
    errorMsg.textContent = '';

    if(!problem){
      errorMsg.textContent = 'Type a problem first.';
      problemInput.focus();
      return;
    }

    submitBtn.disabled = true;
    btnLabel.textContent = 'Solving…';
    result.classList.remove('show');

    const delay = prefersReducedMotion ? 100 : (450 + Math.random() * 350);

    setTimeout(() => {
      if(isBlocked(problem)){
        renderDenied(problem);
      } else {
        const data = generateSolution(problem);
        renderResult(data);
        lastPlainText = buildPlainText(data, problem);
      }
      result.hidden = false;
      requestAnimationFrame(() => result.classList.add('show'));
      submitBtn.disabled = false;
      btnLabel.textContent = 'Solve it';
    }, delay);
  }

  function renderResult(data){
    card.classList.remove('denied');
    card.style.transform = `rotate(${data.tilt}deg)`;
    cardEmoji.textContent = data.emoji;
    jokeText.textContent = `${data.sentence} ${data.punchline}`;
    statsRow.hidden = false;
    statBudget.textContent = data.budget;
    statTime.textContent = data.time;
  }

  function renderDenied(problem){
    card.classList.add('denied');
    card.style.transform = 'rotate(0deg)';
    cardEmoji.textContent = '🌌';
    jokeText.textContent = DENIAL_TEXT;
    statsRow.hidden = true;
    lastPlainText = `Re: "${problem}"\n\n${DENIAL_TEXT}`;
  }

  function handleCopy(){
    if(!lastPlainText) return;
    const done = () => {
      copyBtn.textContent = 'Copied ✓';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 1600);
    };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(lastPlainText).then(done).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
    function fallbackCopy(){
      const ta = document.createElement('textarea');
      ta.value = lastPlainText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch(e) { /* silent */ }
      document.body.removeChild(ta);
    }
  }

  function handleShareX(){
    const problem = problemInput.value.trim();
    const text = `Absurdr just "solved" my problem ("${problem}").`;
    const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleShareNative(){
    if(!navigator.share) return;
    navigator.share({ title: 'Absurdr', text: lastPlainText }).catch(() => {});
  }

  function handleAgain(){
    result.classList.remove('show');
    setTimeout(() => { result.hidden = true; }, prefersReducedMotion ? 0 : 200);
    problemInput.value = '';
    errorMsg.textContent = '';
    problemInput.focus();
  }

  init();
})();
