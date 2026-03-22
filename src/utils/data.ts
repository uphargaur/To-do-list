import { Service, Testimonial, SessionOption } from '../types';

export const services: Service[] = [
  {
    id: 'tarot',
    name: 'Intuitive Tarot Reading',
    description: 'Gain clarity and insight into your life path through tarot card readings.',
    detailedDescription: `Tarot is a powerful tool for self-reflection and guidance. My intuitive tarot readings go beyond simple fortune-telling – they help you understand the deeper patterns in your life and illuminate the path forward.

What to expect:
• Insight into current situations and challenges
• Understanding of past influences and future possibilities
• Clarity on relationships, career, and personal growth
• Guidance on decision-making and life choices
• Empowerment to take conscious action`,
    icon: 'auto_awesome',
    pricingOptions: [
      { label: 'Quick Reading', duration: 15, price: 1100, description: 'Perfect for single question' },
      { label: 'Standard Reading', duration: 30, price: 2100, description: 'Deep dive into your concerns' },
      { label: 'Comprehensive Reading', duration: 45, price: 3100, description: 'Complete life analysis' },
    ],
  },
  {
    id: 'counseling',
    name: 'Counseling Psychology',
    description: 'Professional psychological counseling for emotional well-being and mental health.',
    detailedDescription: `As a trained counseling psychologist, I provide a safe space for you to explore your emotions, thoughts, and behaviors. Whether you're dealing with anxiety, depression, relationship issues, or life transitions, I'm here to help you navigate through these challenges with evidence-based therapeutic approaches.

My counseling sessions focus on:
• Understanding your emotional patterns
• Developing healthy coping strategies
• Building self-awareness and emotional intelligence
• Breaking free from limiting beliefs
• Creating actionable steps for positive change`,
    icon: 'psychology',
    pricingOptions: [
      { label: 'Express Session', duration: 30, price: 1500, description: 'Quick guidance & support' },
      { label: 'Standard Session', duration: 45, price: 2000, description: 'In-depth counseling' },
      { label: 'Extended Session', duration: 60, price: 3100, description: 'Comprehensive therapy' },
    ],
  },
  {
    id: 'astrology',
    name: 'Astrology Consultation',
    description: 'Discover your life purpose and potential through Vedic astrology.',
    detailedDescription: `Astrology offers a cosmic perspective on your life journey. Through your birth chart, I analyze planetary positions and their influences on your personality, relationships, career, and life path.

Consultation includes:
• Birth chart analysis and interpretation
• Understanding your strengths and challenges
• Career and relationship compatibility
• Timing of important life events
• Remedial measures for planetary influences
• Life purpose and soul mission insights`,
    icon: 'nightlight',
    pricingOptions: [
      { label: 'Basic Consultation', duration: 45, price: 2500, description: 'Birth chart overview' },
      { label: 'Standard Consultation', duration: 60, price: 3100, description: 'Detailed chart analysis' },
      { label: 'Premium Consultation', duration: 90, price: 5100, description: 'Complete life roadmap' },
    ],
  },
  {
    id: 'numerology',
    name: 'Numerology Analysis',
    description: 'Uncover the hidden meanings in numbers that shape your destiny.',
    detailedDescription: `Numbers carry vibrations that influence our lives in profound ways. Through numerology, I decode the numbers in your name and birth date to reveal your life path, personality traits, and potential.

Analysis covers:
• Life Path Number and its significance
• Destiny Number and soul purpose
• Personal Year and Month forecasts
• Name analysis and corrections
• Lucky numbers and favorable dates
• Career and relationship compatibility through numbers`,
    icon: 'calculate',
    pricingOptions: [
      { label: 'Basic Analysis', duration: 30, price: 1500, description: 'Core numbers & meanings' },
      { label: 'Complete Analysis', duration: 45, price: 2500, description: 'Full numerology report' },
      { label: 'Combined Package', duration: 60, price: 5100, description: 'Numerology + Tarot + Astrology' },
    ],
  },
  {
    id: 'vastu',
    name: 'Vastu Consultation',
    description: 'Harmonize your living and working spaces with ancient Vastu principles.',
    detailedDescription: `Vastu Shastra is the ancient Indian science of architecture and space harmonization. I help you align your home or office with natural energies to promote health, prosperity, and well-being.

Consultation includes:
• Home and office space analysis
• Room-wise Vastu recommendations
• Corrections without structural changes
• Placement of furniture and objects
• Color schemes and element balance
• Remedies for Vastu doshas (defects)`,
    icon: 'home',
    pricingOptions: [
      { label: 'Single Room Analysis', duration: 30, price: 2100, description: 'One room Vastu check' },
      { label: 'Home Consultation', duration: 60, price: 4100, description: 'Complete home analysis' },
      { label: 'Premium Package', duration: 90, price: 6100, description: 'Home + office + remedies' },
    ],
  },
  {
    id: 'relationship-healing',
    name: 'Relationship Healing',
    description: 'Deep healing work for relationship issues and emotional wounds.',
    detailedDescription: `Specialized healing sessions focused on resolving relationship patterns, healing past wounds, and creating healthier connections. This intensive program combines counseling, energy work, and guided practices.

Healing includes:
• Identifying relationship patterns and blocks
• Healing past relationship trauma
• Communication skills development
• Self-love and boundary setting
• Attracting healthy relationships
• Ongoing support and guidance`,
    icon: 'auto_awesome',
    pricingOptions: [
      { label: 'Single Session', duration: 60, price: 3100, description: 'One-time healing session' },
      { label: '1 Week Program', price: 7000, description: 'Daily support & guidance' },
      { label: '1 Month Program', price: 15000, description: 'Complete transformation' },
    ],
  },
];

