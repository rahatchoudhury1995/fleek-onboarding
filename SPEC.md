# FLEEK ONBOARDING EXPERIENCE — FULL SPECIFICATION

## PROJECT OVERVIEW

Build a live, web-based onboarding experience for a new Fleek hire. This is a multi-phase, interactive single-page React application that guides a new joiner from pre-start tasks through to their first day and beyond.

Stack: React + Vite, Tailwind CSS, localStorage for persistence, Anthropic Claude API for the Q&A assistant. Deploy-ready for Vercel.

---

## FILE STRUCTURE

```
/
├── public/
│   ├── abhi.png
│   ├── sanket.png
│   ├── founders.png
│   ├── logo.png         (light version — use on dark/gold backgrounds)
│   ├── logoblack.png    (dark version — use on light backgrounds)
│   └── favicon.png
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Phase0Welcome.jsx
│   │   ├── Phase1/
│   │   │   ├── Phase1Shell.jsx
│   │   │   ├── Section1Mission.jsx
│   │   │   ├── Section2Values.jsx
│   │   │   ├── Section3Admin.jsx
│   │   │   ├── Section4Equipment.jsx
│   │   │   ├── Section5WelcomeKit.jsx
│   │   │   └── Section6OfficeProp.jsx
│   │   ├── MeetTheTeam.jsx
│   │   ├── Phase2Congratulations.jsx
│   │   ├── Phase3Tasks.jsx
│   │   ├── QAAssistant.jsx
│   │   └── ProgressBar.jsx
│   └── utils/
│       ├── storage.js
│       └── countdown.js
├── SPEC.md
├── .env.example
├── vercel.json
└── package.json
```

---

## BRAND & DESIGN SYSTEM

### Colour Palette — use as CSS variables in index.css
```css
:root {
  --onyx: #0F0F0F;
  --gold: #FFD400;
  --floral-white: #F6F1E7;
  --pitch-black: #1D1A0E;
  --white: #FFFFFF;
  --graphite: #333333;
}
```

