import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 flex items-center">
              <i className="fa-solid fa-house-chimney-user mr-2"></i>
              HomeSkills
            </h3>
            <p className="text-neutral-300 mb-4">
              Connecting homeowners with local workshops and classes to build valuable home maintenance and improvement skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Twitter">
                <i className="fa-brands fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors" aria-label="Pinterest">
                <i className="fa-brands fa-pinterest-p text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/workshops" className="text-neutral-300 hover:text-white transition-colors">
                  Find Workshops
                </Link>
              </li>
              <li>
                <Link href="/category/1" className="text-neutral-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#popular-hosts" className="text-neutral-300 hover:text-white transition-colors">
                  Popular Hosts
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-neutral-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Become a Host
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Stay Updated</h4>
            <p className="text-neutral-300 mb-4">
              Subscribe to our newsletter for new workshops and exclusive tips.
            </p>
            <form className="space-y-2">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-3 py-2 rounded bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded font-medium transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HomeSkills. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
