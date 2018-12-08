# -*- coding: utf-8 -*-
# Copyright <YEAR(S)> <AUTHOR(S)>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo.tests.common import HttpCase, TransactionCase


class UICase(HttpCase):

    post_install = True
    at_install = False

    def test_ui_web(self):
        """Test backend tests."""
        self.phantom_js(
            "/web/tests?debug=assets&module=module_name",
            "",
            login="admin",
        )

    def test_ui_website(self):
        """Test frontend tour."""
        self.phantom_js(
            url_path="/?debug=assets",
            code="odoo.__DEBUG__.services['web.Tour']"
                 ".run('test_module_name', 'test')",
            ready="odoo.__DEBUG__.services['web.Tour'].tours.test_module_name",
            login="admin")
