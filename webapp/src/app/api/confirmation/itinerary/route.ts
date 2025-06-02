import { NextRequest } from 'next/server';
import { NextJSAdapter } from '@webapp/http-utils/nextjs-adapter';
import { ServerServiceRegistrar } from '@webapp/registry/server-service-registrar';
import { PDFController } from '@confirmation/adapters/api/pdf.controller';

export async function GET(request: NextRequest) {
  try {
    const registry = ServerServiceRegistrar.createRegistry();
    const controller = registry.get<PDFController>('pdfController');
    const httpRequest = NextJSAdapter.toHTTPRequest(request);
    const httpResponse = await controller.generateItinerary(httpRequest);
    return NextJSAdapter.toNextResponse(httpResponse);
  } catch (error) {
    console.error('PDF API route error:', error);
    return NextJSAdapter.toNextResponse({
      status: 500,
      body: { error: 'Internal server error' }
    });
  }
} 