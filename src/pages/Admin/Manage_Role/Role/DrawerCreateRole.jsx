import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import CreateRole from './CreateRole';
import EditRole from './EditRole';

const DrawerCreateRole = ({ open, onClose, action ,id}) => {
    const HanldClose = () => {
        onClose({
            open:false,
            action:''
        });
    };
    return (
        <>
            <Drawer title={action} placement="right" width="40%" onClose={HanldClose} open={open}>
                {action === 'Create'&&<CreateRole action />||action === 'Edit'&&<EditRole id={id} />}
            </Drawer>
        </>
    );
};

export default DrawerCreateRole;
