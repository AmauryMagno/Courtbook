import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'

export type ReservationDocument = HydratedDocument<Reservation>

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  courtId: string

  @Prop({ required: true })
  date: string

  @Prop({ required: true })
  time: string

  @Prop({ default: 'agendado', enum: ['agendado', 'concluido', 'cancelado'] })
  status: string

  @Prop({ required: true })
  reservationPrice: number
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)

ReservationSchema.index({ courtId: 1, date: 1, time: 1 }, { unique: true })
