import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import {DeleteOutlined, UserAddOutlined,UserOutlined} from '@ant-design/icons'


import './UserManageTable.css'



const EditableContext = React.createContext(null);


const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};


const UserManageTable = () => {

    const [dataSource, setDataSource] = useState([
        {
          key: '0',
          name: '12765',
          manangerName: 'احمد احمدی',
          coId: '12211',
          naId:'33876',
          email:'ahmad@111',
          phone:'0912111111'

        },
        {
          key: '1',
          name: '12765',
          manangerName: 'احمد احمدی',
          coId: '12211',
          naId:'33876',
          email:'ahmad@111',
          phone:'0912111111'
        },
      ]);
      const [count, setCount] = useState(2);
    
      const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
      };
    
      const defaultColumns = [
        {
          title: 'نام کاربری',
          dataIndex: 'name',
          width: '30%',
          editable: true,
        },
        {
          title: 'نام مسئول',
          dataIndex: 'manangerName',
        },
        {
          title: 'شماره ثبت شرکت',
          dataIndex: 'coId',
        },
        {
          title: 'شناسه ملی شرکت',
          dataIndex: 'naId',
        },
        {
          title: 'ایمیل',
          dataIndex: 'email',
        },
        {
          title: 'شماره موبایل',
          dataIndex: 'phone',
        },
        {
          title: 'عملیات',
          dataIndex: 'operation',
          render: (_, record) =>
            dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <a><DeleteOutlined /></a>
              </Popconfirm>
            ) : null,
        },
      ];
    
      const handleAdd = () => {
        const newData = {
          key: count,
          name: `176543 `,
          manangerName: 'احمد احمدی',
          coId: `165421 `,
          naId:`1754421 `,
          email:`ahmad@1765 `,
          phone:`09124341617 `,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
      };
    
      const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
      };
    
      const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };
      const columns = defaultColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
    
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
      });

  return (
    <div>
        <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
          marginLeft:'900px',
          backgroundColor:'white',
          color:'black'
        }}
      >
      <UserAddOutlined />  ایجاد کاربر جدید 
      </Button>

      
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  )
}

export default UserManageTable