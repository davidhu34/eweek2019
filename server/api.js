
const path = require('path')

module.exports = (app, db) => {

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    const refreshDB = () => Promise.all([
        db.fetchSchoolList(),
        db.fetchProductList()
    ]).then( res => {
        console.log('refreshDB')
        return {
            products: res[0],
            schools: res[1]
        }
    })

    app.get('/refresh', function (req, res, next) {
        refreshDB().then( data => res.send(data) )
    });

    app.get('/init', (req, res, next) => {
        const schoolList = db.getSchoolList()
        const productList = db.getProductList()
        res.send({ schools: schoolList, products: productList })
    });

    app.post('/buy', (req, res, next) => {
        console.log('buying',JSON.stringify(req.body));
        db.purchase(req.body).then( result => {
            console.log('bought', result.data)
            res.send(result.data)
        });
    });

    app.post('/buyall', (req, res, next) => {
        console.log('buying',JSON.stringify(req.body));
        const { school, purchases } = req.body
        const list = purchases.map( p => ({ ...p, school }))
        db.purchaseBulk(list).then( result => {
            console.log('bought all', result.data)
            res.send(result.data)
        });
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
    })

    return { refreshDB }
}
