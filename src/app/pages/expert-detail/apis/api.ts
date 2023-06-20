import service from '../../../utils/axiosServices';

export const getExpertDetals = (params: any) => {
  return service({
    url: `/experts/${params?.email}`,
    method: 'get',
  });
};
