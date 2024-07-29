import pytest
from api.models import Product

def create_product(name='Test', photo_url='https://i.imghippo.com/files/zBmvr1722242299.webp', status='Active'):
    return Product(
        ProductName=name,
        ProductPhotoURL=photo_url,
        ProductStatus=status
    )

def test_new_product_error(test_db):
    product_name = 'Test'
    product_photo_url = 'https://i.imghippo.com/files/zBmvr1722242299.webp'
    product_status = 'Active1'
    try:
        product = Product(
            ProductName=product_name,
            ProductPhotoURL=product_photo_url,
            ProductStatus=product_status
        )
        product.save()
    except:
        return
    assert 'Product status field allowed incorrect data' == ''

def test_create_valid_product():
    product_name = 'Test'
    product_photo_url = 'https://i.imghippo.com/files/zBmvr1722242299.webp'
    product_status = 'Active'
    product = create_product(
        name=product_name,
        photo_url=product_photo_url,
        status=product_status
    )
    assert product.ProductName == product_name
    assert product.ProductPhotoURL == product_photo_url
    assert product.ProductStatus == product_status

def test_create_product_with_invalid_status():
    product_name = 'Test'
    product_photo_url = 'https://i.imghippo.com/files/zBmvr1722242299.webp'
    product_status = 'InvalidStatus'
    with pytest.raises(ValueError):
       product = create_product(
            name=product_name,
            photo_url=product_photo_url,
            status=product_status
        )
       product.save()

def test_create_product_with_missing_status():
    product_name = 'Test'
    product_photo_url = 'https://i.imghippo.com/files/zBmvr1722242299.webp'
    with pytest.raises(ValueError):
        product = create_product(
            name=product_name,
            photo_url=product_photo_url,
            status=''
        )
        product.save()

def test_save_valid_product():
    product = create_product()
    product.save()
    retrieved_product = Product.get(ProductID=product.ProductID)
    assert retrieved_product.ProductName == product.ProductName
    assert retrieved_product.ProductPhotoURL == product.ProductPhotoURL
    assert retrieved_product.ProductStatus == product.ProductStatus

def test_save_invalid_product():
    product_name = 'Test'
    product_photo_url = 'https://i.imghippo.com/files/zBmvr1722242299.webp'
    product_status = 'InvalidStatus'
    try:
        product = create_product(
            name=product_name,
            photo_url=product_photo_url,
            status=product_status
        )
        product.save()
    except ValueError:
        assert True
    else:
        assert False, 'Product with invalid status was saved to the database'


def test_update_product():
    product = create_product()
    product.save()
    product.ProductName = 'UpdatedTest'
    product.save()
    updated_product = Product.get(ProductID=product.ProductID)
    assert updated_product.ProductName == 'UpdatedTest'

def test_get_nonexistent_product(test_db):
    with pytest.raises(Product.DoesNotExist):
        Product.get(ProductName='NonexistentProduct')

def test_create_multiple_products():
    photoUrl = "https://i.imghippo.com/files/zBmvr1722242299.webp"
    product1 = create_product(name='Test1')
    product2 = create_product(name='Test2', photo_url=photoUrl)
    product1.save()
    product2.save()
    retrieved_product1 = Product.get(ProductID=product1.ProductID)
    retrieved_product2 = Product.get(ProductID=product2.ProductID)
    assert retrieved_product1.ProductName == 'Test1'
    assert retrieved_product2.ProductName == 'Test2'
    assert retrieved_product2.ProductPhotoURL == photoUrl

def test_update_product_invalid_status():
    product = create_product()
    product.save()
    new_status = 'Inactive'
    try:
        product.ProductStatus = new_status
        product.save()
    except ValueError:
        assert True
    else:
        assert False, 'Product with invalid status was saved to the database'

def test_update_product_status():
    product = create_product()
    product.save()
    new_status = 'InActive'
    product.ProductStatus = new_status
    product.save()
    updated_product = Product.get(ProductID=product.ProductID)
    assert updated_product.ProductStatus == new_status


def test_delete_product():
    product = create_product()
    product.save()
    assert product.ProductName == "Test"
    product_id = product.ProductID
    print("ID  ",product_id)
    product.delete_instance()
    with pytest.raises(Product.DoesNotExist):
        Product.get(ProductID=product_id)
        

