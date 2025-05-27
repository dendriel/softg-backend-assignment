import React from 'react';
import { Layout, Menu } from 'antd';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { GameList } from './pages/GameList';
import { GameSave } from './pages/GameSave';

const { Header, Content } = Layout;

export const App: React.FC = () => {
    
    const location = useLocation();
    return (
        <Layout>
            <Header style={{ color: 'white', fontSize: '20px' }}>Admin</Header>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={[
                    { key: '/', label: <Link to="/">Games List</Link> },
                    { key: '/create', label: <Link to="/create">Create Game</Link> },
                ]}
            />
            <Content>
                <Routes>
                    <Route path="/" element={<GameList />} />
                    <Route path="/create" element={<GameSave />} />
                    <Route path="/edit/:id" element={<GameSave />} />
                </Routes>
            </Content>
        </Layout>
    );
};