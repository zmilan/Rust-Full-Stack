// $docker volume create mongodbdata
// $docker run -d -v mongodbdata:/data/db --name mongo -p 27017:27017 mongo

// https://rominirani.com/docker-tutorial-series-part-7-data-volumes-93073a1b5b72

const mongoose = require('mongoose');

const config = require('config');
const mongoURI = config.get("mongoURI");

// [Should] Refer to this.
// https://medium.com/@vsvaibhav2016/best-practice-of-mongoose-connection-with-mongodb-c470608483f0

const useMongo = async function() {
    try {
        const _connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('MongoDB Connected...');

        // Should handle when database is not working. It shows TimeoutError.

        // Use this to develop. https://mongoosejs.com/docs/connections.html#multiple_connections
        // Should close whenver necessary.
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log("Mongoose default connection is disconnected due to application termination");
                process.exit(0);
            });
        });

    } catch(e) {
        console.log(e); // Save it to a log file.
    }
};

module.exports = useMongo
