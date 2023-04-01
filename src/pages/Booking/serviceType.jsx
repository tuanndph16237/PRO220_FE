import React, { useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { getApiService } from '../../api/service';
import _ from 'lodash';

const { Panel } = Collapse;

const ServiceType = ({ serviceSelect, getService, handleEmpty }) => {
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 10,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
    };
    const [listValue, setListValue] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const dataService = await getApiService();
        const handleData = dataService.data.filter((service) => _.size(service.serviceTypes) == 0);
        setListValue(handleData);
    };
    return (
        <div>
            <Collapse
                className="border-[#02b875] "
                bordered={true}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{ background: token.colorBgContainer }}
            >
                <Panel
                    header={serviceSelect?.serviceName || 'Loại dịch vụ'}
                    key="1"
                    className="!border-b-[#02b875] "
                    style={panelStyle}
                >
                    <div className="flex gap-2 flex-wrap">
                        {listValue.map((service) => (
                            <div
                                key={service._id}
                                className={`${
                                    service == serviceSelect ? 'border-[#02b875] ' : 'border-dotted border-[#b0b8b5]'
                                }
                                          p-1 cursor-pointer rounded-md border  min-w-[120px] flex flex-col justify-center items-center`}
                                onClick={() => {
                                    getService(service);
                                    handleEmpty(false);
                                }}
                            >
                                <img src={service.icon} className="w-5 h-5" />
                                <p className="text-center font-bold">{service.serviceName}</p>
                            </div>
                        ))}
                    </div>
                </Panel>
            </Collapse>
            {/* {isTypeService && (
                <span className="text-red-500">Quý khách vui lòng không để trống trường thông tin này.</span>
            )} */}
        </div>
    );
};

export default ServiceType;
