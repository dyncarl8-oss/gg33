export interface LifePathContent {
  number: number;
  title: string;
  description: string;
  darkSide: string;
  lessonsToLearn: string;
  work: string;
  love: string;
  health: string;
  accomplishment: string;
}

export interface ExpressionContent {
  number: number;
  title: string;
  description: string;
  talents: string;
  challenges: string;
  career: string;
}

export interface SoulUrgeContent {
  number: number;
  title: string;
  description: string;
  innerDesires: string;
  fulfillment: string;
}

export interface PersonalityContent {
  number: number;
  title: string;
  description: string;
  firstImpression: string;
  socialStyle: string;
}

export interface AttitudeContent {
  number: number;
  title: string;
  description: string;
  harmoniousBehavior: string;
  darkSide: string;
}

export interface GenerationContent {
  number: number;
  title: string;
  description: string;
  collectiveEnergy: string;
}

export interface DayOfBirthContent {
  number: number;
  title: string;
  description: string;
  specialGifts: string;
}

export interface MaturityContent {
  number: number;
  title: string;
  description: string;
  laterLifeGoals: string;
}

export const lifePathContent: Record<number, LifePathContent> = {
  1: {
    number: 1,
    title: "The Pioneer",
    description: "Life Path 1 represents the energy of new beginnings, independence, and leadership. You are here to learn how to stand on your own two feet, trust your instincts, and forge your own path in life. As a natural-born leader, you possess an innate ability to initiate projects and inspire others to follow your vision. Your journey involves developing self-confidence, assertiveness, and the courage to be original. You are meant to be a trailblazer who introduces new ideas and methods to the world. Your individuality is your greatest asset, and your life's purpose is to express your unique identity while helping others find theirs.",
    darkSide: "When operating from a lower vibration, Life Path 1 can become domineering, aggressive, and overly self-centered. There's a tendency toward arrogance, stubbornness, and an unwillingness to accept help or advice from others. You may struggle with being too competitive, needing to win at all costs, or becoming a bully. Impatience and a quick temper can alienate those around you. The shadow side also includes fear of being dependent on others, which can lead to isolation and loneliness.",
    lessonsToLearn: "Your primary lessons involve learning to balance independence with cooperation, confidence with humility, and leadership with service. You must learn that true strength includes the ability to listen to others and consider different perspectives. Developing patience, especially with those who don't match your pace, is crucial. Learning to collaborate without losing your sense of self, and understanding that asking for help is not a sign of weakness, are key growth areas.",
    work: "Life Path 1s excel in positions of leadership and entrepreneurship. You thrive when you can work independently or lead a team toward a common goal. Careers that suit you include CEO, entrepreneur, inventor, military leader, politician, project manager, or any field requiring innovation and self-motivation. You perform best when given autonomy and the freedom to implement your ideas. Avoid roles that are too routine or where you must constantly defer to others.",
    love: "In relationships, you need a partner who respects your independence and supports your ambitions. You're attracted to confident individuals who have their own goals and don't try to control you. The ideal partner is someone who is strong enough to stand beside you as an equal. You show love through action and protection. Challenges arise when you become too focused on your own pursuits or try to dominate the relationship. Learning to share power and make space for your partner's needs is essential for lasting love.",
    health: "Life Path 1s tend to push themselves hard and may neglect self-care in pursuit of their goals. Stress-related conditions, headaches, and issues with the heart and blood pressure are common concerns. Physical activity is essential for your well-being, particularly competitive sports or solo activities like running or weightlifting. You need to guard against burnout by building regular rest into your schedule. Pay attention to your head, eyes, and adrenal system.",
    accomplishment: "Your ultimate accomplishment is achieving self-mastery and using your leadership abilities to make a positive impact on the world. Success comes when you learn to lead with wisdom rather than ego, inspiring others through your example rather than force. You are here to pioneer new paths, start important initiatives, and demonstrate that individuality and independence can coexist with meaningful connections to others."
  },
  2: {
    number: 2,
    title: "The Peacemaker",
    description: "Life Path 2 embodies the energy of cooperation, diplomacy, and sensitivity. You are here to master the art of relationships, learning to create harmony and balance in all areas of life. Your natural gifts include intuition, empathy, and the ability to see both sides of any situation. You are a natural mediator and peacemaker, skilled at bringing people together and resolving conflicts. Your sensitivity allows you to pick up on subtle energies that others miss. Partnership and collaboration are central to your life purpose, and you find your greatest fulfillment through meaningful connections with others.",
    darkSide: "The shadow side of Life Path 2 includes excessive passivity, codependency, and losing yourself in relationships. You may struggle with indecisiveness, fear of confrontation, and suppressing your own needs to keep the peace. There's a tendency toward manipulation through guilt or martyrdom. Hypersensitivity can make you easily hurt by criticism, leading to resentment that builds up over time. You may become clingy, possessive, or overly dependent on others for your sense of self-worth.",
    lessonsToLearn: "Your primary lessons involve developing self-confidence and learning to assert your own needs while maintaining harmony. You must learn that setting boundaries is not selfish but necessary for healthy relationships. Developing emotional resilience and not taking everything personally is crucial. Learning to make decisions without excessive deliberation and standing up for yourself without guilt are key growth areas. You're learning that true partnership includes honoring your own needs.",
    work: "Life Path 2s excel in supportive and collaborative roles. You thrive in positions that require diplomacy, mediation, or working closely with others. Careers that suit you include counselor, therapist, mediator, diplomat, human resources specialist, social worker, or any role in the helping professions. You also do well in the arts, particularly music, where your sensitivity can be expressed. Avoid highly competitive environments or roles that require constant self-promotion.",
    love: "In relationships, you seek deep emotional connection and genuine partnership. You're naturally devoted and attentive to your partner's needs, sometimes to a fault. The ideal relationship for you is one of true equality where both partners support each other's growth. You show love through acts of service, emotional availability, and creating a harmonious home. Challenges arise when you lose yourself in the relationship or fail to communicate your needs. Learning to maintain your identity while being a supportive partner is essential.",
    health: "Life Path 2s are particularly sensitive to their environment and the emotions of others, which can affect your physical health. You may experience issues with the nervous system, digestive problems from internalizing stress, or reproductive system concerns. Emotional well-being directly impacts your physical health. Gentle exercise like yoga, swimming, or tai chi suits you well. Creating a peaceful home environment and learning stress-management techniques are essential for your health.",
    accomplishment: "Your ultimate accomplishment is creating harmony and meaningful connections while maintaining your own sense of self. Success comes when you learn to be a true partner—supportive yet self-assured, diplomatic yet honest about your needs. You are here to demonstrate that sensitivity is strength and that the world needs peacemakers who can bridge differences and bring people together."
  },
  3: {
    number: 3,
    title: "The Communicator",
    description: "Life Path 3 carries the vibration of creativity, self-expression, and joy. You are here to learn to express yourself authentically and inspire others through your creative gifts. Natural talents include communication, artistic ability, and an infectious enthusiasm for life. You have a gift for words, whether spoken or written, and often possess multiple creative talents. Your optimism and humor brighten any room you enter. Joy and self-expression are central to your life purpose, and you're meant to share your creative gifts with the world while uplifting others.",
    darkSide: "The shadow side of Life Path 3 includes superficiality, scattered energy, and avoiding emotional depth. You may struggle with following through on projects, preferring the excitement of starting over the discipline of finishing. There's a tendency toward escapism through pleasure-seeking, gossip, or excessive talking without meaningful content. You may use humor to deflect serious situations or hide your insecurities. Mood swings and dramatic emotional expressions can strain relationships.",
    lessonsToLearn: "Your primary lessons involve learning to channel your creative energy into focused expression. You must learn discipline and follow-through, completing what you start rather than jumping to new projects. Developing emotional depth and authenticity in your relationships is crucial. Learning to handle criticism constructively and not take yourself too seriously are key growth areas. You're learning that true joy comes from meaningful creation, not superficial pleasures.",
    work: "Life Path 3s excel in creative and communicative fields. You thrive in positions that allow self-expression and interaction with others. Careers that suit you include writer, artist, actor, musician, public speaker, marketing professional, teacher, or entertainer. You also do well in social media, journalism, or any field requiring creativity and charm. Avoid monotonous work or environments that stifle your creative expression.",
    love: "In relationships, you bring fun, creativity, and abundant affection. You need a partner who appreciates your playful spirit and supports your creative endeavors. The ideal relationship is one filled with laughter, communication, and shared adventures. You show love through words of affirmation, creative gestures, and quality time. Challenges arise when you avoid serious conversations or let your social life take priority over your relationship. Learning to go deeper emotionally while maintaining joy is essential.",
    health: "Life Path 3s need to pay attention to their throat, vocal cords, and communication-related areas. Scattered energy can lead to nervous system issues or exhaustion from overextending socially. You may be prone to mood fluctuations that affect your physical health. Creative expression is therapeutic for you—suppressing it can lead to depression. Regular exercise helps channel excess energy, and you benefit from activities that are fun and social rather than routine.",
    accomplishment: "Your ultimate accomplishment is mastering authentic self-expression and using your creativity to inspire joy in others. Success comes when you learn to channel your talents into meaningful work that uplifts humanity. You are here to demonstrate that creativity and joy are not frivolous but essential to human flourishing, and that words and art have the power to heal and transform."
  },
  4: {
    number: 4,
    title: "The Builder",
    description: "Life Path 4 represents the energy of structure, stability, and hard work. You are here to build lasting foundations—whether in your career, relationships, or for society. Your natural gifts include practicality, reliability, and an exceptional work ethic. You have the patience and determination to turn dreams into reality through persistent effort. Order and organization bring you comfort, and you excel at creating systems that stand the test of time. Security and stability are central to your life purpose, and you're meant to demonstrate that success comes through dedication and integrity.",
    darkSide: "The shadow side of Life Path 4 includes rigidity, stubbornness, and resistance to change. You may become so focused on work that you neglect relationships, health, and fun. There's a tendency toward pessimism, seeing only limitations rather than possibilities. You may struggle with perfectionism, becoming critical of yourself and others who don't meet your high standards. Fear of change can keep you trapped in unsatisfying situations, and you may become narrow-minded or judgmental.",
    lessonsToLearn: "Your primary lessons involve learning to balance work with rest and structure with flexibility. You must learn that life requires adaptability and that change, while uncomfortable, is necessary for growth. Developing trust in the process of life and letting go of the need to control every detail is crucial. Learning to see the bigger picture and allow for spontaneity are key growth areas. You're learning that true security comes from within, not from external circumstances.",
    work: "Life Path 4s excel in structured environments requiring attention to detail and perseverance. You thrive in positions that involve building, organizing, or systematizing. Careers that suit you include engineer, architect, accountant, project manager, administrator, craftsperson, or any field requiring precision and reliability. You also do well in law enforcement, military, or banking. Avoid chaotic environments or roles that require constant improvisation.",
    love: "In relationships, you offer stability, loyalty, and unwavering commitment. You need a partner who appreciates your reliability and shares your values around security and family. The ideal relationship is built on trust, shared goals, and practical partnership. You show love through providing, protecting, and being there consistently. Challenges arise when you become too focused on work or try to control the relationship. Learning to be more spontaneous and emotionally expressive is essential.",
    health: "Life Path 4s tend to hold tension in their bodies, particularly in the bones, joints, and structural systems. You may be prone to issues with the back, knees, or teeth. Overwork can lead to chronic fatigue or stress-related conditions. You benefit from consistent exercise routines and structured health practices. Pay attention to your elimination systems and ensure you're getting adequate rest. Regular, measured physical activity like hiking, strength training, or swimming suits you well.",
    accomplishment: "Your ultimate accomplishment is building something of lasting value that serves others and stands the test of time. Success comes when you learn to balance your tremendous work capacity with the ability to enjoy the fruits of your labor. You are here to demonstrate that patience, persistence, and integrity are the foundations of all lasting achievement."
  },
  5: {
    number: 5,
    title: "The Freedom Seeker",
    description: "Life Path 5 embodies the energy of freedom, adventure, and change. You are here to experience life fully through your senses and to embrace change as the constant of existence. Your natural gifts include adaptability, versatility, and an insatiable curiosity about life. You're drawn to travel, variety, and new experiences. Communication and quick thinking come naturally to you. Freedom and experience are central to your life purpose, and you're meant to demonstrate that growth comes through embracing change and expanding horizons.",
    darkSide: "The shadow side of Life Path 5 includes excess, irresponsibility, and an inability to commit. You may struggle with addiction, whether to substances, sensations, or constant change. There's a tendency toward restlessness that prevents you from building anything lasting. You may become scattered, unreliable, or perpetually dissatisfied. Fear of commitment can sabotage relationships and career advancement. Using freedom as an excuse to avoid responsibility is a common trap.",
    lessonsToLearn: "Your primary lessons involve learning to find freedom within commitment and variety within stability. You must learn that true freedom comes from self-discipline, not from avoiding all constraints. Developing focus and the ability to see things through, even when they become routine, is crucial. Learning that depth of experience can be as valuable as breadth is a key growth area. You're learning to distinguish between healthy change and escapism.",
    work: "Life Path 5s excel in dynamic environments requiring adaptability and communication. You thrive in positions that involve variety, travel, or connecting with many different people. Careers that suit you include sales, marketing, travel industry, journalism, public relations, promoter, or any field requiring versatility and quick thinking. You also do well as entrepreneurs or in any role that offers freedom and variety. Avoid routine desk jobs or highly structured environments.",
    love: "In relationships, you bring excitement, spontaneity, and a sense of adventure. You need a partner who gives you space and shares your love of new experiences. The ideal relationship is one that feels like a partnership in adventure rather than a constraint. You show love through creating exciting experiences together and keeping things fresh. Challenges arise when you become restless or feel trapped. Learning to find adventure within commitment and to be present with your partner is essential.",
    health: "Life Path 5s need to be careful about excess and overindulgence. You may be prone to issues with the five senses, the nervous system, or conditions related to lifestyle choices. Moderation is your health key—you tend to push limits in ways that can affect your wellbeing. Regular exercise helps channel your restless energy, and variety in your fitness routine keeps you engaged. Pay attention to your lungs, liver, and sensory organs.",
    accomplishment: "Your ultimate accomplishment is mastering the art of constructive change and using your experiences to grow in wisdom. Success comes when you learn to channel your love of freedom into purposeful exploration that benefits yourself and others. You are here to demonstrate that life is meant to be lived fully and that embracing change with wisdom leads to true liberation."
  },
  6: {
    number: 6,
    title: "The Nurturer",
    description: "Life Path 6 carries the vibration of responsibility, love, and service. You are here to learn about unconditional love, family, and community. Your natural gifts include nurturing, healing, and creating beauty and harmony. You have a deep sense of responsibility toward those you love and often take on the role of caretaker. Home and family are central to your identity. Love and service are your life purpose, and you're meant to demonstrate the power of caring for others while maintaining healthy boundaries.",
    darkSide: "The shadow side of Life Path 6 includes martyrdom, meddling, and codependency. You may become so focused on helping others that you neglect yourself or become controlling under the guise of caring. There's a tendency toward perfectionism, especially regarding home and family, that can create unrealistic expectations. You may struggle with anxiety when things aren't harmonious or become self-righteous about your way of doing things. Guilt and over-responsibility can be paralyzing.",
    lessonsToLearn: "Your primary lessons involve learning to help others without enabling them and to love without conditions or control. You must learn that you cannot fix everyone and that sometimes the most loving act is to let others learn their own lessons. Developing healthy boundaries while maintaining an open heart is crucial. Learning to accept imperfection in yourself and others is a key growth area. You're learning that true service includes self-care.",
    work: "Life Path 6s excel in caring and service-oriented professions. You thrive in positions that allow you to help, heal, or create beauty. Careers that suit you include healthcare professional, teacher, counselor, interior designer, chef, social worker, or any role in the service industry. You also do well in fields related to home, family, or community. Avoid purely competitive environments or roles that feel soulless.",
    love: "In relationships, you are devoted, nurturing, and committed to creating a beautiful life together. You need a partner who appreciates your caring nature and reciprocates your devotion. The ideal relationship is one built on mutual respect, shared domestic values, and deep emotional connection. You show love through caring actions, creating a comfortable home, and being there through thick and thin. Challenges arise when you become controlling or sacrifice too much of yourself. Learning to receive as well as give is essential.",
    health: "Life Path 6s tend to carry the weight of others' problems, which can affect your health. You may be prone to issues with the heart, circulation, or reproductive system. Worry and anxiety can manifest as physical symptoms. You benefit from activities that help you relax and release responsibility, such as gardening, cooking, or artistic pursuits. Pay attention to your chest, breasts, and digestive system. Learning to set boundaries is directly related to your physical health.",
    accomplishment: "Your ultimate accomplishment is creating a life filled with love, beauty, and meaningful service while maintaining your own wellbeing. Success comes when you learn to care for others from a place of fullness rather than obligation. You are here to demonstrate that love in action—through family, community, and service—is the highest expression of human potential."
  },
  7: {
    number: 7,
    title: "The Seeker",
    description: "Life Path 7 represents the energy of wisdom, introspection, and spiritual seeking. You are here to discover the deeper truths of existence and develop your inner wisdom. Your natural gifts include analytical thinking, intuition, and the ability to see beyond surface appearances. You're drawn to mystery, research, and understanding how things work at a fundamental level. Truth and wisdom are central to your life purpose, and you're meant to demonstrate that there is more to life than the material world.",
    darkSide: "The shadow side of Life Path 7 includes isolation, cynicism, and intellectual arrogance. You may become so absorbed in your inner world that you disconnect from others and reality. There's a tendency toward paranoia, suspicion, or feeling misunderstood. You may use intellectualism to avoid emotional intimacy or become cold and aloof. Perfectionism in your search for truth can lead to paralysis. Secret addictions or escapism may develop as coping mechanisms.",
    lessonsToLearn: "Your primary lessons involve learning to balance the inner and outer worlds and to trust as well as analyze. You must learn that knowledge without application is incomplete and that wisdom includes emotional intelligence. Developing faith in life's process while maintaining healthy skepticism is crucial. Learning to share your insights with others and to be present in your body are key growth areas. You're learning that connection to others is part of spiritual growth.",
    work: "Life Path 7s excel in fields requiring research, analysis, and deep thinking. You thrive in positions that allow solitude and mental exploration. Careers that suit you include scientist, researcher, analyst, philosopher, writer, psychologist, or any specialized technical field. You also do well in spiritual teaching, alternative healing, or investigative work. Avoid superficial work environments or positions requiring constant social interaction.",
    love: "In relationships, you offer depth, loyalty, and a unique perspective on life. You need a partner who respects your need for solitude and shares your interest in meaningful conversation. The ideal relationship is one where both partners have their own inner lives while sharing a deep mental and spiritual connection. You show love through understanding, respecting boundaries, and sharing your insights. Challenges arise when you become too withdrawn or analytical about emotions. Learning to be emotionally present and vulnerable is essential.",
    health: "Life Path 7s need to pay attention to their nervous system, skin, and digestive system. You may be sensitive to your environment and prone to conditions related to stress or overthinking. Meditation, nature, and solitude are therapeutic for you. You benefit from spiritual practices that quiet the mind. Pay attention to your pineal gland, spine, and neural pathways. Ensuring adequate sleep and managing anxiety are important for your wellbeing.",
    accomplishment: "Your ultimate accomplishment is attaining genuine wisdom and using it to enlighten yourself and others. Success comes when you learn to share your insights in accessible ways and to trust life's mysteries. You are here to demonstrate that the search for truth is one of humanity's highest callings and that inner peace comes from understanding rather than controlling."
  },
  8: {
    number: 8,
    title: "The Powerhouse",
    description: "Life Path 8 embodies the energy of power, abundance, and achievement. You are here to master the material world and learn to wield power responsibly. Your natural gifts include business acumen, organizational ability, and the drive to succeed. You understand how things work in the physical world and have the ambition to achieve significant goals. Power and abundance are central to your life purpose, and you're meant to demonstrate that material success and spiritual integrity can coexist.",
    darkSide: "The shadow side of Life Path 8 includes greed, authoritarianism, and workaholism. You may become so focused on success that you sacrifice relationships, health, and ethics. There's a tendency toward materialism, measuring worth only in financial terms. You may struggle with power dynamics, becoming either domineering or, paradoxically, afraid of your own power. Ruthlessness in pursuit of goals can alienate others. Financial extremes—either feast or famine—may mark your life until lessons are learned.",
    lessonsToLearn: "Your primary lessons involve learning to balance material success with spiritual values and to use power for the greater good. You must learn that true abundance includes more than money and that power without wisdom is destructive. Developing generosity and understanding that giving and receiving are interconnected is crucial. Learning to value people over achievements and to handle both success and failure with grace are key growth areas.",
    work: "Life Path 8s excel in positions of authority and business leadership. You thrive in environments where you can organize, manage, and achieve tangible results. Careers that suit you include executive, entrepreneur, banker, real estate developer, lawyer, or any position in management and finance. You also do well in politics, athletics, or any competitive field. Avoid positions with no growth potential or where you have no authority.",
    love: "In relationships, you are generous, protective, and committed to building a secure life together. You need a partner who respects your ambition and contributes to your shared vision of success. The ideal relationship is one where both partners are equals, combining their strengths to create abundance together. You show love through providing, achieving, and creating security. Challenges arise when work takes priority over relationship or when power struggles emerge. Learning to be vulnerable and prioritize connection over achievement is essential.",
    health: "Life Path 8s may experience issues related to stress, blood pressure, and the cardiovascular system. Workaholism can lead to burnout, and the pressure you put on yourself affects your body. You may be prone to conditions affecting the bones, teeth, and structural systems. Regular exercise, particularly strength training, suits you well. Pay attention to your heart, circulation, and stress levels. Finding balance between work and relaxation is crucial for your long-term health.",
    accomplishment: "Your ultimate accomplishment is achieving material success while maintaining integrity and using your power to benefit others. Success comes when you learn that true wealth includes health, relationships, and peace of mind. You are here to demonstrate that abundance is our birthright when we align our ambitions with the greater good."
  },
  9: {
    number: 9,
    title: "The Humanitarian",
    description: "Life Path 9 carries the vibration of completion, compassion, and universal love. You are here to develop selfless service and to see yourself as a citizen of the world. Your natural gifts include wisdom, compassion, and the ability to see the big picture. You've lived many lifetimes and carry the wisdom of the ages. You're drawn to causes greater than yourself and have a natural understanding of human nature. Compassion and service are central to your life purpose, and you're meant to demonstrate that giving is receiving.",
    darkSide: "The shadow side of Life Path 9 includes martyrdom, resentment, and living in the past. You may become so focused on others that you neglect your own needs, leading to burnout and bitterness. There's a tendency toward self-righteousness or feeling superior to those less evolved. You may struggle with letting go—of people, situations, or grievances. Emotional manipulation through guilt or playing the victim can be issues. Avoiding personal responsibility by focusing on saving the world is a common trap.",
    lessonsToLearn: "Your primary lessons involve learning to give without expectation and to let go with grace. You must learn that you cannot save everyone and that sometimes the lesson is in the losing. Developing healthy boundaries while maintaining an open heart is crucial. Learning to receive as well as give and to focus on your own growth while serving others are key areas. You're learning that endings are as natural as beginnings.",
    work: "Life Path 9s excel in humanitarian and creative fields. You thrive in positions that allow you to make a positive difference in the world. Careers that suit you include philanthropist, counselor, teacher, artist, healer, diplomat, or any role in humanitarian organizations. You also do well in the arts, publishing, or any field with a global reach. Avoid petty work environments or purely profit-driven positions.",
    love: "In relationships, you bring wisdom, compassion, and a broad perspective on life. You need a partner who shares your values and supports your humanitarian interests. The ideal relationship is one where both partners are committed to growth and service, seeing their union as a way to do more good together. You show love through understanding, forgiveness, and supporting your partner's highest potential. Challenges arise when you sacrifice yourself completely or hold onto past hurts. Learning to receive love and to be fully present in the relationship is essential.",
    health: "Life Path 9s may experience issues related to the immune system, nervous system, or conditions involving overall vitality. Carrying the weight of the world can affect your health. You may be prone to anxiety, depression, or conditions related to suppressed emotions. Creative expression and meaningful work are therapeutic for you. Pay attention to your blood, lymphatic system, and overall energy levels. Regular rest and learning to let go of what you cannot control are essential.",
    accomplishment: "Your ultimate accomplishment is achieving wisdom through experience and using your understanding to serve humanity. Success comes when you learn that letting go is as important as holding on and that your service to others is also your personal salvation. You are here to demonstrate that we are all one and that love is the ultimate truth."
  },
  11: {
    number: 11,
    title: "The Illuminator",
    description: "Life Path 11 is a Master Number carrying the amplified vibration of intuition, spiritual insight, and inspiration. You are here to channel higher wisdom and illuminate the path for others. Your natural gifts include heightened intuition, visionary thinking, and the ability to inspire masses. You exist as a bridge between the physical and spiritual worlds. Spiritual teaching and inspiration are central to your life purpose, and you're meant to demonstrate that higher consciousness can be grounded in practical reality.",
    darkSide: "The shadow side of Life Path 11 includes nervous tension, self-doubt, and impracticality. The intensity of your vibration can lead to anxiety, phobias, or feeling overwhelmed by your own sensitivity. There's a tendency toward delusion, impracticality, or becoming lost in fantasy. You may struggle with grounding your visions in reality or fear your own power. Extreme highs and lows, and difficulty functioning in the mundane world, can be challenges.",
    lessonsToLearn: "Your primary lessons involve learning to ground your spiritual gifts in practical reality and to trust your intuition while maintaining discernment. You must learn to manage your sensitivity without becoming overwhelmed or shutting down. Developing patience with the pace of physical reality and finding practical outlets for your inspiration are crucial. You're learning that being a spiritual messenger requires being fully human first.",
    work: "Life Path 11s excel in inspirational and spiritual fields. You thrive in positions that allow you to channel insights and inspire others. Careers that suit you include spiritual teacher, counselor, artist, musician, inventor, or any role involving inspiration and enlightenment. You also do well in media, lighting design, or any field where you can illuminate. Avoid harsh, materialistic environments or positions without meaning.",
    love: "In relationships, you bring inspiration, deep understanding, and a spiritual connection. You need a partner who appreciates your sensitivity and supports your spiritual journey. The ideal relationship is one of soul connection where both partners grow spiritually together. You show love through inspiration, intuition, and deep emotional presence. Challenges arise when you become too sensitive or retreat into fantasy. Learning to be present and grounded while maintaining your spiritual connection is essential.",
    health: "Life Path 11s have highly sensitive nervous systems that require extra care. You may be prone to anxiety, nervous disorders, or conditions related to electrical sensitivity. The intensity of your vibration can lead to exhaustion if not managed properly. You benefit greatly from meditation, nature, and spiritual practices. Pay attention to your nervous system, eyes, and energy field. Grounding practices and regular rest are essential for your wellbeing.",
    accomplishment: "Your ultimate accomplishment is mastering your gifts and becoming a clear channel for higher wisdom. Success comes when you learn to live your vision while staying grounded in reality. You are here to demonstrate that spiritual illumination is possible for all and that the light you carry can inspire others to find their own."
  },
  22: {
    number: 22,
    title: "The Master Builder",
    description: "Life Path 22 is a Master Number carrying the amplified vibration of practical idealism and building dreams into reality. You are here to leave a lasting legacy through monumental achievements that benefit humanity. Your natural gifts include visionary thinking combined with practical ability, leadership on a grand scale, and the power to manifest your dreams. You have the potential to achieve more than most. Master building and lasting achievement are central to your life purpose, and you're meant to demonstrate that big dreams can become reality.",
    darkSide: "The shadow side of Life Path 22 includes enormous pressure, workaholism, and potential for spectacular failure. The weight of your potential can be crushing, leading to anxiety or paralysis. There's a tendency toward becoming overwhelmed by the scope of your vision or burning out from trying to do too much. You may struggle with perfectionism, control issues, or imposing your vision on others. The higher the potential, the greater the fall when lessons are not learned.",
    lessonsToLearn: "Your primary lessons involve learning to pace yourself and work with others to achieve your vision. You must learn that even monumental achievements happen one step at a time. Developing patience, delegation skills, and trust in your team is crucial. Learning to balance your grand vision with practical steps and to take care of yourself along the way are key growth areas. You're learning that the process is as important as the outcome.",
    work: "Life Path 22s excel in positions requiring large-scale vision and practical implementation. You thrive in roles that allow you to build something of lasting significance. Careers that suit you include architect, diplomat, international business leader, political leader, or any role involving large-scale organization and achievement. You also do well as an entrepreneur, director, or in positions where you can shape major outcomes. Avoid small-minded environments or positions without impact.",
    love: "In relationships, you bring vision, commitment, and the desire to build something meaningful together. You need a partner who can stand beside you as an equal in your grand endeavors. The ideal relationship is one where both partners are committed to achieving something significant together. You show love through inclusion in your vision, providing abundantly, and building a life together. Challenges arise when work consumes everything or when you become too controlling. Learning to be present and to value the relationship as much as the achievements is essential.",
    health: "Life Path 22s may experience issues related to chronic stress, the nervous system, and structural problems. The pressure you put on yourself can lead to serious health consequences if not managed. You may be prone to conditions affecting the spine, bones, and circulatory system. Regular exercise, adequate rest, and stress management are crucial. Pay attention to your skeletal system, heart, and overall stress levels. Building sustainable work habits is essential for long-term health.",
    accomplishment: "Your ultimate accomplishment is manifesting a vision that transforms the world while maintaining your humanity. Success comes when you learn that your greatest achievement is not what you build but who you become in the process. You are here to demonstrate that with discipline, vision, and persistence, dreams of any scale can become reality."
  },
  33: {
    number: 33,
    title: "The Master Teacher",
    description: "Life Path 33 is the highest Master Number, carrying the amplified vibration of compassionate teaching and selfless service. You are here to uplift humanity through love, teaching, and healing. Your natural gifts include profound compassion, healing abilities, and the power to inspire through example. You embody the highest potential of love in action. Selfless service and spiritual teaching are central to your life purpose, and you're meant to demonstrate that love is the most powerful force in the universe.",
    darkSide: "The shadow side of Life Path 33 includes martyrdom, messiah complex, and burnout from over-giving. You may sacrifice yourself completely, leading to resentment or collapse. There's a tendency toward taking on others' pain or believing you must save everyone. You may struggle with boundaries, feeling guilty when you can't help, or becoming self-righteous about your service. The weight of this number can lead to depression if its energy is not properly channeled.",
    lessonsToLearn: "Your primary lessons involve learning to serve from a place of fullness and to love without losing yourself. You must learn that you cannot help others from an empty vessel and that self-care is not selfish. Developing healthy boundaries while maintaining your open heart is crucial. Learning to empower others rather than creating dependence and to accept your humanity while holding your spiritual vision are key growth areas. You're learning that the greatest teaching is example.",
    work: "Life Path 33s excel in healing, teaching, and service professions at the highest level. You thrive in positions that allow you to touch many lives with your compassion. Careers that suit you include spiritual leader, healer, counselor, teacher of teachers, or any role involving healing and uplifting humanity. You also do well in philanthropic leadership, humanitarian organizations, or any position where you can serve on a large scale. Avoid self-serving or superficial environments.",
    love: "In relationships, you bring unconditional love, profound understanding, and spiritual depth. You need a partner who can receive your love and support your mission. The ideal relationship is one of deep spiritual partnership where both partners are committed to serving love together. You show love through complete acceptance, healing presence, and selfless giving. Challenges arise when you give too much or expect spiritual perfection. Learning to receive love and accept imperfection in yourself and your partner is essential.",
    health: "Life Path 33s must be particularly careful about energy depletion and taking on others' pain. You may be prone to conditions related to the heart, immune system, or chronic fatigue. Your sensitivity to others can affect you physically. You benefit greatly from healing practices, nature, and spiritual sustenance. Pay attention to your heart, blood, and energy field. Regular practices to clear and restore your energy are essential for your wellbeing.",
    accomplishment: "Your ultimate accomplishment is becoming a pure channel for divine love and using that love to heal and teach. Success comes when you learn to love fully while maintaining your own wholeness. You are here to demonstrate that selfless love is the highest achievement and that one person's heart opened fully can transform the world."
  }
};

