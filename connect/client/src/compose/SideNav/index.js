import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

function SideNav() {
    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="user" />
                            NAV BAR
                    </span>
                    }
                >

                    <Menu.Item key="1">
                        <Link to="/">
                            Inform Page
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/admin">
                            Edit Admin
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/info">`
                            Edit Info
                        </Link>
                    </Menu.Item>

                        {/* <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item> */}

                </SubMenu>

            </Menu>
        </Sider>
    )
}

export default SideNav
