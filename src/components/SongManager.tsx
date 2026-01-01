import { useState } from "react";
import { Modal, Form, Input, Transfer, Button, List, Popconfirm, message, Space, Radio } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { TransferProps } from "antd";
import { Song } from "../types/song";
import { chords_basic } from "../chords/chords_basic";

interface SongManagerProps {
  songs: Song[];
  currentSongId: string;
  onSongsChange: (songs: Song[]) => void;
  onCurrentSongChange: (songId: string) => void;
}

interface RecordType {
  key: string;
  title: string;
}

export function SongManager({ songs, currentSongId, onSongsChange, onCurrentSongChange }: SongManagerProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  // 将基础和弦转换为 Transfer 组件需要的格式
  const chordsDataSource: RecordType[] = chords_basic.map((chord, index) => ({
    key: `${chord.title}-${index}`,
    title: chord.title,
  }));

  const handleAddSong = () => {
    setEditingSongId(null);
    form.resetFields();
    setTargetKeys([]);
    setIsAddModalOpen(true);
  };

  const handleEditSong = (song: Song) => {
    setEditingSongId(song.id);
    form.setFieldsValue({ name: song.name });
    // 设置已选择的和弦
    const selectedKeys = song.chords.map((chord) => {
      const index = chords_basic.findIndex(
        (c) => c.title === chord.title && JSON.stringify(c.strings) === JSON.stringify(chord.strings)
      );
      return `${chord.title}-${index}`;
    });
    setTargetKeys(selectedKeys);
    setIsAddModalOpen(true);
  };

  const handleDeleteSong = (songId: string) => {
    const newSongs = songs.filter((s) => s.id !== songId);
    onSongsChange(newSongs);
    
    // 如果删除的是当前歌曲，切换到第一首
    if (songId === currentSongId && newSongs.length > 0) {
      onCurrentSongChange(newSongs[0].id);
    }
    message.success("删除成功");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const selectedChords = targetKeys.map((key) => {
        const index = parseInt(key.split("-").pop() || "0");
        return chords_basic[index];
      });

      if (selectedChords.length === 0) {
        message.error("请至少选择一个和弦");
        return;
      }

      if (editingSongId) {
        // 编辑模式
        const newSongs = songs.map((s) =>
          s.id === editingSongId ? { ...s, name: values.name, chords: selectedChords } : s
        );
        onSongsChange(newSongs);
        message.success("更新成功");
      } else {
        // 添加模式
        const newSong: Song = {
          id: `song-${Date.now()}`,
          name: values.name,
          chords: selectedChords,
        };
        onSongsChange([...songs, newSong]);
        message.success("添加成功");
      }

      setIsAddModalOpen(false);
      form.resetFields();
      setTargetKeys([]);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
    form.resetFields();
    setTargetKeys([]);
  };

  const handleTransferChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys as string[]);
  };

  const filterOption = (inputValue: string, option: RecordType) =>
    option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>当前歌曲</div>
        <Radio.Group
          value={currentSongId}
          onChange={(e) => onCurrentSongChange(e.target.value)}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {songs.map((song) => (
              <Radio key={song.id} value={song.id} style={{ width: "100%" }}>
                <span style={{ marginRight: 8 }}>{song.name}</span>
                <span style={{ color: "#999", fontSize: 12 }}>({song.chords.length} 个和弦)</span>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>歌曲列表</span>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSong} size="small">
            添加歌曲
          </Button>
        </div>
        <List
          size="small"
          bordered
          dataSource={songs}
          renderItem={(song) => (
            <List.Item
              actions={[
                <Button
                  key="edit"
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEditSong(song)}
                />,
                <Popconfirm
                  key="delete"
                  title="确定删除这首歌曲吗？"
                  onConfirm={() => handleDeleteSong(song.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="text" size="small" danger icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={song.name}
                description={`包含 ${song.chords.length} 个和弦`}
              />
            </List.Item>
          )}
        />
      </div>

      <Modal
        title={editingSongId ? "编辑歌曲" : "添加新歌曲"}
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="歌曲名称"
            name="name"
            rules={[{ required: true, message: "请输入歌曲名称" }]}
          >
            <Input placeholder="请输入歌曲名称" />
          </Form.Item>
          <Form.Item label="选择和弦" required>
            <Transfer
              dataSource={chordsDataSource}
              titles={["可选和弦", "已选和弦"]}
              targetKeys={targetKeys}
              onChange={handleTransferChange}
              render={(item) => item.title}
              filterOption={filterOption}
              showSearch
              listStyle={{
                width: 280,
                height: 400,
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
