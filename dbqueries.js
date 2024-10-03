const oracledb = require("oracledb");

async function getTable() {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "SIMSDEV",
            password: "SIMSDEV",
            connectString: "192.168.100.80/rajsims"
        });
        const result = await connection.execute(
            "SELECT Id, Name FROM um_action WHERE rownum<=5"
        );
        
        return result.rows;

    }
    catch (err) {
        console.error("SQL error", err);
        throw err; // Propagate the error to the caller
    } 
    finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = {
    getTable
};

