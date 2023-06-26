import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import getCurrentUserAndAddress from 'src/users/queries/getCurrentUserAndAddress';
import Layout from "src/core/components/Layout"

const UserInfoPage = () => {
  const [user, setUser] = useState<any>(null);
  const [showCreateFactAddress, setShowCreateFactAddress] = useState(false);
  const [showCreateBaseAddress, setShowCreateBaseAddress] = useState(false);

  useEffect(() => {
    getCurrentUserAndAddress()
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error retrieving user data:', error);
      });
  }, []);

  const handleCreateFactAddress = () => {
    setShowCreateFactAddress(true);
    // Ajoutez ici la logique pour créer une adresse de facturation
  };

  const handleCreateBaseAddress = () => {
    setShowCreateBaseAddress(true);
    // Ajoutez ici la logique pour créer une adresse de base
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <header>
      <div className=" bg-cover w-full h-384 bg-center ">
        <h1 className=" ml-144 pt-35 text-72sec text-orange 2 font-bold oldstyle-nums">
          jeune<span className="text-white ">Campeur </span>{" "}
        </h1>
      </div>
    </header>
    <Layout breadcrumb={"/"}>
    <main>
    <div className="flex justify-center">
      <div className="rounded-lg bg-gray-200 p-6 m-4">
        <h1 className="text-2xl font-bold mb-4">Informations de l'utilisateur</h1>
        <form className="mb-4">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={user.username} readOnly />

          <label htmlFor="firstName">Prénom:</label>
          <input type="text" id="firstName" value={user.first_name} readOnly />

          <label htmlFor="lastName">Nom de famille:</label>
          <input type="text" id="lastName" value={user.last_name} readOnly />

          <label htmlFor="birthDate">Date de naissance:</label>
          <input type="date" id="birthDate" value={user.birth_date} readOnly />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={user.email} readOnly />

          <label htmlFor="phone">Téléphone:</label>
          <input type="text" id="phone" value={user.phone} readOnly />

          <button type="submit">Modifier</button>
        </form>
      </div>

      <div className="rounded-lg bg-gray-200 p-6 m-4">
        <h2 className="text-xl font-bold mb-4">Adresse de facturation</h2>
        <select>
          {user.address_fact.map((address) => (
            <option key={address.id}>
              {address.first_name} {address.last_name}
            </option>
          ))}
        </select>

        <button onClick={handleCreateFactAddress}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {showCreateFactAddress && (
          <div>
            <h3 className="text-lg font-bold">Créer une nouvelle adresse de facturation</h3>
            <form>
              {/* Ajoutez ici les champs nécessaires pour créer une adresse de facturation */}
              <button type="submit">Créer</button>
            </form>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-gray-200 p-6 m-4">
        <h2 className="text-xl font-bold mb-4">Adresse de base</h2>
        <select>
          {user.address_base.map((address) => (
            <option key={address.id}>
              {address.number} {address.road}, {address.city}
            </option>
          ))}
        </select>

        <button onClick={handleCreateBaseAddress}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {showCreateBaseAddress && (
          <div>
            <h3 className="text-lg font-bold">Créer une nouvelle adresse de base</h3>
            <form>
              {/* Ajoutez ici les champs nécessaires pour créer une adresse de base */}
              <button type="submit">Créer</button>
            </form>
          </div>
        )}
      </div>
    </div>
    </main>
    </Layout>
    <footer>
    <div className="bg-dark bg-cover h-268 bg-center">
      <div className="container mx-auto flex-col flex justify-center items-center h-268">
        <h1 className="text-3xl text-orange">
          jeune<span className="text-white ">Campeur </span>{" "}
        </h1>
        <p className="lg:text-base text-white">27, rue Alexandre Dumas</p>
        <p className="lg:text-base xl:text-lg text-white">78100 St Germain en Laye</p>
        <p className="lg:text-base xl:text-lg text-white">+33 7 69 05 29 08</p>
        <p className="lg:text-base xl:text-lg text-white">jeuneCampeur@gmail.com</p>
      </div>
    </div>
  </footer>
</div>
  );
};

export default UserInfoPage;
