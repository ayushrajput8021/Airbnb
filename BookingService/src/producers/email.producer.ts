import { mailerQueue } from '../queues/email.queue';
import logger from '../config/logger.config';
import { NotificationDto } from '../dtos/notification.dto';

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
