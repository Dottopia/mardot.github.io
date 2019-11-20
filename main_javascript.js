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
	var max_health_point_player = 5;
	var current_health_point_player = max_health_point_player;
	var enemy_left_or_right;
	var enemy_down_or_up;
	var timer = 30;
	var next_level_is_no_boss_level;
	var next_level_is_big_boss_level;
	var next_level_is_little_boss_level;
	var this_level_is_no_boss_level;
	var enemy_graphics_array = ["enemy_graphics/mouse3.png", "enemy_graphics/bee.png","enemy_graphics/ant.png",
	"enemy_graphics/spider.png","enemy_graphics/fly.png","enemy_graphics/butterfly.png", "enemy_graphics/bird.png", "enemy_graphics/dog.png"];
	var health_bar_enemy_inner_width = 100;
	var health_bar_player_inner_width = 100;
	var game_content_left_width = 40;
	var game_content_left_height = 25;

	var message_output_interval = setInterval(message_output(),100);
	var reset_to_lvl_1_interval;
	var all_boss_timer_interval;

	function clicking(){

		click = click + 1;
		health_bar_enemy_inner_width=(current_health_point-click_attack)/max_health_point;
		current_health_point = current_health_point - click_attack;
		document.getElementById("health_bar_enemy_inner").style.width = (health_bar_enemy_inner_width*100)+"%";

		if (current_health_point < 1){
			health_point_less_zero();
		}
		else{
			health_point_greater_zero();
		}
	}

	function health_point_less_zero(){

		random_enemy();
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

			}
			if ((lvl/big_boss_lvl)===1){
				experience = experience + 5;
				big_boss_lvl = big_boss_lvl + 10;

			}
			max_health_point = 4 * next_lvl;
			document.getElementById("enemy_button").style.width="6em";
			document.getElementById("little_boss").innerHTML = " ";
			document.getElementById("big_boss").innerHTML = " ";
			document.getElementById("timer").innerHTML = " ";
			clearInterval(reset_to_lvl_1_interval);
			clearInterval(all_boss_timer_interval);

			timer = 30;
		}

		if (this_level_is_no_boss_level){
			experience = experience + 1;

			if (next_level_is_little_boss_level){

					max_health_point = 10 * next_lvl;

					document.getElementById("enemy_button").src = "enemy_graphics/small_boss_wasp.png";
					document.getElementById("enemy_button").style.width="8em";
					document.getElementById("little_boss").innerHTML = "Little Boss";
					document.getElementById("big_boss").innerHTML = " ";
					all_boss_timer_interval = setInterval(all_boss_timer,1000);
					reset_to_lvl_1_interval = setInterval(reset_to_lvl_1,1000);
				}

			if (next_level_is_big_boss_level){
					max_health_point = 10 * next_lvl;

					document.getElementById("enemy_button").src = "enemy_graphics/big_boss_cat.png";
					document.getElementById("little_boss").innerHTML = " ";
					document.getElementById("big_boss").innerHTML = "Big Boss";
					all_boss_timer_interval = setInterval(all_boss_timer,1000);
					reset_to_lvl_1_interval = setInterval(reset_to_lvl_1,1000);
				}

				if(next_level_is_no_boss_level){
					max_health_point = 4 * next_lvl;

					document.getElementById("little_boss").innerHTML = " ";
					document.getElementById("big_boss").innerHTML = " ";
					document.getElementById("timer").innerHTML = " ";
					document.getElementById("enemy_button").style.width="7em";
				}

		}
			current_health_point = max_health_point;
			lvl = next_lvl;
			document.getElementById("health_bar_enemy_inner").style.width = "100%";
			health_bar_enemy_inner_width=health_bar_enemy;
	}

	function health_point_greater_zero(){
		//document.getElementById("timer").innerHTML = health_bar_enemy_inner_width;
		//document.getElementById("timer").innerhtml = "hallo";
		spawn();



			if (((lvl/little_boss_lvl)!==1) && ((lvl/big_boss_lvl)!==1)){
				document.getElementById("little_boss").innerHTML = " ";
				document.getElementById("big_boss").innerHTML = " ";
				document.getElementById("timer").innerHTML = " ";

			}

			if (((lvl/big_boss_lvl)===1)||((lvl/little_boss_lvl)===1)){

				if (timer < 1){
					reset_to_lvl_1();
					document.getElementById("timer").innerHTML = " ";
					document.getElementById("big_boss").innerHTML = " ";
					document.getElementById("little_boss").innerHTML = " ";
					clearInterval(reset_to_lvl_1_interval);
					clearInterval(all_boss_timer_interval);
				}
			}

			if (((lvl/little_boss_lvl)===1)&&((health_point_enemy/max_health_point)<0.5)){
				document.getElementById("enemy_weapon_button").src="enemy_graphics/small_boss_wasp_stinger.png";
				document.getElementById("enemy_weapon_button").style.visibility="visible";
				setInterval(function(){
					document.getElementById("enemy_weapon_button").style.marginLeft=(Math.random()*game_content_left_width)+"em";
					document.getElementById("enemy_weapon_button").style.marginTop=(Math.random()*game_content_left_height)+"em";
					//document.getElementById("timer").innerHTML = document.getElementById("enemy_weapon_button").style.marginLeft;
				},1000);
			}
	}

	function activate_shield(){
		if ((document.getElementById("shield_button").style.marginTop==="1em")&&(document.getElementById("shield_button").style.marginLeft==="35em")){
			document.getElementById("game_content_left").onmousemove= function(){
				var x = event.clientX;
				var y = event.clientY;

				document.getElementById("shield_button").style.marginTop=(y-15)+"em";
				document.getElementById("shield_button").style.marginLeft=(x-13)+"em";
			};
		}
		else {
			deactivate_shield();
		}

	}

	function check_if_collision(){

	}

	function deactivate_shield(){
		document.getElementById("game_content_left").onmousemove=null;
		document.getElementById("shield_button").style.marginTop="1em";
		document.getElementById("shield_button").style.marginLeft="35em";
	}

	function message_output(){
		setInterval(function(){
			document.getElementById("level").innerHTML = "Level: "+lvl;
			document.getElementById("experience").innerHTML = experience;
			document.getElementById("health_point_enemy").innerHTML = current_health_point+" / "+max_health_point;
			document.getElementById("health_point_player").innerHTML = current_health_point_player+" / "+max_health_point_player;
			document.getElementById("click_strength").innerHTML = click_attack;
			document.getElementById("amount_of_worker").innerHTML = worker;
			document.getElementById("health_bar_enemy_inner").style.width = (health_bar_enemy_inner_width*100)+"%";
		},100);
	}
	function increase_strength(){
		if(experience >= 5){
			experience = experience - 5;
			click_attack = click_attack + 1;
		}
	}
	function all_boss_timer(){
		if((((lvl/little_boss_lvl) === 1)||((lvl/big_boss_lvl)===1))&&(timer > 0)){
			timer = timer - 1;
			document.getElementById("timer").innerHTML = timer;
		}
	}