export const expressionContent: Record<number, ExpressionContent> = {
  1: {
    number: 1,
    title: "The Leader",
    description: "Expression Number 1 reveals that you are meant to express yourself as a leader and pioneer. Your name carries the vibration of independence, originality, and self-reliance. You have natural talents for innovation, starting new ventures, and inspiring others to action. Your destiny is to express your unique individuality and to lead by example. You're here to show the world how to be courageously authentic.",
    talents: "Your core talents include innovative thinking, self-motivation, courage, determination, and the ability to work independently. You have a natural gift for seeing new possibilities and the drive to make them reality. Leadership comes naturally to you, as does the ability to remain focused on your goals despite obstacles.",
    challenges: "Your challenges include learning to collaborate without losing your sense of self, developing patience with those who don't share your pace, and balancing confidence with humility. You may struggle with accepting help or considering others' perspectives.",
    career: "Ideal careers include entrepreneur, CEO, inventor, military leader, political figure, project manager, athlete, or any field where you can pioneer and lead."
  },
  2: {
    number: 2,
    title: "The Diplomat",
    description: "Expression Number 2 reveals that you are meant to express yourself through cooperation, diplomacy, and partnership. Your name carries the vibration of harmony, sensitivity, and relationship. You have natural talents for mediation, emotional intelligence, and bringing people together. Your destiny is to be a peacemaker who helps others find common ground.",
    talents: "Your core talents include intuition, diplomacy, patience, cooperation, and emotional sensitivity. You have a natural gift for understanding others' feelings and creating harmony in groups. Partnership and collaboration come naturally to you.",
    challenges: "Your challenges include developing assertiveness, making decisions confidently, setting healthy boundaries, and not losing yourself in relationships. You may struggle with indecisiveness or excessive sensitivity to criticism.",
    career: "Ideal careers include diplomat, counselor, mediator, therapist, human resources, social worker, musician, or any field requiring tact and cooperation."
  },
  3: {
    number: 3,
    title: "The Artist",
    description: "Expression Number 3 reveals that you are meant to express yourself through creativity, communication, and joy. Your name carries the vibration of self-expression, enthusiasm, and artistic ability. You have natural talents for words, arts, and inspiring others with your optimism. Your destiny is to create and communicate in ways that uplift humanity.",
    talents: "Your core talents include creativity, communication, optimism, imagination, and social charm. You have a natural gift for expressing ideas in engaging ways and bringing joy to others. Multiple artistic talents often mark your expression.",
    challenges: "Your challenges include developing discipline and focus, following through on projects, going deeper emotionally, and not scattering your energy. You may struggle with superficiality or avoiding serious matters.",
    career: "Ideal careers include writer, artist, actor, musician, speaker, teacher, marketing professional, entertainer, or any field involving creative expression."
  },
  4: {
    number: 4,
    title: "The Organizer",
    description: "Expression Number 4 reveals that you are meant to express yourself through structure, stability, and practical achievement. Your name carries the vibration of order, reliability, and hard work. You have natural talents for organization, building systems, and turning ideas into tangible reality. Your destiny is to create lasting foundations.",
    talents: "Your core talents include organization, determination, practicality, loyalty, and attention to detail. You have a natural gift for creating order out of chaos and building things that last. Reliability and consistency mark your expression.",
    challenges: "Your challenges include developing flexibility, embracing change, not overworking, and seeing beyond limitations. You may struggle with rigidity or becoming too focused on work at the expense of other life areas.",
    career: "Ideal careers include engineer, architect, accountant, project manager, contractor, administrator, or any field requiring methodical work and precision."
  },
  5: {
    number: 5,
    title: "The Communicator",
    description: "Expression Number 5 reveals that you are meant to express yourself through freedom, versatility, and progressive thinking. Your name carries the vibration of change, adventure, and sensory experience. You have natural talents for communication, adaptability, and promoting new ideas. Your destiny is to be an agent of constructive change.",
    talents: "Your core talents include versatility, quick thinking, communication, adaptability, and resourcefulness. You have a natural gift for navigating change and helping others embrace new perspectives. Multiple languages or communication skills often mark your expression.",
    challenges: "Your challenges include developing commitment, finding focus, moderating excesses, and building lasting structures. You may struggle with restlessness or avoiding responsibilities.",
    career: "Ideal careers include sales, marketing, travel industry, journalism, public relations, promoter, or any field requiring adaptability and communication."
  },
  6: {
    number: 6,
    title: "The Nurturer",
    description: "Expression Number 6 reveals that you are meant to express yourself through service, responsibility, and nurturing. Your name carries the vibration of love, family, and community. You have natural talents for caregiving, creating beauty, and bringing harmony to your environment. Your destiny is to serve love through responsible action.",
    talents: "Your core talents include nurturing, responsibility, artistic sense, counseling ability, and creating harmony. You have a natural gift for taking care of others and making environments more beautiful. Domestic arts and healing often mark your expression.",
    challenges: "Your challenges include setting healthy boundaries, not meddling, avoiding martyrdom, and receiving as well as giving. You may struggle with codependency or excessive worry about loved ones.",
    career: "Ideal careers include healthcare, teaching, counseling, interior design, culinary arts, social work, or any field involving service and nurturing."
  },
  7: {
    number: 7,
    title: "The Analyst",
    description: "Expression Number 7 reveals that you are meant to express yourself through wisdom, analysis, and spiritual seeking. Your name carries the vibration of introspection, research, and truth-seeking. You have natural talents for deep thinking, intuition, and uncovering hidden knowledge. Your destiny is to seek truth and share wisdom.",
    talents: "Your core talents include analytical thinking, intuition, research ability, technical skill, and spiritual awareness. You have a natural gift for understanding complex subjects and seeing beyond appearances. Specialization and expertise often mark your expression.",
    challenges: "Your challenges include connecting with others, trusting feelings as well as logic, sharing your insights, and being present in your body. You may struggle with isolation or excessive skepticism.",
    career: "Ideal careers include scientist, researcher, analyst, philosopher, psychologist, technical specialist, or any field requiring deep investigation."
  },
  8: {
    number: 8,
    title: "The Executive",
    description: "Expression Number 8 reveals that you are meant to express yourself through power, abundance, and material achievement. Your name carries the vibration of authority, business acumen, and manifestation. You have natural talents for organizing large endeavors, managing resources, and achieving tangible success. Your destiny is to master the material world responsibly.",
    talents: "Your core talents include business sense, leadership, organization, judgment, and the ability to achieve. You have a natural gift for managing resources and building enterprises. Executive ability and financial acumen often mark your expression.",
    challenges: "Your challenges include balancing material and spiritual pursuits, using power ethically, and valuing people over achievements. You may struggle with workaholism or defining yourself through success.",
    career: "Ideal careers include executive, entrepreneur, banker, real estate, lawyer, athletic coach, or any field involving management and achievement."
  },
  9: {
    number: 9,
    title: "The Humanitarian",
    description: "Expression Number 9 reveals that you are meant to express yourself through compassion, wisdom, and universal service. Your name carries the vibration of selflessness, broad perspective, and completion. You have natural talents for understanding human nature, creative arts, and inspiring others toward higher ideals. Your destiny is to serve humanity's evolution.",
    talents: "Your core talents include wisdom, compassion, artistic ability, broad vision, and charisma. You have a natural gift for touching many lives and seeing the bigger picture. Multitalented expression and universal appeal often mark your destiny.",
    challenges: "Your challenges include letting go, focusing on your own needs, avoiding martyrdom, and living in the present. You may struggle with holding onto past hurts or being too idealistic.",
    career: "Ideal careers include humanitarian work, arts, counseling, teaching, philanthropy, or any field with global reach and service orientation."
  },
  11: {
    number: 11,
    title: "The Inspirer",
    description: "Expression Number 11 is a Master Number revealing that you are meant to express yourself through inspiration, intuition, and spiritual illumination. Your name carries a heightened vibration of vision, sensitivity, and the ability to channel higher wisdom. Your destiny is to inspire and illuminate the path for others.",
    talents: "Your core talents include intuition, inspiration, visionary thinking, artistic sensitivity, and the ability to uplift. You have a natural gift for channeling higher insights and inspiring others. Psychic ability and creative genius often mark your expression.",
    challenges: "Your challenges include managing nervous energy, staying grounded, not becoming overwhelmed, and translating visions into reality. You may struggle with anxiety or impracticality.",
    career: "Ideal careers include spiritual teacher, inspirational speaker, artist, inventor, counselor, or any field where you can inspire and illuminate."
  },
  22: {
    number: 22,
    title: "The Master Builder",
    description: "Expression Number 22 is a Master Number revealing that you are meant to express yourself through large-scale achievement and practical idealism. Your name carries the vibration of mastery, organizational genius, and the ability to turn dreams into lasting reality. Your destiny is to build something of enduring significance.",
    talents: "Your core talents include vision, practical ability, leadership on a large scale, organizational genius, and manifestation power. You have a natural gift for achieving the seemingly impossible. Monumental accomplishments often mark your expression.",
    challenges: "Your challenges include managing pressure, not becoming overwhelmed, working with others, and maintaining balance. You may struggle with the weight of your potential or workaholism.",
    career: "Ideal careers include architect, diplomat, international leader, large-scale entrepreneur, or any field requiring massive vision and practical execution."
  },
  33: {
    number: 33,
    title: "The Master Teacher",
    description: "Expression Number 33 is the highest Master Number, revealing that you are meant to express yourself through compassionate teaching and healing. Your name carries the vibration of the master healer, selfless service, and unconditional love. Your destiny is to teach love by embodying it.",
    talents: "Your core talents include healing presence, teaching ability, profound compassion, creative expression, and the ability to touch hearts. You have a natural gift for uplifting humanity through your very being. Healing and transformational work often mark your expression.",
    challenges: "Your challenges include maintaining boundaries, not sacrificing yourself, staying grounded, and accepting your humanity. You may struggle with burnout or the weight of others' pain.",
    career: "Ideal careers include spiritual leader, healer, humanitarian leader, counselor, teacher of teachers, or any field involving healing and serving on a large scale."
  }
};

