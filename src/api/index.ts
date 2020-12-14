import { IWebsiteGenerator } from './api.types';
import packageJson from '../../package.json';
import graphqlSchema from '../graphql';

// @ts-ignore
import { injectable, inject } from 'inversify';
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
  _publisher;
  _graphqlAPI;
  
  constructor(
    @inject(Symbol.for("blob")) blob,
    @inject(Symbol.for("hive")) hive,
    @inject(Symbol.for("task-queue")) taskQueue,
    @inject(Symbol.for("utils")) utils,
    @inject(Symbol.for("@honeyworks/publisher")) publisher,
    @inject(Symbol.for('graphql')) graphql,
  ) {
    this._blob = blob;
    this._hive = hive;
    this._taskQueue = taskQueue;
    this._utils = utils;
    this._publisher = publisher;
    this._graphqlAPI = graphql;

    this.outputPath = path.join(
      utils.connectionsPath,
      'honeyworks-reader-gatsby',
      'public',
    );
  }

  init() {
    this._graphqlAPI.registerSchema(graphqlSchema);
  }

  async build(hiveId) {
    this._taskQueue.update('Generating the hummReader static website');

    const readerPath = path.resolve(this.outputPath, '..');
    const hive = await this._hive.get(hiveId);

    const documents = await this._publisher.document.list(hive.id);

    const pubicDocs = documents.filter(doc => doc.isPublic);
    const indexJSON = pubicDocs.map(d => ({
      title: d.title,
      slug: d.slug,
      date: d.publishedAt,
      summary: JSON.parse(d.body).find(
        e => e.type === 'p' && e.children[0].text !== '',
      ).children[0].text,
    }));

    const contentPath = path.join(readerPath, 'content');
    const staticPath = path.join(readerPath, 'static');

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

    const connectionsPathEscaped = this._utils.connectionsPath.replace(
      /(\s+)/g,
      '\\$1',
    );

    let gatsbyPath = path.resolve(connectionsPathEscaped, 'honeyworks-reader-gatsby', 'node_modules', '.bin', 'gatsby');

    // TODO
    // if (window.process.platform === 'win32') {
    //   gatsbyPath = path.join(connectionsPathEscaped, 'gatsby.cmd');
    // }
    
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
