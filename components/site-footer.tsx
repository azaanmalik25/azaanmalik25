import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-indigo-900/20 bg-[#0a0a20] py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculator Hub</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted resource for free online calculators covering finance, health, math, and everyday
              calculations.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/finance" className="text-gray-400 hover:text-white">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/category/health" className="text-gray-400 hover:text-white">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/category/math" className="text-gray-400 hover:text-white">
                  Math
                </Link>
              </li>
              <li>
                <Link href="/category/date-time" className="text-gray-400 hover:text-white">
                  Date & Time
                </Link>
              </li>
              <li>
                <Link href="/category/everyday" className="text-gray-400 hover:text-white">
                  Everyday
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculator/mortgage" className="text-gray-400 hover:text-white">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculator/bmi" className="text-gray-400 hover:text-white">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculator/scientific" className="text-gray-400 hover:text-white">
                  Scientific Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculator/age" className="text-gray-400 hover:text-white">
                  Age Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculator/tip" className="text-gray-400 hover:text-white">
                  Tip Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-gray-400 hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-indigo-900/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Calculator Hub. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">Designed and developed with ❤️ for accurate calculations</p>
        </div>
      </div>
    </footer>
  )
}