export const soulUrgeContent: Record<number, SoulUrgeContent> = {
  1: {
    number: 1,
    title: "The Independent",
    description: "Soul Urge 1 reveals that at your core, you deeply desire independence, achievement, and being number one. Your heart yearns to stand on your own, to be recognized for your unique contributions, and to lead rather than follow. You feel most alive when you're pioneering something new, when you can express your individuality, and when you're in control of your own destiny. This inner drive toward self-determination is the fire that fuels your soul.",
    innerDesires: "Your deepest desires include being recognized as an individual, achieving personal goals, leading others, starting new ventures, and expressing your originality. You long to be first, to be innovative, and to make your unique mark on the world.",
    fulfillment: "You find soul satisfaction through personal achievement, independence, original creation, and being recognized for your unique contributions. Success on your own terms and the freedom to chart your own course bring you deep joy."
  },
  2: {
    number: 2,
    title: "The Partner",
    description: "Soul Urge 2 reveals that at your core, you deeply desire harmony, partnership, and emotional connection. Your heart yearns for meaningful relationships, peace, and the joy of genuine collaboration. You feel most alive when you're in harmonious relationships, when you can support and be supported, and when there is balance and beauty around you. This inner drive toward connection and harmony is the deepest longing of your soul.",
    innerDesires: "Your deepest desires include loving partnership, harmony in relationships, being needed and appreciated, peaceful environments, and deep emotional bonds. You long to share your life with someone and to create beauty and balance.",
    fulfillment: "You find soul satisfaction through intimate relationships, being a supportive partner, creating harmony, and feeling deeply connected to others. Love, partnership, and emotional intimacy bring you the greatest joy."
  },
  3: {
    number: 3,
    title: "The Expresser",
    description: "Soul Urge 3 reveals that at your core, you deeply desire self-expression, joy, and creative fulfillment. Your heart yearns to express itself through words, art, or any creative medium. You feel most alive when you're creating, communicating, and spreading joy. This inner drive toward joyful expression is what makes your soul sing.",
    innerDesires: "Your deepest desires include expressing yourself creatively, being admired for your talents, experiencing joy and pleasure, inspiring others, and living with enthusiasm. You long to create beautiful things and share them with the world.",
    fulfillment: "You find soul satisfaction through creative expression, joyful experiences, inspiring communication, and appreciation from others. Making others laugh or feel moved by your creations brings you deep fulfillment."
  },
  4: {
    number: 4,
    title: "The Builder",
    description: "Soul Urge 4 reveals that at your core, you deeply desire security, stability, and tangible accomplishment. Your heart yearns for solid foundations, practical achievement, and knowing that your work will endure. You feel most alive when you're building something lasting, when there is order around you, and when you can see the concrete results of your efforts.",
    innerDesires: "Your deepest desires include creating lasting security, building tangible things, having order and routine, being reliable and dependable, and leaving a lasting legacy. You long for stability and the satisfaction of solid work.",
    fulfillment: "You find soul satisfaction through completing projects, creating security for yourself and loved ones, building lasting structures, and being recognized for your reliability. Order, accomplishment, and stability bring you deep peace."
  },
  5: {
    number: 5,
    title: "The Adventurer",
    description: "Soul Urge 5 reveals that at your core, you deeply desire freedom, variety, and sensory experience. Your heart yearns for adventure, change, and the full experience of being alive. You feel most alive when you're free to explore, when life offers variety and excitement, and when you can experience new things. This inner drive toward freedom and experience is your soul's deepest calling.",
    innerDesires: "Your deepest desires include freedom of movement and choice, variety and change, sensory pleasures, travel and adventure, and meeting new people. You long to experience all that life has to offer.",
    fulfillment: "You find soul satisfaction through adventure, variety, travel, freedom, and new experiences. Breaking free from routine and exploring new horizons brings you the greatest joy."
  },
  6: {
    number: 6,
    title: "The Caregiver",
    description: "Soul Urge 6 reveals that at your core, you deeply desire love, family, and the chance to nurture others. Your heart yearns to care for those you love, to create a beautiful home, and to see your loved ones thrive. You feel most alive when you're taking care of others, when your home is harmonious, and when love surrounds you.",
    innerDesires: "Your deepest desires include nurturing family, creating a beautiful home, being needed by loved ones, serving those you love, and experiencing deep domestic harmony. You long for a life filled with love and beauty.",
    fulfillment: "You find soul satisfaction through caring for others, creating beauty in your environment, seeing loved ones flourish, and being at the center of a loving family or community. Domestic happiness and service bring you deep joy."
  },
  7: {
    number: 7,
    title: "The Seeker",
    description: "Soul Urge 7 reveals that at your core, you deeply desire truth, wisdom, and understanding life's mysteries. Your heart yearns for knowledge, solitude for contemplation, and answers to life's big questions. You feel most alive when you're learning, researching, and discovering hidden truths. This inner drive toward understanding is your soul's deepest calling.",
    innerDesires: "Your deepest desires include understanding truth, gaining knowledge and wisdom, having time for contemplation, uncovering mysteries, and achieving inner peace. You long for wisdom and spiritual understanding.",
    fulfillment: "You find soul satisfaction through learning, research, spiritual exploration, moments of insight, and deep contemplation. Discovering truth and achieving inner wisdom bring you the greatest peace."
  },
  8: {
    number: 8,
    title: "The Achiever",
    description: "Soul Urge 8 reveals that at your core, you deeply desire power, abundance, and material achievement. Your heart yearns for success, recognition, and the ability to make things happen in the world. You feel most alive when you're achieving, building, and wielding influence. This inner drive toward power and abundance is your soul's deepest motivation.",
    innerDesires: "Your deepest desires include achieving financial abundance, gaining recognition and status, wielding power and influence, building an empire, and being successful. You long for mastery of the material world.",
    fulfillment: "You find soul satisfaction through achievement, accumulating wealth, gaining respect and status, and making an impact on the world. Success and abundance bring you deep satisfaction."
  },
  9: {
    number: 9,
    title: "The Giver",
    description: "Soul Urge 9 reveals that at your core, you deeply desire to serve humanity and make the world a better place. Your heart yearns for universal love, compassion, and the fulfillment that comes from giving to others. You feel most alive when you're helping, when you're connected to a cause greater than yourself, and when you can see the impact of your service.",
    innerDesires: "Your deepest desires include serving humanity, making a positive difference, expressing universal love, leaving the world better than you found it, and being connected to something greater than yourself. You long for meaning through service.",
    fulfillment: "You find soul satisfaction through humanitarian work, selfless giving, creative expression that touches many, and knowing you've made a positive impact. Service to others and universal love bring you the deepest joy."
  },
  11: {
    number: 11,
    title: "The Illuminated",
    description: "Soul Urge 11 is a Master Number revealing that at your core, you deeply desire spiritual illumination, inspiration, and connection to higher wisdom. Your heart yearns to understand life's spiritual dimensions and to inspire others toward enlightenment. You feel most alive when you're receiving insights, inspiring others, and connected to the divine.",
    innerDesires: "Your deepest desires include spiritual enlightenment, inspiring others, receiving divine guidance, understanding higher truths, and being a channel for light. You long for profound spiritual connection and the ability to illuminate.",
    fulfillment: "You find soul satisfaction through spiritual experiences, inspiring moments, channeling higher wisdom, and uplifting others. Connection to the divine and serving as a light for others brings you deep peace."
  },
  22: {
    number: 22,
    title: "The Master Manifester",
    description: "Soul Urge 22 is a Master Number revealing that at your core, you deeply desire to build something of lasting significance that benefits humanity. Your heart yearns to turn your greatest dreams into reality and to leave a legacy that endures. You feel most alive when you're manifesting visions on a grand scale.",
    innerDesires: "Your deepest desires include building something monumental, leaving a lasting legacy, making dreams reality, serving humanity through achievement, and mastering the material and spiritual worlds. You long to create something that will outlive you.",
    fulfillment: "You find soul satisfaction through large-scale achievement, seeing your visions manifested, building lasting structures, and knowing your work serves the greater good. Manifesting dreams into reality brings you deep fulfillment."
  },
  33: {
    number: 33,
    title: "The Cosmic Parent",
    description: "Soul Urge 33 is the highest Master Number revealing that at your core, you deeply desire to heal and teach through unconditional love. Your heart yearns to serve as a parent to humanity, nurturing and guiding all beings toward their highest potential. You feel most alive when you're loving, healing, and uplifting others.",
    innerDesires: "Your deepest desires include healing through love, teaching spiritual truths, serving as a guide for humanity, experiencing unconditional love, and helping others reach their highest potential. You long to be a pure channel for divine love.",
    fulfillment: "You find soul satisfaction through healing work, unconditional loving, teaching by example, and seeing others awaken. Being a vessel for divine love and helping transform lives brings you the greatest joy."
  }
};

