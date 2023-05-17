export type NavButtonProps = {
  item: {
    name: string;
    defaultIcon: any;
    selectedIcon: any;
  };
  isSelected: boolean;
  onPress: () => void;
};

export const nameMapper: Record<string, string> = {
  HOME: '홈',
  SEARCH_WORLD: '세계관 탐색',
  MY_WORLD: '내 새계관',
  MY_PAGE: '마이페이지',
};

export const NaviButtonStyle: Record<string, {width: number; height: number}> =
  {
    HOME: {
      width: 54,
      height: 32,
    },
    SEARCH_WORLD: {
      width: 32,
      height: 32,
    },
    MY_WORLD: {
      width: 25,
      height: 32,
    },
    MY_PAGE: {
      width: 34,
      height: 32,
    },
  };
