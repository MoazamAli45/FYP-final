// Define types
export interface CustomSectionItem {
  id: string;
  title: string;
  content: string;
}

export interface Link {
  text: string;
  url: string;
  icon?: any;
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface Section {
  id: string;
  title: string;
  isVisible: boolean;
  type: string;
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  gpa: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  link: Link;
  startDate: string;
  endDate: string;
  points: string[];
}

export interface Project {
  id: string;
  title: string;
  link: Link;
  startDate: string;
  endDate: string;
  points: string[];
}

export interface Certificate {
  id: string;
  name: string;
  link: Link;
  date: string;
  description: string;
}

export interface Skills {
  [key: string]: string[];
}

export interface PersonalInfo {
  name: string;
  links: {
    [key: string]: Link;
  };
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  sections: Section[];
  education: Education[];
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
  customSections: CustomSection[];
}

const initialSections: Section[] = [
  { id: "1", title: "EDUCATION", isVisible: true, type: "education" },
  { id: "2", title: "SKILLS SUMMARY", isVisible: true, type: "skills" },
  { id: "3", title: "WORK EXPERIENCE", isVisible: true, type: "experience" },
  { id: "4", title: "PROJECTS", isVisible: true, type: "projects" },
  { id: "5", title: "CERTIFICATES", isVisible: true, type: "certificates" },
];

export const initialData: ResumeData = {
  personalInfo: {
    name: "Syed Moazam Ali",
    links: {
      linkedin: { text: "LinkedIn", url: "linkedin" },
      github: { text: "Github/ Behance", url: "github" },
      email: { text: "Email", url: "abc123@gmail.com" },
      phone: { text: "Phone", url: "+92345-9087654" },
    },
  },
  sections: initialSections,
  education: [
    {
      id: "1",
      institution: "Vellore Institute of Technology",
      location: "Chennai, India",
      degree: "Master of Computer Application",
      gpa: "8.06",
      startDate: "June 2022",
      endDate: "August 2024",
    },
  ],
  skills: {
    languages: ["Python", "SQL", "JAVA"],
    frameworks: ["Pandas", "Numpy", "Scikit-Learn", "Matplotlib"],
    tools: ["Power BI", "Excel", "PowerPoint", "Tableau", "MySQL", "SQLite"],
    platforms: [
      "PyCharm",
      "Jupyter Notebook",
      "Visual Studio Code",
      "IntelliJ IDEA",
    ],
    softSkills: [
      "Rapport Building",
      "Strong Stakeholder management",
      "People Management",
      "Excellent communication",
    ],
  },
  experience: [
    {
      id: "1",
      title: "BUSINESS ANALYST INTERN",
      company: "WS",
      link: { text: "LINK", url: "#" },
      startDate: "03/02/2024",
      endDate: "03/02/2024",
      points: [
        "Streamlined data collection and reporting procedures, reducing processing time by 20% enhancing efficiency.",
        "Implemented process improvements and automation solutions, resulting in 15% increase in productivity.",
        "Collaborated with 3+ cross-functional teams to gather requirements, define project scopes, and ensure alignment with business objectives.",
      ],
    },
  ],
  projects: [
    {
      id: "1",
      title: "Student Performance Prediction",
      link: { text: "LINK", url: "#" },
      startDate: "03/02/2024",
      endDate: "03/02/2024",
      points: [
        "Achieved a 96% accuracy in predicting student performance using machine learning.",
        "Managed data integration from multiple sources, improving data quality by 30%.",
      ],
    },
  ],
  certificates: [
    {
      id: "1",
      name: "Programming in Python (Meta)",
      link: { text: "CERTIFICATE", url: "#" },
      date: "02/27/2025",
      description:
        "Mastered fundamental Python syntax, proficiently utilizing control flow, loops, functions, and data structures.",
    },
  ],
  customSections: [
    {
      id: "custom-section-1",
      sectionTitle: "Custom Section Title",
      items: [
        {
          id: "1",
          title: "",
          content: "",
        },
      ],
    },
  ],
};
