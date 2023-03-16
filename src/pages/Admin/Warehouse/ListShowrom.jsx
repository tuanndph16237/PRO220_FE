import { Select } from 'antd';
const ListShowroom = ({ options, selectShowroom }) => (
    <Select
        showSearch
        style={{
            width: '100%',
        }}
        onChange={(value) => {
            selectShowroom({ type: 'UPDATE_CURRENT_SHOWROOM', payload: value });
        }}
        placeholder="Chọn cửa hàng"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={options}
    />
);

export default ListShowroom;
