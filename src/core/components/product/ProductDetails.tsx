import React, { useEffect, useState } from 'react';
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import createWishList from "src/wishlist/mutations/createWishList"
import addProductWishList from "src/wishlist/mutations/addProductWishList"
import getWishlistUser from "src/wishlist/queries/getWishlistUser"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import getCardByUser from 'src/card/queries/getCardByUser';
import createCard from 'src/card/mutations/createCard';
import updateQuantity from 'src/productCard/mutations/updateQuantity';
import createProductCard from 'src/productCard/mutations/createProductCard';

type  ProductDetailsProps = {
  product?: any
}
const ProductDetails = (props: ProductDetailsProps) => {
  const [wishListMutation] = useMutation(createWishList)
  var [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedItems, setClickedItems] = useState<any>([]);
  const currentUser = useCurrentUser()
  const [wishList, setWishList] = useState<any>([]);
  const [newList, setNewList] = useState<any>(0);
  const [userConnected, setUserConnected] = useState<any>(currentUser ? true : false);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(quantity = newQuantity);
    console.log("newQuantity", quantity)
  };

  const handleAddToCart = () => {
    // Logique pour ajouter le produit au panier
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (currentUser) {
      getCardByUser(currentUser.id)
      .then((card) => {
        console.log("card", card)
        if(card == null){
          console.log("card1", card)
          createCard({idUser: currentUser.id})
          .then((card) => {
            console.log("card2", card)
            createProductCard({idCard: card.id, idProduct: props.product.id, quantity: quantity})
            .then((card) => {
              console.log("card3", card)
            }
            )
            .catch((error) => {
              console.error('Error retrieving product:', error);
            }
            );
          }
          )
          .catch((error) => {
            console.error('Error retrieving product:', error);
          }
          );
        }else{
          if(card.product_Card.length == 0){
            console.log("card5", card)
            createProductCard({idCard: card.id, idProduct: props.product.id, quantity: quantity})
            .then((card) => {
              console.log("card6", card)
            }
            )
            .catch((error) => {
              console.error('Error retrieving product:', error);
            }
            );
          }
          else{
          for (var i = 0; i < card.product_Card.length; i++) {
            var productCard = card.product_Card[i];
            console.log("productCard", productCard.id)
            // Vérifier si l'ID du produit correspond
            if (productCard.idProduct === props.product.id) {
              console.log("Le produit existe déjà.");
              updateQuantity({id: productCard.id, quantity: quantity})
              .then((card) => {
                console.log("card3", card)
              }
              )
              .catch((error) => {
                console.error('Error retrieving product:', error);
              }
              );
              break;
            }
            else{
              console.log("card4", card)
              createProductCard({idCard: card.id, idProduct: props.product.id, quantity: quantity})
              .then((card) => {
                console.log("card5", card)
              }
              )
              .catch((error) => {
                console.error('Error retrieving product:', error);
              }
              );
            }
          }
        }
        }
      }
      )
      .catch((error) => {
        console.error('Error retrieving product:', error);
      }
      );
    }
    else{
      setUserConnected(false)
      setShowPopup(true);
    }
  };


  const handleAddToWishlist = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const renderQuantityOptions = () => {
    const options = [];
    for (let i = 1; i <= props.product.stock; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const handleButtonClick = (id) => {
    if (currentUser) {
      console.log("id", id)
      console.log("currentUser.id", currentUser.id)
      const idWishList = parseInt(id)
      const idProduct = parseInt(props.product.id)
      addProductWishList({idWishList, idProduct})
      .then((wishList) => {
        setClickedItems([...clickedItems, id]);
        console.log("wishList", wishList)
      }
      )
      .catch((error) => {
        console.error('Error retrieving product:', error);
      }
      );
    }
  }


  useEffect(() => {
    console.log(userConnected)
    if (currentUser) {
      getWishlistUser(currentUser.id)
      .then((wishList) => {
        setWishList(wishList)
        console.log("wishList", wishList)
      }
      )
      .catch((error) => {
        console.error('Error retrieving product:', error);
      }
      );
    }
  }, [newList])
  return (
    <div className="w-64 p-4 border border-gray-300 rounded bg-white">
      <h2 className="text-lg font-bold mb-2">{props.product.name}</h2>
      <p className="text-gray-800 mb-2">Prix : {props.product.price}</p>
      <select
        value={quantity}
        onChange={handleQuantityChange}
        className="w-full mb-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      >
        {renderQuantityOptions()}
      </select>
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Ajouter au panier
      </button>
      <button
        onClick={handleAddToWishlist}
        className="w-full bg-gray-300 text-gray-800 py-2 rounded mt-2 hover:bg-gray-400"
      >
        Ajouter à la liste de souhaits
      </button>
      {showPopup && userConnected && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">Liste de souhaits</h2>
            <ul className="border-orange border w-800 max-h-60 text-sm mt-3 rounded-5 sticky overflow-auto list-none">
              {wishList.length > 0 ? (
                wishList.map((wishList, index) => (
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
              onClick={handleClosePopup}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
         {showPopup && !userConnected && (
  <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded shadow relative">
      <h2 className="text-lg font-bold mb-2">Veuillez vous connecter</h2>
      <p className="text-gray-800 mb-5">Veuillez vous connecter pour accéder à cette fonctionnalité.</p>
      <a href="/login" className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600">
        Se connecter
      </a>
      <button
        onClick={() => handleClosePopup()}
        className="bg-transparent border-none absolute top-0 right-1 mt-2 mr-2 text-gray-600 cursor-pointer"
      >
        <FontAwesomeIcon icon={faTimes} size="lg" color="black" />
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default ProductDetails;
