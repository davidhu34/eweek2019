module.exports = (app, db) => {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('*/schools', function (req, res, next) {
        const data = req.body
        console.log(data,'REQUEST GET');
        res.send({ schools: 'some school' })
    });

    const refreshDB = () => Promise.all([
        db.getProducts(),
        db.getSchools()
    ]).then( res => {
        console.log('refreshDB')
        console.log('schools:',res[1])
        console.log('products:',res[0])
        return res
    })
    app.get('*/refresh', function (req, res, next) {
        refreshDB().then( data => res.send({
            products: data[0],
            schools: data[1]
        }) )
    });

    app.get('*/init', (req, res, next) => {
        console.log({ schools: db.schools, products: db.products })
        res.send({ schools: db.schools, products: db.products })
    });

    app.post('*/buy', (req, res, next) => {
        console.log('bought',JSON.stringify(req.body));
        db.purchase(req.body).then( data => {
            console.log('bought', data);
            res.send(data);
        });
    });

    app.post('*/buyall', (req, res, next) => {
        console.log('bought all',JSON.stringify(req.body));
        // db.purchase(req.body).then( data => {
        //     console.log('bought', data);
        //     res.send(data);
        // });
    });

    return { refreshDB }
}
