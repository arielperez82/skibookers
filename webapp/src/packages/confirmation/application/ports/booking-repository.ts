import { BookingConfirmation } from '@confirmation/domain';

export interface BookingRepository {
  findBookingById(bookingId: string): Promise<BookingConfirmation | null>;
  saveConfirmation(confirmation: BookingConfirmation): Promise<void>;
} 