
import { Book, LifeBuoy, Phone, Shield, Users, Video, Wind } from "lucide-react";

export const surveyOptions = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Agree", value: 3 },
  { label: "Strongly Agree", value: 4 },
];

export const surveyQuestions = {
  Student: [
    { question: "I find it difficult to maintain healthy friendships and social connections", number: 1 },
    { question: "I feel pressure related to family expectations or responsibilities", number: 2 },
    { question: "I struggle with body image or self-esteem", number: 3 },
    { question: "I worry about money or budgeting in daily life", number: 4 },
    { question: "My diet or physical health is affected by stress or emotions", number: 5 },
    { question: "I feel anxious about romantic relationships or dating", number: 6 },
    { question: "I lack motivation for hobbies or activities I used to enjoy", number: 7 },
    { question: "I feel uncertain about my purpose or life decisions", number: 8 },
    { question: "Arguments or conflicts at home affect my emotional wellbeing", number: 9 },
    { question: "I find it challenging to balance digital time and offline activities", number: 10 },
    { question: "I feel unsupported or misunderstood by people close to me", number: 11 },
    { question: "I experience periods of loneliness even when spending time with others", number: 12 },
  ],
  Professional: [
    { question: "I face challenges balancing personal life and professional duties", number: 1 },
    { question: "Relationships with family or friends sometimes negatively impact my mental health", number: 2 },
    { question: "I worry about managing household tasks or parenting along with work", number: 3 },
    { question: "Financial or economic stress affects my wellbeing", number: 4 },
    { question: "Health issues, such as exercise, diet, or sleep, worry me", number: 5 },
    { question: "I experience sadness or emptiness that has nothing to do with work", number: 6 },
    { question: "Arguments or conflicts with loved ones affect my emotional balance", number: 7 },
    { question: "I have concerns about my identity or future direction in life", number: 8 },
    { question: "I find it hard to disconnect from work during personal time.", number: 9 },
    { question: "I struggle to make time for social activities or fun", number: 10 },
    { question: "I feel unsupported or isolated even when with friends/family", number: 11 },
    { question: "Digital habits or social media use impact my mood or relationships", number: 12 },
  ],
  "House Parent": [
    { question: "Managing daily household tasks causes me stress.", number: 1 },
    { question: "I feel overwhelmed by balancing family responsibilities and personal needs.", number: 2 },
    { question: "Emotional support from my partner/family affects my stress levels.", number: 3 },
    { question: "I find it difficult to ask for help or delegate household tasks.", number: 4 },
    { question: "Financial pressures related to running my household create anxiety.", number: 5 },
    { question: "I experience times of sadness or worry because of family duties.", number: 6 },
    { question: "Children's needs and schedules sometimes make me mentally exhausted.", number: 7 },
    { question: "I feel isolated or unsupported in my role at home.", number: 8 },
    { question: "Tiredness from household work affects my mood or patience with family.", number: 9 },
    { question: "I struggle to make time for self-care or personal wellness activities.", number: 10 },
    { question: "Conflict or lack of communication at home increases my stress.", number: 11 },
    { question: "I seek help or advice when I find household or family pressures hard to manage.", number: 12 },
  ],
};

export const weeklyReviewQuestions = [
  { question: "I felt a sense of accomplishment and progress this week.", number: 1 },
  { question: "I made time for activities that I genuinely enjoy.", number: 2 },
  { question: "I managed my stress levels effectively.", number: 3 },
  { question: "I felt connected to the people who are important to me.", number: 4 },
  { question: "I was able to get enough restful sleep.", number: 5 },
  { question: "I felt physically active and energized.", number: 6 },
  { question: "I practiced self-compassion and was kind to myself.", number: 7 },
  { question: "I felt a sense of purpose in my daily activities.", number: 8 },
  { question: "I maintained a healthy work-life balance.", number: 9 },
  { question: "I am optimistic about the upcoming week.", number: 10 },
];

