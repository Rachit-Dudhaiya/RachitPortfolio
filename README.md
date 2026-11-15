# Rachit Dudhaiya — Creative Developer & Full-Stack Engineer Portfolio

A personal developer portfolio for **Rachit Dudhaiya** (Full-Stack & Mobile Developer based in Rajkot, Gujarat, India).

Features an interactive **3D low-poly white triangles motion effect** on the hero landing, a physical **compact sketchbook journal** for project showcases with real mounted screenshots, custom animated hamburger navigation, and a verified project archive.

---

## ✦ Core Highlights

- **3D Motion Hero**: Interactive undulating low-poly white triangles background (Three.js WebGL canvas with optimized video/static fallback).
- **Interactive Sketchbook Section**: Handcrafted digital sketchbook experience featuring:
  - Wire-o spiral binding spine & warm ivory pages (`#F5F0E6`)
  - Stamped dates, adhesive tech tags, and sticky notes
  - Handwritten marginalia in Caveat font with directional SVG sketch arrows
  - Mounted live project screenshots with washi tape corners
  - Fullscreen pan-and-zoom Image Lightbox
  - Accessible Semantic Plain-Text Mode toggle
- **Real Production Deployments**: Verified showcase with live links and repository references:
  - **A2Z Properties** (`https://www.atozproperties.co.in/`)
  - **AttendX** (Flutter Mobile College Attendance System)
  - **Panarait** (`https://panarait.vercel.app`)
  - **School Management System (SLMS)** (`https://slms.ripaldesign.studio`)
  - **Ripal Design Studio** (`https://app.ripaldesign.studio/`)

---

## ✦ Tech Stack

- **Frontend & UI**: React 18, TypeScript, Tailwind CSS, Vite
- **3D Graphics & Motion**: Three.js, Canvas, GSAP, CSS 3D Transforms
- **Coding Languages**: Python, HTML, CSS, JavaScript, Dart, Java, PHP, C, C++, C#
- **Backend & Cloud**: Firebase, Supabase, MySQL, Express.js
- **Frameworks & Libraries**: Flutter, TensorFlow, React, Tailwind CSS
- **Hosting & Infrastructure**: Vercel, InfinityFree, DigitalOcean
- **Tools**: VS Code, Android Studio, Git

---

## ✦ Project Structure

```
Protfolio/
├── index.html                  # HTML entry with Syne, Space Grotesk, Caveat, IBM Plex Mono
├── tailwind.config.js          # Design system tokens and custom fonts
├── vite.config.ts              # Vite configuration
├── package.json
├── public/
│   └── assets/
│       ├── projects/           # High-resolution live website screenshots
│       ├── rachit-profile.jpg  # Profile portrait photo
│       ├── white-triangles.mp4 # Optimized 3D background video fallback
│       └── white-triangles-ref.jpg
└── src/
    ├── App.tsx                 # Client routing (Home, Projects, About, Contact)
    ├── components/
    │   ├── Navbar.tsx          # Custom animated toggle menu & site header
    │   ├── Footer.tsx          # Editorial footer with contact, status, and coordinates
    │   ├── WhiteTrianglesBackground.tsx # Three.js interactive 3D hero background
    │   └── sketchbook/         # Interactive Sketchbook Journal components
    │       ├── Sketchbook.tsx
    │       ├── SketchbookCover.tsx
    │       ├── ProjectDetails.tsx
    │       ├── ProjectScreenshot.tsx
    │       ├── PageNavigation.tsx
    │       ├── ProjectIndex.tsx
    │       ├── ImageLightbox.tsx
    │       └── HandwrittenAnnotation.tsx
    ├── data/
    │   └── projectsData.ts     # Verified project data, tech stacks, and live links
    ├── pages/
    │   ├── HomePage.tsx        # 100svh Hero with 3D triangles, selected work, bio
    │   ├── ProjectsPage.tsx    # Interactive sketchbook experience & project archive
    │   ├── AboutPage.tsx       # Timeline, tech stack grid, certifications, education
    │   └── ContactPage.tsx     # Direct inquiry form, email, LinkedIn, location
    └── styles/
        └── index.css           # Global typography, paper grain, animations
```

---

## ✦ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## ✦ Contact & Profiles

- **Developer**: Rachit Dudhaiya
- **Email**: dudhaiyarachit45@gmail.com
- **Phone**: +91 96870 68018
- **GitHub**: [github.com/Rachit-Dudhaiya](https://github.com/Rachit-Dudhaiya)
- **LinkedIn**: [linkedin.com/in/rachit-dudhaiya-95a2b6352](https://www.linkedin.com/in/rachit-dudhaiya-95a2b6352/)
