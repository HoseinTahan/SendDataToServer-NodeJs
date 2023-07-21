
var fs = require('fs');
const http=require("http");
const server= http.createServer((req,res)=>{
    res.setHeader("Content-Type", "text/html");
 if(req.url==="/") {
  res.write("<html>");
        res.write("<head><title>Hello World</title></head>");
        res.write("<body><center>");
        res.write("<h1>Home Page</h1>");
        res.write("<form action='/message' method='POST'>");
        res.write("<input type='text' name='message'/>");
        res.write("<input type='submit'/>");
        res.write("</form>");
        res.write("</center></body>");
        res.write("</html>");
  return res.end();
 }
    else if(req.url==="/message" && req.method === "POST"){
       const body = []; 
       req.on("data", (chunk) => {
        body.push(chunk);
        console.log(body.toString());
    });

    req.on("end", () => {
        const message = body.toString().split("=")[1];
        fs.writeFileSync("message.txt", message);
    });
       res.writeHead(302,{"Location":"/"});     
        return res.end();
    }
  else if(req.url==="/hosein"){
    const a= fs.readFileSync('personalpage.html');
    res.write(a);  
   return res.end();
  }
});
 server.listen(2000);