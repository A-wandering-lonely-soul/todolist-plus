var mysql=require('mysql')
var pool=mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'Root1111',
  database:'todolist'
})

let query=(sql,callback)=>{
  pool.getConnection((err,conn)=>{
    if(err){
      callback(err,null,null)
    }else{
      conn.query(sql,(qerr,vals,fields)=>{
        conn.release()
        callback(qerr,vals,fields)
      })
    }
  })
}

module.exports=query