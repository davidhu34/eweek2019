
const path = require('path')

module.exports = (app, db, io) => {

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    const refreshDB = () => Promise.all([
        db.fetchSchoolList(),
        db.fetchProductList()
    ]).then( res => {
        console.log('schools and products fetched')
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

            console.log('refreshed balance', balance)
        })
        return { products, schools }
    })

    const refreshTeamBalance = (team) => db.fetchSchoolPurchases(team._id)
    .then( list => {
        let total = 0
        const purchases = list.map( p => {
            const product = db.products[p.product]
            const productTotal = p.count * product.price
            total += productTotal
            return {
                key: p._id,
                product: product,
                count: p.count,
                total: productTotal
            }
        })
        db.balance[team._id] = total
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
        const team = db.schools[school]

        let cartTotal = 0
        let invalid = false
        const list = purchases.map( p => {
            const product = db.products[p.product]
            const prodTotal = product.price * p.count

            if (prodTotal) cartTotal += prodTotal
            else invalid = true

            return { ...p, school }
        })

        if (invalid) res.send({
            success: false,
            message: `資料有誤`
        })
        else refreshTeamBalance(team).then( result => {

            const bal = db.balance[school]
            if (cartTotal + bal > db.budget) {
                res.send({
                    success: false,
                    message: `餘額不足：\n本次消費${cartTotal}元 | 剩餘額度${db.budget-bal}元`
                })
            } else db.purchaseBulk(list).then( result => {
                refreshTeamBalance(team).then( teamBalance => {
                    res.send({
                        success: true,
                        message: `本次消費${cartTotal}元 | 剩餘額度${db.budget-teamBalance.total}元`
                    })
                })
            })

        }).catch( err => res.send({
            message: err,
            success: false
        }))
        
    });

    app.get('/teamhistory/:team', (req, res) => {
        const team = db.schools[req.params.team]
        refreshTeamBalance(team).then( result => res.send(result))
    })

    app.get('/teampage', (req, res) => {
        res.sendFile(path.join(__dirname + '/index-team.html'));
    });

    app.get('/team/:team', (req, res) => {
        const team = db.schools[req.params.team]
        refreshTeamBalance(team).then( result => res.send({
            ...result,
            purchases: result.purchases.map(p => ({
                ...p,
                product: p.product.name
            }))
        }))
    })

    app.get('/dashboard', (req, res) => {
        res.sendFile(path.join(__dirname + '/index-dash.html'));
    });

    return { refreshDB }
}
