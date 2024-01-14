# fresh-print-node

Description of Requirement :

A vendor will have several pieces of apparel in his stock. Every apparel will have a unique code.
Each piece of Apparel can come in multiple sizes. So the vendor will update the quality of stock
he holds and the price he is willing to sell for a given apparel code and size. Customer orders will
have several apparel codes and sizes.
    ● As a vendor, I can update the stock quality and price of one apparel code and size.
    ● As a vendor, I can simultaneously update the stock quality and price of several apparel
    codes and sizes.
    ● As a user, I should be able to check If I can fulfill the requirement of a customer order.
    ● As a user, I should be able to know the lowest cost at which I can get the order fulfilled.


Steps to start: 
1. To start server -> npm start.

ALL Api culrs are below: details:

1. Update price and quantity of stock :
    curl --location --request PUT 'http://localhost:3000/api/v1/stocks/update' \
    --header 'Content-Type: application/json' \
    --data '[
        {
        "stock_id":1,
        "quantity": 106,
        "price":5000
        },
        {
        "stock_id":2,
        "quantity": 200,
        "price":800
        }
    ]'
    OR 

    curl --location --request PUT 'http://localhost:3000/api/v1/stocks/update' \
    --header 'Content-Type: application/json' \
    --data '{
        "stock_id":1,
        "quantity": 106,
        "price":5000
    }'

2. Get order by id which can be full filled by vendors :
    curl --location 'http://localhost:3000/api/v1/orders/order/1' \
    --data ''

3. Get order by id which can be full filled by vendors and what is the lowest price order can be placed :
    curl --location 'http://localhost:3000/api/v1/orders/order/1?isPriceCheck=true' \
    --data ''

