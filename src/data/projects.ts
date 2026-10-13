export interface ProjectDetail {
  tagline: string
  event: string
  role: string
  stats: { label: string; value: string }[]
  sections: { heading: string; body: string }[]
  stack: { group: string; items: string[] }[]
  screenshots: { src: string; caption: string; width?: number; height?: number }[]
  apk?: string
  devpost?: string
  liveUrl?: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  github?: string
  live: string
  image?: string
  imagePosition?: string
  featured: boolean
  status?: "in-progress"
  year: string
  detail?: ProjectDetail
}

export const projects: Project[] = [
  {
    id: "fitform",
    title: "FitForm",
    description:
      "A fully offline AI coaching app that gives real-time form feedback for squats and basketball jump shots, running on the Snapdragon NPU.",
    longDescription:
      "Real-time pose estimation at ~30 fps on the Snapdragon 8 Elite Hexagon NPU via Google LiteRT, with a color-coded skeleton overlay, per-rep scoring, and on-device Gemma 3 coaching. No cloud, no login, no backend.",
    tech: ["Kotlin", "Jetpack Compose", "CameraX", "Google LiteRT", "MoveNet", "Gemma 3"],
    github: "https://github.com/adamvl7/Google-x-Qualcomm-Hackathon-2026",
    live: "/projects/fitform",
    image: "/projects/fitform/1.png",
    featured: true,
    year: "2026",
    detail: {
      tagline: "A coach in your pocket. Fully offline, running on the NPU.",
      event: "Qualcomm × Google LiteRT Hackathon · Track 2: Classical Models (Vision & Audio)",
      role: "Team of 3 · Samsung Galaxy S25 Ultra (Snapdragon 8 Elite)",
      stats: [
        { label: "Inference", value: "~6 ms/frame" },
        { label: "Frame rate", value: "~30 fps" },
        { label: "Model size", value: "2.5 MB (INT8)" },
        { label: "Cloud", value: "None" },
      ],
      sections: [
        {
          heading: "Inspiration",
          body: "Most people who work out alone are guessing. They watch videos, copy what they see, and hope for the best. Bad form slows progress and causes injuries that make people quit, while personal trainers cost $50–200 a session. We wanted to put a real coach in everyone's pocket, for free.",
        },
        {
          heading: "What it does",
          body: "FitForm gives real-time form feedback for squats (side view) and basketball jump shots (front view). MoveNet Lightning analyzes your movement at 30 fps and overlays a skeleton that is green for correct form and red when something needs fixing. After each set you get rep count, per-rep scores, what went wrong, and coaching cues. Every session is saved with the skeleton overlay synced to the video for replay.",
        },
        {
          heading: "How it's built",
          body: "Kotlin and Jetpack Compose for the UI, with CameraX feeding the camera pipeline. Pose estimation runs through Google LiteRT using an INT8 MoveNet Lightning model routed to the Hexagon NPU through the NNAPI delegate. Inference buffers are pre-allocated to keep garbage collection off the hot path, the NPU is warmed up at startup to avoid cold-start spikes, and CameraX's KEEP_ONLY_LATEST strategy keeps the overlay on the freshest pose. A fallback chain (NPU, then CPU, then a MockPoseEstimator) keeps the app running on any device. After each set, Gemma 3 1B runs on-device to turn session data into a short coaching tip.",
        },
        {
          heading: "Hardest problem: feedback timing",
          body: "The first version graded every frame, so the skeleton flashed red during transitions between positions even when form was fine. The fix was phase-based grading: detect which phase of the movement the user is in and only evaluate form where it matters, like the bottom of the squat or the peak of the jump shot. That made the feedback feel like a coach instead of a broken counter. Hardcoded angle thresholds also failed across body types, which pushed us toward evaluation grounded in biomechanical research.",
        },
        {
          heading: "What I'm proud of",
          body: "Sub-10 ms inference on a live camera feed, entirely on-device. Beyond the speed, the feedback is actually useful: directional cues that say what to fix and why, in an app a non-technical person can pick up immediately.",
        },
        {
          heading: "What's next",
          body: "Automatic rep detection to replace the manual START/END buttons, and more exercises and sports. PoseEstimator is a swappable interface, so new movements need no changes to the UI or analysis layers. Longer term: on-device Gemma 4 via the LiteRT-LM API for conversational post-session coaching, and the same pipeline on AR glasses, gym equipment, or drones.",
        },
      ],
      stack: [
        { group: "Language & UI", items: ["Kotlin", "Jetpack Compose", "Android (minSdk 28)"] },
        { group: "Camera", items: ["CameraX", "KEEP_ONLY_LATEST analysis"] },
        {
          group: "On-device AI",
          items: ["Google LiteRT 1.0.1", "MoveNet Lightning (INT8)", "NNAPI delegate", "Custom INT8 FormClassifier", "Gemma 3 1B IT (INT4)"],
        },
        { group: "Hardware", items: ["Snapdragon 8 Elite", "Hexagon NPU", "Samsung Galaxy S25 Ultra"] },
      ],
      screenshots: [
        { src: "/projects/fitform/1.png", caption: "Home: everything runs locally on Snapdragon" },
        { src: "/projects/fitform/2.png", caption: "Choose Gym Coach (squat) or Shot Coach (jump shot)" },
        { src: "/projects/fitform/3.png", caption: "Green skeleton overlay on good form, with a coach recap" },
        { src: "/projects/fitform/4.png", caption: "Red overlay and a live cue: bend your knees" },
        { src: "/projects/fitform/5.png", caption: "Replay with the skeleton synced to the video" },
        { src: "/projects/fitform/6.png", caption: "Session history, stored on-device" },
        { src: "/projects/fitform/7.png", caption: "Built-in benchmark: NPU vs GPU vs CPU" },
      ],
      apk: "https://github.com/adamvl7/Google-x-Qualcomm-Hackathon-2026/releases/tag/v1.0",
    },
  },
  {
    id: "nimbus",
    title: "Nimbus",
    description:
      "A carbon-aware auto-scaler for AWS Batch that runs flexible jobs when the grid is clean and pauses them when it's dirty.",
    longDescription:
      "A serverless platform that checks live grid carbon intensity every 15 minutes and scales AWS Batch compute up or down to zero, with an explainable decision log and daily Bedrock-written reports.",
    tech: ["React", "FastAPI", "AWS Lambda", "DynamoDB", "Bedrock", "AWS Batch"],
    github: "https://github.com/adamvl7/CloudHacks-2026",
    live: "/projects/nimbus",
    image: "/projects/nimbus/overview.png",
    featured: true,
    year: "2026",
    detail: {
      tagline: "Same work, same deadlines, cleaner footprint.",
      event: "AWS CloudHacks 2026 · Amazon-sponsored · AI Environmental Impact track",
      role: "Hackathon team project · Full-stack, serverless, 100% Infrastructure-as-Code",
      stats: [
        { label: "Projected impact", value: "180+ t CO2/yr" },
        { label: "At scale", value: "10,000 vCPUs" },
        { label: "Decision cycle", value: "Every 15 min" },
        { label: "Deployment", value: "100% IaC" },
      ],
      sections: [
        {
          heading: "Inspiration",
          body: "Data centers use 1–2% of global electricity and that share is growing with AI. But the grid isn't equally clean all day: California at noon can be ~60% solar, while at 2 a.m. it's mostly natural gas. Most compute jobs run whenever resources are free, regardless of how dirty the power is. If a job doesn't need to run right now, why not run it when energy is clean?",
        },
        {
          heading: "What it does",
          body: "Every 15 minutes, Nimbus checks live grid carbon intensity from ElectricityMaps. When the grid is clean it scales AWS Batch compute up; when it's dirty it scales to zero and jobs wait in the queue. Flexible workloads like ML training, ETL and video processing finish the same work by the same deadlines with a smaller carbon footprint, and submitters change nothing in their code. A lightweight recommendation also flags when another region is at least 15% cleaner.",
        },
        {
          heading: "Explainable by design",
          body: "The dashboard has a live grid meter, a 24-hour intensity timeline, and a clickable decision log where each row explains why it fired, like \"intensity 388g > threshold 350g → scale_down\". Every number (CO2 avoided, % cleaner, vCPU-hours shifted) is computed from real decisions rather than hardcoded. A daily Amazon Bedrock report turns the data into a plain-English summary a sustainability officer or CFO can act on.",
        },
        {
          heading: "How it's built",
          body: "EventBridge triggers a Python Lambda decision engine, which reads grid data, scales the AWS Batch compute environment, and logs every decision to DynamoDB (a single-table design around the access patterns). A second scheduled Lambda aggregates the day's decisions and asks Claude on Amazon Bedrock to write the report. A React, Vite and Recharts dashboard sits on top through API Gateway, and the whole stack deploys as code with AWS SAM.",
        },
        {
          heading: "Design decision: time-shift, don't region-shift",
          body: "Our first idea was to automatically move workloads to cleaner regions. But if every carbon-aware scheduler did that, they'd all pile onto the same grid and trigger the dirty peaker plants they were avoiding. So we redesigned region-shifting as a human-in-the-loop recommendation and made delaying within a region the automated action. It's less flashy but more correct.",
        },
        {
          heading: "Challenges",
          body: "An AccessDeniedException from Bedrock turned out to be a Marketplace subscription issue with our first model, fixed by switching to a direct foundation model ID and simplifying IAM permissions. We also had to make the decision log feel like evidence rather than a table, which led to expandable rows with the threshold, zone, data source and timestamp for every action.",
        },
        {
          heading: "What's next",
          body: "Marginal carbon intensity instead of average, per-team carbon budgets, and support beyond AWS Batch for EMR, SageMaker and containerized workloads.",
        },
      ],
      stack: [
        { group: "Frontend", items: ["React", "Vite", "Recharts"] },
        { group: "Backend", items: ["Python 3.12", "FastAPI", "AWS Lambda", "API Gateway", "EventBridge"] },
        { group: "Data & compute", items: ["DynamoDB", "AWS Batch", "S3", "SES"] },
        { group: "AI & data sources", items: ["Amazon Bedrock (Claude Sonnet)", "ElectricityMaps API"] },
        { group: "Infrastructure", items: ["AWS SAM (IaC)", "CloudFront", "CloudWatch", "IAM & Secrets Manager"] },
      ],
      screenshots: [
        {
          src: "/projects/nimbus/overview.png",
          caption: "Overview: live grid meter, shift recommendation, 24h forecast and intensity timeline",
          width: 806,
          height: 505,
        },
        {
          src: "/projects/nimbus/timeline.png",
          caption: "Timeline: every scaling decision is logged and explained",
          width: 1600,
          height: 1004,
        },
        {
          src: "/projects/nimbus/reports.png",
          caption: "Reports: Bedrock-generated daily summary of CO2 avoided and vCPU-hours shifted",
          width: 806,
          height: 505,
        },
      ],
      devpost: "https://devpost.com/software/nimbus-xnpma3",
    },
  },
  {
    id: "underwatch",
    title: "UnderWatch",
    description:
      "A privacy-first, edge-AI fall detection system that runs entirely on the Arduino UNO Q, with no cloud, no subscription and no video uploads.",
    longDescription:
      "Computer vision fall detection on the Qualcomm QRB2210, with a pan/tilt camera, buzzer, LED matrix and physical dismiss button driven by the STM32 MCU, and a 3-stage escalation before emergency services are contacted.",
    tech: ["Arduino UNO Q", "Python", "Edge Impulse", "Zephyr", "C++", "ntfy"],
    github: "https://github.com/kevinlycc/UnderWatch",
    live: "/projects/underwatch",
    image: "/projects/underwatch/device.png",
    imagePosition: "78% center",
    featured: true,
    year: "2026",
    detail: {
      tagline: "Fall detection that's private, local, and actually intelligent.",
      event: "UCI IrvineHacks 2026",
      role: "Team of 4 · I worked on the software",
      stats: [
        { label: "Model accuracy", value: "~93%" },
        { label: "Video uploaded", value: "None" },
        { label: "Escalation", value: "3 stages" },
        { label: "Works offline", value: "Yes" },
      ],
      sections: [
        {
          heading: "Inspiration",
          body: "Every year, 1 in 4 Americans over 65 experiences a fall: over 36 million people, and 3 million end up in emergency rooms. Existing solutions like Life Alert cost about $50 a month, need cloud connectivity, and upload intimate video to corporate servers. As engineering students with elderly family members, we wanted fall detection that is private and local, not another subscription that profits from fear.",
        },
        {
          heading: "What it does",
          body: "UnderWatch continuously watches for falls with computer vision, all processed on the device. A detected fall starts a 3-stage escalation. First, the person gets 30 seconds: a buzzer sounds, the LED matrix flashes, and they can press a physical \"I'm OK\" button to cancel everything with no notification sent. If they don't, family is notified by push and gets 60 seconds to check in, with extra time added automatically if the system sees the person stand back up. Only if nobody responds does it contact emergency services. The only thing that ever leaves the device is a tiny notification trigger.",
        },
        {
          heading: "Using both processors",
          body: "The Arduino UNO Q has two brains and we used each for what it's good at. The Qualcomm QRB2210 (quad-core ARM, Debian Linux, 4 GB RAM) runs the ML inference and detection logic. The STM32U585 microcontroller (Zephyr RTOS) handles real-time work: pan/tilt servos for camera tracking, buzzer patterns, the LED matrix and the dismiss button. The two talk over RouterBridge, with detection results flowing down to the MCU and button events flowing back up. Notifications go through ntfy.sh, which can be self-hosted, and carry only \"fall detected\" and a timestamp.",
        },
        {
          heading: "Challenges",
          body: "Our first model tried to classify everything (person, non-person, fallen, not-fallen), but the \"everything else\" classes have no consistent visual pattern, so it couldn't learn them. Running two classifiers at once and switching to object detection didn't fit the board's App Lab bricks or our time budget either. The breakthrough was simplifying: focus on detecting falls with high confidence, retrain on a cleaner dataset, tune thresholds, and let the physical button cover the edge cases. On the hardware side, standard libraries like Servo.h don't work on the UNO Q's Zephyr-based MCU, so I helped rewrite servo control with manual PWM and learn the sparsely documented RouterBridge API.",
        },
        {
          heading: "What I'm proud of",
          body: "This is real edge AI: unplug the ethernet and turn off WiFi and it still protects. Privacy is built into the architecture, so video can't leave the device rather than just being promised not to. And the physical button matters: if the software crashes or the network drops, someone can still press it and silence the buzzer. Safety shouldn't depend on WiFi.",
        },
        {
          heading: "What's next",
          body: "Real bounding-box coordinates from the model for more precise servo tracking, two-way audio so family can talk to the person during stage 2, and long-term movement analysis to catch gradual mobility decline before it becomes a fall. We also plan to open-source everything so other families can build their own subscription-free systems.",
        },
      ],
      stack: [
        { group: "Hardware", items: ["Arduino UNO Q", "Qualcomm QRB2210", "STM32U585", "2x servos (pan/tilt)", "Buzzer, LED matrix, button", "USB camera"] },
        { group: "AI & vision", items: ["Edge Impulse", "MediaPipe Pose", "TensorFlow Lite", "Computer vision"] },
        { group: "Software", items: ["Python", "C++", "Zephyr RTOS", "RouterBridge", "Local PWA (JavaScript, HTML, CSS)"] },
        { group: "Alerts", items: ["ntfy.sh push notifications"] },
      ],
      screenshots: [
        {
          src: "/projects/underwatch/device.png",
          caption: "The prototype: 3D-printed pan/tilt camera housing next to the Arduino UNO Q",
          width: 803,
          height: 573,
        },
        {
          src: "/projects/underwatch/setup.png",
          caption: "Live demo setup, with the family dashboard running on a local monitor",
          width: 732,
          height: 573,
        },
        {
          src: "/projects/underwatch/detection.png",
          caption: "Early pose-tracking prototype showing live skeleton detection",
          width: 718,
          height: 573,
        },
        {
          src: "/projects/underwatch/dashboard.png",
          caption: "Family monitoring dashboard with I'm OK, Call 911 and Call Emergency Contact actions",
          width: 806,
          height: 415,
        },
      ],
    },
  },
  {
    id: "clinical-reconciliation",
    title: "Clinical Data Reconciliation Engine",
    description:
      "A full-stack app that uses Google Gemini to reconcile conflicting medication records from multiple healthcare systems and score patient record quality.",
    longDescription:
      "Combines deterministic clinical rules with LLM reasoning to pick the right medication record, with a calibrated confidence score, safety checks and interactive issue resolution.",
    tech: ["Next.js", "TypeScript", "Gemini", "Zod", "Docker", "Vercel"],
    github: "https://github.com/adamvl7/Clinical-Data-Reconciliation-Engine",
    live: "/projects/clinical-reconciliation",
    image: "/projects/onye/landing.png",
    imagePosition: "center top",
    featured: true,
    year: "2026",
    detail: {
      tagline: "Reconcile with confidence: AI-assisted medication reconciliation with clinical safety checks.",
      event: "Full Stack Developer (EHR Integration) internship assessment · branded as Onye",
      role: "Solo project · about 20 hours across design, implementation, testing and docs",
      stats: [
        { label: "Test scenarios", value: "16" },
        { label: "Unit tests", value: "16" },
        { label: "Confidence factors", value: "5" },
        { label: "Live demo", value: "Deployed" },
      ],
      sections: [
        {
          heading: "The problem",
          body: "The same patient's medication can appear differently across the hospital EHR, primary care, the pharmacy and the patient's own report: Metformin 1000mg in one system and 500mg in another. A clinician needs to know which record to trust and why. Onye aggregates the conflicting records and returns one reconciled result with a confidence score and a safety verdict.",
        },
        {
          heading: "What it does",
          body: "The medication reconciliation endpoint takes patient context (age, conditions, recent labs like eGFR) plus every conflicting source record, and returns the reconciled medication, a confidence score, a reasoning explanation, recommended actions, a clinical safety check (PASSED or flagged), and any detected duplicate records. A second endpoint scores a patient record on completeness, accuracy, timeliness and clinical plausibility, and flags issues such as an impossible 340/180 blood pressure. When a patient accepts a flagged issue, the AI asks targeted follow-up questions and updates the record.",
        },
        {
          heading: "Hybrid heuristics + LLM",
          body: "Deterministic clinical rules provide a reproducible baseline (vital-sign plausibility, dose limits, kidney-function contraindications such as metformin at low eGFR), and Gemini adds nuanced reasoning on top. The heuristic rankings are fed into the prompt to ground the model, rule-based issues take priority, and duplicate LLM findings are suppressed. If the model call fails entirely, data-quality scoring falls back to heuristics only, so the app degrades gracefully instead of crashing.",
        },
        {
          heading: "Calibrated confidence",
          body: "Rather than trusting one number from the model, the confidence score is a weighted blend of five signals: source reliability, recency, cross-source agreement, clinical compatibility, and the LLM's own certainty. The breakdown is returned with every result, so a reviewer can see why a reconciliation scored 88% and not just that it did.",
        },
        {
          heading: "Production touches",
          body: "Zod validates every API input. Outbound Gemini calls use exponential backoff on 429 and 5xx responses, and inbound routes have a per-IP sliding-window rate limiter (15 requests/minute) plus optional API-key auth. An in-memory SHA-256-keyed cache avoids redundant LLM calls, and both endpoints accept an optional webhook. A multi-stage Dockerfile and Vercel deployment are included, and a demo mode serves realistic mock responses when no API key is set, so anyone can try every feature.",
        },
        {
          heading: "Testing",
          body: "16 unit tests cover duplicate detection, clinical rules, the data-quality scoring engine and API-key auth, with LLM calls mocked for fast, deterministic runs. Eight medication scenarios and eight data-quality scenarios, including critical kidney function, excessive dose, stale records, frequency-only mismatches and future dates of birth, are available from a dropdown in the UI.",
        },
        {
          heading: "What I'd improve",
          body: "Persistent storage instead of the in-memory cache, FHIR-compliant inputs and outputs, an audit trail for every reconciliation decision, a broader clinical rule set, Playwright end-to-end tests, and streamed LLM responses.",
        },
      ],
      stack: [
        { group: "Frontend", items: ["Next.js (App Router)", "React", "TypeScript"] },
        { group: "Backend", items: ["Next.js API routes", "Zod validation", "Rate limiting", "API-key auth"] },
        { group: "AI", items: ["Google Gemini 2.5 Flash", "@google/genai", "Prompt engineering", "Confidence calibration"] },
        { group: "Quality & deploy", items: ["Unit tests (LLM mocked)", "Docker (multi-stage)", "Vercel"] },
      ],
      screenshots: [
        {
          src: "/projects/onye/landing.png",
          caption: "Landing page: conflicting records from four sources reconciled into one result with an 88% confidence score and a safety check",
          width: 1600,
          height: 950,
        },
      ],
      liveUrl: "https://clinical-data-reconciliation-engine-phi.vercel.app/",
    },
  },
  {
    id: "v-etch",
    title: "V-etch",
    description:
      "A virtualized AI inference platform: a Kubernetes operator that scales VM-backed inference nodes through a declarative API.",
    longDescription:
      "Senior design project. A Go Kubernetes operator built with Kubebuilder that reconciles a custom resource into a cluster of virtual inference nodes.",
    tech: ["Go", "Kubernetes", "Kubebuilder", "controller-runtime", "CRDs", "envtest"],
    live: "/projects/v-etch",
    featured: true,
    status: "in-progress",
    year: "2026",
    detail: {
      tagline: "A declarative Kubernetes API for virtualized AI inference clusters.",
      event: "Senior Design · September 2026 – Present",
      role: "Work in progress",
      stats: [
        { label: "Status", value: "In progress" },
        { label: "envtest specs", value: "10" },
        { label: "CRD spec fields", value: "8" },
        { label: "Validation rules", value: "13" },
      ],
      sections: [
        {
          heading: "What it is",
          body: "V-etch is my senior design project: a virtualized AI inference platform managed through Kubernetes. Instead of provisioning inference nodes by hand, you describe the cluster you want in a declarative resource, and an operator makes it real and keeps it that way.",
        },
        {
          heading: "The operator",
          body: "I wrote an idempotent reconciler in Go that scales virtual inference nodes to match the declared state. It is tested with 10 envtest specs covering scaling behavior, idempotency, and ownership safety, so repeated reconciles converge on the same result without side effects.",
        },
        {
          heading: "The API",
          body: "I designed a declarative API for VM-backed inference clusters by extending a Kubebuilder CRD, with 8 spec fields and 13 validation rules so invalid clusters are rejected up front.",
        },
        {
          heading: "Ownership safety",
          body: "The operator enforces OwnerReference checks so it never overwrites a ConfigMap it doesn't own. That behavior is covered by its own envtest spec.",
        },
        {
          heading: "Status",
          body: "This project is still under active development, so this page will grow with architecture details, screenshots and a demo as the work progresses.",
        },
      ],
      stack: [
        { group: "Language", items: ["Go"] },
        { group: "Kubernetes", items: ["Kubernetes Operators", "Kubebuilder", "controller-runtime", "Custom Resource Definitions (CRDs)"] },
        { group: "Testing", items: ["envtest"] },
      ],
      screenshots: [],
    },
  },
]
