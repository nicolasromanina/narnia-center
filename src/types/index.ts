export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  schedule: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  imageUrl?: string;
}

export interface Testimony {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface PrayerRequest {
  id: string;
  author: string;
  request: string;
  date: string;
  isPrivate: boolean;
}