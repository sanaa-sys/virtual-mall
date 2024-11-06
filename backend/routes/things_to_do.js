//IN login add:
import { useState } from 'react';
import { login } from '../api';  // Adjust path as needed

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      console.log('Logged in:', response.data);
      // Store token or navigate to dashboard
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div>
      {/* Form with email and password fields */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}


//In products add:
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.product_id}>{product.name} - ${product.price}</div>
      ))}
    </div>
  );
}


//Securing the API with JSON Web Tokens (JWT)


/*
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
*/