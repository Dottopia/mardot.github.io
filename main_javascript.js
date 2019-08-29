	var click = 0;
	var click_attack = 10;
	var lvl = 1;
	var experience = 0;
	var big_boss_lvl = 10;
	var little_boss_lvl = 5;
	var little_boss_dead = false;
	var big_boss_dead = false;
	var worker = 0;
	var max_health_point = 4;
	var current_health_point = max_health_point;
	var enemy_left_or_right;
	var enemy_down_or_up;
	var timer = 30;
	var next_level_is_little_boss_level = (lvl === (little_boss_lvl - 1));
	var next_level_is_big_boss_level = (lvl === (big_boss_lvl - 1));
	var visibility_of_click_window;
	var visibility_of_worker_window;
	var visibility_of_shop_window;
	var visibility_of_setting_window;
	
	setInterval(message_output,100);
	setInterval(if_little_boss_death,1000);
	setInterval(if_big_boss_death,1000);
	setInterval(health_point_less_zero_and_next_level_is_boss_level,1000);
	
	function clicking(){
		
		health_point_greater_zero_and_no_boss_level();
		
		health_point_less_zero_and_no_little_boss_level();
		health_point_less_zero_and_no_big_boss_level();
		
		if(lvl === little_boss_lvl){
				max_health_point = 10 * lvl;
		}
		
		big_boss_level();
		little_boss_level();
		
		if_little_boss_dead();
		if_big_boss_dead();
	
	}
	function health_point_greater_zero_and_no_boss_level(){
		if((current_health_point > 0)&&(((lvl/little_boss_lvl) !== 1)||((lvl/big_boss_lvl) !== 1))){
			click = click + 1;
			current_health_point = current_health_point - click_attack;
			timer = 30;
			
			//create random number for the random position of the enemy:
			enemy_down_or_up = ((Math.random()*16)+(-0));
			enemy_left_or_right = ((Math.random()*70)+5);
			document.getElementById("enemy_button").style.marginLeft = enemy_left_or_right+"%";
			document.getElementById("enemy_button").style.marginTop = enemy_down_or_up+"%";
				
			document.getElementById("little_boss").innerHTML = " ";
			document.getElementById("big_boss").innerHTML = " ";
			document.getElementById("timer").innerHTML = " ";
		}
	}
	function health_point_less_zero_and_no_little_boss_level(){
		if((current_health_point < 1) && ((lvl/little_boss_lvl) !== 1)){
			experience = experience + 1;
			lvl = lvl + 1;
			max_health_point = 4 * lvl;
			current_health_point = max_health_point;
			document.getElementById("little_boss").innerHTML = " ";
			document.getElementById("big_boss").innerHTML = " ";
			document.getElementById("timer").innerHTML = " ";
		}
	}
	function health_point_less_zero_and_no_big_boss_level(){
		if((current_health_point < 1) && ((lvl/big_boss_lvl) !== 1)){
			experience = experience + 1;
			lvl = lvl + 1;
			max_health_point = 4 * lvl;
			current_health_point = max_health_point;
			document.getElementById("big_boss").innerHTML = " ";
			document.getElementById("little_boss").innerHTML = " ";
			document.getElementById("timer").innerHTML = " ";
		}
	}
	function big_boss_level(){
		if(((lvl/big_boss_lvl) === 1)&&(timer > 0)){
			current_health_point = max_health_point;
			document.getElementById("big_boss").innerHTML = "Boss";
			setInterval(all_boss_timer,1000);
			if(current_health_point < 1){
				big_boss_dead = true;
			}
		}
		if(((lvl/big_boss_lvl) === 1)&&(timer <= 0)){
			timer = 0;
			lvl = 1;
			current_health_point = 4;
			max_health_point = 4;
			big_boss_dead = false;
			document.getElementById("timer").innerHTML = " ";
			document.getElementById("big_boss").innerHTML = " ";
		}
	}
	function little_boss_level(){
		if(((lvl/little_boss_lvl) === 1) && (current_health_point > 1)){
			document.getElementById("little_boss").innerHTML = "Small Boss";
			current_health_point = current_health_point - click_attack;
			setInterval(all_boss_timer,1000);
		}
		if(((lvl/little_boss_lvl) === 1)&&(timer <= 0)){
			timer = 0;
			lvl = 1;
			current_health_point = 4;
			max_health_point = 4;
			little_boss_dead = false;
			document.getElementById("timer").innerHTML = " ";
			document.getElementById("little_boss").innerHTML = " ";
		}
	}
	//this function is not working yet:
	function if_little_boss_dead(){
		if(little_boss_dead){
			experience = experience + 2;
			little_boss_lvl = little_boss_lvl + 10;
			timer = 30;
			little_boss_dead = false;
			document.getElementById("timer").innerHTML = " ";
			document.getElementById("little_boss").innerHTML = " ";
		}
	}
	function if_big_boss_dead(){
		if(big_boss_dead){
			experience = experience + 4;
			big_boss_lvl = big_boss_lvl + 10;
			timer = 30;
			big_boss_dead = false;
			document.getElementById("timer").innerHTML = " ";
			document.getElementById("big_boss").innerHTML = " ";
		}
	}
	function message_output(){
		document.getElementById("level").innerHTML = "Level: "+lvl;
		document.getElementById("experience").innerHTML = experience;
		document.getElementById("health_point").innerHTML = "Health: "+current_health_point+" / "+max_health_point;
		document.getElementById("click_strength").innerHTML = click_attack;
		document.getElementById("amount_of_worker").innerHTML = worker;
	}
	function increase_strength(){
		if(experience >= 5){
			experience = experience - 5;
			click_attack = click_attack + 1;
		}
	}
	function all_boss_timer(){
		if(((lvl/little_boss_lvl) === 1)&&(timer > 0)){
			timer = timer - 1;
			document.getElementById("timer").innerHTML = timer;
		}
		if(((lvl/big_boss_lvl) === 1)&&(timer > 0)){
			timer = timer - 1;
			document.getElementById("timer").innerHTML = timer;
		}
	}
	
	function view_click_info_window(){
		visibility_of_click_window = document.getElementById("click_info_window");
		if(visibility_of_click_window.style.display === "none"){
			visibility_of_click_window.style.display = "block";
			visibility_of_worker_window.style.display = "none";
			visibility_of_shop_window.style.display = "none";
			visibility_of_setting_window.style.display = "none";
		}
		else{
			visibility_of_click_window.style.display = "none";
			visibility_of_worker_window.style.display = "none";
			visibility_of_shop_window.style.display = "none";
			visibility_of_setting_window.style.display = "none";
		}
	}
	function view_worker_info_window(){
		visibility_of_worker_window = document.getElementById("worker_info_window");
		if(visibility_of_worker_window.style.display === "none"){
			visibility_of_click_window.style.display = "none";
			visibility_of_worker_window.style.display = "block";
			visibility_of_shop_window.style.display = "none";
			visibility_of_setting_window.style.display = "none";
		}
		else{
			visibility_of_click_window.style.display = "none";
			visibility_of_worker_window.style.display = "none";
			visibility_of_shop_window.style.display = "none";
			visibility_of_setting_window.style.display = "none";
		}
	}
	function view_shop_info_window(){
		visibility_of_shop_window = document.getElementById("shop_info_window");
		if(visibility_of_shop_window.style.display === "none"){
			visibility_of_click_window.style.display = "none";
			visibility_of_worker_window.style.display = "none";
			visibility_of_shop_window.style.display = "block";
			visibility_of_setting_window.style.display = "none";
		}
		else{
			visibility_of_click_window.style.display = "none";
			visibility_of_worker_window.style.display = "none";
			visibility_of_shop_window.style.display = "none";
			visibility_of_setting_window.style.display = "none";
		}
	}
	function view_setting_info_window(){
		visibility_of_setting_window = document.getElementById("setting_info_window");
		if(visibility_of_setting_window.style.display === "none"){
			visibility_of_click_window.style.display = "none";
			visibility_of_worker_window.style.display = "none";
			visibility_of_shop_window.style.display = "none";
			visibility_of_setting_window.style.display = "block";
		}
		else{
			visibility_of_click_window.style.display = "none";
			visibility_of_worker_window.style.display = "none";
			visibility_of_shop_window.style.display = "none";
			visibility_of_setting_window.style.display = "none";
		}
	}