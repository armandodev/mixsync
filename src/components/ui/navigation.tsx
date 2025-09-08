"use client";

import { useState } from "react";
import { LogIn, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons";
import Link from "next/link";

const USER_MENU_LINKS = [
  { name: "Perfil", href: "/profile", active: false },
  { name: "Historial", href: "/history", active: false },
  { name: "Cerrar sesión", href: "/logout", active: false },
];

export default function Navigation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const pathname = usePathname();
  // TODO: Implementar autenticación real
  const isAuthenticated = true;

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
    <nav className="px-4">
      <div
        className="relative flex items-center justify-between max-w-screen-lg p-4 mx-auto rounded-none h-20 text-lg"
        role="navigation"
      >
        <a
          className={`text-3xl font-bold flex items-center gap-2 ${
            pathname === "/" ? "cursor-default" : "cursor-pointer"
          } transition-opacity duration-200`}
          href="/"
          onClick={handleRouteChange}
          aria-label="Ir a la página de inicio"
        >
          <Logo />
          <h1 className="sr-only sm:not-sr-only">MixSync</h1>
        </a>

        <ul className="flex items-center justify-end gap-4">
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
                      aria-current={link.active ? "page" : undefined}
                      tabIndex={link.active ? -1 : 0}
                      aria-label={
                        link.active
                          ? `${link.name}, página actual`
                          : `Ir a ${link.name}`
                      }
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
