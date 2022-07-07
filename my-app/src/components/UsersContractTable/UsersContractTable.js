import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table,Switch } from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons'



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



const UsersContractTable = () => {

    const [dataSource, setDataSource] = useState([
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
      const [count, setCount] = useState(2);
    
      const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
      };
    
      const defaultColumns = [
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
          contractNum: `176543 `,
          startDate: 'احمد احمدی',
          endDate: `165421 `,
          active:`1754421 `,
          ceo:`ahmad@1765 `,
          phoneNum:`09124341617 `,
          phone:`09124341617 `,
          email:`09124341617 `,
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
      <PlusOutlined />  قرارداد جدید 
      </Button>

      
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
    </div>
  )
}

export default UsersContractTable