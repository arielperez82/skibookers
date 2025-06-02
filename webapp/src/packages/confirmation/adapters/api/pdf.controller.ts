import { GeneratePDFUseCase } from '@confirmation/application/use-cases/generate-pdf-use-case';
import { HTTPRequest, HTTPResponse } from '@shared/application/entities/http.entity';

export class PDFController {
  constructor(
    private generatePDFUseCase: GeneratePDFUseCase
  ) {}

  async generateItinerary(request: HTTPRequest): Promise<HTTPResponse> {
    try {
      const bookingId = request.query?.bookingId as string;
      
      if (!bookingId) {
        return {
          status: 400,
          body: { error: 'Booking ID is required' }
        };
      }
      
      const pdfBuffer = await this.generatePDFUseCase.execute(bookingId);
      
      return {
        status: 200,
        body: pdfBuffer,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="cc"`
        }
      };
    } catch (error) {
      console.error('PDF generation failed:', error);
      
      if (error instanceof Error && error.message.includes('not found')) {
        return {
          status: 404,
          body: { error: 'Booking not found' }
        };
      }
      
      return {
        status: 500,
        body: { error: 'Failed to generate PDF' }
      };
    }
  }
} 