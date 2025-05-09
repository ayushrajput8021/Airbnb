import express from 'express';
import {
  createHotelHandler,
  deleteHotelByIdHandler,
  getHotelByIdHandler,
  getAllHotelsHandler,
  updateHotelByIdHandler,
} from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { HotelSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(HotelSchema), createHotelHandler);

hotelRouter.get('/:id', getHotelByIdHandler);

hotelRouter.put('/:id', validateRequestBody(HotelSchema), updateHotelByIdHandler);

hotelRouter.delete('/:id', deleteHotelByIdHandler);

hotelRouter.get('/', getAllHotelsHandler);

export default hotelRouter;
