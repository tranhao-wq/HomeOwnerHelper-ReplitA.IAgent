import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow sticky top-0 z-50 transition-shadow">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-heading font-bold text-primary flex items-center">
            <i className="fa-solid fa-house-chimney-user mr-2"></i>
            <span>HomeSkills</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/workshops" 
            className={cn(
              "font-medium transition-colors",
              isActive("/workshops") ? "text-primary" : "hover:text-primary"
            )}
          >
            Workshops
          </Link>
          <Link 
            href="/category/1" 
            className={cn(
              "font-medium transition-colors",
              location.startsWith("/category") ? "text-primary" : "hover:text-primary"
            )}
          >
            Categories
          </Link>
          <Link 
            href="/#how-it-works" 
            className="font-medium hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link 
            href="/contact" 
            className={cn(
              "font-medium transition-colors",
              isActive("/contact") ? "text-primary" : "hover:text-primary"
            )}
          >
            Contact
          </Link>
          <Button asChild>
            <Link href="/workshops">Sign In</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-800 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      <div className={cn("md:hidden bg-white", isMenuOpen ? "block" : "hidden")}>
        <div className="px-4 pt-2 pb-4 space-y-4">
          <Link 
            href="/workshops" 
            className={cn(
              "block py-2 font-medium transition-colors",
              isActive("/workshops") ? "text-primary" : "hover:text-primary"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Workshops
          </Link>
          <Link 
            href="/category/1" 
            className={cn(
              "block py-2 font-medium transition-colors",
              location.startsWith("/category") ? "text-primary" : "hover:text-primary"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>
          <Link 
            href="/#how-it-works" 
            className="block py-2 font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            href="/contact" 
            className={cn(
              "block py-2 font-medium transition-colors",
              isActive("/contact") ? "text-primary" : "hover:text-primary"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/workshops" 
            className="block py-2 font-medium text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
