import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className='' style={{ textAlign: 'center' }}>
      <hr className='mx-5 my-5 h-px bg-gray-200 dark:bg-gray-700' />
      <p>
        © {new Date().getFullYear()} Winter Social Network, {" "}
        <span className='text-base font-semibold'>Ngô Hiếu</span>
      </p>
    </Footer>
  );
};

export default FooterComponent;
