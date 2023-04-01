import { Input } from 'antd';
import { useRef } from 'react';

const ShowformModal = (props) => {
    const numberPhone = useRef(0);
    const hanldChange = (item) => {
        if (item.target.value) {
            if (item.target.value !== numberPhone.current) {
                numberPhone.current = item.target.value;
                props.onValue(item.target.value);
            }
        }
    };
    return (
        <div>
            <label>
                <span className="font-bold py-2">{props.title}</span>
            </label>
            <Input onBlur={(item) => hanldChange(item)} />
        </div>
    );
};

export default ShowformModal;
