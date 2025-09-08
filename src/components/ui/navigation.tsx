"use client";

import { AppLogo } from "@/components/icons";
import Hamburger from "hamburger-react";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Inicio", href: "/", active: false },
  { name: "Buscar", href: "/search", active: false },
  { name: "Biblioteca", href: "/library", active: false },
  { name: "Acerca de", href: "/about", active: false },
];
const USER_MENU_LINKS = [
  { name: "Perfil", href: "/profile", active: false },
  { name: "Historial", href: "/history", active: false },
  { name: "Cerrar sesión", href: "/logout", active: false },
];

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const pathname = usePathname();
  const isAuthenticated = true; // Cambia esto según el estado de autenticación real

  NAV_LINKS.forEach((link) => {
    link.active = link.href === pathname;
  });
  USER_MENU_LINKS.forEach((link) => {
    link.active = link.href === pathname;
  });

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    setOpenUserMenu(false);
  };
  const toggleUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
    setOpenMenu(false);
  };
  const handleRouteChange = () => {
    setOpenMenu(false);
    setOpenUserMenu(false);
  };

  return (
    <nav>
      <div className="relative flex items-center justify-between max-w-screen-lg bg-white p-4 m-4 xl:mx-auto rounded-lg h-20 shadow-md">
        <a
          className="text-3xl font-bold flex items-center gap-2"
          href="/"
          onClick={handleRouteChange}
        >
          <AppLogo />
          <h1 className="sr-only sm:not-sr-only">MixSync</h1>
        </a>

        <ul
          className={`bg-white w-full absolute top-24 left-0 flex items-center gap-4 rounded-md shadow-md p-4 transition-transform duration-200 sm:static sm:flex-row sm:shadow-none sm:p-0 sm:gap-6 sm:w-auto sm:scale-100 origin-top-right sm:origin-center z-10 sm:z-auto flex-col ${
            openMenu ? "scale-100" : "scale-0"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                className={`transition-opacity duration-200 ${
                  link.active ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                href={link.href}
                onClick={handleRouteChange}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-4">
          {!isAuthenticated && (
            <li>
              <Link
                className="flex items-center bg-white p-2 rounded-md border-2 border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                href="/login"
                onClick={handleRouteChange}
              >
                <LogIn className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Iniciar sesión</span>
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 p-2 aspect-square rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleUserMenu}
                aria-label="Menú de usuario"
              >
                <User />
              </button>
              <ul
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-transform duration-200 origin-top-right ${
                  openUserMenu ? "scale-100" : "scale-0"
                }`}
              >
                {USER_MENU_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      className={`block px-4 py-2 hover:bg-gray-100 transition-colors duration-200 ${
                        link.active ? "font-bold" : ""
                      } ${
                        link.name !==
                        USER_MENU_LINKS[USER_MENU_LINKS.length - 1].name
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                      href={link.href}
                      onClick={handleRouteChange}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li className="sm:hidden">
            <Hamburger
              toggled={openMenu}
              toggle={toggleMenu}
              size={24}
              rounded
              label="Abrir menú"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