export const resources = [
  {
    title: "Understanding Anxiety",
    slug: "understanding-anxiety",
    description: "A comprehensive guide to understanding and coping with anxiety.",
    type: "Article",
    Icon: Book,
    href: "/dashboard/resources/understanding-anxiety",
    content: "Anxiety is a normal and often healthy human emotion. However, when a person regularly feels disproportionate levels of anxiety, it might become a medical disorder. This guide explores the causes, symptoms, and coping strategies for anxiety. We'll cover various types of anxiety disorders, such as Generalized Anxiety Disorder (GAD), Panic Disorder, and Social Anxiety Disorder. You will learn to recognize both the physical symptoms, like a racing heart or shortness of breath, and the psychological symptoms, such as constant worrying and irritability. We will delve into practical coping mechanisms, including deep-breathing exercises, mindfulness, and cognitive reframing techniques to challenge negative thought patterns. Understanding your anxiety is the first and most crucial step toward managing it and reclaiming your peace of mind. Remember, it's okay to seek professional help if anxiety starts to interfere with your daily life. Taking proactive steps can significantly improve your quality of life.",
  },
  {
    title: "Building Healthy Habits",
    slug: "building-healthy-habits",
    description: "Learn how to build and maintain healthy habits for a better life.",
    type: "Article",
    Icon: Book,
    href: "/dashboard/resources/building-healthy-habits",
    content: "Creating lasting habits is a journey, not a destination. This article breaks down the science of habit formation into small, manageable steps. We'll explore the 'habit loop'—cue, craving, response, and reward—and how you can engineer it to your advantage. From setting realistic and specific goals to the power of tracking your progress, you'll learn the keys to building habits that stick. Whether it's incorporating daily exercise, adopting a healthier diet, or dedicating time to a new hobby, this guide will provide you with the tools and strategies to succeed. We also discuss how to overcome common hurdles like lack of motivation and how to get back on track after a setback. Start small, be consistent, and watch as positive changes take root in your life.",
  },
  {
    title: "Mindfulness Meditation",
    slug: "mindfulness-meditation-video",
    description: "A 10-minute guided meditation to calm your mind and find focus.",
    type: "Video",
    Icon: Video,
    href: "/dashboard/resources/mindfulness-meditation-video",
    content: "https://www.youtube.com/embed/O-6f5wQXSu8",
  },
  {
    title: "Yoga for Stress Relief",
    slug: "yoga-for-stress-relief-video",
    description: "A gentle 20-minute yoga session to relieve stress and tension.",
    type: "Video",
    Icon: Video,
    href: "/dashboard/resources/yoga-for-stress-relief-video",
    content: "https://www.youtube.com/embed/v7AYKMP6rOE",
  },
  {
    title: "The Power of Self-Compassion",
    slug: "self-compassion-video",
    description: "Dr. Kristin Neff explains the three components of self-compassion.",
    type: "Video",
    Icon: Video,
    href: "/dashboard/resources/self-compassion-video",
    content: "https://www.youtube.com/embed/IvtZBUSplr4",
  },
  {
    title: "The Art of Saying No",
    slug: "art-of-saying-no",
    description: "Learn how to set boundaries to protect your mental energy.",
    type: "Article",
    Icon: Shield,
    href: "/dashboard/resources/art-of-saying-no",
    content: "Setting boundaries is essential for maintaining your mental health and well-being. This article teaches you the importance of saying 'no' and provides practical strategies for doing so without feeling guilty. We explore why people-pleasing can be detrimental and how to identify your own limits. You'll learn polite but firm phrases to decline requests, how to handle potential backlash, and the long-term benefits of protecting your time and energy. Saying 'no' isn't about being selfish; it's about self-respect and ensure you have the capacity to say 'yes' to the things that truly matter to you. Mastering this skill can reduce stress, prevent burnout, and lead to healthier, more balanced relationships.",
  },
  {
    title: "Overcoming Impostor Syndrome",
    slug: "overcoming-impostor-syndrome",
    description: "An article on how to deal with feelings of being a fraud.",
    type: "Article",
    Icon: Users,
    href: "/dashboard/resources/overcoming-impostor-syndrome",
    content: "Impostor syndrome, the feeling that you're a fraud and will be discovered as incompetent, affects millions of people across all professions. This article delves into what impostor syndrome is, its common triggers, and how it can hold you back. We provide actionable steps to combat these feelings, such as acknowledging your achievements, challenging negative self-talk, and seeking support from mentors or peers. You'll learn to reframe your thoughts and understand that perfection is not required for success. By recognizing your own skills and value, you can start to break free from the cycle of self-doubt and embrace your accomplishments with confidence. Remember, many successful people experience these feelings; the key is not to let them define you.",
  },
  {
    title: "Mindful Breathing Exercise",
    slug: "mindful-breathing-exercise",
    description: "A simple 4-step breathing exercise to calm your mind.",
    type: "Exercise",
    Icon: Wind,
    href: "/dashboard/resources/mindful-breathing-exercise",
    steps: [
        {
            "step": 1,
            "title": "Find a comfortable position",
            "description": "Sit or lie down in a quiet place. Close your eyes if you feel comfortable. Rest your hands on your lap or your belly."
        },
        {
            "step": 2,
            "title": "Breathe in deeply",
            "description": "Inhale slowly and deeply through your nose for a count of four. Feel your belly rise as your lungs fill with air."
        },
        {
            "step": 3,
            "title": "Hold your breath",
            "description": "Hold your breath for a brief moment, for a count of two. Try to remain relaxed and still."
        },
        {
            "step": 4,
            "title": "Breathe out slowly",
            "description": "Exhale slowly and completely through your mouth for a count of six. Feel your belly fall as the air leaves your body."
        }
    ]
  },
  {
    title: "Morning Stretching Routine",
    slug: "morning-stretching-routine",
    description: "A gentle routine to wake up your body and mind.",
    type: "Exercise",
    Icon: Wind,
    href: "/dashboard/resources/morning-stretching-routine",
    steps: [
        {
            "step": 1,
            "title": "Cat-Cow Stretch",
            "description": "Start on your hands and knees. Inhale as you drop your belly and look up (Cow). Exhale as you round your spine and tuck your chin (Cat). Repeat 5 times."
        },
        {
            "step": 2,
            "title": "Downward-Facing Dog",
            "description": "From hands and knees, lift your hips up and back, forming an inverted 'V' shape. Gently pedal your feet. Hold for 30 seconds."
        },
        {
            "step": 3,
            "title": "Child's Pose",
            "description": "From hands and knees, sit back on your heels and fold forward, resting your forehead on the floor. Hold for 30 seconds."
        },
        {
            "step": 4,
            "title": "Standing Forward Bend",
            "description": "Stand with feet hip-width apart. Exhale and fold forward from your hips, keeping your knees slightly bent. Let your head hang. Hold for 30 seconds."
        }
    ]
  },
  {
    title: "Core Strength Workout",
    slug: "core-strength-workout",
    description: "A 4-step workout to build a stronger core.",
    type: "Exercise",
    Icon: Wind,
    href: "/dashboard/resources/core-strength-workout",
    steps: [
      {
        "step": 1,
        "title": "Crunches",
        "description": "Lie on your back, knees bent. Lift your upper body towards your knees. Exhale as you go up, inhale as you go down. Repeat 15 times."
      },
      {
        "step": 2,
        "title": "Leg Lifts",
        "description": "Lie on your back, legs straight. Slowly lift your legs to a 90-degree angle, then slowly lower them. Repeat 15 times."
      },
      {
        "step": 3,
        "title": "Plank",
        "description": "Hold a push-up position, but with your weight on your forearms. Keep your body in a straight line. Hold for 30-60 seconds."
      },
      {
        "step": 4,
        "title": "Glute Bridges",
        "description": "Lie on your back, knees bent, feet flat. Lift your hips off the floor until your body forms a straight line from shoulders to knees. Repeat 15 times."
      }
    ]
  }
];

