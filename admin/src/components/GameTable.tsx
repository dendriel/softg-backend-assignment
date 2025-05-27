import React from 'react';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';

export interface GameEntry {
    id: string;
    name: string;
    releaseYear: number;
    publisher: string;
}

interface GameTableProps {
    data: GameEntry[];
    onDelete: (id: string) => void;
}

export const GameTable: React.FC<GameTableProps> = ({ data, onDelete }) => {

  const navigate = useNavigate();

  function handleDeleteButton(id: string) {
    return <>
      <Popconfirm
          title="Delete the Game"
          description="Are you sure you want to delete this game?"
          onConfirm={() => onDelete(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
      </Popconfirm>
    </>
  }

  function actions(_text: any, record: GameEntry) {
        return <>
          <Space>
              <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button>
              {handleDeleteButton(record.id)}
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