import { NextRequest, NextResponse } from 'next/server';
import { HTTPRequest, HTTPResponse } from '@shared/application/entities/http.entity';

export class NextJSAdapter {
  static async toHTTPResponseWithBody(response: NextResponse<unknown>): Promise<HTTPResponse> {
    const status = response.status;
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    let body: unknown = undefined;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        body = await response.json();
      } catch {
        body = undefined;
      }
    } else if (contentType.startsWith('text/')) {
      try {
        body = await response.text();
      } catch {
        body = undefined;
      }
    } else {
      try {
        body = await response.arrayBuffer();
      } catch {
        body = undefined;
      }
    }

    return { status, headers, body };
  }

  static toHTTPRequest(request: NextRequest): HTTPRequest {
    const url = new URL(request.url);
    
    return {
      query: Object.fromEntries(url.searchParams.entries()),
      headers: Object.fromEntries(request.headers.entries()),
    };
  }

  static async toHTTPRequestWithBody(request: NextRequest): Promise<HTTPRequest> {
    const baseRequest = this.toHTTPRequest(request);
    
    try {
      const body = await request.json();
      return { ...baseRequest, body };
    } catch {
      return baseRequest;
    }
  }

  static toNextResponse(response: HTTPResponse): NextResponse {
    if (response.body instanceof Buffer || response.body instanceof Uint8Array) {
      return new NextResponse(response.body, {
        status: response.status,
        headers: response.headers
      });
    }

    return NextResponse.json(response.body, {
      status: response.status,
      headers: response.headers
    });
  }
} 