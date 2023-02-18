import { useLocation } from 'react-router-dom';

export const useGetParam = (param) => {
    const { search } = useLocation();
    const result = new URLSearchParams(search).get(param) || '';
    return [result];
};