### Page Types
- IMPACT pages (Phase 0, Phase 2, phase transitions): gold (#FFD400) background, pitch black (#1D1A0E) text. Full screen, bold, minimal.
- CONTENT pages (Phase 1 sections, Phase 3): floral white (#F6F1E7) background, onyx text. Clean, warm, readable.

### Typography
- Import from Google Fonts: `Bebas Neue` for display headlines, `DM Sans` for body text
- Never use Arial, Inter, Roboto, or system fonts for display text

### Logo Rules
- `logo.png` on gold and dark backgrounds
- `logoblack.png` on floral white backgrounds
- Top left of every screen, consistently sized
- If image fails to load, render text: ✦ FLEEK

### The ✦ Mark
Use as a brand accent at meaningful moments — CTAs, completion states, section headers. Not on every line.

### Motion
- Smooth fade-in on all phase and section transitions (300ms ease)
- Gold hover states on all interactive cards and buttons
- Checked checklist items animate a gold checkmark and strikethrough
- Card hover: translateY(-2px) with gold border
- Countdown timer: smooth per-second tick
- Progress bar: smooth gold fill as sections complete

### Buttons
- Primary: gold background, pitch black text, bold, 8px border radius, generous padding
- Hover: scale(1.02), slightly deeper gold
- Locked/disabled: muted gold, cursor not-allowed, lock icon

---

## GLOBAL STATE

All state persisted to localStorage under key `fleek_onboarding`. Structure:

```json
{
  "firstName": "",
  "startDate": "",
  "currentPhase": "phase0",
  "currentSection": 1,
  "phase1Progress": {
    "section1": false,
    "section2": false,
    "section3": false,
    "section4": false,
    "section5": false,
    "section6": false
  },
  "phase3Progress": {
    "dayOne": [],
    "weekOne": [],
    "monthOne": []
  },
  "formData": {
    "values": [],
    "payroll": {
      "nameOnAccount": "",
      "accountNumber": "",
      "sortCode": "",
      "taxCode": ""
    },
    "equipment": {
      "laptop": "",
      "monitor": "",
      "peripherals": "",
      "additionalNeeds": ""
    },
    "welcomeKit": {
      "snacks": [],
      "size": "",
      "thriftFind": "",
      "wildcardQuestion": "",
      "wildcardAnswer": ""
    },
    "personalityAnswers": []
  }
}
```

On app load: check localStorage for existing state and restore it. If state exists, user lands where they left off with progress intact.

---

## PHASE 0 — WELCOME SCREEN

Type: IMPACT page. Gold background, pitch black text. Full screen centred layout.

Content:
- `logo.png` centred at top, large
- Headline: "Welcome to Fleek. ✦" — very large, Bebas Neue, bold
- Subline: "You made the right call. Let's get you ready." — DM Sans
- Input: First Name (required, text)
- Input: Start Date (required, date picker)
- CTA button: "Let's go ✦"
- Small text at bottom: "Reviewing this experience? Enter today's date as your start date to explore all phases."

If returning user (localStorage has data):
- Pre-fill fields
- Show: "Welcome back, [firstName]. Pick up where you left off ✦"
- Two options: "Continue" or "Start fresh"

Logic: On submit, validate both fields filled. Save to localStorage. Fade transition to Phase 1 Section 1.

---

## PHASE 1 — BEFORE YOU ARRIVE

Shell component (Phase1Shell.jsx) wraps all 6 sections and renders:
- `logoblack.png` top left
- Progress bar at top showing 6 segments, gold fill per completed section
- Each completed segment is clickable — navigates back to that section
- Back button on every section to return to previous
- Countdown timer — small, persistent, top right corner — showing days/hours/minutes until start date

Sections unlock sequentially. Section N+1 unlocks only when Section N is marked complete.

---

### SECTION 1 — MISSION & STORY

Type: CONTENT page.

Intro: "Before anything else — here's why this place exists. ✦"

Content blocks:

MISSION STATEMENT:
"The fashion industry produces over 100 billion garments a year. 60% end up in landfill — not because people don't want them, but because the supply chain getting secondhand fashion from donation to resale is completely offline, manual, and broken. Fleek is fixing this. Our mission is to make secondhand the first choice."

THREE STAT CARDS (gold border, side by side, stack on mobile):
- "9M+" / "items saved from landfill since 2022"
- "$50M+" / "raised from a16z, YC, HV Capital and others"
- "3x" / "year-on-year growth"

THE STORY:
"Fleek was born on Brick Lane. During the pandemic, our CEO Abhi made friends with local resellers and learned how broken their world was — secretive, fragmented, mostly offline. Together with Sanket, he built Fleek to fix it. We sold our first bundle in November 2021. The rest is still being written — and you're now part of it."

FOUNDERS IMAGE: `founders.png` with caption: "Abhi & Sanket — built by operators, not observers."

FLEEKSORT CALLOUT CARD (gold background, dark text):
"Our secret weapon is FleekSort — an AI model fine-tuned on secondhand fashion that can grade, price, and categorise items from a single photo. Turning an opaque, manual trade into a structured, searchable, global inventory layer. This is what you're helping build."

MEET THE FOUNDERS subsection (within this section, below FleekSort card):

Two founder cards side by side (stack on mobile). Each card: circular image, name, gold title, bio.

Abhi Arora card:
- Image: `abhi.png`
- Title: "CEO & Co-founder" in gold
- Bio: "Early employee at Dubsmash — grew it to 300M users before Reddit acquired it. Scaled tech startups across San Francisco, Berlin, and London. UC Berkeley & Cambridge MBA. Fleek started on his doorstep on Brick Lane."

Sanket Agarwal card:
- Image: `sanket.png`
- Title: "CTO & Co-founder" in gold
- Bio: "Veteran technologist with over a decade in Silicon Valley. Product and engineering at Google, Uber, Suki, and Postmates. Built the tech that powers Fleek from day one."

MEET THE TEAM subsection (below founders):

Heading: "Meet the Team"
Subheading: "Your teammates will appear here — full introductions coming on day one. ✦"

Two rows of 4 placeholder cards each. Each placeholder card:
- Grey circular avatar with ✦ icon
- Role label only: "Head of Product", "Senior Engineer", "Operations Lead", "Growth Manager", "Data Scientist", "Designer", "Finance Lead", "People Ops"
- Subtle "Coming soon" label

Note below: "In a live implementation, this section pulls from Deel and your HRIS."

CTA: "I'm in. Let's keep going ✦"

---

### SECTION 2 — VALUES & WHO YOU ARE

Type: CONTENT page.

Intro: "This is what Fleek is built on. Have a read — then tell us something about yourself. The team are genuinely excited to know who's joining before you walk through the door. ✦"

Instruction copy: "Answer as many as you like — the more you share, the better we can make your first day feel like yours. Minimum one, but we won't stop you. ✦"

Five value cards in a grid (2-2-1 on desktop, stacked on mobile). Each card:
- Icon (emoji)
- Value name — bold, large
- One-line description
- Pulsing gold border to indicate interactivity
- Clicking expands a text input below the card

Values:
1. ⭐ Dream Big and Disrupt Yourself — "Push the most ambitious version. Nothing is out of reach."
2. 🎯 Absolute Ownership — "Own it end to end. Problem to done. Take pride in the outcome."
3. 🔍 Curiosity Leads the Way — "Don't accept anything at face value. Ask the questions you don't know the answer to."
4. 💬 Talk to the Customer — "Every decision starts with the customer at the centre."
5. 🌍 Embrace Diversity — "A global team building for a global supply chain. Bring your authentic self."

Expanded input placeholder: "Tell us something about yourself that shows how you live this ✦"

Answered cards: gold fill, ✦ mark appears.

Validation: minimum one card answered. If user tries to proceed without answering any, show: "We'd love to know at least one thing about you ✦"

Completion note (shown after first answer): "We'll share this with the team before you arrive. Expect some familiar faces on day one. ✦"

CTA: "Continue ✦"

---

### SECTION 3 — ADMIN & PAPERWORK

Type: CONTENT page.

Intro: "The unglamorous bit. Let's get it done. ✦"

Two cards side by side (stack on mobile):

PAYROLL CARD:
Title: "Payroll Details ✦"
Fields:
- Name on Account — required, text input
- Account Number — required, text input, placeholder "8 digits"
- Sort Code — required, text input, placeholder "XX-XX-XX"
- Tax Code — optional, text input, subtext: "Don't worry if you don't have this yet — but we'll need it as soon as you do."

Light format hints only — no hard validation. Required fields must be non-empty to proceed.

RIGHT TO WORK CARD:
Title: "Right to Work Verification ✦"
Icon: 📋
Content: "You'll receive an email from Deel before your first day. Keep an eye out for it and complete it as soon as possible — it's required before you can officially start. ✦"
Gold border. Informational only, no form fields.

CTA: "All done ✦" — activates only when all three payroll required fields are filled.

---

### SECTION 4 — EQUIPMENT PREFERENCES

Type: CONTENT page.

Intro: "Your setup should work for you. Tell us what you need and we'll have it ready before day one. ✦"

Three selection groups rendered as pill buttons. Selected: gold background, dark text. Unselected: outlined, graphite text. Single select per group.

LAPTOP:
- MacBook Pro 14"
- MacBook Pro 16"
- Windows — Dell XPS 15
- Windows — ThinkPad X1

MONITOR:
- Single 27" monitor
- Dual 24" monitors
- Ultrawide 34"
- No monitor needed

PERIPHERALS:
- Standard keyboard & mouse
- Mechanical keyboard
- Ergonomic setup
- Noise-cancelling headphones

ADDITIONAL NEEDS — optional free text:
Placeholder: "Anything else? Accessibility requirements, specific tools, strong opinions about chair height — let us know."

CTA: "Sorted ✦" — activates when at least laptop and monitor selections are made.

---

### SECTION 5 — WELCOME KIT BUILDER

Type: CONTENT page. Most playful section — lean into it.

Intro: "We're putting something together for your first day. Help us make it yours. ✦"

PART A — SNACK PREFERENCES
Subheading: "What fuels you?"
Multi-select pills (up to 2 selections):
- 🍫 Sweet tooth
- 🧀 Savoury all the way
- 🌱 Keep it healthy
- ⚡ Just give me caffeine
- 🎲 Surprise me
Note: "No strong opinions? Pick surprise me and we'll take our chances."

PART B — MERCH SIZE
Subheading: "Your welcome kit includes something to wear."
Single select pills: XS / S / M / L / XL / XXL
Subtext: "For the thing you'll definitely wear to every party."

PART C — THE FLEEK QUESTION (fixed, always shown)
Subheading: "Now tell us something..."
Question (bold, large): "Your ultimate thrift find — what is it and where did you get it?"
Free text input. Placeholder: "Don't hold back."

PART D — PICK YOUR QUESTION
Subheading: "One more thing — pick the question you actually want to answer:"
Five selectable cards. User selects one, it expands into a text input.
- "When does your energy shine brightest? Morning? Afternoon? Night? Tell us why."
- "What's your biggest fashion regret — if you have one?"
- "Describe an outfit you would wear forever."
- "What would be your Fleek catwalk theme tune?"
- "Food heaven or food hell — what is it?"

Selected card: gold border, gold tint. Text input expands below with placeholder: "Go on then..."

Completion note: "Noted. Your kit is being sorted. ✦"

CTA: "Continue ✦" — requires: at least one snack selected, size selected, thrift find answered, one wildcard card selected and answered.

---

### SECTION 6 — OFFICE PREP & DAY ONE PREVIEW

Type: CONTENT page.

Intro: "Almost there. Here's everything you need to know before you walk through the door. ✦"

THREE INFO CARDS side by side (stack on mobile):

CARD 1 — GETTING HERE
Title: "Getting Here ✦"
- 📍 Fleek HQ, Commercial Street, E1, London
- 🚇 Liverpool Street — 5 min walk
- 🚇 Aldgate — 7 min walk
- 🚇 Shoreditch High Street — 8 min walk
- "We're right in the heart of Shoreditch. Hard to miss, easy to love."

CARD 2 — WHAT TO WEAR
Title: "What to Wear ✦"
"We don't have a dress code. We have taste."
"Wear what feels like you. Just maybe not that one jacket you've been meaning to donate. Actually — scratch that. Wear it. We respect the commitment."

CARD 3 — YOUR FIRST MORNING
Title: "Your First Morning ✦"
- ⏰ Arrive: 9:00am
- 👋 Ask for: Hatty Choudhury — People Ops & Workspace Manager (they'll be expecting you)
- 🪪 Bring: Photo ID for building access
- "Someone will meet you at the door. You won't be standing around looking lost — we promise."

DAY ONE TEASER BLOCK (gold background, dark text, full width, below the three cards):
Title: "What's waiting for you ✦"
"We've got a jam-packed day lined up. Expect introductions, an office tour, your welcome kit, and everything you need to hit the ground running. But we won't overload you now — you're already smashing it."
"Let us handle the rest. All you need to do is count down the days — and then we'll unlock the next phase of your onboarding right here. ✦"

CTA: "I'm ready ✦" — marks Phase 1 complete, transitions to Phase 2.

---

## PHASE 2 — CONGRATULATIONS SCREEN

Type: IMPACT page. Gold background, pitch black text. Full screen centred.

Content:
- `logo.png` at top, large
- Headline: "You're all set. ✦" — very large, Bebas Neue
- Subline: "Seriously — you've smashed the pre-start checklist. We've got everything we need. Now the only thing left to do is show up."

COUNTDOWN DISPLAY:
Large bold numbers showing: Xd XXh XXm XXs
Label: "until your first day ✦"
Updates every second. Smooth tick animation.

LOCKED BUTTON:
Large CTA button. Behaviour depends on start date:

When start date is in the future:
- Button text: "Unlocks in Xd XXh XXm ✦" (live countdown inside button)
- Visually locked: muted gold, cursor not-allowed, lock icon 🔒
- Non-clickable

When start date = today or in the past:
- Smooth animation transforms button to active gold
- Text changes to: "Your first day is here. Let's go. ✦"
- Fully clickable, transitions to Phase 3

This check runs every second so the unlock happens automatically without page refresh.

Below button: "Bookmark this page — it'll unlock automatically on your first day. ✦"

---

## PHASE 3 — FIRST DAY & BEYOND

Type: CONTENT page. Floral white background.

HEADER BANNER (gold background, full width):
"Welcome to Fleek. Day one starts now. ✦"
Subline: "Here's your roadmap. Take it one tick at a time."

Three tabs: Day One / First Week / First Month

Each tab has an interactive checklist. Clicking a checkbox animates a gold checkmark and strikes through the text. State saved to localStorage.

When all items in a tab are complete, the tab label gets a gold ✦ mark.

Progress summary below tabs: "X of Y tasks complete ✦"

TAB 1 — DAY ONE:
- [ ] Meet Hatty Choudhury (People Ops & Workspace Manager) at reception — 9:00am ✦
- [ ] Office tour with the team
- [ ] Laptop and equipment setup
- [ ] Collect your welcome kit ✦
- [ ] Lunch with your manager
- [ ] Meet the London team
- [ ] End of day check-in — any questions, anything you need?

TAB 2 — FIRST WEEK:
- [ ] Intro call with Abhi (CEO) — all new joiners get this ✦
- [ ] Set up your core tools: Slack, Notion, Gmail, Deel
- [ ] Read the Fleek story — where we started, where we're going
- [ ] Shadow a team member outside your immediate function
- [ ] Complete your Right to Work verification via Deel (if not done already)
- [ ] Submit your tax code if you have it
- [ ] Friday team lunch — your first one ✦

TAB 3 — FIRST MONTH:
- [ ] 30 day check-in with your manager
- [ ] Identify one thing you will change, build, or improve — and share it ✦
- [ ] Attend your first All Hands
- [ ] Meet every member of the London team (25 people — you've got this)
- [ ] Define your 90 day goals with your manager

---

## CLAUDE-POWERED Q&A ASSISTANT

Component: QAAssistant.jsx

Persistent gold circular chat bubble, bottom right corner, available from Phase 1 onwards through all phases.

Chat panel when open:
- Header: "Ask Fleek ✦"
- Subtext: "Your onboarding companion — ask me anything."
- Message history displayed in chat bubbles
- Text input at bottom with send button
- Typing indicator while awaiting response

API call:
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages: conversationHistory
  })
});
```

API key: use `import.meta.env.VITE_ANTHROPIC_API_KEY`

Graceful fallback if API fails: "I'm having a moment — drop a note to people@joinfleek.com and someone will get back to you. ✦"

Conversation history maintained in component state for the session.

SYSTEM PROMPT (use this exactly as the system parameter in the API call):

```
You are the Fleek onboarding assistant — warm, direct, and a little bit fun. You help new Fleek hires get answers to any questions they have before and during their first week. You only answer based on the information below. If you don't know something, say so honestly and suggest they email people@joinfleek.com. Never be corporate. Never be stiff. Talk like a knowledgeable colleague who genuinely wants to help.

