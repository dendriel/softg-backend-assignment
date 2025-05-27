import React from 'react';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface GameEntry {
    id: string;
    name: string;
    releaseYear: number;
    publisher: string;
}

interface GameTableProps {
    data: GameEntry[];
}

export const GameTable: React.FC<GameTableProps> = ({ data }) => {

  const navigate = useNavigate();

  function actions(_text: any, record: GameEntry) {
        return <>
          <Space>
              <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button>
              <Button danger onClick={() => alert(`Delete ${record.id}`)} style={{ marginLeft: 8 }}>Delete</Button>
          </Space>
        </>
  }

  // TODO: add some approach to quick-show all data from a game entry (e.g. on hovering the mouse over the row)
  const tableColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
    { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
    { title: 'Actions', key: 'actions', render: actions }
  ]

  return (
    <Table dataSource={data.map(item => ({ ...item, key: item.id }))} columns={tableColumns} />
  );
};