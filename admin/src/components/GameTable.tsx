import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  type TablePaginationConfig,
} from 'antd';
import { useNavigate } from 'react-router-dom';

export interface GameEntry {
    id: string;
    name: string;
    releaseYear: number;
    publisher: string;
}

interface GameTableProps {
    data: GameEntry[];
    total: number;
    setCurrPage: (page: number) => void;
    setPageSize: (size: number) => void;
    onDelete: (id: string) => void;
}

const GameTable: React.FC<GameTableProps> = ({
  data, total, onDelete, setCurrPage, setPageSize,
}:
  GameTableProps) => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total,
    showSizeChanger: true,
    showTotal: showTotalPages,
  });

  function onPaginationChanged(newPagination: TablePaginationConfig) {
    console.log('Pagination changed:', newPagination);

    const currPage = newPagination.current || 1;
    const pageSize = newPagination.pageSize || 10;
    setCurrPage(currPage);
    setPageSize(pageSize);

    setPagination({
      current: currPage,
      pageSize,
      total,
      showSizeChanger: true,
      showTotal: showTotalPages,
    });
  }

  function showTotalPages(newTotal: number, range: [number, number]) {
    return `${range[0]}-${range[1]} of ${newTotal} games`;
  }

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
    </>;
  }

  function actions(_text: any, record: GameEntry) {
    return <>
          <Space>
              <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button>
              {handleDeleteButton(record.id)}
          </Space>
        </>;
  }

  // TODO: add some approach to quick-show all data from a game entry (e.g. on hovering the mouse
  // over the row)
  const tableColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
    { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
    { title: 'Actions', key: 'actions', render: actions },
  ];

  return (
    <Table
      dataSource={data.map((item) => ({ ...item, key: item.id }))}
      columns={tableColumns}
      pagination={pagination}
      onChange={onPaginationChanged}
    />
  );
};

export default GameTable;
