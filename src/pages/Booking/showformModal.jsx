import { Form, Input } from 'antd';
import { useEffect, useRef } from 'react';
import { R_NUMBER_PHONE } from '../../constants/regex';
import { useState } from 'react';
import { NOTIFICATION_TYPE } from '../../constants/status';

const ShowformModal = (props) => {
    const [validate, setValidate] = useState({});
    const numberPhone = useRef(0);
    const hanldChange = (item) => {
        if (item.target.value) {
            if (props.status == 'phone') {
                const a = new RegExp(R_NUMBER_PHONE);
                if (item.target.value !== numberPhone.current) {
                    if (a.test(item.target.value)) {
                        props.onValue(item.target.value);
                        setValidate({ validateStatus: NOTIFICATION_TYPE.SUCCESS });
                    } else {
                        props.onValue(0);
                        setValidate({
                            validateStatus: NOTIFICATION_TYPE.ERROR,
                            help: 'số điện thoại không hợp lệ ! Lưu ý : phải đủ 12 chữ số',
                        });
                    }
                    numberPhone.current = item.target.value;
                }
            }
            if (props.status == 'text') {
                if (item.target.value !== '') {
                    props.onValue(item.target.value);
                }
            }
        } else {
            setValidate({ validateStatus: NOTIFICATION_TYPE.ERROR, help: 'không được để trống!' });
        }
    };
    return (
        <div>
            <label>
                <span className="font-bold py-2">{props.title}</span>
            </label>
            <Form.Item {...validate}>
                <Input onBlur={(item) => hanldChange(item)} />
            </Form.Item>
        </div>
    );
};

export default ShowformModal;
