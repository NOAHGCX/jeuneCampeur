import React, { Suspense, useEffect, useState } from 'react';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import Layout from 'src/core/components/Layout';
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from '@blitzjs/next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCardByUser from 'src/card/queries/getCardByUser';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import deleteProductCard from 'src/productCard/mutations/deleteProductCard';
import getAddressBUser from "src/address_Base/queries/getAddressBUser"
import getAddressFUser from "src/address_Fact/queries/getAddressFUser"
import createAddressBase from "src/address_Base/mutations/createAddressBase"
import createAddressFact from "src/address_Fact/mutations/createAddressFact"
import LabeledTextField from 'src/core/components/LabeledTextField';
import { Form, FORM_ERROR } from "src/core/components/Form"

const Panier = () => {
  const currentUser = useCurrentUser();
  const [card, setCard] = useState<any[]>([]);
  const [number, setNumber] = useState<any>(0);
  const [showPopup, setShowPopup] = useState(false);
  const [addressBase, setAddressBase] = useState<any>([]);
  const [addressFact, setAddressFact] = useState<any>([]);
  const [newAddress, setNewAddress] = useState<any>(0);

  useEffect(() => {
    if (currentUser) {
      getCardByUser(currentUser.id)
        .then((fetchedCard) => {
          console.log('Fetched card:', fetchedCard);
          setCard(fetchedCard.product_Card || []);
        })
        .catch((error) => {
          console.error('Error retrieving card:', error);
        });

        getAddressBUser(currentUser.id)
        .then((address) => {
          setAddressBase(address)
          console.log("addressBase", address)
        }
        )
        .catch((error) => {
          console.error('Error retrieving product:', error);
        }
        );

        getAddressFUser(currentUser.id)
      .then((address) => {
        setAddressFact(address)
        console.log("adressFact", address)
      }
      )
      .catch((error) => {
        console.error('Error retrieving product:', error);
      }
      );
    }
  }, [currentUser, number, newAddress]);



  const handleRemoveProduct = (productId: number) => {
    // Logic to remove the product from the card goes here
    deleteProductCard({id: productId})
      .then((productCard) => {
        console.log('productCard', productCard);
        setNumber(number + 1);
      }
      )
      .catch((error) => {
        console.error('Error retrieving product:', error);
      }
      );
    console.log('Removing product with ID:', productId);
  };

  const handleValidate = () => {
    setShowPopup(true);
  };


  return (
    <main className="flex flex-col items-center">
  <ul className="grid gap-4 grid-cols-3 w-750 h-400 text-sm mt-3 rounded-5 sticky overflow-auto list-none marker:scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 border border-gray-300">
    {card.map((productCard) => (
      <li key={productCard.id} className="flex items-center justify-between w-750">
        <div className="flex items-center w-750">
          <img src="/banniere.jpg" alt="Thumbnail" className="w-24 h-24 mr-30"/>
          <div >
            <div className="flex items-center">
              <p className="mr-30">
                <strong>Nom:</strong> {productCard.product.name}
              </p>
              <p className="mr-30">
                <strong>Quantité:</strong> {productCard.quantity}
              </p>
              <p>
                <strong>Prix:</strong> {productCard.product.price * productCard.quantity}
              </p>
            </div>
          </div>
        </div>
        <button
          className="p-2 rounded-full bg-red-500 text-white"
          onClick={() => handleRemoveProduct(productCard.id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </li>
    ))}
  </ul>
  <button
        className="p-2 rounded-full bg-green-500 text-white mb-4"
        onClick={handleValidate}
      >
        Valider
      </button>
  {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
          <h3>Adresse Base</h3>
          <ul className="border-orange border w-800 max-h-60 text-sm mt-3 rounded-5 sticky overflow-auto list-none">
              {addressBase.length > 0 ? (
                addressBase.map((wishList, index) => (
                  <li key={index}>
                     <div className="bg-gray-100 p-4 rounded mb-4 flex">
                      <p className="text-gray-800 flex-grow">Nom: {wishList.name}</p>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4"
                        onClick={() => handleButtonClick(wishList.id)}
                        disabled={clickedItems.includes(wishList.id)}
                      >
                        {clickedItems.includes(wishList.id) ? (
                          <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        ) : (
                          <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        )}
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                // Utilisez un <li> supplémentaire pour afficher le message "Pas encore d'avis"
                <li>
                  <p className="text-gray-800">Pas encore de liste de souhaits</p>
                </li>
              )}
              <li>
              <Form
            submitText="Créer Address Base"
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
              </li>
            </ul>
            <h3>Adresse Facturation</h3>
            <ul className="border-orange border w-800 max-h-60 text-sm mt-3 rounded-5 sticky overflow-auto list-none">
              {addressFact.length > 0 ? (
                addressFact.map((wishList, index) => (
                  <li key={index}>
                     <div className="bg-gray-100 p-4 rounded mb-4 flex">
                      <p className="text-gray-800 flex-grow">Nom: {wishList.name}</p>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4"
                        onClick={() => handleButtonClick(wishList.id)}
                        disabled={clickedItems.includes(wishList.id)}
                      >
                        {clickedItems.includes(wishList.id) ? (
                          <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        ) : (
                          <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        )}
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                // Utilisez un <li> supplémentaire pour afficher le message "Pas encore d'avis"
                <li>
                  <p className="text-gray-800">Pas encore de liste de souhaits</p>
                </li>
              )}
              <li>
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
              </li>
            </ul>

            <button
              className="p-2 bg-blue-500 text-white mt-4"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
</main>

  );
};


const PanierPage: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-header bg-cover w-full h-384 bg-center">
        <h1 className="ml-144 pt-35 text-5xl text-orange-200 font-bold oldstyle-nums">
          jeune<span className="text-white">Campeur </span>
        </h1>
      </header>
      <Layout breadcrumb={'/'}>
        <Suspense fallback="Loading...">
          <Panier/>
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

export default PanierPage;