// Session options are now service-specific (see services.pricingOptions)

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    text: 'Shirnjani helped me understand patterns in my life that I had been repeating for years. Her blend of psychology and tarot gave me the clarity I desperately needed.',
    rating: 5,
    service: 'Counseling & Tarot',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    text: 'The astrology consultation was incredibly accurate. The insights about my career path were spot-on, and the remedies suggested have brought positive changes.',
    rating: 5,
    service: 'Astrology',
  },
  {
    id: '3',
    name: 'Anita Desai',
    text: 'I was skeptical at first, but the numerology reading revealed things about myself that resonated deeply. Highly recommend!',
    rating: 5,
    service: 'Numerology',
  },
  {
    id: '4',
    name: 'Vikram Singh',
    text: 'The Vastu consultation transformed my home environment. I feel more peaceful and productive now. Thank you, Shirnjani!',
    rating: 5,
    service: 'Vastu',
  },
  {
    id: '5',
    name: 'Meera Patel',
    text: 'Compassionate, insightful, and truly gifted. The counseling sessions helped me work through my anxiety in ways I never thought possible.',
    rating: 5,
    service: 'Counseling',
  },
  {
    id: '6',
    name: 'Arjun Reddy',
    text: 'Every session with Shirnjani brings new perspectives and healing. Her approach is both professional and deeply intuitive.',
    rating: 5,
    service: 'Counseling & Astrology',
  },
];

export const aboutContent = {
  introduction: `I'm Shirnjani, a counselling psychologist, intuitive tarot reader, and astrology-numerology consultant who works at the intersection of mind, emotions, and destiny.`,

  philosophy: `I believe that healing doesn't come from only talking, and it doesn't come from only predicting the future — it comes from understanding why you feel the way you do, why patterns repeat in your life, and how to consciously change them.`,

  focus: [
    'emotionally stuck',
    'confused about relationships',
    'anxious about their future',
    'disconnected from their true purpose',
    'or tired of repeating the same cycles again and again',
  ],

  approach: `Through a blend of psychology, counselling, astrology, tarot, and numerology, I guide people to find clarity, emotional balance, and direction.`,

  experience: {
    years: '5+',
    clientsServed: '500+',
    sessionsCompleted: '10k+',
    totalMinutes: '50k+',
  },

  qualifications: [
    'M.A. in Counseling Psychology',
    'Certified Tarot Reader',
    'Vedic Astrology Practitioner',
    'Numerology Consultant',
    'Vastu Shastra Consultant',
  ],
};
