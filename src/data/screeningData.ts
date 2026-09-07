import { Question, SymptomCluster, ResourceItem, GroundingStep, AssessmentRecord } from '../types';

export const PC_PTSD_5_QUESTIONS: Question[] = [
  {
    id: 1,
    q: 'In the past month, have you had nightmares about the event(s) or thought about the event(s) when you did not want to?',
    why: 'This evaluates intrusive memories or involuntary re-experiencing, which is a hallmark indicator of post-traumatic stress.',
    cluster: 'Intrusive memories'
  },
  {
    id: 2,
    q: 'In the past month, have you tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?',
    why: 'This screens for situational and psychological avoidance—a natural self-protective behavior that can inadvertently prolong stress.',
    cluster: 'Avoidance'
  },
  {
    id: 3,
    q: 'In the past month, have you been constantly on guard, watchful, or easily startled?',
    why: "This assesses autonomic nervous system arousal and hypervigilance, where the brain's alarm center (amygdala) remains active.",
    cluster: 'Hyperarousal & reactivity'
  },
  {
    id: 4,
    q: 'In the past month, have you felt numb or detached from people, activities, or your surroundings?',
    why: 'This gauges emotional blunting or depersonalization, often experienced when overwhelming emotions cause the body to numb itself.',
    cluster: 'Emotional detachment'
  },
  {
    id: 5,
    q: 'In the past month, have you felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?',
    why: 'This evaluates persistent negative alterations in cognitions, moral injury, and self-blame that frequently accompany traumatic events.',
    cluster: 'Negative cognitions & guilt'
  }
];

export const DSM5_CLUSTERS: SymptomCluster[] = [
  {
    id: 'cluster-1',
    number: 1,
    name: 'Intrusive Memories',
    description: 'Involuntary, distressing thoughts, recurrent nightmares, or emotional flashbacks where the event feels like it is happening again in real time.',
    screenedIn: 'Screened in Q1',
    iconName: 'Brain'
  },
  {
    id: 'cluster-2',
    number: 2,
    name: 'Avoidance',
    description: 'Deliberately avoiding thoughts, conversations, places, people, or activities that serve as painful sensory triggers of the event.',
    screenedIn: 'Screened in Q2',
    iconName: 'ShieldAlert'
  },
  {
    id: 'cluster-3',
    number: 3,
    name: 'Hyperarousal & Reactivity',
    description: 'The nervous system stays in "fight or flight"—characterized by being easily startled, irritability, sleep disturbances, and hypervigilance.',
    screenedIn: 'Screened in Q3',
    iconName: 'Shield'
  },
  {
    id: 'cluster-4',
    number: 4,
    name: 'Mood & Cognition Changes',
    description: 'Persistent feelings of numbness, detachment from loved ones, difficulty feeling positive emotions, or distorted self-blame and guilt.',
    screenedIn: 'Screened in Q4 & Q5',
    iconName: 'HeartCrack'
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-telemanas',
    title: 'Tele-MANAS: National Tele Mental Health Programme of India',
    category: 'crisis',
    badge: 'Govt of India • 24/7',
    meta: 'Toll-Free 14416',
    description: 'Free, confidential mental health counseling across 20+ regional Indian languages run by the Ministry of Health and NIMHANS Bangalore.',
    actionType: 'external',
    actionUrl: 'tel:14416',
    actionLabel: 'Call 14416 Toll-Free →'
  },
  {
    id: 'res-kiran',
    title: 'KIRAN National Mental Health Helpline',
    category: 'crisis',
    badge: 'Ministry of Social Justice',
    meta: 'Toll-Free 1800-599-0019',
    description: '24/7 helpline by Govt of India offering psychological first aid, crisis intervention, and mental health rehabilitation support in 13 languages.',
    actionType: 'external',
    actionUrl: 'tel:18005990019',
    actionLabel: 'Call 1800-599-0019 →'
  },
  {
    id: 'res-vandrevala',
    title: 'Vandrevala Foundation Mental Health Helpline',
    category: 'crisis',
    badge: '24/7 Phone & WhatsApp',
    meta: 'Helpline +91 9999 666 555',
    description: 'Experienced clinical psychologists providing free, compassionate crisis counseling and emotional support across India via call and WhatsApp.',
    actionType: 'external',
    actionUrl: 'tel:9999666555',
    actionLabel: 'Call 9999 666 555 →'
  },
  {
    id: 'res-nimhans',
    title: 'NIMHANS Trauma & Disaster Care Centre',
    category: 'care',
    badge: 'Premier Institute • India',
    meta: 'NIMHANS Bengaluru',
    description: 'Apex clinical neuropsychiatry institute in India providing specialized treatment for PTSD, complex trauma, and psychological support.',
    actionType: 'external',
    actionUrl: 'https://nimhans.ac.in',
    actionLabel: 'Visit NIMHANS Portal ↗'
  },
  {
    id: 'res-1',
    title: '5-4-3-2-1 Sensory Grounding Guide',
    category: 'grounding',
    badge: 'Somatic & Grounding',
    meta: '5 min exercise',
    description: 'A somatic anchor technique to calm the nervous system when hyperarousal, startle, or intrusive memories surge.',
    actionType: 'modal',
    actionLabel: 'Launch interactive guide →'
  },
  {
    id: 'res-4',
    title: 'Pranayama & Diaphragmatic Box Breathing',
    category: 'sleep',
    badge: 'Sleep & Calming',
    meta: '4 min somatic practice',
    description: 'Traditional rhythmic breathing (Sama Vritti / 4-4-4-4) to stimulate the vagus nerve and down-regulate autonomic nervous tension.',
    actionType: 'modal',
    actionLabel: 'Practice breathing exercise →'
  },
  {
    id: 'res-icall',
    title: 'iCALL Psychosocial Helpline (TISS)',
    category: 'care',
    badge: 'Tata Institute of Social Sciences',
    meta: 'Mon-Sat 10am-8pm • 9152987821',
    description: 'Professional counseling service run by trained mental health professionals from the School of Human Ecology, TISS Mumbai.',
    actionType: 'external',
    actionUrl: 'https://icallhelpline.org',
    actionLabel: 'Explore iCALL Resources ↗'
  }
];

