import React, { useEffect, useState } from 'react';
import { Layout, Spin, Alert } from 'antd';
import GameTable, { GameEntry } from '../components/GameTable.tsx';

const { Content } = Layout;

type GamesPaginatedDto = {
  data: GameEntry[];
  total: number;
};

const GameList: React.FC = () => {
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<GameEntry[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/v1/games?page=${currPage}&pageSize=${pageSize}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((gamesPaginated: GamesPaginatedDto) => {
        setData(gamesPaginated.data);
        setTotalEntries(gamesPaginated.total);
      })
      .catch((err) => {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currPage, pageSize]);

  const handleDelete = async (id: string) => {
    if (loading) {
      console.warn('Loading in progress, cannot delete.');
      return;
    }
    const res = await fetch(`/api/v1/games/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setData((prev) => prev.filter((game) => game.id !== id));
    } else {
      window.alert('Failed to delete game. Please try again later.');
    }
  };

  return (
        <>
            <Content>
                {loading ? (
                    <Spin />
                ) : error ? (
                    <Alert type="error" message={error} />
                ) : (
                    <GameTable
                      data={data}
                      total={totalEntries}
                      setCurrPage={setCurrPage}
                      setPageSize={setPageSize}
                      onDelete={handleDelete}
                      />
                )}
            </Content>
        </>
  );
};

export default GameList;
