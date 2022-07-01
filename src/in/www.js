import Express from "express"

const router = Express.Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/home', (req, res) => {
    res.redirect('/')
})

router.get('/about', async (req, res) => {
    const itens_list = []
    res.render('about', { itens_list: itens_list })
})

router.get('/contact', async (req, res) => {
    const itens_list = []
    res.render('contact', { itens_list: itens_list })
})


export { router }