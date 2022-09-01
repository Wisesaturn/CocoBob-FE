import { Link } from 'react-router-dom';
import { IPet } from '@/@type/pet';
import Layout from '@/components/layout/Layout';
import { useGetPetsQuery } from '@/store/api/petApi';
import { useGetUserQuery } from '@/store/api/userApi';
import useConfirm from '@/utils/hooks/useConfirm';
import useLogout from '@/utils/hooks/useLogout';
import useWithdrawal from '@/utils/hooks/useWithdrawal';
import AddPetBUtton from './components/AddPetButton';
import PetSimpleInfo from './components/PetSimpleInfo';
import {
  FlexColumn,
  MainContentsContainer,
  MainPetListContainer,
  MainPetListItem,
  MainTitleWrapper,
  MypageMenuItem,
} from './index.style';

export default function MypageMain() {
  const { data: user } = useGetUserQuery();
  const { data: pets, isLoading, isSuccess } = useGetPetsQuery();
  const logout = useLogout();
  const withdrawal = useWithdrawal();
  const [openPopup] = useConfirm();

  const changeRepresentativePet = async (petInfo: IPet) => {
    alert('준비중입니다.');
    console.log(petInfo);
  };
  const handleChangeRepresentativePet = async (petInfo: IPet) => {
    const confirm = await openPopup({
      title: '프로필 변경',
      contents: `${petInfo.name}로 프로필을 변경합니다.`,
    });
    if (confirm) {
      changeRepresentativePet(petInfo);
    }
  };
  return (
    <Layout header title="마이페이지" footer>
      <MainContentsContainer>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <FlexColumn className="p-4 gap-1 bg-white">
              <MainTitleWrapper>
                <h2>
                  <span className="text-primary-main">{user?.name}</span>님의 펫탈로그
                </h2>
              </MainTitleWrapper>
              <FlexColumn className="gap-3">
                <div className="flex items-center justify-between">
                  <h3>소중한 가족들</h3>
                  <Link to="/mypage/pets" className="text-caption">
                    전체보기
                  </Link>
                </div>

                <MainPetListContainer>
                  {isSuccess &&
                    pets?.map((pet, idx) => (
                      <MainPetListItem
                        className={idx === 0 ? 'border-primary-main' : ''}
                        key={idx}
                        onClick={() => handleChangeRepresentativePet(pet)}
                      >
                        <PetSimpleInfo {...pet} />
                      </MainPetListItem>
                    ))}
                  <AddPetBUtton />
                </MainPetListContainer>
              </FlexColumn>
            </FlexColumn>
            <FlexColumn className="bg-white">
              {[
                { page: '보호자님 정보 변경', path: '/mypage/profile' },
                { page: '찜한 제품', path: '/mypage/wish' },
              ].map((menu, idx) => (
                <MypageMenuItem key={idx}>
                  <Link to={menu.path}>
                    <h5>{menu.page}</h5>
                  </Link>
                </MypageMenuItem>
              ))}
              <MypageMenuItem>
                <button onClick={logout}>
                  <h5>로그아웃</h5>
                </button>
              </MypageMenuItem>
              <MypageMenuItem>
                <button onClick={withdrawal}>
                  <h5>회원탈퇴</h5>
                </button>
              </MypageMenuItem>
            </FlexColumn>
          </>
        )}
      </MainContentsContainer>
    </Layout>
  );
}
