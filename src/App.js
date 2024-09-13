import axios from 'axios';
import './App.css';
import Navbar from './Navbar';  
import Category from './Category';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  let [finalCategory, setFinalCategory] = useState([]);
  let [finalPro, setFinalProduct] = useState([]);
  let [catName, setCatname] = useState('');

  let getCategory = () => {
    axios
      .get('https://dummyjson.com/products/categories')
      .then((res) => res.data)
      .then((finalRes) => {
        setFinalCategory(finalRes);
      });
  };

  let getProducts = () => {
    axios.get('https://dummyjson.com/products')
      .then((proRes) => proRes.data)
      .then((finalRes) => {
        setFinalProduct(finalRes.products);
      });
  }

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {
    if (catName !== '') {
      axios.get(`https://dummyjson.com/products/category/${catName}`)
        .then((proRes) => proRes.data)
        .then((finalRes) => {
          setFinalProduct(finalRes.products);
        })
        .catch(() => {
          setFinalProduct([]);
        });
    }
  }, [catName]);

  let Pitems = finalPro.map((products, index) => {
    return (
      <ProductItems key={index} pdata={products} />
    )
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar setCatname={setCatname} finalCategory={finalCategory} />
        <Routes>
          <Route path="/" element={ 
            <div className='py-16 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/e-commerce-background_691833-1051.jpg')" }}>
              <div className='bg-gradient-to-t from-gray-900 to-transparent py-16'>
                <div className='max-w-[1320px] mx-auto px-4'>
                  <h1 className='text-teal-500 text-[40px] font-[498] p-[5px] font-bold text-center mb-10 font-serif '>
                    Vivek's Premium Collections
                  </h1>
                  <div className='grid grid-cols-1 md:grid-cols-[30%_auto] gap-5 md:gap-8'>
                    <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                      <h2 className="text-lg font-semibold mb-4 text-gray-900">Categories</h2>
                      <Category finalCategory={finalCategory} setCatname={setCatname} />
                    </div>
                    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
                      <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Products</h2>
                      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {
                          finalPro.length >= 1 ?
                          Pitems
                          :
                          <p className='text-center text-gray-700'>No product found</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

function ProductItems({ pdata }) {
  return (
    <div className='shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform hover:scale-105'>
      <img src={pdata.thumbnail} className='w-full h-[250px] object-cover' alt={pdata.title} />
      <div className="p-4">
        <h4 className='mt-2 text-lg font-medium text-gray-900'>{pdata.title}</h4>
        <b className='text-xl text-green-600'>${pdata.price}</b>
      </div>
    </div>
  );
}
