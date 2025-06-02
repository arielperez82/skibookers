export interface BookingConfirmation {
  id: string;
  bookingId: string;
  userId: string;
  resort: {
    id: string;
    name: string;
    location: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
  };
  bundle: {
    id: string;
    name: string;
    description: string;
    totalPrice: number;
    currency: string;
  };
  dates: {
    checkIn: Date;
    checkOut: Date;
    duration: number;
  };
  guests: {
    adults: number;
    children: number;
    names: string[];
  };
  accommodation: {
    type: string;
    name: string;
    roomNumber?: string;
  };
  liftPass: {
    type: string;
    validDays: number;
    restrictions?: string[];
  };
  transport: {
    type: string;
    details: string;
    pickupTime?: string;
    pickupLocation?: string;
  };
  payment: {
    total: number;
    currency: string;
    method: string;
    transactionId: string;
    paidAt: Date;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  confirmationNumber: string;
} 