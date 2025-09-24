

const fs=require('fs');
function readUsers(filePath,callback){
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            if (err.code === 'ENOENT') {
                return callback(null, []);
            }
             return callback(err);
        }

        try {
            const parsedData = JSON.parse(data);
            return callback(null, parsedData);
        } catch (parseErr) {
          
            return callback(null, []);
        }
    })
}
function writeUsers(filePath,users,callback){
    const dataToWrite = users || [];
    const jsonString = JSON.stringify(dataToWrite, null, 2);
    fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    })
}
module.exports={readUsers,writeUsers};