import {ImageSourcePropType} from 'react-native/types';
import {atom} from 'recoil';

interface NaviItem {
  name: NavStatus;
  defaultIcon: ImageSourcePropType;
  selectedIcon: ImageSourcePropType;
}

export enum NavStatus {
  HOME = 'HOME',
  NO_NAV = 'NO_NAV',
  SEARCH_WORLD = 'SEARCH_WORLD',
  MY_PAGE = 'MY_PAGE',
  MY_WORLD = 'MY_WORLD',
}

const navTab: NaviItem[] = [
  {
    name: NavStatus.HOME,
    defaultIcon: require('../assets/home_nav_icon.png'),
    selectedIcon: require('../assets/selected_home_nav_icon.png'),
  },
  {
    name: NavStatus.SEARCH_WORLD,
    defaultIcon: require('../assets/search_world_nav_icon.png'),
    selectedIcon: require('../assets/selected_search_world_nav_icon.png'),
  },
  {
    name: NavStatus.MY_WORLD,
    defaultIcon: require('../assets/my_world_nav_icon.png'),
    selectedIcon: require('../assets/selected_my_world_nav_icon.png'),
  },
  {
    name: NavStatus.MY_PAGE,
    defaultIcon: require('../assets/my_page_nav_icon.png'),
    selectedIcon: require('../assets/selected_my_page_nav_icon.png'),
  },
];

export const navStat = atom({
  key: 'NavStat',
  default: NavStatus.NO_NAV,
});

export const navArray = atom({
  key: 'NavArray',
  default: navTab,
});
