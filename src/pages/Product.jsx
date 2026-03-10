import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Для кнопки корзины

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL;
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

function Product() {
  const { id } = useParams();
  const { addToCart } = useCart(); // Для добавления в корзину
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axios.get(`${STRAPI_URL}/api/products/${id}?populate=*`, {
        headers: { Authorization: STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : undefined },
      });
      return res.data.data;
    },
  });

  if (isLoading) return <div className="text-center py-8">Загрузка...</div>;
  if (error || !product) return <div className="text-center py-8 text-red-600">Товар не найден</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-bg min-h-screen items-center justify-center">
      {/* Большое фото — основной фокус */}
      <div className="md:w-1/2 w-full">
        <img 
          src={`${STRAPI_URL}${product.attributes.image?.data?.attributes?.url || '/placeholder.jpg'}`} 
          alt={product.attributes.name} 
          className="w-full h-auto object-cover rounded-lg shadow-md" 
        />
      </div>
      
      {/* Лаконичные детали — справа, минимально */}
      <div className="md:w-1/2 w-full p-4">
        <h1 className="text-3xl font-heading text-primary mb-2">{product.attributes.name}</h1>
        <p className="text-2xl font-base text-accent mb-4">{product.attributes.price} ₽</p>
        <p className="text-base font-base mb-6 line-clamp-2">{product.attributes.description || 'Описание отсутствует'}</p> {/* Урезано до 2 строк */}
        <button 
          onClick={() => addToCart(product)}
          className="bg-primary text-white px-6 py-3 rounded-full font-base hover:bg-accent transition"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default Product;