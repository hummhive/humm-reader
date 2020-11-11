export interface IWebsiteGenerator {
  packageName: string
  outputPath: string;
  build(hiveId: string): Promise<void>;
}