export const personalityContent: Record<number, PersonalityContent> = {
  1: {
    number: 1,
    title: "The Leader",
    description: "Personality Number 1 reveals that you project an image of strength, independence, and leadership to the world. Others see you as confident, capable, and self-reliant. Your outer persona suggests someone who knows what they want and isn't afraid to go after it. You come across as ambitious, determined, and original.",
    firstImpression: "When people first meet you, they see a strong, confident individual who appears to be a natural leader. You project an air of independence and self-sufficiency. People sense that you are someone who takes initiative and prefers to chart your own course.",
    socialStyle: "In social situations, you tend to take charge or stand out as an individual. You're not one to blend into the crowd. Others may look to you for direction, or they may perceive you as somewhat aloof or competitive. You dress and present yourself in ways that emphasize your individuality."
  },
  2: {
    number: 2,
    title: "The Diplomat",
    description: "Personality Number 2 reveals that you project an image of gentleness, cooperation, and approachability to the world. Others see you as friendly, diplomatic, and easy to be with. Your outer persona suggests someone who is caring, supportive, and attuned to others' feelings.",
    firstImpression: "When people first meet you, they see a warm, friendly individual who appears approachable and non-threatening. You project an air of harmony and cooperation. People sense that you are someone who listens well and cares about others.",
    socialStyle: "In social situations, you tend to be accommodating and diplomatic. You're skilled at putting others at ease and facilitating connections. Others may rely on you to smooth over conflicts or bring people together. You dress and present yourself in refined, harmonious ways."
  },
  3: {
    number: 3,
    title: "The Entertainer",
    description: "Personality Number 3 reveals that you project an image of creativity, charm, and expressiveness to the world. Others see you as sociable, entertaining, and fun to be around. Your outer persona suggests someone who is artistic, witty, and full of life.",
    firstImpression: "When people first meet you, they see a charming, expressive individual who seems to light up the room. You project an air of creativity and enthusiasm. People sense that you are someone who knows how to have fun and make others smile.",
    socialStyle: "In social situations, you tend to be the life of the party or the creative spark. You're skilled at conversation and entertainment. Others are drawn to your wit and charm. You dress and present yourself in expressive, colorful, or fashionable ways."
  },
  4: {
    number: 4,
    title: "The Rock",
    description: "Personality Number 4 reveals that you project an image of reliability, stability, and practicality to the world. Others see you as dependable, hardworking, and trustworthy. Your outer persona suggests someone who is organized, responsible, and grounded.",
    firstImpression: "When people first meet you, they see a steady, reliable individual who appears practical and down-to-earth. You project an air of competence and stability. People sense that you are someone they can count on.",
    socialStyle: "In social situations, you tend to be consistent and dependable. You're not flashy but rather solid and trustworthy. Others may turn to you for practical advice or help. You dress and present yourself in conservative, appropriate, and practical ways."
  },
  5: {
    number: 5,
    title: "The Free Spirit",
    description: "Personality Number 5 reveals that you project an image of excitement, versatility, and freedom to the world. Others see you as dynamic, adventurous, and interesting. Your outer persona suggests someone who is open to new experiences and lives life fully.",
    firstImpression: "When people first meet you, they see an energetic, exciting individual who appears interesting and multifaceted. You project an air of freedom and adventure. People sense that you are someone who has fascinating experiences to share.",
    socialStyle: "In social situations, you tend to be dynamic and engaging, often the center of attention through your stories or ideas. You're skilled at making connections and keeping things interesting. You dress and present yourself in trendy, unique, or unconventional ways."
  },
  6: {
    number: 6,
    title: "The Nurturer",
    description: "Personality Number 6 reveals that you project an image of warmth, responsibility, and caring to the world. Others see you as nurturing, trustworthy, and domestic. Your outer persona suggests someone who values family, home, and service to others.",
    firstImpression: "When people first meet you, they see a warm, responsible individual who appears caring and supportive. You project an air of stability and nurturing. People sense that you are someone who takes care of others.",
    socialStyle: "In social situations, you tend to be the caretaker or the one who ensures everyone is comfortable. You're skilled at making others feel welcome and cared for. You dress and present yourself in comfortable, tasteful, and harmonious ways."
  },
  7: {
    number: 7,
    title: "The Thinker",
    description: "Personality Number 7 reveals that you project an image of depth, mystery, and intelligence to the world. Others see you as thoughtful, reserved, and perhaps somewhat enigmatic. Your outer persona suggests someone who has a rich inner life and deep knowledge.",
    firstImpression: "When people first meet you, they see a quiet, thoughtful individual who appears intelligent and somewhat mysterious. You project an air of depth and contemplation. People sense that there is much more to you than meets the eye.",
    socialStyle: "In social situations, you tend to be reserved, preferring deeper conversations to small talk. You're skilled at listening and observing. Others may find you intriguing but somewhat hard to know. You dress and present yourself in refined, understated, or quality-focused ways."
  },
  8: {
    number: 8,
    title: "The Executive",
    description: "Personality Number 8 reveals that you project an image of power, success, and authority to the world. Others see you as ambitious, capable, and influential. Your outer persona suggests someone who is successful or destined for success.",
    firstImpression: "When people first meet you, they see a confident, authoritative individual who appears successful and powerful. You project an air of capability and ambition. People sense that you are someone who gets things done and commands respect.",
    socialStyle: "In social situations, you tend to be impressive and commanding. You're skilled at projecting success and authority. Others may be intimidated or impressed by you. You dress and present yourself in quality, status-conscious, or professional ways."
  },
  9: {
    number: 9,
    title: "The Sage",
    description: "Personality Number 9 reveals that you project an image of wisdom, compassion, and broad perspective to the world. Others see you as understanding, worldly, and humanitarian. Your outer persona suggests someone who cares about the greater good and has lived richly.",
    firstImpression: "When people first meet you, they see a warm, wise individual who appears understanding and sophisticated. You project an air of compassion and worldliness. People sense that you have wisdom to share and care about humanity.",
    socialStyle: "In social situations, you tend to be gracious and inclusive, making everyone feel valued. You're skilled at seeing the big picture and connecting with diverse people. You dress and present yourself in artistic, culturally aware, or sophisticated ways."
  },
  11: {
    number: 11,
    title: "The Intuitive",
    description: "Personality Number 11 is a Master Number revealing that you project an image of inspiration, intuition, and spiritual awareness to the world. Others see you as special, sensitive, and potentially psychic. Your outer persona suggests someone who is tuned into higher frequencies.",
    firstImpression: "When people first meet you, they see an inspiring, sensitive individual who appears to have unusual insight or awareness. You project an air of spirituality and intuition. People sense that you are someone who sees beyond the ordinary.",
    socialStyle: "In social situations, you tend to be inspiring or somewhat otherworldly. You're skilled at picking up on energies and unspoken dynamics. Others may be drawn to your light or find you somewhat intense. You present yourself in unique, artistic, or spiritually conscious ways."
  },
  22: {
    number: 22,
    title: "The Master",
    description: "Personality Number 22 is a Master Number revealing that you project an image of tremendous capability, vision, and practical power to the world. Others see you as someone capable of great achievements and possessing unusual organizational ability.",
    firstImpression: "When people first meet you, they see a powerful, capable individual who appears to have vision and practical mastery. You project an air of authority combined with inspired vision. People sense that you are someone who can achieve the extraordinary.",
    socialStyle: "In social situations, you tend to be impressive and commanding, yet purposeful. You're skilled at organizing and leading. Others may feel they are in the presence of someone destined for significant accomplishments. You present yourself in professional, quality, and purposeful ways."
  },
  33: {
    number: 33,
    title: "The Healer",
    description: "Personality Number 33 is the highest Master Number revealing that you project an image of profound compassion, healing presence, and spiritual teaching to the world. Others see you as a healer, teacher, or someone with an unusually loving presence.",
    firstImpression: "When people first meet you, they see a warm, healing individual who radiates compassion and understanding. You project an air of unconditional acceptance and spiritual depth. People sense that you are someone who can help them feel better.",
    socialStyle: "In social situations, you tend to be nurturing and healing in your presence. You're skilled at making others feel loved and accepted. Others may seek you out for comfort or guidance. You present yourself in warm, comforting, and harmonious ways."
  }
};

