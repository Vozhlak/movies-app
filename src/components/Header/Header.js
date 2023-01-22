import { Tabs } from 'antd';

// eslint-disable-next-line no-unused-vars
const Header = ({ changeTab }) => {
  const tabs = [
    {
      key: '1',
      label: 'Search'
    },
    {
      key: '2',
      label: 'Rated'
    }
  ];

  return (
    <Tabs
      defaultActiveKey='1'
      items={tabs}
      onChange={(tabs) => changeTab(tabs)}
      style={{ height: '30px' }}
    />
  );
};

export default Header;
