<?php

namespace Drupal\cat_widget_dropdown\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Cat Widget' block.
 *
 * @Block(
 *   id = "cat_widget_block",
 *   admin_label = @Translation("Cat Widget"),
 * )
 */
class CatWidgetDropdownBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [
      'dropdown' => [
        '#type' => 'select',
        '#options' => [
          '' => $this->t('Select a cat race'),  // Placeholder option
        ],
        '#attributes' => [
          'id' => 'cat-race-dropdown',
        ],
      ],
      'results' => [
        '#markup' => '<section class="carousel" aria-label="Gallery">
          <ol id="carousel__viewport" class="carousel__viewport">
            <!-- Slides will be inserted here dynamically -->
          </ol>
          <aside class="carousel__navigation">
            <ol id="carousel__navigation-list" class="carousel__navigation-list">
              <!-- Navigation buttons will be inserted here dynamically -->
            </ol>
          </aside>
        </section>
        <div primary-title="" class="v-card__title">
            <div class="text-xs-center">
                <span class="v-chip v-chip--no-color theme--light v-size--default">
                    <span class="v-chip__content">
                        <div class="v-avatar" style="height: 48px; min-width: 48px; width: 48px;">
                            <img src="" alt="">
                        </div>
                        <span class="label-country"></span>
                    </span>
                </span> 
            </div>
            <div>
                <h3 class="headline-widget-dropdown-result mb-0">American Curl</h3>
            </div>
            <div class="descrption-widget-dropdown-result"></div>
            <div>---</div>
            <div><i class="temperament-widget-dropdown-result">Active, Energetic, Independent, Intelligent, Gentle</i></div>
            <div class="v-card__actions"><a href="" target="_blank" class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default v-orange wikipedia-widget-dropdown-result" flat=""><span class="v-btn__content">Wikipedia</span></a></div>
        <div>
    </div>
</div>',
      ],
      '#attached' => [
        'library' => [
          'cat_widget_dropdown/cat_widget_dropdown_library',
        ],
      ],
    ];
  
    return $build;
  }
}