export const attitudeContent: Record<number, AttitudeContent> = {
  1: {
    number: 1,
    title: "The Pioneer",
    description: "Attitude Number 1 reveals your initial approach to life situations is one of independence, initiative, and leadership. When facing new circumstances, your first instinct is to take charge, act decisively, and rely on yourself. You naturally approach life as a leader who forges their own path.",
    harmoniousBehavior: "In your best expression, you approach life with courage, confidence, and the willingness to pioneer new territory. You're decisive, self-motivated, and inspire others through your example. You see challenges as opportunities to demonstrate your capabilities and create something original.",
    darkSide: "When imbalanced, you may become domineering, aggressive, or unwilling to consider others' perspectives. Stubbornness, impatience, and a need to win at all costs can emerge. You may push people away with an overly competitive or self-centered approach."
  },
  2: {
    number: 2,
    title: "The Mediator",
    description: "Attitude Number 2 reveals your initial approach to life situations is one of cooperation, diplomacy, and sensitivity. When facing new circumstances, your first instinct is to seek harmony, consider others' feelings, and find ways to collaborate. You naturally approach life as a peacemaker.",
    harmoniousBehavior: "In your best expression, you approach life with tact, empathy, and genuine care for others. You're patient, supportive, and skilled at bringing people together. You see relationships as central to life and value harmony over personal victory.",
    darkSide: "When imbalanced, you may become passive, indecisive, or overly dependent on others. Excessive sensitivity, people-pleasing, and losing yourself in relationships can emerge. You may avoid necessary confrontation or suppress your own needs."
  },
  3: {
    number: 3,
    title: "The Optimist",
    description: "Attitude Number 3 reveals your initial approach to life situations is one of optimism, creativity, and expression. When facing new circumstances, your first instinct is to find the bright side, express yourself, and bring joy to the situation. You naturally approach life as a creative communicator.",
    harmoniousBehavior: "In your best expression, you approach life with enthusiasm, humor, and creative vision. You're expressive, sociable, and skilled at uplifting others. You see life as an opportunity for joy and self-expression, and you spread positivity wherever you go.",
    darkSide: "When imbalanced, you may become superficial, scattered, or avoid anything too serious. Excessive talking, drama, or using humor to deflect can emerge. You may escape into pleasure rather than dealing with difficult realities."
  },
  4: {
    number: 4,
    title: "The Organizer",
    description: "Attitude Number 4 reveals your initial approach to life situations is one of practicality, organization, and diligence. When facing new circumstances, your first instinct is to create order, make a plan, and work systematically. You naturally approach life as a builder who values structure.",
    harmoniousBehavior: "In your best expression, you approach life with reliability, determination, and practical wisdom. You're organized, hardworking, and skilled at creating lasting foundations. You see value in patience, persistence, and doing things properly.",
    darkSide: "When imbalanced, you may become rigid, pessimistic, or workaholic. Stubbornness, resistance to change, and limiting yourself to only what you can see can emerge. You may miss opportunities by being too cautious or practical."
  },
  5: {
    number: 5,
    title: "The Adventurer",
    description: "Attitude Number 5 reveals your initial approach to life situations is one of curiosity, adaptability, and desire for experience. When facing new circumstances, your first instinct is to explore, adapt, and embrace the change. You naturally approach life as an adventurer seeking new experiences.",
    harmoniousBehavior: "In your best expression, you approach life with enthusiasm, flexibility, and open-mindedness. You're resourceful, communicative, and skilled at navigating change. You see life as an adventure to be experienced fully and embrace variety.",
    darkSide: "When imbalanced, you may become restless, irresponsible, or prone to excess. Inability to commit, scattered energy, and addiction to stimulation can emerge. You may run from responsibilities or never find contentment."
  },
  6: {
    number: 6,
    title: "The Caretaker",
    description: "Attitude Number 6 reveals your initial approach to life situations is one of responsibility, nurturing, and concern for others. When facing new circumstances, your first instinct is to care for those involved, create harmony, and take responsibility. You naturally approach life as a caregiver.",
    harmoniousBehavior: "In your best expression, you approach life with love, responsibility, and desire to serve. You're nurturing, reliable, and skilled at creating harmony. You see your role as caring for others and making your environment more beautiful.",
    darkSide: "When imbalanced, you may become controlling, martyr-like, or anxious. Meddling in others' affairs, expecting perfection, and sacrificing yourself unhealthily can emerge. You may enable dependence or lose yourself in caretaking."
  },
  7: {
    number: 7,
    title: "The Analyst",
    description: "Attitude Number 7 reveals your initial approach to life situations is one of analysis, contemplation, and seeking understanding. When facing new circumstances, your first instinct is to observe, analyze, and understand before acting. You naturally approach life as a seeker of truth.",
    harmoniousBehavior: "In your best expression, you approach life with wisdom, insight, and depth. You're thoughtful, intuitive, and skilled at understanding complex matters. You see value in looking beneath the surface and finding deeper meaning.",
    darkSide: "When imbalanced, you may become isolated, skeptical, or lost in analysis. Over-thinking, distrust, and disconnection from emotions can emerge. You may retreat into your mind and miss the experience of life."
  },
  8: {
    number: 8,
    title: "The Director",
    description: "Attitude Number 8 reveals your initial approach to life situations is one of ambition, authority, and focus on results. When facing new circumstances, your first instinct is to take control, organize resources, and achieve objectives. You naturally approach life as an executive seeking success.",
    harmoniousBehavior: "In your best expression, you approach life with confidence, efficiency, and powerful intention. You're organized, goal-oriented, and skilled at manifesting results. You see potential for success and know how to make things happen.",
    darkSide: "When imbalanced, you may become domineering, materialistic, or ruthless. Workaholism, power struggles, and measuring worth only by success can emerge. You may sacrifice relationships or ethics in pursuit of achievement."
  },
  9: {
    number: 9,
    title: "The Philosopher",
    description: "Attitude Number 9 reveals your initial approach to life situations is one of wisdom, compassion, and broader perspective. When facing new circumstances, your first instinct is to see the bigger picture, consider the humanitarian aspects, and approach with understanding. You naturally approach life as a wise philosopher.",
    harmoniousBehavior: "In your best expression, you approach life with wisdom, tolerance, and genuine care for humanity. You're understanding, forgiving, and skilled at seeing the universal aspects of any situation. You see life as a journey toward greater love and understanding.",
    darkSide: "When imbalanced, you may become self-righteous, detached, or stuck in the past. Resentment, living in memories, and using idealism to escape reality can emerge. You may fail to take care of your own needs while focusing on the world."
  },
  11: {
    number: 11,
    title: "The Visionary",
    description: "Attitude Number 11 is a Master Number revealing your initial approach to life situations is one of inspiration, intuition, and higher awareness. When facing new circumstances, your first instinct is to tune into the spiritual dimension and seek inspired guidance. You naturally approach life as a visionary.",
    harmoniousBehavior: "In your best expression, you approach life with inspiration, intuition, and faith. You're insightful, inspiring, and skilled at perceiving what others miss. You see the spiritual potential in every situation and can illuminate the path for others.",
    darkSide: "When imbalanced, you may become anxious, impractical, or overwhelmed. Nervous tension, escapism into fantasy, and inability to ground your visions can emerge. You may struggle to function in the practical world."
  },
  22: {
    number: 22,
    title: "The Master Planner",
    description: "Attitude Number 22 is a Master Number revealing your initial approach to life situations is one of vision combined with practical mastery. When facing new circumstances, your first instinct is to see the grand potential and immediately begin organizing its manifestation. You naturally approach life as a master builder.",
    harmoniousBehavior: "In your best expression, you approach life with inspired vision and practical capability. You're organized, visionary, and skilled at turning dreams into reality. You see possibilities that others miss and have the ability to manifest them.",
    darkSide: "When imbalanced, you may become overwhelmed, controlling, or crushed by pressure. Taking on too much, demanding perfection, and workaholism can emerge. You may struggle under the weight of your own potential."
  },
  33: {
    number: 33,
    title: "The Master Healer",
    description: "Attitude Number 33 is the highest Master Number revealing your initial approach to life situations is one of unconditional love and healing presence. When facing new circumstances, your first instinct is to approach with compassion, seek to heal, and see the divine in everyone. You naturally approach life as a master teacher of love.",
    harmoniousBehavior: "In your best expression, you approach life with profound love, compassion, and healing intent. You're nurturing on a cosmic scale and skilled at uplifting others through your presence. You see the potential for healing and transformation everywhere.",
    darkSide: "When imbalanced, you may become martyred, depleted, or burdened by others' pain. Taking on too much, neglecting yourself, and messiah complex can emerge. You may lose yourself in trying to save everyone."
  }
};

