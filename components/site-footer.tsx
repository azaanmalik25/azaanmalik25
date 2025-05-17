import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-indigo-900/20 bg-[#0a0a20] py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
          © 2025 Calculator Hub. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white hover:underline">
            About
          </Link>
          <Link href="/privacy" className="hover:text-white hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white hover:underline">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-white hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
