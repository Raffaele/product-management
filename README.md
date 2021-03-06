# Product management web app

Divided in 2 parts:
1. server in node to manage API and persistence (created just for support the front-end)
2. client in react, hooks, react-routing, reactstrap (my react skills)

## To use the app:
1. Install [Node](https://nodejs.org/);
2. Clone the project from repository.
3. Open 2 terminals (one in `server` subfolder and the other one in `client` subfolder)
4. Run in both terminals the command `npm install` (or `yarn` if you're running on a machine with [yarn](https://yarnpkg.com/)) to install dependencies
5. Once both dependencies are installed (the one in server folder and the one in client folder), run in the server terminal the command `npm start` (or `yarn start`).
6. Once the server is running, run `npm start` (or `yarn start`) in client as well.
7. The restful server will run in port `2200` of localhost, the client in port `3000`.

I was more focused on the front-end part than on the  back-end.

Basic requirements:
1. Pull a set of products from a persistence layer (I've used fetch)
2. List the above products in a UI (react, reactstrap)
3. Sort the products by Name, Size, and Category in the UI. In the data there was not a "size" to allow a sort on that.
4. Keep the products persisted even after the application has shutdown. Persistency is generally done in back-end, in this particular case I've added a support with `localStorage` in case of API failures.

Extra requirements:
1. Include a create product feature :white_check_mark:
1.1 Challenge: Validate that the Last Purchase Date cannot be less than the creation date :x:
2. Include a delete product feature :white_check_mark:
2.1 Challenge: Cache the top 5 most recently deleted products :x:
3. Include an update feature :x:
4. Paginate the list of products by 5, 10, and 20 :white_check_mark:
5. Add a feature to get the product with the oldest Last Purchased Date from a single category :x:
6. Generate purchase statistics :x:

* For extra feature `1.1` we can create dates with `new Date()` api and compare the dates.

* For extra feature `2.1` we can just store the information of the element we are going to delete in an array by using and hook. After every push into the storage array we can take the last 5 elements with `Array.prototype.slice`, by passing `-5` as param

* I've started the implementation for extra feature `3`, but I went out of time. I've created the UI to manage implement it. My app creates a copy of the product, update the fields and send it in a `PUT` request to the server. After that we can just refresh our data completely (as my APP does for delete and insert) or update just the element into the internal data structure.

* To implement extra feature `4` we can put group the products by categoryId, (_.groupBy from lodash can do it for us).

```js
// This code is not tested
const grupedByCategory = _.groupBy(products, 'CATEGORY_ID')
    .map(sortFromPurchaseDate)
    .map(productsFromCategory => productsFromCategory[0]);

function sortFromPurchaseDate(array) {
    return array.slice().sort((prod1, prod2) => {
        const purchaseDate1 = new Date(prod1.PURCHASE_DATE);
        const purchaseDate2 = new Date(prod2.PURCHASE_DATE);

        return (purchaseDate1 > purchaseDate2) ? 1 : -1;
    });
}
```

* Unfortunately I didn't understand which type of statistic we can generate on purchase for extra requirement `6`.


