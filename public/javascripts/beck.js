var form = document.getElementById("form");
var total = 0;


	const submit = document.querySelector('#submit');
	
	
	submit.onclick = function () {
		
		const a1s = document.querySelectorAll('input[name="q1"]');
		const a2s = document.querySelectorAll('input[name="q2"]');
		const a3s = document.querySelectorAll('input[name="q3"]');
		const a4s = document.querySelectorAll('input[name="q4"]');
		const a5s = document.querySelectorAll('input[name="q5"]');
		const a6s = document.querySelectorAll('input[name="q6"]');
		const a7s = document.querySelectorAll('input[name="q7"]');
		const a8s = document.querySelectorAll('input[name="q8"]');
		const a9s = document.querySelectorAll('input[name="q9"]');
		const a10s = document.querySelectorAll('input[name="q10"]');
		const a11s = document.querySelectorAll('input[name="q11"]');
		const a12s = document.querySelectorAll('input[name="q12"]');
		const a13s = document.querySelectorAll('input[name="q13"]');
		const a14s = document.querySelectorAll('input[name="q14"]');
		const a15s = document.querySelectorAll('input[name="q15"]');
		const a16s = document.querySelectorAll('input[name="q16"]');
		const a17s = document.querySelectorAll('input[name="q17"]');
		const a18s = document.querySelectorAll('input[name="q18"]');
		const a19s = document.querySelectorAll('input[name="q19"]');
		const a20s = document.querySelectorAll('input[name="q20"]');
		const a21s = document.querySelectorAll('input[name="q21"]');
		
		
		for (const a1 of a1s){
			if (a1.checked){
				total += a1.value;
				break;
			}
		}
		
		for (const a2 of a2s){
			if (a2.checked){
				total += a2.value;
				break;
			}
		}
		
		for (const a3 of a3s){
			if (a3.checked){
				total += a3.value;
				break;
			}
		}
		
		for (const a4 of a4s){
			if (a4.checked){
				total += a4.value;
				break;
			}
		}
		
		for (const a5 of a5s){
			if (a5.checked){
				total += a5.value;
				break;
			}
		}
		
		for (const a6 of a6s){
			if (a6.checked){
				total += a6.value;
				break;
			}
		}
		
		for (const a7 of a7s){
			if (a7.checked){
				total += a7.value;
				break;
			}
		}
		
		for (const a8 of a8s){
			if (a8.checked){
				total += a8.value;
				break;
			}
		}
		
		for (const a9 of a9s){
			if (a9.checked){
				total += a9.value;
				break;
			}
		}
		
		for (const a10 of a10s){
			if (a10.checked){
				total += a10.value;
				break;
			}
		}
		
		for (const a11 of a11s){
			if (a11.checked){
				total += a11.value;
				break;
			}
		}
		
		for (const a12 of a12s){
			if (a12.checked){
				total += a12.value;
				break;
			}
		}
		
		for (const a13 of a13s){
			if (a13.checked){
				total += a13.value;
				break;
			}
		}
		
		for (const a14 of a14s){
			if (a14.checked){
				total += a14.value;
				break;
			}
		}
		
		for (const a15 of a15s){
			if (a15.checked){
				total += a15.value;
				break;
			}
		}
		
		for (const a16 of a16s){
			if (a16.checked){
				total += a16.value;
				break;
			}
		}
		
		for (const a17 of a17s){
			if (a17.checked){
				total += a17.value;
				break;
			}
		}
		
		for (const a18 of a18s){
			if (a18.checked){
				total += a18.value;
				break;
			}
		}
		
		for (const a19 of a19s){
			if (a19.checked){
				total += a19.value;
				break;
			}
		}
		
		for (const a20 of a20s){
			if (a20.checked){
				total += a20.value;
				break;
			}
		}
		
		for (const a21 of a21s){
			if (a21.checked){
				total += a21.value;
				break;
			}
		}
		
		var sum = 0;
		for(var i=0; i < total.length; ++i)
		{
			if(total[i] === "0")
				sum += 0;
			if(total[i] === "1")
				sum += 1;
			if(total[i] === "2")
				sum += 2;
			if(total[i] === "3")
				sum += 3;
			
		}
					
	console.log("total: " + sum);
	sessionStorage.setItem("sum", sum);
};
