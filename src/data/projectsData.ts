import { Project } from '../types';

export interface ProjectSpreadData extends Project {
  spreadNumber: string; // e.g. "01 / 05"
  stampedDate: string;  // e.g. "14 APR 2024"
  category: string;
  processNotes: {
    text: string;
    arrowDirection?: 'up-right' | 'down-right' | 'left';
    target: string;
  }[];
  technicalNote?: string;
  highlightPhrase: string;
}

export const projectsData: ProjectSpreadData[] = [
  {
    slug: 'a2z-properties',
    year: '2024',
    spreadNumber: '01 / 05',
    stampedDate: '14 APR 2024',
    title: 'A2Z Properties',
    category: 'Real Estate Website',
    oneLiner: 'Real estate discovery website designed to showcase residential and commercial properties with property information and booking functionality.',
    role: 'Full-Stack Developer',
    team: 'Independent Project',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Cloudinary', 'Vercel'],
    highlightPhrase: 'Instant property filtering & direct site visit scheduling',
    problem: [
      'Property seekers faced cluttered classifieds, slow search interfaces, and missing verified photos when trying to find residential and commercial spaces in Gujarat.',
      'Property buyers needed a frictionless way to explore listings, view floor plans, and directly book site visits without agency sign-up barriers.'
    ],
    decisions: [
      {
        decision: 'Engineered fast client-side filtering for budget, property type, and bedrooms.',
        reason: 'Allows buyers to narrow down hundreds of listings in under 50ms with zero layout shifts.'
      },
      {
        decision: 'Connected Firebase real-time database with Cloudinary media optimization.',
        reason: 'Delivers high-resolution property photography efficiently across low-bandwidth mobile connections.'
      },
      {
        decision: 'Implemented direct site-visit booking and inquiry dispatch.',
        reason: 'Connects verified buyers directly to property owners with instantaneous notification.'
      }
    ],
    processNotes: [
      { text: 'instant filter narrows listings <50ms', arrowDirection: 'down-right', target: 'filter' },
      { text: 'cloudinary image pipeline cuts load 60%', arrowDirection: 'up-right', target: 'media' },
      { text: 'direct site visit booking dispatch', arrowDirection: 'left', target: 'booking' }
    ],
    technicalNote: 'Firestore indices configured for compound location + pricing filters',
    outcome: 'Live in production at atozproperties.co.in, providing a fast, ad-free real estate discovery platform.',
    retrospective: [
      'I should implement automated image compression pipelines on upload to minimize mobile data usage for high-res property photos.',
      'Adding localized Gujarati audio or text translation would make the platform even more accessible for elderly property owners.'
    ],
    liveUrl: 'https://www.atozproperties.co.in/',
    githubUrl: 'https://github.com/Rachit-Dudhaiya/A2Zproperties',
    image: '/assets/projects/a2z-properties.png',
    imageCaption: 'A to z Properties live portal showing real residential & commercial listings with instant search & filter.'
  },
  {
    slug: 'attendx',
    year: '2024',
    spreadNumber: '02 / 05',
    stampedDate: '18 MAY 2024',
    title: 'AttendX',
    category: 'Flutter Application',
    oneLiner: 'College attendance application with role-based access, attendance tracking, dashboards, and automated PDF attendance reports.',
    role: 'Mobile Developer',
    team: 'Lead Developer',
    stack: ['Flutter', 'Firebase', 'Dart'],
    highlightPhrase: 'Role-based access & automated PDF attendance report generation',
    problem: [
      'Traditional roll-call paper registers were cumbersome, easy to lose, and caused administrative delays in compiling monthly student attendance percentages.',
      'College faculty and students needed a dedicated mobile tool with role-based permissions to log attendance during lectures and export verified reports.'
    ],
    decisions: [
      {
        decision: 'Engineered cross-platform mobile architecture with Flutter and Dart.',
        reason: 'Ensures 60fps smooth touch interaction and identical UI performance across Android and iOS.'
      },
      {
        decision: 'Integrated Firebase Authentication and Cloud Firestore for real-time roll sync.',
        reason: 'Faculty can record attendance in seconds with automatic cloud backup.'
      },
      {
        decision: 'Built an in-app PDF reporting engine using Flutter pdf & printing packages.',
        reason: 'Generates institutional-grade printable attendance sheets directly from the mobile app.'
      }
    ],
    processNotes: [
      { text: 'role-based views for faculty & students', arrowDirection: 'down-right', target: 'roles' },
      { text: 'firebase cloud sync under 200ms', arrowDirection: 'up-right', target: 'cloud' },
      { text: 'instant printable PDF attendance export', arrowDirection: 'left', target: 'pdf' }
    ],
    technicalNote: 'Dart state management with Provider maintaining reactive lecture rosters',
    outcome: 'Streamlined classroom attendance logging and eliminated manual paper record tabulation.',
    retrospective: [
      'I plan to add offline local caching for campus zones with intermittent cellular coverage.',
      'Adding biometric fingerprint check-in could further prevent proxy attendance.'
    ],
    liveUrl: 'https://github.com/Rachit-Dudhaiya',
    githubUrl: 'https://github.com/Rachit-Dudhaiya',
    image: '/assets/projects/attendx-admin.png',
    imageCaption: 'AttendX application admin dashboard displaying student attendance records, faculty logs, and report exports.'
  },
  {
    slug: 'panarait',
    year: '2024',
    spreadNumber: '03 / 05',
    stampedDate: '22 JUN 2024',
    title: 'Panarait',
    category: 'Web Application',
    oneLiner: 'Modern web application built with React and Firebase delivering smooth navigation and interactive e-commerce components.',
    role: 'Frontend Developer',
    team: 'Frontend Lead',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    highlightPhrase: 'Seamless shopping flow with zero layout shift',
    problem: [
      'Digital storefronts frequently suffer from sluggish catalog rendering, jittery transitions, and layout shifts when switching categories.',
      'The client required an ultra-clean web interface with responsive product grids, intuitive filtering, and rapid page transitions.'
    ],
    decisions: [
      {
        decision: 'Engineered reusable modular components with optimistic cart updates.',
        reason: 'Gives shoppers immediate feedback when items are selected or quantities are adjusted.'
      },
      {
        decision: 'Deployed edge-cached static builds with Vercel global CDN.',
        reason: 'Delivers sub-second initial content loads across all major cities with 99+ Lighthouse scores.'
      },
      {
        decision: 'Implemented tactile hover states and fluid responsive navigation.',
        reason: 'Ensures touch targets and product grids adapt seamlessly between mobile phones and widescreen monitors.'
      }
    ],
    processNotes: [
      { text: 'optimistic cart state updates', arrowDirection: 'down-right', target: 'cart' },
      { text: 'sub-second edge delivery on vercel', arrowDirection: 'up-right', target: 'vercel' },
      { text: 'accessible high-contrast buttons', arrowDirection: 'left', target: 'buttons' }
    ],
    technicalNote: 'Vercel edge network routing with zero third-party tracking bloat',
    outcome: 'Deployed live on Vercel at panarait.vercel.app, delivering a fast, responsive e-commerce experience.',
    retrospective: [
      'I should integrate automated visual regression testing in GitHub Actions to catch CSS layout edge cases early.',
      'Adding keyboard quick-search shortcuts would make navigating the product catalog even faster for desktop shoppers.'
    ],
    liveUrl: 'https://panarait.vercel.app',
    githubUrl: 'https://github.com/Rachit-Dudhaiya/panarait',
    image: '/assets/projects/panarait.png',
    imageCaption: 'Panara live storefront client interface featuring responsive product cards and fluid shopping navigation.'
  },
  {
    slug: 'school-management',
    year: '2024',
    spreadNumber: '04 / 05',
    stampedDate: '08 SEP 2024',
    title: 'School Management System (SLMS)',
    category: 'Academic Web Portal',
    oneLiner: 'Centralized academic web portal for student records, daily attendance tracking, faculty rosters, and administrative reporting.',
    role: 'Full-Stack Developer',
    team: 'Solo Developer',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'InfinityFree'],
    highlightPhrase: 'Relational student ledger with multi-role authentication',
    problem: [
      'Educational institutions often rely on fragmented paper registers or complicated spreadsheets that make tracking student attendance, grades, and faculty workloads slow and error-prone.',
      'School administrators needed a centralized web portal accessible over low-bandwidth school networks with dedicated roles for staff and administrators.'
    ],
    decisions: [
      {
        decision: 'Designed a normalized relational MySQL database structure with student and faculty foreign keys.',
        reason: 'Guarantees data consistency across academic terms and prevents conflicting attendance records.'
      },
      {
        decision: 'Built role-based session authentication for administrators, teachers, and student profiles.',
        reason: 'Secures grade modification actions and administrative logs behind strict permission gates.'
      },
      {
        decision: 'Created lightweight server-rendered PHP tables with instant client-side search filtering.',
        reason: 'Loads instantly even on older classroom computers without requiring high-end client hardware.'
      }
    ],
    processNotes: [
      { text: 'normalized mysql schema with foreign keys', arrowDirection: 'down-right', target: 'mysql' },
      { text: 'role-based access control (admin/faculty)', arrowDirection: 'up-right', target: 'auth' },
      { text: 'instant client search over server tables', arrowDirection: 'left', target: 'tables' }
    ],
    technicalNote: 'Prepared PDO statements and CSRF token verification across all form submissions',
    outcome: 'Live portal hosted at slms.ripaldesign.studio, actively managing student attendance and academic ledgers.',
    retrospective: [
      'I plan to add automated PDF generation for printable report cards and fee receipts.',
      'Migrating session state to Redis in future iterations will support seamless multi-campus scalability.'
    ],
    liveUrl: 'https://slms.ripaldesign.studio',
    githubUrl: 'https://github.com/Rachit-Dudhaiya/schoolmange',
    image: '/assets/projects/slms.png',
    imageCaption: 'School Management ERP live portal dashboard displaying student attendance, ledgers, and academic rosters.'
  },
  {
    slug: 'ripal-design-studio',
    year: '2023',
    spreadNumber: '05 / 05',
    stampedDate: '19 NOV 2023',
    title: 'Ripal Design Studio',
    category: 'Architecture Portfolio',
    oneLiner: 'Architecture and interior design studio website showcasing residential and commercial projects with tactile editorial layouts.',
    role: 'Web Developer & Designer',
    team: 'Lead Developer',
    stack: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'Vercel'],
    highlightPhrase: 'Editorial design presentation with focus on spatial photography',
    problem: [
      'A boutique architectural and interior design firm required a sophisticated online presence to showcase completed commercial projects and residential villas.',
      'The firm needed an aesthetic that highlighted architectural materials, natural lighting, and floor plans while making it effortless for prospective clients to book consultations.'
    ],
    decisions: [
      {
        decision: 'Crafted an editorial layout blending classic serif typography with ample whitespace.',
        reason: 'Provides a museum-grade presentation that lets high-resolution architectural photography speak for itself.'
      },
      {
        decision: 'Engineered smooth, lightweight project gallery transitions with CSS grid.',
        reason: 'Preserves 60fps scrolling performance without relying on heavy third-party carousel libraries.'
      },
      {
        decision: 'Created a direct consultation booking form with email dispatch.',
        reason: 'Streamlined client inquiries directly into the principal architect inbox, doubling consultation conversions.'
      }
    ],
    processNotes: [
      { text: 'spacious editorial grid for architectural imagery', arrowDirection: 'down-right', target: 'grid' },
      { text: 'subtle hover reveals for project metadata', arrowDirection: 'up-right', target: 'hover' },
      { text: 'frictionless client consultation form', arrowDirection: 'left', target: 'contact' }
    ],
    technicalNote: 'Custom CSS architecture without external UI frameworks, keeping total page payload under 45KB',
    outcome: 'Live at ripaldesign.studio, establishing a refined digital identity that drives continuous residential and commercial inquiries.',
    retrospective: [
      'I want to integrate an interactive before-and-after slider for interior restoration projects.',
      'Adding video background snippets of completed spaces will provide visitors with an even richer sense of scale.'
    ],
    liveUrl: 'https://app.ripaldesign.studio/',
    githubUrl: 'https://github.com/Rachit-Dudhaiya/RipalDesign',
    image: '/assets/projects/ripal-app.png',
    imageCaption: 'Ripal Design live studio application showing project spaces, architectural plans, and client consultation portals.'
  }
];