export const helplines = [
  {
    name: "Tele-MANAS",
    number: "14416",
    description: "A 24/7 national tele-mental health programme by the Government of India.",
    region: "India",
    Icon: Phone,
  },
  {
    name: "Kiran Helpline",
    number: "1800-599-0019",
    description: "A 24/7 mental health rehabilitation helpline by the Ministry of Social Justice & Empowerment.",
    region: "India",
    Icon: Phone,
  },
  {
    name: "Vandrevala Foundation",
    number: "9999666555",
    description: "A 24/7 helpline providing free psychological counseling and crisis intervention.",
    region: "India",
    Icon: Phone,
  },
  {
    name: "AASRA",
    number: "91-9820466726",
    description: "24/7 emotional support for those who are stressed, depressed, or suicidal.",
    region: "India",
    Icon: Phone,
  },
  {
    name: "iCALL",
    number: "022-25521111",
    description: "Provides counseling and support from Monday to Saturday, 10 AM to 8 PM. Based at TISS, Mumbai.",
    region: "India",
    Icon: Phone,
  },
  {
    name: "One Life",
    number: "7893078930",
    description: "A suicide prevention helpline providing emotional support.",
    region: "India",
    Icon: Phone,
  },
  {
    name: "Befrienders India",
    number: "+91 484 2394302",
    description: "Provides emotional support to prevent suicide. All services are free of charge.",
    region: "India",
    Icon: Phone,
  }
];
