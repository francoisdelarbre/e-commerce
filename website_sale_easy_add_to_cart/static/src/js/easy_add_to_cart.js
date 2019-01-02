
var templates_str =
    "<templates id=\"easy_add_to_cart\">\n" +
    "    <t t-name=\"not_in_cart_btn\">\n" +
    "            <div class=\"easy_add_to_cart not_in_cart css_quantity input-group oe_website\">\n" +
    "                    <input type=\"text\" class=\"js_quantity form-control quantity\"  t-att-data-product-id=\"product.id\" t-att-value=\"1\" />\n" +
    "                    <a class=\"easy_add_to_cart_btn mb8 input-group-addon btn btn-default fa fa-shopping-cart\">\n" +
    "                    </a>\n" +
    "            </div>\n" +
    "    </t>\n" +
    "    <t t-name=\"in_cart_btn\">\n" +
    "            <div class=\"easy_add_to_cart in_cart css_quantity input-group oe_website_spinner\">\n" +
    "                    <a t-attf-href=\"#\" class=\"mb8 input-group-addon js_add_cart_json hidden-xs\">\n" +
    "                        <i class=\"fa fa-minus\"></i>\n" +
    "                    </a>\n" +
    "                    <input type=\"text\" class=\"js_quantity form-control quantity prevent-default-enter\" t-att-data-product-id=\"product.id\" t-att-value=\"quantity\" />\n" +
    "                    <a t-attf-href=\"#\" class=\"mb8 input-group-addon float_left js_add_cart_json hidden-xs\">\n" +
    "                        <i class=\"fa fa-plus\"></i>\n" +
    "                    </a>\n" +
    "            </div>" +
    "    </t>" +
    "</templates>";
$(document).ready(
    function () {
        odoo.define("website_sale.easy_add_to_cart", function (require) {
            var core = require('web.core');
            var ajax = require("web.ajax");
            var qweb = core.qweb;

            // avoid that pressing enter submit the form
            var apply_prevendefault = function(element) {
                element.on('keyup keypress', 'input.prevent-default-enter', function(e) {
                keuCode = e.keyCode || e.which;
                if(e.keyCode === 13){
                    e.preventDefault();
                    $(this).change()
                }
            });
            };

            // TODO: load templates from a file
            //ajax.loadXML('/website_sale_easy_add_to_cart/static/src/xml/easy_add_to_cart.xml', qweb);
            //qweb.add_template('/website_sale_easy_add_to_cart/static/src/xml/easy_add_to_cart.xml');
            qweb.add_template(templates_str);

            var apply_not_in_cart = function(element) {
                element.on('keypress', '.not_in_cart input.js_quantity', function(e) {
                    keuCode = e.keyCode || e.which;
                    if(e.keyCode === 13){
                        e.preventDefault();
                        $(this).parent().find(".easy_add_to_cart_btn").first().click();
                    }
                });
                element.on('click', '.not_in_cart .easy_add_to_cart_btn', function (e) {
                    var ajax = require('web.ajax');
                    var $easy_add_to_cart = $(this).parent();
                    var $quantity_input = $easy_add_to_cart.children("input").first();

                    var quantity = $quantity_input.val();
                    var product_id = parseInt($quantity_input.attr("data-product-id"));


                    ajax.jsonRpc("/shop/cart/update_json", "call", {
                        'product_id': product_id,
                        'set_qty': quantity
                    }).then(function (data) {
                        $easy_add_to_cart.replaceWith(
                            $.parseHTML(
                                qweb.render(
                                    "in_cart_btn", {
                                        'product': {'id': product_id},
                                        'quantity': data.quantity
                                    })
                            )
                        );
                        apply_prevendefault($easy_add_to_cart);
                        $("#cart_total").replaceWith(data['website_sale.cart_lines']);
                        $("#my_cart .my_cart_quantity").text(data['cart_quantity']);
                        if (data['cart_quantity']) {
                            $("#my_cart").removeClass("hidden")
                        }


                    });
                });
            };

            var apply_in_cart = function(element) {

                element.on('change', ".in_cart input.js_quantity", function () {
                    var product_id = parseInt($(this).attr("data-product-id"));
                    var quantity = $(this).val();

                                        var $easy_add_to_cart = $(this).parent();

                    var $input = $(this);
                    ajax.jsonRpc("/shop/cart/update_json", "call", {
                        'product_id': product_id,
                        'set_qty': quantity
                    }).then(function (data) {
                        var new_quantity = parseInt(data.quantity);
                        console.log("hello");
                        console.log(new_quantity)
                        if(!new_quantity) {
                            console.log("hi")
                            var $not_in_cart = $easy_add_to_cart.replaceWith($.parseHTML(
                                qweb.render(
                                    "not_in_cart_btn", {
                                        'product': {'id': product_id},
                                    })
                            ));
                            apply_not_in_cart($not_in_cart);

                            return;
                        }

                        $input.val(new_quantity);

                        $("#cart_total").replaceWith(data['website_sale.cart_lines']);
                        $("#my_cart .my_cart_quantity").text(data['cart_quantity'])


                    });

                });

            };
            apply_prevendefault($(document));
            apply_not_in_cart($(document));
            apply_in_cart($(document))


        })
    });