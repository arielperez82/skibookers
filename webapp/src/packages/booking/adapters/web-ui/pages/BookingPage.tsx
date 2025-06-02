'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLink } from '@shared/adapters/web-ui/hooks/useLink';
import FunnelBreadcrumbs from '@shared/adapters/web-ui/components/FunnelBreadcrumbs';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  checkIn: z.string().min(1, 'Check-in required'),
  checkOut: z.string().min(1, 'Check-out required'),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      checkIn: '',
      checkOut: '',
    },
  });
  // Watch all fields to trigger re-render on change
  watch();

  const Link = useLink()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="sticky top-0 z-30 bg-background shadow w-full max-w-md">
        <FunnelBreadcrumbs currentStep="booking" />
      </div>
      <form
        className="bg-white rounded-xl shadow p-6 w-full max-w-md flex flex-col gap-4"
        onSubmit={e => e.preventDefault()}
      >
        <h1 className="text-xl font-bold mb-2">Booking Details</h1>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            autoComplete="name"
          />
          {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            autoComplete="email"
          />
          {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="checkIn">Check-in</label>
            <input
              id="checkIn"
              type="date"
              {...register('checkIn')}
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            {errors.checkIn && <span className="text-xs text-destructive">{errors.checkIn.message}</span>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="checkOut">Check-out</label>
            <input
              id="checkOut"
              type="date"
              {...register('checkOut')}
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            {errors.checkOut && <span className="text-xs text-destructive">{errors.checkOut.message}</span>}
          </div>
        </div>
        <Link href={isValid ? "/booking/payment" : "#"}>
          <button tabIndex={isValid ? 0 : -1} aria-disabled={!isValid} 
            className={`mt-6 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base shadow hover:bg-primary/90 transition cursor-pointer ${!isValid ? 'opacity-60 pointer-events-none' : ''}`}>
              Continue to Payment
          </button>
        </Link>
      </form>
    </div>
  );
} 