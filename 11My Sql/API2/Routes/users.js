var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display user page
router.get('/', function(req, res, next) {      
    dbConn.query('SELECT * FROM users ORDER BY id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users',{data:''});   
        } else {
            // render to views/users/index.ejs
            res.render('users',{data:rows});
        }
    });
});

// display add user page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('users/add', {
        name: '',
        email: '',
        position:'',
        Qualification:'',
        ContactNo:'',
        City:''
    })
})

// add a new user
router.post('/add', function(req, res, next) {    

    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let Qualification=req.body.Qualification;
    let ContactNo=req.body.ContactNo;
    let City=req.body.City;
    let errors = false;

    if(name.length === 0 || email.length === 0 || position.length === 0||Qualification.length===0||ContactNo.length===0||City.length===0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and email and position");
        // render to add.ejs with flash message
        res.render('users/add', {
            name: name,
            email: email,
            position:position,
            Qualification:Qualification,
            ContactNo:ContactNo,
            City:City
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            email: email,
            position:position,
            Qualification:Qualification,
            ContactNo:ContactNo,
            City:City
        }
        
        // insert query
        dbConn.query('INSERT INTO users SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('users/add', {
                    name: form_data.name,
                    email: form_data.email,
                    position:form_data.position,
                    Qualification:form_data.Qualification,
                    ContactNo:form_data.ContactNo,
                    City:form_data.City
                })
            } else {                
                req.flash('success', 'User successfully added');
                res.redirect('/users');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM users WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'User not found with id = ' + id)
            res.redirect('/users')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('users/edit', {
                title: 'Edit User', 
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
                position: rows[0].position,
                Qualification:rows[0].Qualification,
                ContactNo:rows[0].ContactNo,
                City:rows[0].City
            })
        }
    })
})

// update user data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let Qualification=req.body.Qualification;
    let ContactNo=req.body.ContactNo;
    let City=req.body.City;
    let errors = false;

    if(name.length === 0 || email.length === 0 || position.length === 0||Qualification.length===0||ContactNo.length===0||City.length===0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter name and email and position");
        // render to add.ejs with flash message
        res.render('users/edit', {
            id: req.params.id,
            name: name,
            email: email,
            position:position,
            Qualification:Qualification,
            ContactNo:ContactNo,
            City:City
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            name: name,
            email: email,
            position:position,
            Qualification:Qualification,
            ContactNo:ContactNo,
            City:City
        }
        // update query
        dbConn.query('UPDATE users SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('users/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    email: form_data.email,
                    position: form_data.position,
                    Qualification:form_data.Qualification,
                    ContactNo:form_data.ContactNo,
                    City:form_data.City
                })
            } else {
                req.flash('success', 'User successfully updated');
                res.redirect('/users');
            }
        })
    }
})
   
// delete user
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM users WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/users')
        } else {
            // set flash message
            req.flash('success', 'User successfully deleted! ID = ' + id)
            // redirect to user page
            res.redirect('/users')
        }
    })
})

module.exports = router;