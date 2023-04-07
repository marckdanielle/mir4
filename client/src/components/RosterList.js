import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Button, 
				Form, 
				Input, 
				//InputNumber, 
				//Popconfirm, 
				Table, 
				// Typography 
			} from 'antd';


function RosterList() {
	
	const url = "http://localhost:3001";

	const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();



  
  const cancel = () => {
    setEditingRow(null);
  };

	

  useEffect(() => {
    getMembers();
  }, []);
	
	const columns = [
		{
			title: 'In-Game Name',
			dataIndex: 'ign',
			render: (text, record) => {
        if (editingRow === record.idmembers) {
          return (
            <Form.Item
              name="ign"
              rules={[
                {
                  required: true,
                  message: "Please enter your IGN",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
		},
		{
			title: 'Level',
			dataIndex: 'level',
			render: (text, record) => {
        if (editingRow === record.idmembers) {
          return (
            <Form.Item
              name="level"
              rules={[
                {
                  required: true,
                  message: "Please enter your level",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
		},
		{
			title: 'Power Score',
			dataIndex: 'ps',
			render: (text, record) => {
        if (editingRow === record.idmembers) {
          return (
            <Form.Item
              name="ps"
              rules={[
                {
                  required: true,
                  message: "Please enter your PS",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
		},
		{
			title: 'Clan Name',
			dataIndex: 'clan',
			render: (text, record) => {
        if (editingRow === record.idmembers) {
          return (
            <Form.Item
              name="clan"
              rules={[
                {
                  required: true,
                  message: "Please enter your Clan name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
		},
		{
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.idmembers);
                form.setFieldsValue({
                  ign: record.ign,
                  level: record.level,
                  ps: record.ps,
                  clan: record.clan
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
	];

	const getMembers = () => {
		Axios.get(url+"/get-roster").then((response) => {
	 		setDataSource(response.data);
		});
	};

	const updateRoster = (id, values) => {
		Axios.put(url+"/update-roster", { ...values, idmembers: id }).then(() => {
    		getMembers();
			}
		);
	};
	
	const onFinish = (values) => {
    updateRoster(editingRow, values);
    setEditingRow(null);
  };

	return(
		<Form form={form} onFinish={onFinish}>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
	);
}

export default RosterList;