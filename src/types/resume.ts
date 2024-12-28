export interface ResumeData {
    title: string;
    currentRole: string;
    company: string;
    period: string;
  }
  
  export interface WorkExperience {
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
  }
  
  export interface Education {
    degree: string;
    school: string;
    period: string;
    details: string[];
  }
  
  export interface Skill {
    category: string;
    items: string[];
  }
  
  export interface ResumeProps {
    data: ResumeData;
    workExperience: WorkExperience[];
    education: Education[];
    skills: Skill[];
  }