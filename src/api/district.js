import instance from './instance';

const URL = '/district';

export const getDistrict = () => {
    return instance.get(URL, {});
};
