import { IsString,IsDateString, IsInt, IsNotEmpty } from "class-validator"

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  courtId: string

  @IsDateString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  time: string

  @IsInt()
  @IsNotEmpty()
  reservationPrice: number
}
