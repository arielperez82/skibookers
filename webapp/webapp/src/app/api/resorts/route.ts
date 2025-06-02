import { NextResponse, NextRequest } from 'next/server'
import { ResultsController } from '@resort-discovery/adapters/api/results.controller';
import { ServerServiceRegistrar } from '@webapp/registry/server-service-registrar';
import { NextJSAdapter } from '@webapp/http-utils/nextjs-adapter';

export async function GET(req: NextRequest) {
  try {
    const registry = ServerServiceRegistrar.createRegistry();
    const resultsController = registry.get('resultsController') as ResultsController;
    const httpRequest = await NextJSAdapter.toHTTPRequestWithBody(req);
    const httpResponse = await resultsController.getResorts(httpRequest);
    return NextJSAdapter.toNextResponse(httpResponse);
  } catch (error) {
    console.error('Resorts API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 