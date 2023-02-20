import { Layout } from 'antd';
import { ContentComponent, FooterComponent, HeaderComponent, SiderLeft, SiderRight } from '../components';


const HomePage = () => {
  return (
    <Layout>
      <HeaderComponent />
      <Layout className='site-layout'>
        <SiderLeft />
        <ContentComponent />
        <SiderRight />
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default HomePage;