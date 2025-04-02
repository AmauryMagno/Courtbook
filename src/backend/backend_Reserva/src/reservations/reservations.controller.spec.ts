import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ReservationsModule } from './reservations.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { getConnectionToken } from '@nestjs/mongoose'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { config } from 'dotenv'

config()

describe('ReservationsController (e2e)', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ReservationsModule,
        MongooseModule.forRoot(process.env.MONGO_URL_TESTE),
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    connection = moduleFixture.get<Connection>(getConnectionToken())
    await app.init()
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.collection('reservations').deleteMany({})
  })

  const createReservationDto: CreateReservationDto = {
    userId: 'user123',
    courtId: 'court123',
    date: '2025-04-02',
    time: '14:00',
    reservationPrice: 100,
  }

  it('/reservations (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)
      .expect(201)

    expect(response.body).toHaveProperty('_id')
    expect(response.body.userId).toBe(createReservationDto.userId)
  })

  it('/reservations (GET)', async () => {
    await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    const response = await request(app.getHttpServer())
      .get('/reservations')
      .expect(200)

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(1)
  })

  it('/reservations/:id (GET)', async () => {
    const { body: createdReservation } = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    const response = await request(app.getHttpServer())
      .get(`/reservations/${createdReservation._id}`)
      .expect(200)

    expect(response.body.userId).toBe(createReservationDto.userId)
  })

  it('/reservations/:id (PATCH)', async () => {
    const { body: createdReservation } = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    const updateReservationDto: UpdateReservationDto = { reservationPrice: 150 }

    const response = await request(app.getHttpServer())
      .patch(`/reservations/${createdReservation._id}`)
      .send(updateReservationDto)
      .expect(200)

    expect(response.body.reservationPrice).toBe(
      updateReservationDto.reservationPrice,
    )
  })

  it('/reservations/:id (DELETE)', async () => {
    const { body: createdReservation } = await request(app.getHttpServer())
      .post('/reservations')
      .send(createReservationDto)

    await request(app.getHttpServer())
      .delete(`/reservations/${createdReservation._id}`)
      .expect(200)

    const response = await request(app.getHttpServer())
      .get(`/reservations/${createdReservation._id}`)
      .expect(404)

    expect(response.body.message).toBe(
      `Reserva com ID ${createdReservation._id} não encontrada.`,
    )
  })
})
