import { LoadingOutlined } from '@ant-design/icons';
import { Row, Space, Spin } from "antd";
const Loading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
      }}
    >
      <Space>
       <Spin indicator={antIcon} />;
      </Space>
    </Row>
  );
};

export default Loading;
