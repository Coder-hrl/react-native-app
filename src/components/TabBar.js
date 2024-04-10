import {TabBar as AppTabBar} from '@ant-design/react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setTab} from 'store';
import {IconSet, LayoutWrapper} from 'components';
import {tabBarConfig} from 'config';

const TabBar = porps => {
  const dispatch = useDispatch();
  const tab = useSelector(state => state.tab.value);

  const [selectedTab, setSelectedTab] = useState(tab);

  const onChangeTab = tabName => {
    setSelectedTab(tabName);
    dispatch(setTab(tabName));
  };

  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  return (
    <AppTabBar
      unselectedTintColor="rgba(34,34,38,.3)"
      tintColor="rgba(51,119,255,1)"
      barTintColor="#fff">
      {/* tabBarConfig */}
      {tabBarConfig.map(item => {
        return (
          <AppTabBar.Item
            title={item.name}
            key={item.path}
            icon={
              <IconSet
                name={item.icon}
                size={20}
                style={{
                  color:
                    selectedTab === item.path
                      ? 'rgba(51,119,255,1)'
                      : 'rgba(34,34,38,.3)',
                }}
              />
            }
            selected={selectedTab === item.path}
            onPress={() => onChangeTab(item.path)}>
            <item.component />
          </AppTabBar.Item>
        );
      })}
    </AppTabBar>
  );
};

export default TabBar;
