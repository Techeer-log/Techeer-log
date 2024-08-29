import { Framework, ProjectData, ProjectMember } from './project.ts';

export interface ProjectType {
  title: string;
  subtitle: string;
  content: string;
  startDate: string;
  endDate: string;
  platform: string;
  projectType: string;
  year: number;
  semester: string;
  projectStatus: string;
  githubLink: string;
  blogLink: string;
  websiteLink: string;
  mainImageUrl: string;
  projectMemberRequestList: ProjectMember[];
  nonRegisterProjectMemberRequestList: ProjectMember[];
  frontprojectMemberList: string[];
  backprojectMemberList: string[];
  leader: string;

  frontframeworkRequestList: string[];
  backframeworkRequestList: string[];

  frameworkResponseList: Framework[];

  changeplatform: (value: string) => void;
  changeprojectType: (value: string) => void;
  changeyear: (value: any) => void;
  changeprojectStatus: (value: any) => void;
  changegithubLink: (value: any) => void;
  changeblogLink: (value: any) => void;
  changewebsiteLink: (value: any) => void;
  changesemester: (value: any) => void;
  changefrontframeworkRequestList: (value: any) => void;
  changebackframeworkRequestList: (value: any) => void;
  changefrontprojectMemberList: (value: any) => void;
  changebackprojectMemberList: (value: any) => void;
  changeleader: (value: any) => void;
  changeTitle: (value: any) => void;
  changeSubtitle: (value: any) => void;
  changestartDate: (value: any) => void;
  changeendDate: (value: any) => void;
  changenonRegisterProjectMemberRequestList: (value: any) => void;
  changeframeworkResponseList: (value: any) => void;
  changecontent: (value: any) => void;
  setProjectData: (data: ProjectData) => void;
  resetStore: () => void; // 추가된 부분
}
