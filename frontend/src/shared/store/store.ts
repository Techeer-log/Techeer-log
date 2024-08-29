import create from 'zustand';
import { ProjectType } from '../types/projectStore.ts';

const initialState = {
  //초기 상태 정의
  title: '',
  subtitle: '',
  content: '',
  mainImageUrl: '',
  startDate: '',
  endDate: '',
  platform: '웹',
  projectType: '부트캠프',
  year: 2024,
  semester: '하계',
  projectStatus: '서비스 운영 중',
  githubLink: '',
  blogLink: '',
  websiteLink: '',
  projectMemberRequestList: [],
  nonRegisterProjectMemberRequestList: [],
  leader: '',
  frontprojectMemberList: [],
  backprojectMemberList: [],
  frameworkResponseList: [],
  frontframeworkRequestList: [],
  backframeworkRequestList: [],
};

const useStore = create<ProjectType>((set) => ({
  ...initialState,

  changeTitle: (value: any) =>
    set({
      title: value,
    }),
  changeSubtitle: (value: any) =>
    set({
      subtitle: value,
    }),
  changecontent: (value: any) =>
    set({
      content: value,
    }),

  changestartDate: (value: any) =>
    set({
      startDate: value,
    }),
  changeendDate: (value: any) =>
    set({
      endDate: value,
    }),
  changeplatform: (value: string) =>
    set({
      platform: value,
    }),
  changeprojectType: (value: string) =>
    set({
      projectType: value,
    }),
  changeyear: (value: any) =>
    set({
      year: value,
    }),
  changesemester: (value: any) =>
    set({
      semester: value,
    }),
  changeprojectStatus: (value: any) =>
    set({
      projectStatus: value,
    }),
  changegithubLink: (value: any) =>
    set({
      githubLink: value,
    }),
  changeblogLink: (value: any) =>
    set({
      blogLink: value,
    }),
  changewebsiteLink: (value: any) =>
    set({
      websiteLink: value,
    }),

  changenonRegisterProjectMemberRequestList: (value: any) =>
    set({
      nonRegisterProjectMemberRequestList: value,
    }),
  changeleader: (value: any) =>
    set({
      leader: value,
    }),
  changefrontprojectMemberList: (value: any) =>
    set({
      frontprojectMemberList: value,
    }),
  changebackprojectMemberList: (value: any) =>
    set({
      backprojectMemberList: value,
    }),

  changeframeworkResponseList: (value: any) =>
    set({
      frameworkResponseList: value,
    }),
  changefrontframeworkRequestList: (value: any) =>
    set({
      frontframeworkRequestList: value,
    }),
  changebackframeworkRequestList: (value: any) =>
    set({
      backframeworkRequestList: value,
    }),

  setProjectData: (data) =>
    set({
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      mainImageUrl: data.mainImageUrl,
      startDate: data.startDate,
      endDate: data.endDate,
      platform: data.platform,
      projectType: data.projectTypeEnum,
      year: data.year,
      semester: data.semesterEnum,
      projectStatus: data.projectStatusEnum,
      githubLink: data.githubLink,
      blogLink: data.blogLink,
      websiteLink: data.websiteLink,

      projectMemberRequestList: data.projectMemberResponseList || [],
      nonRegisterProjectMemberRequestList: data.nonRegisterProjectMemberResponseList || [],

      leader:
        data.nonRegisterProjectMemberResponseList.find((member) => member.projectMemberTypeEnum === 'LEADER')?.name ||
        '',
      frontprojectMemberList:
        data.nonRegisterProjectMemberResponseList
          .filter((member) => member.projectMemberTypeEnum === 'FRONTEND')
          .map((item) => item.name) || [],
      backprojectMemberList:
        data.nonRegisterProjectMemberResponseList
          .filter((member) => member.projectMemberTypeEnum === 'BACKEND')
          .map((item) => item.name) || [],

      frameworkResponseList: data.frameworkResponseList || [],
      frontframeworkRequestList:
        data.frameworkResponseList.filter((framework) => framework.frameworkTypeEnum === 'FRONTEND').map((item) => item.name) || [],
      backframeworkRequestList:
        data.frameworkResponseList.filter((framework) => framework.frameworkTypeEnum === 'BACKEND').map((item) => item.name) || [],
    }),

  resetStore: () =>
    set({
      ...initialState,
    }),
}));

export default useStore;
