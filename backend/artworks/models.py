from django.db import models
from django.contrib.auth.models import User
import datetime
from django.utils.translation import gettext as _

# Create your models here.


class Artwork(models.Model):
    UNITS = (
        ('0', 'in'),
        ('1', 'cm'),
    )
    CLASSIFICATION = (
        ('1', 'Unique'),
        ('2', 'Limited edition'),
        ('3', 'Open edition'),
        ('4', 'Unknown edition'),
    )

    def year_choices():
        return [(str(r), str(r)) for r in range(1984, datetime.date.today().year+1)]

    def current_year():
        return str((datetime.date.today().year))

    _id = models.AutoField(primary_key=True, editable=False)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    year = models.CharField(
        _('year'), choices=year_choices(), default=current_year, max_length=200)
    category = models.CharField(max_length=200, null=True, blank=True)
    medium = models.CharField(max_length=200, null=True, blank=True)
    condition = models.CharField(max_length=200, null=True, blank=True)
    classifications = models.CharField(
        max_length=20, choices=CLASSIFICATION, default="")
    # uploads to MEDIA_ROOT in setting
    image = models.ImageField(null=True)
    # album =
    # gallery =
    width = models.IntegerField(null=True)
    height = models.IntegerField(null=True)
    depth = models.IntegerField(null=True)
    unit = models.CharField(max_length=2, choices=UNITS, default="")
    isAnEdition = models.BooleanField(null=False, default=False)
    editionNum = models.IntegerField(default=0, null=False)
    editionSize = models.IntegerField(default=0, null=False)
    isSigned = models.BooleanField(null=False, default=False)
    isAuthenticated = models.BooleanField(null=False, default=False)
    frame = models.CharField(max_length=200, null=True, blank=True)
    isPrice = models.BooleanField(null=False, default=False)
    price = models.DecimalField(max_digits=12, decimal_places=0)
    aboutWork = models.CharField(max_length=2000, null=True, blank=True)
    provenance = models.CharField(max_length=2000, null=True, blank=True)
    artLocation = models.CharField(max_length=2000, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    # user type: artist, gallery, buyer/seller, admin

    def __str__(self):
        return self.title


class Favorite(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    artwork = models.ForeignKey(Artwork, on_delete=models.SET_NULL, null=True)


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    shippigDesc = models.CharField(max_length=1200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=0, null=True, blank=True)
    taxPrice = models.DecimalField(
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
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalcode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=0, null=True, blank=True)

    def __str__(self):
        return self.address
