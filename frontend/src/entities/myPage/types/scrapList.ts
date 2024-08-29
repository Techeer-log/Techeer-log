import { Framework } from '../../../shared/types/project.ts';

//Scrap 타입 정의
export interface Scrap {
  projectId: number;
  mainImageUrl: string;
  title: string;
  subtitle: string;
  frameworkResponseList: Framework[];
  scraped: boolean;
  serviceRunning: boolean;
}

//ScrapList 타입 정의
export interface ScrapList {
  data: Scrap[];
}
