import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service | Calculator Hub - Usage Terms",
  description:
    "Read Calculator Hub's Terms of Service. Understand the rules and conditions for using our online calculators and services.",
  keywords: "terms of service, terms and conditions, user agreement, calculator hub terms, legal terms",
  openGraph: {
    title: "Terms of Service | Calculator Hub",
    description: "Read Calculator Hub's Terms of Service and usage conditions.",
    url: "https://calculatorhub.com/terms",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">Last updated: May 18, 2025</p>

          <Card className="mb-10">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you and Calculator Hub ("we,"
                "us," or "our"), concerning your access to and use of the calculatorhub.com website as well as any other
                media form, media channel, mobile website or mobile application related, linked, or otherwise connected
                thereto (collectively, the "Site").
              </p>
              <p className="mt-4">
                You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these
                Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly
                prohibited from using the Site and you must discontinue use immediately.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mb-4" id="intellectual-property">
            Intellectual Property Rights
          </h2>
          <p className="mb-6">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases,
            functionality, software, website designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks")
            are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and
            various other intellectual property rights.
          </p>
          <p className="mb-6">
            The Content and the Marks are provided on the Site "AS IS" for your information and personal use only.
            Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be
            copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated,
            transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever,
            without our express prior written permission.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="user-representations">
            User Representations
          </h2>
          <p className="mb-4">By using the Site, you represent and warrant that:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>All registration information you submit will be true, accurate, current, and complete</li>
            <li>
              You will maintain the accuracy of such information and promptly update such registration information as
              necessary
            </li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
            <li>You are not a minor in the jurisdiction in which you reside</li>
            <li>
              You will not access the Site through automated or non-human means, whether through a bot, script, or
              otherwise
            </li>
            <li>You will not use the Site for any illegal or unauthorized purpose</li>
            <li>Your use of the Site will not violate any applicable law or regulation</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4" id="prohibited-activities">
            Prohibited Activities
          </h2>
          <p className="mb-4">
            You may not access or use the Site for any purpose other than that for which we make the Site available. The
            Site may not be used in connection with any commercial endeavors except those that are specifically endorsed
            or approved by us.
          </p>
          <p className="mb-6">As a user of the Site, you agree not to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Systematically retrieve data or other content from the Site to create or compile, directly or indirectly,
              a collection, compilation, database, or directory without written permission from us
            </li>
            <li>
              Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by
              electronic or other means for the purpose of sending unsolicited email, or creating user accounts by
              automated means or under false pretenses
            </li>
            <li>Use the Site to advertise or offer to sell goods and services</li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Site</li>
            <li>Engage in unauthorized framing of or linking to the Site</li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
              information such as user passwords
            </li>
            <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
            <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
            <li>
              Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to
              the Site
            </li>
            <li>Attempt to impersonate another user or person or use the username of another user</li>
            <li>Use any information obtained from the Site in order to harass, abuse, or harm another person</li>
            <li>
              Use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any
              revenue-generating endeavor or commercial enterprise
            </li>
            <li>
              Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making
              up a part of the Site
            </li>
            <li>
              Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any
              portion of the Site
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4" id="user-generated-content">
            User Generated Contributions
          </h2>
          <p className="mb-6">
            The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and
            other functionality, and may provide you with the opportunity to create, submit, post, display, transmit,
            perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not
            limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal
            information or other material (collectively, "Contributions").
          </p>
          <p className="mb-6">
            Contributions may be viewable by other users of the Site and through third-party websites. As such, any
            Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make
            available any Contributions, you thereby represent and warrant that the Contributions comply with these
            Terms of Service.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="contribution-license">
            Contribution License
          </h2>
          <p className="mb-6">
            By posting your Contributions to any part of the Site, you automatically grant, and you represent and
            warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual,
            non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy,
            reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform,
            publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such
            Contributions for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or
            incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="disclaimer">
            Disclaimer
          </h2>
          <p className="mb-6">
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR
            SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
            EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO
            WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE'S CONTENT OR THE CONTENT OF ANY
            WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES,
            OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
            RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE
            SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="limitation-of-liability">
            Limitations of Liability
          </h2>
          <p className="mb-6">
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
            DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT,
            LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED
            OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="indemnification">
            Indemnification
          </h2>
          <p className="mb-6">
            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our
            respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim,
            or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out
            of: (1) your Contributions; (2) use of the Site; (3) breach of these Terms of Service; (4) any breach of
            your representations and warranties set forth in these Terms of Service; (5) your violation of the rights of
            a third party, including but not limited to intellectual property rights; or (6) any overt harmful act
            toward any other user of the Site with whom you connected via the Site.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="term-and-termination">
            Term and Termination
          </h2>
          <p className="mb-6">
            These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY
            OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
            NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY
            PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
            WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="modifications">
            Modifications and Interruptions
          </h2>
          <p className="mb-6">
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at
            our sole discretion without notice. However, we have no obligation to update any information on our Site. We
            also reserve the right to modify or discontinue all or part of the Site without notice at any time.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="governing-law">
            Governing Law
          </h2>
          <p className="mb-6">
            These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of
            the State of California applicable to agreements made and to be entirely performed within the State of
            California, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-semibold mb-4" id="contact-us">
            Contact Us
          </h2>
          <p className="mb-10">
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the
            Site, please contact us at:
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
            <p className="mb-0">
              <strong>Calculator Hub</strong>
              <br />
              123 Calculator Street
              <br />
              Tech City, CA 94103
              <br />
              United States
              <br />
              <br />
              <strong>Email:</strong> support@calculatorhub.com
              <br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