export const generationContent: Record<number, GenerationContent> = {
  1: {
    number: 1,
    title: "The Pioneers",
    description: "Generation Number 1 indicates you are part of a collective energy focused on independence, innovation, and new beginnings. Your generation carries the vibration of pioneers and leaders who are here to break new ground and establish new ways of doing things. You share with your generation mates a drive toward individuality and self-determination.",
    collectiveEnergy: "Your generation is characterized by a pioneering spirit, emphasis on individual rights and expression, and the drive to create new systems. You collectively challenge traditions and push boundaries. Leadership, entrepreneurship, and innovative thinking are hallmarks of your generational group."
  },
  2: {
    number: 2,
    title: "The Peacemakers",
    description: "Generation Number 2 indicates you are part of a collective energy focused on cooperation, diplomacy, and harmony. Your generation carries the vibration of peacemakers who are here to build bridges and create understanding between different groups. You share with your generation mates a sensitivity to relationships and a desire for balance.",
    collectiveEnergy: "Your generation is characterized by emphasis on partnership, equality in relationships, and diplomatic solutions. You collectively value cooperation over competition and seek to create harmony in society. Emotional intelligence, mediation, and collaborative approaches are hallmarks of your generational group."
  },
  3: {
    number: 3,
    title: "The Expressors",
    description: "Generation Number 3 indicates you are part of a collective energy focused on creativity, communication, and self-expression. Your generation carries the vibration of artists and communicators who are here to express new ideas and bring joy to the world. You share with your generation mates an optimistic, creative approach to life.",
    collectiveEnergy: "Your generation is characterized by creative innovation, new forms of communication, and emphasis on joy and self-expression. You collectively value creativity, entertainment, and the power of communication. Artistic expression, media innovation, and social connectivity are hallmarks of your generational group."
  },
  4: {
    number: 4,
    title: "The Builders",
    description: "Generation Number 4 indicates you are part of a collective energy focused on building, structure, and practical achievement. Your generation carries the vibration of builders who are here to create lasting foundations and systems. You share with your generation mates a strong work ethic and focus on tangible results.",
    collectiveEnergy: "Your generation is characterized by focus on building lasting structures, valuing hard work, and creating stable systems. You collectively approach problems practically and seek to leave tangible legacies. Infrastructure building, systematic approaches, and valuing tradition are hallmarks of your generational group."
  },
  5: {
    number: 5,
    title: "The Changers",
    description: "Generation Number 5 indicates you are part of a collective energy focused on change, freedom, and progress. Your generation carries the vibration of change agents who are here to break free from old restrictions and experience life fully. You share with your generation mates a love of freedom and embrace of change.",
    collectiveEnergy: "Your generation is characterized by rapid change, valuing freedom, and embracing new experiences. You collectively challenge restrictions and seek to expand human experience. Travel, communication technology, and breaking free from traditions are hallmarks of your generational group."
  },
  6: {
    number: 6,
    title: "The Nurturers",
    description: "Generation Number 6 indicates you are part of a collective energy focused on family, community, and social responsibility. Your generation carries the vibration of nurturers who are here to care for others and create harmonious communities. You share with your generation mates a strong sense of responsibility and care for others.",
    collectiveEnergy: "Your generation is characterized by focus on family values, community responsibility, and nurturing care. You collectively value home, family, and service to others. Healthcare, education, and community building are hallmarks of your generational group."
  },
  7: {
    number: 7,
    title: "The Seekers",
    description: "Generation Number 7 indicates you are part of a collective energy focused on wisdom, spirituality, and truth-seeking. Your generation carries the vibration of seekers who are here to explore the mysteries of life and develop deeper understanding. You share with your generation mates a questioning nature and spiritual curiosity.",
    collectiveEnergy: "Your generation is characterized by spiritual seeking, scientific inquiry, and pursuit of deeper truth. You collectively value wisdom, analysis, and inner development. Research, spirituality, and technological innovation are hallmarks of your generational group."
  },
  8: {
    number: 8,
    title: "The Achievers",
    description: "Generation Number 8 indicates you are part of a collective energy focused on power, achievement, and material success. Your generation carries the vibration of achievers who are here to master the material world and build empires. You share with your generation mates an ambitious drive and focus on results.",
    collectiveEnergy: "Your generation is characterized by economic ambition, power dynamics, and material achievement. You collectively value success, efficiency, and financial mastery. Business innovation, wealth creation, and power structures are hallmarks of your generational group."
  },
  9: {
    number: 9,
    title: "The Humanitarians",
    description: "Generation Number 9 indicates you are part of a collective energy focused on humanitarianism, global awareness, and completion of cycles. Your generation carries the vibration of wise ones who are here to serve humanity and bring closure to old patterns. You share with your generation mates a broad perspective and compassionate nature.",
    collectiveEnergy: "Your generation is characterized by global awareness, humanitarian concerns, and letting go of outdated systems. You collectively value compassion, diversity, and service to humanity. Philanthropy, global consciousness, and transformational endings are hallmarks of your generational group."
  },
  11: {
    number: 11,
    title: "The Illuminators",
    description: "Generation Number 11 is a Master Number indicating you are part of a collective energy focused on spiritual awakening, inspiration, and raising consciousness. Your generation carries the heightened vibration of illuminators who are here to bring light and spiritual awareness to humanity.",
    collectiveEnergy: "Your generation is characterized by spiritual awakening, intuitive development, and inspired innovation. You collectively serve as a bridge between physical and spiritual realities. Consciousness expansion, enlightenment movements, and inspirational leadership are hallmarks of your generational group."
  },
  22: {
    number: 22,
    title: "The Master Builders",
    description: "Generation Number 22 is a Master Number indicating you are part of a collective energy focused on building on a massive scale and making practical the highest ideals. Your generation carries the vibration of master builders who are here to manifest significant changes in physical reality.",
    collectiveEnergy: "Your generation is characterized by the ability to manifest large-scale change and build lasting structures for humanity. You collectively combine vision with practical ability. Global infrastructure, major institutional change, and practical idealism are hallmarks of your generational group."
  },
  33: {
    number: 33,
    title: "The Master Teachers",
    description: "Generation Number 33 is the highest Master Number indicating you are part of a collective energy focused on healing, teaching, and unconditional love on a global scale. Your generation carries the vibration of master teachers who are here to uplift humanity through love.",
    collectiveEnergy: "Your generation is characterized by profound healing potential, spiritual teaching, and the manifestation of unconditional love. You collectively serve as healers and teachers for humanity. Global healing movements, spiritual teaching, and unconditional service are hallmarks of your generational group."
  }
};

