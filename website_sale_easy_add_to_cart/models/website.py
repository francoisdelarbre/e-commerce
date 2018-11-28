
from odoo import api, fiels, models

class Website(models.Model):
    _inherit = 'website'

    @api.one
    def sale_product_quantity_in_cart(self, product_template):
        if isinstance(product_template, (tuple, list)):
            product_template = product_template[0]

        order = self.sale_get_order(force_create=True)

        quantity = 0.0

        if not order:
            return int(quantity)

        order_lines = self.env['sale.order.line'].sudo().search(
            [('order_id', '=', order.id),
             ('product_id', 'in',
              [product.id for product in product_template.product_variant_ids])]
        )
        for order_line in order_lines:
            quantity += order_line.product_uom_qty
        return int(quantity)

