var update = document.getElementById('update')
var update_name=document.getElementsByName('update_name').toString()
var update_quote=document.getElementsByName('update_content').toString()

update.addEventListener('click', function () {
    // Send PUT Request here
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            /*'name': 'Aristotle',
            'quote': 'We are what we repeatedly do; excellence, then, is not an act but a habit.' */
            'name': update_name,
            'quote': update_quote
        })
    }).then(function(res) {
        if (res.ok) return res.json()
    })
        .then(function(data){
            console.log(data)
            window.location.reload(true)
        })
})
var del = document.getElementById('delete')

del.addEventListener('click', function () {
    fetch('quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Baltasar Gracian'
        })
    })
        .then(function(res) {
            if (res.ok) return res.json()
        }).
    then(function(data) {
        console.log(data)
        window.location.reload()
    })
})
