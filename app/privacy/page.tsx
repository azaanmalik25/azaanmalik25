import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | Calculator Hub - Your Data Security",
  description:
    "Learn how Calculator Hub protects your privacy and handles your data. Our comprehensive privacy policy explains our practices and your rights.",
  keywords: "privacy policy, data protection, GDPR, CCPA, calculator hub privacy, online calculator privacy",
  openGraph: {
    title: "Privacy Policy | Calculator Hub",
    description: "Learn how Calculator Hub protects your privacy and handles your data.",
    url: "https://calculatorhub.com/privacy",
    type: "website",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">Last updated: May 18, 2025</p>

          <Card className="mb-10">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment to Privacy</h2>
              <p>
                At Calculator Hub, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website calculatorhub.com, including any
                other media form, media channel, mobile website, or mobile application related or connected to
                Calculator Hub.
              </p>
              <p className="mt-4">
                PLEASE READ THIS PRIVACY POLICY CAREFULLY. If you do not agree with the terms of this privacy policy,
                please do not access the site.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4" id="information-we-collect">
            Information We Collect
          </h2>
          <p className="mb-6">We collect information about you in various ways when you use our website:</p>

          <h3 className="text-xl font-medium mb-2">Information You Provide to Us</h3>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, subscribe to our
            newsletter, contact us, or otherwise communicate with us. This information may include:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Feedback and correspondence</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-medium mb-2">Information Automatically Collected</h3>
          <p className="mb-4">
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Log information (IP address, browser type, pages viewed)</li>
            <li>Device information (hardware model, operating system)</li>
            <li>Usage data (how you use our website)</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4" id="how-we-use-information">
            How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Develop new products and services</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize your experience</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4" id="cookies">
            Cookies and Similar Technologies
          </h2>
          <p className="mb-6">
            We use cookies and similar technologies to collect information about your browsing activities and to
            distinguish you from other users of our website. This helps us provide you with a good experience when you
            browse our website and also allows us to improve our site.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="advertising">
            Advertising and Analytics
          </h2>
          <p className="mb-6">
            We may allow third parties to use cookies, web beacons, and other technologies to collect information about
            your use of our website and other websites to serve advertisements and to perform analytics. These third
            parties may collect information about your online activities over time and across different websites.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="data-sharing">
            Sharing of Information
          </h2>
          <p className="mb-4">We may share information about you as follows:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              With vendors, consultants, and other service providers who need access to such information to carry out
              work on our behalf
            </li>
            <li>
              In response to a request for information if we believe disclosure is in accordance with any applicable
              law, regulation, or legal process
            </li>
            <li>
              If we believe your actions are inconsistent with our user agreements or policies, or to protect the
              rights, property, and safety of Calculator Hub or others
            </li>
            <li>
              In connection with, or during negotiations of, any merger, sale of company assets, financing, or
              acquisition of all or a portion of our business by another company
            </li>
            <li>With your consent or at your direction</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4" id="data-security">
            Data Security
          </h2>
          <p className="mb-6">
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
            access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully
            secure or error-free.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="your-rights">
            Your Rights
          </h2>
          <p className="mb-6">
            Depending on your location, you may have certain rights regarding your personal information, such as the
            right to request access, correction, deletion, or restriction of your personal information, or to object to
            our processing of your personal information.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="children">
            Children's Privacy
          </h2>
          <p className="mb-6">
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13. If you are under 13, do not use or provide any information on this
            website.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="changes">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-6">
            We may update this privacy policy from time to time. If we make material changes, we will notify you by
            email or through a notice on our website prior to the change becoming effective.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="contact">
            Contact Us
          </h2>
          <p className="mb-10">
            If you have any questions about this Privacy Policy, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
            <h3 className="text-xl font-medium mb-2">Additional Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
