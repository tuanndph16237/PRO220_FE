import { Drawer } from 'antd';
import CreatePermission from './CreatePermission';
import EditPermission from './EditPermission';

const ShowDrawer = ({ open, onClose, action, id }) => {
    const HanldClose = () => {
        onClose({
            open: false,
            action: '',
        });
    };
    return (
        <div>
            <Drawer title={action} placement="right" width="40%" onClose={HanldClose} open={open}>
                {(action === 'Create' && <CreatePermission action onClose={onClose} />) ||
                    (action === 'Edit' && <EditPermission id={id} onClose={onClose} />)}
            </Drawer>
        </div>
    );
};

export default ShowDrawer;
