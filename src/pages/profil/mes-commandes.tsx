import React, { Suspense, useEffect, useState } from 'react';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import Layout from 'src/core/components/Layout';
import { Routes, BlitzPage } from '@blitzjs/next';
import getWishlistUser from 'src/wishlist/queries/getWishlistUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import getBDCByUser from 'src/BDC/queries/getBDCUser';

const OrderList = () => {
  const [BDC, setBDC] = useState([]);
  const [selectedBDC, setSelectedBDC] = useState(null);
  const currentUser = useCurrentUser();
  const [newList, setNewList] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the visibility of the popup

  useEffect(() => {
    if (currentUser) {
      getBDCByUser(currentUser.id)
        .then((bdc) => {
          setBDC(bdc);
          console.log('bdc:', bdc)
        })
        .catch((error) => {
          console.error('Error retrieving wishlist:', error);
        });
    }
  }, [newList]);

  const handleWishlistClick = async (bdcId) => {
    const selected = BDC.find((bdc) => bdc.id === bdcId);
    setSelectedBDC(selected);
  };

  const handleToggleDropdown = () => {
    setSelectedBDC((prevState) => (prevState === null ? BDC[0] : null));
  };

  const handleAddWishlist = () => {
    setShowPopup(true);
  };

  return (
    <main className="flex flex-col items-center">
    <div className="flex items-center justify-between mb-4 w-full">
      <h1 className="text-3xl text-center mb-4 mx-auto">Liste des commandes</h1>

      </div>
      <ul className="mb-8">
        {BDC.map((BDC) => (
          <li
            key={BDC.id}
            className="cursor-pointer hover:text-blue-500 flex items-center"
            onClick={() => handleWishlistClick(BDC.id)}
          >
            <span className="mr-2">{BDC.id}</span>
            <FontAwesomeIcon
              icon={selectedBDC === BDC ? faChevronUp : faChevronDown}
              className="text-lg cursor-pointer"
              onClick={handleToggleDropdown}
            />
          </li>
        ))}
      </ul>

      {selectedBDC && (
        <div className="w-full max-w-md p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Produits de la commande "{selectedBDC.id}"</h2>
          <ul>
            {selectedBDC.product_BDC .map((product) => (
              <li key={product.id} className="mb-4">
                <a href={`/product/${product.id}`}>
                    <span style={{ color: 'black' }}>Nom:</span> <span className="text-blue-500 hover:underline">{product.product.name}</span>
                  </a>
                <p>Prix: {product.product.price}</p>
                <p>Quantité: {product.quantity}</p>
                <p>Prix total: {product.quantity * product.product.price}€</p>
              </li>
            ))}
          </ul>
          <h2>Date de commande: {selectedBDC.createdAt.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</h2>
        </div>
      )}
    </main>
  );
};

const OrderPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-header bg-cover w-full h-384 bg-center">
        <h1 className="ml-144 pt-35 text-5xl text-orange-200 font-bold oldstyle-nums">
          jeune<span className="text-white">Campeur </span>
        </h1>
      </header>
      <Layout breadcrumb={'/'}>
        <Suspense fallback="Loading...">
          <OrderList />
        </Suspense>
      </Layout>
      <footer className="bg-dark bg-cover h-268 bg-center">
        <div className="container mx-auto flex-col flex justify-center items-center h-268">
          <h1 className="text-3xl text-orange">
            jeune<span className="text-white">Campeur </span>
          </h1>
          <p className="lg:text-base text-white">27, rue Alexandre Dumas</p>
          <p className="lg:text-base xl:text-lg text-white">78100 St Germain en Laye</p>
          <p className="lg:text-base xl:text-lg text-white">+33 7 69 05 29 08</p>
          <p className="lg:text-base xl:text-lg text-white">jeuneCampeur@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

OrderPage.authenticate = {redirectTo: '/auth/login'}
export default OrderPage;
