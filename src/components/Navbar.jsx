import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useLocation } from "react-router-dom";
import AuthPopup from "../auth/AuthPopup";
import { Menu as MenuIcon, LogOut, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Popup state
  const [open, setOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // Dummy nav links, adjust as needed
  const navLinks = [
    { href: "/lessons", label: "Lessons" },
    { href: "/exams", label: "Exams" },
  ];

  return (
    <header className="bg-background/70 sticky top-0 z-50 mb-4 w-full shadow-md backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-[1550px] items-center justify-between p-4 md:p-0">
        <div className="flex items-center gap-10 md:gap-20">
          {/* Logo */}
          <Link to="/" aria-label="Homepage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1 70"
              width="150"
              height="60"
              role="img"
              aria-label="Lorevium logo"
              fill="currentColor"
            >
              <text
                x="50%"
                y="50%"
                fontSize="40"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Lorevium
              </text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`group text-md relative font-medium ${
                  location.pathname === href ? "text-primary" : ""
                }`}
              >
                <span className="group-hover:text-primary">{label}</span>
                <span
                  className={`bg-primary absolute -bottom-0.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                    location.pathname === href ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-4 p-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`text-sm font-medium ${
                  location.pathname === href
                    ? "text-primary font-semibold underline"
                    : ""
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="border-border my-2 border-t" />

            {user && (
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.fullName}</span>
                  <span className="text-muted-foreground text-xs">
                    {user.email}
                  </span>
                </div>
                <Button variant="ghost" size="icon">
                  <Link to="/profile" className="flex flex-col">
                    <Settings />
                  </Link>
                </Button>
              </div>
            )}

            {user ? (
              <Button
                variant="destructive"
                onClick={() => dispatch(logout())}
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setOpen(true);
                    setIsSignup(false);
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setOpen(true);
                    setIsSignup(true);
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Desktop user / controls */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-semibold">{user.fullName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="me-2 h-4 w-4">
                    <AvatarFallback>
                      {user.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-start">
                    <span className="text-sm font-semibold">
                      {user.fullName}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="cursor-default flex items-center"
                  >
                    <Settings className="me-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => dispatch(logout())}>
                  <LogOut className="me-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setOpen(true);
                  setIsSignup(false);
                }}
              >
                Log in
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setOpen(true);
                  setIsSignup(true);
                }}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Auth popup always rendered */}
      <AuthPopup
        open={open}
        setOpen={setOpen}
        isSignup={isSignup}
        setIsSignup={setIsSignup}
      />
    </header>
  );
};

export default Navbar;
