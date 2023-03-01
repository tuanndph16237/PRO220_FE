import React, { useState, useEffect, Fragment, useRef } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { giveBackMaterial, warehouseSearch } from '../../../api/warehouse';
import { InputNumber, Select, Tooltip } from 'antd';
import ModalCustomize from '../../../components/Customs/ModalCustomize';
import { updateWarehouseByMaterialsAsync } from '../../../slices/warehouse';

const SelectMaterials = (props) => {
    const materialsDefault = useSelector((state) => state.warehouse.materials.value);
    const dispatch = useDispatch();
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

    const checkMaterial = (materials) => {
        const equalLength = _.get(props.order.materials, 'length', 0) === _.get(materials, 'length', 0);
        if (!equalLength) return false;
        const rs = materials.every((material) => {
            return props.order.materials.find(
                (item) => item.materialId === material.materialId && item.qty === material.qty,
            );
        });
        return rs;
    };

    const handleRemoveMaterial = (id) => {
        //handle setMaterial
        if (props.isChangeMaterials) {
            handleGiveBackMaterial(id);
        }
        const otherMaterialIds = materialIds.filter((materialId) => materialId !== id);
        handleOnChangeMaterial(otherMaterialIds);
        //check is change material
    };
    const handleGiveBackMaterial = (id) => {
        const data = order.materials.find((value) => value.materialId === id);
        const dataPost = {
            idShowroom: props.order.showroomId,
            material: {
                materialId: id,
                quantity: data.qty,
            },
        };
        //tra laij vat tu
        giveBackMaterial(dataPost);
        //luu lai order
    };

    const handleOnChangeMaterial = (marterials) => {
        setMaterialIds(marterials);
        const materialsWithQuantity = _.map(marterials, (marterial) => {
            const price = _.get(
                _.find(materialsDefault, (value) => value.materialId._id === marterial),
                'materialId.price',
                0,
            );
            const qty = _.get(
                _.find(selectedMaterials, (item) => item.materialId === marterial, {}),
                'qty',
                1,
            );
            return {
                materialId: marterial,
                qty,
                price,
            };
        });
        setSelectedMaterials(materialsWithQuantity);
    };

    return (
        <ModalCustomize
            title={!props.isChangeMaterials ? 'Chuyển trạng thái: Đang xử lý' : 'Chỉnh sửa vật tư'}
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            value={materialIds}
            footer={true}
            onSubmit={() => {
                // neu khp chinh sua vat tu thi call api tru cac vat tu da chon
                // if (!props.isChangeMaterials) {
                dispatch(
                    updateWarehouseByMaterialsAsync({
                        showroomId: props.order.showroomId,
                        materials: selectedMaterials,
                    }),
                );
                // }
                // const isNotChangeMaterial = checkMaterial(selectedMaterials);
                // if (!isNotChangeMaterial) {
                props.handleOkCancel({
                    materials: selectedMaterials,
                    materialIds,
                    reasons: [],
                });
                // }
                props.setShowModal();
            }}
            disabled={true}
            width={'60%'}
            top={50}
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
                    onChange={handleOnChangeMaterial}
                    optionLabelProp="label"
                    showSearch
                    // removeIcon={null}
                    onSearch={handleSearch}
                    filterOption={false}
                >
                    {_.map(materials, (item) => {
                        const { quantity, materialId: material } = item;
                        return (
                            <Select.Option
                                disabled={!quantity}
                                key={material._id}
                                value={material._id}
                                label={
                                    <div>
                                        <Tooltip title={material.name}>
                                            {material.name.length > 40
                                                ? material.name.slice(0, 40) + '...'
                                                : material.name}
                                        </Tooltip>
                                        <InputNumber
                                            className="mx-2"
                                            size="small"
                                            value={_.get(
                                                _.find(selectedMaterials, (item) => item.materialId === material._id),
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
                                                        if (materialSeleted.materialId === material._id) {
                                                            return {
                                                                materialId: materialSeleted.materialId,
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
                                        {/* <button onClick={() => handleRemoveMaterial(material._id)}>
                                            <CloseCircleOutlined />
                                        </button> */}
                                    </div>
                                }
                            >
                                <Tooltip title={`${material.name} - ${material.price} - Số lượng: ${quantity}`}>
                                    {material.name} - {material.price} - SL: {quantity}
                                </Tooltip>
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
