import React, { useState, useEffect, Fragment, useRef } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { warehouseSearch } from '../../../api/warehouse';
import { InputNumber, Select, Tooltip } from 'antd';
import ModalCustomize from '../../../components/Customs/ModalCustomize';

const SelectMaterials = (props) => {
    const materialsDefault = useSelector((state) => state.warehouse.materials.value);
    const [materials, setMaterials] = useState([]);
    const [materialIds, setMaterialIds] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const searchTemp = useRef(null);

    useEffect(() => {
        setMaterials(materialsDefault);
    }, [materialsDefault]);

    useEffect(() => {
        setMaterialIds(props.order.materialIds);
    }, [props.order.materialIds]);

    useEffect(() => {
        setSelectedMaterials(props.order.materials);
    }, [props.order.materials]);

    const handleSearch = (value) => {
        if (!value) {
            setMaterials(materialsDefault);
            return;
        }
        if (searchTemp.current) {
            clearTimeout(searchTemp.current);
            searchTemp.current = null;
        }
        searchTemp.current = setTimeout(async () => {
            const { data } = await warehouseSearch(value);
            setMaterials(data);
        }, 300);
    };
    return (
        <ModalCustomize
            title="Chuyển trạng thái: Đang xử lý"
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            value={materialIds}
            onSubmit={() => props.handleOkCancel({ materials: selectedMaterials, materialIds, reasons: [] })}
            disabled={true}
        >
            <Fragment>
                <p className="text-base font-semibold py-2">
                    Chọn vật tư
                    <span className="text-[#ff4d4f]"> *</span>
                </p>
                <Select
                    disabled={false}
                    size="large"
                    placeholder="Chọn vật tư sử dụng..."
                    className="w-full text-base border-[#02b875]"
                    mode="multiple"
                    value={materialIds}
                    onChange={(marterials, option) => {
                        setMaterialIds(marterials);
                        const materialsWithQuantity = _.map(marterials, (marterial) => {
                            const price = _.get(
                                _.find(option, (item) => item.value === marterial, {}),
                                'children.[2]',
                                0,
                            );
                            const qty = _.get(
                                _.find(selectedMaterials, (item) => item.marterialId === marterial, {}),
                                'qty',
                                1,
                            );
                            return {
                                marterialId: marterial,
                                qty,
                                price,
                            };
                        });
                        setSelectedMaterials(materialsWithQuantity);
                    }}
                    optionLabelProp="label"
                    showSearch
                    onSearch={handleSearch}
                    filterOption={false}
                >
                    {_.map(materials, ({ materialId: material }) => {
                        return (
                            <Select.Option
                                key={material._id}
                                value={material._id}
                                label={
                                    <div>
                                        <Tooltip title={material.name}>
                                            {material.name.length > 40
                                                ? material.name.slice(0, 40) + '...'
                                                : material.name}{' '}
                                        </Tooltip>
                                        <InputNumber
                                            size="small"
                                            value={_.get(
                                                _.find(selectedMaterials, (item) => item.marterialId === material._id),
                                                'qty',
                                                1,
                                            )}
                                            min={1}
                                            disabled={false}
                                            defaultValue={1}
                                            onChange={(value) => {
                                                const materialsWithQuantity = _.map(
                                                    selectedMaterials,
                                                    (materialSeleted) => {
                                                        if (materialSeleted.marterialId === material._id) {
                                                            return {
                                                                marterialId: materialSeleted.marterialId,
                                                                qty: value,
                                                                price: materialSeleted.price,
                                                            };
                                                        }
                                                        return materialSeleted;
                                                    },
                                                );
                                                setSelectedMaterials(materialsWithQuantity);
                                            }}
                                        />
                                    </div>
                                }
                            >
                                {material.name} - {material.price}
                            </Select.Option>
                        );
                    })}
                </Select>
                {_.isEmpty(selectedMaterials) && (
                    <span className="text-[#ff4d4f]">Vui lòng nhập chọn vật tư sử dụng</span>
                )}
            </Fragment>
        </ModalCustomize>
    );
};

export default SelectMaterials;
