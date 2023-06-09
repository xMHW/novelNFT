import { InboxOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { message, Upload, Typography, Button, Form, Input, Modal } from 'antd';
import { submitContest } from '@/lib/apis';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { useRouter } from 'next/router';

const { Dragger } = Upload;
const { Title } = Typography;

const userID = "b518694f-02e0-488a-b497-005b002a290e"
const contestID = "1"

const props: UploadProps = {
    name: 'file',
    multiple: false,
    customRequest: async ({ file, onSuccess, onError }) => { 
      try {
          const _file = (file as RcFile)
          const { data, error } = await supabase.storage
          .from("contest_submissions")
          .upload(`./${_file.name}`, _file);
          console.log(data.path)

          const url = "https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/contest_submissions/" + data.path.slice(2)
          console.log(url)
          const { response } = await submitContest(userID, contestID, url)
          console.log(response)

          console.log("success")
          onSuccess(data);
      } catch (error) {
          console.log("error")
          onSuccess(error);
          console.log(error)
          // onError(error);
      }
    },
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
    const router = useRouter();
    const [onPreview, setOnPreview] = useState<boolean>(false)
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
                Support for a single or bulk upload.
                </p>
                
            </Dragger>
            <Button style={{marginTop: 5}} onClick={()=>setOnPreview(true)}>Preview</Button>
            <Modal open={onPreview} title={"preview"} footer={null} onCancel={()=>setOnPreview(false)}>
              <img alt="example" style={{ width: '100%' }} src={"https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/contest_submissions/Whispers%20from%20t%200.png"} />
            </Modal>
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
                <Button 
                style={{ alignContent: "start", background: "#3056D3", color: "white" }} 
                htmlType="submit"
                onClick={()=>router.push("/contest/ongoing/submissions")}
                >
                    Register
                </Button>
            </Form>
        </div>
    )
}