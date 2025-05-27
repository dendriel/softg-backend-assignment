import React, { useState } from 'react';
import { Layout, Form, Input, InputNumber, Button, Select, Checkbox, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

export const GameCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [type, setType] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const onSubmit = (values: any) => {

        const gameData = {
            ...values,
            players: {
                min: values.playersMin,
                max: values.playersMax
            },
            expansions: values.expansions ?
                values.expansions
                .trim()
                .split(',')
                .map((name: string) => name.trim()) : [],
        }

        console.log('Submitting game data:', gameData);
        fetch('/api/v1/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to create the game');
            }
            return res.json();
        })
        .then(data => {
            console.log('Game created successfully:', data);
            alert(`Game created successfully with ID: ${data.id}`);
            form.resetFields();
            navigate('/');
        })
        .catch((err) => {
            console.error('Error creating game:', err);
            alert('Failed to create the game. Please try again.');
        })
        .finally(() => {
            setType(undefined);
        });
    }

    return (
        <>
            <Header style={{ color: 'white', fontSize: '18px', backgroundColor: '#225533' }}>Create Game</Header>
            <Content>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{ standalone: false, playersMin: 1, type: 'BaseGame' }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the game name' }]}>
            <Input />
          </Form.Item>
          <Space>
            <Form.Item label="Players Min" name="playersMin" rules={[{ required: true, message: 'Min players' }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Players Max" name="playersMax">
              <InputNumber min={1} />
            </Form.Item>
          </Space>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select the type' }]}>
            <Select onChange={setType}>
              <Select.Option value="BaseGame">BaseGame</Select.Option>
              <Select.Option value="Expansion">Expansion</Select.Option>
            </Select>
          </Form.Item>
            {type === 'Expansion' && (
                <Form.Item label="Base Game ID" name="baseGame" rules={[{ required: true, message: 'Please enter the Base Game ID' }]}>
                    <Input />
                </Form.Item>
            )}
          <Form.Item label="Release Year" name="releaseYear" rules={[{ required: true, message: 'Please enter the Release Year' }]}>
            <InputNumber min={1900} max={2100} />
          </Form.Item>
          <Form.Item label="Publisher" name="publisher" rules={[{ required: true, message: 'Please enter the Publisher' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Expansions (comma separated IDs)" name="expansions">
            <Input />
          </Form.Item>
          <Form.Item name="standalone" valuePropName="checked">
            <Checkbox>Standalone</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Game
            </Button>
          </Form.Item>
        </Form>
            </Content>
        </>
    );
}