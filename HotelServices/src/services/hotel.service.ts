import { createHotel, getHotelById } from '../repositories/hotel.repository';
import { createHotelDTO } from '../dto/hotel.dto';

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}
