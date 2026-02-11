import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Site-wide Schema.org Structured Data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Hans Steel Canada',
              url: 'https://www.hanssteel.com',
              description: 'Hans Steel Canada specializes in structural steel fabrication, engineering, and construction for industrial, commercial, and institutional projects across Canada.',
              publisher: {
                '@type': 'Organization',
                name: 'Hans Steel Canada Inc.'
              }
            })
          }}
        />

        {/* Site-wide Schema.org Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Hans Steel Canada Inc.',
              alternateName: 'Hans Steel Canada',
              url: 'https://www.hanssteel.com',
              logo: 'https://www.hanssteel.com/favicon.png',
              description: 'Hans Steel Canada specializes in structural steel fabrication, engineering, and construction for industrial, commercial, and institutional projects across Canada.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '6 Sangster Road',
                addressLocality: 'Uxbridge',
                addressRegion: 'ON',
                postalCode: 'L9P 0G5',
                addressCountry: 'CA'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-905-640-1000',
                contactType: 'sales',
                email: 'info@hanssteel.com',
                areaServed: 'CA'
              }
            })
          }}
        />

        {/* Site-wide Schema.org Structured Data for LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.hanssteel.com',
              name: 'Hans Steel Canada Inc.',
              image: 'https://www.hanssteel.com/favicon.png',
              url: 'https://www.hanssteel.com',
              telephone: '+1-905-640-1000',
              email: 'info@hanssteel.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '6 Sangster Road',
                addressLocality: 'Uxbridge',
                addressRegion: 'ON',
                postalCode: 'L9P 0G5',
                addressCountry: 'CA'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 44.1084,
                longitude: -79.1205
              },
              priceRange: '$$',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '17:00'
                }
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
