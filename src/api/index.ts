import { IWebsiteGenerator } from './api.types';
import packageJson from '../../package.json';

const { injectable, inject } = window.require('inversify');
const { promisify } = window.require('util');
const childProcess = window.require('child_process');
const exec = promisify(childProcess.exec);
const fs = window.require('fs-extra');
const path = window.require('path');

@injectable()
export default class HummReader implements IWebsiteGenerator {
  packageName: string = packageJson.connectionDefinition.packageName;
  outputPath: string;

  _blob;
  _hive;
  _taskQueue;
  _utils;
  
  constructor(
    @inject(Symbol.for("blob")) blob,
    @inject(Symbol.for("hive")) hive,
    @inject(Symbol.for("task-queue")) taskQueue,
    @inject(Symbol.for("utils")) utils
  ) {
    this._blob = blob;
    this._hive = hive;
    this._taskQueue = taskQueue;
    this._utils = utils;

    this.outputPath = path.join(
      utils.connectionsNodeModulesPath,
      this.packageName,
      'public',
    );
  }
  async build(hiveId) {
    this._taskQueue.update('Generating the hummReader static website');

    const readerPath = path.resolve(this.outputPath, '..');
    console.log(readerPath)
    const hive = await this._hive.get(hiveId);

    ////////////////////////////// TODO ////////////////////////////////
    // const {
    //   documents,
    // } = await window.api.connections.hummPublisher.document.list(hive.id);

    const documents = [];
    const pubicDocs = documents.filter(doc => doc.isPublic);
    const indexJSON = pubicDocs.map(d => ({
      title: d.title,
      slug: d.slug,
      date: d.publishedAt,
    }));

    const contentPath = path.join(readerPath, 'src', 'gatsby', 'content');
    const staticPath = path.join(readerPath, 'src', 'gatsby', 'static');

    if (fs.existsSync(contentPath))
      fs.rmdirSync(contentPath, { recursive: true });
    if (fs.existsSync(staticPath)) fs.rmdirSync(staticPath, { recursive: true });

    fs.mkdirSync(contentPath);
    fs.mkdirSync(staticPath);

    // create an index of all documents
    fs.writeFileSync(
      path.join(contentPath, 'index.json'),
      JSON.stringify(indexJSON),
      'utf-8',
    );

    // pass gatsby information about the hive
    fs.writeFileSync(
      path.join(contentPath, 'hive-config.json'),
      JSON.stringify(hive),
      'utf-8',
    );

    pubicDocs.forEach(doc => {
      // copy the json for each doc
      fs.writeFileSync(
        path.join(contentPath, `${doc.slug}.json`),
        JSON.stringify(doc),
        'utf-8',
      );

      // copy blobs
      doc.blobs.forEach(blob => {
        const blobPath = this._blob.getPath(blob, hive.id);
        fs.copyFileSync(blobPath, path.join(staticPath, blob));
      });
    });

    const nodeModulesPathEscaped = this._utils.connectionsNodeModulesPath.replace(
      /(\s+)/g,
      '\\$1',
    );

    let gatsbyPath = `${nodeModulesPathEscaped}/.bin/gatsby`;

    if (window.process.platform === 'win32') {
      gatsbyPath = path.join(nodeModulesPathEscaped, 'gatsby.cmd');
    }

    await exec(`${gatsbyPath} clean`, {
      cwd: readerPath,
      env: window.process.env,
    });
    await exec(`${gatsbyPath} build`, {
      cwd: readerPath,
      env: window.process.env,
    });

    return path.join(readerPath, 'public');
  };
}
