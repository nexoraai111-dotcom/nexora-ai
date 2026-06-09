import stripe

stripe.api_key = "PUT_YOUR_SECRET_KEY"

def create_checkout():
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {"name": "Nexora Pro"},
                "unit_amount": 500,
            },
            "quantity": 1,
        }],
        mode="payment",
        success_url="https://nexora.ai.111.com/success",
        cancel_url="https://nexora.ai.111.com/cancel",
    )

    return session.url
