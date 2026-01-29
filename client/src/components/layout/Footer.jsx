import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';

const brands = [
  { name: 'Volkswagen', slug: 'volkswagen', logo: '/logos/volkswagen.png' },
  { name: 'Audi', slug: 'audi', logo: '/logos/audi.jpeg' },
  { name: 'Porsche', slug: 'porsche', logo: '/logos/porsche.png' },
  { name: 'Skoda', slug: 'skoda', logo: '/logos/skoda.avif' },
  { name: 'Bentley', slug: 'bentley', logo: '/logos/bentley.png' },
  { name: 'Lamborghini', slug: 'lamborghini', logo: '/logos/lamborghini.jpg' },
  { name: 'Bugatti', slug: 'bugatti', logo: '/logos/buggati.png' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#001333] text-white mt-auto">
      {/* Newsletter Section */}
      <div className="bg-linear-to-r from-[#001e50] to-[#001333]">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-white/70">Subscribe to get the latest news, offers, and updates.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-5 py-3.5 rounded-l-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#c9a227]"
              />
              <button className="btn btn-accent rounded-l-none">
                Subscribe
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
                <img 
                  src="/logos/volkswagen.png" 
                  alt="Volkswagen" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-xl block">Volkswagen</span>
                <span className="text-white/60 text-sm">Group India</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-6 max-w-sm leading-relaxed">
              Experience the complete Volkswagen Group portfolio in India. From everyday elegance to exotic supercars – discover German engineering excellence.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#c9a227] hover:text-[#001e50] transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#c9a227] -mb-2" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Showroom', path: '/showroom' },
                { label: 'Genuine Parts', path: '/parts' },
                { label: 'Book Service', path: '/service' },
                { label: 'Track Orders', path: '/track-order' },
                { label: 'Wishlist', path: '/wishlist' },
                { label: 'Shopping Cart', path: '/cart' },
                { label: 'Our Team', path: '/team' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-white/70 hover:text-[#c9a227] transition flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full opacity-0 group-hover:opacity-100 transition" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Brands */}
          <div>
            <h3 className="font-semibold text-lg mb-6 relative">
              Our Brands
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#c9a227] -mb-2" />
            </h3>
            <ul className="space-y-3">
              {brands.map((brand) => (
                <li key={brand.slug}>
                  <Link 
                    to={`/showroom?brand=${brand.slug}`}
                    onClick={scrollToTop}
                    className="text-white/70 hover:text-[#c9a227] transition flex items-center gap-3 group"
                  >
                    <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden p-1 group-hover:bg-white/20 transition">
                      <img 
                        src={brand.logo} 
                        alt={brand.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#c9a227] -mb-2" />
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:8935904820" className="flex items-center gap-3 text-white/70 hover:text-white transition group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#c9a227] group-hover:text-[#001e50] transition">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Phone</span>
                    <span className="font-medium">+91 8935904820</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:sachin.kumar2@volkswagen.co.in" className="flex items-center gap-3 text-white/70 hover:text-white transition group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#c9a227] group-hover:text-[#001e50] transition">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Email</span>
                    <span className="font-medium">sachin.kumar2@volkswagen.co.in</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/70">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Headquarters</span>
                    <span className="font-medium text-sm">Volkswagen Group India,<br/>Pune, Maharashtra 411057</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} Volkswagen Group India Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
              <a href="#" className="hover:text-white transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
