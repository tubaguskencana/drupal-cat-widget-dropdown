(function ($, Drupal, once) {
    'use strict';
  
    Drupal.behaviors.catWidgetDropdown = {
      attach: function (context, settings) {

        function getImages(breedId) {
            try {
              // Prepare query parameters
              let query_params = {
                breed_ids: breedId,
                limit: 3
              };
    
              // Ajax request to TheCatAPI
              $.ajax({
                url: 'https://api.thecatapi.com/v1/images/search',
                method: 'GET',
                data: query_params,
                success: function (response, status, xhr) {
                  
                  // Store the images from response, and limit the display to 3
                  let images = response.slice(0, 3);
    
                  // Display images on the page
                  generateCarousel(images);
                },
                error: function (err) {
                  console.log(err);
                }
              });
            } catch (err) {
              console.log(err);
            }
          }

          function generateCarousel(images) {
            
            let slidesHtml = '';
            let navigationHtml = '';
    
            images.forEach((image, index) => {
                let slideNumber = index + 1;
      
                // Generate carousel slide
                slidesHtml += `
                  <li id="carousel__slide${slideNumber}" tabindex="0" class="carousel__slide">
                    <div class="carousel__snapper" style="background-image: url('${image.url}');background-size: cover;background-position: center center;">
                    </div>
                  </li>
                `;
      
                // Generate carousel navigation
                navigationHtml += `
                  <li class="carousel__navigation-item">
                    <a href="#carousel__slide${slideNumber}" class="carousel__navigation-button">Go to slide ${slideNumber}</a>
                  </li>
                `;
            });
    
            // Insert slides and navigation into the carousel
            $('#carousel__viewport').html(slidesHtml);
            $('#carousel__navigation-list').html(navigationHtml);
          }

        $(once('cat-widget-dropdown', '#cat-race-dropdown', context)).change(function () {
          var selectedRace = $(this).val();
          var _self = $(this);
          
          if (selectedRace) {
            var country_codes = _self.find('option:selected').data('countries');
            var country_label = _self.find('option:selected').data('countrynames');
            getImages(selectedRace);
            $(".v-avatar img").attr({src: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/" + country_codes.toLowerCase() + ".svg", alt: country_codes})
            $(".label-country").text(country_label)
            $(".headline-widget-dropdown-result").text(_self.find('option:selected').text())
            $(".temperament-widget-dropdown-result").text(_self.find('option:selected').data('temperament'))
            $(".descrption-widget-dropdown-result").text(_self.find('option:selected').data('description'))
            $(".wikipedia-widget-dropdown-result").attr('href', _self.find('option:selected').data('wikipedia'))
            $(".carousel").show();
            $(".v-card__title").css("display","flex");
          }
        });
  
        // Populate dropdown with cat races
        $.ajax({
          url: 'https://api.thecatapi.com/v1/breeds',
          method: 'GET',
          success: function (data) {
            var dropdown = $('#cat-race-dropdown');
            data.forEach(function (cat) {
              dropdown.append('<option value="' + cat.id + '" data-wikipedia="'+cat.wikipedia_url+'" data-description="'+cat.description+'" data-temperament="'+cat.temperament+'" data-countries="'+cat.country_codes+'" data-countrynames="'+cat.origin+'">' + cat.name + '</option>');
            });
          }
        });

      }
    };
  })(jQuery, Drupal, once);
  