export const dayOfBirthContent: Record<number, DayOfBirthContent> = {
  1: {
    number: 1,
    title: "The Initiator",
    description: "Being born on the 1st, 10th, 19th, or 28th gives you the special gift of initiation and leadership. You entered the world with the energy of new beginnings, independence, and originality. This day of birth adds a pioneering quality to your personality, giving you the confidence to start new things and the courage to go first. You have a natural ability to take initiative and a strong sense of individuality.",
    specialGifts: "Your birth day gifts include leadership ability, originality, self-confidence, determination, and pioneering spirit. You naturally know how to begin things and have the courage to act independently. You bring innovation and initiative to whatever you do."
  },
  2: {
    number: 2,
    title: "The Cooperator",
    description: "Being born on the 2nd, 11th, 20th, or 29th gives you the special gift of sensitivity and cooperation. You entered the world with the energy of partnership, intuition, and diplomacy. This day of birth adds a gentle, receptive quality to your personality, giving you the ability to work well with others and sense what is needed. You have a natural ability to create harmony and form meaningful connections.",
    specialGifts: "Your birth day gifts include intuition, diplomacy, patience, sensitivity, and cooperative spirit. You naturally know how to work with others and have the ability to sense unspoken dynamics. You bring harmony and balance to whatever you do."
  },
  3: {
    number: 3,
    title: "The Expresser",
    description: "Being born on the 3rd, 12th, 21st, or 30th gives you the special gift of creativity and expression. You entered the world with the energy of joy, communication, and artistic ability. This day of birth adds a creative, expressive quality to your personality, giving you the ability to communicate effectively and bring joy to others. You have a natural ability to express yourself and inspire others.",
    specialGifts: "Your birth day gifts include creativity, communication ability, optimism, imagination, and social charm. You naturally know how to express yourself and have the ability to uplift others. You bring creativity and joy to whatever you do."
  },
  4: {
    number: 4,
    title: "The Builder",
    description: "Being born on the 4th, 13th, 22nd, or 31st gives you the special gift of practical ability and determination. You entered the world with the energy of building, organization, and hard work. This day of birth adds a solid, reliable quality to your personality, giving you the ability to create lasting structures and see projects through to completion. You have a natural ability to organize and build.",
    specialGifts: "Your birth day gifts include organizational ability, determination, practicality, reliability, and building capacity. You naturally know how to create order and have the ability to work persistently toward goals. You bring stability and lasting results to whatever you do."
  },
  5: {
    number: 5,
    title: "The Adventurer",
    description: "Being born on the 5th, 14th, or 23rd gives you the special gift of versatility and freedom. You entered the world with the energy of change, adventure, and sensory experience. This day of birth adds a dynamic, adaptable quality to your personality, giving you the ability to embrace change and communicate effectively. You have a natural ability to adapt and explore.",
    specialGifts: "Your birth day gifts include versatility, quick thinking, adaptability, communication skills, and love of freedom. You naturally know how to navigate change and have the ability to connect with diverse people. You bring excitement and adaptability to whatever you do."
  },
  6: {
    number: 6,
    title: "The Nurturer",
    description: "Being born on the 6th, 15th, or 24th gives you the special gift of nurturing and responsibility. You entered the world with the energy of love, family, and service. This day of birth adds a caring, responsible quality to your personality, giving you the ability to nurture others and create harmony. You have a natural ability to care for others and create beauty.",
    specialGifts: "Your birth day gifts include nurturing ability, responsibility, artistic sense, domestic skills, and loving nature. You naturally know how to care for others and have the ability to create harmony. You bring love and beauty to whatever you do."
  },
  7: {
    number: 7,
    title: "The Thinker",
    description: "Being born on the 7th, 16th, or 25th gives you the special gift of analysis and intuition. You entered the world with the energy of wisdom, introspection, and spiritual seeking. This day of birth adds a thoughtful, perceptive quality to your personality, giving you the ability to see beneath the surface and understand deeply. You have a natural ability to analyze and intuit.",
    specialGifts: "Your birth day gifts include analytical ability, intuition, wisdom, research skills, and spiritual awareness. You naturally know how to investigate deeply and have the ability to perceive hidden truths. You bring depth and understanding to whatever you do."
  },
  8: {
    number: 8,
    title: "The Achiever",
    description: "Being born on the 8th, 17th, or 26th gives you the special gift of material mastery and executive ability. You entered the world with the energy of power, abundance, and achievement. This day of birth adds an authoritative, capable quality to your personality, giving you the ability to organize, manage, and achieve. You have a natural ability to manifest and succeed.",
    specialGifts: "Your birth day gifts include executive ability, business acumen, organizational skill, manifestation power, and ambition. You naturally know how to achieve goals and have the ability to manage resources effectively. You bring success and abundance to whatever you do."
  },
  9: {
    number: 9,
    title: "The Humanitarian",
    description: "Being born on the 9th, 18th, or 27th gives you the special gift of wisdom and compassion. You entered the world with the energy of universal love, humanitarian service, and completion. This day of birth adds a wise, compassionate quality to your personality, giving you the ability to understand broadly and serve humanity. You have a natural ability to see the big picture and give selflessly.",
    specialGifts: "Your birth day gifts include wisdom, compassion, artistic ability, broad vision, and humanitarian spirit. You naturally know how to see the universal aspects of life and have the ability to inspire and help many. You bring wisdom and compassion to whatever you do."
  },
  11: {
    number: 11,
    title: "The Inspirer",
    description: "Being born on the 11th gives you the special Master Number gift of inspiration and intuition. You entered the world with the heightened energy of spiritual awareness, vision, and illumination. This day of birth adds an inspired, intuitive quality to your personality, giving you the ability to perceive beyond the ordinary and inspire others.",
    specialGifts: "Your birth day gifts include heightened intuition, inspirational ability, psychic sensitivity, visionary thinking, and spiritual awareness. You naturally know how to tune into higher frequencies and have the ability to illuminate paths for others. You bring inspiration and light to whatever you do."
  },
  22: {
    number: 22,
    title: "The Master Builder",
    description: "Being born on the 22nd gives you the special Master Number gift of practical idealism and large-scale building. You entered the world with the powerful energy of manifestation, organizational mastery, and the ability to turn dreams into reality. This day of birth adds a visionary yet practical quality to your personality.",
    specialGifts: "Your birth day gifts include master organizing ability, visionary thinking, practical idealism, manifestation power, and large-scale building capacity. You naturally know how to envision and create significant things and have the ability to achieve the extraordinary. You bring mastery and manifestation to whatever you do."
  },
  33: {
    number: 33,
    title: "The Master Healer",
    description: "While true 33 birth day is rare (would require the 33rd day which doesn't exist), those whose numerology otherwise brings them to 33 as a day influence carry the special gift of healing love and spiritual teaching. You entered the world with the highest vibration of compassionate service.",
    specialGifts: "Your gifts include healing presence, profound compassion, teaching ability, spiritual depth, and unconditional love. You naturally know how to heal and uplift and have the ability to transform lives through love. You bring healing and unconditional love to whatever you do."
  }
};

