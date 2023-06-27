import React, { Suspense, useEffect, useState } from 'react';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import Layout from 'src/core/components/Layout';
import { Routes, BlitzPage } from '@blitzjs/next';
import getWishlistUser from 'src/wishlist/queries/getWishlistUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import getBDCByUser from 'src/BDC/queries/getBDCUser';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

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

  const getDeliveryStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "En cours";
      case "DELIVERED":
        return "Livré";
      case "ERROR":
        return "Erreur";
      default:
        return "Statut inconnu";
    }
  }

  const handleDownload = (bdc) => {
   console.log(bdc)
   const bdcFinal = {
    user: currentUser,
    address_base: bdc.address_base,
    address_fact: bdc.address_fact,
    product_BDC: bdc.product_BDC,
  };
   const buyer = `${bdcFinal.user.first_name} ${bdcFinal.user.last_name}`;
   const bdcPDF = generateInvoicePDF(buyer, new Date(), bdcFinal.address_base, bdcFinal.address_fact, bdcFinal.product_BDC);
  }

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
    <div className="flex items-center justify-between mb-4 w-full">
      <h1 className="text-3xl text-center mb-4 mx-auto">Liste des commandes</h1>

      </div>
      <ul className="w-500 h-400 text-sm mt-3 rounded-5 sticky overflow-auto list-none marker:scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 border border-gray-300 mb-10 flex-col">
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
           <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Produits de la commande "{selectedBDC.id}"</h2>
          <button onClick={() => handleDownload(selectedBDC)} className="ml-2 text-blue-500 hover:text-blue-700">
            <FontAwesomeIcon icon={faDownload} />
          </button>
    </div>
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
          <h2>Prix total: {selectedBDC.totalPrice}</h2>
          <h2>Etat de la livraison: {getDeliveryStatusText(selectedBDC.deliveryStatus)}</h2>
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
