
	$(document).ready(function(){
		
		var i = 0
		var flyMem = new Array();
		
		function Person(name) 
		{
			// The data that is required to show
			this.name = name;
			
			// Lets node knwo if it has a parent
			this.parent = null;
			
			this.firstChild = null;
			
			this.nextNode = null;
			
			this.prevNode = null;
			
			this.lastNode = null;
			// A count, to keep track of the number of children
			this.child = 0;

		}
		
		
			// function to clear objects from <select> and re-load. Also clear Textbox
		function ClearVal()
		{
			$(".tr_remove" ).remove();
			$("select").empty();
			$(".div_display").empty();
			var cnt_no_of_elements =0;
			for(var key = 0; key<flyMem.length;key++){
				
				if(flyMem[key]!= null)
				{
					cnt_no_of_elements ++;	
					$("select").append("<option value='"+key+"'>"+ flyMem[key].name +"</option>");
					
					$("#list_people tr:last").after("<tr class='tr_remove'><td> " + flyMem[key].name + "</td><td>" + flyMem[key].parent + "</td><td>" + flyMem[key].child + "</td><td>" + flyMem[key].firstChild + "</td><td>" + flyMem[key].lastNode + "</td><td>" + flyMem[key].nextNode + "</td><td>" + flyMem[key].prevNode +"</td></tr>");	
				}
			}
			
			$(".div_display").append("<p>Number of elements in the list " + cnt_no_of_elements +"</p>");	
		
			$("input").val('');
		}


		function AddVal(txtMemName,parentVal)
		{

			if(!txtMemName)
			{

				$(".div_warn").prepend("<p>Valid Name must be entered in Textbox</p>");	
				console.warn("Valid Name must be entered in Textbox");
				return;
			}
			
			flyMem[i++] = new Person(txtMemName);
			if( parentVal >=0 || $( "#selectParent option:selected" ).val())
			{
				var val_parent = ($( "#selectParent option:selected" ).val()) ? $( "#selectParent option:selected" ).val()  : parentVal ;	
				flyMem[i-1].parent =  val_parent ;
				flyMem[i-1].key = i-1;
				flyMem[val_parent].child +=1;
				console.log("for : " + (i-1) + " parnet node last node "+ flyMem[val_parent].lastNode);
				// Add key value as firstchild or nextNode and update lastNode
				if(!flyMem[val_parent].firstChild) flyMem[val_parent].firstChild = i-1;
				else flyMem[flyMem[val_parent].lastNode].nextNode = i-1;
			
				flyMem[i-1].prevNode = flyMem[val_parent].lastNode;
				flyMem[val_parent].lastNode = i-1;		
			}
			
		}
		
	function AssignNull(id) //End result of function to assign null value to deleted object
		{
			
			if(flyMem[id].nextNode)
							{
								flyMem[flyMem[id].nextNode].prevNode = flyMem[id].prevNode; 
								console.log("Node " +id + " has successfully transfered its prev Node");
							}
							
		
			if(flyMem[id].prevNode)
							{
								flyMem[flyMem[id].prevNode].nextNode = flyMem[id].nextNode; 
								console.log("Node " + id + " has successfully transfered next Node");
							}
			if(flyMem[flyMem[id].parent] && flyMem[flyMem[id].parent].child > 0)
							{
								flyMem[flyMem[id].parent].child -= 1;
								console.log("Node " +flyMem[id].parent + "'s number of child(ren) decremented by 1 to " +  flyMem[flyMem[id].parent].child);
							}
			if(!flyMem[id].nextNode && flyMem[id].prevNode)
							{
								flyMem[flyMem[id].parent].lastNode = flyMem[id].prevNode;
								console.log("Node " + flyMem[id].parent + "'s last node now is " + flyMem[id].prevNode );
								
							}
			if(flyMem[flyMem[id].parent] && !flyMem[id].nextNode && !flyMem[id].prevNode)
							{
								flyMem[flyMem[id].parent].firstChild = null;
								console.log("Node " +flyMem[id].parent + "'s firstchild now is null ");
								flyMem[flyMem[id].parent].lastNode = null;
								console.log("Node " +flyMem[id].parent + "'s lastnode now is null ");					
							}	
		
			flyMem[id].nextNode = null;
			flyMem[id].prevNode = null;
			flyMem[id].firstChild = null;
			flyMem[id].lastNode = null;
			flyMem[id].child = null;
			$(".div_warn").append("<p>" + flyMem[id].name  +" has been deleted</p>");
			flyMem[id] = null;
			console.log("deleted successfully " + id);
		}
		
		function DeleteVal(id_flyMem)
		{
			if(!flyMem[id_flyMem]){
				
				$(".div_warn").append("Delete opereation Cannot work with empty dropDown");
				console.warn("Delete opeartion Cannot work with empty dropDown");
				return;
			}
			console.log("Enter Node " + id_flyMem);
			n_child = flyMem[id_flyMem].child ;	
			console.log("Node : " +id_flyMem +" has nextNode: "+ flyMem[id_flyMem].nextNode);	
			console.log("Number of children in Node " + id_flyMem + " : " + n_child) ;
			if(n_child != 0)
			{
				console.log("Ndoe " + id_flyMem + " will loop " + n_child + " times");

				for(var k = 0;  k < n_child; k++)
				{
					var cur_id =flyMem[id_flyMem].lastNode;
					console.log("Node " + id_flyMem + "'s last node is " + cur_id + ", loop interatation :"  +k);
					
					if(flyMem[cur_id].child)
					{	console.log("Node " + cur_id + " has children further");
						DeleteVal(cur_id);
					}

					if(flyMem[cur_id] == null && !flyMem[id_flyMem].lastNode ) { console.log("Leave to del " + id_flyMem + " No.of children: "  );break;}
					if(flyMem[cur_id] == null) {k++;cur_id =flyMem[id_flyMem].lastNode;}
					AssignNull(cur_id);	
				}
			}	
			AssignNull(id_flyMem);			
		}
				
		function RenameVal(txtMemName)
		{
			var id_flyMem = $("#selectParent").val();
			if(id_flyMem && txtMemName)
			{
				flyMem[id_flyMem].name = txtMemName;
				return;
			}
			
			$(".div_warn").append("Cannot work with empty Textbox or empty dropDown");
			console.warn("Cannot work with empty Textbox or empty dropDown");

		}
		

		$("#btn_Position").click(function(){
			$(".div_warn").empty();
			var id_flyMem = $("#selectParent").val();
			if(id_flyMem)
			{
				$(".div_warn").append("<p>Position of " + flyMem[id_flyMem].name + " : " + id_flyMem + "</p>");
				return;
			}
			
			$(".div_warn").append("Position button Cannot work with empty Textbox or empty dropDown");
			console.warn("Position button Cannot work with empty Textbox or empty dropDown");
			
			
		});
		$("#btn_Add").click(function(){
			
			$(".div_warn").empty();
			var txtMemName = $('input:text[id="txtMemName"]').val();
			AddVal(txtMemName);
			ClearVal();
		});
		
		$("#btn_Rename").click(function(){
			
			$(".div_warn").empty();
			var txtMemName = $('input:text[id="txtMemName"]').val();
			RenameVal(txtMemName);
			ClearVal();

		});
	  
	  
		$("#btn_Delete").click(function(){
			$(".div_warn").empty();
			var id_flyMem = $("#selectParent").val();
			DeleteVal(id_flyMem);
			ClearVal();
			
		});
		
		$("#btn_Get_Grand_Node").click(function(){
			
			$(".div_warn").empty();
			var id_flyMem = $("#selectParent").val();
			if(!flyMem[id_flyMem])
			{
				$(".div_warn").append("Get Grand Parent Node Cannot work with empty Textbox or empty dropDown");
				console.warn("Get Grand Parent Node Cannot work with empty Textbox or empty dropDown");
				return;
			}
			
			ClearVal();
				
			if(flyMem[id_flyMem].parent !=null &&flyMem[flyMem[id_flyMem].parent].parent !=null )
			{		
				alert("Grand parent exist!");
				
				$(".div_display").append("<p>Grand Parent of " +flyMem[id_flyMem].name + " is " + flyMem[flyMem[flyMem[id_flyMem].parent].parent].name + " </p>");
			
			}
			else
				alert("Grand parent does not exist!");
			
		
		});	
	  });
		QUnit.log = function(result, message)
		{
			if (window.console && window.console.log)
			{
				window.console.log(result +' :: '+ message);
			}
		} 
		module("Test for all the GUI elements");
		test( "All required elements exist", 6, function() {
			ok($("#selectParent").length != 0, "DropDown Box exists");
		    ok($("#txtMemName").length != 0, "Textbox exists");
		    ok($("#btn_Add").length != 0, "Add Button exists");
			ok($("#btn_Rename").length != 0, "Rename Button exists");
			ok($("#btn_Delete").length != 0, "Delete Button exists");
			ok($("#btn_Get_Grand_Node").length != 0, "Get Grand Parent exists");
		});
		module("Test Elements when user clicks on add button");
		test("All required element exist", 2,function(){
			
			ok($("input").length !=0," Textbox exists");
			ok($("input").empty()," Textbox is empty");		
			
			
			
		});

		