import React, { Suspense, useEffect, useState } from 'react';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import Layout from 'src/core/components/Layout';
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from '@blitzjs/next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCardByUser from 'src/card/queries/getCardByUser';
import { faCheck, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import deleteProductCard from 'src/productCard/mutations/deleteProductCard';
import getAddressBUser from "src/address_Base/queries/getAddressBUser"
import getAddressFUser from "src/address_Fact/queries/getAddressFUser"
import createAddressBase from "src/address_Base/mutations/createAddressBase"
import createAddressFact from "src/address_Fact/mutations/createAddressFact"
import LabeledTextField from 'src/core/components/LabeledTextField';
import { Form, FORM_ERROR } from "src/core/components/Form"
import createBDC from "src/BDC/mutations/createBDC"
import createProductBDC from 'src/core/productBDC/mutations/createProductBDC';
import { PDFDocument, rgb } from 'pdf-lib';

const Panier = () => {
  const currentUser = useCurrentUser();
  const [card, setCard] = useState<any[]>([]);
  const [number, setNumber] = useState<any>(0);
  const [showPopup, setShowPopup] = useState(false);
  const [addressBase, setAddressBase] = useState<any[]>([]);
  const [addressFact, setAddressFact] = useState<any[]>([]);
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
    setSelectedBase(baseId);
    console.log("selectedBase", selectedBase)
  };

  const handleSelectFact = (factId) => {
    setSelectedFact(factId);
    console.log("selectedFact", selectedFact)
  };

  const handleDismissPayement = () => {
    setShowPayement(false);
  };

  const generateBDCPDF = async (bdc) => {
    // Créer un nouveau document PDF
    const doc = await PDFDocument.create();

    // Ajouter une page au document
    const page = doc.addPage();

    // Définir les options de texte
    const fontSize = 12;
    const textOptions = {
      size: fontSize,
      font: await doc.embedFont('Helvetica'),
      color: rgb(0, 0, 0), // Couleur verte
    };

    // Ajouter le contenu du BDC à la page
    page.drawText('Bon de Commande', { x: 50, y: 700, ...textOptions });
    page.moveDown(0.5);

    page.drawText('Informations du client:', { x: 50, y: 680, ...textOptions });
    page.drawText(`ID: ${bdc.user.id}`, { x: 50, y: 660, ...textOptions });
    page.drawText(`Nom d'utilisateur: ${bdc.user.username}`, { x: 50, y: 640, ...textOptions });
    page.drawText(`Prénom: ${bdc.user.first_name}`, { x: 50, y: 620, ...textOptions });
    page.drawText(`Nom: ${bdc.user.last_name}`, { x: 50, y: 600, ...textOptions });
    page.drawText(`Date de naissance: ${bdc.user.birth_date}`, { x: 50, y: 580, ...textOptions });
    page.drawText(`Email: ${bdc.user.email}`, { x: 50, y: 560, ...textOptions });
    page.drawText(`Téléphone: ${bdc.user.phone}`, { x: 50, y: 540, ...textOptions });

    page.moveDown(0.5);

    page.drawText('Adresse de livraison:', { x: 50, y: 520, ...textOptions });
    page.drawText(`Numéro: ${bdc.address_base.number}`, { x: 50, y: 500, ...textOptions });
    page.drawText(`Rue: ${bdc.address_base.road}`, { x: 50, y: 480, ...textOptions });
    page.drawText(`Ville: ${bdc.address_base.city}`, { x: 50, y: 460, ...textOptions });
    page.drawText(`Département: ${bdc.address_base.department}`, { x: 50, y: 440, ...textOptions });
    page.drawText(`Pays: ${bdc.address_base.country}`, { x: 50, y: 420, ...textOptions });
    page.drawText(`Code postal: ${bdc.address_base.postcode}`, { x: 50, y: 400, ...textOptions });

    page.moveDown(0.5);

    page.drawText('Adresse de facturation:', { x: 50, y: 380, ...textOptions });
    page.drawText(`Prénom: ${bdc.address_fact.first_name}`, { x: 50, y: 360, ...textOptions });
    page.drawText(`Nom: ${bdc.address_fact.last_name}`, { x: 50, y: 340, ...textOptions });
    page.drawText(`Email: ${bdc.address_fact.email}`, { x: 50, y: 320, ...textOptions });
    page.drawText(`Numéro: ${bdc.address_fact.number}`, { x: 50, y: 300, ...textOptions });
    page.drawText(`Rue: ${bdc.address_fact.road}`, { x: 50, y: 280, ...textOptions });
    page.drawText(`Ville: ${bdc.address_fact.city}`, { x: 50, y: 260, ...textOptions });
    page.drawText(`Département: ${bdc.address_fact.department}`, { x: 50, y: 240, ...textOptions });
    page.drawText(`Pays: ${bdc.address_fact.country}`, { x: 50, y: 220, ...textOptions });
    page.drawText(`Code postal: ${bdc.address_fact.postcode}`, { x: 50, y: 200, ...textOptions });

    page.moveDown(0.5);

    page.drawText('Produits du BDC:', { x: 50, y: 180, ...textOptions });

    // Parcourir chaque produit dans le tableau product_BDC
    bdc.product_BDC.forEach((product, index) => {
      const { id, quantity, product: { name, price } } = product;

      const yPos = 160 - index * (fontSize + 10);

      page.drawText(`Product ID: ${id}`, { x: 50, y: yPos, ...textOptions });
      page.drawText(`Quantity: ${quantity}`, { x: 50, y: yPos - 20, ...textOptions });
      page.drawText(`Product Name: ${name}`, { x: 50, y: yPos - 40, ...textOptions });
      page.drawText(`Price: $${price}`, { x: 50, y: yPos - 60, ...textOptions });

    });

    // Sérialiser le document PDF en Uint8Array
    const pdfBytes = await doc.save();

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
  }




  return (
    <main className="flex flex-col items-center">
    <ul className="grid gap-4 grid-cols-3 w-750 h-400 text-sm mt-3 rounded-5 sticky overflow-auto list-none marker:scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 border border-gray-300">
      {card.map((productCard) => (
        <li key={productCard.id} className={"flex items-center justify-between w-750"}>
          <div className="flex items-center w-750">
            <img src="/banniere.jpg" alt="Thumbnail" className="w-24 h-24 mr-30" />
            <div>
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
          <label className="p-2 rounded-full bg-red-500 text-white cursor-pointer" htmlFor={`product-checkbox-${productCard.id}`}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </label>
          <input
            type="checkbox"
            id={`product-checkbox-${productCard.id}`}
            className="hidden"
            onChange={() => handleRemoveProduct(productCard.id)}
          />
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
                  <h3 className="text-xl font-bold mb-4">Créer une adresse de base:</h3>
                  <div>
                    <LabeledTextField name="name" label="Nom" placeholder="Nom" />
                    <LabeledTextField name="number" label="Numéro" placeholder="Numéro" />
                    <LabeledTextField name="road" label="Rue" placeholder="Rue" />
                    <LabeledTextField name="city" label="Ville" placeholder="Ville" />
                    <LabeledTextField name="department" label="Département" placeholder="Département" />
                    <LabeledTextField name="country" label="Pays" placeholder="Pays" />
                    <LabeledTextField name="postcode" label="Code Postal" placeholder="Code Postal" />
                    <LabeledTextField name="complimentary" label="Complémentaire" placeholder="Complémentaire" />
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
                  <h3 className="text-xl font-bold mb-4">Créer une adresse de facturation:</h3>
                  <div className="">
                    <LabeledTextField name="first_name" label="Prénom" placeholder="Prénom" />
                    <LabeledTextField name="last_name" label="Nom" placeholder="Nom" />
                    <LabeledTextField name="email" label="Email" placeholder="Email" />
                    <LabeledTextField name="number" label="Numéro" placeholder="Numéro" />
                    <LabeledTextField name="road" label="Rue" placeholder="Rue" />
                    <LabeledTextField name="city" label="Ville" placeholder="Ville" />
                    <LabeledTextField name="departement" label="Département" placeholder="Département" />
                    <LabeledTextField name="country" label="Pays" placeholder="Pays" />
                    <LabeledTextField name="postcode" label="Code Postal" placeholder="Code Postal" />
                    <LabeledTextField name="complimentary" label="Complémentaire" placeholder="Complémentaire" />
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
          initialValues={{ idAddressBase: "", idAddressFact: "", idUser: ""}}
          onSubmit={async (values) => {
            try {
              const BDC = {
                idAddressBase: parseInt(selectedBase.id!),
                idAddressFact: parseInt(selectedFact.id!),
                idUser: parseInt(currentUser.id),
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
                  deleteProductCard({ id: productCard.id })
                  .then((productCard) => {
                    console.log('productCard', productCard);
                    const bdc = {
                      user: currentUser,
                      address_base: selectedBase,
                      address_fact: selectedFact,
                      product_BDC: card,
                    };
                    const bdcPDF = generateBDCPDF(bdc);
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
                    <LabeledTextField name="cardNumber" pattern="[0-9\s]{13,19}" label="CardNumber" placeholder="Numero de carte" />
                    <LabeledTextField name="cardHolder" label="CardHolder" placeholder="Nom" />
                    <LabeledTextField name="expirationDate" label="expirationDate" type="date" placeholder="Date d'expiration" />
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

export default PanierPage;
