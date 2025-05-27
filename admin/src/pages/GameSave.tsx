import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, InputNumber, Button, Select, Checkbox, Space, Breadcrumb } from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';

const { Content } = Layout;

export const GameSave: React.FC = () => {
    const [form] = Form.useForm();
    const [type, setType] = useState<string | undefined>(undefined);
    const [createMode, setCreateMode] = useState<boolean>(true);
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) {
            // Create mode
            form.setFieldsValue({
                standalone: false,
                playersMin: 1,
                type: 'BaseGame',
                releaseYear: 2025
            });
            setType('BaseGame');
            setCreateMode(true);
            return;
        }
        
        // Fetch existing game data for editing
        fetch(`/api/v1/games/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch game data');
                }
                return res.json();
            })
            .then(data => {
                form.setFieldsValue({
                    ...data,
                    playersMin: data.players.min,
                    playersMax: data.players.max,
                    expansions: data.expansions ? data.expansions.join(', ') : '',
                    type: data.type,
                    standalone: data.standalone || false
                });
                setType(data.type);
                setCreateMode(false);
            })
            .catch(err => {
                console.error('Error fetching game data:', err);
                alert('Failed to load game data. Please try again.');
            });
      }, [id, form]);


    const onSubmit = (values: any) => {
        const gameData = {
            ...values,
            id: id || undefined,
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

        let requestEndpoint = '/api/v1/games';
        if (!createMode) {
            requestEndpoint += `/${id}`;
        }
        const requestMode = createMode ? 'POST' : 'PATCH';

        console.log('Submitting game data:', gameData);
        fetch(requestEndpoint, {
            method: requestMode,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to save the game');
            }
            return createMode ? res.json() : { id: id};
        })
        .then(data => {
            console.log('Game saved successfully:', data);
            alert(`Game saved successfully with ID: ${data.id}`);
            form.resetFields();
            navigate('/');
        })
        .catch((err) => {
            console.error('Error saving game:', err);
            alert('Failed to saved the game. Please try again.');
        })
        .finally(() => {
            setType(undefined);
        });
    }

    return (
  <>
    <Content style={{ marginTop: 24, marginLeft: 12, marginRight: 12 }}>
        <Breadcrumb style={{ margin: '16px 0' }}
                items={[
                    {
                        title: <Link to="/">Games List</Link>,
                    },
                    {
                        title: id ? 'Edit Game' : 'Create Game',
                    },
                ]}
        />
        <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
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
                    {createMode ? "Create Game" : "Update Game"}
                </Button>
            </Form.Item>
        </Form>
    </Content>
  </>
    );
}