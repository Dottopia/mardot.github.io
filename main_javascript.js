	var click = 0;
	var click_attack = 10;
	var lvl = 1;
	var next_lvl;
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
	var timer = 5;
	var next_level_is_no_boss_level;
	var next_level_is_big_boss_level;
	var next_level_is_little_boss_level;
	var this_level_is_no_boss_level;
	var enemy_graphics_array = ["enemy_graphics/mouse.png", "enemy_graphics/bee.png","enemy_graphics/ant.png","enemy_graphics/spider.png"];


	setInterval(message_output,100);
	setInterval(reset_to_lvl_1,100);


	function clicking(){

		click = click + 1;
		current_health_point = current_health_point - click_attack;

		if (current_health_point < 1){
			health_point_less_zero();
		}
		else{
			health_point_greater_zero();
		}
	}

	function health_point_less_zero(){
		var rand_pic = enemy_graphics_array[Math.floor(Math.random()*enemy_graphics_array.length)];
		document.getElementById("enemy_button").src = rand_pic;

		next_lvl = lvl + 1;
		next_level_is_little_boss_level= (next_lvl===little_boss_lvl);
		next_level_is_big_boss_level = (next_lvl===big_boss_lvl);
		next_level_is_no_boss_level=((next_lvl!==little_boss_lvl) && (next_lvl!==big_boss_lvl));
		this_level_is_no_boss_level=((lvl!==little_boss_lvl) && (lvl!==big_boss_lvl));
		this_level_is_boss_level= ((lvl===little_boss_lvl) || (lvl===big_boss_lvl));

		if (this_level_is_boss_level){
			if ((lvl/little_boss_lvl)===1){
				experience = experience + 3;
				little_boss_lvl = little_boss_lvl + 10;
				timer = 30;
				document.getElementById("timer").innerHTML = " ";
				document.getElementById("little_boss").innerHTML = " ";
			}
			if ((lvl/big_boss_lvl)===1){
				experience = experience + 5;
				big_boss_lvl = big_boss_lvl + 10;
				timer = 30;
				document.getElementById("timer").innerHTML = " ";
				document.getElementById("big_boss").innerHTML = " ";
			}
			max_health_point = 4 * next_lvl;
			current_health_point = max_health_point;
			document.getElementById("little_boss").innerHTML = " ";
			document.getElementById("big_boss").innerHTML = " ";
			document.getElementById("timer").innerHTML = " ";
		}

		if (this_level_is_no_boss_level){
			experience = experience + 1;

			if (next_level_is_little_boss_level){

					max_health_point = 10 * next_lvl;
					current_health_point = max_health_point;
					document.getElementById("enemy_button").src = "enemy_graphics/small_boss_wasp.png";
					document.getElementById("little_boss").innerHTML = "Little Boss";
					document.getElementById("big_boss").innerHTML = " ";
					setInterval(all_boss_timer,1000);
				}

			if (next_level_is_big_boss_level){
					max_health_point = 10 * next_lvl;
					current_health_point = max_health_point;
					document.getElementById("enemy_button").src = "enemy_graphics/big_boss_cat.png";
					document.getElementById("little_boss").innerHTML = " ";
					document.getElementById("big_boss").innerHTML = "Big Boss";
					//setInterval(all_boss_timer,1000);
				}

				if(next_level_is_no_boss_level){
					max_health_point = 4 * next_lvl;
					current_health_point = max_health_point;
					document.getElementById("little_boss").innerHTML = " ";
					document.getElementById("big_boss").innerHTML = " ";
					document.getElementById("timer").innerHTML = " ";
				}
		}
			lvl = next_lvl;
	}

	function health_point_greater_zero(){

			enemy_down_or_up = ((Math.random()*30)+(-0));
			enemy_left_or_right = ((Math.random()*48)+0);
			document.getElementById("enemy_button").style.marginLeft = enemy_left_or_right+"%";
			document.getElementById("enemy_button").style.marginTop = enemy_down_or_up+"%";

			if (((lvl/little_boss_lvl)!==1) && ((lvl/big_boss_lvl)!==1)){
				document.getElementById("little_boss").innerHTML = " ";
				document.getElementById("big_boss").innerHTML = " ";
				document.getElementById("timer").innerHTML = " ";

			}
			if ((lvl/little_boss_lvl)===1){

				if (timer <= 0){
					timer = 0;
					lvl = 1;
					current_health_point = 4;
					max_health_point = 4;
					little_boss_lvl = 5;
					big_boss_lvl = 10;
					document.getElementById("timer").innerHTML = " ";
					document.getElementById("little_boss").innerHTML = " ";
				}
			}
			if ((lvl/big_boss_lvl)===1){

				if (timer < 1){
					reset_to_lvl_1();
					document.getElementById("timer").innerHTML = " ";
					document.getElementById("big_boss").innerHTML = " ";
				}
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
	function reset_to_lvl_1(){
		if (timer<1){
			lvl = 1;
			current_health_point = 4;
			max_health_point = current_health_point;
			visibility_of_click_window = document.getElementById("click_info_window");
			document.getElementById("timer").innerHTML = " ";
			var rand_pic = enemy_graphics_array[Math.floor(Math.random()*enemy_graphics_array.length)];
			document.getElementById("enemy_button").src = rand_pic;
			timer=30;
		}
	}

	function view_click_info_window(){
		if(document.getElementById("click_info_window").style.display === "none"){
			document.getElementById("click_info_window").style.display = "block";
			document.getElementById("worker_info_window").style.display = "none";
			document.getElementById("shop_info_window").style.display = "none";
			document.getElementById("setting_info_window").style.display = "none";
		}
		else{
			document.getElementById("click_info_window").style.display = "none";
			document.getElementById("worker_info_window").style.display = "none";
			document.getElementById("shop_info_window").style.display = "none";
			document.getElementById("setting_info_window").style.display = "none";
		}
	}
	function view_worker_info_window(){
		if(document.getElementById("worker_info_window").style.display === "none"){
			document.getElementById("click_info_window").style.display = "none";
			document.getElementById("worker_info_window").style.display = "block";
			document.getElementById("shop_info_window").style.display = "none";
			document.getElementById("setting_info_window").style.display = "none";
		}
		else{
			document.getElementById("click_info_window").style.display = "none";
			document.getElementById("worker_info_window").style.display = "none";
			document.getElementById("shop_info_window").style.display = "none";
			document.getElementById("setting_info_window").style.display = "none";
		}
	}
	function view_shop_info_window(){
		if(document.getElementById("shop_info_window").style.display === "none"){
			document.getElementById("click_info_window").style.display = "none";
			document.getElementById("worker_info_window").style.display = "none";
			document.getElementById("shop_info_window").style.display = "block";
			document.getElementById("setting_info_window").style.display = "none";
		}
		else{
			document.getElementById("click_info_window").style.display = "none";
			document.getElementById("worker_info_window").style.display = "none";
			document.getElementById("shop_info_window").style.display = "none";
			document.getElementById("setting_info_window").style.display = "none";
		}
	}
	function view_setting_info_window(){
		if(document.getElementById("setting_info_window").style.display === "none"){
			document.getElementById("click_info_window").style.display = "none";
			document.getElementById("worker_info_window").style.display = "none";
			document.getElementById("shop_info_window").style.display = "none";
			document.getElementById("setting_info_window").style.display = "block";
		}
		else{
			document.getElementById("click_info_window").style.display = "none";
			document.getElementById("worker_info_window").style.display = "none";
			document.getElementById("shop_info_window").style.display = "none";
			document.getElementById("setting_info_window").style.display = "none";
		}
	}
	function show_tooltip(id){
		tooltip = document.getElementById(id);
		tooltip.style.display = "block";
	}
	function hide_tooltip(){
		tooltip.style.display = "none";
	}
