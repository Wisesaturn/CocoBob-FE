import Layout from '@/components/layout/Layout';
import { useGetPetsQuery } from '@/store/api/petApi';
import AddPetButton from '../components/AddPetButton';
import PetSimpleCard from '../components/PetSimpleInfo';
import { FlexColumn, MainContentsContainer, PetListContainer, PetCard } from '../index.style';

export default function PetsPage() {
  const { data: pets, isSuccess } = useGetPetsQuery();

  return (
    <Layout header title="우리 아이 목록" canGoBack>
      <MainContentsContainer className="px-2">
        <div className="flex">
          <AddPetButton />
        </div>
        <FlexColumn className="gap-4">
          {isSuccess &&
            pets.map((pet) => (
              <PetListContainer key={pet.id}>
                <PetCard>
                  <PetSimpleCard
                    id={pet.id}
                    birthday={pet.birthday}
                    name={pet.name}
                    age={pet.age}
                    bodyWeight={pet.bodyWeight}
                    breedName={pet.breedName}
                    sex={pet.sex}
                    thumbnailPath={pet.thumbnailPath}
                  />
                </PetCard>
                <div className="pt-4">세부정보</div>
              </PetListContainer>
            ))}
        </FlexColumn>
      </MainContentsContainer>
    </Layout>
  );
}