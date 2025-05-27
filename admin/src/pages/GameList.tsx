
import React, { useEffect, useState } from 'react';
import { Layout, Spin, Alert } from 'antd';
import { GameTable, GameEntry } from '../components/GameTable';


const { Header, Content } = Layout;

export const GameList: React.FC = () => {

  const [data, setData] = useState<GameEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/games')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((games: GameEntry[]) => {
        setData(games);
    })
    .catch((err) => {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again later.');
    })
    .finally(() => {
        setLoading(false);
    });
  }, []);
    return (
        <>
            <Header style={{ color: 'white', fontSize: '18px', backgroundColor: '#223355' }}>Games List</Header>
            <Content>
                {loading ? (
                    <Spin />
                ) : error ? (
                    <Alert type="error" message={error} />
                ) : (
                    <GameTable data={data} />
                )}
            </Content>
        </>
    );
};