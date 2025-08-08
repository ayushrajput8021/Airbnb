import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import logger from '../config/logger.config';
import { InternalServerError } from '../utils/errors/app.error';

export async function renderMailTemplate(templateId: string, params: Record<string, any>): Promise<string> {
  const templatePath = path.join(__dirname, 'mailer', `${templateId}.hbs`);

  try {
    const content = await fs.promises.readFile(templatePath, 'utf8');
    const finalContent = handlebars.compile(content);
    return finalContent(params);
  } catch (error) {
    logger.error(`Error reading template file: ${templatePath}`, error);
    throw new InternalServerError(`Error reading template file: ${templatePath}`);
  }
}
