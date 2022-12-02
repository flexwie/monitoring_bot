import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { TemplateOpts } from './template-opts.interface';
import { join } from 'path';

@Injectable()
export class TemplateService {

    private logger: Logger = new Logger(TemplateService.name)

  async template(name: string, opts?: TemplateOpts): Promise<string> {
    const file = await readFile(join(__dirname, "/assets", `${name}.md`));
    const regex = new RegExp(/{{(\w*)}}/g)

    let content = file.toString();
    const matches = content.matchAll(regex)

    for(const match of matches) {
        this.logger.debug(`Found templating match ${match}`)
        const value: string = opts[match[1]] as string
        content = content.replace(match[0], value)
    }

    return content;
  }
}
