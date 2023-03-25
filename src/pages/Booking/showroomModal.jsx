import React, { useEffect, useRef, useState } from 'react';
import { Button, Select, Input, Empty } from 'antd';
import { getDistrict } from '../../api/district';
import _ from 'lodash';
import { findNearShowroom, searchInListShowroom } from '../../api/showroom';

const ShowroomModal = ({ setSelectShowroom }) => {
    const [zone, setZone] = useState([]);
    const [selectZone, setSelectZone] = useState('----chọn tất cả-------');
    const [dataToPreview, setDataToPreview] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isData, setIsData] = useState(true);

    const fetchAPIFilter = async () => {
        const getDataSearch = await searchInListShowroom({
            district: selectZone == '----chọn tất cả-------' ? '' : selectZone,
            address: searchText,
        });
        if (_.isEmpty(getDataSearch.data)) {
            setDataToPreview([]);
            setIsData(false);
        } else {
            setDataToPreview(getDataSearch.data);
            setIsData(true);
        }
    };

    const fetchApiDistrict = async () => {
        try {
            const dataDistrict = await getDistrict();
            setZone(dataDistrict.data);
        } catch (error) {}
    };

    const findUserLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let latitude = position.coords.latitude.toString();
            let longitude = position.coords.longitude.toString();
            let dist = 2000;
            const dataUserNearBy = await findNearShowroom({ latitude, longitude, dist });
            if (_.isEmpty(dataUserNearBy.data)) {
                setDataToPreview([]);
                setIsData(false);
            } else {
                setDataToPreview(dataUserNearBy.data);
                setIsData(true);
            }
        });
    };

    useEffect(() => {
        fetchApiDistrict();
    }, []);

    useEffect(() => {
        fetchAPIFilter();
    }, [selectZone, searchText]);

    return (
        <div className="mt-6">
            <p className="flex justify-center font-bold text-lg py-2">Chọn chi nhánh</p>
            <div>
                {/* selectiom */}
                <Select
                    size="large"
                    className="h-10 w-full text-base border-[#02b875]"
                    defaultValue="----chọn tất cả----"
                    onSelect={(value) => setSelectZone(value)}
                    value={selectZone}
                >
                    {_.map(zone, (district) => (
                        <Select.Option value={district._id} key={district._id} label={district.name}>
                            <div span={24}>
                                <div span={24}>
                                    <span className="text-base font-medium text-[#02b875]">{district.name}</span>
                                </div>
                            </div>
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div>
                <p className="font-bold text-lg py-3">Khu vực:</p>
                <div className="flex flex-wrap gap-2 ">
                    {_.map(zone, (district) => (
                        <Button type="primary" key={district._id} onClick={() => setSelectZone(district._id)}>
                            {district.name}
                        </Button>
                    ))}
                    <Button type="primary" onClick={() => findUserLocation()}>
                        Cửa Hàng Gần Nhất ( 2km )
                    </Button>
                </div>
            </div>
            <div>
                <p className="font-bold text-lg py-3">Địa chỉ:</p>
                <Input
                    placeholder="Tìm kiếm cửa hàng"
                    className="h-10 border-[#02b875]"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <hr className="my-1" />
                <div className="w-full h-60  overflow-y-scroll">
                    <div>
                        {_.map(dataToPreview, (viewShowroom) => (
                            <div
                                key={viewShowroom._id}
                                onClick={() => setSelectShowroom(viewShowroom)}
                                className="my-3 grid grid-cols-5 place-items-center cursor-pointer"
                            >
                                <img src={viewShowroom.images[0]} alt="" className="w-[50px] h-[50px]" />
                                <div className="col-span-4">
                                    <span className="font-bold text-[16px]">{viewShowroom.address}</span>
                                    <p>Hệ thống sửa chữa xe máy Dodoris</p>
                                </div>
                            </div>
                        ))}
                        {isData || (
                            <div className="py-4">
                                <Empty description={<p>không có dữ liệu</p>} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowroomModal;
