import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameList } from './pages/GameList';

const { Header, Content } = Layout;

export const App: React.FC = () => (
    <BrowserRouter>
        <Layout>
            <Header style={{ color: 'white', fontSize: '20px' }}>Admin</Header>
            <Content>
                <Routes>
                    <Route path="/" element={<GameList />} />
                </Routes>
            </Content>
        </Layout>
    </BrowserRouter>
);