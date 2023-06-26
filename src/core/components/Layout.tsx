import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Suspense, useState } from 'react';
import { useCurrentUser } from 'src/users/hooks/useCurrentUser';
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
    <button
      onClick={toggleDropdown}
      className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 focus:outline-none mr-4"
    >
      <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
    </button>
    {isOpen && (
      <div className="absolute right-0 mt-2 py-2 bg-white border border-gray-200 rounded shadow-lg">
        <a href="/profil/mes-commandes" className="block px-4 py-2 hover:bg-gray-100">
          Mes commandes
        </a>
        <a href="/profil/mes-wishlists" className="block px-4 py-2 hover:bg-gray-100">
          Mes wishlists
        </a>
        <a href="/profil/mes-informations" className="block px-4 py-2 hover:bg-gray-100">
          Mes informations
        </a>
        {currentUser ? (
          <a
            onClick={async () => {
              await logoutMutation();
            }}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Me déconnecter
          </a>
        ) : (
          <a href="/auth/login" className="block px-4 py-2 hover:bg-gray-100">
            Me connecter
          </a>
        )}
      </div>
    )}
  </div>
);
}

const CartButton = () => {
  return (
    <a href="/panier" className="ml-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
      Panier
    </a>
  );
}

type LayoutProps = {
 breadcrumb : string
 children : React.ReactNode
}
const Layout = ({ breadcrumb, children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-gray-200 p-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">
              <a href={breadcrumb} className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                Retour en arrière
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <Suspense fallback="Loading...">
            <UserDropdown />
            </Suspense>
            <CartButton />
          </div>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
