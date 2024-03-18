const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    color: String,
    price: {
        type: Schema.Types.Number,
        set: function(value) {
            if (typeof value === 'string') {
                const parsedValue = parseFloat(value);
                if (!isNaN(parsedValue)) {
                    return parsedValue;
                } else {
                    return undefined;
                }
            } else {
                return value;
            }
        }
    },
    images: [String] 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product