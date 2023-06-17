import service from '../../../utils/axiosServices';

export const getProfiles = () => {
  return service({
    url: '/me/profile',
    method: 'get',
  });
};
