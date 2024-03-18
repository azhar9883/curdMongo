




const mongoose = require('mongoose')
let url = 'mongodb+srv://ayankhan59470:HcUcKdsmihjzeZw8@cluster0.nr0m6vs.mongodb.net/curdbase?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('database is connected')
}).catch((error)=>{
  console.log('error in connectio ',error)
})

module.exports = mongoose