COMPANY
Fleek's mission: Make secondhand the first choice. Founded November 2021 by Abhi Arora (CEO) and Sanket Agarwal (CTO). Post-Series B. Backed by a16z, Y Combinator, HV Capital, Burda Principal Investments. Team: 100+ globally, ~25 in London.

VALUES
1. Dream Big and Disrupt Yourself
2. Absolute Ownership
3. Curiosity Leads the Way
4. Talk to the Customer
5. Embrace Diversity

HOW WE WORK
In-office 4-5 days per week. One day at home for deep work. Non-hierarchical, high-ownership, execution-focused. AI is expected in your day-to-day work.

OFFICE
Address: Fleek HQ, Commercial Street, E1, London. Nearest stations: Liverpool Street (5 min), Aldgate (7 min), Shoreditch High Street (8 min). Arrive on day one at 9:00am. Ask for Hatty Choudhury (People Ops & Workspace Manager) at reception. Bring photo ID.

DRESS CODE
No formal dress code. Wear what feels like you. We have taste, not rules.

TOOLS
Slack, Notion, Gmail, Deel. Equipment set up before day one.

ONBOARDING
All new joiners get an intro call with Abhi (CEO) in their first week. Right to work comes via Deel before day one. Tax code can follow later. 30 day check-in with manager. 90 day goals set in month one.

