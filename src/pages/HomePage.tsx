import { Layout } from 'antd';
import HeaderComponent from '../components/Header';
import SiderLeft from '../components/SiderLeft';
import SiderRight from '../components/SiderRight';
import ContentComponent from '../components/Content';
import FooterComponent from '../components/Footer';

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