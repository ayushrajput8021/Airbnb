import { Job, Worker } from 'bullmq';
import { MAILER_QUEUE } from '../queues/mailer.queue';
import { NotificationDto } from '../dtos/notification.dto';
import logger from '../config/logger.config';
import { getRedisClient } from '../config/redis.config';
import { MAILER_PAYLOAD } from '../producers/email.producer';

/**
 * @name setupMailerWorker
 * @description function to setup mailer worker
 */
export const setupMailerWorker = () => {
  const emailProcessor = new Worker<NotificationDto>(
    MAILER_QUEUE,
    async (job: Job<NotificationDto>) => {
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error('Invalid job name');
      }
      // TODO: Implement email sending logic
    },
    {
      connection: getRedisClient(),
    }
  );

  emailProcessor.on('completed', (job) => {
    logger.info(`Email sent to ${job.data.to} with subject ${job.data.subject}`);
  });

  emailProcessor.on('failed', (job, error) => {
    logger.error(`Email failed to send to ${job?.data.to} with subject ${job?.data.subject}`, error);
  });
};
