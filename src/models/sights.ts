type TimeSlot = {
  _key: string;
  startTime: string;
  endTime: string;
};

export type Sights = {
  id: string;
  coverImage: string;
  description: string;
  dimension: string;
  discount: number;
  images: string[];
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  duration: number;
  timeSlots: TimeSlot[];
  price: number;
  slug: string;
  ticketNotice: string;
  specialNote: string;
  subtopics: string[];
  bookings: any[];
};

export type CreateBookingDto = {
  user: string;
  sights: string;
  checkinDate: string;
  adults: number;
  children: number;
  totalPrice: number;
  timeSlot: TimeSlot;
  discount: number;
};
