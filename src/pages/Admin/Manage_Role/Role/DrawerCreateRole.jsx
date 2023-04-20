import { Drawer } from 'antd';
import CreateRole from './CreateRole';
import EditRole from './EditRole';

const DrawerCreateRole = ({ open, onClose, action, id }) => {
    const HanldClose = () => {
        onClose({
            open: false,
            action: '',
        });
    };
    return (
        <>
            <Drawer
                title={action === 'Create' ? 'Thêm vai trò' : 'Cập nhật vai trò'}
                placement="right"
                width="40%"
                onClose={HanldClose}
                open={open}
            >
                {(action === 'Create' && <CreateRole action onClose={onClose} />) ||
                    (action === 'Edit' && <EditRole id={id} onClose={onClose} />)}
            </Drawer>
        </>
    );
};

export default DrawerCreateRole;
