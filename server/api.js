
const path = require('path')

module.exports = (app, db) => {

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/teampage', (req, res) => {
        res.sendFile(path.join(__dirname + '/index-team.html'));
    });

    app.get('/team/:team', (req, res) => {
        const team = db.schools[req.params.team]
        db.schoolPurchases(team).then( list => {
            let total = 0
            const purchases = list.map( p => {
                const product = db.products[p.product]
                const productTotal = p.count * product.price
                total += productTotal
                return {
                    product: product.name,
                    count: p.count,
                    total: productTotal
                }
            })
            res.send({ purchases, total, team });
        })
    });

    app.get('*/schools', function (req, res, next) {
        const data = req.body
        console.log(data,'REQUEST GET');
        res.send({ schools: 'some school' })
    });

    const refreshDB = () => Promise.all([
        db.fetchSchoolList(),
        db.fetchProductList()
    ]).then( res => {
        console.log('refreshDB')
        // console.log('schools:',res[1])
        // console.log('products:',res[0])
        return res
    })
    app.get('*/refresh', function (req, res, next) {
        refreshDB().then( data => res.send({
            products: data[0],
            schools: data[1]
        }) )
    });

    app.get('*/init', (req, res, next) => {
        const schoolList = db.getSchoolList()
        const productList = db.getProductList()
        console.log({ schools: schoolList, products: productList })
        res.send({ schools: schoolList, products: productList })
    });

    app.post('*/buy', (req, res, next) => {
        console.log('bought',JSON.stringify(req.body));
        db.purchase(req.body).then( data => {
            console.log('bought', data)
            res.send(data)
        });
    });

    app.post('*/buyall', (req, res, next) => {
        console.log('bought all',JSON.stringify(req.body));
        const { school, purchases } = req.body
        const list = purchases.map( p => ({ ...p, school }))
        db.purchaseBulk(list).then( data => {
            console.log('bought all', data)
            res.send(data)
        });
    });

    return { refreshDB }
}
