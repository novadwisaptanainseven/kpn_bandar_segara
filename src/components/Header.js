import React, { useContext, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../icons";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { logout } from "../context/actions/Auth";
import { GlobalContext } from "../context/Provider";
import getImage from "../context/actions/Files/getImage";
import { useHistory } from "react-router-dom";

const Swal = withReactContent(swal2);

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { profileUserState } = useContext(GlobalContext);
  const { data: dataUser } = profileUserState;
  const history = useHistory();

  // Go to pengaturan page
  const goToPengaturan = () => {
    history.push("/app/pengaturan");
  };

  // Go to edit user
  const goToEditUser = (id) => {
    history.push("/app/users/edit/" + id);
  };

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  // Fungsi untuk alert logout
  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Logout",
      text: "Anda yakin ingin logout ?",
      confirmButtonText: "YA",
      showCancelButton: "TIDAK",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Anda berhasil Logout", "", "success").then((res) => {
          logout();
        });
      }
    });
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32"></div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>

          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={
                  dataUser
                    ? getImage("foto_pengguna", dataUser.user.foto)
                    : "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                }
                alt="foto-profil"
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem
                tag="a"
                onClick={() => goToEditUser(localStorage.id_user)}
              >
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem tag="a" onClick={goToPengaturan}>
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
