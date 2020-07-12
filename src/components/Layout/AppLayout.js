import React from 'react';
import { Layout } from 'antd';
import MainTabs from '../MainTabs/MainTabs';
import styles from './AppLayout.module.css';

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className={styles.header}>
          Todos App
        </div>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">
          <MainTabs />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>A simple Todo App in React and Redux</Footer>
    </Layout>
  );
}

export default AppLayout;