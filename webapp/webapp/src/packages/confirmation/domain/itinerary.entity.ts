export interface Itinerary {
  bookingId: string;
  title: string;
  description: string;
  sections: ItinerarySection[];
  generatedAt: Date;
}

export interface ItinerarySection {
  title: string;
  items: ItineraryItem[];
}

export interface ItineraryItem {
  date: Date;
  time?: string;
  title: string;
  description: string;
  location?: string;
  notes?: string[];
} 