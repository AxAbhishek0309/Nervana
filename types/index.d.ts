// Feedback type
export interface Feedback {
  id?: string;
  interviewId: string;
  userId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

// Interview type
export interface Interview {
  id?: string;
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  userId: string;
  finalized: boolean;
  coverImage: string;
  createdAt: string;
}

// Params for feedback creation
export interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: Array<{ role: string; content: string }>;
  feedbackId?: string;
}

// Params for fetching feedback by interview/user
export interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

// Params for fetching latest interviews
export interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
} 