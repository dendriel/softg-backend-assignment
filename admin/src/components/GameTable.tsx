import React from 'react';
import { Table } from 'antd';

export interface GameEntry {
    id: string;
    name: string;
    releaseYear: number;
    publisher: string;
}

interface GameTableProps {
    data: GameEntry[];
}

const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
  { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
]

export const GameTable: React.FC<GameTableProps> = ({ data }) => (
    <Table dataSource={data.map(item => ({ ...item, key: item.id }))} columns={tableColumns} />
);