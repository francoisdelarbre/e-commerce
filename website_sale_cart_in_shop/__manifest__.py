# -*- coding: utf-8 -*-
# Copyright <YEAR(S)> <AUTHOR(S)>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
{
    "name": "Cart in shop page",
    "summary": "This module add the cart in shop page.",
    "version": "11.0.0.1.0",
    "development_status": "Beta",
    "category": "website",
    "website": "https://github.com/OCA/e-commerce",
    "author": "François Delarbre, Odoo Community Association (OCA)",
    "maintainers": ["francoisdelarbre"],
    "license": "AGPL-3",
    "application": False,
    "installable": True,
    "depends": [
        "base",
    ],
    "data": [
        "views/website_sale_cart_in_shop.xml",
    ],
    "qweb": [
        "static/src/xml/website_sale_cart_in_shop.xml",
    ]
}
