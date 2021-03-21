from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Artwork(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    artist = models.IntegerField(null=False)
    biography = models.CharField(max_length=200, null=True, blank=True)
    # image =
    caption = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=1200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    color = models.CharField(max_length=200, null=True, blank=True)
    material = models.CharField(max_length=200, null=True, blank=True)
    width = models.IntegerField(null=False)
    height = models.IntegerField(null=False)
    frame = models.BooleanField(null=False)
    price = models.DecimalField(max_digits=12, decimal_places=0)
    stockCount = models.IntegerField(null=False, default=0)
    # gallery =
    # automatically add this field
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    shippigDesc = models.CharField(max_length=1200, null=True, blank=True)
    shippigPrice = models.DecimalField(
        max_digits=7, decimal_places=0, null=True, blank=True)
    feePrice = models.DecimalField(
        max_digits=7, decimal_places=0, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=0, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createAt)
    
# cart
class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    artwork = models.ForeignKey(Artwork, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=False)
    price = models.DecimalField(
        max_digits=7, decimal_places=0, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    
    def __str__(self):
        return self.name
    


class ShippingAddress(models.Model):
    _id =
    order =
    address =
    
