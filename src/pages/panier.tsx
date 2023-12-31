import React, { Suspense, useEffect, useState } from 'react';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import Layout from 'src/core/components/Layout';
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from '@blitzjs/next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCardByUser from 'src/card/queries/getCardByUser';
import { faCheck, faPlus, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import deleteProductCard from 'src/productCard/mutations/deleteProductCard';
import getAddressBUser from "src/address_Base/queries/getAddressBUser"
import getAddressFUser from "src/address_Fact/queries/getAddressFUser"
import createAddressBase from "src/address_Base/mutations/createAddressBase"
import createAddressFact from "src/address_Fact/mutations/createAddressFact"
import LabeledTextField from 'src/core/components/LabeledTextField';
import { Form, FORM_ERROR } from "src/core/components/Form"
import createBDC from "src/BDC/mutations/createBDC"
import createProductBDC from 'src/core/productBDC/mutations/createProductBDC';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import updateStats from 'src/stats/mutations/updateStats';
import { set } from 'zod';

const Panier = () => {
  const currentUser = useCurrentUser();
  const [card, setCard] = useState<any[]>([]);
  const [number, setNumber] = useState<any>(0);
  const [showPopup, setShowPopup] = useState(false);
  const [addressBase, setAddressBase] = useState<any[]>([]);
  const [addressFact, setAddressFact] = useState<any[]>([]);
  const [baseAddress, setBaseAddress] = useState<any[]>([]);
  const [factAddress, setFactAddress] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState<any>(0);
  const [showBaseForm, setShowBaseForm] = useState(false);
  const [showFactForm, setShowFactForm] = useState(false);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedFact, setSelectedFact] = useState(null);
  const [cardForm, setCardForm] = useState<any>(null);
  const [showPayement, setShowPayement] = useState(false);

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
          setAddressBase(address);
          console.log("addressBase", address);
        })
        .catch((error) => {
          console.error('Error retrieving product:', error);
        });

      getAddressFUser(currentUser.id)
        .then((address) => {
          setAddressFact(address);
          console.log("addressFact", address);
        })
        .catch((error) => {
          console.error('Error retrieving product:', error);
        });
    }
    if(selectedBase  && selectedFact){
      console.log(selectedBase, selectedFact)
      setCardForm(true)
    }
  }, [currentUser, number, newAddress,selectedBase, selectedFact]);

  const handleRemoveProduct = (productId: number) => {
    // Logic to remove the product from the card goes here
    deleteProductCard({ id: productId })
      .then((productCard) => {
        console.log('productCard', productCard);
        setNumber(number + 1);
      })
      .catch((error) => {
        console.error('Error retrieving product:', error);
      });

    console.log('Removing product with ID:', productId);
  };

  const handleValidate = () => {
    setShowPopup(true);
  };

  const handleSelectBase = (baseId) => {
    setSelectedBase(baseId.id);
    setBaseAddress(baseId);
    console.log("selectedBase", selectedBase)
  };

  const handleSelectFact = (factId) => {
    setSelectedFact(factId.id);
    setFactAddress(factId);
    console.log("selectedFact", selectedFact)
  };

  const handleDismissPayement = () => {
    setShowPayement(false);
  };


  // Fonction pour générer le PDF de facturation
