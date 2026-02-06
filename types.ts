
export type View = 'dashboard' | 'academics' | 'exchange_hub' | 'services' | 'login' | 'mess' | 'mail_summarizer' | 'travel' | 'utility_status' | 'explore';

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  subject: string;
  status: 'pending' | 'completed';
}

export interface Grade {
  id: string;
  subject: string;
  score: string;
  type: string;
  date: string;
}

export interface CampusSpot {
  id: string;
  name: string;
  rating: number;
  distance: string;
  description: string;
  tags: string[];
  isOpen: boolean;
  image: string;
}
