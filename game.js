/*
Program:   Assignment 2: Application – Horse Racing
 Filename:  game.js                              
@author:   © shivani purwar (18413701)                      
Course:    BEng/BSc/HND Computing Year 1        
Module:    CSY1018 Web Development        
Tutor:     Ganesh Khatri
version:   1.0 firstdraft                                   
Date:      15/7/2018                              

*/

// created global variable 
var totalamount=100;       // created variable for totalamount & intilized it 
var width=window.innerWidth; 
var height=window.innerHeight;
var betamount=0;             // variable for bet amount
var bethorse;                // varialbe for bet horse
var lap;                    // variable for lap
var currentlap=0;
var stop=3;
var horseorder=[];

// created function for lockview to show the results of winner
function lockview(flag){                               // inable and disable the interface
	document.getElementById('start').disabled=flag;
	document.getElementById('lap').disabled=flag;
	document.getElementById('bethorse').disabled=flag;
	document.getElementById('amount').disabled=flag;
}
// created function for start button 
function startClick(){ 
if(document.getElementById('amount').value<=totalamount&&document.getElementById('lap').value>0){ 
	lockview(true);               // inable the interface
	removeResult();              //  methid call for removing the results 
	var music1=document.createElement('audio');  // created local variable for sound 
	music1.src='tung.wav';
	music1.play();
	runHorse=document.createElement('audio');
	runHorse.src='runHorse.wav';
	runHorse.loop=true;                          //playing the music background in loop
	runHorse.play();                             // play the sound runhorse
	
	betamount= document.getElementById('amount').value;       // get the value for betamount.
	bethorse= document.getElementById('bethorse').value;      // get the value for bethorse.
	lap=document.getElementById('lap').value;                 // get the value for lap
	var horse1=document.getElementById('horse1');
	var speed1= Math.ceil(Math.random()*30)+80;               // generating ramdom value from 80 to 95
	var speed2= Math.ceil(Math.random()*30)+80;
	var speed3= Math.ceil(Math.random()*30)+80;
	var speed4= Math.ceil(Math.random()*30)+80;
	
	horse1.interval=setInterval(function(){                   // generate interval between horses
		move(horse1,80,3,10,67);
	},speed1);

	var horse2=document.getElementById('horse2');       
		horse2.interval=setInterval(function(){
		move(horse2,78,5,10,72);
	},speed2);
	var horse3=document.getElementById('horse3');
	horse3.interval=setInterval(function(){
		move(horse3,76,7,4,76);
	},speed3);
	var horse4=document.getElementById('horse4');
	
	horse4.interval=setInterval(function(){
		move(horse4,74,9,4,80);

	},speed4);
}else{
	alert("enter proper value");
}
}

function move(horse,turnup,turnleft,turndown,turnright){          // created the move function for motion of horses
	x=Math.ceil((horse.offsetLeft/width)*100);                   
	y=Math.ceil((horse.offsetTop/height)*100);

if(x<turnup && y>=turnright){                      
		horse.className='horse runRight';                       // turn horse by right
		horse.style.left=x+1 +'vw';                             
		x++;                                                   // the value of x incresses by 1                 
	
	}else if(x>=turnup && y>turnleft){                       
		horse.className='horse runUp';                          // turn horse by up 
		y--;                                                   // the value of y is decressed by one
		horse.style.top=y-1 +'vh';
	
	}else if(x>turndown && y<=turnleft){                      
		horse.className='horse runLeft';                       // turn horse by left 
		x--;                                                   // the value of x is decressed by one
		horse.style.left=x-1 +'vw';
	
	}
	else if (x>=turndown && y<turnright){
		horse.className='horse runDown';                      // turn horse by down
			y++;                                              // the value of y is incressed by one
		horse.style.top=y+1 +'vh';
	
	}else{
		                  
	}

	
	if(x==20&&y>65){            // compare if x is equals to 20 and y is grater than 65
		
		currentlap++;
		if(lap*4-stop==currentlap){           //
			horseorder.push(horse.id);        // add horse when it finsh line
			if (stop==3) {                  
				if (bethorse==horse.id) {
					totalamount+=betamount;  // the betamount will increase if horse won
				}else {
					totalamount-=betamount;  // the betasmount will decresse
				}
				document.getElementById('funds').innerHTML= totalamount;
			}
			stop--;                            // the stop will decresses by one
		horse.className='horse standRight';
				clearInterval(horse.interval);  
				
				if(stop==-1){               // compare whether the stop is -1 
					
					lockview(false);        // inable interface
					showResult();           // will show result
					runHorse.pause();       // sound will purse

				}
				
			}
}

}

function removeResult(){                // for remove results
	var result=document.getElementsByTagName("td");
	for(var i=1;i<8;i=i+2){
		result[i].className=''+i;           // will display nothing
	}
	stop=3;           
	currentlap=0;
	horseorder=[];
}


function showResult(){      //for showing result of winner
	var result=document.getElementsByTagName("td");
	var horseindex=0;
	for(var i=1;i<8;i=i+2){
		result[i].className=horseorder[horseindex];  // 
		horseindex++;  // the horseindex will increase by one
	}
}

function myLoadEvent(){         
	var start=document.getElementById('start');
     start.addEventListener('click',startClick); // add action listner in start button 

}
document.addEventListener('DOMContentLoaded',myLoadEvent);