BENEFITS
Competitive salary. Private health insurance. Pension contributions. 25 days holiday plus bank holidays. Learning and development budget. Equipment of your choice. Regular team events, offsites, and All Hands.

ACCESSIBILITY
The London office is accessible. For specific requirements or adjustments email people@joinfleek.com as early as possible.

LOCAL AREA — SHOREDITCH
Coffee: Allpress Espresso (Redchurch St), Ozone Coffee (Leonard St), Nude Coffee (Hanbury St)
Lunch: Dishoom Shoreditch (Boundary St), Pilpel (Brushfield St), Bleecker Burger (Spitalfields), Spitalfields Market
After work: The Culpeper (Commercial St), Trapeze (Old St), The Ten Bells (Commercial St), Nightjar (City Rd)

IF YOU DON'T KNOW SOMETHING
Ask your manager, ask in Slack #general, or email people@joinfleek.com for HR and ops queries.
```

---

## TECHNICAL REQUIREMENTS

### Environment Variables
Create `.env.example` with:
```
VITE_ANTHROPIC_API_KEY=your_key_here
```

### vercel.json
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### localStorage Utility (storage.js)
```javascript
const KEY = 'fleek_onboarding';
export const getState = () => JSON.parse(localStorage.getItem(KEY) || '{}');
export const setState = (data) => localStorage.setItem(KEY, JSON.stringify(data));
export const clearState = () => localStorage.removeItem(KEY);
```

### Phase 3 Unlock Logic (countdown.js)
```javascript
export const isPhase3Unlocked = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  return start <= today;
};
```

### Mobile Responsiveness
Mobile-first. All layouts stack vertically below 768px. Touch targets minimum 44px. Font sizes scale appropriately. Chat bubble repositions on mobile to avoid blocking content.

### Error Handling
All API calls in try/catch. Broken images fall back gracefully — never show broken image icon, use text fallback. If localStorage unavailable, app functions without persistence.

### Accessibility
All interactive elements keyboard navigable. Sufficient colour contrast throughout (gold on black passes WCAG AA). Alt text on all images. Visible focus states.

---

## COPY TONE GUIDE

Voice: Warm, quirky, direct. Like a cool older sibling who works at Fleek and genuinely wants you to have a great first day.

Rules:
- No corporate speak
- No excessive exclamation marks
- Short sentences. Punchy. Room to breathe.
- ✦ used intentionally at meaningful moments — not on every line
- Humour is dry and light, never try-hard
- Always treats the new joiner as smart and capable
