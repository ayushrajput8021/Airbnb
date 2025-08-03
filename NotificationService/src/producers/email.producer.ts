import { NotificationDto } from '../dtos/notification.dto';
import { mailerQueue } from '../queues/mailer.queue';
import logger from '../config/logger.config';

export const MAILER_PAYLOAD = 'payload:mail';

/**
 * @name addEmailToQueue
 * @description function to add email to queue
 * @param payload
 */
export const addEmailToQueue = async (payload: NotificationDto) => {
  await mailerQueue.add(MAILER_PAYLOAD, payload);
  logger.info(`Email added to queue: ${JSON.stringify(payload)}`);
};
