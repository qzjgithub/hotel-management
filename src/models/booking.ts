export type Booking = {
  id: string;
  hotelRoom: {
    _id: string;
    name: string;
    slug: string;
    price: number;
  };
  sights: {
    name: string;
    price: number;
    slug: string;
  },
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};
