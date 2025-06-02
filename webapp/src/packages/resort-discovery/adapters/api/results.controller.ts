import { GetResortsUseCase } from '@resort-discovery/application/use-cases/get-resorts-use-case';
import { HTTPRequest, HTTPResponse } from '@shared/application/entities/http.entity';

export class ResultsController {
  constructor(private getResortsUseCase: GetResortsUseCase) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getResorts(_req: HTTPRequest): Promise<HTTPResponse> {
    const resorts = await this.getResortsUseCase.execute();
    return {
      status: 200,
      body: { resorts },
    };
  }
} 