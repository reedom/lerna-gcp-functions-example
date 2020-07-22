import { promises as fs } from 'fs';
import path from 'path';
import moment from 'moment';

async function walk(dir: string) {
  let files = await fs.readdir(dir);
  const dirs = await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      const dirs = (file !== 'node_modules') ? [filePath] : [];
      const subdirs = await walk(filePath);
      return subdirs ? dirs.concat(subdirs) : dirs;
    }
  }));
  return dirs.filter(x => x).reduce((all, entries) => all.concat(entries), []);
}

export function createHandler(name: string) {
  console.log('createHandler', name);
  return async (req, res) => {
    console.log('Start at', moment().format('HH:mm:ss.SSS'));
    const dirs = await walk('.');
    const ret = JSON.stringify(dirs, null, 2);
    res
      .set('Content-Type', 'text/plain')
      .send(`Run by ${name}\n\n${ret}`);
    console.log('End at', moment().format('HH:mm:ss.SSS'));
  };
}
