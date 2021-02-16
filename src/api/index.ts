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
  graphqlSchema = graphqlSchema;

  _blob;
  _hive;
  _taskQueue;
  _utils;
  _publisher;
  _dataBridgeFactory;
  
  constructor(
    @inject(Symbol.for("blob")) blob,
    @inject(Symbol.for("hive")) hive,
    @inject(Symbol.for("task-queue")) taskQueue,
    @inject(Symbol.for("utils")) utils,
    @inject(Symbol.for("@honeyworks/publisher")) publisher,
    @inject(Symbol.for('graphql')) graphql,
    @inject('Factory<data-bridge>') dataBridgeFactory,
  ) {
    this._blob = blob;
    this._hive = hive;
    this._taskQueue = taskQueue;
    this._utils = utils;
    this._publisher = publisher;
    this._dataBridgeFactory = dataBridgeFactory;

    this.outputPath = path.join(
      utils.connectionsPath,
      'honeyworks-reader-gatsby',
      'public',
    );
  }

  async build(hiveId) {
    this._taskQueue.update('Generating the hummReader static website');

    const readerPath = path.resolve(this.outputPath, '..');
    const hive = await this._hive.get(hiveId);

    const factory = this._dataBridgeFactory(hive.id);
    const dataBridgeAPI = await factory();

    const contentPath = path.join(readerPath, 'config');
    const staticPath = path.join(readerPath, 'static');

    if (fs.existsSync(contentPath))
      fs.rmdirSync(contentPath, { recursive: true });
    if (fs.existsSync(staticPath)) fs.rmdirSync(staticPath, { recursive: true });

    fs.mkdirSync(contentPath);
    fs.mkdirSync(staticPath);

    // create an index of all documents
    const coreData = {
      hivePublicKey: hive.signingPublicKey,
      addInboxDataEndpoint: dataBridgeAPI.getAddInboxDataEndpoint(),
      listDataEndpoint: dataBridgeAPI.getListDataEndpoint(),
      getDataEndpoint: dataBridgeAPI.getGetDataEndpoint(),
    };
  
    fs.writeFileSync(
      path.join(contentPath, 'coreData.json'),
      JSON.stringify(coreData),
      'utf-8',
    );

    const connectionsPathEscaped = this._utils.connectionsPath.replace(
      /(\s+)/g,
      '\\$1',
    );

    let gatsbyPath = path.resolve(connectionsPathEscaped, 'honeyworks-reader-gatsby', 'node_modules', '.bin', 'gatsby');
    
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