function random_enemy(){

		//document.getElementById("enemy_button").src = "enemy_graphics/pikachu.png";

	var rand_pic = enemy_graphics_array[Math.floor(Math.random()*enemy_graphics_array.length)];
	document.getElementById("enemy_button").src = rand_pic;

}

function spawn(){
	var background_img_width = document.getElementById("background_picture_button").width/16;
	var background_img_height = document.getElementById("background_picture_button").height/16;
	var enemy_button_width = document.getElementById("enemy_button").width/16;
	var enemy_button_height = document.getElementById("enemy_button").height/16;
	//document.getElementById("timer").innerHTML = enemy_button_height;


	enemy_down_or_up = (Math.random()*(background_img_height-enemy_button_height));

	enemy_left_or_right = (Math.random()*(background_img_width-enemy_button_width));
	//document.getElementById("timer").innerhtml = "hallo";
	document.getElementById("enemy_button").style.marginLeft = enemy_left_or_right+"em";
	document.getElementById("enemy_button").style.marginTop = enemy_down_or_up+"em";

}

	function misclicked(){
		current_health_point_player--;
		health_bar_player_inner_width=health_bar_player_inner_width-20;
		//document.getElementById("timer").innerHTML = health_bar_player_inner_width;
		document.getElementById("health_bar_player_inner").style.width = health_bar_player_inner_width+"%";
		if(health_bar_player_inner_width < 1){
			timer=0;
			current_health_point_player = 5;
			reset_to_lvl_1();
		}
	}

	function reset_to_lvl_1(){
			if (timer<1){
				timer = 0;
				lvl = 1;
				current_health_point = 4;
				max_health_point = 4;
				little_boss_lvl = 5;
				big_boss_lvl = 10;
				health_bar_player_inner_width=100;
				document.getElementById("health_bar_player_inner").style.width=health_bar_player_inner_width+"%";
				max_health_point = current_health_point;
				document.getElementById("health_bar_enemy_inner").style.width = "100%";
				health_bar_enemy_inner_width=health_bar_enemy;
				document.getElementById("timer").innerHTML = " ";
				random_enemy();
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
