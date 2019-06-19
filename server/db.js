const Cloudant = require('@cloudant/cloudant');
module.exports = ( uri ) => {

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

    const setListData = (attr) => (body) => {
        const results = body.rows.map(data => data.doc)
        db[attr] = results
        return results
    }

    const schoolDB = cloudant.db.use('school')
    const productDB = cloudant.db.use('product')
    const purchaseDB = cloudant.db.use('history')

    let schools = []
    let products = []

    const db = {
        cloudant: cloudant,
        schools: schools,
        products: products,
        getSchools: () => {
            return schoolDB.list({include_docs: true}).then(setListData('schools'))
        },
        getProducts: () => {
            return productDB.list({include_docs: true}).then(setListData('products'))
        },
        purchase: (data) => purchaseDB.insert(data).then(result => result),
        purchaseBulk: (list) => purchaseDB.bulk({ docs: list }).then(result => result),
    }

    return db
}