export const GROUNDING_STEPS: GroundingStep[] = [
  {
    step: 5,
    title: 'Look around you (5 things)',
    iconName: 'Eye',
    text: 'Notice 5 things you can see: light reflecting on a wall, your shoes, a plant, an interesting texture, or a doorknob.'
  },
  {
    step: 4,
    title: 'Touch & sensation (4 things)',
    iconName: 'Hand',
    text: 'Notice 4 physical sensations: your back supported by the seat, feet grounded on the floor, clothing on your skin, or room temperature.'
  },
  {
    step: 3,
    title: 'Listen attentively (3 things)',
    iconName: 'Ear',
    text: 'Identify 3 distinct sounds: distant ambient traffic, the hum of electronics, or the gentle sound of your own quiet breath.'
  },
  {
    step: 2,
    title: 'Scent & memory (2 things)',
    iconName: 'Wind',
    text: 'Notice 2 scents in the room, or call to mind a soothing familiar aroma such as fresh pine, rain, or lavender.'
  },
  {
    step: 1,
    title: 'Taste & release (1 thing)',
    iconName: 'Smile',
    text: 'Notice 1 taste, take a sip of cool water if available, unclench your jaw, and let out a full, slow exhale.'
  }
];

export const INITIAL_HISTORY: AssessmentRecord[] = [
  {
    id: 'rec-1',
    date: 'Oct 24, 2025',
    score: 4,
    total: 5,
    isPositive: true,
    statusText: 'Positive Screen',
    summary: 'Reported frequent intrusive thoughts, situational avoidance, and hypervigilance. Discussed grounding techniques in session.',
    answers: [true, true, true, false, true]
  },
  {
    id: 'rec-2',
    date: 'Sep 12, 2025',
    score: 3,
    total: 5,
    isPositive: true,
    statusText: 'Borderline Screen',
    summary: 'Avoidance and sleep disturbances noted during high workplace stress period.',
    answers: [true, true, true, false, false]
  }
];

export const BRAND_ASSETS = {
  logoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1Xw8qGu_DVrHKNXQwm6z8cDtlI8h9BIEuzHwJAa5hXG_3F2_8DRyekp1UAu45MHepP-HSGKo2GL90xOLSQLXoPN3eno-xiw9GJA6Q7wG0H2XXMpfCkNpVWz1mCZ2DL9XNt67c4KlHAf9iGCjeDA0VluInPaTRLc_zUXZ_5uU3A8Awkvgwl-uf9k3MXVEVjuG9qQnRruxcqGhiVyALG3FOLcCkH8a5g318RlrlrT9lX8D-0cupn42gVblDEh',
  heroIllustration: 'https://lh3.googleusercontent.com/aida/AEtjO1WDrmAZMOeuCvlc-RCcWYMhVg2lV0Gwf6qi00j7PWfIC5JWEF45PLk9XppdTcN6HStzskXCujrae_cbARs-VGJ6zv_6C0abnQmm9Ucz9LyM4rJr8_cPy4uq5ANQrPMZomOmGOwi_IQLEAqL8JIwcPPYcR-u6zp_tmi7OW69flmewBAySrS99hszFAxY0DZstJpIQxRzyuRr13rwV_oFAlm5yeduuBHDaOuDSazb5TK1rrXHUa_k5MrBLdDL'
};
