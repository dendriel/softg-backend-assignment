import React, { useState } from 'react';
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
    onDelete: (id: string) => void;
}

export const GameTable: React.FC<GameTableProps> = ({ data, onDelete }) => {

  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  function handleDelete(id: string) {
    if (deleteInProgress) {
      console.warn("Delete operation is already in progress.");
      return;
    }

    // If double-clicked the same row, confirm deletion
    if (confirmDeleteId === id) {
      console.log(`Deleting game with id: ${id}`);
      setDeleteInProgress(true);

      onDelete(id);

      setDeleteInProgress(false);
      setConfirmDeleteId(null);
      return;
    }
    // Setup deletion watcher to wait for the next click.
    else {
      setConfirmDeleteId(id);    
      // Reset confirmation after 2 seconds if not confirmed or changed the row to delete
      setTimeout(() => {
        setConfirmDeleteId(current => (current === id ? null : current));
      }, 2000);
    }
  }

  function actions(_text: any, record: GameEntry) {
        return <>
          <Space>
              <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button>
              <Button danger onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>Delete</Button>
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