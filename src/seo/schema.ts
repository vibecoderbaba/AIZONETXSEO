export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIZONET",
    "url": "https://aizonet.in",
    "logo": "https://aizonet.in/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "Hindi"]
    },
    "sameAs": [
      "https://twitter.com/aizonet",
      "https://linkedin.com/company/aizonet",
      "https://instagram.com/aizonet"
    ]
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AIZONET Digital Marketing Agency",
    "image": "https://aizonet.in/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Raipur Central",
      "addressLocality": "Raipur",
      "addressRegion": "Chhattisgarh",
      "postalCode": "492001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.2514,
      "longitude": 81.6296
    },
    "url": "https://aizonet.in",
    "telephone": "+91-XXXXXXXXXX",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      }
    ]
  };
}

export function getServiceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "AIZONET"
    },
    "name": name,
    "description": description,
    "areaServed": {
      "@type": "City",
      "name": "Raipur"
    }
  };
}
