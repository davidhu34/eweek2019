
const path = require('path')

module.exports = (app, db, io) => {

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    const refreshDB = () => Promise.all([
        db.fetchSchoolList(),
        db.fetchProductList()
    ]).then( res => {
        console.log('refreshDB', res)
        let balance = {}
        const [products,schools] = res
        db.getSchoolList().forEach( s => {
            balance[s._id] = 0;
        })
        db.fetchPurchases().then( purchases => {
            purchases.map( p => {
                const product = db.products[p.product]
                const productTotal = p.count * product.price
                balance[p.school] += productTotal
            })
            db.balance = balance
        })
        return { products, schools }
    })

    const refreshTeamBalance = (team) => db.fetchSchoolPurchases(team).then( list => {
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
        db.balance[team] = total
        io.emit('teamtotal',db.balance)
        return { purchases, total, team }
    })

    app.get('/refresh', function (req, res, next) {
        refreshDB().then( data => res.send(data) )
    });

    app.get('/init', (req, res, next) => {
        const schoolList = db.getSchoolList()
        const productList = db.getProductList()
        res.send({ schools: schoolList, products: productList })
    });

    app.get('/init-dashboard', (req, res, next) => {
        res.send({ schools: db.getSchoolList(), balance: db.balance })
    });

    app.post('/buy', (req, res, next) => {
        console.log('buying',JSON.stringify(req.body));
        db.purchase(req.body).then( result => {
            res.send(result.data)
        });
    });

    app.post('/buyall', (req, res, next) => {
        console.log('buying all',JSON.stringify(req.body));
        const { school, purchases } = req.body
        const list = purchases.map( p => ({ ...p, school }))
        db.purchaseBulk(list).then( result => {
            refreshTeamBalance(school)
            res.send(result)
        });
    });

    app.get('/teampage', (req, res) => {
        res.sendFile(path.join(__dirname + '/index-team.html'));
    });

    app.get('/team/:team', (req, res) => {
        const team = db.schools[req.params.team]
        refreshTeamBalance(team).then( result => res.send(result))
    })

    return { refreshDB }
}
