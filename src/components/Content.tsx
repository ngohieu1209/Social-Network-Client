import { Layout } from 'antd';
import CreatePost from './CreatePost';
import ListPost from './ListPost';

const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Content className='bg-white-F1cc'>
      <CreatePost />
      <ListPost />
    </Content>
  );
};

export default ContentComponent;
