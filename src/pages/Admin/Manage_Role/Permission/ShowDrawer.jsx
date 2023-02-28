import { Button, Drawer } from 'antd';
import { useEffect, useState } from 'react';

const ShowDrawer = ({ open, onClose, action }) => {
    const HanldClose = () => {
        onClose({
            open: false,
            action: '',
        });
    };
    return (
        <div>
            <Drawer title="dá" placement="right" width="40%" onClose={HanldClose} open={open}>
                {/* {(action === 'Created' && '') || (action === 'Edit' &&'')} */}
                ok
            </Drawer>
        </div>
    );
};

export default ShowDrawer;
