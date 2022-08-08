/* eslint-disable no-unused-vars */
import { ChangeEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { QuestionWrapper } from '@/pages/RegisterPet/index.style';
import ContentsContainer from '@/components/ContentsContainer';
import Layout from '@/components/layout/Layout';
import FormInput, { InputStyle, Label } from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';

import { ActivityLevelType, IBreeds, IPetInformation, PetSexType } from '@/@type/pet';
import { useGetPetsDetailQuery, useUpdatePetDataMutation } from '@/store/api/petApi';
import useSelectImage from '@/utils/hooks/useSelectImage';
import useBottomSheet from '@/utils/hooks/useBottomSheet';
import BreedBottomSheet from '@/components/BottomSheet/BreedBottomSheet';
import BirthdayBottomSheet from '@/components/BottomSheet/BirthdayBottomSheet';
import MonthsAgeBottomSheet from '@/components/BottomSheet/MonthsAgeBottomSheet';
import useAgeBottomSheet from '@/components/BottomSheet/hooks/useAgeBottomSheet';

import { ReactComponent as TrashIcon } from '@/assets/icon/trash_icon.svg';
import { ReactComponent as EditIcon } from '@/assets/icon/edit_icon.svg';
import { ReactComponent as CalendarIcon } from '@/assets/icon/calendar_icon.svg';

import PetDefault from '@/assets/image/pet_default.png';
import { RegisterInfoForm } from '@/store/slices/registerPetSlice';
import { getFileFromObjectURL } from '@/utils/libs/getFileFromObjectURL';
import {
  AgeDescription,
  AgeSelectButton,
  EditProfileLabel,
  FlexColumn,
  FlexColumnCenter,
  Form,
  RemoveProfileButton,
  SaveButtonContainer,
  SexTypeButton,
  SexTypeContainer,
  SexTypeLabel,
} from '../index.style';

interface IPetEditForm {
  name: string;
  bodyWeight: number;
  sex: PetSexType;
  isSpayed: boolean;
  isPregnant: boolean;
}
const activityLevels: ActivityLevelType[] = [1, 2, 3, 4, 5];
export default function PetDetail() {
  const { id } = useParams();
  if (!id) return <Navigate to="/404" replace />;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<IPetEditForm>();
  const navigate = useNavigate();
  const [updatePetData, { data: mutationResult }] = useUpdatePetDataMutation();
  const { isSuccess, isLoading, data: petData } = useGetPetsDetailQuery(+id);
  const { imageFile, previewUrl, handleChangeImage, setPreviewUrl } = useSelectImage({
    initPreviewUrl: petData?.thumbnailPath,
  });
  const { openBottomSheet: openBreedBottomSheet, isBottomSheetOpen: isBreedBottomSheetOpen } =
    useBottomSheet('findBreed');
  const {
    months,
    birthday,
    onSaveMonths,
    onSaveBirthday,
    isMonthsAgeBottomSheetOpen,
    openMonthsAgeBottomSheet,
    isBirthdayBottomSheetOpen,
    openBirthdayBottomSheet,
  } = useAgeBottomSheet({ petAge: petData?.age ?? 0, petBirthday: petData?.birthday ?? '' });

  const [selectedActivityLevel, setSelectedActivityLevel] = useState<ActivityLevelType>(3);
  const [breed, setBreed] = useState<IBreeds | undefined>();
  const [isImageDeleted, setIsImageDeleted] = useState(false); // 사진을 삭제했을 때 true, 변경하거나 그대로 유지 : false

  const deleteProfileImage = () => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (previewUrl && confirm('프로필 사진을 삭제하시겠습니까?')) {
      setPreviewUrl('');
      setIsImageDeleted(true);
    }
  };
  const onSubmit = async (data: IPetEditForm) => {
    if ((!months && !birthday) || !breed?.id) return;
    const updateParams = {
      petId: +id,
      isImageJustDeleted: isImageDeleted,
      formInput: {
        ...data,
        age: months,
        birthday,
        activityLevel: selectedActivityLevel,
        breedId: breed?.id,
      } as RegisterInfoForm<File>,
    };
    if (imageFile) {
      updateParams.formInput.petImage = await getFileFromObjectURL(imageFile);
    }
    updatePetData(updateParams);
  };

  const initForm = (data: IPetInformation) => {
    setValue('name', data.name);
    setValue('bodyWeight', data.bodyWeight);
    setValue('sex', data.sex);
    setValue('isPregnant', data.isPregnant);
    setValue('isSpayed', data.isSpayed);
    setSelectedActivityLevel(data.activityLevel);
    setBreed(data.breedInfo);
    setPreviewUrl(data.thumbnailPath);
  };

  useEffect(() => {
    if (petData) {
      initForm(petData);
    }
  }, [petData]);
  useEffect(() => {
    if (imageFile) {
      setIsImageDeleted(false);
    }
  }, [imageFile]);
  useEffect(() => {
    if (!mutationResult) return;
    navigate('/mypage/pets');
    alert('성공적으로 정보를 수정하였습니다.');
  }, [mutationResult]);

  return (
    <Layout header title="우리아이 정보 수정" canGoBack>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          <div className="p-2 px-3 relative">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <ContentsContainer>
                <FlexColumnCenter className="w-full">
                  <div className="relative w-32 h-32 bg-white">
                    <EditProfileLabel htmlFor="pet-thumbnail">
                      <EditIcon />
                      {/* <img src={AddPhotoImage} alt="" /> */}
                    </EditProfileLabel>
                    <input
                      type="file"
                      id="pet-thumbnail"
                      className="hidden"
                      accept="image/jpg, image/png, image/jpeg"
                      onChange={handleChangeImage}
                    />
                    {previewUrl && (
                      <RemoveProfileButton onClick={deleteProfileImage} type="button">
                        <TrashIcon />
                      </RemoveProfileButton>
                    )}
                    <img
                      src={previewUrl || PetDefault}
                      alt=""
                      className="rounded-full overflow-hidden"
                    />
                  </div>
                </FlexColumnCenter>
              </ContentsContainer>
              <ContentsContainer>
                <FlexColumn className="w-full p-2 gap-5">
                  <FormInput
                    label="이름"
                    name="pet-name"
                    placeholder="반려동물의 이름을 입력해주세요"
                    rules={register('name', {
                      required: '이름을 입력해주세요',
                      maxLength: 20,
                    })}
                    type="text"
                    isError={!!errors.name?.message}
                    errorMessage={errors.name?.message}
                  />
                  <div className="space-y-2">
                    <Label isError={false}>견종</Label>
                    <InputStyle
                      isError={false}
                      onChange={(e) => e.preventDefault()}
                      className="text-gray-400 text-left p-2 border-b border-b-gray-400"
                      onClick={openBreedBottomSheet}
                      placeholder={breed?.id ? breed?.name : '품종을 검색해보세요'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label isError={false}>나이</Label>
                    <FlexColumn className="gap-2">
                      <FlexColumn className="gap-1">
                        <AgeSelectButton
                          className={birthday ? 'border-primary-main' : 'border-gray-300'}
                          type="button"
                          onClick={openBirthdayBottomSheet}
                        >
                          생년월일을 알고 있어요
                        </AgeSelectButton>
                        {birthday && (
                          <AgeDescription>
                            <CalendarIcon className="w-5 h-5" />
                            {birthday}
                          </AgeDescription>
                        )}
                      </FlexColumn>
                      <div className="flex flex-col gap-1">
                        <AgeSelectButton
                          className={birthday ? 'border-gray-300' : 'border-primary-main'}
                          type="button"
                          onClick={openMonthsAgeBottomSheet}
                        >
                          대략적인 나이만 알고 있어요
                        </AgeSelectButton>
                        {!birthday && (
                          <AgeDescription>
                            <CalendarIcon className="w-5 h-5" />
                            {months >= 12
                              ? `${Math.floor(months / 12)}년 ${months % 12}개월`
                              : `${months}개월`}
                          </AgeDescription>
                        )}
                      </div>
                    </FlexColumn>
                  </div>
                  <FormInput
                    label="몸무게"
                    name="bodyWeight"
                    placeholder="몸무게를 입력해주세요"
                    rules={register('bodyWeight', {
                      required: true,
                      valueAsNumber: true,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: '숫자를 입력해주세요',
                      },
                    })}
                    type="text"
                  />
                  <div className="space-y-2">
                    <Label isError={false}>성별</Label>
                    <SexTypeContainer>
                      <SexTypeButton>
                        <input
                          type="radio"
                          className="hidden"
                          value="MALE"
                          id="pet-sex-man"
                          {...register('sex', { required: '성별을 선택해주세요' })}
                        />
                        <SexTypeLabel
                          htmlFor="pet-sex-man"
                          className={
                            watch('sex') === 'MALE' ? 'bg-primary-light text-primary-main' : ''
                          }
                        >
                          남자
                        </SexTypeLabel>
                      </SexTypeButton>
                      <SexTypeButton>
                        <input
                          type="radio"
                          className="hidden"
                          value="FEMALE"
                          id="pet-sex-woman"
                          {...register('sex', { required: '성별을 선택해주세요' })}
                        />
                        <SexTypeLabel
                          htmlFor="pet-sex-woman"
                          className={
                            watch('sex') === 'FEMALE' ? 'bg-primary-light text-primary-main' : ''
                          }
                        >
                          여자
                        </SexTypeLabel>
                      </SexTypeButton>
                    </SexTypeContainer>
                  </div>
                  <div>
                    <QuestionWrapper>
                      <input type="checkbox" id="spayed" {...register('isSpayed')} />
                      <label htmlFor="spayed">중성화를 했나요?</label>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <input type="checkbox" id="pregnant" {...register('isPregnant')} />
                      <label htmlFor="pregnant">임신/수유 중인가요?</label>
                    </QuestionWrapper>
                  </div>
                  <FlexColumn className="gap-2">
                    <p>활동수준</p>
                    <div className="flex gap-4">
                      {activityLevels.map((value) => (
                        <input
                          key={value}
                          type="radio"
                          name={String(value)}
                          id={`activity-level-${value}`}
                          value={value}
                          checked={value === selectedActivityLevel}
                          onChange={() => setSelectedActivityLevel(value)}
                        />
                      ))}
                    </div>
                  </FlexColumn>
                </FlexColumn>
              </ContentsContainer>
              <SaveButtonContainer>
                <FormButton name="저장" />
              </SaveButtonContainer>
            </Form>
          </div>
          <BreedBottomSheet isOpen={isBreedBottomSheetOpen} setBreed={setBreed} />
          <BirthdayBottomSheet
            isOpen={isBirthdayBottomSheetOpen}
            birthday={birthday}
            onSave={onSaveBirthday}
          />
          <MonthsAgeBottomSheet
            isOpen={isMonthsAgeBottomSheetOpen}
            months={months}
            onSave={onSaveMonths}
          />
        </>
      )}
    </Layout>
  );
}