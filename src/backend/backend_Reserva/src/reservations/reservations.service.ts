import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Reservation, ReservationDocument } from './schemas/reservation.schema'
import mongoose, { Model } from 'mongoose'
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
      const newReservation = await this.reservationModel.create({
        userId: createReservationDto.userId,
        courtId: createReservationDto.courtId,
        date: createReservationDto.date,
        time: createReservationDto.time,
        reservationPrice: createReservationDto.reservationPrice,
      })
      return newReservation
    } catch (error) {
      if (error.code === errorCodes.uniqueIndexErrorCode) {
        throw new ConflictException(
          'Já existe uma reserva para essa quadra nesse horário.',
        )
      }
      throw error
    }
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationModel.find()
  }

  async findOne(id: string): Promise<Reservation> {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException({ message: 'Id inválido' })
    }

    const reservation = await this.reservationModel.findById(id)
    if (!reservation) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`)
    }
    return reservation
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const updatedReservation = await this.reservationModel.findByIdAndUpdate(
      id,
      updateReservationDto,
      { new: true },
    )

    if (!updatedReservation)
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`)

    return updatedReservation
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.reservationModel.findByIdAndDelete(id)
    if (!deleted)
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`)
    return { message: 'Reserva deletada com sucesso' }
  }
}
