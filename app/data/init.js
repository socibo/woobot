(function(){

    var client, destination;
    var url = "ws://socibo.facebook.com:61614";
    var login = null;
    var passcode = null;
    destination = "facebook.ratings"

    document.stompClient = client = Stomp.client(url);

    // this allows to display debug logs directly on the web page
    client.debug = function(str) {
        console.log(str);
    };
    
    // // the client is notified when it is connected to the server.
    client.connect(login, passcode, function(frame) {
        client.debug("connected to Stomp");
        // $('#connect').fadeOut({ duration: 'fast' });
        // $('#connected').fadeIn();
        // client.subscribe(destination, function(message) {
    	//     console.log("Received:", message.body);
        // });
    });
    
    // $('#disconnect').click(function() {
    //     client.disconnect(function() {
    //         $('#connected').fadeOut({ duration: 'fast' });
    //         $('#connect').fadeIn();
    //         $("#messages").html("")
    //     });
    //     return false;
    // });
    
    // $('#send_form').submit(function() {
    //     var text = $('#send_form_input').val();
    //     if (text) {
    //         client.send(destination, {}, text);
    //         $('#send_form_input').val("");
    //     }
    //     return false;
    // });
    

    if(document.facebook){
    	console.log('Initializing facebook');
    	document.facebook.init();
    }
    return false;
    
    //SavoySharmGroup?fields=name,id,about,app_links,artists_we_like,attire,band_interests,band_members,best_page,bio,birthday,booking_agent,built,business,can_checkin,can_post,category,category_list,company_overview,contact_address,context,country_page_likes,cover,culinary_team,current_location,description,description_html,directed_by,emails,features,food_styles,founded,general_info,general_manager,genre,global_brand_page_name,global_brand_root_id,has_added_app,leadgen_tos_accepted,hometown,hours,impressum,influences,is_always_open,is_community_page,is_permanently_closed,is_published,is_unclaimed,is_verified,link,location,mission,mpg,name_with_location_descriptor,network,new_like_count,offer_eligible,parent_page,parking,payment_options,personal_info,personal_interests,pharma_safety_info,phone,plot_outline,press_contact,price_range,produced_by,products,promotion_ineligible_reason,public_transit,record_label,release_date,restaurant_services,restaurant_specialties,schedule,screenplay_by,season,starring,start_info,store_number,studio,talking_about_count,engagement,unread_notif_count,unseen_message_count,username,website,were_here_count,written_by,featured_video,owner_business,last_used_time,checkins,likes,members
    
})();
