import { Test, TestingModule } from '@nestjs/testing'
import { ReservationsService } from './reservations.service'
import { Reservation } from './schemas/reservation.schema' // Importando o modelo
import { getModelToken } from '@nestjs/mongoose' // Para obter o token do modelo
import { Model } from 'mongoose'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { NotFoundException } from '@nestjs/common'
import { UpdateReservationDto } from './dto/update-reservation.dto'

const mockReservationModel = {
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  find: jest.fn(),
}

describe('ReservationsService', () => {
  let reservationService: ReservationsService
  let reservationModel: Model<Reservation>

  const mockObjectReservation = {
    _id: '123',
    userId: '1',
    courtId: '10',
    date: '10/03/2025',
    reservationPrice: 100,
    time: '16:00',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getModelToken(Reservation.name),
          useValue: mockReservationModel,
        },
      ],
    }).compile()

    reservationService = module.get<ReservationsService>(ReservationsService)
    reservationModel = module.get<Model<Reservation>>(
      getModelToken(Reservation.name),
    )
  })

  afterEach(() => jest.clearAllMocks())

  it('should be defined', () => {
    expect(reservationService).toBeDefined()
  })

  it('should create a reservation', async () => {
    // Arrange
    const reservationDto: CreateReservationDto = {
      userId: '1',
      courtId: '10',
      date: '10/03/2025',
      reservationPrice: 100,
      time: '16:00',
    }

    const mockCreatedReservation = {
      _id: '123',
      ...reservationDto,
    }

    mockReservationModel.create.mockResolvedValue(mockCreatedReservation)

    // Act
    const result = await reservationService.create(reservationDto)

    // Assert
    expect(mockReservationModel.create).toHaveBeenCalledWith(reservationDto)
    expect(result).toEqual(mockCreatedReservation)
  })

  it('should throw an error when reservation creation fails', async () => {
    // Arrange
    const reservationDto: CreateReservationDto = {
      userId: '1',
      courtId: '10',
      date: '10/03/2025',
      reservationPrice: 100,
      time: '16:00',
    }
  
    mockReservationModel.create.mockRejectedValue(new Error('Database Error'))
  
    // Act & Assert
    await expect(reservationService.create(reservationDto)).rejects.toThrow('Database Error')
    expect(mockReservationModel.create).toHaveBeenCalledWith(reservationDto)
  })

  it('should return all reservations', async () => {
    // Arrange
    const mockReservations: Reservation[] = [
      {
        userId: '1',
        courtId: '10',
        date: '10/03/2025',
        reservationPrice: 100,
        time: '16:00',
        status: 'agendado'
      },
      {
        userId: '2',
        courtId: '15',
        date: '12/03/2025',
        reservationPrice: 150,
        time: '18:00',
        status: 'cancelado'
      },
    ]

    mockReservationModel.find.mockResolvedValue(mockReservations)

    // Act
    const result = await reservationService.findAll()

    // Assert
    expect(mockReservationModel.find).toHaveBeenCalled()
    expect(result).toEqual(mockReservations)
  })

  it('should return an empty array if no reservations exist', async () => {
    // Arrange
    mockReservationModel.find.mockResolvedValue([])

    // Act
    const result = await reservationService.findAll()

    // Assert
    expect(mockReservationModel.find).toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('should return one reservation', async () => {
    // Arrange
    const reservationId = '123'

    mockReservationModel.findById.mockResolvedValue(mockObjectReservation)

    // Act
    const result = await reservationService.findOne(reservationId)

    // Assert
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId)
    expect(result).toEqual(mockObjectReservation)
  })

  it('should throw NotFoundException when reservation not found', async () => {
    // Arrange
    const reservationId = 'non-existent-id'

    mockReservationModel.findById.mockResolvedValue(null)

    // Act and Assert --> Rejects Deve ser utilizado junto ao expect
    await expect(reservationService.findOne(reservationId)).rejects.toThrow(
      new NotFoundException(`Reserva com ID ${reservationId} não encontrada.`),
    )
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId)
  })

  it('should throw an error if an unexpected error occurs', async () => {
    //Arrange
    const reservationId = '123'

    mockReservationModel.findById.mockRejectedValue(new Error('database error'))

    //Act and Assert
    await expect(reservationService.findOne(reservationId)).rejects.toThrow(
      new Error('database error'),
    )
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId)
  })

  it('should be return a updated Reservation', async () => {
    //Arrange
    const reservationId = '123'
    const updateReservationDto: UpdateReservationDto = {
      reservationPrice: 150,
    }
    const mockUpdatedReservation = {
      _id: reservationId,
      userId: '1',
      courtId: '10',
      date: '10/03/2025',
      reservationPrice: 150,
      time: '16:00',
    }

    mockReservationModel.findByIdAndUpdate.mockResolvedValue(
      mockUpdatedReservation,
    )

    //Act
    const result = await reservationService.update(
      reservationId,
      updateReservationDto,
    )

    //Assert
    expect(result).toEqual(mockUpdatedReservation)
    expect(mockReservationModel.findByIdAndUpdate).toHaveBeenCalledWith(
      reservationId,
      updateReservationDto,
      { new: true },
    )
  })

  it('should throw NotFoundException when reservation not found', async () => {
    //Arrange
    const reservationId = 'non-existent-id'
    const updateReservationDto: UpdateReservationDto = {
      reservationPrice: 150,
    }

    mockReservationModel.findByIdAndUpdate.mockResolvedValue(null)

    //Act and Assert
    await expect(
      reservationService.update(reservationId, updateReservationDto),
    ).rejects.toThrow(
      new NotFoundException(`Reserva com ID ${reservationId} não encontrada.`),
    )
    expect(mockReservationModel.findByIdAndUpdate).toHaveBeenCalledWith(
      reservationId,
      updateReservationDto,
      { new: true },
    )
  })

  it('should throw an error if an unexpected error occurs', async () => {
    //Arrange
    const reservationId = '123'
    const updateReservationDto: UpdateReservationDto = {
      reservationPrice: 150,
    }

    mockReservationModel.findByIdAndUpdate.mockRejectedValue(
      new Error('database error'),
    )

    //Act and Assert
    await expect(
      reservationService.update(reservationId, updateReservationDto),
    ).rejects.toThrow(new Error('database error'))
    expect(mockReservationModel.findByIdAndUpdate).toHaveBeenCalledWith(
      reservationId,
      updateReservationDto,
      { new: true },
    )
  })

  it('should return a success message when reservation is deleted', async () => {
    // Arrange
    const reservationId = '123'
    const mockDeletedReservation = { _id: reservationId }

    mockReservationModel.findByIdAndDelete.mockResolvedValue(
      mockDeletedReservation,
    )

    // Act
    const result = await reservationService.remove(reservationId)

    // Assert
    expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith(
      reservationId,
    )
    expect(result).toEqual({ message: 'Reserva deletada com sucesso' })
  })

  it('should throw NotFoundException when reservation not found', async () => {
    //Arrange
    const reservationId = 'non-existent-id'

    mockReservationModel.findByIdAndDelete.mockResolvedValue(null)

    //Act and Assert
    await expect(reservationService.remove(reservationId)).rejects.toThrow(
      new NotFoundException(`Reserva com ID ${reservationId} não encontrada.`),
    )
    expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith(
      reservationId,
    )
  })

  it('should throw an error if an unexpected error occurs', async () => {
    //Arrange
    const reservationId = '123'

    mockReservationModel.findByIdAndDelete.mockRejectedValue(
      new Error('database error'),
    )

    //Act and Assert
    await expect(reservationService.remove(reservationId)).rejects.toThrow(
      new Error('database error'),
    )
    expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith(
      reservationId,
    )
  })
})
