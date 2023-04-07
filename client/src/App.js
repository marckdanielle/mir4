import React, { Component } from 'react';
import { Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, Result, Button } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';

import RosterList from './components/RosterList';
import RosterForm from './components/RosterForm';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {

    state = {
        collapsed: false,
        showSuccess: false
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    setShowSuccess(response) {
    	this.state({ showSuccess: response });
    }

    render() {
        return (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={[window.location.pathname]} mode="inline">
                            <Menu.Item key="1" icon={<UserAddOutlined />}>
                                {/*<Icon type="pie-chart" />*/}
                                <span>Roster form</span>
                                <Link to="/roster-form" />
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                {/*<Icon type="desktop" />*/}
                                <span>Roster list</span>
                                <Link to="/roster-list" />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
                            {/*<Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                style={{ cursor: 'pointer' }}
                                onClick={this.toggle}
                            />*/}
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        	<Routes>
	                            	<Route exact path="/roster-list" element={<RosterList/>} />
	                            	<Route path="/roster-form" element={<RosterForm charData={{ign:'Testttt'}}/>} />
                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            名人堂丶 ©2023 Created by Khyrz
                        </Footer>
                    </Layout>

                </Layout>
        );
    }
}


export default App;