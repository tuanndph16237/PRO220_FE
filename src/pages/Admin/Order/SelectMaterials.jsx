import React, { useState, useEffect, Fragment, useRef } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { giveBackMaterial, warehouseSearch } from '../../../api/warehouse';
import { Dropdown, Input, InputNumber, List, Tooltip } from 'antd';
import ModalCustomize from '../../../components/Customs/ModalCustomize';
import { giveBackMaterialAsync, updateWarehouseByMaterialsAsync } from '../../../slices/warehouse';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CloseCircleOutlined } from '@ant-design/icons';

const SelectMaterials = (props) => {
    const materialsDefault = useSelector((state) => state.warehouse.materials.value);
    const dispatch = useDispatch();
    const [materials, setMaterials] = useState([]);
    const [materialIds, setMaterialIds] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchTemp = useRef(null);

    useEffect(() => {
        setMaterials(materialsDefault);
    }, [materialsDefault]);

    useEffect(() => {
        setMaterialIds(props.order.materialIds || []);
    }, [props.order.materialIds]);

    useEffect(() => {
        setSelectedMaterials(props.order.materials || []);
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
        handleGiveBackMaterial(id);
        const otherMaterialIds = materialIds.filter((materialId) => materialId !== id);
        handleOnChangeMaterial(otherMaterialIds);
    };

    const handleGiveBackMaterial = (id) => {
        const data = props?.order?.materials.find((value) => value.materialId === id);
        const dataPost = {
            showroomId: props?.order?.showroomId,
            material: {
                materialId: id,
                qty: data?.qty,
            },
        };
        // tra laij vat tu
        giveBackMaterial(dataPost);
        // luu lai order
    };

    const handleOnChangeMaterial = (newMarterials) => {
        setMaterialIds(newMarterials);
        const materialsWithQuantity = _.map(newMarterials, (marterial) => {
            const price = _.get(
                _.find(materialsDefault, (value) => value.materialId._id == marterial),
                'materialId.price',
                0,
            );
            const name = _.get(
                _.find(materialsDefault, (value) => value.materialId._id == marterial),
                'materialId.name',
            );
            const qty = _.get(
                _.find(selectedMaterials, (item) => item.materialId == marterial, {}),
                'qty',
                1,
            );
            const priceInitial = _.get(
                _.find(materialsDefault, (value) => value.materialId._id == marterial),
                'materialId.priceInitial',
            );

            const unit = _.get(
                _.find(materialsDefault, (value) => value.materialId._id == marterial),
                'materialId.unit',
            );

            return {
                materialId: marterial,
                qty,
                price,
                name,
                priceInitial,
                unit,
            };
        });
        setSelectedMaterials(materialsWithQuantity);
    };

    return (
        <ModalCustomize
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            value={materialIds}
            footer={true}
            onSubmit={() => {
                // handle change materials
                if (props.isChangeMaterials) {
                    const materialsNew = [];
                    _.forEach(selectedMaterials, (item) => {
                        const existMaterial = _.find(
                            props.order.materials,
                            (material) => material.materialId === item.materialId,
                        );
                        //case 1: them vat tu moi
                        if (!existMaterial) {
                            materialsNew.push(_.omit(item, ['price', 'unit', 'priceInitial']));
                            return;
                        }
                        //case 2: tra vat tu
                        if (item.qty < existMaterial.qty) {
                            const materialId = item.materialId;
                            const data = {
                                showroomId: props.order.showroomId,
                                material: {
                                    materialId,
                                    qty: existMaterial.qty - item.qty,
                                },
                            };
                            //tra lai vat tu
                            dispatch(giveBackMaterialAsync(data));
                        }
                        //case 3: lay them vat tu
                        if (item.qty > existMaterial.qty) {
                            const data = {
                                materialId: item.materialId,
                                qty: item.qty - existMaterial.qty,
                            };
                            materialsNew.push(data);
                        }
                    });
                    dispatch(
                        updateWarehouseByMaterialsAsync({
                            showroomId: props.order.showroomId,
                            materials: materialsNew,
                        }),
                    );
                } else {
                    dispatch(
                        updateWarehouseByMaterialsAsync({
                            showroomId: props.order.showroomId,
                            materials: selectedMaterials,
                        }),
                    );
                }
                props.handleOkCancel({
                    materials: selectedMaterials,
                    materialIds,
                    reasons: [],
                });
                props.setShowModal(false);
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
                <Dropdown
                    menu={{
                        items: [],
                        selectable: true,
                        defaultSelectedKeys: [],
                    }}
                    dropdownRender={(menu) => {
                        return (
                            <div
                                id="scrollableDiv"
                                style={{
                                    height: 400,
                                    overflow: 'auto',
                                    padding: '0 16px',
                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Input
                                    size="middle"
                                    className="my-2 text-base border-[#02b875] w-full py-2"
                                    placeholder="Tìm kiếm tên vật tư"
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <InfiniteScroll dataLength={materials.length} scrollableTarget="scrollableDiv">
                                    <List
                                        dataSource={materials}
                                        renderItem={({ materialId: { _id, name, price }, quantity }) => {
                                            return (
                                                <List.Item key={_id}>
                                                    <button
                                                        className="w-full text-left"
                                                        disabled={
                                                            !quantity || !!_.find(materialIds, (id) => id === _id)
                                                        }
                                                        onClick={() => handleOnChangeMaterial([...materialIds, _id])}
                                                    >
                                                        <Tooltip title={name}>{name}</Tooltip>
                                                        <p>Số lượng: {quantity}</p>
                                                        <p>Giá tiền: {price.toLocaleString('en') + ' VNĐ'}</p>
                                                    </button>
                                                </List.Item>
                                            );
                                        }}
                                    />
                                </InfiniteScroll>
                            </div>
                        );
                    }}
                >
                    {_.get(selectedMaterials, 'length', 0) > 0 ? (
                        <div className="flex flex-wrap bg-[#fff] border border-[#02b875] rounded">
                            {_.map(selectedMaterials, (selectedMaterial) => {
                                const { materialId: material, quantity } = _.find(
                                    materialsDefault,
                                    (item) => item.materialId._id === selectedMaterial.materialId,
                                );
                                return (
                                    <span
                                        className="inline-block h-10 rounded border border-[#02b875] px-2 m-2 leading-10"
                                        key={selectedMaterial.materialId}
                                    >
                                        <Tooltip title={material.name}>{material.name}</Tooltip>
                                        <span> - </span>
                                        <label htmlFor={selectedMaterial.materialId}>SL:</label>
                                        <InputNumber
                                            id={selectedMaterial.materialId}
                                            className="mx-2"
                                            size="small"
                                            value={_.get(
                                                _.find(selectedMaterials, (item) => item.materialId === material._id),
                                                'qty',
                                                1,
                                            )}
                                            min={1}
                                            max={quantity}
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
                                        <button
                                            onClick={() => {
                                                handleRemoveMaterial(selectedMaterial.materialId);
                                            }}
                                        >
                                            <CloseCircleOutlined />
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    ) : (
                        <Input
                            size="larger"
                            className="relative text-base border-[#02b875] w-full py-2"
                            placeholder="Chọn vật tư sử dụng..."
                        />
                    )}
                </Dropdown>
                {_.isEmpty(selectedMaterials) && (
                    <span className="text-[#ff4d4f]">Vui lòng nhập chọn vật tư sử dụng</span>
                )}
            </Fragment>
        </ModalCustomize>
    );
};

export default SelectMaterials;
