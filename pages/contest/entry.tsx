import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Typography, Button, Form, Input } from 'antd';

const { Dragger } = Upload;
const { Title } = Typography;

const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

export default function Entry(){
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      
    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Title level={3}>Upload Image</Title>
            <Dragger style={{width: 300}} {...props}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
                </p>
            </Dragger>
            <Title level={3}>Information</Title>
            <Form
                name="basic"
                // labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Author"
                name="author"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input your title!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Concept"
                name="concept"
                rules={[{ required: true, message: 'Please input your concept!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}