import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { Reservation } from './schemas/reservation.schema'; // Importando o modelo
import { getModelToken } from '@nestjs/mongoose'; // Para obter o token do modelo
import { Model } from 'mongoose';

describe('ReservationsService', () => {
  let reservationService: ReservationsService;
  let mockReservation: any

  beforeEach(async () => {
    mockReservation = {
      create: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Reservation',
      }),
      findOne: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test Reservation',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getModelToken(Reservation.name), 
          useValue: mockReservation,
        },
      ],
    }).compile();

    reservationService = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(reservationService).toBeDefined();
  });

});
