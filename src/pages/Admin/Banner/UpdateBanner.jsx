import React, { useEffect } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const UpdateBanner = () => {
    useDocumentTitle('Cập nhật banner');
    useEffect(() => {}, []);
    return <div>UpdateBanner</div>;
};

export default UpdateBanner;
