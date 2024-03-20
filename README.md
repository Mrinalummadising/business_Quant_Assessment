<h1>Business Quant assessment working with the connection of MySQl and Express.js, Node.js</h1>
</hr>
I've done with business_Quant_Assignment which includes the API calls from MySQL database by query the data.I have used to retrieve the data by using NodeJS

<h2> Tech Stack: -Node.js -Express.js -MySQL Database </h2> 

<h2> Steps to run the backend: </h2>
<ol>
  <li>Type "npm install", and press enter to install all the necessary dependencies.</li>
  <li>Type "nodemon db.js", and press enter to run the backend server on Port 3000.</li>
</ol>

<h2> Instruction </h2>
<ul>
  <li>npm install</li>
  <li>node index.js</li>
</ul>

<h2> API/Routes </h2>
<ul>
 <li> <h2>Route to get all company data</h2></li>
  <li>localhost:5000/get_all </li>
</ul>
<ul>
  <li> <h2> Route to get revenue and gross profit of a specific company </h2> </li>
  <li> localhost:5000/get_one_data?ticker=AAPL </li>
  <li> Change the ticker value to get specific company </li>
</ul>
<ul>
  <li> <h2> Route to get revenue and gross profit of a specific company for last 5 years  </h2> </li>
<li> localhost:5000/get_data?ticker=AAPL&column=revenue,gp&period=5y </li>
<li> Change values of ticker and period to get data for required amount of period. </li>
</ul>
