import saibLogo from '@/assets/logos/saib.svg';
import dellLogo from '@/assets/logos/dell.svg';
import megzLogo from '@/assets/logos/megz.svg';
import depiLogo from '@/assets/logos/depi.svg';
import type { ExperienceEntry } from '@/types';

/** One line per takeaway; wrap key terms in **double asterisks** to bold them. */
export const experience: ExperienceEntry[] = [
  {
    role: 'FinTech Intern',
    organization: 'SAIB Bank',
    url: 'https://www.saib.com.eg/',
    logo: saibLogo,
    location: 'Cairo, Egypt',
    startDate: 'Aug 2026',
    endDate: 'Sep 2026',
    takeaways: [
      'Mentored by the **Head of FinTech & Startup Partnerships**.',
      'Completed an **emerging-technology case study**.',
    ],
  },
  {
    role: 'Summer Intern',
    organization: 'Dell Technologies',
    url: 'https://www.dell.com/',
    logo: dellLogo,
    location: 'Cairo, Egypt',
    startDate: 'Aug 2025',
    endDate: 'Sep 2025',
    takeaways: [
      'Led the **Academy Project** from concept to **business proposal**.',
      'Trained in **Docker**, **Kubernetes** and front-end development.',
      'Worked across **sales**, **pre-sales** and **engineering** teams.',
      'Used **design thinking** to improve **onboarding** for new hires.',
    ],
  },
  {
    role: 'AI/ML Engineer Intern',
    organization: 'DEPI',
    context: 'Microsoft ML Engineering Curriculum',
    url: 'https://mcit.gov.eg/en/Human_Capacity/MCIT/Digital_Egypt_Pioneers_Initiative',
    logo: depiLogo,
    location: 'Zamalek, Cairo',
    startDate: 'Nov 2024',
    endDate: 'May 2025',
    takeaways: [
      'Built **Jarvis**, a **multimodal AI agent**, as the capstone.',
      '**7 months** of NLP, generative AI, computer vision and deployment.',
      'Shipped a hands-on **milestone project** for every unit.',
    ],
  },
  {
    role: 'Computer Science Instructor',
    organization: 'Megz',
    url: 'https://www.facebook.com/megztechteam/',
    logo: megzLogo,
    location: 'Cairo, Egypt',
    startDate: 'Aug 2020',
    endDate: 'Nov 2021',
    takeaways: [
      'Taught **Python** to **30+ students**.',
      'Lifted small-group results by **~20%**.',
      'Coached students through **debugging** and **problem-solving**.',
    ],
  },
];
