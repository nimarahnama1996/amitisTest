import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import {DeleteOutlined, UserAddOutlined,UserOutlined} from '@ant-design/icons'


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




const UsersServiceTable = () => {

    const [dataSource, setDataSource] = useState([
        {
          key: '0',
          name: 'نام طرح',
          serviceName: 'نام سرویس',
          input: 'ورودی',
          output:'خروجی',
          number:'100',
          price:'1,100',
          priceFree:'1,100,000'

        },
        {
            key: '0',
            name: 'نام طرح',
            serviceName: 'نام سرویس',
            input: 'ورودی',
            output:'خروجی',
            number:'100',
            price:'1,100',
            priceFree:'1,100,000'
  
          },
      ]);
      
    
      
    
      const defaultColumns = [
        {
          title: 'نام طرح',
          dataIndex: 'name',
          width: '8%',
          editable: true,
        },
        {
          title: 'نام سرویس',
          dataIndex: 'serviceName',
          width: '10%',
        },
        {
          title: 'ورودی ها',
          dataIndex: 'input',
          width: '9%',
        },
        {
          title: 'خروجی ها',
          dataIndex: 'output',
          width: '9%',
        },
        {
          title: 'تعداد درخواست سرویس',
          dataIndex: 'number',
          width: '18%',
        },
        {
          title: 'قیمت پایه هر درخواست برای سرویس(ریال)',
          dataIndex: 'price',
          width: '30%',
        },
        {
            title: 'قیمت آزادهر درخواست برای سرویس(ریال)',
            dataIndex: 'priceFree',
            width: '20%',
          },
      ];
    
      
    
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

export default UsersServiceTable