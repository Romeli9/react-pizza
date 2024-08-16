import { useState, useEffect, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

type pizzaType = {
  imageUrl: string;
  title: string;
  price: number;
};

const FullPizza: FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [pizza, setPizza] = useState<pizzaType>();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://66b4405e9f9169621ea23974.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при загрузке пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) return <p>Загрузка...</p>;

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
