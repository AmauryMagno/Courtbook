import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Reservation, ReservationDocument } from './schemas/reservation.schema'
import { Model } from 'mongoose'
import { errorCodes } from '../utils/errorCodeNest'

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      const newReservation = new this.reservationModel({
        userId: createReservationDto.userId,
        courtId: createReservationDto.courtId,
        date: createReservationDto.date,
        time: createReservationDto.time,
        reservationPrice: createReservationDto.price,
      })
      return await newReservation.save()
    } catch (error) {
      if (error.code === errorCodes.uniqueIndexErrorCode) {
        throw new ConflictException(
          'Já existe uma reserva para essa quadra nesse horário.',
        )
      }
      throw error
    }
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec()
  }

  findOne(id: string): Promise<Reservation> {
    const reservation = this.reservationModel.findById(id).exec()
    if (!reservation)
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`)
    return reservation
  }

  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const updatedReservation = await this.reservationModel
      .findByIdAndUpdate(id, updateReservationDto, { new: true })
      .exec();

    if (!updatedReservation) throw new NotFoundException(`Reserva com ID ${id} não encontrada.`);
    return updatedReservation;
  }


  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.reservationModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Reserva com ID ${id} não encontrada.`);
    return { message: 'Reserva removida com sucesso.' };
  }
}
