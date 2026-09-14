from django.db import models


class Product(models.Model):
    sku = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=255)
    vendor = models.CharField(max_length=120)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.BooleanField(default=True)

    class Meta:
        indexes = [models.Index(fields=["vendor", "in_stock"])]


class Order(models.Model):
    practice_id = models.UUIDField(db_index=True)
    status = models.CharField(max_length=32, db_index=True)
    tracking_number = models.CharField(max_length=100, blank=True)
    placed_at = models.DateTimeField(auto_now_add=True)
