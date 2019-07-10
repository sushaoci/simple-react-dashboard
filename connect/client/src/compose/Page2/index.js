import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';

import SideNav from '../SideNav'

import AdminTable from '../../july-six/TableIssue';

const { Header, Content, Footer } = Layout;

function MyLayout() {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Content style={{ padding: '25px 50px' }}>

        <Layout style={{ padding: '24px 0', background: '#fff',height: '540px' }}>
          <SideNav/>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <AdminTable/>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default MyLayout
