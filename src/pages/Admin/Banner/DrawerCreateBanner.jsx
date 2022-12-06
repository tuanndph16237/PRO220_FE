import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const DrawerCreateBanner = ({ open, onClose }) => {
    const showDrawer = () => {};
    const handleClose = () => {
        onClose(false);
    };
    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={handleClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};
export default DrawerCreateBanner;
