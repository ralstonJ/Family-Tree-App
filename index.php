<html>
	<head>
		<title>Family Tree App by Ralston ALmeida </title>
		<link rel="icon" type="image/png" href="/img/icon.png">
		<link type="text/css" rel="stylesheet" href="resources/css/Home.css" />
		<link rel="stylesheet" href="resources/css/qunit.css" type="text/css" media="screen" />
		<script src="https://code.jquery.com/jquery-latest.js"></script>
		<script type="text/javascript" src="resources/js/qunit.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>		
	</head>
	<body>
	
		<div class="top-div">
	
		<div class="div_txt"> Welcome to Family Tree</div>
		<select id="selectParent"> </select>
		<input  id="txtMemName" type="text"> </input>
		<button id="btn_Add">Add Node</button> 
		<button id="btn_Rename">Rename Node</button>
		<button id="btn_Delete">Delete Node</button>
		<button id="btn_Position">Position Node</button>
		<button id="btn_Get_Grand_Node">Get Grand-Parent Node</button>
		<div class="div_warn"></div>
		<div class="div_display"></div>
		<table id="list_people">
			<tr>
				<th>Name</th>
				<th>Parent</th>		
				<th>No. of Children</th>
				<th>First Child</th>
				<th>Last Node</th>		
				<th>Right Node</th>
				<th>Left Node</th>
			</tr>
		</table>
		<script type="text/javascript" src="resources/js/func_FT.js"></script>
		</div> 
		<div>
			<?php
					echo "Have a good day!";
			/*	$con = mysqli_connect("l5jez29oe1.database.windows.net,1433","Family-Tree","rafamilytree","R@family3");	
				
				
				// Check connection
				if (mysqli_connect_errno())
				{
				echo "Failed to connect to MySQL: " . mysqli_connect_error();
				}
				echo "hi";
				mysqli_close($con);
				*/?>
		</div>
		<h1 id="qunit-header">QUnit Testing  Family Tree App</h1>
		<h2 id="qunit-banner"></h2>
		<h2 id="qunit-userAgent"></h2>
		<ol id="qunit-tests">
		</ol>	
	</body>

</html