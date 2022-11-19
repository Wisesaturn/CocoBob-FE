import { useNavigate } from 'react-router-dom';
import ContentsContainer from '@/components/ContentsContainer';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ProductPreviewType } from '@/@type/product';
import { VerticalBox, VerticalCenterBox } from '../index.style';

interface SwiperProductItemProps {
  product: ProductPreviewType;
  isActive: boolean;
}

export default function SwiperProductItem({ product, isActive }: SwiperProductItemProps) {
  const navigate = useNavigate();
  const { name, brand, productId, thumbnail } = product;
  const goProductDetailPage = () => navigate(`/products/${productId}`);

  return (
    <div
      className={concatClasses(
        'relative w-[130px] h-48 transition-transform',
        isActive ? 'scale-110' : 'scale-90',
      )}
    >
      <ContentsContainer>
        <VerticalBox className="flex-1 justify-between relative overflow-hidden text-ellipsis whitespace-nowrap">
          <div className="min-h-[60%]">
            <VerticalCenterBox onClick={goProductDetailPage}>
              <img className="rounded-t w-full h-full" src={thumbnail} alt={name} />
            </VerticalCenterBox>
          </div>
          <div className="p-1 flex flex-col flex-1 justify-between">
            <VerticalBox className="overflow-hidden py-1 space-y-1" onClick={goProductDetailPage}>
              <p className="text-[11px] leading-[11px] text-primary-dark font-semibold">{brand}</p>
              <p className="text-[12px] leading-[12px] w-full whitespace-pre-line">
                {`${name.slice(0, 28)}${name.length > 28 ? '...' : ''}`}
              </p>
            </VerticalBox>
          </div>
        </VerticalBox>
      </ContentsContainer>
    </div>
  );
}
