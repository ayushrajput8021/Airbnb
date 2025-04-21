import logger from '../config/logger.config';
import Hotel from '../db/models/hotel';
import { createHotelDTO } from '../dto/hotel.dto';
import { NotFoundError } from '../utils/errors/app.error';

export async function createHotel(hotelData: createHotelDTO) {
  const hotel = await Hotel.create({
    name: hotelData.name,
    address: hotelData.address,
    location: hotelData.location,
    rating: hotelData.rating,
    ratingCount: hotelData.ratingCount,
  });
  logger.info(`Hotel created successfully: ${hotel.id}`);
  return hotel;
}

export async function getHotelById(id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    throw new NotFoundError('Hotel not found');
  }
  return hotel;
}

export async function updateHotelById(id: number, hotelData: createHotelDTO) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    throw new NotFoundError('Hotel not found');
  }
  await hotel.update(hotelData);
  return hotel;
}

export async function deleteHotelById(id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    throw new NotFoundError('Hotel not found');
  }
  await hotel.destroy();
}

export async function getHotels() {
  const hotels = await Hotel.findAll();
  return hotels;
}
