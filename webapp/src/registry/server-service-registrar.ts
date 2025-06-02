import { GenerateRecommendationUseCase } from '@personalization/application/use-cases/generate-recommendation-use-case';
import { RecommendationController } from '@personalization/adapters/api/recommendation.controller';
import { SupabaseBookingRepository } from '@confirmation/adapters/supabase/supabase-booking-repository';
import { JSPDFService } from '@confirmation/adapters/pdf/js-pdf-service';
import { GeneratePDFUseCase } from '@confirmation/application/use-cases/generate-pdf-use-case';
import { PDFController } from '@confirmation/adapters/api/pdf.controller';
import { type QuizRepository } from '@personalization/application/ports/quiz-repository';
import { type RecommendationService } from '@personalization/application/ports/recommendation-service';
import { type BookingRepository } from '@confirmation/application/ports/booking-repository';
import { type PDFService } from '@confirmation/application/ports/pdf-service';
import { MockRecommendationService } from '@personalization/adapters/mock/mock-recommendation-service';
import { SupabaseQuizRepository } from '@personalization/adapters/supabase/supabase-quiz-repository';
import { GetResortsUseCase } from '@resort-discovery/application/use-cases/get-resorts-use-case';
import { ResultsController } from '@resort-discovery/adapters/api/results.controller';
import { MockResortRepository } from '@resort-discovery/adapters/mock/mock-resort-repository';
import { type ResortRepository } from '@resort-discovery/application/ports/resort-repository';
import { type ServiceRegistry } from '@shared/application/ports';
import { MemoryServiceRegistry } from '@shared/adapters/memory/memory-service-registry';

export class ServerServiceRegistrar {
  static createRegistry(): ServiceRegistry {
    const registry = new MemoryServiceRegistry();
    this.registerAll(registry);
    return registry;
  }

  // TODO: this is a hack to get the registry into the async local storage
  private static registerAll(registry: ServiceRegistry): ServiceRegistry {
    this.registerRepositories(registry);
    this.registerServices(registry);
    this.registerUseCases(registry);
    this.registerControllers(registry);

    return registry;
  }

  private static registerRepositories(registry: ServiceRegistry): void {
    registry.register('bookingRepository', new SupabaseBookingRepository());
    registry.register('quizRepository', new SupabaseQuizRepository());
    registry.register('resortRepository', new MockResortRepository());
  }

  private static registerServices(registry: ServiceRegistry): void {
    registry.register('recommendationService', new MockRecommendationService());
    registry.register('pdfService', new JSPDFService());
  }

  private static registerUseCases(registry: ServiceRegistry): void {
    registry.register('generateRecommendationUseCase', new GenerateRecommendationUseCase(
      registry.get<QuizRepository>('quizRepository'),
      registry.get<RecommendationService>('recommendationService')
    ));
    registry.register('generatePDFUseCase', new GeneratePDFUseCase(
      registry.get<BookingRepository>('bookingRepository'),
      registry.get<PDFService>('pdfService')
    ));
    registry.register('getResortsUseCase', new GetResortsUseCase(
      registry.get<ResortRepository>('resortRepository')
    ));
  }

  private static registerControllers(registry: ServiceRegistry): void {
    registry.register('recommendationController', new RecommendationController(
      registry.get<GenerateRecommendationUseCase>('generateRecommendationUseCase')
    ));
    registry.register('pdfController', new PDFController(
      registry.get<GeneratePDFUseCase>('generatePDFUseCase')
    ));
    registry.register('resultsController', new ResultsController(
      registry.get<GetResortsUseCase>('getResortsUseCase')
    ));
  }
}