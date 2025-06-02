import { BookingRepository } from '@confirmation/application/ports/booking-repository';
import { PDFService } from '@confirmation/application/ports/pdf-service';

export class GeneratePDFUseCase {
  constructor(
    private bookingRepository: BookingRepository,
    private pdfService: PDFService
  ) {}

  async execute(bookingId: string): Promise<Buffer> {
    // Validate booking exists
    const confirmation = await this.bookingRepository.findBookingById(bookingId);
    if (!confirmation) {
      throw new Error(`Booking ${bookingId} not found`);
    }

    // Verify booking is confirmed
    if (confirmation.status !== 'confirmed') {
      throw new Error(`Booking ${bookingId} is not confirmed`);
    }

    // Generate PDF
    const pdfBuffer = await this.pdfService.generateItineraryPDF(confirmation);
    
    return pdfBuffer;
  }
} 