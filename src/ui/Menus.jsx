import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

/* ================= STYLES ================= */

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const List = styled.ul`
  position: fixed;
  right: ${({ $position }) => $position.x}px;
  top: ${({ $position }) => $position.y}px;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`;

const MenuButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
  }
`;

/* ================= CONTEXT ================= */

const MenusContext = createContext(null);

function useMenus() {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("Menus components must be used inside <Menus />");
  return context;
}

/* ================= ROOT ================= */

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const open = (id) => setOpenId(id);
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

/* ================= TOGGLE ================= */

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useMenus();

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 8,
    });

    openId === id ? close() : open(id);
  }

  return (
    <ToggleButton onClick={handleClick} aria-haspopup="menu">
      <HiEllipsisVertical />
    </ToggleButton>
  );
}

/* ================= LIST ================= */

function MenuList({ id, children }) {
  const { openId, position, close } = useMenus();
  const ref = useOutsideClick(close);

  if (openId !== id || !position) return null;

  return createPortal(
    <List role="menu" $position={position} ref={ref}>
      {children}
    </List>,
    document.body
  );
}

/* ================= ITEM BUTTON ================= */

function MenuItem({ children, icon, onClick }) {
  const { close } = useMenus();

  function handleClick(e) {
    onClick?.(e);
    close();
  }

  return (
    <li role="menuitem">
      <MenuButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </MenuButton>
    </li>
  );
}

/* ================= API ================= */

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = MenuList;
Menus.Button = MenuItem;

export default Menus;
