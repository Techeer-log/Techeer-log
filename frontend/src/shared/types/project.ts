export interface Writer {
  id: number;
  loginId: string;
  nickname: string;
  profileImageUrl: string;
}

// export interface MemberResponse {
//   id: number;
//   loginId: string;
//   nickname: string;
//   profileImageUrl: string;
// }

export enum ProjectMemberType {
  FRONTEND,
  BACKEND,
  LEADER,
}
export interface ProjectMember {
  name: string;
  memberId?: number;
  projectMemberTypeEnum: string;
}

export enum FrameworkType {
  FRONTEND,
  BACKEND,
}
export interface Framework {
  name: string;
  frameworkTypeEnum: string;
}

export interface ProjectData {
  id: number;
  mainImageUrl: string;
  title: string;
  subtitle: string;
  content: string;
  startDate: string;
  endDate: string;
  platform: string;
  projectTypeEnum: string;
  year: number;
  semesterEnum: string;
  projectStatusEnum: string;
  githubLink: string;
  blogLink: string;
  websiteLink: string;
  viewCount: number;
  loveCount: number;
  writer: Writer;
  projectTeamNameEnum: string;
  projectMemberResponseList: ProjectMember[];
  nonRegisterProjectMemberResponseList: ProjectMember[];
  frameworkResponseList: Framework[];
  loved: boolean;
  scraped: boolean;
}
