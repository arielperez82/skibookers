import { PDFService } from '@confirmation/application/ports/pdf-service';
import { BookingConfirmation, Itinerary } from '@confirmation/domain';
import jsPDF from 'jspdf';

export class JSPDFService implements PDFService {
  async generateItineraryPDF(confirmation: BookingConfirmation): Promise<Buffer> {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Ski Vacation Itinerary', 20, 20);
    
    // Add confirmation details
    doc.setFontSize(12);
    doc.text(`Booking ID: ${confirmation.bookingId}`, 20, 40);
    doc.text(`Confirmation Number: ${confirmation.confirmationNumber}`, 20, 50);
    doc.text(`Resort: ${confirmation.resort.name}`, 20, 60);
    doc.text(`Location: ${confirmation.resort.location}`, 20, 70);
    
    // Add dates
    doc.text(`Check-in: ${confirmation.dates.checkIn.toLocaleDateString()}`, 20, 90);
    doc.text(`Check-out: ${confirmation.dates.checkOut.toLocaleDateString()}`, 20, 100);
    doc.text(`Duration: ${confirmation.dates.duration} days`, 20, 110);
    
    // Add bundle information
    doc.text('Package Details:', 20, 130);
    doc.text(`Bundle: ${confirmation.bundle.name}`, 20, 140);
    doc.text(`Total Price: ${confirmation.bundle.currency} ${confirmation.bundle.totalPrice}`, 20, 150);
    
    // Add accommodation
    doc.text('Accommodation:', 20, 170);
    doc.text(`Type: ${confirmation.accommodation.type}`, 20, 180);
    doc.text(`Name: ${confirmation.accommodation.name}`, 20, 190);
    
    // Add lift pass
    doc.text('Lift Pass:', 20, 210);
    doc.text(`Type: ${confirmation.liftPass.type}`, 20, 220);
    doc.text(`Valid Days: ${confirmation.liftPass.validDays}`, 20, 230);
    
    // Add contact information
    doc.text('Resort Contact:', 20, 250);
    doc.text(`Phone: ${confirmation.resort.contact.phone}`, 20, 260);
    doc.text(`Email: ${confirmation.resort.contact.email}`, 20, 270);
    
    // Convert to buffer
    const pdfArrayBuffer = doc.output('arraybuffer');
    return Buffer.from(pdfArrayBuffer);
  }

  async generateItinerary(confirmation: BookingConfirmation): Promise<Itinerary> {
    const checkIn = confirmation.dates.checkIn;
    //const checkOut = confirmation.dates.checkOut;
    const duration = confirmation.dates.duration;
    
    const sections = [];
    
    // Generate daily itinerary
    for (let day = 0; day < duration; day++) {
      const currentDate = new Date(checkIn);
      currentDate.setDate(checkIn.getDate() + day);
      
      const dayTitle = day === 0 ? 'Arrival Day' : 
                     day === duration - 1 ? 'Departure Day' : 
                     `Day ${day + 1}`;
      
      const items = [];
      
      if (day === 0) {
        // Arrival day items
        items.push({
          date: currentDate,
          time: '14:00',
          title: 'Check-in',
          description: `Check-in to ${confirmation.accommodation.name}`,
          location: confirmation.resort.name
        });
        
        if (confirmation.transport.pickupTime) {
          items.push({
            date: currentDate,
            time: confirmation.transport.pickupTime,
            title: 'Transport Arrival',
            description: confirmation.transport.details,
            location: confirmation.transport.pickupLocation
          });
        }
      } else if (day === duration - 1) {
        // Departure day items
        items.push({
          date: currentDate,
          time: '11:00',
          title: 'Check-out',
          description: `Check-out from ${confirmation.accommodation.name}`,
          location: confirmation.resort.name
        });
      } else {
        // Regular skiing days
        items.push({
          date: currentDate,
          time: '08:00',
          title: 'Skiing',
          description: `Full day skiing with ${confirmation.liftPass.type} lift pass`,
          location: confirmation.resort.name,
          notes: confirmation.liftPass.restrictions
        });
      }
      
      sections.push({
        title: dayTitle,
        items
      });
    }
    
    return {
      bookingId: confirmation.bookingId,
      title: `${confirmation.resort.name} Ski Vacation`,
      description: `${duration}-day ski vacation itinerary`,
      sections,
      generatedAt: new Date()
    };
  }
} 