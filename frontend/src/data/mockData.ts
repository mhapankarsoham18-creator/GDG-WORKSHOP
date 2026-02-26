export interface Chapter {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  members: number;
  imageUrl?: string;
  isVirtual?: boolean;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  chapterId: string;
  chapterName: string;
  description: string;
  type: 'meetup' | 'workshop' | 'conference' | 'hackathon';
  isVirtual: boolean;
  attendees: number;
  capacity: number;
  speakers?: string[];
  tags?: string[];
}

export const chapters: Chapter[] = [
  {
    id: "1",
    name: "GDG New Delhi",
    city: "New Delhi",
    country: "India",
    description: "A community of developers passionate about Google technologies, building innovative solutions together.",
    members: 4520,
    tags: ["Android", "Cloud", "AI/ML"],
  },
  {
    id: "2",
    name: "GDG San Francisco",
    city: "San Francisco",
    country: "USA",
    description: "Silicon Valley's premier developer community focused on cutting-edge Google tech and open source.",
    members: 8930,
    tags: ["Web", "Cloud", "Firebase"],
  },
  {
    id: "3",
    name: "GDG Berlin",
    city: "Berlin",
    country: "Germany",
    description: "Europe's vibrant tech hub connecting developers through workshops, talks, and hackathons.",
    members: 3210,
    tags: ["Flutter", "Kubernetes", "TensorFlow"],
  },
  {
    id: "4",
    name: "GDG Lagos",
    city: "Lagos",
    country: "Nigeria",
    description: "Africa's fastest-growing developer community empowering builders across the continent.",
    members: 6100,
    tags: ["Android", "Firebase", "Web"],
  },
  {
    id: "5",
    name: "GDG Tokyo",
    city: "Tokyo",
    country: "Japan",
    description: "Bringing together Japan's brightest minds in technology to learn, share, and innovate.",
    members: 5670,
    tags: ["AI/ML", "Cloud", "Angular"],
  },
  {
    id: "6",
    name: "GDG São Paulo",
    city: "São Paulo",
    country: "Brazil",
    description: "Latin America's largest developer community driving innovation with Google technologies.",
    members: 7800,
    tags: ["Android", "Web", "Cloud"],
    isVirtual: true,
  },
];

export const events: Event[] = [
  {
    id: "1",
    title: "DevFest 2025",
    date: "2025-03-15",
    time: "10:00 AM",
    chapterId: "1",
    chapterName: "GDG New Delhi",
    description: "The biggest developer festival featuring talks on AI, Cloud, and Web technologies.",
    type: "conference",
    isVirtual: false,
    attendees: 850,
    capacity: 1000,
    speakers: ["Sundar Pichai", "Jeff Dean"],
    tags: ["AI", "Cloud", "Web"],
  },
  {
    id: "2",
    title: "Flutter Forward Workshop",
    date: "2025-03-22",
    time: "2:00 PM",
    chapterId: "2",
    chapterName: "GDG San Francisco",
    description: "Hands-on workshop building beautiful cross-platform apps with Flutter 4.",
    type: "workshop",
    isVirtual: false,
    attendees: 120,
    capacity: 150,
    speakers: ["Eric Seidel"],
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    id: "3",
    title: "AI/ML Study Jam",
    date: "2025-04-05",
    time: "11:00 AM",
    chapterId: "3",
    chapterName: "GDG Berlin",
    description: "Deep dive into machine learning with TensorFlow and Google AI APIs.",
    type: "meetup",
    isVirtual: true,
    attendees: 340,
    capacity: 500,
    speakers: ["Laurence Moroney"],
    tags: ["TensorFlow", "AI", "ML"],
  },
  {
    id: "4",
    title: "Cloud Next Extended",
    date: "2025-04-12",
    time: "9:00 AM",
    chapterId: "4",
    chapterName: "GDG Lagos",
    description: "Watch party and hands-on labs for Google Cloud Next announcements.",
    type: "conference",
    isVirtual: false,
    attendees: 500,
    capacity: 600,
    speakers: ["Kelsey Hightower", "Priyanka Vergadia"],
    tags: ["GCP", "Kubernetes", "Cloud Run"],
  },
  {
    id: "5",
    title: "Android Hackathon",
    date: "2025-04-20",
    time: "9:00 AM",
    chapterId: "5",
    chapterName: "GDG Tokyo",
    description: "48-hour hackathon building the next generation of Android applications.",
    type: "hackathon",
    isVirtual: false,
    attendees: 200,
    capacity: 250,
    speakers: ["Chet Haase", "Romain Guy"],
    tags: ["Android", "Kotlin", "Jetpack Compose"],
  },
  {
    id: "6",
    title: "Web Performance Summit",
    date: "2025-05-01",
    time: "3:00 PM",
    chapterId: "6",
    chapterName: "GDG São Paulo",
    description: "Optimize your web apps with the latest Core Web Vitals strategies.",
    type: "meetup",
    isVirtual: true,
    attendees: 450,
    capacity: 1000,
    speakers: ["Addy Osmani"],
    tags: ["Web Vitals", "Performance", "Chrome"],
  },
];
