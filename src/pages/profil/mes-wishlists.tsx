import React, { Suspense, useEffect, useState } from 'react';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import Layout from 'src/core/components/Layout';
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from '@blitzjs/next';
import getWishlistUser from 'src/wishlist/queries/getWishlistUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import createWishList from "src/wishlist/mutations/createWishList"

const WishlistList = () => {
  const [wishListMutation] = useMutation(createWishList)
  const [wishlists, setWishlists] = useState([]);
  var [selectedWishlist, setSelectedWishlist] = useState(null);
  const currentUser = useCurrentUser();
  const [newList, setNewList] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the visibility of the popup

  useEffect(() => {
    if (currentUser) {
      getWishlistUser(currentUser.id)
        .then((wishList) => {
          setWishlists(wishList);
          console.log('wishList', wishList);
        })
        .catch((error) => {
          console.error('Error retrieving wishlist:', error);
        });
    }
  }, [newList]);

  const handleWishlistClick = async (wishlistId) => {
    const selected = wishlists.find((wishlist) => wishlist.id === wishlistId);
    setSelectedWishlist(selectedWishlist = selected);
    console.log('wishlistId', selectedWishlist)
  };

  const handleToggleDropdown = () => {
    setSelectedWishlist((prevState) => (prevState === null ? wishlists[0] : null));
  };

  const handleAddWishlist = () => {
    setShowPopup(true);
  };

  return (
    <main className="flex flex-col items-center">
    <div className="flex items-center justify-between mb-4 w-full">
      <h1 className="text-3xl text-center mb-4 mx-auto">Liste des wishlists</h1>
        <div></div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddWishlist}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
        </button>
      </div>
      <ul className="mb-8">
        {wishlists.map((wishlist) => (
          <li
            key={wishlist.id}
            className="cursor-pointer hover:text-blue-500 flex items-center"
            onClick={() => handleWishlistClick(wishlist.id)}
          >
            <span className="mr-2">{wishlist.name}</span>
            <FontAwesomeIcon
              icon={selectedWishlist === wishlist ? faChevronUp : faChevronDown}
              className="text-lg cursor-pointer"
              onClick={handleToggleDropdown}
            />
          </li>
        ))}
      </ul>

      {selectedWishlist && (
          <div className="w-full max-w-md p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Produits de la wishlist "{selectedWishlist.name}"</h2>
            <ul>
              {selectedWishlist.products.map((product) => (
                <li key={product.id} className="mb-4">
                  <p className="font-semibold">
                  <a href={`/product/${product.id}`}>
                    <span style={{ color: 'black' }}>Nom:</span> <span className="text-blue-500 hover:underline">{product.name}</span>
                  </a>
                  </p>
                  <p>Prix: {product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Description: {product.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Ajouter une wishlist</h2>
            <Form
            submitText="Créer"
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                let wishlist = {
                  name: values.name,
                  idUser: currentUser.id,
                }
                await wishListMutation(wishlist)
                setNewList(newList + 1)
              } catch (error: any) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return { email: "This email is already being used" }
                } else {
                  return { [FORM_ERROR]: error.toString() }
                }
                }
              }}
              >
              <div>
                    <h3 className="text-xl font-bold mb-4">Créer une liste:</h3>
                    <form>
                    <LabeledTextField name="name" label="Nom" placeholder="Nom" />
                    </form>
                    </div>
              </Form>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowPopup(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

const WishlistPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-header bg-cover w-full h-384 bg-center">
        <h1 className="ml-144 pt-35 text-5xl text-orange-200 font-bold oldstyle-nums">
          jeune<span className="text-white">Campeur </span>
        </h1>
      </header>
      <Layout breadcrumb={'/'}>
        <Suspense fallback="Loading...">
          <WishlistList />
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

WishlistPage.authenticate = {redirectTo: '/auth/login'}
export default WishlistPage;
