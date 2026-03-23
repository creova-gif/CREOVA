import { loadStripe } from '@stripe/stripe-js';
import { projectId, publicAnonKey } from './supabase/info';

// Initialize Stripe - You'll need to add your publishable key
const stripePromise = loadStripe('pk_test_51QRuTsP3y0vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD0r8u8vBjJCn4xL0X5yU7r7gCOLNVB0nVXJpFm7gHGWxr8vBzNBqfWjf8yD');

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8`;

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface BookingDetails {
  service: string;
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
  package?: string;
}

export interface RentalDetails {
  equipment: string[];
  start_date: string;
  end_date: string;
  pickup_location?: string;
  notes?: string;
}

export interface TicketDetails {
  event_id: string;
  event_name: string;
  quantity: number;
  attendee_names?: string[];
}

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

// Create a service booking
export async function createBooking(
  service: string,
  customerInfo: CustomerInfo,
  bookingDetails: BookingDetails,
  amount: number
) {
  try {
    const response = await fetch(`${API_URL}/create-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        service,
        customer_info: customerInfo,
        booking_details: bookingDetails,
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'cad'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create booking');
    }

    return await response.json();
  } catch (error) {
    console.error('Booking creation error:', error);
    throw error;
  }
}

// Create equipment rental
export async function createRental(
  equipment: string[],
  customerInfo: CustomerInfo,
  rentalDetails: RentalDetails,
  amount: number
) {
  try {
    const response = await fetch(`${API_URL}/create-rental`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        equipment,
        customer_info: customerInfo,
        rental_details: rentalDetails,
        amount: Math.round(amount * 100),
        currency: 'cad'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create rental');
    }

    return await response.json();
  } catch (error) {
    console.error('Rental creation error:', error);
    throw error;
  }
}

// Create event ticket purchase
export async function createTicket(
  eventId: string,
  customerInfo: CustomerInfo,
  ticketDetails: TicketDetails,
  amount: number
) {
  try {
    const response = await fetch(`${API_URL}/create-ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        event_id: eventId,
        customer_info: customerInfo,
        ticket_details: ticketDetails,
        amount: Math.round(amount * 100),
        currency: 'cad'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to purchase ticket');
    }

    return await response.json();
  } catch (error) {
    console.error('Ticket purchase error:', error);
    throw error;
  }
}

// Create payment intent for shop/digital products
export async function createPaymentIntent(
  amount: number,
  customerInfo: CustomerInfo,
  items: PaymentItem[]
) {
  try {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'cad',
        customer_info: customerInfo,
        items
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment intent creation error:', error);
    throw error;
  }
}

// Process payment with Stripe Elements
export async function processPayment(
  clientSecret: string,
  elements: any,
  stripe: any
) {
  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required'
    });

    if (error) {
      throw new Error(error.message);
    }

    return paymentIntent;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
}

export { stripePromise };
