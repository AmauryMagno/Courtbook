import { User } from "./user.interface";

export interface Reservation {
  _id: string;
  userId: string;
  courtId: string;
  date: string;
  time: string;
  status: string;
  reservationPrice: number;
  user: User;
}

export interface CardReservationProps {
  reservation: Reservation;
}