const generateInvoicePDF = async (buyerName, purchaseDate, baseAddress, facturationAddress, products) => {
  console.log("buyerName", buyerName);
  console.log("purchaseDate", purchaseDate);
  console.log("baseAddress", baseAddress);
  console.log("facturationAddress", facturationAddress);
  console.log("products", products);

  // Création d'un nouveau document PDF
  const pdfDoc = await PDFDocument.create();

  // Définition des polices de caractères
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Fonction pour créer un rectangle avec le texte spécifié
  const drawRectangle = (x, y, width, height, text, page) => {
    page.drawText(text, { x, y: y - height + 15, font, size: 12, color: rgb(0, 0, 0) });
    page.drawRectangle({ x, y, width, height, color: rgb(0.9, 0.9, 0.9) });
  };

  const drawBaseAddressInfo = (x, y, address, page) => {
    console.log("addressBasePDF", address);
    const lineHeight = 15;
    const fields = [
      { label: "Nom:", value: `${buyerName}` },
      { label: "Numéro:", value: address.number.toString() },
      { label: "Rue:", value: address.road },
      { label: "Ville:", value: address.city },
      { label: "Département:", value: address.department },
      { label: "Pays:", value: address.country },
      { label: "Code postal:", value: address.postcode.toString() },
      { label: "Complémentaire:", value: address.complimentary },
    ];

    console.log("fieldsBase", fields);
    let currentY = y;
    fields.forEach((field) => {
      page.drawText(field.label, { x, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      page.drawText(field.value.toString(), { x: x + 120, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      currentY -= lineHeight;
    });
  };

  const drawFactAddressInfo = (x, y, address, page) => {
    console.log("addressFactPDF", address);
    const lineHeight = 15;
    const fields = [
      { label: "Nom:", value: `${address.first_name} ${address.last_name}` },
      { label: "Mail:", value: address.email },
      { label: "Numéro:", value: address.number.toString() },
      { label: "Rue:", value: address.road },
      { label: "Ville:", value: address.city },
      { label: "Département:", value: address.department },
      { label: "Pays:", value: address.country },
      { label: "Code postal:", value: address.postcode.toString() },
      { label: "Complémentaire:", value: address.complimentary },
    ];
    console.log("fieldsFact", fields);
    let currentY = y;
    fields.forEach((field) => {
      page.drawText(field.label, { x, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      page.drawText(field.value.toString(), { x: x + 120, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      currentY -= lineHeight;
    });
  };

  const drawProductList = (x, y, products, page) => {
    const lineHeight = 15;
    const pageHeight = 700; // Hauteur maximale d'une page
    let currentY = y;
    var totalPriceFinale = 0;

    const drawProductRow = (page, product) => {
      console.log("product pdf", product);
      const totalPrice = product.quantity * product.product.price;
      totalPriceFinale = totalPriceFinale + totalPrice;
      page.drawText(product.product.name, { x, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      page.drawText(product.quantity.toString(), { x: x + 200, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      page.drawText(product.product.price.toString(), { x: x + 300, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      page.drawText(totalPrice.toString(), { x: x + 400, y: currentY, font, size: 12, color: rgb(0, 0, 0) });
      currentY -= lineHeight;
    };


    products.forEach((product) => {
      if (currentY <= lineHeight) {
        // Créer une nouvelle page si la hauteur est atteinte
        page= pdfDoc.addPage();
        currentY = pageHeight - lineHeight;
      }
      drawProductRow(page, product);
    });
    console.log("totalPriceFinale", totalPriceFinale);
    page.drawText("Prix Total (€)", { x: 50, y: currentY - 10, font, size: 12, color: rgb(0, 0, 0) });
    page.drawText(totalPriceFinale.toString(), { x: 450, y: currentY - 10, font, size: 12, color: rgb(0, 0, 0) });
  };

  // Affichage des informations de l'acheteur
  const page = pdfDoc.addPage();
  const buyerInfo = `Nom de l'acheteur: ${buyerName}`;
  const purchaseInfo = `Date de l'achat: ${purchaseDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
  drawRectangle(50, 750, 400, 30, buyerInfo, page);
  drawRectangle(420, 750, 200, 30, purchaseInfo, page);

  // Affichage de l'adresse de base
  page.drawText(`Adresse Livraison`, { x : 340, y : 700, font, size: 15, color: rgb(0, 0, 0) });
  drawBaseAddressInfo(340, 670, baseAddress, page);

  // Affichage de l'adresse de facturation
  page.drawText(`Adresse Facturation`, { x : 50, y : 700, font, size: 15, color: rgb(0, 0, 0) });
  drawFactAddressInfo(50, 670, facturationAddress, page);

  // Affichage de la liste des produits
  page.drawText(`Produits`, { x : 50, y : 515, font, size: 15, color: rgb(0, 0, 0) });
  page.drawText(`Nom`, { x : 50, y : 490, font, size: 13, color: rgb(0, 0, 0) });
  page.drawText(`Quantité`, { x : 250, y : 490, font, size: 13, color: rgb(0, 0, 0) });
  page.drawText(`Prix unitaire (€)`, { x : 350, y : 490, font, size: 13, color: rgb(0, 0, 0) });
  page.drawText(`Prix total (€)`, { x : 450, y : 490, font, size: 13, color: rgb(0, 0, 0) });
  drawProductList(50, 470, products, page);

  // Génération du document PDF en bytes
  const pdfBytes = await pdfDoc.save();

  // Créer un Blob à partir des octets PDF
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Créer un lien de téléchargement
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(pdfBlob);
  downloadLink.download = 'document.pdf';
  downloadLink.target = '_blank'; // Ouvrir le lien dans un nouvel onglet

  // Ajouter le lien de téléchargement à la page
  document.body.appendChild(downloadLink);

  // Déclencher le téléchargement
  downloadLink.click();

  // Supprimer le lien de téléchargement de la page (facultatif)
  document.body.removeChild(downloadLink);
};



  return (
    <main className="flex flex-col items-center">
    {card.length === 0 ? (
    <div className="flex items-center justify-center w-750 h-400">
      <p className="text-2xl font-bold">Votre panier est vide</p>
    </div>
  ) : (
    <div className="flex flex-col items-center">
   <ul className="w-500 h-400 text-sm mt-3 rounded-5 sticky overflow-auto list-none marker:scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 border border-gray-300 mb-10 flex-col">
  {card.map((productCard) => (
    <li key={productCard.id} className="flex items-center justify-between w-400 m-20 m-20">
      <div className="flex items-center w-full">
        <img src="/banniere.jpg" alt="Thumbnail" className="w-24 h-24 mr-3" />
        <div className="flex items-center">
        <a href={`/produit/${productCard.product.id}`} className="mr-3">
          <strong>{productCard.product.name}</strong>
        </a>
          <p className="mr-3">
            <strong>Quantité:</strong> {productCard.quantity}
          </p>
          <p>
            <strong>Prix:</strong> {productCard.product.price * productCard.quantity}
          </p>
        </div>
        <label
          className="p-2 rounded-full right-6 absolute  bg-red-500 text-white cursor-pointer"
          htmlFor={`product-checkbox-${productCard.id}`}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </label>
        <input
          type="checkbox"
          id={`product-checkbox-${productCard.id}`}
          className="hidden"
          onChange={() => handleRemoveProduct(productCard.id)}
        />
      </div>
    </li>
  ))}
</ul>
    <button className="p-2 rounded-full bg-green-500 text-white mb-4" onClick={handleValidate}>
      Valider
    </button>
  </div>
  )}
    {showPopup && (
      <div className="fixed overflow-auto top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md h-400 overflow-auto">
          <div>
            <h3 className="text-xl font-bold mb-4">Adresse Base</h3>
            <ul className="border-orange border w-800 max-h-60 text-sm mt-3 rounded-5 sticky overflow-auto list-none">
              {addressBase.length > 0 ? (
                addressBase.map((addressBase, index) => (
                  <li key={index}>
                    <div className={`bg-gray-100 p-4 rounded mb-4 flex ${selectedBase === addressBase.id ? 'bg-blue-200' : ''}`}>
                      <p className="text-gray-800 flex-grow">Numéro: {addressBase.number}</p>
                      <p className="text-gray-800 flex-grow">Rue: {addressBase.road}</p>
                      <p className="text-gray-800 flex-grow">Ville: {addressBase.city}</p>
                      <p className="text-gray-800 flex-grow">Département: {addressBase.department}</p>
                      <p className="text-gray-800 flex-grow">Pays: {addressBase.country }</p>
                      <p className="text-gray-800 flex-grow">Code Postal: {addressBase.postcode}</p>
                      <p className="text-gray-800 flex-grow">Complémentaire: {addressBase.complimentary}</p>
                      <label
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4 cursor-pointer"
                        htmlFor={`base-checkbox-${addressBase.id}`}
                      >
                        {selectedBase === addressBase.id ? (
                          <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        ) : (
                          <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        )}
                      </label>
                      <input
                        type="checkbox"
                        id={`base-checkbox-${addressBase.id}`}
                        className="hidden"
                        onChange={() => handleSelectBase(addressBase)}
                      />
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <p className="text-gray-800">Pas encore d'adresse de base</p>
                </li>
              )}
            </ul>
            {showBaseForm ? (
              <Form
                submitText="Créer Adresse Base"
                initialValues={{ name: "", number: "", road: "", city: "", departement: "", country: "", postcode: "", complimentary: "" }}
                onSubmit={async (values) => {
                  try {
                    const address = {
                      name: values.name,
                      number: parseInt(values.number),
                      road: values.road,
                      city: values.city,
                      department: values.department,
                      country: values.country,
                      postcode: values.postcode,
                      complimentary: values.complimentary || "",
                      userID: parseInt(currentUser.id),
                    };
                    await createAddressBase(address);
                    setNewAddress(newAddress + 1);
                  } catch (error: any) {
                    console.error('Error creating address:', error);
                  }
                }}
              >
                <div>
              <h3 className="text-xl font-bold mb-4 flex justify-between">
                Créer une adresse de base:
                <button
                  onClick={() => setShowBaseForm(false)}
                  className="bg-transparent border-none text-gray-600 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" color="black" />
                </button>
              </h3>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <LabeledTextField name="name" label="Nom" placeholder="Nom" />
                </div>
                <div>
                  <LabeledTextField name="number" label="Numéro" placeholder="Numéro" />
                </div>
                <div>
                  <LabeledTextField name="road" label="Rue" placeholder="Rue" />
                </div>
                <div>
                  <LabeledTextField name="city" label="Ville" placeholder="Ville" />
                </div>
                <div>
                  <LabeledTextField name="department" label="Département" placeholder="Département" />
                </div>
                <div>
                  <LabeledTextField name="country" label="Pays" placeholder="Pays" />
                </div>
                <div>
                  <LabeledTextField name="postcode" label="Code Postal" placeholder="Code Postal" />
                </div>
                <div>
                  <LabeledTextField name="complimentary" label="Complémentaire" placeholder="Complémentaire" />
                </div>
              </div>
            </div>
              </Form>
            ) : (
              <button
                className="p-2 bg-blue-500 text-white mt-4"
                onClick={() => setShowBaseForm(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Ajouter une adresse de base
              </button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Adresse Facturation</h3>
            <ul className="border-orange border w-800 max-h-60 text-sm mt-3 rounded-5 sticky overflow-auto list-none">
              {addressFact.length > 0 ? (
                addressFact.map((addressFact, index) => (
                  <li key={index}>
                    <div className={`bg-gray-100 p-4 rounded mb-4 flex ${selectedFact === addressFact.id ? 'bg-blue-200' : ''}`}>
                      <p className="text-gray-800 flex-grow">Prénom: {addressFact.first_name }</p>
                      <p className="text-gray-800 flex-grow">Nom: {addressFact.last_name}</p>
                      <p className="text-gray-800 flex-grow">Email: {addressFact.email}</p>
                      <p className="text-gray-800 flex-grow">Numéro: {addressFact.number}</p>
                      <p className="text-gray-800 flex-grow">Rue: {addressFact.road}</p>
                      <p className="text-gray-800 flex-grow">Ville: {addressFact.city}</p>
                      <p className="text-gray-800 flex-grow">Département: {addressFact.department}</p>
                      <p className="text-gray-800 flex-grow">Pays: {addressFact.country }</p>
                      <p className="text-gray-800 flex-grow">Code Postal: {addressFact.postcode}</p>
                      <p className="text-gray-800 flex-grow">Complémentaire: {addressFact.complimentary}</p>
                      <label
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-4 cursor-pointer"
                        htmlFor={`fact-checkbox-${addressFact.id}`}
                      >
                        {selectedFact === addressFact.id ? (
                          <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        ) : (
                          <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        )}
                      </label>
                      <input
                        type="checkbox"
                        id={`fact-checkbox-${addressFact.id}`}
                        className="hidden"
                        onChange={() => handleSelectFact(addressFact)}
                      />
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <p className="text-gray-800">Pas encore d'adresse de facturation</p>
                </li>
              )}
            </ul>
            {showFactForm ? (
              <Form
                submitText="Créer une Adresse de Facturation"
                initialValues={{ first_name: "", last_name: "", email: "", number: "", road: "", city: "", departement: "", country: "", postcode: "", complimentary: "" }}
                onSubmit={async (values) => {
                  try {
                    const address = {
                      first_name: values.first_name,
                      last_name: values.last_name,
                      email: values.email,
                      number: parseInt(values.number),
                      road: values.road,
                      city: values.city,
                      department: values.departement,
                      country: values.country,
                      postcode: values.postcode,
                      complimentary: values.complimentary || "",
                      userID: parseInt(currentUser.id),
                    };
                    await createAddressFact(address);
                    setNewAddress(newAddress + 1);
                  } catch (error: any) {
                    console.error('Error creating address:', error);
                  }
                }}
              >
                <div>
                  <h3 className="text-xl font-bold mb-4 flex justify-between">
                  Créer une adresse de facturation:
                <button
                  onClick={() => setShowFactForm(false)}
                  className="bg-transparent border-none text-gray-600 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" color="black" />
                </button>
              </h3>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <LabeledTextField name="first_name" label="Prénom" placeholder="Prénom" />
                </div>
                <div>
                  <LabeledTextField name="last_name" label="Nom" placeholder="Nom" />
                </div>
                <div>
                  <LabeledTextField name="email" label="Email" placeholder="Email" />
                </div>
                <div>
                  <LabeledTextField name="number" label="Numéro" placeholder="Numéro" />
                </div>
                <div>
                  <LabeledTextField name="road" label="Rue" placeholder="Rue" />
                </div>
                <div>
                  <LabeledTextField name="city" label="Ville" placeholder="Ville" />
                </div>
                <div>
                  <LabeledTextField name="departement" label="Département" placeholder="Département" />
                </div>
                <div>
                  <LabeledTextField name="country" label="Pays" placeholder="Pays" />
                </div>
                <div>
                  <LabeledTextField name="postcode" label="Code Postal" placeholder="Code Postal" />
                </div>
                <div>
                  <LabeledTextField name="complimentary" label="Complémentaire" placeholder="Complémentaire" />
                </div>
              </div>
            </div>
              </Form>
            ) : (
              <button
                className="p-2 bg-blue-500 text-white mt-4"
                onClick={() => setShowFactForm(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Ajouter une adresse de facturation
              </button>
            )}
          </div>
          {cardForm ? (

          <Form
          submitText="Payer"
          initialValues={{ idAddressBase: "", idAddressFact: "", userId: ""}}
          onSubmit={async (values) => {
            const totalPrice = card.reduce((acc, productCard) => {
              return acc + productCard.product.price * productCard.quantity;
            }, 0);
            try {
              const BDC = {
                idAddressBase: parseInt(selectedBase),
                idAddressFact: parseInt(selectedFact),
                idUser: parseInt(currentUser.id),
                totalPrice: totalPrice
              };
              const bdc = await createBDC(BDC);
              console.log("card", card)
              card.forEach((productCard) => {
                try {
                  const product = {
                    idProduct: productCard.product.id,
                    idBDC: bdc.id,
                    quantity: productCard.quantity,
                  };
                  const productBDC = createProductBDC(product);
                  updateStats({id: productCard.product.id, quantity: productCard.quantity, userId : currentUser.id})
                  deleteProductCard({ id: productCard.id })
                  .then((productCard) => {
                    console.log('productCard', productCard);
                    const bdc = {
                      user: currentUser,
                      address_base: baseAddress,
                      address_fact: factAddress,
                      product_BDC: card,
                    };
                    const buyer = `${bdc.user. first_name} ${bdc.user.last_name}`;
                    const bdcPDF = generateInvoicePDF(buyer, new Date(), bdc.address_base, bdc.address_fact, bdc.product_BDC);
                    setNumber(number + 1);
                  })
                  .catch((error) => {
                    console.error('Error retrieving product:', error);
                  });
                  setShowPopup(false)
                  setShowPayement(true)
              } catch (error: any) {
                console.error('Error creating product_BDC', error);
              }
              });
            } catch (error: any) {
              console.error('Error creating BDC', error);
            }
          }}
        >
                <div>
                  <h3 className="text-xl font-bold mb-4">Ajouter une carte:</h3>
                  <div >
                    <LabeledTextField name="cardNumber" pattern="[0-9\s]{13,19}" label="Numero de carte" placeholder="Numero de carte" />
                    <LabeledTextField name="cardHolder" label="Nom" placeholder="Nom" />
                    <LabeledTextField name="expirationDate" label="Date d'expiration" type="date" placeholder="Date d'expiration" />
                    <LabeledTextField name="cvv" label="Cvv"  pattern="[0-9\s]{3}" placeholder="CVV" />
                  </div>
                </div>
            </Form>
          ): null}
          <button
            className="p-2 rounded-full bg-blue-500 text-white mt-4"
            onClick={() => setShowPopup(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    )}
    {showPayement && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-4xl text-green-500">Paiement réussi</h1>
        <button
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
              onClick={handleDismissPayement}
            >
              Fermer
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

PanierPage.authenticate = {redirectTo: '/auth/login'}
export default PanierPage;
