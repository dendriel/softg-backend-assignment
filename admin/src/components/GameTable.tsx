import React from 'react';
import { Table, Button, Space } from 'antd';

export interface GameEntry {
    id: string;
    name: string;
    releaseYear: number;
    publisher: string;
}

interface GameTableProps {
    data: GameEntry[];
}

function actions(_text: any, record: GameEntry) {
      return <>
        <Space>
            <Button type="primary" onClick={() => alert(`Edit ${record.id}`)}>Edit</Button>
            <Button danger onClick={() => alert(`Delete ${record.id}`)} style={{ marginLeft: 8 }}>Delete</Button>
        </Space>
      </>
}

const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
  { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
  { title: 'Actions', key: 'actions', render: actions }
]

export const GameTable: React.FC<GameTableProps> = ({ data }) => (
    <Table dataSource={data.map(item => ({ ...item, key: item.id }))} columns={tableColumns} />
);