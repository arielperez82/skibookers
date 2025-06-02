import { BookingConfirmation, Itinerary } from '@confirmation/domain';

export interface PDFService {
  generateItineraryPDF(confirmation: BookingConfirmation): Promise<Buffer>;
  generateItinerary(confirmation: BookingConfirmation): Promise<Itinerary>;
} 