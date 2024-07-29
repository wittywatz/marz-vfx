from pytest import fixture
from flask import Flask
from peewee import SqliteDatabase
from api.models import Product


_TABLES = (Product,)

@fixture()
def test_db():
    db = SqliteDatabase(':memory:')
    with db.bind_ctx(_TABLES):
        db.create_tables(_TABLES)
        try:
            yield db
        finally:
            db.drop_tables(_TABLES)

@fixture()
def test_app(test_db):
    app = Flask(__name__)

    app.config.update({
        "TESTING": True,
    })
    yield app
