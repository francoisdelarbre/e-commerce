
from odoo import api, fiels, models

class Website(models.Model):
    _inherit = 'website'

    @api.one
    def sale_get_int_quantity_in_cart(self, product_id):
        if isinstance(product_id, (tuple, list)):
            product_id = product_id[0]

        order = self.sale_get_order(force_create=True)

        quantity = 0.0

        if not order:
            return int(quantity)

        order_lines = self.env['sale.order.line'].search(
            [('order_id', '=', order.id),
             ('product_id', '=', product_id)]
        )

        for order_line in order_lines:
            quantity += order_line.product_uom_qty

        return int(quantity)

