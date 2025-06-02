import { NextRequest } from 'next/server';
import { RecommendationController } from '@personalization/adapters/api/recommendation.controller';
import { NextJSAdapter } from '@webapp/http-utils/nextjs-adapter';
import { ServerServiceRegistrar } from '@webapp/registry/server-service-registrar';

export async function GET(request: NextRequest) {
  try {
    const registry = ServerServiceRegistrar.createRegistry();
    const controller = registry.get<RecommendationController>('recommendationController');
    const httpRequest = await NextJSAdapter.toHTTPRequestWithBody(request);
    const httpResponse = await controller.getRecommendation(httpRequest);
    return NextJSAdapter.toNextResponse(httpResponse);
  } catch (error) {
    console.error('API route error:', error);
    return NextJSAdapter.toNextResponse({
      status: 500,
      body: { error: 'Internal server error' }
    });
  }
} 