export const experienceData: { years: string; role: string; company: string; details?: string }[] = [
  {
    years: '2022 — Present',
    role: 'Software & Web Developer (Freelance / Projects)',
    company: 'Independent & Client Work',
    details: 'Developed production web platforms, client-side e-commerce applications, and cross-platform mobile apps for real estate, education, and architecture studios.'
  },
  {
    years: '2022 — 2026',
    role: 'B.Tech in Information & Technology',
    company: 'R.K. University, Rajkot',
    details: 'Current CGPA: 8.10 / 10.0. Core coursework in Data Structures, Algorithms, Database Management Systems, Web Technologies, and Computer Networks.'
  },
  {
    years: '2022 — 2024',
    role: 'Higher Secondary Certificate (12th GSHSEB)',
    company: 'Tapovan School, Rajkot',
    details: 'Science stream with focus on Mathematics and Computer Science.'
  }
];

export const techStackCategories = {
  codingLanguages: ['Python', 'HTML', 'CSS', 'JavaScript', 'Dart', 'Java', 'PHP', 'C', 'C++', 'C#'],
  backend: ['Firebase', 'Supabase', 'MySQL', 'Express.js', 'NoSQL', 'SQL'],
  frameworksAndLibraries: ['Flutter', 'TensorFlow', 'React', 'Tailwind CSS'],
  hostingAndDevOps: ['Vercel', 'InfinityFree', 'DigitalOcean'],
  toolsAndIDEs: ['VS Code', 'Antigravity', 'Android Studio', 'Git']
};

export const certificationsData = [
  {
    title: 'NPTEL Online Certification',
    issuer: 'NPTEL / IIT',
    type: 'Technical'
  },
  {
    title: 'CCNA: Introduction to Networks & Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    type: 'Technical'
  },
  {
    title: 'Java Programming Fundamentals, Language Features & Java SE 8 Features',
    issuer: 'Oracle / Java Certification',
    type: 'Technical'
  },
  {
    title: 'Gujarat Knowledge Consortium Certification',
    issuer: 'Education Department, Govt. of Gujarat',
    type: 'Academic Excellence'
  }
];

export const contactDetails = {
  name: 'Rachit Dudhaiya',
  title: 'Full-Stack & Mobile Developer',
  email: 'dudhaiyarachit45@gmail.com',
  phone: '+91 96870 68018',
  location: 'Punit Nagar, Rajkot 360-004, Gujarat, India',
  github: 'https://github.com/Rachit-Dudhaiya',
  linkedin: 'https://www.linkedin.com/in/rachit-dudhaiya-95a2b6352/',
  experienceYears: '3+ years hands-on development',
  status: 'B.Tech IT Student (Class of 2026) · Available for Software Developer roles & contracts'
};
