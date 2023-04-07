import React, { useState } from 'react';
import Axios from "axios";
import { Button, 
				Checkbox, 
				Form, 
				Input, 
				Alert, 
				Space, 
				Divider, 
				Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

function RosterForm() {
	const [charData, setCharData] = useState({ ign: '', level: 0, ps: 0, clan: ''});

	const [showSuccess, setShowSuccess] = useState("");
	const [memberList, setMemberList] = useState([]);
	const url = "http://localhost:3001";

	const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

	const addRoster = () => {
		Axios.post(url+"/create-roster", {
			ign: charData.ign,
			level: charData.level,
			ps: charData.ps,
			clan: charData.clan,
		}).then(() => {
			setMemberList([...memberList,
				{
					ign: charData.ign,
					level: charData.level,
					ps: charData.ps,
					clan: charData.clan
				}
			]);
			
		});
	};

	const onFinish = (values: any) => {
		addRoster();
  	console.log('Success:', values);
  	setShowSuccess('success');
	};

	const onFinishFailed = (errorInfo: any) => {
	  console.log('Failed:', errorInfo);
	  setShowSuccess('error');
	};

	// const getEmployees = () => {
	// 	Axios.get(url+"/employees").then((response) => {
	// 		setMemberList(response.data);
	// 	});
	// };

	// const updateEmployeeWage = (id) => {
	// 	Axios.put(url+"/update", { wage: newWage, id: id }).then(
	// 	(response) => {
	// 		setMemberList(
	// 			memberList.length != 0 &&
	// 		memberList.map((val) => {
	// 			return val.id == id
	// 			? 
	// 			{
	// 				id: val.id,
	// 				name: val.name,
	// 				country: val.country,
	// 				age: val.age,
	// 				position: val.position,
	// 				wage: newWage,
	// 			}
	// 			: val;
	// 			})
	// 		);
	// 		}
	// 	);
	// };

	// const deleteEmployee = (id) => {
	// 	Axios.delete(url+`/delete/${id}`).then((response) => {
	// 		setMemberList(
	// 			memberList.filter((val) => {
	// 				return val.id != id;
	// 			})
	// 		);
	// 	});
	// };


	return(
		<div>
		<Typography>
    	<Title>Roster Form</Title>
    </Typography>
			{
			showSuccess == 'success' ?
			<Space direction="vertical" style={{ width: '100%' }}>
	    	<Alert message="New Roster Added" type="success" showIcon closable afterClose={handleClose} />
	    </Space>
	    :
	    showSuccess != '' &&
	    <Space direction="vertical" style={{ width: '100%' }}>
	    	<Alert message="Failed to add new Roster" type="error" showIcon closable afterClose={handleClose} />
	    </Space>
	    
			}

			<Divider />
			<Form
		    name="basic"
		    labelCol={{ span: 8 }}
		    wrapperCol={{ span: 16 }}
		    style={{ maxWidth: 600 }}
		    initialValues={{ remember: true }}
		    onFinish={onFinish}
		    onFinishFailed={onFinishFailed}
		    autoComplete="off">
		    
		    <Form.Item
		      label="In-Game Name:"
		      name="ign"
	      	rules={[{ required: true, message: 'Please input your IGN!' }]}>
		      <Input 
		      	type="text"
	          value={charData.ign}
	          onChange={(event) => setCharData({...charData, ign: event.target.value})}/>
		    </Form.Item>

		    <Form.Item
		      label="Level:"
		      name="level"
	      	rules={[{ required: true, message: 'Please input your level!' }]}>
		      <Input 
		      	type="number"
	          value={charData.level}
	          onChange={(event) => setCharData({...charData, level: event.target.value})}/>
		    </Form.Item>

		    <Form.Item
		      label="Power Score:"
		      name="ps"
	      	rules={[{ required: true, message: 'Please input your PS!' }]}>
		      <Input 
		      	type="number"
	          value={charData.ps}
	          onChange={(event) => setCharData({...charData, ps: event.target.value})}/>
		    </Form.Item>

		    <Form.Item
		      label="Clan Name:"
		      name="clan"
	      	rules={[{ required: true, message: 'Please input your Clan name!' }]}>
		      <Input 
		      	type="text"
	          value={charData.clan}
	          onChange={(event) => setCharData({...charData, clan: event.target.value})}/>
		    </Form.Item>
	        
	      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
			    <Button type="primary" htmlType="submit">
			      Submit
			    </Button>
			  </Form.Item>
	    </Form>
    </div>
	);
}

export default RosterForm;