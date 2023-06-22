import service from '../../../utils/axiosServices';

export const getProfiles = () => {
  return service({
    url: '/me/profile',
    method: 'get',
  });
};

export const updateProfiles = (data: any) => {
  return service({
    url: '/me/profile',
    method: 'post',
    data,
  });
};
export const udpateWallet = (data: any) => {
  return service({
    url: '/me/profile/wallet-address',
    method: 'put',
    data,
  });
};

export const createCertificate = (data: any) => {
  return service({
    url: '/me/profile/certificate',
    method: 'post',
    data,
  });
};
export const createExperience = (data: any) => {
  return service({
    url: '/me/profile/experience',
    method: 'post',
    data,
  });
};
export const createSpecialty = (data: any) => {
  return service({
    url: '/me/profile/specialty',
    method: 'post',
    data,
  });
};
