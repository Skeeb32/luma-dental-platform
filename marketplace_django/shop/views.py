import json

from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render

from .models import Order, Product


def storefront(request):
    """Server-rendered catalog: fast, cacheable, and intentionally separate from the RCM SPA."""
    product_rows = list(Product.objects.filter(in_stock=True).values("id", "name", "vendor", "unit_price")[:12])
    categories = ("disposables", "infection", "restorative")
    symbols = ("✦", "●", "▰", "◇", "▤", "⌇")
    colors = ("#d8f0ee", "#f6e5c9", "#e9e0f7", "#f6e0e2", "#dcecf9", "#e5f1dc")
    products = [
        {
            "id": row["id"],
            "name": row["name"],
            "vendor": row["vendor"],
            "detail": "Practice supply · Available now",
            "price": row["unit_price"],
            "category": categories[index % len(categories)],
            "tag": "In stock",
            "symbol": symbols[index % len(symbols)],
            "color": colors[index % len(colors)],
        }
        for index, row in enumerate(product_rows)
    ]
    orders = [
        {"id": f"ORD-{row['id']}", "status": row["status"].replace("_", " ").title(), "eta": row["placed_at"].strftime("Ordered %b %-d"), "items": 1}
        for row in Order.objects.order_by("-placed_at")[:3]
    ]
    # The HTML remains useful as a plain-file preview, while Django replaces this with
    # the live catalog for an authenticated practice.
    marketplace_data = json.dumps({"products": products, "orders": orders}, cls=DjangoJSONEncoder)
    return render(request, "shop/storefront.html", {"marketplace_data": marketplace_data})
