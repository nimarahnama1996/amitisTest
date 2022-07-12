import React, { useState } from 'react';
import { Form, Input, InputNumber,Switch, Popconfirm, Table, Typography } from 'antd';
import {EditOutlined} from '@ant-design/icons'
 







const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



const UsersContractTable = () => {


  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: '0',
      contractNum: '12765',
      startDate: 'احمد احمدی',
      endDate: '12211',
      active: '12211',
      ceo:'33876',
      phoneNum:'ahmad@111',
      phone:'0912111111',
      email:'0912111111',

    },
    {
        key: '1',
        contractNum: '12765',
        startDate: 'احمد احمدی',
        endDate: '12211',
        active: '12211',
        ceo:'33876',
        phoneNum:'ahmad@111',
        phone:'0912111111',
        email:'0912111111',

      },
  ]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      contractNum: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    
    {
      title: 'شماره قرارداد',
      dataIndex: 'contractNum',
      width: '15%',
      editable: true,
    },
    {
      title: 'تاریخ شروع',
      dataIndex: 'startDate',
    },
    {
      title: 'تاریخ پایان',
      dataIndex: 'endDate',
    },
    {
      title: 'فعال بودن/نبودن',
      dataIndex: 'active',
      render: (e, record) => (< Switch  defaultChecked={e} />)
    },
    {
      title: 'مدیرعامل',
      dataIndex: 'ceo',
    },
    {
      title: 'شماره موبایل',
      dataIndex: 'phoneNum',
    },
    {
        title: 'تلفن',
        dataIndex: 'phone',
      },
      {
        title: 'ایمیل',
        dataIndex: 'email',
      },
      

    {
      title: 'عملیات',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
           <EditOutlined />
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <div>
      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>

    
      </div>

      

    </div>
  )
}

export default UsersContractTable