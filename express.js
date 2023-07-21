
var fs = require('fs'); // Import FileSystem
const http=require("http"); // Impot Http
const server= http.createServer((req,res)=>{
    res.setHeader("Content-Type", "text/html"); //To support html files
 if(req.url==="/") {  // Check the roots
  // Show Html From Server
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
  return res.end(); // end the work
 }
    else if(req.url==="/message" && req.method === "POST"){ // Methode For Post or Get Data
       const body = []; 
       req.on("data", (chunk) => {
        body.push(chunk); // add data to array
        console.log(body.toString());
    });

    req.on("end", () => {
        const message = body.toString().split("=")[1]; // split text with '=' 
        fs.writeFileSync("message.txt", message);
    });
       res.writeHead(302,{"Location":"/"});     // go to this: '/' Root
        return res.end();
    }
});
 server.listen(2000); // Set on browsers In localhost: 2000