export const maturityContent: Record<number, MaturityContent> = {
  1: {
    number: 1,
    title: "The Independent Leader",
    description: "Maturity Number 1 indicates that your later life path leads toward greater independence, leadership, and self-determination. As you mature, you will increasingly be called to stand on your own, express your individuality, and take the lead in your life. Your later years are about becoming more authentically yourself and expressing your unique vision with confidence.",
    laterLifeGoals: "Your maturity goals involve developing true self-reliance, expressing your originality fully, and leading by example. You're moving toward a life where you are the authority in your own experience. Success in later life comes through courage to be yourself and willingness to pioneer your own path."
  },
  2: {
    number: 2,
    title: "The Peaceful Partner",
    description: "Maturity Number 2 indicates that your later life path leads toward greater harmony, partnership, and emotional fulfillment. As you mature, you will increasingly be called to develop meaningful relationships, create balance, and serve as a peacemaker. Your later years are about deepening connections and finding peace through harmony.",
    laterLifeGoals: "Your maturity goals involve developing true partnership, finding emotional fulfillment, and creating peace in your environment. You're moving toward a life of meaningful connection and balanced relationships. Success in later life comes through genuine cooperation and emotional wisdom."
  },
  3: {
    number: 3,
    title: "The Creative Voice",
    description: "Maturity Number 3 indicates that your later life path leads toward greater creative expression, joy, and communication. As you mature, you will increasingly be called to express yourself creatively, communicate your truth, and share your joy with the world. Your later years are about finding your authentic voice and creative fulfillment.",
    laterLifeGoals: "Your maturity goals involve developing your creative gifts, expressing yourself authentically, and bringing more joy into life. You're moving toward a life of creative expression and joyful communication. Success in later life comes through authentic self-expression and sharing your gifts."
  },
  4: {
    number: 4,
    title: "The Stable Foundation",
    description: "Maturity Number 4 indicates that your later life path leads toward greater stability, accomplishment, and practical wisdom. As you mature, you will increasingly be called to build lasting structures, find security, and apply your practical skills. Your later years are about creating solid foundations and leaving tangible legacies.",
    laterLifeGoals: "Your maturity goals involve building lasting security, applying practical wisdom, and leaving solid legacies. You're moving toward a life of stability and tangible accomplishment. Success in later life comes through persistent effort and building things that endure."
  },
  5: {
    number: 5,
    title: "The Wise Explorer",
    description: "Maturity Number 5 indicates that your later life path leads toward greater freedom, experience, and wisdom gained through variety. As you mature, you will increasingly be called to embrace change, seek new experiences, and share the wisdom you've gained through living fully. Your later years are about freedom and experiential wisdom.",
    laterLifeGoals: "Your maturity goals involve embracing constructive change, experiencing life fully, and sharing the wisdom of experience. You're moving toward a life of freedom, variety, and adventure. Success in later life comes through remaining open to new experiences and adapting wisely to change."
  },
  6: {
    number: 6,
    title: "The Loving Sage",
    description: "Maturity Number 6 indicates that your later life path leads toward greater love, service, and domestic fulfillment. As you mature, you will increasingly be called to nurture others, create beauty, and serve love in your community. Your later years are about love, family, and meaningful service.",
    laterLifeGoals: "Your maturity goals involve deepening love relationships, serving your community, and creating harmony in your environment. You're moving toward a life of love, beauty, and meaningful service. Success in later life comes through loving service and creating harmony."
  },
  7: {
    number: 7,
    title: "The Spiritual Sage",
    description: "Maturity Number 7 indicates that your later life path leads toward greater wisdom, spiritual development, and inner peace. As you mature, you will increasingly be called to seek truth, develop spiritually, and share the wisdom you've gained. Your later years are about inner development and spiritual fulfillment.",
    laterLifeGoals: "Your maturity goals involve developing spiritual wisdom, finding inner peace, and sharing your insights with others. You're moving toward a life of contemplation, understanding, and spiritual fulfillment. Success in later life comes through inner development and living your truth."
  },
  8: {
    number: 8,
    title: "The Accomplished Master",
    description: "Maturity Number 8 indicates that your later life path leads toward greater achievement, abundance, and the responsible use of power. As you mature, you will increasingly be called to use your resources wisely, achieve significant goals, and leave a legacy of accomplishment. Your later years are about mastery and achievement.",
    laterLifeGoals: "Your maturity goals involve achieving material mastery, using power responsibly, and leaving a significant legacy. You're moving toward a life of accomplishment, abundance, and respected authority. Success in later life comes through achieving worthy goals and using influence wisely."
  },
  9: {
    number: 9,
    title: "The Universal Sage",
    description: "Maturity Number 9 indicates that your later life path leads toward greater wisdom, humanitarian service, and universal love. As you mature, you will increasingly be called to let go, serve humanity, and embody the wisdom of completion. Your later years are about giving back and finding meaning through service.",
    laterLifeGoals: "Your maturity goals involve developing universal wisdom, serving humanity selflessly, and letting go with grace. You're moving toward a life of compassion, wisdom, and meaningful contribution. Success in later life comes through selfless service and embodying universal love."
  },
  11: {
    number: 11,
    title: "The Spiritual Illuminator",
    description: "Maturity Number 11 is a Master Number indicating that your later life path leads toward greater spiritual illumination, inspiration, and service as a light-bringer. As you mature, you will increasingly be called to inspire others, channel higher wisdom, and serve as a bridge between worlds.",
    laterLifeGoals: "Your maturity goals involve developing your spiritual gifts, inspiring others, and serving as a channel for higher wisdom. You're moving toward a life of illumination, inspiration, and spiritual service. Success in later life comes through sharing your light and inspiring others."
  },
  22: {
    number: 22,
    title: "The Legacy Builder",
    description: "Maturity Number 22 is a Master Number indicating that your later life path leads toward building significant lasting structures and manifesting your highest visions. As you mature, you will increasingly be called to achieve on a large scale and leave a lasting legacy for humanity.",
    laterLifeGoals: "Your maturity goals involve manifesting your grandest visions, building something of lasting significance, and serving humanity through practical achievement. You're moving toward a life of masterful creation and enduring legacy. Success in later life comes through turning dreams into reality on a significant scale."
  },
  33: {
    number: 33,
    title: "The Master Healer",
    description: "Maturity Number 33 is the highest Master Number indicating that your later life path leads toward healing, teaching, and unconditional love on the highest level. As you mature, you will increasingly be called to heal, teach, and serve as an embodiment of divine love.",
    laterLifeGoals: "Your maturity goals involve becoming a pure channel for healing love, teaching through example, and uplifting humanity. You're moving toward a life of profound service, unconditional love, and spiritual teaching. Success in later life comes through embodying love and helping others awaken."
  }
};

export function getNumberContent(number: number): number {
  if (number === 11 || number === 22 || number === 33) {
    return number;
  }
  if (number > 9) {
    return getNumberContent(number.toString().split('').reduce((a, b) => a + parseInt(b), 0));
  }
  return number;
}
