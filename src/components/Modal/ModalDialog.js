import React from 'react';
import { Modal, Row, Col, Input, DatePicker } from 'antd';
import moment from 'moment';
import styles from './ModalDialog.module.css';

const dateFormat = 'YYYY/MM/DD';

const ModalDialog = (props) => {

    return (
        <Modal
            title={props.title}
            visible={props.visible}
            onOk={props.handleOk}
            confirmLoading={props.confirmLoading}
            okText="Save"
            onCancel={props.handleCancel}>
            {props.todo && (
                <div>
                    <Row className={styles.paddingb}>
                        <Col span={24}>
                            <label>Action</label>
                            <Input placeholder="Action" onChange={props.handleChange} value={props.todo.action} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div>
                                <label>Date Added</label>
                            </div>
                            <div>
                                <DatePicker defaultPickerValue={moment(new Date(), dateFormat)}
                                    onChange={props.handleDateChange}
                                    placeholder="Action item date"
                                    value={props.todo.dateAdded ? moment(props.todo.dateAdded, dateFormat) : ''}
                                    format={dateFormat} />

                            </div>
                        </Col>
                    </Row>
                </div>
            )}


        </Modal>
    );
}

export default ModalDialog;