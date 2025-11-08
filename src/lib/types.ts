
export type Profession = 'Student' | 'Professional' | 'House Parent';

export type UserProfile = {
  name: string;
  age: number;
  profession: Profession;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  avatarUrl?: string;
};

export type SurveyAnswers = Record<string, number>;

export type HistoricalScore = {
  date: string; // ISO date string
  score: number;
};

export type StoredState = {
  profile: UserProfile;
  summary: string;
  score: number;
  historicalScores: HistoricalScore[];
};
