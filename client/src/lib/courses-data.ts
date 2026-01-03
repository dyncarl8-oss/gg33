export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  keyPoints: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  free: boolean;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: 'intro-gg33',
    title: 'Introduction to GG33',
    description: 'Learn the basics of combining Chinese Astrology with Numerology',
    duration: '15 min',
    free: true,
    lessons: [
      {
        id: 'intro-1',
        title: 'What is GG33?',
        duration: '3 min',
        content: `GG33 is a unique system that combines the ancient wisdom of Chinese Astrology with the mathematical precision of Numerology to create a comprehensive understanding of human energy patterns.

Created by Gary "The Numbers Guy," this system provides insights into personality traits, life purpose, compatibility, and optimal timing for important decisions.

The "33" in GG33 represents the Master Number, symbolizing the highest level of spiritual awareness and teaching ability. This system aims to help you master your own energy and understand the energies of others.`,
        keyPoints: [
          'GG33 combines Chinese Astrology and Numerology',
          'Created by Gary "The Numbers Guy"',
          'Provides insights into personality, purpose, and compatibility',
          '33 represents the Master Number of spiritual awareness'
        ]
      },
      {
        id: 'intro-2',
        title: 'The Two Pillars: Numerology & Chinese Astrology',
        duration: '3 min',
        content: `GG33 stands on two powerful pillars of ancient wisdom:

**Numerology** - The study of numbers and their spiritual significance. Your birth date contains powerful numbers that reveal your life path, personality traits, and destiny. Key numbers include your Life Path Number, Expression Number, and Personal Year.

**Chinese Astrology** - A 12-year cycle based on the lunar calendar, assigning animal signs and elements to each year. Your birth year determines your Chinese Zodiac animal and element, revealing core personality traits and compatibility patterns.

When combined, these systems provide a 360-degree view of your energy signature.`,
        keyPoints: [
          'Numerology reveals life path through birth date numbers',
          'Chinese Astrology uses 12-year animal cycles',
          'Five elements (Wood, Fire, Earth, Metal, Water) add depth',
          'Combined systems create complete energy profile'
        ]
      },
      {
        id: 'intro-3',
        title: 'Understanding Your Energy Signature',
        duration: '3 min',
        content: `Your Energy Signature is a unique combination of your numerological and astrological influences. It describes who you are at your core.

**Components of Your Energy Signature:**

1. **Element** - Wood, Fire, Earth, Metal, or Water (from Chinese Astrology)
2. **Soul Type** - Based on your Life Path Number characteristics
3. **Energy Expression** - How you naturally express yourself

For example, a "Fire Soul Pioneer" would be someone born in a Fire element year with a Life Path 1, indicating passionate leadership energy.

Understanding your energy signature helps you make decisions aligned with your natural strengths.`,
        keyPoints: [
          'Energy Signature combines multiple factors',
          'Includes Element, Soul Type, and Expression',
          'Unique to your birth date and year',
          'Guides aligned decision-making'
        ]
      },
      {
        id: 'intro-4',
        title: 'How to Calculate Your Life Path Number',
        duration: '3 min',
        content: `Your Life Path Number is the most important number in Numerology. Here is how to calculate it:

**Step 1:** Write your full birth date (Month/Day/Year)
Example: March 15, 1990 = 03/15/1990

**Step 2:** Add all digits together
0 + 3 + 1 + 5 + 1 + 9 + 9 + 0 = 28

**Step 3:** Reduce to a single digit (unless 11, 22, or 33)
2 + 8 = 10
1 + 0 = 1

**Result:** Life Path Number 1

Master Numbers (11, 22, 33) are not reduced further as they carry special significance.`,
        keyPoints: [
          'Add all digits of your birth date',
          'Reduce to single digit (1-9)',
          'Master Numbers 11, 22, 33 are not reduced',
          'Life Path is your core numerological identity'
        ]
      },
      {
        id: 'intro-5',
        title: 'Finding Your Chinese Zodiac Sign',
        duration: '3 min',
        content: `Your Chinese Zodiac sign is determined by your birth year. The 12 animals cycle every 12 years:

**The 12 Animals:**
- Rat (2020, 2008, 1996, 1984)
- Ox (2021, 2009, 1997, 1985)
- Tiger (2022, 2010, 1998, 1986)
- Rabbit (2023, 2011, 1999, 1987)
- Dragon (2024, 2012, 2000, 1988)
- Snake (2013, 2001, 1989, 1977)
- Horse (2014, 2002, 1990, 1978)
- Goat (2015, 2003, 1991, 1979)
- Monkey (2016, 2004, 1992, 1980)
- Rooster (2017, 2005, 1993, 1981)
- Dog (2018, 2006, 1994, 1982)
- Pig (2019, 2007, 1995, 1983)

Note: Chinese New Year falls in January/February, so early-year births may belong to the previous year's animal.`,
        keyPoints: [
          '12 animals cycle every 12 years',
          'Birth year determines your animal',
          'Chinese New Year affects early-year births',
          'Each animal has unique personality traits'
        ]
      }
    ]
  },
  {
    id: 'life-path-numbers',
    title: 'Life Path Numbers',
    description: 'Deep dive into the meaning and significance of each life path number',
    duration: '45 min',
    free: true,
    lessons: [
      {
        id: 'lp-1',
        title: 'Life Path 1: The Pioneer',
        duration: '4 min',
        content: `Life Path 1 individuals are natural-born leaders who forge their own path in life.

**Core Traits:**
- Independent and self-reliant
- Innovative and original thinkers
- Ambitious and goal-oriented
- Courageous and determined

**Strengths:** Leadership, creativity, determination, initiative
**Challenges:** Stubbornness, ego, impatience, difficulty asking for help

**Career Paths:** Entrepreneur, CEO, inventor, freelancer, military leader

**Famous Life Path 1s:** Steve Jobs, Lady Gaga, Martin Luther King Jr.

Life Path 1s are here to learn independence and to lead by example. They often feel compelled to start new ventures and create original work.`,
        keyPoints: [
          'Natural leaders who forge their own path',
          'Independent, innovative, ambitious',
          'May struggle with ego and asking for help',
          'Best in entrepreneurial or leadership roles'
        ]
      },
      {
        id: 'lp-2',
        title: 'Life Path 2: The Diplomat',
        duration: '4 min',
        content: `Life Path 2 individuals are natural peacemakers who excel at bringing harmony to relationships.

**Core Traits:**
- Cooperative and diplomatic
- Sensitive and intuitive
- Patient and supportive
- Detail-oriented

**Strengths:** Mediation, partnership, empathy, patience
**Challenges:** Over-sensitivity, indecisiveness, people-pleasing, self-doubt

**Career Paths:** Counselor, mediator, diplomat, HR professional, therapist

**Famous Life Path 2s:** Barack Obama, Jennifer Aniston, Kim Kardashian

Life Path 2s are here to master the art of cooperation and to support others in achieving their goals.`,
        keyPoints: [
          'Natural peacemakers and diplomats',
          'Highly intuitive and empathetic',
          'Excel in partnerships and teamwork',
          'Need to balance giving with self-care'
        ]
      },
      {
        id: 'lp-3',
        title: 'Life Path 3: The Communicator',
        duration: '4 min',
        content: `Life Path 3 individuals are creative expressionists who inspire others through their words and art.

**Core Traits:**
- Creative and expressive
- Optimistic and joyful
- Social and charming
- Imaginative

**Strengths:** Communication, creativity, inspiration, entertainment
**Challenges:** Scattered energy, superficiality, mood swings, self-doubt

**Career Paths:** Writer, artist, actor, motivational speaker, marketing

**Famous Life Path 3s:** John Travolta, Snoop Dogg, Hillary Clinton

Life Path 3s are here to express themselves creatively and spread joy to the world.`,
        keyPoints: [
          'Creative expressionists and communicators',
          'Natural entertainers and artists',
          'Optimistic and socially gifted',
          'Need focus to avoid scattered energy'
        ]
      },
      {
        id: 'lp-4',
        title: 'Life Path 4: The Builder',
        duration: '4 min',
        content: `Life Path 4 individuals are practical builders who create lasting foundations.

**Core Traits:**
- Practical and hardworking
- Reliable and trustworthy
- Organized and methodical
- Patient and persistent

**Strengths:** Organization, discipline, loyalty, practicality
**Challenges:** Rigidity, workaholism, resistance to change, narrow-mindedness

**Career Paths:** Engineer, architect, accountant, project manager, craftsperson

**Famous Life Path 4s:** Oprah Winfrey, Bill Gates, Elton John

Life Path 4s are here to build solid foundations and create tangible results through hard work.`,
        keyPoints: [
          'Practical builders and organizers',
          'Extremely reliable and trustworthy',
          'Create lasting structures and systems',
          'Need flexibility to avoid rigidity'
        ]
      },
      {
        id: 'lp-5',
        title: 'Life Path 5: The Freedom Seeker',
        duration: '4 min',
        content: `Life Path 5 individuals crave freedom and adventure, constantly seeking new experiences.

**Core Traits:**
- Adventurous and versatile
- Adaptable and flexible
- Freedom-loving
- Curious and energetic

**Strengths:** Adaptability, versatility, resourcefulness, adventure
**Challenges:** Restlessness, inconsistency, impulsiveness, fear of commitment

**Career Paths:** Travel writer, sales, public relations, journalist, entrepreneur

**Famous Life Path 5s:** Beyonce, Angelina Jolie, Abraham Lincoln

Life Path 5s are here to experience life fully and teach others about freedom and change.`,
        keyPoints: [
          'Freedom seekers and adventurers',
          'Highly adaptable and versatile',
          'Crave variety and new experiences',
          'Need grounding to avoid restlessness'
        ]
      },
      {
        id: 'lp-6',
        title: 'Life Path 6: The Nurturer',
        duration: '4 min',
        content: `Life Path 6 individuals are natural caregivers devoted to family and community.

**Core Traits:**
- Nurturing and caring
- Responsible and protective
- Harmonious and balanced
- Artistic and creative

**Strengths:** Caregiving, responsibility, harmony, teaching
**Challenges:** Over-giving, perfectionism, worry, meddling

**Career Paths:** Teacher, nurse, counselor, designer, chef, social worker

**Famous Life Path 6s:** John Lennon, Victoria Beckham, Stevie Wonder

Life Path 6s are here to nurture and create beauty and harmony in their environment.`,
        keyPoints: [
          'Natural nurturers and caregivers',
          'Devoted to family and community',
          'Create beauty and harmony',
          'Must avoid over-giving and perfectionism'
        ]
      },
      {
        id: 'lp-7',
        title: 'Life Path 7: The Seeker',
        duration: '4 min',
        content: `Life Path 7 individuals are deep thinkers who seek truth and wisdom.

**Core Traits:**
- Analytical and intellectual
- Spiritual and introspective
- Intuitive and perceptive
- Independent and private

**Strengths:** Analysis, research, spirituality, wisdom
**Challenges:** Isolation, cynicism, over-thinking, difficulty trusting

**Career Paths:** Scientist, researcher, philosopher, spiritual teacher, analyst

**Famous Life Path 7s:** Princess Diana, Elon Musk, Leonardo DiCaprio

Life Path 7s are here to seek deeper truths and share their wisdom with the world.`,
        keyPoints: [
          'Deep thinkers and truth seekers',
          'Highly analytical and intuitive',
          'Need solitude for inner work',
          'Balance isolation with connection'
        ]
      },
      {
        id: 'lp-8',
        title: 'Life Path 8: The Powerhouse',
        duration: '4 min',
        content: `Life Path 8 individuals are ambitious achievers focused on material success and power.

**Core Traits:**
- Ambitious and goal-oriented
- Business-minded and practical
- Authoritative and confident
- Resilient and determined

**Strengths:** Business acumen, leadership, manifestation, abundance
**Challenges:** Workaholism, materialism, control issues, burnout

**Career Paths:** CEO, banker, lawyer, real estate, politician, investor

**Famous Life Path 8s:** Nelson Mandela, Pablo Picasso, Sandra Bullock

Life Path 8s are here to master the material world and use their power for good.`,
        keyPoints: [
          'Ambitious achievers and leaders',
          'Natural business and financial sense',
          'Powerful manifestors of abundance',
          'Must balance material with spiritual'
        ]
      },
      {
        id: 'lp-9',
        title: 'Life Path 9: The Humanitarian',
        duration: '4 min',
        content: `Life Path 9 individuals are compassionate souls devoted to serving humanity.

**Core Traits:**
- Compassionate and generous
- Idealistic and humanitarian
- Creative and artistic
- Wise and understanding

**Strengths:** Compassion, wisdom, creativity, philanthropy
**Challenges:** Martyrdom, resentment, letting go, boundaries

**Career Paths:** Nonprofit leader, artist, healer, teacher, humanitarian

**Famous Life Path 9s:** Mahatma Gandhi, Mother Teresa, Jim Carrey

Life Path 9s are here to serve humanity and leave the world better than they found it.`,
        keyPoints: [
          'Compassionate humanitarians',
          'Devoted to serving others',
          'Old souls with deep wisdom',
          'Must learn healthy boundaries'
        ]
      },
      {
        id: 'lp-11',
        title: 'Master Number 11: The Inspirer',
        duration: '4 min',
        content: `Master Number 11 is known as "The Inspirer" - a highly intuitive and spiritually aware soul.

**Core Traits:**
- Highly intuitive and psychic
- Inspiring and visionary
- Sensitive and empathic
- Charismatic and magnetic

**Strengths:** Intuition, inspiration, spiritual insight, healing
**Challenges:** Anxiety, overwhelm, nervous energy, self-doubt

**Career Paths:** Spiritual teacher, psychic, artist, inventor, leader

**Famous Life Path 11s:** Barack Obama, Madonna, Prince William

Master 11s carry the energy of 2 but amplified. They are here to inspire and enlighten others.`,
        keyPoints: [
          'Highly intuitive and spiritually gifted',
          'Natural inspirers and visionaries',
          'Carry amplified energy of 2',
          'Must manage sensitivity and anxiety'
        ]
      },
      {
        id: 'lp-22',
        title: 'Master Number 22: The Master Builder',
        duration: '4 min',
        content: `Master Number 22 is called "The Master Builder" - capable of turning dreams into reality on a grand scale.

**Core Traits:**
- Visionary and practical
- Ambitious and disciplined
- Capable of great achievements
- Methodical and systematic

**Strengths:** Building empires, manifesting visions, leadership, discipline
**Challenges:** Pressure, perfectionism, overwhelm, fear of failure

**Career Paths:** Architect, politician, international business, major nonprofit

**Famous Life Path 22s:** Sir Paul McCartney, Will Smith, Tina Fey

Master 22s carry amplified 4 energy. They can build lasting legacies that benefit humanity.`,
        keyPoints: [
          'Master builders of grand visions',
          'Turn dreams into tangible reality',
          'Carry amplified energy of 4',
          'Must not be overwhelmed by potential'
        ]
      },
      {
        id: 'lp-33',
        title: 'Master Number 33: The Master Teacher',
        duration: '5 min',
        content: `Master Number 33 is the rarest and most spiritually evolved - "The Master Teacher."

**Core Traits:**
- Deeply compassionate
- Spiritually evolved
- Natural healer and teacher
- Selflessly devoted to others

**Strengths:** Healing, teaching, unconditional love, spiritual mastery
**Challenges:** Self-sacrifice, martyrdom, carrying others' burdens

**Career Paths:** Spiritual leader, healer, counselor, humanitarian leader

**Famous Life Path 33s:** Albert Einstein, Stephen King, Meryl Streep

Master 33s combine the intuition of 11 and building ability of 22. They are here to uplift humanity through love.`,
        keyPoints: [
          'The rarest master number',
          'Master teachers and healers',
          'Combines 11 intuition + 22 building',
          'Must avoid martyrdom and self-sacrifice'
        ]
      }
    ]
  },
  {
    id: 'chinese-elements',
    title: 'Chinese Zodiac Elements',
    description: 'Understanding the five elements and their influence on personality',
    duration: '30 min',
    free: false,
    lessons: [
      {
        id: 'elem-1',
        title: 'Introduction to the Five Elements',
        duration: '4 min',
        content: `The Five Elements are fundamental to Chinese philosophy and astrology. They represent the basic forces of nature and how energy flows.

**The Five Elements:**
1. **Wood** - Growth, creativity, expansion
2. **Fire** - Passion, transformation, energy
3. **Earth** - Stability, nurturing, grounding
4. **Metal** - Precision, clarity, refinement
5. **Water** - Wisdom, adaptability, flow

Each element cycles every 10 years (2 years per element), and your birth year determines your dominant element.

Understanding your element helps explain your natural tendencies and how you interact with the world.`,
        keyPoints: [
          'Five elements: Wood, Fire, Earth, Metal, Water',
          'Each represents different life forces',
          '10-year elemental cycle (2 years each)',
          'Birth year determines your element'
        ]
      },
      {
        id: 'elem-2',
        title: 'Wood Element: The Creator',
        duration: '3 min',
        content: `Wood element people are natural creators and visionaries, like a tree growing toward the sun.

**Years:** 1984-85, 1994-95, 2004-05, 2014-15, 2024-25

**Characteristics:**
- Creative and innovative
- Growth-oriented
- Compassionate and generous
- Competitive and ambitious

**Strengths:** Vision, creativity, benevolence, flexibility
**Weaknesses:** Anger, impatience, over-extension

**Compatible Elements:** Water (nourishes), Fire (feeds)
**Challenging Elements:** Metal (cuts), Earth (depletes)`,
        keyPoints: [
          'Creative visionaries and growers',
          'Compassionate and generous nature',
          'Need to manage anger and impatience',
          'Thrive with Water and Fire elements'
        ]
      },
      {
        id: 'elem-3',
        title: 'Fire Element: The Transformer',
        duration: '3 min',
        content: `Fire element people are passionate transformers, radiating warmth and energy like a blazing flame.

**Years:** 1986-87, 1996-97, 2006-07, 2016-17, 2026-27

**Characteristics:**
- Passionate and enthusiastic
- Charismatic and inspiring
- Adventurous and bold
- Expressive and dramatic

**Strengths:** Passion, joy, leadership, transformation
**Weaknesses:** Impulsiveness, aggression, burnout

**Compatible Elements:** Wood (fuels), Earth (grounds)
**Challenging Elements:** Water (extinguishes), Metal (melts)`,
        keyPoints: [
          'Passionate and charismatic leaders',
          'Radiate warmth and inspiration',
          'Must avoid burnout and impulsiveness',
          'Thrive with Wood and Earth elements'
        ]
      },
      {
        id: 'elem-4',
        title: 'Earth Element: The Stabilizer',
        duration: '3 min',
        content: `Earth element people are natural stabilizers, providing grounding and nurturing like the solid ground beneath us.

**Years:** 1988-89, 1998-99, 2008-09, 2018-19, 2028-29

**Characteristics:**
- Stable and reliable
- Nurturing and supportive
- Practical and grounded
- Patient and methodical

**Strengths:** Stability, reliability, nurturing, practicality
**Weaknesses:** Stubbornness, worry, over-protectiveness

**Compatible Elements:** Fire (creates), Metal (produces)
**Challenging Elements:** Wood (depletes), Water (erodes)`,
        keyPoints: [
          'Stable and reliable nurturers',
          'Provide grounding for others',
          'Must avoid excessive worry',
          'Thrive with Fire and Metal elements'
        ]
      },
      {
        id: 'elem-5',
        title: 'Metal Element: The Refiner',
        duration: '3 min',
        content: `Metal element people are natural refiners, seeking perfection and clarity like a polished blade.

**Years:** 1980-81, 1990-91, 2000-01, 2010-11, 2020-21

**Characteristics:**
- Precise and detail-oriented
- Disciplined and organized
- Just and fair
- Determined and focused

**Strengths:** Clarity, discipline, justice, determination
**Weaknesses:** Rigidity, grief, criticism, coldness

**Compatible Elements:** Earth (produces), Water (refines)
**Challenging Elements:** Fire (melts), Wood (controls)`,
        keyPoints: [
          'Precise and disciplined refiners',
          'Seek clarity and perfection',
          'Must avoid rigidity and criticism',
          'Thrive with Earth and Water elements'
        ]
      },
      {
        id: 'elem-6',
        title: 'Water Element: The Philosopher',
        duration: '3 min',
        content: `Water element people are natural philosophers, flowing with wisdom and adaptability like a river.

**Years:** 1982-83, 1992-93, 2002-03, 2012-13, 2022-23

**Characteristics:**
- Wise and intuitive
- Adaptable and flexible
- Diplomatic and communicative
- Deep and mysterious

**Strengths:** Wisdom, intuition, diplomacy, flow
**Weaknesses:** Fear, indecision, manipulation, isolation

**Compatible Elements:** Metal (creates), Wood (nourishes)
**Challenging Elements:** Earth (blocks), Fire (evaporates)`,
        keyPoints: [
          'Wise and intuitive philosophers',
          'Highly adaptable and diplomatic',
          'Must overcome fear and indecision',
          'Thrive with Metal and Wood elements'
        ]
      },
      {
        id: 'elem-7',
        title: 'Element Cycles: Creation and Control',
        duration: '5 min',
        content: `The elements interact in two main cycles that explain compatibility and conflict:

**Creation Cycle (Supportive):**
- Wood feeds Fire
- Fire creates Earth (ash)
- Earth produces Metal
- Metal carries Water
- Water nourishes Wood

**Control Cycle (Challenging):**
- Wood depletes Earth
- Earth blocks Water
- Water extinguishes Fire
- Fire melts Metal
- Metal cuts Wood

Understanding these cycles helps predict relationship dynamics and energy interactions.`,
        keyPoints: [
          'Creation cycle shows supportive flow',
          'Control cycle shows challenging dynamics',
          'Use cycles to understand relationships',
          'Balance elements for harmony'
        ]
      },
      {
        id: 'elem-8',
        title: 'Balancing Your Element',
        duration: '6 min',
        content: `Every element has strengths and weaknesses. Here is how to balance each:

**Wood Balance:** Channel creativity productively. Practice patience. Spend time in nature.

**Fire Balance:** Ground your passion with routine. Rest to avoid burnout. Practice mindfulness.

**Earth Balance:** Set boundaries. Avoid over-worrying. Trust the process.

**Metal Balance:** Practice flexibility. Connect emotionally. Let go of perfectionism.

**Water Balance:** Take action despite fear. Set clear intentions. Maintain boundaries.

You can also support your element by incorporating colors, foods, and activities associated with supportive elements.`,
        keyPoints: [
          'Each element needs specific balancing',
          'Use supportive elements to strengthen',
          'Colors, foods, activities can help',
          'Self-awareness is key to balance'
        ]
      }
    ]
  },
  {
    id: 'compatibility',
    title: 'Compatibility Analysis',
    description: 'How to read and interpret compatibility scores effectively',
    duration: '40 min',
    free: false,
    lessons: [
      {
        id: 'compat-1',
        title: 'Understanding Compatibility in GG33',
        duration: '4 min',
        content: `Compatibility in GG33 is measured through multiple factors, creating a comprehensive picture of how two energies interact.

**Key Compatibility Factors:**
1. Life Path Number compatibility
2. Chinese Zodiac animal harmony
3. Elemental balance
4. Energy type alignment

No single factor determines compatibility. The combination reveals:
- Natural chemistry and attraction
- Communication styles
- Potential challenges
- Growth opportunities

High compatibility does not guarantee success, and low compatibility does not mean failure. Awareness enables navigation.`,
        keyPoints: [
          'Multiple factors create compatibility score',
          'Life Path, Zodiac, Element all matter',
          'High scores show natural harmony',
          'Awareness helps navigate any pairing'
        ]
      },
      {
        id: 'compat-2',
        title: 'Life Path Compatibility Basics',
        duration: '4 min',
        content: `Certain Life Path numbers naturally harmonize while others create friction:

**Natural Matches:**
- 1 & 5: Adventure and independence
- 2 & 6: Nurturing and harmony
- 3 & 9: Creativity and compassion
- 4 & 8: Building and ambition
- 7 & 7: Deep spiritual connection

**Challenging Matches:**
- 1 & 8: Power struggles
- 4 & 5: Stability vs freedom conflict
- 3 & 4: Spontaneity vs structure

**Growth Matches:**
- 1 & 2: Learning balance
- 5 & 6: Freedom meets responsibility
- 7 & 3: Depth meets expression`,
        keyPoints: [
          'Some numbers naturally harmonize',
          'Challenging matches create growth',
          'Same numbers can be powerful or competitive',
          'Master numbers add intensity'
        ]
      },
      {
        id: 'compat-3',
        title: 'Chinese Zodiac Compatibility',
        duration: '4 min',
        content: `The 12 animals form compatibility groups based on their position in the zodiac:

**Triangle Compatibilities (Best Matches):**
- Rat, Dragon, Monkey (ambitious achievers)
- Ox, Snake, Rooster (methodical thinkers)
- Tiger, Horse, Dog (action-oriented)
- Rabbit, Goat, Pig (peaceful creators)

**Opposite Signs (Challenging):**
- Rat vs Horse
- Ox vs Goat
- Tiger vs Monkey
- Rabbit vs Rooster
- Dragon vs Dog
- Snake vs Pig

Opposite signs can create powerful attractions but require more effort to maintain harmony.`,
        keyPoints: [
          'Triangle groups are naturally compatible',
          'Opposite signs create tension and attraction',
          'Adjacent signs have moderate compatibility',
          'Same sign can compete or complement'
        ]
      },
      {
        id: 'compat-4',
        title: 'Element Compatibility in Relationships',
        duration: '4 min',
        content: `Elements interact in relationships just as they do in nature:

**Harmonious Element Pairings:**
- Wood + Water: Nurturing growth
- Fire + Wood: Passionate inspiration
- Earth + Fire: Grounded passion
- Metal + Earth: Structured stability
- Water + Metal: Flowing clarity

**Challenging Element Pairings:**
- Water + Fire: Steam and conflict
- Metal + Wood: Cutting criticism
- Earth + Wood: Depleting energy
- Fire + Metal: Intense transformation
- Water + Earth: Blocked flow

Understanding elemental dynamics helps navigate emotional patterns in relationships.`,
        keyPoints: [
          'Creation cycle elements support each other',
          'Control cycle elements create friction',
          'Elemental balance can be cultivated',
          'Awareness helps manage conflicts'
        ]
      },
      {
        id: 'compat-5',
        title: 'Reading a Compatibility Report',
        duration: '4 min',
        content: `When analyzing a GG33 compatibility report, look for:

**Overall Score:** A percentage showing general harmony. Above 70% indicates strong natural compatibility.

**Breakdown Sections:**
- Life Path Match: Core personality alignment
- Element Balance: Emotional dynamics
- Zodiac Harmony: Behavioral patterns
- Energy Flow: How you energize each other

**Key Insights:**
- Strengths: Where you naturally sync
- Challenges: Potential friction points
- Growth Areas: What you can teach each other
- Recommendations: How to optimize the relationship`,
        keyPoints: [
          '70%+ indicates strong compatibility',
          'Review each breakdown section',
          'Note both strengths and challenges',
          'Use recommendations for growth'
        ]
      },
      {
        id: 'compat-6',
        title: 'Romantic Compatibility',
        duration: '4 min',
        content: `Romantic relationships require specific compatibility factors:

**Attraction Factors:**
- Complementary elements create chemistry
- Same Life Path can be magnetic
- Opposite zodiacs often attract initially

**Long-term Success Factors:**
- Life Path values alignment
- Emotional element balance
- Communication style harmony
- Shared growth direction

**Red Flags to Watch:**
- Control cycle elements without awareness
- Extreme number differences (1 vs 2)
- Competing same numbers without cooperation

The best romantic matches combine attraction with long-term compatibility.`,
        keyPoints: [
          'Attraction and compatibility differ',
          'Long-term success needs value alignment',
          'Communication styles must work together',
          'Awareness transforms challenges'
        ]
      },
      {
        id: 'compat-7',
        title: 'Business & Professional Compatibility',
        duration: '4 min',
        content: `Business partnerships require different compatibility factors than romance:

**Ideal Business Pairings:**
- 1 + 4: Visionary + Builder
- 3 + 8: Creative + Business-minded
- 2 + 1: Diplomat + Leader
- 5 + 7: Promoter + Strategist
- 6 + 4: Nurturer + Organizer

**Elements in Business:**
- Wood + Metal: Vision + Execution
- Fire + Earth: Passion + Stability
- Water + Fire: Strategy + Action

**Team Compatibility:**
Balance of numbers creates well-rounded teams. Avoid too many same numbers competing.`,
        keyPoints: [
          'Business needs complementary skills',
          'Balance visionaries with builders',
          'Element harmony affects work style',
          'Diverse teams outperform same-number groups'
        ]
      },
      {
        id: 'compat-8',
        title: 'Family Compatibility',
        duration: '4 min',
        content: `Family dynamics are influenced by generational patterns:

**Parent-Child Compatibility:**
- Similar numbers create understanding
- Different numbers offer growth lessons
- Element cycles affect emotional bonds

**Sibling Dynamics:**
- Same numbers may compete
- Complementary numbers support each other
- Birth order adds another layer

**Multi-Generational Patterns:**
- Master numbers often run in families
- Element cycles can repeat
- Understanding helps heal family wounds

Family is where we learn our first compatibility lessons. Awareness helps break negative patterns.`,
        keyPoints: [
          'Family patterns teach compatibility',
          'Parent-child dynamics follow number rules',
          'Sibling relationships show early patterns',
          'Awareness breaks negative cycles'
        ]
      },
      {
        id: 'compat-9',
        title: 'Self-Compatibility: Inner Balance',
        duration: '4 min',
        content: `The most important compatibility is with yourself:

**Internal Harmony:**
Your Life Path, Expression, and Soul Urge numbers should work together. Internal conflicts create life challenges.

**Element Balance:**
Your dominant element needs supporting elements in your environment, activities, and relationships.

**Shadow Work:**
Each number has shadow traits. Integrating your shadow creates self-compatibility.

**Signs of Self-Compatibility:**
- Confidence in decisions
- Authentic expression
- Attracting aligned relationships
- Inner peace despite external chaos`,
        keyPoints: [
          'Self-compatibility is foundational',
          'Internal number harmony matters',
          'Shadow integration creates balance',
          'Self-aligned people attract better matches'
        ]
      },
      {
        id: 'compat-10',
        title: 'Working with Low Compatibility',
        duration: '4 min',
        content: `Low compatibility is not destiny. Here is how to navigate it:

**Awareness Strategies:**
1. Identify specific friction points
2. Understand each other's core needs
3. Create communication bridges
4. Celebrate differences

**Practical Tools:**
- Use compatible elements to balance
- Find shared values beyond numbers
- Create rituals that honor both energies
- Seek outside support when needed

**Growth Mindset:**
Low compatibility relationships often teach the most profound lessons. The challenge is the curriculum.`,
        keyPoints: [
          'Low compatibility can still work',
          'Awareness is the key to navigation',
          'Use supporting elements to balance',
          'Challenges become growth opportunities'
        ]
      }
    ]
  },
  {
    id: 'daily-energy',
    title: 'Daily Energy Cycles',
    description: 'Master the art of using daily energy for optimal decision-making',
    duration: '35 min',
    free: false,
    lessons: [
      {
        id: 'daily-1',
        title: 'Understanding Personal Day Numbers',
        duration: '4 min',
        content: `Your Personal Day Number reveals the energy available each day for specific activities.

**How to Calculate:**
Personal Year + Personal Month + Calendar Day = Personal Day

**Example:** If today is the 15th, your Personal Month is 7, and Personal Year is 3:
3 + 7 + 15 = 25 → 2 + 5 = 7 (Personal Day 7)

**Personal Day Meanings:**
- 1: New beginnings, initiative
- 2: Cooperation, patience
- 3: Creativity, expression
- 4: Work, organization
- 5: Change, adventure
- 6: Home, responsibility
- 7: Reflection, research
- 8: Business, finance
- 9: Completion, release`,
        keyPoints: [
          'Personal Day shows daily energy',
          'Calculate from Year + Month + Day',
          'Each number has specific best uses',
          'Align activities with daily energy'
        ]
      },
      {
        id: 'daily-2',
        title: 'Personal Year Cycles',
        duration: '4 min',
        content: `Your Personal Year sets the theme for the entire year. It cycles 1-9.

**Calculate Your Personal Year:**
Birth Month + Birth Day + Current Year digits

**Example:** Birthday March 15, Year 2024:
3 + 15 + 2024 → 3 + 1 + 5 + 2 + 0 + 2 + 4 = 17 → 1 + 7 = 8 (Personal Year 8)

**Personal Year Themes:**
- Year 1: New beginnings, fresh starts
- Year 2: Partnerships, patience
- Year 3: Creativity, social expansion
- Year 4: Foundation building, hard work
- Year 5: Change, freedom, travel
- Year 6: Home, family, responsibility
- Year 7: Reflection, spiritual growth
- Year 8: Achievement, abundance
- Year 9: Completion, release`,
        keyPoints: [
          'Personal Year sets annual theme',
          'Cycles through 1-9 over nine years',
          'Major decisions align with year energy',
          'Year 9 ends cycles before Year 1 restart'
        ]
      },
      {
        id: 'daily-3',
        title: 'Universal Day Energy',
        duration: '4 min',
        content: `Universal Day energy affects everyone and combines with your Personal Day.

**Calculate Universal Day:**
Add the digits of today's full date (Month + Day + Year)

**Example:** December 6, 2024:
1 + 2 + 6 + 2 + 0 + 2 + 4 = 17 → 1 + 7 = 8 (Universal Day 8)

**Using Universal + Personal Days:**
Your Personal Day energy is influenced by the Universal Day. When they match, that energy is amplified.

**Universal Days for:**
- Starting projects: 1, 8
- Collaboration: 2, 6
- Creativity: 3, 5
- Planning: 4, 7
- Completion: 9`,
        keyPoints: [
          'Universal Day affects everyone',
          'Combines with Personal Day',
          'Matching numbers amplify energy',
          'Plan important events accordingly'
        ]
      },
      {
        id: 'daily-4',
        title: 'Optimal Days for Major Decisions',
        duration: '4 min',
        content: `Match your activities to favorable daily energies:

**Business Decisions:**
- Best: Days 1, 4, 8
- Avoid: Day 5 (too changeable), Day 7 (needs reflection)

**Relationship Talks:**
- Best: Days 2, 6
- Avoid: Day 1 (too self-focused), Day 5 (unsettled)

**Creative Projects:**
- Best: Days 3, 5
- Avoid: Day 4 (too rigid), Day 8 (too business-focused)

**Spiritual Practices:**
- Best: Days 7, 9, 11
- Avoid: Day 4 (too material), Day 8 (worldly focus)

**Endings/Letting Go:**
- Best: Day 9
- Avoid: Day 1 (beginning energy)`,
        keyPoints: [
          'Match activities to day energy',
          'Avoid conflicting energies',
          'Major decisions need aligned days',
          'Flexibility allows for adjustments'
        ]
      },
      {
        id: 'daily-5',
        title: 'Monthly Energy Patterns',
        duration: '4 min',
        content: `Personal Month energy provides a broader context for your weeks.

**Calculate Personal Month:**
Personal Year + Calendar Month

**Example:** Personal Year 8, October (10):
8 + 10 = 18 → 1 + 8 = 9 (Personal Month 9)

**Monthly Themes:**
- Month 1: Set intentions, start projects
- Month 2: Build relationships, be patient
- Month 3: Express yourself, be social
- Month 4: Organize, create systems
- Month 5: Embrace change, travel
- Month 6: Focus on home, family
- Month 7: Rest, reflect, research
- Month 8: Push for achievement
- Month 9: Complete, release, prepare

Personal Days operate within your Monthly energy framework.`,
        keyPoints: [
          'Monthly energy sets weekly context',
          'Personal Month = Year + Calendar Month',
          'Plan big projects across months',
          'Days work within monthly themes'
        ]
      },
      {
        id: 'daily-6',
        title: 'Weekly Energy Planning',
        duration: '4 min',
        content: `Each day of the week carries its own energy that combines with your numbers:

**Weekday Energies:**
- **Monday** (Moon): Emotions, intuition, new week intentions
- **Tuesday** (Mars): Action, courage, tackling challenges
- **Wednesday** (Mercury): Communication, meetings, learning
- **Thursday** (Jupiter): Expansion, luck, big thinking
- **Friday** (Venus): Relationships, creativity, pleasure
- **Saturday** (Saturn): Structure, discipline, practical work
- **Sunday** (Sun): Rest, reflection, spiritual renewal

Combine weekday energy with your Personal Day for optimal planning.`,
        keyPoints: [
          'Each weekday has planetary energy',
          'Combine with Personal Day numbers',
          'Monday for intentions, Friday for relationships',
          'Sunday for rest and reflection'
        ]
      },
      {
        id: 'daily-7',
        title: 'Void and Power Days',
        duration: '4 min',
        content: `Some days carry special significance in your cycle:

**Power Days:**
When your Personal Day matches your Life Path, you're in alignment. Example: Life Path 4 on Personal Day 4.
- Energy is amplified
- Actions have more impact
- Stay aligned with your purpose

**Void Days:**
Day 5 can feel scattered for everyone. Day 9 endings can feel heavy.
- Use for rest and reflection
- Avoid major commitments
- Good for completion, not initiation

**Master Number Days:**
Days 11, 22, 33 carry spiritual intensity.
- Heightened intuition
- Greater responsibility
- Potential for breakthrough or overwhelm`,
        keyPoints: [
          'Power Days match Life Path energy',
          'Void Days need careful navigation',
          'Master Number Days are intense',
          'Use each day type appropriately'
        ]
      },
      {
        id: 'daily-8',
        title: 'Creating Your Energy Calendar',
        duration: '4 min',
        content: `Build a personal energy calendar for optimal planning:

**Step 1:** Calculate your Personal Year for this year
**Step 2:** Calculate Personal Month for each month
**Step 3:** Mark important dates and their Personal Day energies
**Step 4:** Identify Power Days (matching Life Path)
**Step 5:** Note Master Number Days (11, 22)

**Calendar Tips:**
- Schedule launches on Day 1 or 8
- Book important meetings on Day 2 or 6
- Take breaks on Day 7 or 9
- Use Day 4 for admin and planning
- Embrace change on Day 5

Review your calendar weekly to align activities with energy.`,
        keyPoints: [
          'Calculate Personal Year first',
          'Map months and important days',
          'Mark Power Days and Master Days',
          'Review weekly for alignment'
        ]
      },
      {
        id: 'daily-9',
        title: 'Integrating Chinese Calendar',
        duration: '3 min',
        content: `The Chinese calendar adds another layer to daily energy:

**Lucky and Unlucky Days:**
Traditional Chinese calendars mark auspicious and inauspicious days for activities like:
- Marriage
- Moving
- Starting business
- Travel

**Lunar Phases:**
- New Moon: New beginnings
- Full Moon: Culmination, release
- Waxing: Growing, building
- Waning: Releasing, completing

**Combining Systems:**
Use Numerology for personal timing and Chinese calendar for collective timing. Both aligned = optimal.`,
        keyPoints: [
          'Chinese calendar marks auspicious days',
          'Lunar phases affect energy',
          'New Moon for beginnings, Full Moon for release',
          'Combine both systems for best results'
        ]
      }
    ]
  },
  {
    id: 'advanced-numerology',
    title: 'Advanced Numerology',
    description: 'Master numbers, personal year cycles, and advanced calculations',
    duration: '60 min',
    free: false,
    lessons: [
      {
        id: 'adv-1',
        title: 'Beyond Life Path: The Core Numbers',
        duration: '4 min',
        content: `Your complete numerology chart includes multiple core numbers:

**The Five Core Numbers:**
1. **Life Path** - Your life purpose (from birth date)
2. **Expression** - Your natural talents (from full birth name)
3. **Soul Urge** - Your heart's desire (from vowels in name)
4. **Personality** - How others see you (from consonants)
5. **Birthday** - Your special gift (from birth day only)

Each number adds depth to your profile. They can support each other or create internal tension.

A complete reading considers all five for a 360-degree view.`,
        keyPoints: [
          'Five core numbers create full profile',
          'Life Path is most important',
          'Expression comes from birth name',
          'Numbers can harmonize or conflict'
        ]
      },
      {
        id: 'adv-2',
        title: 'Calculating Expression Number',
        duration: '4 min',
        content: `Your Expression Number (also called Destiny Number) comes from your full birth name.

**Letter Values:**
A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9
J=1, K=2, L=3, M=4, N=5, O=6, P=7, Q=8, R=9
S=1, T=2, U=3, V=4, W=5, X=6, Y=7, Z=8

**Calculation:**
1. Write your full birth certificate name
2. Convert each letter to its number
3. Add all numbers together
4. Reduce to single digit (or master number)

**Example:** "John Smith"
J(1)+O(6)+H(8)+N(5) = 20 → 2
S(1)+M(4)+I(9)+T(2)+H(8) = 24 → 6
Total: 2 + 6 = 8 (Expression 8)`,
        keyPoints: [
          'Use full birth certificate name',
          'Each letter has a number value',
          'Add all letters and reduce',
          'Expression shows your potential'
        ]
      },
      {
        id: 'adv-3',
        title: 'Soul Urge and Personality Numbers',
        duration: '4 min',
        content: `These numbers reveal your inner and outer self:

**Soul Urge (Heart's Desire):**
Calculated from VOWELS only (A, E, I, O, U)
Reveals: What you truly want deep down

**Example:** "John Smith"
O(6) + I(9) = 15 → 1 + 5 = 6 (Soul Urge 6)
This person deeply desires home, family, and harmony.

**Personality Number:**
Calculated from CONSONANTS only
Reveals: How others perceive you, your outer mask

**Example:** "John Smith"
J(1)+H(8)+N(5)+S(1)+M(4)+T(2)+H(8) = 29 → 11 (Personality 11)
Others see this person as inspiring and intuitive.`,
        keyPoints: [
          'Soul Urge = vowels only',
          'Personality = consonants only',
          'Soul Urge is your deepest desire',
          'Personality is your public image'
        ]
      },
      {
        id: 'adv-4',
        title: 'Karmic Debt Numbers',
        duration: '4 min',
        content: `Karmic Debt numbers indicate lessons carried from past lives:

**The Karmic Debt Numbers:** 13, 14, 16, 19

**13/4 - Karmic Debt of Laziness:**
Past life of avoiding work. This life requires extra effort and discipline.

**14/5 - Karmic Debt of Control:**
Past life of abusing freedom. This life teaches responsible freedom.

**16/7 - Karmic Debt of Ego:**
Past life of vanity. This life humbles through ego destruction.

**19/1 - Karmic Debt of Selfishness:**
Past life of self-centeredness. This life teaches through isolation until selflessness is learned.

If these numbers appear in your core calculations (before reducing), you carry this karmic lesson.`,
        keyPoints: [
          'Karmic Debts indicate past life lessons',
          '13, 14, 16, 19 are karmic numbers',
          'They appear before final reduction',
          'Each carries specific challenges'
        ]
      },
      {
        id: 'adv-5',
        title: 'Karmic Lessons and Missing Numbers',
        duration: '4 min',
        content: `Karmic Lessons come from numbers missing in your name:

**Finding Missing Numbers:**
1. Write your full birth name
2. Convert all letters to numbers
3. Note which numbers 1-9 are NOT present

**Karmic Lesson Meanings:**
- Missing 1: Learning self-reliance
- Missing 2: Learning cooperation
- Missing 3: Learning self-expression
- Missing 4: Learning discipline
- Missing 5: Learning adaptability
- Missing 6: Learning responsibility
- Missing 7: Learning faith
- Missing 8: Learning personal power
- Missing 9: Learning compassion

Multiple missing numbers indicate multiple lessons to master.`,
        keyPoints: [
          'Missing numbers show karmic lessons',
          'Find which 1-9 are absent from name',
          'Each missing number is a life lesson',
          'Work consciously on missing energies'
        ]
      },
      {
        id: 'adv-6',
        title: 'Pinnacles and Challenges',
        duration: '5 min',
        content: `Your life divides into four major periods called Pinnacles, each with a Challenge:

**Calculating Pinnacles:**
- First Pinnacle: Month + Day
- Second Pinnacle: Day + Year
- Third Pinnacle: First + Second
- Fourth Pinnacle: Month + Year

**Pinnacle Timing:**
- First: Birth to age 36 minus Life Path
- Second: Next 9 years
- Third: Next 9 years
- Fourth: Remainder of life

**Challenges:**
Subtract the same pairs to find the lesson during each period.

Pinnacles show opportunities; Challenges show what to overcome.`,
        keyPoints: [
          'Four Pinnacles divide your life',
          'Each has opportunities and challenges',
          'Calculate from birth date elements',
          'Timing based on Life Path number'
        ]
      },
      {
        id: 'adv-7',
        title: 'Personal Year Forecasting',
        duration: '4 min',
        content: `Advanced Personal Year analysis provides detailed life forecasting:

**9-Year Cycle Overview:**
- Years 1-3: Planting (initiation, growth, expression)
- Years 4-6: Cultivating (building, change, responsibility)
- Years 7-9: Harvesting (reflection, reward, completion)

**Year Transitions:**
Major life changes often occur during:
- Year 1: New chapter begins
- Year 5: Mid-cycle upheaval
- Year 9: Major endings

**Multiple Cycle Awareness:**
You're always in multiple cycles: Personal Year, Month, Day, and longer Pinnacle cycles. Master readers track all levels.`,
        keyPoints: [
          '9-year cycle has three phases',
          'Years 1, 5, 9 are transition points',
          'Multiple cycles operate simultaneously',
          'Track long and short-term patterns'
        ]
      },
      {
        id: 'adv-8',
        title: 'Name Analysis and Changes',
        duration: '4 min',
        content: `Names carry vibration, and changes affect your numerology:

**Birth Name:**
Always remains your core vibration, even if you change your name.

**Current Name (if different):**
Adds a new vibration layer. Does not replace birth name energy.

**Married Names:**
Adding spouse's surname adds their family energy to yours.

**Stage Names/Nicknames:**
Can be chosen strategically to enhance certain numbers.

**Changing Names Intentionally:**
Some people change spelling to adjust their Expression Number. Example: "Jon" vs "John" creates different vibrations.

Always honor your birth name as the foundation.`,
        keyPoints: [
          'Birth name is core vibration forever',
          'New names add energy layers',
          'Marriage adds family vibration',
          'Strategic spelling changes are possible'
        ]
      },
      {
        id: 'adv-9',
        title: 'Master Numbers Deep Dive',
        duration: '5 min',
        content: `Master Numbers carry higher vibration and responsibility:

**11 - The Intuitive Master:**
Doubled 1 energy with spiritual purpose. Channel: Inspiration, psychic ability, teaching.

**22 - The Architect Master:**
Doubled 2 energy with building power. Channel: Large-scale projects, global impact.

**33 - The Teacher Master:**
Doubled 3 energy with healing ability. Channel: Selfless service, spiritual teaching.

**44 - The Healer Master:**
Rare. Doubled 4 with manifesting power. Channel: Building systems that heal.

**Living Master Number Energy:**
Not everyone with these numbers lives their potential. Unrealized master numbers operate as their reduced form (11→2, 22→4, 33→6).`,
        keyPoints: [
          'Master Numbers are 11, 22, 33 (and 44)',
          'Carry higher potential and responsibility',
          'Must be consciously developed',
          'Unrealized masters live reduced energy'
        ]
      },
      {
        id: 'adv-10',
        title: 'Repeating Numbers and Synchronicity',
        duration: '4 min',
        content: `Seeing repeating numbers is not coincidence - it's communication:

**Common Repeating Patterns:**
- 111: New beginnings, manifest thoughts
- 222: Balance, partnerships coming
- 333: Ascended masters supporting you
- 444: Angels protecting, keep going
- 555: Major change approaching
- 666: Balance material and spiritual
- 777: Spiritual breakthrough
- 888: Abundance incoming
- 999: Cycle completing

**Personal Number Appearances:**
Seeing your Life Path number repeatedly is confirmation you're on path.

**How to Use:**
Notice when they appear. What were you thinking? That's the message context.`,
        keyPoints: [
          'Repeating numbers are messages',
          'Each pattern has meaning',
          'Context of appearance matters',
          'Your Life Path appearing = confirmation'
        ]
      },
      {
        id: 'adv-11',
        title: 'Numerology and Major Life Events',
        duration: '4 min',
        content: `Timing major life events using numerology:

**Optimal Timing:**
- Marriage: Year 2, 6, or 9 (6 is ideal)
- Starting Business: Year 1 or 8
- Having Children: Year 3 or 6
- Moving: Year 5
- Career Change: Year 1 or 5
- Retirement: Year 7 or 9

**Challenging Years:**
- Year 4: Avoid major risks, focus on building
- Year 7: Introspection, not action
- Year 9: Endings, not beginnings

**Combining with Partner:**
For relationships, consider both people's cycles. Both in Year 2 or 6 is excellent for commitment.`,
        keyPoints: [
          'Match life events to cycle energy',
          'Some years favor specific activities',
          'Avoid certain actions in wrong years',
          'Partner cycles affect shared events'
        ]
      },
      {
        id: 'adv-12',
        title: 'Creating Complete Numerology Reports',
        duration: '4 min',
        content: `Professional numerology readings include:

**Core Profile:**
- Life Path Number
- Expression Number
- Soul Urge Number
- Personality Number
- Birthday Number

**Timing Analysis:**
- Current Personal Year
- Current Personal Month
- Pinnacle and Challenge period
- Upcoming transitions

**Karmic Analysis:**
- Karmic Debt Numbers (if any)
- Karmic Lessons (missing numbers)
- Past patterns and lessons

**Recommendations:**
- Best timing for goals
- Challenges to navigate
- Strengths to leverage

A complete report synthesizes all elements into actionable guidance.`,
        keyPoints: [
          'Complete reports include all core numbers',
          'Timing shows current and future cycles',
          'Karmic elements reveal deeper patterns',
          'Synthesize into practical guidance'
        ]
      },
      {
        id: 'adv-13',
        title: 'Integrating Numerology with Chinese Astrology',
        duration: '4 min',
        content: `GG33's power comes from combining both systems:

**Integration Points:**
- Life Path + Zodiac Animal = Complete personality
- Element + Numbers = Behavioral tendencies
- Personal Year + Chinese Year = Annual timing

**Example Analysis:**
Life Path 1 + Dragon = Doubly powerful leadership
Life Path 2 + Tiger = Internal conflict (peace vs action)
Life Path 8 + Monkey = Strategic brilliance

**Compatibility Enhancement:**
Use both systems for relationship analysis:
- Numerology shows communication style
- Chinese Astrology shows instinctual patterns
- Elements show emotional dynamics

**Predictive Power:**
Chinese calendar + Personal Year = Superior timing.`,
        keyPoints: [
          'Integration creates complete picture',
          'Each system reveals different layers',
          'Compatibility uses both systems',
          'Timing combines both calendars'
        ]
      },
      {
        id: 'adv-14',
        title: 'Practical Application: Daily Life',
        duration: '4 min',
        content: `Apply advanced numerology daily:

**Morning Check:**
- What is my Personal Day?
- How does it interact with Universal Day?
- What activities align?

**Decision Making:**
- Major decision? Check your cycle position
- Relationship question? Check compatibility
- Timing sensitive? Calculate optimal date

**Self-Development:**
- Working on karmic lessons consciously
- Developing master number potential
- Balancing missing number energies

**Tracking Progress:**
- Journal insights about number patterns
- Note synchronicities
- Review at year transitions

Daily practice develops intuitive numerology sense.`,
        keyPoints: [
          'Check daily numbers each morning',
          'Use cycles for decision timing',
          'Work consciously on karmic lessons',
          'Track patterns in a journal'
        ]
      },
      {
        id: 'adv-15',
        title: 'Becoming a GG33 Practitioner',
        duration: '4 min',
        content: `To master GG33 and guide others:

**Knowledge Requirements:**
- All core numerology calculations
- Chinese Zodiac animals and elements
- Compatibility analysis methods
- Timing and cycles

**Practice Requirements:**
- Calculate your own complete chart
- Practice reading for friends and family
- Track predictions and accuracy
- Continuous learning

**Ethical Guidelines:**
- Never use readings to manipulate
- Empower, don't create dependency
- Acknowledge limits of any system
- Refer to professionals when needed

**Your Journey:**
GG33 is a path of self-discovery first. Master yourself before guiding others.

Congratulations on completing Advanced Numerology!`,
        keyPoints: [
          'Master all calculations',
          'Practice reading for others',
          'Follow ethical guidelines',
          'Continue learning always'
        ]
      }
    ]
  }
];

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}

export function getLessonById(courseId: string, lessonId: string): Lesson | undefined {
  const course = getCourseById(courseId);
  return course?.lessons.find(l => l.id === lessonId);
}

export function getTotalLessons(): number {
  return courses.reduce((acc, course) => acc + course.lessons.length, 0);
}

export function getTotalDuration(): string {
  const totalMinutes = courses.reduce((acc, course) => {
    const minutes = parseInt(course.duration);
    return acc + (isNaN(minutes) ? 0 : minutes);
  }, 0);
  
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  }
  return `${totalMinutes} min`;
}
