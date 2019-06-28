const Cloudant = require('@cloudant/cloudant');
module.exports = ( uri ) => {

    let dataMap = {
        'product': {},
        'schools': {}
    }
    let schools = {}
    let products = {}
    let balance = {}

    const cloudant = Cloudant(uri)

    cloudant.set_cors({
        enable_cors: true,
        allow_credentials: true,
        origins: [ '*' ]
    }).then((data) => {
        // success - response is in 'data'.
    }).catch((err) => {
        // failure - error information is in 'err'.
    });

    const schoolDB = cloudant.db.use('school')
    const productDB = cloudant.db.use('product')
    const purchaseDB = cloudant.db.use('history')

    const setListData = (attr) => (body) => body.rows.map(data => {
        const doc = data.doc
        db[attr][doc._id] = doc
        return doc._id
    })


    purchaseDB.fetch({school: 'D'})
        .then( body => body.rows.map( purchase => purchase.doc ))



    const db = {
        cloudant: cloudant,
        schools: schools,
        products: products,
        balance: balance,
        budget: 1000,
        fetchSchoolList: () => {
            return schoolDB.list({include_docs: true}).then(setListData('schools'))
        },
        fetchProductList: () => {
            return productDB.list({include_docs: true}).then(setListData('products'))
        },
        fetchPurchases: () => purchaseDB.list({include_docs: true})
            .then((body) => body.rows.map(data => data.doc)),
        fetchSchoolPurchases: (school) => purchaseDB.find({
            selector: { school }
        }).then( body => body.docs ),
        getSchoolList: () => Object.keys(schools).map(id => schools[id]),
        getProductList: () => Object.keys(products).map(id => products[id]),
        purchase: (data) => purchaseDB.insert(data).then(res => res),
        purchaseBulk: (list) => purchaseDB.bulk({ docs: list }).then(res => res)
    }

    return db
}
