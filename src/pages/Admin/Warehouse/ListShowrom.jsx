import { Select } from 'antd';
const ListShowroom = ({ options, setIdShowrooms }) => (
    <Select
        showSearch
        style={{
            width: '100%',
        }}
        onChange={(value) => setIdShowrooms(value)}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={options}
    />
);

export default ListShowroom;
