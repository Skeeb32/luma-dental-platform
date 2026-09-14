# Lakeview Dental Supply

The marketplace is intentionally a Django server-rendered application. The catalog and order pages render on the server for predictable performance and crawlable supplier pages; small JavaScript enhancements are isolated to cart and shipment interactions. It shares tenant identity through signed SSO claims, not a shared frontend runtime with the RCM application.
