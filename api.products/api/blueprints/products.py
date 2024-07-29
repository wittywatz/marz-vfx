from flask import Blueprint, request
from marshmallow import ValidationError
from api.models import Product, PRODUCT_STATUSES
from api.schemas import ProductSchema

products_blueprint = Blueprint('products_blueprint', __name__)

@products_blueprint.route('/all', methods=['GET'])
def get_all_products():
    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 100, type=int)
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().paginate(page, page_size).dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized,"page":page, "page_size":page_size , 'message': 'success' }, 200

@products_blueprint.route('/active', methods=['GET'])
def get_active_products():
    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 100, type=int)
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().where(
            (Product.ProductStatus == PRODUCT_STATUSES["Active"]) 
        ).paginate(page, page_size).dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized,"page":page, "page_size":page_size ,'message': 'success' }, 200

@products_blueprint.route('/update_status', methods=['POST'])
def post_update_product_status():
    product_schema = ProductSchema()
    json_data = request.get_json()
    if not json_data:
        return { 'message': 'No data provided!' }, 400
    try:
        if not json_data.get("ProductStatus") or not json_data.get("ProductID"):
            return { 'message': "Please provide both ProductStatus and ProductID" }, 422
        product = product_schema.load({"ProductStatus":json_data.get("ProductStatus"), "ProductID":json_data.get("ProductID")})
        Product.update(**product).where(
            Product.ProductID == product['ProductID']).execute()
    except ValidationError as err:
        return { 'message': err.messages }, 422
    except Exception as err:
        return { 'message': str(err) }, 500
    return { 'message': f'Product status with ID: {product["ProductID"]} updated successfully!' }, 200
