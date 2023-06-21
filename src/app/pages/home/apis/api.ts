import service from '../../../utils/axiosServices';

export const getProfiles = () => {
  return service({
    url: '/experts',
    method: 'get',
  });
};
