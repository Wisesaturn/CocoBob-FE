import PetDefaultImage from '@/assets/image/pet_default.png';
import { ReactComponent as EditIcon } from '@/assets/icon/edit_icon.svg';
import { ReactComponent as MaleIcon } from '@/assets/icon/male_icon.svg';
import { ReactComponent as FemaleIcon } from '@/assets/icon/female_icon.svg';
import { IPet } from '@/@type/pet';
import { Link } from 'react-router-dom';

export default function PetSimpleCard({
  id,
  name,
  age,
  bodyWeight,
  breedName,
  sex,
  thumbnailPath,
}: IPet) {
  const years = Math.floor(age / 12);
  const months = age % 12;
  const ageInformation = `${years > 0 ? `${years}년` : ''} ${months}개월`;
  return (
    <>
      <div className="relative h-16 w-16">
        <img
          src={thumbnailPath ?? PetDefaultImage}
          alt=""
          className="h-16 w-16 bg-gray-300 rounded-full overflow-hidden"
        />
        <Link
          to={`/mypage/pets/${id}`}
          className="absolute right-0 bottom-0 w-5 h-5 bg-white border border-secondary-main rounded-md"
        >
          <EditIcon />
        </Link>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-light p-[3px]">
            {sex === 'MALE' ? <MaleIcon stroke="#1A70D2" /> : <FemaleIcon stroke="#1A70D2" />}
          </div>
          <h4>{name}</h4>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm">{breedName}</p>
          <p className="text-sm">
            {ageInformation}, {bodyWeight}kg
          </p>
        </div>
      </div>
    </>
  );
}