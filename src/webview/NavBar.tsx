import {useRecoilState} from 'recoil';
import {NavStatus, navArray, navStat} from '../stores/navStore';
import {webviewGlobalRef} from '../stores/webviewStore';
import styled from 'styled-components/native';
import {NavBtn} from './NavBtn';

const Container = styled.View`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 90px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #222738;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
`;

export default function Navbar(): JSX.Element {
  const [navStatus, setNavStatus] = useRecoilState(navStat);
  const [navs] = useRecoilState(navArray);
  const [webviewRef] = useRecoilState(webviewGlobalRef);

  const handleOnPress = (id: keyof typeof NavStatus) => {
    if (webviewRef) {
      webviewRef.postMessage(JSON.stringify({path: id}));
    }
    setNavStatus(NavStatus[id]);
  };

  return (
    <>
      {navStatus === NavStatus.NO_NAV ? null : (
        <Container>
          {navs.map(item => (
            <NavBtn
              key={item.name}
              item={item}
              isSelected={item.name === navStatus}
              onPress={() => handleOnPress(item.name)}
            />
          ))}
        </Container>
      )}
    </>
  );
}
