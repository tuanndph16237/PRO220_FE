import { useEffect } from 'react';

const useDocumentTitle = (title = 'Dodoris - Sửa chữa và bảo dưỡng xe chuyên nghiệp') => {
    useEffect(() => {
        document.title = `Dodoris - ${title}`;
    }, [title]);

    return null;
};

export default useDocumentTitle;
