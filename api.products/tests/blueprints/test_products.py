from pytest import fixture
from app import PRODUCTS_URL
from api.blueprints.products import products_blueprint
from api.models import Product
import json

@fixture()
def test_client(test_app):
    test_app.register_blueprint(products_blueprint, url_prefix=PRODUCTS_URL)
    return test_app.test_client()

@fixture()
def init_db():

    active_product = Product(
        ProductName="Test1",
        ProductPhotoURL="https://i.imghippo.com/files/zBmvr1722242299.webp",
        ProductStatus="Active"
    )
    active_product.save()
    in_active_product = Product(
        ProductName="Test2",
        ProductPhotoURL="https://i.imghippo.com/files/zBmvr1722242299.webp",
        ProductStatus="InActive"
    )
    in_active_product.save()
    return [active_product, in_active_product]

def test_get_all_products(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/all")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    
    data = deserialized_response.get('data')
    message = deserialized_response.get('message')
    assert data is not None
    assert len(data) == 2
    assert message == 'success'

def test_active_products(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/active")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    message = deserialized_response.get('message')
    assert data is not None
    assert len(data) == 1
    assert message == 'success'

def test_post_update_product_status_validation_error(test_client):
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={ "test": "test"},
    )
    assert response.status_code == 422

def test_post_update_product_status_without_body_payload(test_client):
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status"
    )
    assert response.status_code == 400

def test_post_update_product_status_database_error(test_client, init_db):
    [active_product, _] = init_db
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={
            "ProductID": active_product.ProductID,
            "ProductName":"Test1",
            "ProductPhotoURL":"https://i.imghippo.com/files/zBmvr1722242299.webp",
            "ProductStatus":"Active1"
        },
    )
    assert response.status_code == 500

def test_post_update_product_status(test_client, init_db):
    [active_product, _] = init_db
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={
            "ProductID": active_product.ProductID,
            "ProductName":"Test1",
            "ProductPhotoURL":"https://i.imghippo.com/files/zBmvr1722242299.webp",
            "ProductStatus":"InActive"
        },
    )
    deserialized_response = json.loads(response.data)
    message = deserialized_response.get('message')
    assert f'{active_product.ProductID} updated successfully!' in message 
    assert response.status_code == 200
